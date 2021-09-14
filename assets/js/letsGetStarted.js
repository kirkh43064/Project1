let submitBtn = document.getElementById("submit");
let requestUrl = "https://wger.de/api/v2/muscle/?format=json";
let selectMenu = document.getElementById('dropdown')
let userChoice;
let muscleImg1 = "";
let muscleImg2 = "";
let exerciseDiv =document.querySelector("#workoutList");
let muscleDiv = document.querySelector(".muscle-background");
let muscleGroup = localStorage.getItem("Muscle Group");
let muscleUrl = "https://wger.de/api/v2/muscle";
let wgerUrl = "https://wger.de";
let muscleID = "";

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
    getWorkouts();
})

// kirks added code////////////////////////////////////////////////////////////////////////////////////////////////////////
function getWorkouts() {
  muscleGroup = localStorage.getItem("Muscle Group");
  fetch(muscleUrl)

  .then(function(response){
    return response.json();
  })

  .then(function(response){
    console.log(response);
    let muscle = response.results.find(function(muscleResults) {
      console.log(muscleResults);
      if (muscleResults.name === muscleGroup){    
        return muscleResults;
      }
    })

    muscleID = muscle.id;

    console.log(muscleID);

    let muscleImg1 = muscle.image_url_main
    let muscleImg1Url1 = wgerUrl + muscleImg1;
    let muscleImg2 = muscle.image_url_secondary
    let muscleImg1Url2 = wgerUrl + muscleImg2

    console.log(muscleImg1Url1);
          
  function renderImg(muscleResults) {
    if (muscleResults.is_front === true) {
      var background1Url = "assets/images/muscular_system_front.svg";
    }

    var background1Url = "assets/images/muscular_system_back.svg";

    muscleDiv.style.backgroundImage= `url(${muscleImg1Url1}), url(${background1Url})`;

  }
  renderImg(muscle);
  workoutList();
  })
  .catch(function(error){
    console.log(error);
  })
}

function workoutList() {
  let exerciseListUrl = "https://wger.de/api/v2/exercise/?limit=9&language=2&muscles=" + muscleID;
  
  fetch(exerciseListUrl)

  .then(function(response){
    return response.json();
  })

  .then(function(response) {
    console.log(response);
    while(exerciseDiv.firstChild) {
      exerciseDiv.removeChild(exerciseDiv.firstChild)
    }

    response.results.forEach(element => {
      exerciseID = element.id;
      let myList = document.createElement('li');
      let myLink = document.createElement('a')
      myLink.textContent = element.name;
      myLink.href = `${wgerUrl}/en/exercise/${exerciseID}/view/`;
      myLink.target= "_blank";
      myList.appendChild(myLink);
      exerciseDiv.append(myList);

    }); 
      
  })
}
