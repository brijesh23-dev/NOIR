import "./css/style.css";

import { products } from "./data/products_data";

const NOIR_STORAGE_KEY = "noir_products";

let storedProducts = JSON.parse(localStorage.getItem(NOIR_STORAGE_KEY));

if (storedProducts === null) {
  storedProducts = products;

  localStorage.setItem(NOIR_STORAGE_KEY, JSON.stringify(storedProducts));
}

//console.log(storedProducts);

const prodGrid = document.querySelector(".product-grid");

storedProducts.forEach((product) => {
  const { id, name, price, category, image: imageUrl } = product;

  // Product Card
  const productCard = document.createElement("article");
  productCard.classList.add("product-card");
  productCard.setAttribute("data-product-id", id);

  // Image Wrapper
  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("product-card__image-wrapper");

  // Image
  const image = document.createElement("img");
  image.classList.add("product-card__image");
  image.setAttribute("src", imageUrl);
  image.setAttribute("alt", name);

  // Wishlist Button
  const wishlistButton = document.createElement("button");
  wishlistButton.classList.add("product-card__wishlist");
  wishlistButton.textContent = "♡";

  imageWrapper.append(image, wishlistButton);

  // Product Info
  const productInfo = document.createElement("div");
  productInfo.classList.add("product-card__info");

  // Product Details
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-card__details");

  const productName = document.createElement("h3");
  productName.classList.add("product-card__name");
  productName.textContent = name;

  const productCategory = document.createElement("p");
  productCategory.classList.add("product-card__category");
  productCategory.textContent = category;

  // Price
  const productPrice = document.createElement("p");
  productPrice.classList.add("product-card__price");
  productPrice.textContent = `₹${price}`;

  productDetails.append(productName, productCategory);
  productInfo.append(productDetails, productPrice);

  // Complete Card
  productCard.append(imageWrapper, productInfo);

  // Add card to grid
  prodGrid.appendChild(productCard);

  //click event
});

document.querySelectorAll(".product-card").forEach((product) => {
  product.addEventListener("click", (e) => {
    const productId = product.getAttribute("data-product-id");
    window.location.href = `product.html?id=${productId}`;
  });
});

// cart panel

const bagButton = document.querySelector(".header__bag");
const bagPanel = document.querySelector(".bag-panel");
const bagCloseButton = document.querySelector(".bag-panel__close");

bagButton.addEventListener("click", () => {
  bagPanel.classList.add("show");
});

bagCloseButton.addEventListener("click", () => {
  bagPanel.classList.remove("show");
});

//cart count
const NOIR_CART_KEY = "noir_cart";
const storedCart = JSON.parse(localStorage.getItem(NOIR_CART_KEY) || "[]");
const cartItemCoutn = storedCart.reduce((total, item) => {
  return total + item.quantity;
}, 0);
document.querySelector(".bag-count").textContent = cartItemCoutn;

//bag-panel--items

const bagItems = document.querySelector(".bag-panel__items");

function createBagItem(cartItem) {
  const item = document.createElement("article");
  item.classList.add("bag-item");

  const name = document.createElement("h3");
  name.classList.add("bag-item__name");
  name.textContent = cartItem.name;

  const size = document.createElement("p");
  size.classList.add("bag-item__size");
  size.textContent = `Size: ${cartItem.size}`;

  const price = document.createElement("p");
  price.classList.add("bag-item__price");
  price.textContent = `₹${cartItem.price}`;

  const quantitiyContainer = document.createElement("div");
  quantitiyContainer.classList.add("bag-item__quantity");

  const decreaseButton = document.createElement("button");
  decreaseButton.type = "button";
  decreaseButton.textContent = "−";

  const quantityText = document.createElement("span");
  quantityText.textContent = cartItem.quantity;

  const increaseButton = document.createElement("button");
  increaseButton.type = "button";
  increaseButton.textContent = "+";

  const removeButton = document.createElement("button");

  removeButton.type = "button";
  removeButton.classList.add("bag-item__remove");
  removeButton.textContent = "Remove";

  quantitiyContainer.append(decreaseButton, quantityText, increaseButton,removeButton);

  item.append(name, size, price, quantitiyContainer);

  //increase quantity
  increaseButton.addEventListener("click", () => {
    cartItem.quantity += 1;
    quantityText.textContent = cartItem.quantity;
    localStorage.setItem(NOIR_CART_KEY, JSON.stringify(storedCart));
  });

  decreaseButton.addEventListener("click", () => {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      quantityText.textContent = cartItem.quantity;
      localStorage.setItem(NOIR_CART_KEY, JSON.stringify(storedCart));
    }
  });

  removeButton.addEventListener('click',()=>{
     const remaining = storedCart.filter((item)=>{
      return !(item.productId===cartItem.productId && item.size===cartItem.size)
    })
    localStorage.setItem(NOIR_CART_KEY,JSON.stringify(remaining))
    console.log('btn removed ')
  })
  return item;
}

storedCart.forEach((cartItem) => {
  const item = createBagItem(cartItem);
  bagItems.append(item);
});
