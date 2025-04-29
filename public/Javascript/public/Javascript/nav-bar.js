document.addEventListener('DOMContentLoaded', function() {
  // Buttons
  const carbonCalculatorButton = document.getElementById('carbonCalculator');
  const homePageButton = document.getElementById('homePage');
  const learnMoreButton = document.getElementById('learnMore');
  const bookingsButton = document.getElementById('bookingsButton');
  const loginButton = document.getElementById('loginButton');

  // Page checks for correct redirection
  const currentPage = window.location.pathname;

  // Check if we are already on the Home Page or Learn More Page
  const isHomePage = currentPage.includes('home'); 
  const isLearnMorePage = currentPage.includes('learn'); 

  // Home Page Redirection Button
  if (homePageButton) {
    homePageButton.addEventListener('click', function() {
      if (!isHomePage) {
        window.location.href = 'http://localhost:3000/Web-Pages/home/index.html'; // Redirect to Home
      } else {
        console.log("Already on the Home Page!");
      }
    });
  }

  // Learn More Page Redirection Button
  if (learnMoreButton) {
    learnMoreButton.addEventListener('click', function() {
      if (!isLearnMorePage) {
        window.location.href = 'http://localhost:3000/Web-Pages/learn/index.html'; // Redirect to Learn More
      } else {
        console.log("Already on the Learn More Page!");
      }
    });
  }

  // Carbon Calculator Page Redirection Button
  if (carbonCalculatorButton) {
    carbonCalculatorButton.addEventListener('click', function() {
      window.location.href = 'http://localhost:3000/Web-Pages/Carbon-Calculator/index.html'; // Redirect to Carbon Calculator
    });
  } else {
    console.log("Carbon calculator button not found!");
  }

  // Bookings Page Redirection Button
  if (bookingsButton) {
    bookingsButton.addEventListener('click', function() {
      window.location.href = 'http://localhost:3000/Web-Pages/bookings/index.html'; // Redirect to Bookings Page
    });
  } else {
    console.log("Bookings button not found!");
  }

  // Login Page Redirection Button
  if (loginButton) {
    loginButton.addEventListener('click', function() {
      window.location.href = 'http://localhost:3000/Web-Pages/login/index.html'; // Redirect to Login Page
    });
  } else {
    console.log("Login button not found!");
  }
});
