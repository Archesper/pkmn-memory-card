const timedPromise = (time) => new Promise((resolve, reject) => setTimeout(resolve, time));
export default timedPromise; 