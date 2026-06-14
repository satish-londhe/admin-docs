# MCP setup for doc generation sources

These MCP servers let Cursor read **Read.ai meeting notes** and **Google Docs/Drive files** when generating CMP admin documentation. They are for the AI assistant only — not published on the docs site.

Registered sources are listed in [sources.json](./sources.json).

## Registered Google Docs

| Role | Title | Doc ID |
|------|-------|--------|
| **Primary** | Copy of CMP Admin Documentation - CHATGPT | `1H44tP15QM6yN9D_3zieNI_GiZT4yGFTYPD00uoNfgwo` |

- [Open in Google Docs](https://docs.google.com/document/d/1H44tP15QM6yN9D_3zieNI_GiZT4yGFTYPD00uoNfgwo/edit)
- MCP resource: `gdrive:///1H44tP15QM6yN9D_3zieNI_GiZT4yGFTYPD00uoNfgwo`

**Example prompt:** *"Read the primary Google Doc source and update `docs/orchestrators/cloudstack/connecting.md`"*

## 1. Reload Cursor

After editing `mcp.json`:

1. Open **Cursor Settings → Tools & MCP**
2. Confirm **read-ai** and **google-drive** appear
3. Click **Connect** / authorize each server (green indicator = ready)
4. Use **Agent** mode in chat so tools can run

## 2. Read.ai (remote MCP)

- **Server:** `https://api.read.ai/mcp`
- **Auth:** OAuth with your Read.ai account (handled in Cursor UI)
- **Tools:** list meetings, get meeting by ID (transcript, summary, action items)

No API keys in this repo.

**Example prompts after connecting:**

- "List my Read.ai meetings from the last 7 days about CloudStack"
- "Pull the transcript from meeting `<ulid>` and draft `docs/orchestrators/cloudstack/zones.md`"

Docs: https://support.read.ai/hc/en-us/articles/49381158409491-MCP-Server

## 3. Google Drive / Docs (local MCP server)

### One-time Google Cloud setup

1. Go to https://console.cloud.google.com/
2. Create or select a project
3. Enable APIs: **Google Drive API**, **Google Docs API**, **Google Sheets API**
4. **OAuth consent screen** → configure (Internal if using Google Workspace)
5. **Credentials → Create credentials → OAuth client ID → Desktop app**
6. Download the JSON file

### Save credentials (outside the repo)

```bash
mkdir -p ~/.config/cmp-docs
mv ~/Downloads/client_secret_*.json ~/.config/cmp-docs/gcp-oauth.keys.json
```

Paths configured in `.cursor/mcp.json`:

- OAuth keys: `~/.config/cmp-docs/gcp-oauth.keys.json`
- Saved token: `~/.config/cmp-docs/.gdrive-server-credentials.json`

Update those paths in `.cursor/mcp.json` if your username differs.

### Authenticate once

```bash
GDRIVE_OAUTH_PATH=~/.config/cmp-docs/gcp-oauth.keys.json \
GDRIVE_CREDENTIALS_PATH=~/.config/cmp-docs/.gdrive-server-credentials.json \
npx -y @modelcontextprotocol/server-gdrive auth
```

Follow the browser OAuth flow. A token file is cached for future sessions.

If Cursor does not show the auth URL, run the command above in a terminal first, then restart Cursor.

### Example prompts after connecting

- "Read the Google Doc `<doc-id>` and update `docs/orchestrators/cloudstack/templates/template-requirements.md`"
- "Search Google Drive for 'CloudStack storage settings' and draft a new page from it"

## 4. Security

- Do **not** commit OAuth JSON files or tokens
- `.gitignore` excludes `/.config/` paths under the project and local credential files
- Share this repo safely — only `mcp.json` structure is committed, not secrets

## 5. Troubleshooting

| Issue | Fix |
|-------|-----|
| MCP tools not used | Switch to **Agent** mode, not Ask |
| Read.ai not connecting | Settings → Tools & MCP → Connect read-ai |
| Google Drive auth fails | Re-run `npx -y @modelcontextprotocol/server-gdrive auth` |
| Wrong Google account | Revoke access at https://myaccount.google.com/permissions and re-auth |
