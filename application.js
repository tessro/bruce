document.addEventListener('DOMContentLoaded', ready);

function ready() {
  var el = document.getElementById('canvas');
  canvas = new Canvas(el);
  canvas.start();
}

function Canvas(el) {
  this._canvas = el;
  this._width = 100;
  this._source = 'Learn the principle, abide by the principle, and dissolve the principle. In short, enter a mold without being caged in it. Obey the principle without being bound by it. LEARN, MASTER AND ACHIEVE!';
  this._sourceIndex = this._source.length - 1;
  this.initCanvas();
}

Canvas.prototype.start = function() {
  this._running = true;

  var self = this;
  this._intervalId = setInterval(function() {
    if (self._running) {
      self.tick();
    }
  }, 500);
}

Canvas.prototype.stop = function() {
  this._running = false;
  cancelInterval(this._intervalId);
}

Canvas.prototype.tick = function() {
  this.prepend(this._source[this._sourceIndex]);
  this._sourceIndex--;
  if (this._sourceIndex < 0) this._sourceIndex = this._source.length - 1;

  var str = this._string.get();
  var out = '';

  for (var i = 0; i < str.length; i += this._width) {
    out += str.substring(i, i + this._width) + '\n';
  }

  this._canvas.innerText = out;
}

Canvas.prototype.prepend = function(c) {
  this._root.push(c);
}

Canvas.prototype.initCanvas = function() {
  var input = this._canvas.innerText;
  this._width = input.indexOf('\n') || input.length;
  this._string = new MutableString(input.replace(/\n/g, ''));

  var cur = null;
  var str = this._string.get();
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) != ' ') {
      var node = new Node(this._string, i);
      if (cur) {
        cur.next = node;
      } else {
        this._root = node;
      }

      cur = node;
    }
  }
}

function Node(str, idx) {
  this._string = str;
  this._index  = idx;
  this.next    = null;
}

Node.prototype.setValue = function(v) {
  this._string.setCharAt(this._index, v);
}

Node.prototype.getValue = function() {
  return this._string.charAt(this._index);
}

Node.prototype.push = function(c) {
  var old = this.getValue();
  this.setValue(c);
  if (this.next) {
    this.next.push(old);
  }
}

function MutableString(s) {
  this._string = s;
}

MutableString.prototype.setCharAt = function(idx, s) {
  this._string = this._string.substring(0, idx) + s + this._string.substring(idx + 1);
}

MutableString.prototype.charAt = function(idx) {
  return this._string[idx];
}

MutableString.prototype.get = function() {
  return this._string;
}
