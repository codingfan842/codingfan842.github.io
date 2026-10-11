function initTippy() {
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
initTippy();


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




