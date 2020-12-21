//⇓⇓ Recuper les informations dans le localStorage⇓⇓
let oldItems = localStorage.getItem("panier");

//⇓⇓ Format les information en JSON⇓⇓
let recupPanier = JSON.parse(localStorage.getItem("panier"));

//⇓⇓ Affiche les information en JSON ⇓⇓
console.log(recupPanier);

const _ids = [];

//⇓⇓ Condition qui affiche une message si le panier est vide ⇓⇓
if (recupPanier == null) {
  let infoPanier = "Votre panier est vide 😲";
  document.getElementById("montant_total").innerText = infoPanier;
}

//⇓⇓ Initialise une variable pour le calcule du montant du panier⇓⇓
montantTotal = 0;

//⇓⇓ Recuper les informations dans le panier ⇓⇓
recupPanier.forEach((panier) => {
  console.log(panier);

  //⇓⇓ Récupèr les ID de commande ⇓⇓.
  _ids.push(panier._id);

  //⇓⇓ Calcule le montant total de la commande ⇓⇓.
  montantTotal += panier.totalLigne;

  //⇓⇓ Création élément 'ul' pour chaque index ⇓⇓.
  let listePanier = document.createElement("ul");

  //⇓⇓ Met dans les ‘tr’ les infos de l’API ⇓⇓.
  listePanier.innerHTML = `
                    
            <ul>
                <li><img src=${panier.image}  class="image_panier" ></li> 
                <li class="description_panier">
                Votre ${panier.name} 
                de couleur ${panier.color}
                à ${panier.price}€
                Qté:${panier.qte}
                pour un total ${panier.totalLigne}€.
                </li>

            </li>

        `;

  //⇓⇓ Ecrit les 'tr'  dans HTML ⇓⇓.
  document.querySelector("tbody").appendChild(listePanier);
});

//⇓⇓ Ecrit le montant total de la commande dans le DOM⇓⇓.
document.getElementById(
  "montant_total"
).innerText = `Le total de votre commande est de: ${montantTotal}€`;

//⇓⇓ Récupère la totalité du formulaire⇓⇓.
const $commande_client = document.getElementById("commande_client");

//⇓⇓ Récupère les champs du formulaire⇓⇓.
const $firstName = document.getElementById("firstName");
const $lastName = document.getElementById("lastName");
const $address = document.getElementById("address");
const $city = document.getElementById("city");
const $email = document.getElementById("email");

//⇓⇓ Ecoute l’événement « submit » sur le bouton du formulaire⇓⇓.
$commande_client.addEventListener("submit", function (e) {
  //⇓⇓ Bloc la propagation de l’évènement par défaut de submit⇓⇓.
  e.preventDefault();

  if (
    $firstName.value.trim().length < 2 ||
    $lastName.value.trim().length < 2 ||
    $address.value.trim().length < 2 ||
    $city.value.trim().length < 2 ||
    $email.value.trim().length < 2
  ) {
    alert("Erreur de saisi tous les champs doivent être complétés");
    return;
  }

  //⇓⇓ Récupère le contenu des champs du formulaire ⇓⇓.
  const commandeClient = {
    contact: {
      firstName: $firstName.value,
      lastName: $lastName.value,
      address: $address.value,
      city: $city.value,
      email: $email.value,
    },

    products: [_ids],
  };

  console.log(commandeClient);

  //⇓⇓ URL de la requête⇓⇓.
  let url = "http://localhost:3000/api/teddies/order";

  //⇓⇓ Paramètres de la requête⇓⇓.
  const parametresDeRequete = {
    method: "POST",
    body: JSON.stringify(commandeClient),
    headers: new Headers({
      "Content-Type": "application/json; charset=UTF-8 ",
    }),
  };

  //⇓⇓ la requête avec URL et Paramètres⇓⇓.
  fetch(url, parametresDeRequete)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      //alert(JSON.stringify(response));

      let idCommande = response.orderId;

      window.location.href = `/html/order.html?Id_Commande=${idCommande}&Montant_Commande=${montantTotal}`;
    })

    .catch((error) => alert("Erreur : " + error));
});
