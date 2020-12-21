//⇓⇓ Récupérer l’information désirée dans l’URL de la page affichée⇓⇓.
const queryString = window.location.search;

//⇓⇓ Affiche l'information ciblée dans la console⇓⇓
console.log(queryString);

//⇓⇓ Récupérer les données de façon formaté⇓⇓
const urlparams = new URLSearchParams(queryString);

//⇓⇓ Affiche les données de façon formaté dans la console⇓⇓
console.log(urlparams);

//⇓⇓ Recuper l’ID du produit ⇓⇓
const productId = urlparams.get("idProduit");

//⇓⇓ Affiche l’ID du produit dazns la console⇓⇓
console.log(productId);

//⇓⇓ Initialise une variable pour calculer le montant total de commande ⇓⇓.
let totalLigne;

//⇓⇓ Fonction qui récuper les informations à envoyer au panier ⇓⇓
function addProduct() {
  let image = produit.imageUrl;

  let name = produit.name;

  let description = produit.description;

  let price = produit.price;

  //⇓⇓ Récuper la couleur sélectionnés par l’utilisateur au format tex t⇓⇓.
  let selectcolor = document.getElementById("couleur");
  let color = selectcolor.options[selectcolor.selectedIndex].text;

  //⇓⇓ Récuper la quantité sélectionnés par l’utilisateur au format numérique ⇓⇓.
  let selectqte = document.getElementById("quantite");
  let qte = selectqte.options[selectqte.selectedIndex].value;

  //⇓⇓ Contrôle si l’utilisateur à bien sélectionner une couleur⇓⇓.
  if (color == "Sélectionnez une couleur") {
    alert("Attention, veuillez saisir une couleur avant de poursuivre");
    return;
  }

  //⇓⇓ Contrôle si l’utilisateur à bien sélectionner une quantité⇓⇓.
  if (!qte) {
    alert("Attention, veuillez saisir une quantité avant de poursuivre");
    return;
  }

  //⇓⇓ Calcule le montant total de commande ⇓⇓.
  totalLigne = price * qte;
  console.log("PRIX LIGNE", totalLigne);

  //⇓⇓ Recuper les informations dans le localStorage et les format en JSON ⇓⇓.
  let oldItems = JSON.parse(localStorage.getItem("panier")) || [];

  //⇓⇓ Met les nouvelles informations au format JSON ⇓⇓.
  let newItem = {
    _id: produit._id,
    image: produit.imageUrl,
    name: produit.name,
    description: produit.description,
    price: produit.price,
    color: color,
    qte: qte,
    totalLigne: totalLigne,
  };

  //⇓⇓ Ajoute les nouvelles informations à la fin du tableau ⇓⇓.
  oldItems.push(newItem);

  //⇓⇓ Met à jour toutes les informations dans le localStorage ⇓⇓.
  localStorage.setItem("panier", JSON.stringify(oldItems));
}

//⇓⇓ Je déclare la variable hors fonction pour étendre son scope⇓⇓
let produit;

//⇓⇓ PARTIE AFFICHAGE DU PRODUIT ⇓⇓

//⇓⇓ Je recuper des données ciblées dans  l’API avec un ID⇓⇓
fetch(`http://localhost:3000/api/teddies/${productId}`).then(function (
  resultat
) {
  resultat.json().then(function (resultatFinal) {
    produit = resultatFinal;

    produit.price = parseFloat(produit.price) / 100;

    //⇓⇓ Création élément 'tr' pour chaque index ⇓⇓.
    let vueProduit = document.createElement("tr");

    //⇓⇓ boucle dynamique qui récupère les couleurs⇓⇓
    let colorsOptions = "";

    produit.colors.forEach((color) => {
      console.log(color);
      colorsOptions += `<option value="${color}">${color}</option>`;
    });

    //⇓⇓ boucle dynamique qui crée les qunatités⇓⇓
    let qteOptions = "";

    for (let i = 1; i <= 10; i++) {
      console.log(i);
      qteOptions += `<option value="${i}">${i}</option>`;
    }

    //⇓⇓ Ecrit le HTML à injecter dans le DOM⇓⇓
    vueProduit.innerHTML = `      
                                
                        <tr>

                                <td ><img src= ${produit.imageUrl} class="imageUrl_product"> </td> 
                                <td class="name_product"> ${produit.name} </td>
                                <td class="description_product"> ${produit.description} </td>  
                                <td class="price_product" > ${produit.price}€ </td>

                                <select class="choix" id="couleur">
                                        <option value="" class="colors_product">Sélectionnez une couleur</option>
                                        ${colorsOptions}
                                </select>                                                                     
                                
                                <select class="choix" id="quantite">
                                        <option value="" class="qte_product">Sélectionnez une quantité</option>
                                        ${qteOptions}

                                </select>
                                
                                <button type="button" class="bouton" onclick = "addProduct()"                   
                                >M'ajouter au Panier</button>

                        </tr>

                        `;

    //⇓⇓ Ecrit les 'tr'  dans HTML ⇓⇓.
    document.querySelector("tbody").appendChild(vueProduit);
  });
});
