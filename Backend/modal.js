// Get the modal
const modal = document.getElementById("first-modal");

// Get the button that opens the modal
const btn = document.getElementById("modify-btn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Fonction pour afficher la galerie en fonction des filtres
async function displayGallery() {
    try {
      // Fetch the data from the API at the URL "http://localhost:5678/api/works"
      const response = await fetch('http://localhost:5678/api/works');
      // Convert the response to JSON format
      const data = await response.json();
  
      // Clear previous content in the gallery
      const modalGallery = document.querySelector('.modal-gallery');
      modalGallery.innerHTML = '';
  
      // Parcours les données pour afficher les œuvres dans la galerie
      data.forEach(work => {
  
            // Crée des éléments HTML pour afficher l'œuvre dans la galerie
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const imgContainer=document.createElement('div');

            //Créez les boutons de supression
            const deleteButton = document.createElement('delete-button'); 
            deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; // Utilisez la classe de l'icône de corbeille de Font Awesome
            deleteButton.classList.add('delete-button');

            img.src = work.imageUrl; // Définit l'URL de l'image
            img.alt = work.title; // Définit le texte alternatif de l'image
            
            // Ajoute les classes CSS nécessaires aux éléments
            imgContainer.classList.add('image-container');
            figure.classList.add('gallery-item');
  
            // Ajoute les éléments à la galerie
            imgContainer.appendChild(img);
            figure.appendChild(imgContainer);
            figure.appendChild(deleteButton);
            modalGallery.appendChild(figure); 
          });
      }
      catch (error) {
        // Gère les erreurs qui surviennent pendant la requête fetch
        console.error('Error:', error);
      }
    } 

displayGallery();