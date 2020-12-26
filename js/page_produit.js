//⇓⇓ Récupérer le paramètre désirée dans l’URL de la page affichée⇓⇓.
const queryString = window.location.search;

//⇓⇓ Affiche l'information ciblée dans la console⇓⇓
console.log(queryString);

//⇓⇓ Récupérer les données de façon formaté⇓⇓
const urlparams = new URLSearchParams(queryString);

//⇓⇓ Affiche les paramètre URL dans la console⇓⇓
console.log(urlparams);

//⇓⇓ Recuper l’ID du product dans le paramètre⇓⇓
const productId = urlparams.get("productId");

//⇓⇓ Affiche l’ID du product dans la console⇓⇓
console.log(productId);

//⇓⇓ Initialise une variable pour calculer le montant total de commande ⇓⇓.
let totalLigne;

//⇓⇓ Je déclare la variable hors fonction pour étendre son scope⇓⇓
let product;

//⇓⇓ Je recuper des données ciblées dans  l’API avec un ID⇓⇓
fetch(`http://localhost:3000/api/teddies/${productId}`).then(function (result) {
  result.json().then(function (finalResult) {
    //⇓⇓ Je control que ma requête c’est bien exécutée (status: 200)⇓⇓
    console.log(result);

    //⇓⇓ Je parse le résultat pour ne récupérer que l’objet qui m'intéresse⇓⇓
    product = finalResult;
    console.log(product);

    //⇓⇓ Je passe le prix en euros⇓⇓
    product.price = parseFloat(product.price) / 100;

    //⇓⇓ Création élément 'tr' pour chaque index ⇓⇓.
    let vueproduct = document.createElement("tr");

    //⇓⇓ boucle dynamique qui récupère les couleurs⇓⇓
    let colorsOptions = "";

    product.colors.forEach((color) => {
      console.log(color);
      colorsOptions += `<option value="${color}">${color}</option>`;
    });

    //⇓⇓ boucle dynamique qui crée les quantités⇓⇓
    let qteOptions = "";

    for (let i = 1; i <= 10; i++) {
      console.log(i);
      qteOptions += `<option value="${i}">${i}</option>`;
    }

    //⇓⇓ Ecrit le HTML à injecter dans le DOM⇓⇓
    vueproduct.innerHTML = `      
                                
                        <tr>

                                <td ><img src= ${product.imageUrl} class="imageUrl_product"> </td> 
                                <td class="name_product"> ${product.name} </td>
                                <td class="description_product"> ${product.description} </td>  
                                <td class="price_product" > ${product.price}€ </td>

                                <select class="choix" id="color">
                                        <option value="" class="colors_product">Sélectionnez une couleur</option>
                                        ${colorsOptions}
                                </select>                                                                     
                                
                                <select class="choix" id="amount">
                                        <option value="" class="qte_product">Sélectionnez une quantité</option>
                                        ${qteOptions}

                                </select>
                                
                                <button type="button" class="bouton" onclick = "addProduct()"                   
                                >M'ajouter au Panier</button>

                        </tr>

                        `;

    //⇓⇓ Ecrit les 'tr'  dans HTML ⇓⇓.
    document.querySelector("tbody").appendChild(vueproduct);
  });
});

//⇓⇓ Fonction qui récuper les informations à envoyer au panier ⇓⇓
function addProduct() {
  let image = product.imageUrl;

  let name = product.name;

  let description = product.description;

  let price = product.price;

  //⇓⇓ Récuper la couleur sélectionnés par l’utilisateur au format tex t⇓⇓.
  let selectcolor = document.getElementById("color");
  let color = selectcolor.options[selectcolor.selectedIndex].text;

  //⇓⇓ Récuper la quantité sélectionnés par l’utilisateur au format numérique ⇓⇓.
  let selectqte = document.getElementById("amount");
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
  let oldItems = JSON.parse(localStorage.getItem("basket")) || [];

  //⇓⇓ Met les nouvelles informations au format JSON ⇓⇓.
  let newItem = {
    _id: product._id,
    image: product.imageUrl,
    name: product.name,
    description: product.description,
    price: product.price,
    color: color,
    qte: qte,
    totalLigne: totalLigne,
  };

  //⇓⇓ Ajoute les nouvelles informations à la fin du tableau ⇓⇓.
  oldItems.push(newItem);

  //⇓⇓ Met à jour toutes les informations dans le localStorage ⇓⇓.
  localStorage.setItem("basket", JSON.stringify(oldItems));
}
