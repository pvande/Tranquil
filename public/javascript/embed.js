Tranquil['embed'] = function(obj) {
  this.innerHTML = "<iframe src=\"" + obj.url + "\" />";

  if (obj.interval) {
    var iframe = this.childNodes[0];
    var id = setInterval(function() { iframe.src += '' }, obj.interval);
    this.setAttribute('data-interval-id', id);
  }
};

Tranquil['embed'].parameters = [
  { name: 'url', type: 'url' },
];
