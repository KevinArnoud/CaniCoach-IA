/*
  # Populate knowledge base with initial data

  1. Initial Data
    - Add example knowledge base entry for puppy biting
    - Based on Esprit Dog methodology from the documentation

  2. Content
    - Validation response for reassurance
    - Scientific explanation of behavior
    - Step-by-step action plan
*/

INSERT INTO knowledge_base (
  topic_id,
  topic_name,
  target_audience,
  trigger_keywords,
  validation_response,
  explanation,
  action_plan
) VALUES (
  'pup_biting_01',
  'Mordillements du chiot',
  ARRAY['puppy'],
  ARRAY['mord', 'mordille', 'pince', 'mâchouille', 'mains', 'dents'],
  'C''est une situation très courante et un comportement tout à fait normal chez le chiot. Ne vous inquiétez pas, il ne le fait pas par méchanceté et on va trouver une solution simple ensemble.',
  'Un chiot explore le monde avec sa gueule, un peu comme un bébé humain le ferait avec ses mains. Le mordillement est sa façon de découvrir les textures, de tester les limites et de jouer. Notre rôle n''est pas de lui interdire de mâchouiller, mais de lui apprendre ce qu''il a le droit de mordiller (ses jouets) et ce qu''il n''a pas le droit de mordiller (nos mains, nos pieds, les meubles).',
  '[
    {
      "step": 1,
      "text": "Cessez toute interaction : Dès que votre chiot vous mordille la main ou les vêtements, dites un \"Non\" ferme mais calme et cessez immédiatement le jeu et toute interaction. Retirez votre main et ignorez-le pendant quelques secondes."
    },
    {
      "step": 2,
      "text": "Redirigez vers un jouet : Proposez-lui immédiatement une alternative autorisée, comme un jouet à mâcher. Félicitez-le chaudement dès qu''il prend le jouet dans sa gueule et commence à le mâchouiller."
    },
    {
      "step": 3,
      "text": "Anticipez et prévenez : Lors des séances de jeu, ayez toujours un jouet à portée de main. S''il commence à s''exciter et à vouloir mordiller, proposez le jouet avant même qu''il ne touche votre peau."
    },
    {
      "step": 4,
      "text": "Assurez-vous qu''il se dépense : Un chiot qui mordille beaucoup est souvent un chiot qui a un trop-plein d''énergie. Assurez-vous qu''il ait des séances de jeu et des sorties régulières pour se fatiguer."
    }
  ]'::jsonb
) ON CONFLICT (topic_id) DO NOTHING;