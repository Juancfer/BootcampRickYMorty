const printDetailPersonaje = (url) =>{
    mainContainer.innerHTML = "";
    getPersonaje(url).then(response => {
        let personajeDetail = formatPersonajeDetail (response);
        mainContainer.innerHTML = `
        <section class="section">
            <h3 class="section__title">CHARACTERS DETAIL</h3>
            <section class="section__container section__container--detail">
            ${personajeDetail}
            </section>
        </section>
        `;
        addLinkToPersonaje(response.episode)
   })
}


const addLinkToPersonaje = (episode) => {
    const linkToPersonaje = [...document.getElementsByClassName('detail__button')];

    linkToPersonaje.forEach((element, index) => {
        element.addEventListener('click', () => {
           printPage('TEMPORADAS', episode[index]);
       })
    })
}

const formatPersonajeDetail = (data) =>{
    return `<div class="detail">
            <img class="detail__img" src="${data.image}">
            <h4 class="detail__name">${data.name}</h4>
        </div>
        <div class=detail__info>
            <div class="detail__section">
                <p class="detail__title">STATUS</p>
                <div class="detail__status">
                    <p class="detail__status-subtitle detail__subtitle--${data.status === 'Alive' ? "alive" : ""}">ALIVE</p>
                    <p class="detail__status-subtitle detail__subtitle--${data.status === 'Dead' ? "dead" : ""}">DEAD</p>
                    <p class="detail__status-subtitle detail__status-subtitle--unknown detail__subtitle--${data.status === 'Unknown' ? "unknown" : ""}">UNKNOWN</p>
                </div>
            </div>
            <div class="detail__container">
                <div class="detail__section">
                    <p class="detail__title">SPECIES</p>
                    <p class="detail__subtitle">${data.species}</p>
                </div>
                <div class="detail__section">
                    <p class="detail__title">ORIGIN</p>
                    <p class="detail__subtitle">${data.origin}</p>
                </div>
                <div class="detail__section">
                    <p class="detail__title">LOCATION</p>
                    <p class="detail__subtitle detail__subtitle--location">${data.location}</p>
                </div>
            </div>
            <div class="detail__section">
                <p class="detail__title">EPISODE</p>
                <div class="detail__grid">
                    ${mapDataEpisode(data.episode)}
                </div>
            </div>
        </div>`
}


   
const getPersonaje = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    return mapDataPersonaje(data);
}

const mapDataPersonaje = (data) => {
    return {
        id: data.id,
        name: data.name,
        status: data.status,
        image: data.image,
        species: data.species,
        origin: data.origin.name,
        location: data.location.name,
        episode: data.episode,
    }
}

const mapDataEpisode = (episode) =>{
    let episodeMapped = episode.map((data, index) => {
       return `<button class="detail__button">${data.replace("https://rickandmortyapi.com/api/episode/","")}</button>`
    }).join('')
    return episodeMapped;
}