import { NextResponse } from "next/server";

export const revalidate = 600; // 10 minutes

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "nickolaskg";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string; url: string };
  payload: {
    commits?: { message: string }[];
    action?: string;
    ref_type?: string;
  };
}

export async function GET() {
  try {
    const [reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=owner`, {
        headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
        next: { revalidate: 600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`, {
        headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
        next: { revalidate: 300 },
      }),
    ]);

    if (!reposRes.ok) {
      throw new Error(`GitHub API error: ${reposRes.status}`);
    }

    const repos: GitHubRepo[] = await reposRes.json();
    const events: GitHubEvent[] = eventsRes.ok ? await eventsRes.json() : [];

    const filteredRepos = repos
      .filter((r) => !r.fork)
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        language: r.language,
        updatedAt: r.updated_at,
      }));

    const filteredEvents = events
      .filter((e) => ["PushEvent", "CreateEvent", "WatchEvent", "PullRequestEvent"].includes(e.type ?? ""))
      .slice(0, 5)
      .map((e) => ({
        id: e.id,
        type: e.type,
        repo: e.repo.name.replace(`${GITHUB_USERNAME}/`, ""),
        repoUrl: `https://github.com/${e.repo.name}`,
        message:
          e.type === "PushEvent"
            ? e.payload.commits?.[0]?.message?.split("\n")[0] ?? "Pushed commits"
            : e.type === "CreateEvent"
            ? `Created ${e.payload.ref_type}`
            : e.type === "PullRequestEvent"
            ? `PR ${e.payload.action}`
            : "Activity",
        createdAt: e.created_at,
      }));

    return NextResponse.json({
      username: GITHUB_USERNAME,
      profileUrl: `https://github.com/${GITHUB_USERNAME}`,
      repos: filteredRepos,
      recentActivity: filteredEvents,
    });
  } catch (err) {
    console.error("[/api/social/github]", err);
    // Return graceful fallback
    return NextResponse.json(
      {
        username: GITHUB_USERNAME,
        profileUrl: `https://github.com/${GITHUB_USERNAME}`,
        repos: [],
        recentActivity: [],
        error: "Failed to fetch GitHub data",
      },
      { status: 200 } // 200 so UI doesn't crash
    );
  }
}
