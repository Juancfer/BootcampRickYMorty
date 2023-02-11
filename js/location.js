const printDetailLocation = (url) =>{
    mainContainer.innerHTML = "";
    getDetailLocation(url).then(response => {
        let locationInfo = formatLocationInfo (response);
        mainContainer.innerHTML = `
        <section class="section">
            <h3 class="section__title">LOCATION DETAIL</h3>
            <section class="section__container">
                ${locationInfo}
            </section>
        </section>`;
        addLinkToResident(response.residents)
    })
}

const addLinkToResident = (residents) => {
    const linkToResident = [...document.getElementsByClassName('location__residents')];

    linkToResident.forEach((element, index) => {
        element.addEventListener('click', () => {
           printPage('PERSONAJES', residents[index].url);
       })
    })
}

const addDetailsToResident = (residents) => {
    return residents.map(resident => {
        return `<button type="button" class="location__residents">
        <img src="${resident.img}" />
        </button>`
    }).join('')
}

const formatLocationInfo = (locationInfo) =>{
    return `<div>
        <h4>${locationInfo.name}</h4>
        <div class="location__info-container">
            <div>
                <p>TYPE</p>
                <p>${locationInfo.type}</p>
            </div>
            <div>
                <p>DIMENSION</p>
                <p>${locationInfo.dimension}</p>
            </div>
            <div>
                <p>RESIDENTS</p>
                ${addDetailsToResident(locationInfo.residents)}
            </div>
        </div>
    </div>`
}

const getResidentInfo = async (url) => {
    const residentInfo = await fetch(url);
    const response = await residentInfo.json();
    return response;
}

const getDetailLocation = async (url) => {
    const location = await fetch(url);
    const response = await location.json();
    return mapDataLocationDetail(response);
}

const mapDataLocationDetail = (locationInfo) =>{
    return {
        name: locationInfo.name,
        type: locationInfo.type,
        dimension: locationInfo.dimension,
        residents: locationInfo.residents.map(element =>{
            return {url: element, img: element.replace("https://rickandmortyapi.com/api/character/","https://rickandmortyapi.com/api/character/avatar/")+".jpeg"}
        })
    }
}