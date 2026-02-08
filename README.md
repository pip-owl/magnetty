# 🧲 Magnetty

A simple CLI torrent downloader built with [WebTorrent](https://webtorrent.io).

Uses **Bun** as the package manager and **Node.js** to run (due to Bun `uv_timer_init` limitations).

## Features

- Download torrents from magnet URIs or `.torrent` files
- Real-time progress display (peers, speed, completion %)
- Automatic file organization in `downloads/` folder
- Graceful error handling
- Clean, emoji-friendly CLI output

## Requirements

- [Node.js](https://nodejs.org) (v18+)

## Installation

No installation needed! Just run with npx:

```bash
npx magnetty@latest "magnet:?xt=urn:btih:..."
```

## Usage

### Download via Magnet URI

```bash
npx magnetty@latest "magnet:?xt=urn:btih:..."
```

### Download via .torrent File

```bash
npx magnetty@latest ./path/to/file.torrent
```

## Development (Local)

If you want to develop or modify:

```bash
# Clone the repo
git clone https://github.com/pip-owl/magnetty.git
cd magnetty

# Install dependencies (Bun as package manager)
bun install

# Build
npm run build

# Run locally
npm start "magnet:?xt=urn:btih:..."
```

## Output

While downloading, you'll see real-time stats:

```
📥 Downloading: Example-File
📦 Size: 1.5 GB
📂 Save location: /path/to/magnetty/downloads

📊 Progress: 45.3% | ⬇️ 2.5 MB/s | 👥 Peers: 12 | 💾 700 MB / 1.5 GB | ⏱️ ~5m remaining
```

When complete:

```
✅ Download complete!
📁 Files saved to: /path/to/magnetty/downloads/Example-File

📋 Downloaded files:
   • file1.mp4 (1.2 GB)
   • file2.txt (4 KB)
```

## Project Structure

```
magnetty/
├── index.ts        # Main CLI entry point
├── package.json    # Project configuration
├── tsconfig.json   # TypeScript configuration
├── downloads/      # Downloaded torrents (created automatically)
└── README.md       # This file
```

## Configuration

Downloads are saved to the `downloads/` folder by default (relative to the project root). You can modify the `DOWNLOAD_DIR` constant in `index.ts` to change this.

## Notes & Limitations

- **Legal Notice**: Only download content you have permission to download. Respect copyright laws.
- **Network**: Requires an internet connection with BitTorrent protocol access
- **Firewall**: Some networks may block BitTorrent traffic
- **Seeding**: This tool downloads only; it does not seed after completion

## License

MIT
