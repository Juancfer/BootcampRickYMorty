const printEpisode = (url) =>{
    mainContainer.innerHTML = "";
    getEpisode(url).then(response => {
        let episode = formatEpisode(response);
        mainContainer.innerHTML = `
        <section class="section">
            <h3 class="section__title">EPISODES</h3>
            <section class="section__container">
                ${episode}
            </section>
        </section>`;
        addEventToEpisode(response)
    })
}

const formatEpisode = (episode) => {
    const season1 = episode.filter(element => element.season === 'S01')
    const season2 = episode.filter(element => element.season === 'S02')

    return `
        <div class="episodes">
            <h4>SEASON 1</h4>
            <div>
                <p>DATE</p>
                <p>${season1[0].date} - ${season1[season1.length - 1].date}</p>
            </div>
           <div>
                <p>EPISODES</p>
                ${showEpisode(season1)}
           </div> 
        </div>
        <div class="episodes">
            <h4>SEASON 2</h4>
            <div>
                <p>DATE</p>
                <p>${season2[0].date} - ${season2[season2.length - 1].date}</p>
            </div>
           <div>
                <p>EPISODES</p>
                ${showEpisode(season2)}
           </div> 
        </div>`
}

const showEpisode = (season) => season.map(element => `<button class="episode__button">${element.name}</buttton>`).join('')

const addEventToEpisode = (episode) =>{
    let episodeButton = [...document.getElementsByClassName('episode__button')];
    episodeButton.forEach((element, i)=> {
        element.addEventListener('click', ()=>{
            printPage('TEMPORADAS', episode[i].url)
        })
    })
}

const getEpisode = async (url) => {
    let locationInfo = await fetch(url+ '/episode');
    let response = await locationInfo.json();
    return (mapDataEpisodes(response.results));
}

const mapDataEpisodes = (episodeInfo) => {
    return episodeInfo.map(element => {
        return {
            name: element.name,
            date: element.air_date,
            season: element.episode.split('E')[0],
            url: element.url
        }
    })
}