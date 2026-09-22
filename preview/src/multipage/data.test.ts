import { describe, expect, it } from 'vitest'
import { doctorPages, servicePages, pageCatalog } from './data'

describe('multi-page content relationships', () => {
  it('provides unique addresses and resolves every clinician/service association', () => {
    expect(new Set(pageCatalog.map(page => page.path)).size).toBe(pageCatalog.length)
    for (const service of servicePages) {
      for (const doctorSlug of service.doctorSlugs) expect(doctorPages.some(doctor => doctor.slug === doctorSlug)).toBe(true)
    }
    for (const doctor of doctorPages) {
      for (const serviceSlug of doctor.serviceSlugs) expect(servicePages.some(service => service.slug === serviceSlug)).toBe(true)
    }
  })
  it('keeps review and management routes out of the public catalog', () => {
    expect(pageCatalog.some(page => /preview|system|report/.test(page.path))).toBe(false)
    expect(pageCatalog.some(page => page.path === '/site/request')).toBe(true)
  })
})
