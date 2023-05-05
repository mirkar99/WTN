const timerValue = document.querySelector('.section-timer__value');
const button = document.querySelector('.section-timer__button');

let hIndex, mIndex, sIndex;
let valueForUser = '00h:00m:00s';
let clockDown;

const audioEffect = new Audio('./audio/alarm_sound_effect.mp3');

const timerIndexChecker = function () {
    hIndex = [...timerValue.value].indexOf('h');
    mIndex = [...timerValue.value].indexOf('m');
    sIndex = [...timerValue.value].indexOf('s');
}
const createElement = function(){
    const div = document.createElement('div');
    const text = document.createElement('p');
    const button = document.createElement('button');

    div.classList.add('timer-EndInfo');
    text.classList.add('timer-EndInfo__text');
    button.classList.add('timer-EndInfo__button');
    text.innerHTML ='It is done';
    button.innerHTML ='Ok';
    div.appendChild(text);
    div.appendChild(button);

    document.querySelector('.section-timer').appendChild(div)
    button.addEventListener('click',()=>{
        audioEffect.pause();
        audioEffect.loop = false;
        div.remove();
    })
    
}
const timerValueFormatChacker = function () {
    timerValue.addEventListener('keyup', function () {
        const format = /^\d?\d?h:\d?\d?m:\d?\d?s$/g;
        format.test(timerValue.value) ? valueForUser = timerValue.value : null;

        timerIndexChecker()

        const minutes = Number(timerValue.value.slice(mIndex - 2, mIndex));
        const seconds = Number(timerValue.value.slice(sIndex - 2, sIndex));

        if (minutes > 60) {
            let valueForUserArrCopy = [...valueForUser];
            valueForUserArrCopy[mIndex - 2] = '6'
            valueForUserArrCopy[mIndex - 1] = '0';
            valueForUser = valueForUserArrCopy.join('');
        }
        if (seconds > 60) {
            let formatExampleArrCopy = [...valueForUser];
            formatExampleArrCopy[sIndex - 2] = '6'
            formatExampleArrCopy[sIndex - 1] = '0';
            valueForUser = formatExampleArrCopy.join('');
        }
        timerValue.value = valueForUser;
    })
}
const countDown = function () {
    const timerValueArr = [...timerValue.value];
    let hoursArry = []
    let minutesArry = [];
    let secondsArry = [];

    timerIndexChecker();

    for (let i = 1; i < 3; i++) {
        hoursArry.unshift(Number(timerValueArr[hIndex - i]));
        minutesArry.unshift(Number(timerValueArr[mIndex - i]));
        secondsArry.unshift(Number(timerValueArr[sIndex - i]));
    }

    hoursArry = hoursArry.map(el => isNaN(el) ? 0 : el);
    minutesArry = minutesArry.map(el => isNaN(el) ? 0 : el);
    secondsArry = secondsArry.map(el => isNaN(el) ? 0 : el);

    let hoursNumber = Number(hoursArry.join(''));
    let minutesNumber = Number(minutesArry.join(''));
    let secondsNumer = Number(secondsArry.join(''));

    let timeInSecounds = 0;
    if (secondsNumer > 0) {
        timeInSecounds += secondsNumer;
    }
    if (minutesNumber > 0) {
        timeInSecounds += minutesNumber * 60;
    }
    if (hoursNumber > 0) {
        timeInSecounds += hoursNumber * 3600;
    }
    if (timeInSecounds > 0) {
        clockDown = setInterval(() => {
            timeInSecounds--;
            let hoursLeft = Math.floor(timeInSecounds / 3600);
            let minutesLeft = Math.floor((timeInSecounds % 3600) / 60);
            let remainingSeconds = timeInSecounds % 60;
            hoursLeft = hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft;
            minutesLeft = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
            remainingSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

            valueForUser = `${hoursLeft}h:${minutesLeft}m:${remainingSeconds}s`;
            timerValue.value = valueForUser
            if (timeInSecounds == 0) {
                if (button.classList.contains('section-timer__button--pause')) {
                    button.classList.remove('section-timer__button--pause');
                    button.classList.add('section-timer__button--play');
                }
                clearInterval(clockDown);
                createElement()
                audioEffect.play();
                audioEffect.loop = true
        
            }
        }, 1000)
    }
}
const playButtonEventListener = function () {
    button.addEventListener('click', function (e) {
        if (button.classList.contains('section-timer__button--play')) {
            e.stopImmediatePropagation();
            countDown();
            if(timerValue.value!='00h:00m:00s'){
                button.classList.remove('section-timer__button--play');
                button.classList.add('section-timer__button--pause');
            }
        }
    })
}
const pauseButtonEventListener = function () {
    button.addEventListener('click', function () {
        if (button.classList.contains('section-timer__button--pause')) {
            clearInterval(clockDown)
            button.classList.remove('section-timer__button--pause');
            button.classList.add('section-timer__button--play');
        }
    })
}


export default { timerValueFormatChacker, playButtonEventListener, pauseButtonEventListener };