var Tranquil = {
  buildPanel: function(defaultInterval, fn) {
    return function(obj) {
      var div = this;
      obj.filter = eval('(' + (obj.filter || 'Object') + ')');

      div.update = function() {
        reqwest({
          url: obj.url,
          type: 'jsonp',
          success: function(data) {
            data = obj.filter(data);
            fn.call(div, obj, data);
          },
        });
      };

      div.update();
      setInterval(div.update, obj.interval || defaultInterval || 1000 * 60);
    }
  },
};

function requireJavascript(script, callback) {
  var tag = document.querySelectorAll('script[src="' + script + '"]')[0];
  if (tag) {
    var fn = tag.onload;
    tag.onload = function () { fn && fn(); callback() };
  } else {
    tag = document.createElement('script');
    tag.src = script;
    tag.type = 'text/javascript';
    tag.charset = 'utf-8';
    tag.onload = callback;
    document.head.appendChild(tag);
    return true;
  }
  return false;
}

function requireStylesheet(style) {
  if (!document.querySelectorAll('link[href="' + script + '"]')[0]) {
    var tag = document.createElement('link');
    tag.href = style;
    tag.rel = 'stylesheet';
    document.head.appendChild(tag);
    return true;
  }
  return false;
}

function buildLayout(layout) {
  if (!layout) { return }

  var table = document.createElement('table');
  table.id = 'layout';

  var elements = [];
  layout.forEach(function(row, i) {
    if (row.constructor != Array) { row = [row] }

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var divRow = document.createElement('div');
    td.className = 'table';
    divRow.className = 'row';

    tr.appendChild(td);
    td.appendChild(divRow);

    row.forEach(function(cell, j) {
      var div = document.createElement('div');
      div.className = 'cell ' + cell.type;
      div.id = 'cell-' + i + '-' + j;

      var fn = function() { (Tranquil[cell.type]).call(div, cell) };
      if (!(cell.type in Tranquil)) {
        requireJavascript('/javascript/' + cell.type + '.js', fn);
      } else {
        fn();
      }

      if ('height' in cell) { tr.style.height = cell.height }
      divRow.appendChild(div);
      elements.push(div);
    });

    table.appendChild(tr);
  });

  document.body.replaceChild(table, document.getElementById('layout'));
  return elements;
}
