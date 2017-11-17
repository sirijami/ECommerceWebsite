# Common Mistakes and Issues

## When I click on a link that is supposed to update state, it does not.  (Or it actually undoes all my choices so far)

If you're using an actual `<a></a>` link make sure you are preventing default on the click event (which is passed to the click handler).  Otherwise clicking the link WILL call your code to change state, but it's irrelevant because the page also reloads and starts from the beginning - your state change is either immediately replaced or is canceled before it even gets to finish running.

## I keep getting a React error about something being null or undefined

That's fairly vague, but this often comes up if a promise has an error that is not caught.  That means you may have React trying to rerender parts of the page that can no longer be calculated.  Make sure you are checking your browser console for errors, and make sure that you are catching all errors and making sure you know of them.  
console.log or console.warn on service call errors is fine during development, and are pretty much the only things allowed to go to the console in the final product, but you will still want to inform the user that something failed and tell them what to do, even if it is "try again" or "refresh the page and try again" - but in friendlier language.

