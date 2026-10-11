// Separate file just in case I don't want to use this (ex: guestbook)
var options = {
 "accuracy": {
        "value": "exactly",
        "limiters": [",", "."]
    }
};


new Mark(document.body).mark("dorian.moe", {
    className: "oc-drn",
    separateWordSearch: false,
    "element": "span",
        "accuracy": {
        "value": "exactly",
        "limiters": [",", "."]
    }
});


