const printPersonajes = () =>{
    mainContainer.innerHTML = "";
    getPersonajes().then(response => {
        let personajesCards = formatPersonajesCards(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">CHARACTERS FINDER</h3>
                <section class="section__container">
                    ${personajesCards}
                </section>
            </section>
        `;
        addEvenToPersonajeLinks(response);
    })
}

const formatPersonajesCards = (personaje) =>{
    let status = "";
    let templatePersonajes = personaje.map (personaje =>{
        if(personaje.status === 'Dead') {
            status = "dead"
        } else if(personaje.status === 'Alive') {
            status = "alive"
        } else {
            status = "unknow"
        }

        return `<div class="card">
        <div class= "card__header">
            <h4 class="card__title">${personaje.name}</h4>
            <p class="card__status card__status--${status}">${personaje.status}</p>
        </div>
        <div class="card__body">
            <img class="card__img" src="${personaje.image}">
            <div class="card__info-container">
                <p class="card__info-title">SPECIES</p>
                <p class="card__info">${personaje.species}</p>
                <p class="card__info-title">GENDER</p>
                <p class="card__info">${personaje.gender}</p>
                <p class="card__info-title">ORIGIN</p>
                <p class="card__info">${personaje.origin}</p>
                <p class="card__info-title">LOCATION</p>
                <p class="card__info">${personaje.location}</p>
            </div>
        </div>
        <a class="card__link" href="#">+ MORE DETAILS</a>
        </div>`
    }).join('')

    return templatePersonajes;
}

const addEvenToPersonajeLinks = (personajes) => {
    let cardLinks = [...document.getElementsByClassName('card__link')];
    cardLinks.forEach((element, i)=> {
        element.addEventListener('click', () =>{
            printPage('PERSONAJES', personajes[i].urlDetail)
        }) 
    })
}
    

const getPersonajes = async () => {
    let url = urlBase + "/character";
    let response = await fetch(url);
    let data = await response.json();
    return mapDataPersonajes(data.results);
}

const mapDataPersonajes = (data) => {
    let dataMapped = data.map( personaje => {
        let object = {
            name: personaje.name,
            status: personaje.status,
            image: personaje.image,
            species: personaje.species,
            gender: personaje.gender,
            origin: personaje.origin.name,
            location: personaje.location.name,
            urlDetail: personaje.url,
        }
        return object;
    })
    return dataMapped;
}
