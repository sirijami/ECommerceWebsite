# Final Project Overview

We will be writing an inventory management system.

What is that?  Good question - and you're going to put your own spin on it.

At the core level, this is a web-based single page application that:

* allows users to register
* allows users to login/logout
* shows a listing of items, allowing the user to filter or sort that list
* allows users to add/edit/delete items to/from this listing
* Items have a 'status' (named whatever) that is displayed
* Items change status based on user actions rather than being set directly
(See 'App Features' in grading criteria for a full list)

Which is all very vague.  That's because this is all very generic functionality (CRUD)
Along with writing the front-end code, you will be choosing a specific use for this.

Examples (please be creative!):

* A book listing for a small library, where books can be Shelved, Checked Out, Returned, or Lost.   Books (the items) would have a status that matches those, and buttons that would change the state from one to the other.  (i.e. the title of a book can be directly edited, but status is only changed by clicking a button/link)
* An expectant mother listing for a small hospital, where mothers can be Expecting, In Delivery, In Recovery, or At Home
* An inventory tracker for a small souvenir stand, where 'items' represent a collection of that kind.  Each listing could have a number-in-stock that can be bumped up or down, and at 0 the items stop being 'In-Stock' and become 'Out-of-Stock', and from there can be Ordered (and given a number), and then In Stock (with the number-in-stock adjusted)

