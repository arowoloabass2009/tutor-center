"use client";
import Logo from "./Logo";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  step?: number;
  totalSteps?: number;
}

export default function AuthCard({
  children,
  title,
  subtitle,
  step,
  totalSteps,
}: AuthCardProps) {
  return (
    <div className="auth-bg">
      <div className="auth-blob auth-blob--tl" />
      <div className="auth-blob auth-blob--br" />

      <div className="auth-card animate-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="md" />
        </div>

        {/* Step progress */}
        {step && totalSteps && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
                Step {step} of {totalSteps}
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {Math.round((step / totalSteps) * 100)}% complete
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold mb-1.5" style={{ color: "var(--text)" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
