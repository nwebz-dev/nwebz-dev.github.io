---
layout: base.njk
title: CV
permalink: /cv/
description: Nick Weber — Observability and Site Reliability Engineering.
---
<div class="print-only cv-identity">
	<h1>{{ site.author }}</h1>
	<p>{{ site.social.email }} · {{ site.social.github }} · {{ site.social.linkedin }}</p>
</div>

<a class="cv-download" href="/cv.pdf" download="nick-weber-cv.pdf">
	<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
		<path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" />
		<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
	</svg>
	Download PDF
</a>

# Observability & Site Reliability Engineer

## Skills:

- **Linux** — System Administration
- **Languages** — Python, Bash, Go, SQL
- **Observability** — ELK, Splunk, Prometheus, Grafana, OTEL
- **Cloud** — AWS, Google Cloud
- **Containers & Orchestration** — Kubernetes, Docker, LXC
- **CI/CD** — Concourse, GitHub Actions
- **Configuration Management** — Ansible
- **Infrastructure as Code** — Terraform
- **Version Control** — Git
- **Networking** — DNS, TLS, HTTP, Load Balancing
- **GIS** — Spatial Data Management, Esri Suite, FOSS4G, PostGIS, GeoServer, Leaflet

## Experience:
### Engineer III — Comcast (DevX Group):
**September 2024 – March 2026** · Philadelphia, PA

- Ran and maintained a multi-tenant Elasticsearch observability logging
  platform spanning distinct Kubernetes clusters, carrying upwards of 300 TB
  of logs a day for more than 200 engineering teams company-wide.
- Troubleshot search latency across the platform's clusters, working from
  Grafana dashboards of per-volume storage utilisation and availability-zone
  placement to trace recurring degradation to data-node PVCs reaching capacity.
- Managed persistent storage for the platform: PVC provisioning and volume
  migration for Elasticsearch data nodes.
- Shared a 24/7 on-call rotation across 12 engineers, handling production
  incidents and support for tenant teams.
- Built custom Ansible modules for gathering individual Kubernetes deployment
  information.
- Contributed to migrating CI/CD pipelines from Concourse to GitHub Actions.

### Engineer III — Comcast (Network Services Engineering Group):
**February 2019 – September 2024** · Philadelphia, PA

- Owned system administration for 12 distinct ELK clusters running on a
  self-hosted instance of [ECE](https://www.elastic.co/ece/), which averaged ~12 TB of daily ingest.
  - Performed version upgrades and blue-green migrations for all deployments.
  - Patched security vulnerabilities, including Log4j.
  - Managed user access and role-based access control.
  - Configured SSO endpoints.
  - Troubleshot search latency and cluster performance degradation.
  - Maintained Logstash filters for log transformation.
- Presented monthly ECE platform metrics with Grafana, Prometheus, and Splunk to management for internal SysQ (systemic quality) meetings.
- Resolved on-call production issues for both ECE and Splunk platforms, as well as ongoing daily support.
- Provided EDA (exploratory data analysis) on speed-test data from the Internet
  Measurement Platform in Databricks — Spark for data processing, scikit-learn
  and Keras for modelling — to identify latency trends across the network.

### Engineer II — Comcast (Network Services Engineering Group):

**August 2018 – February 2019** · Philadelphia, PA
- Splunk Platform Administration:
  - Scheduled and performed version upgrades across every component of the
    Splunk architecture: Universal Forwarders, Heavy Forwarders, Indexers, and
    clustered Search Heads.
  - Adjusted configuration files (props.conf, transforms.conf) on behalf of
    users for correct log parsing: data masking and filtering, field
    extractions, and timestamp recognition.
  - Managed IP allowlists for users sending data to the Splunk Universal
    Forwarders.
  - Provided 24/7 user support as part of a four-person on-call rotation.
- Continued ownership of Usage-Based Billing reporting from Splunk (see below).

### Computer Enterprises at Comcast (contract)
**January 2018 – August 2018** · Philadelphia, PA
- Owned delivery assurance for subscriber usage-threshold notifications, where
  a missed notification was revenue-impacting.
- Built and maintained Splunk dashboards aggregating ~50 KPIs from logs
  across every data-processing component of the billing pipeline, delivered
  daily to leadership.
- Maintained and scheduled the ingestion pipelines — dataset joins, timestamp reconciliation,
  field pruning — adapting them as upstream log formats changed.
- Diagnosed failed runs of ETL scripts and backfilled the report ahead of scheduled delivery.

### Data Services Intern — City of Philadelphia

**August 2015 – June 2017** · Philadelphia, PA

- Maintained spatial and non-spatial municipal datasets, and their metadata, on
  [OpenDataPhilly](https://opendataphilly.org/) — the city's open data portal.
- Built Python tooling against the portal's CKAN API to publish dataset updates
  programmatically.

## Education:

### Certificate in Geographic Information Systems — Community College of Philadelphia

**2015**

### BA Philosophy, minor Cognitive Science — University at Albany, SUNY

**2009**

<h2 class="print-hide">Elsewhere:</h2>

{% set socialOnly = ["github", "linkedin", "email"] %}
{% include "social.njk" %}
