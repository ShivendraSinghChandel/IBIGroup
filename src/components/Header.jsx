import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import FeaturedWork from './FeaturedWork';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const centerLogoRef = useRef(null);
  const interfaceRef = useRef(null);
  const videoRef = useRef(null);
  const bgRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Hide elements initially
    gsap.set(interfaceRef.current, { autoAlpha: 0 });
    gsap.set(videoRef.current, { autoAlpha: 0 });
    
    // Create timeline for sequenced animations
    const tl = gsap.timeline();
    
    // Logo animation - from small to 2XL
    tl.fromTo(centerLogoRef.current, 
      { 
        scale: 0.1, 
        opacity: 0,
        transformOrigin: 'center center' 
      },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1.5, 
        ease: "power3.out" 
      }
    )
    // Hold for a moment to let users see the logo
    .to(centerLogoRef.current, {
      opacity: 1,
      duration: 0.5
    })
    // Fade out the center logo
    .to(centerLogoRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    })
    // Fade in video background and all UI elements simultaneously
    .to([videoRef.current, interfaceRef.current], {
      autoAlpha: 1,
      duration: 0.8,
      ease: "power2.inOut"
    })
    // Fade out black background
    .to(bgRef.current, {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.inOut"
    }, "-=0.5"); // Start at the same time as the UI elements appear
  }, []);

  // Effect for mobile menu animation
  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.to(menuRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(menuRef.current, {
          x: "100%",
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [isMenuOpen]);

  return (
    <>
    <div className="relative h-screen w-full overflow-hidden">
      {/* Black background overlay */}
      <div 
        ref={bgRef} 
        className="absolute top-0 left-0 w-full h-full bg-black z-10"
      ></div>
      
      {/* Center Logo for initial animation */}
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-50">
        <div ref={centerLogoRef} className="text-white">
          <img src="/header-new-logo.png" alt="Logo" />
        </div>
      </div>
      
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/Without-text.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* All UI elements container */}
      <div ref={interfaceRef} className="z-20">
        {/* Top Right Navbar - Desktop */}
        <div className="hidden md:block fixed top-4 right-4 z-20 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-black">
          <ul className="flex gap-6 text-lg font-bold">
            <li>Home</li>
            <li>About</li>
            <li>Service</li>
            <li>Project</li>
            <li>Career</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden absolute top-4 right-4 z-30 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl p-2"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div 
          ref={menuRef}
          className="md:hidden fixed top-0 right-0 w-64 h-full bg-black/90 backdrop-blur-md z-40 transform translate-x-full opacity-0"
        >
          {/* Close button inside the menu */}
          <button 
            onClick={toggleMenu} 
            className="fixed top-4 right-4 text-white p-2"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="pt-16 px-6">
            <ul className="flex flex-col gap-6 text-lg font-bold text-white">
              <li><a href="#" className="block py-2" onClick={toggleMenu}>Home</a></li>
              <li><a href="#" className="block py-2" onClick={toggleMenu}>About</a></li>
              <li><a href="#" className="block py-2" onClick={toggleMenu}>Service</a></li>
              <li><a href="#" className="block py-2" onClick={toggleMenu}>Project</a></li>
              <li><a href="#" className="block py-2" onClick={toggleMenu}>Career</a></li>
              <li><a href="#" className="block py-2" onClick={toggleMenu}>Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Top Left Logo */}
        <div className="fixed top-4 left-4 z-20">
          {/* <img src="/header-new-logo.png" alt="Logo" className="h-20 md:h-40 w-auto" /> */}
          <h1 className='text-5xl font-extrabold text-white'>IBI GROUP</h1>
        </div>

        {/* Bottom Center Title (Hero) */}
        <div className="absolute bottom-10 left-6 transform translate-x-1 z-20 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Welcome to <br /> Our World</h1>
        </div>

        {/* Bottom Right Menu Content - Hide on mobile */}
        <div className="hidden md:block absolute bottom-8 right-4 z-20 text-white">
          <ul className="text-md">
            <ul className="flex justify-between border-b-1 gap-40">
              <li>New york</li>
              <li>12:35</li>
            </ul>
            <ul className="flex justify-between border-b-1 gap-40">
              <li>New york</li>
              <li>12:35</li>
            </ul>
            <ul className="flex justify-between border-b-1 gap-40">
              <li>New york</li>
              <li>12:35</li>
            </ul>
            <ul className="flex justify-between border-b-1 gap-40">
              <li>New york</li>
              <li>12:35</li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default Header;