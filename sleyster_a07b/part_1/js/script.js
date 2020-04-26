/*Heather Sleyster
sleyster_a07bpart1
Thoedel
INFO 2134
04/22/2020
*/

window.addEventListener('load', () =>{

    const right = document.getElementById('right');
    const airportCode = document.getElementById('airportCode');
    const actionGetWeather = document.getElementById('actionGetWeather');

    actionGetWeather.addEventListener('click', () => {
        if (checkAirportCode()){
            displayLoading('right');
            const url = 'https://w1.weather.gov/xml/current_obs/display.php?stid=k' + airportCode.value;

            fetch(url)
            .then ((response) => {
                if(response.ok) {
                    return response;
                }
                throw new Error ('Error: ' + response.statusText);
            })
            .then (response => response.text())
                .then (text => displayData(text))
                    .then (clearLoading())
                        .catch(error => console.log(error));
        }
    })
//Begin Step 2
//created event listener to check airport code entered and throw error if invalid.
    airportCode.addEventListener('change', () => {
        const errorHolder = document.getElementById('errorHolder');
        if (checkAirportCode() == false){
            errorHolder.innerHTML = 'Error: You must enter a valid airport code';
            errorHolder.classList.remove('hidden');
            errorHolder.classList.add('visible');
            errorHolder.classList.add('error');
            errorHolder.classList.add('errorBox');
        }
        if (checkAirportCode()){
            errorHolder.classList.remove('visible');
            errorHolder.classList.add('hidden');
        }
    })
//End Step 2    

    //helper functions
    function displayLoading(side, loadingText) {
        if (loadingText == undefined) loadingText = "Loading content ...";
        if ((side != 'left') && (side != 'right')){
            throw new Error ('displayLoading accepts "right" and "left" only');
        }
        else { const container = document.getElementById(side);
            let loadingTextContainer = document.createElement('p');
            loadingTextContainer.innerHTML = loadingText;
            container.appendChild(loadingTextContainer);

            let loadingImageContainer = document.createElement('div');
            loadingImageContainer.classList.add('loading');
            loadingImageContainer.classList.add('centered');
            container.appendChild(loadingImageContainer);
            }
        }
    
    function clearLoading(){
        right.innerHTML = '';
    }

    function checkAirportCode(){
        const airportCodeValue = airportCode.value;
        if (airportCodeValue == '') return false;
        if (airportCodeValue.length > 3) return false;
        // Begin Step 3
        //created array to store valid codes then itterated through to validate entry.
        if(airportCodeValue.length < 3) return false;
        const validCodes = ['anw', 'bvn', 'aia', 'auh', 'bie', 'bta', 'hde', 'bbw', 'cdr', 
            'olu', 'fnb', 'fet', 'gri', 'hsi', 'hjh', 'iml', 'ear', 'ibm', 'lxn', 'lnk',
            'mck', 'mle', 'afk', 'lbf', 'onl', 'oga', 'off', 'oma', 'odx', 'pmv', 'bff',
            'sny', 'tqe', 'tif', 'vtn', 'ahq', 'lcg', 'jyr'];
        for(const validCode of validCodes) {
            airportCodeValue.toLowerCase();
            if(validCodes.includes(airportCodeValue)) return true;
            return false;
        }
        //End Step 3
        return true; 
    }

    function displayData(xml){
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xml, 'text/xml');
        console.log(xmlDoc);
        let location = xmlDoc.getElementsByTagName('location')[0].innerHTML;
        let temp_f = xmlDoc.getElementsByTagName('temp_f')[0].innerHTML;
        //Begin Step 4
        /*got elements by their tage name from the xml document and created elements
        in the html document and appended the information to the html elements.
        */
        let temp_c = xmlDoc.getElementsByTagName('temp_c')[0].innerHTML;
        //let windchill_f = xmlDoc.getElementsByTagName('windchill_f')[0].innerHTML;
        //let windchill_c = xmlDoc.getElementsByTagName('windchill_c')[0].innerHTML;
        let visibility_mi = xmlDoc.getElementsByTagName('visibility_mi')[0].innerHTML;
        let wind_mph = xmlDoc.getElementsByTagName('wind_mph')[0].innerHTML;
        let h1 = document.createElement('h1');
        let cw = `Current Weather`;
        h1.innerHTML = cw;
        right.appendChild(h1);
        let h2 = document.createElement('h2');
        h2.innerHTML = location;
        right.appendChild(h2);
        let p = document.createElement('p');
        let pText = `Temperature: ${temp_f} ${2109}(${temp_c} ${2103}) \n
                    Wind Speed: ${wind_mph} MPH \n
                    Visiblilty: ${visibility_mi}`;
        p.innerHTML = pText;
        right.appendChild(p);
        //commented out the original output for new output to show.
        //let wx = `The current temperature in ${location} is ${temp_f} F`;
        //right.innerHTML = wx;
        //End Step 4 
        //Begin Step 5
        const icon_url = 'http://forcast.weather.gov/images/wtf/small';
        
        fetch(icon_url)
            .then((response) => {
                if(response.ok) {
                    return response;
                }
                throw new Error('Error: ' + response.statusText);
        })
            .then (response => response.text())
                .then (text => displayData(text))
        //End Step 5

        //Begin Step 6
                .then (response => response.redirect('http://forcast.weather.gov/images/wtf/large'));
        //End Step 6
       
    }
})