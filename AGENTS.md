# TradePilot AI - Agent Operating Instructions

## Purpose

This repository is designed to be developed collaboratively by multiple AI coding agents and human contributors over an extended period.

The primary objective of this file is to ensure:

* Context preservation
* Architectural consistency
* Knowledge transfer
* Continuous improvement
* Reliable agent handoff

Every AI agent must treat this file as mandatory project guidance.

---

# Agent Startup Procedure

Before making any code changes, read the following files in order:

1. docs/ARCHITECTURE.md
2. docs/ROADMAP.md
3. project/PROJECT_MEMORY.md
4. project/CURRENT_STATE.md
5. project/NEXT_STEPS.md
6. project/DECISIONS.md
7. project/KNOWN_ISSUES.md

Do not begin implementation until these files have been reviewed.

---

# Agent Responsibilities

Every agent is responsible for:

* Understanding current architecture
* Respecting previous design decisions
* Avoiding unnecessary rewrites
* Preserving maintainability
* Updating project memory

Agents must optimize for long-term project health rather than short-term task completion.

---

# Required Documentation Updates

Before completing any work, update:

* project/WORK_LOG.md
* project/CURRENT_STATE.md
* project/NEXT_STEPS.md
* project/AGENT_HANDOFF.md

If architectural decisions were made:

* update project/DECISIONS.md

If important lessons were learned:

* update project/PROJECT_MEMORY.md

If technical debt was introduced:

* document it in project/PROJECT_MEMORY.md

---

# Work Logging Standard

Every work session must record:

```
Date:
Agent Name:
Model:
Task:
Files Modified:
Result:
Build Status:
Tests Status:
Notes:
Recommended Next Step:
```

Example:

```
Date: 2026-06-03
Agent: GitHub Copilot
Model: GPT-5
Task: Implemented Trade Journal CRUD
Files Modified:
  - Trade.java
  - TradeRepository.java
  - TradeService.java
Result: Completed
Build Status: Passing
Tests: Passing
Recommended Next Step: Implement Journal Controller
```

---

# Architecture Rules

Required Architecture:

* Clean Architecture
* Domain Driven Design (DDD)
* SOLID Principles
* Feature-first organization

Prohibited:

* Business logic in Controllers
* Database access from UI
* Circular dependencies
* Hardcoded secrets
* Direct OpenAI calls from frontend

---

# Code Quality Requirements

All generated code must:

* Compile successfully
* Include meaningful naming
* Include error handling
* Follow project conventions
* Be production quality

Avoid:

* TODO placeholders without explanation
* Dead code
* Unused dependencies
* Magic numbers

---

# AI Feature Guidelines

When implementing AI features:

Always provide:

* Reasoning
* Confidence score
* Risk explanation
* Supporting evidence

Never present AI output as guaranteed financial advice.

All AI outputs must be explainable.

---

# Learning System

This repository should improve over time.

When a mistake is discovered:

1. Record it in PROJECT_MEMORY.md
2. Record mitigation steps
3. Update future implementation guidance

The goal is for future agents to avoid repeating previous mistakes.

---

# Agent Handoff Requirements

Before finishing, update:

* project/WORK_LOG.md
* project/CURRENT_STATE.md
* project/NEXT_STEPS.md
* project/AGENT_HANDOFF.md

The next agent should be able to continue development without reading the entire codebase.

---

# Definition of Done

A task is considered complete only when:

- [ ] Code implemented
- [ ] Build successful
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Handoff completed
- [ ] Next steps identified

---

# Repository Memory Philosophy

PROJECT_MEMORY.md is the project's long-term memory.

Agents must document:

* Important decisions
* Lessons learned
* Failed approaches
* Technical debt
* Optimization opportunities

Future agents should be able to understand:

* What was built
* Why it was built
* What should happen next

without needing direct communication with previous agents.

---

# Success Metric

A brand-new AI agent should be able to:

1. Read project documents
2. Understand project status
3. Continue implementation
4. Update project memory
5. Hand off work

with minimal human intervention.
