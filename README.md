# TradePilot AI

AI-powered stock analysis and trading signal platform.

## Structure

| Folder            | Purpose                                 |
| ----------------- | --------------------------------------- |
| `frontend/`       | Next.js web application                 |
| `backend/`        | Spring Boot microservices               |
| `infrastructure/` | Terraform / AWS CDK IaC                 |
| `docs/`           | Architecture, API, and design documents |
| `.github/`        | CI/CD workflows and issue templates     |

## Quick Start

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Backend API Documentation

- Start the backend from `backend/TradePilotBackendApplication` with:
  - `./mvnw.cmd spring-boot:run`
- Once running, open the Swagger UI at:
  - `http://localhost:8080/swagger-ui/index.html`
- Use Swagger UI to explore endpoints, view request/response schemas, and execute API calls.

## API Testing

- Use Swagger UI for manual endpoint testing.
- Use `curl` for command-line validation, for example:

```powershell
curl -X GET "http://localhost:8080/api/trade-entries" -H "Accept: application/json"
```

- Use Postman or HTTP clients to call the same endpoints with JSON payloads.
- Add automated tests in the backend module under `src/test/java` for each REST controller and service layer.
