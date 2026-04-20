
async function getBillet(){
        const url = 'https://flygana.onrender.com/billets';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        return(data);
    } catch (error) {
        console.error('Erreur :', error);
        throw error;
    } 
}





async function afficherBillet(){
    try{
        const data = await getBillet();
        console.log(data);

        for (let i = 0; i < data.length; i++){
        const h3p = document.createElement("h3");
        const h3n = document.createElement("h3");
        const h3d = document.createElement("h3");
        const h3a = document.createElement("h3");
        const h3h = document.createElement("h3");
        const h3c = document.createElement("h3");
        const h3nv = document.createElement("h3");
        const hr = document.createElement("hr");
        const opt = document.createElement("option");
        h3p.textContent = "Prenom du client: " + data[i].Pclient;
        h3n.textContent = "Nom du client: " + data[i].Nclient;
        h3d.textContent = "Aeroport de depart du client: " + data[i].depart;
        h3a.textContent = "Aeroport d'arivee du client: " + data[i].arrivee;
        h3h.textContent = "Horaire du vol du client: "+data[i].horaire;
        h3c.textContent = "Classe de vol du client: " +data[i].classe;
        h3nv.textContent = "Numéro de vol: " +data[i].Nvol;
        opt.textContent = data[i].Nvol;
        document.getElementById("cont").appendChild(h3p);
        document.getElementById("cont").appendChild(h3n);
        document.getElementById("cont").appendChild(h3d);
        document.getElementById("cont").appendChild(h3a);
        document.getElementById("cont").appendChild(h3h);
        document.getElementById("cont").appendChild(h3c);
        document.getElementById("cont").appendChild(h3nv);
        document.getElementById("cont").appendChild(hr);
        document.getElementById("delBilSet").appendChild(opt);
    }
    } catch(err){
        console.error(err);
    }
}

afficherBillet();

document.getElementById("supbil").addEventListener("click" , delBil );

async function delBil(){
    const Nvol = document.getElementById("delBilSet").value;
    const url = `https://flygana.onrender.com/delBil/${encodeURIComponent(Nvol)}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        alert("Les billets du vol " + data.deleted +" ont été supprimés. Veillez rafraichir la page.");
    } catch (error) {
        console.error('Erreur :', error);
    } 
    } 


function createVol(event){
    event.preventDefault();
}





