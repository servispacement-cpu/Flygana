
var vitM = 900;
var vitL = 1200;


const data = {
  londres: { départ: "Londres", arrivée: "Paris", dist: "5000", horaire:"-9:02", places: 48},
  bruxelles: { départ: "Londres", arrivée: "Paris", dist: "5000", horaire:"-9:02", places: 48},
  madrid: { départ: "Londres", arrivée: "Paris", dist: "5000", horaire:"-9:02", places: 48},
};


function vols(event){
    const rap = data[document.getElementById("vol").value];
    //var place=1,
    //requetePost(place)
    //if (requeteGet(place) > rap.places){ return }
    var vol = {
      départ: rap.départ,
      arrivée: rap.arrivée,
      dist: rap.dist,
      horaire: rap.horaire,
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
        var tmps= vol.dist / vitM;
    } else if (vol.dist > 10000){
        var tmps= vol.dist / vitL;       
    }
    var prix1= (10/100)*vol.dist+(10/100)*vol.dist+20;
    var prix= prix1 + (x/100)*vol.dist;
    var billet={
        Pclient:client.prenom,
        Nclient:client.nom,
        départ: vol.départ,
        arrivée: vol.arrivée,
        horaire:vol.horaire,
        prix:prix,
        tmps:tmps,
        classe:classe,
    }
    afficherBillet(billet);
}

function afficherBillet(billet){
    document.getElementById("Bnom").innerHTML = billet.Nclient;
    document.getElementById("Bprenom").innerHTML = billet.Pclient;
    document.getElementById("Bdepart").innerHTML = billet.départ;
    document.getElementById("Barrivee").innerHTML = billet.arrivée;
    document.getElementById("Bhoraire").innerHTML = billet.horaire;
    document.getElementById("Bprix").innerHTML = billet.prix + "€";
    document.getElementById("Bclasse").innerHTML = billet.classe;
}