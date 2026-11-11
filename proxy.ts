import { NextResponse, type NextRequest } from "next/server";

/**
 * HTTP Basic Auth for the internal lead dashboard (and its export endpoint).
 * Set DASHBOARD_USERNAME and DASHBOARD_PASSWORD in the environment. If either
 * is missing, the dashboard stays locked rather than falling open.
 */
export function proxy(request: NextRequest) {
  const username = process.env.DASHBOARD_USERNAME;
  const password = process.env.DASHBOARD_PASSWORD;

  if (username && password) {
    const header = request.headers.get("authorization") ?? "";
    const [scheme, encoded] = header.split(" ");
    if (scheme === "Basic" && encoded) {
      try {
        const decoded = atob(encoded);
        const separator = decoded.indexOf(":");
        const user = decoded.slice(0, separator);
        const pass = decoded.slice(separator + 1);
        if (separator > 0 && safeEqual(user, username) && safeEqual(pass, password)) {
          return NextResponse.next();
        }
      } catch {
        // Malformed header: fall through to the challenge.
      }
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Century Financial Group dashboard", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

/** Length-independent comparison so response timing does not leak the secret. */
function safeEqual(a: string, b: string) {
  let mismatch = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let i = 0; i < length; i++) {
    mismatch |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return mismatch === 0;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
