import { useEffect, useMemo, useState } from "react";
import { GITHUB_USERNAME, PROJECTS } from "../constants/portfolio";
import ProjectCard from "./ProjectCard";

function mapRepoToProject(repo) {
  const topics = Array.isArray(repo.topics) ? repo.topics.slice(0, 2) : [];
  const technologies = [repo.language, ...topics].filter(Boolean);

  return {
    id: repo.id,
    title: repo.name,
    description:
      repo.description || "A repository focused on building practical and reliable software.",
    technologies: technologies.length > 0 ? technologies : ["Code"],
    liveLink: repo.homepage || "#",
    githubLink: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language || "Repository",
    updatedAt: repo.updated_at,
  };
}

function Projects() {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadRepos() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const topRepos = data
          .filter((repo) => !repo.fork && !repo.archived)
          .sort((a, b) => {
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }

            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          })
          .slice(0, 6)
          .map(mapRepoToProject);

        if (isMounted) {
          setRepos(topRepos);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load repositories.");
          setRepos([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayedProjects = useMemo(() => {
    if (repos.length > 0) return repos;
    return PROJECTS;
  }, [repos]);

  return (
    <section id="projects" aria-label="Projects section">
      <div className="section-shell">
        <div className="mb-12 flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div>
            <span className="section-kicker">Projects</span>
            <h2 className="section-title mt-4">From My GitHub</h2>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-secondary"
          >
            View All Repositories
          </a>
        </div>

        {isLoading ? (
          <p className="mb-6 text-sm text-(--text-muted)">Loading repositories...</p>
        ) : null}

        {error ? (
          <p className="mb-6 text-sm text-orange-500">
            GitHub fetch failed ({error}). Showing selected projects instead.
          </p>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;