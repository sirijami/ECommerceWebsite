# Getting Started - Git Setup and Tips for your final projects

Because a clean PR is part of the grade of the final project, you want to make sure you have a clean one.
Plus, there are a few tricks to getting this all together in the right order. 

First, clone this repository (make sure you are where you want to create the project directory)

`git clone https://github.com/seainfo6250/final-project-YOURNAME`

Next, run create-react-app INSIDE that directory (into a temporary dummy directory):

`cd final-project-YOURNAME`
`create-react-app dummy`

That's because create-react-app won't let you install into an existing directory.

Now let's get rid of the dummy directory (we are still in the final-project-YOURNAME directory):

`mv dummy/* .`
`mv dummy/.gitignore .`
`rmdir dummy`   

(The idea is to move all the contents of the created dummy directory into your main directory)

Now all we need to do is a little starting cleanup:

* `git add .`  - Add the files in the current directory (including those in sub-directories) to the repo.  They gave us a good starting .gitignore, so we don't have to worry about node_modules or the like
* `git status` - Make sure it looks clean.  If not, the time to clean it up is BEFORE you commit
* `git commit -m"added empty app"`

Now the code project exists as a local git repo and the current code is being tracked.

A few more clean-up and preparation steps before we get really started:

`git mv README.md CRA-README.md` - Create React App (CRA) gave us a useful README, but we want to have our own, so we'll move it to another name

Now create a README.md file - For now you can just put in a single sentence, you can edit later

Edit the package.json file to have the line:

`author: "YOUR NAME <YOUR EMAIL>"` - make sure to have the angle brackets (< >), they let everyone know the part inside is an email address

and also change the 'name' entry to something better than dummy.  You can choose what, but it should be all lowercase letters or hyphens.

Now let's put these changes into the repo too:

`git add README.md` - you created a new one

Now commit these changes to the repo:

* `git commit -m"base customization"`
* `git status` - this should show that you are clean

Now you can work!  I recommend doing an add/commit cycle everytime:
* You add something and the code is working
* You are about to try something experimental and might want to get back to where you are right now

Make sure your commit messages talk about what you did.  Some examples of decent commit messages:

* GOOD: `git commit -m"Added user login"`
* GOOD: `git commit -m"Fix: No longer blows up if service is offline"`
* GOOD: `git commit -m"cleaned up console messages"`
* BAD: `git commit -m""`
* BAD: `git commit -m"final project"`
* BAD: `git commit -m"fixed bugs"`

You want these commit messages because if you ever need to go back to a certain point, you want to know what that point was.

## Periodic backups!

You are going to do a lot of coding, and a local repo isn't enough to protect you if your laptop gets damaged.

You can't merge into the origin master branch without approval, but you can save other branches:

`git checkout -b starting`

(make changes)

(do `git add` and `git commit` as you like)

`git push origin starting` - this copies your local 'starting' branch to the remote repo.  You can do this as often as you like, with as many branches as you want

## Getting your branch work into your master branch

working on another branch is fine, but at some point you want your local master branch to show your work.  

* `git checkout master`
* `git merge BRANCHNAME` - this pulls changes from the local named branch into your local master branch

## Getting any updates on remote to your repo

Generically:

To get remote changes into your current branch:
* `git pull origin master` - updates your current branch with anything from remote.  You might get prompted to put in a message if there was a merge, but that shouldn't be needed.

But I recommend doing it in two steps:

* `git checkout master`
* `git pull` - brings changes into master.  Should be the same as `git pull origin master` as your local master branch considers the master branch of the origin repo to be its 'upstream'
* `git checkout OTHERBRANCH`
* `git merge master` - brings master (that you just updated) into this the branch.  You might get prompted to put in a message, this is like a commit message for the merge.

I recommend this so that there is always a simple relationship - master is your core, its upstream is the remote master, while your other local branches all treat the local master as the upstream.  

## Final submission

Per the criteria you need to submit a pull request from a branch called 'final-project':

Assuming you are in a branch with all your up-to-date code (I recommend master, kept up-to-date as above)
* `git status` - make sure your code is all added and committed as needed
* `git checkout -b final-project`
* `git push origin final-project`

Then go to github and create the pull request into master

## Something went wrong!

Okay - If that's during setup, you can just delete everything and start over.
If it's later, you want to be more careful, but in a real emergency you can just copy everything somewhere else, create a new repo clone as above, and copy your work into it, adding and committing as needed.

Less drastically, you want to figure out where your code is and how to get it into the right place, but you don't need to panic because you have the above fallback.  If you've been pushing to remote branches all along, that's also a solid backup to build from.  Feel free to reach out to see if I can help.

