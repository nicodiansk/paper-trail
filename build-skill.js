// Build paper-trail.skill ZIP using only Node.js built-ins
// Produces a valid ZIP with forward slashes and LF line endings
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const files = [
  'SKILL.md',
  'references/audit.md',
  'references/expand.md',
  'references/prompts.md',
  'references/setup-wizard.md',
  'references/status.md',
];

const crc32Table = new Int32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  crc32Table[i] = c;
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ crc32Table[(crc ^ buf[i]) & 0xFF];
  return (crc ^ -1) >>> 0;
}

function dosDateTime(date) {
  const time = ((date.getHours() & 0x1F) << 11) | ((date.getMinutes() & 0x3F) << 5) | ((date.getSeconds() >> 1) & 0x1F);
  const d = (((date.getFullYear() - 1980) & 0x7F) << 9) | (((date.getMonth() + 1) & 0xF) << 5) | (date.getDate() & 0x1F);
  return { time, date: d };
}

const entries = [];
const now = new Date();
const dt = dosDateTime(now);

for (const file of files) {
  const filePath = path.join(__dirname, file);
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`Missing file: ${file} - run this from the repo root`);
      process.exit(1);
    }
    throw err;
  }
  const content = Buffer.from(raw.replace(/\r\n/g, '\n'), 'utf8');
  const entryName = `paper-trail/${file}`;
  const compressed = zlib.deflateRawSync(content);
  entries.push({
    name: Buffer.from(entryName, 'utf8'),
    content,
    compressed,
    crc: crc32(content),
  });
}

// Also add the directory entry for references/
const refDirName = Buffer.from('paper-trail/references/', 'utf8');

const parts = [];
const centralParts = [];
let offset = 0;

// Add directory entry for paper-trail/
const rootDirName = Buffer.from('paper-trail/', 'utf8');
{
  const local = Buffer.alloc(30 + rootDirName.length);
  local.writeUInt32LE(0x04034b50, 0); // signature
  local.writeUInt16LE(20, 4); // version needed
  local.writeUInt16LE(0, 6); // flags
  local.writeUInt16LE(0, 8); // compression: stored
  local.writeUInt16LE(dt.time, 10);
  local.writeUInt16LE(dt.date, 12);
  local.writeUInt32LE(0, 14); // crc
  local.writeUInt32LE(0, 18); // compressed size
  local.writeUInt32LE(0, 22); // uncompressed size
  local.writeUInt16LE(rootDirName.length, 26);
  local.writeUInt16LE(0, 28);
  rootDirName.copy(local, 30);
  parts.push(local);

  const central = Buffer.alloc(46 + rootDirName.length);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(20, 4);
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0, 8);
  central.writeUInt16LE(0, 10);
  central.writeUInt16LE(dt.time, 12);
  central.writeUInt16LE(dt.date, 14);
  central.writeUInt32LE(0, 16);
  central.writeUInt32LE(0, 20);
  central.writeUInt32LE(0, 24);
  central.writeUInt16LE(rootDirName.length, 28);
  central.writeUInt16LE(0, 30);
  central.writeUInt16LE(0, 32);
  central.writeUInt16LE(0, 34);
  central.writeUInt16LE(0, 36);
  central.writeUInt32LE(0x10, 38); // external attrs: directory
  central.writeUInt32LE(offset, 42);
  rootDirName.copy(central, 46);
  centralParts.push(central);
  offset += local.length;
}

// Add directory entry for paper-trail/references/
{
  const local = Buffer.alloc(30 + refDirName.length);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0, 6);
  local.writeUInt16LE(0, 8);
  local.writeUInt16LE(dt.time, 10);
  local.writeUInt16LE(dt.date, 12);
  local.writeUInt32LE(0, 14);
  local.writeUInt32LE(0, 18);
  local.writeUInt32LE(0, 22);
  local.writeUInt16LE(refDirName.length, 26);
  local.writeUInt16LE(0, 28);
  refDirName.copy(local, 30);
  parts.push(local);

  const central = Buffer.alloc(46 + refDirName.length);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(20, 4);
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0, 8);
  central.writeUInt16LE(0, 10);
  central.writeUInt16LE(dt.time, 12);
  central.writeUInt16LE(dt.date, 14);
  central.writeUInt32LE(0, 16);
  central.writeUInt32LE(0, 20);
  central.writeUInt32LE(0, 24);
  central.writeUInt16LE(refDirName.length, 28);
  central.writeUInt16LE(0, 30);
  central.writeUInt16LE(0, 32);
  central.writeUInt16LE(0, 34);
  central.writeUInt16LE(0, 36);
  central.writeUInt32LE(0x10, 38);
  central.writeUInt32LE(offset, 42);
  refDirName.copy(central, 46);
  centralParts.push(central);
  offset += local.length;
}

// Add file entries
for (const entry of entries) {
  const local = Buffer.alloc(30 + entry.name.length);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0, 6);
  local.writeUInt16LE(8, 8); // deflate
  local.writeUInt16LE(dt.time, 10);
  local.writeUInt16LE(dt.date, 12);
  local.writeUInt32LE(entry.crc, 14);
  local.writeUInt32LE(entry.compressed.length, 18);
  local.writeUInt32LE(entry.content.length, 22);
  local.writeUInt16LE(entry.name.length, 26);
  local.writeUInt16LE(0, 28);
  entry.name.copy(local, 30);
  parts.push(local, entry.compressed);

  const central = Buffer.alloc(46 + entry.name.length);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(20, 4);
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0, 8);
  central.writeUInt16LE(8, 10); // deflate
  central.writeUInt16LE(dt.time, 12);
  central.writeUInt16LE(dt.date, 14);
  central.writeUInt32LE(entry.crc, 16);
  central.writeUInt32LE(entry.compressed.length, 20);
  central.writeUInt32LE(entry.content.length, 24);
  central.writeUInt16LE(entry.name.length, 28);
  central.writeUInt16LE(0, 30);
  central.writeUInt16LE(0, 32);
  central.writeUInt16LE(0, 34);
  central.writeUInt16LE(0, 36);
  central.writeUInt32LE(0, 38);
  central.writeUInt32LE(offset, 42);
  entry.name.copy(central, 46);
  centralParts.push(central);
  offset += local.length + entry.compressed.length;
}

const centralDir = Buffer.concat(centralParts);
const totalEntries = entries.length + 2; // files + 2 directory entries

const eocd = Buffer.alloc(22);
eocd.writeUInt32LE(0x06054b50, 0);
eocd.writeUInt16LE(0, 4);
eocd.writeUInt16LE(0, 6);
eocd.writeUInt16LE(totalEntries, 8);
eocd.writeUInt16LE(totalEntries, 10);
eocd.writeUInt32LE(centralDir.length, 12);
eocd.writeUInt32LE(offset, 16);
eocd.writeUInt16LE(0, 20);

const zip = Buffer.concat([...parts, centralDir, eocd]);
fs.writeFileSync(path.join(__dirname, 'paper-trail.skill'), zip);
console.log(`Built paper-trail.skill (${zip.length} bytes, ${totalEntries} entries)`);
