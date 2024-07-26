const { arrStrongKm,arrStrongAdress} = require('./textData_m');
const serv2 = require('../server');
const {msToTime, strToTime, pathToTime} = require('./msAndStrToTime');

const startOfTheDay = '08:40';
const startLunch = '12:00';
const endLunch = '12:45';

function timeData() {
  const friday = serv2.reqQuery.friday;
  let endOfTheDay = friday == '' ? '16:10' : '17:20';
  // const z_time = serv.reqQuery.refillTime,
  //   z_timeStart = strToTime(z_time) - strToTime('00:05'),
  //   z_timeEnd = strToTime(z_time) + strToTime('00:05');

  const arrMinute = []
  const waitMl = strToTime('00:05'),
    startOfTheDayMl = strToTime(startOfTheDay),
    endOfTheDayMl = strToTime(endOfTheDay),
    startLunchMl = strToTime(startLunch),
    endLunchMl = strToTime(endLunch);

  let sumMinute = startOfTheDayMl;
  let m = '';


  let difference2 = 0,
    difference = difference2

  let sMr = 0
  let r = 0
  kmSplice = [];
  //     kmSplice = arrStrongKm.splice(r,1)
  //     arrStrongKm.splice(aML,0,kmSplice[0])

  let arrStrongKmLength = Math.round(arrStrongKm.length / 2)
  let sumM = startOfTheDayMl

  
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
//==============================================================================

  arr = arrMinute.join('')
  return arr
}

module.exports.timeData = timeData;