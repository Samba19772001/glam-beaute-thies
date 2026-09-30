(function () {

    "use strict";


    /* =====================================================
       OUTILS
    ===================================================== */

    var $ = function (id) {

        return document.getElementById(id);

    };


    var each = function (list, fn) {

        Array.prototype.forEach.call(
            list,
            fn
        );

    };



    /* =====================================================
       COULEURS
    ===================================================== */

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

                $("cname").textContent =
                    T[i][0];

            }


            each(
                pick.children,
                function (button, index) {

                    button.setAttribute(
                        "aria-pressed",
                        index === i
                            ? "true"
                            : "false"
                    );

                }
            );


            try {

                localStorage.setItem(
                    "glam-teinte",
                    String(i)
                );

            } catch (e) { }

        }


        T.forEach(function (t, i) {

            var button =
                document.createElement("button");

            button.type =
                "button";

            button.style.background =
                t[1];

            button.setAttribute(
                "aria-label",
                t[0]
            );


            button.onclick =
                function () {

                    setTint(i);

                };


            pick.appendChild(button);

        });


        var saved = 0;


        try {

            saved =
                parseInt(
                    localStorage.getItem(
                        "glam-teinte"
                    ),
                    10
                ) || 0;

        } catch (e) { }


        setTint(
            saved < T.length
                ? saved
                : 0
        );

    }



    /* =====================================================
       MENU MOBILE
    ===================================================== */

    var nav =
        $("nav");

    var burger =
        $("burger");

    var menu =
        $("menu");


    if (burger && menu) {

        burger.onclick =
            function () {

                var open =
                    menu.classList.toggle(
                        "open"
                    );


                burger.setAttribute(
                    "aria-expanded",
                    String(open)
                );

            };


        menu.onclick =
            function (e) {

                if (
                    e.target.tagName === "A"
                ) {

                    menu.classList.remove(
                        "open"
                    );


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



    /* =====================================================
       HORAIRES
    ===================================================== */

    var date =
        new Date();


    var day =
        date.getUTCDay();


    var minutes =
        date.getUTCHours() * 60 +
        date.getUTCMinutes();


    var openNow =
        day > 0 &&
        minutes >= 600 &&
        minutes < 1170;


    var openingText;


    if (openNow) {

        openingText =
            "Ouvert maintenant, jusqu'à 19h30";

    }

    else if (
        day > 0 &&
        minutes < 600
    ) {

        openingText =
            "Ouvre aujourd'hui à 10h";

    }

    else if (
        day === 6
    ) {

        openingText =
            "Fermé, ouvre lundi à 10h";

    }

    else {

        openingText =
            "Fermé, ouvre demain à 10h";

    }


    if ($("open")) {

        $("open").textContent =
            openingText;


        $("open").className =
            openNow
                ? "on"
                : "";

    }



    /* =====================================================
       CARROUSEL HERO
    ===================================================== */

    var slides =
        document.querySelectorAll(
            ".hero-slide"
        );


    var dots =
        document.querySelectorAll(
            ".slider-dots button"
        );


    var previousButton =
        $("sliderPrev");


    var nextButton =
        $("sliderNext");


    var heroButtons =
        document.querySelectorAll(
            "[data-hero-service]"
        );


    var currentSlide = 0;

    var sliderTimer;



    /* AFFICHER UNE SLIDE */

    function showSlide(index) {

        if (!slides.length) {

            return;

        }


        if (index < 0) {

            index =
                slides.length - 1;

        }


        if (
            index >= slides.length
        ) {

            index = 0;

        }


        currentSlide =
            index;


        each(
            slides,
            function (slide, i) {

                slide.classList.toggle(
                    "active",
                    i === currentSlide
                );

            }
        );


        each(
            dots,
            function (dot, i) {

                dot.classList.toggle(
                    "active",
                    i === currentSlide
                );

            }
        );

    }



    /* SLIDE SUIVANTE */

    function nextSlide() {

        showSlide(
            currentSlide + 1
        );

    }



    /* SLIDE PRECEDENTE */

    function previousSlide() {

        showSlide(
            currentSlide - 1
        );

    }



    /* REDEMARRER LE TIMER */

    function restartSlider() {

        clearInterval(
            sliderTimer
        );


        sliderTimer =
            setInterval(
                nextSlide,
                6500
            );

    }



    /* BOUTON SUIVANT */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                nextSlide();

                restartSlider();

            }
        );

    }



    /* BOUTON PRECEDENT */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function () {

                previousSlide();

                restartSlider();

            }
        );

    }



    /* INDICATEURS */

    each(
        dots,
        function (dot) {

            dot.addEventListener(
                "click",
                function () {

                    var index =
                        parseInt(
                            dot.getAttribute(
                                "data-slide"
                            ),
                            10
                        );


                    showSlide(index);

                    restartSlider();

                }
            );

        }
    );



    /* =====================================================
       BOUTONS DES PRESTATIONS
    ===================================================== */

    each(
        heroButtons,
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    var service =
                        button.getAttribute(
                            "data-hero-service"
                        );


                    if ($("svc")) {

                        $("svc").value =
                            service;

                    }


                    updateWhatsApp();

                }
            );

        }
    );



    /* =====================================================
       INITIALISATION CARROUSEL
    ===================================================== */

    if (slides.length) {

        showSlide(0);

        restartSlider();

    }



    /* =====================================================
       GALERIE
    ===================================================== */

    var tabs =
        $("tabs");


    var gal =
        $("gal");


    var lightbox =
        $("lb");


    var lightboxImage =
        lightbox
            ? lightbox.querySelector("img")
            : null;



    if (tabs && gal) {

        tabs.onclick =
            function (e) {

                var button =
                    e.target.closest(
                        "button"
                    );


                if (!button) {

                    return;

                }


                var filter =
                    button.getAttribute(
                        "data-f"
                    );


                each(
                    tabs.children,
                    function (item) {

                        item.classList.toggle(
                            "on",
                            item === button
                        );

                    }
                );


                each(
                    gal.children,
                    function (item) {

                        item.hidden =
                            filter !== "all" &&
                            item.getAttribute(
                                "data-c"
                            ) !== filter;

                    }
                );

            };

    }



    if (
        gal &&
        lightbox &&
        lightboxImage
    ) {

        gal.onclick =
            function (e) {

                var figure =
                    e.target.closest(
                        "figure"
                    );


                if (!figure) {

                    return;

                }


                var image =
                    figure.querySelector(
                        "img"
                    );


                if (!image) {

                    return;

                }


                lightboxImage.src =
                    image.src;


                lightboxImage.alt =
                    image.alt;


                lightbox.showModal();

            };


        lightbox.onclick =
            function () {

                lightbox.close();

            };

    }



    /* =====================================================
       WHATSAPP
    ===================================================== */

    function updateWhatsApp() {

        var name =
            $("nom")
                ? $("nom").value.trim()
                : "";


        var day =
            $("jour")
                ? $("jour").value.trim()
                : "";


        var service =
            $("svc")
                ? $("svc").value
                : "Renseignement";


        var message =
            "Bonjour Glam Beauté" +
            (
                name
                    ? ", je m'appelle " + name
                    : ""
            ) +
            ". Je voudrais un rendez-vous pour : " +
            service +
            (
                day
                    ? ", " + day
                    : ""
            ) +
            ".";


        if ($("go")) {

            $("go").href =
                "https://wa.me/221776337105?text=" +
                encodeURIComponent(message);

        }

    }



    /* =====================================================
       CHAMPS RESERVATION
    ===================================================== */

    [
        "nom",
        "svc",
        "jour"
    ].forEach(
        function (id) {

            var element =
                $(id);


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

        }
    );


    updateWhatsApp();



    /* =====================================================
       CLIC SUR UN SERVICE
    ===================================================== */

    each(
        document.querySelectorAll(
            "[data-s]"
        ),
        function (button) {

            button.onclick =
                function () {

                    var service =
                        button.getAttribute(
                            "data-s"
                        );


                    if ($("svc")) {

                        $("svc").value =
                            service;

                    }


                    updateWhatsApp();


                    if ($("rdv")) {

                        $("rdv").scrollIntoView({

                            behavior: "smooth"

                        });

                    }

                };

        }
    );


})();