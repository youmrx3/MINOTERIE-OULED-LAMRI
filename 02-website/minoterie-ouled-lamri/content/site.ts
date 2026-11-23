// Single source for company data: header, footer, contact page and structured data read it.
export const site = {
  company: 'SARL Minoterie Ouled Lamri',
  brand: 'La Colombe',
  phoneDisplay: '0661 37 00 11',
  phoneIntl: '+213661370011',
  whatsapp: '213661370011',
  email: 'contact.minoterie@ouled-lamri.com',
  address: {
    fr: 'Bir Aissa, Commune Ain Tasserra, Wilaya de Bordj Bou Arréridj',
    ar: 'بئر عيسى، بلدية عين تاسرة، ولاية برج بوعريريج',
  },
  // TODO: client to provide GPS coordinates (no Google Business listing yet)
  coordinates: null as null | { lat: number; lng: number },
  mapsQuery: 'Ain Tasserra, Bordj Bou Arreridj, Algeria',
  // TODO: client to provide the real social page URLs
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
  },
  /** Weekly hours keyed by JS getDay(): 0 = Sunday … 6 = Saturday. null = closed. */
  hours: {
    6: ['08:00', '16:00'],
    0: ['08:00', '16:00'],
    1: ['08:00', '16:00'],
    2: ['08:00', '16:00'],
    3: ['08:00', '16:00'],
    4: ['08:00', '12:00'],
    5: null,
  } as Record<number, [string, string] | null>,
  /** Display order: the Algerian week starts on Saturday */
  weekOrder: [6, 0, 1, 2, 3, 4, 5],
  timezone: 'Africa/Algiers',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

export const telHref = `tel:${site.phoneIntl}`;
export const waHref = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const mapsHref = site.coordinates
  ? `https://www.google.com/maps?q=${site.coordinates.lat},${site.coordinates.lng}`
  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;
