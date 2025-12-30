# Proflix Loyalty API (NestJS)

The Proflix Loyalty API is the gateway and BFF layer for the Proflix Loyalty System. It exposes public and admin HTTP endpoints, handles authentication and request validation, and orchestrates reads/writes across the platform using an event-driven approach.

This service aligns with the system goals described in the main repo’s [README](../../../README.md): correctness under retries, scalable reads via projections, and isolation between transactional writes and analytics.

---

## Purpose

- Acts as the entry point for clients (web/mobile/admin).
- Performs auth, rate limiting, input validation, and idempotency.
- For write operations (earn, redeem, adjust), emits events to the bus (Kafka/Redis Streams) for processing by the ledger service.
- For read operations (balances, voucher status), serves low-latency responses using Redis projections when available.
- Keeps the API stateless and horizontally scalable.

Non-goals:
- Directly mutating ledger tables or performing analytics queries.
- Serving long-running reporting workloads.

See the high-level architecture in [README.md](../../../README.md) and the entity definitions in [docs/data-model.md](../../../docs/data-model.md).

---

## Key Responsibilities

- Authentication and session/token management (JWT).
- Member lifecycle: registration, profile queries (delegated/validated here, persisted via downstream services).
- Wallet reads: hot balance lookups from Redis projections.
- Campaign redemption API: validates requests, ensures idempotency, and publishes events for ledger processing.
- Voucher/Coupon operations: query status, mark usage via event flow.
- Observability: request logging, metrics, and traces (OTel ready).

---

## Dependencies

- Event Bus: Kafka (preferred) or Redis Streams.
- Redis: for projections and cache.
- Ledger Service: processes events and writes to PostgreSQL (OLTP).
- PostgreSQL: transactional store (accessed by downstream services, not directly from this API for writes).
- Optional: ClickHouse (analytics) — not queried by this API.

Infrastructure compose is available at [infrastructure/docker/docker-compose.yml](../../../infrastructure/docker/docker-compose.yml).

---

## Quick Start

Install dependencies:

```bash
npm install
```

Start local infrastructure (from repo root):

```bash
docker compose -f infrastructure/docker/docker-compose.yml up -d
```

Run the API:

```bash
# development
npm run start

# watch mode
npm run start:dev

# production
npm run start:prod
```

Environment variables (example):

```bash
PORT=3000
JWT_SECRET=replace_me
REDIS_URL=redis://localhost:6379
KAFKA_BROKER=localhost:9092
IDEMPOTENCY_TTL_SECONDS=600
```

---

## Endpoint Sketch (subject to change)

- `GET /health` — health check.
- `POST /auth/login` — issues JWT.
- `GET /members/:id/wallets/:type/balance` — hot read from projections.
- `POST /campaigns/:id/redeem` — validates, enforces idempotency, publishes event.
- `POST /vouchers/:code/use` — marks usage via event flow.

Refer to entities in [docs/data-model.md](../../../docs/data-model.md) for IDs and statuses.

---

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage
npm run test:cov
```

---

## Notes

- This service prioritizes read/write separation and correctness under retries.
- All mutating operations should include an idempotency key (e.g., `X-Idempotency-Key`).
- Heavy analytics belong to the reporting stack; avoid coupling this API to OLAP queries.
