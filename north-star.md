# North Star

Version 2 turns `Project Cockpit` into an adidas price-comparison tracker that scrapes selected retailers, normalizes premium-product offers, compares prices across stores, and produces large-language-model outputs about notable changes or expensive items. The project stays local-first: source definitions, scraper rules, extracted snapshots, prompts, outputs, work logs, and architecture notes all remain readable in plain files.

## Target Outcome

Build a working loop:

1. define retailer sources for adidas products
2. scrape premium product offers
3. normalize product names, prices, links, and metadata
4. compare the same product across retailers and against prior snapshots
5. send notable spreads or changes to an LLM
6. store and review the generated output

## V2 Architecture

- `src/`: UI for sources, runs, snapshots, and generated reactions
- `src/`: UI for product rankings, price spreads, and generated reactions
- `docs/architecture/`: scraper and pipeline design notes
- `docs/worklog/`: implementation sessions and verification
- `docs/todos/`: prioritized build steps
- `memory/`: stable project facts, rules, and source conventions
- `data/sources/`: source definitions
- `data/snapshots/`: scraped raw or normalized results
- `data/reactions/`: LLM outputs and run summaries
- `data/offers/`: normalized cross-retailer product offers

## Immediate Build Plan

1. define the first retailer set
2. define a source configuration format
3. define the normalized offer schema
4. build the first scraper flow for one retailer
5. add product matching and price-spread detection
6. define the LLM prompt contract and output format
7. surface comparison results in the app

## Constraints

- start with a small retailer set and one extraction path per retailer
- keep the first pipeline inspectable and file-based
- prefer deterministic extraction before prompt-based interpretation
- log every substantial run and record follow-up tasks
