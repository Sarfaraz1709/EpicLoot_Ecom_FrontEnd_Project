//set the data inside the form 
let updatebtn = document.getElementById("udateidbtn")
updatebtn.addEventListener("click",Getdata)
let id;

async function Getdata()
{
    id = document.getElementById("updateid").value
    let data = await fetch(`http://localhost:3000/Products/${id}`)
    let actualdata = await data.json()
    putdatainform(actualdata)
}
function putdatainform(data)
{
    let form = document.getElementById("updateform")

    let name = form.fname
    name.value = data.productname

    let image = form.fimage
    image.value = data.productimg

    let dis = form.fdiscription
    dis.value = data.discription

    let pric = form.fprice
    pric.value = data.price

    let Cat = form.fCategory
    Cat.value = data.Category
}

// now update the data when click on sumbit

let form = document.getElementById("updateform")
form.addEventListener("submit",updateproduct)

async function updateproduct() 
{
    // variable = form.id.insidevalue
    let productname = form.fname.value
    let productimg = form.fimage.value
    let discription = form.fdiscription.value
    let price = form.fprice.value
    let Category = form.fCategory.value
    
    let obj = {productname,productimg,discription,price,Category}

    await fetch(`http://localhost:3000/Products/${id}`,{
        method:"PATCH",
        body:JSON.stringify(obj),
        headers:{"content-type":"application/json"}
    })

    alert("data Updated Successfully")
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