import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Stonehouse Holdings",
    "alternateName": ["Stonehouse Group", "Stonehouse"],
    "url": "https://www.stonehousegroup.co.za",
    "logo": "https://www.stonehousegroup.co.za/stonehouse%20logo.jpg",
    "image": "https://www.stonehousegroup.co.za/stonehouse%20logo.jpg",
    "description": "Leading global trading company specializing in refineries, minerals, fuel distribution, and deceased estate administration.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+27-64-559-8007",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bloemfontein",
      "addressCountry": "ZA"
    },
    "sameAs": [
      "https://www.facebook.com/share/16CpDKFbLA/?mibextid=wwXIfr",
      "https://www.linkedin.com/in/reino-fourie-2059b7307"
    ],
    "founder": {
      "@type": "Person",
      "name": "Reino Fourie"
    },
    "knowsAbout": [
      "Global Trading",
      "Petroleum Refineries", 
      "Mineral Trading",
      "Fuel Distribution",
      "Deceased Estate Administration"
    ]
  };

  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Stonehouse Holdings - Leading global trading company specializing in refineries, minerals, fuel distribution, and deceased estate administration." />
        <meta name="keywords" content="Stonehouse Holdings, global trading, refineries, minerals, fuel distribution, estate administration" />
        <link rel="icon" href="/stonehouse logo.jpg" />
        
        {/* Organization Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
