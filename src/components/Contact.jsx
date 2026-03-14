import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact">
      <div className="section-shell">
        <div className="mx-auto w-full max-w-3xl glass-card p-7 md:p-10">
          <div className="text-center">
            <span className="section-kicker">Contact</span>
            <h2 className="section-title mt-4">Let us build something meaningful</h2>
            <p className="mt-3 text-sm text-(--text-muted) md:text-base">
              Share your idea, collaboration proposal, or role opportunity.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full rounded-xl border border-(--border-soft) bg-white/70 p-3.5 text-sm text-(--text-primary) outline-none transition focus:border-cyan-500 dark:bg-slate-950/60"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded-xl border border-(--border-soft) bg-white/70 p-3.5 text-sm text-(--text-primary) outline-none transition focus:border-cyan-500 dark:bg-slate-950/60"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              className="w-full rounded-xl border border-(--border-soft) bg-white/70 p-3.5 text-sm text-(--text-primary) outline-none transition focus:border-cyan-500 dark:bg-slate-950/60"
            ></textarea>

            <button type="submit" className="cta-btn cta-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}