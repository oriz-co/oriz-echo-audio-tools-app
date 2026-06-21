---
type: index
title: "oriz-echo-audio-tools-app — knowledge bundle"
description: "App-specific knowledge for oriz-echo-audio-tools-app. Cross-cutting family rules live at master `c:/D/oriz/knowledge/`."
tags: [okf, index, app, echo-audio-tools]
timestamp: 2026-06-21
format_version: okf-v0.1
status: active
---

# oriz-echo-audio-tools-app — knowledge bundle

This is the per-app OKF-light bundle for **oriz-echo-audio-tools-app**. App-specific facts only. Cross-cutting family rules / decisions / services live at master [`../../../../knowledge/`](../../../../knowledge/).

## Subdirs

- [`decisions/`](./decisions/) — app-specific architectural / naming / stack decisions
- [`runbooks/`](./runbooks/) — operational procedures specific to this app
- [`services/`](./services/) — external services used only by this app (most services are family-wide and live at master)

## App snapshot

- **Subdomain**: https://audio.oriz.in
- **Category**: tools
- **Family role**: Browser-based audio tools under the Echo product brand — all processing local via FFmpeg.wasm.

## Cross-refs

- Family rules → [`master knowledge/rules/`](../../../../knowledge/rules/)
- Family decisions → [`master knowledge/decisions/`](../../../../knowledge/decisions/)
- 15 family packages → [`master knowledge/architecture/the-six-packages.md`](../../../../knowledge/architecture/the-six-packages.md)
- 8 hard rules → [`master AGENTS.md`](../../../../AGENTS.md)
