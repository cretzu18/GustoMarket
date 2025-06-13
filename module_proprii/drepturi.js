
/**
 @typedef Drepturi
 @type {Object}
 @property {Symbol} vizualizareUtilizatori Dreptul de a intra pe  pagina cu tabelul de utilizatori.
 @property {Symbol} stergereUtilizatori Dreptul de a sterge un utilizator
 @property {Symbol} cumparareProduse Dreptul de a cumpara
 @property {Symbol} vizualizareGrafice Dreptul de a vizualiza graficele de vanzari
 @property {Symbol} modificareProduse Dreptul de a modifica un produs
 @property {Symbol} stergeProduse Dreptul de a sterge un produs
 @property {Symbol} adaugaProduse Dreptul de a adauga un produs

 @property {Symbol} vizualizareGrafice Dreptul de a vizualiza graficele de vanzari
 */


/**
 * @name module.exports.Drepturi
 * @type Drepturi
 */
const Drepturi = {
	vizualizareUtilizatori: Symbol("vizualizareUtilizatori"),
	stergereUtilizatori: Symbol("stergereUtilizatori"),
	cumparareProduse: Symbol("cumparareProduse"),
	vizualizareGrafice: Symbol("vizualizareGrafice"),
	modificareProduse: Symbol("modificareProduse"),
	stergeProduse: Symbol("stergeProduse"),
	adaugaProduse: Symbol("adaugaProduse")
}

module.exports=Drepturi;