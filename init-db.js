import fs from 'fs/promises';
import client from './data/database.js'; // adapte le chemin si besoin

try {
  const sql = await fs.readFile('./init.sql', 'utf-8');
  await client.query(sql);
  console.log("✅ Base de données initialisée avec succès !");
  process.exit(0);
} catch (error) {
  console.error("❌ Erreur lors de l'initialisation de la base :", error);
  process.exit(1);
}