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

This command generates static content into the `build` directory and can be served using any static contents hosting service.

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

For **ChatGPT** or other AI tools, copy the writing instructions from [.cursor/CHATGPT-PROMPT.md](.cursor/CHATGPT-PROMPT.md).

Quick start:

1. Open **Cursor Settings → Tools & MCP** and connect **read-ai** and **google-drive**
2. Complete Google OAuth once (see [.cursor/MCP-SETUP.md](.cursor/MCP-SETUP.md))
3. Primary source doc: [CMP Admin Documentation (Google Doc)](https://docs.google.com/document/d/1H44tP15QM6yN9D_3zieNI_GiZT4yGFTYPD00uoNfgwo/edit) — also listed in `.cursor/sources.json`
4. In Agent chat: *"Read the primary Google Doc source and update connecting.md"*

npm run start -- --host 0.0.0.0 --port 3001