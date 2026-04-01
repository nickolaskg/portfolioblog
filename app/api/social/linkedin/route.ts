import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour

export async function GET() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

  // If no credentials, return a graceful placeholder
  if (!clientId || !accessToken) {
    return NextResponse.json({
      connected: false,
      profileUrl: null,
      name: null,
      headline: null,
      posts: [],
      message:
        "LinkedIn not connected. Create a LinkedIn Developer App, obtain an access token, and add LINKEDIN_CLIENT_ID + LINKEDIN_ACCESS_TOKEN to .env.local.",
    });
  }

  try {
    // Fetch LinkedIn profile
    const profileRes = await fetch(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "LinkedIn-Version": "202401",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!profileRes.ok) {
      throw new Error(`LinkedIn profile error: ${profileRes.status}`);
    }

    const profile = await profileRes.json();

    // Note: LinkedIn's API for fetching user shares requires additional
    // permissions (w_member_social) and is heavily rate-limited.
    // We return the profile data with a placeholder posts array.
    return NextResponse.json({
      connected: true,
      name: profile.name ?? `${profile.given_name} ${profile.family_name}`,
      headline: profile.email ?? null,
      profileUrl: `https://www.linkedin.com/in/${profile.sub}/`,
      posts: [], // Requires elevated API access
      message: "LinkedIn profile connected. Post fetching requires w_member_social permission.",
    });
  } catch (err) {
    console.error("[/api/social/linkedin]", err);
    return NextResponse.json({
      connected: false,
      profileUrl: null,
      name: null,
      headline: null,
      posts: [],
      error: "Failed to fetch LinkedIn data. Access token may be expired.",
    });
  }
}
