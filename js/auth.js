const firstnameInput=document.getElementById("Firstname");
const lastnameInput=document.getElementById("Lastname");
const emailInput=document.getElementById("email");
const passwordInput=document.getElementById("password");
const submitRegBtn = document.getElementById("submitReg");

if (submitRegBtn) {
submitRegBtn.addEventListener('click',()=>{
	firstname= firstnameInput.value.trim();
	lastname= lastnameInput.value.trim();
	email= emailInput.value.trim();
	password= passwordInput.value.trim();

	// Get existing users from localStorage (or empty array if none)
    const users = storageGet('users') || [];

	// Check if email already exists
    const emailExists = users.find(user => user.email === email);


	if(emailExists )
		alert("an account with this email already exists");

    // Check if fields are empty
  else if (firstname === '' || lastname === '' || email === '' || password === '') {
        alert("Please fill in all fields");
		}
	else if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[_!@#$%^&*]/.test(password))
	 alert("Password must be at least 8 characters and include a letter and a special character (_ ! @ # $ % ^ & *)");

  else {

		 // Build the user object
        const newUser = {
            id: Date.now(),
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            role: 'user'
        };

				// Save to localStorage
        storageAppend('users', newUser);


		const p = document.createElement('p');
		p.innerHTML= `Account Registered Successfully ${firstname}, please login to your account` ;
		p.setAttribute("style","color:green");
		document.getElementById("success").appendChild(p);

		// Clear the form
        firstnameInput.value = '';
        lastnameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
		}	
})
}
const logEmailInput =document.getElementById("logEmail");
const logPasswordInput =document.getElementById("logPassword");
const submitLogBtn = document.getElementById("submitLog");

if(submitLogBtn){
submitLogBtn.addEventListener("click",()=>{
	const email= logEmailInput.value;
	const password= logPasswordInput.value

	// Get existing users from localStorage (or empty array if none)
    const users = storageGet('users') || [];

	// Check if email already exists
    const matchedUser  = users.find(user => user.email === email  && user.password === password);
		

		if(!matchedUser){
			alert("Email or password is incorrect")

			emailInput.value = '';
   	  passwordInput.value = '';

		}else{
			// Save session so other pages know who is logged in
            storageSet('session', {
                id: matchedUser.id,
                firstname: matchedUser.firstname,
                email: matchedUser.email,
                role: matchedUser.role
            });
						if(matchedUser.role=='admin'){
							window.location.href = '../admin/dashboard.html';
						}
						else
							window.location.href = '../products.html';
		}
})
}
// In auth.js — REMOVE BEFORE SUBMISSION
const createAdminBtn = document.getElementById("createAdmin");
if (createAdminBtn) {
    createAdminBtn.addEventListener('click', () => {
        const adminUser = {
            id: Date.now(),
            firstname: "Admin",
            lastname: "User",
            email: "admin@test.com",
            password: "Admin_123",
            role: "admin"
        };
        storageAppend('users', adminUser);
        alert("Admin created! Email: admin@test.com | Password: Admin_123");
    });
}