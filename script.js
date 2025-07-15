


// script.js

document.addEventListener('DOMContentLoaded', () => {
  // On parcourt tous les <form> de la page
  document.querySelectorAll('form').forEach(form => {
    const btn = form.querySelector('#valider');
    if (!btn) return;           // pas de bouton “#valider” → on skip ce formulaire

    btn.addEventListener('click', e => {
      let formOk = true;

      // ——— Création / inscription ————————————————————————
      // Prénom
      const prenom   = form.querySelector('#prenom');
      const prenom_m = form.querySelector('#prenom_m');
      if (prenom) {
        const R = /^[A-Za-zàâäéèêëîïôöùûüÿç'-]{2,20}$/u;
        if (prenom.validity.valueMissing) {
          formOk = false;
          prenom_m.textContent = 'Prénom manquant';
          prenom_m.style.color = 'red';
        }
        else if (!R.test(prenom.value)) {
          formOk = false;
          prenom_m.textContent = 'Format incorrect';
          prenom_m.style.color = 'orange';
        }
        else {
          prenom_m.textContent = '';
        }
      }

      // Nom
      const nom   = form.querySelector('#nom');
      const nom_m = form.querySelector('#nom_m');
      if (nom) {
        const R = /^[A-Za-zàâäéèêëîïôöùûüÿç'-]{2,20}$/u;
        if (nom.validity.valueMissing) {
          formOk = false;
          nom_m.textContent = 'Nom manquant';
          nom_m.style.color = 'red';
        }
        else if (!R.test(nom.value)) {
          formOk = false;
          nom_m.textContent = 'Format incorrect';
          nom_m.style.color = 'orange';
        }
        else {
          nom_m.textContent = '';
        }
      }

      // Email (commune à tous)
      const email   = form.querySelector('#email');
      const email_m = form.querySelector('#email_m');
      if (email) {
        if (email.validity.valueMissing) {
          formOk = false;
          email_m.textContent = 'Email manquant';
          email_m.style.color = 'red';
        }
        else if (email.validity.typeMismatch) {
          formOk = false;
          email_m.textContent = 'Format invalide';
          email_m.style.color = 'orange';
        }
        else {
          email_m.textContent = '';
        }
      }

      // Mot de passe (inscription ou connexion)
      const pw   = form.querySelector('#password');
      const pw_m = form.querySelector('#password_m');
      if (pw) {
        const R = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (pw.validity.valueMissing) {
          formOk = false;
          pw_m.textContent = 'Mot de passe manquant';
          pw_m.style.color = 'red';
        }
        else if (!R.test(pw.value)) {
          formOk = false;
          pw_m.textContent = 'Format incorrect';
          pw_m.style.color = 'orange';
        }
        else {
          pw_m.textContent = '';
        }
      }

      // Confirmation mot de passe (inscription)
      const pwc   = form.querySelector('#confirmpassword');
      const pwc_m = form.querySelector('#confirmpassword_m');
      if (pwc) {
        if (pwc.validity.valueMissing) {
          formOk = false;
          pwc_m.textContent = 'Confirmation manquante';
          pwc_m.style.color = 'red';
        }
        else if (pw && pwc.value !== pw.value) {
          formOk = false;
          pwc_m.textContent = 'Les mots de passe ne correspondent pas';
          pwc_m.style.color = 'orange';
        }
        else {
          pwc_m.textContent = '';
        }
      }

      // ——— Formulaire de contact ————————————————————————
      const msg   = form.querySelector('#message');
      const msg_m = form.querySelector('#message_m');
      if (msg) {
        const R = /^(?=.{20,500}$)(?=.*[A-Za-zÀ-ÖØ-öø-ÿ]).+$/u;
        if (msg.validity.valueMissing) {
          formOk = false;
          msg_m.textContent = 'Message requis';
          msg_m.style.color = 'red';
        }
        else if (!R.test(msg.value)) {
          formOk = false;
          msg_m.textContent = 'Votre message est trop court ou mal formé';
          msg_m.style.color = 'orange';
        }
        else {
          msg_m.textContent = '';
        }
      }

      // ——— Simulation d’envoi ————————————————————————
      if (!formOk) {
        e.preventDefault();   // un ou plusieurs contrôles ont échoué
      }
      else {
        e.preventDefault();   // on bloque quand même l’HTML natif
        alert('Formulaire envoyé avec succès !');
        form.reset();         // réinitialise les champs
      }
    });
  });
});


// script.js
document.addEventListener('DOMContentLoaded', () => {
  const addButtons = document.querySelectorAll('.Ajouter-panier');

  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // on remonte jusqu'à la carte produit
      const card  = btn.closest('.article');
      const name  = card.querySelector('h3').textContent;
      const price = parseFloat(
        card.querySelector('p').textContent.replace(/[^0-9.]/g, '')
      );

      // lecture du panier existant (ou tableau vide)
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      // recherche existant
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      // on sauve back
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`✔ "${name}" ajouté au panier`);
    });
  });
});

