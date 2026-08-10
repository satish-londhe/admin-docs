# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

Or with npm:

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Run production build locally

Use this to preview the site exactly as it will appear in production (recommended for testing **local search** and final output):

```bash
npm run build
npm run serve
```

Open **http://localhost:3000**

Custom host or port:

```bash
npm run serve -- --host 0.0.0.0 --port 3001
```

With yarn:

```bash
yarn build
yarn serve
```

**Note:** `yarn start` / `npm start` is **development mode** — hot reload, not the production build. Use `build` + `serve` when you need production behaviour.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## MCP sources for AI doc generation

To let Cursor read **Read.ai** meetings and **Google Docs** when writing docs (not shown on the public site), see [.cursor/MCP-SETUP.md](.cursor/MCP-SETUP.md).

**Colleague / agent handoff:** start with [AGENTS.md](AGENTS.md) and the full playbook in [.cursor/README.md](.cursor/README.md) so any documentation section can continue without prior chat history.

For **ChatGPT** or other AI tools, copy the writing instructions from [.cursor/CHATGPT-PROMPT.md](.cursor/CHATGPT-PROMPT.md).

Quick start:

1. Open **Cursor Settings → Tools & MCP** and connect **read-ai** and **google-drive**
2. Complete Google OAuth once (see [.cursor/MCP-SETUP.md](.cursor/MCP-SETUP.md))
3. Primary source doc: [CMP Admin Documentation (Google Doc)](https://docs.google.com/document/d/1H44tP15QM6yN9D_3zieNI_GiZT4yGFTYPD00uoNfgwo/edit) — also listed in `.cursor/sources.json`
4. Features list source: [Features List - Documentation is Required](https://docs.google.com/document/d/154BSmee2KfUPvHxLUKWUCBgKpHdqi6PC0elVmiVZTvA/edit?tab=t.p71d8pm7oowt)
5. In Agent chat: *"Read the primary Google Doc source and update connecting.md"*

## Dev server (custom host/port)

```bash
npm run start -- --host 0.0.0.0 --port 3001
```

## Links

- Staging: http://admindoc.stackpoc.in/
- Reference: https://docs.multiportal.io/

http://localhost:3001/engagements/datamount/