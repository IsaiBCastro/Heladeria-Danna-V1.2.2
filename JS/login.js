function login(){
    
const usuario = document.getElementById("txtUser").value;
const contra = document.getElementById("txtPassword").value;

if(usuario == "Isai" && contra =="1234" || usuario =="1" && contra == "1234"){
    window.location = "index.html";
}
}