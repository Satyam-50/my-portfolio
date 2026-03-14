import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="section-shell text-center md:text-left">
        <span className="section-kicker sweep-in">Open to Full-Stack Roles</span>

        <h1
          className="sweep-in delay-1 mt-5 text-5xl font-extrabold leading-[0.95] md:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Building products
          <br />
          with <span className="text-cyan-600 dark:text-cyan-300">clarity</span> and
          <span className="text-orange-500"> speed</span>.
        </h1>

        <p className="sweep-in delay-1 mt-6 max-w-2xl text-base text-(--text-muted) md:text-lg">
          I am Satyam Vishwakarma, a developer focused on shipping performant web applications,
          practical AI experiences, and clean developer-friendly architecture.
        </p>

        <div
          className="sweep-in delay-2 mt-6 text-lg text-(--text-muted) md:text-2xl"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <TypeAnimation
            sequence={[
              "Full-Stack Developer",
              1500,
              "AI / ML Enthusiast",
              1500,
              "Hackathon Builder",
              1500,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </div>

        <div className="sweep-in delay-2 mt-10 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
          <a
            href="#projects"
            className="cta-btn cta-primary"
          >
            Explore Projects
          </a>

          <a
            href="#contact"
            className="cta-btn cta-secondary"
          >
            Contact Me
          </a>
        </div>

        <div className="mt-16 text-sm text-(--text-muted) animate-bounce">Scroll down</div>
      </div>
    </section>
  );
}