import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


function App() {

  const [myEvents, setMyEvents] = useState([]);

  const handleSelectSlot = ({ start }) => {
    const title = window.prompt("Enter event title:");
    if (title) {
      setMyEvents([...myEvents, { title, start, end: start }]);
    }
  };

  // today, back, next buttons
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  // daily, weekly, mothly views
  const [currentView, setCurrentView] = useState("month");

  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  

  
  
  return (
    <div style={{ height: "80vh", padding: "20px" }}>
      <h1> React Calendar</h1>
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



    </div>
  );
}


export default App;