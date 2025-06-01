window.onload = function() {
    let containerProduse = document.querySelector(".grid-produse");
    let ordineInitialaProduse = Array.from(containerProduse.getElementsByClassName("produs"));

    btn=document.getElementById("filtrare")
    btn.onclick = function() {
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
        for (let prod of produse) { // prod e un tag article
            prod.style.display = "none" // ascundem produsul

            let nume = prod.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase()
            let cond1 = (nume.startsWith(inpNume))

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

            let caract = prod.getElementsByClassName("val-caracteristici")[0].innerHTML.trim().toLowerCase();
            let cond7 = inpCaract.every(c => caract.includes(c.toLowerCase()));

            let tara = prod.getElementsByClassName("val-tara")[0].innerHTML.trim().toLowerCase();
            let cond8 = (tara.startsWith(inpTara))

            if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8) {
                prod.style.display = "block" // afisam produsul
            }
        }
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

    let caracteristici = document.getElementById("inp-caracteristici").value.trim();
    if (caracteristici.length > 0 && !/^[a-zA-Z\s]+$/.test(caracteristici)) {
        alert("Caracteristicile nu sunt valide.");
        return false;
    }

    return true;
}
}