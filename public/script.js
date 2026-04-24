
let datavols=[];
alert("ATTENTION: ce site consiste en un amusement pour collégiens. Evitez d'entrer vos vraies données personnelles. Ce site n'utilise pas de cookies");

/////////////////////////////////////////////////////////// RECUP/AFFICHER VOLS

async function getData(){
const url = 'https://flygana.onrender.com/vol';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        console.log(data);
        afficherVol(data);
    } catch (error) {
        console.error('Erreur :', error);
        throw error;
    } 
}
getData();



function afficherVol(data){
    for (let i = 0; i < data.length; i++){
    const vol = {
    depart: data[i].depart,
    arrivee: data[i].arrivee,
    horaire: data[i].horaire,
    dist: data[i].dist,
    places: data[i].places,
    Nvol: data[i].Nvol,
    }
    datavols.push(vol);
    const opt = document.createElement("option");
    opt.textContent = vol.depart + "/" + vol.arrivee;
    opt.value = vol.Nvol;
    document.getElementById("vol").appendChild(opt);
    }
}



////////////////////////////////////////////////////////////////////création du billet


function vols(event){
    const rap = datavols.find(v => v.Nvol == document.getElementById("vol").value);
    var vol = {
      départ: rap.depart,
      arrivée: rap.arrivee,
      dist: rap.dist,
      horaire: rap.horaire,
      Nvol: rap.Nvol,
      places: rap.places,
    };
    addplaces(vol);
    resplaces(vol);
    var client= {
        prenom : document.getElementById("prenom").value,
        nom:document.getElementById("nom").value,
    }
    var classe= document.getElementById("classe").value;
    calculer(vol, classe, client);
    event.preventDefault();
}




//Calcul des données supplémentaire (prix, temps)

function calculer(vol, classe, client){
    if (classe === "première") {
        var x = 10;
    } else if (classe === "deuxième"){
        var x = 5;
    }
    var prix1= (10/100)*vol.dist+(10/100)*vol.dist+20;
    var prix= prix1 + (x/100)*prix1;
    if (vol.dist < 10000){
        var tmps= vol.dist / 900;
    } else if (vol.dist > 10000){
        var tmps= vol.dist / 1200;       
    }
    post(client, vol, prix, tmps, classe);
}




//envoi du billet DB


 async function post(client, vol, prix, tmps, classe){
    const billet ={
        Pclient:client.prenom,
        Nclient:client.nom,
        depart: vol.départ,
        arrivee: vol.arrivée,
        horaire: vol.horaire,
        prix,
        tmps,
        classe,
        Nvol: vol.Nvol,
        Vol: false, 
    }
    const url = 'https://flygana.onrender.com/billet';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(billet)
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        const data = await response.json();
        console.log('Réponse du serveur :', data);
        afficherBillet(billet);
    } catch (error) {
        console.error('Erreur :', error);
    }
}




//affichage du billet pour voyageur


function afficherBillet(billet){
    document.getElementById("Bnom").innerHTML = billet.Nclient;
    document.getElementById("Bprenom").innerHTML = billet.Pclient;
    document.getElementById("Bdepart").innerHTML = billet.depart;
    document.getElementById("Barrivee").innerHTML = billet.arrivee;
    document.getElementById("Bhoraire").innerHTML = billet.horaire;
    document.getElementById("Btmps").innerHTML = billet.tmps + "heures";
    document.getElementById("Bprix").innerHTML = billet.prix + "€";
    document.getElementById("Bclasse").innerHTML = billet.classe;
    document.getElementById("BNvol").innerHTML = billet.Nvol;
}


////Validation des places pour reservation:

async function addplaces(vol){
    const url = `https://flygana.onrender.com/place/${vol.Nvol}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        const data = await response.json();
        console.log('Réponse du serveur pour postplaces:', data);
    } catch (error) {
        console.error('Erreur :', error);
    }
}

async function resplaces(vol){
const url = `https://flygana.onrender.com/place/${vol.Nvol}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erreur :', error);
        throw error;
    } 
}
