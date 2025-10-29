/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Security-first headers (TRS Sentinel v2.3)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },

  // ✅ Firebase Storage allowed domains
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },

  // ✅ Public Firebase config (safe)
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  },

  // ✅ Server-only Firebase Admin keys
  serverRuntimeConfig: {
    FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    GHOSTSHIFT_MASTER_KEY: process.env.GHOSTSHIFT_MASTER_KEY, // ❗ important
  },

  // ✅ Edge support (faster simulation cycles)
  experimental: {
    runtime: "edge",
    serverActions: true,
  },

  // ✅ API rewrite (SimCore, ColdVeil, Internal Services)
  async rewrites() {
    return [
      {
        source: "/api/sim/:path*",
        destination: "https://us-central1-YOUR_PROJECT.cloudfunctions.net/:path*",
      },
    ];
  },

  // ✅ Enforce static optimization where possible
  optimizeFonts: true,
  compress: true,
};

module.exports = nextConfig;
