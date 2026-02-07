#!/usr/bin/env node
import WebTorrent from 'webtorrent';
import * as fs from 'fs';
import * as path from 'path';

const DOWNLOAD_DIR = './downloads';

function showHelp(): void {
  console.log(`
🧲 Magnetty - Simple torrent downloader

Usage:
  bun run index.ts <magnet-uri|torrent-file>
  ./index.ts <magnet-uri|torrent-file>

Options:
  --help, -h    Show this help message

Examples:
  bun run index.ts "magnet:?xt=urn:btih:..."
  bun run index.ts ./movie.torrent
`);
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatSpeed(bytesPerSecond: number): string {
  return formatBytes(bytesPerSecond) + '/s';
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return String(err);
}

async function downloadTorrent(input: string): Promise<void> {
  // Ensure download directory exists
  if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
    console.log(`📁 Created download directory: ${DOWNLOAD_DIR}`);
  }

  const client = new WebTorrent();
  
  // Determine if input is a magnet URI or file path
  const isMagnet = input.startsWith('magnet:');
  
  console.log(`🧲 Adding torrent from ${isMagnet ? 'magnet URI' : 'file'}...`);

  return new Promise((resolve, reject) => {
    let progressInterval: ReturnType<typeof setInterval> | null = null;

    client.on('error', (err) => {
      console.error('❌ Client error:', getErrorMessage(err));
      if (progressInterval) clearInterval(progressInterval);
      client.destroy();
      reject(err);
    });

    const torrent = client.add(input, { path: DOWNLOAD_DIR }, (torrent) => {
      console.log(`\n📥 Downloading: ${torrent.name}`);
      console.log(`📦 Size: ${formatBytes(torrent.length)}`);
      console.log(`📂 Save location: ${path.resolve(DOWNLOAD_DIR)}\n`);

      // Progress display
      progressInterval = setInterval(() => {
        const progress = (torrent.progress * 100).toFixed(1);
        const speed = formatSpeed(torrent.downloadSpeed);
        const peers = torrent.numPeers;
        const downloaded = formatBytes(torrent.downloaded);
        const remaining = torrent.done ? 0 : Math.ceil((torrent.timeRemaining / 1000) / 60);
        
        process.stdout.write(
          `\r📊 Progress: ${progress}% | ` +
          `⬇️ ${speed} | ` +
          `👥 Peers: ${peers} | ` +
          `💾 ${downloaded} / ${formatBytes(torrent.length)}` +
          `${torrent.done ? '' : ` | ⏱️ ~${remaining}m remaining`}`
        );
      }, 1000);

      torrent.on('done', () => {
        if (progressInterval) clearInterval(progressInterval);
        console.log('\n\n✅ Download complete!');
        console.log(`📁 Files saved to: ${path.resolve(DOWNLOAD_DIR, torrent.name)}`);
        
        // List downloaded files
        console.log('\n📋 Downloaded files:');
        torrent.files.forEach((file) => {
          console.log(`   • ${file.name} (${formatBytes(file.length)})`);
        });

        client.destroy();
        resolve();
      });

      torrent.on('error', (err) => {
        console.error('\n❌ Torrent error:', getErrorMessage(err));
        if (progressInterval) clearInterval(progressInterval);
        client.destroy();
        reject(err);
      });
    });

    torrent.on('warning', (err) => {
      // Suppress common warnings
      const msg = getErrorMessage(err);
      if (!msg.includes('unsupported')) {
        console.warn('⚠️ Warning:', msg);
      }
    });
  });
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  // Check for help flag
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    process.exit(0);
  }

  const input: string | undefined = args[0];

  if (!input) {
    console.error('❌ Error: No input provided');
    showHelp();
    process.exit(1);
  }

  // Validate input
  if (!input.startsWith('magnet:') && !fs.existsSync(input)) {
    console.error('❌ Error: Input must be a valid magnet URI or an existing .torrent file');
    showHelp();
    process.exit(1);
  }

  try {
    await downloadTorrent(input);
    console.log('\n🎉 All done! Exiting...');
    process.exit(0);
  } catch (error) {
    console.error('\n💥 Fatal error:', getErrorMessage(error));
    process.exit(1);
  }
}

main();
