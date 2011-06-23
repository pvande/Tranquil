Tranquil['reservation'] = Tranquil.buildPanel((1).minute(), function(obj, data) {
  var parts = {
    title: '{{title}}',
    reservation: '{{name}}',
    style: 'top: {{start}}px; height: {{length}}px; background-color: {{color}}',
  };

  data.dID = this.id + '-container';
  data.cID = this.id + '-canvas';

  if (obj.template) {
    if (obj.template.title)       { parts.title = obj.template.title }
    if (obj.template.reservation) { parts.title = obj.template.reservation }
  }

  var t = new Date();
  if (!this.innerHTML) {
    var tmpl = '<div class="title">{{>title}}</div>';
    tmpl += '<div><div></div><div>';
    tmpl += '<div id="{{dID}}" style="background: -webkit-canvas({{cID}})">';
    tmpl += '{{#reservations}}';
    tmpl += '<div class="res" style="{{>style}}">{{>reservation}}</div>';
    tmpl += '{{/reservations}}';
    tmpl += '</div></div></div>';
    this.innerHTML = Milk.render(tmpl, data, parts);

    var canvas = document.getCSSCanvasContext("2d", data.cID, 40, 24 * 60);
    canvas.fillStyle = '#BBB';
    canvas.font = "10px monospace";
    canvas.textBaseline = 'middle';
    for (var hour = 0; hour < 24; hour++) {
      var off = hour * 60;
      canvas.fillText((hour % 12 + 1) + (hour < 12 ? 'a' : 'p') + "m", 15, off);
      canvas.fillRect(0, off, 12, 1);
      canvas.fillRect(0, off + 15, 4, 1);
      canvas.fillRect(0, off + 30, 8, 1);
      canvas.fillRect(0, off + 45, 4, 1);
    }
  }

  var scrollTime = (t.getHours() - 1) * 60 + (t.getMinutes() + 1) -
                   this.lastChild.getBoundingClientRect().height *0.25;
  this.lastChild.lastChild.scrollTop = scrollTime;
});
