const mainContainer = document.querySelector('.main')
const urlBase = "https://rickandmortyapi.com/api"

window.onload = () =>{
    printHome();
}

const printPage = (section, url) => {
    adaptHeader(section);
    switch (section){
        case 'HOME':
            printHome();
            break;
        case 'PERSONAJES':
            url ? printDetailPersonaje(url) : printPersonajes();
            break;
        case 'LOCALIZACIONES':
            url ? printDetailLocation(url) : printLocation(urlBase);
            break;
        case 'TEMPORADAS':
            url ? printEpisodeDetail(url) : printEpisode(urlBase);
            break;
        default:
            printHome();
            break;  
    }
}

const adaptHeader = (section) =>{
    const header = document.querySelector('header');
    (section === 'HOME') ? header.classList.add('header--home') : header.classList.remove('header--home');
}