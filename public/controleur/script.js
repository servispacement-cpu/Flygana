
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
        //créer x divs en fct du nombre de Nvol diff.
        //const x = new Set(data.map(item => item.Nvol)).size;   
        //Regrouper chaque billet dans la div qui corespond à son Nvol
        for (let i = 0; i < data.length; i++){
        const div = document.getElementById("cont");
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
        div.appendChild(h3p);
        div.appendChild(h3n);
        div.appendChild(h3d);
        div.appendChild(h3a);
        div.appendChild(h3h);
        div.appendChild(h3c);
        div.appendChild(h3nv);
        div.appendChild(hr);
        document.getElementById("delBilSet").appendChild(opt);
    }
    } catch(err){
        console.error(err);
    }
}

afficherBillet();


//////////////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////////

async function createVol(event){
    const vol = {
        depart: document.getElementById("Adep").value,
        arrivee: document.getElementById("Aarr").value,
        dist:  document.getElementById("dist").value,
        horaire:  document.getElementById("horaire").value,
        places:  document.getElementById("places").value,
        Nvol:  document.getElementById("Nvol").value,
        Vol: true,
    };
    if (!vol.Nvol){
        alert("Veuillez selectionner un numéro de vol")
        return;
    } 
    event.preventDefault();
    const url = 'https://flygana.onrender.com/vol';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vol),
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        const data = await response.json();
        console.log('Réponse du serveur :', data);
        alert("Votre vol, dont le muméro est " + vol.Nvol + " a bien été créé. Veillez consulter régulièrement cette page afin de surveiller les réservation")
    } catch (error) {
        console.error('Erreur :', error);
    } 
}





