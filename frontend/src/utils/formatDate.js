
const formatDate = (date) => {
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);
  if (day[0] === '0') day = day[1];
  let tIndex = date.indexOf('T');
  let dateShort = [day, month].join('.');
  let timeShort = date.slice(tIndex + 1, tIndex + 6);
  return { date: dateShort, time: timeShort };
}


export default formatDate; 