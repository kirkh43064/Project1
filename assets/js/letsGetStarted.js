let requestUrl = "https://wger.de/api/v2/muscle/?format=json";
let submitBtn = document.getElementById('submit');
let selectMenu = document.getElementById('dropdown');
let muscleImageFront = document.getElementById('muscleImageFront');
let userChoice;

fetch(requestUrl)
  .then(function (response) {
    return response.json(); //converts string in JSON format to a JavaScript Object
  })
  .then(function (data) {
    //Loops through the data creating options in the drop-down menu for each muscle group found in the API
    for (let i = 0; i < data.results.length; i++) {
      let optionEl = document.createElement('option');
      optionEl.value = data.results[i].name.toLowerCase().replace(/ /g, '');
      optionEl.innerHTML = data.results[i].name;
      selectMenu.appendChild(optionEl);
    }
  });

submitBtn.addEventListener('click', function(){
    //Logs the user's choice in the local storage for future reference
    userChoice = selectMenu.options[selectMenu.selectedIndex].text;
    localStorage.setItem('Muscle Group', userChoice);
    renderImg();
});

//Kirk's JS
let muscleImg1 = "";
let muscleImg2 = "";
let muscleDiv = document.querySelector(".muscle-background");
localStorage.getItem("Muscle Group");
let muscleGroup = localStorage.getItem("Muscle Group");
let muscleUrl = "https://wger.de/api/v2/muscle";
fetch(muscleUrl)

.then(function(response){
    return response.json();
})

.then(function(response){
    console.log(response);
    let muscle = response.results.find(function(muscleResults) {
        if (muscleResults.name === muscleGroup){
            return muscleResults;
        }
    })
    console.log(muscle);
    let muscleImg1 = muscle.image_url_main
    let muscleImg1Url1 = "https://wger.de" + muscleImg1;
    let muscleImg2 = muscle.image_url_secondary
    let muscleImg1Url2 = "https://wger.de" + muscleImg2
    console.log(muscleImg1Url1);
    muscleDiv.style.backgroundImage= 'url("https://wger.de/static/images/muscles/main/muscle-11.svg"), url("assets/images/muscular_system_front.svg")'
    function renderImg() {
        let image1 = document.createElement("img");
        image1.src = muscleImg1Url1;
        document.getElementById('img1').appendChild(image1);

        let image2 = document.createElement("img");
        image2.src = muscleImg1Url2;
        document.getElementById('img2').appendChild(image2);
    }
    renderImg();
})


.catch(function(error){
    console.log(error);
})
