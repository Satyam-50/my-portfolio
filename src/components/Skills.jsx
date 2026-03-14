import { SKILLS } from "../constants/portfolio";

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-shell">
        <div className="mb-12 text-center">
          <span className="section-kicker">Skills</span>
          <h2 className="section-title mt-4">Stack I Work With</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((group, index) => (
            <article key={group.category} className="glass-card p-6 transition hover:-translate-y-1">
              <h3 className={`text-lg font-semibold ${index % 2 === 0 ? "text-cyan-600 dark:text-cyan-300" : "text-orange-500"}`}>
                {group.category}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-(--text-muted)">
                {group.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}