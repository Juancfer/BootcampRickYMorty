const printEpisodeDetail = (url) =>{
    mainContainer.innerHTML = "";
    getEpisodeDetail(url).then(response => {
        let episodeInfo = formatEpisodeInfo (response);
        mainContainer.innerHTML = `
        <section class="section">
            <h3 class="section__title">EPISODE DETAIL</h3>
            <section class="section__container">
                ${episodeInfo}
            </section>
        </section>`;
        addLinkToCharacter(response.characters)
    })
}

const addLinkToCharacter = (character) => {
    const linkToCharacter = [...document.getElementsByClassName('location__residents')];

    linkToCharacter.forEach((element, index) => {
        element.addEventListener('click', () => {
           printPage('PERSONAJES', character[index].url);
       })
    })
}

const addDetailsToCharacter = (characters) => {
    return characters.map(character => {
        return `<button type="button" class="location__residents">
        <img src="${character.img}" />
        </button>`
    }).join('')
}

const formatEpisodeInfo = (episodeInfo) =>{
    return `<div>
        <h4>${episodeInfo.name}</h4>
        <div class="location__info-container">
            <div>
                <p>EPISODE</p>
                <p>${episodeInfo.episode}</p>
            </div>
            <div>
                <p>DATE</p>
                <p>${episodeInfo.date}</p>
            </div>
            <div>
                <p>CHARACTERS</p>
                ${addDetailsToCharacter(episodeInfo.characters)}
            </div>
        </div>
    </div>`
}

const getEpisodeInfo = async (url) => {
    const episodeInfo = await fetch(url);
    const response = await episodeInfo.json();
    return response;
}

const getEpisodeDetail = async (url) => {
    const episode = await fetch(url);
    const response = await episode.json();
    return mapDataEpisodeDetail(response);
}

const mapDataEpisodeDetail = (episodeInfo) =>{
    return {
        name: episodeInfo.name,
        episode: episodeInfo.episode,
        date: episodeInfo.air_date,
        characters: episodeInfo.characters.map(element =>{
            return {url: element, img: element.replace("https://rickandmortyapi.com/api/character/","https://rickandmortyapi.com/api/character/avatar/")+".jpeg"}
        })
    }
}