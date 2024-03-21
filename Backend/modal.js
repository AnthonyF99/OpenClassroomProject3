// Get the modal
const modals = document.querySelectorAll(".modal");

// Get the button that opens the modal
const modifyBtn = document.getElementById("modify-btn");

// Get the <span> element that closes the modal
const closeButtons = document.querySelectorAll(".close");

const select = document.getElementById("select-category-modal");

const addPhotoBtn = document.getElementById('addPhoto-btn');

const uploadInput = document.getElementById('upload-work-image-modal');

// When the user clicks the button, open the modal 
modifyBtn.onclick = () => {
  modals[0].style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeButtons.forEach(button => {
  button.onclick = () => {
    modals.forEach(modal => {
      modal.style.display = "none";
      select.value="";
    });
  }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = event => {
  modals.forEach(modal => {
    if (event.target == modal) {
      modal.style.display = "none";
      //Reset the select to its default option
      select.value="";
    }
  });
}

// Fonction pour afficher
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

function deleteButton() {
  deleteButton.addEventListener('click', () => {
    
  });
}

function nextModal() {
  addPhotoBtn.addEventListener('click', () => {
    modals[0].style.display = 'none';
    modals[1].style.display = 'block';
  });
}

nextModal();

function addWork() {

}

function imageMaxSize() {
  uploadInput.addEventListener('change', function() {
  const file = this.files[0];
  const maxSize = 4 * 1024 * 1024; // 4 Mo en octets

  if (file && file.size > maxSize) {
    alert('Le fichier est trop volumineux. La taille maximale autorisée est de 4 Mo.');
    this.value = ''; // Effacer le fichier sélectionné
  }
});

}