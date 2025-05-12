//sunset-sunrise API for date=today https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today 

//function to get data on click 

    // East Coast (New York City) coordinates
    function getSun() {
        const lat = 40.7128;
        const lng = -74.0060;
        const URL = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`;

    //fetch function
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            if (data.results) {
                const sunsetUTC = data.results.sunset;
                const sunriseUTC = data.results.sunrise;

                const sunsetLocal = convertUTCToLocal(sunsetUTC);
                const sunriseLocal = convertUTCToLocal(sunriseUTC);

                document.getElementById('sunset').innerText = `s h o w t i m e | ${sunsetLocal}`;
                document.getElementById('sunrise').innerText = `s h o w t i m e | ${sunriseLocal}`;
            }
        })
        .catch(error => {
            console.error('Error fetching request:', error);
            document.querySelectorAll('.sun').forEach(el => el.innerText = 's h o w t i m e | UNAVAILABLE');
        });
}

    // convert UTC string to EST
    function convertUTCToLocal(utcTimeStr) {
        const [time, modifier] = utcTimeStr.split(' ');
        let [hours, minutes, seconds] = time.split(':').map(Number);

        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        const now = new Date();
        const utcDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds));

        const localTime = utcDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return localTime;
}
    
//event listener for getSun(){}
document.querySelector('button').addEventListener('click', getSun);