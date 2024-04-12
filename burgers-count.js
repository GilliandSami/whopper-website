function countBurgers() {
    // Sélectionnez l'élément contenant le nombre à incrémenter
    const numberElement = document.querySelector('.number-interaction');

    // Initialisez la variable du nombre initial
    let number = 0;

    // Fonction pour mettre à jour le nombre toutes les secondes
    function updateNumber() {
        // Incrémentez le nombre de 42
        number += 1;
        // Mettez à jour le contenu de l'élément HTML avec le nouveau nombre
        numberElement.textContent = number;
    }

    // Appelez la fonction updateNumber une fois au chargement de la page pour afficher le nombre initial
    updateNumber();

    // Appelez la fonction updateNumber toutes les secondes (1000 millisecondes)
    setInterval(updateNumber, 23);
}

export { countBurgers };