# 🧲 Magnetty

A simple CLI torrent downloader built with [Bun](https://bun.sh) and [WebTorrent](https://webtorrent.io).

## Features

- Download torrents from magnet URIs or `.torrent` files
- Real-time progress display (peers, speed, completion %)
- Automatic file organization in `downloads/` folder
- Graceful error handling
- Clean, emoji-friendly CLI output

## Requirements

- [Bun](https://bun.sh) runtime (v1.0.0+)

## Installation

```bash
# Clone or download the project
cd magnetty

# Install dependencies
bun install
```

## Usage

### Download via Magnet URI

```bash
bun run index.ts "magnet:?xt=urn:btih:..."
```

### Download via .torrent File

```bash
bun run index.ts ./path/to/file.torrent
```

### Global Installation (Optional)

```bash
# Make it globally available
bun link

# Then use anywhere
magnetty "magnet:?xt=urn:btih:..."
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
- **Node.js**: This tool is built for Bun and may not work with Node.js alone

## License

MIT
