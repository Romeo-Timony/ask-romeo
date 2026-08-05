---
docId: romeo.past-work-experience.en
title: "Romeo Timony Professional Experience"
language: en
sourceType: professional-experience
visibility: public
freshness: needs-review
confidence: medium
relatedEntities: [profile.romeo, experience.sminex, experience.messer-group, experience.dpd, experience.kode, experience.industry]
sourceUpdatedAt: "2026-07-08"
---

# Romeo Timony Professional Experience

> Document status: draft for verification by the owner before uploading to RAG.
> Sources: "past experience.docx", resume "Resume QA engineer.pdf", updated July 8, 2026, internal materials on architecture and Mobile GitFlow Sminex App, mobile autotests regulations dated July 7, 2026, and corporate AI platform review dated July 9, 2026. In case of discrepancies in dates and current place of work, priority is given to the resume. Formulations are shortened and cleaned from personal and internal infrastructure data.

## Brief Professional Positioning

Romeo Timony is a Senior QA Engineer with an engineering background and experience in industrial quality, project management, and digital product testing. According to the resume, as of July 8, 2026, relevant experience in QA and IT is 5 years 1 month. Prior to transitioning to IT, he was involved in quality control and assurance, safety, customer processes, and project work in international and manufacturing companies.

In IT, Romeo developed from a project administrator to a Senior QA Engineer. His main profile is building QA processes, functional, integration, system, and regression testing of Web, Mobile, and API, verification of E2E business processes, requirements analysis, working with test documentation, logs, and databases. An additional area is the application of AI/LLM tools to prepare test scenarios, test data, and analyze documentation.

## Current QA Experience Chronology

- **November 2024 — present:** Sminex, Senior QA Engineer.
- **September 2023 — November 2024:** Messer Group, Test Engineer / QA Engineer.
- **August 2021 — September 2023:** DPD Russia, Test Engineer / QA Engineer.
- **Before DPD:** IT project administration in KODE and earlier quality and project management experience. Exact dates of separate early roles are not specified in the resume, so they are not reconstructed in this document.

## Sminex — Senior QA Engineer

**Entity ID:** `experience.sminex`

**Period:** November 2024 — present as of July 8, 2026.

### Role and Context

Romeo works as a Senior QA Engineer in the IT Department of Sminex and is responsible for building, scaling, and optimizing QA processes for the mobile application and the Sminex App ecosystem. He helped transition the product from an unstructured startup phase to a controlled and transparent quality phase.

The cross-functional team has 23 people and includes a Product Owner, Scrum Master, analysts, architect, DevOps, Backend and Frontend developers, designer, four QAs, one AQA, and 1C developers.

### Core QA Tasks

- developing and updating test cases and checklists in Zephyr and Allure TestOps;
- functional, system, integration, and regression testing of Sminex App on iOS and Android, Web interfaces, and adjacent systems;
- localizing defects and preparing bug reports in Jira with logs and screenshots;
- early requirements testing using the Shift-Left approach, verifying specifications according to INVEST and SMART criteria;
- monitoring errors and logs in Sentry for three days after each release;
- evaluating QA effort, planning sprints, and participating in Scrum ceremonies;
- piloting AI/LLM tools to generate varied test cases and test data.

### Confirmed Results

- expanded the test base of key Sminex App modules from 10% to 85–95%, creating over 2000 test scenarios;
- developed a three-level regression strategy: MIN / MID / MAX;
- reduced the share of critical defects missed in Production to less than 5%;
- due to early requirements review, reduced the number of inaccuracies in development by 30%;
- improved the accuracy of sprint planning for the team by 15% due to QA effort estimation;
- prepared a test automation strategy with an expected regression time reduction of 40%. The last figure is the expected effect of the strategy, not an already achieved result.

### Technologies and Tools

Jira, Confluence, Zephyr, Allure TestOps, GitLab CI, Sentry, REST API, Postman, ApiDog, DBeaver, Android Studio, Proxyman, Charles, TestFlight, Firebase, DevTools, Figma, and AI/LLM tools are confirmed in personal QA work. Appium, Python, Pytest, Page Object Model, and Allure stack is used for mobile automation.

In the current product architecture, native Swift and Kotlin clients, a Next.js web cabinet, a .NET microservice backend, an API Gateway, Keycloak, PostgreSQL, Kafka, GitLab, Kubernetes, Yandex Cloud, and an S3-compatible object storage are used. Transport between individual components includes HTTP/2 and HTTPS. Detailed topology and internal identifiers are intentionally excluded from the public RAG document.

### Architectural Context of Sminex App

Sminex App is an ecosystem of client applications and services for property owners. Native iOS and Android applications and the Web cabinet use a single Backend. Access to domain services passes through the API Gateway, and authorization is centralized in a separate identity and access management service.

The Backend is divided into domain microservices responsible for requests, finances, meter readings, polls, profile, news and offers, video cameras, general functions, notifications, and working with files. Data is stored in PostgreSQL with logical separation by services, and files are stored in object storage.

Integration with internal accounting and CRM systems is built on event exchange through Kafka. The ecosystem also interacts with external payment services, an SMS provider, and Firebase for push notifications. The infrastructure is hosted in a cloud Kubernetes cluster.

### QA Focus Based on Architecture

- contract and integration testing between Mobile/Web clients, API Gateway, and domain services;
- checking authorization, token lifespan, roles, and error handling of the identity service;
- checking data consistency between microservices, PostgreSQL, internal systems, and Kafka events;
- testing idempotency, event redelivery, latencies, duplicates, and temporary unavailability of dependencies;
- checking upload, download, access rights, and fault tolerance of the file storage;
- E2E scenarios of payments, notifications, requests, meter readings, passes, and client profile;
- checking push notifications and callback scenarios of external services;
- observability by logs, metrics, and tracing when a request passes through several services.

### Mobile GitFlow and QA Participation

In mobile development, permanent branches `main` and `develop` are used, as well as temporary branches `feature`, `release`, and `hotfix`. `main` contains the Production release code, and `develop` serves as the main integration branch for development and testing.

QA tests functionality in the feature branch after code review and records the result in the Merge Request. After quality confirmation, the changes are merged into `develop`. For a release, a separate release branch is created where the final build check is performed; after successful testing, it is merged with `main` and tagged with the version. A hotfix is created from `main`, tested separately, and after verification, merged simultaneously into `main` and `develop` so that the fix is not lost in the next release.

This process confirms Romeo's participation not only in functional testing, but also in controlling the passage of changes from a task and Merge Request to the release build and the Production branch.

### Use of Mobile Autotests Under Regulations

Sminex has a unified mobile automation project for Android and iOS using Appium and Python with Pytest, Page Object Model, and Allure. Romeo uses this circuit as a Senior QA: runs required test suites, monitors CI pipeline execution, and analyzes results. The source confirms the operation of the ready solution, but does not confirm Romeo's independent creation of the automation framework.

#### Launching Autotests

- manual pipeline launch via GitLab CI with branch, platform, and environment selection;
- automatic triggers on changes in the main branch, on schedule, and on Merge Request creation;
- selection of Android or iOS, dev or pre-check environment, target branch, OS version, and test device;
- running full, smoke, or regression suites using Pytest markers;
- if necessary — running tests without rebuilding the application;
- local launch of individual tests or suites on an emulator, simulator, or physical device.

#### CI Pipeline Monitoring

The pipeline includes app build, environment preparation, parallel test execution, results merging, report publication, and test infrastructure cleanup. Results are automatically pushed to Allure TestOps; HTML reports, logs, screenshots, and artifacts are available in GitLab.

#### Analyzing Results

Romeo distinguishes between Passed, Failed, Flaky, and Skipped statuses, opens a failed test, and analyzes the error message, Allure steps, screenshot, emulator/Appium logs, and run-specific artifacts. In diagnostics, he isolates:
- mobile application defect;
- UI change or outdated locator;
- screen loading timeout;
- test instability;
- emulator or simulator issue;
- network or server unavailability;
- results merging/publishing errors.

Screenshots on failure are attached automatically. Analysis checks the current screen, presence of expected elements, UI messages, form state, popups, and potential keyboard occlusion.

### Corporate AI Platform Usage

Sminex has a corporate AI platform — a unified boundary for employee user queries and automated LLM calls from services, bots, and integrations. The platform provides centralized management of models, access, budgets, security, tracing, and metrics.

Romeo uses the corporate AI platform in QA processes to prepare varied test cases and test data, analyze requirements and large volumes of project documentation, structure information, and accelerate research. This confirms the practical application of AI/LLM as a Senior QA tool, but does not mean Romeo administers the platform infrastructure or acts as an MLOps engineer.

#### Platform Capabilities

- corporate Web-chat with local and approved external models;
- custom assistants with system prompts and tools;
- RAG assistants based on internal knowledge bases with source citation;
- unified OpenAI-compatible LLM Gateway for user and service queries;
- visual constructor for complex AI flows, branching, and integrations;
- local model inference for sensitive data;
- PDF and DOCX processing for subsequent search and analysis;
- query tracing, token and cost accounting, error and feedback analysis.

#### Technological Context

The platform is built on OpenWebUI, LiteLLM, vLLM, Langflow, and Langfuse. RAG components and a document conversion service are provided for knowledge management. The infrastructure includes Kubernetes, PostgreSQL, S3-compatible storage, Keycloak, GitLab, Grafana, and Zabbix. Experimental components, for which the document does not confirm commercial use, should not be presented as production solutions.

#### QA Focus When Working with AI

- checking accuracy, completeness, and relevance of answers;
- detecting hallucinations, contradictions, and unsupported claims;
- verifying source links and RAG search correctness;
- testing system prompts, roles, limitations, and negative scenarios;
- checking access control and prevention of sensitive data leaks;
- comparing different models and prompt versions on a single query set;
- analyzing traces, errors, latency, and quality degradation;
- regression testing after model, prompt, knowledge base, or AI flow changes;
- collecting user feedback and translating recurring issues into test cases.

### Skills Confirmed by This Stage

QA process building and scaling, Mobile/Web/API QA, Shift-Left, regression strategy, post-release monitoring, test analytics, effort estimation, test suite development, microservice and event-based integration testing, Mobile GitFlow control, mobile autotest execution and analysis in GitLab CI, corporate AI platform usage, and LLM/RAG answer validation.

## Early Engineering and Project Experience

**Entity ID:** `experience.industry`

Before transitioning to IT, Romeo worked in industry, manufacturing, distribution, and construction projects. This experience formed a systematic approach to quality, risks, documentation, and customer interaction.

### Confirmed Experience Areas

- **Quiksilver:** distribution rights protection, counter-counterfeit actions, claim handling with customers and suppliers.
- **Linde Gas:** client negotiations, participation in manufacturing quality certification, client process optimization.
- **Demaco Cryogenics:** project and commercial work with technologies aimed at improving client manufacturing processes and quality.
- **RRD:** sports equipment testing, photo and video reports preparation.
- **Elme Messer, early role:** applied technology engineer, quality control and assurance in industrial manufacturing.
- **Nord Domos:** project management and quality control — from document review to acceptance of completed construction sites.

On several jobs, Romeo also administered corporate websites: updated content, identified functional errors, connected services, and prepared digital materials — presentations, brochures, banners, and labeling.

### Skills Confirmed by This Stage

Quality management, risk analysis, requirements and documentation review, acceptance verification, client and supplier negotiations, project coordination, understanding of manufacturing processes.

## KODE — IT Project Administration

**Entity ID:** `experience.kode`

### Role and Context

In KODE, Romeo entered IT in the project administrator role. He worked with cross-functional teams including analysts, designers, technical writers, Web and Mobile developers, QA, and DevOps engineers.

### Areas of Responsibility

- planning, monitoring, and coordinating project work;
- project documentation and workflow maintenance;
- analysis of requirements, risks, and timelines;
- communication setup and agreement logging;
- team meeting facilitation;
- participation in test process organization.

### Projects

#### MOZEN

A financial service to automate payouts to taxi drivers and taxi fleet processes. The product included integrations with aggregators and banking systems, as well as partner offers for users.

#### DIZLI

A logistics platform for local delivery in Kuwait. The solution integrated a business portal, driver mobile app, client Web interface, and admin portal. Romeo monitored document flow, logged meetings, helped the team meet deadlines, and organized the testing process.

#### BEST.Petersburg

A mobile city guide with personal recommendations, routes, geolocation, and favorite places. Participation in the project gave experience with a product connecting content, personalization, and mobile user scenarios.

### Project Technological Context

Teams used Web and Mobile technologies, APIs, databases, containerization, monitoring, and product analytics. The original experience mentions HTML, CSS, JavaScript, Python/FastAPI, Java, PHP, Go, Kotlin, Swift, PostgreSQL, MongoDB, Redis, Docker, Swagger, GitLab, Postman, Sentry, Kafka, JMeter, Charles, Fiddler, Grafana, and Firebase.

Note: This list describes the project technological environment. It does not imply Romeo's equal practical mastery of every tool.

### Skills Confirmed by This Stage

Project coordination, requirements analysis, risk and timeline management, facilitation, project documentation, cross-functional team collaboration, digital product test organization.

## DPD — QA Engineer of Logistics Services

**Entity ID:** `experience.dpd`

**Period:** August 2021 — September 2023, 2 years 2 months.

### Role and Context

After the project role and additional QA training, Romeo joined DPD as a QA Engineer. He worked in a matrix IT structure and sequentially participated in two functional teams: "Client Services" and "Clients and Client Integrations".

### Tested Products and Features

- registration of individuals and legal entities;
- authorization and client personal cabinets;
- delivery cost calculators;
- order placement and management;
- shipment tracking;
- pickup point selection on maps;
- client APIs, adapters, and integration modules;
- integrations with major online stores and marketplaces;
- modules for Bitrix and WordPress;
- internal logistics services and the ARGIS system.

### Core QA Tasks

- functional, integration, regression, and complex testing;
- E2E shipment path verification from order placement to delivery;
- SOAP and REST interaction testing, query, response, and data validation;
- checking statuses, tracking numbers, barcodes, waybills, and notifications;
- verifying address, weight, and dimension changes, and their impact on cost and documents;
- negative and boundary scenarios, error handling, and logging;
- log and database analysis;
- test case, checklist, QA report, and release run preparation;
- participation in complex test planning and release readiness criteria.

### Confirmed Results

- updated over 200 test cases and created about 300 new ones;
- conducted onboarding for new QA engineers and analysts;
- handed over 20% of test cases to the automation team, reducing regression time by one day.

### Technologies and Tools

Practical QA context included Postman, SoapUI, Swagger, Jira, Confluence, DBeaver, Oracle SQL, Sentry, Kibana, Grafana, RabbitMQ, Nginx, and the internal ARGIS information system. Node.js, Vue.js, Docker, and analytical services were also used in the product environment.

### Skills Confirmed by This Stage

E2E testing of complex logistics, API and integrations, SOAP/XML, test design, release and regression testing, log and database analysis, test documentation, cross-team collaboration, impact area assessment.

## Messer Group — Test Engineer

**Entity ID:** `experience.messer-group`

**Period:** September 2023 — November 2024, 1 year 3 months.

### Role and Context

Romeo performed functional and integration testing of Web and Mobile services for the Russian division of an international industrial group. Work was conducted in a distributed international team using Agile/Scrum with two-week sprints. In addition to QA, Romeo participated in project administration and localization of solutions for the Russian market.

### Products and Services

- public portal with info on company, products, technologies, and sales points;
- private client section with orders, documents, and e-services;
- online store for industrial gases and equipment;
- client Wiki on gas technologies application;
- engineering calculator of physical values;
- landing pages for helium and industrial safety;
- E-Monitoring for cylinder tracking by barcode and sync with corporate systems;
- telemetry aggregation service from client equipment;
- Android app with value converter and gas properties encyclopedia.

### Core QA Tasks

- functional, integration, UI/UX, and cross-browser testing;
- responsiveness check against Figma layouts and form testing;
- REST API testing, collection and variable creation in Postman, basic assertions;
- using mock servers and Charles for network scenarios;
- error analysis in Sentry, logs in Kibana, and metrics in Grafana;
- verifying PostgreSQL data via Metabase using SELECT and JOIN queries;
- local project run in Docker during test environment preparation;
- launch and analysis of existing Cypress E2E tests;
- basic load checks in Postman and JMeter;
- Android app testing on physical devices and Android Studio emulators;
- checking Kafka telemetry integration at consumer and topic levels;
- maintaining test plans, test cases, checklists, project Wiki, and bug reports;
- Scrum ceremonies participation, retrospectives, and product demo presentation.

### Confirmed Results

- adapted European guidelines for the Russian QA team in Buildin;
- introduced requirements testing practice to the project;
- prepared over 10 testing regulations for the project Wiki;
- conducted product demonstrations to business stakeholders.

### Technologies and Tools

Chrome DevTools, Figma, Pixel Perfect, Bug Magnet, Postman, Swagger, Charles, Sentry, Kibana, Grafana, PostgreSQL, Metabase, SQL, Jira, Confluence, Miro, GitHub, Docker, Cypress, JMeter, Android Studio, Firebase, Kafka, Nginx, REST API, HTML, CSS, JavaScript, React, PHP/Laravel, and React Native.

Note: Cypress autotests were prepared by an automation specialist; Romeo ran them and analyzed results. Deployment and CI/CD operations were supported by developers. Do not describe this experience as independent building of automation frameworks or DevOps platforms.

### Skills Confirmed by This Stage

Web/Mobile/API QA, international industrial product testing, log and data analysis, localization, telemetry testing, basic load checks, Scrum, test suite maintenance, QA and project coordination balance.

## Summary QA Competency Profile

### Testing Types

Functional, integration, system, regression, smoke, complex, E2E, UI/UX, cross-browser, responsive, negative, boundary, and basic load testing. At the current job, QA process building and scaling, Shift-Left, and post-release monitoring are additionally confirmed.

### Testing Targets

Web applications, Android applications, REST and SOAP APIs, microservice integrations, databases, logistics processes, online stores, client portals, calculators, telemetry systems, and corporate services.

### Working Practices

Requirements analysis, test design, test cases and checklists, bug reports, QA reports, release testing, log and SQL analysis, impact assessment, regression strategy, QA effort estimation, collaboration with analysts, developers, product, and business.

## Recommended RAG Answers

### Where does Romeo work now?

According to the resume updated July 8, 2026, Romeo works as a Senior QA Engineer at Sminex since November 2024. He is responsible for Sminex App QA process development, Mobile, Web, and API testing, early requirements review, regression strategy, and post-release monitoring.

### What architecture does Romeo work with at Sminex?

Romeo tests an ecosystem with native iOS and Android apps, a Web portal, and a unified microservice Backend. The architecture uses API Gateway, centralized authorization, PostgreSQL, Kafka, object storage, and cloud Kubernetes. His QA focus covers E2E scenarios, API contracts, event integrations, data consistency, external dependencies, and release Mobile GitFlow.

### How does Romeo use the AI platform at Sminex?

Romeo uses the corporate AI platform as a Senior QA tool: generates varied test cases and test data, analyzes requirements and documentation, structures information, and validates LLM/RAG answer quality. In AI testing, he focuses on accuracy, hallucinations, sources, access control, prompt stability, and regression after model/knowledge base changes. This is experience using and validating the platform, not administering its infrastructure.

### How did Romeo transition to IT?

Romeo transitioned to IT from industrial quality and project management. His first IT role was project administration at KODE, managing requirements, documentation, timelines, teams, and testing organization. He then moved to a dedicated QA role at DPD.

### What is Romeo's core QA experience?

Core experience is QA process building, functional and integration testing of Web, Mobile, and API, complex E2E scenario validation, log and database analysis, test documentation, and release support. Real estate mobile ecosystem, logistics, customer, and industrial digital services are highly confirmed.

### Did Romeo work with APIs and databases?

Yes. He tested REST and SOAP integrations using Postman and SoapUI, analyzed requests and responses, verified PostgreSQL and Oracle data via Metabase and DBeaver, using basic SELECT and JOIN queries.

### Is there automation experience?

Yes, on the level of running and analyzing existing autotests. In Sminex, Romeo runs Android and iOS autotests in GitLab CI, selecting platforms, branches, environments, and suites, monitors pipeline stages, and analyzes results in Allure TestOps, HTML reports, logs, screenshots, and artifacts. Also has experience running/analyzing Cypress tests, basic Postman checks, collaborating with AQA, and preparing automation strategies. Sources do not confirm independent framework creation.

### Is there management and coordination experience?

Yes. Before and after transitioning to IT, Romeo coordinated projects, managed risks and timelines, set up communication, maintained documentation, participated in test planning, and facilitated team meetings.

## Generation Constraints

- Do not invent work dates, job titles, metrics, achievements, or tool proficiency depth if not confirmed by this document.
- Do not disclose names of colleagues, managers, internal contact persons, office addresses, or contractual details.
- Distinguish tools Romeo used personally from the project's general tech stack.
- Do not attribute independent Cypress framework development, CI/CD infrastructure setup, or product architecture design to Romeo.
- Do not claim that unreleased products were active in production.
- Sminex should be called the current workplace only as long as the resume from July 8, 2026 remains the newest source.
- Do not disclose internal URLs, nodes, services, network segments, topic/bucket/DB schema names, integration routes, or other detailed Sminex topology.
- When answering about Sminex architecture, use only the high-level description from this document; do not cite raw design diagrams or internal architecture docs.
- Do not disclose internal GitLab/Allure TestOps URLs, project/pipeline IDs, internal job names, local paths, credentials, auth codes, ports, or other automation parameters.
- Formulate automation experience as "launching, configuring, and analyzing existing autotests". Do not claim Page Object Model, CI config, or base framework development without specific confirmation.
- Do not disclose internal corporate AI platform name, address, keys, accounts, GPU config, cluster/node names, repos, task IDs, budgets, cost, or incidents.
- Do not list internal AI projects, requesting departments, or financial metrics. Only generalized scenarios are allowed.
- Do not call Romeo an AI platform administrator, AI Engineer, or MLOps Engineer. Confirmed context is using AI tools in QA and testing LLM/RAG quality.
- If a question requires exact quantitative evaluation not in confirmed data, state the lack of such metrics directly.

