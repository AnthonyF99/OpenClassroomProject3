
// Get the modal
const modals = document.querySelectorAll(".modal");

// Get the button that opens the modal
const modifyBtn = document.getElementById("modify-btn");

// Get the <span> element that closes the modal
const closeButtons = document.querySelectorAll(".close");

const addPhotoBtn = document.getElementById('addPhoto-btn');
const previousModal =document.getElementById("previousModal")

const accessToken = sessionStorage.getItem('token');

//On déclare des elements dont ont aura besoin pour la modal ajouter travail
const inputImage = document.getElementById('upload-work-image-modal');
const inputTitle = document.getElementById('work-title-modal');
const selectCategory = document.getElementById('select-category-modal');
const imagePreview = document.getElementById('imagePreview');
const iconElement = document.querySelector('.upload-file-container i');
const labelElement = document.querySelector('.upload-file-container label');
const paragraphElement = document.querySelector('.upload-file-container p');


const modalAddWork = document.querySelector('.modal-add-work');
const form = modalAddWork.querySelector('form');
const workForm = document.getElementById('workForm');
const submitButton = workForm.querySelector('#submit-work');



// When the user clicks the button, open the modal 
modifyBtn.addEventListener('click', () => {
  modals[0].style.display = "block";
});

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
import { displayGalleryByCategory } from "./gallery.js";


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
              displayGalleryByCategory('Tous');
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

function previousModal() {
previousModal.addEventListener('click', () => {
  modals[0].style.display = 'block';
  modals[1].style.display = 'none';
});
}
previousModal()

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

//--------------------------------------------------------------

// Ajouter un écouteur d'événement sur la soumission du formulaire
workForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Empêcher le comportement par défaut du formulaire
  await addWork();
});


// Function pour ajouter de nouveaux travaux
async function addWork() {
  try {
    // Créer un objet FormData pour les données multipart/form-data
    const formData = new FormData();
    // Récupérer le fichier d'image à partir de l'élément input
    const image = inputImage.files[0];
    const title = inputTitle.value
    const category = selectCategory.options[selectCategory.selectedIndex].dataset.categoryId;
    // Ajouter le fichier d'image à formData s'il existe
    if (image) {
      formData.append('image', image);
    }
    // Ajouter les autres champs à formData
    formData.append('title', title);
    formData.append('category', category);

    // Effectuer la requête POST vers votre API
    const response = await fetch("http://localhost:5678/api/works", {
      method: 'POST',
      headers: {
        // Pas besoin de définir Content-Type, le navigateur le fera automatiquement pour FormData
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData // Utiliser formData pour envoyer les données multipart/form-data
    });

    // Vérifier si la réponse est ok (statut HTTP 2xx)
    if (response.ok) {
      // Si l'ajout est réussi, actualiser la galerie
      displayGallery();
      displayGalleryByCategory('Tous');
      console.log("Le travail a été ajouté avec succès");
    } else {
      // Si la réponse n'est pas ok, afficher le message d'erreur
      const errorMessage = await response.text();
      console.error(`Erreur lors de l'ajout du travail : ${errorMessage}`);
    }
  } catch (error) {
    // Attraper les erreurs et les afficher dans la console
    console.error('Erreur lors de l\'ajout du travail :', error.message);
  }
}

//---------------------------------------------
//Function pour limiter la taille maximal d'upload
function imageMaxSize() {
  //Function régulière au lieu de fléchée, pour que this face référence à son élément inputImage
  inputImage.addEventListener('change', function() {
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

// Function pour réintialiser les valeurs et afficahges

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

//Ce code permet de verifier si tout les champs sont remplies
//Si ils le sont le bouton valider est fonctionnel, sinon il est disabled
document.addEventListener("DOMContentLoaded", function() {


  // Ajouter un écouteur d'événements pour surveiller les changements dans le formulaire
  form.addEventListener('input', function() {
      // Vérifier si tous les champs requis sont remplis
      const inputs = form.querySelectorAll('input[required], select[required]');
      let allFilled = true;
      inputs.forEach(input => {
          if (!input.value.trim()) {
              allFilled = false;
          }
      });

      // Activer ou désactiver le bouton de validation en fonction de l'état des champs requis
      if (allFilled) {
          submitButton.removeAttribute('disabled');
      } else {
          submitButton.setAttribute('disabled', 'disabled');
      }
  });
});


