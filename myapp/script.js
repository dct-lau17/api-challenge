'use strict';

const countriesContainer = document.getElementById('myData');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');

///////////////////////////////////////

// Clicking "Start" - Function to display data on page;
const rederData = function (data) {
  // Based on what we get in the console, we can access the objects
  // and display the relevant data on page;
  for (let i = 0; i < data.length; i++) {
    // Creat a new element on page and append all relevant data;
    let divData = document.createElement('divData');

    divData.innerHTML = `timestamp: ${data[i].timeStamp}${`<br>`}action: ${
      data[i].action
    }${`<br>`}file: ${data[i].file}${`<br>`}folder: ${
      data[i].folder
    }${`<br>`}${`<br>`}`;
    // Appen each element to the main;
    countriesContainer.appendChild(divData);
  }
};

// start button can only be clicked after 6 min
// 1. we click the start button - onClick we call stopDataAPI();
// 2. we set some kind of variable to false
// 3. based on that variable we can't run function again unless it is set to true again

// Stop button needs to be hidden for 6 min;
// Write a function which would be called as soon as "start button is clicked";
// It will first hide an element for 6 min and then make it visible (after 6 min);
const stopButtonBehaviour = function () {
  console.warn('STOP button is hidden!');
  // alert('STOP button is hidden and will become visible after 6 min!');
  stopButton.style.display = 'none';

  setTimeout(function () {
    console.warn('6 minutes have passed');
    stopButton.style.display = 'block';
  }, 3000);
};

// function for disabling start button;
const disableStartButton = function () {
  document.getElementById('start-button').disabled = true;
};
// function for enabling start button;
const enableStartButton = function () {
  document.getElementById('start-button').disabled = false;
};

// Clicking "Start" will initiate the procedure by calling localhost:3030 with some parameter
const startDataAPI = function () {
  disableStartButton();
  const request = new XMLHttpRequest();
  request.open('GET', `http://localhost:3030/api/start`);
  request.send();

  // Ask Dan for some sort of confirmation that request has been received;
  console.warn(request.responseText);
  console.warn('startDataAPI initiated');

  // Can add conditional statemnt if there is an error and try to do it again;
  if (request.responseText === 'error') startDataAPI();

  // Calling a function to hide the "Stop" button and then to show it after 6 min;
  stopButtonBehaviour();
};

// Clicking "Stop" will stop the procedure by calling localhost:3030 with some parameter
const stopDataAPI = function () {
  enableStartButton(); // Enabling the start button first;

  const requestDan = new XMLHttpRequest();
  const requestHazel = new XMLHttpRequest();

  // Making first call to Dan; (http://localhost:3030/api/stop)
  requestDan.open('GET', `http://localhost:3030/api/stop`);
  requestDan.send();
  // Loggin what the response looks like;
  console.warn(
    `request has been made to http://localhost:3030/api/stop`,
    requestDan.responseText
  );

  requestHazel.open('GET', `http://localhost:3031/logs`);
  requestHazel.send();
  // Loggin what the response looks like;
  console.warn(
    `request has been made to http://localhost:3031/logs`,
    requestHazel.responseText
  );

  requestHazel.addEventListener('load', function () {
    console.log(this.responseText);

    const data = JSON.parse(this.responseText); // destructuring [];

    // Have a look at how data is being displayed in the console;
    console.log(data);

    // Call function to display function on page;
    rederData(data);
  });
};
