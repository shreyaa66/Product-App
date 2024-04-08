let mainDiv = document.querySelector("#main-container");
let detailDiv = document.querySelector("#details");
let productArr = [];
let pname = document.querySelector("#pname");
let updateDiv = document.querySelector("#update");
let addBtn = document.querySelector("#btn");
let updatecounter = 0;
addBtn.addEventListener("click",()=>{
    addProduct();
})

const addProduct = () =>{
    if(pname.value.trim() != ""){
        let obj = {};
        obj.id = Date.now();
        obj.productName = document.querySelector("#pname").value;
        obj.productDesc = document.querySelector("#pdesc").value;
        obj.productPrice = document.querySelector("#pprice").value;
        productArr.push(obj);
        setLocalStorage();
        addToUI(obj);
    }
    
}

const addToUI = (obj) => {
    let div = document.createElement("div");
    let br = document.createElement("br");
    div.setAttribute("id", obj.id);
    div.innerHTML = `${obj.productName} &nbsp &nbsp ${obj.productDesc} &nbsp &nbsp ${obj.productPrice} &nbsp &nbsp`;
    let updatebtn = document.createElement("button");    
    updatebtn.innerText = "Update"
    updatebtn.setAttribute("class", "btn1");
    updatebtn.style = "margin-right: 20px";
    updatebtn.addEventListener("click",updateHandler);
    
    let deletebtn = document.createElement("button");
    deletebtn.innerText = "Delete";
    deletebtn.setAttribute("class", "btn1");
    deletebtn.addEventListener("click",deleteHandler);

    div.appendChild(updatebtn);
    div.appendChild(deletebtn); 
    detailDiv.appendChild(div);
}

const deleteHandler = (e) =>{
    let id = e.target.parentNode.id;
    e.target.parentNode.remove();
    productArr = productArr.filter((item)=>{
        return item.id != id;
    })
    setLocalStorage();
    location.reload();
}

const updateHandler = (e) =>{
    if(updatecounter == 0){
        updatecounter++
        let id = e.target.parentNode.id;
  
        let div = document.createElement("div");
        div.style = "max-width : 150px; max-height : 100px; border : 2px solid black; padding : 30px;";
        let nameInput = document.createElement("span");
        // nameInput.type = "text";
        // nameInput.placeholder = "Enter product name"
        let prodname = "";
        productArr.forEach((item) =>{
            if(item.id == id){
                prodname = item.productName;
            }
        })
        nameInput.innerHTML = `Product Name : ${prodname}`;
        let descInput = document.createElement("input")
        descInput.type = "text";
        descInput.placeholder = "Enter new Description";
        
        let priceInput = document.createElement("input");
        priceInput.type = "text";
        priceInput.placeholder = "Enter new Price"
        
        let confirmbtn = document.createElement("button");
        confirmbtn.innerText = "Confirm";

        confirmbtn.addEventListener("click",()=>{
            productArr.forEach((item) =>{ //findindex
                if(item.id == id){
                    // item.productName = nameInput.value;
                    item.productDesc = descInput.value;
                    item.productPrice = priceInput.value;
                }
                
            })
            
            setLocalStorage();
            div.remove();
            location.reload();
            updatecounter--;
        })
        // div.appendChild(nameInput);
        div.appendChild(descInput);    
        div.appendChild(priceInput);       
        div.appendChild(confirmbtn);    
        updateDiv.append(div);
    }
}

const setLocalStorage = () =>{
    localStorage.setItem("products",JSON.stringify(productArr));
}

const getLocalStorage = () =>{
    productArr = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    productArr.forEach((item)=>{
        addToUI(item);
    })
    
}

getLocalStorage();