const containerEl = document.querySelector('.container');
const timezoneEl = document.querySelector('.timezone');
const hoursColorEl = document.querySelector('.hours__circle--color');
const hoursEl = document.querySelector('.hours');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const weekdayEl = document.querySelector('.weekday');
const timeEl = document.querySelector('.time');
const ampmEl = document.querySelector('.ampm');
const changeModeEl = document.querySelector('.change-mode');
let timeZone = 'Asia/Taipei';

changeModeEl.addEventListener('click', () =>
  containerEl.classList.toggle('white-mode')
);

timezoneEl.addEventListener('change', (e) => {
  timeZone = e.target.value;
  renderTimeHandler();
});
function renderTimeHandler() {
  const { weekday, hours, minute, second } = getTime();
  hoursColorEl.style.strokeDashoffset = 848 - (848 * hours) / 12;
  hoursEl.style.transform = `rotate(${(360 / 12) * hours + 90}deg)`;
  minuteEl.style.transform = `rotate(${(360 / 60) * minute + 90}deg)`;
  secondEl.style.transform = `rotate(${(360 / 60) * second + 90}deg)`;
  weekdayEl.innerText = weekday;
  timeEl.innerText = `${
    12 > hours
      ? hours
      : hours - 12 < 10
      ? String(hours - 12).padStart(2, '0')
      : hours - 12
  }:${minute > 10 ? minute : String(minute).padStart(2, '0')}:${
    second > 10 ? second : String(second).padStart(2, '0')
  }`;
  ampmEl.innerText = hours > 12 ? 'PM' : 'AM';
}

function getTime() {
  const locale = 'en-US';
  const optionWeekday = {
    timeZone,
    weekday: 'long',
  };
  const optionHour = {
    timeZone,
    hour12: false,
    hour: 'numeric',
  };
  const optionMinute = {
    timeZone,
    minute: 'numeric',
  };
  const optionSecond = {
    timeZone,
    second: 'numeric',
  };
  return {
    weekday: new Date().toLocaleString(locale, optionWeekday),
    hours: new Date().toLocaleString(locale, optionHour),
    minute: new Date().toLocaleString(locale, optionMinute),
    second: new Date().toLocaleString(locale, optionSecond),
  };
}

setInterval(renderTimeHandler, 1000);
