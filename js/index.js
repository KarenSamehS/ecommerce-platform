// index.js
const signupbtn = document.getElementById("signUp")
const loginbtn = document.getElementById("login")
const seedBtn = document.getElementById("seedBtn");

if (seedBtn) {
    seedBtn.addEventListener('click', loadSeedData);
}

signupbtn.addEventListener('click', () => {
  window.location.href = "../register.html"
})

loginbtn.addEventListener('click', () => {
  window.location.href = "../login.html"
})