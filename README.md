# Eternally, Mommy ♡

A cinematic React + Vite monthsary experience with a Three.js starfield, automatic story progression, real photo memories, eight interactive flowers, a love letter, and a persistent final promise.

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run preview
```

## Personalize

- Story, captions, letter, timing, and music path: `src/story.js`
- Visual treatment: `src/style.css`
- Unique photos: `public/photos/memory-01.jpg` through `memory-13.jpg`
- Optional authorized soundtrack: `public/audio/our-song.mp3`

If the audio file is absent, the experience stays silent and continues normally. Do not add copyrighted music unless you own it or have permission to publish it.

## Deploy to Vercel

1. Upload this project to a private Git repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep Framework Preset as **Vite**.
4. Set Build Command to `npm run build`.
5. Set Output Directory to `dist`.
6. Deploy and test the generated link on a phone.

The included `vercel.json` provides SPA fallback routing.

## Photo privacy

Files in `public/photos` are publicly downloadable by anyone who can reach the deployed site. A hard-to-guess URL is not access control. For real privacy, protect the deployment with Vercel Authentication/Password Protection or another hosting-level access gate before sharing it.
