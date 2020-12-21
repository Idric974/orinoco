//⇓⇓ Récupérer l’information désirée dans l’URL de la page affichée⇓⇓.
const queryString = window.location.search;

//⇓⇓ Affiche l'information ciblée dans la console⇓⇓
console.log(queryString);

//⇓⇓ Récupérer les données de façon formaté⇓⇓
const urlparams = new URLSearchParams(queryString);

//⇓⇓ Affiche les données de façon formaté dans la console⇓⇓
console.log(urlparams);

//⇓⇓ Recuper l’ID du produit ⇓⇓
const montantCommande = urlparams.get("Montant_Commande");

const productId = urlparams.get("Id_Commande");

//⇓⇓ Affiche l’ID du produit dans la console⇓⇓
console.log(productId);

document.getElementById(
  "confirmation"
).innerText = `Voici le rappel du montant de votre commande: ${montantCommande}€
 
Votre numéro de commande est le : ${productId}`;
