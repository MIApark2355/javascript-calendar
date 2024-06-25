function registerAjax(event){
    //sign-up new users
    const username = document.getElementById("newUser").value; // Get the username from the form
    const password = document.getElementById("newPwd").value;
    const confirm = document.getElementById("checkPwd").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password,"confirm" :confirm };
 
	fetch("./php/register.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {alert(data.success ? "You've been signed up!" : `You are failed to register because of ${data.message}`);
get_event_data();})
    .catch(err => console.error(err));

    
};

document.getElementById("signup_button").addEventListener("click", registerAjax, false); // Bind the AJAX call to button click

document.getElementById("signup_button").addEventListener('click', function remove(e){
    e.preventDefault();

    document.getElementById("username").value="";
    document.getElementById("password").value="";
    document.getElementById("confirm").value="";
}, false);