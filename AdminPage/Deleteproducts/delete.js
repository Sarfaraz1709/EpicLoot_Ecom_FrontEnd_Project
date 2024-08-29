let deletebtn = document.getElementById("deletebtn")
deletebtn.addEventListener("click",deleteproduct)


async function deleteproduct()
{
    let delid = document.getElementById("deleteid").value

    await fetch(`http://localhost:3000/Products/${delid}`,{
        method:"DELETE"
    })

    alert("DATA DELETED SUCCESSFULLY !!!")
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