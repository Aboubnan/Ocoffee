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

