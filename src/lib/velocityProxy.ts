import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const velocityProxy = { v: 0, s: 0 };

const clamp = gsap.utils.clamp(-2000, 2000);

let initialized = false;

export function initVelocityProxy() {
  if (initialized) return;
  initialized = true;

  ScrollTrigger.create({
    start: 0,
    end: () => document.documentElement.scrollHeight - window.innerHeight,
    onUpdate(self) {
      const raw = clamp(self.getVelocity());
      const norm = raw / 1000;
      const strength = Math.min(1, Math.abs(norm));
      if (Math.abs(strength) > Math.abs(velocityProxy.s)) {
        velocityProxy.v = norm;
        velocityProxy.s = strength;
        gsap.to(velocityProxy, {
          v: 0,
          s: 0,
          duration: 0.8,
          ease: "sine.inOut",
          overwrite: true,
        });
      }
    },
  });
}
