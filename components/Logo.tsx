"use client";
import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "dark", size = "md" }: LogoProps) {
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-3xl" };
  const iconSizes = { sm: "w-7 h-7 text-sm", md: "w-9 h-9 text-base", lg: "w-11 h-11 text-lg" };

  return (
    <Link href="/" className="flex items-center gap-2.5 no-underline group">
      <div
        className={`${iconSizes[size]} rounded-xl flex items-center justify-center font-black text-white shadow-lg group-hover:scale-105 transition-transform`}
        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
      >
        T
      </div>
      <span
        className={`${sizes[size]} font-bold tracking-tight`}
        style={{ color: variant === "light" ? "white" : "var(--text)" }}
      >
        Tutor<span style={{ color: "var(--primary)" }}>Center</span>
      </span>
    </Link>
  );
}
