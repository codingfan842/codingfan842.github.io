

/* =============== BARBA =============== */
const popSound = new Howl({
    src: ['/assets/resource/audio/pop.mp3']
});



function initAnimations() {
    const playEnterAnimation = (container) => {
        gsap.from('.stripe', { 
            opacity: 0,
            x: 500,
            duration: 0.6,
            stagger: 0.5,
            ease: "back.out",
        });

        gsap.from('.soon-eyes', { 
            opacity: 0,
            delay: 2.5,
            duration: 1,
            x: 5,
            ease: "back.out",
        });

        gsap.from('.soon-text', {
            ease: "back-out",
            x: 5,
            opacity: 0,
            delay: 3
        });


        gsap.from(container, {
            opacity: 0,
            duration: 0.5  

        });
    };

    playEnterAnimation(document.querySelector('[data-barba="container"]'));

    barba.init({
        transitions: [{
            leave(data) {
                gsap.to('.stripe', {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out"
                });

                gsap.to(data.current.container, {
                    opacity: 0
                });
            },

            enter(data) {
                playEnterAnimation(data.next.container);
            }
        }]
    });
}

/* =============== HOVER ANIMATIONS =============== */

document.querySelectorAll('.stripe').forEach(element => {
    element.addEventListener('mouseenter', () => {
        gsap.to(element, { duration: 0.3, height: 20, ease: "bounce.out", onStart() { popSound.play(); } } ); });

    element.addEventListener('mouseleave', () => {
        gsap.to(element, { duration: 0.3, height: 0, ease: "bounce.out", });
    });
});

initAnimations();


/* =============== FAVICON =============== */
const faviconLink = document.querySelector("link[rel='icon']");
let frameIndex = 0;
const frames = [
  '/assets/resource/image/favicon/0.png',
  '/assets/resource/image/favicon/1.png',
  '/assets/resource/image/favicon/2.png',
  '/assets/resource/image/favicon/3.png',
  '/assets/resource/image/favicon/4.png',
  '/assets/resource/image/favicon/5.png',
];

setInterval(() => {
  faviconLink.href = frames[frameIndex];
  frameIndex = (frameIndex + 1) % frames.length;
}, 1000); 

/* =============== COPY BUTTONS =============== */
document.getElementById("drn-button").addEventListener("click", async () => {try {await navigator.clipboard.writeText("<a href='dorian.moe'><img style='image-rendering:pixelated' src='https://dorian.moe/assets/resource/image/buttons/drnvrse-btn-1.png' alt='button of dorian.moe'></a>");alert("Copied!");} catch (err) {alert("Copy failed");}});
