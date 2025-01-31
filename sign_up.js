// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get the login link by its ID
    const loginlink = document.getElementById('loginlink');
    
    // Check if the login link exists before adding the event listener
    if (loginlink) {
        // Add a click event listener to the login link
        loginlink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior (page reload)
            
            // Redirect to the login page
            window.location.href = 'login_page.html';  // Replace 'login_page.html' with your actual login page URL
        });
    }
});
