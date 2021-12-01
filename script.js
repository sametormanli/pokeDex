const button = document.querySelector('button');
const body = document.querySelector('body');
const number = document.querySelector('#number');

const container = document.createElement('div');
container.setAttribute('class', 'container')
const containerStyle = {
    width: '500px',
    height: '500px',
    margin: '30px auto',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
};
Object.assign(container.style, containerStyle);

const warning = document.createElement('h5');
warning.innerHTML = 'Index number must be in between 1 and 809';
const warningStyle = {
    color: 'red',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)'
}
Object.assign(warning.style, warningStyle);

function inputEvent(eventName) {    
    number.addEventListener(eventName, event => {
        let num = parseInt(event.target.value);
        let control = num > 809 || num < 1;
        event.target.style.border = control ? 'solid 3px red' : '';
        if (control) {
            button.insertAdjacentElement('afterend', warning);
        } else {
            warning.remove();
        }
    });
}
inputEvent('change');
inputEvent('keyup');

button.addEventListener('click', event => {    
    if (number.value) {        
        if (810 > parseInt(number.value) && parseInt(number.value) > 0) {
            document.querySelector('body').appendChild(container);
            getPoke(parseInt(number.value) - 1).then(result => container.innerHTML = result.outerHTML);
        } else {
            console.log('Not valid range.')
        }
    } else {
        document.querySelector('body').appendChild(container);
        getPoke().then(result => container.innerHTML = result.outerHTML);
    }
});

let scrape;

async function getPoke(id=getRandom()) {
    if (!scrape) {
        scrape = await fetchData();
    }
    let title = document.createElement('h2')
    title.innerHTML = `#${id + 1} ` + scrape[id].name.english;
    let img = getImage(String(id + 1).padStart(3, '0'));
    let div = document.createElement('div');
    let hr = document.createElement('hr')
    hr.style.width = '90%';
    hr.style.margin = '10px auto';
    div.appendChild(title);
    div.appendChild(hr);
    div.appendChild(img);
    return div
}

function getRandom(max=809) {
    return Math.floor(Math.random() * max);
}

async function fetchData() {
    let response = await fetch('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json');
    return await response.json();
}

function getImage(id) {
    let img = document.createElement('img')
    img.setAttribute('src', `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${id}.png`)
    img.style.setProperty('max-height', '500px');
    return img;
}