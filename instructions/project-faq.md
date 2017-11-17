# Frequently Asked Questions regarding the final project

## Wait, what changed about cookies?

The technical issues will be covered when we cover cookies and security issues, on Aug 8.

The original spec had us using cookies to carry a secret authorization token on each request/response, something commonly done today (though not the only or the best way to do it).  BUT when places do it today they know which websites the services will be called by, and can tell visiting browsers that they are expected.  In our case, I have the webservice accepting connections from everyone, which is allowed but cannot be combined with the use of cookies, because of the security risk of CSRF.

So instead we will follow the same process, but instead of the server returning a security token as a cookie it will return the token as a value, and subsequent requests will have to include that value as a header to be considered authorized. This is now detailed in the service-basic-api document.

## There are SO MANY criteria?  How can I possibly get this done in time?

It's not as bad as it looks - many of the criteria are things you'd do anyway.
Definitely start small, get that much working, then expand, getting each addition working and clean before moving to the next.
I recommend _against_ writing the entire thing and then trying to make it work
I recommend _against_ putting off cleaning the code up until the end - get a piece working, then make sure that piece is good enough to submit before turning it in.  You would loose more points by having a fully working app that didn't match other criteria than if you had a partially complete app that does match the criteria.  Likewise, a buggy application that has good code quality is better than a fully working app that doesn't demonstrate that you've learned anything in class.

## I don't fully understand 'status state' or 'status state transitions' - what are they?

The items in your project must have a "status" (you can call it whatever you like in your project).  This status reflects whatever items your project is tracking.
For example, a library would track books, and the status would say if it was in the library or out, such as the statuses of 'On Shelf', 'On Loan', and 'Returned'.
Another example: a maternity ward might track pregnant women with statuses like 'Expecting', 'In Delivery', 'In Recovery', and 'At Home'.

There can be many statuses (minimum 3).  Your status doesn't have to cover every real-world possibility, but should match the most common situations.  

'Status state' refers to which status the item is currently in.

A status can (but does not have to) have a related piece of data.  For example, a library book 'On Loan' might say who it is on loan to.

'Status state transition' is talking about going from one state to another.  For example, changing an expectant mother from 'Expecting' to 'In Delivery'.
You must have at least one transition that isn't allowed because it doesn't make sense.  For example, an expectant mother doesn't go from 'In Delivery' to 'In Home' - she must be 'In Recovery' first.  Likewise (in our simple world) a library book does not go from 'On Loan' to 'On Shelf' directly, it must be 'Returned' first.

For the project, you cannot allow the user to type these statuses in an edit mode, or even have a drop-down to pick one.
You must have some sort of "action" you can take that will set the status.  For example, a book that has that status 'On Shelf' might have a button labeled 'Check Out' or 'Loan'.  Clicking this button would result in the status changing to 'On Loan'  (There may or may not be steps in between).

The actions do not have to match the name of the status ('Check Out' is not 'On Loan'), but I need to understand the connection.  
The actions that are not allowed should not even appear.  (A book 'On Shelf' would have no 'Return Book' action shown, while one 'On Loan' would)
The status should be displayed in the listing.
The actions can be anywhere that is appropriate.

## I don't fully understand the status requirements or transitions.  What does "non-sensical" mean?

This project has a requirement of a status that can change ("transition") from one state to another, indirectly.  It also requires that there is at least one "non-sensical" transition that a user cannot make with the application.  What does this mean?

Which transitions make sense depends entirely on your states and the process your application is covering.  

For example, with a project tracking injured wild animals that are being treated and release, you might have states of "Arrived" (they are in the system and awaiting a vet to look at them), "Treating" (they have been diagnosed and are taking medication, having any necessary procedures, and generally healing), and "Released" (they are back in the wild).  In such a case, the flow of states is Arrived -> Treating -> Released.  It does not make sense (it is 'non-sensical') to have an animal go from 'Released' to 'Treating', from 'Treating' to 'Arrived', or from 'Released' to 'Arrived', so your application won't show the option to do that.  You might want to allow for user mistakes (good idea!) and let them go back a step, but even then 'Released' to 'Arrived' makes no sense.  
The flow looks like:  `Arrived <-> Treating <-> Released`
To have a non-sensical transition in a two-way linear flow requires a minimum of 3 possible status values (states).

That was a set of status transition that was a one-way chain.  (or a two-way chain if you let them go back a step)  There are other possible patterns to a status transition.  
The labels and descriptions for these patterns are not formal industry terms, and are used to describe the general concept here.

For example, a transition might be a loop (one-way or two-way).  An example of that would be the Expectant Mothers application.  A woman might start as 'Expecting', then move to 'In Dlivery', then 'In Recovery', and finally 'At Home'.  Put people can have more than one baby, so if the same woman becomes pregnant again, she would go from 'At Home' to 'Expecting', and the loop would continue.  If we allow them to go back a step from where they are at to allow for mistakes, we have a loop that they can move through, but 'In Delivery' to or from 'At Home' makes no sense.  (at a basic level - for this application we're not covering every possible explanation)  
The flow of states is basically: 
`Expecting <-> In Delivery <-> In Recovery <-> At Home <-> Expecting (the starting state)`
To have a non-sensical transition in a two-way loop requires a minimum of 4 possible status values (states). 

You can also have a pattern of transitions that are a "burst" pattern (again, not an official term).  This involves some status that the other statuses can go to-from, but those other statuses cannot go to/from each other.  Example:  Imagine an animal shelter.  They will have various animals that they are keeping "In House".  These animals might get "Adopted".  Or they might be "Transferred" to another facility.  Or they might die or be put down :( and be "Deceased".  Once the animal is not in the facility, they don't track it, so it makes no sense for an animal to go from "Transferred" to "Adopted" or "Deceased" (or the reverse).  An animal that was once in the facility might come back, so "Transferred" to "In House" and "Adopted" to "In House" make sense.  Allowing for user mistakes, they can un-"Deceased" an animal and have it be "In House", so resulting flow is hard to show in text, but something like:

```
            Transferred
                ^
                |
                V
Adopted <-> In House <-> Deceased 
```

To have a non-sensical state in a two-way burst pattern requires a minimum of 4 possible statuses (states).  It can be done with 3, but then it is just the linear flow, not a burst.

And of course, with enough states you can have a complicated pattern of possible state transitions, where the entire flow is composed of these sorts of flows, such as a linear flow with the end being the central point of a burst and one of the "arms" of the burst being part of a loop.  

The key part to walk away as a programmer with is that there are many possible states for something to be in, and there are often states that it does not make sense to be able to switch between.
It is a better user experience to only be shown the possible changes that make sense (which might include going 'back' a step).  This also benefits your logic - if you know that Step A has to have happened before Step B, then you can write Step B with fewer `if`s and checks, which leads to more simple code, which is easier to extend and maintain.

The key part to walk away with for the project is that you need to have one state change that is not available to make, that it makes sense to not be able to do that, and that these status changes are done 'indirectly'.

## What does it mean to set a status "indirectly"?

The high level requirement about status is that for some "item" your app manages, there must be at least one thing about it that some user (might be admin users only, or might be all users) can modify directly, as well as at least one "status" that only changes indirectly.  

"Directly" means that the user chooses the value from all options or sets the value to the value you enter.  Examples of directly changing a value include: typing in a text field, picking from a dropdown, pressing up/down, +/-, or other buttons that cycle through options, checking/unchecking a checkbox, picking a radio button, or clicking on a button that contains the new value the field will change to. 

"Indirectly" for this requirement means that the value is determined as a side-effect of some other action, such as setting the value of the field when the value of another field changes.  Examples of indirectly change a value include: Changing a second field to some value when another field is set to a certain value, such as making an item 'Out of Stock' when the quantity value reaches 0.  Changing a multiple fields to values in response to a user event that does not pass the values that are being set, such as setting a 'Start Date' value to today and a status value to 'Ongoing' when a 'Begin' button is clicked (and the button does not contain one or both of those new values).

Your application might have different types of information stored in different "topics" (see the FAQ entry on topics), but this requirement only has to be fulfilled by one of them.


## Do I need an 'edit' screen in addition to the listing?

It is not required, but it is permitted, and may or may/not make sense based on your UI choices.

A project might have a listing, and clicking on a gear icon allows you to edit fields in place in that line of the listing is fine (don't forget to be able to cancel!).  Or, the listing might include a link that changes the screen into an edit screen for that one item.  

The choice is yours, so long as it is discoverable, understandable, and meets the criteria.

## What does "topic" mean in the service api?

"Topic" in this case is a term we are using for this project - it is not a general term used with this meaning anywhere else.

A "Topic" for this api means a single collection of data that has an identifier, which is a vague description, so I will give more details.  Because the identifier is used in the urls for the api, it is much, much easier if the identifier is made up only of lowercase letters, numbers, and perhaps the - _ and . characters.   The identifier also has to be unique to the topic, should not change over time for that topic.  (While uppercase characters are allowed in urls, because domain names are always treated as lowercase, and because some computer file systems are case-sensitive and others are not case-sensitive, it's a best practices to make all parts of a url lowercase.)

Consider a minimal case for the souvenir stand example:  We have a list of different items we sell.  Each item has a quantity ( a number ), a name (a string) and a status ( a string that we expect to be "In Stock", "Out of Stock", or "Ordered".

Ultimately, each topic _for this particular api_ is sent/received as JSON with no restrictions, so you can store any object or array in a topic, including nested ones (arrays or objects or arrays, objects with values that are themselves objects or arrays, etc).  

This can be broken into topics in different ways:  

* *We could have each item be a topic*
We could get the list of items identifiers with a GET call to `/inventory/{myappkey}/`.
We could get the details of a single item with a GET call to `/inventory/{myappkey}/{identifier}`, and we could update the details of an item with a PUT call to that same url.
None of the fields of an item are appropriate for the identifier because quantity both changes and is not unique, name might have capital letters, spaces, or other special characters, and status changes, is not unique AND has spaces and special characters.
This means we would have to add a field to each item that serves as the topic identifier.  For simplicity, we can call this field "id", give it a numeric value, and never show it to the user as it is meaningless beyond being unique and unchanging.
When an item is changed, we will make the PUT call to save the data (see the "faking-it" file in /instructions/ to learn how this is and is not what a fully "real" application will do).  
The disadvantage to doing it this way _for this particular api_ is that if we expect every topic to be an item for sale, we have nowhere to store any other kind of data.  If we wanted to have a different collection of data to hold, for example information on sales that we could update without updating the HTML, we have nowhere to put that, because every topic is being considered an item for sale.  We could say "every topic except 'sales'", but that sort of logic adds complexity, and complexity is bad.  As we added later additional topics (employee schedules, store hours, employee information, etc) we'd have to continue to not only add our new logic for the new topic, we'd also have to add the exception to the old logic.  (We are not adding such things to our project, but you should always program as if the program you are writing will stick around and later be expanded, because "temporary" or "simple" programs often last longer and get more features added than you expect, plus always coding to avoid regrets builds good habits).

* *We could have one topic be the inventory* 
We could create a topic with the identifier "stock" (for example).  
This topic could hold an array of objects, with each object being an item type (represented as an object with name, quantity, and status fields).
To get the list of items for sale we would make a GET call to `inventory/{myappkey}/stock`.
To update any item we would send the entire stock array, holding ALL items, as a PUT to `inventory/{myappkey}/stock`.
When we do so, the entire previously stored value for the entire stock on the server-side is replaced, so anything that is not in the data you sent no longer exists.
Example: if your stock consisted of Seahawk snowglobes and umbrellas stored server-side, when you do the GET of the stock, you get an array of two objects holding the data for those two kinds of items.
If you updated the snowglobe object, and stored (via PUT) an array holding only the snowglobe object, then no record of the umbrellas exists anywhere.
Doing your stock management this way requires that you store the entire stock for each update.
The disadvantage to managing your topics with one topic representing your entire inventory _for this particular api_ is that you have to update the entire stock for any update.
The advantage is that you have other topics available to store different data than just inventory, such as employee schedules, store hours, sales, etc, and you don't have to worry about unique identifiers for each item (as long as you are using an array to store the collection of items.  That is neither the only way to do it, nor required)

Because this use of "topics" is used only with this particular API, and because replacing either an item OR collection of items that are shared between users is not normal (see "faking-it" document) you can choose whichever you wish - you just need to understand the advantages and disadvantages of each way.  

## What is CRUD?  Why does it have such a gross name?

CRUD stands for Create, Read, Update, Delete, those being the basic operations against a collection of data, and the functionality a majority of web applications provide.
Gmail, eBay, Amazon - it's easy to describe each of them as a series of CRUD-based operations.

It's also easy to map the HTTP methods when used in a RESTful way to theses concepts.  

While most web apps are CRUD apps, and just about anything can be said to have SOME level of CRUD operations, generally it is used to talk about the overall purpose of an application.

IMDB is a CRUD application - the entire point is to Create entries, have people Read them, Update them, and when appropriate, Delete them.  Recipes.com is likewise a CRUD application.

A site that lets you enter different variables about a plane wing to determine its flight performance is not a CRUD application.  It may very well do each CRUD action somewhere, but the purpose is not CRUD.  

CRUD applications can have additional features, and can (and almost certainly will) have different ways to do one or more the CRUD actions.  For example, if IMDB lets me search for a movie title and the service sends back a list of movies, that's a Read operation.  If I click on one and it fetches the details for that movie, that is ALSO a Read operation.  The point of using CRUD to describe something is not to perfectly describe the interface, but rather to convey the sorts of work that is done by the application at a very high level.  

For our purposes, your project will need to demonstrate at least one of each operation.

## What is the difference between between normal users and admin users?

That depends entirely on your application.

For applications like all the examples in the overview, which are "internal" applications used by staff and not open to the public, all users will be normal users (and any admin users will be treated like normal users).  In a full "real" application there would likely be different sets of permissions for different roles, but the basic idea that every user can be trusted with the data is the key part.  This is like the computer system at a doctor's office or a movie-theater: you interact with staff that use them, but you yourself never use them directly.

Other applications may be entirely user-driven.  Just like the "internal" example, all users are treated the same.  Users might have items they create that they can make modifications that other users can't, but that is based on which user you are, not what role you are.  For such systems you might have it that admin users can change data regardless of who created it, while normal users have limited options on data added by someone else, but there is no such requirement for this project: if a normal user can perform all of the CRUD operations on something and the other criteria are met, treating admin users differently is extra, not required.  Applications like this are similar to Craiglist or Ebay - users create entries that they can update or delete.  All users can read everyone's entries, and perhaps make limited updates, but only have the full range of operations on entries they themselves create.  Admin users with special permissions might be a good idea for maintenance, but aren't required for the normal operation of the site.

You might have an application that represents an interaction between the normal users and the admin users.  Unlike the user-driven sites, the normal operation of the site requires a step performed by non-public users (for us, admins.  
For real-world applications, some user role that has more permissions than the public users.
For example, if our souvenir store example was not just for internal users but allowed users to purchase items - users can buy items (which reduces quantity in stock), and admin users can add new items and increase supply of existing items.
Applications like this are similar to Amazon or other company shopping sites - users cannot add new items for sale or increase the stock of items or say when an order has shipped, but they can create orders (and decrease the number in stock).

Lastly, you might have an application that also has a role that doesn't require someone to be a user at all.  Some wedding announcement sites, or electronic "card" sites allow normal users to enter information and create an event or card.  They get a link (a url) that they can pass out to friends and family.  These people can follow the link and see the created product.  These links are not secure at all - the information is public, and anyone that knows or guesses the url can see it without logging in, the link is "secret" only in the sense that it is inconvenient to get that page/information without the link.  Because these general public users aren't logging in, they aren't "normal" users - they aren't users at all.  The users creating the page are "normal" users - other than having an account there is no permission required to create events.  The site may or may not have admin users, but they aren't involved in the normal usage of the site/application.  The project has a requirement of having users and storing/showing some information about the users, but does not require that users be logged in for the normal flow, so such an approach is allowed for your project as long as you fulfill all of the criteria.

These are all examples for your projects - the concepts apply to applications outside of the class, but most have more involved roles and permissions.  That's not always true - for example, a "link shortening site" usually doesn't require a login to create a link.  You hit the site without logging in, give it a url, and it saves that url and creates a unique shorter link and gives that to you.  When anyone hits that short link (which just reaches a web application at that url), without logging in the application looks up the short url parameter, finds the long url, and redirects the user there.  In the simple version there are no users at all.  If the site requires a login to create, update, and delete url links, and even if you add in admin users to manage the full collection of urls from with the app, that is still no more complex than we are doing for this project.

Another case we haven't covered is that often admins will use a different web application.  Both the admin site and the public site interact with services that manipulate the same data - they may even be the same services - but the application logic that decides when to call them and with what data, the UI presentation, the url the admins use to get to the site, and the deployment of that application may all be completely different from the public site.  If a site administration is easily done by interacting with data displayed in a fashion similar to what the public users see, it may be done in the same application because most of the application presentation and logic are used for both cases.  If the administration involves very different screens and workflows, it is often done as a separate application.  The complexity of having a second site is far less than the complexity of making one site handle two unrelated displays and logic. 

The key items to know as a developer are that you can have no, one, two, or many user roles required to complete the normal usage cycle for items on a site, and that administration may or may not be done via the same site.
The key items for your project are that you know which model your application is following and you've set up the necessary users for each, which may or may not include any use of admin users.  The only requirements for the project regarding users are spelled out in the criteria, which focus on "can you show that you can do this" parts and don't interact much with actual permissions.  Using permissions is explicitly listed as an extra credit option.

## How do I show different screens to logged/not-logged-in users, or different screens for listing all items and editing an item?

This is a single-page application (SPA), which means there is only one HTML page, and after it is loaded the user can do everything without reloading the page or loading different pages.  

The displayed page is rendered from nested React components, and any number of those React components at any particular "level" (i.e. from the top level that contains everything displayed on the page to something nested very deeply that controls something as small as a bit of text) can be conditionally displayed based on the application state.  

Often you will have more options than "do I show this or not".  For example, a common case is that a site may display a page that can't do much, but offers an existing user login link (or form) and a register new user link (or form).  Following either of those options may take you to very different pages, until eventually you are seeing the application as a logged-in user. 
 
But even though we talk about "changing screens" and "following links", you are still looking at the same page, and have followed no urls.  All you've done is used handlers such as click handlers and change handlers to run functions that change the application state (via setState).  When setState() is called, React re-renders and decides what part of the actual HTML to replace, which to the user looks like something on the page changed or even the entire page content.  Regardless of what is shown based on the current application state, the JS running in memory from that initial page load has all the component code, and is thus able to generate the HTML for any allowable application state.

## Can I...?

If it is about adding features to the application: so long as it doesn't violate the criteria, you may add features (which may earn extra credit).  However, I must be able to understand and discover those features.  You should first build the base application to meet all the criteria before adding features.

If it is not about adding features, you should ask me directly (and it never hurts to ask even if it is about adding features)
