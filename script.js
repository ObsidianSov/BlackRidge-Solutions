/* =========================================================
   BLACKRIDGE SOLUTIONS
   POLISHED V2
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const toast = document.querySelector("#toast");
const yearElement = document.querySelector("#current-year");


/* =========================================================
   CURRENT YEAR
   ========================================================= */

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   HEADER SCROLL STATE
   ========================================================= */

function updateHeader() {
    if (!header) {
        return;
    }

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function closeMenu() {
    if (!menuToggle || !mainNav) {
        return;
    }

    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

function toggleMenu() {
    if (!menuToggle || !mainNav) {
        return;
    }

    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );
}

if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


/* =========================================================
   RESPONSIVE MENU SAFETY
   ========================================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {
        closeMenu();
    }

});


/* =========================================================
   COMING SOON LINKS
   ========================================================= */

const comingSoonLinks = document.querySelectorAll(
    "[data-coming-soon]"
);

let toastTimer;

function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("visible");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("visible");
    }, 2800);
}


comingSoonLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        showToast(
            "The project link will be published when the project is ready."
        );

    });

});


/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#" ||
            link.hasAttribute("data-coming-soon")
        ) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   INTERSECTION OBSERVER
   ========================================================= */

const animatedElements = document.querySelectorAll(
    ".about-card, .service-card, .portfolio-feature, .process-item, .team-card"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observerInstance.unobserve(entry.target);

            });

        },
        {
            threshold: 0.08
        }
    );


    animatedElements.forEach((element) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(18px)";
        element.style.transition =
            "opacity 500ms ease, transform 500ms ease";

        observer.observe(element);

    });

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

const navigationLinks = document.querySelectorAll(
    '.main-nav a[href^="#"]'
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                navigationLinks.forEach((link) => {
                    link.removeAttribute("aria-current");
                });

                const activeLink = document.querySelector(
                    `.main-nav a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.setAttribute(
                        "aria-current",
                        "page"
                    );
                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


/* =========================================================
   END
   ========================================================= */