"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { ProgressIndicator } from "@/components/progress-indicator";

interface SectionManagerProps {
  children: React.ReactNode;
  className?: string;
  circular?: boolean;
}

export function SectionManager({
  children,
  className,
  circular = true,
}: SectionManagerProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sections = React.Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);

  const navigateToSection = useCallback(
    (direction: 1 | -1) => {
      if (isTransitioning || isMobile) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 600) return;
      lastScrollTime.current = now;

      let nextSection = activeSection + direction;

      if (circular) {
        nextSection = (nextSection + sections.length) % sections.length;
      } else {
        if (nextSection < 0 || nextSection >= sections.length) return;
      }

      setIsTransitioning(true);
      setActiveSection(nextSection);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    },
    [activeSection, isTransitioning, sections.length, circular, isMobile]
  );

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (isTransitioning || isMobile) return;
      e.preventDefault();
      navigateToSection(e.deltaY > 0 ? 1 : -1);
    },
    [navigateToSection, isTransitioning, isMobile]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isMobile) return;
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        navigateToSection(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        navigateToSection(-1);
      }
    },
    [navigateToSection, isMobile]
  );

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 1024);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    if (!isMobile) {
      window.addEventListener("wheel", handleScroll, { passive: false });
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("resize", updateIsMobile);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobile, handleScroll, handleKeyDown]);

  return (
    <div
      ref={containerRef}
      className={cn(
        isMobile ? "relative w-full" : "fixed inset-0 overflow-hidden",
        className
      )}
    >
      {!isMobile && (
        <ProgressIndicator
          totalSections={sections.length}
          activeSection={activeSection}
        />
      )}
      
      {isMobile ? (
        // Mobile: Render sections normally in the document flow
        <div className="w-full">
      {sections.map((child, index) => (
            <div key={index} className="w-full">
              {child}
            </div>
          ))}
        </div>
      ) : (
        // Desktop: Render sections with the section-based navigation
        React.Children.map(children, (child, index) => {
          // Calculate transition classes based on circular navigation
          let transitionClass = "";

          if (index === activeSection) {
            transitionClass = "translate-y-0 opacity-100";
          } else if (circular) {
            // For circular navigation, we need to handle the special case when going from last to first or first to last
            if (
              (activeSection === 0 && index === sections.length - 1) ||
              (activeSection === sections.length - 1 && index === 0)
            ) {
              transitionClass =
                activeSection === 0
                  ? "-translate-y-full opacity-0"
                  : "translate-y-full opacity-0";
            } else {
              transitionClass =
                index > activeSection
                  ? "translate-y-full opacity-0"
                  : "-translate-y-full opacity-0";
            }
          } else {
            // Standard non-circular transitions
            transitionClass =
              index > activeSection
                ? "translate-y-full opacity-0"
                : "-translate-y-full opacity-0";
          }

          return (
        <div
          key={index}
          className={cn(
            "absolute inset-0 w-full transition-transform duration-1000 ease-in-out",
            transitionClass
          )}
          style={{
            zIndex: index === activeSection ? 1 : 0,
            pointerEvents: index === activeSection ? "auto" : "none",
          }}
        >
          {child}
        </div>
          );
        })
      )}
    </div>
  );
}