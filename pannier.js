// panier.js
document.addEventListener('DOMContentLoaded', () => {
  const cartList  = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const clearBtn  = document.getElementById('clear-cart');

  // charge et parse
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, i) => {
      const line = document.createElement('li');
      const subtotal = item.price * item.qty;
      total += subtotal;

      line.innerHTML = `
        ${item.name} — ${item.qty} × ${item.price.toFixed(2)} $ = ${subtotal.toFixed(2)} $
        <button data-index="${i}" class="remove-item">❌</button>
      `;
      cartList.append(line);
    });

    cartTotal.textContent = total.toFixed(2);
  }

  // suppression à la volée
  cartList.addEventListener('click', e => {
    if (!e.target.classList.contains('remove-item')) return;
    const idx = parseInt(e.target.dataset.index, 10);
    cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  });

  // vider tout le panier
  clearBtn.addEventListener('click', () => {
    if (confirm('Vider totalement le panier ?')) {
      cart = [];
      localStorage.removeItem('cart');
      renderCart();
    }
  });

  // affichage initial
  renderCart();
});