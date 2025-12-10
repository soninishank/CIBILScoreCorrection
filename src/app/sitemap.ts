import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cibilthikkare.com";

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/hi`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Add more static pages here if needed later
    // Example:
    // { url: `${siteUrl}/services`, lastModified: new Date() },

    // Blog pages will go here later
  ];
}
