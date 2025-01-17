const shoppingCart = localStorage.getItem("shoppingCart") ? JSON.parse(localStorage.getItem("shoppingCart")) : [];

const container = document.querySelector('#products');

const titleShoppingCart = document.querySelector('#title');

const totalShoppingCart = document.querySelector('#total');

const renderProduct = (title, subTitle, urlImage, price, id) => `
<div class="col-md-12">
<div class="product-card">
  <img src="${urlImage}"
    alt="Curso Básico de JavaScript">
  <div class="product-card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${subTitle}</p>
    <p class="card-text"><strong>Precio:</strong> $${price}</p>
    <button class="btn btn-agregar" id="product-${id}">Eliminar del carrito</button>
  </div>
</div>
</div>`

shoppingCart.map(product => {
  container
    ?
    container.insertAdjacentHTML('beforeend', renderProduct(product.title, product.subTitle, product.urlImage, product.price, product.id))
    : null;
});

if (shoppingCart.length > 0) {
  titleShoppingCart.innerHTML = 'Productos que has seleccionado:';
  totalShoppingCart.innerHTML = `Total: $${shoppingCart.reduce((acc, product) => acc + product.price, 0)}`;
} else {
  titleShoppingCart.innerHTML = 'No has seleccionado ningún producto.';
  totalShoppingCart.innerHTML = `Total: $0`;
}

shoppingCart.forEach(product => {
  const button = document.querySelector(`#product-${product.id}`);
  button ? button.addEventListener('click', () => {
    const updateCart = shoppingCart.filter(item => item.id !== product.id);
    localStorage.setItem("shoppingCart", JSON.stringify(updateCart))
    button.closest('.col-md-12').remove();
    shoppingCart.length = 0;
    shoppingCart.push(...updateCart);
    totalShoppingCart.innerHTML = `Total: $${shoppingCart.reduce((acc, product) => acc + product.price, 0)}`;
    if (shoppingCart.length === 0) {
      titleShoppingCart.innerHTML = 'No has seleccionado ningún producto.';
    }
  }) :
    null;
});

console.log(shoppingCart);