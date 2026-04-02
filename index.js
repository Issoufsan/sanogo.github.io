const fichiers = [
    "0000000.jpg",
    "0001101-barbe.jpg",
    "0011100.jpg",
    "0100011 - pas de moustache.jpg",
    "0100101.jpg",
    "0101010.jpg",
    "0101111-moustache.jpg",
    "0110110.jpg",
    "0111001.jpg",
    "1001001.jpg",
    "1010101.jpg",
    "1011010.jpg",
    "1100011.jpg",
    "1100110-moustache.jpg",
    "1101100.jpg",
    "1110000.jpg",
    "1111111.jpg"
];

const personnages = fichiers.map(fichier => {
    const code = fichier.substring(0, 7);
    return {
        id: code,
        fichier: fichier,
        lunettes: code[0] === '1',
        moustache: code[1] === '1',
        chapeau: code[2] === '1',
        cheveux: code[3] === '1',
        boucle: code[4] === '1',
        barbe: code[5] === '1',
        noeud: code[6] === '1'
    };
});

let choixUtilisateur = {};

function filtrerPersonnages(choix = choixUtilisateur) {
    return personnages.filter(p => {
        for (let key in choix) {
            if (p[key] !== choix[key]) {
                return false;
            }
        }
        return true;
    });
}

function mettreAJourResultat(resultats) {
    const resultat = document.getElementById('resultat');

    if (resultats.length === 1) {
        resultat.innerHTML = "Tu pensais à : <br><br><img src='" + resultats[0].fichier + "' width='150' style='margin:auto'>";
    } else if (resultats.length > 1) {
        resultat.innerText = "Il reste " + resultats.length + " possibilités, réponds à plus de questions puis reclique sur le bouton.";
    } else {
        resultat.innerText = "Aucun personnage ne correspond à tes choix.";
    }
}

function reinitialiserBoutonsQuestion(parent) {
    const boutons = parent.querySelectorAll('button');
    boutons.forEach(b => b.style.backgroundColor = '#fff');
}

function reinitialiser() {
    choixUtilisateur = {};
    const grille = document.getElementById('grille-personnages');
    grille.innerHTML = '';
    
    personnages.forEach(p => {
        const div = document.createElement('div');
        div.className = 'personnage';
        div.id = 'p-' + p.id;
        div.innerHTML = '<img src="' + p.fichier + '" alt="' + p.id + '">'; 
        grille.appendChild(div);
    });
    document.getElementById('resultat').innerText = '';
    
    const boutons = document.querySelectorAll('.question-item button');
    boutons.forEach(b => b.style.backgroundColor = '#fff');
}

function verifier(caracteristique, valeur, btn) {
    const parent = btn.parentElement;
    choixUtilisateur[caracteristique] = valeur;
    reinitialiserBoutonsQuestion(parent);
    btn.style.backgroundColor = '#add8e6';
}

function afficherReponse() {
    if (Object.keys(choixUtilisateur).length === 0) {
        document.getElementById('resultat').innerText = "Choisis au moins une option avant de demander la réponse.";
        return;
    }

    const resultats = filtrerPersonnages();
    mettreAJourResultat(resultats);
}

reinitialiser();
