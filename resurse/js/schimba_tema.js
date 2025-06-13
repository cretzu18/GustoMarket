window.addEventListener("DOMContentLoaded", function(){
    const select = document.getElementById("select_tema");

    select.addEventListener("change", function () {
        const temaSelectata = select.value;

        aplicaTema(temaSelectata);

        if (temaSelectata === "light") {
            localStorage.removeItem("tema");
        } else {
            localStorage.setItem("tema", temaSelectata);
        }
    });

    function aplicaTema(tema) {
        document.body.classList.remove("dark", "solarized");
        if (tema !== "light") {
            document.body.classList.add(tema);
        }
    }
})