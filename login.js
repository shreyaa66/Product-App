const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
const loginbtn = document.querySelector("#loginbtn");
const signupbtn = document.querySelector("#signinbtn");

let users = []
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

loginbtn.addEventListener("click",()=>{
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let match = false;
    let role = "";
    users.forEach((item)=>{
        if(item.email === email.value && item.password === password.value){
            match = true;
            role = item.role;
        }
    })
    if(!match){
        alert("Wrong Email & Password");
    }
    else{
        if(role === "admin"){
            window.location.href = "../index.html";
            localStorage.setItem("LoggedAsAdmin",JSON.stringify(email.value));
        }
        else{
            console.log("Logged in")
            window.location.href="../home.html";``
            localStorage.setItem("LoggedAsUser",JSON.stringify(email.value));
        }
    }
    
})

signupbtn.addEventListener("click",()=>{
    console.log(" qdsklgdskjg")
    let obj = {};
    obj.email = document.querySelector("#semail").value;
    obj.password = document.querySelector("#spassword").value;
    if(obj.email.trim()=="" || obj.password.trim()==""){
        alert("Enter valid username and password")
    }
    else{
        obj.role = "user";
        users.push(obj);
        setLocalStorage();

    }
    

})
const setLocalStorage = ()=>{
    localStorage.setItem("Users",JSON.stringify(users));
}
const getLocalStorage = () =>{
    users = localStorage.getItem("Users") ? JSON.parse(localStorage.getItem("Users")) : [];
}
getLocalStorage();