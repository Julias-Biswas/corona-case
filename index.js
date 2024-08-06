function updateMap() {
    console.log("Updating map with realtime data");
    fetch("./data.json")
        .then(response => response.json())
        .then(resp => {
            // console.log(resp.data);
            resp.data.forEach(element => {
                let latitude = element.latitude;
                let longitude = element.longitude;

                let cases = element.infected;
                let recovered = element.recovered;

                if (cases > 255) {
                    color = "rgb(255, 0, 0)";
                } else if (cases > 50 && cases < 255) {
                    color = "rgb(255, 80, 80)";
                } else if (cases > 10) {
                    color = "rgb(255, 127, 127)";
                } else if (cases < 10 && cases > 0) {
                    color = `rgb(${cases}, 238, 144)`;
                } else {
                    color = `rgb(${cases}, 204, 51)`;
                }

                // Mark on the map
                new mapboxgl.Marker({
                    draggable: false,
                    color: color
                })
                    .setLngLat([longitude, latitude])
                    .addTo(map);
            })
        });
}

updateMap();

let interval = 10000;
setInterval(updateMap, interval);