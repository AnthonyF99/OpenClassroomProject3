// Fonction pour afficher la galerie en fonction des filtres
async function displayGalleryByCategory(category) {
  try {
    // Fetch the data from the API at the URL "http://localhost:5678/api/works"
    const response = await fetch('http://localhost:5678/api/works');
    // Convert the response to JSON format
    const data = await response.json();

    // Clear previous content in the gallery
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    // Crée un ensemble pour stocker les identifiants uniques des œuvres
    const uniqueWorkIds = new Set();

    // Parcours les données pour afficher les œuvres dans la galerie
    data.forEach(work => {
      // Si la catégorie est "Tous" ou correspond à la catégorie de l'œuvre
      if (category === 'Tous' || work.category.name === category) {
        // Vérifie si l'œuvre n'a pas déjà été ajoutée à la galerie
        if (!uniqueWorkIds.has(work.id)) {
          // Ajoute l'identifiant de l'œuvre à l'ensemble pour éviter les doublons
          uniqueWorkIds.add(work.id);

          // Crée des éléments HTML pour afficher l'œuvre dans la galerie
          const figure = document.createElement('figure');
          const img = document.createElement('img');
          const figcaption = document.createElement('figcaption');

          img.src = work.imageUrl; // Définit l'URL de l'image
          img.alt = work.title; // Définit le texte alternatif de l'image
          figcaption.textContent = work.title; // Définit le titre de l'œuvre

          // Ajoute les éléments à la galerie
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
