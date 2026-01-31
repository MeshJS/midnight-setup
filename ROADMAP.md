# Roadmap

Dates below are targets and may shift based on upstream changes and ecosystem priorities.

## Milestone 1 — Dependency & Tooling Refresh (Target: March 31, 2026)

- Upgrade core dependencies across packages (Midnight SDKs, Compact compiler, UI libraries)
- Resolve deprecations and security advisories
- Publish an updated SBOM
- Acceptance criteria:
  - Builds succeed on CI for all workspaces
  - Updated lockfile committed
  - SBOM refreshed and documented

## Milestone 2 — Reliability & Test Coverage (Target: June 30, 2026)

- Add smoke tests for setup workflows (deploy, join, read state)
- Add basic CLI/API integration tests where feasible
- Document test coverage and known gaps
- Acceptance criteria:
  - Tests run in CI and pass
  - Test documentation updated in README

## Milestone 3 — UX & Operator Improvements (Target: September 30, 2026)

- Improve onboarding UX for dApp setup and contract workflows
- Add clearer network configuration messaging in UI/CLI
- Update documentation with common troubleshooting steps
- Acceptance criteria:
  - Updated UI/CLI documentation
  - Demo flow completed without manual patching
