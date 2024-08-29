let cont = document.getElementById("container") //mainpage

async function seeproduct()
{

  let data=await fetch(`http://localhost:3000/Products?_page=1 &_per_page=6`)
  let actualobj=await data.json()
  cont.innerHTML=""
  actualobj.data.forEach(myproducts)

   let products = await fetch("http://localhost:3000/Products")
   let actualdata = await products.json()
   let perpage = Math.ceil((actualdata.length)/6)

    for(let i=1;i<=perpage;i++)
      {
        makebtn(i)
      }
}

seeproduct()

let pagebtn = document.getElementById("pages")

function makebtn(obj)
{
  let btn = document.createElement("button")
  btn.value=obj
  btn.innerText=obj
  btn.setAttribute("class","pbtn")
  pagebtn.append(btn)
  btn.addEventListener("click",paginatedata)
}

async function paginatedata()
{
  let data=await fetch(`http://localhost:3000/Products?_page=${this.value}&_per_page=6`)
  let actualobj=await data.json()
  cont.innerHTML=""
  console.log(actualobj)
  actualobj.data.forEach(myproducts)
}

function myproducts(obj)
{
  let card = document.createElement("div")
  card.setAttribute("class","card")

  let Pname = document.createElement("h2")
  Pname.innerText = obj.productname
  Pname.style="color:white"
  Pname.setAttribute("id","Pname")

  let Pimage = document.createElement("img")
  Pimage.src = obj.productimg
  Pimage.setAttribute("id","Pimage")
  
  let discription = document.createElement("h4")
  discription.innerText = obj.discription
  discription.style="color:white"

  let Cat = document.createElement("h3")
  Cat.innerText = obj.Category
  Cat.style="color:white"

  let Pprice = document.createElement("h2")
  Pprice.innerText = `${obj.price} Rs.`
  Pprice.setAttribute("id","Pprice")
//------ADD TO CART BUTTON
      let addtocart = document.createElement("button")
      addtocart.innerText = "Add To Cart"
      addtocart.setAttribute("id","adtocartbtn")
      addtocart.value = JSON.stringify([obj.id, obj.productname, obj.price, obj.productimg]);
      addtocart.addEventListener('click',ADDTOCART)
//-----------------------
  card.append(Pname,Pimage,discription,Cat,Pprice,addtocart)
  cont.append(card)
}  

//----------------------\
let getdata = JSON.parse(localStorage.getItem("userdetails"))
let Name = document.getElementById("dropbtn")
Name.style="font-weight:bold"
Name.innerText=`Hii, ${getdata[1]}.`

//--------------------------------

function Logout() 
{
 // Clear local storage
 localStorage.clear();
 window.location.replace("/Mainpage/main.html");
}

//ADD TO CART-------->>>>>>>>>>>>>>

function ADDTOCART()
{
  let getdata = JSON.parse(localStorage.getItem("userdetails"));
  let product = JSON.parse(this.value); // Parse the string back into an array
  let userid = getdata[0];
  let username = getdata[1];
  let prodid = product[0];
  let prodname = product[1];
  let prodprice = product[2];
  let prodimg = product[3];
  let quantity = 1;

  let obj = { userid, username, prodid, prodname, prodprice, prodimg, quantity };
  
  putincart(obj)
}

async function putincart(obj) 
{

    event.preventDefault
    
    await fetch("http://localhost:3000/Cart",{
    method:"POST",
    body:JSON.stringify(obj),
    headers:{"Content-Type":"application/json"}
  });
alert("Added To Cart")
}
//------------------------------------------
// Function to handle category selection and show filtered products
let select = document.getElementById("Category");
select.addEventListener("change", changeed);

async function changeed() {
  let selectedCategory = this.value;
  let response;

  if (selectedCategory) {
      // Fetch products based on selected category
      response = await fetch(`http://localhost:3000/Products?Category=${selectedCategory}`);
  } else {
      // Fetch all products if no category is selected
      response = await fetch(`http://localhost:3000/Products`);
  }

  let products = await response.json();
  cont.innerHTML = ""; // Clear the container before displaying new products

  // Display each product using the myproducts function
  products.forEach(myproducts);
}
























