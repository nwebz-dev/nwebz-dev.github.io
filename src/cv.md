---
layout: base.njk
title: CV
permalink: /cv/
description: Nick Weber — site reliability and DevOps engineering.
---

# CV

{#
  STRUCTURE NOTES (HTML comments — these never render on the page):

  Order is deliberate for SRE/DevOps. Skills sit above Experience because
  both recruiters and keyword filters scan for tooling first.

  Write every Experience bullet as: action → tool → measurable outcome.
      weak:   "Responsible for CI/CD pipelines."
      strong: "Cut deploy time from 25 min to 4 by parallelising the
               test matrix in GitHub Actions across 6 runners."

  Numbers are what separate SRE CVs. Reach for: services owned, requests/sec,
  node or cluster counts, environments, MTTR, error budget, uptime, cost saved,
  toil hours eliminated, incidents handled, size of on-call rotation.

  Delete this comment block when you're done.
#}

Site reliability and DevOps engineer. {# One or two more lines: what you
specialise in, roughly what scale you've worked at, what you want next. #}

## Skills

- **Cloud** — {# AWS / GCP / Azure — name services you've actually run #}
- **Containers & orchestration** — Kubernetes, Docker
- **Infrastructure as code** — {# Terraform, Pulumi, Ansible, Helm #}
- **CI/CD** — GitHub Actions
- **Observability** — {# Prometheus, Grafana, ELK, Datadog, OpenTelemetry #}
- **Languages** — Python, Bash {# add Go if you're comfortable in an interview #}
- **Networking** — DNS, TLS, HTTP, load balancing
- **Platforms** — Linux

## Experience

### Job title — Company

**2024 – present** · Location

- {# What you owned: which systems, what scale, who depended on them. #}
- {# An automation win, with the hours or toil it removed. #}
- {# A reliability win: incident you led, MTTR or uptime you moved. #}

### Previous job title — Company

**2021 – 2024** · Location

- {# Same shape. Prefer three strong bullets over six weak ones. #}

## Projects

### nwebz.co — static site and delivery pipeline

- Eleventy site built and deployed by GitHub Actions on push to `main`, with a
  custom domain on GitHub Pages.
- Diagnosed stalled Let's Encrypt certificate provisioning via the GitHub Pages
  API; re-triggered issuance and enforced HTTPS across apex and `www`.
- Configured DNS end to end at the registrar: A records, MX, SPF, DMARC, and
  domain-level mail routing.
- Exposes a JSON content API and Atom feed generated at build time.

{# Add the PostGIS/observability project here once it exists. For SRE roles
     that one matters more than this — it shows infrastructure you operate,
     not just a site you deploy. #}

## Certifications

{# Carries real weight in this field. CKA/CKAD, AWS SAA, Terraform Associate.
     Delete this section if you have none yet — an empty heading looks worse
     than no heading. #}

## Education

### Degree — Institution

**2017 – 2021**

## Elsewhere

- [GitHub](https://github.com/nwebz-dev)
- [LinkedIn](https://www.linkedin.com/in/nick-weber-37a014a6)
- [nick@nwebz.co](mailto:nick@nwebz.co)
