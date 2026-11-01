import { describe, expect, it } from "vitest";
import { doctorPages, servicePages, pageCatalog } from "./data";
import {
  departmentPath,
  departments,
  movedAnchor,
  sharedSections,
  wardBeds,
} from "./department-data";
import { milestones } from "./milestones";
import { regimentalTherapies, stories } from "./story-data";

describe("multi-page content relationships", () => {
  it("provides unique addresses and resolves every clinician/service association", () => {
    expect(new Set(pageCatalog.map((page) => page.path)).size).toBe(
      pageCatalog.length,
    );
    for (const service of servicePages) {
      for (const doctorSlug of service.doctorSlugs)
        expect(doctorPages.some((doctor) => doctor.slug === doctorSlug)).toBe(
          true,
        );
    }
    for (const doctor of doctorPages) {
      for (const serviceSlug of doctor.serviceSlugs)
        expect(
          servicePages.some((service) => service.slug === serviceSlug),
        ).toBe(true);
    }
  });
  it("keeps review and management routes out of the public catalog", () => {
    expect(
      pageCatalog.some((page) => /preview|system|report/.test(page.path)),
    ).toBe(false);
    // Requests are a section of the Visit page now; the old URL redirects there.
    expect(pageCatalog.some((page) => page.path === "/site/request")).toBe(
      false,
    );
  });
  it("links stories and milestones to real pages", () => {
    expect(new Set(stories.map((story) => story.slug)).size).toBe(
      stories.length,
    );
    for (const story of stories) {
      expect(story.sections.length).toBeGreaterThan(0);
      expect(new Set(story.sections.map((section) => section.id)).size).toBe(
        story.sections.length,
      );
      for (const serviceSlug of story.serviceSlugs)
        expect(
          servicePages.some((service) => service.slug === serviceSlug),
        ).toBe(true);
      expect(
        pageCatalog.some((page) => page.path === `/site/stories/${story.slug}`),
      ).toBe(true);
    }
    for (const milestone of milestones) {
      if (milestone.storySlug)
        expect(
          stories.some((story) => story.slug === milestone.storySlug),
        ).toBe(true);
    }
    expect(
      milestones.every(
        (milestone, index) =>
          index === 0 || milestones[index - 1].date <= milestone.date,
      ),
    ).toBe(true);
    expect(regimentalTherapies).toHaveLength(12);
  });
  it("lists every department once and links it to real pages", () => {
    expect(new Set(departments.map((item) => item.slug)).size).toBe(
      departments.length,
    );
    const count = (group: string) =>
      departments.filter((item) => item.group === group).length;
    expect([count("general"), count("unani")]).toEqual([9, 7]);
    expect(wardBeds.reduce((sum, part) => sum + part.value, 0)).toBe(100);
    for (const item of departments) {
      expect(
        pageCatalog.some((page) => page.path === departmentPath(item.slug)),
      ).toBe(true);
      if (item.serviceSlug)
        expect(
          servicePages.some((service) => service.slug === item.serviceSlug),
        ).toBe(true);
      for (const doctorSlug of item.doctorSlugs ?? [])
        expect(doctorPages.some((doctor) => doctor.slug === doctorSlug)).toBe(
          true,
        );
    }
  });
  it("splits care into two wing pages and one shared Services page", () => {
    const paths = pageCatalog.map((page) => page.path);
    expect(paths).toEqual(
      expect.arrayContaining([
        "/site/general",
        "/site/unani",
        "/site/services",
      ]),
    );
    expect(paths).not.toContain("/site/departments");
    expect(departmentPath("moalijat")).toBe("/site/unani#moalijat");
    expect(departmentPath("paediatrics")).toBe("/site/general#paediatrics");
    expect(departmentPath("casualty")).toBe("/site/services#casualty");
    expect(sharedSections.map((section) => section.items.length)).toEqual([
      5, 2, 4,
    ]);
    // Old Departments and Care & services anchors still land somewhere real.
    expect(movedAnchor("unani")).toBe("/site/unani");
    expect(movedAnchor("general-hospital")).toBe("/site/general");
    expect(movedAnchor("pharmacy")).toBe("/site/services#pharmacy");
    expect(movedAnchor("herbal-garden")).toBe("/site/services#herbal-garden");
    expect(movedAnchor("nowhere")).toBeUndefined();
  });
  it("keeps excluded topics off the public pages", () => {
    const text = JSON.stringify({
      stories,
      milestones,
      pageCatalog,
      departments,
    });
    expect(text).not.toMatch(/zakat|\[(REQUIRED|CONFIRM|SAMPLE|DRAFT)\]/i);
  });
});
