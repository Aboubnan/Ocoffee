import express from 'express';
import mainController from './controllers/maincontroller.js';
import { dataMapper } from './data-mappers/data-mapper.js';

const router = express.Router();

// page d'acceuil
router.get('/', mainController.homePage);

// page produit
router.get('/produit/:id', mainController.produitPage);

// page catalogue
router.get('/catalogue', mainController.cataloguePage);

// page favoris
router.use((req, res, next) => {
    if (!req.session.bookmarks) {
        req.session.bookmarks = [];
    }
    next();
});

// API
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

// page contact
router.get('/contact', mainController.contactPage);

// middleware 404
router.use((req, res) => {
    res.status(404).render("404", { title: "Page non trouvée", page: "404" });
});


export default router;