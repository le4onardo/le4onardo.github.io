export default class Repeater {
  private processID = 0;

  start = (callback: () => void, duration = 0) => {
    this.processID = window.setInterval(callback, 10);
    duration && setTimeout(this.stop, duration);
  };

  stop = () => {
    clearInterval(this.processID);
  };
}
