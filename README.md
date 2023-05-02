firebase login
firebase init
firebase deploy

For Error "Uncaught (in promise) TypeError: branch is not a function"
solution:
add arrow function to the yup then and otherwise:
https://stackoverflow.com/questions/75553752/why-is-yup-conditional-validation-causing-branch-is-not-a-function-at-condition
