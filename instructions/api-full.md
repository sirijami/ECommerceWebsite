# The provided Service API -- full details

This document covers the inputs/outputs and status of the service endpoints.

See the service-basic-api document for more explanation.

* All entries with an `appkey` in the url are within the scope of one app (e.g. "Create a User" means "Create a User for an App" )
* Some entries require a valid session x-user-token header
* All entries attempt to return JSON, even in the case of errors 

All services are currently at http://sea-info6250-crud.herokuapp.com/

Note: the service winds down if no one has called it recently, so the first call it may take several seconds to complete.  Later calls should be fast until it goes to sleep again (which it won't do while you're actively using it).

* It is highly recommended work with your browser console open and have "Log XMLHttpRequests" turned on.
* You can send sample fetch() calls from the console to validate your expectations.

## Examples

### Example simple service call

```javascript
// this is the 'GET /' example
fetch('http://sea-info6250-crud.herokuapp.com/test', {
  headers: new Headers({ 'Content-Type': 'application/json' })
})
.then( (response) => { 
  if( response.ok ) {
    return response.json();
  }
  // Handle other errors
})
.then( (json) => {
  // this endpoint is just for testing, 
  // so I'll look at the results in the console.
  console.log(json);
})
.catch( (error) => {
  // You should try to say something on the UI in addition to this
  console.warn('Help! I need an adult!', error);
});
```

### Example call to log in (requires that a user was created!)

```javascript
// this is the 'POST /users/:appkey/:username/session' example
// this is after I created an account 'thehat'
// and I'm using the appkey I was assigned

fetch('http://sea-info6250-crud.herokuapp.com/users/myapp/thehat/session', {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  body: JSON.stringify( { password: 'itisasecret' })
})
.then( (response) => { 
  if( response.ok ) {
    return response.json();
  }
  // Handle other errors
})
.then( (json) => { 
  if( json.error ) {
    // If the server has an error, it does not go to the catch
    // and that error might be something like "wrong password"
    // so I need to do something about that here
  }

  // I can get the exact format of the output 
  // by first calling the service from the console
  // That lets me know what to expect

  // Token is what I need for later calls (x-user-token)
  // I can call setState if it is scope to save the value
  // or a handler in scope that has setState as a closure

  token = json.token; 

})
.catch( (error) => {
  // Etc
});
```

### Example more involved service call (uses a token from logging in)
```javascript
// this is the 'PUT /topics/:appkey/:topic ' example
fetch('http://sea-info6250-crud.herokuapp.com/', {
  method: 'PUT',
  headers: new Headers({ 
    'Content-Type': 'application/json',
    'x-user-token': loginToken  // Or whereever I stored it
  }),
  body: JSON.stringify({ toStore: your_topic_data_here })
})
.then( (response) => { 
  // Etc, etc, as above
})
.then( (json) => { 
  // Don't forget to check for json.error!
  // ...skipped for space..
})
.catch( (error) => {
  // You should try to say something on the UI in addition to this
  console.warn('Help! I need an adult!', error);
});
```
### Utility Endpoints

#### Get the full API

```GET /```
##### Authorization
No x-user-token header required
##### Parameters to Send
None

#### A test to see if your x-user-token header is seen and general connectivity
```(any) /test```
##### Notes
* You can GET, POST, whatever
* Has no use in application, used to try out calls only
* Returns a bit of info about the call
##### Authorization
x-user-token optional
##### Parameters to Send
None

### User-related Endpoints
#### To get a list of usernames that have been created
``` GET /users/{appkey}```
##### Authorization
No x-user-token header required
##### Parameters to Send
None

#### Is a username available?  Is this user logged in?
```GET /users/{appkey}/{username}``` 
##### Authorization
No x-user-token header required
##### Parameters to Send
None

#### To create a user account (register)
``` POST /users/{appkey}/{username}```
##### Authorization
No x-user-token header required
##### Parameters to Send
Property | Example | Description
---------|---------|------------
username | Jane | Should be limited to characters that work easily in urls
password | batteryhorsestaplecorrect | No particular restrictions

#### To log a user in (create a session)
```POST /users/{appkey}/{username}/session```
##### Authorization
No x-user-token header required
##### Parameters to Send
Property | Example | Description
---------|---------|------------
username | Jane | Should be limited to characters that work easily in urls
password | batteryhorsestaplecorrect | No particular restrictions

#### To log a user out (destroy session)
```DELETE /users/{appkey}/{username}/session```
##### Authorization
An `x-user-token` header valid for this user (or an admin) is required
##### Parameters to Send
None

#### Get personal data for a user (profile)
```GET /users/{appkey}/{username}/profile```
##### Authorization
An `x-user-token` header valid for this user (or an admin) is required
##### Parameters to Send
None

#### Save personal data for a user (profile) 
```PUT /users/{appkey}/{username}/profile``` 
##### Authorization
An `x-user-token` header valid for this user (or an admin) is required
##### Parameters to Send
Property | Example | Description
---------|---------|------------
toStore | { "some": "data" } | **required** The value in toStore will be stored in the profile.  And and all previous profile data stored for this user is overwritten.  The value of toStore can be anything JSON can hold.  For example, it can be a simple object, or an array of objects that holds arrays and objects.

#### Make a user an admin
```PUT /users/{appkey}/{username}/admin```  
##### Authorization
An `x-user-token` header valid for an existing admin is required
##### Parameters to Send
None

#### Remove admin permissions from a user
```DELETE /users/{appkey}/{username}/admin```
##### Authorization
An `x-user-token` header valid for an admin is required.  You cannot remove your own admin flag.
##### Parameters to Send
None

### Topic Endpoints
Each appkey can store one or more "topics".  Each topic has a name and a value that is any JSON-able value, so it can be a simple string or a a deeply nested array/object.

Like 'appkey', this use of the word 'topic' is a concept used in this API and is not a general industry concept.

In a "real" application, it would be strange to let _any_ user Create/Update/Delete from the collective data of the app with no restrictions.   Putting such restrictions in the front end JS code does nothing to prevent someone from issues service calls outside of the JS, just as we can put test calls in our browser console.  Which means that normally the service would have more restrictions on who can do what, which the front-end code would need to adapt to.

#### Get a list of different topic names that exist for the app
```GET /topics/{appkey}```
##### Authorization
An `x-user-token` header valid for any user is required.
##### Parameters to Send
None

#### Create a **new** topic
```POST /topics/{appkey}/{topic}```
(only if topic is new) The value of the 'toStore' key of your body object will replace any previous value(s)
##### Authorization
An `x-user-token` header valid for any user is required.
##### Parameters to Send
Property | Example | Description
---------|---------|------------
toStore | { "some": "data" } | **required** The value in toStore will be stored as the topic.  The value of toStore can be anything JSON can hold.  For example, it can be a simple object, or an array of objects that holds arrays and objects.

#### Update an existing topic
```PUT /topics/{appkey}/{topic}```   (only for existing topic)  The value of the 'toStore' key of your body object will replace any previous value(s)
##### Authorization
An `x-user-token` header valid for this user (or an admin) is required
##### Parameters to Send
Property | Example | Description
---------|---------|------------
--------------------------------
toStore | { "some": "data" } | **required** The value in toStore will be stored as the topic.  The value of toStore can be anything JSON can hold.  For example, it can be a simple object, or an array of objects that holds arrays and objects.  **ANY** existing data in this topic is overwritten, so be sure to send the entire collection of data you want to have, not just the fields you are updating.

#### Get the value stored for an existing topic
```GET /topics/{appkey}/{topic}```
##### Authorization
An `x-user-token` header valid for any user is required.
##### Parameters to Send
None

#### Remove an existing topic
```DELETE /topics/{appkey}/{topic}``` 

Depending on your use of topics, you may not use this at all, because you have set topics that do not change existance during the use of your application.

You can update an existing topic to still exist but hold empty data (using the PUT call above) instead of deleting it if you will reuse it.  That reduces any PUT vs POST effort.
##### Authorization
An `x-user-token` header valid for this user (or an admin) is required
##### Parameters to Send
None
