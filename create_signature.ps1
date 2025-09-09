# PowerShell script to create image-based email signature for Outlook
# This script helps convert HTML signature to image with clickable areas

Write-Host "Email Signature Conversion Guide for Outlook" -ForegroundColor Green
Write-Host "=" * 50

Write-Host "`n1. OPTION 1: Use the simplified HTML version (Recommended)" -ForegroundColor Yellow
Write-Host "   - File created: email_signature_outlook.html"
Write-Host "   - This uses tables instead of flexbox for better Outlook compatibility"
Write-Host "   - Try this first in Outlook before converting to image"

Write-Host "`n2. OPTION 2: Convert to image with clickable areas" -ForegroundColor Yellow
Write-Host "   Steps to create image-based signature:"
Write-Host "   a) Open email_signature_outlook.html in your browser"
Write-Host "   b) Take a screenshot or use browser dev tools to export as PNG"
Write-Host "   c) Save as 'email_signature.png'"

Write-Host "`n3. For Outlook setup:" -ForegroundColor Cyan
Write-Host "   Method A (HTML): Copy content from email_signature_outlook.html"
Write-Host "   Method B (Image): Use the PNG file with the image map below"

Write-Host "`nWould you like me to:"
Write-Host "1. Open the HTML file in browser for you to screenshot"
Write-Host "2. Create the image map HTML code"
Write-Host "3. Both"

$choice = Read-Host "`nEnter your choice (1, 2, or 3)"

switch ($choice) {
    "1" { 
        Start-Process "email_signature_outlook.html"
        Write-Host "HTML file opened in browser. Take a screenshot for the image version."
    }
    "2" {
        Write-Host "`nImage Map HTML Template (use after creating PNG):" -ForegroundColor Green
        Write-Host @"
<img src="email_signature.png" alt="Reino Fourie - Stonehouse Holdings" usemap="#signature-map" style="border:0;">
<map name="signature-map">
    <!-- Website clickable area (adjust coordinates based on your image) -->
    <area shape="rect" coords="250,80,450,100" href="https://www.stonehousegroup.co.za" target="_blank" alt="Website">
    
    <!-- LinkedIn icon clickable area -->
    <area shape="circle" coords="270,140,17" href="https://www.linkedin.com/in/reino-fourie-2059b7307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" alt="LinkedIn">
    
    <!-- Facebook icon clickable area -->
    <area shape="circle" coords="320,140,17" href="https://www.facebook.com/share/19eD2Zxufi/?mibextid=wwXIfr" target="_blank" alt="Facebook">
    
    <!-- WhatsApp icon clickable area -->
    <area shape="circle" coords="370,140,17" href="http://wa.me/27645598007" target="_blank" alt="WhatsApp">
</map>
"@
    }
    "3" {
        Start-Process "email_signature_outlook.html"
        Write-Host "`nHTML opened in browser AND image map template ready!"
        Write-Host "`nImage Map HTML Template:" -ForegroundColor Green
        Write-Host @"
<img src="email_signature.png" alt="Reino Fourie - Stonehouse Holdings" usemap="#signature-map" style="border:0;">
<map name="signature-map">
    <area shape="rect" coords="250,80,450,100" href="https://www.stonehousegroup.co.za" target="_blank" alt="Website">
    <area shape="circle" coords="270,140,17" href="https://www.linkedin.com/in/reino-fourie-2059b7307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" alt="LinkedIn">
    <area shape="circle" coords="320,140,17" href="https://www.facebook.com/share/19eD2Zxufi/?mibextid=wwXIfr" target="_blank" alt="Facebook">
    <area shape="circle" coords="370,140,17" href="http://wa.me/27645598007" target="_blank" alt="WhatsApp">
</map>
"@
    }
    default {
        Write-Host "Invalid choice. Run the script again."
    }
}

Write-Host "`n" + "=" * 50
Write-Host "Next Steps:" -ForegroundColor Green
Write-Host "1. Try the HTML version in Outlook first (often works better than expected)"
Write-Host "2. If HTML doesn't work, create PNG and use image map"
Write-Host "3. In Outlook: Insert > Signature > paste the appropriate code"
