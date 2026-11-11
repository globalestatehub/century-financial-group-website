import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: same gold (#c9a84c) monogram as the favicon. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c9a84c",
          color: "#173424",
          fontSize: 120,
          fontWeight: 700,
          fontFamily: "serif",
        }}
      >
        C
      </div>
    ),
    size
  );
}
