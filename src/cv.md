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

## Skills:

- **Cloud** — {# AWS / GCP / Azure — name services you've actually run #}
- **Containers & orchestration** — Kubernetes, Docker
- **Infrastructure as code** — Ansible {# add Terraform/Helm if you use them #}
- **CI/CD** — GitHub Actions
- **Observability** — Splunk {# add Prometheus/Grafana/ELK if you've used them #}
- **Languages** — Python, Bash {# add Go if you're comfortable in an interview #}
- **Networking** — DNS, TLS, HTTP, load balancing
- **Geospatial** — spatial data management, PostGIS {# name the stack you'd
  defend in an interview: QGIS, ArcGIS, GDAL/OGR, GeoJSON, shapefiles #}
- **Platforms** — Linux (system administration)

## Experience:

### Data Engineer III — Comcast

**January 2018 – March 2026** · Philadelphia, PA

Joined as a contractor through Computer Enterprises as Engineer I; converted to
full-time employee in August 2018.

{# The main event — 8+ years. Aim for 4–5 bullets here, more than anywhere
   else on the page. You've tagged Linux administration and Ansible on
   LinkedIn, so lead with the infrastructure work rather than the pipelines:
   that's the bridge from data engineering into SRE.

   - What you own: which systems, how many, what depends on them.
   - Ansible: what you automated, and the toil it removed.
   - Linux/infrastructure at scale: fleet size, environments.
   - Reliability: on-call, an incident you led, uptime or MTTR you moved.
   - Data platform work, stated in terms of volume or throughput. #}

- Owned delivery assurance for subscriber usage-threshold notifications, a
  revenue-critical path: an undelivered warning meant the resulting overage
  could not be billed.
- Built and maintained the observability layer over that path — log ingestion
  pipelines and processing scripts that joined across datasets, reconciled
  timestamps, and pruned fields to normalise output from every architectural
  component in the delivery chain into a 50-KPI Splunk dashboard reported to
  Network Services Engineering leadership.
- Extended and adapted those pipelines as upstream log formats changed, keeping
  ingestion working across components owned by other teams.
- Diagnosed failed pipeline runs, reran jobs, and backfilled the report ahead of
  its scheduled delivery to keep executive reporting accurate.
  {# Strongest possible version of this bullet: did you ever automate the
     detection, the rerun, or the backfill? "Automated X, eliminating Y hours
     of manual reruns per week" beats describing the manual process. #}
- {# bullet: Ansible — what you automated and what it replaced #}
- {# bullet: Linux fleet — how many hosts, how many environments #}
- {# bullet: on-call / incident response, with a number if you have one #}

### Data Services Intern — City of Philadelphia

**August 2015 – June 2017** · Philadelphia, PA

- Maintained spatial and non-spatial municipal datasets published on
  [OpenDataPhilly](https://opendataphilly.org/), the city's public open data
  portal, along with the internal metadata catalogue describing them.
- Developed Python tooling against the portal's CKAN API to update datasets
  programmatically.
  {# Worth adding if you can recall: how many datasets the tooling covered, and
     whether it replaced a manual upload process. "Automated updates for N
     datasets, replacing manual publishing" is the strongest version. #}

## Projects:

### Lorem ipsum dolor sit amet

- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua.
- Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat.
- Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
  eu fugiat nulla pariatur.

### Excepteur sint occaecat

- Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
  deserunt mollit anim id est laborum.
- Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
  doloremque laudantium.

{# ── PARKED: real project text, restore when you're ready ──────────────────

### nwebz.co — static site and delivery pipeline

- Eleventy site built and deployed by GitHub Actions on push to `main`, with a
  custom domain on GitHub Pages.
- Diagnosed stalled Let's Encrypt certificate provisioning via the GitHub Pages
  API; re-triggered issuance and enforced HTTPS across apex and `www`.
- Configured DNS end to end at the registrar: A records, MX, SPF, DMARC, and
  domain-level mail routing.
- Exposes a JSON content API and Atom feed generated at build time.

Add the PostGIS/observability project here once it exists. For SRE roles that
one matters more than this — it shows infrastructure you operate, not just a
site you deploy.
───────────────────────────────────────────────────────────────────────────── #}

## Education:

### Certificate in Geographic Information Systems — Community College of Philadelphia

**2015**

### BA Philosophy, minor Cognitive Science — University at Albany, SUNY

**2009**

## Elsewhere:

{% set socialOnly = ["github", "linkedin", "email"] %}
{% include "social.njk" %}
