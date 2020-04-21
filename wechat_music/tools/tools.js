//防抖
function debounce(fn, interval) {
  let timeout = null;
  return function (ev) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.call(this,ev);
    }, interval);
  }
}

module.exports = {
  debounce
}