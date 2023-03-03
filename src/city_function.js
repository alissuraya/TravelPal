const cityForm = document.querySelector("#weatherForm");

const getWeatherConditions = async(city) => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        let div = document.createElement("div");
        div.setAttribute("id", "conditions");

        // Add styles
        div.style.color = "white";
        div.style.textAlign = "center";
        div.style.fontSize = "20px"
        div.style.textShadow = "0 5px 9px rgba(0, 0, 0, 0.8)"
        div.style.fontFamily = "sans-serif"
        div.style.fontWeight = "bold"
        div.style.letterspacing = "0.6em"
        div.style.padding = "0"
        div.style.margin = "0"

        let temp = document.createElement("div");
        let tempNode = document.createTextNode("🌡️ | \t"+((data.main.temp-273.15).toFixed(2))+ " °C ");
        temp.appendChild(tempNode);

        let desc = document.createElement("div");
        let descNode = document.createTextNode("Description | \t   "+data.weather[0].description);
        desc.appendChild(descNode);

        let time = document.createElement("div");
        const date = new Date();
        const utcHours = date.getUTCHours();
        const utcMinutes = date.getUTCMinutes();
        const timezoneOffset = 7200; // in seconds
        const Hours = (utcHours + (timezoneOffset / 3600)) % 24;
        const Minutes = utcMinutes;
        const Time = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Europe/Athens'});
        let timeNode = document.createTextNode(`Timezone ⌛ | ${Time}`);
        time.appendChild(timeNode);

        let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: "Europe/Athens" });
        let rise = document.createElement("div");
        let riseLabelNode = document.createTextNode("Sunrise 🌅 | ");
        rise.appendChild(riseLabelNode);
        let riseTimeNode = document.createTextNode(sunrise);
        rise.appendChild(riseTimeNode);
        div.appendChild(rise);

        let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: "Europe/Athens" });
        let sunsetLabelNode = document.createTextNode("Sunset 🌇 | ");
        let sunsetTimeNode = document.createTextNode(sunset);
        let set = document.createElement("div");
        set.appendChild(sunsetLabelNode);
        set.appendChild(sunsetTimeNode);
        div.appendChild(set);

        div.appendChild(temp);
        div.appendChild(desc);
        div.appendChild(time);
        div.appendChild(rise);
        div.appendChild(set);
        document.querySelector("main").appendChild(div);
    }).catch(err => console.log(err))

}

document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(document.querySelector("#country").value != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("country").value);
        }
        
        else{
            console.log("You must provide a city");
        }
    })
})

// Wrap every letter in a span
var textWrapper = document.querySelector('.place');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.place .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.place',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });