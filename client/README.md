<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://hilary-wattenberger.netlify.app/images/date.png" alt="TripsLogo"></a>
</p>

<h3 align="center">Trips - Sharing and view trips application</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![GitHub Issues](https://img.shields.io/github/issues/hwattenberger/trips.svg)](https://github.com/hwattenberger/trips/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/hwattenberger/trips.svg)](https://github.com/hwattenberger/trips/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> This is a full stack application for people planning big trips and for people who want to share a trip they were on.  For example a trip to northern Europe.
    <br> 
</p>

## 📝 Table of Contents
- [Problem Statement/Business Case](#businesscase)
- [Built Using](#built_using)
- [Features](#about)
- [Data Model](#datamodel)
- [See Demo and/or Live Example](#example)
- [Learnings](#learnings)
- [TODOs](#todos)
- [Author](#authors)

## 🧐 Problem Statement/Business Case <a name = "businesscase"></a>
When I took a sabbatical trip I wanted to see where other people had gone and what they had done but I couldn't find anything out there.  This fits that need - helping people find places to go for multi-leg trips.

## ⛏️ Built Using <a name = "built_using"></a>
- [React](https://reactjs.org/) - Front end framework
- [GraphQL](https://graphql.org/) - Query language
- [Apollo](https://www.apollographql.com/) - Both client and server to work better with GraphQL
- [MaterialUI](https://v4.mui.com/) - React UI components
- [Styled Components](https://styled-components.com/) - React components CSS-in-JS
- [NodeJS](https://nodejs.org/en/) - Back end
- [Express](https://expressjs.com/) - Back end framework 
- [MongoDB](https://www.mongodb.com/) - Database
- Also Mapbox for all the maps

## 🧐 Features <a name = "about"></a>
For Managers (Only available for users who are marked as admins):
- Create staff roles (sever, manager, host, etc.) and [shift types](https://hilary-wattenberger.netlify.app/images/Scheduling%20App%20-%20Create%20and%20update%20shifts.png) (AM server shift, PM host shift)
- [Manage staff](https://hilary-wattenberger.netlify.app/images/Scheduling%20App%20-%20Update%20Staff%20Information.png) (activate & deactivate/turn into admin/manage staff information including staff role, image)
- Create [weekly schedules](https://hilary-wattenberger.netlify.app/images/Scheduling%20App%20-%20Schedule.png) to publish to your staff.  More details on scheduling below.

For Staff:
- [Update weekly availability](https://hilary-wattenberger.netlify.app/images/Scheduling%20App%20-%20Specify%20Your%20Schedule.png) and user information
- [Create time off requests](https://hilary-wattenberger.netlify.app/images/Scheduling%20App%20-%20Request%20Time%20Off.png)
- [See upcoming shifts](https://hilary-wattenberger.netlify.app/images/Scheduling%20App%20-%20View%20Upcoming%20Shifts.png)

General Features:
- [Authentication](https://hilary-wattenberger.netlify.app/images/Scheduling%20App%20-%20Register.png) either natively with a username and password OR through Google

Scheduling information:
- Schedules are created from a combination of each user's specified weekly availability and their time off requests.
- You can copy forward the schedule from last week and it will keep all scheduled shifts unless users have requested time off (so you don't mistakenly schedule someone for a shift when they aren't available).
- Users are scheduled for a specific shift on a specific date.  You can schedule them in the scheduling activity either by selecting a shift for that user or dragging an open shift to their user.
- You can schedule a user for multiple shifts in a day.
- Filter to only show shifts for a specific user role (for example servers).
- [Modify specific days](https://hilary-wattenberger.netlify.app/images/Scheduling%20App%20-%20Change%20People%20Needed.png) to require less or more for a specific shift.  For example on a holiday you may want to close or expect 3 instead of 5 servers for the evening shift.

## Data Model <a name = "datamodel"></a>
Here is the data model for this project:
<img width=800px src="https://hilary-wattenberger.netlify.app/DatabaseDiagramSchedulingApp.png" alt="Sample workflow">

## 🏁 See Demo and/or Live Example <a name = "example"></a>
See this image for workflow (coming soon!):
<!-- <img width=800px src="https://hilary-wattenberger.netlify.app/images/SpotifyProject2.gif" alt="Sample workflow"> -->
<br>
You can access the live application here: https://hwattenberger-schedulingapp.netlify.app/schedule <br><br>
If you don't want to create your own user, you can use: <br>
Admin User: willy@willy.com Password: willy <br>
Non-Admin User: jill@jill.com Password: jill

## 🎈 What did I learn? <a name="learnings"></a>
This project took a while and I learned loads.
- Data model.  I went through a number of iterations on how to store schedules.  Ultimately I have a much better understanding of when to make certain choices of creating new Schemas/Models/Documents and when to imbed.
- MongoDB.  I hadn't used pipelines before and spent a good deal of time learning how to extract complex data from a database.
- Dates.  Dealing with dates with a server with a different timezone.  I learned some but still have more to learn here.
- Authentication.  I understanding authentication a lot more.  Certainly using passport but also middleware in NodeJS.  As part of this project, I did research into sessions & JWT.  Happy that I was able to use Google auth in addition to native.
- Deploying.  This is deployed in Heroku on the back-end and Netlify for React so learning about how to do that and also dealing with CORS.
- Code organization.  I am reasonably happy with the output but I think there's still opportunity to improve especially with my React components (could be more split up into more appropriate folders).
- React.  I spent a lot of time on the React portion of this application.  Among other things, I now understanding much better useContext and useReducer.
- MaterialUI.  I wanted to try using something instead of making everything from scratch.  It certainly saved some time and I was able to see many different components.  I liked using the Snackbar - I'd use that more broadly in future projects to help users understand that what they are doing is successful (or unsuccesful)

## 🎈 Todos <a name="todos"></a>
I have a long list of things I'd work on if I had more time.  Here are some of them:
- Analytics.  I'd love to make a dashboard.  There aren't too many options with the data I currently collect so I'd need to capture some additional information
- Email shifts.  I could integrate with somewhere like Twillio and auto send emails around scheduled shifts or have users request an email of their shifts
- Better error handing
- There's no great handling currently of what happens when shifts are changed from what they were before (for example you were scheduled for a shift type and then the shift type gets changed to a different role.  Very unlikely in the real world but still something I should handle better)
- Responsiveness.  Most of the pages are reasonably responsive but there's certainly more work to be done.
- More validation on forms.  I did this for the registration form to show that I could make it work but could do it on all forms
- Way too much prop drilling on the scheduling page.  I'd move to useContext (if not something like Redux)
- I'd move the API calls outside of components into their own hook

## ✍️ Author <a name = "authors"></a>
- [@hwattenberger](https://github.com/hwattenberger)

