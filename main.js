let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#closeCart');

cartIcon.onclick = function () {
    cart.classList.add("active");
};

closeCart.onclick = function () {
    cart.classList.remove("active");
};


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let removeCartButtons = document.getElementsByClassName('cart-product-remove');
    console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    let quantityInput = document.getElementsByClassName('cart-product-quantity');
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i];
        input.addEventListener('change', quantityChange);
    }
    let addToCartButtons = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCart);
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', purchase);
}

function purchase() {
    alert('Thanks for your support')
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateCartTotal();
}


function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
}

function quantityChange(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addToCart(event) {
    let button = event.target;
    let product = button.parentElement;
    let productTitle = product.getElementsByClassName('product-title')[0].innerText;
    let productPrice = product.getElementsByClassName('product-price')[0].innerText;
    let productImg = product.getElementsByClassName('product-img')[0].src;
    addProductToCart(productTitle, productPrice, productImg);
    updateCartTotal();
}

function addProductToCart(productTitle, productPrice, productImg) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == productTitle) {
            alert(' This product have already add to your cart');
            return;
        }
    }
    let cartBoxContent = `  <img src="${productImg}" class="cart-img" alt="">
                            <div class="detail-box">
                                <div class="cart-product-title"> ${productTitle} </div>
                                <div class="cart-product-price"> ${productPrice} </div>
                                <input type="number" value="1" class="cart-product-quantity">
                            </div>
                            <i class="fas fa-trash-alt cart-product-remove"></i>
    `
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-product-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-product-quantity')[0].addEventListener('change', quantityChange);
    updateCartTotal();
}


function updateCartTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-product-price')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantityElement = cartBox.getElementsByClassName('cart-product-quantity')[0];
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}