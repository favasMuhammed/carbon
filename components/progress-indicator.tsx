"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  totalSections: number;
  activeSection: number;
}

export function ProgressIndicator({
  totalSections,
  activeSection,
}: ProgressIndicatorProps) {
  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center space-y-2">
      {Array.from({ length: totalSections }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-2 h-2 rounded-full transition-colors duration-300",
            index === activeSection ? "bg-blue-500" : "bg-gray-300"
          )}
        />
      ))}
    </div>
  );
}