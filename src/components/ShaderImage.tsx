import { useEffect, useRef } from "react";
import * as THREE from "three";

// Shared velocity proxy — one ScrollTrigger drives all canvases
import { velocityProxy } from "@/lib/velocityProxy";

const vert = /* glsl */ `
  varying vec2 vUv;
  varying vec2 vUvCover;
  uniform vec2 uTextureSize;
  uniform vec2 uQuadSize;
  void main(){
    vUv = uv;
    float texR = uTextureSize.x / uTextureSize.y;
    float quadR = uQuadSize.x / uQuadSize.y;
    vec2 s = vec2(1.0);
    if (quadR > texR) { s.y = texR / quadR; } else { s.x = quadR / texR; }
    vUvCover = vUv * s + (1.0 - s) * 0.5;
    gl_Position = vec4(position, 1);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec2 uTextureSize;
  uniform vec2 uQuadSize;
  uniform float uTime;
  uniform float uScrollVelocity;
  uniform float uVelocityStrength;
  varying vec2 vUv;
  varying vec2 vUvCover;
  void main() {
    vec2 texCoords = vUvCover;
    float amt = 0.03 * uVelocityStrength;
    float t = uTime * 0.8;
    texCoords.y += sin((texCoords.x * 8.0) + t) * amt;
    texCoords.x += cos((texCoords.y * 6.0) - t * 0.8) * amt * 0.6;
    float dir = sign(uScrollVelocity);
    vec2 tc = texCoords;
    float r = texture2D(uTexture, tc + vec2( amt * 0.50 * dir, 0.0)).r;
    float g = texture2D(uTexture, tc + vec2( amt * 0.25 * dir, 0.0)).g;
    float b = texture2D(uTexture, tc + vec2(-amt * 0.35 * dir, 0.0)).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

interface ShaderImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ShaderImage = ({ src, alt, className = "" }: ShaderImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const uniformsRef = useRef<any>(null);
  const tickIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    container.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geom = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uTextureSize: { value: new THREE.Vector2(1, 1) },
      uQuadSize: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uScrollVelocity: { value: 0 },
      uVelocityStrength: { value: 0 },
    };
    uniformsRef.current = uniforms;

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);

    // Load texture
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(src, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      uniforms.uTexture.value = tex;
      uniforms.uTextureSize.value.set(tex.image.width, tex.image.height);
      layout();
    });

    function layout() {
      const { width, height } = container!.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      uniforms.uQuadSize.value.set(width, height);
    }

    // Viewport observer — only tick when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation tick
    let last = performance.now();
    const tick = (now: number) => {
      if (!isVisibleRef.current) {
        last = now;
        tickIdRef.current = requestAnimationFrame(tick);
        return;
      }
      const dt = (now - last) * 0.001;
      last = now;
      uniforms.uTime.value += dt;
      uniforms.uScrollVelocity.value = velocityProxy.v;
      uniforms.uVelocityStrength.value = velocityProxy.s;
      renderer.render(scene, camera);
      tickIdRef.current = requestAnimationFrame(tick);
    };
    tickIdRef.current = requestAnimationFrame(tick);

    // Resize
    const ro = new ResizeObserver(() => layout());
    ro.observe(container);

    return () => {
      if (tickIdRef.current) cancelAnimationFrame(tickIdRef.current);
      observer.disconnect();
      ro.disconnect();
      renderer.dispose();
      geom.dispose();
      mat.dispose();
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      role="img"
      aria-label={alt}
    />
  );
};

export default ShaderImage;
