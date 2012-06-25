Tranquil['ticker'] = Tranquil.buildPanel((1).minute(), function(obj, data) {
  (obj.template = obj.template || {}).__proto__ = Tranquil['ticker'].template;

  if (!this.children.length) {
    var newChild = document.createElement('div');

    if (typeof obj.speed != 'undefined') {
      newChild.style['-webkit-marquee-speed'] = obj.speed + 'ms';
    }

    this.appendChild(newChild);
  }

  var div = this.firstChild;
  var newest = div.lastChild;

  var bufferWidth = newest ? newest.offsetLeft + newest.offsetWidth : 0;
  bufferWidth -= div.scrollLeft;

  // If we have more elements in our buffer than fit onscreen at any given
  // time, we'll trim off some of the oldest ones.
  if (bufferWidth > div.offsetWidth) {
    Array.prototype.forEach.call(div.children, function(e) {
      if (e.getBoundingClientRect().right < -10) {
        div.scrollLeft -= e.nextElementSibling.offsetLeft - e.offsetLeft;
        div.removeChild(e);
      }
    });
  }

  // If we have less than ten screen's widths of data buffered, we'll append
  // the data we just queried.
  if (bufferWidth < (10 * div.offsetWidth)) {
    var template = '{{#.}}{{>element}}{{/.}}';
    div.innerHTML += Milk.render(template, data, obj.template);
  }
});

Tranquil['ticker'].stylesheet = '/stylesheets/layout/ticker.css';
Tranquil['ticker'].javascript = '/javascript/vendor/milk.min.js';

Tranquil['ticker'].parameters.push({
  name: 'speed',
  type: 'number',
  default: 25,
  description: 'The scrolling speed of the ticker (in milliseconds)'
});

Tranquil['ticker'].template = {
  element: '<span>{{.}}</span>',
};
