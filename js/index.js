// index.js
const signupbtn = document.getElementById("signUp")
const loginbtn = document.getElementById("login")

signupbtn.addEventListener('click', () => {
  window.location.href = "../register.html"
})

loginbtn.addEventListener('click', () => {
  window.location.href = "../login.html"
})