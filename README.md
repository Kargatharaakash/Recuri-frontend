# Web Query Chatbot Frontend

A modern Next.js 15 + React 18 chatbot UI for your web query agent.

## Features

- Chatbot interface with message bubbles, auto-scroll, and loading state
- Connects to your backend Python API for web search and summarization
- TypeScript, strict mode, and ready for styling with Tailwind CSS (optional)
- API route proxy for local development

## Quick Start

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Backend API:**
   - Make sure your Python backend is running and exposes a POST `/api/query` endpoint on port 8000.

## Project Structure

```
frontend/
├── package.json
├── tsconfig.json
├── next-env.d.ts
├── README.md
└── src/
    └── app/
        ├── page.tsx         # Main chatbot UI
        ├── api/
        │   └── query.ts     # API route proxy to backend
        └── favicon.ico
```

## Troubleshooting

- **TypeScript errors:**  
  Run `npm install` to install all types.  
  If you see "Cannot find module 'react'" or similar, make sure `node_modules` is present.

- **API errors:**  
  Ensure your backend is running at `http://localhost:8000/api/query`.

- **Styling:**  
  This UI uses Tailwind CSS classes. If you want to customize, add a `tailwind.config.js` and install Tailwind.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Lint code

## Requirements

- Node.js 18+
- npm 9+
- Next.js 15.x

---

**Built for Ripplica Interview Task**
