import { dataMapper } from "../data-mappers/data-mapper.js";

const mainController = {
    // page d'acceuil
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

    // page catalogue
    cataloguePage: async (req, res) => {
        try {
            const products = await dataMapper.getAllProducts();
            res.render('catalogue', { products, page : "catalogue" });
        } catch (error) {
            console.error("Erreur serveur :", error);
            res.status(500).send("Erreur serveur");
        }
    },

    // page produit
    produitPage:  async (req, res, next) => {
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

    bookmarksAdd: async (req, res) => {
        try {
          const cafeId = Number(req.params.id);
    
          // Vérifier si `req.session.bookmarksPage` existent si non il la créer
          if (!req.session.bookmarks) {
              req.session.bookmarks = [];
          }
          
          // verifie dans le tableau des favoris qu'un cafe ne porte pas cet id
          const isAlreadyBookmarked = req.session.bookmarks.some(cafe => Number(cafe.id) === cafeId);
    
          if (!isAlreadyBookmarked) {
              // Récupérer le cafe
              const cafe = await dataMapper.getProductById(cafeId);
    
             // si aucun cafe ne correspond à l'id
              if (!cafe) {
                res.status(404).send("Ce cafe n'existe pas...");
              }
    
              // j'ajoute le cafe aux favoris
              req.session.bookmarks.push(cafe)
              console.log(req.session.bookmarks)
          }
    
          // redirection vers la page des favoris
          res.redirect('/favoris');
        } catch (error) {
            console.error("Erreur serveur...", error);
            res.status(500).send("Erreur serveur...");
        }
    
    },
      // pour afficher les favoris
        bookmarksPage: (req, res) => {
          if (!req.session.bookmarks) {
            req.session.bookmarks = [];
          }
          res.render('favoris', { page: 'favoris', favoris: req.session.bookmarks})
        },
    
        // méthode pour supprimer un favoris
        bookmarksDelete: (req, res) => {
    
          const cafeId = Number(req.params.id)
    
          const updatedBookmarks = req.session.bookmarks.filter((cafe) => cafe.id !== cafeId)
    
          req.session.bookmarks = updatedBookmarks
    
          res.redirect('/favoris');
        }, 
}

export default mainController;