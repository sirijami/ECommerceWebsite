# The provided Service API

The full API is available in the `full-api` document.  This is a high level overview of what the service can/can't do.  

* API is mostly RESTful and does not use url params 
    * (which are not forbidden by REST, they just aren't used here)
* Four fundamental concepts:  
    * The appkey - a unique identifier for a collection of app data.  Virtually every call involves and 


## Overview

### App
* Each project has an identifying token (safe to share) called 'appkey'.  These were assigned in class and sent by email.  Everyone got 3, but you only need to use 1.
* This appkey separates your data from other projects.  All data related to your app is stored by appkey.
* This appkey is not security the way some API keys are - it is merely an identifier

### Users
* Each project has users, and the ability to create new users
* Each user has their own profile data that is stored on the server
* There is a service endpoint to log users in - this returns a user token value

#### ~User-token cookie~
The plan to use the common practice of a user token cookie was scrapped because of security issues without uncommon practice of allowing the webservice call from anywhere.  It is replaced by the User token header below.  (Note: We don't care about security for the project, but your browser isn't willing to trust me about that).

### User-token header
* The user-token is a value the server recognizes.  You will obtain this from calling the login endpoint and have to add it to the headers of any request requiring authorization.
* The service will validate the value against the list of currently valid sessions to confirm who the user is (authentication) and that they are allowed to take the action requested (authorization)
* This token value is NOT the user's password.  It is a semi-random value made during login that the server temporarily records as being related to the user.
* This may seem stateful...and it is.  The HTTP connection itself is stateless, but this puts the app as stateful.  
* This means the application (server-side) needs to be careful to not break any of the assumptions that anyone would put on the site.  Generally, that means no data is stored server-side with regard to the _session_ other than if the user is/is not currently logged in.  Data that persists beyond that (such as user profile-data) is fine

More information on authentication and authorization is available in the project security document.

### Topics
Each project can have one or more 'topics' that are available to and shared among all users

#### Topics - What and Why
* A topic is any subset of data that you want to work with
* Your app can store all the app data in one topic, a few, or many
* BUT - the data for a topic is all loaded at once and all replaced at once, so find a good match for your needs
* A topic holds JSON, so it can be deeply nested or just a single value

