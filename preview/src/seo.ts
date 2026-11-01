// Search and AI-assistant metadata: one title and description per public page, shared by the
// browser (updates the head on navigation) and the build-time prerender (writes it into HTML).
import { fullAddress, hospital, landmark } from "./hospital";
import { doctorPages, pageCatalog, servicePages } from "./multipage/data";
import { stories } from "./multipage/story-data";

export { fullAddress, hospital };

export const siteUrl = "https://alarifgeneralhospital.com";

const brand = "Al-Arif Hospital";

const fixed: Record<string, { title: string; description: string }> = {
  "/site": {
    title: `${hospital.name}, Hyderabad`,
    description:
      "General hospital and Unani care on one campus in Bandlaguda, Chandrayangutta, Hyderabad. 24-hour casualty, specialty and Unani OPDs, ₹10 OPD fee. Run by the Al Arif Education and Medical Trust since 2002.",
  },
  "/site/general": {
    title: `General Hospital – Nine Specialty OPDs | ${brand}, Hyderabad`,
    description:
      "General medicine, surgery, obstetrics and gynaecology, paediatrics, eye, dental, physiotherapy, radiology and pathology OPDs at Al-Arif General Hospital, Bandlaguda, Hyderabad.",
  },
  "/site/unani": {
    title: `Unani Care – Seven Unani OPDs | ${brand}, Hyderabad`,
    description:
      "Unani internal medicine (Moalijat), obstetrics and gynaecology, paediatrics, regimental therapy, preventive and social medicine, skin and cosmetology, and surgery OPDs at Al-Arif Hospital, Bandlaguda, Hyderabad.",
  },
  "/site/services": {
    title: `Services – 24-Hour Casualty, Diagnostics & Pharmacy | ${brand}`,
    description:
      "24-hour casualty, ICU, operation theatre, maternity ward, ambulance, pathology, radiology, two pharmacies and the herbal garden at Al-Arif Hospital, Hyderabad.",
  },
  "/site/doctors": {
    title: `Our Doctors – ${doctorPages.length} Clinicians | ${brand}, Hyderabad`,
    description: `Meet the ${doctorPages.length} general hospital and Unani clinicians at Al-Arif Hospital, Bandlaguda, Hyderabad, with qualifications and OPD days and timings.`,
  },
  "/site/about": {
    title: `About Al-Arif – Trust, History & Facilities | ${brand}`,
    description:
      "Run by the Al Arif Education and Medical Trust since 2002: leadership, a 5.35-acre campus, registrations and community service in Hyderabad.",
  },
  "/site/education": {
    title: `Education & Learning – Jamia Arifia Nooria | ${brand}`,
    description:
      "Jamia Arifia Nooria and the learning formats at Al-Arif General Hospital & Unani Research Institute, Hyderabad, each with its current status.",
  },
  "/site/education/clinical-observation": {
    title: `Clinical Observation Programme | ${brand}, Hyderabad`,
    description:
      "Planned clinical observation at Al-Arif General Hospital & Unani Research Institute, Hyderabad, and the programme's current status.",
  },
  "/site/research": {
    title: `Unani Research & Publications | ${brand}, Hyderabad`,
    description:
      "Unani research initiatives, single-drug exhibitions and scientific sessions at the Al-Arif Unani Research Institute, Hyderabad.",
  },
  "/site/stories": {
    title: `Stories & Guides to Unani and Hospital Care | ${brand}`,
    description:
      "Plain-language guides to Unani care, regimental therapies and your first visit, with stories from the Al Arif Trust's record since 2002.",
  },
  "/site/community": {
    title: `Community Outreach & Milestones Since 2002 | ${brand}`,
    description:
      "Free medical camps, exhibitions, scientific sessions and milestones of Al-Arif Hospital and the Al Arif Education and Medical Trust in Hyderabad.",
  },
  "/site/pharmacy": {
    title: `Unani & Allopathic Pharmacy, Raw Drug Agency | ${brand}`,
    description:
      "The Unani teaching pharmacy, allopathic pharmacy and raw drug agency on the Al-Arif Hospital campus in Bandlaguda, Hyderabad.",
  },
  "/site/visit": {
    title: `Plan Your Visit – Address, OPD & Directions | ${brand}`,
    description: `Al-Arif Hospital is open 24 hours at ${fullAddress}. ${landmark}. Reception ${hospital.reception}.`,
  },
};

const trim = (text: string, length = 160) =>
  text.length <= length
    ? text
    : `${text.slice(0, length - 1).replace(/\s+\S*$/, "")}…`;

/** Title and description for a public page, or undefined for anything else. */
export function pageHead(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/site";
  if (fixed[path]) return fixed[path];
  const [, , section, slug] = path.split("/");
  if (section === "services") {
    const service = servicePages.find((item) => item.slug === slug);
    if (service)
      return {
        title: `${service.name} in Bandlaguda, Hyderabad | ${brand}`,
        description: trim(`${service.intro} ${service.overview}`),
      };
  }
  if (section === "doctors") {
    const doctor = doctorPages.find((item) => item.slug === slug);
    if (doctor)
      return {
        title: `${doctor.name} – ${doctor.designation} | ${brand}, Hyderabad`,
        description: trim(
          `${doctor.name} (${doctor.degrees}), ${doctor.department} at Al-Arif Hospital, Hyderabad. OPD ${doctor.opdDays}, ${doctor.opdHours}. ${doctor.introduction}`,
        ),
      };
  }
  if (section === "stories") {
    const story = stories.find((item) => item.slug === slug);
    if (story)
      return {
        title: `${story.title} | ${brand}`,
        description: trim(story.dek),
      };
  }
  return undefined;
}

/** Every public page that gets its own URL (department anchors share one page). */
export const publicPaths = pageCatalog
  .map((page) => page.path)
  .filter((path) => !path.includes("#"));

/** Keep the document head in step with the client-side route. */
export function applyHead(pathname: string, fallbackTitle: string) {
  const head = pageHead(pathname);
  document.title = head?.title ?? `${fallbackTitle} · Al-Arif`;
  if (!head) return;
  const url = `${siteUrl}${pathname.replace(/\/+$/, "")}`;
  const set = (selector: string, attribute: string, value: string) =>
    document.head.querySelector(selector)?.setAttribute(attribute, value);
  set('meta[name="description"]', "content", head.description);
  set('link[rel="canonical"]', "href", url);
  set('meta[property="og:title"]', "content", head.title);
  set('meta[property="og:description"]', "content", head.description);
  set('meta[property="og:url"]', "content", url);
}
