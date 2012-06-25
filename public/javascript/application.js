var Tranquil = {
  buildPanel: function(defaultInterval, fn) {
    defaultInterval || (1).hour();

    var func = function(obj) {
      var div = this;

      obj.filter = eval('(' + (obj.filter || function(x) { return x }) + ')');

      var update = function() {
        try {
          if (obj.url) reqwest({
            url: obj.url,
            type: 'jsonp',
            success: function(data) {
              data = obj.filter(data);
              fn.call(div, obj, data);
            },
          });
        } catch (e) {
          console.warn(e.message);
        }
      };

      if (obj.data) fn.call(div, obj, obj.filter(obj.data));
      update();

      var id = setInterval(update, obj.interval || defaultInterval);
      div.setAttribute('data-interval-id', id);
    };

    func.parameters = [
      {
        name: 'url',
        type: 'text',
        description: 'URL to fetch data from',
      },
      {
        name: 'interval',
        type: 'text',
        description: 'Polling frequency (in milliseconds)',
        default: defaultInterval,
      },
      {
        name: 'filter',
        type: 'text',
        description: 'A transformation function for the fetched data structure',
      },
      {
        name: 'data',
        type: 'object',
        description: 'Initial dataset; useful for prototyping',
      },
    ];

    return func;
  },
};

function listify(x) {
  return x ? (x instanceof Array ? x : [x]) : [];
}

// Modified From: https://gist.github.com/1680738
requireJavascript = function f(a,b){with(document)with(f[a]=f[a]||head.appendChild(createElement('script')))src=a,a=onload,id?b():onload=function(){b(id=1,a&&a());onload=a}};

function requireAllJavascript(scripts, callback) {
  scripts = listify(scripts).slice(0);
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
    document.head.insertBefore(tag, document.head.firstChild);
    return true;
  }
  return false;
}

function loadType(type, callback, error) {
  if (Tranquil[type]) { callback() }

  requireJavascript('/javascript/' + type + '.js', function() {
    if (!Tranquil[type]) { error && error() }

    listify(Tranquil[type].stylesheet).forEach(requireStylesheet);
    requireAllJavascript(Tranquil[type].javascript, callback);
  });
}

function diff(source, target) {
  source = JSON.parse(JSON.stringify(source)).map(JSON.stringify);
  target = JSON.parse(JSON.stringify(target)).map(JSON.stringify);

  var changes = [];

  while (source.length && target.length) {
    var oldVal = source.shift();
    var newVal = target.shift();

    var added   = target.indexOf(oldVal);
    var removed = source.indexOf(newVal);

    if (JSON.stringify(oldVal) == JSON.stringify(newVal)) {
      // If the values are the same, there was no change.
      changes.push({ action: 'keep', value: JSON.parse(newVal) });

    } else if (~added || ~removed) {
      // If the current value appears later in either array, we've something
      // has been changed between here and there.
      var inserting = ! ~removed || (~added && source.length < target.length);

      var row    = inserting ? target : source;
      var action = inserting ? 'insert' : 'delete';
      var value  = inserting ? newVal : oldVal;

      row.unshift(value);
      for (var i = 0; i <= (inserting ? added : removed); i++) {
        changes.push({ action: action, value: JSON.parse(row.shift()) });
      }
      changes.push({ action: 'keep', value: JSON.parse(row.shift()) });
    } else {
      // Otherwise, we should replace the old value with the new one.
      changes.push({ action: 'change', value: JSON.parse(newVal), previous: JSON.parse(oldVal) });
    }
  }

  // Add changes for anything remaining at the end of the list.
  source.forEach(function(val) {
    changes.push({ action: 'delete', value: JSON.parse(val) });
  });

  target.forEach(function(val) {
    changes.push({ action: 'insert', value: JSON.parse(val) });
  });

  return changes;
}

function walkDiff(source, target, callbacks) {
  diff(source, target).forEach(function(change) {
    if (callbacks[change.action]) {
      callbacks[change.action].call(callbacks, change.value, change.previous);
    }
  });
}

(function(Num) {
  Num.second = Num.seconds = function() { return this * 1000 };
  Num.minute = Num.minutes = function() { return this.seconds() * 60 };
  Num.hour   = Num.hours   = function() { return this.minutes() * 60 };
  Num.day    = Num.days    = function() { return this.hours() * 24 };
  Num.week   = Num.weeks   = function() { return this.days() * 7 };
})(Number.prototype);
