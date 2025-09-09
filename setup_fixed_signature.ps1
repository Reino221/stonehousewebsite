# PowerShell script to create properly sized compact email signature
# Standard size: 400px width x 100px height with SMALL logo and ROUND social icons

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

# Create PROPERLY SIZED signature HTML with SMALL logo and ROUND social icons
$signatureHTML = @"
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
<table cellpadding="0" cellspacing="0" border="0" style="width: 400px; height: 100px; border-collapse: collapse; background: linear-gradient(90deg, #102532 25%, #f8f9fa 25%); border-radius: 8px; overflow: hidden;">
<tr>
<!-- Logo section - MUCH smaller -->
<td style="width: 100px; text-align: center; vertical-align: middle; background: #102532; padding: 10px;">
<img src="$logoDestination" alt="Stonehouse Logo" style="width: 35px; height: auto; display: block; margin: 0 auto;" />
</td>
<!-- Content section -->
<td style="width: 300px; padding: 12px 15px; vertical-align: middle; background: #f8f9fa;">
<div style="line-height: 1.1;">
<!-- Name & Title - compact -->
<div style="font-size: 14px; font-weight: bold; color: #2c3e50; margin: 0 0 2px 0;">REINO FOURIE</div>
<div style="font-size: 10px; color: #5a6c7d; margin: 0 0 5px 0;">Director | Stonehouse Holdings</div>
<!-- Contact - compact -->
<div style="font-size: 9px; color: #2c3e50; margin: 0 0 1px 0;">📞 +27 64 559 8007</div>
<div style="font-size: 9px; margin: 0 0 5px 0;">
<a href="https://www.stonehousegroup.co.za" style="color: #2c3e50; text-decoration: none;">🌐 www.stonehousegroup.co.za</a>
</div>
<!-- Social - ROUND CIRCLES -->
<div style="display: flex; gap: 4px;">
<a href="https://www.linkedin.com/in/reino-fourie-2059b7307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" style="width: 16px; height: 16px; background: #0077B5; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; font-size: 8px; font-weight: bold;">in</a>
<a href="https://www.facebook.com/share/19eD2Zxufi/?mibextid=wwXIfr" style="width: 16px; height: 16px; background: #1877F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; font-size: 8px; font-weight: bold;">f</a>
<a href="http://wa.me/27645598007" style="width: 16px; height: 16px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; font-size: 7px; font-weight: bold;">W</a>
</div>
</div>
</td>
</tr>
</table>
</body>
</html>
"@

# Save properly sized signature HTML
$signatureHTML | Out-File -FilePath "$signatureDir\Stonehouse_Fixed.htm" -Encoding UTF8 -Force

Write-Host "✅ FIXED signature created: $signatureDir\Stonehouse_Fixed.htm"
Write-Host ""
Write-Host "📏 Logo: 35px (much smaller!)"
Write-Host "🔵 Social icons: 16px round circles"
Write-Host "📧 Total size: 400px x 100px"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Open Outlook"
Write-Host "2. Go to File → Options → Mail → Signatures"
Write-Host "3. Select 'Stonehouse_Fixed' signature"
Write-Host "4. Set as default for new emails"
Write-Host ""
Write-Host "Logo is now properly sized + round social icons!"
