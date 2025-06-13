window.addEventListener("DOMContentLoaded", function () {
    const tema = localStorage.getItem("tema") || "light";
    const select = document.getElementById("select_tema");

    document.body.classList.remove("dark", "solarized");
    if (tema !== "light") {
        document.body.classList.add(tema);
    }

    if (select) {
        select.value = tema;
    }
});