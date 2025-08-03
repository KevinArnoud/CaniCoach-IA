// src/services/smartChatService.ts

export class SmartChatService {
  
  // Détecter si l'utilisateur semble satisfait
  static detectSatisfaction(userMessage: string): boolean {
    const satisfactionWords = [
      'merci', 'parfait', 'super', 'génial', 'excellent', 
      'ça marche', 'ça fonctionne', 'efficace', 'résolu',
      'je vais essayer', 'c\'est clair', 'compris', 
      'logique', 'd\'accord', 'très bien', 'bonne idée'
    ];
    
    const messageLC = userMessage.toLowerCase();
    return satisfactionWords.some(word => messageLC.includes(word));
  }
  
  // Détecter l'état émotionnel (stress, frustration...)
  static detectEmotion(userMessage: string): string {
    const messageLC = userMessage.toLowerCase();
    
    const stressWords = ['aide', 'désespéré', 'impossible', 'n\'arrive pas'];
    const frustrationWords = ['encore', 'toujours', 'jamais', 'pire'];
    const anxietyWords = ['peur', 'inquiet', 'mal faire', 'erreur'];
    
    if (stressWords.some(word => messageLC.includes(word))) return 'stressé';
    if (frustrationWords.some(word => messageLC.includes(word))) return 'frustré';
    if (anxietyWords.some(word => messageLC.includes(word))) return 'anxieux';
    
    return 'neutre';
  }
  
  // Adapter le prompt selon l'émotion détectée
  static getEmotionalPrompt(emotion: string): string {
    const prompts: { [key: string]: string } = {
      'stressé': 'L\'utilisateur semble très stressé. Sois particulièrement rassurant et commence par "C\'est tout à fait normal, vous n\'êtes pas seul dans cette situation."',
      'frustré': 'L\'utilisateur montre des signes de frustration. Sois compréhensif et propose des solutions simples et concrètes.',
      'anxieux': 'L\'utilisateur semble anxieux à l\'idée de mal faire. Rassure-le en expliquant que l\'éducation canine est un processus.',
      'neutre': 'L\'utilisateur semble dans un état d\'esprit équilibré. Donne des conseils normaux tout en gardant un ton bienveillant.'
    };
    
    return prompts[emotion] || prompts['neutre'];
  }
  
  // Vocabulaire authentique Esprit Dog
  static getEspritDogPrompt(): string {
    return `
Tu es CaniCoach IA, qui incarne parfaitement la philosophie de Tony Silvestre (Esprit Dog).

VOCABULAIRE ESPRIT DOG À UTILISER :
- "dépôt de confiance" (pour la relation de confiance)
- "fête sensorielle" (pour les moments d'excitation du chien)
- "éponge sensorielle" (pour la capacité d'absorption des chiots)
- "ministre du bonheur" (pour décrire le rôle du maître)

PHILOSOPHIE ESPRIT DOG :
- L'éducation efficace vient de la compréhension de la psychologie canine
- Le cadre de vie doit être clair : équilibre entre "Oui" et "Non"
- Le jeu est le pilier central de l'apprentissage
- Approche déculpabilisante : les "erreurs" sont normales
- Leadership bienveillant plutôt que dominance

TON À ADOPTER :
- Chaleureux et déculpabilisant
- Logique et cohérent
- Utilise des analogies simples
- Encourage toujours
    `;
  }
}