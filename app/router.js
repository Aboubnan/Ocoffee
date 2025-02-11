import express from 'express';
import mainController from './controllers/maincontroller.js';
import { dataMapper } from './data-mappers/data-mapper.js';

const router = express.Router();

router.get('/', mainController.homePage);

router.get('/produit/:id', mainController.produitPage);

router.get('/catalogue', mainController.cataloguePage);

router.get('/page-produit', mainController.produitPage);

router.get("/api/products", async (req, res) => {
    try {
        const products = await dataMapper.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("❌ Erreur API :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


export default router;