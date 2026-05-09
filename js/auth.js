const firstnameInput=document.getElementById("Firstname");
const lastnameInput=document.getElementById("Lastname");
const emailInput=document.getElementById("email");
const passwordInput=document.getElementById("password");
const submitRegBtn = document.getElementById("submitReg");


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
		p.setAttribute("style","color:green")
		document.getElementById("success").appendChild(p);

		// Clear the form
        firstnameInput.value = '';
        lastnameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
		}



	
})