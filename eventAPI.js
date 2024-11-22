const eventAPI = (() => {
    const eventURL = "http://localhost:3000/events";
  
    //get all the events
    async function getEvents() {
      const response = await fetch(eventURL);
      const events = await response.json();
      return events;
    }
  
    //post 
    async function postEvent(newEvent) {
      const response = await fetch(eventURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
  
      const event = response.json();
      return event;
    }
  
    //delete
    async function deleteEvent(id) {
      const response = await fetch(`${eventURL}/${id}`, {
        method: "DELETE",
      });
  
      const deleteEvent = await response.json();
      return id;
    }
  
    // edit event
    async function editEvent(id, editEvent) {
      const response = await fetch(`${eventURL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editEvent),
      });
  
      const updatedEvent = await response.json();
      return updatedEvent;
    }
  
  
    return {
      getEvents,
      postEvent,
      deleteEvent,
      editEvent
    }
  })()
  