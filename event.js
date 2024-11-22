let isEditMode = false; // check if edit or add new event
let editingEventId = null;


//create event
function createEvent(event) {
  const tbody = document.getElementById("table-body");
  const tr = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = event.eventName;

  const startDateCell = document.createElement("td");
  startDateCell.textContent = event.startDate;

  const endDateCell = document.createElement("td");
  endDateCell.textContent = event.endDate;

  // Create cell for action buttons
  const actionCell = document.createElement("td");

  const deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  //   const saveButton = document.createElement("button");
  //   saveButton.textContent = "Save";
  //   const cancelButton = document.createElement("button");
  //   cancelButton.textContent = "Cancel";

  const formEle = document.getElementById("addEventForm");


  //delete event
  deletebtn.addEventListener("click", async () => {
    const deleteEvent = await eventAPI.deleteEvent(event.id);
    event = deleteEvent;
    tr.remove();
  });


  //edit event
  editBtn.addEventListener("click", () => {
    // deletebtn.remove();
    // editBtn.remove();
    isEditMode = true; // edit
    editingEventId = event.id;
    tr.style.display = "none";
    formEle.style.display = "block";
    const inputName = document.getElementById("inputName");
    const inputStartDate = document.getElementById("inputStartDate");
    const inputEndDate = document.getElementById("inputEndDate");

    inputName.value = event.eventName;
    inputStartDate.value = event.startDate;
    inputEndDate.value = event.endDate;

    const confirmBtn = document.getElementById("confirmBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    // confirmBtn.replaceWith(confirmBtn.cloneNode(true));
    // cancelBtn.replaceWith(cancelBtn.cloneNode(true));

    // const newConfirmBtn = document.getElementById("confirmBtn");
    // const newCancelBtn = document.getElementById("cancelBtn");
    confirmBtn.textContent = "Save";

    //save event
    confirmBtn.onclick = async (e) => {
      e.preventDefault();
      
      if(isEditMode) {
        try {
            const updatedEvent = await eventAPI.editEvent(event.id, {
              eventName: inputName.value,
              startDate: inputStartDate.value,
              endDate: inputEndDate.value,
            });
    
            // Update table row with new values
            nameCell.textContent = updatedEvent.eventName;
            startDateCell.textContent = updatedEvent.startDate;
            endDateCell.textContent = updatedEvent.endDate;
    
            tr.style.display = "";
            formEle.style.display = "none";
          } catch (error) {
            console.error("Error updating event:", error);
            // alert("Failed to update event. Please try again.");
          }
        };
      }
      
      //cancel edit
    cancelBtn.onclick = (e) => {
      e.preventDefault();
      tr.style.display = "";
      formEle.style.display = "none";
    };

    // tr.append(saveButton, cancelButton);
  });

  actionCell.append(editBtn, deletebtn);
  tr.append(nameCell, startDateCell, endDateCell, actionCell);
  tbody.appendChild(tr);
  return tr;
}


//show all events on webpages
function renderEvents(events) {
  events.forEach((event) => {
    createEvent(event);
  });
}

//handle Add Event Button
function handleAddBtn() {
  const subButton = document.getElementById("addBtn");
  const formEle = document.getElementById("addEventForm");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  const inputName = document.getElementById("inputName");
  const inputStartDate = document.getElementById("inputStartDate");
  const inputEndDate = document.getElementById("inputEndDate");

  subButton.addEventListener("click", (e) => {
    e.preventDefault();
    isEditMode = false; // add new event
    editingEventId = null;
    confirmBtn.textContent = "Confirm Add";
    formEle.style.display = "block";
    inputName.value = "";
    inputStartDate.value = "";
    inputEndDate.value = "";
  });
  confirmBtn.onclick = async (e) => {
    e.preventDefault();

    if (!inputName.value || !inputStartDate.value || !inputEndDate.value) {
        alert("Please fill out all fields.");
        return;
    }

    if(isEditMode === false){
        try {
            const newEvent = await eventAPI.postEvent({
              eventName: inputName.value,
              startDate: inputStartDate.value,
              endDate: inputEndDate.value,
            });
      
            const tbody = document.getElementById("table-body");
            const newEventEle = createEvent(newEvent);
            tbody.appendChild(newEventEle);
      
            inputEndDate.value = "";
            inputStartDate.value = "";
            inputEndDate.value = "";
            formEle.style.display = "none";
          } catch (error) {
            console.error("Error adding event:", error);
            // alert("Failed to add event. Please try again.");
          }
        };
      
        cancelBtn.onclick = (e) => {
          e.preventDefault();
          formEle.style.display = "none";
        };
    }
    
}


//from server to webpages
eventAPI.getEvents().then((events) => {
  handleAddBtn();
  renderEvents(events);
});
