import type { L10n } from '@/i18n/config';

export type Product = {
  id: string;
  name: L10n;
  use: L10n;
  description: L10n;
  sizes: string[];
  /** Optional: a path under /public replaces the logo placeholder, e.g. '/images/products/farine-boulangere.jpg' */
  image?: string;
};

// SAMPLE — ranges, sizes and descriptions are drafts until the client sends the real list.
export const products: Product[] = [
  {
    id: 'farine-boulangere',
    name: { fr: 'Farine boulangère', ar: 'دقيق المخابز' },
    use: { fr: 'Pain, baguette, pain maison', ar: 'الخبز، الباقيت، خبز الدار' },
    description: {
      fr: 'Une farine de blé tendre pour le pain du quotidien. Pâte souple, levée régulière, mie bien alvéolée.',
      ar: 'دقيق من القمح اللين لخبز كل يوم. عجين ليّن، تخمّر منتظم ولبّ خفيف.',
    },
    sizes: ['25 kg', '50 kg'],
  },
  {
    id: 'farine-superieure',
    name: { fr: 'Farine supérieure', ar: 'الدقيق الممتاز' },
    use: { fr: 'Pâtisserie, viennoiserie, gâteaux', ar: 'الحلويات، المعجنات، الكعك' },
    description: {
      fr: 'Une farine fine et blanche pour les pâtes délicates : feuilletage, brioche, gâteaux traditionnels.',
      ar: 'دقيق أبيض ناعم للعجائن الرقيقة: المورّق، البريوش والحلويات التقليدية.',
    },
    sizes: ['5 kg', '10 kg', '25 kg'],
  },
  {
    id: 'farine-familiale',
    name: { fr: 'Farine familiale', ar: 'دقيق العائلة' },
    use: { fr: 'La cuisine de tous les jours', ar: 'مطبخ كل يوم' },
    description: {
      fr: 'Le format maison pour la galette, le msemen et les préparations de la semaine.',
      ar: 'الحجم المنزلي للكسرة والمسمّن وتحضيرات الأسبوع.',
    },
    sizes: ['1 kg', '2 kg', '5 kg'],
  },
];
