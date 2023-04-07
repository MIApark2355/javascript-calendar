# javascript-calendar

Link: ec2-3-138-112-230.us-east-2.compute.amazonaws.com/Module6-group/main.html

AJAX Calendar:
1. Calendar View:
    a. The calendar is displayed as a table grid with days as the columns and weeks as the rows, one month at a time
    b. The user can view different months as far in the past or future as desired
2. User and Event Management:
    a. Events can be added, modified, and deleted
    b. Events have a title, date, and time
    c. Users can log into the site, and they cannot view or manipulate events associated with other users
    d. Don't fall into the Abuse of Functionality trap! Check user credentials on the server side as well as on the client side.
    d. All actions are performed over AJAX, without ever needing to reload the page
    e. Refreshing the page does not log a user out
3. Other
    a. Users can tag an event with either "business" or "personal" and enable/disable those tags in the calendar view. 
    b. Users can share their calendar with additional users. 
    c. Users can click today to view this month's calendar, and go to other month when they type mm/yyyy and click go to.