Tranquil['ticker'] = Tranquil.buildPanel((60).seconds(), function(obj, data) {
  if (!this.childNodes.length) {
    this.appendChild(document.createElement('div'));
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
    var tmpl = '{{#.}}' + obj.template + '{{/.}}';
    div.innerHTML += Milk.render(tmpl, data);
  }
});
