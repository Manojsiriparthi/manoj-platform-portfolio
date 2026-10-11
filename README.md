# Manoj Siriparthi | Platform Engineering Portfolio

A responsive, dependency-free portfolio site built with semantic HTML, CSS, and JavaScript. The project runs locally without a package install or build step and can be deployed to GitHub Pages, Vercel, or Amazon S3 and CloudFront.

## Run locally

Open `index.html` directly, or serve the folder over HTTP:

```sh
python3 -m http.server 8000
```

Visit <http://localhost:8000>.

## Personalize before publishing

Edit `config.js` and set only the destinations you have verified:

- `githubUrl` and `linkedinUrl`: real profile URLs.
- `email`: the public contact address.
- `resumeUrl`: a relative path such as `assets/manoj-siriparthi-resume.pdf` after adding your actual resume, or a verified HTTPS URL.
- `repositories`: real repository URLs keyed by project ID (`eks`, `rag`, `streaming`, `incident`, `devsecops`).

Unset links are intentionally hidden. No employer, certification, project deployment, outcome, or repository is implied by a blank setting. Review the project descriptions and replace reference designs with evidence before describing any project as implemented.

## Project structure

```text
index.html          Semantic page structure and SEO metadata
styles.css          Responsive visual system and components
config.js           Editable profile and outbound destinations
app.js              Project content, diagrams, filters, and interactions
assets/
  hero-pipeline.svg Original AWS delivery pipeline hero artwork
  favicon.svg      Portfolio favicon
```

Project case studies are maintained in `app.js`. Their architecture diagrams are generated from the same per-project node and connection data used to explain each reference architecture. The project detail dialog includes objective, problem, workflow, stack, architecture, security and reliability, trade-offs, validation, and lessons. Replace illustrative claims with verified implementation evidence; no measured results are asserted.

## Deploy

### GitHub Pages

1. Push the site files and your reviewed content to a GitHub repository.
2. In repository **Settings → Pages**, choose **Deploy from a branch**, select the intended branch and root folder, and save.
3. Set the real profile and repository links in `config.js`; verify the deployed page and every visible link.

### Vercel

Import the repository into Vercel and deploy it as a static site. No build command or output directory is needed; serve the repository root. Add a custom domain in project settings if desired.

### Amazon S3 + CloudFront

1. Create a private S3 bucket and upload the site files while preserving the `assets/` paths.
2. Put CloudFront in front of the bucket using Origin Access Control; keep the bucket private.
3. Configure the default root object as `index.html`, HTTPS, and a custom error response only if required by your routing needs.
4. Invalidate cached files after content updates, or use versioned asset names and suitable cache headers.

For any hosting option, test mobile navigation, the project filters and detail dialogs, keyboard operation, metadata, and every configured link after deployment. Do not publish a resume or email address until you intend them to be public.

## Suggested LinkedIn headline

**Senior Platform Engineer | AWS DevOps | Kubernetes & Amazon EKS | Terraform | CI/CD | Cloud Infrastructure & Automation**

## Suggested LinkedIn About

I am a Senior Platform Engineer with 6 years of overall IT experience, including 5 years focused on AWS DevOps and cloud engineering. I work across cloud infrastructure, Kubernetes platforms, infrastructure as code, CI/CD automation, cloud networking, monitoring, and reliability engineering.

I am interested in production-grade Amazon EKS platforms, reusable Terraform modules, secure cloud architecture, end-to-end DevSecOps, AI-assisted document intelligence, streaming analytics, and intelligent incident management. I enjoy solving infrastructure challenges, reducing manual operational work, and building secure, scalable, and reliable platforms.

My portfolio presents detailed reference architectures and technical workflows. Project implementation status and results are stated only when supported by evidence.

## Suggested LinkedIn launch post

I have published my engineering portfolio, focused on platform engineering, AWS DevOps, Kubernetes, and cloud automation.

It brings together my professional background and five detailed technical case studies covering Amazon EKS and Terraform, RAG-based document intelligence, streaming analytics, incident analysis, and secure CI/CD delivery. The case studies emphasize architecture, security, operational trade-offs, and validation. Where a project is a reference design rather than a verified implementation, it is labeled accordingly.

I’m especially interested in building reliable cloud platforms and making infrastructure work more repeatable and observable. I’d welcome conversations with teams working on platform engineering, cloud infrastructure, and DevOps.

Portfolio: [add your published URL]

## Recruiter-readiness checklist

- [ ] Add and test a current resume, public email, GitHub profile, and LinkedIn profile in `config.js`.
- [ ] Add only repositories that exist, are accessible, and substantiate their linked case study.
- [ ] Replace illustrative designs and sample workflows with implementation evidence, screenshots, and test results where available.
- [ ] Remove or qualify any skills that do not accurately reflect your experience.
- [ ] Verify all public claims, mobile layouts, keyboard navigation, and links on the deployed domain.
- [ ] Add a custom domain if available and confirm the page title, description, favicon, and HTTPS.
- [ ] Review personal information in the resume and contact details before making them public.