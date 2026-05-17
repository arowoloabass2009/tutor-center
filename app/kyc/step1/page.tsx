"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import InputField from "@/components/InputField";
import { supabase } from "@/lib/supabase";

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "Nigeria", "Ghana", "Kenya", "South Africa", "India", "Other",
];

const GENDERS = [
  { value: "Male",   icon: "♂" },
  { value: "Female", icon: "♀" },
  { value: "Other",  icon: "⚧" },
];

export default function KYCStep1() {
  const router = useRouter();
  const [form, setForm] = useState({
    dob: "", phone: "", country: "", city: "", address: "", gender: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.gender)  e.gender  = "Please select your gender";
    if (!form.dob)     e.dob     = "Date of birth is required";
    if (!form.phone)   e.phone   = "Phone number is required";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.country) e.country = "Country is required";
    if (!form.city)    e.city    = "City is required";
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setServerError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { error } = await supabase.from("kyc_personal").upsert({
      user_id: user.id,
      dob: form.dob,
      phone: form.phone,
      country: form.country,
      city: form.city,
      address: form.address || null,
      gender: form.gender,
    }, { onConflict: "user_id" });

    setLoading(false);
    if (error) { setServerError(error.message); return; }
    router.push("/kyc/step2");
  };

  return (
    <AuthCard
      title="Personal information"
      subtitle="Help us verify your identity and personalise your experience"
      step={1}
      totalSteps={2}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {serverError && <div className="alert alert--error">{serverError}</div>}

        {/* Gender */}
        <div className="field">
          <span className="field__label">Gender</span>
          <div className="grid grid-cols-3 gap-2">
            {GENDERS.map((g) => (
              <button
                key={g.value}
                type="button"
                className={`option-card${form.gender === g.value ? " option-card--active" : ""}`}
                onClick={() => setForm({ ...form, gender: g.value })}
              >
                <span className="text-lg">{g.icon}</span>
                {g.value}
              </button>
            ))}
          </div>
          {errors.gender && <p className="field__error">{errors.gender}</p>}
        </div>

        <InputField label="Date of birth" type="date" icon="📅"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
          error={errors.dob} />

        <InputField label="Phone number" type="tel" placeholder="+1 (555) 000-0000" icon="📞"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          error={errors.phone} />

        {/* Country select */}
        <div className="field">
          <label className="field__label">Country</label>
          <select
            className={`field__input field__input--icon${errors.country ? " field__input--error" : ""}`}
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            style={{ paddingLeft: "42px" }}
          >
            <option value="">Select your country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="field__icon" style={{ pointerEvents: "none" }}>🌍</span>
          {errors.country && <p className="field__error">{errors.country}</p>}
        </div>

        <InputField label="City" placeholder="Your city" icon="🏙"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          error={errors.city} />

        <InputField label="Address (optional)" placeholder="Street address" icon="🏠"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })} />

        <button type="submit" className="btn-primary w-full mt-2" disabled={loading}>
          {loading
            ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving…</>
            : "Continue to Step 2 →"}
        </button>
      </form>
    </AuthCard>
  );
}
