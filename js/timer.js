const timerValue = document.querySelector('.timer__value');

const timerValueFormatChacker = function () {
    let formatExample = "00:00:00"
    timerValue.addEventListener('keyup', function () {
        const format = /^\d?\d?:\d?\d?:\d?\d?$/g;
        format.test(timerValue.value) ? formatExample = timerValue.value : timerValue.value = formatExample;
    })
}



export default { timerValueFormatChacker };