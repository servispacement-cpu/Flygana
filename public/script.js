
let datavols=[];
alert("ATTENTION: ce site consiste en un amusement pour collégiens. Evitez d'entrer vos vraies données personnelles. Ce site n'utilise pas de cookies");

/////////////////////////////////////////////////////////// RECUP/AFFICHER VOLS

async function getDataVol(){
const url = 'https://flygana.onrender.com/vol';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        console.log(data);
        datavols = data;
        for (let i = 0; i < data.length; i++){
        const opt = document.createElement("option");
        opt.textContent = data[i].depart + "/" + data[i].arrivee + ", le " + data[i].date + " à " +data[i].horaire;
        opt.value = data[i].Nvol;
    document.getElementById("vol").appendChild(opt);
    }
    } catch (error) {
        console.error('Erreur :', error);
        throw error;
    } 
}
getDataVol();







////////////////////////////////////////////////////////////////////création du billet


async function vols(event){
    const rap = datavols.find(v => v.Nvol == document.getElementById("vol").value);
    var vol = {
      départ: rap.depart,
      arrivée: rap.arrivee,
      tmps: rap.tmps,
      dist: rap.dist,
      date: rap.date,
      horaire: rap.horaire,
      Nvol: rap.Nvol,
      places: undefined,
    };
    var client= {
    prenom: document.getElementById("prenom").value,
    nom:document.getElementById("nom").value,
    classe: document.getElementById("classe").value,
    }
    if (client.classe === "première"){vol.places = rap.places1;}
    else if (client.classe === "deuxième"){vol.places = rap.places2;}
    event.preventDefault();
    const placeok = await resplaces(vol, client);
    if (placeok === false){
        alert("Désolé, il n'y a plus de places dans l'avion pour la classe " + client.classe);
        return;
    }
    calculer(vol, client);
}

//Compteur de places

async function resplaces(vol, client){
const url = `https://flygana.onrender.com/place/${encodeURIComponent(vol.Nvol)}/${encodeURIComponent(client.classe)}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        console.log("Nombre de billet pris pour " + vol.Nvol + " pour la classe " + client.classe  + " : " + data);
        if (data < vol.places){
            return (true);
        } else {
            return (false);
        }
    } catch (error) {
        console.error('Erreur :', error);
        throw error;
    } 
}


//Calcul des données supplémentaire (prix, temps)

function calculer(vol, client){
    if (client.classe === "première") {
        var x = 10;
    } else if (client.classe === "deuxième"){
        var x = 5;
    }
    var prix= (20/100)*vol.dist+20+(x/100)*(0.1)*vol.dist+(10/100)*vol.dist+20;
    post(client, vol, prix);
}




//envoi du billet DB


 async function post(client, vol, prix){
    const billet ={
        Pclient:client.prenom,
        Nclient:client.nom,
        depart: vol.départ,
        arrivee: vol.arrivée,
        date: vol.date,
        horaire: vol.horaire,
        prix,
        tmps: vol.tmps,
        classe: client.classe,
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



