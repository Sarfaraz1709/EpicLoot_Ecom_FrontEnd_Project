let adminname = document.getElementById("dropbtn")
if(localStorage.getItem("userdetails"))
    {
        var getadmin = JSON.parse(localStorage.getItem("userdetails"))
    }
else if(localStorage.getItem("admindetails"))
    {
        var getadmin = JSON.parse(localStorage.getItem("admindetails"))
    }

adminname.innerHTML = `Hii, ${getadmin[1]}`
Getdata()
// ---------Update

async function Getdata()
{
    let data = await fetch(`http://localhost:3000/logininfo/${getadmin[0]}`)
    let actualdata = await data.json()
    putdatainform(actualdata)
}
function putdatainform(data)
{
    let form = document.getElementById("edit-form")

    let name = form.uname
    name.value = data.username

    let mobile = form.umobile
    mobile.value = data.usermobile

    let city = form.ucity
    city.value = data.usercity

    let gender = form.ugender
    gender.value = data.usergender
}

// update Data

let updatebtn = document.getElementById("updtbtn")
updatebtn.addEventListener("click",updatedetails)

async function updatedetails() 
{
    let form = document.getElementById("edit-form")
    let username = form.uname.value
    let usermobile = form.umobile.value
    let usercity = form.ucity.value
    let usergender = form.ugender.value

    let obj = {username,usermobile,usercity,usergender}

    await fetch(`http://localhost:3000/logininfo/${getadmin[0]}`,{
        method:"PATCH", //only perticular part will be updated
        body:JSON.stringify(obj),
        headers:{"content-type":"application/json"}
    })

    alert("data Updated Successfully")
}
function Logout() 
{
  // Clear local storage
  localStorage.clear();
  window.location.replace("/Mainpage/main.html");
}
