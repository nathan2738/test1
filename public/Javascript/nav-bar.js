document.addEventListener('DOMContentLoaded', function() {
  // Get all button elements by ID
  const carbonCalculatorButton = document.getElementById('carbonCalculator');
  const homePageButton = document.getElementById('homePage');
  const learnMoreButton = document.getElementById('learnMore');
  const bookingsButton = document.getElementById('bookingsButton');
  const loginButton = document.getElementById('loginButton');

  // Check if we are on the Home page
  const isHomePage = window.location.pathname.includes('Home'); // You can change 'Home' based on your actual path

  // Check if we are on the Learn More page
  const isLearnMorePage = window.location.pathname.includes('Learn-More'); // You can change 'Learn-More' based on your actual path

  // **Home Page Button** - Only add event listener if not on the Home page
  if (!isHomePage && homePageButton) {
    homePageButton.addEventListener('click', function() {
      window.location.href = 'http://127.0.0.2:5500/public/Web-Pages/Home-Page/index.html'; // Home page URL
    });
  } else {
    console.log("Home Page button not added or Home page active!");
  }

  // **Learn More Button** - Only add event listener if not on the Learn More page
  if (!isLearnMorePage && learnMoreButton) {
    learnMoreButton.addEventListener('click', function() {
      window.location.href = 'http://127.0.0.2:5500/public/Web-Pages/Learn-More/index.html'; // Learn More page URL
    });
  } else {
    console.log("Learn More button not added or Learn More page active!");
  }

  // **Carbon Calculator Button**
  if (carbonCalculatorButton) {
    carbonCalculatorButton.addEventListener('click', function() {
      window.location.href = 'http://127.0.0.2:5500/public/Web-Pages/Carbon-Calculator/index.html';
    });
  } else {
    console.log("Carbon calculator button not found!");
  }

  // **Bookings Button**
  if (bookingsButton) {
    bookingsButton.addEventListener('click', function() {
      window.location.href = 'http://127.0.0.2:5500/public/Web-Pages/Bookings/index.html';
    });
  } else {
    console.log("Bookings button not found!");
  }

  // **Login Button**
  if (loginButton) {
    loginButton.addEventListener('click', function() {
      window.location.href = 'http://127.0.0.2:5500/public/Web-Pages/Login/index.html';
    });
  } else {
    console.log("Login button not found!");
  }
});
