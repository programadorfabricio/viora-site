import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { servicePages } from "@/content/services";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/precos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/area-de-atendimento`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/sobre`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = servicePages.map((service) => ({
    url: `${site.url}/servicos/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
