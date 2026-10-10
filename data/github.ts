const githubUsername = "Sayan1608";
const githubRepositoriesUrl =
  `https://api.github.com/users/${githubUsername}/repos?type=owner&sort=pushed&direction=desc&per_page=100`;

type GitHubRepository = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  fork: boolean;
  owner: { login: string };
};

export type GitHubProject = {
  id: number;
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  pushedAt: string;
};

export type RecentProjectsResult =
  | { status: "success"; projects: GitHubProject[] }
  | { status: "error" };

function isGitHubRepository(value: unknown): value is GitHubRepository {
  if (typeof value !== "object" || value === null) return false;

  const repository = value as Record<string, unknown>;
  const owner = repository.owner;

  return (
    typeof repository.id === "number" &&
    typeof repository.name === "string" &&
    typeof repository.html_url === "string" &&
    repository.html_url.startsWith("https://github.com/") &&
    (typeof repository.description === "string" || repository.description === null) &&
    (typeof repository.language === "string" || repository.language === null) &&
    typeof repository.pushed_at === "string" &&
    !Number.isNaN(Date.parse(repository.pushed_at)) &&
    typeof repository.fork === "boolean" &&
    typeof owner === "object" &&
    owner !== null &&
    "login" in owner &&
    typeof owner.login === "string"
  );
}

export async function getRecentProjects(): Promise<RecentProjectsResult> {
  try {
    const response = await fetch(githubRepositoriesUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error(
        `GitHub repositories request failed with ${response.status} ${response.statusText}.`
      );
      return { status: "error" };
    }

    const payload: unknown = await response.json();
    if (!Array.isArray(payload) || !payload.every(isGitHubRepository)) {
      console.error("GitHub repositories response had an unexpected shape.");
      return { status: "error" };
    }

    const projects = payload
      .filter((repository) =>
        repository.owner.login.toLowerCase() === githubUsername.toLowerCase() &&
        !repository.fork
      )
      .slice(0, 5)
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        url: repository.html_url,
        description: repository.description,
        language: repository.language,
        pushedAt: repository.pushed_at
      }));

    return { status: "success", projects };
  } catch (error) {
    console.error("Unable to load recent GitHub repositories.", error);
    return { status: "error" };
  }
}
