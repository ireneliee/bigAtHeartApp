<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Big at Heart Volunteer Portal</title>
    <!-- Include Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <style>

      .body {
      }

      .navbar-brand {
        font-size: 1.5rem;
      }

      .company-name {
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
        margin-top: 10px;
      }

      .navbar-nav {
        margin: auto;
      }

      .navbar-nav .nav-item {
        margin: 0 12px;
      }

      .container-fluid {
        margin: 2rem;
      }
    </style>
  </head>
  <body>
    <div class="form-container container-fluid" id = "volunteerSignUpFormSection">
      <h1>Volunteer Sign Up</h1>
      <form id = "volunteerSignUpForm">
        <div class="form-group">
          <label for = "volunteerSignUpFirstName">First name</label>
          <input type = "text" class="form-control" id = "volunteerSignUpFirstName" required/>
        </div>
        <div class="form-group">
          <label for = "volunteerSignUpLastName">Last name</label>
          <input type = "text" class="form-control" id = "volunteerSignUpLastName" required/>
        </div>
        <div class="form-group">
          <label for = "volunteerSignUpEmail">Email</label>
          <input type = "text" class="form-control" id = "volunteerSignUpEmail" readonly/>
        </div>
        <div class="form-group">
          <label for = "volunteerSignUpAge">Age</label>
          <input type = "text" class="form-control" id = "volunteerSignUpAge" required/>
        </div>
        <div class="form-group">
          <label for = "volunteerSignUpAddress">Address</label>
          <input type = "text" class="form-control" id = "volunteerSignUpAddress" required/>
        </div>
        <div class="form-group">
          <label for = "volunteerSignUpSkills">Skills</label>
          <input type = "text" class="form-control" id = "volunteerSignUpSkills" required/>
        </div>
        <div class="form-group">
          <label for = "volunteerSignUpInterest" >Interest</label>
          <div id="interestsContainer" class = "form-check" ></div>
        </div>
        <button type="submit" class="btn btn-primary">Sign up</button>
      </form>    
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script>
      // populating the email
      function getUserEmail() {
            google.script.run.withSuccessHandler(function(email) {
              document.getElementById('volunteerSignUpEmail').value = email;
            }).getUserEmail();
        };

      window.onload = getUserEmail;

      var selectElement = document.getElementById("volunteerSignUpInterest");

      google.script.run.withSuccessHandler(function(interests) {
        var interestsContainer = document.getElementById("interestsContainer");
        interests.forEach(function(option) {
            var checkboxContainer = document.createElement("div");
            checkboxContainer.classList.add("form-check");

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("form-check-input");
            checkbox.name = "interest";
            checkbox.value = option;
            checkbox.id = "interest_" + option;

            var label = document.createElement("label");
            label.classList.add("form-check-label");
            label.htmlFor = "interest_" + option;
            label.appendChild(document.createTextNode(option));

            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(label);
            interestsContainer.appendChild(checkboxContainer);
          });
        }).retrieveAllVolunteerInterests();

      function collectSelectedValues() {
          var selectedValues = "";
          var checkboxes = document.querySelectorAll("input[name=interest]");
          checkboxes.forEach(function(checkbox) {
              if (checkbox.checked) {
                  selectedValues += ", " + checkbox.value;
              }
          });
          if (selectedValues.length == 0) {
            return selectedValues;
          }
          return selectedValues.substring(2, selectedValues.length);
      }


      $(document).ready(function() {
          // handle form submission
            $('#volunteerSignUpForm').submit(function(event) {
                event.preventDefault(); // Prevent the default form submission

                // Get form data
                var formData = {
                    email: $('#volunteerSignUpEmail').val(),
                    firstName: $('#volunteerSignUpFirstName').val(),
                    lastName: $('#volunteerSignUpLastName').val(),
                    age: $('#volunteerSignUpAge').val(),
                    address: $('#volunteerSignUpAddress').val(),
                    interest: collectSelectedValues(),
                    skills: $('#volunteerSignUpSkills').val()
                };

                // Call the Google Apps Script function to handle form submission
                google.script.run
                    .withSuccessHandler(function(response) {
                        // Handle successful response if needed
                        alert('Form submitted successfully:', response);
                        // Redirect the user to another page
                        google.script.run.withSuccessHandler(function(html) {
                          document.open();
                          document.write(html);
                          document.close();
                      }).loadLandingPage();
                    })
                    .withFailureHandler(function(error) {
                        // Optionally, display an error message to the user
                        alert('An error occurred while submitting the form. Please try again later.');
                    })
                    .volunteerSignUp(formData);
            });
        });
      
    </script>
    
  </body>
</html>