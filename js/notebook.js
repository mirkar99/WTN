const sectionNotebook = document.querySelector('.section-notebook');
const textarea = document.querySelector('.section-notebook__textarea')
const button = document.querySelector('.section-notebook__button');
(() => {
    const loadedarry = JSON.parse(localStorage.getItem("SavedElement"));
    if (loadedarry) {
        loadedarry.forEach(element => {
            createElementWithData(element);
        });
    }
})();

function createElementWithData(contentValue) {
    if(contentValue==""){
        return;
    }
    const div = document.createElement('div');
    const divContent = document.createElement('div');
    const divDelete = document.createElement('div');
    div.classList.add('section-notebook__saved-text');
    divContent.classList.add('section-notebook__content');
    divDelete.innerText = 'X';
    divDelete.style.color = 'red';
    divDelete.style.cursor = 'pointer';
    divDelete.style.marginRight = "10px"
    divContent.innerText = contentValue;

    div.appendChild(divContent);
    div.appendChild(divDelete);
    sectionNotebook.appendChild(div);
    divDelete.addEventListener('click', () => {
        div.remove();
        saveCreatedElement();
    })
}
const saveCreatedElement = () => {
    const arry = [...document.querySelectorAll('.section-notebook__content')];
    const arryToSave = arry.map(el => el.innerText);
    localStorage.setItem("SavedElement", JSON.stringify(arryToSave));
}

const buttonEventListener = () => {
    button.addEventListener('click', function () {
        createElementWithData(textarea.value);
        saveCreatedElement();
    })
}

export default { buttonEventListener };