# Proflix Loyalty System --- High-Scale Loyalty Platform

**High-scale, event-driven loyalty system built to handle millions of requests per second.**
Designed with production-grade patterns: ledger-based accounting, read/write separation, idempotent event processing, and reporting isolation.

> Designed for system-level scalability, not framework benchmarks.

---

## Why This Project Exists

Most loyalty systems fail at scale due to:
- Hot counters and balance contention
- Inconsistent point calculations from retries
- Reporting queries impacting production traffic
- Databases used for both OLTP and analytics
- Poor horizontal scalability

**Proflix Loyalty** demonstrates how to design a loyalty platform that
remains **correct, scalable, and operable under heavy load**.

---

## Key Engineering Highlights

- Ledger-based accounting (append-only, auditable)
- Idempotent event handling (safe retries, no double counting)
- Redis-first reads for low latency
- Read / write separation
- Dedicated reporting database (OLAP)
- Stateless, horizontally scalable services
- Failure recovery via event replay
- Production-style observability

---

## Architecture Overview

    Client
      ↓
    API Gateway (NestJS + Fastify)
      ↓
    Auth / BFF
      ↓
    Event Bus (Kafka / Redis Streams)
      ↓
    Go Ledger Service  → PostgreSQL (OLTP)
      ↓
    Projection Workers → Redis (Hot Reads)
      ↓
    ClickHouse (Reporting / Analytics)

---

## Technology Stack

**API & Orchestration** 
- NestJS (Fastify)
- JWT Authentication
- Rate limiting

**Core Services**
- Go (net/http or Gin)
- Ledger service
- Projection workers

**Data**
- PostgreSQL --- transactional ledger
- Redis --- read, projections & caching
- ClickHouse --- analytics & reporting

**Infrastructure**
- Docker
- Kubernetes
- Github CI/CD

---

## What This Project Demonstrates

- High-throughput backend system design
- Correctness under retries and failures
- Database selection by workload
- Distributed system thinking
- Independent service scalability
- Real-world production tradeoffs

---

## Product Features

- User can log in
- User has a points balance
- User can redeem vouchers and coupons by deducting points
- After receiving a voucher, the user can use it and the voucher is marked as used

---

## Example Use Cases

- High-volume point earning
- Low-latency balance reads
- Safe event reprocessing
- Heavy analytics without OLTP impact
- Traffic spike handling

---

## Disclaimer

This is a **personal portfolio project** inspired by real-world
production challenges.
No proprietary code or internal systems are used.

---

## Author

**Felix**
Backend Engineer --- Scalable Systems & Distributed Architecture
