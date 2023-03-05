const timerValue = document.querySelector('.timer__value');
const button = document.querySelector('.button');

let hIndex, mIndex, sIndex;
let valueForUser = '00h:00m:00s';
let clockDown;

const timerIndexChecker = function () {
    hIndex = [...timerValue.value].indexOf('h');
    mIndex = [...timerValue.value].indexOf('m');
    sIndex = [...timerValue.value].indexOf('s');
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
        console.log(timeInSecounds)
    }
    if (timeInSecounds > 0) {
            clockDown = setInterval(() => {
            timeInSecounds--;
            const hoursLeft = Math.floor(timeInSecounds / 3600);
            const minutesLeft = Math.floor((timeInSecounds % 3600) / 60);
            const remainingSeconds = timeInSecounds % 60;
            valueForUser = `${hoursLeft}h:${minutesLeft}m:${remainingSeconds}s`;
            timerValue.value = valueForUser
            if (timeInSecounds == 0) {
                if (button.classList.contains('button--pause')) {
                    button.classList.remove('button--pause');
                    button.classList.add('button--play');
                }
                clearInterval(clockDown);
            }
        }, 1000)
    }
}
const playButtonEventListener = function () {
    button.addEventListener('click', function (e) {
        console.log(1)
        if (button.classList.contains('button--play')) {
            e.stopImmediatePropagation();
            countDown();
            button.classList.remove('button--play');
            button.classList.add('button--pause');
        }
    })
}
const pauseButtonEventListener = function () {
    button.addEventListener('click', function () {
        console.log(1);
        if (button.classList.contains('button--pause')) {
            clearInterval(clockDown)
            button.classList.remove('button--pause');
            button.classList.add('button--play');
        }
    })
}


export default { timerValueFormatChacker, playButtonEventListener, pauseButtonEventListener };