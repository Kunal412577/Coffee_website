document.addEventListener("DOMContentLoaded", function () {
    // Get the "Sign Up" link by its ID
    const signUpLink = document.getElementById("signuplink");

    // Add an event listener to handle the click event
    if (signUpLink) {  // Check if signUpLink exists
        signUpLink.addEventListener("click", function (event) {
            // Prevent the default action (which is no action in this case)
            event.preventDefault();

            // Redirect to the sign-up page
            window.location.href = "sign_up.html"; // Replace with the actual path to your sign-up page
        });
    }

    // Add event listener to the login link
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {  // Check if loginLink exists
        loginLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            window.location.href = 'login_page.html'; // Redirect to the login page
        });
    }
});
