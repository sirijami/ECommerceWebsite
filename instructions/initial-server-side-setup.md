# Initial Server Side Setup

There are some tasks needed for your application to work that only have to happen once, so while you can build those steps into the application if you wanted, it's probably not an efficient use of time, particularly on this project. 

Instead, you can take care of these tasks manually, sending fetch() requests from a browser console to the server-side API.  

This is a list of some of those tasks and what you would do for them.  Not all projects will need each step, and some of the steps depend on how your application data model is structured.

## TODO: Creating your first user
## TODO: Adding any additional admin users
## TODO: Creating any mandatory topics

Topics require a POST to create, but a PUT to update.  Depending on how you use topics, you may have one or more that are just always there, even if they may hold an empty object or array.  If you don't want to worry about that logic in your app, you can manually send a POST request to create the topic, then your app need only call PUTs.

I would recommend writing a small JS file that has the process, even if it's just something you can cut and paste (and place a valid x-user-token in the request, as that will change).  

Don't DELETE the topic unless you want to POST to recreate.  If you're reusing it, just PUT in something empty (including null).

Of course, if your app is dynamically adding and creating topics, this does not apply.

## TODO: Populating any base data

Like the topic in general, you might have some data that comes from the service that is necessary for you.  You can manually create that data in advance, but as with topic I would recommend keeping the requests so you can easily re-do it.

## TODO: Cleaning up your data if you change your data model (or just mess up)


