import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour

interface InstagramMedia {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

interface InstagramResponse {
  data: InstagramMedia[];
}

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  // If no token, return graceful placeholder
  if (!accessToken) {
    return NextResponse.json({
      connected: false,
      username: null,
      profileUrl: null,
      media: [],
      message:
        "Instagram not connected. Add INSTAGRAM_ACCESS_TOKEN to .env.local. Note: requires a Business or Creator account linked to a Facebook Page.",
    });
  }

  try {
    // Fetch user profile
    const profileRes = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`,
      { next: { revalidate: 3600 } }
    );

    if (!profileRes.ok) {
      throw new Error(`Instagram profile error: ${profileRes.status}`);
    }

    const profile = await profileRes.json();

    // Fetch media
    const mediaRes = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&limit=9&access_token=${accessToken}`,
      { next: { revalidate: 3600 } }
    );

    if (!mediaRes.ok) {
      throw new Error(`Instagram media error: ${mediaRes.status}`);
    }

    const mediaData: InstagramResponse = await mediaRes.json();

    return NextResponse.json({
      connected: true,
      username: profile.username,
      profileUrl: `https://www.instagram.com/${profile.username}/`,
      media: mediaData.data.map((m) => ({
        id: m.id,
        type: m.media_type,
        imageUrl: m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url,
        permalink: m.permalink,
        caption: m.caption?.slice(0, 120) ?? null,
        timestamp: m.timestamp,
      })),
    });
  } catch (err) {
    console.error("[/api/social/instagram]", err);
    return NextResponse.json({
      connected: false,
      username: null,
      profileUrl: null,
      media: [],
      error: "Failed to fetch Instagram media. Token may be expired.",
    });
  }
}
