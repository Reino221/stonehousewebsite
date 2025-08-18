# GitHub Actions Auto-Deployment Setup Guide

## Prerequisites
1. GitHub account
2. Firebase project created
3. Local Git repository

## Setup Steps

### 1. Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repository
1. Go to GitHub.com
2. Click "New repository"
3. Name it "stonehouse-holdings" (or your preferred name)
4. Don't initialize with README (since you have files already)
5. Copy the repository URL

### 3. Connect Local to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/stonehouse-holdings.git
git branch -M main
git push -u origin main
```

### 4. Get Firebase Service Account Key
1. Go to Firebase Console
2. Project Settings → Service Accounts
3. Click "Generate new private key"
4. Download the JSON file

### 5. Add Firebase Secret to GitHub
1. Go to your GitHub repository
2. Settings → Secrets and Variables → Actions
3. Click "New repository secret"
4. Name: FIREBASE_SERVICE_ACCOUNT_STONEHOUSE_HOLDINGS
5. Value: Paste the entire content of the JSON file you downloaded

### 6. Update Firebase Project ID
Edit .github/workflows/firebase-hosting.yml and replace "stonehouse-holdings" with your actual Firebase project ID

## How It Works
- Every time you push to main branch → automatic deployment
- Every pull request → preview deployment
- Build errors will show in GitHub Actions tab
- Deployment status visible in GitHub

## Commands for Future Updates
```bash
git add .
git commit -m "Your update message"
git push origin main
```
That's it! Auto-deployment is now active.
