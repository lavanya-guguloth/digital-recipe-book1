# GitHub & Git Setup Guide

Step-by-step guide to initialize git, configure GitHub, and push your project.

---

## 🚀 Quick Start (5 minutes)

### Step 1: Initialize Git Repository

```bash
cd g:\DigitalRecipeBook_Food
git init
```

### Step 2: Configure Git

```bash
# Set your name
git config user.name "Your Name"

# Set your email
git config user.email "your.email@example.com"
```

### Step 3: Add All Files

```bash
# Stage all files
git add .

# Verify what's staged
git status
```

**Expected Output**:
```
On branch master
Initial commit

Changes to be committed:
  new file:   frontend/package.json
  new file:   backend/package.json
  ... (all project files)
```

### Step 4: Create Initial Commit

```bash
git commit -m "Initial commit: Sprint 1 scaffolding complete

- Frontend: React with Tailwind CSS setup
- Backend: Express.js with Supabase integration
- Database: PostgreSQL schema with 8 tables
- Auth: JWT-based authentication system
- Documentation: Complete API and deployment guides"
```

### Step 5: Add Remote Repository

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/umeshchandracholleti/DigitalRecipeBook_Food.git

# Verify remote is added
git remote -v
```

**Expected Output**:
```
origin  https://github.com/umeshchandracholleti/DigitalRecipeBook_Food.git (fetch)
origin  https://github.com/umeshchandracholleti/DigitalRecipeBook_Food.git (push)
```

### Step 6: Push to GitHub

```bash
# Push to main branch (create if doesn't exist)
git branch -M main
git push -u origin main

# Verify push (should show main branch with commits)
git log --oneline
```

**Expected Output**:
```
abc1234 Initial commit: Sprint 1 scaffolding complete
```

---

## ✅ Verification

Check your GitHub repository to confirm:

```
✅ Files pushed successfully
✅ All folders visible (frontend/, backend/, docs/)
✅ All 50+ files in repository
✅ Commit message displays integration summary
```

---

## 📝 Important: .gitignore

Your `.gitignore` already excludes:

```
# Environment files (never commit secrets)
.env
.env.local
.env.*.local

# Dependencies
node_modules/

# Build outputs
dist/
build/

# IDE files
.vscode/
.idea/
*.swp

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

**Verify no secret files are in git**:
```bash
# Should return empty
git ls-files | grep -E "\.env|node_modules"
```

---

## 🔄 Future Commits Workflow

### Adding New Features

```bash
# Create a feature branch
git checkout -b feature/recipe-creation

# Make changes to files like: frontend/src/pages/CreateRecipe.jsx

# Stage changes
git add frontend/src/pages/CreateRecipe.jsx

# Commit with descriptive message
git commit -m "feat: implement recipe creation form with validation

- Add CreateRecipe page component
- Integrate with Recipe API service
- Add form validation using react-hook-form
- Include image upload functionality"

# Push to GitHub
git push origin feature/recipe-creation

# Create Pull Request on GitHub
# (GitHub will show "Compare & pull request" button)
```

### Commit Message Format

Follow this format for consistency:

```
type(scope): subject

type:
  - feat: new feature
  - fix: bug fix
  - docs: documentation
  - style: formatting
  - refactor: code restructuring
  - perf: performance improvement
  - test: test addition
  - chore: maintenance

scope:
  - auth: authentication related
  - recipe: recipe feature
  - ui: user interface
  - api: API endpoints
  - db: database

subject: brief description (50 chars max)

Optional body with more details...
```

**Examples**:
```
feat(auth): add two-factor authentication
fix(recipe): resolve image upload timeout issue
docs(api): add endpoint documentation for meal planning
refactor(db): optimize recipe query performance
```

---

## 🌿 Branch Strategy

### Main Branch
- **Protected**: Only merge PRs with reviews
- **Purpose**: Production-ready code
- **Auto-deploys** to production

### Development Branch (Optional Setup)
```bash
# Create develop branch
git checkout -b develop
git push -u origin develop

# Then feature branches branch off develop
git checkout -b feature/some-feature develop
```

### Feature Branches
```bash
# For each Sprint task
git checkout -b feature/task-name

# After work done
git push origin feature/task-name
# Then create PR and merge to main/develop
```

---

## 🔗 Branch Protection Setup

### On GitHub

1. Go to repository → Settings → Branches
2. Click "Add rule"
3. Apply to branch name: `main`
4. Enable:
   - ✅ "Require pull request reviews before merging"
   - ✅ "Dismiss stale pull request approvals when new commits are pushed"
   - ✅ "Require branches to be up to date before merging"
   - ✅ "Require status checks to pass"

---

## 📚 Common Git Commands

```bash
# Check status
git status

# See recent commits
git log --oneline

# See what changed
git diff

# Stage specific file
git add path/to/file

# Unstage file
git restore --staged path/to/file

# Discard changes to file
git checkout path/to/file

# Create new branch
git checkout -b branch-name

# Switch branch
git checkout branch-name

# Delete branch
git branch -d branch-name

# Pull latest changes
git pull origin main

# Push changes
git push origin branch-name

# Stash work in progress
git stash

# Apply stashed work
git stash pop
```

---

## 🚨 Troubleshooting

### Issue: "Authentication failed"

**Solution**:
```bash
# Use personal access token instead of password
# Or setup SSH key

# For SSH:
# 1. Generate key
ssh-keygen -t ed25519 -C "your.email@example.com"

# 2. Add to GitHub Settings → SSH and GPG keys

# 3. Change remote URL
git remote set-url origin git@github.com:umeshchandracholleti/DigitalRecipeBook_Food.git
```

### Issue: "Permission denied"

**Solution**:
```bash
# Make sure you have write access to repository
# Check GitHub repository collaborators
# Or use: git config credential.helper store
```

### Issue: "Rejected (non-fast-forward)"

**Solution**:
```bash
# Pull latest changes first
git pull origin main

# Then push
git push origin main
```

---

## 📖 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Done!** Your project is now on GitHub and ready for deployment. 🎉

