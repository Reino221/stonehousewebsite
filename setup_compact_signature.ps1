# PowerShell script to create compact email signature
# Standard size: 400px width x 100px height (4:1 ratio)

# Create Outlook signature directory if it doesn't exist
$signatureDir = "$env:APPDATA\Microsoft\Signatures"
if (!(Test-Path $signatureDir)) {
    New-Item -ItemType Directory -Path $signatureDir -Force
}

# Copy logo to signature directory
$logoSource = "stonehouse logo.jpg"
$logoDestination = "$signatureDir\stonehouse_logo.jpg"
if (Test-Path $logoSource) {
    Copy-Item $logoSource $logoDestination -Force
    Write-Host "✅ Logo copied to Outlook signatures folder"
} else {
    Write-Host "❌ Logo file 'stonehouse logo.jpg' not found in current directory"
}

# Create COMPACT signature HTML (400x100px - 4:1 ratio)
$signatureHTML = @"
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
<table cellpadding="0" cellspacing="0" border="0" style="width: 400px; height: 100px; border-collapse: collapse; background: linear-gradient(90deg, #102532 30%, #f8f9fa 30%); border-radius: 8px; overflow: hidden;">
<tr>
<!-- Logo section - 30% width -->
<td style="width: 120px; text-align: center; vertical-align: middle; background: #102532; padding: 10px;">
<img src="$logoDestination" alt="Stonehouse Logo" style="width: 60px; height: auto; display: block; margin: 0 auto;" />
</td>
<!-- Content section - 70% width -->
<td style="width: 280px; padding: 15px 20px; vertical-align: middle; background: #f8f9fa;">
<div style="line-height: 1.2;">
<!-- Name & Title - compact -->
<div style="font-size: 16px; font-weight: bold; color: #2c3e50; margin: 0 0 2px 0;">REINO FOURIE</div>
<div style="font-size: 11px; color: #5a6c7d; margin: 0 0 6px 0;">Director | Stonehouse Holdings</div>
<!-- Contact - compact -->
<div style="font-size: 10px; color: #2c3e50; margin: 0 0 2px 0;">📞 +27 64 559 8007</div>
<div style="font-size: 10px; margin: 0 0 6px 0;">
<a href="https://www.stonehousegroup.co.za" style="color: #2c3e50; text-decoration: none;">🌐 www.stonehousegroup.co.za</a>
</div>
<!-- Social - compact buttons -->
<div>
<a href="https://www.linkedin.com/in/reino-fourie-2059b7307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" style="display: inline-block; background: #0077B5; color: white; padding: 3px 6px; border-radius: 8px; text-decoration: none; font-size: 8px; font-weight: bold; margin-right: 4px;">LinkedIn</a>
<a href="https://www.facebook.com/share/19eD2Zxufi/?mibextid=wwXIfr" style="display: inline-block; background: #1877F2; color: white; padding: 3px 6px; border-radius: 8px; text-decoration: none; font-size: 8px; font-weight: bold; margin-right: 4px;">Facebook</a>
<a href="http://wa.me/27645598007" style="display: inline-block; background: #25D366; color: white; padding: 3px 6px; border-radius: 8px; text-decoration: none; font-size: 8px; font-weight: bold;">WhatsApp</a>
</div>
</div>
</td>
</tr>
</table>
</body>
</html>
"@

# Save compact signature HTML
$signatureHTML | Out-File -FilePath "$signatureDir\Stonehouse_Compact.htm" -Encoding UTF8 -Force

Write-Host "✅ COMPACT signature created: $signatureDir\Stonehouse_Compact.htm"
Write-Host ""
Write-Host "📏 Signature dimensions: 400px x 100px (4:1 ratio)"
Write-Host "📧 Perfect for email standards!"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Open Outlook"
Write-Host "2. Go to File → Options → Mail → Signatures"
Write-Host "3. Select 'Stonehouse_Compact' signature"
Write-Host "4. Set as default for new emails"
Write-Host ""
Write-Host "All links clickable + industry standard size!"
