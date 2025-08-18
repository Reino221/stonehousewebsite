@echo off
echo Setting up Git repository and GitHub connection...
echo.

REM Initialize git if not already done
if not exist .git (
    echo Initializing Git repository...
    git init
)

REM Add all files
echo Adding files to Git...
git add .

REM Commit changes
echo Committing changes...
git commit -m "Setup automatic deployment with GitHub Actions"

echo.
echo ===================================
echo NEXT STEPS:
echo ===================================
echo 1. Go to GitHub.com and create a new repository
echo 2. Copy the repository URL
echo 3. Run: git remote add origin YOUR_REPO_URL
echo 4. Run: git push -u origin main
echo 5. Follow the DEPLOYMENT_GUIDE.md for Firebase setup
echo.
echo After setup, every git push will auto-deploy your website!
echo.
pause
