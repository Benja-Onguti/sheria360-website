'use client';

import React, { useEffect, useRef } from 'react';

/* ───────── Hero Section — Framer-like ───────── */
export function HeroSection() {
  const mediaRef = useRef(null);

  useEffect(() => {
    let mm = null;
    let mouseCleanup = null;

    const init = () => {
      const gsap = window.gsap;
      if (!gsap) { setTimeout(init, 100); return; }

      mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* Kill CSS fallback animation so GSAP takes full control */
        document.querySelectorAll('.s-hero-line').forEach(el => {
          el.style.animation = 'none';
        });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo('.s-hero-line',
          { y: 56, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.2, delay: 0.3 }
        )
        .fromTo('.s-hero-desc',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo('.s-hero-actions',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo('.s-hero-media-outer',
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2 },
          '-=0.3'
        );

        const mediaEl = mediaRef.current;
        if (mediaEl && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          const handleMouse = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 10;
            const y = (clientY / innerHeight - 0.5) * 10;
            gsap.to(mediaEl, {
              x: x,
              y: y,
              rotateX: -y * 0.3,
              rotateY: x * 0.3,
              duration: 1.5,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          };
          document.addEventListener('mousemove', handleMouse);
          mouseCleanup = () => document.removeEventListener('mousemove', handleMouse);
        }
      });
    };

    init();

    return () => {
      if (mm) mm.revert();
      if (mouseCleanup) mouseCleanup();
    };
  }, []);

  return (
    <div className="s-hero-area p-relative min-vh-100 d-flex align-items-start align-items-lg-center overflow-hidden">
      {/* Full-bleed background with radial mesh overlay */}
      <div className="s-hero-bg">
        <img src="assets/img/hero/hero-gradient-3.jpg" alt="" />
        <div className="s-hero-overlay"></div>
        {/* Framer-style dot grid */}
        <div className="s-hero-dot-grid"></div>
        {/* Ambient floating orbs */}
        <div className="s-hero-orbs">
          <div className="s-hero-orb s-hero-orb--1"></div>
          <div className="s-hero-orb s-hero-orb--2"></div>
          <div className="s-hero-orb s-hero-orb--3"></div>
        </div>
        {/* Noise texture overlay */}
        <div className="s-hero-noise"></div>
      </div>

      <div className="container position-relative z-index-3 pt-5 pt-lg-0">
        <div className="row align-items-center">
          {/* ── Text column ── */}
          <div className="col-12">
            <div className="s-hero-content text-center mx-auto">
              {/* Eyebrow pill badge */}
              <div className="s-hero-eyebrow">
                <span className="s-eyebadge">Intelligent Legal Technology</span>
              </div>

              {/* Heading — GSAP split lines */}
              <h1 className="s-hero-title">
                <span className="s-hero-line d-block">Legal Intelligence</span>
                <span className="s-hero-line d-block">Redesigned for <span>Modern Firms</span></span>
              </h1>

              {/* Description */}
              <p className="s-hero-desc mx-auto">
                Sheria360 combines contract analysis, practice management,
                and automated workflows — so your team can focus on
                practicing law, not managing software.
              </p>

              {/* CTAs — Button-in-Button pattern */}
              <div className="s-hero-actions justify-content-center">
                <a className="s-btn-primary" href="/contact">
                  <span className="s-btn-label">Request a Demo</span>
                  <span className="s-btn-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </a>
                <a className="s-btn-secondary" href="/solutions">
                  <span>Explore Solutions</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Device mockup — Framer-style floating below CTAs ── */}
        <div className="row mt-5 mt-lg-6">
          <div className="col-12">
            <div className="s-hero-media" ref={mediaRef}>
              <div className="s-hero-media-outer mx-auto">
                <div className="s-hero-media-inner">
                  <img src="assets/img/hero/hero-img-3-1.png" alt="Sheria360 platform interface" />
                </div>
              </div>
              {/* Floating accent elements */}
              <div className="s-hero-accent-1 d-none d-lg-block">
                <svg width="64" height="202" viewBox="0 0 64 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="s-line-draw"
                    d="M63.0029 7.94799C45.0715 -0.936415 14.5884 -8.38783 36.1059 32.8816C63.0029 84.4681 71.2089 85.3283 36.1059 75.8707C1.00293 66.4131 15.5915 92.2063 36.1059 118C56.6205 143.794 57.0764 169.587 28.3558 152.391C-0.364664 135.195 1.00293 144.653 28.3558 179.904C55.7087 215.155 22.4293 195.38 1.00293 196.24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className="s-hero-accent-2 d-none d-xl-block">
                <img src="assets/img/hero/hero-img-3-1-3.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Counter Section ───────── */
export function CounterSection() {
  const stats = [
    { end: 300, suffix: 'k+', label: 'Clients' },
    { end: 1000, suffix: '+', label: 'Law Practitioners' },
    { end: 10, suffix: '+', label: 'Top Companies' },
    { end: 12, suffix: '+', label: 'Years in Operation' },
  ];
  return (
    <div className="tp-counter-area tp-counter-space p-relative pb-140 reveal">
      <div className="tp-counter-shape-2">
        <img src="assets/img/counter/counter-shape-2.png" alt="" />
      </div>
      <div className="tp-counter-shape-3">
        <img src="assets/img/counter/counter-shape-1.png" alt="" />
      </div>
      <div className="tp-counter-shape-4 d-none d-sm-block">
        <img src="assets/img/counter/counter-shape-4.png" alt="" />
      </div>
      <div className="container">
        <div className="tp-counter-wrapper p-relative">
          <div className="row gx-0">
            {stats.map((s, i) => (
              <div className="col-xl-3 col-lg-3 col-md-3" key={i}>
                <div className="tp-counter-wrap d-flex justify-content-center">
                  <div className="tp-counter-item">
                    <h4>
                      <span
                        data-purecounter-duration="1"
                        data-purecounter-end={s.end}
                        className="purecounter"
                      >
                        0
                      </span>
                      {s.suffix.startsWith('k') ? <em>k</em> : null}
                      {s.suffix.replace('k', '')}
                    </h4>
                    <p>{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── AI Features Section ───────── */
export function AiFeaturesSection() {
  const features = [
    {
      title: 'AI Contract Review',
      desc: 'Automatically analyze contracts, identify risks, and suggest amendments in seconds',
    },
    {
      title: 'Legal Document Automation',
      desc: 'Generate complex legal documents with AI-powered templates and smart clauses',
    },
    {
      title: 'Intelligent Legal Research',
      desc: 'Access case law, precedents, and statutes with AI-enhanced search',
    },
    {
      title: 'Predictive Analytics',
      desc: 'Forecast case outcomes and litigation risks using machine learning',
    },
    {
      title: 'Smart Billing & Time Tracking',
      desc: 'AI-captured billable hours and automated invoice generation',
    },
  ];
  return (
    <div className="tp-ai-features-area pt-120 pb-120 bg-light reveal">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 reveal-left" style={{transitionDelay:'0.1s'}}>
            <div className="tp-ai-feature-thumb mb-50">
              <img src="assets/img/hero/hero-img-3-1.png" alt="AI Legal Assistant" className="img-fluid" />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 reveal-right" style={{transitionDelay:'0.3s'}}>
            <div className="tp-ai-feature-content">
              <h5 className="tp-subtitle mb-20">Powered by Advanced AI</h5>
              <h3 className="tp-section-title-3 mb-30">
                Meet <span>Sheria AI</span> - Your Intelligent Legal Assistant
              </h3>
              <p className="mb-25">
                Just like Lexzur&apos;s CONTRA and LEXA, Sheria AI leverages cutting-edge
                artificial intelligence to revolutionize your legal workflow:
              </p>
              <ul className="tp-feature-list mb-30">
                {features.map((f, i) => (
                  <li className="d-flex align-items-start mb-15" key={i}>
                    <i className="fas fa-check-circle text-primary mt-5 me-15"></i>
                    <div>
                      <strong>{f.title}:</strong> {f.desc}
                    </div>
                  </li>
                ))}
              </ul>
              <a className="tp-btn-blue-lg tp-btn-hover alt-color-black" href="/contact">
                <span>Request AI Demo</span>
                <b></b>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Service Section ───────── */
export function ServiceSection() {
  const services = [
    {
      icon: 'assets/img/service/sv-icon-3-1.png',
      badge: 'CONTRA-Style AI',
      title: 'AI-Powered Contract Lifecycle Management',
      large: true,
    },
    {
      svg: true,
      badge: 'AI Practice Management',
      title: 'Smart case management with AI-driven insights & automation.',
      link: '/services/details',
    },
    {
      svg: true,
      badge: 'AI Billing Intelligence',
      title: 'Smart time capture & AI-optimized billing workflows.',
      link: '/services/details',
    },
    {
      svg: true,
      badge: 'Smart Document AI',
      title: 'AI document generation & intelligent clause library.',
      link: '/services/details',
    },
    {
      svg: true,
      badge: 'Legal Analytics BI',
      title: 'Data-driven insights & predictive case analytics.',
      link: '/services/details',
    },
  ];
  return (
    <div className="tp-service-area pb-90 z-index reveal">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-service-section-wrapper mb-60 d-flex justify-content-between align-items-end">
              <h3 className="tp-section-title-3 wow tpfadeLeft" data-wow-duration=".9s" data-wow-delay=".3s">
                What Sheria360 <br /> Can Do For <span>You.</span>
              </h3>
              <a
                className="tp-btn-blue-lg tp-btn-hover mb-10 alt-color-black wow tpfadeRight"
                data-wow-duration=".9s"
                data-wow-delay=".5s"
                href="/features"
              >
                <span>See All Features</span>
                <b></b>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          {services.map((s, i) =>
            s.large ? (
              <div
                className="col-xl-8 wow tpfadeLeft"
                data-wow-duration=".9s"
                data-wow-delay=".5s"
                key={i}
              >
                <div
                  className="tp-service-3-item mb-30 p-relative z-index"
                  data-background="assets/img/service/service-3-bg.png"
                >
                  <div className="tp-service-3-icon">
                    <img src={s.icon} alt="" />
                  </div>
                  <div className="tp-service-3-content">
                    <span>{s.badge}</span>
                    <h4 className="tp-service-3-title-sm">
                      <a href="/services/details">{s.title}</a>
                    </h4>
                  </div>
                  <div className="tp-service-3-btn">
                    <a className="tp-btn-white-solid" href="/services/details">
                      Learn More
                    </a>
                  </div>
                  <div className="tp-service-3-shape">
                    <img src="assets/img/service/service-shape-3-1.png" alt="" />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`col-xl-4 col-lg-6 col-md-6 wow tpfadeUp`}
                data-wow-duration=".9s"
                data-wow-delay={`${0.5 + (i - 1) * 0.2}s`}
                key={i}
              >
                <div className="tp-service-sm-item mb-30 d-flex flex-column justify-content-between">
                  <div className="tp-service-sm-icon">
                    <svg width="66" height="53" viewBox="0 0 66 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.5323 8.40774C4.17742 10.9497 1 12.2206 1 13.8C1 15.3794 4.17742 16.6503 10.5323 19.1923L19.5194 22.7871C25.8742 25.329 29.0516 26.6 33 26.6C36.9484 26.6 40.1258 25.329 46.4806 22.7871L55.4677 19.1923C61.8226 16.6503 65 15.3794 65 13.8C65 12.2206 61.8226 10.9497 55.4677 8.40774L46.4806 4.8129C40.1258 2.27097 36.9484 1 33 1C29.9474 1 27.3556 1.7597 23.4 3.27909"
                        stroke="CurrentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M13.0516 20.2002L10.5323 21.2079C4.17742 23.7499 1 25.0208 1 26.6002C1 28.1795 4.17742 29.4505 10.5323 31.9925L19.5194 35.5873C25.8742 38.1292 29.0516 39.4002 33 39.4002C36.9484 39.4002 40.1258 38.1292 46.4806 35.5873L55.4677 31.9925C61.8226 29.4505 65 28.1795 65 26.6002C65 25.0208 61.8226 23.7499 55.4677 21.2079L52.9484 20.2002"
                        stroke="CurrentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M55.4677 44.7923C61.8226 42.2503 65 40.9794 65 39.4C65 37.8206 61.8226 36.5497 55.4677 34.0077L52.9484 33M13.0516 33L10.5323 34.0077C4.17742 36.5497 1 37.8206 1 39.4C1 40.9794 4.17742 42.2503 10.5323 44.7923L19.5194 48.3871C25.8742 50.929 29.0516 52.2 33 52.2C36.0526 52.2 38.6444 51.4403 42.6 49.9209"
                        stroke="CurrentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="tp-service-sm-content">
                    <span>{s.badge}</span>
                    <h3 className="tp-service-sm-title">
                      <a href={s.link}>{s.title}</a>
                    </h3>
                    <div className="tp-service-sm-link">
                      <a href={s.link}>
                        Learn more <i className="far fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────── Solutions Section ───────── */
export function SolutionsSection() {
  const solutions = [
    { icon: 'fa-building', label: 'Law Firms', desc: 'Streamline case management, billing, and client communications with AI-powered tools.' },
    { icon: 'fa-briefcase', label: 'In-House Legal', desc: 'Manage contracts, compliance, and corporate governance with intelligent automation.' },
    { icon: 'fa-university', label: 'Financial Services', desc: 'KYC compliance, regulatory reporting, and contract management for banking & finance.' },
    { icon: 'fa-users', label: 'HR & Procurement', desc: 'Automate employment contracts, vendor agreements, and compliance documentation.' },
  ];
  return (
    <div className="tp-solutions-area pt-120 pb-120 reveal">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="tp-section-title-box text-center mb-60">
              <h5 className="tp-subtitle text-primary mb-20">Tailored Solutions</h5>
              <h3 className="tp-section-title-3">
                Built for <span>Every Legal Team</span>
              </h3>
              <p className="mt-15">Whether you&apos;re a law firm, in-house legal team, or corporate department, Sheria360 adapts to your workflow.</p>
            </div>
          </div>
        </div>
        <div className="row">
          {solutions.map((s, i) => (
            <div className="col-xl-3 col-lg-3 col-md-6 mb-30" key={i}>
              <div className="tp-solution-item text-center p-30 border rounded hover-shadow">
                <div className="tp-solution-icon mb-20">
                  <i className={`fas ${s.icon} fa-3x text-primary`}></i>
                </div>
                <h5>{s.label}</h5>
                <p className="mt-15">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── Rated / Trusted Section ───────── */
export function RatedSection() {
  return (
    <div className="tp-rated-area fix p-relative reveal">
      <div className="tp-rated-bg pt-120" data-background="assets/img/rate/rated-bg.jpg">
        <div className="tp-rated-shape-1 d-none d-lg-block">
          <img src="assets/img/rate/rate-shape-1.png" alt="" />
        </div>
        <div className="tp-rated-shape-2 d-none d-sm-block">
          <img src="assets/img/rate/rate-shape-2.png" alt="" />
        </div>
        <div className="container z-index-6">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="tp-rated-title-box text-center mb-60">
                <div className="tp-rated-icon tp-title-anim">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n}>
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M17.6007 2.16169L20.2414 7.48279C20.6015 8.20839 21.5617 8.93399 22.3619 9.05493L27.1432 9.86114C30.204 10.3852 30.9242 12.6023 28.7236 14.8194L25.0027 18.5684C24.3825 19.1932 24.0224 20.4227 24.2224 21.3096L25.2828 25.9655C26.123 29.6339 24.1825 31.0649 20.9616 29.1501L16.4804 26.4694C15.6602 25.9857 14.3398 25.9857 13.5196 26.4694L9.0384 29.1501C5.81755 31.0649 3.87702 29.6339 4.71725 25.9655L5.77759 21.3096C5.97764 20.4429 5.61751 19.2134 4.99735 18.5684L1.27639 14.8194C-0.92419 12.6023 -0.204043 10.365 2.85677 9.86114L7.63806 9.05493C8.43828 8.91384 9.39853 8.20839 9.75862 7.48279L12.3993 2.16169C13.8197 -0.720565 16.1803 -0.720565 17.6007 2.16169Z"
                          fill="url(#tp-s)"
                          fillOpacity="0.3"
                        />
                      </svg>
                    </span>
                  ))}
                </div>
                <h5 className="tp-section-title-3 text-white pb-40">
                  Trusted by <span>500+</span>
                  <br /> <span>Law Firms &amp;</span> Legal Teams<span> Worldwide</span>
                </h5>
                <a className="tp-btn-blue-lg tp-btn-hover alt-color-white" href="/contact">
                  <span className="text-color-black">Request for Demo</span>
                  <b></b>
                </a>
              </div>
            </div>
          </div>
          <div className="author-rated-wrapper">
            <div className="row">
              {[
                { text: '"the interface is excellent"', logo: 'rate-logo-1.png' },
                { text: '"improvements in every release"', logo: 'rate-logo-2.png' },
                { text: '"the interface is excellent"', logo: 'rate-logo-3.png' },
              ].map((r, i) => (
                <div className="col-xl-4 col-lg-4 col-md-4" key={i}>
                  <div className="author-rated text-center">
                    <div className="author-rated-icon">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s}>
                          <i className="fas fa-star"></i>
                        </span>
                      ))}
                    </div>
                    <p>{r.text}</p>
                    <div className="author-rated-logo">
                      <img src={`assets/img/rate/${r.logo}`} alt="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="author-rated-big-img" data-parallax='{"y": 100, "smoothness": 30}'>
            <img src="assets/img/rate/rated-img.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Card Section ───────── */
export function CardSection() {
  return (
    <div className="tp-card-area tp-card-space pt-175 pb-185 reveal">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 reveal-left" style={{transitionDelay:'0.1s'}}>
            <div className="tp-card-thumb-wrapper p-relative">
              <div className="tp-card-main-img">
                <img src="assets/img/card/card-bg.png" alt="" />
              </div>
              <div className="tp-card-img-1">
                <img src="assets/img/card/card-shape-1.png" alt="" />
              </div>
              <div className="tp-card-img-2 d-none d-sm-block">
                <img src="assets/img/card/card-img-1.png" alt="" />
              </div>
              <div className="tp-card-img-3 d-none d-sm-block" data-parallax='{"x": 50, "smoothness": 30}'>
                <img src="assets/img/card/card-img-2.png" alt="" />
              </div>
              <div className="tp-card-img-4 d-none d-sm-block" data-parallax='{"x": -50, "smoothness": 30}'>
                <img src="assets/img/card/card-img-3.png" alt="" />
              </div>
              <div className="tp-card-img-5">
                <img src="assets/img/card/card-img-4.png" alt="" />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 reveal-right" style={{transitionDelay:'0.3s'}}>
            <div className="tp-card-title-box">
              <h3 className="tp-section-title-3 pb-15">
                <span>Complete Case Management</span> in One Platform
              </h3>
              <p>
                Streamline every aspect of your legal practice — from client intake and document
                drafting to billing and e-filing. Everything you need, all in one place.
              </p>
              <a className="tp-btn-blue-lg tp-btn-hover alt-color-black" href="/register">
                <span>Get Started Free</span>
                <b></b>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Sales Section ───────── */
export function SalesSection() {
  return (
    <div className="tp-sales-area tp-sales-space reveal">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 order-1 order-md-1 reveal-left" style={{transitionDelay:'0.1s'}}>
            <div className="tp-sales-section-box pb-20">
              <h3 className="tp-section-title-3 pb-15">
                Track <span>Billable Hours</span> in Real Time
              </h3>
              <p className="tp-title-anim">
                Centralize time tracking, automate invoicing, and get comprehensive insights
                into your firm&apos;s financial performance.
              </p>
            </div>
            <div className="tp-sales-feature">
              <ul>
                <li className="yellow-1">
                  <span>
                    <i className="far fa-check"></i> <em>No hidden fees.</em>
                  </span>
                </li>
                <li className="purple-2">
                  <span>
                    <i className="far fa-check"></i> <em>100% security. Guaranteed.</em>
                  </span>
                </li>
                <li className="green-3">
                  <span>
                    <i className="far fa-check"></i> <em>No training or maintenance needed</em>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 order-0 order-md-2 reveal-right" style={{transitionDelay:'0.3s'}}>
            <div className="tp-sales-img-wrapper p-relative text-end">
              <div className="tp-sales-main-thumb">
                <img src="assets/img/card/sale-1.png" alt="" />
              </div>
              <div className="tp-sales-sub-img-1">
                <img src="assets/img/card/sale-2.png" alt="" />
              </div>
              <div className="tp-sales-sub-img-2 d-none d-sm-block">
                <img src="assets/img/card/sale-3.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Testimonial Section ───────── */
export function TestimonialSection() {
  const testimonials = [
    {
      text: 'Sheria360 has transformed how we manage cases. The document drafting and hearing tracking features are invaluable.',
      name: 'John Kamau',
      role: 'Managing Partner, Kamau & Associates',
      img: 'testi-3-2.png',
    },
    {
      text: 'The billing module is a game-changer. We can now track time, generate invoices and measure performance effortlessly.',
      name: 'Sarah Okonjo',
      role: 'Founder & CEO Dulalix',
      img: 'testi-3-3.png',
    },
    {
      text: 'Softuch helps me keep a clean, organized ledger that I can access anywhere. The UI is so intuitive that anyone can use it.',
      name: 'Rudra Ghosh',
      role: 'Founder & CEO Dulalix',
      img: 'testi-3-4.png',
    },
    {
      text: 'We get absolutely raving reviews from our sales and customer support teams using close. Even our co-founders are very happy.',
      name: 'Rudra Ghosh',
      role: 'Founder & CEO Dulalix',
      img: 'testi-3-5.png',
    },
  ];
  return (
    <div className="tp-testimonial-area tp-testimonial-3-mlr pb-110 reveal">
      <div className="tp-testimonial-3-bg pt-110 fix" data-background="assets/img/testimonial/testi-bg-3-1.png">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tp-testimonial-3-section-box d-flex justify-content-between align-items-end mb-60">
                <h3 className="tp-section-title-3 text-white">
                  <span>Kind Words</span> <br /> from our Customers
                </h3>
                <div className="tp-test-arrow d-flex pb-10"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-testimonial-3-slider-wrapper">
          <div className="container-fluid g-0">
            <div className="row g-0">
              <div className="col-12">
                <div className="tp-testimonial-3-slider-active">
                  {testimonials.map((t, i) => (
                    <div className="tp-testimonial-wrapper" key={i}>
                      <div className="tp-testimonial-3-item d-flex justify-content-between align-items-center">
                        <div className="tp-testimonial-3-content-box">
                          <div className="tp-testimonial-3-review">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <span key={s}>
                                <i className="fas fa-star"></i>
                              </span>
                            ))}
                          </div>
                          <p>{t.text}</p>
                          <div className="tp-testimonial-3-author-info d-flex align-items-center">
                            <div className="tp-testimonial-3-sm-thumb d-md-none">
                              <img src={`assets/img/testimonial/${t.img}`} alt="" />
                            </div>
                            <div>
                              <h5>{t.name}</h5>
                              <span>{t.role}</span>
                            </div>
                          </div>
                        </div>
                        <div className="tp-testimonial-3-thumb d-none d-md-block">
                          <img src={`assets/img/testimonial/${t.img}`} alt="" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Integration Section ───────── */
export function IntegrationSection() {
  return (
    <div className="tp-integration-area pb-110 tp-integration-mlr reveal">
      <div className="container">
        <div className="row align-items-end tp-integration-section-space">
          <div className="col-xl-6 col-lg-8 reveal-left" style={{transitionDelay:'0.1s'}}>
            <div className="tp-integration-section-box">
              <h5 className="tp-integration-subtitle">Integration</h5>
              <h3 className="tp-section-title-3">
                Integrated with Your <span>Favourite Apps</span>
              </h3>
            </div>
          </div>
          <div className="col-xl-6 col-lg-4 reveal-right" style={{transitionDelay:'0.3s'}}>
            <div className="tp-integration-btn text-lg-end text-start">
              <a className="tp-btn-blue-lg tp-btn-hover alt-color-black" href="/integrations">
                <span>See all Integrations</span>
                <b></b>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="tp-integration-slider-wrapper pt-50 pb-50" data-background="assets/img/integration/integration-bg.jpg">
        <div className="tp-integration-slider-active">
          {[1, 2, 3, 4].map((n) => (
            <div className="tp-integration-slider-main" key={n}>
              <div className="tp-integration-slider-item">
                <img src={`assets/img/integration/integration-${n}.png`} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className="tp-integration-slider-active-2 carousel-rtl" dir="rtl">
          {[5, 6, 7, 8].map((n) => (
            <div className="tp-integration-slider-main" key={n}>
              <div className="tp-integration-slider-item">
                <img src={`assets/img/integration/integration-${n}.png`} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── Blog Section ───────── */
export function BlogSection() {
  const posts = [
    {
      img: 'blog-1.jpg',
      category: 'Crm Software',
      color: 'category-color-1',
      date: '28 April, 2023',
      title: 'How Chatbots Can Help You Drive More Sales',
      author: 'Hilary Ouse',
      role: 'Founder & CEO Dulalix',
      avatar: 'blog-avata-1.png',
    },
    {
      img: 'blog-2.jpg',
      category: 'Sales Tools',
      color: 'category-color-2',
      date: '28 April, 2023',
      title: '6 Tips for Personal Selling that Guarantee Success in 2023',
      author: 'Rudra Ghosh',
      role: 'Founder & CEO Dulalix',
      avatar: 'blog-avata-2.png',
    },
    {
      img: 'blog-3.jpg',
      category: 'Sales Management',
      color: 'category-color-3',
      date: '28 April, 2023',
      title: '8 Things About Web Design Your Boss Wants To Know',
      author: 'Penny Tool',
      role: 'Founder & CEO Dulalix',
      avatar: 'blog-avata-3.png',
    },
  ];
  return (
    <div className="tp-blog-area pb-80 reveal">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5">
            <div className="tp-blog-section-box text-center mb-50">
              <h3 className="tp-section-title-3">
                Our Latest <span>News and Articles</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          {posts.map((p, i) => (
            <div className="col-xl-4 col-lg-4 col-md-6 mb-60" key={i}>
              <div className="tp-blog-item">
                <div className="tp-blog-thumb fix">
                  <a href="/blog-details">
                    <img src={`assets/img/blog/${p.img}`} alt="" />
                  </a>
                </div>
                <div className="tp-blog-meta d-flex align-items-center">
                  <div className={`tp-blog-category ${p.color}`}>
                    <span>{p.category}</span>
                  </div>
                  <div className="tp-blog-date">
                    <span>{p.date}</span>
                  </div>
                </div>
                <div className="tp-blog-title-box">
                  <a className="tp-blog-title-sm" href="/blog-details">
                    {p.title}
                  </a>
                </div>
                <div className="tp-blog-author-info-box d-flex align-items-center">
                  <div className="tp-blog-avata">
                    <img src={`assets/img/blog/${p.avatar}`} alt="" />
                  </div>
                  <div className="tp-blog-author-info">
                    <h5>{p.author}</h5>
                    <span>{p.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── CTA / Browser Section ───────── */
export function BrowserCtaSection() {
  return (
    <div className="footer-bottom-content tp-browser-bg-shape reveal" data-background="assets/img/footer/overly.png">
      <div className="tp-browser-details-area pt-110 pb-30 p-relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-9 col-lg-9">
              <div className="tp-browser-section-box d-flex justify-content-between align-items-center mb-30">
                <h3 className="tp-section-title-3">
                  Get Started with Sheria360. <br />{' '}
                  <span>Transform Your Law Practice Today.</span>
                </h3>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3">
              <div className="tp-browser-btn text-lg-end text-start mb-40">
                  <a className="tp-btn-blue-lg tp-btn-hover" href="/register">
                  <span>Start Free Trial</span>
                  <b></b>
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="tp-hero-browser-wrapper footer-browser-item d-flex align-items-center">
                {['Windows', 'Firefox', 'Chrome', 'macOS', 'Linux'].map((name, i) => (
                  <div className="tp-hero-browser-item" key={name}>
                    <a href="#">
                      <img src={`assets/img/hero/browser-icon-${i + 1}.png`} alt="" />
                    </a>
                    <p className={name === 'Linux' ? 'd-none d-sm-block' : ''}>{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
