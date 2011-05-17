Tranquil['countdown'] = function(obj) {
  var div = this;
  (function() {
    div.innerHTML = '';

    var eventName = document.createElement('span');
    eventName.className = 'event';
    var timeText = document.createElement('span');
    timeText.className = 'time';

    eventName.innerText = obj.event;

    var timeUntil = Date.now() - Date.parse(obj.date);
    timeUntil = (timeUntil / 1000 / 60 / 60 / 24) | 0;
    if (timeUntil) {
      var isPast = timeUntil < 0;
      timeUntil = Math.abs(timeUntil);
      timeText.innerText = timeUntil + ' day' + (timeUntil>1 ? 's' : '') + ' ';
      timeText.innerText += ['ago', 'from now'][isPast + 0];
    } else {
      timeText.innerText = 'today';
    }

    div.appendChild(eventName);
    div.appendChild(timeText);
    setTimeout(arguments.callee, 1000 * 60 * 60);
  })()
};
