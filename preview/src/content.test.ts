import { describe, expect, it } from 'vitest'
import { departments, filterDoctors, plannerAdvice } from './content'
import workbook from '../../research/workbook.json'

describe('source preservation', () => {
  it('retains every sheet, nonempty row and populated cell', () => {
    expect(workbook).toHaveLength(18)
    expect(workbook.reduce((count, sheet) => count + sheet.rows.length, 0)).toBe(295)
    expect(workbook.reduce((count, sheet) => count + sheet.rows.reduce((rowCount, row) => rowCount + Object.values(row.cells).filter(value => value !== '').length, 0), 0)).toBe(1530)
  })
  it('retains conflicting OPD evidence for review instead of silently resolving it', () => {
    const overview = workbook.find(sheet => sheet.sheet === '02_Hospital_Overview')!
    const intake = workbook.find(sheet => sheet.sheet === '10_Q_Hospital_Profile_Brand')!
    expect(JSON.stringify(overview.rows.find(row => row.row === 13))).toContain('Monday to Saturday')
    expect(JSON.stringify(intake.rows.find(row => row.row === 19))).toContain('Mon-Sun')
  })
})
describe('patient information navigation', () => {
  it('finds clinicians by name or specialty without promoting example faculty', () => {
    expect(filterDoctors(' SURGERY ')).toHaveLength(1)
    expect(filterDoctors('surgery')[0].name).toBe('Dr. Sajjad Hussain')
    expect(filterDoctors('Vaheed')).toHaveLength(0)
    expect(filterDoctors('not found')).toHaveLength(0)
  })
  it('keeps therapy preparation clinician-led and unknown choices neutral', () => {
    expect(plannerAdvice('Hijama & Regimental Therapy')).toContain('clinical suitability')
    expect(plannerAdvice('')).toContain('Choose a department')
    expect(plannerAdvice('unsupported')).toBe(plannerAdvice(''))
    for (const department of departments) {
      expect(plannerAdvice(department)).not.toMatch(/confirmed appointment|slot reserved|fast for/)
    }
  })
})
