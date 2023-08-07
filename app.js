function askUserName() {
    const name = prompt("Please enter your name:");
    return name;
  }
  
  function askUserMark(name) {
    const mark = prompt(`Welcome, ${name}! Please enter your mark:`);
    return mark;
  }
  
  function calculateGrade(mark) {
    const parsedMark = parseInt(mark);
    if (isNaN(parsedMark)) {
      return "Invalid input";
    }
  
    if (parsedMark < 0) {
      return "Invalid test case #1: Any number lower than 0 is not allowed.";
    } else if (parsedMark <= 49) {
      return "F";
    } else if (parsedMark <= 60) {
      return "D";
    } else if (parsedMark <= 70) {
      return "C";
    } else if (parsedMark <= 80) {
      return "B";
    } else if (parsedMark <= 90) {
      return "A";
    } else if (parsedMark <= 100) {
      return "A+";
    } else {
      return "Invalid test case #2: Any number above 100 is not allowed.";
    }
  }
  
  function sendEmail(name, result) {
    // Replace these with your Email.js credentials
    const serviceID = 'YOUR_EMAILJS_SERVICE_ID';
    const templateID = 'YOUR_EMAILJS_TEMPLATE_ID';
    const userID = 'YOUR_EMAILJS_USER_ID';
  
    // Send the email using Email.js
    emailjs.init(userID);
    emailjs.send(serviceID, templateID, {
      to_name: name,
      result: result
    })
    .then(function(response) {
      console.log("Email sent successfully:", response);
    }, function(error) {
      console.log("Email sending failed:", error);
    });
  }
  
  function displayResult(name, mark, grade) {
    const resultRow = document.getElementById("resultRow");
    resultRow.innerHTML = `
      <td>${name}</td>
      <td>${mark}</td>
      <td>${grade}</td>
    `;
  
    if (grade !== "Invalid input" && grade !== "Invalid test case #1: Any number lower than 0 is not allowed." && grade !== "Invalid test case #2: Any number above 100 is not allowed.") {
      if (grade === "F") {
        sendEmail(name, "You are failed");
        document.getElementById("welcomeMsg").innerText = "Oops! You are failed.";
      } else {
        sendEmail(name, "You are pass");
        document.getElementById("welcomeMsg").innerText = "Congratulations! You are pass.";
      }
    }
  }
  
  window.onload = function () {
    const userName = askUserName();
    if (userName) {
      const userMark = askUserMark(userName);
      if (userMark) {
        const grade = calculateGrade(userMark);
        displayResult(userName, userMark, grade);
      }
    }
  };
  