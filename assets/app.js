function init(){
  const target = new Date("January 1, 2022").getTime();
  const today = new Date().getTime();
  
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 12 * month;
  
  const delta = target - today;

  document.querySelector('#yearText').textContent = Math.floor(delta / year);
  document.querySelector('#monthText').textContent = Math.floor((delta % year) / month);
  document.querySelector('#dayText').textContent = Math.floor((delta % month) / day);
  document.querySelector('#hourText').textContent = Math.floor((delta % day) / hour);
  document.querySelector('#minuteText').textContent = Math.floor((delta % hour) / minute);
  document.querySelector('#secondText').textContent = Math.floor((delta % minute) / second);
}

setInterval(() => init(), 1000);