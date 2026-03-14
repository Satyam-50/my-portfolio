import { SOCIAL_LINKS } from "../constants/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-(--border-soft) bg-(--surface-float) px-6 py-10 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl space-y-4 text-center">
        <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-300">Satyam Vishwakarma</h3>

        <p className="text-sm text-(--text-muted)">
          Full-Stack Developer | AI/ML Enthusiast
        </p>

        <div className="flex justify-center gap-6 text-sm text-(--text-muted)">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition hover:text-orange-500"
            >
              {link.name}
            </a>
          ))}
        </div>

        <p className="mt-4 text-xs text-(--text-muted)">
          © {new Date().getFullYear()} Satyam Vishwakarma. All rights reserved.
        </p>
      </div>
    </footer>
  );
}