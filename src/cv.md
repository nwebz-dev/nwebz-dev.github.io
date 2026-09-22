---
layout: base.njk
title: CV
permalink: /cv/
description: Nick Weber — Site Reliability and DevOps Engineering.
---

# CV

{#- On screen the site header carries the name and the Elsewhere section
    carries the links. Print drops both, so the PDF needs them on the page
    itself — a CV whose only contact details are three unlabelled icons is
    no use to whoever opens the file. #}

<div class="print-only cv-identity">
	<h1>{{ site.author }}</h1>
	<p>{{ site.social.email }} · {{ site.social.github }} · {{ site.social.linkedin }}</p>
</div>

{#- Built by scripts/cv-pdf.js from this very page, on every production
    build, so it cannot drift from what is written below. #}

<a class="cv-download" href="/cv.pdf" download="nick-weber-cv.pdf">
	<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
		<path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" />
		<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
	</svg>
	Download PDF
</a>

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

- **Cloud** — AWS, Google
- **Linux** — System Administration
- **Containers & orchestration** — Kubernetes, Docker
- **Infrastructure as code** — Ansible
- **CI/CD** — Concourse; GitHub Actions
- **Observability** — ELK, Splunk, Grafana, OTEL
- **Languages** — Python, Bash, Go
- **Networking** — DNS, TLS, HTTP, load balancing
- **GIS** — Spatial Data Management, Esri suite, FossGeo, PostGIS, GeoServer, Leaflet

## Experience:

### Engineer III — Comcast:
**February 2019 –  March 2026** · Philadelphia, PA

- Owned system administration for 12 distinct ELK clusters running on a self-hosted instance of [ECE](https://www.elastic.co/ece/).
- Presented monthly ECE platform metrics with Grafana, Prometheus, and Splunk for internal SysQ (systemic quality) meetings.
- Resolved oncall production issues for both ECE and Splunk platfroms, as well as ongoing daily support.

### Engineer II - Comcast:
* Splunk Administration for Networking Services Engineering Group
* Owned Usage Based Billing reporting from Splunk

### Computer Enterprises (contract)
**January 2018 –  August 2018** · Philadelphia, PA
{# The main event — 8+ years. Aim for 4–5 bullets here, more than anywhere
   else on the page. You've tagged Linux administration and Ansible on
   LinkedIn, so lead with the infrastructure work rather than the pipelines:
   that's the bridge from data engineering into SRE.

   - What you own: which systems, how many, what depends on them.
   - Ansible: what you automated, and the toil it removed.
   - Linux/infrastructure at scale: fleet size, environments.
   - Reliability: on-call, an incident you led, uptime or MTTR you moved.
   - Data platform work, stated in terms of volume or throughput. #}

- Owned delivery assurance for subscriber usage-threshold notifications, where a
  missed warning meant the overage could not be billed.
- Built the Splunk observability layer over that path: 50 KPIs aggregated from
  logs across every component, reported to engineering leadership.
- Maintained the ingestion pipelines — dataset joins, timestamp reconciliation,
  field pruning — adapting them as upstream formats changed.
- Diagnosed failed runs and backfilled the report ahead of scheduled delivery.
  {# Stronger if you automated any of this: "Automated detection and backfill,
     eliminating N hours of manual reruns per week." #}

### Data Services Intern — City of Philadelphia

**August 2015 – June 2017** · Philadelphia, PA

- Maintained spatial and non-spatial municipal datasets, and their metadata, on
  [OpenDataPhilly](https://opendataphilly.org/) — the city's open data portal.
- Built Python tooling against the portal's CKAN API to publish dataset updates
  programmatically.
  {# Worth adding if you can recall: how many datasets the tooling covered, and
     whether it replaced a manual upload process. "Automated updates for N
     datasets, replacing manual publishing" is the strongest version. #}

## Education:

### Certificate in Geographic Information Systems — Community College of Philadelphia

**2015**

### BA Philosophy, minor Cognitive Science — University at Albany, SUNY

**2009**

<h2 class="print-hide">Elsewhere:</h2>

{% set socialOnly = ["github", "linkedin", "email"] %}
{% include "social.njk" %}
