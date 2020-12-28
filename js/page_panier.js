//⇓⇓ Recuper les informations dans le localStorage⇓⇓
let oldItems = localStorage.getItem("basket");

//⇓⇓ Format les information en JSON⇓⇓
let recupbasket = JSON.parse(localStorage.getItem("basket"));

//⇓⇓ Affiche les information en JSON ⇓⇓
console.log(recupbasket);

//⇓⇓ Déclare un tableau vide pour insérer les ID ⇓⇓
const _ids = [];

//⇓⇓ Condition qui affiche une message si le panier est vide ⇓⇓
if (recupbasket == null) {
  let infobasket = "Votre panier est vide 😲";
  document.getElementById("order_message").innerText = infobasket;
}

//⇓⇓ Initialise une variable pour le calcule du montant du panier⇓⇓
totalAmount = 0;

//⇓⇓ Recuper les informations dans le panier et les places dans le tableau  créer plus haut ⇓⇓
recupbasket.forEach((basket) => {
  console.log(basket);

  //⇓⇓ Récupèr les ID de commande et les places dans le tableau  créer plus haut⇓⇓.
  _ids.push(basket._id);
  console.log(_ids);

  //⇓⇓ Calcule le montant total de la commande ⇓⇓.
  totalAmount += basket.totalLigne;

  //⇓⇓ Création élément 'ul' pour chaque index ⇓⇓.
  let listebasket = document.createElement("ul");

  //⇓⇓ Met dans les ‘tr’ les infos de l’API ⇓⇓.
  listebasket.innerHTML = `
                    
            <ul>
                <li><img src=${basket.image}  class="image_panier" ></li> 
                <li class="description_panier">
                Votre ${basket.name} 
                de couleur ${basket.color}
                à ${basket.price}€
                Qté:${basket.qte}
                pour un total ${basket.totalLigne}€.
                </li>

            </li>

        `;

  //⇓⇓ Ecrit les 'tr' dans HTML ⇓⇓.
  document.querySelector("tbody").appendChild(listebasket);
});

//⇓⇓ Ecrit le montant total de la commande dans le DOM⇓⇓.
document.getElementById(
  "order_message"
).innerText = `Le total de votre commande est de: ${totalAmount}€`;

//⇓⇓ Récupère la totalité du formulaire⇓⇓.
const $commande_client = document.getElementById("commande_client");

const validEmail = function (str) {
  //⇓⇓ Création de la RegExp pour validation email
  let emailRegExp = new RegExp(
    "^[a-zA-Z-9.-_]+[@]{1}[a-zA-Z-9.-_]+[.]{1}[a-z]{2,9}$",
    "g"
  );

  if (emailRegExp.test(str)) {
    console.log("E-mail Valide");
    return true;
  } else {
    console.log("E-mail non Valide");
    return false;
  }
};

const noNumberInField = function (str) {
  //⇓⇓ Création de la RegExp pour validation email
  const letters = /^[A-Za-z\s]+$/;
  if (str.match(letters)) {
    console.log("OK");
    return true;
  } else {
    console.log("Pas Ok");
    return false;
  }
};

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
    !noNumberInField($firstName.value) ||
    !noNumberInField($lastName.value) ||
    !noNumberInField($city.value) ||
    !validEmail($email.value)
  ) {
    alert("Erreur de saisi tous les champs doivent être complétés");
    return;
  }

  //⇓⇓ Récupère le contenu des champs du formulaire ⇓⇓.
  const customerOrder = {
    contact: {
      firstName: $firstName.value,
      lastName: $lastName.value,
      address: $address.value,
      city: $city.value,
      email: $email.value,
    },

    products: [_ids],
  };

  console.log(customerOrder);

  //⇓⇓ URL de la requête⇓⇓.
  let url = "http://localhost:3000/api/teddies/order";

  //⇓⇓ Paramètres de la requête⇓⇓.
  const parametresDeRequete = {
    method: "POST",
    body: JSON.stringify(customerOrder),
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

      let orderId = response.orderId;

      window.location.href = `/html/order.html?orderId=${orderId}&totalAmount=${totalAmount}`;
    })

    .catch((error) => alert("Erreur : " + error));

  localStorage.removeItem("basket");
});
