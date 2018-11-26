import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1000,
  duration: '60s',
  rps: 1000
};

const min = 40000000;
const max = 60000000;
const randNum = Math.floor(Math.random() * (max - min + 1)) + min;

// export default function() {
//   http.get(`http://localhost:3000/api/${randNum}/updates`);
//   sleep(1);
// }

export default function() {
  const res = http.get(`http://localhost:3000/api/${randNum}/updates`);
  check(res, {
    'is status 200': r => r.status === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });
  sleep(1);
}