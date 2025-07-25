# Modèle Économique et Parcours Utilisateur

## 1. Essai Gratuit "Probant"
-   **Principe :** L'utilisateur nouvellement inscrit bénéficie d'un accès gratuit pour résoudre **intégralement un (1) problème** avec le chatbot.
-   **Déclenchement du Paywall :** Après la résolution du premier problème (marqué comme résolu par l'utilisateur ou après un certain nombre d'échanges sur le sujet), ou s'il tente d'aborder un deuxième sujet, un écran de paiement (paywall) apparaît.
-   **Objectif :** Permettre à l'utilisateur de constater la valeur réelle et l'efficacité de l'application avant de s'engager.

## 2. Abonnements
-   **Abonnement Mensuel :** Donne un accès illimité au chatbot, à toutes ses fonctionnalités, et à la gestion de plusieurs profils de chiens. Facturation mensuelle.
-   **Abonnement Annuel :** Mêmes bénéfices que l'abonnement mensuel, mais avec une réduction significative (ex: équivalent à 10 mois de paiement pour 12 mois de service). Facturation annuelle.

## 3. Parcours Utilisateur Type
1.  L'utilisateur s'inscrit.
2.  Le statut du compte est `free_trial`.
3.  L'application propose l'onboarding pour créer le profil du premier chien.
4.  L'utilisateur pose sa première question et est guidé par l'IA jusqu'à la résolution.
5.  L'utilisateur tente de poser une deuxième question.
6.  Le paywall s'affiche, proposant les abonnements Mensuel et Annuel.
7.  L'utilisateur choisit une formule et paie via Stripe.
8.  Le statut du compte passe à `active_monthly` ou `active_annual`.
9.  L'utilisateur a maintenant un accès complet et illimité.
