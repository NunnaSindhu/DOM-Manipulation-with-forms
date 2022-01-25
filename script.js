let selectedRow = null;
function onFormSubmit() {
  var formData = readFormData();
  if (selectedRow == null) {
    insertNewRecord(formData);
  } else {
    updateFormData(formData);
  }
  resetForm(); 
}
//select the target for checkboxes
let checkboxInput = document.querySelectorAll(".ckeck2");

// create a function for checkbox selection
function foodchoices() {  
  let res = [];
  for (let i = 0; i < checkboxInput.length; i++) {
    if (checkboxInput[i].checked) {
      res.push(checkboxInput[i].id);
    }
  }
  return res;
}

//read the data from input fields
function readFormData() {
  const formData = {};
  formData["firstname"] = document.getElementById("firstname").value;
  formData["lastname"] = document.getElementById("lastname").value;
  formData["gender"] = document.getElementById("gender").value;
  formData["foodchoices"] = foodchoices();
  formData["address"] = document.getElementById("address").value;
  formData["pincode"] = document.getElementById("pincode").value;
  formData["state"] = document.getElementById("state").value;
  formData["country"] = document.getElementById("country").value;
  return formData;
  console.log(formData);
}

//create a insertNewRecord function 
function insertNewRecord(data) {
  let table = document.getElementById("table").getElementsByTagName("tbody")[0];
  //create a table for inserting data
  var newRow = table.insertRow(table.length);
  let cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.firstname;
  let cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.lastname;
  let cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.gender;
  let cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.foodchoices;
  let cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.address;
  let cell6 = newRow.insertCell(5);
  cell6.innerHTML = data.pincode;
  let cell7 = newRow.insertCell(6);
  cell7.innerHTML = data.state;
  let cell8 = newRow.insertCell(7);
  cell8.innerHTML = data.country;
  let cell9 = newRow.insertCell(8);
  cell9.innerHTML = `
    <button class="btn btn-primary" onClick="event.preventDefault(); onEdit(this)">Edit</button>
    <button class="btn btn-primary" onClick="event.preventDefault(); onDelete(this)">Delete</button>
  
    `;
}
//reset form data after submission
function resetForm() {
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("address").value = "";
  document.getElementById("pincode").value = "";
  document.getElementById("state").value = "";
  document.getElementById("country").value = "";
    //reset checkbox selection   
    for (let i = 0; i < checkboxInput.length; i++) {
      if (checkboxInput[i].checked) {
        checkboxInput[i].checked = false;
      }
    }
  selectedRow = null;
}


//on clicking edit bring the data into form fields
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  // console.log(selectedRow);
  document.getElementById("firstname").value = selectedRow.cells[0].innerHTML;
  // console.log(document.getElementById("firstname").value); 
  document.getElementById("lastname").value = selectedRow.cells[1].innerHTML;
  document.getElementById("gender").value = selectedRow.cells[2].innerHTML;
  let checkboxValues = selectedRow.cells[3].innerHTML;  
  // console.log(checkboxValues);
  for (let i = 0; i < checkboxInput.length; i++) {
    if (checkboxValues.includes(checkboxInput[i].id)) {
      checkboxInput[i].checked = true;
    }
  }
  document.getElementById("address").value = selectedRow.cells[4].innerHTML;
  document.getElementById("pincode").value = selectedRow.cells[5].innerHTML;
  document.getElementById("state").value = selectedRow.cells[6].innerHTML;
  document.getElementById("country").value = selectedRow.cells[7].innerHTML;
}

//update the data in table after submission
function updateFormData(formData) {
  selectedRow.cells[0].innerHTML = formData.firstname;
  selectedRow.cells[1].innerHTML = formData.lastname;
  selectedRow.cells[2].innerHTML = formData.gender;
  selectedRow.cells[3].innerHTML = formData.foodchoices;
  selectedRow.cells[4].innerHTML = formData.address;
  selectedRow.cells[5].innerHTML = formData.pincode;
  selectedRow.cells[6].innerHTML = formData.state;
  selectedRow.cells[7].innerHTML = formData.country;
}

//logic for delete selected row
function onDelete(td) {
  if (confirm("Are you sure you want to delete?")) {
    row = td.parentElement.parentElement;
    document.getElementById("table").deleteRow(row.rowIndex);
    resetForm();
  }
}
