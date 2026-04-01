import Hero from "@/components/Hero";
import RecentWork from "@/components/RecentWork";
import SocialFeed from "@/components/SocialFeed";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RecentWork />
      <Suspense
        fallback={
          <section
            style={{
              height: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg-surface)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
                fontSize: "0.875rem",
              }}
            >
              Loading social feeds...
            </span>
          </section>
        }
      >
        <SocialFeed />
      </Suspense>
    </>
  );
}
