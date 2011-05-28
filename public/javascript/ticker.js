Tranquil['ticker'] = Tranquil.buildPanel((30).seconds(), function(obj, data) {
  function appendData(div) {
    var tmpl = '{{#.}}' + obj.template + '{{/.}}';
    div.innerHTML += Milk.render(tmpl, data);
  }

  if (!this.childNodes.length) {
    this.appendChild(document.createElement('div'));
    return appendData(this.firstChild);
  }

  var div = this.firstChild;

  var oldNodes = Array.prototype.filter.call(div.children, function(node) {
    return node.getBoundingClientRect().right < -10;
  });
  
  if (div.offsetWidth == this.offsetWidth) {
    oldNodes.forEach(function(node) {
      div.scrollLeft -= node.nextElementSibling.offsetLeft - node.offsetLeft
      div.removeChild(node);
    });

    var last = div.lastChild;
    var bufferWidth = last ? last.offsetLeft + last.offsetWidth : 0;
    if (bufferWidth - div.scrollLeft < (3 * div.offsetWidth)) {
      appendData(div);
    }
  } else {
    appendData(div);
  }
});
