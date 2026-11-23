import type { L10n } from '@/i18n/config';

// Generic draft — answers to validate with the client.
export const faq: { q: L10n; a: L10n }[] = [
  {
    q: { fr: 'Livrez-vous en dehors de Bordj Bou Arréridj ?', ar: 'هل توصلون خارج برج بوعريريج؟' },
    a: {
      fr: 'Oui, nous livrons les wilayas voisines selon les quantités. Appelez-nous avec votre adresse pour connaître le délai.',
      ar: 'نعم، نوصل إلى الولايات المجاورة حسب الكمية. اتصلوا بنا مع عنوانكم لمعرفة المدة.',
    },
  },
  {
    q: { fr: 'Quelle est la quantité minimum pour une commande ?', ar: 'ما هي أقل كمية للطلب؟' },
    a: {
      fr: 'Les particuliers peuvent acheter au détail à la minoterie. Pour une livraison, le minimum dépend de la distance : nous vous le confirmons au téléphone.',
      ar: 'يمكن للأفراد الشراء بالتجزئة من المطحنة. أما التوصيل فأقل كمية تتعلق بالمسافة، ونؤكدها لكم عبر الهاتف.',
    },
  },
  {
    q: { fr: 'Travaillez-vous avec les boulangeries et les grossistes ?', ar: 'هل تتعاملون مع المخابز وتجّار الجملة؟' },
    a: {
      fr: "Oui, ce sont l'essentiel de nos clients. Nous convenons ensemble d'un rythme de livraison régulier.",
      ar: 'نعم، هم أغلب زبائننا. نتفق معكم على وتيرة توصيل منتظمة.',
    },
  },
  {
    q: { fr: 'Comment obtenir un prix ?', ar: 'كيف أحصل على السعر؟' },
    a: {
      fr: 'Les prix suivent le marché du blé. Appelez-nous ou écrivez sur WhatsApp en indiquant le produit et la quantité.',
      ar: 'الأسعار تتبع سوق القمح. اتصلوا بنا أو راسلونا عبر واتساب مع ذكر المنتج والكمية.',
    },
  },
  {
    q: { fr: 'Peut-on venir chercher la farine sur place ?', ar: 'هل يمكن استلام الدقيق من المطحنة؟' },
    a: {
      fr: "Oui, aux heures d'ouverture : du samedi au mercredi de 8h à 16h, le jeudi de 8h à 12h.",
      ar: 'نعم، في أوقات العمل: من السبت إلى الأربعاء من 8:00 إلى 16:00، والخميس من 8:00 إلى 12:00.',
    },
  },
];
