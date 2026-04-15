
var vitM = 900;
var vitL = 1200;


const data = {
  londres: { arp: "Londres", dist: "5000", horairePD:"-9:02", horairePA: "56:12" },
  bruxelles: { arp: "Charleroi", dist: "3000" , horairePD:"15:03", horairePA: "-56:12"},
  madrid: { arp: "Madrid", dist: "5000", horairePD:"12:55", horairePA: "24:01" },
};


function vols(event){
    const rap = data[document.getElementById("dest").value];
    var vol = {
      arp: rap.arp,
      dist: rap.dist,
      horairePD: rap.horairePD,
      horairePA: rap.horairePA,
      paris: document.getElementById("paris").value,
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
    var fin={
        Pclient:client.prenom,
        Nclient:client.nom,
        arp: vol.arp,
        paris:vol.paris,
        horairePD:vol.horairePD,
        horairePA:vol.horairePA,
        prix:prix,
        tmps:tmps,
        classe:classe,
    }
    afficherBillet(fin);
}

function afficherBillet(fin){
    if (fin.paris === "dep"){
        document.getElementById("Bdep").innerHTML = "Paris ORY";
        document.getElementById("Barr").innerHTML = fin.arp;
        document.getElementById("Bhoraire").innerHTML = fin.horairePD;
    } else if (fin.paris === "arr"){
        document.getElementById("Bdep").innerHTML = fin.arp;
        document.getElementById("Barr").innerHTML = "Paris ORY";
        document.getElementById("Bhoraire").innerHTML = fin.horairePA;
    }
    document.getElementById("Bnom").innerHTML = fin.Nclient;
    document.getElementById("Bprenom").innerHTML = fin.Pclient;
    document.getElementById("Bprix").innerHTML = fin.prix + "€";
    document.getElementById("Bclasse").innerHTML = fin.classe;
}