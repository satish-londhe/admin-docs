#!/usr/bin/env node
/**
 * Upload DataMount HTML to Google Drive as a Google Doc (create or update).
 *
 * Requires OAuth — run: npm run auth:gdocs
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { google } from 'googleapis';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/documents',
];

function loadEnvFile(envPath) {
  if (!fs.existsSync(envPath)) {
    return;
  }
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function expandHome(value) {
  return value.replace(/^~(?=$|[/\\])/, process.env.HOME || '');
}

function oauthPaths() {
  return {
    keys: expandHome(
      process.env.GOOGLE_OAUTH_KEYS_PATH ||
        '~/.config/cmp-docs/gcp-oauth.keys.json',
    ),
    token: expandHome(
      process.env.GOOGLE_TOKEN_PATH ||
        '~/.config/cmp-docs/.gdrive-server-credentials.json',
    ),
  };
}

function readOAuthClient() {
  const { keys } = oauthPaths();
  if (!fs.existsSync(keys)) {
    console.error(`OAuth keys not found: ${keys}`);
    console.error('See scripts/google-docs/README.md for setup.');
    process.exit(1);
  }
  const credentials = JSON.parse(fs.readFileSync(keys, 'utf8'));
  const block = credentials.installed || credentials.web;
  return new google.auth.OAuth2(
    block.client_id,
    block.client_secret,
    block.redirect_uris?.[0] || 'http://127.0.0.1:4321/oauth2callback',
  );
}

async function authorizeInteractive() {
  const oAuth2Client = readOAuthClient();
  const { token } = oauthPaths();

  if (fs.existsSync(token)) {
    oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(token, 'utf8')));
    return oAuth2Client;
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });

  console.log('Authorize this app by visiting:\n', authUrl, '\n');

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const url = new URL(req.url, 'http://127.0.0.1:4321');
        if (url.pathname !== '/oauth2callback') {
          res.writeHead(404);
          res.end();
          return;
        }
        const authCode = url.searchParams.get('code');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Authorization complete.</h1><p>You can close this tab.</p>');
        server.close();
        resolve(authCode);
      } catch (error) {
        reject(error);
      }
    });
    server.listen(4321, '127.0.0.1');
  });

  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  fs.mkdirSync(path.dirname(token), { recursive: true });
  fs.writeFileSync(token, JSON.stringify(tokens, null, 2));
  console.log(`Saved token: ${token}`);
  return oAuth2Client;
}

async function uploadDoc(auth, htmlPath, title, fileId, folderId) {
  const drive = google.drive({ version: 'v3', auth });
  const media = {
    mimeType: 'text/html',
    body: fs.createReadStream(htmlPath),
  };

  if (fileId) {
    const result = await drive.files.update({
      fileId,
      media,
      requestBody: { name: title },
      fields: 'id, webViewLink',
    });
    return result.data;
  }

  const requestBody = {
    name: title,
    mimeType: 'application/vnd.google-apps.document',
  };
  if (folderId) {
    requestBody.parents = [folderId];
  }

  const result = await drive.files.create({
    requestBody,
    media,
    fields: 'id, webViewLink',
  });
  return result.data;
}

async function main() {
  loadEnvFile(path.join(ROOT, '.env.gdocs'));

  const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'datamount.config.json'), 'utf8'),
  );
  const htmlPath = path.join(ROOT, config.outputHtml);

  if (!fs.existsSync(htmlPath)) {
    console.error(`Missing prepared HTML: ${htmlPath}`);
    console.error('Run: npm run prepare:gdocs:datamount');
    process.exit(1);
  }

  const auth = await authorizeInteractive();
  const fileId = process.env.GOOGLE_DOC_ID?.trim() || '';
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID?.trim() || '';

  const result = await uploadDoc(
    auth,
    htmlPath,
    config.docTitle,
    fileId || null,
    folderId || null,
  );

  const url = result.webViewLink ||
    `https://docs.google.com/document/d/${result.id}/edit`;

  console.log(`\nGoogle Doc ${fileId ? 'updated' : 'created'} successfully.`);
  console.log(`Document ID: ${result.id}`);
  console.log(`Open: ${url}`);
  if (!fileId) {
    console.log(`\nAdd to .env.gdocs for future updates:\nGOOGLE_DOC_ID=${result.id}`);
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
