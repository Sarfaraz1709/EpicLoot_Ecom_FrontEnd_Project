let loginbtn = document.getElementById("loginbtn")
loginbtn.addEventListener("click", login)

async function login() 
{
    event.preventDefault();  // Prevent form submission

    let data = await fetch("http://localhost:3000/logininfo")
    let actualdata = await data.json()

    actualdata.forEach(checkuser)
}

function checkuser(el,i,arr)
{
    checkUserCredentials(el);
}

function checkUserCredentials(data) 
{

    let form = document.getElementById("login-form")

    let username = form.usernm.value;
    let password = form.userpass.value;

    if (username == data.username && password == data.password) 
    {
       if(data.status=="user")
        {
            window.location.href='../UserPage/userpage/user.html'
            let userobj = [data.id,data.username]
            localStorage.setItem("userdetails",JSON.stringify(userobj))
        }
        else if(data.status=="admin")
        {
            window.location.href='../AdminPage/admin.html'
            let adminobj = [data.id,data.username]
            localStorage.setItem("admindetails",JSON.stringify(adminobj))
        }
    } 
    else 
    {
       // Show error message
       let errorMessage = document.getElementById('error-message');
       errorMessage.style.display = 'block';

       // Hide error message after 1.5seconds
       setTimeout(function() {errorMessage.style.display = 'none';}, 1500); 
    }
}

//Container-------------------------

let cont = document.getElementById("container") //mainpage

let pagebtn = document.getElementById("pages")

async function seeproduct()
{
  let data=await fetch(`http://localhost:3000/Products?_page=1 &_per_page=8`)
  let actualobj=await data.json()
  cont.innerHTML=""
  actualobj.data.forEach(myproducts)

      //---FOR BUTTONS-----
        let products = await fetch("http://localhost:3000/Products")
        let actualdata = await products.json()
        let perpage = Math.ceil((actualdata.length)/8)

          for(let i=1;i<=perpage;i++)
            {
              makebtn(i)
            }
}
seeproduct()

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
  let data=await fetch(`http://localhost:3000/Products?_page=${this.value}&_per_page=8`)
  let actualobj=await data.json()
  cont.innerHTML=""
  console.log(actualobj)
  actualobj.data.forEach(myproducts)
}

function myproducts(obj)
{
  let card = document.createElement("div")
  card.setAttribute("class","card")

  let Pimage = document.createElement("img")
  Pimage.src = obj.productimg
  Pimage.setAttribute("id","Pimage")
  
  card.append(Pimage)

  cont.append(card)
}  


//----------------------------------------------------------



