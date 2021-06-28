const productsItems = document.querySelector(".products__items");

const loadProducts = (data) => {
  const test = data.map((product) => {
    const {
      id,
      url,
      image,
      title,
      text,
      price,
      priceOld,
      shareUrl,
      likeUrl,
      labels,
    } = product;
    const productTemplateStart = `
    <article data-pid=${id} class="products__item item-product">`;
    const productTemplateEnd = `</article>`;

    let productTemplateLabels = "";
    if (labels) {
      const productTemplateLabelsStart = `<div class="item-product__labels">`;
      const productTemplateLabelsEnd = `</div>`;
      let productTemplateLabelsContent = "";

      labels.forEach((labelItem) => {
        productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
      });

      productTemplateLabels = productTemplateLabelsStart +
      productTemplateLabelsContent + productTemplateLabelsEnd
      // productTemplateLabels += productTemplateLabelsStart;
      // productTemplateLabels += productTemplateLabelsContent;
      // productTemplateLabels += productTemplateLabelsEnd;
    }
    const productTemplateImage = `
      <a href="${url}" class="item-product__image">
        <img src="img/products/${image}" alt="${title}">
      </a>
  `;

    const productTemplateBodyStart = `<div class="item-product__body">`;
    const productTemplateBodyEnd = `</div>`;
    let productTemplateBodyContent = `
      <div class="item-product__content">
        <h5 class="item-product__title">${title}</h5>
        <div class="item-product__text">${text}</div>
      </div>
      `;

    let productTemplatePrices = '';
    const productTemplatePricesStart = `
      <div class="item-product__prices">
    `;
    const productTemplatePricesEnd = `</div>`;
    const productTemplatePricesCurrent = `
    <div class="item-product__price">Rp ${price}</div>
    `;
    const productTemplatePricesOld = `
    <div class="item-product__price item-product__price_old">Rp ${priceOld}</div>
    `;
    

    productTemplatePrices += productTemplatePricesStart;
    productTemplatePrices += productTemplatePricesCurrent;
    if(priceOld){
      productTemplatePrices += productTemplatePricesOld;
    }
    productTemplatePrices += productTemplatePricesEnd;

    const productTemplateActions = `
          <div class="item-product__actions actions-product">
            <div class="actions-product__body">
              <a href="" class="actions-product__button btn btn_white">Add to cart</a>
              <a href="${shareUrl}" class="actions-product__link _icon-share">Share</a>
              <a href="${likeUrl}" class="actions-product__link _icon-favorite">Like</a>
            </div>
          </div>
    `;

    let productTemplateBody = '';
    productTemplateBody = productTemplateBodyStart +
    productTemplateBodyContent +
    productTemplatePrices +
    productTemplateActions +
    productTemplateBodyEnd;
    // productTemplateBody += productTemplateBodyStart;
    // productTemplateBody += productTemplateBodyContent;
    // productTemplateBody += productTemplatePrices;
    // productTemplateBody += productTemplateActions;
    // productTemplateBody += productTemplateBodyEnd;
    

    let productTemplate ="";
    productTemplate = productTemplateStart +
    productTemplateLabels +
    productTemplateImage +
    productTemplateBody +
    productTemplateEnd;
    // productTemplate += productTemplateStart;
    // productTemplate += productTemplateLabels;
    // productTemplate += productTemplateImage;
    // productTemplate += productTemplateBody;
    // productTemplate += productTemplateEnd;

    return productTemplate
  });
  productsItems.insertAdjacentHTML("beforeend", test);
};

export const getProducts = async (button) => {
  console.log("click on ", button);
  if (!button.classList.contains("_hold")) {
    button.classList.add("_hold");
    const file = "json/products.json";
    let response = await fetch(file, {
      method: "GET",
    });
    if (response.ok) {
      let result = await response.json();
      loadProducts(result);
      button.classList.remove("_hold");
      button.remove();
    } else {
      throw new Error("error", response);
    }
  }
};
