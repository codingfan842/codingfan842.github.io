
document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    const isExternal = !href.startsWith('/') && !href.includes(window.location.hostname);

    if (isExternal && href) {
        link.innerHTML = `<span>${link.textContent}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height=".8em" viewBox="0 0 24 18"><path d="M0 0h24v24H0z" fill="none"/><g fill="currentColor"><path d="M15.64 7.025h-3.622v-2h7v7h-2v-3.55l-4.914 4.914l-1.414-1.414z"/><path d="M10.982 6.975h-6v12h12v-6h-2v4h-8v-8h4z"/></g></svg></span><span class="sr-only"> (external link)</span>`;

        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});


if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const originalTo = gsap.to;
    gsap.to = function (target, vars, ...args) {
        return originalTo.call(this, target, { ...vars, duration: 0 }, ...args);
    };

    const originalFrom = gsap.from;
    gsap.from = function (target, vars, ...args) {
        return originalFrom.call(this, target, { ...vars, duration: 0 }, ...args);
    };

    const originalFromTo = gsap.fromTo;
    gsap.fromTo = function (target, fromVars, toVars, ...args) {
        return originalFromTo.call(this, target, fromVars, { ...toVars, duration: 0 }, ...args);
    };
}


let isVisible = false;
const button = document.getElementById("menuBtn");
const sidebar = document.getElementById("side");
if (sidebar) {



    function toggleSidebar() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const menu = document.getElementById("menu");
        const element = document.getElementById("sideBtns");
        const sidebar = document.getElementById("side");



        if (isVisible) {
            if (prefersReducedMotion) {
                sidebar.style.display = 'none';
                menu.classList.remove("active");
                element.style.display = 'none';
            } else {
                menu.classList.remove("active");
                gsap.to("#side", { width: "0%" });
                gsap.to(element, {
                    opacity: 0,
                    duration: 0.2,
                    x: -100,
                    display: "none",
                    ease: "power1.inOut",
                    pointerEvents: "none"
                });

            }
            isVisible = false;
        } else {
            if (prefersReducedMotion) {
                sidebar.style.display = 'block';
                element.style.display = 'flex'; menu.classList.remove("active");


            } else {
                gsap.to("#side", { width: "0%" }); menu.classList.add("active");

                gsap.to(element, {
                    duration: .2,
                    display: "flex",
                    opacity: 1,
                    ease: "power1.inOut",
                    x: 0,
                    pointerEvents: "auto"
                });


            }
            isVisible = true;
        }
    }


    button.addEventListener('click', toggleSidebar());


}


function initAnimations() {

    gsap.from('main', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
    });
    const element = document.getElementById("sideBtns");
    const header = document.getElementById("header");
    const main = document.getElementById("mainChild");

    gsap.from(element, {
        duration: .3,
        display: "flex",
        opacity: 0,
        ease: "power3.inOut",
        x: -100,
        delay: .6,
        pointerEvents: "auto"
    });

    gsap.from(header, {
        y: -100,
        opacity: 0,
        duration: .3,
        ease: "power3.inOut"
    });

    gsap.from(main, {
        y: -1000,
        opacity: 0,
        duration: .8,
        delay: .6,
        ease: "power3.inOut"

    });



    barba.init();




    barba.hooks.leave(() => {
        return gsap.to('main', {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in'
        });
    });
    barba.hooks.enter((data) => {
        tippy('[data-tooltip]', {
            content: (reference) => reference.getAttribute('data-tooltip'),
            allowHTML: true,
            followCursor: false,
            theme: 'nav',
            arrow: !1,
            duration: 100,
            placement: 'right',
            onShow(instance) {
                gsap.killTweensOf("#thing");
                document.querySelector('#thing').style.display = 'block';
                gsap.to("#thing", {
                    opacity: 1,
                    duration: 0.3
                });
            },
            onHide(instance) {
                gsap.to("#thing", {
                    opacity: 0,
                    duration: 0.3,
                    onComplete() {
                        document.querySelector('#thing').style.display = 'none';
                    }
                });
            },
        });





        const newContainer = data.next.container;


        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            const isExternal = !href.startsWith('/') && !href.includes(window.location.hostname);

            if (isExternal && href) {
                link.innerHTML = `<span>${link.textContent}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height=".8em" viewBox="0 0 24 18"><path d="M0 0h24v24H0z" fill="none"/><g fill="currentColor"><path d="M15.64 7.025h-3.622v-2h7v7h-2v-3.55l-4.914 4.914l-1.414-1.414z"/><path d="M10.982 6.975h-6v12h12v-6h-2v4h-8v-8h4z"/></g></svg></span><span class="sr-only"> (external link)</span>`;

                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });

        gsap.from(newContainer, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });

        barba.hooks.before((data) => {
            document.querySelectorAll('[data-tippy-root]').forEach(el => {
                if (el._tippy) {
                    el._tippy.destroy();
                }
            })
        });
    });

}



initAnimations();



function cacheElements() {
    const setContain = document.getElementById("setContain");
    const mainWrap = document.getElementById("mainWrapper");
    const header = document.getElementById("header");
    const thing = document.getElementById("thing")
}


cacheElements();

barba.hooks.after(() => {
    cacheElements();

});



function steppedEase(numSteps, easeType) {
    return (progress) => {
        const easeFunc = gsap.parseEase(easeType);
        const easedProgress = easeFunc(progress);
        return Math.floor(easedProgress * numSteps) / numSteps;
    };
}

// window.addEventListener("load", function () {
// var e = document.getElementById("loadingScreen");
//  e.style.opacity = "0", document.body.style.overflowY = "auto",
//   setTimeout(function () {
//       e.style.display = "none"
//  }, 300)
/// });

function hideLoadingScreen() {
    var e = document.getElementById("loadingScreen");
    e.style.opacity = "0";
    document.body.style.overflowY = "auto";
    setTimeout(function () {
        e.style.display = "none";
    }, 300);
}

// If page is already loaded when script runs, do it immediately
if (document.readyState === "complete") {
    hideLoadingScreen();
} else {
    // Otherwise wait for load event
    window.addEventListener("load", hideLoadingScreen);
}


class UserNameManager {
    constructor() {
        this.storageKey = 'userName';
        this.fallbackName = 'Anon';
        this.init();
    }

    init() {
        this.displayName();

        const form = document.getElementById('nameForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const input = document.getElementById('nameInput');
        const name = input.value.trim();

        if (name) {
            this.saveName(name);
            input.value = '';
        }
    }

    saveName(name) {
        localStorage.setItem(this.storageKey, name);
        this.displayName();
    }

    getName() {
        return localStorage.getItem(this.storageKey) || this.fallbackName;
    }

    displayName() {
        const name = this.getName();
        const userElements = document.querySelectorAll('.visitor');
        userElements.forEach(el => {
            el.textContent = name;
        });
    } clearName() { localStorage.removeItem(this.storageKey); this.displayName(); }
} document.addEventListener('DOMContentLoaded', () => { new UserNameManager(); });





let myWindow = null;


function openSettings() {
    if (myWindow) {
        myWindow.focus();
        return;
    }

    const isMobile = window.innerWidth < 600;

    const config = {
        title: "Settings",
        fullscreen: false,
        class: ["no-full", "no-max"],
        mount: document.getElementById("content").cloneNode(true),
        onclose: function () {
            myWindow = null;
        }
    };

    if (isMobile) {
        config.width = "90vw";
        config.height = "80vh";
        config.x = 0;
        config.y = 0;
        config.max = true;
    } else {
        config.width = 700;
        config.height = 400;
        config.x = "center";
        config.y = "center";
        config.max = false;


    }

    myWindow = new WinBox(config);
}





function isFocus() {
    const tag = document.activeElement?.tagName;
    return tag === 'TEXTAREA' || tag === 'INPUT';
}

document.addEventListener('keydown', (e) => {
    if (isFocus()) return;

 /*   if (e.key === '1') { e.preventDefault(); barba.go('/'); }
    if (e.key === '2') { e.preventDefault(); barba.go('/me/'); }
    if (e.key === '3') { e.preventDefault(); barba.go('/you/'); }
    if (e.key === '4') { e.preventDefault(); barba.go('/projects/'); }
    if (e.key === '5') { e.preventDefault(); barba.go('/fun'); }
    if (e.key === '6') { e.preventDefault(); barba.go('/www'); }
    if (e.key === '7') { e.preventDefault(); barba.go('/out'); } */
    /* if (e.key === '?') { openSettings() } */
    if (e.key === '/') { toggleSidebar(); }


      if (e.key === '1') { e.preventDefault(); barba.go('/'); }
    if (e.key === '2') { e.preventDefault(); barba.go('/404/'); }
    if (e.key === '3') { e.preventDefault(); barba.go('/404/'); }
    if (e.key === '4') { e.preventDefault(); barba.go('/404/'); }
    if (e.key === '5') { e.preventDefault(); barba.go('/404'); }
    if (e.key === '6') { e.preventDefault(); barba.go('/404'); }
    if (e.key === '7') { e.preventDefault(); barba.go('/404'); }

});









var countDownDate = new Date("Oct 15, 2026 20:00:00").getTime(); var x = setInterval(function () {
    var now = new Date().getTime(); var distance = countDownDate - now; var days = Math.floor(distance / (1000 * 60 * 60 * 24)); var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("utcount").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s "; if (distance < 0) { clearInterval(x); document.getElementById("demo").innerHTML = "EXPIRED"; }
}, 1000);

// this script is under the MIT license (https://max.nekoweb.org/resources/license.txt)
// SLIGHTLY edited by dorian (placeholder img for songs with no cover), my edit script also is under MIT license of course

const USERNAME = "musicfan842"; // Put your LastFM username here
const BASE_URL = `https://lastfm-last-played.biancarosa.com.br/${USERNAME}/latest-song`;
const trackImg = document.getElementById('trackImg'); // for placeholder img

const getTrack = async () => {
    const request = await fetch(BASE_URL);
    const json = await request.json();
    let status
    let isPlaying = json.track['@attr']?.nowplaying || false;

    if (!isPlaying) {
        document.getElementById("listening").innerHTML = `<p class="pm0 w-100 text-center">Nothing right now, check back later</p>`;
        return;
    } else {
        const imageUrl = json.track.image[1]['#text'] || '/assets/image/favicon/0.png';

        document.getElementById("listening").innerHTML = `
        <img id="trackImg" style="width:85px;height:85px;image-rendering:pixelated" src="${imageUrl}" onerror="this.src='/path/to/fallback-image.png'">
        <div id="trackInfo" class="flex flex-col justify-between" > 
        <h4 id="trackName" style="font-size:.8em;" class="text-red tippy" title="${json.track.name}">${json.track.name}</h4>
        <p style="margin:0!important;font-size:initial" id="artistName">${json.track.artist['#text']}</p>
        </div>
        `

        document.querySelectorAll('.tippy').forEach(el => {
            if (el._tippy) {
                el._tippy.destroy();
            }
        })
        tippy('.tippy', {
            onMount(instance) {
                const box = instance.popper.firstElementChild;
                requestAnimationFrame(() => {
                    box.classList.add('animation')
                })
            }, onHidden(instance) {
                const box = instance.popper.firstElementChild;
                box.classList.add('animation')
            },
            content(reference) {
                const title = reference.getAttribute('title');
                reference.removeAttribute('title');
                return title
            },
            allowHTML: !0,
            theme: 'dorian',
            followCursor: 'horizontal',
            duration: 100,
        });
    }
};



getTrack();
setInterval(() => { getTrack(); }, 10000);

