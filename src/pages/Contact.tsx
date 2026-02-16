import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { Send, MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-secondary section-padding pt-32 pb-16 lg:pt-40 lg:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="label-text text-accent mb-4"
        >
          Get in Touch
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="heading-xl text-secondary-foreground"
          >
            Contact Us
          </motion.h1>
        </div>
      </section>

      <section className="section-padding section-gap bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <AnimatedSection>
            <p className="label-text text-accent mb-4">Send a Message</p>
            <h2 className="heading-md text-foreground mb-8">
              Let's Start a <span className="italic">Conversation</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { key: "name", label: "Full Name", type: "text" },
                { key: "email", label: "Email Address", type: "email" },
                { key: "phone", label: "Phone Number", type: "tel" },
              ].map((field) => (
                <div key={field.key} className="relative">
                  <label
                    className={`absolute left-0 transition-all duration-300 ${
                      focused === field.key || formData[field.key as keyof typeof formData]
                        ? "text-xs text-accent -top-5"
                        : "text-base text-muted-foreground top-3"
                    }`}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    onFocus={() => setFocused(field.key)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-accent focus:outline-none transition-colors duration-300 font-sans"
                  />
                </div>
              ))}

              <div className="relative">
                <label
                  className={`absolute left-0 transition-all duration-300 ${
                    focused === "message" || formData.message
                      ? "text-xs text-accent -top-5"
                      : "text-base text-muted-foreground top-3"
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-accent focus:outline-none transition-colors duration-300 font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 label-text hover:bg-warm-orange-hover transition-all duration-300 hover:scale-[1.02] mt-4"
              >
                Send Message <Send size={16} />
              </button>
            </form>
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection delay={0.2}>
            <p className="label-text text-accent mb-4">Contact Information</p>
            <h2 className="heading-md text-foreground mb-12">
              Visit Our <span className="italic">Office</span>
            </h2>

            <div className="space-y-8">
              {[
                { icon: MapPin, label: "Address", value: "42 Verdant Boulevard, Suite 1200\nMetropolitan City, MC 10001" },
                { icon: Phone, label: "Phone", value: "+1 (555) 234-5678" },
                { icon: Mail, label: "Email", value: "hello@verdantestates.com" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <item.icon size={20} className="text-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="label-text text-foreground mb-1">{item.label}</p>
                    <p className="body-md text-muted-foreground whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-12 aspect-[4/3] bg-muted flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin size={32} className="text-muted-foreground/30 mx-auto mb-2" />
                <p className="label-text text-muted-foreground">Map Integration</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default Contact;
