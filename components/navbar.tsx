"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useLowCarbon } from "@/context/low-carbon-context";

const sections = ["hero", "about", "designs", "ads", "blog", "contact"];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const { isLowCarbon, toggleLowCarbon } = useLowCarbon();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about-us" },
    { label: "Carbon Designs", href: "/carbon-design" },
    { label: "Carbon Ads", href: "/carbon-ads" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center">
      <div className="md:max-w-7xl w-full md:bg-[#98CAE4]/70 md:mt-6 px-2 py-1 rounded-full relative bg-transparent">
        <div className="flex items-center justify-between bg-white/30 md:bg-transparent rounded-full md:p-0 p-2 backdrop-blur-md md:backdrop-blur-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/carbonandwhalelogo.png"
              alt="Carbon & Whale Logo"
              width={60}
              height={60}
              className="mx-4"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-end gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                active={
                  link.href.startsWith("#")
                    ? activeSection === link.href.slice(1)
                    : pathname === link.href
                }
                onClick={() => {}}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="bg-[#0B1120] text-white p-4 rounded-full hover:bg-[#0B1120]/90 flex items-center gap-2 ml-40">
              <span className="text-sm">Go Low Carbon</span>
              <Switch checked={isLowCarbon} onCheckedChange={toggleLowCarbon} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="absolute right-4 md:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={34} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="left-0 w-full bg-white shadow-md rounded-lg mt-2 p-6 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  active={
                    link.href.startsWith("#")
                      ? activeSection === link.href.slice(1)
                      : pathname === link.href
                  }
                  onClick={() => {
                    setIsMenuOpen(false); // close mobile menu
                  }}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="bg-[#0B1120] text-white px-4 py-4 rounded-full hover:bg-[#0B1120]/90 flex items-center gap-2 max-w-fit">
                <span className="text-sm">Go Low Carbon</span>
                <Switch
                  checked={isLowCarbon}
                  onCheckedChange={toggleLowCarbon}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// NavLink Component
function NavLink({
  href,
  active,
  children,
  onClick,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const isAnchorLink = href.startsWith("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(); // Trigger callback to close menu

    if (isAnchorLink) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
      }
    }
  };

  const baseStyles = "text-sm transition-colors hover:text-primary";
  const activeStyles = "text-primary font-bold underline decoration-white";
  const inactiveStyles = "text-black";

  return isAnchorLink ? (
    <a
      href={href}
      onClick={handleClick}
      className={`${baseStyles} ${active ? activeStyles : inactiveStyles}`}
    >
      {children}
    </a>
  ) : (
    <Link href={href} passHref legacyBehavior>
      <a
        onClick={handleClick}
        className={`${baseStyles} ${active ? activeStyles : inactiveStyles}`}
      >
        {children}
      </a>
    </Link>
  );
}
