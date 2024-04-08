    let mainDiv = document.querySelector("#main-container");
    let cart = [];
    const loggedInUser = localStorage.getItem("LoggedAsUser") ? JSON.parse(localStorage.getItem("LoggedAsUser")):"";

    const addToUI = (obj) =>{
        let div = document.createElement("div");
        div.setAttribute("id", obj.id);
        div.innerHTML = `${obj.pname} &nbsp &nbsp ${obj.price} &nbsp &nbsp`;

        let deletebtn = document.createElement("button");
        deletebtn.innerText = "Delete";
        deletebtn.addEventListener("click",deleteHandler);

        let qty = document.createElement("span");
        qty.innerHTML = `&nbsp${obj.quantity}&nbsp`;

        let incbtn = document.createElement("button");
        incbtn.innerText = "+";
        incbtn.addEventListener("click",inchandler);

        let decbtn = document.createElement("button");
        decbtn.innerText = "-";
        decbtn.addEventListener("click",dechandler);

        div.appendChild(incbtn);
        div.appendChild(qty);
        div.appendChild(decbtn);
        mainDiv.appendChild(div);

        setLocalStorage();

    }
    const inchandler = (e)=>{
        let id = e.target.parentNode.id;
        cart.forEach((item)=>{
            if(item.id == id && item.email == loggedInUser){
                item.quantity++;
            }
        })
        setLocalStorage();
        location.reload();
    }
    const dechandler = (e) =>{
        let id = e.target.parentNode.id;
        cart.forEach((item)=>{
            if(item.id == id && item.email == loggedInUser){
                item.quantity--;
                if(item.quantity == 0){
                    cart=cart.filter((item)=>{
                        return item.id != id;
                    })
                }
            }
            
        })
        setLocalStorage();
        location.reload();
    }

    const deleteHandler = (e)=>{
        let id = e.target.parentNode.id;
        e.target.parentNode.remove();

        cart = cart.filter((item)=>{
            return item.id != id;
        })
        setLocalStorage();
        location.reload();
    }
    const setLocalStorage = ()=>{
        localStorage.setItem("cart",JSON.stringify(cart));
    }

    const getLocalStorage = () =>{
        cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):[];
        cart.forEach((item)=>{
            addToUI(item);
        })
    }
    const showTotalPrice = ()=>{
        let totalPrice = 0;
        cart.forEach((item)=>{
            if(item.email == loggedInUser){
                totalPrice += item.price * item.quantity;
            }
            
        })
        let div = document.querySelector("#totalPrice");
        if(totalPrice == 0){
            div.innerHTML = "Your Cart Is Empty";
        }
        else{
            div.innerHTML = `Total Price Is : ${totalPrice}`;
    
        }
    }
    getLocalStorage();
    showTotalPrice();