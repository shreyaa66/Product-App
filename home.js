let mainDiv = document.querySelector("#main-container");
let loadmorebtn = document.querySelector("#loadmore");
let loadlessbtn = document.querySelector("#loadless");
let mycartbtn = document.querySelector("#mycart");
let logoutbtn = document.querySelector("#logout");
let loadCounter = 4;
// console.log(localStorage.getItem("products"));
let productArr = [];
let cart = []
const createProductCard = (item) =>{
    let div = document.createElement("div");
    div.setAttribute("class","divs");
    div.style = "width : 250px; min-height : 220px; padding : 15px; border : 2px solid black; margin-left : 30px; border-top-left-radius: 4px;border-top-right-radius: 4px;";
    
    let img = document.createElement("img");
    // img.src  = "C:\Users\OM\Documents\FS\Project 2\images\redmi8.jpg";
    // img.style = "width : 150px; height : 150px;";

    let addToCartbtn = document.createElement("button");
    addToCartbtn.innerText = "Add To Cart";
    addToCartbtn.style = "margin-top: 5px;color: rgb(123, 255, 0); background:rgb(1, 83, 92); height: 30px; cursor: pointer";
    addToCartbtn.addEventListener("click",addToCart(item));
    let span  = document.createElement("span");
    span.innerHTML = `<br>Product Name : ${item.productName} <br>&nbsp Price : ${item.productPrice}<br>`;

    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(addToCartbtn);
    mainDiv.appendChild(div);
    setLocalStorage();
}

loadmorebtn.addEventListener("click",()=>{
    for(let i = loadCounter; i < loadCounter+4 && i < productArr.length; i++){
        createProductCard(productArr[i]);
    }
    loadCounter += 4;
    if(loadCounter >=productArr.length){
        loadmorebtn.style = "visibility:hidden;";
    }
    
})
const addToCart = (item)=>{
    const loggedInUser = localStorage.getItem("LoggedAsUser") ? JSON.parse(localStorage.getItem("LoggedAsUser")):"";
    let flag = 0;
    console.log(loggedInUser)
    cart.forEach((prod)=>{
        if(prod.email == loggedInUser && prod.pname == item.productName){
            prod.qty += 1;
            flag = 1;
        }
    })
    if(flag == 0){
        let cartObj = {};
        cartObj.pname = item.productName;
        cartObj.quantity = 1;
        cartObj.price = item.productPrice;
        // cartObj.img = item.img;
        cartObj.id = item.id;
        cartObj.email = loggedInUser;
        cart.push(cartObj);
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    
}


const getLocalStorage = () =>{
    productArr = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")): [];
    let i = 0;
    productArr.forEach((item)=>{
        if(i < loadCounter){
            createProductCard(item);
            i++;
        }
    })
    cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
}

const setLocalStorage = ()=>{
    localStorage.setItem("cartList",JSON.stringify(productArr));
}

mycartbtn.addEventListener("click",()=>{
    const loggedInUser = localStorage.getItem("LoggedAsUser") ? JSON.parse(localStorage.getItem("LoggedAsUser")):"";
    if(loggedInUser == ""){
        console.log("Redirect");
        window.location.href = "../Login/login.html";        
    }
    else{
        window.location.href = "./myCart.html";
    }
})

logoutbtn.addEventListener("click",()=>{
    localStorage.removeItem("LoggedAsUser");
    window.location.href = "../Login/login.html";
})
getLocalStorage();