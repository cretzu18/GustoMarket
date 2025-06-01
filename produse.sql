DROP TYPE IF EXISTS categ_produs;

CREATE TYPE categ_produs AS ENUM('legume', 'fructe', 'lactate', 'cereale', 'carne');
CREATE TYPE categ_ambalaj AS ENUM('vidat', 'cutie', 'punga', 'sticla', 'neambalat');

CREATE TABLE IF NOT EXISTS produse (
	id serial PRIMARY KEY,
	nume VARCHAR(50) UNIQUE NOT NULL,
	descriere TEXT,
	imagine VARCHAR(300),
	tip_produs categ_produs DEFAULT 'legume',
	tara VARCHAR(100) NOT NULL,
	pret NUMERIC(8,2) NOT NULL CHECK (pret >= 0),
	gramaj INT NOT NULL CHECK (gramaj >= 0),
	data_expirare TIMESTAMP,
	tip_ambalaj categ_ambalaj,
	caracteristici VARCHAR[],
	vegan BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO produse (
    nume, descriere, imagine, tip_produs, tara, pret, gramaj,
    data_expirare, tip_ambalaj, caracteristici, vegan
) VALUES (
    'Morcovi', 'Morcovi proaspeți crescuți în soluri fertile, ideali pentru supe și salate.', 'resurse/imagini/produse/morcovi.jpg', 'legume', 'Germania',
    23.54, 1450, '2025-11-13', 'punga',
    ARRAY['local', 'fără conservanți'], TRUE
);
INSERT INTO produse (
    nume, descriere, imagine, tip_produs, tara, pret, gramaj,
    data_expirare, tip_ambalaj, caracteristici, vegan
) VALUES (
    'Cartofi', 'Cartofi românești, ideali pentru prăjit sau copt.', 'resurse/imagini/produse/cartofi.jpg', 'legume', 'Olanda',
    37.13, 595, '2025-11-20', 'sticla',
    ARRAY['proaspăt', 'timp gătire scurt'], TRUE
);
INSERT INTO produse (
    nume, descriere, imagine, tip_produs, tara, pret, gramaj,
    data_expirare, tip_ambalaj, caracteristici, vegan
) VALUES (
    'Mere', 'Mere roșii crocante, dulci și suculente, recoltate din livezi locale.', 'resurse/imagini/produse/mere.jpg', 'fructe', 'Spania',
    25.02, 1264, '2025-10-07', 'neambalat',
    ARRAY['pentru copii', 'ambalaj reciclabil'], TRUE
);
INSERT INTO produse (
    nume, descriere, imagine, tip_produs, tara, pret, gramaj,
    data_expirare, tip_ambalaj, caracteristici, vegan
) VALUES (
    'Banane', 'Banane coapte natural, perfecte pentru gustări rapide.', 'resurse/imagini/produse/banane.jpg', 'fructe', 'Spania',
    15.3, 814, '2025-07-28', 'vidat',
    ARRAY['eco', 'fără zahăr'], TRUE
);
INSERT INTO produse (
    nume, descriere, imagine, tip_produs, tara, pret, gramaj,
    data_expirare, tip_ambalaj, caracteristici, vegan
) VALUES (
    'Lapte integral', 'Lapte integral pasteurizat, sursă naturală de calciu.', 'resurse/imagini/produse/lapte_integral.jpg', 'lactate', 'România',
    41.47, 1324, '2025-09-20', 'cutie',
    ARRAY['bio', 'gust intens'], FALSE
);
INSERT INTO produse (
    nume, descriere, imagine, tip_produs, tara, pret, gramaj,
    data_expirare, tip_ambalaj, caracteristici, vegan
) VALUES (
    'Brânză telemea', 'Brânză telemea maturată, cu gust autentic.', 'resurse/imagini/produse/branza_telemea.jpg', 'lactate', 'Germania',
    38.81, 669, '2025-11-23', 'vidat',
    ARRAY['pentru copii', 'ambalaj reciclabil'], FALSE
);
INSERT INTO produse (
    nume, descriere, imagine, tip_produs, tara, pret, gramaj,
    data_expirare, tip_ambalaj, caracteristici, vegan
) VALUES (
    'Fulgi de ovăz', 'Fulgi de ovăz integrali, ideali pentru un mic dejun sănătos.', 'resurse/imagini/produse/fulgi_de_ovaz.jpg', 'cereale', 'Franța',
    39.14, 834, '2025-08-19', 'sticla',
    ARRAY['eco', 'fără zahăr'], TRUE
);
INSERT INTO produse (
    nume, descriere, imagine, tip_produs, tara, pret, gramaj,
    data_expirare, tip_ambalaj, caracteristici, vegan
) VALUES (
    'Musli cu fructe', 'Amestec de cereale și fructe uscate, fără zahăr adăugat.', 'resurse/imagini/produse/musli_cu_fructe.jpg', 'cereale', 'Olanda',
    20.16, 932, '2025-10-24', 'sticla',
    ARRAY['proaspăt', 'timp gătire scurt'], TRUE
);
INSERT INTO produse (
    nume, descriere, imagine, tip_produs, tara, pret, gramaj,
    data_expirare, tip_ambalaj, caracteristici, vegan
) VALUES (
    'Piept de pui', 'Piept de pui dezosat, crescut fără hormoni.', 'resurse/imagini/produse/piept_de_pui.jpg', 'carne', 'Italia',
    21.86, 1186, '2025-08-05', 'punga',
    ARRAY['eco', 'fără zahăr'], FALSE
);
INSERT INTO produse (
    nume, descriere, imagine, tip_produs, tara, pret, gramaj,
    data_expirare, tip_ambalaj, caracteristici, vegan
) VALUES (
    'Mușchi de porc', 'Mușchi de porc fraged, ideal pentru fripturi.', 'resurse/imagini/produse/muschi_de_porc.jpg', 'carne', 'România',
    24.73, 511, '2025-08-07', 'vidat',
    ARRAY['local', 'fără conservanți'], FALSE
);
INSERT INTO produse (nume, descriere, imagine, tip_produs, tara, pret, gramaj, data_expirare, tip_ambalaj, caracteristici, vegan)
VALUES (
  'Ardei gras', 'Ardei gras românesc, proaspăt și zemos, ideal pentru salate.',
  'resurse/imagini/produse/ardei_gras.jpg', 'legume', 'România', 5.99, 500,
  '2025-08-01', 'punga', ARRAY['proaspăt', 'bio', 'gust dulce'], TRUE
);

INSERT INTO produse (nume, descriere, imagine, tip_produs, tara, pret, gramaj, data_expirare, tip_ambalaj, caracteristici, vegan)
VALUES (
  'Caise', 'Caise coapte natural, bogate în vitamine.',
  'resurse/imagini/produse/caise.jpg', 'fructe', 'Turcia', 7.50, 750,
  '2025-07-10', 'punga', ARRAY['fără conservanți', 'vitamina A', 'textură moale'], TRUE
);

INSERT INTO produse (nume, descriere, imagine, tip_produs, tara, pret, gramaj, data_expirare, tip_ambalaj, caracteristici, vegan)
VALUES (
  'Cașcaval afumat', 'Cașcaval afumat cu gust intens, produs tradițional.',
  'resurse/imagini/produse/cascaval_afumat.jpg', 'lactate', 'România', 18.90, 400,
  '2025-09-20', 'vidat', ARRAY['gust intens', 'produs local', 'maturat'], FALSE
);

INSERT INTO produse (nume, descriere, imagine, tip_produs, tara, pret, gramaj, data_expirare, tip_ambalaj, caracteristici, vegan)
VALUES (
  'Pâine integrală', 'Pâine integrală cu semințe, coaptă pe vatră.',
  'resurse/imagini/produse/paine_integrala.jpg', 'cereale', 'Germania', 6.25, 600,
  '2025-06-15', 'cutie', ARRAY['fără aditivi', 'bogată în fibre', 'cu semințe'], TRUE
);

INSERT INTO produse (nume, descriere, imagine, tip_produs, tara, pret, gramaj, data_expirare, tip_ambalaj, caracteristici, vegan)
VALUES (
  'Pulpe de pui', 'Pulpe de pui fragede, gata de gătit.',
  'resurse/imagini/produse/pulpe_de_pui.jpg', 'carne', 'Polonia', 14.80, 1000,
  '2025-06-30', 'vidat', ARRAY['proaspăt', 'tăiat manual', 'fără os'], FALSE
);

INSERT INTO produse (nume, descriere, imagine, tip_produs, tara, pret, gramaj, data_expirare, tip_ambalaj, caracteristici, vegan)
VALUES (
  'Roșii cherry', 'Roșii cherry dulci și zemoase, ideale pentru salate și gustări.',
  'resurse/imagini/produse/rosii_cherry.jpg', 'legume', 'Spania', 8.40, 300,
  '2025-07-05', 'punga', ARRAY['proaspăt', 'bio', 'gust dulce'], TRUE
);

INSERT INTO produse (nume, descriere, imagine, tip_produs, tara, pret, gramaj, data_expirare, tip_ambalaj, caracteristici, vegan)
VALUES (
  'Mere Golden', 'Mere Golden crocante și aromate, perfecte pentru consum zilnic.',
  'resurse/imagini/produse/mere_golden.jpg', 'fructe', 'România', 4.50, 700,
  '2025-08-10', 'neambalat', ARRAY['dulce', 'suplu', 'proaspăt'], TRUE
);

INSERT INTO produse (nume, descriere, imagine, tip_produs, tara, pret, gramaj, data_expirare, tip_ambalaj, caracteristici, vegan)
VALUES (
  'Iaurt natural', 'Iaurt natural cu gust proaspăt, bogat în probiotice.',
  'resurse/imagini/produse/iaurt_natural.jpg', 'lactate', 'România', 3.20, 150,
  '2025-06-20', 'sticla', ARRAY['fără zahăr', 'fără conservanți', 'proaspăt'], TRUE
);

INSERT INTO produse (nume, descriere, imagine, tip_produs, tara, pret, gramaj, data_expirare, tip_ambalaj, caracteristici, vegan)
VALUES (
  'Făină integrală', 'Făină integrală de grâu, ideală pentru pâine și produse de panificație sănătoase.',
  'resurse/imagini/produse/faina_integrala.jpg', 'cereale', 'România', 5.75, 1000,
  '2025-12-31', 'punga', ARRAY['bio', 'neprocesată', 'bogată în fibre'], TRUE
);