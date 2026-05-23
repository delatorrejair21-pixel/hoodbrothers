"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ScrollReveal from "@/components/ScrollReveal";
import LogoIntro from "@/components/LogoIntro";

// ─── Scroll Progress Bar ─────────────────────────────────────────────────────

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-white transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Why Us",   href: "#why-us" },
    { label: "Process",  href: "#process" },
    { label: "Gallery",  href: "#gallery" },
    { label: "Contact",  href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-400 nav-blur ${
        scrolled ? "bg-[#0D0D0D]/90 border-b border-[#2E2E2E]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between py-4">
        <a href="#" className="flex items-center">
          <Image
            src="/logo.png"
            alt="The Hood Brothers"
            width={120}
            height={60}
            style={{ width: 120, height: "auto" }}
            className="invert brightness-200"
            data-navbar-logo
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 bg-white hover:bg-white/90 text-[#0D0D0D] text-sm font-black tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-black/30 hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Free Quote
          </a>
        </nav>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 border-t border-[#2E2E2E]" : "max-h-0"
        } bg-[#141414]`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white text-base font-medium tracking-wide">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="bg-white hover:bg-white/90 text-[#0D0D0D] text-sm font-black tracking-wider uppercase px-5 py-3 rounded-full text-center"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero (with parallax) ────────────────────────────────────────────────────

function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: `url('/hoodbrothers.png')` }}
      />
      <div className="absolute inset-0 bg-[#0D0D0D]/85" />
      <div className="absolute inset-0 animate-white-pulse" style={{
        background: "radial-gradient(ellipse 55% 45% at 50% 55%, rgba(255,255,255,0.07) 0%, transparent 70%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center pt-24 md:pt-0">
        <h1
          className="animate-fade-up-d1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight text-white mb-6"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          Professional Kitchen
          <br />
          <span className="text-white-gradient">Hood Cleaning</span>
          <br />
          You Can Trust
        </h1>

        <p className="animate-fade-up-d2 text-white/55 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Helping restaurants and commercial kitchens stay clean, safe, and inspection-ready.
          Heavy grease removal done right — every time.
        </p>

        <div className="animate-fade-up-d3 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="bg-white hover:bg-white/90 text-[#0D0D0D] font-black tracking-wider uppercase px-8 py-4 rounded-full text-sm transition-all duration-200 shadow-xl shadow-black/40 hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Get a Free Quote
          </a>
          <a
            href="tel:+10000000000"
            className="bg-white/8 hover:bg-white/15 border border-white/20 hover:border-white/35 text-white font-bold tracking-wider uppercase px-8 py-4 rounded-full text-sm transition-all duration-200 backdrop-blur-sm"
          >
            Call Now
          </a>
        </div>

        <div className="animate-fade-up-d4 mt-20 flex justify-center">
          <a href="#trust" className="flex flex-col items-center gap-2 text-white/25 hover:text-white/50 transition-colors">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Bar ───────────────────────────────────────────────────────────────

function TrustBar() {
  const items = [
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
      label: "Restaurant & Commercial Kitchen Cleaning",
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 8C8 10 5.9 16.17 3.82 22M9 10C9 10 8 18 17 18M15 10C15 10 17 15 13 18M3 3l18 18"/></svg>,
      label: "Grease Removal Specialists",
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      label: "Safety-Focused Service",
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
      label: "Reliable Scheduling",
    },
  ];

  return (
    <section id="trust" className="bg-[#141414] border-y border-[#2E2E2E] py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-[#2E2E2E]">
          {items.map((item, i) => (
            <ScrollReveal key={item.label} variant="fade" delay={i as 0|1|2|3}>
              <div className="flex items-center gap-3 lg:px-8 py-2">
                <span className="text-white/60 shrink-0">{item.icon}</span>
                <span className="text-white/75 text-sm font-medium leading-tight">{item.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

function Services() {
  const services = [
    {
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h10M7 11h7"/></svg>,
      title: "Commercial Kitchen Hood Cleaning",
      desc: "Full degreasing of hood systems, including canopy, filters, and grease traps. Compliant with NFPA 96 standards.",
    },
    {
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
      title: "Exhaust Fan Cleaning",
      desc: "Thorough cleaning of rooftop exhaust fans, removing built-up grease that is a leading cause of kitchen fires.",
    },
    {
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M4 7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2M4 7v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7"/></svg>,
      title: "Grease Filter Cleaning",
      desc: "Baffle and mesh filter degreasing to maintain proper airflow and reduce grease accumulation in ducts.",
    },
    {
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3h18M3 3v3a9 9 0 0 0 18 0V3M12 12v9M8 21h8"/></svg>,
      title: "Duct Cleaning",
      desc: "Complete duct system degreasing from hood plenum to exhaust outlet, eliminating hidden fire hazards.",
    },
    {
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z"/></svg>,
      title: "Restaurant Deep Cleaning",
      desc: "Full-kitchen deep cleaning service that covers every surface, keeping your kitchen spotless for health inspections.",
    },
    {
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M12 12v4M10 14h4"/></svg>,
      title: "Maintenance Plans",
      desc: "Quarterly, semi-annual, or annual scheduled cleaning plans to keep your kitchen compliant and your insurance valid.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal variant="up" className="text-center mb-16">
          <span className="inline-block text-white/45 text-xs font-bold tracking-widest uppercase mb-4">What We Do</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight" style={{ fontFamily: "var(--font-barlow)" }}>
            Our Cleaning <span className="text-white-gradient">Services</span>
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-2xl mx-auto">
            From hood to exhaust fan — we handle the complete cleaning system so you can focus on your kitchen.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.title} variant="scale" delay={(i % 3 + 1) as 1|2|3}>
              <div className="hood-card bg-[#141414] rounded-2xl p-8 h-full flex flex-col gap-5">
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/12 flex items-center justify-center text-white/75">
                  {svc.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2 uppercase tracking-wide" style={{ fontFamily: "var(--font-barlow)" }}>
                    {svc.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ───────────────────────────────────────────────────────────

function WhyUs() {
  const reasons = [
    { icon: "🔥", title: "Reduces Fire Risk",          desc: "Grease buildup is the #1 cause of commercial kitchen fires. Regular cleaning is your first line of defense." },
    { icon: "📋", title: "Inspection-Ready Kitchens",  desc: "We clean to NFPA 96 standards so you pass every health and fire inspection with confidence." },
    { icon: "💪", title: "Heavy Grease Removal",       desc: "No surface too caked — we break down years of grease buildup so your system runs at full efficiency." },
    { icon: "⭐", title: "Professional & Dependable",  desc: "Trained, experienced technicians who show up on time and get the job done right the first time." },
    { icon: "🗓️", title: "Flexible Scheduling",       desc: "We work around your hours — nights, early mornings, or weekends — so your kitchen never misses a beat." },
    { icon: "✅", title: "Clean Work, No Mess",         desc: "We protect your equipment, contain all grease and debris, and leave your kitchen cleaner than we found it." },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal variant="left">
            <span className="inline-block text-white/45 text-xs font-bold tracking-widest uppercase mb-4">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight mb-6" style={{ fontFamily: "var(--font-barlow)" }}>
              Built for the<br /><span className="text-white-gradient">Commercial Kitchen</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10">
              The Hood Brothers was founded by professionals who understand what restaurants and commercial kitchens need — fast, thorough, and reliable service that keeps you compliant and your staff safe.
            </p>
            <a
              href="#contact"
              className="inline-flex bg-white hover:bg-white/90 text-[#0D0D0D] font-black tracking-wider uppercase px-7 py-3.5 rounded-full text-sm transition-all duration-200 shadow-lg shadow-black/30 hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Get a Free Quote Today
            </a>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((r, i) => (
              <ScrollReveal key={r.title} variant="right" delay={(i % 3 + 1) as 1|2|3}>
                <div className="hood-card bg-[#1A1A1A] rounded-2xl p-6 h-full">
                  <span className="text-2xl mb-3 block">{r.icon}</span>
                  <h3 className="text-white font-bold text-base uppercase tracking-wide mb-2" style={{ fontFamily: "var(--font-barlow)" }}>
                    {r.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────

function Process() {
  const steps = [
    {
      number: "01",
      title: "Request a Quote",
      desc: "Fill out our simple contact form or give us a call. We'll ask a few questions about your kitchen setup and get back to you quickly with a free, no-obligation quote.",
    },
    {
      number: "02",
      title: "Schedule Your Cleaning",
      desc: "Pick a time that works for you — even late nights or early mornings. We work around your business hours so your kitchen never has to stop.",
    },
    {
      number: "03",
      title: "Get a Cleaner, Safer Kitchen",
      desc: "Our certified technicians handle everything from hood to exhaust fan. We leave you with documentation for your records and a noticeably cleaner system.",
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal variant="up" className="text-center mb-16">
          <span className="inline-block text-white/45 text-xs font-bold tracking-widest uppercase mb-4">How It Works</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight" style={{ fontFamily: "var(--font-barlow)" }}>
            Simple 3-Step <span className="text-white-gradient">Process</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} variant="up" delay={(i + 1) as 1|2|3} threshold={0.15}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-6 relative z-10">
                    <span className="text-white text-3xl font-black" style={{ fontFamily: "var(--font-barlow)" }}>
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-white font-black text-2xl uppercase mb-4" style={{ fontFamily: "var(--font-barlow)" }}>
                    {step.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed max-w-sm">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Before & After ──────────────────────────────────────────────────────────

function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal variant="up" className="text-center mb-16">
          <span className="inline-block text-white/45 text-xs font-bold tracking-widest uppercase mb-4">Our Results</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight" style={{ fontFamily: "var(--font-barlow)" }}>
            Before & <span className="text-white-gradient">After</span>
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto">
            See the difference a professional hood cleaning makes. Drag the slider to compare.
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <ScrollReveal variant="scale" delay={1}>
            <BeforeAfterSlider
              beforeImage="/Dirty_Canopy.png"
              afterImage="/Clean_Canopy.png"
              beforeAlt="Hood canopy before cleaning — heavy grease buildup"
              afterAlt="Hood canopy after cleaning — spotless stainless steel"
            />
            <p className="text-white/30 text-sm mt-3 text-center">Hood Canopy — Before &amp; After</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Industries ──────────────────────────────────────────────────────────────

function Industries() {
  const industries = [
    { icon: "🍽️", label: "Restaurants" },
    { icon: "🚚", label: "Food Trucks" },
    { icon: "☕", label: "Cafés" },
    { icon: "⛪", label: "Churches" },
    { icon: "🏫", label: "Schools" },
    { icon: "👨‍🍳", label: "Commercial Kitchens" },
    { icon: "🍺", label: "Bars & Grills" },
  ];

  return (
    <section id="industries" className="py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal variant="up" className="text-center mb-16">
          <span className="inline-block text-white/45 text-xs font-bold tracking-widest uppercase mb-4">Industries We Serve</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight" style={{ fontFamily: "var(--font-barlow)" }}>
            We Serve <span className="text-white-gradient">All Commercial</span><br />Kitchens
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {industries.map((ind, i) => (
            <ScrollReveal key={ind.label} variant="up" delay={((i % 4) + 1) as 1|2|3|4}>
              <div className="hood-card bg-[#141414] rounded-2xl p-6 flex flex-col items-center gap-3 text-center">
                <span className="text-4xl">{ind.icon}</span>
                <span className="text-white/75 text-sm font-bold uppercase tracking-wide" style={{ fontFamily: "var(--font-barlow)" }}>
                  {ind.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CtaBanner() {
  return (
    <section className="py-24 bg-[#141414] border-y border-[#2E2E2E] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <ScrollReveal variant="scale">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight mb-6" style={{ fontFamily: "var(--font-barlow)" }}>
            Need Your Kitchen Hood Cleaned?
          </h2>
          <p className="text-white/55 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact The Hood Brothers today for a free quote and reliable commercial hood cleaning service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-white hover:bg-white/90 text-[#0D0D0D] font-black tracking-wider uppercase px-8 py-4 rounded-full text-sm transition-all duration-200 shadow-xl shadow-black/40 hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Get a Free Quote
            </a>
            <a
              href="tel:+10000000000"
              className="bg-transparent border border-white/30 hover:border-white/60 hover:bg-white/8 text-white font-black tracking-wider uppercase px-8 py-4 rounded-full text-sm transition-all duration-200"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Call Now
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function ContactForm() {
  const services = [
    "Commercial Kitchen Hood Cleaning",
    "Exhaust Fan Cleaning",
    "Grease Filter Cleaning",
    "Duct Cleaning",
    "Restaurant Deep Cleaning",
    "Maintenance Plan",
    "Other / Not Sure",
  ];

  const infoItems = [
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
      label: "Phone",
      content: <a href="tel:+10000000000" className="text-white font-semibold hover:text-white/70 transition-colors">(000) 000-0000</a>,
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      label: "Email",
      content: <a href="mailto:info@hoodbrothers.com" className="text-white font-semibold hover:text-white/70 transition-colors">info@hoodbrothers.com</a>,
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      label: "Service Area",
      content: <p className="text-white font-semibold">Metro Area & Surrounding Counties</p>,
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      label: "Business Hours",
      content: <><p className="text-white font-semibold">Mon–Fri: 7am–6pm</p><p className="text-white/50 text-sm">Sat–Sun: By Appointment</p></>,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal variant="left">
            <span className="inline-block text-white/45 text-xs font-bold tracking-widest uppercase mb-4">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white leading-tight mb-6" style={{ fontFamily: "var(--font-barlow)" }}>
              Request Your<br /><span className="text-white-gradient">Free Quote</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10">
              Fill out the form and we'll get back to you within 24 hours with a free, no-obligation quote for your kitchen.
            </p>
            <div className="flex flex-col gap-6">
              {infoItems.map((item, i) => (
                <ScrollReveal key={item.label} variant="left" delay={(i + 1) as 1|2|3|4}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/12 flex items-center justify-center text-white/55 shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/35 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                      {item.content}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="right" delay={1}>
            <form className="bg-[#141414] border border-[#2E2E2E] rounded-2xl p-8 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-white/45 text-xs uppercase tracking-widest font-semibold">Your Name <span className="text-white/60">*</span></label>
                  <input type="text" placeholder="John Smith"
                    className="bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#444] focus:border-white/35 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-colors duration-200" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/45 text-xs uppercase tracking-widest font-semibold">Business Name <span className="text-white/60">*</span></label>
                  <input type="text" placeholder="Restaurant or Business"
                    className="bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#444] focus:border-white/35 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-colors duration-200" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-white/45 text-xs uppercase tracking-widest font-semibold">Phone Number <span className="text-white/60">*</span></label>
                  <input type="tel" placeholder="(000) 000-0000"
                    className="bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#444] focus:border-white/35 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-colors duration-200" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/45 text-xs uppercase tracking-widest font-semibold">Email Address</label>
                  <input type="email" placeholder="you@business.com"
                    className="bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#444] focus:border-white/35 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-colors duration-200" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/45 text-xs uppercase tracking-widest font-semibold">Service Needed</label>
                <select className="bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#444] focus:border-white/35 rounded-xl px-4 py-3 text-white/60 text-sm outline-none transition-colors duration-200 appearance-none">
                  <option value="">Select a service...</option>
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-[#1A1A1A]">{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/45 text-xs uppercase tracking-widest font-semibold">Message / Details</label>
                <textarea rows={4} placeholder="Tell us about your kitchen setup, how often you need cleaning, or any other details..."
                  className="bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#444] focus:border-white/35 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-colors duration-200 resize-none" />
              </div>
              <button
                type="submit"
                className="bg-white hover:bg-white/90 text-[#0D0D0D] font-black tracking-wider uppercase px-8 py-4 rounded-full text-sm transition-all duration-200 shadow-lg shadow-black/30 hover:-translate-y-0.5 mt-2"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Request Free Quote
              </button>
              <p className="text-white/25 text-xs text-center">We typically respond within 24 hours. No obligation required.</p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const services = ["Hood Cleaning","Exhaust Fan Cleaning","Filter Cleaning","Duct Cleaning","Deep Cleaning","Maintenance Plans"];
  const links = [
    { label: "Services",       href: "#services" },
    { label: "Why Choose Us",  href: "#why-us" },
    { label: "Our Process",    href: "#process" },
    { label: "Before & After", href: "#gallery" },
    { label: "Industries",     href: "#industries" },
    { label: "Contact",        href: "#contact" },
  ];

  return (
    <footer className="bg-[#0D0D0D] border-t border-[#2E2E2E] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="The Hood Brothers" width={48} height={48}
                style={{ width: 48, height: "auto" }} className="invert brightness-200" />
              <div>
                <p className="text-white font-black tracking-widest uppercase text-sm" style={{ fontFamily: "var(--font-barlow)" }}>The Hood Brothers</p>
                <p className="text-white/40 text-[10px] tracking-widest uppercase font-semibold">Hood Cleaning Specialists</p>
              </div>
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-sm mb-6">
              Professional commercial kitchen hood cleaning services. Keeping restaurants, food trucks, and commercial kitchens clean, safe, and inspection-ready.
            </p>
            <div className="flex gap-3">
              <a href="tel:+10000000000"
                className="bg-white hover:bg-white/90 text-[#0D0D0D] text-xs font-black tracking-wider uppercase px-4 py-2.5 rounded-full transition-all duration-200"
                style={{ fontFamily: "var(--font-barlow)" }}>
                Call Now
              </a>
              <a href="#contact"
                className="bg-[#1A1A1A] border border-[#2E2E2E] hover:border-white/25 text-white/70 hover:text-white text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-full transition-all duration-200">
                Free Quote
              </a>
            </div>
          </div>

          <div>
            <p className="text-white text-xs font-black tracking-widest uppercase mb-5" style={{ fontFamily: "var(--font-barlow)" }}>Quick Links</p>
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.label}><a href={l.href} className="text-white/45 hover:text-white text-sm transition-colors duration-200">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-xs font-black tracking-widest uppercase mb-5" style={{ fontFamily: "var(--font-barlow)" }}>Services</p>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}><a href="#services" className="text-white/45 hover:text-white text-sm transition-colors duration-200">{s}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2E2E2E] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} The Hood Brothers. All rights reserved.</p>
          <p className="text-white/15 text-xs">Professional Commercial Kitchen Hood Cleaning</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <LogoIntro onComplete={() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setIntroComplete(true);
      }} />

      {/* Page content fades in once intro is dismissed */}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          visibility: introComplete ? "visible" : "hidden",
          transition: introComplete ? "opacity 0.6s ease" : "none",
        }}
      >
        <ScrollProgressBar />
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <Services />
          <WhyUs />
          <Process />
          <Gallery />
          <Industries />
          <CtaBanner />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
