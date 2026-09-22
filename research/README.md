# Private source evidence

These records support content provenance and earlier design decisions. They are not public assets or implementation instructions.

- `workbook.json`: full extraction of the supplied 18-sheet workbook (295 nonempty rows, 1,530 populated cells).
- `source-manifest.json`: source identity and extraction metadata.
- `directions.md`, `multipage-brief.md`, `home-story-brief.md`: historical design briefs, superseded by the current root DESIGN.md and PRODUCT.md.
- `google-design-md-spec.md`, `aura-customizations.html`, `interaction-libraries.md`: design-format and library research references.
- `../docs/planning/WORKBOOK_REPORT.md`: original analysis and recommendations.
- `../docs/planning/MULTIPAGE_PLAN.md`: historical page and system proposal.

Workbook integrity checks live in `preview/src/workbook.test.ts`. The public build imports only patient-facing content from `preview/src/multipage/data.ts`.
