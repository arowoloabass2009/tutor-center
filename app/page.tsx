"use client";
import Link from "next/link";
import Logo from "@/components/Logo";

const stats = [
  { value: "50K+", label: "Active Students" },
  { value: "2K+", label: "Expert Tutors" },
  { value: "200+", label: "Subjects" },
  { value: "4.9★", label: "Average Rating" },
];

const features = [
  {
    icon: "🎯",
    title: "Personalized Learning",
    desc: "AI-matched tutors tailored to your learning style, pace, and goals.",
    color: "#eef2ff",
  },
  {
    icon: "📅",
    title: "Flexible Scheduling",
    desc: "Book sessions anytime — mornings, evenings, or weekends. You decide.",
    color: "#f0fdf4",
  },
  {
    icon: "🏆",
    title: "Certified Experts",
    desc: "Every tutor is vetted, background-checked, and highly rated.",
    color: "#fffbeb",
  },
  {
    icon: "💬",
    title: "Live & Recorded",
    desc: "Attend live sessions or revisit recordings at your own pace.",
    color: "#74b5e1ff",
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    desc: "Visual dashboards to monitor your improvement over time.",
    color: "#fdf4ff",
  },
  {
    icon: "🔒",
    title: "Safe & Secure",
    desc: "End-to-end encrypted sessions with full privacy protection.",
    color: "#fff1f2",
  },
];

const subjects = [
  { label: "Mathematics", icon: "📐" },
  { label: "Physics", icon: "⚛️" },
  { label: "Chemistry", icon: "🧪" },
  { label: "Biology", icon: "🧬" },
  { label: "English", icon: "📖" },
  { label: "History", icon: "🏛️" },
  { label: "Coding", icon: "💻" },
  { label: "Music", icon: "🎵" },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "High School Student",
    avatar: "S",
    text: "My math grade went from a C to an A in just 6 weeks. The tutor made everything click.",
    rating: 5,
  },
  {
    name: "James K.",
    role: "University Student",
    avatar: "J",
    text: "Flexible scheduling is a game changer. I can book sessions around my part-time job.",
    rating: 5,
  },
  {
    name: "Priya L.",
    role: "Working Professional",
    avatar: "P",
    text: "I learned Python from scratch in 3 months. The coding tutors here are genuinely world-class.",
    rating: 5,
  },
];

export default function SplashPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Navbar */}
      <nav
        className="glass sticky top-0 z-50 px-6 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo size="md" />
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Subjects", "Tutors", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium transition-colors hover:text-indigo-600"
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-secondary" style={{ padding: "9px 20px", fontSize: "14px" }}>
              Log In
            </Link>
            <Link href="/signup" className="btn-primary" style={{ padding: "9px 20px", fontSize: "14px" }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3730a3 0%, #4f46e5 40%, #7c3aed 70%, #0891b2 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }} />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }} />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full opacity-10"
            style={{ background: "white" }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in"
                style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                🎓 Trusted by 50,000+ learners worldwide
              </div>
              <h1
                className="text-5xl md:text-6xl font-black leading-tight mb-6 animate-fade-in-up"
                style={{ color: "white", letterSpacing: "-0.02em" }}
              >
                Learn Anything,{" "}
                <span style={{ color: "#fbbf24" }}>Anytime</span>,{" "}
                <br />From the Best
              </h1>
              <p
                className="text-lg mb-10 animate-fade-in-up delay-100"
                style={{ color: "rgba(255,255,255,0.82)", lineHeight: "1.75", maxWidth: "480px" }}
              >
                Connect with expert tutors across 200+ subjects. Personalized 1-on-1 sessions
                designed to help you achieve your academic and professional goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
                <Link href="/signup" className="btn-primary"
                  style={{ background: "white", color: "#4f46e5", fontSize: "16px", padding: "15px 32px", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}>
                  Start Learning Free →
                </Link>
                <Link href="/login" className="btn-outline-white" style={{ fontSize: "16px", padding: "15px 32px" }}>
                  I&apos;m a Tutor
                </Link>
              </div>
            </div>

            {/* Right: stats card cluster */}
            <div className="hidden md:flex flex-col gap-4 animate-fade-in-up delay-300">
              <div className="glass rounded-3xl p-6" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center py-4 px-2 rounded-2xl"
                      style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="text-3xl font-black text-white">{stat.value}</div>
                      <div className="text-xs mt-1 font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {["A", "B", "C", "D"].map((l) => (
                        <div key={l} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: "linear-gradient(135deg,#818cf8,#4f46e5)", border: "2px solid rgba(255,255,255,0.3)" }}>
                          {l}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                      <span className="font-semibold text-white">1,200+</span> sessions booked today
                    </p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-2xl px-5 py-4 flex items-center gap-4"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                <span className="text-3xl">🏅</span>
                <div>
                  <p className="text-white font-semibold text-sm">Top-rated platform 2025</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>EdTech Awards — Best Online Tutoring</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile stats row */}
          <div className="mt-12 grid grid-cols-2 md:hidden gap-3 animate-fade-in-up delay-300">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4 text-center"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-16 overflow-hidden" style={{ marginBottom: "-2px" }}>
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 64L1440 64L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 64Z"
              fill="var(--surface)" />
          </svg>
        </div>
      </section>

      {/* Subjects */}
      <section id="subjects" className="py-20 px-6" style={{ background: "var(--surface)" }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--primary)" }}>
            Popular Subjects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: "var(--text)" }}>
            Whatever you want to learn, we&apos;ve got it
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <div
                key={subject.label}
                className="card p-5 flex flex-col items-center gap-3 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ borderRadius: "16px" }}
              >
                <span className="text-3xl">{subject.icon}</span>
                <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{subject.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--primary)" }}>
              Why TutorCenter
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text)" }}>
              Everything you need to succeed
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="card p-7 hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s`, borderRadius: "20px" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text)" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6" style={{ background: "var(--surface)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--primary)" }}>
              Student Stories
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text)" }}>
              Real results, real people
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="card p-7 flex flex-col gap-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s`, borderRadius: "20px" }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} style={{ color: "#f59e0b", fontSize: "16px" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3730a3, #4f46e5 50%, #7c3aed)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
            style={{ background: "white" }} />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10"
            style={{ background: "white" }} />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
            Ready to unlock your potential?
          </h2>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.8)" }}>
            Join thousands of students already learning with TutorCenter. First session is on us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary"
              style={{ background: "white", color: "#4f46e5", fontSize: "16px", padding: "15px 36px", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}>
              Create Free Account →
            </Link>
            <Link href="/login" className="btn-outline-white" style={{ fontSize: "16px", padding: "15px 32px" }}>
              Browse Tutors
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ background: "#0f172a" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <Logo variant="light" size="sm" />
            <div className="flex gap-8 text-sm">
              {["Features", "Subjects", "Tutors", "Pricing"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  className="hover:text-white transition-colors"
                  style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                  {item}
                </a>
              ))}
            </div>
            <div className="flex gap-6 text-sm">
              {["Privacy", "Terms", "Support"].map((item) => (
                <a key={item} href="#"
                  className="hover:text-white transition-colors"
                  style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
          <p className="text-center text-sm mt-6" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2026 TutorCenter. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
