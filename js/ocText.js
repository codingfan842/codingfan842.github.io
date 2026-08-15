const ocs = [
    {
        name: 'The Narrator',
        className: 'oc-narrator',
    },
    {
        name: 'Dorian',
        className: 'oc-dorian', // Heh, look, Lois, I'm an OC on the DorianVERSE!
    },
    {
        name: 'DorianVERSE',
        className: 'obj-dorianverse', // It's not a OC, but that's fine...
    }
];


function highlightOCs() { const pattern = new RegExp(`\\b(${ocs.map(oc => oc.name).join('|')})\\b`, 'gi'); const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false); const nodesToReplace = []; let node; while (node = walker.nextNode()) { pattern.lastIndex = 0; if (pattern.test(node.textContent)) { nodesToReplace.push(node) } } nodesToReplace.forEach(node => { pattern.lastIndex = 0; const fragment = document.createDocumentFragment(); let lastIndex = 0; let match; while ((match = pattern.exec(node.textContent)) !== null) { if (match.index > lastIndex) { fragment.appendChild(document.createTextNode(node.textContent.slice(lastIndex, match.index))) } const matchedOC = ocs.find(oc => oc.name.toLowerCase() === match[0].toLowerCase()); const span = document.createElement('span'); span.className = matchedOC.className; span.textContent = match[0]; fragment.appendChild(span); lastIndex = match.index + match[0].length } if (lastIndex < node.textContent.length) { fragment.appendChild(document.createTextNode(node.textContent.slice(lastIndex))) } node.parentNode.replaceChild(fragment, node) }) } document.addEventListener('DOMContentLoaded', highlightOCs);