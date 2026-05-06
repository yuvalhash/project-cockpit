# Overview

`Project Cockpit` is moving into `v2` as a local-first adidas price tracker with a scraper and LLM reaction pipeline. The source of truth remains plain files so scraper rules, extracted data, decisions, logs, and outputs stay easy to inspect and version.

## Core parts

- `src/`: user-facing starter app
- `docs/worklog/`: append-only session records
- `docs/todos/`: task pipeline
- `docs/architecture/`: durable design notes
- `memory/`: stable project facts and working conventions
- `data/sources/`: source definitions
- `data/snapshots/`: captured or normalized scrape results
- `data/offers/`: normalized cross-retailer offers
- `data/reactions/`: LLM outputs tied to runs or triggers

## Workflow

1. Plan the next task.
2. Scrape adidas offers from selected retailers.
3. Normalize products and compare price spreads.
4. Generate and store the LLM reaction for expensive or changed items.
5. Record the work in the log and update architecture or memory when durable knowledge changes.
