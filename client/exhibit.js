let xmark = document.getElementById("xmark");
xmark.addEventListener("mouseover", function (event) {
    //highlight the mouseover target
    event.target.className = "fa-solid fa-circle-xmark fa-2x";
    event.target.style.color = "whitesmoke";
}, false);

xmark.addEventListener("mouseout", function (event) {
    event.target.className = "fa-regular fa-circle-xmark fa-2x";
    event.target.style.color = "whitesmoke";
}, false);

function click_xmark() {
    console.log('close');
}

let trashcan = document.getElementById('trashcan');
trashcan.addEventListener("mouseover", function (event) {
    //highlight the mouseover target
    event.target.className = "fa-regular fa-trash-can fa-1";
    event.target.style.color = "var(--color-orange)";
}, false);

trashcan.addEventListener("mouseout", function (event) {
    event.target.className = "fa-solid fa-trash-can fa-1x";
    event.target.style.color = "var(--color-orange)";
}, false);
function click_trashcan() {
    console.log('clicktrashcan');
}
function click_arrowleft() {
    console.log('clickleft');
}
function click_arrowright() {
    console.log('clickright');
}