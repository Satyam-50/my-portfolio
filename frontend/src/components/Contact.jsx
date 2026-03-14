import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

const INPUT_CLASS =
  "w-full rounded-xl border border-(--border-soft) bg-white/70 p-3.5 text-sm text-(--text-primary) outline-none transition focus:border-cyan-500 dark:bg-slate-950/60";

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverErrors, setServerErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setServerErrors([]);
    setErrorMessage("");

    try {
      await axios.post(`${API_BASE_URL}/api/contacts`, form);
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      if (err.response?.data?.errors?.length) {
        setServerErrors(err.response.data.errors);
      } else {
        setErrorMessage(
          err.response?.data?.message || "Something went wrong. Please try again."
        );
      }
    }
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

          {status === "success" && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-700 dark:bg-green-900/20 dark:text-green-400">
              Your message has been sent successfully. I will get back to you soon!
            </div>
          )}

          {status === "error" && errorMessage && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-700 dark:bg-red-900/20 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          {serverErrors.length > 0 && (
            <ul className="mt-6 space-y-1 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-700 dark:bg-red-900/20 dark:text-red-400">
              {serverErrors.map((e, i) => (
                <li key={i}>{e.message}</li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className={INPUT_CLASS}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className={INPUT_CLASS}
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
              className={INPUT_CLASS}
            />

            <textarea
              rows="5"
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className={INPUT_CLASS}
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="cta-btn cta-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}