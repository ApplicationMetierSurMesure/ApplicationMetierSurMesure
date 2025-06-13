# BNB Client Portal

Ce dossier contient un exemple minimal d'application Node.js utilisant **Express** et **Stripe** pour permettre aux clients de BNB de consulter leurs contrats, acheter des contrats de maintenance et recevoir leur facture.

## Prérequis
- Node.js >= 18
- Une clef `STRIPE_SECRET_KEY` valide
- Optionnel : `STRIPE_ENDPOINT_SECRET` pour sécuriser le webhook

## Installation
1. Dans ce dossier, installez les dépendances :
   ```bash
   npm install express stripe
   ```
2. Définissez vos variables d'environnement :
   ```bash
   export STRIPE_SECRET_KEY=sk_test_...
   export STRIPE_ENDPOINT_SECRET=whsec_...
   ```

## Utilisation
Lancez l'application :
```bash
node server.js
```

- `GET /contracts` renvoie la liste des contrats (exemple statique ici).
- `POST /purchase-maintenance` crée une session de paiement Stripe pour l'achat d'un contrat de maintenance.
- `POST /webhook` reçoit les évènements Stripe comme la confirmation de paiement de facture.

Cet exemple se veut simple et pédagogique. Il faudra l'adapter (authentification, base de données, interface utilisateur) pour un portail client complet.
