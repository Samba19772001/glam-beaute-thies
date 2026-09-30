(function () {

    var $ = function (id) {
        return document.getElementById(id);
    };

    var each = function (list, fn) {
        Array.prototype.forEach.call(list, fn);
    };


    /* =========================
       COULEURS
    ========================= */

    var T = [
        ["Fuchsia Thiès", "#cd2f80", "#fff"],
        ["Bordeaux", "#8e1b3a", "#fff"],
        ["Or Saloum", "#d4a03c", "#3a1541"],
        ["Nude Sahel", "#d9a38f", "#3a1541"]
    ];

    var pick = $("pick");

    if (pick) {

        function setTint(i) {

            document.documentElement.style.setProperty(
                "--accent",
                T[i][1]
            );

            document.documentElement.style.setProperty(
                "--on",
                T[i][2]
            );

            if ($("cname")) {
                $("cname").textContent = T[i][0];
            }

            each(pick.children, function (b, j) {

                b.setAttribute(
                    "aria-pressed",
                    j === i ? "true" : "false"
                );

            });

            try {
                localStorage.setItem(
                    "glam-teinte",
                    String(i)
                );
            } catch (e) { }

        }


        T.forEach(function (t, i) {

            var b = document.createElement("button");

            b.type = "button";

            b.style.background = t[1];

            b.setAttribute(
                "aria-label",
                t[0]
            );

            b.onclick = function () {
                setTint(i);
            };

            pick.appendChild(b);

        });


        var s = 0;

        try {
            s = parseInt(
                localStorage.getItem("glam-teinte"),
                10
            ) || 0;
        } catch (e) { }

        setTint(
            s < T.length ? s : 0
        );

    }


    /* =========================
       MENU MOBILE
    ========================= */

    var nav = $("nav");
    var burger = $("burger");
    var menu = $("menu");

    if (burger && menu) {

        burger.onclick = function () {

            var open = menu.classList.toggle("open");

            burger.setAttribute(
                "aria-expanded",
                String(open)
            );

        };


        menu.onclick = function (e) {

            if (e.target.tagName === "A") {

                menu.classList.remove("open");

                burger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        };

    }


    function scrollNav() {

        if (nav) {

            nav.classList.toggle(
                "solid",
                window.scrollY > 40
            );

        }

    }

    window.addEventListener(
        "scroll",
        scrollNav,
        { passive: true }
    );

    scrollNav();


    /* =========================
       HORAIRES
    ========================= */

    var d = new Date();

    var dy = d.getUTCDay();

    var mn =
        d.getUTCHours() * 60 +
        d.getUTCMinutes();

    var ok =
        dy > 0 &&
        mn >= 600 &&
        mn < 1170;

    var t;

    if (ok) {

        t = "Ouvert maintenant, jusqu'à 19h30";

    } else if (dy > 0 && mn < 600) {

        t = "Ouvre aujourd'hui à 10h";

    } else if (dy === 6) {

        t = "Fermé, ouvre lundi à 10h";

    } else {

        t = "Fermé, ouvre demain à 10h";

    }

    if ($("open")) {

        $("open").textContent = t;

        $("open").className = ok ? "on" : "";

    }


    /* =========================
       CARROUSEL HERO
    ========================= */

    var slides =
        document.querySelectorAll(".hero-slide");

    var dots =
        document.querySelectorAll(".slider-dots button");

    var prev =
        $("sliderPrev");

    var next =
        $("sliderNext");

    var currentSlide = 0;

    var sliderTimer;


    function showSlide(index) {

        if (!slides.length) {
            return;
        }

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }

        currentSlide = index;


        each(slides, function (slide, i) {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        each(dots, function (dot, i) {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }


    /* Slide suivant */

    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    /* Slide précédente */

    function previousSlide() {

        showSlide(currentSlide - 1);

    }


    /* Redémarre le défilement automatique */

    function restartSlider() {

        clearInterval(sliderTimer);

        sliderTimer = setInterval(
            nextSlide,
            6500
        );

    }


    /* Bouton suivant */

    if (next) {

        next.addEventListener(
            "click",
            function () {

                nextSlide();

                restartSlider();

            }
        );

    }


    /* Bouton précédent */

    if (prev) {

        prev.addEventListener(
            "click",
            function () {

                previousSlide();

                restartSlider();

            }
        );

    }


    /* Points */

    each(dots, function (dot) {

        dot.addEventListener(
            "click",
            function () {

                var index =
                    parseInt(
                        dot.getAttribute("data-slide"),
                        10
                    );

                showSlide(index);

                restartSlider();

            }
        );

    });


    /* Initialisation */

    if (slides.length) {

        showSlide(0);

        restartSlider();

    }


    /* =========================
       GALERIE
    ========================= */

    var tabs = $("tabs");
    var gal = $("gal");
    var lb = $("lb");

    var li =
        lb ?
            lb.querySelector("img") :
            null;


    if (tabs && gal) {

        tabs.onclick = function (e) {

            var b =
                e.target.closest("button");

            if (!b) {
                return;
            }

            var f =
                b.getAttribute("data-f");


            each(
                tabs.children,
                function (x) {

                    x.classList.toggle(
                        "on",
                        x === b
                    );

                }
            );


            each(
                gal.children,
                function (g) {

                    g.hidden =
                        (
                            f !== "all" &&
                            g.getAttribute("data-c") !== f
                        );

                }
            );

        };

    }


    if (gal && lb && li) {

        gal.onclick = function (e) {

            var g =
                e.target.closest("figure");

            if (!g) {
                return;
            }

            var im =
                g.querySelector("img");

            if (!im) {
                return;
            }

            li.src = im.src;

            li.alt = im.alt;

            lb.showModal();

        };

        lb.onclick = function () {

            lb.close();

        };

    }


    /* =========================
       WHATSAPP
    ========================= */

    function updateWhatsApp() {

        var n =
            $("nom") ?
                $("nom").value.trim() :
                "";

        var j =
            $("jour") ?
                $("jour").value.trim() :
                "";

        var service =
            $("svc") ?
                $("svc").value :
                "";


        var message =
            "Bonjour Glam Beauté" +
            (n ? ", je m'appelle " + n : "") +
            ". Je voudrais un rendez-vous pour : " +
            service +
            (j ? ", " + j : "") +
            ".";


        if ($("go")) {

            $("go").href =
                "https://wa.me/221776337105?text=" +
                encodeURIComponent(message);

        }

    }


    ["nom", "svc", "jour"].forEach(function (id) {

        var element = $(id);

        if (!element) {
            return;
        }

        element.addEventListener(
            "input",
            updateWhatsApp
        );

        element.addEventListener(
            "change",
            updateWhatsApp
        );

    });


    updateWhatsApp();


    /* =========================
       CLIC SUR UN SERVICE
    ========================= */

    each(
        document.querySelectorAll("[data-s]"),
        function (button) {

            button.onclick = function () {

                var service =
                    button.getAttribute("data-s");

                if ($("svc")) {

                    $("svc").value = service;

                }

                updateWhatsApp();

                if ($("rdv")) {

                    $("rdv").scrollIntoView({
                        behavior: "smooth"
                    });

                }

            };

        });


})();