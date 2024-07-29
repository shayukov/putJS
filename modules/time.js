const { arrStrongKm,arrStrongAdress} = require('./textData_m');
const servTime = require('../server');
const {msToTime, strToTime, pathToTime} = require('./msAndStrToTime');

const startOfTheDay = '08:40';
const startLunch = '12:00';
const endLunch = '12:45';

function timeData() {
  const zTime = servTime.reqQuery.refillTime,
        zTimeStart = strToTime(zTime) - strToTime('00:05'),
        zTimeEnd = strToTime(zTime) + strToTime('00:05'),
        friday = servTime.reqQuery.friday,
        endOfTheDay = friday == '' ? '16:10' : '17:20',
        arrMinute = [],
        waitMl = strToTime('00:05'),
        startOfTheDayMl = strToTime(startOfTheDay),
        endOfTheDayMl = strToTime(endOfTheDay),
        startLunchMl = strToTime(startLunch),
        endLunchMl = strToTime(endLunch);


  let sumMinute = startOfTheDayMl,
      m = '',
      difference2 = 0,
      difference = difference2,
      sMr = 0,
      r = 0;



  kmSplice = [];
  adressSplice = [];

  let arrStrongKmLength = Math.round(arrStrongKm.length / 2),
      sumM = startOfTheDayMl;
  
  if(zTime == '') {
    // до обеда
    //========================================================================
    for (let i = 0; i < arrStrongKmLength; i++) {
      m = pathToTime(arrStrongKm,i)
      sumM += m
      sumM += waitMl
      sumM += m
      sumM += waitMl
    }
    difference2 = startLunchMl - sumM
    difference = Math.floor((difference2/arrStrongKmLength)/3)
    
    for (r; r < arrStrongKmLength; r++) {
      m = pathToTime(arrStrongKm,r)
      arrMinute.push(msToTime(sumMinute) + '-')
      sumMinute += m + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
      sumMinute += waitMl + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
      sumMinute += m + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
      sumMinute += waitMl
    }
    //===============================================================================

    // после обеда
    //==============================================================================
    sumMinute = endLunchMl
    sumM = endLunchMl
    arrStrongKmLength = arrStrongKm.length - arrStrongKmLength
    let i = r
    for (i ; i < arrStrongKm.length; i++) {
      m = pathToTime(arrStrongKm,i)
      sumM += m
      sumM += waitMl
      sumM += m
      sumM += waitMl
    }
    difference2 = endOfTheDayMl - sumM
    difference = Math.floor((difference2/arrStrongKmLength)/3)

    for (r; r < arrStrongKm.length; r++) {
      m = pathToTime(arrStrongKm,r)
      arrMinute.push(msToTime(sumMinute) + '-')
      sumMinute += m + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
      sumMinute += waitMl + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
      sumMinute += m + difference 
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
      sumMinute += waitMl
    }
  } else {
    // если заправка есть
    // до обеда
    //========================================================================
    //========================================================================

    let sM = sumMinute,
        z = 0;

    //установка заправки на своё место в списке
    for (let i = 1; i < arrStrongKm.length; i++) {
      let sM2 = sM
      m = pathToTime(arrStrongKm,i)
      sM += m
      sM += waitMl
      sM += m
      sM += waitMl
      if(sM < zTimeStart) {
        kmSplice = arrStrongKm.splice(i,1)
        arrStrongKm.splice(0,0,kmSplice[0])
        adressSplice = arrStrongAdress.splice(i,1)
        arrStrongAdress.splice(0,0,adressSplice[0])
        z++
      }else {
        sM = sM2
        continue
      }
    }
    //==============================================================================
    for(r; r < z; r++) {
      m = pathToTime(arrStrongKm,r)
      arrMinute.push(msToTime(sumMinute) + '-')
      sumMinute += m
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
      sumMinute += waitMl
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
      sumMinute += m 
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
      sumMinute += waitMl
    }
    m = pathToTime(arrStrongKm,r)
    arrMinute.push(msToTime(sumMinute) + '-')
    sumMinute += m
    arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
    sumMinute = zTimeEnd 
    arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
    sumMinute += m
    arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
    sumMinute += waitMl
    r++

    // let u = r
    sumM = sumMinute
    // arrStrongKmSplice = [];
    // arrStrongAdressSplice = [];

    difference2 = startLunchMl - sumM
    try{
      difference = Math.floor((difference2/arrStrongKmLength-r)/3)
    }catch(err) {
      m = pathToTime(arrStrongKm,r)
      arrMinute.push(msToTime(sumMinute) + '-')
      sumMinute += m
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
      sumMinute = zTimeEnd 
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
      sumMinute += m
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
      sumMinute += waitMl
      r++
  
    }

    
    for (r; r < arrStrongKmLength; r++) {
      m = pathToTime(arrStrongKm,r)
      arrMinute.push(msToTime(sumMinute) + '-')
      sumMinute += m + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
      sumMinute += waitMl + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
      sumMinute += m + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
      sumMinute += waitMl
    }

    // после обеда
    //==============================================================================
    sumMinute = endLunchMl
    sumM = endLunchMl
    arrStrongKmLength = arrStrongKm.length - arrStrongKmLength
    let i = r
    for (i ; i < arrStrongKm.length; i++) {
      m = pathToTime(arrStrongKm,i)
      sumM += m
      sumM += waitMl
      sumM += m
      sumM += waitMl
    }
    difference2 = endOfTheDayMl - sumM
    difference = Math.floor((difference2/arrStrongKmLength)/3)

    for (r; r < arrStrongKm.length; r++) {
      m = pathToTime(arrStrongKm,r)
      arrMinute.push(msToTime(sumMinute) + '-')
      sumMinute += m + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
      sumMinute += waitMl + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
      sumMinute += m + difference 
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
      sumMinute += waitMl
    }

  }
//==============================================================================
//==============================================================================

  arr = arrMinute.join('')
  return arr
}

module.exports.timeData = timeData;
// module.exports.arrStrongAdress = arrStrongAdress;