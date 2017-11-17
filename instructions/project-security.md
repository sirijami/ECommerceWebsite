# The Project, the webservice calls, and security

Much of this information is valuable not only for this project but also for general use as a developer, but it was getting too large and off-topic for the API document.  

## Sessions and security

Very often sites have data that is specific to a user.  This can be temporary, such as the items in a cart while shopping, or lasting, such as personal information, or messages you have posted to a forum.  

Given that each HTTP request is stateless, how does the site know who the user is?  It can't trust the visitor to be truthful, after all.

The answer is by requiring some sort of authentication (usually knowing a username/password) and usually creating a "session" - a set of data associated with some identifier that lasts for the duration of the users' series of requests.  This identifier is usually known as a "token".  Some authentication systems return information allowing the client to generate tokens, and those systems don't have to create sessions - those systems are a bit more involved than we'll cover here, but other than the storage of server-side session data, the process is the same.

After logging in, each web request will send the token to say "I'm that specific person you know about".  The HTTP request remains stateless, but when the server is deciding how to respond it will use that data (who it thinks you are) to decide what to do, just like any other parameter of the request. 

Most sessions are set to expire: after enough time has passed, the session data (including any knowledge of the token) is deleted from the server-side.  

## User server session
Logging in via our project service endpoint creates a user-token and an associated session (that the service can read), and returns the token for the application to use with later requests.
All connections using that token are part of the same 'session'.
If the same username logs in while that username is already logged in (for example, logging in as the user from two different browsers), a second user-token will be issued, and both tokens will work and are tracked independently.
Because the token is managed by the JS on the page, unless you take additional steps other tabs/windows from the same user hitting the same site will be not be recognized as being part of the same session  Cookies would be the same of how cookies work, generally you will find that two tabs/windows of the same browser will share the cookie, but seperate browsers (on the same computer or not) will not.  For this project you won't need to take any of those other steps (one way to do that would be to save the token to the browser localStorage.  Every tab of a non-incognito session would be able to read it from there, and thus identify themselves).

For our application, a user will be logged out after 10 minutes of inactivity, or when the logout service call is made.

## More General Web/Computing Security Info

### Logging in

Most web sites that require authentication tend to redirect any requests for a protected url that lack a valid and authorized token to a login page.  Most web services will return a 401 or 403 header.  In both cases these are just HTTP responses - it's the browser that does anything else.  

#### Common Annoyance

Some servers handle both HTML pages and data-based service calls - these can be annoying for developers because the behavior intended for users are unhelpful for programmatic calls.  

* Example: I make a service call.  The server calls a service library.  That library returns a 404 status AND a message in the body giving more detail.  The server gets this 404, and instead of returning that to me sends me the HTML of their custom 404 page (i.e. what they want to send a user to in case of a 404).  My code never got a chance to see the specific error, and my code might receive HTML where I expected a different form of data.
* Example: As above, but the service library returns a 401 status (Authorization required) and an error message.  Similar to above, the server instead returns replace the actual response with the HTML for their login page.  My code never sees the message, and even if my code will login it will not do so via this mass of data (HTML + any embedded JS or CSS).

### Authentication vs Authorization

I've used these terms without specifically defining them.  They are similar, but different in important ways:

* Authentication is proving you who are
* Authorization is determining what you are allowed to do

Imagine three people: Simon(a student), Preetha(a teacher), and someone off the street (that might be a student, a teacher, or neither).  The student and teacher are both authenticated: We know who they are.  The random person off the street is not authenticated.  

When they each go to view Kiri's grades, Simon is denied because even though he is authenticated, he is not authorized.  Preetha is allowed to see them, because she is both authenticated and authorized.  The random person cannot see them because he/she is neither authenticated nor authorized.  

If they go to view general information about the school, their authentiation does not change, but this time all three are authorized.

Hopefully, should someone be denied because they are not authenticated, they should get a "Authentication Required" reponse (and likely go to a login page).  Should they be authenticated but not authorized, they should get a "Forbidden" message, because it will do them no good to re-authenticate.  In practice, however, the reactions to the two states can vary a lot between sites and services.

### Two-Factor Authentication

You've probably encountered this term on sites that are trying to be more secure and want to send you text messages, or use a phone application when you login.  Or perhaps you've been in a workplace that required the use of a RSA-based token generator: a device or phone application that shows a seemingly random set of numbers/letters, and quickly (a few seconds to a few minutes) changes them to a different set.  These are all examples of two-factor authentication.

In simple terms, I have 3 ways to know you are who you claim to be:
* You know something only that person should know
* You have something only that person should have
* You are something only that person would be

For security (not just web-based security) these "factors" might be used like:
* Know something: keycode, combination, PIN, password, or lots of personal questions ('self-service' is convenient but terrible security :( ), or perhaps access to your email account.
* Have something: house key, keycard, ORCA Card, or a particular token generator that was given only to you (these devices all generate different numbers from each other based on an algorithm, but the server can validate if a particular series is correct, similar to password hashes, below).
* Be something: fingerprints, retinas, voiceprint

Most security is "single-factor".  Places that want to be more secure use two-factor authentication, because that protects in case you lose control of one factor: Someone got your password, or your key, or your phone, or learned how to fake your fingerprints.  Two-factor authentication can still be broken - nothing that exists is 100% secure - but it is MORE secure.

## User-tokens in our project

In general, a token is a value the server recognizes.  For example, you will obtain this from calling the login endpoint and have to add it to the header of any request requiring authorization, but there are multiple ways to convey the token.  The point is that you send one request to authenticate yourself (using the factors, in our case, a password), and rather than having you send your password on every request (which works, and was done very briefly at the dawn of the web) the server will give you a token, which is, in essence, a one time password.

On later requests, this token is included.  The service will validate the value against the list of currently valid sessions to confirm who the user is (authentication) and that they are allowed to take the action requested (authorization).

This token value is NOT the user's password.  It is a semi-random value made during login that the server temporarily records as being related to the user. (See Password Hashes)
This may seem stateful...and it is.  The HTTP connection itself is stateless, but this puts the app somewhat stateful.  
This means the application (server-side) needs to be careful to not break any of the assumptions that anyone would put on the site.  Generally, that means no data is stored server-side with regard to the _session_ other than if the user is/is not currently logged in - this is also why you can almost always login to the same site at the same time from two different browsers.  You get two different tokens, two different sessions, but any lasting changes you make are associated with your data on the server regardless of session.  

### Passing the token back

We skimmed over how the server gets the token on later requests.  

There are 4 normal ways to handle authentication for a service call:
* session token via cookie
* session token via header
* official browser Authorization header (such as OAuth)
* tokens that do not require server-side session storage, such as JSON Web Tokens (JWT). 

It is interesting that this list is not only from most-common to least-common, but also from least-favored to most-favored, where 'favored' is based on a few technical issues such as complexity, security, and server impact.  

### One Time Passcodes ( Digression )

Historical/Cryptographic note of interest (to me at least) that doesn't directly impact web development:  

"Ciphers" are the most basic form of hiding information, and consist of replacing every character of a message with a different one.  Caesar is rumored to have shifted every letter in his military communications by a certain amount, so "hi" might become "gh", and his generals could simply reverse the shift because they knew about it, but spies that would intercept or sneak a peek at the messages presumably did not.  Even better, because the message CAN be deciphered using the cipher, it means it came from someone that knows the code, making it hard to forge commands to disrupt enemy organization.  

In English, "ROT-13" is an example of this, where you shift every letter 13 places later in the alphabet.  Any letter that run off one end come back on the other - shifting a Z one place gives you an A.  Because english has 26 letters, applying this AGAIN is the same as reversing it.  Which is why people in security might joke about how to make a message _really_ secure they'd not only apply ROT-13, but they'd apply it twice! (which leaves you with the original message, not secure at all!).  The reason they do this is not (just) that security people are lovably nerdy, but to make the point that if you have an encryption algorithm that can be broken, applying multiple times probably does not make your message any more secure.

Of course, the problem with a ROT-13-like cipher is that it is easily broken - each message is the same, so by looking for common patterns among enough messages you can probably identify words.  A three character string that appears really often?  Probably "the", which means I can at least determine where every "t", "h", and "e" are, which gives me more chances to guess more words and further break it.   It's basically the Wheel Of Fortune TV show for spies.

The most secure cipher is the "One Time Pad".  Here's an example: You make a random list of numbers.  You make exactly one copy of this, and give it to whomever you are trying to communicate with.  When you send a message, you shift the first letter by the first number in the list...and cross it off.  Second number by the second, and so forth.  When the receiver gets it, they can unshift each letter by the indicated number, also crossing it off.  They can read the message.  Anyone that intercepts the message will have no clue - there are no patterns.  "the" in one places might be "dgw", while "the" in another place is "ouu". Because you will use any collection of numbers like this just once (thus "one time"), you never will form patterns.  Because the numbers are random and only two copies exist, you can't go elsewhere to learn the answers.  One Time Pads (OTP) are fantastically secure - generally, you should focus on trying to steal/intercept the OTP key, figure out how the "random" numbers are selected (there are huge volumes about how to get truly random numbers - it turns out to be hard), turn the recipient, or otherwise find a way to get the message that doesn't involve actually code breaking.  (relevant xkcd: https://xkcd.com/536/ )

Computers don't have any built in way to do OTP.  They don't even have a way to make random numbers.  (For an example of how the basic JS randomizer isn't random, see: https://jonasnick.github.io/blog/2015/07/08/exploiting-csgojackpots-weak-rng/ - if you ever need a random number for security reasons, use a different algorithm than Math.random() in most ANY langauge)  

The weakness of OTP (other than the humans at either end) is that you have to get the collection of OTP data to the other person in the first place...and if you could securely get them data in the first place, why did you need a cipher?  And because any "pad" is only useful once, you have to give them a lot of them.  As such, OTPs are used on, for example, military submarines or with spies going out on deployment, where you can communicate with them safely BEFORE they leave, but want to be able to send/recieve secure messages and have them know they came from you.  

Computers don't have any built in way to do OTP.  They don't even have a way to make random numbers.  (For an example of how the basic JS randomizer isn't random, see: https://jonasnick.github.io/blog/2015/07/08/exploiting-csgojackpots-weak-rng/ - if you ever need a random number for security reasons, use a different algorithm than Math.random() in most ANY langauge)  

### Password Hashes

For our project (and anything similar), I mentioned that the token is NOT the user password.  

For simple token based systems, the process to initially save a password (i.e. registration or password change) should be:

* Service gets username and password from user
* Service chooses a random value (called a "salt") and adds it to the username/password in some way
* Service runs this collection through a secure one-way hashing algorithm (see below)
* Service applies the salt to the result in some consistent and reversible way (such as adding it to the start/end)
* This value (the password "hash") is saved along side the username

Notice: The service GETS the password, but _never_ saves it, even on password creation.  This is why, if you forget your password and get it "reset", you are given a new password, not told what the old one was - they don't know.  

When a user attempts a login, this is the process:

* Service gets username and password from user
* Services looks up the associated password hash for that user
* Service pulls the salt value for that specific hash from the value (each password can and usually will have different salt values)
* Service runs the username/password it got from the user through the above process, except:
    * It does not use a new salt value, but the one it got from the saved hash
    * It does not save anything
* If the result of processing the incoming username/password matches the saved value, that was the correct password

If you are ever in a place to create a login system, PLEASE do the following:

* Make sure you never save the password
* Send the password as few places as possible, even temporarily
* Use HTTPS, not HTTP
* Use a cryptographically secure hashing algorithm.  (Check online, and don't trust any discussion that is more than a year or two old)
* Make sure anything random is using a strong psuedo-random number generator (PRNG)
* Use a strong salt (128bit to 256bit is my current suggestion, but again, check with the security experts, of which I am not)
* Make sure you use all of these FULLY and PROPERLY - many of the recent breaches and cracks of password lists have come about because the coder tried to do the right thing, but messed up some small but significant point.  
* Validate your information.  There is a LOT of bad security advice out there, of which self-service password resets that are easily managed by a peek on social media are just one example.  (Relevant xkcd: https://xkcd.com/936/ )

#### What is a hashing algorithm

You can google for details and find the many, many applications for them, but the short version is that a hashing algorithm takes a value and transforms it in a repeatable way. One-way hashing algorithms are the most common and what we are interested in (where you can't get the original value from the result.  A (dumb) hashing algorithm would be to take a word, translate each of the letters into numbers, then uses the digitize() function you had in an exam to give you a number 0-9.  It is repeatable - the same word will give you the same result each time - and it is one-way: If I had '4', you couldn't say what my original word was.

#### Why Hashes?

The two main uses are for hash data structures (which objects are, in JS) and encryption.
In this case, we are specifically trying to achieve one thing:  Knowing the stored value for a user does NOT tell us how to login as them.
We neither know their actual password, and hopefully we don't know a different password that will generate the same result.
This is where "secure hashing algorithm" comes in.  Insecure hashing algorithms are still useful for data structures, but not encryption.
A secure hash algorithm requires a much larger amount of processing to determine what the original value could be than it does to convert a vlue into the hashed value.
Much larger.
Thus, even if you had the hashed value, you could not login as them.
Because the hashed value is saved, it's around a lot longer for someone nefarious to get to.
What's more, as users often reuse passwords on other sites, knowing their password could get you into those sites, so the impact of a breach is worse.

As computers get more powerful and people come up with new clever math, some algorithms previously considered "secure" are no longer considered so.
In fact, the industry keeps a list of not only major algorithms that are not "secure", but major algorithms that are _currently_ secure, but will not be in coming years as computer power continues to grow.

#### Why Salt values?

If the hash provides the security, why the salt value?  
Particularly if it's right there - anyone who can get the hashed password HAS the salt.
Because of the salt, the same value (without a salt) will give a different hash value.  
People got clever with that whole "it takes a lot of computing power" thing, and said "Ah, but it only takes that long to reverse.  I can create a hash quickly.  Sure, running through all possible passwords would take forever, but I can, say, the top 1000 most common passwords and create a list of the resulting hash values.  
Then if I (or anyone I give this table of results to) ever get a chance to see the hashed values, we can easily see if we have a matching one, and if so we know that password.  Heck, I can even ask my evil friends to join in, and I bet we could cover tens or hundreds of thousands of values! (_evil cackle_)".
This attack (known as a "rainbow table") has problems with salts.  Sure, given a hashed value with salt, they can easily determine the salt, but because they didn't include the salt when they generated the original value, their rainbow table is useless.  Creating such a table to include all possible salt values is...time-consuming. 



