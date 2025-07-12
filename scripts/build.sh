#!/bin/bash

echo "🔐 TRS BUILD: STARTING SECURE BUILD SEQUENCE"

# Load Netlify Environment
export STEALTH_KEY=${STEALTH_KEY:-$(openssl rand -hex 16)}
echo "🌫️ Poetic Fog Active — Generating Encrypted STEALTH_KEY"

# Save key for frontend (if needed)
echo "NEXT_PUBLIC_STEALTH_KEY=$STEALTH_KEY" >> .env.production

# Firebase Init for Admin Logging (optional)
node <<EOF
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({ credential: applicationDefault() });
const db = getFirestore();

db.collection("stealthKeyLogs").add({
  key: "$STEALTH_KEY",
  timestamp: new Date().toISOString(),
  status: "BUILD_SEED_SET",
  origin: "TRS Netlify Build Script"
}).then(() => {
  console.log("✅ Stealth key logged to Firestore.");
}).catch(err => {
  console.error("🔥 Failed to log STEALTH_KEY:", err);
});
EOF

echo "🛠️ Building Next.js frontend..."
npm run build
