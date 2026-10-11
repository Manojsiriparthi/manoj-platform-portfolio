const projects = [
  {
    id: "eks",
    number: "01",
    category: "platform",
    categoryLabel: "PLATFORM / KUBERNETES",
    title: "Production-Grade AWS EKS Infrastructure with Terraform",
    summary: "A reusable multi-AZ Kubernetes foundation with private workloads, controlled cluster access, essential add-ons, and an observable operations path.",
    objective: "Design a repeatable Amazon EKS platform foundation whose network, identity, compute, and operations boundaries can be reviewed independently and provisioned consistently.",
    problem: "Cluster demos often stop at a running control plane. Teams still need to reason through subnet placement, who can reach the Kubernetes API, how nodes receive least-privilege AWS access, how workloads enter the cluster, and how upgrades and recovery are operated.",
    stack: ["AWS EKS", "Terraform", "VPC", "IAM", "EC2", "Managed node groups", "EKS add-ons", "CloudWatch", "Prometheus", "Grafana"],
    nodes: [{ title: "Terraform", subtitle: "Remote state · modules", x: 25, y: 55 }, { title: "VPC · multi-AZ", subtitle: "Public + private subnets", x: 360, y: 55 }, { title: "AWS IAM", subtitle: "Roles · scoped access", x: 695, y: 55 }, { title: "EKS control plane", subtitle: "Private API · add-ons", x: 360, y: 168 }, { title: "Managed node groups", subtitle: "Private worker nodes", x: 360, y: 281 }, { title: "Ingress · load balancer", subtitle: "Controlled app entry", x: 695, y: 281 }, { title: "CloudWatch + metrics", subtitle: "Logs · Prometheus · Grafana", x: 25, y: 281 }],
    edges: [[0, 1, "network"], [2, 3, "access"], [1, 3, "subnets"], [3, 4, "schedule"], [4, 5, "traffic"], [4, 6, "signals"]],
    architecture: "Terraform provisions a VPC across Availability Zones, separating public load-balancer subnets from private worker subnets. An EKS control plane manages private worker node groups; EKS networking and DNS add-ons support pod networking and service discovery. A load-balancer integration provides a defined ingress path, while CloudWatch and a Prometheus/Grafana option cover logs, metrics, and alerting. IAM roles separate infrastructure provisioning, cluster access, node identity, and workload permissions. Remote state requires encryption, locking, and tightly scoped access.",
    workflow: ["Bootstrap encrypted Terraform state with access restricted to the deployment role.", "Plan the VPC, public and private subnets across multiple Availability Zones, routes, endpoints, and security boundaries.", "Create the cluster role, EKS control plane, managed node groups, and approved EKS networking and DNS add-ons.", "Configure least-privilege administrator and workload access using supported EKS access mechanisms and IAM roles.", "Add ingress, log collection, metrics, dashboards, and actionable alerts as separately reviewable components.", "Validate node replacement, a controlled rollout, access revocation, and a documented recovery procedure."],
    security: ["Keep worker nodes in private subnets; expose only required ingress and egress paths.", "Separate human, Terraform, node, and application permissions; scope IAM and Kubernetes RBAC independently.", "Use short-lived credentials, encrypted state, encryption keys for sensitive data, and an external secret-management pattern.", "Pin Terraform and add-on versions; protect state, restrict cluster API access, and audit API activity.", "Define multi-AZ placement, disruption budgets, autoscaling guardrails, backups, and recovery objectives before deployment."],
    tradeoffs: ["A private-only API improves isolation but requires a deliberate operator and CI runner access path.", "Managed node groups simplify lifecycle management; workload diversity or specialized scheduling may require additional groups.", "A NAT gateway per Availability Zone improves availability but changes cost; endpoints and egress proxies have operational trade-offs.", "Prometheus and Grafana offer flexible metrics but introduce operating work; managed or CloudWatch-only variants trade customization for reduced maintenance."],
    validation: ["terraform fmt -check and terraform validate on each module.", "Static analysis and policy checks for public ingress, encryption, and least-privilege IAM.", "Plan review for destructive changes, drift, route-table exposure, and unintended public addresses.", "Post-provision checks for node readiness, DNS resolution, service routing, workload identity, and log delivery.", "Exercise node drain, managed node-group update, cluster-version upgrade, and restore procedures in a disposable environment."],
    lessons: "No deployment or measured result is claimed. A useful next step is to record the pinned module/provider versions, successful test-run evidence, upgrade notes, and failure modes from an actual disposable-cluster build.",
    visual: "Architecture diagram and an EKS health dashboard are conceptual placeholders until replaced with screenshots from a verified deployment.",
    repoTree: "terraform/\n  modules/\n    network/\n    eks-cluster/\n    managed-node-group/\n    observability/\n  environments/\n    dev/\n    stage/\n  bootstrap-state/\n  policies/\n  README.md"
  },
  {
    id: "rag",
    number: "02",
    category: "ai",
    categoryLabel: "AI / DOCUMENT INTELLIGENCE",
    title: "AI-Powered PDF Question Answering Using AWS and RAG",
    summary: "A document question-answering reference design that retrieves relevant PDF passages and returns grounded responses with source references.",
    objective: "Design a document assistant that answers questions from authorized PDF content with traceable sources, rather than relying on the language model's unsupported recall.",
    problem: "Important information spread across long PDFs is hard to locate quickly. A useful assistant must extract and search relevant text while protecting document permissions, surfacing citations, and clearly handling missing or ambiguous answers.",
    stack: ["Amazon S3", "Python", "PDF parsing", "Chunking", "Embeddings", "Vector index", "LLM", "AWS IAM", "Lambda (optional)"],
    nodes: [{ title: "User + identity", subtitle: "Authenticated upload / query", x: 25, y: 55 }, { title: "Amazon S3", subtitle: "Encrypted source PDFs", x: 360, y: 55 }, { title: "Python ingestion", subtitle: "Extract · validate · chunk", x: 695, y: 55 }, { title: "Embeddings", subtitle: "Chunk vectors + metadata", x: 695, y: 168 }, { title: "Vector index", subtitle: "Access-scoped retrieval", x: 360, y: 168 }, { title: "Retriever + LLM", subtitle: "Context-grounded answer", x: 25, y: 281 }, { title: "Sources + response", subtitle: "Page refs · abstain if weak", x: 360, y: 281 }],
    edges: [[0, 1, "presigned upload"], [1, 2, "object event"], [2, 3, "text chunks"], [3, 4, "vectors"], [0, 5, "question"], [4, 5, "top-k context"], [5, 6, "answer + refs"]],
    architecture: "An authenticated client uploads PDFs to an encrypted, access-controlled S3 bucket. An ingestion worker validates type and size, extracts text and page boundaries, chunks text, creates embeddings, and stores vectors with document identity and access metadata. A query checks the caller's document permissions before vector retrieval. The model receives only relevant authorized passages and is prompted to cite their page references or abstain. S3 events and Lambda are optional orchestration choices, not assumed implementation components.",
    workflow: ["Authenticate the user and issue a short-lived, narrowly scoped upload authorization.", "Accept a PDF into a private S3 prefix with size, type, malware-scanning, and encryption controls.", "Trigger ingestion through a queued, retryable worker; extract page-aware text and record processing status.", "Normalize and chunk text with source keys, page numbers, document IDs, and access-control metadata.", "Generate embeddings and persist them in a vector store behind an explicit retention and deletion policy.", "Authorize each question against document access before retrieving the most relevant chunks.", "Ask the LLM to answer only from retrieved context, cite source pages, and abstain when evidence is insufficient."],
    security: ["Use private S3 buckets, encryption at rest and in transit, short-lived credentials, and least-privilege IAM.", "Enforce document-level authorization in retrieval itself; never rely on the language model to filter access.", "Treat document text as untrusted input; guard against prompt injection and prevent retrieved text from issuing tools or changing policy.", "Redact sensitive fields where appropriate; define data retention, vector deletion, audit logging, and model-provider data handling.", "Limit payloads and query rate, monitor failures and cost, and avoid logging full document content or personal data."],
    tradeoffs: ["Smaller chunks improve pinpoint retrieval but can separate a fact from its context; test overlap and structural chunking.", "Hosted embeddings reduce operations but introduce provider, privacy, and cost considerations.", "A managed vector service simplifies operations; self-hosted indexes offer control with additional patching and availability work.", "Similarity scores are not proof of correctness. Citations and abstention help users assess answers but do not eliminate hallucinations."],
    validation: ["Test extraction across representative PDFs, scanned documents, page layouts, and malformed uploads.", "Verify that users cannot retrieve chunks from documents outside their authorization scope.", "Use a curated question set to inspect retrieval precision, citation correctness, and abstention behavior.", "Test duplicate events, retry exhaustion, partial ingestion, reprocessing, and deletion of both source and embeddings.", "Measure latency, token usage, and cost under a defined test workload before making performance claims."],
    lessons: "The design is illustrative; no AI provider, vector service, or deployment is represented as selected or implemented. Keep ingestion and query authorization explicit, and make the cited evidence visible to the reader.",
    visual: "The displayed upload-to-retrieval workflow is an architecture placeholder, not a live application screenshot.",
    repoTree: "src/\n  api/\n  ingestion/\n  parsing/\n  chunking/\n  retrieval/\n  authorization/\n  prompts/\ntests/\n  test_access_control.py\n  test_retrieval.py\n  fixtures/\ninfrastructure/\n  s3/\n  identity/\nREADME.md"
  },
  {
    id: "streaming",
    number: "03",
    category: "data",
    categoryLabel: "DATA / STREAMING ANALYTICS",
    title: "AWS Streaming Analytics for Fraud Detection",
    summary: "A synthetic-event streaming pipeline with schema checks, idempotent processing, explainable risk rules, and a reviewable analytics output.",
    objective: "Design a streaming event path that makes suspicious patterns observable while preserving event traceability and handling duplicate or invalid input deliberately.",
    problem: "Batch review can delay investigation of suspicious activity. Streaming systems must also handle out-of-order delivery, retries, duplicate messages, malformed schemas, and false positives without silently losing evidence.",
    stack: ["Amazon Kinesis", "Apache Kafka (alternative)", "Python", "Amazon S3", "Schema validation", "Rule scoring", "Analytics dashboard"],
    nodes: [{ title: "Synthetic producer", subtitle: "Anonymized sample events", x: 25, y: 55 }, { title: "Kinesis / Kafka", subtitle: "Durable event stream", x: 360, y: 55 }, { title: "Schema + dedupe", subtitle: "Validate · event ID", x: 695, y: 55 }, { title: "Python processor", subtitle: "Window · transform · score", x: 695, y: 168 }, { title: "Quarantine + DLQ", subtitle: "Invalid · retry-exhausted", x: 360, y: 281 }, { title: "S3 event archive", subtitle: "Partitioned raw / output", x: 25, y: 281 }, { title: "Risk review", subtitle: "Alerts · trend dashboard", x: 695, y: 281 }],
    edges: [[0, 1, "publish"], [1, 2, "consume"], [2, 3, "valid event"], [2, 4, "invalid"], [3, 4, "failed after retry"], [3, 5, "archive"], [3, 6, "risk signals"]],
    architecture: "A synthetic producer sends anonymized transaction-shaped events to either Amazon Kinesis Data Streams or Apache Kafka; these are alternative stream choices, not a claim that both are deployed. A Python consumer validates the event schema, checks event IDs for idempotency, enriches and transforms valid events, then applies transparent example rules or an optional separately validated anomaly model. Invalid records and retry-exhausted events go to quarantine or a dead-letter path. Raw and processed records can be archived to S3 for replay and audit, while an analytics dashboard displays aggregate risk signals for human review.",
    workflow: ["Generate synthetic transactions with documented schemas and deterministic event IDs.", "Publish events to one selected stream and configure retention and consumer checkpoint behavior.", "Validate required fields, versions, timestamps, and payload boundaries; route malformed events separately.", "Deduplicate by event ID with an explicit retention window and a durable idempotency store.", "Transform and enrich valid records, then compute explainable rule-based risk indicators.", "Retry transient processing failures with bounded backoff; isolate poison messages in a dead-letter queue.", "Archive events, expose aggregate analytics, and route suspicious patterns to review rather than automatic denial."],
    security: ["Use synthetic or appropriately anonymized data; do not ingest real financial or personal data into a demo.", "Encrypt streams and S3 objects, restrict producer and consumer identities, and avoid sensitive data in logs.", "Validate payload sizes and schemas; isolate untrusted fields and protect dashboard access.", "Track backlog, iterator age or consumer lag, error rates, DLQ growth, and archive delivery failures.", "Preserve enough lineage to replay and investigate events without presenting a score as a proven fraud decision."],
    tradeoffs: ["Kinesis integrates closely with AWS operations; Kafka offers a broad ecosystem but needs a clear hosted-versus-self-managed decision.", "An idempotency store controls duplicates but adds state, retention, and hot-key considerations.", "More aggressive windows surface patterns sooner but increase late-event correction and alert-noise complexity.", "Rule-based scores are easier to explain; any model-based component needs labeled test data, drift checks, and human oversight."],
    validation: ["Unit-test schema versions, boundaries, invalid records, rule decisions, and idempotency windows.", "Replay duplicate, delayed, reordered, and bursty synthetic events and verify deterministic outputs.", "Force processor failures to confirm bounded retries, checkpoints, DLQ handling, and replay behavior.", "Load-test consumer lag and recovery time against a stated synthetic throughput target.", "Validate dashboards and alerts for lag, malformed events, duplicates, DLQ, and archive delivery."],
    lessons: "Synthetic architecture only. No real transactions, trained model, fraud-detection accuracy, or production alert quality is claimed; establish representative test data and false-positive review before evaluating outcomes.",
    visual: "Illustrative event-flow diagram; the dashboard is a conceptual placeholder with no transaction data or measured detection results.",
    repoTree: "producer/\n  generate_events.py\nschemas/\n  transaction-v1.json\nprocessor/\n  validate.py\n  deduplicate.py\n  risk_rules.py\n  dlq.py\ntests/\n  test_replay.py\n  test_idempotency.py\ndashboards/\ninfrastructure/\nREADME.md"
  },
  {
    id: "incident",
    number: "04",
    category: "ai",
    categoryLabel: "AI / INCIDENT OPERATIONS",
    title: "Intelligent CI/CD Failure Analysis and Jira Ticket Drafting",
    summary: "An engineer-reviewed workflow that redacts pipeline context, summarizes failure evidence, drafts an incident issue, and verifies recovery.",
    objective: "Design an assistive workflow that makes useful CI/CD failure context easier to assemble without treating an LLM summary as a definitive root cause or an authorized action.",
    problem: "Build failures and deployment alerts often scatter the relevant output, release metadata, and service health signals across multiple tools. Manual triage takes effort, while forwarding unredacted logs to an AI service or creating an unreviewed ticket can create security and workflow problems.",
    stack: ["Jenkins", "GitHub Actions", "CloudWatch", "Prometheus", "Grafana", "Python", "LLM", "Jira API"],
    nodes: [{ title: "CI / deployment", subtitle: "Jenkins · GitHub Actions", x: 25, y: 55 }, { title: "Failure event", subtitle: "Build · deploy · health check", x: 360, y: 55 }, { title: "Python collector", subtitle: "Logs · release metadata", x: 695, y: 55 }, { title: "Redact + bound", subtitle: "Secrets · PII · token limits", x: 695, y: 168 }, { title: "LLM summary", subtitle: "Evidence · hypotheses · limits", x: 360, y: 168 }, { title: "Human review", subtitle: "Approve or edit Jira draft", x: 25, y: 281 }, { title: "Jira + monitoring", subtitle: "Issue · recovery signals", x: 360, y: 281 }],
    edges: [[0, 1, "event"], [1, 2, "collect bounded context"], [2, 3, "untrusted logs"], [3, 4, "redacted excerpts"], [4, 5, "draft only"], [5, 6, "approved ticket"], [6, 0, "recovery check"]],
    architecture: "Jenkins or GitHub Actions sends a failure event containing a run identifier and release metadata to a Python workflow. A collector fetches a bounded set of relevant logs and monitoring context from CloudWatch, Prometheus, or Grafana APIs. Secret and personal-data redaction occurs before any optional LLM call. The model output separates observed evidence from hypotheses and suggested investigation steps. An engineer previews, edits, and approves a Jira issue; monitoring signals are used to verify recovery. No sensitive remediation is automated.",
    workflow: ["Receive a failed-build, rollout, or health-check event with an authenticated run identifier.", "Collect only the relevant bounded log window, commit or release metadata, and approved monitoring signals.", "Redact credentials, tokens, personal data, and unrelated log content; record provenance and collection limits.", "Ask the model for a concise evidence summary, likely investigation areas, uncertainty, and suggested next checks.", "Create an issue draft containing evidence, links, timestamps, affected release, uncertainty, and an explicit human-review status.", "Require an engineer to inspect and approve or edit the draft before creating a Jira issue or recommending action.", "Use service health and deployment telemetry to verify recovery; keep the incident outcome under engineer control."],
    security: ["Use scoped API tokens in a secret store; never embed CI or Jira credentials in prompts or source code.", "Redact before external model transmission, minimize retained log excerpts, and define retention and audit boundaries.", "Treat log content as untrusted and potentially prompt-injected; do not grant the model tools or execute its suggested commands.", "Restrict which projects can create Jira tickets and avoid automatic assignment, escalation, or remediation without approval.", "Show source links and uncertainty alongside summaries; log the approval decision without duplicating sensitive payloads."],
    tradeoffs: ["Narrow log windows reduce data exposure but can omit earlier causality; let the engineer adjust the context window.", "A Jira draft reduces repetitive formatting but still adds review work and must respect team ownership and deduplication rules.", "LLM summaries can organize evidence but can misread logs; link claims back to source lines and label hypotheses explicitly.", "A synchronous workflow is simpler; a queued workflow handles retries and provider outages with extra state and monitoring."],
    validation: ["Use synthetic failure fixtures containing secrets, personal data, long logs, malformed records, and prompt-injection text.", "Verify redaction, bounded context, source attribution, and the separation of evidence from hypotheses.", "Test LLM timeout, rate limit, unavailable service, and malformed output paths; keep manual triage available.", "Confirm a Jira issue cannot be created without authenticated human approval and that retries do not create duplicates.", "Exercise recovery verification with synthetic monitoring signals and document cases where the workflow must abstain."],
    lessons: "The assistant may summarize evidence and suggest investigation steps; it cannot establish a definitive root cause from logs alone. This is an illustrative human-in-the-loop design, not a claimed live integration.",
    visual: "The screen below is an explicitly fictional analysis mock-up to illustrate a Jira draft, uncertainty label, evidence links, and approval gate.",
    mockup: { label: "ILLUSTRATIVE FAILURE-ANALYSIS SCREEN · NOT LIVE TELEMETRY", summary: "Observed: the deployment health check did not pass within the configured rollout window. Evidence: link to the redacted CI run and bounded health-check output. Hypothesis: inspect readiness configuration and downstream dependency health; verify against the deployment and service events. Confidence: unverified. Recommended next step: engineer reviews source events before action.", fields: ["Issue type: Incident / Bug", "Affected release: commit ref", "Evidence: CI run + log refs", "Status: Awaiting engineer approval"] },
    ticket: "Summary: [service] deployment check did not pass\nObserved evidence: [linked CI run, timestamps, sanitized excerpts]\nRelease reference: [commit or image digest]\nImpact: [verified user or service impact; otherwise unknown]\nAI-generated hypothesis: [clearly labeled, not a confirmed cause]\nSuggested checks: [reviewed investigation steps]\nApproval: [engineer name / timestamp]",
    repoTree: "src/\n  collect_ci_context.py\n  collect_metrics.py\n  redact.py\n  summarize.py\n  jira_draft.py\n  approval.py\ntests/\n  fixtures/\n  test_redaction.py\n  test_approval_gate.py\n  test_retry_behavior.py\npolicies/\n  allowed-log-sources.yaml\nREADME.md"
  },
  {
    id: "devsecops",
    number: "05",
    category: "delivery",
    categoryLabel: "DELIVERY / DEVSECOPS",
    title: "Automated CI/CD Pipeline for Secure Containerized Applications",
    summary: "A gated commit-to-cluster delivery design with tested image provenance, vulnerability scanning, controlled rollout, and a rollback path.",
    objective: "Describe an end-to-end application delivery path where code validation, container security, image identity, deployment health, and recovery are connected and inspectable.",
    problem: "A pipeline that only builds and pushes a Docker image leaves teams to manually reconstruct what was tested, whether an image was scanned, which artifact is running, and how to recover from a failed rollout.",
    stack: ["GitHub", "GitHub Actions / Jenkins", "Docker", "Amazon ECR", "Trivy", "Terraform", "Kubernetes", "Amazon EKS", "Prometheus", "Grafana"],
    nodes: [{ title: "GitHub commit", subtitle: "Reviewed change · protected branch", x: 25, y: 55 }, { title: "CI checks", subtitle: "Test · build · provenance", x: 360, y: 55 }, { title: "Trivy scan", subtitle: "Policy gate · SBOM option", x: 695, y: 55 }, { title: "Amazon ECR", subtitle: "Immutable digest · scoped access", x: 695, y: 168 }, { title: "Deploy to EKS", subtitle: "Helm / manifests · rollout", x: 360, y: 281 }, { title: "Health verification", subtitle: "Metrics · alert · rollback", x: 25, y: 281 }, { title: "Prometheus + Grafana", subtitle: "Service + rollout signals", x: 25, y: 168 }],
    edges: [[0, 1, "push / pull request"], [1, 2, "image"], [2, 3, "pass + publish"], [3, 4, "digest"], [4, 5, "health gate"], [5, 4, "observe"], [5, 6, "metrics" ]],
    architecture: "A GitHub change triggers protected CI checks, tests, image building, and vulnerability scanning with Trivy. Only a passing pipeline publishes an image to a private ECR repository; downstream deployment uses the immutable digest rather than a mutable tag. Terraform manages supporting cloud infrastructure. A reviewed Helm chart or Kubernetes manifest deploys to Amazon EKS using short-lived federated identity where supported. Rollout health, application metrics, and deployment events feed Prometheus/Grafana and alerting. A failed health gate pauses or reverses the deployment using a documented recovery policy.",
    workflow: ["Commit a reviewed change to a protected GitHub branch and trigger checks in GitHub Actions or Jenkins.", "Run formatting, tests, dependency checks, and a reproducible Docker build.", "Scan the image and dependencies with a documented severity policy; produce provenance or an SBOM if implemented.", "Publish only approved images to private ECR and record the content digest, commit, scan, and build metadata.", "Authenticate to AWS using short-lived role federation and deploy the immutable digest through Helm or reviewed manifests.", "Verify rollout readiness and application health against explicit thresholds; pause promotion if a gate fails.", "Follow the documented rollback or roll-forward decision, then confirm service health and close the deployment record."],
    security: ["Use protected branches, reviewed workflow permissions, pinned third-party actions, and least-privilege AWS trust policies.", "Avoid long-lived CI secrets; store runtime secrets in a dedicated secret manager and restrict repository access.", "Scan images and dependencies with defined severity exceptions, expiry, and ownership; record image digests and provenance.", "Use private ECR, immutable release references, restricted cluster identities, and Kubernetes RBAC aligned to namespace boundaries.", "Apply staged rollout, health checks, alerting, and a tested recovery procedure; retain auditable deployment records."],
    tradeoffs: ["A strict critical-vulnerability gate reduces exposure but can block delivery; exceptions need expiry, rationale, and ownership.", "Digest pinning strengthens artifact identity but makes rollback references and promotion metadata more explicit.", "Rolling deployments are simple; canary or blue-green reduces some release risks while increasing routing and observability needs.", "GitHub Actions and Jenkins are alternative orchestrators; operating both is unnecessary unless there is a defined integration requirement."],
    validation: ["Run unit, integration, image-build, and policy tests against a sample application.", "Inject a deliberately vulnerable fixture and verify that the configured scan policy blocks publication as expected.", "Verify the pushed digest matches the deployed digest and that the image can be traced to a reviewed commit.", "Test rollout failure, readiness timeout, rollback behavior, secret access boundaries, and runner role restrictions.", "Check dashboard and alerts for failed builds, scan findings, rollout status, and application health; retain sanitized evidence."],
    lessons: "This is a reference pipeline; no repository, deployment, scan, rollback, or monitoring result is claimed. Document exactly which stages run and attach real test output before presenting the workflow as implemented.",
    visual: "Pipeline diagram is illustrative until replaced or accompanied by verified CI configuration and redacted run screenshots.",
    repoTree: ".github/workflows/\n  ci.yml\n  release.yml\napp/\n  Dockerfile\ncharts/app/\nk8s/\ninfrastructure/\n  terraform/\nsecurity/\n  trivy.yaml\n  exceptions.yaml\ntests/\nREADME.md"
  }
];

const config = window.PORTFOLIO_CONFIG || {};
const grid = document.querySelector("#projects-grid");
const dialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function diagramSvg(project, idSuffix = "card") {
  const width = 880;
  const height = 377;
  const nodeWidth = 160;
  const nodeHeight = 62;
  const edges = project.edges.map(([from, to, label]) => {
    const source = project.nodes[from];
    const target = project.nodes[to];
    const sourceCenter = source.x + nodeWidth / 2;
    const targetCenter = target.x + nodeWidth / 2;
    let path;
    if (source.y === target.y) {
      const movesRight = target.x > source.x;
      const startX = movesRight ? source.x + nodeWidth : source.x;
      const endX = movesRight ? target.x - 9 : target.x + nodeWidth + 9;
      path = `M ${startX} ${source.y + nodeHeight / 2} H ${endX}`;
    } else if (source.x === target.x) {
      path = `M ${sourceCenter} ${source.y + nodeHeight} V ${target.y - 9}`;
    } else {
      const sourceCenterY = source.y + nodeHeight / 2;
      const targetCenterY = target.y + nodeHeight / 2;
      const offset = Math.max(Math.abs(targetCenter - sourceCenter) / (nodeWidth / 2), Math.abs(targetCenterY - sourceCenterY) / (nodeHeight / 2));
      const startX = sourceCenter + (targetCenter - sourceCenter) / offset;
      const startY = sourceCenterY + (targetCenterY - sourceCenterY) / offset;
      const endX = targetCenter - (targetCenter - sourceCenter) / offset;
      const endY = targetCenterY - (targetCenterY - sourceCenterY) / offset;
      const bendX = (targetCenter - sourceCenter) * .36;
      const bendY = (targetCenterY - sourceCenterY) * .08;
      path = `M ${startX} ${startY} C ${startX + bendX} ${startY + bendY}, ${endX - bendX} ${endY - bendY}, ${endX} ${endY}`;
    }
    const labelX = (source.x + nodeWidth / 2 + target.x + nodeWidth / 2) / 2;
    const labelY = (source.y + nodeHeight / 2 + target.y + nodeHeight / 2) / 2 - 5;
    return `<g><path class="diagram-edge" d="${path}" marker-end="url(#arrow-${idSuffix})"/><text class="diagram-edge-label" x="${labelX}" y="${labelY}" text-anchor="middle">${escapeHtml(label)}</text></g>`;
  }).join("");
  const nodes = project.nodes.map((node, index) => `<g><rect class="${index === 0 ? "diagram-node-accent" : "diagram-node"}" x="${node.x}" y="${node.y}" width="${nodeWidth}" height="${nodeHeight}" rx="2"/><text class="diagram-number" x="${node.x + 12}" y="${node.y + 15}">${String(index + 1).padStart(2, "0")}</text><text class="diagram-node-text" x="${node.x + 12}" y="${node.y + 34}">${escapeHtml(node.title)}</text><text class="diagram-node-sub" x="${node.x + 12}" y="${node.y + 50}">${escapeHtml(node.subtitle)}</text></g>`).join("");
  return `<svg class="architecture-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(project.title)} reference architecture"><title>${escapeHtml(project.title)} reference architecture</title><defs><marker id="arrow-${idSuffix}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L6,3 z" fill="#6fe4d1"/></marker></defs>${edges}${nodes}</svg>`;
}

function renderCards(filter = "all") {
  const visibleProjects = projects.filter(project => filter === "all" || project.category === filter);
  grid.innerHTML = visibleProjects.map(project => `
    <article class="project-card">
      <div class="project-card-visual">${diagramSvg(project, `card-${project.id}`)}</div>
      <div class="project-card-meta"><span class="project-id">CASE / ${project.number}</span><span class="project-type">${escapeHtml(project.categoryLabel)}</span></div>
      <div class="project-card-body"><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p><div class="card-tags">${project.stack.slice(0, 4).map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div></div>
      <div class="project-card-actions"><button class="case-study-button" type="button" data-project="${project.id}">Explore case study <span aria-hidden="true">↗</span></button>${secureHttps(config.repositories?.[project.id]) ? `<a class="repo-link" href="${escapeHtml(secureHttps(config.repositories[project.id]))}" target="_blank" rel="noopener noreferrer">Repository <span aria-hidden="true">↗</span></a>` : ""}</div>
    </article>`).join("");
  grid.querySelectorAll("[data-project]").forEach(button => button.addEventListener("click", () => openProject(button.dataset.project)));
}

function list(items, className = "dialog-list") {
  return `<ul class="${className}">${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function mockupMarkup(project) {
  if (project.mockup) {
    return `<div class="mock-screen"><p class="mock-screen-label">${escapeHtml(project.mockup.label)}</p><p>${escapeHtml(project.mockup.summary)}</p><div class="mock-screen-grid">${project.mockup.fields.map(field => `<span>${escapeHtml(field)}</span>`).join("")}</div></div>`;
  }
  return `<div class="mock-screen"><p class="mock-screen-label">CONCEPTUAL VISUAL PLACEHOLDER · NOT LIVE DATA</p><p>${escapeHtml(project.visual)}</p><div class="mock-screen-grid"><span>Architecture: reference design</span><span>Deployment: not verified</span><span>Results: not supplied</span></div></div>`;
}

function openProject(id) {
  const project = projects.find(item => item.id === id);
  if (!project) return;
  const repository = secureHttps(config.repositories?.[project.id]);
  document.querySelector("#dialog-code").textContent = `CASE STUDY / ${project.number}`;
  dialogContent.innerHTML = `
    <article class="dialog-content">
      <p class="dialog-kicker">${escapeHtml(project.categoryLabel)}</p>
      <h2 id="dialog-title">${escapeHtml(project.title)}</h2>
      <p class="dialog-summary">${escapeHtml(project.summary)}</p>
      <span class="status-label"><span class="status-dot" aria-hidden="true"></span> REFERENCE DESIGN · IMPLEMENTATION NOT VERIFIED</span>
      <div class="dialog-stack" aria-label="Technology stack">${project.stack.map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div>
      <div class="dialog-diagram-wrap">${diagramSvg(project, `detail-${project.id}`)}<p class="diagram-caption">${escapeHtml(project.architecture)}</p></div>
      <div class="dialog-two-col">
        <section class="dialog-section"><h3>Objective</h3><p>${escapeHtml(project.objective)}</p></section>
        <section class="dialog-section"><h3>Real-world problem</h3><p>${escapeHtml(project.problem)}</p></section>
      </div>
      <section class="dialog-section"><h3>Implementation workflow</h3>${list(project.workflow, "dialog-list workflow-list")}</section>
      <div class="dialog-two-col">
        <section class="dialog-section"><h3>Security &amp; reliability</h3>${list(project.security)}</section>
        <section class="dialog-section"><h3>Challenges &amp; trade-offs</h3>${list(project.tradeoffs)}</section>
      </div>
      <section class="dialog-section"><h3>Testing &amp; validation</h3>${list(project.validation)}</section>
      <section class="dialog-section"><h3>Visual evidence</h3>${mockupMarkup(project)}</section>
      ${project.ticket ? `<section class="dialog-section"><h3>Illustrative Jira ticket template</h3><pre class="repo-tree">${escapeHtml(project.ticket)}</pre></section>` : ""}
      ${project.repoTree ? `<section class="dialog-section"><h3>Sample repository structure</h3><pre class="repo-tree">${escapeHtml(project.repoTree)}</pre></section>` : ""}
      <section class="dialog-section"><h3>Lessons &amp; measurable results</h3><p>${escapeHtml(project.lessons)}</p></section>
      ${repository ? `<a class="button button-outline dialog-repo" href="${escapeHtml(repository)}" target="_blank" rel="noopener noreferrer">View project repository <span aria-hidden="true">↗</span></a>` : `<span class="dialog-placeholder">Repository link not configured. Add a verified URL in <code>config.js</code>.</span>`}
    </article>`;
  dialog.showModal();
  dialog.querySelector(".dialog-close").focus();
}

function secureHttps(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : "";
  } catch {
    return "";
  }
}

function secureResumeUrl(value) {
  const destination = String(value || "").trim();
  if (/^https:\/\//i.test(destination)) return secureHttps(destination);
  if (/^assets\/[a-z\d_./-]+\.pdf$/i.test(destination) && !destination.split("/").includes("..")) return destination;
  return "";
}

function configureDestinations() {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(config.email || "")) ? String(config.email) : "";
  const destinations = {
    github: secureHttps(config.githubUrl),
    linkedin: secureHttps(config.linkedinUrl),
    resume: secureResumeUrl(config.resumeUrl),
    email: email ? `mailto:${email}` : ""
  };
  document.querySelectorAll("[data-destination]").forEach(link => {
    const destination = destinations[link.dataset.destination];
    if (!destination) return;
    link.href = destination;
    link.hidden = false;
    if (["github", "linkedin"].includes(link.dataset.destination) && destination.startsWith("https://")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    if (link.dataset.destination === "resume") link.setAttribute("download", "");
  });
  if (destinations.email || destinations.linkedin) document.querySelector("#contact-placeholder").hidden = true;
}

renderCards();
configureDestinations();
document.querySelector("#current-year").textContent = new Date().getFullYear();

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach(filter => {
      const active = filter === button;
      filter.classList.toggle("is-active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    renderCards(button.dataset.filter);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !isOpen);
});
primaryNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  primaryNav.classList.remove("is-open");
}));

dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});