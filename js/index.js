//⇓⇓ Je récupère les données de l’API ⇓⇓
fetch("http://localhost:3000/api/teddies").then(function (resultat) {
  resultat.json().then(function (produits) {
    console.log(resultat);
    //⇓⇓ Boucle récupère éléments tableau + console.log vérification ⇓⇓.
    produits.forEach(function (produit) {
      console.log(produit);

      produit.price = parseFloat(produit.price) / 100;

      //⇓⇓ Création élément 'tr' pour chaque index récupéré⇓⇓.
      let listeVue = document.createElement("tr");

      //⇓⇓Cré les éléments descendant à injecter dans le DOM⇓⇓.
      listeVue.innerHTML = `
                             
                    <tr>

                        <td ><img src= ${produit.imageUrl} class="imageUrl_index"> </td> 
                        <td class="name_index"> ${produit.name} </td> 
                        <td class="price_index" > ${produit.price}€ </td>
                        <td > <button class="bouton" id=${produit._id}>Clic Moi</button> </td> 

                    </tr>

                `;

      //⇓⇓ Injecte les éléments créés dans le DOM⇓⇓.
      document.querySelector("tbody").appendChild(listeVue);
    });
  });
});

function printID() {
  //⇓⇓ Cible l’ID du produit dans le DOM lors du clic⇓⇓
  const id = window.event.target.id;
  console.log(id);

  //⇓⇓ Au clic, charge une nouvelle page avec une nouvelle URL + l’information à transmettre⇓⇓.
  window.location.href = `/html/page_produit.html?idProduit=${id}`;
}
