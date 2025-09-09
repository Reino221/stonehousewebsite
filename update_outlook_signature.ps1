# PowerShell script to automatically update Outlook signature
# This script copies the hosted email signature to Outlook's signature folder

param(
    [string]$SignatureName = "Stonehouse"
)

# Paths
$SourceFile = "outlook_hosted.htm"
$OutlookSignaturesPath = "$env:APPDATA\Microsoft\Signatures"
$TargetFile = "$OutlookSignaturesPath\$SignatureName.htm"

Write-Host "=== Outlook Signature Auto-Updater ===" -ForegroundColor Green
Write-Host ""

# Check if source file exists
if (-not (Test-Path $SourceFile)) {
    Write-Host "❌ Error: $SourceFile not found!" -ForegroundColor Red
    Write-Host "Make sure you're running this from the correct directory." -ForegroundColor Yellow
    exit 1
}

# Create Outlook signatures directory if it doesn't exist
if (-not (Test-Path $OutlookSignaturesPath)) {
    Write-Host "📁 Creating Outlook signatures directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $OutlookSignaturesPath -Force | Out-Null
}

# Copy the signature file
try {
    Copy-Item $SourceFile $TargetFile -Force
    Write-Host "✅ Signature updated successfully!" -ForegroundColor Green
    Write-Host "📍 Updated: $TargetFile" -ForegroundColor Cyan
    
    # Also create a .txt version for plain text emails
    $PlainTextFile = "$OutlookSignaturesPath\$SignatureName.txt"
    $PlainTextContent = @"
REINO FOURIE
Director | Stonehouse Holdings

📞 +27 64 559 8007
🌐 www.stonehousegroup.co.za

LinkedIn: https://www.linkedin.com/in/reino-fourie-2059b7307
Facebook: https://www.facebook.com/share/19eD2Zxufi/?mibextid=wwXIfr
WhatsApp: http://wa.me/27645598007
"@
    
    $PlainTextContent | Out-File -FilePath $PlainTextFile -Encoding UTF8
    Write-Host "📝 Plain text version created: $PlainTextFile" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error copying signature file: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Yellow
Write-Host "1. Open Outlook" 
Write-Host "2. Go to File > Options > Mail > Signatures"
Write-Host "3. Your '$SignatureName' signature should be available"
Write-Host "4. Set it as default for new messages and replies"
Write-Host ""
Write-Host "💡 To run this script automatically after website updates:" -ForegroundColor Cyan
Write-Host "   Add this command to your deployment process:"
Write-Host "   PowerShell -ExecutionPolicy Bypass -File update_outlook_signature.ps1"
