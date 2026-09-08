import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const publicDir = fileURLToPath(new URL('../docs/', import.meta.url));
const config = await readFile(new URL('../_config.yml', import.meta.url), 'utf8');
const root = (config.match(/^root:\s*(.+)$/m)?.[1].trim() ?? '/')
  .replace(/^['"]|['"]$/g, '')
  .replace(/\/?$/, '/');
const stylesheet = `<link rel="stylesheet" href="${root}css/site.css">`;
const defaultMenuLinks = [
  /\s*<a class="main-nav-link" href="[^"]*">Home<\/a>/g,
  /\s*<a class="main-nav-link" href="[^"]*">Archives<\/a>/g,
  /\s*<a href="[^"]*" class="mobile-nav-link">Home<\/a>/g,
  /\s*<a href="[^"]*" class="mobile-nav-link">Archives<\/a>/g
];

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name === 'index.html' ? [path] : [];
  }));
  return files.flat();
}

for (const file of await htmlFiles(publicDir)) {
  let html = await readFile(file, 'utf8');
  if (!html.includes(stylesheet)) {
    html = html.replace('</head>', `  ${stylesheet}\n</head>`);
  }
  html = defaultMenuLinks.reduce((page, pattern) => page.replace(pattern, ''), html);
  await writeFile(file, html);
}
