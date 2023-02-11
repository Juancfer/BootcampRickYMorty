
const printLocation = (url) => {
    mainContainer.innerHTML = "";
    getLocation(url).then(response => {
        let locationDetail = formatLocation (response);
        mainContainer.innerHTML = `
        <section class="section">
            <h3 class="section__title">LOCATION FINDER</h3>
            <section class="section__container">
            ${locationDetail}
            </section>
        </section>
        <button class="">+ MORE</button>
        `;
        addEventToLocation(response);

    })
}

const formatLocation = (location) => {
    return location.map(element =>{
        return `
        <div class="location">
            <h4 class="location__name">${element.name}</h4>
            <div class="location__container">
                <div class="location__type">
                    <p class="location__title">TYPE</p>
                    <p class="location__subtitle">${element.type}</p>
                </div>
                <div class="location__dimension">
                    <p class="location__title">DIMENSION</p>
                    <p class="location__subtitle">${element.dimension}</p>
                </div>
            </div>
            <button class="location__button">MORE DETAILS</button>
        </div>
        `
    }).join("");
}



const addEventToLocation = (locations) =>{
    let locationButton = [...document.getElementsByClassName('location__button')];
    locationButton.forEach((element, i)=> {
        element.addEventListener('click', ()=>{
            printPage('LOCALIZACIONES', locations[i].urlDetail)
        })
    })
}

const getLocation = async (url) => {
    let locationInfo = await fetch(url+ '/location');
    let response = await locationInfo.json();
    return mapDataLocation(response.results);
}

const mapDataLocation = (locationInfo) => {
    return locationInfo.map(element => {
        return {
            name: element.name,
            type: element.type,
            dimension: element.dimension,
            urlDetail: element.url
        }
    })
}