Tranquil['reservation'] = Tranquil.buildPanel((5).minute(), function(obj, data) {
  var parts = {
    title: '{{title}}',
    reservation: '{{name}}',
    color: '',
    style: 'top: {{start}}px; height: {{length}}px; background-color: {{>color}}',
    _reservations: '{{#reservations}}<div class="res" style="{{>style}}"><div style="position: relative;">{{>reservation}}</div></div>{{/reservations}}',
  };

  if (obj.template) {
    if (obj.template.title)       { parts.title = obj.template.title }
    if (obj.template.reservation) { parts.reservation = obj.template.reservation }
    if (obj.template.color)       { parts.color = obj.template.color }
  }

  if (!Tranquil['reservation'].canvas) {
    // Draw background
    var canvas = Tranquil['reservation'].canvas = document.getCSSCanvasContext(
      '2d', 'reservation-background', 40, 24 * 60
    );
    canvas.fillStyle = '#BBB';
    canvas.font = "10px monospace";
    canvas.textBaseline = 'middle';
    for (var h = 0; h < 24; h++) {
      var off = h * 60;
      canvas.fillText((h % 12 + 1) + (h < 12 ? 'a' : 'p') + "m", 15, off);
      canvas.fillRect(0, off, 12, 1);
      canvas.fillRect(0, off + 15, 4, 1);
      canvas.fillRect(0, off + 30, 8, 1);
      canvas.fillRect(0, off + 45, 4, 1);
    }
  }

  if (!this.innerHTML) {
    // Render template
    var tmpl = '<div class="title">{{>title}}</div>';
    tmpl += '<div><div></div><div>';
    tmpl += '<div style="background: -webkit-canvas(reservation-background)">';
    tmpl += '{{>_reservations}}';
    tmpl += '</div></div></div>';
    this.innerHTML = Milk.render(tmpl, data, parts);
  } else {
    var rendered = Milk.render(parts._reservations, data, parts);
    this.lastChild.lastChild.firstChild.innerHTML = rendered;
  }

  var adjustScroll = (function() {
    var t = new Date();
    var scrollTime = (t.getHours() - 1) * 60 + (t.getMinutes() + 1);
    scrollTime -= this.lastChild.getBoundingClientRect().height *0.25;
    this.lastChild.lastChild.scrollTop = scrollTime;

    Array.prototype.forEach.call(this.getElementsByClassName('res'), function(res) {
      var title = res.firstChild;
      if (res.offsetTop > scrollTime) return;
      title.style.top = Math.min(
        scrollTime - res.offsetTop,
        res.offsetHeight - title.offsetHeight
      ) + 'px';
    });
  }).bind(this);

  var scrollerID = setInterval(adjustScroll, 1000);
  this.setAttribute('data-scroller-id', scrollerID);

  setTimeout(adjustScroll, 400);
});

Tranquil['reservation'].stylesheet = '/stylesheets/layout/reservation.css';
Tranquil['reservation'].javascript = '/javascript/vendor/milk.min.js';

Tranquil['reservation'].teardown = function(cell) {
  clearInterval(cell.getAttribute('data-scroller-id'));
};

Tranquil['reservation'].filterGCal = function(data) {
  var isToday = function(item) {
    if (item.status == "confirmed" && (item = item.when)) {
      var startDate = new Date(item[0].start);
      var today = new Date();
      return startDate.toDateString() == today.toDateString();
    }
    return false;
  };

  var buildReservation = function(item) {
    var start = new Date(item.when[0].start);
    var end   = new Date(item.when[0].end);
    return {
      name: item.title,
      start: (start.getHours() - 1) * 60 + start.getMinutes() - 1,
      length: (end - start) / (1).minutes(),
      rawItem: item,
    }
  };

  data = data.data;
  data.reservations = data.items.filter(isToday).map(buildReservation);
  return data;
}
