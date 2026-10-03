import { products } from "./data/products_data";
import "./css/style.css";
import "./css/product.css";
const NOIR_STORAGE_KEY = "noir_products";

// Get products from localStorage
let storedProducts = JSON.parse(localStorage.getItem(NOIR_STORAGE_KEY));

if (!storedProducts) {
  storedProducts = products;

  localStorage.setItem(NOIR_STORAGE_KEY, JSON.stringify(products));
}

// Get product id from URL
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

// Find product
const result = storedProducts.filter((product) => {
  return product.id === productId;
});

let selectedProduct = result[0];

const productImage = document.querySelector("#product-image");
const productCategory = document.querySelector("#product-category");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productDescription = document.querySelector("#product-description");

productImage.src = selectedProduct.image;
productImage.alt = selectedProduct.name;

productCategory.textContent = selectedProduct.category;

productName.textContent = selectedProduct.name;

productPrice.textContent = `₹${selectedProduct.price}`;

productDescription.textContent = selectedProduct.description;

//product size selection

const sizeButtons = document.querySelectorAll(".size-options button");
let selectedSize = null;
sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("selected")) {
      // User clicked the already-selected size
      button.classList.remove("selected");
      selectedSize = null;
    } else {
      // Remove previous selection
      sizeButtons.forEach((btn) => {
        btn.classList.remove("selected");
      });

      // Select new size
      button.classList.add("selected");
      selectedSize = button.getAttribute("data-size");
    }

    console.log(selectedSize);
  });
});

// add to bag
const NOIR_CART_KEY="noir_cart";
let storedCart  = JSON.parse(localStorage.getItem(NOIR_CART_KEY) || "[]");
const addToBagButton = document.querySelector(".product-page__add-to-bag");
addToBagButton.addEventListener("click", () => {
  console.log("Add to Bag clicked");
  console.log(selectedSize);
  if (selectedSize === null) {
    console.log("please select a zize");
    return;
  }
  const cartItem = {
    productId: selectedProduct.id,
    name: selectedProduct.name,
    price: selectedProduct.price,
    size: selectedSize,
    quantity: 1,
  };
  let alredyStoredItem = storedCart.find((item)=>{
    return(
      item.productId===cartItem.productId && item.size ===cartItem.size
    )
  });
  if(alredyStoredItem){
    alredyStoredItem.quantity+=1;

  }else{
    storedCart.push(cartItem);
  }
  localStorage.setItem(NOIR_CART_KEY,JSON.stringify(storedCart));

});

//cart count
//const cartItemCoutn = storedCart.length;  just give length but what if item have 2 quantitiy give wrong length

const cartItemCoutn = storedCart.reduce((total,item)=>{
  return total + item.quantity;
},0)
document.querySelector('.bag-count').textContent = cartItemCoutn;

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
