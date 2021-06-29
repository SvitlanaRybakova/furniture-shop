const updateCart = (productButton, productId, productAdd = true) => {
  const cart = document.querySelector('.cart-header');
  const cartIcon = cart.querySelector('.cart-header__icon');
  const cartQuatity = cartIcon.querySelector('span');
  const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
  // общая оболочка списка товаров
  const cartList = document.querySelector('.cart-list');

  // добавляю товары
if(productAdd){
  if(cartQuatity){
     // если товары в кoрзине уже есть, тогда увеличиваю на 1,
    cartQuatity.innerHTML = ++ cartQuatity.innerHTML
// если товаров нет тогда создаю спан
  }else {
    cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`)
  }
}
 
  
}

export const addToCart = (productButton, productId) => {
  if(!productButton.classList.contains('_hold')){
    productButton.classList.add('_hold');
    productButton.classList.add('_fly');

    const cart = document.querySelector(".cart-header__icon");
    const product = document.querySelector(`[data-pid="${productId}"]`);
    const productImage = product.querySelector(".item-product__image");

    // что бы создать эффект летящей картинки в корзину
    const productImageFly = productImage.cloneNode(true);

    // размеры и координаты картинки товара
    const productImageFlyWidth = productImage.offsetWidth;
    const productImageFlyHeight = productImage.offsetHeight;
    const productImageFlyTop = productImage.getBoundingClientRect().top;
    const productImageFlyLeft = productImage.getBoundingClientRect().left;

    // присваиваю полученные размеры и кооординаты для клона
    // меняю аттрибут класса для клона(присвоение нового класса)
   productImageFly.setAttribute('class', '_flyImage');
    productImageFly.style.cssText = `
      left: ${productImageFlyLeft}px;
      top: ${productImageFlyTop}px;
      width: ${productImageFlyWidth}px;
      height: ${productImageFlyHeight}px;
    `;

    // вывожу клон в конец боди
    document.body.append(productImageFly);

    // отправляю клон в корзину
    const cartFlyLeft = cart.getBoundingClientRect().left;
    const cartFlyTop = cart.getBoundingClientRect().top;

    productImageFly.style.cssText = `
    left: ${cartFlyLeft}px;
    top: ${cartFlyTop}px;
    width: 0px;
    height: 0px;
    opacity: 0;
  `;

  // выводить количество товаров в корзине нужно тогда, когда клон долетит до нее, для этого использеутся transitionend
  productImageFly.addEventListener('transitionend', () => {
    if(productButton.classList.contains('_fly')){
      productImageFly.remove();
      updateCart(productButton, productId);
      productButton.classList.remove('_fly');
    }
  });

  }
}