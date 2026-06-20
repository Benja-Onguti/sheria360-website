'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '#',
    dropdown: [
      { label: 'Sheria Mkataba', href: '/sheria-mkataba' },
      { label: 'LEMIS', href: '/lemis' },
      { label: 'Sheria AI', href: '/features' },
    ],
  },
  {
    label: 'Solutions',
    href: '#',
    dropdown: [
      { label: 'All Solutions', href: '/solutions' },
      { label: 'In-House Legal', href: '/solutions#in-house' },
      { label: 'Law Firms', href: '/solutions#law-firms' },
      { label: 'Procurement', href: '/solutions#procurement' },
      { label: 'HR Teams', href: '/solutions#hr' },
      { label: 'Finance', href: '/solutions#finance' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Resources',
    href: '#',
    dropdown: [
      { label: 'Blog', href: '/blog' },
      { label: 'Documentation', href: 'https://docs.sheria360.com/', external: true },
      { label: 'Training', href: '/training' },
      { label: 'Marketplace', href: '/marketplace' },
    ],
  },
  {
    label: 'Company',
    href: '#',
    dropdown: [
      { label: 'About', href: '/about-sheria' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQs', href: '/faq' },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('http') || href === '#') return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="tp-header-height">
      <div
        id="header-sticky"
        className="header-bottom__area header__space header-sticky-bg-2 header-bottom__transparent z-index-5"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4 col-6">
              <div className="header-bottom__logo">
                <a href="/">
                  <img
                    src="assets/img/logo/logo-black.png?v=2"
                    alt="Sheria360 Logo"
                    style={{ maxHeight: 35 }}
                  />
                </a>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7 d-none d-lg-block">
              <div className="header-bottom__main-menu header-bottom__main-menu-3">
                <nav className="main-menu-nav">
                  <ul className="d-flex">
                      {navItems.map((item) =>
                        item.dropdown ? (
                          <li key={item.label} className={`me-20 has-dropdown`}>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              {item.label} <i className="fas fa-chevron-down"></i>
                            </a>
                          <ul className="submenu">
                            {item.dropdown.map((sub) =>
                              sub.external ? (
                                <li key={sub.label}>
                                  <a href={sub.href} target="_blank" rel="noopener noreferrer">
                                    {sub.label}
                                  </a>
                                </li>
                              ) : (
                                <li key={sub.label}>
                                  <Link href={sub.href}>{sub.label}</Link>
                                </li>
                              )
                            )}
                          </ul>
                        </li>
                      ) : (
                        <li key={item.label} className="me-20">
                          <Link
                            href={item.href}
                            className={isActive(item.href) ? 'active' : ''}
                          >
                            {item.label}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-6">
              <div className="header-bottom__right d-flex align-items-center justify-content-end">
                <div className="header__action-btn d-flex align-items-center">
                  <a className="tp-btn-border tp-btn-hover me-10" href="/sign-in">
                    <span>Log In</span>
                    <b></b>
                  </a>
                  <a className="tp-btn-blue-sm tp-btn-hover alt-color-black" href="/register">
                    <span>Try It Free</span>
                    <b></b>
                  </a>
                    <a
                      className="header-bottom__bar tp-menu-bar d-lg-none ms-10"
                      href="#"
                      onClick={(e) => { e.preventDefault(); setMobileOpen(!mobileOpen); }}
                    >
                    <i className="fal fa-bars"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offcanvas mobile menu */}
      <div className="tpoffcanvas-area">
        <div className={`tpoffcanvas ${mobileOpen ? 'opened' : ''}`}>
          <div className="tpoffcanvas__close-btn">
            <button className="close-btn" onClick={() => setMobileOpen(false)}>
              <i className="fal fa-times"></i>
            </button>
          </div>
          <div className="tpoffcanvas__logo text-center">
            <a href="/">
              <img src="assets/img/logo/logo-white.png?v=2" alt="Sheria360" />
            </a>
          </div>
          <div className="mobile-menu">
            <nav className="mobile-nav-inner">
              <ul>
                {navItems.map((item) =>
                  item.dropdown ? (
                    <li key={item.label} className="has-dropdown">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        {item.label} <i className="fas fa-chevron-down"></i>
                      </a>
                      <ul className="submenu">
                        {item.dropdown.map((sub) => (
                          <li key={sub.label}>
                            <a href={sub.href} onClick={() => setMobileOpen(false)}>
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <a href={item.href} onClick={() => setMobileOpen(false)}>
                        {item.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
          <div className="tpoffcanvas__instagram text-center">
            <div className="tpoffcanvas__instagram-title">
              <h4>instagram</h4>
            </div>
            <a href="#">
              <img src="assets/img/project/project-inner-4.jpg" alt="" />
            </a>
            <a href="#">
              <img src="assets/img/project/project-inner-5.jpg" alt="" />
            </a>
            <a href="#">
              <img src="assets/img/project/project-inner-6.jpg" alt="" />
            </a>
            <a href="#">
              <img src="assets/img/project/project-inner-7.jpg" alt="" />
            </a>
          </div>
          <div className="tpoffcanvas__info text-center">
            <h4 className="offcanva-title">we are here</h4>
            <a
              href="https://www.google.com/maps/@23.506657,90.3643447,7z"
              target="_blank"
              rel="noopener noreferrer"
            >
              27 Division St, New York,
              <br />
              NY 10002, USA
            </a>
          </div>
          <div className="tpoffcanvas__social">
            <div className="social-icon text-center">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a href="#">
                <i className="fab fa-dribbble"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={`body-overlay ${mobileOpen ? 'apply' : ''}`} onClick={() => setMobileOpen(false)}></div>
    </header>
  );
}
