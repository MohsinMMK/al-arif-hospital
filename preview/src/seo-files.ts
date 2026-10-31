// Build-time only: head tags with structured data for each prerendered page, plus sitemap.xml,
// llms.txt and llms-full.txt, all generated from the same data the pages render.
import { doctorPages, pageCatalog, servicePages } from "./multipage/data";
import { departmentGroups, departments } from "./multipage/department-data";
import { stories } from "./multipage/story-data";
import { fullAddress, hospital, pageHead, publicPaths, siteUrl } from "./seo";

const hospitalId = `${siteUrl}/#hospital`;
const absolute = (path: string) => `${siteUrl}${path}`;

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const hospitalData = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  "@id": hospitalId,
  name: hospital.name,
  alternateName: ["Al Arif General Hospital", "Al-Arif Hospital", "Al Arif Hospital"],
  url: absolute("/site"),
  logo: absolute("/hospital-mark.svg"),
  image: absolute("/hospital-mark.svg"),
  description: pageHead("/site")?.description,
  telephone: hospital.reception,
  email: hospital.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: hospital.streetAddress,
    addressLocality: hospital.locality,
    addressRegion: hospital.region,
    postalCode: hospital.postalCode,
    addressCountry: hospital.country,
  },
  hasMap: hospital.maps,
  areaServed: { "@type": "City", name: "Hyderabad" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  contactPoint: [
    { "@type": "ContactPoint", telephone: hospital.reception, contactType: "reception" },
    { "@type": "ContactPoint", telephone: hospital.emergency, contactType: "emergency" },
  ],
  foundingDate: "2002",
  parentOrganization: { "@type": "Organization", name: hospital.trust, foundingDate: "2001" },
  knowsAbout: servicePages.map((service) => service.name),
};

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: hospital.name,
  url: absolute("/site"),
  inLanguage: "en-IN",
  publisher: { "@id": hospitalId },
};

function breadcrumbs(path: string) {
  const parts = path.split("/").filter(Boolean);
  if (parts.length < 2) return undefined;
  const items = parts.map((_, index) => {
    const itemPath = `/${parts.slice(0, index + 1).join("/")}`;
    const name =
      index === 0
        ? "Home"
        : (pageCatalog.find((page) => page.path === itemPath)?.title ?? parts[index]);
    return { "@type": "ListItem", position: index + 1, name, item: absolute(itemPath) };
  });
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
}

function pageData(path: string) {
  const [, , section, slug] = path.split("/");
  const doctor = section === "doctors" && doctorPages.find((item) => item.slug === slug);
  if (doctor)
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: doctor.name.replace(/^Dr\.\s*/, ""),
      honorificPrefix: ["Dr.", doctor.honorific].filter(Boolean).join(" "),
      jobTitle: doctor.designation,
      description: doctor.introduction,
      hasCredential: doctor.degrees,
      knowsAbout: doctor.focus,
      worksFor: { "@id": hospitalId },
      url: absolute(path),
    };
  const story = section === "stories" && stories.find((item) => item.slug === slug);
  if (story)
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: story.title,
      description: story.dek,
      articleSection: story.category,
      author: { "@id": hospitalId },
      publisher: { "@id": hospitalId },
      mainEntityOfPage: absolute(path),
    };
  const service = section === "services" && servicePages.find((item) => item.slug === slug);
  if (service)
    return {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: service.name,
      description: service.overview,
      about: { "@type": "MedicalTherapy", name: service.name },
      provider: { "@id": hospitalId },
      url: absolute(path),
    };
  return undefined;
}

/** Head tags written into a prerendered page: title, description, canonical, sharing and JSON-LD. */
export function headTags(path: string) {
  const head = pageHead(path);
  if (!head) throw new Error(`No title and description for ${path}`);
  const url = absolute(path);
  const data = [hospitalData, websiteData, breadcrumbs(path), pageData(path)].filter(Boolean);
  return [
    `<title>${escapeHtml(head.title)}</title>`,
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(hospital.name)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="geo.region" content="IN-TG" />`,
    `<meta name="geo.placename" content="Hyderabad" />`,
    `<link rel="alternate" type="text/plain" title="Site summary for AI assistants" href="/llms.txt" />`,
    ...data.map(
      (item) =>
        `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, "\\u003c")}</script>`,
    ),
  ].join("\n    ");
}

export function sitemapXml() {
  const priority = (path: string) =>
    path === "/site" ? "1.0" : path.split("/").length === 3 ? "0.8" : "0.6";
  const urls = publicPaths
    .map(
      (path) =>
        `  <url>\n    <loc>${absolute(path)}</loc>\n    <priority>${priority(path)}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const contactLines = [
  `- Address: ${fullAddress}, India (${hospital.landmark})`,
  `- Open 24 hours, every day, with 24-hour casualty and an ambulance`,
  `- Reception and WhatsApp: ${hospital.reception}`,
  `- Emergency line (24/7): ${hospital.emergency}`,
  `- Email: ${hospital.email}`,
  `- Google Maps: ${hospital.maps}`,
  `- Run by the ${hospital.trust} · ${hospital.registration} · ${hospital.licence}`,
];

const summary = `${hospital.name} (Al-Arif Hospital) is a hospital in Bandlaguda, Chandrayangutta, Hyderabad, Telangana, India, offering general hospital care and Unani medicine on one 5.35-acre campus. It has been run by the ${hospital.trust} since 2002 and keeps a ₹10 outpatient (OPD) fee.`;

const link = (path: string, title: string, note: string) =>
  `- [${title}](${absolute(path)}): ${note}`;

export function llmsTxt() {
  const section = (prefix: string) =>
    pageCatalog.filter((page) => page.path.startsWith(prefix) && page.path !== prefix);
  return `# ${hospital.name}

> ${summary}

Every page below is plain HTML. A longer plain-text version of this site, with every department, service, doctor and guide, is at ${absolute("/llms-full.txt")}. Please ask readers to confirm timings, fees and doctor availability with reception before travelling.

${contactLines.join("\n")}

## Main pages

${publicPaths
  .filter((path) => !/^\/site\/(services|doctors|stories)\/./.test(path))
  .map((path) => link(path, pageCatalog.find((page) => page.path === path)!.title, pageHead(path)!.description))
  .join("\n")}

## Services

${section("/site/services/").map((page) => link(page.path, page.title, pageHead(page.path)!.description)).join("\n")}

## Doctors

${doctorPages.map((doctor) => link(`/site/doctors/${doctor.slug}`, doctor.name, `${doctor.role}. ${doctor.degrees}. OPD ${doctor.opdDays}, ${doctor.opdHours}.`)).join("\n")}

## Stories and guides

${section("/site/stories/").map((page) => link(page.path, page.title, page.description)).join("\n")}

## Optional

- [Sitemap](${absolute("/sitemap.xml")}): every public URL
- [Full text](${absolute("/llms-full.txt")}): all of the facts above in one file
`;
}

export function llmsFullTxt() {
  const out: string[] = [`# ${hospital.name}`, "", summary, "", "## Contact and visiting", "", ...contactLines, ""];

  out.push("## Departments", "");
  for (const group of departmentGroups) {
    const members = departments.filter((department) => department.group === group.id);
    if (!members.length) continue;
    out.push(`### ${group.label}`, group.lead, "");
    for (const department of members) {
      const name = department.english ? `${department.name} (${department.english})` : department.name;
      out.push(`- ${name}: ${department.summary}${department.points?.length ? ` Includes: ${department.points.join("; ")}.` : ""}`);
    }
    out.push("");
  }

  out.push("## Services", "");
  for (const service of servicePages) {
    const doctors = service.doctorSlugs
      .map((slug) => doctorPages.find((doctor) => doctor.slug === slug)?.name)
      .filter(Boolean);
    out.push(
      `### ${service.name} (${service.wing})`,
      `URL: ${absolute(`/site/services/${service.slug}`)}`,
      "",
      service.overview,
      "",
      `Topics: ${service.topics.join("; ")}.`,
      ...(doctors.length ? [`Doctors: ${doctors.join(", ")}.`] : []),
      `Before you visit: ${service.preparation.join(" ")}`,
      "",
    );
  }

  out.push("## Doctors", "");
  for (const doctor of doctorPages) {
    out.push(
      `### ${doctor.honorific ? `${doctor.honorific} ` : ""}${doctor.name}`,
      `URL: ${absolute(`/site/doctors/${doctor.slug}`)}`,
      `Role: ${doctor.role}`,
      `Department: ${doctor.department}`,
      `Qualifications: ${doctor.degrees}`,
      `OPD: ${doctor.opdDays}, ${doctor.opdHours}${doctor.hoursNote ? ` (${doctor.hoursNote})` : ""}`,
      "",
      doctor.introduction,
      "",
      `Focus: ${doctor.focus.join("; ")}.`,
      ...(doctor.credentials?.length ? [`Credentials: ${doctor.credentials.join("; ")}.`] : []),
      "",
    );
  }

  out.push("## Stories and guides", "");
  for (const story of stories) {
    out.push(`### ${story.title}`, `URL: ${absolute(`/site/stories/${story.slug}`)}`, "", story.dek, "");
    for (const part of story.sections) {
      out.push(`#### ${part.heading}`, "", ...part.paragraphs.flatMap((text) => [text, ""]));
      if (part.points?.length) out.push(...part.points.map((point) => `- ${point}`), "");
    }
    if (story.facts.length) out.push(...story.facts.map((fact) => `- ${fact.label}: ${fact.value}`), "");
  }

  return `${out.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}
