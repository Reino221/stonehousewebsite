@echo off
echo Building and deploying to Firebase...
npm run build
if %errorlevel% equ 0 (
    firebase deploy
    echo Deployment complete!
) else (
    echo Build failed!
)
pause
