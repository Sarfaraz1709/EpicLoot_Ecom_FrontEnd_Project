let table = document.getElementById("showtable")

async function gettabledata()
{
    let data = await fetch("http://localhost:3000/Products")
    let actualdata = await data.json()

    actualdata.forEach(makerows)

}

gettabledata()

function makerows(el)
{
   let row = document.createElement("tr")

   let tid = document.createElement("td")
   tid.innerText = el.id

   let tname = document.createElement("td")
   tname.innerText = el.productname

   let timage= document.createElement("td")
   let timg= document.createElement("img")
   timg.src = el.productimg
   timg.setAttribute("id","timg")
   timage.append(timg)


   let disc = document.createElement("td")
   disc.innerText = el.discription

   let price = document.createElement("td")
   price.innerText = `${el.price} Rs.`

   let Cate = document.createElement("td")
   Cate.innerText = el.Category

//-----------DETETE BUTTON  

   let tbutton = document.createElement("td")
   let delbtn = document.createElement("button")
   delbtn.innerText="Delete"
   delbtn.style="background-color:red;color:white;border-radius:5px;width:80px"
   delbtn.value=el.id //this will give the id of a perticular Product
   delbtn.addEventListener("click",deteteproduct) //on click it will call function 
   tbutton.append(delbtn)

//------------ENABLE/DISABLE BUTTON
   
   let status = document.createElement("td")
   let sbtn = document.createElement("button")
   sbtn.value=[el.id,el.display]

   if(el.display == true)
      {
          sbtn.style="background-color:Green;color:white;border-radius:5px;width:80px"
          sbtn.innerText="Enable"
      }
   else if(el.display == false)
      {
         sbtn.style="background-color:Red;color:white;border-radius:5px;width:80px"
         sbtn.innerText="Disable"
      }
   
   sbtn.addEventListener("click",statusbtn)
  
   status.append(sbtn)

//------------------------------------------------------

   row.append(tid,tname,timage,disc,price,Cate,tbutton,status);
   table.append(row)
}




async function deteteproduct()
{
   try 
     {
       await fetch( `http://localhost:3000/Products/${this.value}`,{method:"DELETE"} )
       alert( "Data Deleted Successsfully" )
     } 
   catch (error) 
     {
       alert("there is some error"+ error) 
     }
}

async function statusbtn() 
{
   event.preventDefault;
   if(this.value[1]) //if true
      {
        await fetch(`http://localhost:3000/Products/${this.value[0]}`,
         { method:"PATCH", //only change a single value
           body:JSON.stringify({display:false}), //if the value of Display is true than it will be false
           headers:{"content-Type":"application/json"} 
         })
      }
   else if(!this.value[1])//if false
   {
      await fetch(`http://localhost:3000/Products/${this.value[0]}`,
         { method:"PATCH",
           body:JSON.stringify({display:true}),
           headers:{"content-Type":"application/json"} 
         })
   }
}

//ADMINNAME-------------------------------------
let adminname = document.getElementById("dropbtn")
let getadmin = JSON.parse(localStorage.getItem("admindetails")) 
adminname.innerHTML = `Hii, ${getadmin[1]}.`

function Logout() 
{
  // Clear local storage
  localStorage.clear();
  window.location.replace("/Mainpage/main.html");
}