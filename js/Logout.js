function logoutAjax (e) {
    
    fetch("./php/Logout.php", {
        method: 'POST',
        body: JSON.stringify(),
        headers: { 'content-type': 'application/json' }
    })
    
    .then(response => response.json())
    .then(data => {alert(data.success ? "Logged Out!" : `You were not logged in`);
    if(data.success){
        console.log("logged out");
        initial_calendar();
    }})
    .catch(error => console.error('Error:',error))

};

document.querySelector(".logout_button").addEventListener("click", logoutAjax, false); // Bind the AJAX call to button click