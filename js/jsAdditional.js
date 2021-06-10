function validateFoodAddForm() {

  //Set the elements to go through additional validation, numbers will be managed by
  //html form attribute
  var foodName = document.forms["foodAdd"]["name"].value;
  var serveDesc = document.forms["foodAdd"]["servingDesc"].value;
  var calories = document.forms["foodAdd"]["calories"].value;

  //Food name cannot be submitted blank, or with the default value
  if (foodName == "" || foodName == "Enter the food name here...") {
      alert("Name must be filled out");
      return false;
  }

  //Serving description cannot be submitted blank, or with the default value
  if (serveDesc == "" || serveDesc == "eg. 1 pint glass") {
      alert("You must add a serving description");
      return false;
  }

  //User must at least provide a calorie value
  if (calories <= 0) {
      alert("You must provide a positive calorie number");
      return false;
  }

}

function build_recipe() {

  //get all checked checkboxes within the allAvailable foods container
  let checkboxes = document.querySelectorAll(
      '#allAvailableFoods  input[type="checkbox"]:checked'
  );

  //create variables to store totalled nutritional value
  let calories = 0;
  let fat = 0;
  let protein = 0;
  let carbs = 0;
  let sugar = 0;
  let fibre = 0;
  let satfats = 0;
  let salt = 0;

  //loop through each row of checked checkboxes
  for (let checkbox of checkboxes) {

      //get the parent element of the parent of the checkbox checkbox > cell > row
      let row = checkbox.parentElement.parentElement;

      //get the qty to multiply all the variables by
      let qty = 0;
      if (parseFloat(row.children[1].children[0].value).length == 0) {
          qty = 0;
      } else {
          qty = parseFloat(row.children[1].children[0].value);

      };

      //get the 2nd column of the row (calories), if length is 0 then default to 0
      if (row.children[3].textContent.length == 0) {
          calories += 0
      } else {
          calories += parseFloat(row.children[3].textContent) * qty
      };

      //get the 3rd column of the row (fat), if length is 0 then default to 0
      if (row.children[4].textContent.length == 0) {
          fat += 0
      } else {
          fat += parseFloat(row.children[4].textContent) * qty;
      };

      //get the 4th column of the row (protein), if length is 0 then default to 0
      if (row.children[5].textContent.length == 0) {
          protein += 0
      } else {
          protein += parseFloat(row.children[5].textContent) * qty;
      };

      //get the 5th column of the row (carbs), if length is 0 then default to 0
      if (row.children[6].textContent.length == 0) {
          carbs += 0
      } else {
          carbs += parseFloat(row.children[6].textContent) * qty;
      };

      //get the 6th column of the row (sugar), if length is 0 then default to 0
      if (row.children[7].textContent.length == 0) {
          sugar += 0
      } else {
          sugar += parseFloat(row.children[7].textContent) * qty;
      };

      //get the 7th column of the row (sugar), if length is 0 then default to 0
      if (row.children[8].textContent.length == 0) {
          fibre += 0
      } else {
          fibre += parseFloat(row.children[8].textContent) * qty;
      };

      //get the 8th column of the row (satfats), if length is 0 then default to 0
      if (row.children[9].textContent.length == 0) {
          satfats += 0
      } else {
          satfats += parseFloat(row.children[9].textContent) * qty;
      };

      //get the 9th column of the row (salt), if length is 0 then default to 0
      if (row.children[10].textContent.length == 0) {
          salt += 0
      } else {
          salt += parseFloat(row.children[10].textContent) * qty;
      };
  }

  //input final totals into the top table
  document.getElementById('rowCalories').innerHTML = Math.round(calories);;
  document.getElementById('rowFat').innerHTML = Math.round(fat);
  document.getElementById('rowProt').innerHTML = Math.round(protein);
  document.getElementById('rowCarbs').innerHTML = Math.round(carbs);
  document.getElementById('rowSugar').innerHTML = Math.round(sugar);
  document.getElementById('rowFibre').innerHTML = Math.round(fibre);
  document.getElementById('rowSatFat').innerHTML = Math.round(satfats);
  document.getElementById('rowSalt').innerHTML = Math.round(salt);
}

function clicked(e)
{
    if(!confirm('Are you sure?')) {
        e.preventDefault();
    }
}