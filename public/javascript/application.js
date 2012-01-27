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
      var interval = obj.interval || defaultInterval || (1).hour();
      setInterval(div.update, interval);
    }
  },
};

// From: https://gist.github.com/1680738
requireJavascript = function R(s,c,d,t){d=document,R[s]=t=R[s]||d.head.appendChild(d.createElement('script')),d=t.onload;t.x?c():t.onload=function(){c(t.x=1,d&&d())},t.src=s};

function requireAllJavascript(scripts, callback) {
  scripts = (scripts || []).slice(0);
  if (!scripts.length) return callback();

  scripts.forEach(function(script) {
    requireJavascript(script, function() {
      scripts = scripts.filter(function(s) {
        return s !== script;
      });
      if (!scripts.length) callback();
    });
  });
}

function requireStylesheet(style) {
  if (!document.querySelectorAll('link[href="' + style + '"]')[0]) {
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

      var fn = function() {
        var type = Tranquil[cell.type];
        if (!type)
          return div.innerHTML = "Could not load type '" + cell.type + "'!";

        requireAllJavascript(type.javascript, function() {
          Tranquil[cell.type].call(div, cell);
        }, cell.type);
      };
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

(function(Num) {
  Num.second = Num.seconds = function() { return this * 1000 };
  Num.minute = Num.minutes = function() { return this.seconds() * 60 };
  Num.hour   = Num.hours   = function() { return this.minutes() * 60 };
  Num.day    = Num.days    = function() { return this.hours() * 24 };
  Num.week   = Num.weeks   = function() { return this.days() * 7 };
})(Number.prototype);
