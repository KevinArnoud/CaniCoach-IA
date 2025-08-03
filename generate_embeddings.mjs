import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// Configuration des clients
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!supabaseUrl || !supabaseKey || !openaiApiKey) {
    console.error("Erreur : Assurez-vous que SUPABASE_URL, SUPABASE_ANON_KEY, et OPENAI_API_KEY sont définis dans votre fichier .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const openai = new OpenAI({ apiKey: openaiApiKey });

async function generateEmbeddings() {
    console.log("Lecture du fichier corpus.txt...");
    const corpus = fs.readFileSync('corpus.txt', 'utf-8');

    // Découpage du corpus par grand thème (##) pour créer des "chunks" logiques
    const chunks = corpus.split('## ').filter(chunk => chunk.trim().length > 10);
    console.log(`Corpus découpé en ${chunks.length} chunks.`);

    for (let i = 0; i < chunks.length; i++) {
        const chunk = "## " + chunks[i]; // On rajoute le titre pour le contexte

        try {
            console.log(`[${i + 1}/${chunks.length}] Génération de l'embedding pour le chunk...`);

            // Appel à l'API d'OpenAI pour créer le vecteur
            const embeddingResponse = await openai.embeddings.create({
                model: "text-embedding-3-small", // Modèle performant et économique
                input: chunk.replace(/\n/g, ' '), // Nettoyage simple pour l'API
            });

            const embedding = embeddingResponse.data[0].embedding;

            console.log(`[${i + 1}/${chunks.length}] Stockage dans Supabase...`);

            // Insertion dans la base de données
            const { error } = await supabase
                .from('knowledge_semantic')
                .insert({ 
                    content: chunk, 
                    embedding: embedding 
                });

            if (error) {
                console.error(`Erreur lors de l'insertion du chunk ${i + 1}:`, error.message);
            } else {
                console.log(`[${i + 1}/${chunks.length}] Chunk stocké avec succès !`);
            }

        } catch (err) {
            console.error(`Erreur lors du traitement du chunk ${i + 1}:`, err);
        }
    }

    console.log("\n✅ Processus de génération des embeddings terminé !");
}

generateEmbeddings();