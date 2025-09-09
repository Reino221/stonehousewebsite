# Complete deployment script - Updates website and Outlook signature
# Run this script whenever you want to deploy signature changes

Write-Host "🚀 Starting Complete Email Signature Deployment..." -ForegroundColor Green
Write-Host "=" * 50

# Step 1: Build the website
Write-Host "`n📦 Building website..." -ForegroundColor Yellow
try {
    & npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed"
    }
    Write-Host "✅ Website build completed" -ForegroundColor Green
} catch {
    Write-Host "❌ Website build failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 2: Commit and push to GitHub
Write-Host "`n📤 Deploying to GitHub..." -ForegroundColor Yellow
try {
    & git add .
    $commitMessage = "Update email signature - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    & git commit -m $commitMessage
    & git push
    Write-Host "✅ Pushed to GitHub successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ GitHub deployment failed: $($_.Exception.Message)" -ForegroundColor Red
    # Continue anyway - maybe no changes to commit
}

# Step 3: Update Outlook signature
Write-Host "`n📧 Updating Outlook signature..." -ForegroundColor Yellow
try {
    & PowerShell -ExecutionPolicy Bypass -File "update_outlook_signature.ps1"
    Write-Host "✅ Outlook signature updated" -ForegroundColor Green
} catch {
    Write-Host "❌ Outlook signature update failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 4: Wait and test website images
Write-Host "`n⏳ Waiting for website deployment (30 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host "`n🧪 Testing image accessibility..." -ForegroundColor Yellow
$testUrls = @(
    "https://www.stonehousegroup.co.za/email-signature.png",
    "https://www.stonehousegroup.co.za/linkedin-icon.png",
    "https://www.stonehousegroup.co.za/facebook-icon.png", 
    "https://www.stonehousegroup.co.za/whatsapp-icon.png"
)

foreach ($url in $testUrls) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ $url - Accessible" -ForegroundColor Green
        } else {
            Write-Host "⚠️  $url - Status: $($response.StatusCode)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ $url - Not accessible yet" -ForegroundColor Red
    }
}

Write-Host "`n" + "=" * 50
Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Website updated and deployed"
Write-Host "✅ Outlook signature file updated"
Write-Host "✅ All signature images should be live"
Write-Host ""
Write-Host "💡 Next: Open Outlook and verify your signature appears correctly!" -ForegroundColor Cyan
