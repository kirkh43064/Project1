let submitBtn = document.getElementById("submit");
let requestUrl = "https://wger.de/api/v2/muscle/?format=json";
let selectMenu = document.getElementById('dropdown')


fetch(requestUrl)
  .then(function (response) {
    return response.json(); //converts string in JSON format to a JavaScript Object
  })
  .then(function (data) {
    console.log('muscle groups \n----------');
    console.log(data.results[0].name.toLowerCase().replace(/ /g, ''));
    // TODO: Loop through the response
    for (let i = 0; i < data.results.length; i++) {
        console.log(data.results[i].name);
      let optionEl = document.createElement("option");
      //optionEl.textContent = ;
      optionEl.value = i;
      optionEl.innerHTML = data.results[i].name;
      selectMenu.appendChild(optionEl);
    }
  });

submitBtn.addEventListener('click', function(){
    console.log("you clicked submit");
})