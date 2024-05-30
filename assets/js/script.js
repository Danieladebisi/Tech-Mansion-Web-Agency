'use strict';



/**
 * add Event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header & back top btn show when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

// Lets talk
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const mailgunUrl = `https://api.mailgun.net/v3/$https://app.mailgun.com/app/sending/domains/sandboxd58273dda43c4ef985f3d545094636c0.mailgun.org/messages`;  // Replace with your Mailgun domain
  const mailgunApiKey = `Basic ${btoa(`$7ea1a1b954c970f422a204984614167e-f68a26c9-438ab73a:`)}`; // Replace with your API key (encoded)

  const formData = {
    from: `"${name}" <${email}>`,
    to: 'your_recipient_email@example.com',  // Replace with your recipient email
    subject: 'Contact Form Submission from Tech Mansion',
    text: message
  };

  try {
    const response = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        'Authorization': mailgunApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      successMessage.textContent = 'Your message has been sent! We will respond to you shortly. Please check your email.';
      successMessage.style.color = 'green';
      contactForm.reset(); // Clear the form after successful submission
    } else {
      successMessage.textContent = 'Error sending message. Please try again later.';
      successMessage.style.color = 'red';
    }
  } catch (error) {
    console.error('Error:', error);
    successMessage.textContent = 'Error sending message. Please try again later.';
    successMessage.style.color = 'red';
  }
});




// Calpage Script :::::............................
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calculator-form");
  const resultContainer = document.getElementById("calculator-result");

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Reset previous result
      resultContainer.innerHTML = "";

      // Collect form data
      const formData = new FormData(form);
      const websiteType = formData.get("website-type");
      const features = formData.getAll("features");
      const pages = parseInt(formData.get("pages"));
      const deadline = formData.get("deadline");
      const email = formData.get("email");

      // Calculate total cost
      let baseCost = 0;
      switch (websiteType) {
          case "1":
              baseCost = 500; // Basic Website
              break;
          case "2":
              baseCost = 1000; // Business Website
              break;
          case "3":
              baseCost = 2000; // E-commerce Website
              break;
          default:
              baseCost = 0;
      }

      // Calculate cost for additional features
      let featuresCost = 0;
      if (features.includes("responsive")) {
          featuresCost += 200;
      }
      if (features.includes("cms")) {
          featuresCost += 300;
      }
      if (features.includes("seo")) {
          featuresCost += 500;
      }
      if (features.includes("social-media")) {
          featuresCost += 300;
      }

      // Calculate total cost
      const totalCost = baseCost + featuresCost * pages;

      // Display result
      const resultHTML = `
          <h2 class="calculator-result-title">Estimated Cost</h2>
          <p><strong>Base Cost:</strong> $${baseCost}</p>
          <p><strong>Additional Features Cost:</strong> $${featuresCost}</p>
          <p><strong>Total Pages:</strong> ${pages}</p>
          <p><strong>Deadline:</strong> ${deadline}</p>
          <p><strong>Email Address:</strong> ${email}</p>
          <h3><strong>Total Cost:</strong> $${totalCost}</h3>
      `;
      resultContainer.innerHTML = resultHTML;
  });
});

// JavaScript logic for handling form submission
document.querySelector('.calculator').addEventListener('submit', function(event) {
  event.preventDefault();

  // Collect form data
  const formData = new FormData(event.target);

  // Convert formData to JSON
  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  // Send data to backend or Google Sheets API using fetch or XMLHttpRequest
  fetch('/backend/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })
  .then(response => {
    if (response.ok) {
      // Show success message to the user
    } else {
      // Handle error
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
