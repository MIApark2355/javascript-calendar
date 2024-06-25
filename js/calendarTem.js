const date = new Date();

//current_date is what is clicked and active on the right window
let current_date;

let current_month = date.getMonth();
let current_year = date.getFullYear();

//constants for showing events
const event_day = document.querySelector(".event_day");
const event_date = document.querySelector(".event_date");

const events_all = document.querySelector(".events");

//button to finialize adding event
const add_event = document.querySelector(".add_btn");
const events_array=[ 
    {
      date: 13,
      month: 3,
      year: 2022,
      events: [
        {
          title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
          time: "10:00 AM",
        },
      ],
    },
  ];
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
function start() {
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

        //tag dates that have events
        let event_exist = false;

        //check if there is a event on picked date
        events_array.forEach((event)=>{
            if(event.date === i && event.month === date.getMonth() + 1 && event.year === date.getFullYear()){
                event_exist = true;
            }

        })
        if(i === new Date().getDate() && 
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()){
            current_date = i;
            show_current_day(i);
            show_events(i);


            if(event_exist){
                days += `<div class="day today event">${i}</div>`;
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
    console.log("here3");
    add_listener();
};





//changing the page to the previous month
document.querySelector(".prev").addEventListener('click',() =>{
    if(date.getMonth() === 0){
        date.setFullYear(date.getFullYear());
    }
    date.setMonth(date.getMonth() - 1);
    start();
});

//changing the page to the next month
document.querySelector(".next").addEventListener('click',() =>{
    if(date.getMonth() === 11){
        date.setFullYear(date.getFullYear());
    }
    date.setMonth(date.getMonth() + 1)
    start();
});

start();

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
            start();
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
    start();
});


//button: click here to add an event
const add_event_open = document.querySelector(".to_add_btn");

//window for adding eventes
const add_event_container = document.querySelector(".add_event_popup");

//close button in the window
const close_add_event = document.querySelector(".close");

//to open a window to add an event
add_event_open.addEventListener("click",()=>{
    add_event_container.classList.toggle("active");
});

//to close a window of adding events
close_add_event.addEventListener("click",()=>{
    add_event_container.classList.remove("active");
});

//get input information
const event_name_input = document.querySelector(".event_name");
const event_start_input = document.querySelector(".event_start");
const event_end_input = document.querySelector(".event_end");

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
            //current_date is active on the right
            current_date = Number(e.target.innerHTML);

            //alter the date and day on the right screen to the clicked date
            show_current_day(e.target.innerHTML);
            show_events(Number(e.target.innerHTML));

            //remove previous current_date
            days.forEach((d)=>{
                d.classList.remove("active");
            });
            //if a date is in the previous or next month you cannot click
            if(!e.target.classList.contains("prev_date") && !e.target.classList.contains("prev_date")){
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
            current_date === event.date &&
            current_month + 1 === event.month &&
            current_year === event.year
        ){
            event.events.forEach((event) =>{
                events += `<div class="event">
                <div class="event_container">
                    <i class="fas fa-circle"></i>
                    <h3 class="event_title">${event.title}</h3>
                </div>
                <div class="event_time">${event.time}</div>
                <div class="two_btn">
                    <button class="edit_btn" id="edit_btn">Edit</button>
                    <button class="delete_btn" id="delete_btn">Delete</button>
                </div>
            </div>`;
            });
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

//add events
add_event.addEventListener("click", () => {
    const eventName = event_name_input.value;
    const eventStart = event_start_input.value;
    const eventEnd = event_end_input.value;
    if (eventName === "" || eventStart === "" || eventEnd === "") {
      alert("Please fill all the fields");
      return;
    }
  
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

    const newEvent = {
        title: eventName,
        time: eventStart_converted + " - " + eventEnd_converted,
  };
  console.log(newEvent);
  console.log(current_date);

  let eventAdded = false;
  if (events_array.length > 0) {
    events_array.forEach((item) => {
      if (
        item.date === current_date &&
        item.month === current_month + 1 &&
        item.year === current_year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    events_array.push({
      date: current_date,
      month: current_month + 1,
      year: current_year,
      events: [newEvent],
    });
    }
    console.log(events_array);
    event_name_input.value = "";
    event_start_input.value = "";
    event_end_input.value = "";
    show_events(current_date);
});
let pass_id;

//get input information (edit)
const event_name_edit = document.querySelector(".edit_event_name");
const event_start_edit = document.querySelector(".edit_event_start");
const event_end_edit = document.querySelector(".edit_event_end");
//close button in the window (edit)
const close_edit_event = document.querySelector(".close_edit");

//window for adding eventes
const edit_event_container = document.querySelector(".edit_event_popup");

//to close a window of adding events
close_edit_event.addEventListener("click",()=>{
    edit_event_container.classList.remove("active");
});

//to add edit function to each button
function add_edit_function(){
    const edit_btns = document.querySelectorAll(".edit_btn");

    
    edit_btns.forEach((b) => {

        b.addEventListener("click", (e) =>{

            id_pass = e.target.value;
            //to open a window to add an event
            edit_event_container.classList.toggle("active"); 

        });
    });

  
}


//edit events
function edit_event(e){
  const eventName = event_name_edit.value;
  const eventStart = event_start_edit.value;
  const eventEnd = event_end_edit.value;
  if (eventName === "" || eventStart === "" || eventEnd === "") {
    alert("Please fill all the fields");
    return;
  }

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
    'date': current_date,
    'month': current_month + 1,
    'year': current_year,
    'time':time
  };
  console.log(time);
  console.log(current_date);
  console.log(current_month + 1);

  fetch("editEvent.php", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'content-type': 'application/json' }
  })
  .then(response => response.json())
  .then(data => alert(data.success ? "Event edited!" : `failed to edit`))
  .catch(err => console.error(err));

        //updating an array of events
        get_event_data(); 
  show_events(current_date);

};

edit_event_btn.addEventListener("click", edit_event, false);
edit_event_btn.addEventListener("click", function remove(e){
  e.preventDefault();

  document.querySelector(".event_name_edit").value="";
  document.querySelector(".event_start_edit").value="";
  document.querySelector(".event_end_edit").value="";

  edit_event_container.classList.remove("active");
}, false);
