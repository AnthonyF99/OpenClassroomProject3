// Get the modal
const modals = document.querySelectorAll(".modal");

// Get the button that opens the modal
const modifyBtn = document.getElementById("modify-btn");

// Get the <span> element that closes the modal
const closeButtons = document.querySelectorAll(".close");

const addPhotoBtn = document.getElementById('addPhoto-btn');

const accessToken = sessionStorage.getItem('token');

//On déclare des elements dont ont aura besoin pour la modal ajouter travail
const inputImage = document.getElementById('upload-work-image-modal');
const inputTitle = document.getElementById('work-title-modal');
const selectCategory = document.getElementById('select-category-modal');
const imagePreview = document.getElementById('imagePreview');
const iconElement = document.querySelector('.upload-file-container i');
const labelElement = document.querySelector('.upload-file-container label');
const paragraphElement = document.querySelector('.upload-file-container p');




// When the user clicks the button, open the modal 
modifyBtn.onclick = () => {
  modals[0].style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeButtons.forEach(button => {
  button.onclick = () => {
    modals.forEach(modal => {
      modal.style.display = "none";
      //Apelle resetForm
      resetForm();   
    });
  }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = event => {
  modals.forEach(modal => {
    if (event.target == modal) {
      modal.style.display = "none";
     //Apelle resetForm
     resetForm();   
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

      

            img.src = work.imageUrl; // Définit l'URL de l'image
            img.alt = work.title; // Définit le texte alternatif de l'image
            
            // Ajoute les classes CSS nécessaires aux éléments
            imgContainer.classList.add('image-container');
            figure.classList.add('gallery-item');
  
            // Ajoute les éléments à la galerie
            const deleteButton = createDeleteButton(work.id);
            figure.appendChild(deleteButton);

            imgContainer.appendChild(img);
            figure.appendChild(imgContainer);
            modalGallery.appendChild(figure);
          });
      }
      catch (error) {
        // Gère les erreurs qui surviennent pendant la requête fetch
        console.error('Error:', error);
      }
    } 

displayGallery();

//----------------------------------------------------------------
//Fonction pour créer le button de suppression des travaux

function createDeleteButton(workId) {
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteButton.classList.add('delete-button');
  deleteButton.dataset.workId = workId;
  deleteButton.addEventListener('click', async () => {
      try {
          const deleteResponse = await fetch(`http://localhost:5678/api/works/${workId}`, { //Récupère api
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${accessToken}`,    //Récupère le token d'autorisation pour supprimer.                     
              }
          });
          if (deleteResponse.ok) {
              // Si la suppression est réussie, actualise la galerie
              displayGallery();
          } else {
              console.error(`Failed to delete work ${workId}`);
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });
  return deleteButton;
}

//----------------------------------------------------------------
//Function pour changer de modal

function nextModal() {
  addPhotoBtn.addEventListener('click', () => {
    modals[0].style.display = 'none';
    modals[1].style.display = 'block';
  });
}

nextModal();

//----------------------------------------------------------------
//Function pour afficher l'image upload en preview.

function displayPreviewImage() {
  inputImage.addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file);
        // Créez un élément d'image pour afficher l'aperçu de l'image
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Preview';

        // Effacez le contenu précédent de l'aperçu de l'image
        imagePreview.innerHTML = '';
        // Ajoutez l'image à l'aperçu
        imagePreview.appendChild(img);
        // Afficher l'aperçu de l'image
        imagePreview.style.display = 'block';

        // Masquer les autres éléments
        iconElement.style.display = 'none';
        labelElement.style.display = 'none';
        paragraphElement.style.display = 'none';
    } else {
        // Réinitialiser l'affichage si aucun fichier n'est sélectionné
        imagePreview.innerHTML = '';
        imagePreview.style.display = 'none';

        // Afficher les autres éléments
        iconElement.style.display = 'block';
        labelElement.style.display = 'block';
        paragraphElement.style.display = 'block';

    }
  });
  // Ajoutez un écouteur d'événements pour cliquer sur l'aperçu de l'image
imagePreview.addEventListener('click', () => {
  // Déclencher un clic sur le champ d'entrée de fichier
  inputImage.click();
});
}

displayPreviewImage()

//Ajout de nouveaux travaux

async function addWork() {
  try {
    // Récupérer les valeurs des images, titre, category
    const image = inputImage.value;
    const title = inputTitle.value;
    const category = selectCategory.value;
    // Vérifier si les identifiants correspondent aux valeurs attendues
    if (image ==="" || title === "" || category === "") {
        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.innerText = "Erreur dans l'identification ou le mot de passe"
        errorMessageElement.style.color = "red";
        errorMessageElement.style.display = "block";
        return; // Sortir de la fonction si les identifiants sont incorrects
    }

    // Créer un objet JSON avec les données du nouveau work que l'utilisateur à ajouté
    const workData = {
        image: image,
        title: title,
        category: category
    };

    // Effectuer la requête POST vers votre API
    const response = await fetch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`                      
        },
        body: JSON.stringify(workData) // Convertir l'objet JSON en chaîne JSON
    });
} catch {
  console.error
}
}

//Function pour limiter la taille maximal d'upload
function imageMaxSize() {
  inputImage.addEventListener('change', () => {
  const file = this.files[0];
  const maxSize = 4 * 1024 * 1024; // 4 Mo en octets

  if (file && file.size > maxSize) {
    alert('Le fichier est trop volumineux. La taille maximale autorisée est de 4 Mo.');
    this.value = ''; // Effacer le fichier sélectionné
  }
});

}

imageMaxSize()

//---------------------------------------------------

// Function pour réintialiser les valeurs et affichages

function resetForm() {
  // Réinitialiser les valeurs des éléments du formulaire
  inputImage.value = "";
  inputTitle.value = "";
  selectCategory.value = "";

  // Masquer les previews et afficher les elements par défaut
  imagePreview.innerHTML = '';
  imagePreview.style.display = 'none';
  iconElement.style.display = 'block';
  labelElement.style.display = 'block';
  paragraphElement.style.display = 'block';
}