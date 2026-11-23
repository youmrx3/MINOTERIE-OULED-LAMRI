# Cahier des charges technique — Site vitrine Next.js
### Client : SARL MINOTERIE OULED LAMRI — "LA COLOMBE"
Préparé par IBDAPRO à partir des réponses du client (formulaire du 19/08/2026).

---

## 1. Résumé du projet

Site vitrine (pas d'e-commerce) pour une minoterie (production de farine) basée à Bordj Bou Arréridj. Objectif : présenter l'entreprise, ses produits/gammes de farine, rassurer sur la qualité, et pousser les visiteurs à appeler ou écrire directement.

| Info | Valeur |
|---|---|
| Entreprise | SARL MINOTERIE OULED LAMRI |
| Marque / slogan | LA COLOMBE |
| Secteur | Minoterie |
| Contact | DJELLOULI KADDOUR |
| Téléphone / WhatsApp | 0661370011 |
| Email | contact.minoterie@ouled-lamri.com |
| Adresse | Bir Aissa, Commune Ain Tasserra, Wilaya de Bordj Bou Arréridj |
| Horaires | Sam–Mer 8h–16h, Jeu 8h–12h, Ven fermé |
| Langues du site | Français, Arabe (RTL) |
| Contact préféré du client | Téléphone |

---

## 2. Stack technique

- **Next.js 14+ (App Router)** + TypeScript
- **Tailwind CSS** pour le style
- **next-intl** pour le FR/AR (avec support RTL pour l'arabe)
- **next/image** pour l'optimisation des photos
- Formulaire de contact : Server Action ou API route + envoi email (Resend/Nodemailer)
- Déploiement suggéré : Vercel

---

## 3. Structure des pages

Le client a choisi : *À propos, Services/Produits, Galerie/Réalisations, Témoignages, Questions fréquentes, Contact* (en plus de l'Accueil). Regroupement des produits : "à vous de voir" → une seule page Produits avec des sections/cartes par gamme, plus simple à gérer pour un premier site vitrine.

| Route | Contenu |
|---|---|
| `/` (Accueil) | Hero (logo + slogan "LA COLOMBE" + accroche), points forts de l'entreprise, aperçu produits, aperçu galerie, bandeau témoignages (masqué tant qu'il n'y en a pas), bloc contact rapide (tél + WhatsApp) |
| `/a-propos` | Histoire de l'entreprise, savoir-faire minoterie, valeurs, localisation (BBA) |
| `/produits` | Gammes de farine proposées, présentées en cartes — **contenu à définir avec le client (voir section 6)** |
| `/galerie` | Photos du moulin, de la production, des produits |
| `/temoignages` | Avis clients — page prête mais masquée du menu tant qu'il n'y a pas d'avis (voir section 6) |
| `/faq` | Questions fréquentes génériques (livraison, quantités, zones desservies...) — à valider avec le client |
| `/contact` | Formulaire (Nom, Téléphone, Email, Sujet, Message), adresse, horaires, bouton WhatsApp, localisation, liens réseaux sociaux |

---

## 4. Design & charte graphique

Le client laisse le style au choix d'IBDAPRO ("vous choisissez pour moi"), mais a indiqué avoir **déjà une charte graphique à respecter** — elle doit nous être envoyée (logo + couleurs officielles, voir section 6).

- **Direction proposée en attendant** : identité sobre et rassurante (secteur agroalimentaire/minoterie) — tons chauds type blé/terre (beige, doré, brun) associés à un blanc cassé, en attendant les couleurs exactes du client.
- Photos réelles vs illustrations : "à vous de voir" → privilégier les photos réelles du client (moulin, sacs, produits) complétées par quelques icônes simples pour les points forts.

```ts
// tailwind.config.ts
colors: {
  primary:   '#C08A2E', // TODO: remplacer par la couleur officielle de la marque
  secondary: '#4A3B2A', // TODO: remplacer par la couleur officielle de la marque
  accent:    '#F5EFE6', // TODO: à confirmer avec la charte graphique du client
}
```

---

## 5. Fonctionnalités

- [x] Formulaire de contact (Nom, Téléphone, Email, Sujet, Message)
- [x] Bouton WhatsApp direct (flottant, visible sur toutes les pages)
- [x] Galerie photos
- [x] Localisation du local (adresse affichée + carte statique par coordonnées, car pas de fiche Google Maps/Business — voir section 6)
- [x] Liens réseaux sociaux : Facebook, Instagram
- [x] Site bilingue Français / Arabe (sélecteur de langue, RTL en arabe)

---

## 6. Éléments en attente du client

Le formulaire du client indique clairement ce qui manque encore avant de pouvoir finaliser le site. Chaque élément ci-dessous est déjà "câblé" dans le projet à l'endroit indiqué — dès réception, il suffit de remplacer le placeholder, pas besoin de retoucher la structure.

| Élément | Statut client | Où il sera intégré |
|---|---|---|
| Logo | À envoyer ("prêt") | `public/images/logo.png` + `public/images/logo-white.png` (version pour fond foncé si besoin) |
| Couleurs officielles / charte graphique | À envoyer (existe, à respecter) | `tailwind.config.ts` → `colors.primary` / `colors.secondary` |
| Textes de présentation (à propos, accueil) | Client a besoin d'aide → **IBDAPRO rédige**, mais a besoin des infos brutes du client (histoire, années d'activité, ce qui les différencie) | `content/about.ts` |
| Liste des produits / gammes de farine | Non fournie dans le formulaire | `content/products.ts` |
| Photos supplémentaires (moulin, production, produits) | "Quelques-unes" fournies, plus utile pour la galerie | `public/images/gallery/` |
| Témoignages clients | Aucun pour l'instant, client peut en demander | `content/testimonials.ts` (page/section masquée tant que ce fichier est vide) |
| Site d'inspiration | Non fourni (client fait confiance) | — |

Voir le message prêt à envoyer au client au point suivant de cette conversation.

---

## 7. Internationalisation (FR / AR)

```
messages/
├─ fr.json
└─ ar.json
```
- Sélecteur de langue dans le header
- `dir="rtl"` appliqué automatiquement sur les pages en arabe
- Tous les textes (y compris ceux du formulaire de contact) doivent exister dans les deux fichiers de traduction

---

## 8. Structure de dossiers suggérée

```
minoterie-ouled-lamri/
├─ app/
│  └─ [locale]/
│     ├─ layout.tsx
│     ├─ page.tsx                # Accueil
│     ├─ a-propos/page.tsx
│     ├─ produits/page.tsx
│     ├─ galerie/page.tsx
│     ├─ temoignages/page.tsx
│     ├─ faq/page.tsx
│     └─ contact/page.tsx
├─ components/
│  ├─ layout/ (Header, Footer, WhatsAppButton)
│  └─ sections/ (Hero, About, ProductsGrid, Gallery, Testimonials, FAQAccordion, ContactForm, MapLocation, SocialLinks)
├─ content/
│  ├─ about.ts          # TODO: textes rédigés par IBDAPRO à partir des infos du client
│  ├─ products.ts        # TODO: en attente de la liste des produits
│  ├─ testimonials.ts    # TODO: vide pour l'instant
│  └─ faq.ts
├─ public/
│  └─ images/
│     ├─ logo.png         # TODO: en attente du client
│     ├─ hero/
│     └─ gallery/          # TODO: en attente de photos supplémentaires
├─ messages/
│  ├─ fr.json
│  └─ ar.json
├─ tailwind.config.ts      # TODO: couleurs en attente de la charte graphique
└─ next.config.js
```

---

## 9. SEO & performance de base

- Balises meta (titre/description) en FR et AR, adaptées à "minoterie Bordj Bou Arréridj"
- Sitemap + robots.txt
- Images compressées et servies via `next/image`
- Site responsive mobile-first (essentiel, beaucoup de visiteurs sur téléphone en Algérie)

---

## 10. Prochaine étape

Dès que le client envoie le logo, les couleurs, la liste des produits, des photos supplémentaires et (si possible) des témoignages, ces éléments remplacent directement les placeholders listés en section 6 — le reste du site est déjà prêt à les recevoir.
