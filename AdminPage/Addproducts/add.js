let form = document.getElementById("form");

form.addEventListener("submit",getproducts)

function getproducts()
{
    event.preventDefault();

    let id = form.prodid.value;
    let productname = form.Prodname.value;
    let productimg = form.Prodimg.value;
    let discription = form.Proddis.value;
    let price = form.Prodprice.value;
    let Category = form.Category.value;
    let display = true;

    let obj={
        id,
        productname,
        productimg,
        discription,
        price,
        display,
        Category
    }

    postproduct(obj)
}

async function postproduct(data)
{
 await fetch("http://localhost:3000/Products",{
    method:"POST",
    body:JSON.stringify(data),
    headers:{"Content-Type":"application/json"}
 })

 alert("Product Added Successfully :)")
}

let adminname = document.getElementById("dropbtn")
let getadmin = JSON.parse(localStorage.getItem("admindetails")) 
adminname.innerHTML = `Hii, ${getadmin[1]}.`

function Logout() 
{
  // Clear local storage
  localStorage.clear();
  window.location.replace("/Mainpage/main.html");
}