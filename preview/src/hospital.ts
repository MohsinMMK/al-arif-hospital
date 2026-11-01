// The hospital's contact details, written once for the pages, the head tags and the data files.
export const landmark =
  "Adjacent to Dargah Hazrat Syed Noori Shah Jeelani R.A., Bandlaguda Main Road";

export const hospital = {
  name: "Al-Arif General Hospital & Unani Research Institute",
  shortName: "Al-Arif Hospital",
  trust: "Al Arif Education and Medical Trust",
  streetAddress:
    "18-13-132/41/B, Tulsi Nagar, Noori Nagar, Bandlaguda, Chandrayangutta",
  locality: "Hyderabad",
  region: "Telangana",
  postalCode: "500005",
  country: "IN",
  landmark,
  reception: "+91 85550 86667",
  receptionHref: "tel:+918555086667",
  whatsappHref: "https://wa.me/918555086667",
  emergency: "+91 98484 30017",
  emergencyHref: "tel:+919848430017",
  email: "aaghuri@gmail.com",
  emailHref: "mailto:aaghuri@gmail.com",
  maps: "https://maps.google.com/?q=Al+Arif+General+Hospital+Bandlaguda+Hyderabad",
  mapsEmbed:
    "https://maps.google.com/maps?q=Al+Arif+General+Hospital+Bandlaguda+Hyderabad&z=16&output=embed",
  registration: "Hospital Reg. No. 07F-APMCE-1147",
  licence: "Clinical Establishment Licence A/111/DRA/HYD/2025",
};

export const fullAddress = `${hospital.streetAddress}, ${hospital.locality}, ${hospital.region} ${hospital.postalCode}`;
