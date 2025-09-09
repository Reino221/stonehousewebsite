# PowerShell script to automatically set up Outlook signature
# Run this in PowerShell as Administrator

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

# Create the signature HTML with local logo reference
$signatureHTML = @"
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
<div style="background: #1a3a47; border-radius: 15px; padding: 0; max-width: 600px; overflow: hidden;">
<table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
<tr>
<td style="width: 200px; vertical-align: middle; text-align: center; padding: 40px 20px; background: #102532;">
<img src="$logoDestination" alt="Stonehouse Logo" style="width:120px; height:auto; margin:0 auto; display:block;" />
</td>
<td style="background-color: #f8f9fa; padding: 40px 30px; vertical-align: top;">
<div style="margin-bottom: 20px;">
<div style="margin: 0 0 5px 0; font-size: 28px; font-weight: 900; color: #2c3e50; letter-spacing: 1px;">REINO FOURIE</div>
<div style="margin: 0; font-size: 16px; color: #5a6c7d; font-weight: 400;">Director | Stonehouse Holdings</div>
</div>
<div style="margin-bottom: 25px;">
<div style="margin-bottom: 8px;"><span style="font-size: 16px; color: #2c3e50; font-weight: 500;">📞 +27 64 559 8007</span></div>
<div style="margin-bottom: 8px;"><a href="https://www.stonehousegroup.co.za" style="font-size: 16px; color: #2c3e50; text-decoration: none; font-weight: 500;">🌐 www.stonehousegroup.co.za</a></div>
</div>
<div style="margin-top: 15px;">
<a href="https://www.linkedin.com/in/reino-fourie-2059b7307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" style="display: inline-block; background: #0077B5; color: white; padding: 8px 12px; border-radius: 15px; text-decoration: none; font-size: 12px; font-weight: bold; margin-right: 8px;">LinkedIn</a>
<a href="https://www.facebook.com/share/19eD2Zxufi/?mibextid=wwXIfr" style="display: inline-block; background: #1877F2; color: white; padding: 8px 12px; border-radius: 15px; text-decoration: none; font-size: 12px; font-weight: bold; margin-right: 8px;">Facebook</a>
<a href="http://wa.me/27645598007" style="display: inline-block; background: #25D366; color: white; padding: 8px 12px; border-radius: 15px; text-decoration: none; font-size: 12px; font-weight: bold;">WhatsApp</a>
</div>
</td>
</tr>
</table>
</div>
</body>
</html>
"@

# Save signature HTML
$signatureHTML | Out-File -FilePath "$signatureDir\Stonehouse.htm" -Encoding UTF8 -Force

Write-Host "✅ Signature created: $signatureDir\Stonehouse.htm"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Open Outlook"
Write-Host "2. Go to File → Options → Mail → Signatures"
Write-Host "3. Select 'Stonehouse' signature"
Write-Host "4. Set as default for new emails"
Write-Host ""
Write-Host "All links will be clickable!"
