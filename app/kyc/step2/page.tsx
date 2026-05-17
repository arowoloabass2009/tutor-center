"use client";
import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { supabase } from "@/lib/supabase";

interface UploadedFile {
  name: string;
  size: number;
  preview?: string;
  raw: File;
}

const DOC_TYPES = [
  { id: "passport",         label: "Passport",         icon: "🛂" },
  { id: "national_id",      label: "National ID",       icon: "🪪" },
  { id: "drivers_license",  label: "Driver's License",  icon: "🚗" },
];

function fmtSize(b: number) {
  return b < 1024 * 1024
    ? `${(b / 1024).toFixed(0)} KB`
    : `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

export default function KYCStep2() {
  const router = useRouter();
  const [docType, setDocType] = useState("");
  const [idFile, setIdFile] = useState<UploadedFile | null>(null);
  const [selfieFile, setSelfieFile] = useState<UploadedFile | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const idRef = useRef<HTMLInputElement>(null);
  const selfieRef = useRef<HTMLInputElement>(null);

  const readFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (f: UploadedFile | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("File must be under 5 MB"); return; }
    const reader = new FileReader();
    reader.onload = () =>
      setter({ name: file.name, size: file.size, preview: reader.result as string, raw: file });
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!docType)   e.docType   = "Please select a document type";
    if (!idFile)    e.idFile    = "Please upload your ID document";
    if (!selfieFile) e.selfieFile = "Please upload a selfie";
    return e;
  };

  const upload = async (userId: string, file: File, path: string) => {
    const { error } = await supabase.storage
      .from("kyc-documents")
      .upload(`${userId}/${path}`, file, { upsert: true });
    if (error) throw new Error(error.message);
    return supabase.storage.from("kyc-documents").getPublicUrl(`${userId}/${path}`).data.publicUrl;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setServerError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    try {
      const ext = (f: File) => f.name.split(".").pop();
      const [idUrl, selfieUrl] = await Promise.all([
        upload(user.id, idFile!.raw,     `id_document.${ext(idFile!.raw)}`),
        upload(user.id, selfieFile!.raw, `selfie.${ext(selfieFile!.raw)}`),
      ]);
      const { error } = await supabase.from("kyc_documents").upsert({
        user_id: user.id, doc_type: docType,
        id_document_url: idUrl, selfie_url: selfieUrl, status: "pending",
      }, { onConflict: "user_id" });
      if (error) throw new Error(error.message);
      setSubmitted(true);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <AuthCard title="Verification submitted" subtitle="We're reviewing your documents">
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-5 animate-pulse-ring"
            style={{ background: "rgba(16,185,129,0.1)", border: "2px solid var(--success)" }}
          >
            ✓
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Documents submitted. Our team will review them within{" "}
            <strong style={{ color: "var(--text)" }}>24–48 hours</strong>. You&apos;ll get an email once verified.
          </p>

          <div className="checklist mb-6 text-left">
            {[
              { label: "Account created",    done: true },
              { label: "Personal info",      done: true },
              { label: "Document upload",    done: true },
              { label: "Verification review", done: false },
            ].map((item) => (
              <div key={item.label} className="checklist__row">
                <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{item.label}</span>
                <span className={`text-sm ${item.done ? "checklist__status--done" : "checklist__status--pending"}`}>
                  {item.done ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </div>

          <button className="btn-primary w-full" onClick={() => router.push("/")}>
            Go to Dashboard →
          </button>
        </div>
      </AuthCard>
    );
  }

  /* ── Upload form ── */
  return (
    <AuthCard
      title="Identity verification"
      subtitle="Upload your documents to complete verification"
      step={2}
      totalSteps={2}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {serverError && <div className="alert alert--error">{serverError}</div>}

        {/* Document type */}
        <div className="field">
          <span className="field__label">Document type</span>
          <div className="grid grid-cols-3 gap-2">
            {DOC_TYPES.map((d) => (
              <button
                key={d.id}
                type="button"
                className={`option-card${docType === d.id ? " option-card--active" : ""}`}
                onClick={() => setDocType(d.id)}
              >
                <span className="text-xl">{d.icon}</span>
                {d.label}
              </button>
            ))}
          </div>
          {errors.docType && <p className="field__error">{errors.docType}</p>}
        </div>

        {/* ID document upload */}
        <div className="field">
          <span className="field__label">ID document</span>
          <input ref={idRef} type="file" accept="image/*,.pdf" className="hidden"
            onChange={(e) => readFile(e, setIdFile)} />
          {idFile ? (
            <div className="file-preview">
              {idFile.preview?.startsWith("data:image") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={idFile.preview} alt="ID" className="file-preview__thumb" />
              ) : (
                <div className="file-preview__thumb--placeholder">📄</div>
              )}
              <div className="file-preview__info">
                <p className="file-preview__name">{idFile.name}</p>
                <p className="file-preview__size">{fmtSize(idFile.size)}</p>
              </div>
              <button type="button" className="file-preview__remove" onClick={() => setIdFile(null)}
                aria-label="Remove file">✕</button>
            </div>
          ) : (
            <button type="button"
              className={`upload-zone${errors.idFile ? " upload-zone--error" : ""}`}
              onClick={() => idRef.current?.click()}>
              <span className="upload-zone__icon">📤</span>
              <span className="upload-zone__label">Click to upload</span>
              <span className="upload-zone__hint">PNG, JPG or PDF — max 5 MB</span>
            </button>
          )}
          {errors.idFile && <p className="field__error">{errors.idFile}</p>}
        </div>

        {/* Selfie upload */}
        <div className="field">
          <span className="field__label">Selfie with ID</span>
          <p className="field__hint">Hold your ID next to your face and take a clear photo</p>
          <input ref={selfieRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => readFile(e, setSelfieFile)} />
          {selfieFile ? (
            <div className="file-preview" style={{ borderColor: "rgba(6,182,212,0.25)", background: "rgba(6,182,212,0.04)" }}>
              {selfieFile.preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={selfieFile.preview} alt="Selfie" className="file-preview__thumb" />
              )}
              <div className="file-preview__info">
                <p className="file-preview__name">{selfieFile.name}</p>
                <p className="file-preview__size">{fmtSize(selfieFile.size)}</p>
              </div>
              <button type="button" className="file-preview__remove" onClick={() => setSelfieFile(null)}
                aria-label="Remove file">✕</button>
            </div>
          ) : (
            <button type="button"
              className={`upload-zone${errors.selfieFile ? " upload-zone--error" : ""}`}
              onClick={() => selfieRef.current?.click()}>
              <span className="upload-zone__icon">🤳</span>
              <span className="upload-zone__label">Upload selfie with ID</span>
              <span className="upload-zone__hint">PNG or JPG — max 5 MB</span>
            </button>
          )}
          {errors.selfieFile && <p className="field__error">{errors.selfieFile}</p>}
        </div>

        {/* Security note */}
        <div className="alert alert--info">
          🔒 Your documents are encrypted and stored securely. We never share your data with third parties.
        </div>

        <div className="flex gap-3">
          <button type="button" className="btn-secondary flex-1" onClick={() => router.back()}>
            ← Back
          </button>
          <button type="submit" className="btn-primary flex-1" disabled={loading}>
            {loading
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Uploading…</>
              : "Submit KYC"}
          </button>
        </div>
      </form>
    </AuthCard>
  );
}
