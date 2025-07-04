// import pg from 'pg';

// // 2. Créer un client
// export const client = new pg.Client(process.env.PG_URL);

// // 3. Connecter le client
// await client.connect();

// // 4. Exporter le client connecté
// export default client;

import pg from 'pg';

const client = new pg.Client({
  connectionString: process.env.PG_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

await client.connect();

export default client;

