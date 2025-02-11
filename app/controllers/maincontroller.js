import { dataMapper } from "../data-mappers/data-mapper.js";

const mainController = {
    homePage: async (req, res) => {
        try {
            const products = await dataMapper.getAllProducts();
            const lastThreeCafes = await dataMapper.getLastThreeCafes();
            console.log("✅ Les 3 derniers cafés :", lastThreeCafes);
            res.render('accueil', { products, lastThreeCafes, page : "accueil" });
        } catch (error) {
            console.error("Erreur serveur :", error);
            res.status(500).send("Erreur serveur");
        }
    },

    cataloguePage: async (req, res) => {
        try {
            const products = await dataMapper.getAllProducts();
            res.render('catalogue', { products, page : "catalogue" });
        } catch (error) {
            console.error("Erreur serveur :", error);
            res.status(500).send("Erreur serveur");
        }
    },

    produitPage:  async (req, res) => {
        try {
            // Récupération de l'ID de la promotion depuis les paramètres de l'URL
            const id = Number(req.params.id);
      
            // Requête à la base de données pour récupérer les détails de la promotion
            const result = await dataMapper.getProductById(id);
      
            // si la promo n'existe pas
            if (!result) {
              // passer la main au meddlware 404
              next();
              // bloquer l'execution de la méthode
              return;
            }
      
            res.render('page-produit', { 
                page : "page-produit", produit : result 
            });

          } catch (error) {
            // Gestion des erreurs : affichage dans la console
            console.error("Erreur serveur :", error);
            // Envoi d'un message d'erreur avec un statut HTTP 500
            res.status(500).send("Erreur serveur...");
          }
    },

}

export default mainController;