export async function GET() {
  try {
    const headers: Record<string, string> = {
      'User-Agent': 'AskRomeo-App',
      Accept: 'application/vnd.github.v3+json',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch('https://api.github.com/repos/Romeo-Timony/ask-romeo', {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return Response.json({ stars: 0 }, { status: 200 });
    }

    const data = await res.json();
    return Response.json({ stars: data.stargazers_count ?? 0 });
  } catch {
    return Response.json({ stars: 0 }, { status: 200 });
  }
}
