# Structure des Données (Schémas)

## Collection `users`
Stocke les informations des utilisateurs.
```json
{
  "userId": "string (unique, ex: 'auth0|abcdef123')",
  "email": "string (unique, indexé)",
  "passwordHash": "string",
  "subscription": {
    "status": "string (enum: 'free_trial', 'active_monthly', 'active_annual', 'cancelled')",
    "trialEndDate": "date",
    "stripeCustomerId": "string (optionnel)"
  },
  "createdAt": "date"
}

## Collection `dogs`
Stocke les profils des chiens, liés à un utilisateur.
```json

{
  "dogId": "string (unique)",
  "ownerId": "string (lien vers users.userId)",
  "name": "string",
  "photoUrl": "string (URL de l'image stockée)",
  "breed": "string",
  "dateOfBirth": "date",
  "background": "string (champ texte libre)",
  "healthIssues": "string (champ texte libre)"
}

## Collection knowledge_base
Le "cerveau" de l'IA. Contient les fiches de connaissance.

{
  "topicId": "string (unique, ex: 'pup_biting_01')",
  "topicName": "string (ex: 'Mordillements du chiot')",
  "targetAudience": "array[string] (valeurs possibles: 'puppy', 'adult')",
  "triggerKeywords": "array[string] (ex: ['mord', 'mordille', 'pince', 'mâchouille'])",
  "validationResponse": "string (Le message qui rassure et déculpabilise l'utilisateur)",
  "explanation": "string (Le 'pourquoi' du comportement selon la méthode Esprit Dog)",
  "actionPlan": [
    { "step": 1, "text": "string (Description de l'étape 1 du plan d'action)" },
    { "step": 2, "text": "string (Description de l'étape 2 du plan d'action)" }
  ]
}
