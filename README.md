# javascript-calendar

Link: ec2-3-138-112-230.us-east-2.compute.amazonaws.com/~MiaPark/Module6-group/main.html

AJAX Calendar:
1. Calendar View:
 
![image](https://user-images.githubusercontent.com/112423825/230689446-f6c49f12-ca00-4198-8ede-08081b31c1ac.png)

    a. The calendar is displayed as a table grid with days as the columns and weeks as the rows, one month at a time
    b. The user can view different months as far in the past or future as desired
    
2. User and Event Management:


![image](https://user-images.githubusercontent.com/112423825/230689557-c9e387c7-275c-44e7-9836-f58df9db5f7e.png)

    a. Events can be added, modified, and deleted
    b. Events have a title, date, and time
    c. Users can log into the site, and they cannot view or manipulate events associated with other users
    d. Don't fall into the Abuse of Functionality trap! Check user credentials on the server side as well as on the client side.
    d. All actions are performed over AJAX, without ever needing to reload the page
    e. Refreshing the page does not log a user out
    
3. Other


 ![image](https://user-images.githubusercontent.com/112423825/230689603-4e439c6b-be35-4116-88ef-fa671768862e.png)
 
    a. Users can tag an event with either "business" or "personal" and enable/disable those tags in the calendar view. 
    b. Users can share their calendar with additional users. 
    c. Users can click today to view this month's calendar, and go to other month when they type mm/yyyy and click go to.
