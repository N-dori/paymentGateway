type TimeRangeKey = 'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds';

function makeId(length: number = 5): string {
  let txt = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

// function debounce<T extends (...args: any[]) => void>(func: T, timeout: number = 300): (...args: Parameters<T>) => void {
//   let timer: any;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, timeout);
//   };
// }

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomName(): string {
  const names: string[] = [
    'Jhon', 'Wick', 'Strong', 'Dude', 'Yep', 'Hello', 'World',
    'Power', 'Goku', 'Super', 'Hi', 'You', 'Are', 'Awesome',
  ];
  const famName: string[] = [
    'star', 'kamikaza', 'family', 'eat', 'some', 'banana', 'brock',
    'david', 'gun', 'walk', 'talk', 'car', 'wing', 'yang', 'snow', 'fire'
  ];
  return names[Math.floor(Math.random() * names.length)] +
         famName[Math.floor(Math.random() * famName.length)];
}

function generateRandomImg(): string {
  return 'pro' + Math.floor(Math.random() * 17 + 1) + '.png';
}

function timeAgo(ms: Date | number = new Date()): string | undefined {
  const date = ms instanceof Date ? ms : new Date(ms);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges: Record<TimeRangeKey, number> = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (const key in ranges) {
    if (ranges[key as TimeRangeKey] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key as TimeRangeKey];
      let time = formatter.format(Math.round(delta), key as Intl.RelativeTimeFormatUnit);
      if (time.includes('in')) {
        time = time.replace('in ', '').replace('ago', '') + ' ago';
      }
      return time;
    }
  }
}

function randomPastTime(): number {
  const HOUR = 1000 * 60 * 60;
  const DAY = 1000 * 60 * 60 * 24;
  const WEEK = 1000 * 60 * 60 * 24 * 7;

  const pastTime = getRandomInt(HOUR, WEEK);
  return Date.now() - pastTime;
}

export {
  makeId,
  getRandomInt,
  // debounce,
  generateRandomName,
  timeAgo,
  generateRandomImg,
  randomPastTime
};