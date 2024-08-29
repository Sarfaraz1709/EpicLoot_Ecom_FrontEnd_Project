let form = document.getElementById("register-form")

let Regbtn = document.getElementById("regbtn")
Regbtn.addEventListener("click",setdata)

function setdata()
{
    event.preventDefault();
    
    let username = form.uname.value;
    let usermobile = form.umobile.value;
    let usercity = form.ucity.value;
    let usergender = form.ugender.value;
    let password = form.upass.value;
    let status = form.ustatus.value;

    let obj={
        username,usermobile,usercity,usergender,password,status
    }

    AddData(obj)
} 

async function AddData(data) 
{
    await fetch("http://localhost:3000/logininfo",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{"Content-Type":"application/json"}
    })   

    alert("You can login now")
    window.location.href='Mainpage\main.html'
}