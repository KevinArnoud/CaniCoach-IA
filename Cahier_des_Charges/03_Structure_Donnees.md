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
