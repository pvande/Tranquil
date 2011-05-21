Tranquil['table'] = function(obj) {
  var div = this;
  div.innerHTML = div.innerHTML || '<table></table>';

  var rows = [];
  var table = document.createElement('table');
  for (var i = 0; i < obj.data.length; i++) {
    var cells = [];
    rows.push(cells);
    var row = obj.data[i];
    var tr = document.createElement('tr');
    for (var j = 0; j < row.length; j++) {
      var td = document.createElement('td');
      cells.push(td);
      td.innerHTML = row[j] || '';
      td.style.cssText = obj.styles[j];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  div.replaceChild(table, div.childNodes[0])

  if (obj.init) {
    eval('('+obj.init+')').call(obj, rows);
  }

  if (obj.update) {
    var update = eval('('+obj.update+')');
    div.update = function() { update.call(obj, rows) };
    div.update();
    setInterval(div.update, obj.interval || 60000);
  }
};
