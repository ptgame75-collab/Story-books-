function showBhawana() {
    var section = document.getElementById("messageSection");
    section.style.display = "block";
    // क्लिक गरेपछि बिस्तारै तल सार्ने (Scroll)
    window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
}
