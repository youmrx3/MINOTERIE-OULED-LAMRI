import type { L10n } from '@/i18n/config';

export type GalleryItem = { id: string; caption: L10n; ratio: 'sq' | 'g43' | 'wide'; image?: string };

// TODO: drop photos in /public/images/gallery and set `image` on each item.
export const gallery: GalleryItem[] = [
  { id: 'moulin', ratio: 'wide', caption: { fr: 'Le moulin, Ain Tasserra', ar: 'المطحنة، عين تاسرة' } },
  { id: 'ble', ratio: 'sq', caption: { fr: 'Le blé à la réception', ar: 'القمح عند الاستلام' } },
  { id: 'mouture', ratio: 'sq', caption: { fr: 'La mouture', ar: 'الطحن' } },
  { id: 'controle', ratio: 'g43', caption: { fr: 'Le contrôle des lots', ar: 'مراقبة الدفعات' } },
  { id: 'ensachage', ratio: 'g43', caption: { fr: "L'ensachage", ar: 'التعبئة' } },
  { id: 'livraison', ratio: 'wide', caption: { fr: 'Le départ des livraisons', ar: 'انطلاق التوصيل' } },
];
