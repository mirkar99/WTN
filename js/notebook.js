const sectionNotebook = document.querySelector('.section-notebook');
const textarea = document.querySelector('.section-notebook__textarea')
const button = document.querySelector('.section-notebook__button');

const createElementWithData = () => {
    const div = document.createElement('div');
    const divContent = document.createElement('div');
    const divDelete = document.createElement('div');
    div.classList.add('section-notebook__saved-text');
    divDelete.innerText = 'X';
    divDelete.style.color = 'red';
    divDelete.style.cursor = 'pointer';
    divDelete.style.marginRight = "10px"
    divContent.innerText = textarea.value;

    div.appendChild(divContent);
    div.appendChild(divDelete);
    sectionNotebook.appendChild(div);
    divDelete.addEventListener('click', () => {
        div.remove();
    })
}

const buttonEventListener = () => {
    button.addEventListener('click', function () {
        createElementWithData()
    })
}

export default { buttonEventListener };