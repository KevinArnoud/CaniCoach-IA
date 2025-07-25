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
