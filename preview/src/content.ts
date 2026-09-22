export const departments = ['General Medicine', 'General Surgery', 'Gynecology & Maternity', 'Infertility Consultation', 'Unani Medicine', 'Hijama & Regimental Therapy', 'Joint & Rehabilitation Care', 'Diagnostics & Pharmacy'] as const
export const doctors = [
  { name: 'Dr. Tauheed', role: 'Unani medicine & rehabilitation', area: 'Unani Medicine' },
  { name: 'Dr. Sajjad Hussain', role: 'General surgery', area: 'General Surgery' },
  { name: 'Dr. Naima', role: 'Infertility & reproductive care', area: 'Infertility Consultation' },
  { name: 'Dr. Saheen', role: 'Gynecology & obstetrics', area: 'Gynecology & Maternity' },
  { name: 'Dr. Ameena', role: 'General medicine', area: 'General Medicine' },
]
export const services = [
  ['General medicine', 'Consultations for everyday health, preventive care, and ongoing monitoring of concerns such as diabetes and hypertension.'],
  ['Women’s health', 'Gynecology, antenatal and postnatal consultations, menstrual health, and infertility assessment.'],
  ['General surgery', 'Surgical consultations, hernia care, minor procedures, wound care, and follow-up planning.'],
  ['Unani consultations', 'An individual consultation to discuss health history, Unani approaches, dietary guidance, and a suitable care plan.'],
  ['Hijama & regimental therapy', 'Ask about cupping, therapist preferences, privacy arrangements, and preparation with the clinical team.'],
  ['Joint & rehabilitation care', 'Consultations for joint concerns and rehabilitation needs, including discussion of movement and follow-up support.'],
  ['Laboratory & diagnostics', 'Ask about blood tests, sample collection, available investigations, reports, and whether a referral is needed.'],
  ['Hospital pharmacy', 'Prescription dispensing and medicine inquiries. Existing patients can ask about repeat prescriptions and collection.'],
]
export const therapies = [
  ['Ilaj-bil-Ghiza', 'Dietary guidance', 'Discuss food and lifestyle as part of an individual care plan.'],
  ['Ilaj-bil-Dawa', 'Unani medicines', 'Discuss prescribed formulations with a clinician, including other medicines you take.'],
  ['Ilaj-bil-Tadbeer', 'Regimental therapy', 'Ask about Hijama, Dal’k, Nutool and Riyazat, and which services are currently available.'],
]
export const faqs = [
  ['Is a request a confirmed appointment?', 'No. Reception needs to confirm your doctor, date, time and any fees. This local preview does not send requests or book appointments.'],
  ['Can I visit without an appointment?', 'The workbook describes walk-in OPD care. Call reception before travelling to confirm the current schedule and clinician availability.'],
  ['What should I bring?', 'Bring previous prescriptions, relevant reports and a list of current medicines. Ask the clinical team whether any preparation is needed.'],
  ['Can I request a female therapist?', 'Discuss your preference with reception when arranging regimental therapy. Availability and privacy arrangements need confirmation.'],
  ['Can I request medicines from outside Hyderabad?', 'Contact the pharmacy to discuss your existing prescription. Refills and dispatch require staff review; this preview does not sell medicines.'],
  ['Are reports, video consultations or internships available online?', 'These are proposed options, not active services in this preview. See the report for the recommended phases and inputs needed before offering them.'],
]
export function filterDoctors(query: string) { return doctors.filter(doctor => `${doctor.name} ${doctor.role}`.toLowerCase().includes(query.trim().toLowerCase())) }
export function plannerAdvice(department: string): string {
  if (department === 'Hijama & Regimental Therapy') return 'Ask reception about therapist preferences, room availability and clinical suitability. Preparation instructions should come from the team.'
  if (department === 'Diagnostics & Pharmacy') return 'Ask which tests or prescription services are available, whether you need a referral, and when you can collect reports or medicines.'
  if ((departments as readonly string[]).includes(department)) return `Ask reception for the ${department.toLowerCase()} schedule. Have previous reports and your preferred day ready. Reception confirms the next step.`
  return 'Choose a department to see how to prepare your inquiry. If you are unsure, reception can help you find the right team.'
}
