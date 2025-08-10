const CLIENT_ID = '271439530228-dmumnaoj2ar5d0e527h9ho9eqqn63noc.apps.googleusercontent.com'; // Replace with your Client ID
const API_KEY = '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';     // Replace with your API Key
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let auth2;

function signIn() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    scope: SCOPES,
  }).then(() => {
    auth2 = gapi.auth2.getAuthInstance();
    if (auth2.isSignedIn.get()) {
      loadAppointmentForm();
    } else {
      auth2.signIn().then(loadAppointmentForm);
    }
  });
}

function loadAppointmentForm() {
  document.getElementById('signin-button').style.display = 'none';
  document.getElementById('appointment-form').style.display = 'block';
  
  document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const appointmentTime = document.getElementById('appointmentTime').value;
    createEvent(appointmentTime);
  });
}

function createEvent(appointmentTime) {
  const event = {
    summary: 'Appointment',
    location: 'Online',
    description: 'Google Calendar Appointment',
    start: {
      dateTime: appointmentTime,
      timeZone: 'America/New_York',
    },
    end: {
      dateTime: new Date(new Date(appointmentTime).getTime() + 60 * 60 * 1000), // 1-hour event
      timeZone: 'America/New_York',
    },
  };

  gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  }).then((response) => {
    alert('Appointment booked successfully!');
  }, (error) => {
    alert('Error booking appointment: ' + error.message);
  });
}
