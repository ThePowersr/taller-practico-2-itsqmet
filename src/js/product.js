import products from './data.js';

const container = document.querySelector('#products');

const shoppingCart = localStorage.getItem("shoppingCart") ? JSON.parse(localStorage.getItem("shoppingCart")) : [];

localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

const renderProducts = (title, subTitle, urlImage, price, id,) => `
  <div key="${id}" id="${id}" class="col-md-4 product-card">
    <div class="card">
      <img src="${urlImage}"
        class="card-img-top" alt="Producto 1">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${subTitle}</p>
        <p class="card-text"><strong>Precio:</strong> $${price}</p>
        <button class="btn btn-primary" id="button-${id}">Agregar al carrito</button>
      </div>
    </div>
  </div>
`;

products.map(product => {
  container
    ?
    container.insertAdjacentHTML('beforeend', renderProducts(product.title, product.subTitle, product.urlImage, product.price, product.id))
    : null;
});

products.forEach(product => {
  const button = document.querySelector(`#button-${product.id}`);
  button ?
    button.addEventListener('click', () => {
      const confirmation = window.confirm('¿Estás seguro de agregar este producto al carrito?');
      if (confirmation != false) {
        shoppingCart.push(product);
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
      } else {
        return;
      }
    }) :
    null;
});



