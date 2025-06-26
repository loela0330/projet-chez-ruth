
/*insertion du javascript dans les formulaires (formulaire d'inscription)  */

// On attend que tout le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
  var form = document.getElementById('boutton_envoi');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // empêche l'envoi automatique

    var validation = document.getElementById("boutton_envoi");
    var prenom = document.getElementById("prenom");
    var prenom_m = document.getElementById("prenom_m");
    var nom = document.getElementById("nom");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");

    var regexprenom =/^[a-zA-Z0-9._-]{3,16}$/;
    var regexnom =/^[a-zA-Z0-9._-]{3,16}$/;
    var regexemail =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var regexpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    var regexconfirmpassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    validation.addEventListener("click", f_valid);

    function f_valid(e){
      if (prenom.validity.valueMissing){
        e.preventDefault();
        prenom_m.textContent= 'prenom manquant';
        prenom_m.style.color="red";
      }
    }


    if (!regexprenom.test(prenom)) {
      alert("❌ prenom invalide : 3–16 caractères alphanumériques, . _ - autorisés.");
    }
    else if (!regexnom.test(nom)) {
      alert("❌ Nom d'utilisateur invalide : 3–16 caractères alphanumériques, . _ - autorisés.");
    }
    else if (!regexemail.test(email)) {
      alert("❌ Adresse e-mail invalide !");
    }
    else if (!regexpassword.test(password)) {
      alert("❌ Mot de passe non sécurisé : min. 8 caractères, majuscule, minuscule, chiffre et spécial requis.");
    }
    else if (!regexconfirmpassword.test(confirmpassword)) {
      alert("❌ Confirmation du mot de passe invalide !");
    }
    else if (password !== confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas !");
    }
    else {
      alert("✅ Formulaire valide ! Envoi en cours…");
      form.submit(); // ou appel AJAX, etc.
    }
  });
});

