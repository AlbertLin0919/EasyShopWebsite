let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let close = document.querySelector("#close-cart");

cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cart.classList.add("active");
});

close.addEventListener("click", (e) => {
  e.preventDefault();
  cart.classList.remove("active");
});

if (document.readyState == "loading") {
  addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  updateTotal();
  let removeCartButtons = document.querySelectorAll(".cart-remove");

  removeCartButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });

  let quantityInputs = document.querySelectorAll(".cart-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", () => {
      updateTotal();
    });
  });

  let addToCarts = document.querySelectorAll(".add-cart");

  addToCarts.forEach((cart) => {
    cart.addEventListener("click", addCartClicked);
  });

  let buyBtn = document.querySelector(".btn-buy");
  buyBtn.addEventListener("click", (e) => {
    let cartContent = e.target.parentElement.querySelector(".cart-content");
    if (!cartContent.hasChildNodes()) {
      alert("你的購物車是空的!!");
      return;
    }
    alert("你的訂單已被送出");
    while (cartContent.firstChild) {
      cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
  });
}

function addCartClicked(e) {
  let parent = e.target.parentElement;

  let title = parent.querySelector(".product-title").innerText;
  let img = parent.querySelector(".product-img").src;
  let price = parent.querySelector(".price").innerText;

  let cartContent = document.querySelector(".cart-content");

  let cartTitle = document.querySelectorAll(".cart-product-title");

  for (let i = 0; i < cartTitle.length; i++) {
    if (title == cartTitle[i].innerText) {
      alert("購物車裡已經有這件商品了");
      return;
    }
  }

  let cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
  <img src="${img}" class="cart-img" />
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" min="1" value="1" class="cart-quantity" />
  </div>
  <i class="bx bxs-trash-alt cart-remove"></i>
  `;
  cartContent.appendChild(cartBox);
  updateTotal();

  cartContent.querySelectorAll(".cart-remove").forEach((box) => {
    box.addEventListener("click", removeCartItem);
  });

  cartContent.querySelectorAll(".cart-quantity").forEach((box) => {
    box.addEventListener("change", updateTotal);
  });
}

function removeCartItem(e) {
  e.target.parentElement.remove();
  updateTotal();
}

function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;
  cartBoxes.forEach((box) => {
    let quantity = box.querySelector(".cart-quantity").value;
    let price = box.querySelector(".cart-price").innerText.replace("$", "");
    total += parseFloat(quantity) * parseFloat(price);
  });

  document.querySelector(".total-price").innerText = "$" + total;
}
