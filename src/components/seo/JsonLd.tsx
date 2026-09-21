import { contacts, siteConfig } from "@/content/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/og.jpg`,
    telephone: contacts.phone,
    email: contacts.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1-й Тверской-Ямской переулок, 18",
      addressLocality: "Москва",
      addressCountry: "RU",
    },
    areaServed: ["Schengen", "United Kingdom", "United States", "Japan"],
    serviceType: "Visa consulting",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
