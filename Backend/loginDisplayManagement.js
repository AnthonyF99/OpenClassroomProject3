//--------------------------------------------------------
// Fonction pour gérer l'affichage du lien de connexion et du lien de déconnexion
function updateLoginStatus() {
    // Vérifier si l'utilisateur est connecté en vérifiant s'il existe un token dans le sessionStorage
    const isLoggedIn = sessionStorage.getItem('token') !== null;

    // Sélectionner les éléments des liens de connexion et de déconnexion
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const btn = document.getElementById("modify-btn");
    const editionMode = document.getElementById("modify-banner");


    // Mettre à jour l'affichage en fonction de l'état de connexion de l'utilisateur
    if (isLoggedIn && loginLink && logoutLink && btn && editionMode) {
        loginLink.style.display = 'none'; // Cacher le lien de connexion
        logoutLink.style.display = 'block'; // Afficher le lien de déconnexion
        btn.style.display = 'block'; // Afficher le bouton modifier
        editionMode.style.display = 'flex'; //Affiche la bannière mode édition
    } else if (loginLink && logoutLink && btn && editionMode) {
        loginLink.style.display = 'block'; // Afficher le lien de connexion
        logoutLink.style.display = 'none'; // Cacher le lien de déconnexion
        btn.style.display = 'none'; // Cacher le bouton modifer
        editionMode.style.display = 'none';

    }
}

// Appeler la fonction pour mettre à jour l'affichage des liens au chargement de la page
updateLoginStatus();

// Fonction de déconnexion
function logout() {
    // Supprimer le token du sessionStorage
    sessionStorage.removeItem('token');
    // Rediriger l'utilisateur vers la page d'accueil ou une autre page de votre choix
    window.location.href = '/FrontEnd/index.html';
}

// Gestionnaire d'événements pour le lien de déconnexion
document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du lien
    logout(); // Appeler la fonction de déconnexion
    // Appeler la fonction pour mettre à jour l'affichage des liens
    updateLoginStatus();
});



