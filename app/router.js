import express from 'express';
import mainController from './controllers/maincontroller.js';
import { dataMapper } from './data-mappers/data-mapper.js';

const router = express.Router();

router.get('/', mainController.homePage);

router.get('/produit/:id', mainController.produitPage);

router.get('/catalogue', mainController.cataloguePage);

router.get('/page-produit', mainController.produitPage);

router.use((req, res, next) => {
    if (!req.session.bookmarks) {
        req.session.bookmarks = [];
    }
    next();
});

router.get("/api/products", async (req, res) => {
    try {
        const products = await dataMapper.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("❌ Erreur API :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// action d'ajouter en favoris
router.get('/favoris/add/:id', mainController.bookmarksAdd);

// action de supprimer un favoris
router.get('/favoris/delete/:id', mainController.bookmarksDelete)

// page favoris
router.get('/favoris', mainController.bookmarksPage);


export default router;