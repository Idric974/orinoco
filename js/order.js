//⇓⇓ Récupérer l’information désirée dans l’URL de la page affichée⇓⇓.
const queryString = window.location.search;

//⇓⇓ Affiche l'information ciblée dans la console⇓⇓
console.log(queryString);

//⇓⇓ Récupérer les données de façon formaté⇓⇓
const urlparams = new URLSearchParams(queryString);

//⇓⇓ Affiche les données de façon formaté dans la console⇓⇓
console.log(urlparams);

//⇓⇓ Recuper l’ID du product ⇓⇓
const amountOrder = urlparams.get("totalAmount");

const orderId = urlparams.get("orderId");

//⇓⇓ Affiche l’ID du product dans la console⇓⇓
console.log(orderId);

document.getElementById(
  "confirmation"
).innerText = `Voici le rappel du montant de votre commande: ${amountOrder}€
 
Votre numéro de commande est le : ${orderId}`;
