function loginAjax(event) {
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form


    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password };
    fetch("searchUser.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })

        .then(response => response.json())
        .then(data => {alert(data.success ? "You've been logged in!" : `You were not logged in because of ${data.message}`);
            if(data.success){
                console.log("you've been logged in");
                user = data.username;
                console.log(user);
                
                get_event_data();
                start();
                showUser();
                
            }})
        .catch(err => console.error(err));

    
};
function showUser(){
    if(user !== ""){
        let str =`<div class="user">${user}</div>`;
    document.querySelector(".name_container").innerHTML = str;
    }
    
}

document.getElementById("login_button").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click
document.getElementById("login_button").addEventListener('click', function remove(e){
    e.preventDefault();
    document.getElementById("username").value="";
    document.getElementById("password").value="";
}, false);