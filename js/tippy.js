
tippy('.tippy', {
    content(reference) {
        const title = reference.getAttribute('title');
        reference.removeAttribute('title');
        return title;
    },
  arrow: true,
    animation: 'shift-away-subtle',
    allowHTML: true,
    theme: 'dorian-theme',
      interactive: true,
});

