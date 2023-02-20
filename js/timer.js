const timerValue = document.querySelector('.timer__value');

const timerValueFormatChacker = function () {
    let formatExample = '00h:00m:00s'
    timerValue.addEventListener('keyup', function () {
        const format = /^\d?\d?h:\d?\d?m:\d?\d?s$/g;
        format.test(timerValue.value) ? formatExample = timerValue.value : null;

        const mIndex = [...timerValue.value].indexOf('m');
        const sIndex = [...timerValue.value].indexOf('s');

        const minutes = Number(timerValue.value.slice(mIndex-2, mIndex));
        const seconds = Number(timerValue.value.slice(sIndex-2, sIndex));

        if(minutes>60){
            let formatExampleArrCopy = [...formatExample];
            formatExampleArrCopy[mIndex-2]='6'
            formatExampleArrCopy[mIndex-1]='0';
            formatExample=formatExampleArrCopy.join('');
            console.log('Minutes - Too Much')
        }
        if(seconds>60){
            let formatExampleArrCopy = [...formatExample];
            formatExampleArrCopy[sIndex-2]='6'
            formatExampleArrCopy[sIndex-1]='0';
            formatExample=formatExampleArrCopy.join('');
            console.log('Seconds - Too Much')
        }
        timerValue.value = formatExample;
    })
}



export default { timerValueFormatChacker };