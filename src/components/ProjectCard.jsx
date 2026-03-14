import React from 'react';
import PropTypes from 'prop-types';

const ProjectCard = ({
  title,
  description,
  technologies,
  liveLink,
  githubLink,
  stars,
  language,
  updatedAt,
}) => {
  const updatedText = updatedAt
    ? new Date(updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  return (
    <article className="glass-card group overflow-hidden p-6 transition duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-(--text-muted)">
        <span>{language || 'Project'}</span>
        {stars !== null && stars !== undefined ? <span>{stars} stars</span> : null}
      </div>

      <h3 className="mt-3 text-xl font-semibold text-(--text-primary)" style={{ fontFamily: 'var(--font-display)' }}>
        {title}
      </h3>

      <p className="mt-3 min-h-14 text-sm leading-relaxed text-(--text-muted)">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-(--border-soft) px-2.5 py-1 text-(--text-muted)"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <div className="flex gap-3">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-300"
            aria-label={`View ${title} on GitHub`}
          >
            Source
          </a>

          {liveLink && liveLink !== '#' ? (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-orange-500 transition hover:text-orange-400"
              aria-label={`View ${title} live demo`}
            >
              Live
            </a>
          ) : null}
        </div>

        {updatedText ? <span className="text-xs text-(--text-muted)">Updated {updatedText}</span> : null}
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  liveLink: PropTypes.string,
  githubLink: PropTypes.string.isRequired,
  stars: PropTypes.number,
  language: PropTypes.string,
  updatedAt: PropTypes.string,
};

ProjectCard.defaultProps = {
  liveLink: '#',
  stars: null,
  language: '',
  updatedAt: null,
};

export default React.memo(ProjectCard);
