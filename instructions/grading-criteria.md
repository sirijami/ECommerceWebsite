# Final Project Grading Criteria
_Subject to tweaking_

*Note*: While most of these criteria are good concepts for any project, some are subjective and others conditional (using a SPA with no server-side generated initial HTML is not always the best choice, for example, but sometimes it may well be the best choice).  

Particular exceptions to these rules MUST be obtained in advance.   Exceptions are unlikely except for:
* 3rd party React components that encapsulate a particular and involved concept
* Certain subjective linting rules where we swap one rule/concept for another
* If you have some task that truly makes sense to alter the DOM outside of React (very conditional)
Even if one of these apply, you must get a written(email) exception before using one

If something is not banned or similar to something that is banned, it is probably allowed, but check with me if you aren't sure.  Don't lose time with too much effort that won't directly alter your grade.

## App Features
* The app MUST allow multiple users
* The app MUST be about a collection of various items
* The app MUST allow modification of this collection
* The app MUST have some status change for items

### App Features - User
* The app MUST allow new users to register
* The app MUST allow users to login 
* The app MUST require a username and password to login
* The app MUST allow users to logout
* The app MUST handle common login expectations (e.g. username is not case-sensitive, password IS case-sensitive)
* The app MUST show a user if they are logged in
* The app MUST allow a user to set some personal information (e.g. Actual Name)
* The app MUST load and display some saved personal information each visit by that user
* The app MUST allow users to edit that saved personal information

### App Features - Listing
* The app MUST have a page listing the items
* The listing MUST show a summary of all items
* The listing MUST include (directly or implied) the status field for each item
* The listing MUST be able to filter the displayed items by some criteria
* The listing MUST show if the listing is filtered and how
* The listing MUST allow a user to change how and if it is filtered
* The listing MUST be able to be sort the displayed items by some criteria
* The listing MUST show how the listing is sorted
* The listing MUST allow the user to change how it is sorted

### App Features - Item 
* The app MUST allow the addition and editing of items (these can be different displays)
* The app MUST provide informative validations on any required fields (minimum 1)
* The app MUST provide informative validations on any fields that have restricted formats (minimum 1)
* The user MUST be able to save the addition/change 
* The user MUST be able to cancel the addition/change
* The app MUST have the original information if a change is cancelled

### App Features - Item Status
* The app MUST have some form of "status" field for each item
* The app MUST display the item status in the listing
* The app MUST update the status field based on a user action 
* The app must NOT allow the editing of the status field directly
* The app MUST have at least 3 status states
* The app MAY have more than 3 status states
* The app must NOT show or allow non-sensical status transitions
* The app MUST have status states that have at least 1 non-sensical status transition (that is not shown or allowed)
* The app MAY have status states that include more than 1 non-sensical status transition (that is not shown nor allowed)
* The app MAY gather additional information to associate with a status change
* The status change MUST be understandable as part of the purpose of the app

## Composition
* The app MUST be a single page application from static html, js, and css files
* The app MUST use React + React Dom
* The app must NOT use a boilerplate/project template other than create-react-app
* The app must NOT use any 3rd party state management library 
    * No Redux, No Flux, etc
* The app must NOT use any 3rd party React components 
    * No Bootstrap, No Foundation, etc
* The app must NOT use any other 3rd party JS library EXCEPT polyfills
    * No lodash, No underscore, No moment.js, etc
    * No Firebase, No oAuth, etc.
* The app must NOT use any other 3rd party HTML library
* The app must NOT use any 3rd party CSS libraries (Less and SASS are fine)
* The app must NOT use any 3rd party service calls
    * No Firebase, No google APIs, etc
* The app MAY use 3rd party icons and images
    * FontAwesome, etc okay IF you follow the other rules 
* The app MUST have permission to use those icons/images (see Delivery - README.md)

## App Completeness and Quality
* The app features MUST be discoverable (users should realize what they can do and how)
* The app MUST be understandable as a complete single app
* The app MUST handle service errors and inform the user in a useful way (what should the user do now?)
* The app MUST have enough attention paid to appearance (pretty not required, painful is bad)
* The app MUST follow common web application customs and common user expectations
* The app MUST allow understandable navigation between the features
* The app must NOT show warnings, errors, or messages in the browser console when run  (runtime issues MAY report to console)
* The app must NOT leave a user confused - you MUST indicate some response to user actions 

## Code Quality and Standards
* The js/jsx files MUST pass linting using the built in linting rules without errors or warnings
* The code MUST be consistent and avoid bad practices

### Code Quality and Standards - Security
* The app must NOT store the user's password anywhere on the client-side - send it to login and don't save it past that
* The app must NOT expose the user password to other users 
* The app must NOT allow users to modify or see other users' personal data other than username, email, and name (if you have those)
* EXCEPTION: Security concerns over using HTTP instead of HTTPS are NOT a problem for the project
* EXCEPTION: We are NOT concerned about users reading/modifying the JS in the browser

### Code Quality and Standards - JSX
* All React components MUST be in .jsx files 
* All React components MUST be one to a file
* All React components MUST have names that match the filenames
* All React component names (and filesnames) MUST be in CaptialCase.
* Code must NOT alter the DOM directly beyond React
* Code must NOT use dangerouslySetHtml with any user-provided text, and should try to avoid using it at all

### Code Quality and Standards - Architecture
* React code MUST reasonably minimize coupling between components
* React code MUST handle application state in a maintainable way
* The filesystem structure (directories, naming conventions) MUST make maintenance easier
* Different content (HTML, JSX, CSS, JS) MUST be in separate files (JSX may have inline styles if you desire)

### Code Quality and Standards - JS 
* Code MUST use const and let as described in class
* Code MUST have consistent indentation
* Code MUST use promises (particularly from fetch) sensibly
* Code MUST strive to be clear, understandable, skimmable, and maintainable
* Code MUST strive to be reasonably DRY
* Code must NOT use var
* Code must NOT use alert
* Functions must NOT do too much nor be too large
* Files must NOT do too much nor be too large

### Code Quality and Standards - Service calls
* Code MUST make service calls in a (mostly) RESTful manner
* Code MUST call webservices via fetch()
* Code MUST call the provided services for the appropriate reasons and in the appropriate way

## Delivery
* The app code MUST be submitted in your class final-project github repo as a pull request (PR)
* The app code MUST include a package.json

### Delivery - Pull Request
* The PR MUST be received by the project deadline (but a late project is better than no project)
* The PR MUST be from the branch "final-project", named EXACTLY that. (I suggest developing in a different branch first)
* The PR MUST have an appropriate .gitignore file
* The PR MUST contain a useful and appropriate README.md (A high-level overview of what the app does)
* The PR MUST contain source code to recreate and modify the built version
* The PR must NOT have node_modules within it
* The PR must NOT have files that are NOT part of the project in it

### Delivery - package.json
* The package.json MUST list the author and include an email address
* The package.json MUST contain the all the necessary dependency information

### Delivery - README.md
* The README.md file MUST be in the github markdown format (like this file)
* The README.md file MUST tell me what your status states are
* The README.md file MUST give me enough information that I can tell which status state transitions are/are not allowed
* The README.md file MUST list any 3rd party icons/images used, listing the url and the license

### Delivery - Code
* I MUST be able to run "npm install; npm start" to get a dev version of the app running after cloning your repo
* There MUST be a build/ directory that houses a usable application (HTML + files) without the rest of the package
* There MUST be an "appkey" file, which can be .js or .json
* The appkey file must NOT have more in it than the appkey value and any required lines to get it into the app (if any)
* I MUST be able to put a new appkey value in the appkey file and use the app with a clean storage

## Extra Credit
Make sure you nail the other requirements first: time there is better for your grade, total time-wise
This list is not exhaustive, but suggestive
               
* Do you have different permissions for different users?  (Remember the new appkey option - only the first user is automatically marked as 'admin', but that may not be the only permission you care about)
* Searching for items?
* Do you have some sort of standard display concept of alerting the user to anything?  

