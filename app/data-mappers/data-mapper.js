import client from "../data/database.js";

export const dataMapper = {
    getAllProducts: async () => {
        const query = {
            text: 'SELECT * FROM "cafes"',
        }
        const result = await client.query(query);
        return result.rows;
    },
    getLastThreeCafes: async () => {
        const query = {
            text: 'SELECT * FROM "cafes" ORDER BY "id" DESC LIMIT 3',
        }
        const result = await client.query(query);
        return result.rows;
    },

    getProductById: async (id) => {
        const query = {
            text: 'SELECT * FROM "cafes" WHERE "id" = $1',
            values: [id],
        };
        const result = await client.query(query);
        return result.rows[0]; // Retourne un seul produit
    },
}


export default dataMapper;