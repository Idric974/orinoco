//⇓⇓ Je récupère les données de l’API ⇓⇓
fetch("http://localhost:3000/api/teddies").then(function (result) {
  //⇓⇓ Je passe le resultat au format JSON ⇓⇓
  result.json().then(function (products) {
    console.log(result);
    //⇓⇓ Boucle récupère éléments tableau + console.log vérification ⇓⇓.
    products.forEach(function (product) {
      console.log(product);

      //⇓⇓ Passe le prix en euros⇓⇓.
      product.price = parseFloat(product.price) / 100;

      //⇓⇓ Création élément 'tr' pour chaque index récupéré⇓⇓.
      let ListView = document.createElement("tr");

      //⇓⇓Cré les éléments descendant à injecter dans le DOM⇓⇓.
      ListView.innerHTML = `
                             
                    <tr>

                        <td ><img src= ${product.imageUrl} class="imageUrl_index"> </td> 
                        <td class="name_index"> ${product.name} </td> 
                        <td class="price_index" > ${product.price}€ </td>
                        <td > <button class="bouton" id=${product._id}>Clic Moi</button> </td> 

                    </tr>

                `;

      //⇓⇓ Injecte les éléments créés dans le DOM⇓⇓.
      document.querySelector("tbody").appendChild(ListView);
    });
  });
});

function printID() {
  //⇓⇓ Cible l’ID du product dans le DOM lors du clic⇓⇓
  const id = window.event.target.id;
  console.log(id);

  //⇓⇓ Au clic, charge une nouvelle page avec une nouvelle URL + l’information à transmettre⇓⇓.
  window.location.href = `/html/page_product.html?productId=${id}`;
}
