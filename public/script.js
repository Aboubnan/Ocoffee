// menus burger

document.addEventListener("DOMContentLoaded", function () {
    let sidenav = document.getElementById("mySidenav");  
    let openBtn = document.getElementById("openBtn");
    let closeBtn = document.getElementById("closeBtn");

    function isMobile() {
        return window.innerWidth < 1024;
    }

    openBtn.addEventListener("click", function () {
        if (isMobile()) {
            sidenav.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });

    closeBtn.addEventListener("click", function (event) {
        event.preventDefault();
        sidenav.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener("click", function (event) {
        if (isMobile() && !sidenav.contains(event.target) && !openBtn.contains(event.target)) {
            sidenav.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });

    // S'assurer que le menu normal est toujours affiché sur PC
    window.addEventListener("resize", function () {
        if (!isMobile()) {
            sidenav.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
});


// button "voir tout" et filtre "categorie" dans page catalogue
document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("categorySelect");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const productsContainer = document.getElementById("products-container");

    let allProducts = []; // Stocker tous les produits
    let displayedProducts = []; // Stocker uniquement les produits affichés

    // Charger les produits depuis l'API
    function loadProducts() {
        fetch("/api/products")
            .then(response => response.json())
            .then(data => {
                allProducts = data; // Stocker tous les produits
                displayedProducts = data.slice(0, 3); // Afficher uniquement les 3 premiers produits
                displayProducts(displayedProducts); // Afficher les produits initiaux

                // Afficher le bouton "Voir tout" uniquement si plus de 3 produits existent
                if (allProducts.length > 3) {
                    loadMoreBtn.style.display = "block";
                }
            })
            .catch(error => console.error("❌ Erreur chargement produits :", error));
    }

    // Fonction pour afficher les produits
    function displayProducts(products) {
        productsContainer.innerHTML = ""; // Vider la liste actuelle

        products.forEach(product => {
            const productCard = document.createElement("article");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="/images/coffees/${product.reference_code}.png" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Prix: ${product.price}€</p>
                <p><strong>Catégorie :</strong> ${product.characteristic}</p>
                <a href="/produit/${product.id}"><button>Découvrir</button></a>
                <a href="/favoris/add/${product.id}">+ Ajouter aux favoris</a>
            `;

            productsContainer.appendChild(productCard);
        });
    }

    // Fonction pour afficher tous les produits au clic sur "Voir tout"
    loadMoreBtn.addEventListener("click", () => {
        displayedProducts = allProducts; // Afficher tous les produits
        displayProducts(displayedProducts);
        loadMoreBtn.style.display = "none"; // Cacher le bouton après affichage complet
    });

    // Écouter les changements de la sélection
    categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;

        if (selectedCategory === "all") {
            displayedProducts = allProducts.slice(0, 3); // Réinitialiser à 3 produits affichés
            displayProducts(displayedProducts);
            if (allProducts.length > 3) {
                loadMoreBtn.style.display = "block"; // Réafficher "Voir tout"
            }
        } else {
            const filteredProducts = allProducts.filter(product => product.characteristic === selectedCategory);
            displayProducts(filteredProducts);
            loadMoreBtn.style.display = "none"; // Cacher le bouton lors du filtrage
        }
    });

    // Charger les produits au démarrage
    loadProducts();
});



document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");

    if (!form) {
        console.error("❌ Formulaire non trouvé ! Vérifie que la classe `.contact-form` est bien présente dans le HTML.");
        return;
    }

    if (typeof emailjs === "undefined") {
        console.error("❌ EmailJS n'est pas chargé !");
        return;
    }

    emailjs.init("wpwZB1Uz2SfuZltuX"); // Remplace par ton vrai User ID
    console.log("✔ EmailJS initialisé");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche le rechargement de la page
        console.log("✔ Formulaire soumis !");

        // Récupérer les valeurs du formulaire
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        console.log("Données du formulaire :", formData);

        // Envoyer l'email via EmailJS
        emailjs.send("service_g7a764m", "template_drqwa5l", formData)
            .then(response => {
                alert("📨 Message envoyé avec succès !");
                console.log("✅ SUCCESS!", response.status, response.text);
                form.reset(); // Réinitialise le formulaire
            })
            .catch(error => {
                alert("⚠ Une erreur est survenue...");
                console.error("❌ FAILED...", error);
            });
            console.log("Service ID utilisé :", "service_g7a764m");
            console.log("Template ID utilisé :", "template_drqwa5l");
    });

});
