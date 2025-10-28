```markdown
# DevOps CI/CD Project — Docker · Terraform · Ansible · GitHub Actions · Render

## Overview
Minimal DevOps pipeline that builds, containerizes, and deploys a Node.js app using GitHub Actions, Docker Hub, Ansible and optional Terraform. Deploy target: Render (free, no credit card).

## Repo structure
```

devops-project/
├── app/
│   ├── index.js
│   └── package.json
├── Dockerfile
├── terraform/
│   └── main.tf
├── ansible/
│   └── deploy.yml
└── .github/workflows/ci-cd.yml

````

## Quick start
1. Clone:
```bash
git clone https://github.com/PrinithJeffrey/devops-project.git
cd devops-project
````

2. Build & run locally:

```bash
docker build -t devops-app .
docker run -p 3000:3000 devops-app
# visit http://localhost:3000
```

3. Push to GitHub:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/PrinithJeffrey/devops-project.git
git push -u origin main
```

4. Configure GitHub Secrets (Settings → Secrets → Actions):

* `DOCKER_USERNAME` — Docker Hub username
* `DOCKER_PASSWORD` — Docker Hub password or token

5. Create Docker Hub repo: `devops-app` (public). GitHub Actions will push `docker.io/PrinithJeffrey/devops-app:latest`.

6. Deploy on Render (Deploy from Docker): image `docker.io/PrinithJeffrey/devops-app`, port `3000`.

## CI/CD summary

* On push to `main`: GitHub Actions builds Docker image, pushes to Docker Hub, then runs Ansible playbook (or triggers cloud deploy).
* Render pulls the image and serves the app.

## Terraform (optional)

Basic local Docker deployment via Terraform using the Docker provider. Use `terraform init` and `terraform apply` inside `terraform/`.

## Ansible

`ansible/deploy.yml` ensures Docker is present, pulls the image and runs the container:

```bash
ansible-playbook ansible/deploy.yml
```


## License

MIT License

Copyright (c) 2025 Prinith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

