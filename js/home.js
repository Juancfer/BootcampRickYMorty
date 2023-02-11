const printHome = () =>{

    mainContainer.innerHTML = `
    <section class="main__text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation</p>
            <hr class="separator">
    </section>
    <section class="main__buttons">
        <nav class="nav">
            <a href="#" class="nav__link">PERSONAJES</a>
            <a href="#" class="nav__link">TEMPORADAS</a>
            <a href="#" class="nav__link">LOCALIZACIONES</a>
    </section>
    
    `;

    addEventsToHomeLinks();
}

const addEventsToHomeLinks = () => {
    const homelinks = [...document.getElementsByClassName('nav__link')];
    homelinks.forEach(element => {
        element.addEventListener('click', () => {
            printPage(element.textContent.toLocaleUpperCase());
        })
    })
}