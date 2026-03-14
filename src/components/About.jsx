export default function About() {
  return (
    <section id="about">
      <div className="section-shell grid items-center gap-10 md:grid-cols-2">
        <div className="glass-card p-7 md:p-10">
          <span className="section-kicker">About</span>
          <h2 className="section-title mt-4">
            Product-minded engineer with a bias for shipping.
          </h2>
          <p className="mt-5 leading-relaxed text-(--text-muted)">
            I am a Computer Science undergraduate at NIT Jamshedpur. I love solving difficult
            product problems with robust full-stack engineering and practical AI.
          </p>
          <p className="mt-4 leading-relaxed text-(--text-muted)">
            My focus is simple: understand the user, design lean systems, and deliver quickly
            without sacrificing quality.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <article className="glass-card p-5 transition hover:-translate-y-1">
            <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-300">Full Stack</h3>
            <p className="mt-2 text-sm text-(--text-muted)">React, Node.js, Express, MongoDB</p>
          </article>

          <article className="glass-card p-5 transition hover:-translate-y-1">
            <h3 className="text-lg font-semibold text-orange-500">AI / ML</h3>
            <p className="mt-2 text-sm text-(--text-muted)">Applied ML, workflow automation, intelligent assistants</p>
          </article>

          <article className="glass-card p-5 transition hover:-translate-y-1">
            <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-300">Open Source</h3>
            <p className="mt-2 text-sm text-(--text-muted)">Builder mentality, continuous learning, iterative improvement</p>
          </article>

          <article className="glass-card p-5 transition hover:-translate-y-1">
            <h3 className="text-lg font-semibold text-orange-500">Hackathons</h3>
            <p className="mt-2 text-sm text-(--text-muted)">Fast prototyping under pressure with clear user goals</p>
          </article>
        </div>
      </div>
    </section>
  );
}