# How this API is faking it, and how that impacts your application

This class has tried to teach the basic skills for developing real world applications, but in the interests of getting it done in time some parts are more simple than most real-world web applications would be.  Here are a few points you should familiarize yourself with because understanding these will help with designing other web applications that use a more sophisticated api (meaning a useful API).

## How this API may not work for a real multi-user application

Consider this scenario:
* Imagine your application tracks the number of widgets in inventory
* User Amit logs in and the application fetches and displays all the data about widgets, which includes that there are 3 Green Widgets
* User Barbara logs in and the application fetches and displays all the data about widgets, which also includes that there are 3 Green Widgets
* Amit orders a Green Widget for himself, changing the number of available Green Widgets to 2 (either directly or indirectly)
* Amit's copy of the application makes the service call to replace all the data in the topic, which includes at a minimum that there are 2 Green Widgets
* Barbara also orders a Green Widget for herself
* Barbara's copy of the application reduces the number of Green Widgets it knows about from 3 to 2
* Barbara's copy of the application makes the service call to replace all the in the topic, which includes at a minimum that there are 2 Green Widgets

The server side had 3 Green Widgets, and 2 were used, but the server side now says 2 Green Widgets instead of 3.  Depending on your data, you can play this out to any number of results - added data can be lost, removed data can be added back in.

Speed is not a solution - even if you refetch the data before making a change, apply the changes (-1 Green Widget in this example) to the just-fetched data and immediately save it, that is still two discrete communications to the server-side and someone else can make a change in-between them.

This problem is generally known as "last one wins" or "first one wins", either saying whose new state is the new state for everyone (last one), or for something that can only happen once, the first call to use that limited resource (first one) will have their call succeed (win) even if multiple people saw that the resource was available.

## How the data storage in this API is not typical

The number one issue with this API is that the service calls replace _collections_ of data.  
The changes a user makes has no way to account for changes by other users to the same data.  
The more data you hold in a topic for this API, the bigger the problem.  (If you have all your inventory in a "stock" topic, any change a user makes overwrites any change any other user has made between when this user loaded the data and when this user saves the data)

## How a "real" API would handle it

To solve this problem, there are number of different options, here are some of them:

### Send Deltas

At the most basic level, instead of sending the new form of the data, the API can receive the change relative to the original (the delta).  So instead of loading data with 3 Green Widgets, and then saving 2 Green Widgets, the application would load data with 3 Green Widgets and send a command that translated to "-1 Green Widget".  Even if the number of widgets had changed between the loading and the changing, the end number of widgets on the server-side remains accurate.

This "command" can take many forms - it might be an object describing the changes  (e.g. { "Green Widgets": { qty: -1 }} ), it might be a specific service call (e.g. /inventory/widgets/green/-1 or /inventory/widgets/green/consume )

However, implementing this sort of API can be complex and hard to change, particularly with text.  Example: If there is a description field, you don't really want to send what changed, because if someone replaced the description in the meantime the change will not make sense.  If the description when I loaded the data was "hipster cat has a stache", and I change it to "Hipster Cat has a mouse-stache", but before I save it someone else has changed it to "Dogs are not so bad", what did the delta look like, and how would it be applied?  It was "character 0 becomes H, character 8 becomes C, ..." and so forth, do we end up with "Hogs areCnot..."?  

As a result you tend to see this only on data that has a relatively unchanging model.

### Label the Original State and give Errors

In this model, when the service gives me the data in the first place, it also give me some indicator of the base version.  This indicator can be anything - a string, a number, it's just about uniquely identifying the current version of the data.  If I make a change and send the new data to the service, I include the indicator.  Before making changes, the service will first compare the identifier on my changes to the identifier of its current data.  If they are the same, the data is replaced and given a new identifier.  If they are NOT the same, the service will not apply the changes and respond with some error or message telling the application the change was not applied because the data had changed.  The application can then inform the user and figure out what to do (load the new data or overwrite it, for example)

The trouble with this form of API is that while it prevents overwriting from happening unknowingly, it doesn't actually change that it happens.

A variation on this is to turn a change call into a two-step process.  The first call just tells the service that you want to change the data.  The service will record this, and give you some identifier good for a period of time (from seconds to hours) (and probably a fresh copy of the data, or an identifier so the application can confirm that it is trying to change data that has not changed since it last loaded it).  Anyone else asking to make a change will be denied or delayed while my change is pending.  
The second call will offer the new data.  The service will record this, and remove the restriction on that piece of data.  Other users are now able to make changes following the same process - they cannot overwrite data without knowing it. As a benefit, the application can also periodically poll to see if data is "locked" and inform users or prevent them from starting changes until the lock is gone. 

If data represents multiple but limited resources, multiple locks can be placed as long as the sum does not exceed the number of resources.  You can see this with ordering tickets to a concert - when you begin the process a number of tickets are "reserved" for you for a limited period of time.  If you complete your purchase that number of tickets are fully removed from the total available.  If you cancel or take too long, the lock is removed and those tickets remain available.  If you have the last of the tickets reserved for you, as you are completing your process other users cannot purchase those tickets unless and until you fail to purchase them.

This does the job, but involves a lot more effort to code for, so it tends to be reserved for those items where any data inaccuracy is a real headache.  For Example: You do NOT want the Justin Bieber fans to learn that you sold more tickets than there are seats after they had purchased them and thought it was complete.  (Airlines deliberately oversell seats, but they still use such a system because they want to control exactly how many seats they oversell).

Where "identifier" is used above, it might be a token, it might be a hash of the data, or it might be an E-tag in the HTTP headers.

### Client-to-Client communication (direct or indirect)

In this case, as you make changes those changes are communicated to other clients (and vice versa).  To do this at all efficiently requires more modern features such as Websockets or webRTC.  This is how, for example, Google Docs can show you other people's changes as you type.  Technically there is still time to have overwrite someones change before you know about it, but the window is small and it tends to be obvious that two(or more) of you are changing the same data.

The downside to this form of API is that it requires fairly recent (and thus less supported and less available) options, it still has limitations of scale (2-5 users on the same material is fine, 100?  No go), and is far more complicated to implement.

### Don't fix it, just make it granular

By far the most common solution is to take it in stride and plan your usage and model accordingly.  As said above, the more data that is grouped in one service call, the more that is at risk of being overwritten.

* If you don't store your entire inventory in one data structure, or do that and allow a user to only overwrite some of (such as with a PATCH-type call), then the impact is greatly reduced.
* If you identify the really important parts to not be wrong about, you can set up one of the other solutions for that, and move forward with the less complicated version for the rest. 
* If your data is user-managed, you may find that it is not worth worrying about.  If I create a listing on ebay and then go to update it, they probably don't have to worry about multiple calls from my account making different changes.  
* If my data is truly cohesive (each piece closely-related to the other pieces), often I can overwrite it with last-one-wins and it's not a big deal.  For example, if our Green Widgets example did not include quantity, but instead a name, a description, perhaps the name and/or contact information for the manufacturer, then probably there's no big deal about overwriting one version with someone else's save if that is the only collection of data that is overwritten.  
* Likewise, if my data is accumulative, such as a chat program, or a forum, people are not surprised or upset with the service when someone else sends in a new message in between when the last version they saw before hitting the button and when their new data reaches the screen.  You can just send the new data and tack it on without overwriting the old data.

## How the application security/data integrity is unreliable

While the utility of the somewhat generic "topic" API can still work out as long as your topics are granular and you avoid risky data like quantity (see above), this API definitely suffers from a security problem.  (for more details on Front End Security see the security document).

As far as this API goes, the fundamentals are there
* Most actions require that you have a valid user-token that you can only get from providing a correct username/password combination
* Only admin users can delete users or make users into admins
* A user cannot log other users out
* A user cannot read or modify someone else's profile data

But the real issue comes to topics.  Any user can create, read, modify, or delete ANY topic.

Which is unlikely to enforce the rules you want.  For the project, we're going to pretend the service applies the correct security rules.

## Why this API teaches you useful details despite the flaws

Despite the somewhat basic data model and the limited security options, this API teaches you a lot of good practices and concepts.  In particular:
* Authenticating a user via a service
* Sending authentication tokens to service calls
* The loop of getting a list of data from a service, then querying via additional calls for details on one or more elements of that list
* The concept of different user roles
* Dealing with (some) server-provided security
* Using a RESTful interface
* CRUD operations

