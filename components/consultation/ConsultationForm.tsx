"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";

const subjects = [
  "درخواست مشاوره فنی",
  "استعلام قیمت",
  "طراحی سیستم هیدرولیک",
  "خدمات و تعمیرات",
  "سایر",
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

export default function ConsultationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function updateField(key: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
    setSuccess(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          data?.detail ||
          data?.message ||
          "ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید.";

        throw new Error(message);
      }

      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید.",
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "h-14 w-full rounded-xl border border-[#d8e2ed] bg-white px-4 pl-11 pr-4 text-right text-sm text-[#10243a] outline-none transition placeholder:text-right placeholder:text-slate-400 focus:border-[#ffb51b] focus:ring-2 focus:ring-[#ffb51b]/15";

  return (
    <div
      className="rtl rounded-2xl border border-[#dce5ed] bg-white p-6 shadow-[0_10px_35px_rgba(10,30,50,.06)] md:p-8"
      dir="rtl"
    >
      <div>
        <h2 className="text-2xl font-black text-[#10243a]">
          فرم درخواست مشاوره
        </h2>

        <p className="mt-2 text-right text-xs leading-6 text-slate-500">
          لطفاً اطلاعات مورد نیاز خود را وارد کنید
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-7">
        <div className="grid gap-5 md:grid-cols-2">
          {/* NAME */}
          <Field label="نام و نام خانوادگی" required icon={<User size={16} />}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={inputClass}
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              required
            />
          </Field>

          {/* SUBJECT */}
          <Field label="موضوع" required icon={<MessageSquare size={16} />}>
            <select
              value={form.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              className={`${inputClass} cursor-pointer appearance-none`}
              required
            >
              <option value="">انتخاب موضوع</option>

              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </Field>

          {/* EMAIL */}
          <Field label="ایمیل" required icon={<Mail size={16} />}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={`${inputClass} text-left placeholder:text-left`}
              placeholder="example@domain.com"
              dir="ltr"
              required
            />
          </Field>

          {/* PHONE */}
          <Field label="شماره تلفن" required icon={<Phone size={16} />}>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={`${inputClass} text-left placeholder:text-left`}
              placeholder="09xxxxxxxxx"
              dir="ltr"
              required
            />
          </Field>
        </div>

        {/* MESSAGE */}
        <Field label="متن پیام" required className="mt-5">
          <textarea
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            className="min-h-[145px] w-full resize-y rounded-xl border border-[#d8e2ed] bg-white px-4 py-4 pl-11 text-right text-sm leading-7 text-[#10243a] outline-none transition placeholder:text-right placeholder:text-slate-400 focus:border-[#ffb51b] focus:ring-2 focus:ring-[#ffb51b]/15"
            placeholder="پیام خود را اینجا بنویسید..."
            required
          />
        </Field>

        {/* ERROR */}
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-right text-xs font-semibold leading-6 text-red-600">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mt-4 flex items-center justify-start gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-right text-xs font-semibold leading-6 text-emerald-700">
            <CheckCircle2 size={17} />

            <span>
              درخواست شما با موفقیت ارسال شد. کارشناسان ما در اولین فرصت با شما
              تماس می‌گیرند.
            </span>
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="gold-btn mt-6 min-w-[285px] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              در حال ارسال...
            </>
          ) : (
            <>
              ارسال درخواست
              <Send size={15} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  icon,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`} dir="rtl">
      {/* LABEL */}
      <span className="mb-2 flex items-center justify-start gap-1 text-right text-xs font-black text-[#10243a]">
        <span>{label}</span>

        {required && <span className="text-red-500">*</span>}
      </span>

      {/* INPUT */}
      <div className="relative">
        {children}

        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
      </div>
    </label>
  );
}
