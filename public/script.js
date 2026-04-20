
async function getData(){

}






const data = {
  londres: { départ: "Londres", arrivée: "Paris", dist: "340", horaire:"9:02", places: 48, Nvol:"LP"},
  bruxelles: { départ: "Bruxelles", arrivée: "Paris", dist: "270", horaire:"9:02", places: 48, Nvol:"BP"},
  madrid: { départ: "Madrid", arrivée: "Paris", dist: "1050", horaire:"9:02", places: 48, Nvol:"MP"},
};





function vols(event){
    const rap = data[document.getElementById("vol").value];
    var vol = {
      départ: rap.départ,
      arrivée: rap.arrivée,
      dist: rap.dist,
      horaire: rap.horaire,
      Nvol: rap.Nvol,
    };
    var client= {
        prenom : document.getElementById("prenom").value,
        nom:document.getElementById("nom").value,
    }
    var classe= document.getElementById("classe").value;
    calculer(vol, classe, client);
    event.preventDefault();
}






function calculer(vol, classe, client){
    if (classe === "première") {
        var x = 10;
    } else if (classe === "deuxième"){
        var x = 5;
    }
    if (vol.dist < 10000){
        var tmps= vol.dist / 900;
    } else if (vol.dist > 10000){
        var tmps= vol.dist / 1200;       
    }
    var prix1= (10/100)*vol.dist+(10/100)*vol.dist+20;
    var prix= prix1 + (x/100)*vol.dist;
    post(client, vol, prix, tmps, classe);
}







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
        Nvol: vol.Nvol
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







function afficherBillet(billet){
    document.getElementById("Bnom").innerHTML = billet.Nclient;
    document.getElementById("Bprenom").innerHTML = billet.Pclient;
    document.getElementById("Bdepart").innerHTML = billet.depart;
    document.getElementById("Barrivee").innerHTML = billet.arrivee;
    document.getElementById("Bhoraire").innerHTML = billet.horaire;
    document.getElementById("Bprix").innerHTML = billet.prix + "€";
    document.getElementById("Bclasse").innerHTML = billet.classe;
    document.getElementById("BNvol").innerHTML = billet.Nvol;
}