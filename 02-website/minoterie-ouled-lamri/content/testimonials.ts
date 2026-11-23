import type { L10n } from '@/i18n/config';

export type Testimonial = { quote: L10n; name: string; role: L10n };

// Empty on purpose: the home band, the menu link and the /temoignages page
// stay hidden until a real, approved review is added here.
// Example entry:
// { quote: { fr: '…', ar: '…' }, name: 'Boulangerie …', role: { fr: 'Boulanger, BBA', ar: 'خبّاز، برج بوعريريج' } },
export const testimonials: Testimonial[] = [];
