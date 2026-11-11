import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — Dedicated to Mortgage Excellence`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share card for every route that doesn't define its own. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ffffff",
          borderTop: "18px solid #c9a84c",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#0E5030",
            fontFamily: "sans-serif",
            fontWeight: 700,
          }}
        >
          Dedicated to Mortgage Excellence
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1, color: "#173424", fontWeight: 700 }}>
            Century Financial Group
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: "#40574A" }}>
            Mortgage readiness &amp; a purpose-led partnership
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#40574A",
            fontFamily: "sans-serif",
          }}
        >
          {siteConfig.licenseLine}
        </div>
      </div>
    ),
    size
  );
}
