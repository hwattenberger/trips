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
- View all trips.  Use map to filter down to trips in areas of the world you are most interested in.
- View a specific trip.  See a map of the trip's locations and information about each leg.
- Login & register.  When you register and login, you can create and edit your own trips.
- Create trip.  Create a trip with as many legs as needed (a leg is a specific destination).
- Edit trip.  Edit the trip you created.

## 🏁 See Demo and/or Live Example <a name = "example"></a>
See this image for workflow (coming soon!):
<!-- <img width=800px src="https://hilary-wattenberger.netlify.app/images/SpotifyProject2.gif" alt="Sample workflow"> -->
<br>
You can access the live application here: https://hwattenberger-trips.netlify.app/ <br><br>
If you don't want to create your own user, you can use: <br>
User: hilary Password: hilary

## 🎈 What did I learn? <a name="learnings"></a>
Here are some of the things that I learned:
- JWT. I previously did authentication through sessions and I wanted to try using JWT.
- GraphQL. This was one of the main reasons I did this project - I wanted to use graphQL full stack with Apollo. Great to experience something different and it was quite a change. I can see why some people really like it.
- Lots of integration with Mapbox. I had a lot of fun with mapbox and used it in many different ways. You could use forward geocoding and reverse geocoding. You could map out your trip. You could use clusters to drill down on a group of trips.
- react-intersection-observer. This was a great library for changing things as you scroll. When you scroll through a trip (if it has enough text), the map will zoom to each location.

## 🎈 Todos <a name="todos"></a>
Lots of areas where this can be improved including:
- Better error handling
- Ability to load trip images
- More customization around activities in a leg
- Improve design especially of the landing page

## ✍️ Author <a name = "authors"></a>
- [@hwattenberger](https://github.com/hwattenberger)

