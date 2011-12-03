Tranquil['reservation'] = Tranquil.buildPanel((5).minute(), function(obj, data) {
  var parts = {
    title: '{{title}}',
    reservation: '{{name}}',
    color: '',
    style: 'top: {{start}}px; height: {{length}}px; background-color: {{>color}}',
    _reservations: '{{#reservations}}<div class="res" style="{{>style}}"><div style="position: relative;">{{>reservation}}</div></div>{{/reservations}}',
  };

  data.dID = this.id + '-container';
  data.cID = this.id + '-canvas';

  if (obj.template) {
    if (obj.template.title)       { parts.title = obj.template.title }
    if (obj.template.reservation) { parts.reservation = obj.template.reservation }
    if (obj.template.color)       { parts.color = obj.template.color }
  }

  var t = new Date();
  if (!this.innerHTML) {
    // Render template
    var tmpl = '<div class="title">{{>title}}</div>';
    tmpl += '<div><div></div><div>';
    tmpl += '<div id="{{dID}}" style="background: -webkit-canvas({{cID}})">';
    tmpl += '{{>_reservations}}';
    tmpl += '</div></div></div>';
    this.innerHTML = Milk.render(tmpl, data, parts);

    // Draw background
    var canvas = document.getCSSCanvasContext("2d", data.cID, 40, 24 * 60);
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
  } else {
    document.getElementByID(dID).innerHTML = Milk.render(parts._reservations, data, parts);
  }

  var adjustScroll = (function() {
    var scrollTime = (t.getHours() - 1) * 60 + (t.getMinutes() + 1);
    scrollTime -= this.lastChild.getBoundingClientRect().height *0.25;
    this.lastChild.lastChild.scrollTop = scrollTime;

    Array.prototype.forEach.call(this.getElementsByClassName('res'), function(res) {
      var title = res.firstChild;
      if (res.offsetTop > scrollTime) return;
      title.style.top = Math.min(
        scrollTime - res.offsetTop,
        res.offsetHeight - title.offsetHeight - 8
      ) + 'px';
    });
  }).bind(this);

  setInterval(adjustScroll, 10000);
  adjustScroll();
});

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
    }
  };

  data = data.data;
  data.reservations = data.items.filter(isToday).map(buildReservation);
  return data;
}
