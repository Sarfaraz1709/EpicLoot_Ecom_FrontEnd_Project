// Get user details from localStorage
let getdata = JSON.parse(localStorage.getItem("userdetails"))
let Name = document.getElementById("dropbtn")
Name.style = "font-weight:bold"
Name.innerText = `Hii, ${getdata[1]}.`

var username = getdata[1]
var userid = getdata[0]

// Function to create and display cart item cards
function cartcard(obj) {
  let cont = document.getElementById("container")
  
  let card = document.createElement("div")
  card.setAttribute("class", "card")
  card.setAttribute("data-id", obj.id)

  let Pname = document.createElement("h2")
  Pname.innerText = obj.prodname
  Pname.classList.add("product-name")

  let Pimage = document.createElement("img")
  Pimage.src = obj.prodimg
  Pimage.setAttribute("id", "Pimage")

  let Pprice = document.createElement("h2")
  Pprice.innerText = `${obj.prodprice * obj.quantity} Rs.`
  Pprice.setAttribute("class", "price")

  let Pquantity = document.createElement("div")
  Pquantity.setAttribute("class", "quantity-control")

  let quantityMinus = document.createElement("button")
  quantityMinus.innerText = "-"
  quantityMinus.onclick = () => changeQuantity(obj, -1)

  let quantityValue = document.createElement("span")
  quantityValue.innerText = obj.quantity
  quantityValue.setAttribute("class", "quantity-value")

  let quantityPlus = document.createElement("button")
  quantityPlus.innerText = "+"
  quantityPlus.onclick = () => changeQuantity(obj, 1)

  Pquantity.append(quantityMinus, quantityValue, quantityPlus)

  let removeBtn = document.createElement("button")
  removeBtn.innerText = "Remove"
  removeBtn.setAttribute("class", "remove-btn")
  removeBtn.onclick = () => removeProduct(obj)

  card.append(Pimage, Pname, Pprice, Pquantity, removeBtn)
  cont.append(card)
}

// Function to remove a product from the cart
function removeProduct(product) {
  let card = document.querySelector(`.card[data-id='${product.id}']`)
  card.remove()

  fetch(`http://localhost:3000/Cart/${product.id}`, {
    method: 'DELETE'
  })
  .then(() => {
    getusercart()
  })
}

// Function to update the subtotal
function updateSubtotal(userCartItems) {
  let subtotal = userCartItems.reduce((total, item) => total + (item.prodprice * item.quantity), 0)
  let subtotalElement = document.getElementById("Subtotal")
  
  subtotalElement.innerHTML = `
    <h2>Subtotal: ${subtotal} Rs.</h2>
    <ul>
      ${userCartItems.map(item => `<li>${item.prodname}: ${item.prodprice} Rs. x ${item.quantity}</li>`).join('')}
    </ul>

    <input type="text" id="carddetails" placeholder="XXXX-XXXX-XXXX-XXX" required style="border-radius: 5px;height:20px;">
    <button class="pay-btn">Pay Now</button>
  `//Tamplet Letrals
}

// Function to change the quantity of a product
function changeQuantity(product, change) {
  product.quantity += change
  if (product.quantity < 1) {
      product.quantity = 1
  }

  fetch(`http://localhost:3000/Cart/${product.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: product.quantity })
  })
  .then(() => {
      let quantityValue = document.querySelector(`.card[data-id='${product.id}'] .quantity-value`)
      quantityValue.innerText = product.quantity

      let Pprice = document.querySelector(`.card[data-id='${product.id}'] .price`)
      Pprice.innerText = `${product.prodprice * product.quantity} Rs.`

      getusercart()
  })
}

// Fetch and display the user's cart items
async function getusercart() {
  let data = await fetch("http://localhost:3000/Cart")
  let actualdata = await data.json()
  
  let userCartItems = actualdata.filter(item => item.userid === userid)
  
  if (userCartItems.length > 0) {
      document.getElementById("container").innerHTML = ""
      userCartItems.forEach(cartcard)
      updateSubtotal(userCartItems)
  } else {
      alert("Please add a product to the cart.")
  }
}

// Call the function to fetch and display the user's cart items
getusercart()

//ADDMOREITEMS BUTTON
function AddmoreItems()
{
  window.location.href="/UserPage/userpage/user.html";
}
function Logout() 
{
 // Clear local storage
 localStorage.clear();
 window.location.replace("/Mainpage/main.html");
}
