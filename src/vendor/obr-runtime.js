// Vendored Owlbear client runtime extracted from the recovered extension bundle.
var oe = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class ub {
  constructor(s) {
    this.messageBus = s;
  }
  get id() {
    if (!this.messageBus.userId) throw Error("Unable to get user ID: not ready");
    return this.messageBus.userId;
  }
  getSelection() {
    return oe(this, void 0, void 0, (function*() {
      const {selection: s} = yield this.messageBus.sendAsync("OBR_PLAYER_GET_SELECTION", {});
      return s;
    }));
  }
  select(s, r) {
    return oe(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
        items: s,
        replace: r
      });
    }));
  }
  deselect(s) {
    return oe(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_PLAYER_DESELECT", {
        items: s
      });
    }));
  }
  getName() {
    return oe(this, void 0, void 0, (function*() {
      const {name: s} = yield this.messageBus.sendAsync("OBR_PLAYER_GET_NAME", {});
      return s;
    }));
  }
  setName(s) {
    return oe(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_PLAYER_SET_NAME", {
        name: s
      });
    }));
  }
  getColor() {
    return oe(this, void 0, void 0, (function*() {
      const {color: s} = yield this.messageBus.sendAsync("OBR_PLAYER_GET_COLOR", {});
      return s;
    }));
  }
  setColor(s) {
    return oe(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_PLAYER_SET_COLOR", {
        color: s
      });
    }));
  }
  getSyncView() {
    return oe(this, void 0, void 0, (function*() {
      const {syncView: s} = yield this.messageBus.sendAsync("OBR_PLAYER_GET_SYNC_VIEW", {});
      return s;
    }));
  }
  setSyncView(s) {
    return oe(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_PLAYER_SET_SYNC_VIEW", {
        syncView: s
      });
    }));
  }
  getId() {
    return oe(this, void 0, void 0, (function*() {
      const {id: s} = yield this.messageBus.sendAsync("OBR_PLAYER_GET_ID", {});
      return s;
    }));
  }
  getRole() {
    return oe(this, void 0, void 0, (function*() {
      const {role: s} = yield this.messageBus.sendAsync("OBR_PLAYER_GET_ROLE", {});
      return s;
    }));
  }
  getMetadata() {
    return oe(this, void 0, void 0, (function*() {
      const {metadata: s} = yield this.messageBus.sendAsync("OBR_PLAYER_GET_METADATA", {});
      return s;
    }));
  }
  setMetadata(s) {
    return oe(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_PLAYER_SET_METADATA", {
        update: s
      });
    }));
  }
  hasPermission(s) {
    return oe(this, void 0, void 0, (function*() {
      if ((yield this.getRole()) === "GM") return !0;
      const {permissions: u} = yield this.messageBus.sendAsync("OBR_ROOM_GET_PERMISSIONS", {});
      return u.indexOf(s) > -1;
    }));
  }
  getConnectionId() {
    return oe(this, void 0, void 0, (function*() {
      const {connectionId: s} = yield this.messageBus.sendAsync("OBR_PLAYER_GET_CONNECTION_ID", {});
      return s;
    }));
  }
  onChange(s) {
    const r = u => {
      s(u.player);
    };
    return this.messageBus.send("OBR_PLAYER_SUBSCRIBE", {}), this.messageBus.on("OBR_PLAYER_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_PLAYER_UNSUBSCRIBE", {}), this.messageBus.off("OBR_PLAYER_EVENT_CHANGE", r);
    };
  }
}

var Ye = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class rb {
  constructor(s) {
    this.messageBus = s;
  }
  reset() {
    return Ye(this, void 0, void 0, (function*() {
      const {transform: s} = yield this.messageBus.sendAsync("OBR_VIEWPORT_RESET", {});
      return s;
    }));
  }
  animateTo(s) {
    return Ye(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_VIEWPORT_ANIMATE_TO", {
        transform: s
      });
    }));
  }
  animateToBounds(s) {
    return Ye(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_VIEWPORT_ANIMATE_TO_BOUNDS", {
        bounds: s
      });
    }));
  }
  getPosition() {
    return Ye(this, void 0, void 0, (function*() {
      const {position: s} = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_POSITION", {});
      return s;
    }));
  }
  setPosition(s) {
    return Ye(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_VIEWPORT_SET_POSITION", {
        position: s
      });
    }));
  }
  getScale() {
    return Ye(this, void 0, void 0, (function*() {
      const {scale: s} = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_SCALE", {});
      return s;
    }));
  }
  setScale(s) {
    return Ye(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_VIEWPORT_SET_SCALE", {
        scale: s
      });
    }));
  }
  getWidth() {
    return Ye(this, void 0, void 0, (function*() {
      const {width: s} = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_WIDTH", {});
      return s;
    }));
  }
  getHeight() {
    return Ye(this, void 0, void 0, (function*() {
      const {height: s} = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_HEIGHT", {});
      return s;
    }));
  }
  transformPoint(s) {
    return Ye(this, void 0, void 0, (function*() {
      const {point: r} = yield this.messageBus.sendAsync("OBR_VIEWPORT_TRANSFORM_POINT", {
        point: s
      });
      return r;
    }));
  }
  inverseTransformPoint(s) {
    return Ye(this, void 0, void 0, (function*() {
      const {point: r} = yield this.messageBus.sendAsync("OBR_VIEWPORT_INVERSE_TRANSFORM_POINT", {
        point: s
      });
      return r;
    }));
  }
}

function cb(o) {
  return typeof o.id == "string";
}

var Ss = {
  exports: {}
}, mh;

function db() {
  if (mh) return Ss.exports;
  mh = 1;
  var o = typeof Reflect == "object" ? Reflect : null, s = o && typeof o.apply == "function" ? o.apply : function(B, k, z) {
    return Function.prototype.apply.call(B, k, z);
  }, r;
  o && typeof o.ownKeys == "function" ? r = o.ownKeys : Object.getOwnPropertySymbols ? r = function(B) {
    return Object.getOwnPropertyNames(B).concat(Object.getOwnPropertySymbols(B));
  } : r = function(B) {
    return Object.getOwnPropertyNames(B);
  };
  function u(N) {
    console && console.warn && console.warn(N);
  }
  var m = Number.isNaN || function(B) {
    return B !== B;
  };
  function h() {
    h.init.call(this);
  }
  Ss.exports = h, Ss.exports.once = ut, h.EventEmitter = h, h.prototype._events = void 0, 
  h.prototype._eventsCount = 0, h.prototype._maxListeners = void 0;
  var y = 10;
  function T(N) {
    if (typeof N != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof N);
  }
  Object.defineProperty(h, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return y;
    },
    set: function(N) {
      if (typeof N != "number" || N < 0 || m(N)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + N + ".");
      y = N;
    }
  }), h.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), 
    this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, h.prototype.setMaxListeners = function(B) {
    if (typeof B != "number" || B < 0 || m(B)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + B + ".");
    return this._maxListeners = B, this;
  };
  function O(N) {
    return N._maxListeners === void 0 ? h.defaultMaxListeners : N._maxListeners;
  }
  h.prototype.getMaxListeners = function() {
    return O(this);
  }, h.prototype.emit = function(B) {
    for (var k = [], z = 1; z < arguments.length; z++) k.push(arguments[z]);
    var I = B === "error", q = this._events;
    if (q !== void 0) I = I && q.error === void 0; else if (!I) return !1;
    if (I) {
      var V;
      if (k.length > 0 && (V = k[0]), V instanceof Error) throw V;
      var bt = new Error("Unhandled error." + (V ? " (" + V.message + ")" : ""));
      throw bt.context = V, bt;
    }
    var Dt = q[B];
    if (Dt === void 0) return !1;
    if (typeof Dt == "function") s(Dt, this, k); else for (var Vt = Dt.length, te = X(Dt, Vt), z = 0; z < Vt; ++z) s(te[z], this, k);
    return !0;
  };
  function g(N, B, k, z) {
    var I, q, V;
    if (T(k), q = N._events, q === void 0 ? (q = N._events = Object.create(null), N._eventsCount = 0) : (q.newListener !== void 0 && (N.emit("newListener", B, k.listener ? k.listener : k), 
    q = N._events), V = q[B]), V === void 0) V = q[B] = k, ++N._eventsCount; else if (typeof V == "function" ? V = q[B] = z ? [ k, V ] : [ V, k ] : z ? V.unshift(k) : V.push(k), 
    I = O(N), I > 0 && V.length > I && !V.warned) {
      V.warned = !0;
      var bt = new Error("Possible EventEmitter memory leak detected. " + V.length + " " + String(B) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      bt.name = "MaxListenersExceededWarning", bt.emitter = N, bt.type = B, bt.count = V.length, 
      u(bt);
    }
    return N;
  }
  h.prototype.addListener = function(B, k) {
    return g(this, B, k, !1);
  }, h.prototype.on = h.prototype.addListener, h.prototype.prependListener = function(B, k) {
    return g(this, B, k, !0);
  };
  function p() {
    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 
    arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function R(N, B, k) {
    var z = {
      fired: !1,
      wrapFn: void 0,
      target: N,
      type: B,
      listener: k
    }, I = p.bind(z);
    return I.listener = k, z.wrapFn = I, I;
  }
  h.prototype.once = function(B, k) {
    return T(k), this.on(B, R(this, B, k)), this;
  }, h.prototype.prependOnceListener = function(B, k) {
    return T(k), this.prependListener(B, R(this, B, k)), this;
  }, h.prototype.removeListener = function(B, k) {
    var z, I, q, V, bt;
    if (T(k), I = this._events, I === void 0) return this;
    if (z = I[B], z === void 0) return this;
    if (z === k || z.listener === k) --this._eventsCount === 0 ? this._events = Object.create(null) : (delete I[B], 
    I.removeListener && this.emit("removeListener", B, z.listener || k)); else if (typeof z != "function") {
      for (q = -1, V = z.length - 1; V >= 0; V--) if (z[V] === k || z[V].listener === k) {
        bt = z[V].listener, q = V;
        break;
      }
      if (q < 0) return this;
      q === 0 ? z.shift() : P(z, q), z.length === 1 && (I[B] = z[0]), I.removeListener !== void 0 && this.emit("removeListener", B, bt || k);
    }
    return this;
  }, h.prototype.off = h.prototype.removeListener, h.prototype.removeAllListeners = function(B) {
    var k, z, I;
    if (z = this._events, z === void 0) return this;
    if (z.removeListener === void 0) return arguments.length === 0 ? (this._events = Object.create(null), 
    this._eventsCount = 0) : z[B] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete z[B]), 
    this;
    if (arguments.length === 0) {
      var q = Object.keys(z), V;
      for (I = 0; I < q.length; ++I) V = q[I], V !== "removeListener" && this.removeAllListeners(V);
      return this.removeAllListeners("removeListener"), this._events = Object.create(null), 
      this._eventsCount = 0, this;
    }
    if (k = z[B], typeof k == "function") this.removeListener(B, k); else if (k !== void 0) for (I = k.length - 1; I >= 0; I--) this.removeListener(B, k[I]);
    return this;
  };
  function G(N, B, k) {
    var z = N._events;
    if (z === void 0) return [];
    var I = z[B];
    return I === void 0 ? [] : typeof I == "function" ? k ? [ I.listener || I ] : [ I ] : k ? it(I) : X(I, I.length);
  }
  h.prototype.listeners = function(B) {
    return G(this, B, !0);
  }, h.prototype.rawListeners = function(B) {
    return G(this, B, !1);
  }, h.listenerCount = function(N, B) {
    return typeof N.listenerCount == "function" ? N.listenerCount(B) : W.call(N, B);
  }, h.prototype.listenerCount = W;
  function W(N) {
    var B = this._events;
    if (B !== void 0) {
      var k = B[N];
      if (typeof k == "function") return 1;
      if (k !== void 0) return k.length;
    }
    return 0;
  }
  h.prototype.eventNames = function() {
    return this._eventsCount > 0 ? r(this._events) : [];
  };
  function X(N, B) {
    for (var k = new Array(B), z = 0; z < B; ++z) k[z] = N[z];
    return k;
  }
  function P(N, B) {
    for (;B + 1 < N.length; B++) N[B] = N[B + 1];
    N.pop();
  }
  function it(N) {
    for (var B = new Array(N.length), k = 0; k < B.length; ++k) B[k] = N[k].listener || N[k];
    return B;
  }
  function ut(N, B) {
    return new Promise((function(k, z) {
      function I(V) {
        N.removeListener(B, q), z(V);
      }
      function q() {
        typeof N.removeListener == "function" && N.removeListener("error", I), k([].slice.call(arguments));
      }
      H(N, B, q, {
        once: !0
      }), B !== "error" && J(N, I, {
        once: !0
      });
    }));
  }
  function J(N, B, k) {
    typeof N.on == "function" && H(N, "error", B, k);
  }
  function H(N, B, k, z) {
    if (typeof N.on == "function") z.once ? N.once(B, k) : N.on(B, k); else if (typeof N.addEventListener == "function") N.addEventListener(B, (function I(q) {
      z.once && N.removeEventListener(B, I), k(q);
    })); else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof N);
  }
  return Ss.exports;
}

var fb = db();

let Ts;

const hb = new Uint8Array(16);

function mb() {
  if (!Ts && (Ts = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), 
  !Ts)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Ts(hb);
}

const $t = [];

for (let o = 0; o < 256; ++o) $t.push((o + 256).toString(16).slice(1));

function yb(o, s = 0) {
  return $t[o[s + 0]] + $t[o[s + 1]] + $t[o[s + 2]] + $t[o[s + 3]] + "-" + $t[o[s + 4]] + $t[o[s + 5]] + "-" + $t[o[s + 6]] + $t[o[s + 7]] + "-" + $t[o[s + 8]] + $t[o[s + 9]] + "-" + $t[o[s + 10]] + $t[o[s + 11]] + $t[o[s + 12]] + $t[o[s + 13]] + $t[o[s + 14]] + $t[o[s + 15]];
}

const gb = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), yh = {
  randomUUID: gb
};

function bb(o, s, r) {
  if (yh.randomUUID && !o) return yh.randomUUID();
  o = o || {};
  const u = o.random || (o.rng || mb)();
  return u[6] = u[6] & 15 | 64, u[8] = u[8] & 63 | 128, yb(u);
}

class pb extends fb.EventEmitter {
  constructor(s, r) {
    super(), this.ready = !1, this.userId = null, this.ref = null, this.handleMessage = u => {
      const m = u.data;
      if (u.origin === this.targetOrigin && cb(m)) {
        if (m.id === "OBR_READY") {
          this.ready = !0;
          const h = m.data;
          this.ref = h.ref, this.userId = h.userId;
        }
        this.emit(m.id, m.data);
      }
    }, this.send = (u, m, h) => {
      var y;
      if (!this.ref) throw Error("Unable to send message: not ready");
      (y = window.parent) === null || y === void 0 || y.postMessage({
        id: u,
        data: m,
        ref: this.ref,
        nonce: h
      }, this.targetOrigin);
    }, this.sendAsync = (u, m, h = 5e3) => {
      const y = `_${bb()}`;
      return this.send(u, m, y), Promise.race([ new Promise(((T, O) => {
        const g = this;
        function p(G) {
          g.off(`${u}_RESPONSE${y}`, p), g.off(`${u}_ERROR${y}`, R), T(G);
        }
        function R(G) {
          g.off(`${u}_RESPONSE${y}`, p), g.off(`${u}_ERROR${y}`, R), O(G);
        }
        this.on(`${u}_RESPONSE${y}`, p), this.on(`${u}_ERROR${y}`, R);
      })), ...h > 0 ? [ new Promise(((T, O) => window.setTimeout((() => O(new Error(`Message ${u} took longer than ${h}ms to get a result`))), h))) ] : [] ]);
    }, this.roomId = r, this.targetOrigin = s, window.addEventListener("message", this.handleMessage), 
    this.setMaxListeners(100);
  }
  destroy() {
    window.removeEventListener("message", this.handleMessage);
  }
}

var gh = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class vb {
  constructor(s) {
    this.messageBus = s;
  }
  show(s, r) {
    return gh(this, void 0, void 0, (function*() {
      const {id: u} = yield this.messageBus.sendAsync("OBR_NOTIFICATION_SHOW", {
        message: s,
        variant: r
      });
      return u;
    }));
  }
  close(s) {
    return gh(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_NOTIFICATION_CLOSE", {
        id: s
      });
    }));
  }
}

var Jn = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class Ab {
  constructor(s) {
    this.messageBus = s;
  }
  getColor() {
    return Jn(this, void 0, void 0, (function*() {
      const {color: s} = yield this.messageBus.sendAsync("OBR_SCENE_FOG_GET_COLOR", {});
      return s;
    }));
  }
  setColor(s) {
    return Jn(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_FOG_SET_COLOR", {
        color: s
      });
    }));
  }
  getStrokeWidth() {
    return Jn(this, void 0, void 0, (function*() {
      const {strokeWidth: s} = yield this.messageBus.sendAsync("OBR_SCENE_FOG_GET_STROKE_WIDTH", {});
      return s;
    }));
  }
  setStrokeWidth(s) {
    return Jn(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_FOG_SET_STROKE_WIDTH", {
        strokeWidth: s
      });
    }));
  }
  getFilled() {
    return Jn(this, void 0, void 0, (function*() {
      const {filled: s} = yield this.messageBus.sendAsync("OBR_SCENE_FOG_GET_FILLED", {});
      return s;
    }));
  }
  setFilled(s) {
    return Jn(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_FOG_SET_FILLED", {
        filled: s
      });
    }));
  }
  onChange(s) {
    const r = u => {
      s(u.fog);
    };
    return this.messageBus.send("OBR_SCENE_FOG_SUBSCRIBE", {}), this.messageBus.on("OBR_SCENE_FOG_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_SCENE_FOG_UNSUBSCRIBE", {}), this.messageBus.off("OBR_SCENE_FOG_EVENT_CHANGE", r);
    };
  }
}

var Pt = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class Eb {
  constructor(s) {
    this.messageBus = s;
  }
  getDpi() {
    return Pt(this, void 0, void 0, (function*() {
      const {dpi: s} = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_DPI", {});
      return s;
    }));
  }
  getScale() {
    return Pt(this, void 0, void 0, (function*() {
      return yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_SCALE", {});
    }));
  }
  setScale(s) {
    return Pt(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_SCALE", {
        scale: s
      });
    }));
  }
  getColor() {
    return Pt(this, void 0, void 0, (function*() {
      const {color: s} = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_COLOR", {});
      return s;
    }));
  }
  setColor(s) {
    return Pt(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_COLOR", {
        color: s
      });
    }));
  }
  getOpacity() {
    return Pt(this, void 0, void 0, (function*() {
      const {opacity: s} = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_OPACITY", {});
      return s;
    }));
  }
  setOpacity(s) {
    return Pt(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_OPACITY", {
        opacity: s
      });
    }));
  }
  getType() {
    return Pt(this, void 0, void 0, (function*() {
      const {type: s} = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_TYPE", {});
      return s;
    }));
  }
  setType(s) {
    return Pt(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_TYPE", {
        type: s
      });
    }));
  }
  getLineType() {
    return Pt(this, void 0, void 0, (function*() {
      const {lineType: s} = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_LINE_TYPE", {});
      return s;
    }));
  }
  setLineType(s) {
    return Pt(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_LINE_TYPE", {
        lineType: s
      });
    }));
  }
  getMeasurement() {
    return Pt(this, void 0, void 0, (function*() {
      const {measurement: s} = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_MEASUREMENT", {});
      return s;
    }));
  }
  setMeasurement(s) {
    return Pt(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_MEASUREMENT", {
        measurement: s
      });
    }));
  }
  getLineWidth() {
    return Pt(this, void 0, void 0, (function*() {
      const {lineWidth: s} = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_LINE_WIDTH", {});
      return s;
    }));
  }
  setLineWidth(s) {
    return Pt(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_LINE_WIDTH", {
        lineWidth: s
      });
    }));
  }
  snapPosition(s, r, u, m) {
    return Pt(this, void 0, void 0, (function*() {
      const {position: h} = yield this.messageBus.sendAsync("OBR_SCENE_GRID_SNAP_POSITION", {
        position: s,
        snappingSensitivity: r,
        useCorners: u,
        useCenter: m
      });
      return h;
    }));
  }
  getDistance(s, r) {
    return Pt(this, void 0, void 0, (function*() {
      const {distance: u} = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_DISTANCE", {
        from: s,
        to: r
      });
      return u;
    }));
  }
  onChange(s) {
    const r = u => {
      s(u.grid);
    };
    return this.messageBus.send("OBR_SCENE_GRID_SUBSCRIBE", {}), this.messageBus.on("OBR_SCENE_GRID_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_SCENE_GRID_UNSUBSCRIBE", {}), this.messageBus.off("OBR_SCENE_GRID_EVENT_CHANGE", r);
    };
  }
}

var Os = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class Sb {
  constructor(s) {
    this.messageBus = s;
  }
  undo() {
    return Os(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_UNDO", {});
    }));
  }
  redo() {
    return Os(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_REDO", {});
    }));
  }
  canUndo() {
    return Os(this, void 0, void 0, (function*() {
      const {canUndo: s} = yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_CAN_UNDO", {});
      return s;
    }));
  }
  canRedo() {
    return Os(this, void 0, void 0, (function*() {
      const {canRedo: s} = yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_CAN_REDO", {});
      return s;
    }));
  }
}

var fr = Symbol.for("immer-nothing"), tl = Symbol.for("immer-draftable"), Ee = Symbol.for("immer-state");

function ie(o, ...s) {
  throw new Error(`[Immer] minified error nr: ${o}. Full error at: https://bit.ly/3cXEKWf`);
}

var cn = Object.getPrototypeOf;

function dn(o) {
  return !!o && !!o[Ee];
}

function za(o) {
  var s;
  return o ? Bh(o) || Array.isArray(o) || !!o[tl] || !!((s = o.constructor) != null && s[tl]) || sl(o) || ol(o) : !1;
}

var Tb = Object.prototype.constructor.toString();

function Bh(o) {
  if (!o || typeof o != "object") return !1;
  const s = cn(o);
  if (s === null) return !0;
  const r = Object.hasOwnProperty.call(s, "constructor") && s.constructor;
  return r === Object ? !0 : typeof r == "function" && Function.toString.call(r) === Tb;
}

function al(o, s) {
  fn(o) === 0 ? Reflect.ownKeys(o).forEach((r => {
    s(r, o[r], o);
  })) : o.forEach(((r, u) => s(u, r, o)));
}

function fn(o) {
  const s = o[Ee];
  return s ? s.type_ : Array.isArray(o) ? 1 : sl(o) ? 2 : ol(o) ? 3 : 0;
}

function nl(o, s) {
  return fn(o) === 2 ? o.has(s) : Object.prototype.hasOwnProperty.call(o, s);
}

function Ju(o, s) {
  return fn(o) === 2 ? o.get(s) : o[s];
}

function Nh(o, s, r) {
  const u = fn(o);
  u === 2 ? o.set(s, r) : u === 3 ? o.add(r) : o[s] = r;
}

function Ob(o, s) {
  return o === s ? o !== 0 || 1 / o === 1 / s : o !== o && s !== s;
}

function sl(o) {
  return o instanceof Map;
}

function ol(o) {
  return o instanceof Set;
}

function un(o) {
  return o.copy_ || o.base_;
}

function nr(o, s) {
  if (sl(o)) return new Map(o);
  if (ol(o)) return new Set(o);
  if (Array.isArray(o)) return Array.prototype.slice.call(o);
  const r = Bh(o);
  if (s === !0 || s === "class_only" && !r) {
    const u = Object.getOwnPropertyDescriptors(o);
    delete u[Ee];
    let m = Reflect.ownKeys(u);
    for (let h = 0; h < m.length; h++) {
      const y = m[h], T = u[y];
      T.writable === !1 && (T.writable = !0, T.configurable = !0), (T.get || T.set) && (u[y] = {
        configurable: !0,
        writable: !0,
        enumerable: T.enumerable,
        value: o[y]
      });
    }
    return Object.create(cn(o), u);
  } else {
    const u = cn(o);
    if (u !== null && r) return {
      ...o
    };
    const m = Object.create(u);
    return Object.assign(m, o);
  }
}

function hr(o, s = !1) {
  return Ds(o) || dn(o) || !za(o) || (fn(o) > 1 && (o.set = o.add = o.clear = o.delete = wb), 
  Object.freeze(o), s && Object.entries(o).forEach((([r, u]) => hr(u, !0)))), o;
}

function wb() {
  ie(2);
}

function Ds(o) {
  return Object.isFrozen(o);
}

var ir = {};

function hn(o) {
  const s = ir[o];
  return s || ie(0, o), s;
}

function _b(o, s) {
  ir[o] || (ir[o] = s);
}

var il;

function xh() {
  return il;
}

function Rb(o, s) {
  return {
    drafts_: [],
    parent_: o,
    immer_: s,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}

function bh(o, s) {
  s && (hn("Patches"), o.patches_ = [], o.inversePatches_ = [], o.patchListener_ = s);
}

function lr(o) {
  sr(o), o.drafts_.forEach(Cb), o.drafts_ = null;
}

function sr(o) {
  o === il && (il = o.parent_);
}

function ph(o) {
  return il = Rb(il, o);
}

function Cb(o) {
  const s = o[Ee];
  s.type_ === 0 || s.type_ === 1 ? s.revoke_() : s.revoked_ = !0;
}

function vh(o, s) {
  s.unfinalizedDrafts_ = s.drafts_.length;
  const r = s.drafts_[0];
  return o !== void 0 && o !== r ? (r[Ee].modified_ && (lr(s), ie(4)), za(o) && (o = Cs(s, o), 
  s.parent_ || Bs(s, o)), s.patches_ && hn("Patches").generateReplacementPatches_(r[Ee].base_, o, s.patches_, s.inversePatches_)) : o = Cs(s, r, []), 
  lr(s), s.patches_ && s.patchListener_(s.patches_, s.inversePatches_), o !== fr ? o : void 0;
}

function Cs(o, s, r) {
  if (Ds(s)) return s;
  const u = s[Ee];
  if (!u) return al(s, ((m, h) => Ah(o, u, s, m, h, r))), s;
  if (u.scope_ !== o) return s;
  if (!u.modified_) return Bs(o, u.base_, !0), u.base_;
  if (!u.finalized_) {
    u.finalized_ = !0, u.scope_.unfinalizedDrafts_--;
    const m = u.copy_;
    let h = m, y = !1;
    u.type_ === 3 && (h = new Set(m), m.clear(), y = !0), al(h, ((T, O) => Ah(o, u, m, T, O, r, y))), 
    Bs(o, m, !1), r && o.patches_ && hn("Patches").generatePatches_(u, r, o.patches_, o.inversePatches_);
  }
  return u.copy_;
}

function Ah(o, s, r, u, m, h, y) {
  if (dn(m)) {
    const T = h && s && s.type_ !== 3 && !nl(s.assigned_, u) ? h.concat(u) : void 0, O = Cs(o, m, T);
    if (Nh(r, u, O), dn(O)) o.canAutoFreeze_ = !1; else return;
  } else y && r.add(m);
  if (za(m) && !Ds(m)) {
    if (!o.immer_.autoFreeze_ && o.unfinalizedDrafts_ < 1) return;
    Cs(o, m), (!s || !s.scope_.parent_) && typeof u != "symbol" && Object.prototype.propertyIsEnumerable.call(r, u) && Bs(o, m);
  }
}

function Bs(o, s, r = !1) {
  !o.parent_ && o.immer_.autoFreeze_ && o.canAutoFreeze_ && hr(s, r);
}

function Bb(o, s) {
  const r = Array.isArray(o), u = {
    type_: r ? 1 : 0,
    scope_: s ? s.scope_ : xh(),
    modified_: !1,
    finalized_: !1,
    assigned_: {},
    parent_: s,
    base_: o,
    draft_: null,
    copy_: null,
    revoke_: null,
    isManual_: !1
  };
  let m = u, h = mr;
  r && (m = [ u ], h = ll);
  const {revoke: y, proxy: T} = Proxy.revocable(m, h);
  return u.draft_ = T, u.revoke_ = y, T;
}

var mr = {
  get(o, s) {
    if (s === Ee) return o;
    const r = un(o);
    if (!nl(r, s)) return Nb(o, r, s);
    const u = r[s];
    return o.finalized_ || !za(u) ? u : u === Fu(o.base_, s) ? (Pu(o), o.copy_[s] = ur(u, o)) : u;
  },
  has(o, s) {
    return s in un(o);
  },
  ownKeys(o) {
    return Reflect.ownKeys(un(o));
  },
  set(o, s, r) {
    const u = Dh(un(o), s);
    if (u != null && u.set) return u.set.call(o.draft_, r), !0;
    if (!o.modified_) {
      const m = Fu(un(o), s), h = m == null ? void 0 : m[Ee];
      if (h && h.base_ === r) return o.copy_[s] = r, o.assigned_[s] = !1, !0;
      if (Ob(r, m) && (r !== void 0 || nl(o.base_, s))) return !0;
      Pu(o), or(o);
    }
    return o.copy_[s] === r && (r !== void 0 || s in o.copy_) || Number.isNaN(r) && Number.isNaN(o.copy_[s]) || (o.copy_[s] = r, 
    o.assigned_[s] = !0), !0;
  },
  deleteProperty(o, s) {
    return Fu(o.base_, s) !== void 0 || s in o.base_ ? (o.assigned_[s] = !1, Pu(o), 
    or(o)) : delete o.assigned_[s], o.copy_ && delete o.copy_[s], !0;
  },
  getOwnPropertyDescriptor(o, s) {
    const r = un(o), u = Reflect.getOwnPropertyDescriptor(r, s);
    return u && {
      writable: !0,
      configurable: o.type_ !== 1 || s !== "length",
      enumerable: u.enumerable,
      value: r[s]
    };
  },
  defineProperty() {
    ie(11);
  },
  getPrototypeOf(o) {
    return cn(o.base_);
  },
  setPrototypeOf() {
    ie(12);
  }
}, ll = {};

al(mr, ((o, s) => {
  ll[o] = function() {
    return arguments[0] = arguments[0][0], s.apply(this, arguments);
  };
}));

ll.deleteProperty = function(o, s) {
  return ll.set.call(this, o, s, void 0);
};

ll.set = function(o, s, r) {
  return mr.set.call(this, o[0], s, r, o[0]);
};

function Fu(o, s) {
  const r = o[Ee];
  return (r ? un(r) : o)[s];
}

function Nb(o, s, r) {
  var m;
  const u = Dh(s, r);
  return u ? "value" in u ? u.value : (m = u.get) == null ? void 0 : m.call(o.draft_) : void 0;
}

function Dh(o, s) {
  if (!(s in o)) return;
  let r = cn(o);
  for (;r; ) {
    const u = Object.getOwnPropertyDescriptor(r, s);
    if (u) return u;
    r = cn(r);
  }
}

function or(o) {
  o.modified_ || (o.modified_ = !0, o.parent_ && or(o.parent_));
}

function Pu(o) {
  o.copy_ || (o.copy_ = nr(o.base_, o.scope_.immer_.useStrictShallowCopy_));
}

var xb = class {
  constructor(o) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (s, r, u) => {
      if (typeof s == "function" && typeof r != "function") {
        const h = r;
        r = s;
        const y = this;
        return function(O = h, ...g) {
          return y.produce(O, (p => r.call(this, p, ...g)));
        };
      }
      typeof r != "function" && ie(6), u !== void 0 && typeof u != "function" && ie(7);
      let m;
      if (za(s)) {
        const h = ph(this), y = ur(s, void 0);
        let T = !0;
        try {
          m = r(y), T = !1;
        } finally {
          T ? lr(h) : sr(h);
        }
        return bh(h, u), vh(m, h);
      } else if (!s || typeof s != "object") {
        if (m = r(s), m === void 0 && (m = s), m === fr && (m = void 0), this.autoFreeze_ && hr(m, !0), 
        u) {
          const h = [], y = [];
          hn("Patches").generateReplacementPatches_(s, m, h, y), u(h, y);
        }
        return m;
      } else ie(1, s);
    }, this.produceWithPatches = (s, r) => {
      if (typeof s == "function") return (y, ...T) => this.produceWithPatches(y, (O => s(O, ...T)));
      let u, m;
      return [ this.produce(s, r, ((y, T) => {
        u = y, m = T;
      })), u, m ];
    }, typeof (o == null ? void 0 : o.autoFreeze) == "boolean" && this.setAutoFreeze(o.autoFreeze), 
    typeof (o == null ? void 0 : o.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(o.useStrictShallowCopy);
  }
  createDraft(o) {
    za(o) || ie(8), dn(o) && (o = Db(o));
    const s = ph(this), r = ur(o, void 0);
    return r[Ee].isManual_ = !0, sr(s), r;
  }
  finishDraft(o, s) {
    const r = o && o[Ee];
    (!r || !r.isManual_) && ie(9);
    const {scope_: u} = r;
    return bh(u, s), vh(void 0, u);
  }
  setAutoFreeze(o) {
    this.autoFreeze_ = o;
  }
  setUseStrictShallowCopy(o) {
    this.useStrictShallowCopy_ = o;
  }
  applyPatches(o, s) {
    let r;
    for (r = s.length - 1; r >= 0; r--) {
      const m = s[r];
      if (m.path.length === 0 && m.op === "replace") {
        o = m.value;
        break;
      }
    }
    r > -1 && (s = s.slice(r + 1));
    const u = hn("Patches").applyPatches_;
    return dn(o) ? u(o, s) : this.produce(o, (m => u(m, s)));
  }
};

function ur(o, s) {
  const r = sl(o) ? hn("MapSet").proxyMap_(o, s) : ol(o) ? hn("MapSet").proxySet_(o, s) : Bb(o, s);
  return (s ? s.scope_ : xh()).drafts_.push(r), r;
}

function Db(o) {
  return dn(o) || ie(10, o), Mh(o);
}

function Mh(o) {
  if (!za(o) || Ds(o)) return o;
  const s = o[Ee];
  let r;
  if (s) {
    if (!s.modified_) return s.base_;
    s.finalized_ = !0, r = nr(o, s.scope_.immer_.useStrictShallowCopy_);
  } else r = nr(o, !0);
  return al(r, ((u, m) => {
    Nh(r, u, Mh(m));
  })), s && (s.finalized_ = !1), r;
}

function yr() {
  const s = "replace", r = "add", u = "remove";
  function m(G, W, X, P) {
    switch (G.type_) {
     case 0:
     case 2:
      return y(G, W, X, P);

     case 1:
      return h(G, W, X, P);

     case 3:
      return T(G, W, X, P);
    }
  }
  function h(G, W, X, P) {
    let {base_: it, assigned_: ut} = G, J = G.copy_;
    J.length < it.length && ([it, J] = [ J, it ], [X, P] = [ P, X ]);
    for (let H = 0; H < it.length; H++) if (ut[H] && J[H] !== it[H]) {
      const N = W.concat([ H ]);
      X.push({
        op: s,
        path: N,
        value: R(J[H])
      }), P.push({
        op: s,
        path: N,
        value: R(it[H])
      });
    }
    for (let H = it.length; H < J.length; H++) {
      const N = W.concat([ H ]);
      X.push({
        op: r,
        path: N,
        value: R(J[H])
      });
    }
    for (let H = J.length - 1; it.length <= H; --H) {
      const N = W.concat([ H ]);
      P.push({
        op: u,
        path: N
      });
    }
  }
  function y(G, W, X, P) {
    const {base_: it, copy_: ut} = G;
    al(G.assigned_, ((J, H) => {
      const N = Ju(it, J), B = Ju(ut, J), k = H ? nl(it, J) ? s : r : u;
      if (N === B && k === s) return;
      const z = W.concat(J);
      X.push(k === u ? {
        op: k,
        path: z
      } : {
        op: k,
        path: z,
        value: B
      }), P.push(k === r ? {
        op: u,
        path: z
      } : k === u ? {
        op: r,
        path: z,
        value: R(N)
      } : {
        op: s,
        path: z,
        value: R(N)
      });
    }));
  }
  function T(G, W, X, P) {
    let {base_: it, copy_: ut} = G, J = 0;
    it.forEach((H => {
      if (!ut.has(H)) {
        const N = W.concat([ J ]);
        X.push({
          op: u,
          path: N,
          value: H
        }), P.unshift({
          op: r,
          path: N,
          value: H
        });
      }
      J++;
    })), J = 0, ut.forEach((H => {
      if (!it.has(H)) {
        const N = W.concat([ J ]);
        X.push({
          op: r,
          path: N,
          value: H
        }), P.unshift({
          op: u,
          path: N,
          value: H
        });
      }
      J++;
    }));
  }
  function O(G, W, X, P) {
    X.push({
      op: s,
      path: [],
      value: W === fr ? void 0 : W
    }), P.push({
      op: s,
      path: [],
      value: G
    });
  }
  function g(G, W) {
    return W.forEach((X => {
      const {path: P, op: it} = X;
      let ut = G;
      for (let B = 0; B < P.length - 1; B++) {
        const k = fn(ut);
        let z = P[B];
        typeof z != "string" && typeof z != "number" && (z = "" + z), (k === 0 || k === 1) && (z === "__proto__" || z === "constructor") && ie(19), 
        typeof ut == "function" && z === "prototype" && ie(19), ut = Ju(ut, z), typeof ut != "object" && ie(18, P.join("/"));
      }
      const J = fn(ut), H = p(X.value), N = P[P.length - 1];
      switch (it) {
       case s:
        switch (J) {
         case 2:
          return ut.set(N, H);

         case 3:
          ie(16);

         default:
          return ut[N] = H;
        }

       case r:
        switch (J) {
         case 1:
          return N === "-" ? ut.push(H) : ut.splice(N, 0, H);

         case 2:
          return ut.set(N, H);

         case 3:
          return ut.add(H);

         default:
          return ut[N] = H;
        }

       case u:
        switch (J) {
         case 1:
          return ut.splice(N, 1);

         case 2:
          return ut.delete(N);

         case 3:
          return ut.delete(X.value);

         default:
          return delete ut[N];
        }

       default:
        ie(17, it);
      }
    })), G;
  }
  function p(G) {
    if (!za(G)) return G;
    if (Array.isArray(G)) return G.map(p);
    if (sl(G)) return new Map(Array.from(G.entries()).map((([X, P]) => [ X, p(P) ])));
    if (ol(G)) return new Set(Array.from(G).map(p));
    const W = Object.create(cn(G));
    for (const X in G) W[X] = p(G[X]);
    return nl(G, tl) && (W[tl] = G[tl]), W;
  }
  function R(G) {
    return dn(G) ? p(G) : G;
  }
  _b("Patches", {
    applyPatches_: g,
    generatePatches_: m,
    generateReplacementPatches_: O
  });
}

var Se = new xb;

Se.produce;

var gr = Se.produceWithPatches.bind(Se);

Se.setAutoFreeze.bind(Se);

Se.setUseStrictShallowCopy.bind(Se);

Se.applyPatches.bind(Se);

Se.createDraft.bind(Se);

Se.finishDraft.bind(Se);

var Fn = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

yr();

class Mb {
  constructor(s) {
    this.messageBus = s;
  }
  getItems(s) {
    return Fn(this, void 0, void 0, (function*() {
      if (Array.isArray(s)) {
        const {items: r} = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ITEMS", {
          ids: s
        });
        return r;
      } else if (s) {
        const {items: r} = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ALL_ITEMS", {});
        return r.filter(s);
      } else {
        const {items: r} = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ALL_ITEMS", {});
        return r;
      }
    }));
  }
  isItemArray(s) {
    return Array.isArray(s) && s.every((r => typeof r != "string"));
  }
  updateItems(s, r) {
    return Fn(this, void 0, void 0, (function*() {
      let u;
      this.isItemArray(s) ? u = s : u = yield this.getItems(s);
      const [m, h] = gr(u, r), y = m.map((O => ({
        id: O.id,
        type: O.type
      })));
      for (const O of h) {
        const [g, p] = O.path;
        typeof g == "number" && typeof p == "string" && (y[g][p] = m[g][p]);
      }
      const T = y.filter((O => Object.keys(O).length > 2));
      T.length !== 0 && (yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_UPDATE_ITEMS", {
        updates: T
      }));
    }));
  }
  addItems(s) {
    return Fn(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_ADD_ITEMS", {
        items: s
      });
    }));
  }
  deleteItems(s) {
    return Fn(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_DELETE_ITEMS", {
        ids: s
      });
    }));
  }
  getItemAttachments(s) {
    return Fn(this, void 0, void 0, (function*() {
      const {items: r} = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ITEM_ATTACHMENTS", {
        ids: s
      });
      return r;
    }));
  }
  getItemBounds(s) {
    return Fn(this, void 0, void 0, (function*() {
      const {bounds: r} = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ITEM_BOUNDS", {
        ids: s
      });
      return r;
    }));
  }
  onChange(s) {
    const r = u => {
      s(u.items);
    };
    return this.messageBus.send("OBR_SCENE_ITEMS_SUBSCRIBE", {}), this.messageBus.on("OBR_SCENE_ITEMS_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_SCENE_ITEMS_UNSUBSCRIBE", {}), this.messageBus.off("OBR_SCENE_ITEMS_EVENT_CHANGE", r);
    };
  }
}

var Pn = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

yr();

class kb {
  constructor(s) {
    this.messageBus = s;
  }
  getItems(s) {
    return Pn(this, void 0, void 0, (function*() {
      if (Array.isArray(s)) {
        const {items: r} = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEMS", {
          ids: s
        });
        return r;
      } else if (s) {
        const {items: r} = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ALL_ITEMS", {});
        return r.filter(s);
      } else {
        const {items: r} = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ALL_ITEMS", {});
        return r;
      }
    }));
  }
  isItemArray(s) {
    return Array.isArray(s) && s.every((r => typeof r != "string"));
  }
  updateItems(s, r, u) {
    return Pn(this, void 0, void 0, (function*() {
      let m;
      this.isItemArray(s) ? m = s : m = yield this.getItems(s);
      const [h, y] = gr(m, r), T = h.map((g => ({
        id: g.id,
        type: g.type
      })));
      for (const g of y) {
        const [p, R] = g.path;
        typeof p == "number" && typeof R == "string" && (T[p][R] = h[p][R]);
      }
      const O = T.filter((g => Object.keys(g).length > 2));
      O.length !== 0 && (yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_UPDATE_ITEMS", {
        updates: O,
        fastUpdate: u
      }));
    }));
  }
  addItems(s) {
    return Pn(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_ADD_ITEMS", {
        items: s
      });
    }));
  }
  deleteItems(s) {
    return Pn(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_DELETE_ITEMS", {
        ids: s
      });
    }));
  }
  getItemAttachments(s) {
    return Pn(this, void 0, void 0, (function*() {
      const {items: r} = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEM_ATTACHMENTS", {
        ids: s
      });
      return r;
    }));
  }
  getItemBounds(s) {
    return Pn(this, void 0, void 0, (function*() {
      const {bounds: r} = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEM_BOUNDS", {
        ids: s
      });
      return r;
    }));
  }
  onChange(s) {
    const r = u => {
      s(u.items);
    };
    return this.messageBus.send("OBR_SCENE_LOCAL_SUBSCRIBE", {}), this.messageBus.on("OBR_SCENE_LOCAL_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_SCENE_LOCAL_UNSUBSCRIBE", {}), this.messageBus.off("OBR_SCENE_LOCAL_EVENT_CHANGE", r);
    };
  }
}

var $u = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class Lb {
  constructor(s) {
    this.messageBus = s, this.grid = new Eb(s), this.fog = new Ab(s), this.history = new Sb(s), 
    this.items = new Mb(s), this.local = new kb(s);
  }
  isReady() {
    return $u(this, void 0, void 0, (function*() {
      const {ready: s} = yield this.messageBus.sendAsync("OBR_SCENE_IS_READY", {});
      return s;
    }));
  }
  onReadyChange(s) {
    const r = u => {
      s(u.ready);
    };
    return this.messageBus.send("OBR_SCENE_READY_SUBSCRIBE", {}), this.messageBus.on("OBR_SCENE_EVENT_READY_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_SCENE_READY_UNSUBSCRIBE", {}), this.messageBus.off("OBR_SCENE_EVENT_READY_CHANGE", r);
    };
  }
  getMetadata() {
    return $u(this, void 0, void 0, (function*() {
      const {metadata: s} = yield this.messageBus.sendAsync("OBR_SCENE_GET_METADATA", {});
      return s;
    }));
  }
  setMetadata(s) {
    return $u(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_SCENE_SET_METADATA", {
        update: s
      });
    }));
  }
  onMetadataChange(s) {
    const r = u => {
      s(u.metadata);
    };
    return this.messageBus.send("OBR_SCENE_METADATA_SUBSCRIBE", {}), this.messageBus.on("OBR_SCENE_METADATA_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_SCENE_METADATA_UNSUBSCRIBE", {}), this.messageBus.off("OBR_SCENE_METADATA_EVENT_CHANGE", r);
    };
  }
}

function kh(o) {
  return o.startsWith("http") ? o : `${window.location.origin}${o}`;
}

function el(o) {
  return o.map((s => Object.assign(Object.assign({}, s), {
    icon: kh(s.icon)
  })));
}

function br(o) {
  return Object.assign(Object.assign({}, o), {
    url: kh(o.url)
  });
}

var Eh = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class jb {
  constructor(s) {
    this.contextMenus = {}, this.handleClick = r => {
      var u;
      const m = this.contextMenus[r.id];
      m && ((u = m.onClick) === null || u === void 0 || u.call(m, r.context, r.elementId));
    }, this.messageBus = s, s.on("OBR_CONTEXT_MENU_EVENT_CLICK", this.handleClick);
  }
  create(s) {
    return Eh(this, void 0, void 0, (function*() {
      this.messageBus.sendAsync("OBR_CONTEXT_MENU_CREATE", {
        id: s.id,
        shortcut: s.shortcut,
        icons: el(s.icons),
        embed: s.embed && br(s.embed)
      }), this.contextMenus[s.id] = s;
    }));
  }
  remove(s) {
    return Eh(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_CONTEXT_MENU_REMOVE", {
        id: s
      }), delete this.contextMenus[s];
    }));
  }
}

var Le = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class Hb {
  constructor(s) {
    this.tools = {}, this.toolActions = {}, this.toolModes = {}, this.handleToolClick = r => {
      const u = this.tools[r.id];
      if (u) if (u.onClick) {
        const m = u.onClick(r.context, r.elementId);
        Promise.resolve(m).then((h => {
          h && this.messageBus.send("OBR_TOOL_ACTIVATE", {
            id: r.id
          });
        }));
      } else this.messageBus.send("OBR_TOOL_ACTIVATE", {
        id: r.id
      });
    }, this.handleToolActionClick = r => {
      var u;
      const m = this.toolActions[r.id];
      m && ((u = m.onClick) === null || u === void 0 || u.call(m, r.context, r.elementId));
    }, this.handleToolModeClick = r => {
      const u = this.toolModes[r.id];
      if (u) if (u.onClick) {
        const m = u.onClick(r.context, r.elementId);
        Promise.resolve(m).then((h => {
          h && this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
            toolId: r.context.activeTool,
            modeId: r.id
          });
        }));
      } else this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
        toolId: r.context.activeTool,
        modeId: r.id
      });
    }, this.handleToolModeToolClick = r => {
      const u = this.toolModes[r.id];
      if (u) if (u.onToolClick) {
        const m = u.onToolClick(r.context, r.event);
        Promise.resolve(m).then((h => {
          h && r.event.target && !r.event.target.locked && this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
            items: [ r.event.target.id ]
          });
        }));
      } else r.event.target && !r.event.target.locked && this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
        items: [ r.event.target.id ]
      });
    }, this.handleToolModeToolDoubleClick = r => {
      const u = this.toolModes[r.id];
      if (u) if (u.onToolDoubleClick) {
        const m = u.onToolDoubleClick(r.context, r.event);
        Promise.resolve(m).then((h => {
          h && r.event.target && this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
            items: [ r.event.target.id ]
          });
        }));
      } else r.event.target && this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
        items: [ r.event.target.id ]
      });
    }, this.handleToolModeToolDown = r => {
      var u;
      const m = this.toolModes[r.id];
      m && ((u = m.onToolDown) === null || u === void 0 || u.call(m, r.context, r.event));
    }, this.handleToolModeToolMove = r => {
      var u;
      const m = this.toolModes[r.id];
      m && ((u = m.onToolMove) === null || u === void 0 || u.call(m, r.context, r.event));
    }, this.handleToolModeToolUp = r => {
      var u;
      const m = this.toolModes[r.id];
      m && ((u = m.onToolUp) === null || u === void 0 || u.call(m, r.context, r.event));
    }, this.handleToolModeToolDragStart = r => {
      var u;
      const m = this.toolModes[r.id];
      m && ((u = m.onToolDragStart) === null || u === void 0 || u.call(m, r.context, r.event));
    }, this.handleToolModeToolDragMove = r => {
      var u;
      const m = this.toolModes[r.id];
      m && ((u = m.onToolDragMove) === null || u === void 0 || u.call(m, r.context, r.event));
    }, this.handleToolModeToolDragEnd = r => {
      var u;
      const m = this.toolModes[r.id];
      m && ((u = m.onToolDragEnd) === null || u === void 0 || u.call(m, r.context, r.event));
    }, this.handleToolModeToolDragCancel = r => {
      var u;
      const m = this.toolModes[r.id];
      m && ((u = m.onToolDragCancel) === null || u === void 0 || u.call(m, r.context, r.event));
    }, this.handleToolModeKeyDown = r => {
      var u;
      const m = this.toolModes[r.id];
      m && ((u = m.onKeyDown) === null || u === void 0 || u.call(m, r.context, r.event));
    }, this.handleToolModeKeyUp = r => {
      var u;
      const m = this.toolModes[r.id];
      m && ((u = m.onKeyUp) === null || u === void 0 || u.call(m, r.context, r.event));
    }, this.handleToolModeActivate = r => {
      var u;
      const m = this.toolModes[r.id];
      m && ((u = m.onActivate) === null || u === void 0 || u.call(m, r.context));
    }, this.handleToolModeDeactivate = r => {
      var u;
      const m = this.toolModes[r.id];
      m && ((u = m.onDeactivate) === null || u === void 0 || u.call(m, r.context));
    }, this.messageBus = s, s.on("OBR_TOOL_EVENT_CLICK", this.handleToolClick), s.on("OBR_TOOL_ACTION_EVENT_CLICK", this.handleToolActionClick), 
    s.on("OBR_TOOL_MODE_EVENT_CLICK", this.handleToolModeClick), s.on("OBR_TOOL_MODE_EVENT_TOOL_CLICK", this.handleToolModeToolClick), 
    s.on("OBR_TOOL_MODE_EVENT_TOOL_DOUBLE_CLICK", this.handleToolModeToolDoubleClick), 
    s.on("OBR_TOOL_MODE_EVENT_TOOL_DOWN", this.handleToolModeToolDown), s.on("OBR_TOOL_MODE_EVENT_TOOL_MOVE", this.handleToolModeToolMove), 
    s.on("OBR_TOOL_MODE_EVENT_TOOL_UP", this.handleToolModeToolUp), s.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_START", this.handleToolModeToolDragStart), 
    s.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_MOVE", this.handleToolModeToolDragMove), s.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_END", this.handleToolModeToolDragEnd), 
    s.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_CANCEL", this.handleToolModeToolDragCancel), 
    s.on("OBR_TOOL_MODE_EVENT_KEY_DOWN", this.handleToolModeKeyDown), s.on("OBR_TOOL_MODE_EVENT_KEY_UP", this.handleToolModeKeyUp), 
    s.on("OBR_TOOL_MODE_EVENT_ACTIVATE", this.handleToolModeActivate), s.on("OBR_TOOL_MODE_EVENT_DEACTIVATE", this.handleToolModeDeactivate);
  }
  create(s) {
    return Le(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_TOOL_CREATE", {
        id: s.id,
        shortcut: s.shortcut,
        defaultMode: s.defaultMode,
        defaultMetadata: s.defaultMetadata,
        icons: el(s.icons),
        disabled: s.disabled
      }), this.tools[s.id] = s;
    }));
  }
  remove(s) {
    return Le(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_TOOL_REMOVE", {
        id: s
      }), delete this.tools[s];
    }));
  }
  activateTool(s) {
    return Le(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_TOOL_ACTIVATE", {
        id: s
      });
    }));
  }
  getActiveTool() {
    return Le(this, void 0, void 0, (function*() {
      const {id: s} = yield this.messageBus.sendAsync("OBR_TOOL_GET_ACTIVE", {});
      return s;
    }));
  }
  onToolChange(s) {
    const r = u => {
      s(u.id);
    };
    return this.messageBus.send("OBR_TOOL_ACTIVE_SUBSCRIBE", {}), this.messageBus.on("OBR_TOOL_ACTIVE_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_TOOL_ACTIVE_UNSUBSCRIBE", {}), this.messageBus.off("OBR_TOOL_ACTIVE_EVENT_CHANGE", r);
    };
  }
  getMetadata(s) {
    return Le(this, void 0, void 0, (function*() {
      const {metadata: r} = yield this.messageBus.sendAsync("OBR_TOOL_GET_METADATA", {
        id: s
      });
      return r;
    }));
  }
  setMetadata(s, r) {
    return Le(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_TOOL_SET_METADATA", {
        toolId: s,
        update: r
      });
    }));
  }
  createAction(s) {
    return Le(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_TOOL_ACTION_CREATE", {
        id: s.id,
        shortcut: s.shortcut,
        icons: el(s.icons),
        disabled: s.disabled
      }), this.toolActions[s.id] = s;
    }));
  }
  removeAction(s) {
    return Le(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_TOOL_ACTION_REMOVE", {
        id: s
      }), delete this.tools[s];
    }));
  }
  createMode(s) {
    return Le(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_TOOL_MODE_CREATE", {
        id: s.id,
        shortcut: s.shortcut,
        icons: el(s.icons),
        preventDrag: s.preventDrag,
        disabled: s.disabled,
        cursors: s.cursors
      }), this.toolModes[s.id] = s;
    }));
  }
  removeMode(s) {
    return Le(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_TOOL_MODE_REMOVE", {
        id: s
      }), delete this.tools[s];
    }));
  }
  activateMode(s, r) {
    return Le(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_TOOL_MODE_ACTIVATE", {
        toolId: s,
        modeId: r
      });
    }));
  }
  getActiveToolMode() {
    return Le(this, void 0, void 0, (function*() {
      const {id: s} = yield this.messageBus.sendAsync("OBR_TOOL_MODE_GET_ACTIVE", {});
      return s;
    }));
  }
  onToolModeChange(s) {
    const r = u => {
      s(u.id);
    };
    return this.messageBus.send("OBR_TOOL_MODE_ACTIVE_SUBSCRIBE", {}), this.messageBus.on("OBR_TOOL_MODE_ACTIVE_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_TOOL_MODE_ACTIVE_UNSUBSCRIBE", {}), this.messageBus.off("OBR_TOOL_MODE_ACTIVE_EVENT_CHANGE", r);
    };
  }
}

var $n = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class zb {
  constructor(s) {
    this.messageBus = s;
  }
  open(s) {
    return $n(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_POPOVER_OPEN", Object.assign({}, br(s)));
    }));
  }
  close(s) {
    return $n(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_POPOVER_CLOSE", {
        id: s
      });
    }));
  }
  getWidth(s) {
    return $n(this, void 0, void 0, (function*() {
      const {width: r} = yield this.messageBus.sendAsync("OBR_POPOVER_GET_WIDTH", {
        id: s
      });
      return r;
    }));
  }
  setWidth(s, r) {
    return $n(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_POPOVER_SET_WIDTH", {
        id: s,
        width: r
      });
    }));
  }
  getHeight(s) {
    return $n(this, void 0, void 0, (function*() {
      const {height: r} = yield this.messageBus.sendAsync("OBR_POPOVER_GET_HEIGHT", {
        id: s
      });
      return r;
    }));
  }
  setHeight(s, r) {
    return $n(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_POPOVER_SET_HEIGHT", {
        id: s,
        height: r
      });
    }));
  }
}

var Sh = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class Ub {
  constructor(s) {
    this.messageBus = s;
  }
  open(s) {
    return Sh(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_MODAL_OPEN", Object.assign({}, br(s)));
    }));
  }
  close(s) {
    return Sh(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_MODAL_CLOSE", {
        id: s
      });
    }));
  }
}

var ue = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class Gb {
  constructor(s) {
    this.messageBus = s;
  }
  getWidth() {
    return ue(this, void 0, void 0, (function*() {
      const {width: s} = yield this.messageBus.sendAsync("OBR_ACTION_GET_WIDTH", {});
      return s;
    }));
  }
  setWidth(s) {
    return ue(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_WIDTH", {
        width: s
      });
    }));
  }
  getHeight() {
    return ue(this, void 0, void 0, (function*() {
      const {height: s} = yield this.messageBus.sendAsync("OBR_ACTION_GET_HEIGHT", {});
      return s;
    }));
  }
  setHeight(s) {
    return ue(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_HEIGHT", {
        height: s
      });
    }));
  }
  getBadgeText() {
    return ue(this, void 0, void 0, (function*() {
      const {badgeText: s} = yield this.messageBus.sendAsync("OBR_ACTION_GET_BADGE_TEXT", {});
      return s;
    }));
  }
  setBadgeText(s) {
    return ue(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_BADGE_TEXT", {
        badgeText: s
      });
    }));
  }
  getBadgeBackgroundColor() {
    return ue(this, void 0, void 0, (function*() {
      const {badgeBackgroundColor: s} = yield this.messageBus.sendAsync("OBR_ACTION_GET_BADGE_BACKGROUND_COLOR", {});
      return s;
    }));
  }
  setBadgeBackgroundColor(s) {
    return ue(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_BADGE_BACKGROUND_COLOR", {
        badgeBackgroundColor: s
      });
    }));
  }
  getIcon() {
    return ue(this, void 0, void 0, (function*() {
      const {icon: s} = yield this.messageBus.sendAsync("OBR_ACTION_GET_ICON", {});
      return s;
    }));
  }
  setIcon(s) {
    return ue(this, void 0, void 0, (function*() {
      const r = el([ {
        icon: s
      } ]);
      yield this.messageBus.sendAsync("OBR_ACTION_SET_ICON", {
        icon: r[0].icon
      });
    }));
  }
  getTitle() {
    return ue(this, void 0, void 0, (function*() {
      const {title: s} = yield this.messageBus.sendAsync("OBR_ACTION_GET_TITLE", {});
      return s;
    }));
  }
  setTitle(s) {
    return ue(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_TITLE", {
        title: s
      });
    }));
  }
  isOpen() {
    return ue(this, void 0, void 0, (function*() {
      const {isOpen: s} = yield this.messageBus.sendAsync("OBR_ACTION_GET_IS_OPEN", {});
      return s;
    }));
  }
  open() {
    return ue(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_ACTION_OPEN", {});
    }));
  }
  close() {
    return ue(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_ACTION_CLOSE", {});
    }));
  }
  onOpenChange(s) {
    const r = u => {
      s(u.isOpen);
    };
    return this.messageBus.send("OBR_ACTION_IS_OPEN_SUBSCRIBE", {}), this.messageBus.on("OBR_ACTION_IS_OPEN_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_IS_OPEN_ACTION_UNSUBSCRIBE", {}), this.messageBus.off("OBR_ACTION_IS_OPEN_EVENT_CHANGE", r);
    };
  }
}

var Yb = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

yr();

class qb {
  constructor(s) {
    this.messageBus = s;
  }
  startItemInteraction(s) {
    return Yb(this, void 0, void 0, (function*() {
      const {id: r} = yield this.messageBus.sendAsync("OBR_INTERACTION_START_ITEM_INTERACTION", {
        baseState: s
      });
      let u = s;
      return [ y => {
        const [T, O] = gr(u, y);
        return u = T, this.messageBus.send("OBR_INTERACTION_UPDATE_ITEM_INTERACTION", {
          id: r,
          patches: O
        }), T;
      }, () => {
        this.messageBus.send("OBR_INTERACTION_STOP_ITEM_INTERACTION", {
          id: r
        });
      } ];
    }));
  }
}

var Vb = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class Qb {
  constructor(s) {
    this.messageBus = s;
  }
  getPlayers() {
    return Vb(this, void 0, void 0, (function*() {
      const {players: s} = yield this.messageBus.sendAsync("OBR_PARTY_GET_PLAYERS", {});
      return s;
    }));
  }
  onChange(s) {
    const r = u => {
      s(u.players);
    };
    return this.messageBus.send("OBR_PARTY_SUBSCRIBE", {}), this.messageBus.on("OBR_PARTY_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_PARTY_UNSUBSCRIBE", {}), this.messageBus.off("OBR_PARTY_EVENT_CHANGE", r);
    };
  }
}

var tr = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class Ib {
  constructor(s) {
    this.messageBus = s;
  }
  get id() {
    return this.messageBus.roomId;
  }
  getPermissions() {
    return tr(this, void 0, void 0, (function*() {
      const {permissions: s} = yield this.messageBus.sendAsync("OBR_ROOM_GET_PERMISSIONS", {});
      return s;
    }));
  }
  getMetadata() {
    return tr(this, void 0, void 0, (function*() {
      const {metadata: s} = yield this.messageBus.sendAsync("OBR_ROOM_GET_METADATA", {});
      return s;
    }));
  }
  setMetadata(s) {
    return tr(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_ROOM_SET_METADATA", {
        update: s
      });
    }));
  }
  onMetadataChange(s) {
    const r = u => {
      s(u.metadata);
    };
    return this.messageBus.send("OBR_ROOM_METADATA_SUBSCRIBE", {}), this.messageBus.on("OBR_ROOM_METADATA_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_METADATA_ROOM_UNSUBSCRIBE", {}), this.messageBus.off("OBR_ROOM_METADATA_EVENT_CHANGE", r);
    };
  }
  onPermissionsChange(s) {
    const r = u => {
      s(u.permissions);
    };
    return this.messageBus.send("OBR_ROOM_PERMISSIONS_SUBSCRIBE", {}), this.messageBus.on("OBR_ROOM_PERMISSIONS_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_PERMISSIONS_ROOM_UNSUBSCRIBE", {}), this.messageBus.off("OBR_ROOM_PERMISSIONS_EVENT_CHANGE", r);
    };
  }
}

var Xb = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class Kb {
  constructor(s) {
    this.messageBus = s;
  }
  getTheme() {
    return Xb(this, void 0, void 0, (function*() {
      const {theme: s} = yield this.messageBus.sendAsync("OBR_THEME_GET_THEME", {});
      return s;
    }));
  }
  onChange(s) {
    const r = u => {
      s(u.theme);
    };
    return this.messageBus.send("OBR_THEME_SUBSCRIBE", {}), this.messageBus.on("OBR_THEME_EVENT_CHANGE", r), 
    () => {
      this.messageBus.send("OBR_THEME_UNSUBSCRIBE", {}), this.messageBus.off("OBR_THEME_EVENT_CHANGE", r);
    };
  }
}

var ws = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class Zb {
  constructor(s) {
    this.messageBus = s;
  }
  uploadImages(s, r) {
    return ws(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_IMAGES", {
        images: s,
        typeHint: r
      });
    }));
  }
  uploadScenes(s, r) {
    return ws(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_SCENES", {
        scenes: s,
        disableShowScenes: r
      });
    }));
  }
  downloadImages(s, r, u) {
    return ws(this, void 0, void 0, (function*() {
      const {images: m} = yield this.messageBus.sendAsync("OBR_ASSETS_DOWNLOAD_IMAGES", {
        multiple: s,
        defaultSearch: r,
        typeHint: u
      }, -1);
      return m;
    }));
  }
  downloadScenes(s, r) {
    return ws(this, void 0, void 0, (function*() {
      const {scenes: u} = yield this.messageBus.sendAsync("OBR_ASSETS_DOWNLOAD_SCENES", {
        multiple: s,
        defaultSearch: r
      }, -1);
      return u;
    }));
  }
}

var Wb = function(o, s, r, u) {
  function m(h) {
    return h instanceof r ? h : new r((function(y) {
      y(h);
    }));
  }
  return new (r || (r = Promise))((function(h, y) {
    function T(p) {
      try {
        g(u.next(p));
      } catch (R) {
        y(R);
      }
    }
    function O(p) {
      try {
        g(u.throw(p));
      } catch (R) {
        y(R);
      }
    }
    function g(p) {
      p.done ? h(p.value) : m(p.value).then(T, O);
    }
    g((u = u.apply(o, s || [])).next());
  }));
};

class Jb {
  constructor(s) {
    this.messageBus = s;
  }
  sendMessage(s, r, u) {
    return Wb(this, void 0, void 0, (function*() {
      yield this.messageBus.sendAsync("OBR_BROADCAST_SEND_MESSAGE", {
        channel: s,
        data: r,
        options: u
      });
    }));
  }
  onMessage(s, r) {
    return this.messageBus.send("OBR_BROADCAST_SUBSCRIBE", {
      channel: s
    }), this.messageBus.on(`OBR_BROADCAST_MESSAGE_${s}`, r), () => {
      this.messageBus.send("OBR_BROADCAST_UNSUBSCRIBE", {
        channel: s
      }), this.messageBus.off(`OBR_BROADCAST_MESSAGE_${s}`, r);
    };
  }
}

const pr = typeof Buffer == "function", Th = typeof TextDecoder == "function" ? new TextDecoder : void 0;

typeof TextEncoder == "function" && new TextEncoder;

const Fb = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Pb = Array.prototype.slice.call(Fb), _s = (o => {
  let s = {};
  return o.forEach(((r, u) => s[r] = u)), s;
})(Pb), $b = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/, rn = String.fromCharCode.bind(String), Oh = typeof Uint8Array.from == "function" ? Uint8Array.from.bind(Uint8Array) : o => new Uint8Array(Array.prototype.slice.call(o, 0)), Lh = o => o.replace(/[^A-Za-z0-9\+\/]/g, ""), tp = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g, ep = o => {
  switch (o.length) {
   case 4:
    var s = (7 & o.charCodeAt(0)) << 18 | (63 & o.charCodeAt(1)) << 12 | (63 & o.charCodeAt(2)) << 6 | 63 & o.charCodeAt(3), r = s - 65536;
    return rn((r >>> 10) + 55296) + rn((r & 1023) + 56320);

   case 3:
    return rn((15 & o.charCodeAt(0)) << 12 | (63 & o.charCodeAt(1)) << 6 | 63 & o.charCodeAt(2));

   default:
    return rn((31 & o.charCodeAt(0)) << 6 | 63 & o.charCodeAt(1));
  }
}, ap = o => o.replace(tp, ep), np = o => {
  if (o = o.replace(/\s+/g, ""), !$b.test(o)) throw new TypeError("malformed base64.");
  o += "==".slice(2 - (o.length & 3));
  let s, r = "", u, m;
  for (let h = 0; h < o.length; ) s = _s[o.charAt(h++)] << 18 | _s[o.charAt(h++)] << 12 | (u = _s[o.charAt(h++)]) << 6 | (m = _s[o.charAt(h++)]), 
  r += u === 64 ? rn(s >> 16 & 255) : m === 64 ? rn(s >> 16 & 255, s >> 8 & 255) : rn(s >> 16 & 255, s >> 8 & 255, s & 255);
  return r;
}, jh = typeof atob == "function" ? o => atob(Lh(o)) : pr ? o => Buffer.from(o, "base64").toString("binary") : np, ip = pr ? o => Oh(Buffer.from(o, "base64")) : o => Oh(jh(o).split("").map((s => s.charCodeAt(0)))), lp = pr ? o => Buffer.from(o, "base64").toString("utf8") : Th ? o => Th.decode(ip(o)) : o => ap(jh(o)), sp = o => Lh(o.replace(/[-_]/g, (s => s == "-" ? "+" : "/"))), op = o => lp(sp(o));

function up() {
  const s = new URLSearchParams(window.location.search).get("obrref");
  let r = "", u = "";
  if (s) {
    const h = op(s).split(" ");
    h.length === 2 && (r = h[0], u = h[1]);
  }
  return {
    origin: r,
    roomId: u
  };
}

var wh;

(function(o) {
  o[o.MOVE = 0] = "MOVE", o[o.LINE = 1] = "LINE", o[o.QUAD = 2] = "QUAD", o[o.CONIC = 3] = "CONIC", 
  o[o.CUBIC = 4] = "CUBIC", o[o.CLOSE = 5] = "CLOSE";
})(wh || (wh = {}));


export function parseObrReference() {
  return up();
}

export function createObrClient(reference = parseObrReference()) {
  const messageBus = new pb(reference.origin, reference.roomId);
  const obr = {
    onReady: callback => {
      messageBus.ready ? callback() : messageBus.once("OBR_READY", () => callback());
    },
    get isReady() {
      return messageBus.ready;
    },
    viewport: new rb(messageBus),
    player: new ub(messageBus),
    party: new Qb(messageBus),
    notification: new vb(messageBus),
    scene: new Lb(messageBus),
    contextMenu: new jb(messageBus),
    tool: new Hb(messageBus),
    popover: new zb(messageBus),
    modal: new Ub(messageBus),
    action: new Gb(messageBus),
    interaction: new qb(messageBus),
    room: new Ib(messageBus),
    theme: new Kb(messageBus),
    assets: new Zb(messageBus),
    broadcast: new Jb(messageBus),
    isAvailable: !!reference.origin
  };

  return {
    messageBus,
    obr,
    reference
  };
}
