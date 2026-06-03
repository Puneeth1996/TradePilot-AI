# PROJECT MEMORY

## Purpose

Single source of truth for project history.

## Architecture Decisions

- Backend uses Spring Boot 3.2.4 with SQLite via Hibernate community dialect.
- Backend package root is `com.tradepilot` and Spring Boot scan is configured accordingly.

## Lessons Learned

- IDE and Maven must use the same JDK runtime as the system `java -version` output.
- `pom.xml` build target must match the runtime JDK to avoid Spring Boot launch mismatches.
- Confirm `src/main/java` is the actual source root and package paths match the filesystem.

## AI Prompt Improvements

- Future agents should ask for runtime JDK and IDE configuration before changing Java target versions.

## Technical Debt

- Backend is scaffolded but still requires feature implementation and API contract stabilization.
- No CI/CD pipeline exists yet.

## Future Plans

- Complete backend modules for dashboard, watchlist, goals, analytics.
- Add frontend Next.js integration and API wiring.
- Add deployment/infrastructure automation and testing.

## Notes For Future Agents

Always document WHY a change was made, not only WHAT changed.

- Current backend is scaffolded and starts successfully on Java 17.
- Continue with backend REST APIs and frontend skeleton.
- Keep project docs updated in `project/` for status, handoff, and future planning.
