const toTimeStamp = seconds => {
  let minutes = 0;
  let hours = 0;
  while (seconds >= 60) {
    seconds -= 60;
    minutes += 1;
  }
  while (minutes >= 60) {
    hours += 1;
    minutes -= 60;
  }
  let finalString = '';
  if (hours > 0) {
    finalString += hours.toString() + ':';
  }
  if (minutes > 0) {
    if (minutes < 10) {
    }
    finalString += minutes + ':';
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  finalString += seconds;
  if (minutes === 0) {
    finalString = '0:' + finalString;
  }
  return finalString;
};
const toPostTimeString = ms => {
  let diff = Date.now() - ms;
  let m = Math.floor(diff / 1000 / 60);
  let h = 0;
  let d = 0;
  let finalString = '';
  while (m >= 60) {
    m -= 60;
    h += 1;
  }
  while (h >= 24) {
    h -= 24;
    d += 1;
  }
  if (d > 0) {
    finalString += d + 'd';
  } else if (h > 0) {
    finalString += h.toString() + 'h';
  } else if (m > 0) {
    finalString += m.toString() + 'm';
  }
  return finalString + ' ';
};
export {toTimeStamp, toPostTimeString};
