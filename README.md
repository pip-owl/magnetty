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
- [Bun](https://bun.sh) (v1.0.0+) - for package management only

## Installation

```bash
# Clone or download the project
cd magnetty

# Install dependencies (using Bun as package manager)
bun install
```

## Usage

### Download via Magnet URI

```bash
npm start "magnet:?xt=urn:btih:..."
# or
node --import=tsx index.ts "magnet:?xt=urn:btih:..."
```

### Download via .torrent File

```bash
npm start ./path/to/file.torrent
# or
node --import=tsx index.ts ./path/to/file.torrent
```

### Development (with tsx)

```bash
npm run dev "magnet:?xt=urn:btih:..."
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
