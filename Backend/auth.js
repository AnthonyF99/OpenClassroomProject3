const baliseEmail = document.getElementById('login-email');
const balisePwd = document.getElementById('password');
const envoyer = document.querySelector('form');

async function authentification() {
    try {
        // Récupérer les valeurs de l'email et du mot de passe depuis les champs de saisie
        const email = baliseEmail.value;
        const password = balisePwd.value;

        // Vérifier si les identifiants correspondent aux valeurs attendues
        if (email !== "sophie.bluel@test.tld" || password !== "S0phie") {
            const errorMessageElement = document.getElementById('errorMessage');
            errorMessageElement.innerText = "Erreur dans l'identifiant ou le mot de passe"
            errorMessageElement.style.color = "red";
            errorMessageElement.style.display = "block";
            return; // Sortir de la fonction si les identifiants sont incorrects
            // Permet d'éviter d'éxécuter le reste du code inutilement.
        }

        // Créer un objet JSON avec les données de l'utilisateur
        const userData = {
            email: email,
            password: password
        };

        // Effectuer la requête POST vers votre API
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) // Convertir l'objet JSON en chaîne JSON
        });
        if (response.status === 200) {
            const data = await response.json();
            console.log("Authentification sucessfull", data);
            
            // Extraire les données de l'utilisateur de la réponse JSON
            const token = data.token;

            // Stocker le token dans sessionStorage ou localStorage
            sessionStorage.setItem('token', token);

            // Redirection vers la page principal
            window.location.href = '/FrontEnd/index.html';
        } else 
        if (response.status === 404) {
            console.log("Utilisateur non trouvé");
        } else if (response.status === 401) {
            console.log("Utilisateur non autorisé");

            // Rediriger l'utilisateur vers une autre page ou effectuer d'autres actions en cas de succès
        } else {
            throw new Error("Erreur dans la requête vers l'API");
        }
    } catch (error) {
        console.error("Erreur d'authentification:", error.message);
        // Afficher un message d'erreur à l'utilisateur ou effectuer d'autres actions en cas d'échec de l'authentification
    }
}

// Ajouter un écouteur d'événement sur la soumission du formulaire
envoyer.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire
    authentification(); // Appeler la fonction d'authentification
});


