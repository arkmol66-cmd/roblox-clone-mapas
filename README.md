# Roblox-clone (Prototype)
Minimal prototype of a Roblox-like platform: backend API, WebSocket game server,
simple Three.js client and a minimal 'Studio' editor.

## Structure
- backend/: Node.js Express API + simple WebSocket server
- web-client/: Three.js runtime client (open `public/index.html`)
- studio/: Minimal editor (open `src/editor.html`)

## Quick start (local)
1. Install Node (>=16).
2. Backend:
   ```
   cd backend
   npm install
   node src/server.js
   node src/ws-server.js
   ```
3. Open `web-client/public/index.html` and `studio/src/editor.html` in your browser.
