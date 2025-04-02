```
Step 1: Setup the React Project

Open a Terminal and Run:


npx create-react-app react-calendar-app
cd react-calendar-app
npm install react-big-calendar date-fns
npm start


The default React app should be running on localhost:3000.





Step 2: Clean Up the Project

Open src/App.js and remove all code, replacing it with:


import React from "react";

function App() {
  return <h1> React Calendar</h1>;
}

export default App;


 Check localhost → Should display " React Calendar".





Step 3: Install & Import Calendar Dependencies

Ensure react-big-calendar and date-fns are installed (already done in Step 1).

Modify src/App.js and add the imports:


import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";





Step 4: Setup Date Localizer

Under the imports, add:


const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


 Prepares date localization for react-big-calendar.





Step 5: Add a Basic Calendar

Modify App.js to return a calendar component:


function App() {
  return (
    <div style={{ height: "80vh", padding: "20px" }}>
      <h1> React Calendar</h1>
      <Calendar
        localizer={localizer}
        events={[]} // Empty events initially
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
}


 Check localhost → Should display a blank calendar.





Step 6: Add State for Events

Modify App.js to track events:


const [myEvents, setMyEvents] = useState([]);


 Now we can store events dynamically.





Step 7: Enable Clicking to Add Events

Add a function to handle date selection:


const handleSelectSlot = ({ start }) => {
  const title = window.prompt("Enter event title:");
  if (title) {
    setMyEvents([...myEvents, { title, start, end: start }]);
  }
};


 Clicking a date now opens a prompt to enter an event title.





Step 8: Update the Calendar Component

Modify <Calendar> to enable event selection:


<Calendar
  localizer={localizer}
  events={myEvents}
  startAccessor="start"
  endAccessor="end"
  selectable
  onSelectSlot={handleSelectSlot}
  style={{ height: "100%" }}
/>


 Now, clicking on a date adds an event to the calendar.





Step 9: Add Navigation (Today/Next/Back)

Add state to track the current date:


const [currentDate, setCurrentDate] = useState(new Date());

Add function to handle navigation:

const handleNavigate = (date) => {
  setCurrentDate(date);
};


Modify <Calendar> to include navigation:


<Calendar
  localizer={localizer}
  events={myEvents}
  startAccessor="start"
  endAccessor="end"
  selectable
  onSelectSlot={handleSelectSlot}
  date={currentDate} // Track current date
  onNavigate={handleNavigate} // Enable navigation
  style={{ height: "100%" }}
/>


 Now, "Today", "Next", and "Back" buttons work.





Step 10: Enable View Switching

Add state to track the current view:


const [currentView, setCurrentView] = useState("month");


Add function to handle view switching:


const handleViewChange = (view) => {
  setCurrentView(view);
};


Modify <Calendar> to support different views:


<Calendar
  localizer={localizer}
  events={myEvents}
  startAccessor="start"
  endAccessor="end"
  selectable
  onSelectSlot={handleSelectSlot}
  date={currentDate}
  onNavigate={handleNavigate}
  view={currentView} // Track view state
  onView={handleViewChange} // Enable view switching
  views={{ month: true, week: true, day: true, agenda: true }} // Enable all views
  style={{ height: "100%" }}
/>


 Now the Month, Week, Day, and Agenda buttons work.





Final Code (Full App.js)
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

function App() {
  const [myEvents, setMyEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");

  // Handle navigation (Today, Next, Back buttons)
  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  // Handle view switching (Month, Week, Day, Agenda)
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Handle clicking on a date to add an event
  const handleSelectSlot = ({ start }) => {
    const title = window.prompt("Enter event title:");
    if (title) {
      setMyEvents([...myEvents, { title, start, end: start }]);
    }
  };

  return (
    <div style={{ height: "80vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}> React Calendar</h1>

      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        date={currentDate}
        onNavigate={handleNavigate}
        view={currentView}
        onView={handleViewChange}
        views={{ month: true, week: true, day: true, agenda: true }}
        style={{ height: "100%" }}
      />
    </div>
  );
}

export default App;


 Summary: What We Built
- Functional Calendar with Event Creation
- Click to Add Events via a Simple Prompt
- Navigation (Today, Next, Back)
- View Switching (Month, Week, Day, Agenda)
```
