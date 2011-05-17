var Tranquil = { };

function requireJavascript(script, callback) {
  if (!document.querySelectorAll('script[src="' + script + '"]')[0]) {
    var tag = document.createElement('script');
    tag.src = script;
    tag.type = 'text/javascript';
    tag.charset = 'utf-8';
    tag.onload = callback;
    document.head.appendChild(tag);
    return true;
  } else {
    callback();
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
      div.className = 'cell';
      div.id = 'cell-' + i + '-' + j;

      var fn = function() { (Tranquil[cell.type] || Object).call(div, cell) };
      if (!(cell.type in Tranquil)) {
        requireJavascript('/javascript/' + cell.type + '.js', fn);
      } else {
        fn();
      }

      if ('height' in cell) { tr.style.height = cell.height }
      divRow.appendChild(div);
    });

    table.appendChild(tr);
  });

  document.body.replaceChild(table, document.getElementById('layout'));
}
