// Fonction générique pour récupérer les données de l'API
 async function fetchDataFromAPIGallery() {
  try {
      const response = await fetch('http://localhost:5678/api/works');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data from API:', error);
      throw error; // Renvoie l'erreur pour qu'elle puisse être gérée à l'appelant
  }
}

// Fonction pour afficher la galerie en fonction des filtres
export async function displayGalleryByCategory(category) {
  try {
    const data = await fetchDataFromAPIGallery(); // Récupère les données de l'API
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    const uniqueWorkIds = new Set();
    data.forEach(work => {
        if (category === 'Tous' || work.category.name === category) {
            if (!uniqueWorkIds.has(work.id)) {
                uniqueWorkIds.add(work.id);
                //On verifie si l'oeuvre n'existe pas déjà et donc unique, pour pouvoir l'ajouter à la galerie

                const figure = document.createElement('figure');
                const img = document.createElement('img');
                const figcaption = document.createElement('figcaption');

                img.src = work.imageUrl;
                img.alt = work.title;
                figcaption.textContent = work.title;

                figure.appendChild(img);
                figure.appendChild(figcaption);
                gallery.appendChild(figure);
        }
      }
    });
  } catch (error) {
    // Gère les erreurs qui surviennent pendant la requête fetch
    console.error('Error:', error);
  }
}

// Écouteurs d'événements pour les boutons de filtrage
document.getElementById('filter-btn-1').addEventListener('click', () => displayGalleryByCategory('Tous'));
document.getElementById('filter-btn-2').addEventListener('click', () => displayGalleryByCategory('Objets'));
document.getElementById('filter-btn-3').addEventListener('click', () => displayGalleryByCategory('Appartements'));
document.getElementById('filter-btn-4').addEventListener('click', () => displayGalleryByCategory('Hotels & restaurants'));

// Affichage initial de la galerie (affiche toutes les catégories par défaut)
displayGalleryByCategory('Tous');


//-------------------------------------------------------
//Le code suivant permet de définir quel boutons et actif ou non, et à 'laid du css on change ses propriété
const filterButtons = document.querySelectorAll('.filter-btn');

// Ajouter un écouteur d'événements à chaque bouton de filtre
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Supprimer la classe 'active' de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Ajouter la classe 'active' uniquement au bouton cliqué
        this.classList.add('active');
    });
    
    // Activer le bouton "Tous" par défaut
    const tousButton = document.getElementById('filter-btn-1');
    tousButton.classList.add('active');
});
//-------------------------------------------------------

function displayAdminOptions() {
  // Masquer la galerie publique avec les filtres
  document.querySelector('.filter-container').style.display = 'none';
  document.getElementById('modify-btn').style.display = 'block'; // Afficher le bouton de modification
}

function checkAdminStatus() {
  // Vérifier si un token est présent dans le sessionStorage
  const token = sessionStorage.getItem('token');
  return token !== null; // Renvoyer vrai si un token est présent, ce qui signifie que l'utilisateur est connecté
}

export function displayAdminGallery() {
  const isAdmin = checkAdminStatus(); // Vérifier si l'utilisateur est un administrateur

  if (isAdmin) {
      displayAdminOptions(); // Afficher la galerie en mode administration si l'utilisateur est un administrateur
  } else {
      displayGalleryByCategory('Tous'); // Afficher la galerie publique avec les filtres si l'utilisateur n'est pas un administrateur
  }
}

displayAdminGallery();
