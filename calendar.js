
let loggedin = false;
let user="";
let token;
function checkLog(){
    //checking if a user has logged in
fetch("checkLog.php", {
	method: 'POST',
	body: JSON.stringify(),
	headers: { 'content-type': 'application/json' }
})
.then(response => response.json())
.then (data => {if (data.success){
    loggedin = true;
    user = getUser(data);
    get_event_data();
    

}})
//.then(data => getUser(data))
.catch(error => console.error('Error:',error));
}

//get username and show on the window
function getUser(data){
    return data.user;
};

function showUser(){
    if(user != ""){
        let str =`<div class="user">${user}</div>`;
        document.querySelector(".name_container").innerHTML = str;
    }
    
}

checkLog();
showUser();

const date = new Date();
//current_date is what is clicked and active on the right window
let current_date = 1; //hard coded

let current_month = date.getMonth();
let current_year = date.getFullYear();

//constants for showing events
const event_day = document.querySelector(".event_day");
const event_date = document.querySelector(".event_date");

const events_all = document.querySelector(".events");

//button: click here to add an event
const add_event_open = document.querySelector(".to_add_btn");

//window for adding eventes
const add_event_container = document.querySelector(".add_event_popup");

//close button in the window (add)
const close_add_event = document.querySelector(".close_add");

//button to finialize adding event
const add_event_btn = document.querySelector(".add_btn");


//button to edit an event
const edit_event_btn = document.querySelector(".edit_btn");


const month_array=[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];
let events_array=[];

//default calendar that does not have no events (when no one has logged in)
function initial_calendar() {
    date.setDate(1);

    //getting a month as a string
    const month = month_array[date.getMonth()];
    
    const month_days = document.querySelector(".days");

    document.querySelector(".date h2").innerHTML = date.getFullYear();
    
    //total = 28 or 30 or 31
    const total = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    
    //getting the first day of month as an index (monday == 1)
    const first_day_of_month = new Date(date.getFullYear(), date. getMonth(), 1).getDay(); 
    
    //getting the last day of the month as an index (monday == 1)
    const last_day_of_month = new Date(date.getFullYear(),date.getMonth()+1,0).getDay();
    
    const prev_month_last = new Date(date.getFullYear(),date.getMonth(),0).getDate();
    //setting the month
    document.querySelector(".date h1").innerHTML = month;
    
    //setting today's date
    document.querySelector(".date p").innerHTML = new Date().toDateString();
    
    let days = "";
    
    //filling the days from the previous month at the beginning of the calendar
    for(let j = first_day_of_month; j >0 ; j--){
        days += `<div class="day prev_date">${prev_month_last - j + 1}</div>`;
    }

    for(let i = 1; i <= total; i++){

        if(i === new Date().getDate() && 
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()){
            days += `<div class="day today">${i}</div>`;
            
        }else{
            days += `<div class="day" >${i}</div>`;
        }
    }
    
    //filling the days from the next month at the end of the calendar
    const next_days_to_fill = 7 - last_day_of_month -1;
    for(let y = 1 ; y <= next_days_to_fill; y++){
        days += `<div class="day next_date">${y}</div>`;
    }

    month_days.innerHTML = days;

    $('.right').hide();
    $('.tag').hide();
    $('.share_container').hide();
    $('.name_container').hide();
};

//initial_calendar();

//when a user has logged in
function start() {
    
    date.setDate(1);

    $('.right').show();
    $('.tag').show();
    $('.share_container').show();
    $('.name_container').show();
    
    //getting a month as a string
    const month = month_array[date.getMonth()];
    
    const month_days = document.querySelector(".days");

    document.querySelector(".date h2").innerHTML = date.getFullYear();
    
    //total = 28 or 30 or 31
    const total = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    
    //getting the first day of month as an index (monday == 1)
    const first_day_of_month = new Date(date.getFullYear(), date. getMonth(), 1).getDay(); 
    
    //getting the last day of the month as an index (monday == 1)
    const last_day_of_month = new Date(date.getFullYear(),date.getMonth()+1,0).getDay();
    
    const prev_month_last = new Date(date.getFullYear(),date.getMonth(),0).getDate();
    //setting the month
    document.querySelector(".date h1").innerHTML = month;
    
    //setting today's date
    document.querySelector(".date p").innerHTML = new Date().toDateString();
    
    let days = "";
    

    //console.log(events_array);
    //filling the days from the previous month at the beginning of the calendar
    for(let j = first_day_of_month; j >0 ; j--){
        days += `<div class="day prev_date">${prev_month_last - j + 1}</div>`;
    }

    for(let i = 1; i <= total; i++){

        //tag dates that have events
        let event_exist = false;

        //check if there is a event on picked date
        events_array.forEach((event)=>{
            
            if(Number(event.date) === i && Number(event.month) === date.getMonth() + 1 && Number(event.year) === date.getFullYear()){
                event_exist = true;
            }

        })
        if(i === new Date().getDate() && 
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()){
            //console.log(current_date);
            current_date = i;
            show_current_day(i);
            show_events(i);

            if(event_exist){
                days += `<div class="day today event active">${i}</div>`;
            }else{
                days += `<div class="day today active">${i}</div>`;
            }
            
        }else{
            if(event_exist){
                days += `<div class="day event">${i}</div>`;
            }else{
                days += `<div class="day" >${i}</div>`;
            }
        }
    }
    
    //filling the days from the next month at the end of the calendar
    const next_days_to_fill = 7 - last_day_of_month -1;
    for(let y = 1 ; y <= next_days_to_fill; y++){
        days += `<div class="day next_date">${y}</div>`;
    }

    month_days.innerHTML = days;

    //add listener to each day box
    add_listener();
    //show_events();
    add_delete_function();

    add_edit_function();

};

//changing the page to the previous month
document.querySelector(".prev").addEventListener('click',() =>{
    if(date.getMonth() === 0){
        date.setFullYear(date.getFullYear());
    }
    date.setMonth(date.getMonth() - 1);
    checkLog();
    if(loggedin){
        current_month = date.getMonth();
        current_year = date.getFullYear();
        current_date = 1;
        console.log("herehere");
        selectTag();
    }else{
        initial_calendar();
    }
});

//changing the page to the next month
document.querySelector(".next").addEventListener('click',() =>{
    if(date.getMonth() === 11){
        date.setFullYear(date.getFullYear());
    }
    date.setMonth(date.getMonth() + 1);
    checkLog();
    if(loggedin){
        current_month = date.getMonth();
        current_year = date.getFullYear();
        current_date = 1;
        selectTag();
    }else{
        initial_calendar();
    }
});




/////////////////////////////////////////EVENT RELATED/////////////////////////////////////////



//to open a window to add an event
add_event_open.addEventListener("click",()=>{
    add_event_container.classList.toggle("active");
});

//to close a window of adding events
close_add_event.addEventListener("click",()=>{
    add_event_container.classList.remove("active");
});

//get input information (adding event)
const event_name_input = document.querySelector(".event_name");
const event_start_input = document.querySelector(".event_start");
const event_end_input = document.querySelector(".event_end");
const event_type_input = document.querySelector(".event_type");

//mysql limit: 50 chars
event_name_input.addEventListener("input",(e)=>{
    event_name_input.value = event_name_input.value.slice(0,50);
});

//time input
event_start_input.addEventListener("input", (e)=>{
    event_start_input.value = event_start_input.value.replace(/[^0-9:]/g, "");
  if (event_start_input.value.length === 2) {
    event_start_input.value += ":";
  }
  if (event_start_input.value.length > 5) {
    event_start_input.value = event_start_input.value.slice(0, 5);
  }
});

event_end_input.addEventListener("input", (e)=>{
    event_end_input.value = event_end_input.value.replace(/[^0-9:]/g, "");
  if (event_end_input.value.length === 2) {
    event_end_input.value += ":";
  }
  if (event_end_input.value.length > 5) {
    event_end_input.value = event_end_input.value.slice(0, 5);
  }
});


//convert input for start and end times
function time_format(timeinput) {
    time = timeinput.split(':'); // convert to array
  
    let hour = Number(time[0]);
    let minutes = Number(time[1]);
    // calculate
    let timeValue;
  
    if (hour > 0 && hour <= 12) {
      timeValue= "" + hour;
    } else if (hour > 12) {
      timeValue= "" + (hour - 12);
    } else if (hour == 0) {
      timeValue= "12";
    }
    if (minutes == 0) {
      timeValue += (hour >= 12) ? "pm" : "am";
    }
    else {
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hour >= 12) ? "pm" : "am";  // get AM/PM
    }
    return timeValue;
  };
  

//function to show each day on the right of the window when it is clicked
function show_current_day(date){
    const clicked_date = new Date(current_year, current_month, current_date);
    const clicked_day = clicked_date.toString().split(" ")[0];

    event_day.innerHTML = clicked_day;
    event_date.innerHTML = current_date + " " + month_array[current_month]+ " " + current_year;

}


function add_listener(){
    const days = document.querySelectorAll(".day");
    
    days.forEach((d) => {
        d.addEventListener("click", (e) =>{
            
            //if a date is in the previous or next month you cannot click
            if(!e.target.classList.contains("prev_date") && !e.target.classList.contains("next_date")){
                
            //current_date is active on the right
            current_date = Number(e.target.innerHTML);

            //alter the date and day on the right screen to the clicked date
            show_current_day(e.target.innerHTML);
            show_events(Number(e.target.innerHTML));
            add_delete_function();
            add_edit_function();
            //remove previous current_date
            days.forEach((d)=>{
                d.classList.remove("active");
            });
            //if clicking a date on the current page
            e.target.classList.add("active");
            
            }
        });
    });
  };


//function to show the contents of event for clicked date
function show_events(date){
    let events ="";
    events_array.forEach((event) =>{
        
        if(
            date === Number(event.date) &&
            current_month + 1 === Number(event.month) &&
            current_year === Number(event.year)
        ){
            /*
            const p1 = document.createElement('div');
            p1.classList.add("event");

            const c1 = document.createElement('div');
            c1.classList.add("event_container");

            const c11 = document.createElement('i');
            c11.classList.add("fas fa-circle");

            const c12 = document.createElement('h3');
            c12.classList.add("event_title");

            const c2 = document.createElement('div');
            c2.classList.add("event_time");

            const c3 = document.createElement('div');
            c3.classList.add("two_button");

            const c31 = document.createElement('button');
            c31.classList.add("edit_btn");
            c31.innerText = 'edit';

            const c32 = document.createElement('button');
            c32.classList.add("delete_btn");
            c32.innerText = 'delete';

            c1.appendChild(c11);
            c1.appendChild(c12);
            c3.appendChild(c31);
            c3.appendChild(c31);

            p1.appendChild(c1);
            p1.appendChild(c2);
            p1.appendChild(c3);
            */
           

            events += `<div class="event">
            <div class="event_container">
            <p>Title:</P>
                <h3 class="event_title">${event.title}</h3>
                
            </div>
            <div class="event_time">Time: ${event.time}</div>
            <div class="event_type">Type: ${event.type}</div>
            <div class="two_btn">
                <button class="edit_btn" id="edit_btn" value = ${event.id}>Edit</button>
                <button class="delete_btn" id="delete_btn" value = ${event.id}>Delete</button>
            </div>
        </div>`;
        
        }
    });

    if((events === "")){
        events = `
        <div class="none">
            <h3>No Event</h3>
        </div>`;
    }

    events_all.innerHTML = events;
};
//get event data of current username
function get_event_data (){


    fetch("getEvent.php", {
        method: 'POST',
        body: JSON.stringify(),
        headers: { 'content-type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
      events_array = helper_get_event_data(data);
        start();
        })
      .catch(err => console.error(err));

}

function helper_get_event_data(data){
    let eventsArray=[];

    if (data.success == true) {
        let event_ids = data.event_ids;
        let event_titles = data.event_titles;
        let event_dates = data.event_dates;
        let event_months = data.event_months;
        let event_years = data.event_years;
        let event_times = data.event_times;
        let event_types = data.event_types

        for(i = 0 ; i < event_titles.length; i++){
            tem = {};
            tem["id"]=  event_ids[i];
            tem["title"]=  event_titles[i];
            tem["date"]=  event_dates[i];
            tem["month"]=  event_months[i];
            tem["year"]=  event_years[i];
            tem["time"]=  event_times[i];
            tem["type"]=  event_types[i];
            eventsArray.push (tem);
        }
        
    }
    return eventsArray;
}

//add events
function add_event(e){
    const eventName = event_name_input.value;
    const eventStart = event_start_input.value;
    const eventEnd = event_end_input.value;
    const radio1 = document.getElementById("a0");
    const radio2 = document.getElementById("a1");
    let eventType = "";
    console.log(radio1.checked);
    console.log(radio2.checked);
    console.log(radio2.value);
    if (eventName === "" || eventStart === "" || eventEnd === "") {
      alert("Please fill all the fields");
      return;
    }else if(radio1.checked !== true && radio2.checked !==true){
        alert("Please check a type of an event");
      return;
    }


    if(document.getElementById('a0').checked) {
        eventType = document.getElementById('a0').value;
      }else if(document.getElementById('a1').checked) {
        eventType = document.getElementById('a1').value;
      }

    console.log(eventType);

    //check correct time format 24 hour
    const timeFromArr = eventStart.split(":");
    const timeToArr = eventEnd.split(":");
    if (
      timeFromArr.length !== 2 ||
      timeToArr.length !== 2 ||
      timeFromArr[0] > 23 ||
      timeFromArr[1] > 59 ||
      timeToArr[0] > 23 ||
      timeToArr[1] > 59
    ) {
      alert("Invalid Time Format");
      return;
    }
  
    const eventStart_converted = time_format(eventStart);
    const eventEnd_converted = time_format(eventEnd);
  
    const time = eventStart_converted + " - " + eventEnd_converted
    //Make a URL-encoded string for passing POST data:
    const data = {
      'title':eventName,
      'date': current_date,
      'month': current_month + 1,
      'year': current_year,
      'time':time,
      'type':eventType,
      'token':token
    };
    console.log(token);
  
    fetch("addEvent.php", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => alert(data.success ? "Event added!" : `You are failed to add an event because of ${data.message}`))
    .catch(err => console.error(err));

    //updating an array of events
    selectTag();

    show_events(current_date);
  };
  
  add_event_btn.addEventListener("click",add_event, false);
  add_event_btn.addEventListener('click', function remove(e){
    e.preventDefault();

    document.querySelector(".event_name").value="";
    document.querySelector(".event_start").value="";
    document.querySelector(".event_end").value="";
    $("#a0").prop("checked", false);
    $("#a1").prop("checked", false);

    //add_event_container.classList.remove("active");

}, false);
  




//delete event
function add_delete_function(){

    const btns = document.querySelectorAll(".delete_btn");
    
    btns.forEach((b) => {

        b.addEventListener("click", (e) =>{
            let event_id = e.target.value;
            if(confirm("Are you sure you want to delete?")){

                const data = {
                    'event_id': event_id,
                    'token': token
                };
                //console.log(token);
                fetch("deleteEvent.php", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'content-type': 'application/json' }
                })
                .then(response => response.json())
                .then(data => { alert(data.success ? "deleted" : `failed to delete`);
                    selectTag();
                    show_events(current_date);
                
                })
                .catch(error => console.error('Error:',error))
            }
        });
    });
};
/////////////////////////////edit event/////////////////////////////////
let pass_id;

//get input information (edit)
const event_name_edit = document.querySelector(".edit_event_name");
const event_start_edit = document.querySelector(".edit_event_start");
const event_end_edit = document.querySelector(".edit_event_end");
//close button in the window (edit)
const close_edit_event = document.querySelector(".close_edit");

//window for adding eventes
const edit_event_container = document.querySelector(".edit_event_popup");



//mysql limit: 50 chars
event_name_edit.addEventListener("input",(e)=>{
    event_name_edit.value = event_name_edit.value.slice(0,50);
});

//time input
event_start_edit.addEventListener("input", (e)=>{
    event_start_edit.value = event_start_edit.value.replace(/[^0-9:]/g, "");
  if (event_start_edit.value.length === 2) {
    event_start_edit.value += ":";
  }
  if (event_start_edit.value.length > 5) {
    event_start_edit.value = event_start_edit.value.slice(0, 5);
  }
});

event_end_edit.addEventListener("input", (e)=>{
    event_end_edit.value = event_end_edit.value.replace(/[^0-9:]/g, "");
  if (event_end_edit.value.length === 2) {
    event_end_edit.value += ":";
  }
  if (event_end_edit.value.length > 5) {
    event_end_edit.value = event_end_edit.value.slice(0, 5);
  }
});



//to close a window of adding events
close_edit_event.addEventListener("click",()=>{
    edit_event_container.classList.remove("active");
    //add_delete_function();
});

//to add edit function to each button
function add_edit_function(){
    const edit_btns = document.querySelectorAll(".edit_btn");
    
    edit_btns.forEach((b) => {

        b.addEventListener("click", (e) =>{

            id_pass = e.target.value;
            //to open a window to add an event
            edit_event_container.classList.toggle("active");

            //console.log("days");
            //fill the fileds with the original data
            events_array.forEach((e) =>{
                if(e.id === id_pass){
                    const fill_name = e.name;
                    document.querySelector(".edit_event_name").value=fill_name;
                    //let fill_type = e.type;
                }
                
            }
            
            )
            

        });
    });
};
  


//edit events
function edit_event(e){
    const eventName = event_name_edit.value;
    const eventStart = event_start_edit.value;
    const eventEnd = event_end_edit.value;
    const radio1 = document.getElementById("e0");
    const radio2 = document.getElementById("e1");
    let eventType ="";

    console.log(radio1.checked);
    if (eventName === "" || eventStart === "" || eventEnd === "") {
      alert("Please fill all the fields");
      return;
    }else if(radio1.checked !== true && radio2.checked !==true){
        alert("Please check a type of an event");
      return;
    }
  
    if(document.getElementById('e0').checked) {
        eventType = document.getElementById('e0').value;
      }else if(document.getElementById('e1').checked) {
        eventType = document.getElementById('e1').value;
      }
      console.log(eventType);
    //check correct time format 24 hour
    const timeFromArr = eventStart.split(":");
    const timeToArr = eventEnd.split(":");
    if (
      timeFromArr.length !== 2 ||
      timeToArr.length !== 2 ||
      timeFromArr[0] > 23 ||
      timeFromArr[1] > 59 ||
      timeToArr[0] > 23 ||
      timeToArr[1] > 59
    ) {
      alert("Invalid Time Format");
      return;
    }
  
    const eventStart_converted = time_format(eventStart);
    const eventEnd_converted = time_format(eventEnd);
  
    const time = eventStart_converted + " - " + eventEnd_converted

    //Make a URL-encoded string for passing POST data:
    const data = {
      'event_id':id_pass,
      'title':eventName,
      'time':time,
      'type':eventType,
      'token':token
    };
  
    fetch("editEvent.php", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => alert(data.success ? "Event edited!" : `${data.message}`))
    .catch(err => console.error(err));

    //updating an array of events
    selectTag();

    show_events(current_date);

  };

document.querySelector(".confirm_btn").addEventListener("click", edit_event, false);

document.querySelector(".confirm_btn").addEventListener("click", function remove(e){
    e.preventDefault();

    document.querySelector(".edit_event_name").value="";
    document.querySelector(".edit_event_start").value="";
    document.querySelector(".edit_event_end").value="";
    $("#e0").prop("checked", false);
    $("#e1").prop("checked", false);

    //edit_event_container.classList.remove("active");
}, false);

/////////////////////////////////////////LOG IN Portion/////////////////////////////////////////

function loginAjax(event) {
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form


    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password };
    fetch("Login.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })

        .then(response => response.json())
        .then(data => {alert(data.success ? "You've been logged in!" : `You were not logged in because of ${data.message}`);
            if(data.success){
                console.log("you've been logged in");
                user = data.username;
                token = data.token;
                console.log(token);
                //console.log(user);
                // can we set the current page to current month to avoid the bug?
                today = new Date();
                date.setMonth(today.getMonth());
                date.setFullYear(today.getFullYear());
                current_month = today.getMonth();
                current_year = today.getFullYear();
                current_date = today.getDate();
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


/////////////////////////////////////////CREATIVE PORTION(1)/////////////////////////////////////////

function selectTag(){

    let eventTag = "";
    if(document.getElementById('t0').checked) { // business only
        eventTag = document.getElementById('t0').value;

      }else if(document.getElementById('t1').checked) { // personal only
        eventTag = document.getElementById('t1').value;

      }else if(document.getElementById('t2').checked){ // all events
        get_event_data();
        return;
      }
        let data1 = {'tag': eventTag};

        fetch("getTag.php", {
            method: 'POST',
            body: JSON.stringify(data1),
            headers: { 'content-type': 'application/json' }
        })
            .then(response => response.json())
        .then (data => {if (data.success){
            
            events_array = helper_get_event_data(data);
            start();

        }})
    //.then(data => getUser(data))
        .catch(error => console.error('Error:',error));
    

}

document.getElementById("t0").addEventListener("click", selectTag, false);
document.getElementById("t1").addEventListener("click", selectTag, false);
document.getElementById("t2").addEventListener("click", selectTag, false);

/////////////////////////////////////////CREATIVE PORTION(2)/////////////////////////////////////////

function shareCalendar(){

    get_event_data();// update events_array to contain all curr_user's data regardless of tag selection
    let shared_user = document.getElementById("share_user").value;
    let share = {'target_user': shared_user};

    let cnt = 0;
    fetch("checkUser.php", {
        method: 'POST',
        body: JSON.stringify(share),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
    .then (data => {
        if (data.success){
                events_array.forEach((event)=>{

                    event['target_user'] = shared_user;
                    event['token'] = token;
                    console.log(event);
                    fetch("shareCalendar.php", {
                        method: 'POST',
                        body: JSON.stringify(event),
                        headers: { 'content-type': 'application/json' }
                    })
                        .then(response => response.json())
                        .then(data => {console.log("success")})
                    .catch(error => console.error('Error:',error));
            
                })
        }else{
            alert(`Failed to share because of ${data.message}`);
        }})
    .catch(error => console.error('Error:',error));
    
    
    selectTag(); // restore tag selection and call start()
}

document.getElementById("share_btn").addEventListener("click", shareCalendar, false);

/////////////////////////////////////////CREATIVE PORTION(3)/////////////////////////////////////////

//from date input
const go_date = document.querySelector(".goTo_btn");
const picked_date = document.querySelector(".date_input");

picked_date.addEventListener("input",(e) =>{
    picked_date.value = picked_date.value.replace(/[^0-9/]/g,"");
    if(picked_date.value.length ===2){
        //adding slash automatically
        picked_date.value +="/";
    }if(picked_date.value.length>7){
        //allowing max 7 letters
        picked_date.value = picked_date.value.slice(0,7);
    }
    if(e.inputType === "deleteContentBackward"){
        if(picked_date.value.length ===3){
            picked_date.value = picked_date.value.slice(0,2);
        }
    }

});

go_date.addEventListener("click", go_date_function);
function go_date_function(){
    const date_array = picked_date.value.split("/");
    //checking if it is a valid input
    if(date_array.length ===2){ //2 is for month and year
        if (date_array[0] > 0 && date_array[0] < 13 && date_array[1].length ===4){
            date.setMonth(date_array[0]-1);
            date.setFullYear(date_array[1]);
            if(loggedin){
                current_month = date.getMonth();
                current_year = date.getFullYear();
                current_date = 1;
                selectTag();
            }else{
                initial_calendar();
            }
            return;
        }

    }

    //if it is not a valid input
    alert("Please type in a valid date");
};

//from clicking "today" button
const go_today = document.querySelector(".today_btn");
go_today.addEventListener("click",() =>{
    today = new Date();
    date.setMonth(today.getMonth());
    date.setFullYear(today.getFullYear());
    if(loggedin){
        current_month = today.getMonth();
        current_year = today.getFullYear();
        current_date = today.getDate();
        selectTag();
    }else{
        initial_calendar();
    }
});