// ================================
// GALERIA MARCOS
// ================================

gsap.registerPlugin(Flip);

// Cards
const cards = document.querySelectorAll(".card");

// Lightbox
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");

const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");
const btnClose = document.querySelector(".close");

let current = 0;

// ================================
// ABRIR LIGHTBOX
// ================================

function openLightbox(index) {

    current = index;

    lightboxImage.src =
        cards[current]
            .querySelector("img")
            .src;

    lightbox.classList.add("active");

    gsap.fromTo(

        ".lightbox-image",

        {
            scale: .8,
            opacity: 0
        },

        {
            scale: 1,
            opacity: 1,
            duration: .45,
            ease: "power3.out"
        }

    );

}

// ================================
// FECHAR
// ================================

function closeLightbox() {

    gsap.to(

        ".lightbox-image",

        {

            scale: .8,

            opacity: 0,

            duration: .25,

            onComplete() {

                lightbox.classList.remove("active");

            }

        }

    );

}

// ================================
// PRÓXIMA
// ================================

function nextImage() {

    current++;

    if (current >= cards.length) {

        current = 0;

    }

    changeImage();

}

// ================================
// ANTERIOR
// ================================

function prevImage() {

    current--;

    if (current < 0) {

        current = cards.length - 1;

    }

    changeImage();

}

// ================================
// TROCAR IMAGEM
// ================================

function changeImage() {

    gsap.to(

        ".lightbox-image",

        {

            opacity: 0,

            scale: .92,

            duration: .20,

            onComplete() {

                lightboxImage.src =
                    cards[current]
                        .querySelector("img")
                        .src;

                gsap.fromTo(

                    ".lightbox-image",

                    {

                        opacity: 0,
                        scale: 1.05

                    },

                    {

                        opacity: 1,
                        scale: 1,
                        duration: .30

                    }

                );

            }

        }

    );

}

// ================================
// CLICK CARD
// ================================

cards.forEach((card, index) => {

    card.addEventListener("click", () => {

        openLightbox(index);

    });

});

// ================================
// BOTÕES
// ================================

btnNext.onclick = nextImage;

btnPrev.onclick = prevImage;

btnClose.onclick = closeLightbox;

// ================================
// FECHAR CLICANDO FORA
// ================================

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        closeLightbox();

    }

});

// ================================
// TECLADO
// ================================

window.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active"))
        return;

    switch (e.key) {

        case "Escape":

            closeLightbox();

            break;

        case "ArrowRight":

            nextImage();

            break;

        case "ArrowLeft":

            prevImage();

            break;

    }

});

// ================================
// HOVER GSAP
// ================================

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        gsap.to(card, {

            y: -12,

            duration: .30,

            ease: "power2.out"

        });

    });

    card.addEventListener("mouseleave", () => {

        gsap.to(card, {

            y: 0,

            duration: .30,

            ease: "power2.out"

        });

    });

});

// ================================
// CARD EXPANSÍVEL
// ================================

cards.forEach(card => {

    card.addEventListener("dblclick", () => {

        const state = Flip.getState(cards);

        card.classList.toggle("expanded");

        Flip.from(state, {

            duration: .55,

            ease: "power2.inOut",

            absolute: true

        });

    });

});

// ================================
// ANIMAÇÃO DE ENTRADA
// ================================

gsap.from(".card", {

    opacity: 0,

    y: 80,

    stagger: .08,

    duration: .8,

    ease: "power3.out"

});

// ================================
// PARALLAX NAS IMAGENS
// ================================

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const img = card.querySelector("img");

        const rect = card.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        gsap.to(img, {

            x: (x - .5) * 18,

            y: (y - .5) * 18,

            duration: .25

        });

    });

    card.addEventListener("mouseleave", () => {

        gsap.to(card.querySelector("img"), {

            x: 0,
            y: 0,
            duration: .35

        });

    });

});

// ==========================================
// CARD EXPANSÍVEL PREMIUM
// ==========================================

const gallery = document.querySelector(".gallery");

let openedCard = null;

cards.forEach(card => {

    card.addEventListener("click", () => {

        if (lightbox.classList.contains("active"))
            return;

        const state = Flip.getState(".card");

        if (openedCard) {

            openedCard.classList.remove("featured");

            if (openedCard === card) {

                openedCard = null;

            } else {

                card.classList.add("featured");

                openedCard = card;

            }

        } else {

            card.classList.add("featured");

            openedCard = card;

        }

        Flip.from(state, {

            duration: .8,

            ease: "power3.inOut",

            absolute: true,

            nested: true

        });

    });

});

// ==========================================
// micro animação do texto
// ==========================================

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        gsap.fromTo(

            card.querySelector("h3"),

            {

                y: 30,

                opacity: 0

            },

            {

                y: 0,

                opacity: 1,

                duration: .4

            }

        );

    });

});

// ==========================================
// EFEITO 3D
// ==========================================

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rx = ((y / rect.height) - .5) * -10;

        const ry = ((x / rect.width) - .5) * 10;

        gsap.to(card, {

            rotateX: rx,

            rotateY: ry,

            transformPerspective: 1000,

            transformOrigin: "center",

            duration: .25

        });

    });

    card.addEventListener("mouseleave", () => {

        gsap.to(card, {

            rotateX: 0,

            rotateY: 0,

            duration: .35

        });

    });

});