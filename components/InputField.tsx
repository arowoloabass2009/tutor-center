"use client";
import { useState, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  error?: string;
  hint?: string;
}

export default function InputField({
  label,
  icon,
  error,
  hint,
  type = "text",
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const inputClass = [
    "field__input",
    icon ? "field__input--icon" : "",
    isPassword ? "field__input--pw" : "",
    error ? "field__input--error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <div className="field__wrap">
        {icon && <span className="field__icon">{icon}</span>}
        <input type={inputType} className={inputClass} {...props} />
        {isPassword && (
          <button
            type="button"
            className="field__toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {error && <p className="field__error">{error}</p>}
      {hint && !error && <p className="field__hint">{hint}</p>}
    </div>
  );
}
