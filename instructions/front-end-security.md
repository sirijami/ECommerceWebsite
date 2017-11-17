# Some comments about JS and Application Security

This is not remotely a complete document on web application security.  Such a document would cover SQL Injection, XSS, CSRF, fuzzing, passwords, hashing, salting, cookies, tokens, SOP, CORS, and HTTPS at a minimum.  This does, however have a few point it is good to know until you can learn those other ones.

## JS and restricting what the user can do or enter

Repeat after me: Front End cannot actually restrict access.

No, you didn't say it aloud:  Front End cannot actually restrict access.

Fine, be that way.  But it is a very important point to remember.  Whether it is deciding what options are displayed or validating data, Front End security is really all about convenience rather than actual security, other than not making security WORSE by being sloppy with a user's password or similar tricks.

The reason Front End cannot restrict access is for two reasons:

* JS runs on the browser, but someone can _easily_ make HTTP requests without a browser with only a little bit of knowledge that is widely available.  And since they are making the calls themselves, they can put whatever data in they want and call whatever endpoint they want.  If you have JS that doesn't offer the option to call a particular endpoint unless you decide they can, but the endpoint itself doesn't require some form of authentication, then it is easy to just call that endpoint without a browser at all.  If you don't want a user sending a username that is 150 characters long, so you add JS to not let that get submitted, I can just send a request with a 200 character-long username from outside the browser and your JS never gets involved.  Only if the service denies such a request is it truly prevented.
* I can even do what I want in the browser.  The browser console shows that all the JS is available for me to inspect.  I can set a breakpoint, change the value of a variable, and let the code continue running from there.  I can make the JS code loaded in my browser from a site think that a 200 character-long username is 5 characters, or that the service call that said I was not an admin actually says that I am.  So anything that CAN be obtained to the front end IS available to be obtained. 

That does not make JS-based validations and option-limiting useless.  Even if they don't add security, they can add convenience.  If % is not allowed in my username and the service will reject it if a call is made trying to save a username with a % in it, it's nice of the JS-based validation tells me that BEFORE I submit the code.  For one thing, the JS is often more nicely formatted, and for another, it's much faster to find out via JS than to send the service call and await the results.  Likewise, if if the service won't return any admin data to me if I went to the admin section because I'm not an admin, it's convenient to not even show me that section.
