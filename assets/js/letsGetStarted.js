let submitBtn = document.getElementById("submit");
let requestUrl = "https://wger.de/api/v2/muscle/?format=json";
let selectMenu = document.getElementById('dropdown')
let userChoice;

fetch(requestUrl)
  .then(function (response) {
    return response.json(); //converts string in JSON format to a JavaScript Object
  })
  .then(function (data) {
    //Loops through the data creating options in the drop-down menu for each muscle group found in the API
    for (let i = 0; i < data.results.length; i++) {
      let optionEl = document.createElement("option");
      optionEl.value = data.results[i].name.toLowerCase().replace(/ /g, '');
      optionEl.innerHTML = data.results[i].name;
      selectMenu.appendChild(optionEl);
    }
  });

submitBtn.addEventListener('click', function(){
    //Logs the user's choice in the local storage for future reference
    userChoice = selectMenu.options[selectMenu.selectedIndex].text;
    localStorage.setItem("Muscle Group", userChoice);
})