window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("article.produs").forEach(prod => {
        if (sessionStorage.getItem("hide-" + prod.id) === "1") {
            prod.remove();
        }
    });
    afiseazaContainerComparare();
});

window.onload = function() {
    btnCompare = document.querySelectorAll(".btn-compare");
    btnCompare.forEach(btn => {
        btn.addEventListener("click", function() {
            const idProdus = this.getAttribute("data-id");
            const numeProdus = this.getAttribute("data-nume");
            adaugaLaComparare(idProdus, numeProdus);
        });
    });

    let containerProduse = document.querySelector(".grid-produse");
    let ordineInitialaProduse = Array.from(containerProduse.getElementsByClassName("produs"));

    
    let inputuri = [
        "inp-nume", "inp-tara", "inp-gramaj", "inp-categorie", "inp-data-expirare", "inp-caracteristici" 
    ]

    for (let id of inputuri) {
        let element = document.getElementById(id);
        if (element) {
            element.addEventListener("input", filtrareProduse);
            element.addEventListener("change", filtrareProduse);
        }
    }

    document.querySelectorAll('input[name="tip_ambalaj"]').forEach(elem =>
        elem.addEventListener("change", filtrareProduse)
    );

    document.querySelectorAll('input[name="vegan"]').forEach(elem =>
        elem.addEventListener("change", filtrareProduse)
    );

    document.querySelectorAll(".selecteaza-produs").forEach(controlContainer => {
        const produs = controlContainer.closest("article.produs");
        const id = produs.id; 

        const btnKeep = controlContainer.querySelector(".btn-keep");
        const btnHideTemp = controlContainer.querySelector(".btn-hide-temp");
        const btnHidePerm = controlContainer.querySelector(".btn-hide-perm");

        btnKeep.addEventListener("click", () => {
            produs.classList.toggle("keep");
            btnKeep.classList.toggle("active");
            const locked = "🔒";
            const unlocked = "🔓";
            btnKeep.textContent = btnKeep.textContent === unlocked ? locked : unlocked;
        });

        btnHideTemp.addEventListener("click", () => {
            produs.style.display = "none";
        });

        btnHidePerm.addEventListener("click", () => {
            sessionStorage.setItem("hide-" + id, "1");
            produs.remove();
        });
    });

    function filtrareProduse(){
        if (!validareInputuri()) {
            return;
        }
        let inpNume = document.getElementById("inp-nume").value.trim().toLowerCase()
        let inpGramaj = parseFloat(document.getElementById("inp-gramaj").value)
        let inpCategorie = document.getElementById("inp-categorie").value.trim().toLowerCase()
        let inpDataExp = Array.from(document.getElementById("inp-data-expirare").selectedOptions).map(opt => opt.value);
        let inpTextarea = document.getElementById("inp-caracteristici").value.trim().toLowerCase();
        let inpCaract = inpTextarea.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        let inpTara = document.getElementById("inp-tara").value.trim().toLowerCase();

        let produse = document.getElementsByClassName("produs")
        let toateAscunse = true
        for (let prod of produse) { // prod e un tag article
            if (prod.classList.contains("keep")) continue;
            prod.style.display = "none" // ascundem produsul

            let nume = prod.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase()
            let numeFaraDiacritice = stergeDiacritice(nume)
            let cond1 = (nume.startsWith(inpNume) || numeFaraDiacritice.startsWith(inpNume))

            let vectRadio = document.getElementsByName("tip_ambalaj")
            let tipAmbalaj = null
            for (let rad of vectRadio) {
                if (rad.checked) {
                    tipAmbalaj = rad.value.toLowerCase()
                    break
                }
            }
            let ambalaj = prod.getElementsByClassName("val-ambalaj")[0].innerHTML.toLowerCase()
            let cond2 = (tipAmbalaj == "oricare" || ambalaj == tipAmbalaj)

            let gramaj = parseFloat(prod.getElementsByClassName("val-gramaj")[0].innerHTML)
            let cond3 = (gramaj >= inpGramaj)

            let categorie = prod.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase()
            let cond4 = (inpCategorie == "oricare" || categorie == inpCategorie)

            let vectRadio2 = document.getElementsByName("vegan")
            let tipVegan = null
            for (let rad of vectRadio2) {
                if (rad.checked) {
                    tipVegan = rad.value.toLowerCase()
                    break
                }
            }
            let vegan = prod.getElementsByClassName("val-vegan")[0].innerHTML.toLowerCase()
            let cond5 = (tipVegan == "toate" || vegan == tipVegan)

            
            let dataExp = prod.getElementsByClassName("val-data-expirare")[0].getAttribute("datetime");
            dataExp = new Date(dataExp);
            let azi = new Date();
            let ani = dataExp.getFullYear() - azi.getFullYear();
            let luni = dataExp.getMonth() - azi.getMonth();
            let luniRamase = ani * 12 + luni; 
            let cond6 = (inpDataExp.length == 0)
            for (let luni of inpDataExp) {
                if (
                    (luni === "0-3" && luniRamase >= 0 && luniRamase < 3) ||
                    (luni === "3-6" && luniRamase >= 3 && luniRamase < 6) ||
                    (luni === "6-12" && luniRamase >= 6 && luniRamase < 12) ||
                    (luni === "12+" && luniRamase >= 12)
                ) {
                    cond6 = true;
                    break;
                }
            }

            let caract = stergeDiacritice(prod.getElementsByClassName("val-caracteristici")[0].innerHTML.trim().toLowerCase());
            let cond7 = inpCaract.every(c => caract.includes(stergeDiacritice(c.toLowerCase())));


            let tara = prod.getElementsByClassName("val-tara")[0].innerHTML.trim().toLowerCase()
            let taraFaraDiacritice = stergeDiacritice(tara)
            let cond8 = (tara.startsWith(inpTara) || taraFaraDiacritice.startsWith(inpTara))

            if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8) {
                prod.style.display = "block" // afisam produsul
                toateAscunse = false
            }

            mesaj = document.getElementById("mesajFaraProduse")
            if (toateAscunse == true)
                mesaj.style.display = "block"
            else
                mesaj.style.display = "none"
        }
    }

    function stergeDiacritice(str) {
    const diacriticeMap = {
        'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ş': 's', 'ț': 't', 'ţ': 't',
        'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ş': 'S', 'Ț': 'T', 'Ţ': 'T'
    };
    
    return str.replace(/[ăâîșşțţĂÂÎȘŞȚŢ]/g, match => diacriticeMap[match] || match);
    }

    document.getElementById("inp-gramaj").onchange = function() {
        document.getElementById("infoRange").innerHTML = `(${this.value})`;
    }

    document.getElementById("resetare").onclick = function() {
        if (!validareInputuri()) {
            return;
        }
        if (!confirm("Sigur doriți să resetați filtrele?")) {
            return;
        }
        document.getElementById("inp-nume").value = "";
        document.getElementById("inp-gramaj").value = 0;
        document.getElementById("infoRange").innerHTML = "(0)";
        document.getElementById("inp-categorie").value = "oricare";
        document.getElementById("inp-tara").value = "";
        document.getElementById("inp-data-expirare").selectedIndex = -1;
        document.getElementById("inp-caracteristici").value = "";
        document.querySelectorAll('input[name="tip_ambalaj"]').forEach(input => {
            input.checked = false;
        })
        if (document.querySelector('input[name="tip_ambalaj"][value="oricare"]')) {
            document.querySelector('input[name="tip_ambalaj"][value="oricare"]').checked = true;
        }
        document.querySelectorAll('input[name="vegan"]').forEach(input => {
            input.checked = false;
        })
        if (document.querySelector('input[name="vegan"][value="toate"]')) {
            document.querySelector('input[name="vegan"][value="toate"]').checked = true;
        }
        
        let produse = document.getElementsByClassName("produs");
        for (let prod of produse) {
            prod.style.display = "block";
        }
        for (let prod of ordineInitialaProduse) {
            containerProduse.appendChild(prod);
        }
        mesaj = document.getElementById("mesajFaraProduse")
        mesaj.style.display = "none"
    }

    document.getElementById("sortCrescNume").onclick=function(){
        if (!validareInputuri()) {
            return;
        }
        sorteaza(1)
    }
    document.getElementById("sortDescrescNume").onclick=function(){
        if (!validareInputuri()) {
            return;
        }
        sorteaza(-1)
    }

    function sorteaza(semn){
        let produse= document.getElementsByClassName("produs");
        let vProduse= Array.from(produse);
        vProduse.sort(function(a,b){
            let pretA=parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML.trim())
            let pretB=parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML.trim())
            if (pretA!=pretB){
                return semn*(pretA-pretB)
            }
            let numeA=a.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase()
            let numeB=b.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase()
            return semn*numeA.localeCompare(numeB)
        })
        for (let prod of vProduse){
            prod.parentNode.appendChild(prod);
        }
    }

    document.getElementById("calcSuma").onclick = function() {
        if (!validareInputuri()) {
            return;
        }
        let produse= document.getElementsByClassName("produs")
        sumaPreturi=0
        for (let prod of produse){
            if(prod.style.display!="none"){
                let pret=parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML.trim())
                sumaPreturi+=pret
            }
        }
        if(!document.getElementById("suma_preturi")){
            let pRezultat=document.createElement("p") //<p></p>
            pRezultat.innerHTML = `Suma totală: ${sumaPreturi.toFixed(2)} RON.`;
            pRezultat.id="suma_preturi"
            let p= document.getElementById("p-suma")
            p.parentNode.insertBefore(pRezultat, p.nextElementSibling)
            setTimeout(function(){
                let p1=document.getElementById("suma_preturi")
                if(p1){
                    p1.remove()
                }
            }, 2000)
        }
    }

    function validareInputuri() {
    let inpNume = document.getElementById("inp-nume").value.trim();
    if (inpNume.length > 0 && !/^[a-zA-Z\s]+$/.test(inpNume)) {
        alert("Numele nu este valid.");
        return false;
    }

    let inpTara = document.getElementById("inp-tara").value.trim();
    if (inpTara.length > 0 && !/^[a-zA-Z\s]+$/.test(inpTara)) {
        alert("Țara nu este validă.");
        return false;
    }

    let textArea = document.getElementById("inp-caracteristici");
    let caracteristici = document.getElementById("inp-caracteristici").value.trim();
    textArea.classList.remove('is-invalid');
    if (caracteristici.length > 0 && !/^[a-zA-Z\s]+$/.test(caracteristici)) {
        alert("Caracteristicile nu sunt valide.");
        textArea.classList.add('is-invalid');
        return false;
    }

    return true;
}
}

function adaugaLaComparare(idProdus, numeProdus) {
    let produse = JSON.parse(localStorage.getItem("produseComparate")) || [];
    const now = new Date().getTime();

    produse = produse.filter(p => now - p.timestamp < 24 * 60 * 60 * 1000);

    if (produse.length >= 2 || produse.some(p => p.id === idProdus)) return;

    produse.push({ id: idProdus, nume: numeProdus, timestamp: now });
    localStorage.setItem("produseComparate", JSON.stringify(produse));
    afiseazaContainerComparare();
}

function afiseazaContainerComparare() {
    let produse = JSON.parse(localStorage.getItem("produseComparate")) || [];
    const now = new Date().getTime();

    produse = produse.filter(p => now - p.timestamp < 24 * 60 * 60 * 1000);
    if (produse.length === 0) {
        document.getElementById("container-comparare")?.remove();
        return;
    }

    let container = document.getElementById("container-comparare");
    if (!container) {
        container = document.createElement("div");
        container.id = "container-comparare";
        container.style.position = "fixed";
        container.style.bottom = "10px";
        container.style.left = "10px";
        container.style.background = "cyan";
        container.style.padding = "10px";
        document.body.appendChild(container);
    }

    container.innerHTML = produse.map((p, i) =>
        `<span>${p.nume} <button onclick="stergeComparat(${i})">❌</button></span>`
    ).join("<br>");

    if (produse.length === 2) {
        container.innerHTML += `<br><button onclick="afiseazaComparatie()">Afișează compararea</button>`;
        dezactiveazaButoaneComparare();
    } else {
        activeazaButoaneComparare();
    }
}

function stergeComparat(index) {
    let produse = JSON.parse(localStorage.getItem("produseComparate")) || [];
    produse.splice(index, 1);
    localStorage.setItem("produseComparate", JSON.stringify(produse));
    afiseazaContainerComparare();
}

function dezactiveazaButoaneComparare() {
    document.querySelectorAll(".btn-compare").forEach(btn => {
        btn.disabled = true;
        btn.title = "Ștergeți un produs din lista de comparare";
    });
}

function activeazaButoaneComparare() {
    document.querySelectorAll(".btn-compare").forEach(btn => {
        btn.disabled = false;
        btn.title = "";
    });
}

function afiseazaComparatie() {
    const produse = JSON.parse(localStorage.getItem("produseComparate"));
    if (produse.length !== 2) return;

    const url = `/comparatie?id1=${produse[0].id}&id2=${produse[1].id}`;
    window.open(url, "_blank");
}