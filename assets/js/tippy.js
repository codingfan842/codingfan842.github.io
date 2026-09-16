tippy('.tippy', {
    onMount(instance) {
        const box = instance.popper.firstElementChild;
        requestAnimationFrame(() => {
            box.classList.add('animation');
        });
    }, onHidden(instance) {
        const box = instance.popper.firstElementChild; box.classList.add('animation');
    },
    content(reference) {
        const title = reference.getAttribute('title');
        reference.removeAttribute('title');
        return title;
    },
    allowHTML: true,
    followCursor: true,
    theme: 'dorian',
    arrow: false,
    duration: 100,
});
