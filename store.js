if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded')
} else {
    ready()
}


function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var removeButton = removeCartItemButtons[i]

        removeButton.addEventListener('click', removeCartItemClicked)
    }

    var quantityInput = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i]

        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var addToCartButton = addToCartButtons[i]

        addToCartButton.addEventListener('click', addToCartClicked)
    }

    var purchaseButton = document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseButtonClicked)
}


function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0 || input.value == null) {
        input.value = 1
    }
    updateCartTotal()
}

function removeCartItemClicked(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function addToCartClicked(event) {
    var addButtonClicked = event.target
    var shopItem = addButtonClicked.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-title')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}


function purchaseItemClicked(event) {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
}  //remove all items in the cart items row after clicking purchase for new purchase in future

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')   //create a row at the cart for inserting item
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = document.getElementsByClassName('cart-item-title')
    for (i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item has been added to the cart')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>

    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="">
        <button class="btn btn-danger" role="button">Remove</button>
    </div>`

    cartRow.innerHTML = cartRowContents // adding the item to cart with align details
    cartItems.append(cartRow)

    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItemClicked)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


for (var i = 0; i < removeCartItemButtons.length; i++) {
    var removeButton = removeCartItemButtons[i]

    removeButton.addEventListener('click', () => {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    })
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]  //loop thru 1 by 1
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('RM', ''))   //get the price and convert to pure numbe with any string or symbosls
        var quantity = quantityElement.value

        total = total + (price * quantity)
    }
    total = (total * 100) / 100

    document.getElementsByClassName('cart-total-price')[0].innerText = 'RM' + total
}