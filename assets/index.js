(function() {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const m of document.querySelectorAll('link[rel="modulepreload"]')) u(m);
  new MutationObserver((m => {
    for (const h of m) if (h.type === "childList") for (const y of h.addedNodes) y.tagName === "LINK" && y.rel === "modulepreload" && u(y);
  })).observe(document, {
    childList: !0,
    subtree: !0
  });
  function r(m) {
    const h = {};
    return m.integrity && (h.integrity = m.integrity), m.referrerPolicy && (h.referrerPolicy = m.referrerPolicy), 
    m.crossOrigin === "use-credentials" ? h.credentials = "include" : m.crossOrigin === "anonymous" ? h.credentials = "omit" : h.credentials = "same-origin", 
    h;
  }
  function u(m) {
    if (m.ep) return;
    m.ep = !0;
    const h = r(m);
    fetch(m.href, h);
  }
})();

function sg(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}

var Vu = {
  exports: {}
}, Pi = {};

var nh;

function og() {
  if (nh) return Pi;
  nh = 1;
  var o = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function r(u, m, h) {
    var y = null;
    if (h !== void 0 && (y = "" + h), m.key !== void 0 && (y = "" + m.key), "key" in m) {
      h = {};
      for (var T in m) T !== "key" && (h[T] = m[T]);
    } else h = m;
    return m = h.ref, {
      $$typeof: o,
      type: u,
      key: y,
      ref: m !== void 0 ? m : null,
      props: h
    };
  }
  return Pi.Fragment = s, Pi.jsx = r, Pi.jsxs = r, Pi;
}

var ih;

function ug() {
  return ih || (ih = 1, Vu.exports = og()), Vu.exports;
}

var d = ug(), Qu = {
  exports: {}
}, ct = {};

var lh;

function rg() {
  if (lh) return ct;
  lh = 1;
  var o = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), y = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), R = Symbol.iterator;
  function G(A) {
    return A === null || typeof A != "object" ? null : (A = R && A[R] || A["@@iterator"], 
    typeof A == "function" ? A : null);
  }
  var W = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
  }, X = Object.assign, P = {};
  function it(A, U, at) {
    this.props = A, this.context = U, this.refs = P, this.updater = at || W;
  }
  it.prototype.isReactComponent = {}, it.prototype.setState = function(A, U) {
    if (typeof A != "object" && typeof A != "function" && A != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, A, U, "setState");
  }, it.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function ut() {}
  ut.prototype = it.prototype;
  function J(A, U, at) {
    this.props = A, this.context = U, this.refs = P, this.updater = at || W;
  }
  var H = J.prototype = new ut;
  H.constructor = J, X(H, it.prototype), H.isPureReactComponent = !0;
  var N = Array.isArray, B = {
    H: null,
    A: null,
    T: null,
    S: null
  }, k = Object.prototype.hasOwnProperty;
  function z(A, U, at, tt, M, Q) {
    return at = Q.ref, {
      $$typeof: o,
      type: A,
      key: U,
      ref: at !== void 0 ? at : null,
      props: Q
    };
  }
  function I(A, U) {
    return z(A.type, U, void 0, void 0, void 0, A.props);
  }
  function q(A) {
    return typeof A == "object" && A !== null && A.$$typeof === o;
  }
  function V(A) {
    var U = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + A.replace(/[=:]/g, (function(at) {
      return U[at];
    }));
  }
  var bt = /\/+/g;
  function Dt(A, U) {
    return typeof A == "object" && A !== null && A.key != null ? V("" + A.key) : U.toString(36);
  }
  function Vt() {}
  function te(A) {
    switch (A.status) {
     case "fulfilled":
      return A.value;

     case "rejected":
      throw A.reason;

     default:
      switch (typeof A.status == "string" ? A.then(Vt, Vt) : (A.status = "pending", A.then((function(U) {
        A.status === "pending" && (A.status = "fulfilled", A.value = U);
      }), (function(U) {
        A.status === "pending" && (A.status = "rejected", A.reason = U);
      }))), A.status) {
       case "fulfilled":
        return A.value;

       case "rejected":
        throw A.reason;
      }
    }
    throw A;
  }
  function jt(A, U, at, tt, M) {
    var Q = typeof A;
    (Q === "undefined" || Q === "boolean") && (A = null);
    var K = !1;
    if (A === null) K = !0; else switch (Q) {
     case "bigint":
     case "string":
     case "number":
      K = !0;
      break;

     case "object":
      switch (A.$$typeof) {
       case o:
       case s:
        K = !0;
        break;

       case p:
        return K = A._init, jt(K(A._payload), U, at, tt, M);
      }
    }
    if (K) return M = M(A), K = tt === "" ? "." + Dt(A, 0) : tt, N(M) ? (at = "", K != null && (at = K.replace(bt, "$&/") + "/"), 
    jt(M, U, at, "", (function(_t) {
      return _t;
    }))) : M != null && (q(M) && (M = I(M, at + (M.key == null || A && A.key === M.key ? "" : ("" + M.key).replace(bt, "$&/") + "/") + K)), 
    U.push(M)), 1;
    K = 0;
    var Ot = tt === "" ? "." : tt + ":";
    if (N(A)) for (var dt = 0; dt < A.length; dt++) tt = A[dt], Q = Ot + Dt(tt, dt), 
    K += jt(tt, U, at, Q, M); else if (dt = G(A), typeof dt == "function") for (A = dt.call(A), 
    dt = 0; !(tt = A.next()).done; ) tt = tt.value, Q = Ot + Dt(tt, dt++), K += jt(tt, U, at, Q, M); else if (Q === "object") {
      if (typeof A.then == "function") return jt(te(A), U, at, tt, M);
      throw U = String(A), Error("Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead.");
    }
    return K;
  }
  function Y(A, U, at) {
    if (A == null) return A;
    var tt = [], M = 0;
    return jt(A, tt, "", "", (function(Q) {
      return U.call(at, Q, M++);
    })), tt;
  }
  function nt(A) {
    if (A._status === -1) {
      var U = A._result;
      U = U(), U.then((function(at) {
        (A._status === 0 || A._status === -1) && (A._status = 1, A._result = at);
      }), (function(at) {
        (A._status === 0 || A._status === -1) && (A._status = 2, A._result = at);
      })), A._status === -1 && (A._status = 0, A._result = U);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var et = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var U = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(U)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  };
  function At() {}
  return ct.Children = {
    map: Y,
    forEach: function(A, U, at) {
      Y(A, (function() {
        U.apply(this, arguments);
      }), at);
    },
    count: function(A) {
      var U = 0;
      return Y(A, (function() {
        U++;
      })), U;
    },
    toArray: function(A) {
      return Y(A, (function(U) {
        return U;
      })) || [];
    },
    only: function(A) {
      if (!q(A)) throw Error("React.Children.only expected to receive a single React element child.");
      return A;
    }
  }, ct.Component = it, ct.Fragment = r, ct.Profiler = m, ct.PureComponent = J, ct.StrictMode = u, 
  ct.Suspense = O, ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B, 
  ct.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, ct.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, ct.cloneElement = function(A, U, at) {
    if (A == null) throw Error("The argument must be a React element, but you passed " + A + ".");
    var tt = X({}, A.props), M = A.key, Q = void 0;
    if (U != null) for (K in U.ref !== void 0 && (Q = void 0), U.key !== void 0 && (M = "" + U.key), 
    U) !k.call(U, K) || K === "key" || K === "__self" || K === "__source" || K === "ref" && U.ref === void 0 || (tt[K] = U[K]);
    var K = arguments.length - 2;
    if (K === 1) tt.children = at; else if (1 < K) {
      for (var Ot = Array(K), dt = 0; dt < K; dt++) Ot[dt] = arguments[dt + 2];
      tt.children = Ot;
    }
    return z(A.type, M, void 0, void 0, Q, tt);
  }, ct.createContext = function(A) {
    return A = {
      $$typeof: y,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: h,
      _context: A
    }, A;
  }, ct.createElement = function(A, U, at) {
    var tt, M = {}, Q = null;
    if (U != null) for (tt in U.key !== void 0 && (Q = "" + U.key), U) k.call(U, tt) && tt !== "key" && tt !== "__self" && tt !== "__source" && (M[tt] = U[tt]);
    var K = arguments.length - 2;
    if (K === 1) M.children = at; else if (1 < K) {
      for (var Ot = Array(K), dt = 0; dt < K; dt++) Ot[dt] = arguments[dt + 2];
      M.children = Ot;
    }
    if (A && A.defaultProps) for (tt in K = A.defaultProps, K) M[tt] === void 0 && (M[tt] = K[tt]);
    return z(A, Q, void 0, void 0, null, M);
  }, ct.createRef = function() {
    return {
      current: null
    };
  }, ct.forwardRef = function(A) {
    return {
      $$typeof: T,
      render: A
    };
  }, ct.isValidElement = q, ct.lazy = function(A) {
    return {
      $$typeof: p,
      _payload: {
        _status: -1,
        _result: A
      },
      _init: nt
    };
  }, ct.memo = function(A, U) {
    return {
      $$typeof: g,
      type: A,
      compare: U === void 0 ? null : U
    };
  }, ct.startTransition = function(A) {
    var U = B.T, at = {};
    B.T = at;
    try {
      var tt = A(), M = B.S;
      M !== null && M(at, tt), typeof tt == "object" && tt !== null && typeof tt.then == "function" && tt.then(At, et);
    } catch (Q) {
      et(Q);
    } finally {
      B.T = U;
    }
  }, ct.unstable_useCacheRefresh = function() {
    return B.H.useCacheRefresh();
  }, ct.use = function(A) {
    return B.H.use(A);
  }, ct.useActionState = function(A, U, at) {
    return B.H.useActionState(A, U, at);
  }, ct.useCallback = function(A, U) {
    return B.H.useCallback(A, U);
  }, ct.useContext = function(A) {
    return B.H.useContext(A);
  }, ct.useDebugValue = function() {}, ct.useDeferredValue = function(A, U) {
    return B.H.useDeferredValue(A, U);
  }, ct.useEffect = function(A, U) {
    return B.H.useEffect(A, U);
  }, ct.useId = function() {
    return B.H.useId();
  }, ct.useImperativeHandle = function(A, U, at) {
    return B.H.useImperativeHandle(A, U, at);
  }, ct.useInsertionEffect = function(A, U) {
    return B.H.useInsertionEffect(A, U);
  }, ct.useLayoutEffect = function(A, U) {
    return B.H.useLayoutEffect(A, U);
  }, ct.useMemo = function(A, U) {
    return B.H.useMemo(A, U);
  }, ct.useOptimistic = function(A, U) {
    return B.H.useOptimistic(A, U);
  }, ct.useReducer = function(A, U, at) {
    return B.H.useReducer(A, U, at);
  }, ct.useRef = function(A) {
    return B.H.useRef(A);
  }, ct.useState = function(A) {
    return B.H.useState(A);
  }, ct.useSyncExternalStore = function(A, U, at) {
    return B.H.useSyncExternalStore(A, U, at);
  }, ct.useTransition = function() {
    return B.H.useTransition();
  }, ct.version = "19.0.0", ct;
}

var sh;

function dr() {
  return sh || (sh = 1, Qu.exports = rg()), Qu.exports;
}

var Et = dr(), Iu = {
  exports: {}
}, $i = {}, Xu = {
  exports: {}
}, Ku = {};

var oh;

function cg() {
  return oh || (oh = 1, function(o) {
    function s(Y, nt) {
      var et = Y.length;
      Y.push(nt);
      t: for (;0 < et; ) {
        var At = et - 1 >>> 1, A = Y[At];
        if (0 < m(A, nt)) Y[At] = nt, Y[et] = A, et = At; else break t;
      }
    }
    function r(Y) {
      return Y.length === 0 ? null : Y[0];
    }
    function u(Y) {
      if (Y.length === 0) return null;
      var nt = Y[0], et = Y.pop();
      if (et !== nt) {
        Y[0] = et;
        t: for (var At = 0, A = Y.length, U = A >>> 1; At < U; ) {
          var at = 2 * (At + 1) - 1, tt = Y[at], M = at + 1, Q = Y[M];
          if (0 > m(tt, et)) M < A && 0 > m(Q, tt) ? (Y[At] = Q, Y[M] = et, At = M) : (Y[At] = tt, 
          Y[at] = et, At = at); else if (M < A && 0 > m(Q, et)) Y[At] = Q, Y[M] = et, At = M; else break t;
        }
      }
      return nt;
    }
    function m(Y, nt) {
      var et = Y.sortIndex - nt.sortIndex;
      return et !== 0 ? et : Y.id - nt.id;
    }
    if (o.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      o.unstable_now = function() {
        return h.now();
      };
    } else {
      var y = Date, T = y.now();
      o.unstable_now = function() {
        return y.now() - T;
      };
    }
    var O = [], g = [], p = 1, R = null, G = 3, W = !1, X = !1, P = !1, it = typeof setTimeout == "function" ? setTimeout : null, ut = typeof clearTimeout == "function" ? clearTimeout : null, J = typeof setImmediate < "u" ? setImmediate : null;
    function H(Y) {
      for (var nt = r(g); nt !== null; ) {
        if (nt.callback === null) u(g); else if (nt.startTime <= Y) u(g), nt.sortIndex = nt.expirationTime, 
        s(O, nt); else break;
        nt = r(g);
      }
    }
    function N(Y) {
      if (P = !1, H(Y), !X) if (r(O) !== null) X = !0, te(); else {
        var nt = r(g);
        nt !== null && jt(N, nt.startTime - Y);
      }
    }
    var B = !1, k = -1, z = 5, I = -1;
    function q() {
      return !(o.unstable_now() - I < z);
    }
    function V() {
      if (B) {
        var Y = o.unstable_now();
        I = Y;
        var nt = !0;
        try {
          t: {
            X = !1, P && (P = !1, ut(k), k = -1), W = !0;
            var et = G;
            try {
              e: {
                for (H(Y), R = r(O); R !== null && !(R.expirationTime > Y && q()); ) {
                  var At = R.callback;
                  if (typeof At == "function") {
                    R.callback = null, G = R.priorityLevel;
                    var A = At(R.expirationTime <= Y);
                    if (Y = o.unstable_now(), typeof A == "function") {
                      R.callback = A, H(Y), nt = !0;
                      break e;
                    }
                    R === r(O) && u(O), H(Y);
                  } else u(O);
                  R = r(O);
                }
                if (R !== null) nt = !0; else {
                  var U = r(g);
                  U !== null && jt(N, U.startTime - Y), nt = !1;
                }
              }
              break t;
            } finally {
              R = null, G = et, W = !1;
            }
            nt = void 0;
          }
        } finally {
          nt ? bt() : B = !1;
        }
      }
    }
    var bt;
    if (typeof J == "function") bt = function() {
      J(V);
    }; else if (typeof MessageChannel < "u") {
      var Dt = new MessageChannel, Vt = Dt.port2;
      Dt.port1.onmessage = V, bt = function() {
        Vt.postMessage(null);
      };
    } else bt = function() {
      it(V, 0);
    };
    function te() {
      B || (B = !0, bt());
    }
    function jt(Y, nt) {
      k = it((function() {
        Y(o.unstable_now());
      }), nt);
    }
    o.unstable_IdlePriority = 5, o.unstable_ImmediatePriority = 1, o.unstable_LowPriority = 4, 
    o.unstable_NormalPriority = 3, o.unstable_Profiling = null, o.unstable_UserBlockingPriority = 2, 
    o.unstable_cancelCallback = function(Y) {
      Y.callback = null;
    }, o.unstable_continueExecution = function() {
      X || W || (X = !0, te());
    }, o.unstable_forceFrameRate = function(Y) {
      0 > Y || 125 < Y ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : z = 0 < Y ? Math.floor(1e3 / Y) : 5;
    }, o.unstable_getCurrentPriorityLevel = function() {
      return G;
    }, o.unstable_getFirstCallbackNode = function() {
      return r(O);
    }, o.unstable_next = function(Y) {
      switch (G) {
       case 1:
       case 2:
       case 3:
        var nt = 3;
        break;

       default:
        nt = G;
      }
      var et = G;
      G = nt;
      try {
        return Y();
      } finally {
        G = et;
      }
    }, o.unstable_pauseExecution = function() {}, o.unstable_requestPaint = function() {}, 
    o.unstable_runWithPriority = function(Y, nt) {
      switch (Y) {
       case 1:
       case 2:
       case 3:
       case 4:
       case 5:
        break;

       default:
        Y = 3;
      }
      var et = G;
      G = Y;
      try {
        return nt();
      } finally {
        G = et;
      }
    }, o.unstable_scheduleCallback = function(Y, nt, et) {
      var At = o.unstable_now();
      switch (typeof et == "object" && et !== null ? (et = et.delay, et = typeof et == "number" && 0 < et ? At + et : At) : et = At, 
      Y) {
       case 1:
        var A = -1;
        break;

       case 2:
        A = 250;
        break;

       case 5:
        A = 1073741823;
        break;

       case 4:
        A = 1e4;
        break;

       default:
        A = 5e3;
      }
      return A = et + A, Y = {
        id: p++,
        callback: nt,
        priorityLevel: Y,
        startTime: et,
        expirationTime: A,
        sortIndex: -1
      }, et > At ? (Y.sortIndex = et, s(g, Y), r(O) === null && Y === r(g) && (P ? (ut(k), 
      k = -1) : P = !0, jt(N, et - At))) : (Y.sortIndex = A, s(O, Y), X || W || (X = !0, 
      te())), Y;
    }, o.unstable_shouldYield = q, o.unstable_wrapCallback = function(Y) {
      var nt = G;
      return function() {
        var et = G;
        G = nt;
        try {
          return Y.apply(this, arguments);
        } finally {
          G = et;
        }
      };
    };
  }(Ku)), Ku;
}

var uh;

function dg() {
  return uh || (uh = 1, Xu.exports = cg()), Xu.exports;
}

var Zu = {
  exports: {}
}, ne = {};

var rh;

function fg() {
  if (rh) return ne;
  rh = 1;
  var o = dr();
  function s(O) {
    var g = "https://react.dev/errors/" + O;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var p = 2; p < arguments.length; p++) g += "&args[]=" + encodeURIComponent(arguments[p]);
    }
    return "Minified React error #" + O + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {}
  var u = {
    d: {
      f: r,
      r: function() {
        throw Error(s(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, m = Symbol.for("react.portal");
  function h(O, g, p) {
    var R = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: R == null ? null : "" + R,
      children: O,
      containerInfo: g,
      implementation: p
    };
  }
  var y = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function T(O, g) {
    if (O === "font") return "";
    if (typeof g == "string") return g === "use-credentials" ? g : "";
  }
  return ne.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, ne.createPortal = function(O, g) {
    var p = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11) throw Error(s(299));
    return h(O, g, null, p);
  }, ne.flushSync = function(O) {
    var g = y.T, p = u.p;
    try {
      if (y.T = null, u.p = 2, O) return O();
    } finally {
      y.T = g, u.p = p, u.d.f();
    }
  }, ne.preconnect = function(O, g) {
    typeof O == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, 
    u.d.C(O, g));
  }, ne.prefetchDNS = function(O) {
    typeof O == "string" && u.d.D(O);
  }, ne.preinit = function(O, g) {
    if (typeof O == "string" && g && typeof g.as == "string") {
      var p = g.as, R = T(p, g.crossOrigin), G = typeof g.integrity == "string" ? g.integrity : void 0, W = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      p === "style" ? u.d.S(O, typeof g.precedence == "string" ? g.precedence : void 0, {
        crossOrigin: R,
        integrity: G,
        fetchPriority: W
      }) : p === "script" && u.d.X(O, {
        crossOrigin: R,
        integrity: G,
        fetchPriority: W,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, ne.preinitModule = function(O, g) {
    if (typeof O == "string") if (typeof g == "object" && g !== null) {
      if (g.as == null || g.as === "script") {
        var p = T(g.as, g.crossOrigin);
        u.d.M(O, {
          crossOrigin: p,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0
        });
      }
    } else g == null && u.d.M(O);
  }, ne.preload = function(O, g) {
    if (typeof O == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var p = g.as, R = T(p, g.crossOrigin);
      u.d.L(O, p, {
        crossOrigin: R,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, ne.preloadModule = function(O, g) {
    if (typeof O == "string") if (g) {
      var p = T(g.as, g.crossOrigin);
      u.d.m(O, {
        as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
        crossOrigin: p,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0
      });
    } else u.d.m(O);
  }, ne.requestFormReset = function(O) {
    u.d.r(O);
  }, ne.unstable_batchedUpdates = function(O, g) {
    return O(g);
  }, ne.useFormState = function(O, g, p) {
    return y.H.useFormState(O, g, p);
  }, ne.useFormStatus = function() {
    return y.H.useHostTransitionStatus();
  }, ne.version = "19.0.0", ne;
}

var ch;

function hg() {
  if (ch) return Zu.exports;
  ch = 1;
  function o() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
    } catch (s) {
      console.error(s);
    }
  }
  return o(), Zu.exports = fg(), Zu.exports;
}

var dh;

function mg() {
  if (dh) return $i;
  dh = 1;
  var o = dg(), s = dr(), r = hg();
  function u(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++) e += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function m(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  var h = Symbol.for("react.element"), y = Symbol.for("react.transitional.element"), T = Symbol.for("react.portal"), O = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), G = Symbol.for("react.consumer"), W = Symbol.for("react.context"), X = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), it = Symbol.for("react.suspense_list"), ut = Symbol.for("react.memo"), J = Symbol.for("react.lazy"), H = Symbol.for("react.offscreen"), N = Symbol.for("react.memo_cache_sentinel"), B = Symbol.iterator;
  function k(t) {
    return t === null || typeof t != "object" ? null : (t = B && t[B] || t["@@iterator"], 
    typeof t == "function" ? t : null);
  }
  var z = Symbol.for("react.client.reference");
  function I(t) {
    if (t == null) return null;
    if (typeof t == "function") return t.$$typeof === z ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
     case O:
      return "Fragment";

     case T:
      return "Portal";

     case p:
      return "Profiler";

     case g:
      return "StrictMode";

     case P:
      return "Suspense";

     case it:
      return "SuspenseList";
    }
    if (typeof t == "object") switch (t.$$typeof) {
     case W:
      return (t.displayName || "Context") + ".Provider";

     case G:
      return (t._context.displayName || "Context") + ".Consumer";

     case X:
      var e = t.render;
      return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), 
      t;

     case ut:
      return e = t.displayName || null, e !== null ? e : I(t.type) || "Memo";

     case J:
      e = t._payload, t = t._init;
      try {
        return I(t(e));
      } catch {}
    }
    return null;
  }
  var q = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = Object.assign, bt, Dt;
  function Vt(t) {
    if (bt === void 0) try {
      throw Error();
    } catch (a) {
      var e = a.stack.trim().match(/\n( *(at )?)/);
      bt = e && e[1] || "", Dt = -1 < a.stack.indexOf(`\n    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `\n` + bt + t + Dt;
  }
  var te = !1;
  function jt(t, e) {
    if (!t || te) return "";
    te = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var j = function() {
                throw Error();
              };
              if (Object.defineProperty(j.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(j, []);
                } catch (x) {
                  var C = x;
                }
                Reflect.construct(t, [], j);
              } else {
                try {
                  j.call();
                } catch (x) {
                  C = x;
                }
                t.call(j.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                C = x;
              }
              (j = t()) && typeof j.catch == "function" && j.catch((function() {}));
            }
          } catch (x) {
            if (x && C && typeof x.stack == "string") return [ x.stack, C.stack ];
          }
          return [ null, null ];
        }
      };
      n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var i = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, "name");
      i && i.configurable && Object.defineProperty(n.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot"
      });
      var l = n.DetermineComponentFrameRoot(), c = l[0], f = l[1];
      if (c && f) {
        var b = c.split(`\n`), S = f.split(`\n`);
        for (i = n = 0; n < b.length && !b[n].includes("DetermineComponentFrameRoot"); ) n++;
        for (;i < S.length && !S[i].includes("DetermineComponentFrameRoot"); ) i++;
        if (n === b.length || i === S.length) for (n = b.length - 1, i = S.length - 1; 1 <= n && 0 <= i && b[n] !== S[i]; ) i--;
        for (;1 <= n && 0 <= i; n--, i--) if (b[n] !== S[i]) {
          if (n !== 1 || i !== 1) do {
            if (n--, i--, 0 > i || b[n] !== S[i]) {
              var D = `\n` + b[n].replace(" at new ", " at ");
              return t.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", t.displayName)), 
              D;
            }
          } while (1 <= n && 0 <= i);
          break;
        }
      }
    } finally {
      te = !1, Error.prepareStackTrace = a;
    }
    return (a = t ? t.displayName || t.name : "") ? Vt(a) : "";
  }
  function Y(t) {
    switch (t.tag) {
     case 26:
     case 27:
     case 5:
      return Vt(t.type);

     case 16:
      return Vt("Lazy");

     case 13:
      return Vt("Suspense");

     case 19:
      return Vt("SuspenseList");

     case 0:
     case 15:
      return t = jt(t.type, !1), t;

     case 11:
      return t = jt(t.type.render, !1), t;

     case 1:
      return t = jt(t.type, !0), t;

     default:
      return "";
    }
  }
  function nt(t) {
    try {
      var e = "";
      do {
        e += Y(t), t = t.return;
      } while (t);
      return e;
    } catch (a) {
      return `\nError generating stack: ` + a.message + `\n` + a.stack;
    }
  }
  function et(t) {
    var e = t, a = t;
    if (t.alternate) for (;e.return; ) e = e.return; else {
      t = e;
      do {
        e = t, e.flags & 4098 && (a = e.return), t = e.return;
      } while (t);
    }
    return e.tag === 3 ? a : null;
  }
  function At(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function A(t) {
    if (et(t) !== t) throw Error(u(188));
  }
  function U(t) {
    var e = t.alternate;
    if (!e) {
      if (e = et(t), e === null) throw Error(u(188));
      return e !== t ? null : t;
    }
    for (var a = t, n = e; ;) {
      var i = a.return;
      if (i === null) break;
      var l = i.alternate;
      if (l === null) {
        if (n = i.return, n !== null) {
          a = n;
          continue;
        }
        break;
      }
      if (i.child === l.child) {
        for (l = i.child; l; ) {
          if (l === a) return A(i), t;
          if (l === n) return A(i), e;
          l = l.sibling;
        }
        throw Error(u(188));
      }
      if (a.return !== n.return) a = i, n = l; else {
        for (var c = !1, f = i.child; f; ) {
          if (f === a) {
            c = !0, a = i, n = l;
            break;
          }
          if (f === n) {
            c = !0, n = i, a = l;
            break;
          }
          f = f.sibling;
        }
        if (!c) {
          for (f = l.child; f; ) {
            if (f === a) {
              c = !0, a = l, n = i;
              break;
            }
            if (f === n) {
              c = !0, n = l, a = i;
              break;
            }
            f = f.sibling;
          }
          if (!c) throw Error(u(189));
        }
      }
      if (a.alternate !== n) throw Error(u(190));
    }
    if (a.tag !== 3) throw Error(u(188));
    return a.stateNode.current === a ? t : e;
  }
  function at(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = at(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var tt = Array.isArray, M = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, K = [], Ot = -1;
  function dt(t) {
    return {
      current: t
    };
  }
  function _t(t) {
    0 > Ot || (t.current = K[Ot], K[Ot] = null, Ot--);
  }
  function Bt(t, e) {
    Ot++, K[Ot] = t.current, t.current = e;
  }
  var qe = dt(null), ei = dt(null), fa = dt(null), ul = dt(null);
  function rl(t, e) {
    switch (Bt(fa, e), Bt(ei, t), Bt(qe, null), t = e.nodeType, t) {
     case 9:
     case 11:
      e = (e = e.documentElement) && (e = e.namespaceURI) ? Df(e) : 0;
      break;

     default:
      if (t = t === 8 ? e.parentNode : e, e = t.tagName, t = t.namespaceURI) t = Df(t), 
      e = Mf(t, e); else switch (e) {
       case "svg":
        e = 1;
        break;

       case "math":
        e = 2;
        break;

       default:
        e = 0;
      }
    }
    _t(qe), Bt(qe, e);
  }
  function mn() {
    _t(qe), _t(ei), _t(fa);
  }
  function Ms(t) {
    t.memoizedState !== null && Bt(ul, t);
    var e = qe.current, a = Mf(e, t.type);
    e !== a && (Bt(ei, t), Bt(qe, a));
  }
  function cl(t) {
    ei.current === t && (_t(qe), _t(ei)), ul.current === t && (_t(ul), Ki._currentValue = Q);
  }
  var ks = Object.prototype.hasOwnProperty, Ls = o.unstable_scheduleCallback, js = o.unstable_cancelCallback, zh = o.unstable_shouldYield, Uh = o.unstable_requestPaint, Ve = o.unstable_now, Gh = o.unstable_getCurrentPriorityLevel, Ar = o.unstable_ImmediatePriority, Er = o.unstable_UserBlockingPriority, dl = o.unstable_NormalPriority, Yh = o.unstable_LowPriority, Sr = o.unstable_IdlePriority, qh = o.log, Vh = o.unstable_setDisableYieldValue, ai = null, he = null;
  function Qh(t) {
    if (he && typeof he.onCommitFiberRoot == "function") try {
      he.onCommitFiberRoot(ai, t, void 0, (t.current.flags & 128) === 128);
    } catch {}
  }
  function ha(t) {
    if (typeof qh == "function" && Vh(t), he && typeof he.setStrictMode == "function") try {
      he.setStrictMode(ai, t);
    } catch {}
  }
  var me = Math.clz32 ? Math.clz32 : Kh, Ih = Math.log, Xh = Math.LN2;
  function Kh(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Ih(t) / Xh | 0) | 0;
  }
  var fl = 128, hl = 4194304;
  function Ua(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
     case 1:
      return 1;

     case 2:
      return 2;

     case 4:
      return 4;

     case 8:
      return 8;

     case 16:
      return 16;

     case 32:
      return 32;

     case 64:
      return 64;

     case 128:
     case 256:
     case 512:
     case 1024:
     case 2048:
     case 4096:
     case 8192:
     case 16384:
     case 32768:
     case 65536:
     case 131072:
     case 262144:
     case 524288:
     case 1048576:
     case 2097152:
      return t & 4194176;

     case 4194304:
     case 8388608:
     case 16777216:
     case 33554432:
      return t & 62914560;

     case 67108864:
      return 67108864;

     case 134217728:
      return 134217728;

     case 268435456:
      return 268435456;

     case 536870912:
      return 536870912;

     case 1073741824:
      return 0;

     default:
      return t;
    }
  }
  function ml(t, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, i = t.suspendedLanes, l = t.pingedLanes, c = t.warmLanes;
    t = t.finishedLanes !== 0;
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~i, a !== 0 ? n = Ua(a) : (l &= f, l !== 0 ? n = Ua(l) : t || (c = f & ~c, 
    c !== 0 && (n = Ua(c))))) : (f = a & ~i, f !== 0 ? n = Ua(f) : l !== 0 ? n = Ua(l) : t || (c = a & ~c, 
    c !== 0 && (n = Ua(c)))), n === 0 ? 0 : e !== 0 && e !== n && !(e & i) && (i = n & -n, 
    c = e & -e, i >= c || i === 32 && (c & 4194176) !== 0) ? e : n;
  }
  function ni(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Zh(t, e) {
    switch (t) {
     case 1:
     case 2:
     case 4:
     case 8:
      return e + 250;

     case 16:
     case 32:
     case 64:
     case 128:
     case 256:
     case 512:
     case 1024:
     case 2048:
     case 4096:
     case 8192:
     case 16384:
     case 32768:
     case 65536:
     case 131072:
     case 262144:
     case 524288:
     case 1048576:
     case 2097152:
      return e + 5e3;

     case 4194304:
     case 8388608:
     case 16777216:
     case 33554432:
      return -1;

     case 67108864:
     case 134217728:
     case 268435456:
     case 536870912:
     case 1073741824:
      return -1;

     default:
      return -1;
    }
  }
  function Tr() {
    var t = fl;
    return fl <<= 1, !(fl & 4194176) && (fl = 128), t;
  }
  function Or() {
    var t = hl;
    return hl <<= 1, !(hl & 62914560) && (hl = 4194304), t;
  }
  function Hs(t) {
    for (var e = [], a = 0; 31 > a; a++) e.push(t);
    return e;
  }
  function ii(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, 
    t.warmLanes = 0);
  }
  function Wh(t, e, a, n, i, l) {
    var c = t.pendingLanes;
    t.pendingLanes = a, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= a, 
    t.entangledLanes &= a, t.errorRecoveryDisabledLanes &= a, t.shellSuspendCounter = 0;
    var f = t.entanglements, b = t.expirationTimes, S = t.hiddenUpdates;
    for (a = c & ~a; 0 < a; ) {
      var D = 31 - me(a), j = 1 << D;
      f[D] = 0, b[D] = -1;
      var C = S[D];
      if (C !== null) for (S[D] = null, D = 0; D < C.length; D++) {
        var x = C[D];
        x !== null && (x.lane &= -536870913);
      }
      a &= ~j;
    }
    n !== 0 && wr(t, n, 0), l !== 0 && i === 0 && t.tag !== 0 && (t.suspendedLanes |= l & ~(c & ~e));
  }
  function wr(t, e, a) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var n = 31 - me(e);
    t.entangledLanes |= e, t.entanglements[n] = t.entanglements[n] | 1073741824 | a & 4194218;
  }
  function _r(t, e) {
    var a = t.entangledLanes |= e;
    for (t = t.entanglements; a; ) {
      var n = 31 - me(a), i = 1 << n;
      i & e | t[n] & e && (t[n] |= e), a &= ~i;
    }
  }
  function Rr(t) {
    return t &= -t, 2 < t ? 8 < t ? t & 134217727 ? 32 : 268435456 : 8 : 2;
  }
  function Cr() {
    var t = M.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Ff(t.type));
  }
  function Jh(t, e) {
    var a = M.p;
    try {
      return M.p = t, e();
    } finally {
      M.p = a;
    }
  }
  var ma = Math.random().toString(36).slice(2), ee = "__reactFiber$" + ma, ce = "__reactProps$" + ma, yn = "__reactContainer$" + ma, zs = "__reactEvents$" + ma, Fh = "__reactListeners$" + ma, Ph = "__reactHandles$" + ma, Br = "__reactResources$" + ma, li = "__reactMarker$" + ma;
  function Us(t) {
    delete t[ee], delete t[ce], delete t[zs], delete t[Fh], delete t[Ph];
  }
  function Ga(t) {
    var e = t[ee];
    if (e) return e;
    for (var a = t.parentNode; a; ) {
      if (e = a[yn] || a[ee]) {
        if (a = e.alternate, e.child !== null || a !== null && a.child !== null) for (t = jf(t); t !== null; ) {
          if (a = t[ee]) return a;
          t = jf(t);
        }
        return e;
      }
      t = a, a = t.parentNode;
    }
    return null;
  }
  function gn(t) {
    if (t = t[ee] || t[yn]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function si(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(u(33));
  }
  function bn(t) {
    var e = t[Br];
    return e || (e = t[Br] = {
      hoistableStyles: new Map,
      hoistableScripts: new Map
    }), e;
  }
  function Qt(t) {
    t[li] = !0;
  }
  var Nr = new Set, xr = {};
  function Ya(t, e) {
    pn(t, e), pn(t + "Capture", e);
  }
  function pn(t, e) {
    for (xr[t] = e, t = 0; t < e.length; t++) Nr.add(e[t]);
  }
  var We = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), $h = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Dr = {}, Mr = {};
  function tm(t) {
    return ks.call(Mr, t) ? !0 : ks.call(Dr, t) ? !1 : $h.test(t) ? Mr[t] = !0 : (Dr[t] = !0, 
    !1);
  }
  function yl(t, e, a) {
    if (tm(e)) if (a === null) t.removeAttribute(e); else {
      switch (typeof a) {
       case "undefined":
       case "function":
       case "symbol":
        t.removeAttribute(e);
        return;

       case "boolean":
        var n = e.toLowerCase().slice(0, 5);
        if (n !== "data-" && n !== "aria-") {
          t.removeAttribute(e);
          return;
        }
      }
      t.setAttribute(e, "" + a);
    }
  }
  function gl(t, e, a) {
    if (a === null) t.removeAttribute(e); else {
      switch (typeof a) {
       case "undefined":
       case "function":
       case "symbol":
       case "boolean":
        t.removeAttribute(e);
        return;
      }
      t.setAttribute(e, "" + a);
    }
  }
  function Je(t, e, a, n) {
    if (n === null) t.removeAttribute(a); else {
      switch (typeof n) {
       case "undefined":
       case "function":
       case "symbol":
       case "boolean":
        t.removeAttribute(a);
        return;
      }
      t.setAttributeNS(e, a, "" + n);
    }
  }
  function Te(t) {
    switch (typeof t) {
     case "bigint":
     case "boolean":
     case "number":
     case "string":
     case "undefined":
      return t;

     case "object":
      return t;

     default:
      return "";
    }
  }
  function kr(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function em(t) {
    var e = kr(t) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(t.constructor.prototype, e), n = "" + t[e];
    if (!t.hasOwnProperty(e) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var i = a.get, l = a.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return i.call(this);
        },
        set: function(c) {
          n = "" + c, l.call(this, c);
        }
      }), Object.defineProperty(t, e, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(c) {
          n = "" + c;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function bl(t) {
    t._valueTracker || (t._valueTracker = em(t));
  }
  function Lr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var a = e.getValue(), n = "";
    return t && (n = kr(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== a ? (e.setValue(t), 
    !0) : !1;
  }
  function pl(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var am = /[\n"\\]/g;
  function Oe(t) {
    return t.replace(am, (function(e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    }));
  }
  function Gs(t, e, a, n, i, l, c, f) {
    t.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.type = c : t.removeAttribute("type"), 
    e != null ? c === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Te(e)) : t.value !== "" + Te(e) && (t.value = "" + Te(e)) : c !== "submit" && c !== "reset" || t.removeAttribute("value"), 
    e != null ? Ys(t, c, Te(e)) : a != null ? Ys(t, c, Te(a)) : n != null && t.removeAttribute("value"), 
    i == null && l != null && (t.defaultChecked = !!l), i != null && (t.checked = i && typeof i != "function" && typeof i != "symbol"), 
    f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.name = "" + Te(f) : t.removeAttribute("name");
  }
  function jr(t, e, a, n, i, l, c, f) {
    if (l != null && typeof l != "function" && typeof l != "symbol" && typeof l != "boolean" && (t.type = l), 
    e != null || a != null) {
      if (!(l !== "submit" && l !== "reset" || e != null)) return;
      a = a != null ? "" + Te(a) : "", e = e != null ? "" + Te(e) : a, f || e === t.value || (t.value = e), 
      t.defaultValue = e;
    }
    n = n ?? i, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = f ? t.checked : !!n, 
    t.defaultChecked = !!n, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.name = c);
  }
  function Ys(t, e, a) {
    e === "number" && pl(t.ownerDocument) === t || t.defaultValue === "" + a || (t.defaultValue = "" + a);
  }
  function vn(t, e, a, n) {
    if (t = t.options, e) {
      e = {};
      for (var i = 0; i < a.length; i++) e["$" + a[i]] = !0;
      for (a = 0; a < t.length; a++) i = e.hasOwnProperty("$" + t[a].value), t[a].selected !== i && (t[a].selected = i), 
      i && n && (t[a].defaultSelected = !0);
    } else {
      for (a = "" + Te(a), e = null, i = 0; i < t.length; i++) {
        if (t[i].value === a) {
          t[i].selected = !0, n && (t[i].defaultSelected = !0);
          return;
        }
        e !== null || t[i].disabled || (e = t[i]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Hr(t, e, a) {
    if (e != null && (e = "" + Te(e), e !== t.value && (t.value = e), a == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = a != null ? "" + Te(a) : "";
  }
  function zr(t, e, a, n) {
    if (e == null) {
      if (n != null) {
        if (a != null) throw Error(u(92));
        if (tt(n)) {
          if (1 < n.length) throw Error(u(93));
          n = n[0];
        }
        a = n;
      }
      a == null && (a = ""), e = a;
    }
    a = Te(e), t.defaultValue = a, n = t.textContent, n === a && n !== "" && n !== null && (t.value = n);
  }
  function An(t, e) {
    if (e) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var nm = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function Ur(t, e, a) {
    var n = e.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? n ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : n ? t.setProperty(e, a) : typeof a != "number" || a === 0 || nm.has(e) ? e === "float" ? t.cssFloat = a : t[e] = ("" + a).trim() : t[e] = a + "px";
  }
  function Gr(t, e, a) {
    if (e != null && typeof e != "object") throw Error(u(62));
    if (t = t.style, a != null) {
      for (var n in a) !a.hasOwnProperty(n) || e != null && e.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "");
      for (var i in e) n = e[i], e.hasOwnProperty(i) && a[i] !== n && Ur(t, i, n);
    } else for (var l in e) e.hasOwnProperty(l) && Ur(t, l, e[l]);
  }
  function qs(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
     case "annotation-xml":
     case "color-profile":
     case "font-face":
     case "font-face-src":
     case "font-face-uri":
     case "font-face-format":
     case "font-face-name":
     case "missing-glyph":
      return !1;

     default:
      return !0;
    }
  }
  var im = new Map([ [ "acceptCharset", "accept-charset" ], [ "htmlFor", "for" ], [ "httpEquiv", "http-equiv" ], [ "crossOrigin", "crossorigin" ], [ "accentHeight", "accent-height" ], [ "alignmentBaseline", "alignment-baseline" ], [ "arabicForm", "arabic-form" ], [ "baselineShift", "baseline-shift" ], [ "capHeight", "cap-height" ], [ "clipPath", "clip-path" ], [ "clipRule", "clip-rule" ], [ "colorInterpolation", "color-interpolation" ], [ "colorInterpolationFilters", "color-interpolation-filters" ], [ "colorProfile", "color-profile" ], [ "colorRendering", "color-rendering" ], [ "dominantBaseline", "dominant-baseline" ], [ "enableBackground", "enable-background" ], [ "fillOpacity", "fill-opacity" ], [ "fillRule", "fill-rule" ], [ "floodColor", "flood-color" ], [ "floodOpacity", "flood-opacity" ], [ "fontFamily", "font-family" ], [ "fontSize", "font-size" ], [ "fontSizeAdjust", "font-size-adjust" ], [ "fontStretch", "font-stretch" ], [ "fontStyle", "font-style" ], [ "fontVariant", "font-variant" ], [ "fontWeight", "font-weight" ], [ "glyphName", "glyph-name" ], [ "glyphOrientationHorizontal", "glyph-orientation-horizontal" ], [ "glyphOrientationVertical", "glyph-orientation-vertical" ], [ "horizAdvX", "horiz-adv-x" ], [ "horizOriginX", "horiz-origin-x" ], [ "imageRendering", "image-rendering" ], [ "letterSpacing", "letter-spacing" ], [ "lightingColor", "lighting-color" ], [ "markerEnd", "marker-end" ], [ "markerMid", "marker-mid" ], [ "markerStart", "marker-start" ], [ "overlinePosition", "overline-position" ], [ "overlineThickness", "overline-thickness" ], [ "paintOrder", "paint-order" ], [ "panose-1", "panose-1" ], [ "pointerEvents", "pointer-events" ], [ "renderingIntent", "rendering-intent" ], [ "shapeRendering", "shape-rendering" ], [ "stopColor", "stop-color" ], [ "stopOpacity", "stop-opacity" ], [ "strikethroughPosition", "strikethrough-position" ], [ "strikethroughThickness", "strikethrough-thickness" ], [ "strokeDasharray", "stroke-dasharray" ], [ "strokeDashoffset", "stroke-dashoffset" ], [ "strokeLinecap", "stroke-linecap" ], [ "strokeLinejoin", "stroke-linejoin" ], [ "strokeMiterlimit", "stroke-miterlimit" ], [ "strokeOpacity", "stroke-opacity" ], [ "strokeWidth", "stroke-width" ], [ "textAnchor", "text-anchor" ], [ "textDecoration", "text-decoration" ], [ "textRendering", "text-rendering" ], [ "transformOrigin", "transform-origin" ], [ "underlinePosition", "underline-position" ], [ "underlineThickness", "underline-thickness" ], [ "unicodeBidi", "unicode-bidi" ], [ "unicodeRange", "unicode-range" ], [ "unitsPerEm", "units-per-em" ], [ "vAlphabetic", "v-alphabetic" ], [ "vHanging", "v-hanging" ], [ "vIdeographic", "v-ideographic" ], [ "vMathematical", "v-mathematical" ], [ "vectorEffect", "vector-effect" ], [ "vertAdvY", "vert-adv-y" ], [ "vertOriginX", "vert-origin-x" ], [ "vertOriginY", "vert-origin-y" ], [ "wordSpacing", "word-spacing" ], [ "writingMode", "writing-mode" ], [ "xmlnsXlink", "xmlns:xlink" ], [ "xHeight", "x-height" ] ]), lm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function vl(t) {
    return lm.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  var Vs = null;
  function Qs(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), 
    t.nodeType === 3 ? t.parentNode : t;
  }
  var En = null, Sn = null;
  function Yr(t) {
    var e = gn(t);
    if (e && (t = e.stateNode)) {
      var a = t[ce] || null;
      t: switch (t = e.stateNode, e.type) {
       case "input":
        if (Gs(t, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name), 
        e = a.name, a.type === "radio" && e != null) {
          for (a = t; a.parentNode; ) a = a.parentNode;
          for (a = a.querySelectorAll('input[name="' + Oe("" + e) + '"][type="radio"]'), e = 0; e < a.length; e++) {
            var n = a[e];
            if (n !== t && n.form === t.form) {
              var i = n[ce] || null;
              if (!i) throw Error(u(90));
              Gs(n, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
            }
          }
          for (e = 0; e < a.length; e++) n = a[e], n.form === t.form && Lr(n);
        }
        break t;

       case "textarea":
        Hr(t, a.value, a.defaultValue);
        break t;

       case "select":
        e = a.value, e != null && vn(t, !!a.multiple, e, !1);
      }
    }
  }
  var Is = !1;
  function qr(t, e, a) {
    if (Is) return t(e, a);
    Is = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (Is = !1, (En !== null || Sn !== null) && (as(), En && (e = En, t = Sn, Sn = En = null, 
      Yr(e), t))) for (e = 0; e < t.length; e++) Yr(t[e]);
    }
  }
  function oi(t, e) {
    var a = t.stateNode;
    if (a === null) return null;
    var n = a[ce] || null;
    if (n === null) return null;
    a = n[e];
    t: switch (e) {
     case "onClick":
     case "onClickCapture":
     case "onDoubleClick":
     case "onDoubleClickCapture":
     case "onMouseDown":
     case "onMouseDownCapture":
     case "onMouseMove":
     case "onMouseMoveCapture":
     case "onMouseUp":
     case "onMouseUpCapture":
     case "onMouseEnter":
      (n = !n.disabled) || (t = t.type, n = !(t === "button" || t === "input" || t === "select" || t === "textarea")), 
      t = !n;
      break t;

     default:
      t = !1;
    }
    if (t) return null;
    if (a && typeof a != "function") throw Error(u(231, e, typeof a));
    return a;
  }
  var Xs = !1;
  if (We) try {
    var ui = {};
    Object.defineProperty(ui, "passive", {
      get: function() {
        Xs = !0;
      }
    }), window.addEventListener("test", ui, ui), window.removeEventListener("test", ui, ui);
  } catch {
    Xs = !1;
  }
  var ya = null, Ks = null, Al = null;
  function Vr() {
    if (Al) return Al;
    var t, e = Ks, a = e.length, n, i = "value" in ya ? ya.value : ya.textContent, l = i.length;
    for (t = 0; t < a && e[t] === i[t]; t++) ;
    var c = a - t;
    for (n = 1; n <= c && e[a - n] === i[l - n]; n++) ;
    return Al = i.slice(t, 1 < n ? 1 - n : void 0);
  }
  function El(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, 
    t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Sl() {
    return !0;
  }
  function Qr() {
    return !1;
  }
  function de(t) {
    function e(a, n, i, l, c) {
      this._reactName = a, this._targetInst = i, this.type = n, this.nativeEvent = l, 
      this.target = c, this.currentTarget = null;
      for (var f in t) t.hasOwnProperty(f) && (a = t[f], this[f] = a ? a(l) : l[f]);
      return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1) ? Sl : Qr, 
      this.isPropagationStopped = Qr, this;
    }
    return V(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), 
        this.isDefaultPrevented = Sl);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), 
        this.isPropagationStopped = Sl);
      },
      persist: function() {},
      isPersistent: Sl
    }), e;
  }
  var qa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Tl = de(qa), ri = V({}, qa, {
    view: 0,
    detail: 0
  }), sm = de(ri), Zs, Ws, ci, Ol = V({}, ri, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Fs,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== ci && (ci && t.type === "mousemove" ? (Zs = t.screenX - ci.screenX, 
      Ws = t.screenY - ci.screenY) : Ws = Zs = 0, ci = t), Zs);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Ws;
    }
  }), Ir = de(Ol), om = V({}, Ol, {
    dataTransfer: 0
  }), um = de(om), rm = V({}, ri, {
    relatedTarget: 0
  }), Js = de(rm), cm = V({}, qa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), dm = de(cm), fm = V({}, qa, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), hm = de(fm), mm = V({}, qa, {
    data: 0
  }), Xr = de(mm), ym = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, gm = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, bm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function pm(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = bm[t]) ? !!e[t] : !1;
  }
  function Fs() {
    return pm;
  }
  var vm = V({}, ri, {
    key: function(t) {
      if (t.key) {
        var e = ym[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = El(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? gm[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Fs,
    charCode: function(t) {
      return t.type === "keypress" ? El(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? El(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Am = de(vm), Em = V({}, Ol, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Kr = de(Em), Sm = V({}, ri, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fs
  }), Tm = de(Sm), Om = V({}, qa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), wm = de(Om), _m = V({}, Ol, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Rm = de(_m), Cm = V({}, qa, {
    newState: 0,
    oldState: 0
  }), Bm = de(Cm), Nm = [ 9, 13, 27, 32 ], Ps = We && "CompositionEvent" in window, di = null;
  We && "documentMode" in document && (di = document.documentMode);
  var xm = We && "TextEvent" in window && !di, Zr = We && (!Ps || di && 8 < di && 11 >= di), Wr = " ", Jr = !1;
  function Fr(t, e) {
    switch (t) {
     case "keyup":
      return Nm.indexOf(e.keyCode) !== -1;

     case "keydown":
      return e.keyCode !== 229;

     case "keypress":
     case "mousedown":
     case "focusout":
      return !0;

     default:
      return !1;
    }
  }
  function Pr(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Tn = !1;
  function Dm(t, e) {
    switch (t) {
     case "compositionend":
      return Pr(e);

     case "keypress":
      return e.which !== 32 ? null : (Jr = !0, Wr);

     case "textInput":
      return t = e.data, t === Wr && Jr ? null : t;

     default:
      return null;
    }
  }
  function Mm(t, e) {
    if (Tn) return t === "compositionend" || !Ps && Fr(t, e) ? (t = Vr(), Al = Ks = ya = null, 
    Tn = !1, t) : null;
    switch (t) {
     case "paste":
      return null;

     case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
        if (e.char && 1 < e.char.length) return e.char;
        if (e.which) return String.fromCharCode(e.which);
      }
      return null;

     case "compositionend":
      return Zr && e.locale !== "ko" ? null : e.data;

     default:
      return null;
    }
  }
  var km = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function $r(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!km[t.type] : e === "textarea";
  }
  function tc(t, e, a, n) {
    En ? Sn ? Sn.push(n) : Sn = [ n ] : En = n, e = os(e, "onChange"), 0 < e.length && (a = new Tl("onChange", "change", null, a, n), 
    t.push({
      event: a,
      listeners: e
    }));
  }
  var fi = null, hi = null;
  function Lm(t) {
    Rf(t, 0);
  }
  function wl(t) {
    var e = si(t);
    if (Lr(e)) return t;
  }
  function ec(t, e) {
    if (t === "change") return e;
  }
  var ac = !1;
  if (We) {
    var $s;
    if (We) {
      var to = "oninput" in document;
      if (!to) {
        var nc = document.createElement("div");
        nc.setAttribute("oninput", "return;"), to = typeof nc.oninput == "function";
      }
      $s = to;
    } else $s = !1;
    ac = $s && (!document.documentMode || 9 < document.documentMode);
  }
  function ic() {
    fi && (fi.detachEvent("onpropertychange", lc), hi = fi = null);
  }
  function lc(t) {
    if (t.propertyName === "value" && wl(hi)) {
      var e = [];
      tc(e, hi, t, Qs(t)), qr(Lm, e);
    }
  }
  function jm(t, e, a) {
    t === "focusin" ? (ic(), fi = e, hi = a, fi.attachEvent("onpropertychange", lc)) : t === "focusout" && ic();
  }
  function Hm(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown") return wl(hi);
  }
  function zm(t, e) {
    if (t === "click") return wl(e);
  }
  function Um(t, e) {
    if (t === "input" || t === "change") return wl(e);
  }
  function Gm(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var ye = typeof Object.is == "function" ? Object.is : Gm;
  function mi(t, e) {
    if (ye(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null) return !1;
    var a = Object.keys(t), n = Object.keys(e);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var i = a[n];
      if (!ks.call(e, i) || !ye(t[i], e[i])) return !1;
    }
    return !0;
  }
  function sc(t) {
    for (;t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function oc(t, e) {
    var a = sc(t);
    t = 0;
    for (var n; a; ) {
      if (a.nodeType === 3) {
        if (n = t + a.textContent.length, t <= e && n >= e) return {
          node: a,
          offset: e - t
        };
        t = n;
      }
      t: {
        for (;a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break t;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = sc(a);
    }
  }
  function uc(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? uc(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function rc(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = pl(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof e.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) t = e.contentWindow; else break;
      e = pl(t.document);
    }
    return e;
  }
  function eo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  function Ym(t, e) {
    var a = rc(e);
    e = t.focusedElem;
    var n = t.selectionRange;
    if (a !== e && e && e.ownerDocument && uc(e.ownerDocument.documentElement, e)) {
      if (n !== null && eo(e)) {
        if (t = n.start, a = n.end, a === void 0 && (a = t), "selectionStart" in e) e.selectionStart = t, 
        e.selectionEnd = Math.min(a, e.value.length); else if (a = (t = e.ownerDocument || document) && t.defaultView || window, 
        a.getSelection) {
          a = a.getSelection();
          var i = e.textContent.length, l = Math.min(n.start, i);
          n = n.end === void 0 ? l : Math.min(n.end, i), !a.extend && l > n && (i = n, n = l, 
          l = i), i = oc(e, l);
          var c = oc(e, n);
          i && c && (a.rangeCount !== 1 || a.anchorNode !== i.node || a.anchorOffset !== i.offset || a.focusNode !== c.node || a.focusOffset !== c.offset) && (t = t.createRange(), 
          t.setStart(i.node, i.offset), a.removeAllRanges(), l > n ? (a.addRange(t), a.extend(c.node, c.offset)) : (t.setEnd(c.node, c.offset), 
          a.addRange(t)));
        }
      }
      for (t = [], a = e; a = a.parentNode; ) a.nodeType === 1 && t.push({
        element: a,
        left: a.scrollLeft,
        top: a.scrollTop
      });
      for (typeof e.focus == "function" && e.focus(), e = 0; e < t.length; e++) a = t[e], 
      a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
    }
  }
  var qm = We && "documentMode" in document && 11 >= document.documentMode, On = null, ao = null, yi = null, no = !1;
  function cc(t, e, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    no || On == null || On !== pl(n) || (n = On, "selectionStart" in n && eo(n) ? n = {
      start: n.selectionStart,
      end: n.selectionEnd
    } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), 
    n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), yi && mi(yi, n) || (yi = n, n = os(ao, "onSelect"), 0 < n.length && (e = new Tl("onSelect", "select", null, e, a), 
    t.push({
      event: e,
      listeners: n
    }), e.target = On)));
  }
  function Va(t, e) {
    var a = {};
    return a[t.toLowerCase()] = e.toLowerCase(), a["Webkit" + t] = "webkit" + e, a["Moz" + t] = "moz" + e, 
    a;
  }
  var wn = {
    animationend: Va("Animation", "AnimationEnd"),
    animationiteration: Va("Animation", "AnimationIteration"),
    animationstart: Va("Animation", "AnimationStart"),
    transitionrun: Va("Transition", "TransitionRun"),
    transitionstart: Va("Transition", "TransitionStart"),
    transitioncancel: Va("Transition", "TransitionCancel"),
    transitionend: Va("Transition", "TransitionEnd")
  }, io = {}, dc = {};
  We && (dc = document.createElement("div").style, "AnimationEvent" in window || (delete wn.animationend.animation, 
  delete wn.animationiteration.animation, delete wn.animationstart.animation), "TransitionEvent" in window || delete wn.transitionend.transition);
  function Qa(t) {
    if (io[t]) return io[t];
    if (!wn[t]) return t;
    var e = wn[t], a;
    for (a in e) if (e.hasOwnProperty(a) && a in dc) return io[t] = e[a];
    return t;
  }
  var fc = Qa("animationend"), hc = Qa("animationiteration"), mc = Qa("animationstart"), Vm = Qa("transitionrun"), Qm = Qa("transitionstart"), Im = Qa("transitioncancel"), yc = Qa("transitionend"), gc = new Map, bc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(" ");
  function He(t, e) {
    gc.set(t, e), Ya(e, [ t ]);
  }
  var we = [], _n = 0, lo = 0;
  function _l() {
    for (var t = _n, e = lo = _n = 0; e < t; ) {
      var a = we[e];
      we[e++] = null;
      var n = we[e];
      we[e++] = null;
      var i = we[e];
      we[e++] = null;
      var l = we[e];
      if (we[e++] = null, n !== null && i !== null) {
        var c = n.pending;
        c === null ? i.next = i : (i.next = c.next, c.next = i), n.pending = i;
      }
      l !== 0 && pc(a, i, l);
    }
  }
  function Rl(t, e, a, n) {
    we[_n++] = t, we[_n++] = e, we[_n++] = a, we[_n++] = n, lo |= n, t.lanes |= n, t = t.alternate, 
    t !== null && (t.lanes |= n);
  }
  function so(t, e, a, n) {
    return Rl(t, e, a, n), Cl(t);
  }
  function ga(t, e) {
    return Rl(t, null, null, e), Cl(t);
  }
  function pc(t, e, a) {
    t.lanes |= a;
    var n = t.alternate;
    n !== null && (n.lanes |= a);
    for (var i = !1, l = t.return; l !== null; ) l.childLanes |= a, n = l.alternate, 
    n !== null && (n.childLanes |= a), l.tag === 22 && (t = l.stateNode, t === null || t._visibility & 1 || (i = !0)), 
    t = l, l = l.return;
    i && e !== null && t.tag === 3 && (l = t.stateNode, i = 31 - me(a), l = l.hiddenUpdates, 
    t = l[i], t === null ? l[i] = [ e ] : t.push(e), e.lane = a | 536870912);
  }
  function Cl(t) {
    if (50 < Gi) throw Gi = 0, hu = null, Error(u(185));
    for (var e = t.return; e !== null; ) t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Rn = {}, vc = new WeakMap;
  function _e(t, e) {
    if (typeof t == "object" && t !== null) {
      var a = vc.get(t);
      return a !== void 0 ? a : (e = {
        value: t,
        source: e,
        stack: nt(e)
      }, vc.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: nt(e)
    };
  }
  var Cn = [], Bn = 0, Bl = null, Nl = 0, Re = [], Ce = 0, Ia = null, Fe = 1, Pe = "";
  function Xa(t, e) {
    Cn[Bn++] = Nl, Cn[Bn++] = Bl, Bl = t, Nl = e;
  }
  function Ac(t, e, a) {
    Re[Ce++] = Fe, Re[Ce++] = Pe, Re[Ce++] = Ia, Ia = t;
    var n = Fe;
    t = Pe;
    var i = 32 - me(n) - 1;
    n &= ~(1 << i), a += 1;
    var l = 32 - me(e) + i;
    if (30 < l) {
      var c = i - i % 5;
      l = (n & (1 << c) - 1).toString(32), n >>= c, i -= c, Fe = 1 << 32 - me(e) + i | a << i | n, 
      Pe = l + t;
    } else Fe = 1 << l | a << i | n, Pe = t;
  }
  function oo(t) {
    t.return !== null && (Xa(t, 1), Ac(t, 1, 0));
  }
  function uo(t) {
    for (;t === Bl; ) Bl = Cn[--Bn], Cn[Bn] = null, Nl = Cn[--Bn], Cn[Bn] = null;
    for (;t === Ia; ) Ia = Re[--Ce], Re[Ce] = null, Pe = Re[--Ce], Re[Ce] = null, Fe = Re[--Ce], 
    Re[Ce] = null;
  }
  var le = null, Wt = null, pt = !1, ze = null, Qe = !1, ro = Error(u(519));
  function Ka(t) {
    var e = Error(u(418, ""));
    throw pi(_e(e, t)), ro;
  }
  function Ec(t) {
    var e = t.stateNode, a = t.type, n = t.memoizedProps;
    switch (e[ee] = t, e[ce] = n, a) {
     case "dialog":
      yt("cancel", e), yt("close", e);
      break;

     case "iframe":
     case "object":
     case "embed":
      yt("load", e);
      break;

     case "video":
     case "audio":
      for (a = 0; a < qi.length; a++) yt(qi[a], e);
      break;

     case "source":
      yt("error", e);
      break;

     case "img":
     case "image":
     case "link":
      yt("error", e), yt("load", e);
      break;

     case "details":
      yt("toggle", e);
      break;

     case "input":
      yt("invalid", e), jr(e, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0), 
      bl(e);
      break;

     case "select":
      yt("invalid", e);
      break;

     case "textarea":
      yt("invalid", e), zr(e, n.value, n.defaultValue, n.children), bl(e);
    }
    a = n.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || e.textContent === "" + a || n.suppressHydrationWarning === !0 || xf(e.textContent, a) ? (n.popover != null && (yt("beforetoggle", e), 
    yt("toggle", e)), n.onScroll != null && yt("scroll", e), n.onScrollEnd != null && yt("scrollend", e), 
    n.onClick != null && (e.onclick = us), e = !0) : e = !1, e || Ka(t);
  }
  function Sc(t) {
    for (le = t.return; le; ) switch (le.tag) {
     case 3:
     case 27:
      Qe = !0;
      return;

     case 5:
     case 13:
      Qe = !1;
      return;

     default:
      le = le.return;
    }
  }
  function gi(t) {
    if (t !== le) return !1;
    if (!pt) return Sc(t), pt = !0, !1;
    var e = !1, a;
    if ((a = t.tag !== 3 && t.tag !== 27) && ((a = t.tag === 5) && (a = t.type, a = !(a !== "form" && a !== "button") || Nu(t.type, t.memoizedProps)), 
    a = !a), a && (e = !0), e && Wt && Ka(t), Sc(t), t.tag === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(u(317));
      t: {
        for (t = t.nextSibling, e = 0; t; ) {
          if (t.nodeType === 8) if (a = t.data, a === "/$") {
            if (e === 0) {
              Wt = Ge(t.nextSibling);
              break t;
            }
            e--;
          } else a !== "$" && a !== "$!" && a !== "$?" || e++;
          t = t.nextSibling;
        }
        Wt = null;
      }
    } else Wt = le ? Ge(t.stateNode.nextSibling) : null;
    return !0;
  }
  function bi() {
    Wt = le = null, pt = !1;
  }
  function pi(t) {
    ze === null ? ze = [ t ] : ze.push(t);
  }
  var vi = Error(u(460)), Tc = Error(u(474)), co = {
    then: function() {}
  };
  function Oc(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function xl() {}
  function wc(t, e, a) {
    switch (a = t[a], a === void 0 ? t.push(e) : a !== e && (e.then(xl, xl), e = a), 
    e.status) {
     case "fulfilled":
      return e.value;

     case "rejected":
      throw t = e.reason, t === vi ? Error(u(483)) : t;

     default:
      if (typeof e.status == "string") e.then(xl, xl); else {
        if (t = Rt, t !== null && 100 < t.shellSuspendCounter) throw Error(u(482));
        t = e, t.status = "pending", t.then((function(n) {
          if (e.status === "pending") {
            var i = e;
            i.status = "fulfilled", i.value = n;
          }
        }), (function(n) {
          if (e.status === "pending") {
            var i = e;
            i.status = "rejected", i.reason = n;
          }
        }));
      }
      switch (e.status) {
       case "fulfilled":
        return e.value;

       case "rejected":
        throw t = e.reason, t === vi ? Error(u(483)) : t;
      }
      throw Ai = e, vi;
    }
  }
  var Ai = null;
  function _c() {
    if (Ai === null) throw Error(u(459));
    var t = Ai;
    return Ai = null, t;
  }
  var Nn = null, Ei = 0;
  function Dl(t) {
    var e = Ei;
    return Ei += 1, Nn === null && (Nn = []), wc(Nn, t, e);
  }
  function Si(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Ml(t, e) {
    throw e.$$typeof === h ? Error(u(525)) : (t = Object.prototype.toString.call(e), 
    Error(u(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t)));
  }
  function Rc(t) {
    var e = t._init;
    return e(t._payload);
  }
  function Cc(t) {
    function e(w, E) {
      if (t) {
        var _ = w.deletions;
        _ === null ? (w.deletions = [ E ], w.flags |= 16) : _.push(E);
      }
    }
    function a(w, E) {
      if (!t) return null;
      for (;E !== null; ) e(w, E), E = E.sibling;
      return null;
    }
    function n(w) {
      for (var E = new Map; w !== null; ) w.key !== null ? E.set(w.key, w) : E.set(w.index, w), 
      w = w.sibling;
      return E;
    }
    function i(w, E) {
      return w = Ca(w, E), w.index = 0, w.sibling = null, w;
    }
    function l(w, E, _) {
      return w.index = _, t ? (_ = w.alternate, _ !== null ? (_ = _.index, _ < E ? (w.flags |= 33554434, 
      E) : _) : (w.flags |= 33554434, E)) : (w.flags |= 1048576, E);
    }
    function c(w) {
      return t && w.alternate === null && (w.flags |= 33554434), w;
    }
    function f(w, E, _, L) {
      return E === null || E.tag !== 6 ? (E = lu(_, w.mode, L), E.return = w, E) : (E = i(E, _), 
      E.return = w, E);
    }
    function b(w, E, _, L) {
      var Z = _.type;
      return Z === O ? D(w, E, _.props.children, L, _.key) : E !== null && (E.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === J && Rc(Z) === E.type) ? (E = i(E, _.props), 
      Si(E, _), E.return = w, E) : (E = Fl(_.type, _.key, _.props, null, w.mode, L), Si(E, _), 
      E.return = w, E);
    }
    function S(w, E, _, L) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== _.containerInfo || E.stateNode.implementation !== _.implementation ? (E = su(_, w.mode, L), 
      E.return = w, E) : (E = i(E, _.children || []), E.return = w, E);
    }
    function D(w, E, _, L, Z) {
      return E === null || E.tag !== 7 ? (E = nn(_, w.mode, L, Z), E.return = w, E) : (E = i(E, _), 
      E.return = w, E);
    }
    function j(w, E, _) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint") return E = lu("" + E, w.mode, _), 
      E.return = w, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
         case y:
          return _ = Fl(E.type, E.key, E.props, null, w.mode, _), Si(_, E), _.return = w, 
          _;

         case T:
          return E = su(E, w.mode, _), E.return = w, E;

         case J:
          var L = E._init;
          return E = L(E._payload), j(w, E, _);
        }
        if (tt(E) || k(E)) return E = nn(E, w.mode, _, null), E.return = w, E;
        if (typeof E.then == "function") return j(w, Dl(E), _);
        if (E.$$typeof === W) return j(w, Zl(w, E), _);
        Ml(w, E);
      }
      return null;
    }
    function C(w, E, _, L) {
      var Z = E !== null ? E.key : null;
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint") return Z !== null ? null : f(w, E, "" + _, L);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
         case y:
          return _.key === Z ? b(w, E, _, L) : null;

         case T:
          return _.key === Z ? S(w, E, _, L) : null;

         case J:
          return Z = _._init, _ = Z(_._payload), C(w, E, _, L);
        }
        if (tt(_) || k(_)) return Z !== null ? null : D(w, E, _, L, null);
        if (typeof _.then == "function") return C(w, E, Dl(_), L);
        if (_.$$typeof === W) return C(w, E, Zl(w, _), L);
        Ml(w, _);
      }
      return null;
    }
    function x(w, E, _, L, Z) {
      if (typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint") return w = w.get(_) || null, 
      f(E, w, "" + L, Z);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
         case y:
          return w = w.get(L.key === null ? _ : L.key) || null, b(E, w, L, Z);

         case T:
          return w = w.get(L.key === null ? _ : L.key) || null, S(E, w, L, Z);

         case J:
          var ht = L._init;
          return L = ht(L._payload), x(w, E, _, L, Z);
        }
        if (tt(L) || k(L)) return w = w.get(_) || null, D(E, w, L, Z, null);
        if (typeof L.then == "function") return x(w, E, _, Dl(L), Z);
        if (L.$$typeof === W) return x(w, E, _, Zl(E, L), Z);
        Ml(E, L);
      }
      return null;
    }
    function F(w, E, _, L) {
      for (var Z = null, ht = null, $ = E, lt = E = 0, Kt = null; $ !== null && lt < _.length; lt++) {
        $.index > lt ? (Kt = $, $ = null) : Kt = $.sibling;
        var vt = C(w, $, _[lt], L);
        if (vt === null) {
          $ === null && ($ = Kt);
          break;
        }
        t && $ && vt.alternate === null && e(w, $), E = l(vt, E, lt), ht === null ? Z = vt : ht.sibling = vt, 
        ht = vt, $ = Kt;
      }
      if (lt === _.length) return a(w, $), pt && Xa(w, lt), Z;
      if ($ === null) {
        for (;lt < _.length; lt++) $ = j(w, _[lt], L), $ !== null && (E = l($, E, lt), ht === null ? Z = $ : ht.sibling = $, 
        ht = $);
        return pt && Xa(w, lt), Z;
      }
      for ($ = n($); lt < _.length; lt++) Kt = x($, w, lt, _[lt], L), Kt !== null && (t && Kt.alternate !== null && $.delete(Kt.key === null ? lt : Kt.key), 
      E = l(Kt, E, lt), ht === null ? Z = Kt : ht.sibling = Kt, ht = Kt);
      return t && $.forEach((function(La) {
        return e(w, La);
      })), pt && Xa(w, lt), Z;
    }
    function rt(w, E, _, L) {
      if (_ == null) throw Error(u(151));
      for (var Z = null, ht = null, $ = E, lt = E = 0, Kt = null, vt = _.next(); $ !== null && !vt.done; lt++, 
      vt = _.next()) {
        $.index > lt ? (Kt = $, $ = null) : Kt = $.sibling;
        var La = C(w, $, vt.value, L);
        if (La === null) {
          $ === null && ($ = Kt);
          break;
        }
        t && $ && La.alternate === null && e(w, $), E = l(La, E, lt), ht === null ? Z = La : ht.sibling = La, 
        ht = La, $ = Kt;
      }
      if (vt.done) return a(w, $), pt && Xa(w, lt), Z;
      if ($ === null) {
        for (;!vt.done; lt++, vt = _.next()) vt = j(w, vt.value, L), vt !== null && (E = l(vt, E, lt), 
        ht === null ? Z = vt : ht.sibling = vt, ht = vt);
        return pt && Xa(w, lt), Z;
      }
      for ($ = n($); !vt.done; lt++, vt = _.next()) vt = x($, w, lt, vt.value, L), vt !== null && (t && vt.alternate !== null && $.delete(vt.key === null ? lt : vt.key), 
      E = l(vt, E, lt), ht === null ? Z = vt : ht.sibling = vt, ht = vt);
      return t && $.forEach((function(lg) {
        return e(w, lg);
      })), pt && Xa(w, lt), Z;
    }
    function Lt(w, E, _, L) {
      if (typeof _ == "object" && _ !== null && _.type === O && _.key === null && (_ = _.props.children), 
      typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
         case y:
          t: {
            for (var Z = _.key; E !== null; ) {
              if (E.key === Z) {
                if (Z = _.type, Z === O) {
                  if (E.tag === 7) {
                    a(w, E.sibling), L = i(E, _.props.children), L.return = w, w = L;
                    break t;
                  }
                } else if (E.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === J && Rc(Z) === E.type) {
                  a(w, E.sibling), L = i(E, _.props), Si(L, _), L.return = w, w = L;
                  break t;
                }
                a(w, E);
                break;
              } else e(w, E);
              E = E.sibling;
            }
            _.type === O ? (L = nn(_.props.children, w.mode, L, _.key), L.return = w, w = L) : (L = Fl(_.type, _.key, _.props, null, w.mode, L), 
            Si(L, _), L.return = w, w = L);
          }
          return c(w);

         case T:
          t: {
            for (Z = _.key; E !== null; ) {
              if (E.key === Z) if (E.tag === 4 && E.stateNode.containerInfo === _.containerInfo && E.stateNode.implementation === _.implementation) {
                a(w, E.sibling), L = i(E, _.children || []), L.return = w, w = L;
                break t;
              } else {
                a(w, E);
                break;
              } else e(w, E);
              E = E.sibling;
            }
            L = su(_, w.mode, L), L.return = w, w = L;
          }
          return c(w);

         case J:
          return Z = _._init, _ = Z(_._payload), Lt(w, E, _, L);
        }
        if (tt(_)) return F(w, E, _, L);
        if (k(_)) {
          if (Z = k(_), typeof Z != "function") throw Error(u(150));
          return _ = Z.call(_), rt(w, E, _, L);
        }
        if (typeof _.then == "function") return Lt(w, E, Dl(_), L);
        if (_.$$typeof === W) return Lt(w, E, Zl(w, _), L);
        Ml(w, _);
      }
      return typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint" ? (_ = "" + _, 
      E !== null && E.tag === 6 ? (a(w, E.sibling), L = i(E, _), L.return = w, w = L) : (a(w, E), 
      L = lu(_, w.mode, L), L.return = w, w = L), c(w)) : a(w, E);
    }
    return function(w, E, _, L) {
      try {
        Ei = 0;
        var Z = Lt(w, E, _, L);
        return Nn = null, Z;
      } catch ($) {
        if ($ === vi) throw $;
        var ht = De(29, $, null, w.mode);
        return ht.lanes = L, ht.return = w, ht;
      } finally {}
    };
  }
  var Za = Cc(!0), Bc = Cc(!1), xn = dt(null), kl = dt(0);
  function Nc(t, e) {
    t = ra, Bt(kl, t), Bt(xn, e), ra = t | e.baseLanes;
  }
  function fo() {
    Bt(kl, ra), Bt(xn, xn.current);
  }
  function ho() {
    ra = kl.current, _t(xn), _t(kl);
  }
  var Be = dt(null), Ie = null;
  function ba(t) {
    var e = t.alternate;
    Bt(Yt, Yt.current & 1), Bt(Be, t), Ie === null && (e === null || xn.current !== null || e.memoizedState !== null) && (Ie = t);
  }
  function xc(t) {
    if (t.tag === 22) {
      if (Bt(Yt, Yt.current), Bt(Be, t), Ie === null) {
        var e = t.alternate;
        e !== null && e.memoizedState !== null && (Ie = t);
      }
    } else pa();
  }
  function pa() {
    Bt(Yt, Yt.current), Bt(Be, Be.current);
  }
  function $e(t) {
    _t(Be), Ie === t && (Ie = null), _t(Yt);
  }
  var Yt = dt(0);
  function Ll(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var a = e.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || a.data === "$?" || a.data === "$!")) return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
        if (e.flags & 128) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (;e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Xm = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(a, n) {
        t.push(n);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach((function(a) {
        return a();
      }));
    };
  }, Km = o.unstable_scheduleCallback, Zm = o.unstable_NormalPriority, qt = {
    $$typeof: W,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function mo() {
    return {
      controller: new Xm,
      data: new Map,
      refCount: 0
    };
  }
  function Ti(t) {
    t.refCount--, t.refCount === 0 && Km(Zm, (function() {
      t.controller.abort();
    }));
  }
  var Oi = null, yo = 0, Dn = 0, Mn = null;
  function Wm(t, e) {
    if (Oi === null) {
      var a = Oi = [];
      yo = 0, Dn = Eu(), Mn = {
        status: "pending",
        value: void 0,
        then: function(n) {
          a.push(n);
        }
      };
    }
    return yo++, e.then(Dc, Dc), e;
  }
  function Dc() {
    if (--yo === 0 && Oi !== null) {
      Mn !== null && (Mn.status = "fulfilled");
      var t = Oi;
      Oi = null, Dn = 0, Mn = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Jm(t, e) {
    var a = [], n = {
      status: "pending",
      value: null,
      reason: null,
      then: function(i) {
        a.push(i);
      }
    };
    return t.then((function() {
      n.status = "fulfilled", n.value = e;
      for (var i = 0; i < a.length; i++) (0, a[i])(e);
    }), (function(i) {
      for (n.status = "rejected", n.reason = i, i = 0; i < a.length; i++) (0, a[i])(void 0);
    })), n;
  }
  var Mc = q.S;
  q.S = function(t, e) {
    typeof e == "object" && e !== null && typeof e.then == "function" && Wm(t, e), Mc !== null && Mc(t, e);
  };
  var Wa = dt(null);
  function go() {
    var t = Wa.current;
    return t !== null ? t : Rt.pooledCache;
  }
  function jl(t, e) {
    e === null ? Bt(Wa, Wa.current) : Bt(Wa, e.pool);
  }
  function kc() {
    var t = go();
    return t === null ? null : {
      parent: qt._currentValue,
      pool: t
    };
  }
  var va = 0, ft = null, St = null, zt = null, Hl = !1, kn = !1, Ja = !1, zl = 0, wi = 0, Ln = null, Fm = 0;
  function Ht() {
    throw Error(u(321));
  }
  function bo(t, e) {
    if (e === null) return !1;
    for (var a = 0; a < e.length && a < t.length; a++) if (!ye(t[a], e[a])) return !1;
    return !0;
  }
  function po(t, e, a, n, i, l) {
    return va = l, ft = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, 
    q.H = t === null || t.memoizedState === null ? Fa : Aa, Ja = !1, l = a(n, i), Ja = !1, 
    kn && (l = jc(e, a, n, i)), Lc(t), l;
  }
  function Lc(t) {
    q.H = Xe;
    var e = St !== null && St.next !== null;
    if (va = 0, zt = St = ft = null, Hl = !1, wi = 0, Ln = null, e) throw Error(u(300));
    t === null || It || (t = t.dependencies, t !== null && Kl(t) && (It = !0));
  }
  function jc(t, e, a, n) {
    ft = t;
    var i = 0;
    do {
      if (kn && (Ln = null), wi = 0, kn = !1, 25 <= i) throw Error(u(301));
      if (i += 1, zt = St = null, t.updateQueue != null) {
        var l = t.updateQueue;
        l.lastEffect = null, l.events = null, l.stores = null, l.memoCache != null && (l.memoCache.index = 0);
      }
      q.H = Pa, l = e(a, n);
    } while (kn);
    return l;
  }
  function Pm() {
    var t = q.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? _i(e) : e, t = t.useState()[0], (St !== null ? St.memoizedState : null) !== t && (ft.flags |= 1024), 
    e;
  }
  function vo() {
    var t = zl !== 0;
    return zl = 0, t;
  }
  function Ao(t, e, a) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~a;
  }
  function Eo(t) {
    if (Hl) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Hl = !1;
    }
    va = 0, zt = St = ft = null, kn = !1, wi = zl = 0, Ln = null;
  }
  function fe() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return zt === null ? ft.memoizedState = zt = t : zt = zt.next = t, zt;
  }
  function Ut() {
    if (St === null) {
      var t = ft.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = St.next;
    var e = zt === null ? ft.memoizedState : zt.next;
    if (e !== null) zt = e, St = t; else {
      if (t === null) throw ft.alternate === null ? Error(u(467)) : Error(u(310));
      St = t, t = {
        memoizedState: St.memoizedState,
        baseState: St.baseState,
        baseQueue: St.baseQueue,
        queue: St.queue,
        next: null
      }, zt === null ? ft.memoizedState = zt = t : zt = zt.next = t;
    }
    return zt;
  }
  var Ul;
  Ul = function() {
    return {
      lastEffect: null,
      events: null,
      stores: null,
      memoCache: null
    };
  };
  function _i(t) {
    var e = wi;
    return wi += 1, Ln === null && (Ln = []), t = wc(Ln, t, e), e = ft, (zt === null ? e.memoizedState : zt.next) === null && (e = e.alternate, 
    q.H = e === null || e.memoizedState === null ? Fa : Aa), t;
  }
  function Gl(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return _i(t);
      if (t.$$typeof === W) return ae(t);
    }
    throw Error(u(438, String(t)));
  }
  function So(t) {
    var e = null, a = ft.updateQueue;
    if (a !== null && (e = a.memoCache), e == null) {
      var n = ft.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (e = {
        data: n.data.map((function(i) {
          return i.slice();
        })),
        index: 0
      })));
    }
    if (e == null && (e = {
      data: [],
      index: 0
    }), a === null && (a = Ul(), ft.updateQueue = a), a.memoCache = e, a = e.data[e.index], 
    a === void 0) for (a = e.data[e.index] = Array(t), n = 0; n < t; n++) a[n] = N;
    return e.index++, a;
  }
  function ta(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Yl(t) {
    var e = Ut();
    return To(e, St, t);
  }
  function To(t, e, a) {
    var n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = a;
    var i = t.baseQueue, l = n.pending;
    if (l !== null) {
      if (i !== null) {
        var c = i.next;
        i.next = l.next, l.next = c;
      }
      e.baseQueue = i = l, n.pending = null;
    }
    if (l = t.baseState, i === null) t.memoizedState = l; else {
      e = i.next;
      var f = c = null, b = null, S = e, D = !1;
      do {
        var j = S.lane & -536870913;
        if (j !== S.lane ? (gt & j) === j : (va & j) === j) {
          var C = S.revertLane;
          if (C === 0) b !== null && (b = b.next = {
            lane: 0,
            revertLane: 0,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null
          }), j === Dn && (D = !0); else if ((va & C) === C) {
            S = S.next, C === Dn && (D = !0);
            continue;
          } else j = {
            lane: 0,
            revertLane: S.revertLane,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null
          }, b === null ? (f = b = j, c = l) : b = b.next = j, ft.lanes |= C, Ba |= C;
          j = S.action, Ja && a(l, j), l = S.hasEagerState ? S.eagerState : a(l, j);
        } else C = {
          lane: j,
          revertLane: S.revertLane,
          action: S.action,
          hasEagerState: S.hasEagerState,
          eagerState: S.eagerState,
          next: null
        }, b === null ? (f = b = C, c = l) : b = b.next = C, ft.lanes |= j, Ba |= j;
        S = S.next;
      } while (S !== null && S !== e);
      if (b === null ? c = l : b.next = f, !ye(l, t.memoizedState) && (It = !0, D && (a = Mn, 
      a !== null))) throw a;
      t.memoizedState = l, t.baseState = c, t.baseQueue = b, n.lastRenderedState = l;
    }
    return i === null && (n.lanes = 0), [ t.memoizedState, n.dispatch ];
  }
  function Oo(t) {
    var e = Ut(), a = e.queue;
    if (a === null) throw Error(u(311));
    a.lastRenderedReducer = t;
    var n = a.dispatch, i = a.pending, l = e.memoizedState;
    if (i !== null) {
      a.pending = null;
      var c = i = i.next;
      do {
        l = t(l, c.action), c = c.next;
      } while (c !== i);
      ye(l, e.memoizedState) || (It = !0), e.memoizedState = l, e.baseQueue === null && (e.baseState = l), 
      a.lastRenderedState = l;
    }
    return [ l, n ];
  }
  function Hc(t, e, a) {
    var n = ft, i = Ut(), l = pt;
    if (l) {
      if (a === void 0) throw Error(u(407));
      a = a();
    } else a = e();
    var c = !ye((St || i).memoizedState, a);
    if (c && (i.memoizedState = a, It = !0), i = i.queue, Ro(Gc.bind(null, n, i, t), [ t ]), 
    i.getSnapshot !== e || c || zt !== null && zt.memoizedState.tag & 1) {
      if (n.flags |= 2048, jn(9, Uc.bind(null, n, i, a, e), {
        destroy: void 0
      }, null), Rt === null) throw Error(u(349));
      l || va & 60 || zc(n, e, a);
    }
    return a;
  }
  function zc(t, e, a) {
    t.flags |= 16384, t = {
      getSnapshot: e,
      value: a
    }, e = ft.updateQueue, e === null ? (e = Ul(), ft.updateQueue = e, e.stores = [ t ]) : (a = e.stores, 
    a === null ? e.stores = [ t ] : a.push(t));
  }
  function Uc(t, e, a, n) {
    e.value = a, e.getSnapshot = n, Yc(e) && qc(t);
  }
  function Gc(t, e, a) {
    return a((function() {
      Yc(e) && qc(t);
    }));
  }
  function Yc(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var a = e();
      return !ye(t, a);
    } catch {
      return !0;
    }
  }
  function qc(t) {
    var e = ga(t, 2);
    e !== null && se(e, t, 2);
  }
  function wo(t) {
    var e = fe();
    if (typeof t == "function") {
      var a = t;
      if (t = a(), Ja) {
        ha(!0);
        try {
          a();
        } finally {
          ha(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ta,
      lastRenderedState: t
    }, e;
  }
  function Vc(t, e, a, n) {
    return t.baseState = a, To(t, St, typeof n == "function" ? n : ta);
  }
  function $m(t, e, a, n, i) {
    if (Ql(t)) throw Error(u(485));
    if (t = e.action, t !== null) {
      var l = {
        payload: i,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(c) {
          l.listeners.push(c);
        }
      };
      q.T !== null ? a(!0) : l.isTransition = !1, n(l), a = e.pending, a === null ? (l.next = e.pending = l, 
      Qc(e, l)) : (l.next = a.next, e.pending = a.next = l);
    }
  }
  function Qc(t, e) {
    var a = e.action, n = e.payload, i = t.state;
    if (e.isTransition) {
      var l = q.T, c = {};
      q.T = c;
      try {
        var f = a(i, n), b = q.S;
        b !== null && b(c, f), Ic(t, e, f);
      } catch (S) {
        _o(t, e, S);
      } finally {
        q.T = l;
      }
    } else try {
      l = a(i, n), Ic(t, e, l);
    } catch (S) {
      _o(t, e, S);
    }
  }
  function Ic(t, e, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then((function(n) {
      Xc(t, e, n);
    }), (function(n) {
      return _o(t, e, n);
    })) : Xc(t, e, a);
  }
  function Xc(t, e, a) {
    e.status = "fulfilled", e.value = a, Kc(e), t.state = a, e = t.pending, e !== null && (a = e.next, 
    a === e ? t.pending = null : (a = a.next, e.next = a, Qc(t, a)));
  }
  function _o(t, e, a) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do {
        e.status = "rejected", e.reason = a, Kc(e), e = e.next;
      } while (e !== n);
    }
    t.action = null;
  }
  function Kc(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Zc(t, e) {
    return e;
  }
  function Wc(t, e) {
    if (pt) {
      var a = Rt.formState;
      if (a !== null) {
        t: {
          var n = ft;
          if (pt) {
            if (Wt) {
              e: {
                for (var i = Wt, l = Qe; i.nodeType !== 8; ) {
                  if (!l) {
                    i = null;
                    break e;
                  }
                  if (i = Ge(i.nextSibling), i === null) {
                    i = null;
                    break e;
                  }
                }
                l = i.data, i = l === "F!" || l === "F" ? i : null;
              }
              if (i) {
                Wt = Ge(i.nextSibling), n = i.data === "F!";
                break t;
              }
            }
            Ka(n);
          }
          n = !1;
        }
        n && (e = a[0]);
      }
    }
    return a = fe(), a.memoizedState = a.baseState = e, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Zc,
      lastRenderedState: e
    }, a.queue = n, a = hd.bind(null, ft, n), n.dispatch = a, n = wo(!1), l = Do.bind(null, ft, !1, n.queue), 
    n = fe(), i = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = i, a = $m.bind(null, ft, i, l, a), i.dispatch = a, n.memoizedState = t, 
    [ e, a, !1 ];
  }
  function Jc(t) {
    var e = Ut();
    return Fc(e, St, t);
  }
  function Fc(t, e, a) {
    e = To(t, e, Zc)[0], t = Yl(ta)[0], e = typeof e == "object" && e !== null && typeof e.then == "function" ? _i(e) : e;
    var n = Ut(), i = n.queue, l = i.dispatch;
    return a !== n.memoizedState && (ft.flags |= 2048, jn(9, ty.bind(null, i, a), {
      destroy: void 0
    }, null)), [ e, l, t ];
  }
  function ty(t, e) {
    t.action = e;
  }
  function Pc(t) {
    var e = Ut(), a = St;
    if (a !== null) return Fc(e, a, t);
    Ut(), e = e.memoizedState, a = Ut();
    var n = a.queue.dispatch;
    return a.memoizedState = t, [ e, n, !1 ];
  }
  function jn(t, e, a, n) {
    return t = {
      tag: t,
      create: e,
      inst: a,
      deps: n,
      next: null
    }, e = ft.updateQueue, e === null && (e = Ul(), ft.updateQueue = e), a = e.lastEffect, 
    a === null ? e.lastEffect = t.next = t : (n = a.next, a.next = t, t.next = n, e.lastEffect = t), 
    t;
  }
  function $c() {
    return Ut().memoizedState;
  }
  function ql(t, e, a, n) {
    var i = fe();
    ft.flags |= t, i.memoizedState = jn(1 | e, a, {
      destroy: void 0
    }, n === void 0 ? null : n);
  }
  function Vl(t, e, a, n) {
    var i = Ut();
    n = n === void 0 ? null : n;
    var l = i.memoizedState.inst;
    St !== null && n !== null && bo(n, St.memoizedState.deps) ? i.memoizedState = jn(e, a, l, n) : (ft.flags |= t, 
    i.memoizedState = jn(1 | e, a, l, n));
  }
  function td(t, e) {
    ql(8390656, 8, t, e);
  }
  function Ro(t, e) {
    Vl(2048, 8, t, e);
  }
  function ed(t, e) {
    return Vl(4, 2, t, e);
  }
  function ad(t, e) {
    return Vl(4, 4, t, e);
  }
  function nd(t, e) {
    if (typeof e == "function") {
      t = t();
      var a = e(t);
      return function() {
        typeof a == "function" ? a() : e(null);
      };
    }
    if (e != null) return t = t(), e.current = t, function() {
      e.current = null;
    };
  }
  function id(t, e, a) {
    a = a != null ? a.concat([ t ]) : null, Vl(4, 4, nd.bind(null, e, t), a);
  }
  function Co() {}
  function ld(t, e) {
    var a = Ut();
    e = e === void 0 ? null : e;
    var n = a.memoizedState;
    return e !== null && bo(e, n[1]) ? n[0] : (a.memoizedState = [ t, e ], t);
  }
  function sd(t, e) {
    var a = Ut();
    e = e === void 0 ? null : e;
    var n = a.memoizedState;
    if (e !== null && bo(e, n[1])) return n[0];
    if (n = t(), Ja) {
      ha(!0);
      try {
        t();
      } finally {
        ha(!1);
      }
    }
    return a.memoizedState = [ n, e ], n;
  }
  function Bo(t, e, a) {
    return a === void 0 || va & 1073741824 ? t.memoizedState = e : (t.memoizedState = a, 
    t = rf(), ft.lanes |= t, Ba |= t, a);
  }
  function od(t, e, a, n) {
    return ye(a, e) ? a : xn.current !== null ? (t = Bo(t, a, n), ye(t, e) || (It = !0), 
    t) : va & 42 ? (t = rf(), ft.lanes |= t, Ba |= t, e) : (It = !0, t.memoizedState = a);
  }
  function ud(t, e, a, n, i) {
    var l = M.p;
    M.p = l !== 0 && 8 > l ? l : 8;
    var c = q.T, f = {};
    q.T = f, Do(t, !1, e, a);
    try {
      var b = i(), S = q.S;
      if (S !== null && S(f, b), b !== null && typeof b == "object" && typeof b.then == "function") {
        var D = Jm(b, n);
        Ri(t, e, D, ve(t));
      } else Ri(t, e, n, ve(t));
    } catch (j) {
      Ri(t, e, {
        then: function() {},
        status: "rejected",
        reason: j
      }, ve());
    } finally {
      M.p = l, q.T = c;
    }
  }
  function ey() {}
  function No(t, e, a, n) {
    if (t.tag !== 5) throw Error(u(476));
    var i = rd(t).queue;
    ud(t, i, e, Q, a === null ? ey : function() {
      return cd(t), a(n);
    });
  }
  function rd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ta,
        lastRenderedState: Q
      },
      next: null
    };
    var a = {};
    return e.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ta,
        lastRenderedState: a
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function cd(t) {
    var e = rd(t).next.queue;
    Ri(t, e, {}, ve());
  }
  function xo() {
    return ae(Ki);
  }
  function dd() {
    return Ut().memoizedState;
  }
  function fd() {
    return Ut().memoizedState;
  }
  function ay(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
       case 24:
       case 3:
        var a = ve();
        t = Ta(a);
        var n = Oa(e, t, a);
        n !== null && (se(n, e, a), Ni(n, e, a)), e = {
          cache: mo()
        }, t.payload = e;
        return;
      }
      e = e.return;
    }
  }
  function ny(t, e, a) {
    var n = ve();
    a = {
      lane: n,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ql(t) ? md(e, a) : (a = so(t, e, a, n), a !== null && (se(a, t, n), yd(a, e, n)));
  }
  function hd(t, e, a) {
    var n = ve();
    Ri(t, e, a, n);
  }
  function Ri(t, e, a, n) {
    var i = {
      lane: n,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ql(t)) md(e, i); else {
      var l = t.alternate;
      if (t.lanes === 0 && (l === null || l.lanes === 0) && (l = e.lastRenderedReducer, 
      l !== null)) try {
        var c = e.lastRenderedState, f = l(c, a);
        if (i.hasEagerState = !0, i.eagerState = f, ye(f, c)) return Rl(t, e, i, 0), Rt === null && _l(), 
        !1;
      } catch {} finally {}
      if (a = so(t, e, i, n), a !== null) return se(a, t, n), yd(a, e, n), !0;
    }
    return !1;
  }
  function Do(t, e, a, n) {
    if (n = {
      lane: 2,
      revertLane: Eu(),
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ql(t)) {
      if (e) throw Error(u(479));
    } else e = so(t, a, n, 2), e !== null && se(e, t, 2);
  }
  function Ql(t) {
    var e = t.alternate;
    return t === ft || e !== null && e === ft;
  }
  function md(t, e) {
    kn = Hl = !0;
    var a = t.pending;
    a === null ? e.next = e : (e.next = a.next, a.next = e), t.pending = e;
  }
  function yd(t, e, a) {
    if (a & 4194176) {
      var n = e.lanes;
      n &= t.pendingLanes, a |= n, e.lanes = a, _r(t, a);
    }
  }
  var Xe = {
    readContext: ae,
    use: Gl,
    useCallback: Ht,
    useContext: Ht,
    useEffect: Ht,
    useImperativeHandle: Ht,
    useLayoutEffect: Ht,
    useInsertionEffect: Ht,
    useMemo: Ht,
    useReducer: Ht,
    useRef: Ht,
    useState: Ht,
    useDebugValue: Ht,
    useDeferredValue: Ht,
    useTransition: Ht,
    useSyncExternalStore: Ht,
    useId: Ht
  };
  Xe.useCacheRefresh = Ht, Xe.useMemoCache = Ht, Xe.useHostTransitionStatus = Ht, 
  Xe.useFormState = Ht, Xe.useActionState = Ht, Xe.useOptimistic = Ht;
  var Fa = {
    readContext: ae,
    use: Gl,
    useCallback: function(t, e) {
      return fe().memoizedState = [ t, e === void 0 ? null : e ], t;
    },
    useContext: ae,
    useEffect: td,
    useImperativeHandle: function(t, e, a) {
      a = a != null ? a.concat([ t ]) : null, ql(4194308, 4, nd.bind(null, e, t), a);
    },
    useLayoutEffect: function(t, e) {
      return ql(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      ql(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var a = fe();
      e = e === void 0 ? null : e;
      var n = t();
      if (Ja) {
        ha(!0);
        try {
          t();
        } finally {
          ha(!1);
        }
      }
      return a.memoizedState = [ n, e ], n;
    },
    useReducer: function(t, e, a) {
      var n = fe();
      if (a !== void 0) {
        var i = a(e);
        if (Ja) {
          ha(!0);
          try {
            a(e);
          } finally {
            ha(!1);
          }
        }
      } else i = e;
      return n.memoizedState = n.baseState = i, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: i
      }, n.queue = t, t = t.dispatch = ny.bind(null, ft, t), [ n.memoizedState, t ];
    },
    useRef: function(t) {
      var e = fe();
      return t = {
        current: t
      }, e.memoizedState = t;
    },
    useState: function(t) {
      t = wo(t);
      var e = t.queue, a = hd.bind(null, ft, e);
      return e.dispatch = a, [ t.memoizedState, a ];
    },
    useDebugValue: Co,
    useDeferredValue: function(t, e) {
      var a = fe();
      return Bo(a, t, e);
    },
    useTransition: function() {
      var t = wo(!1);
      return t = ud.bind(null, ft, t.queue, !0, !1), fe().memoizedState = t, [ !1, t ];
    },
    useSyncExternalStore: function(t, e, a) {
      var n = ft, i = fe();
      if (pt) {
        if (a === void 0) throw Error(u(407));
        a = a();
      } else {
        if (a = e(), Rt === null) throw Error(u(349));
        gt & 60 || zc(n, e, a);
      }
      i.memoizedState = a;
      var l = {
        value: a,
        getSnapshot: e
      };
      return i.queue = l, td(Gc.bind(null, n, l, t), [ t ]), n.flags |= 2048, jn(9, Uc.bind(null, n, l, a, e), {
        destroy: void 0
      }, null), a;
    },
    useId: function() {
      var t = fe(), e = Rt.identifierPrefix;
      if (pt) {
        var a = Pe, n = Fe;
        a = (n & ~(1 << 32 - me(n) - 1)).toString(32) + a, e = ":" + e + "R" + a, a = zl++, 
        0 < a && (e += "H" + a.toString(32)), e += ":";
      } else a = Fm++, e = ":" + e + "r" + a.toString(32) + ":";
      return t.memoizedState = e;
    },
    useCacheRefresh: function() {
      return fe().memoizedState = ay.bind(null, ft);
    }
  };
  Fa.useMemoCache = So, Fa.useHostTransitionStatus = xo, Fa.useFormState = Wc, Fa.useActionState = Wc, 
  Fa.useOptimistic = function(t) {
    var e = fe();
    e.memoizedState = e.baseState = t;
    var a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: null,
      lastRenderedState: null
    };
    return e.queue = a, e = Do.bind(null, ft, !0, a), a.dispatch = e, [ t, e ];
  };
  var Aa = {
    readContext: ae,
    use: Gl,
    useCallback: ld,
    useContext: ae,
    useEffect: Ro,
    useImperativeHandle: id,
    useInsertionEffect: ed,
    useLayoutEffect: ad,
    useMemo: sd,
    useReducer: Yl,
    useRef: $c,
    useState: function() {
      return Yl(ta);
    },
    useDebugValue: Co,
    useDeferredValue: function(t, e) {
      var a = Ut();
      return od(a, St.memoizedState, t, e);
    },
    useTransition: function() {
      var t = Yl(ta)[0], e = Ut().memoizedState;
      return [ typeof t == "boolean" ? t : _i(t), e ];
    },
    useSyncExternalStore: Hc,
    useId: dd
  };
  Aa.useCacheRefresh = fd, Aa.useMemoCache = So, Aa.useHostTransitionStatus = xo, 
  Aa.useFormState = Jc, Aa.useActionState = Jc, Aa.useOptimistic = function(t, e) {
    var a = Ut();
    return Vc(a, St, t, e);
  };
  var Pa = {
    readContext: ae,
    use: Gl,
    useCallback: ld,
    useContext: ae,
    useEffect: Ro,
    useImperativeHandle: id,
    useInsertionEffect: ed,
    useLayoutEffect: ad,
    useMemo: sd,
    useReducer: Oo,
    useRef: $c,
    useState: function() {
      return Oo(ta);
    },
    useDebugValue: Co,
    useDeferredValue: function(t, e) {
      var a = Ut();
      return St === null ? Bo(a, t, e) : od(a, St.memoizedState, t, e);
    },
    useTransition: function() {
      var t = Oo(ta)[0], e = Ut().memoizedState;
      return [ typeof t == "boolean" ? t : _i(t), e ];
    },
    useSyncExternalStore: Hc,
    useId: dd
  };
  Pa.useCacheRefresh = fd, Pa.useMemoCache = So, Pa.useHostTransitionStatus = xo, 
  Pa.useFormState = Pc, Pa.useActionState = Pc, Pa.useOptimistic = function(t, e) {
    var a = Ut();
    return St !== null ? Vc(a, St, t, e) : (a.baseState = t, [ t, a.queue.dispatch ]);
  };
  function Mo(t, e, a, n) {
    e = t.memoizedState, a = a(n, e), a = a == null ? e : V({}, e, a), t.memoizedState = a, 
    t.lanes === 0 && (t.updateQueue.baseState = a);
  }
  var ko = {
    isMounted: function(t) {
      return (t = t._reactInternals) ? et(t) === t : !1;
    },
    enqueueSetState: function(t, e, a) {
      t = t._reactInternals;
      var n = ve(), i = Ta(n);
      i.payload = e, a != null && (i.callback = a), e = Oa(t, i, n), e !== null && (se(e, t, n), 
      Ni(e, t, n));
    },
    enqueueReplaceState: function(t, e, a) {
      t = t._reactInternals;
      var n = ve(), i = Ta(n);
      i.tag = 1, i.payload = e, a != null && (i.callback = a), e = Oa(t, i, n), e !== null && (se(e, t, n), 
      Ni(e, t, n));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var a = ve(), n = Ta(a);
      n.tag = 2, e != null && (n.callback = e), e = Oa(t, n, a), e !== null && (se(e, t, a), 
      Ni(e, t, a));
    }
  };
  function gd(t, e, a, n, i, l, c) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, l, c) : e.prototype && e.prototype.isPureReactComponent ? !mi(a, n) || !mi(i, l) : !0;
  }
  function bd(t, e, a, n) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(a, n), 
    typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(a, n), 
    e.state !== t && ko.enqueueReplaceState(e, e.state, null);
  }
  function $a(t, e) {
    var a = e;
    if ("ref" in e) {
      a = {};
      for (var n in e) n !== "ref" && (a[n] = e[n]);
    }
    if (t = t.defaultProps) {
      a === e && (a = V({}, a));
      for (var i in t) a[i] === void 0 && (a[i] = t[i]);
    }
    return a;
  }
  var Il = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  };
  function pd(t) {
    Il(t);
  }
  function vd(t) {
    console.error(t);
  }
  function Ad(t) {
    Il(t);
  }
  function Xl(t, e) {
    try {
      var a = t.onUncaughtError;
      a(e.value, {
        componentStack: e.stack
      });
    } catch (n) {
      setTimeout((function() {
        throw n;
      }));
    }
  }
  function Ed(t, e, a) {
    try {
      var n = t.onCaughtError;
      n(a.value, {
        componentStack: a.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (i) {
      setTimeout((function() {
        throw i;
      }));
    }
  }
  function Lo(t, e, a) {
    return a = Ta(a), a.tag = 3, a.payload = {
      element: null
    }, a.callback = function() {
      Xl(t, e);
    }, a;
  }
  function Sd(t) {
    return t = Ta(t), t.tag = 3, t;
  }
  function Td(t, e, a, n) {
    var i = a.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var l = n.value;
      t.payload = function() {
        return i(l);
      }, t.callback = function() {
        Ed(e, a, n);
      };
    }
    var c = a.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (t.callback = function() {
      Ed(e, a, n), typeof i != "function" && (Na === null ? Na = new Set([ this ]) : Na.add(this));
      var f = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function iy(t, e, a, n, i) {
    if (a.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (e = a.alternate, e !== null && Bi(e, a, i, !0), a = Be.current, a !== null) {
        switch (a.tag) {
         case 13:
          return Ie === null ? gu() : a.alternate === null && kt === 0 && (kt = 3), a.flags &= -257, 
          a.flags |= 65536, a.lanes = i, n === co ? a.flags |= 16384 : (e = a.updateQueue, 
          e === null ? a.updateQueue = new Set([ n ]) : e.add(n), pu(t, n, i)), !1;

         case 22:
          return a.flags |= 65536, n === co ? a.flags |= 16384 : (e = a.updateQueue, e === null ? (e = {
            transitions: null,
            markerInstances: null,
            retryQueue: new Set([ n ])
          }, a.updateQueue = e) : (a = e.retryQueue, a === null ? e.retryQueue = new Set([ n ]) : a.add(n)), 
          pu(t, n, i)), !1;
        }
        throw Error(u(435, a.tag));
      }
      return pu(t, n, i), gu(), !1;
    }
    if (pt) return e = Be.current, e !== null ? (!(e.flags & 65536) && (e.flags |= 256), 
    e.flags |= 65536, e.lanes = i, n !== ro && (t = Error(u(422), {
      cause: n
    }), pi(_e(t, a)))) : (n !== ro && (e = Error(u(423), {
      cause: n
    }), pi(_e(e, a))), t = t.current.alternate, t.flags |= 65536, i &= -i, t.lanes |= i, 
    n = _e(n, a), i = Lo(t.stateNode, n, i), Jo(t, i), kt !== 4 && (kt = 2)), !1;
    var l = Error(u(520), {
      cause: n
    });
    if (l = _e(l, a), zi === null ? zi = [ l ] : zi.push(l), kt !== 4 && (kt = 2), e === null) return !0;
    n = _e(n, a), a = e;
    do {
      switch (a.tag) {
       case 3:
        return a.flags |= 65536, t = i & -i, a.lanes |= t, t = Lo(a.stateNode, n, t), Jo(a, t), 
        !1;

       case 1:
        if (e = a.type, l = a.stateNode, (a.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || l !== null && typeof l.componentDidCatch == "function" && (Na === null || !Na.has(l)))) return a.flags |= 65536, 
        i &= -i, a.lanes |= i, i = Sd(i), Td(i, t, a, n), Jo(a, i), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Od = Error(u(461)), It = !1;
  function Jt(t, e, a, n) {
    e.child = t === null ? Bc(e, null, a, n) : Za(e, t.child, a, n);
  }
  function wd(t, e, a, n, i) {
    a = a.render;
    var l = e.ref;
    if ("ref" in n) {
      var c = {};
      for (var f in n) f !== "ref" && (c[f] = n[f]);
    } else c = n;
    return en(e), n = po(t, e, a, c, l, i), f = vo(), t !== null && !It ? (Ao(t, e, i), 
    ea(t, e, i)) : (pt && f && oo(e), e.flags |= 1, Jt(t, e, n, i), e.child);
  }
  function _d(t, e, a, n, i) {
    if (t === null) {
      var l = a.type;
      return typeof l == "function" && !iu(l) && l.defaultProps === void 0 && a.compare === null ? (e.tag = 15, 
      e.type = l, Rd(t, e, l, n, i)) : (t = Fl(a.type, null, n, e, e.mode, i), t.ref = e.ref, 
      t.return = e, e.child = t);
    }
    if (l = t.child, !Qo(t, i)) {
      var c = l.memoizedProps;
      if (a = a.compare, a = a !== null ? a : mi, a(c, n) && t.ref === e.ref) return ea(t, e, i);
    }
    return e.flags |= 1, t = Ca(l, n), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Rd(t, e, a, n, i) {
    if (t !== null) {
      var l = t.memoizedProps;
      if (mi(l, n) && t.ref === e.ref) if (It = !1, e.pendingProps = n = l, Qo(t, i)) t.flags & 131072 && (It = !0); else return e.lanes = t.lanes, 
      ea(t, e, i);
    }
    return jo(t, e, a, n, i);
  }
  function Cd(t, e, a) {
    var n = e.pendingProps, i = n.children, l = (e.stateNode._pendingVisibility & 2) !== 0, c = t !== null ? t.memoizedState : null;
    if (Ci(t, e), n.mode === "hidden" || l) {
      if (e.flags & 128) {
        if (n = c !== null ? c.baseLanes | a : a, t !== null) {
          for (i = e.child = t.child, l = 0; i !== null; ) l = l | i.lanes | i.childLanes, 
          i = i.sibling;
          e.childLanes = l & ~n;
        } else e.childLanes = 0, e.child = null;
        return Bd(t, e, n, a);
      }
      if (a & 536870912) e.memoizedState = {
        baseLanes: 0,
        cachePool: null
      }, t !== null && jl(e, c !== null ? c.cachePool : null), c !== null ? Nc(e, c) : fo(), 
      xc(e); else return e.lanes = e.childLanes = 536870912, Bd(t, e, c !== null ? c.baseLanes | a : a, a);
    } else c !== null ? (jl(e, c.cachePool), Nc(e, c), pa(), e.memoizedState = null) : (t !== null && jl(e, null), 
    fo(), pa());
    return Jt(t, e, i, a), e.child;
  }
  function Bd(t, e, a, n) {
    var i = go();
    return i = i === null ? null : {
      parent: qt._currentValue,
      pool: i
    }, e.memoizedState = {
      baseLanes: a,
      cachePool: i
    }, t !== null && jl(e, null), fo(), xc(e), t !== null && Bi(t, e, n, !0), null;
  }
  function Ci(t, e) {
    var a = e.ref;
    if (a === null) t !== null && t.ref !== null && (e.flags |= 2097664); else {
      if (typeof a != "function" && typeof a != "object") throw Error(u(284));
      (t === null || t.ref !== a) && (e.flags |= 2097664);
    }
  }
  function jo(t, e, a, n, i) {
    return en(e), a = po(t, e, a, n, void 0, i), n = vo(), t !== null && !It ? (Ao(t, e, i), 
    ea(t, e, i)) : (pt && n && oo(e), e.flags |= 1, Jt(t, e, a, i), e.child);
  }
  function Nd(t, e, a, n, i, l) {
    return en(e), e.updateQueue = null, a = jc(e, n, a, i), Lc(t), n = vo(), t !== null && !It ? (Ao(t, e, l), 
    ea(t, e, l)) : (pt && n && oo(e), e.flags |= 1, Jt(t, e, a, l), e.child);
  }
  function xd(t, e, a, n, i) {
    if (en(e), e.stateNode === null) {
      var l = Rn, c = a.contextType;
      typeof c == "object" && c !== null && (l = ae(c)), l = new a(n, l), e.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, 
      l.updater = ko, e.stateNode = l, l._reactInternals = e, l = e.stateNode, l.props = n, 
      l.state = e.memoizedState, l.refs = {}, Zo(e), c = a.contextType, l.context = typeof c == "object" && c !== null ? ae(c) : Rn, 
      l.state = e.memoizedState, c = a.getDerivedStateFromProps, typeof c == "function" && (Mo(e, a, c, n), 
      l.state = e.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (c = l.state, 
      typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), 
      c !== l.state && ko.enqueueReplaceState(l, l.state, null), Di(e, n, l, i), xi(), 
      l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308), 
      n = !0;
    } else if (t === null) {
      l = e.stateNode;
      var f = e.memoizedProps, b = $a(a, f);
      l.props = b;
      var S = l.context, D = a.contextType;
      c = Rn, typeof D == "object" && D !== null && (c = ae(D));
      var j = a.getDerivedStateFromProps;
      D = typeof j == "function" || typeof l.getSnapshotBeforeUpdate == "function", f = e.pendingProps !== f, 
      D || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (f || S !== c) && bd(e, l, n, c), 
      Sa = !1;
      var C = e.memoizedState;
      l.state = C, Di(e, n, l, i), xi(), S = e.memoizedState, f || C !== S || Sa ? (typeof j == "function" && (Mo(e, a, j, n), 
      S = e.memoizedState), (b = Sa || gd(e, a, b, n, C, S, c)) ? (D || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), 
      typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), 
      typeof l.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (e.flags |= 4194308), 
      e.memoizedProps = n, e.memoizedState = S), l.props = n, l.state = S, l.context = c, 
      n = b) : (typeof l.componentDidMount == "function" && (e.flags |= 4194308), n = !1);
    } else {
      l = e.stateNode, Wo(t, e), c = e.memoizedProps, D = $a(a, c), l.props = D, j = e.pendingProps, 
      C = l.context, S = a.contextType, b = Rn, typeof S == "object" && S !== null && (b = ae(S)), 
      f = a.getDerivedStateFromProps, (S = typeof f == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (c !== j || C !== b) && bd(e, l, n, b), 
      Sa = !1, C = e.memoizedState, l.state = C, Di(e, n, l, i), xi();
      var x = e.memoizedState;
      c !== j || C !== x || Sa || t !== null && t.dependencies !== null && Kl(t.dependencies) ? (typeof f == "function" && (Mo(e, a, f, n), 
      x = e.memoizedState), (D = Sa || gd(e, a, D, n, C, x, b) || t !== null && t.dependencies !== null && Kl(t.dependencies)) ? (S || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(n, x, b), 
      typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(n, x, b)), 
      typeof l.componentDidUpdate == "function" && (e.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || c === t.memoizedProps && C === t.memoizedState || (e.flags |= 4), 
      typeof l.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && C === t.memoizedState || (e.flags |= 1024), 
      e.memoizedProps = n, e.memoizedState = x), l.props = n, l.state = x, l.context = b, 
      n = D) : (typeof l.componentDidUpdate != "function" || c === t.memoizedProps && C === t.memoizedState || (e.flags |= 4), 
      typeof l.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && C === t.memoizedState || (e.flags |= 1024), 
      n = !1);
    }
    return l = n, Ci(t, e), n = (e.flags & 128) !== 0, l || n ? (l = e.stateNode, a = n && typeof a.getDerivedStateFromError != "function" ? null : l.render(), 
    e.flags |= 1, t !== null && n ? (e.child = Za(e, t.child, null, i), e.child = Za(e, null, a, i)) : Jt(t, e, a, i), 
    e.memoizedState = l.state, t = e.child) : t = ea(t, e, i), t;
  }
  function Dd(t, e, a, n) {
    return bi(), e.flags |= 256, Jt(t, e, a, n), e.child;
  }
  var Ho = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
  };
  function zo(t) {
    return {
      baseLanes: t,
      cachePool: kc()
    };
  }
  function Uo(t, e, a) {
    return t = t !== null ? t.childLanes & ~a : 0, e && (t |= Me), t;
  }
  function Md(t, e, a) {
    var n = e.pendingProps, i = !1, l = (e.flags & 128) !== 0, c;
    if ((c = l) || (c = t !== null && t.memoizedState === null ? !1 : (Yt.current & 2) !== 0), 
    c && (i = !0, e.flags &= -129), c = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (pt) {
        if (i ? ba(e) : pa(), pt) {
          var f = Wt, b;
          if (b = f) {
            t: {
              for (b = f, f = Qe; b.nodeType !== 8; ) {
                if (!f) {
                  f = null;
                  break t;
                }
                if (b = Ge(b.nextSibling), b === null) {
                  f = null;
                  break t;
                }
              }
              f = b;
            }
            f !== null ? (e.memoizedState = {
              dehydrated: f,
              treeContext: Ia !== null ? {
                id: Fe,
                overflow: Pe
              } : null,
              retryLane: 536870912
            }, b = De(18, null, null, 0), b.stateNode = f, b.return = e, e.child = b, le = e, 
            Wt = null, b = !0) : b = !1;
          }
          b || Ka(e);
        }
        if (f = e.memoizedState, f !== null && (f = f.dehydrated, f !== null)) return f.data === "$!" ? e.lanes = 16 : e.lanes = 536870912, 
        null;
        $e(e);
      }
      return f = n.children, n = n.fallback, i ? (pa(), i = e.mode, f = Yo({
        mode: "hidden",
        children: f
      }, i), n = nn(n, i, a, null), f.return = e, n.return = e, f.sibling = n, e.child = f, 
      i = e.child, i.memoizedState = zo(a), i.childLanes = Uo(t, c, a), e.memoizedState = Ho, 
      n) : (ba(e), Go(e, f));
    }
    if (b = t.memoizedState, b !== null && (f = b.dehydrated, f !== null)) {
      if (l) e.flags & 256 ? (ba(e), e.flags &= -257, e = qo(t, e, a)) : e.memoizedState !== null ? (pa(), 
      e.child = t.child, e.flags |= 128, e = null) : (pa(), i = n.fallback, f = e.mode, 
      n = Yo({
        mode: "visible",
        children: n.children
      }, f), i = nn(i, f, a, null), i.flags |= 2, n.return = e, i.return = e, n.sibling = i, 
      e.child = n, Za(e, t.child, null, a), n = e.child, n.memoizedState = zo(a), n.childLanes = Uo(t, c, a), 
      e.memoizedState = Ho, e = i); else if (ba(e), f.data === "$!") {
        if (c = f.nextSibling && f.nextSibling.dataset, c) var S = c.dgst;
        c = S, n = Error(u(419)), n.stack = "", n.digest = c, pi({
          value: n,
          source: null,
          stack: null
        }), e = qo(t, e, a);
      } else if (It || Bi(t, e, a, !1), c = (a & t.childLanes) !== 0, It || c) {
        if (c = Rt, c !== null) {
          if (n = a & -a, n & 42) n = 1; else switch (n) {
           case 2:
            n = 1;
            break;

           case 8:
            n = 4;
            break;

           case 32:
            n = 16;
            break;

           case 128:
           case 256:
           case 512:
           case 1024:
           case 2048:
           case 4096:
           case 8192:
           case 16384:
           case 32768:
           case 65536:
           case 131072:
           case 262144:
           case 524288:
           case 1048576:
           case 2097152:
           case 4194304:
           case 8388608:
           case 16777216:
           case 33554432:
            n = 64;
            break;

           case 268435456:
            n = 134217728;
            break;

           default:
            n = 0;
          }
          if (n = n & (c.suspendedLanes | a) ? 0 : n, n !== 0 && n !== b.retryLane) throw b.retryLane = n, 
          ga(t, n), se(c, t, n), Od;
        }
        f.data === "$?" || gu(), e = qo(t, e, a);
      } else f.data === "$?" ? (e.flags |= 128, e.child = t.child, e = vy.bind(null, t), 
      f._reactRetry = e, e = null) : (t = b.treeContext, Wt = Ge(f.nextSibling), le = e, 
      pt = !0, ze = null, Qe = !1, t !== null && (Re[Ce++] = Fe, Re[Ce++] = Pe, Re[Ce++] = Ia, 
      Fe = t.id, Pe = t.overflow, Ia = e), e = Go(e, n.children), e.flags |= 4096);
      return e;
    }
    return i ? (pa(), i = n.fallback, f = e.mode, b = t.child, S = b.sibling, n = Ca(b, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = b.subtreeFlags & 31457280, S !== null ? i = Ca(S, i) : (i = nn(i, f, a, null), 
    i.flags |= 2), i.return = e, n.return = e, n.sibling = i, e.child = n, n = i, i = e.child, 
    f = t.child.memoizedState, f === null ? f = zo(a) : (b = f.cachePool, b !== null ? (S = qt._currentValue, 
    b = b.parent !== S ? {
      parent: S,
      pool: S
    } : b) : b = kc(), f = {
      baseLanes: f.baseLanes | a,
      cachePool: b
    }), i.memoizedState = f, i.childLanes = Uo(t, c, a), e.memoizedState = Ho, n) : (ba(e), 
    a = t.child, t = a.sibling, a = Ca(a, {
      mode: "visible",
      children: n.children
    }), a.return = e, a.sibling = null, t !== null && (c = e.deletions, c === null ? (e.deletions = [ t ], 
    e.flags |= 16) : c.push(t)), e.child = a, e.memoizedState = null, a);
  }
  function Go(t, e) {
    return e = Yo({
      mode: "visible",
      children: e
    }, t.mode), e.return = t, t.child = e;
  }
  function Yo(t, e) {
    return sf(t, e, 0, null);
  }
  function qo(t, e, a) {
    return Za(e, t.child, null, a), t = Go(e, e.pendingProps.children), t.flags |= 2, 
    e.memoizedState = null, t;
  }
  function kd(t, e, a) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e), Xo(t.return, e, a);
  }
  function Vo(t, e, a, n, i) {
    var l = t.memoizedState;
    l === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: a,
      tailMode: i
    } : (l.isBackwards = e, l.rendering = null, l.renderingStartTime = 0, l.last = n, 
    l.tail = a, l.tailMode = i);
  }
  function Ld(t, e, a) {
    var n = e.pendingProps, i = n.revealOrder, l = n.tail;
    if (Jt(t, e, n.children, a), n = Yt.current, n & 2) n = n & 1 | 2, e.flags |= 128; else {
      if (t !== null && t.flags & 128) t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && kd(t, a, e); else if (t.tag === 19) kd(t, a, e); else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (;t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      n &= 1;
    }
    switch (Bt(Yt, n), i) {
     case "forwards":
      for (a = e.child, i = null; a !== null; ) t = a.alternate, t !== null && Ll(t) === null && (i = a), 
      a = a.sibling;
      a = i, a === null ? (i = e.child, e.child = null) : (i = a.sibling, a.sibling = null), 
      Vo(e, !1, i, a, l);
      break;

     case "backwards":
      for (a = null, i = e.child, e.child = null; i !== null; ) {
        if (t = i.alternate, t !== null && Ll(t) === null) {
          e.child = i;
          break;
        }
        t = i.sibling, i.sibling = a, a = i, i = t;
      }
      Vo(e, !0, a, null, l);
      break;

     case "together":
      Vo(e, !1, null, null, void 0);
      break;

     default:
      e.memoizedState = null;
    }
    return e.child;
  }
  function ea(t, e, a) {
    if (t !== null && (e.dependencies = t.dependencies), Ba |= e.lanes, !(a & e.childLanes)) if (t !== null) {
      if (Bi(t, e, a, !1), (a & e.childLanes) === 0) return null;
    } else return null;
    if (t !== null && e.child !== t.child) throw Error(u(153));
    if (e.child !== null) {
      for (t = e.child, a = Ca(t, t.pendingProps), e.child = a, a.return = e; t.sibling !== null; ) t = t.sibling, 
      a = a.sibling = Ca(t, t.pendingProps), a.return = e;
      a.sibling = null;
    }
    return e.child;
  }
  function Qo(t, e) {
    return t.lanes & e ? !0 : (t = t.dependencies, !!(t !== null && Kl(t)));
  }
  function ly(t, e, a) {
    switch (e.tag) {
     case 3:
      rl(e, e.stateNode.containerInfo), Ea(e, qt, t.memoizedState.cache), bi();
      break;

     case 27:
     case 5:
      Ms(e);
      break;

     case 4:
      rl(e, e.stateNode.containerInfo);
      break;

     case 10:
      Ea(e, e.type, e.memoizedProps.value);
      break;

     case 13:
      var n = e.memoizedState;
      if (n !== null) return n.dehydrated !== null ? (ba(e), e.flags |= 128, null) : a & e.child.childLanes ? Md(t, e, a) : (ba(e), 
      t = ea(t, e, a), t !== null ? t.sibling : null);
      ba(e);
      break;

     case 19:
      var i = (t.flags & 128) !== 0;
      if (n = (a & e.childLanes) !== 0, n || (Bi(t, e, a, !1), n = (a & e.childLanes) !== 0), 
      i) {
        if (n) return Ld(t, e, a);
        e.flags |= 128;
      }
      if (i = e.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), 
      Bt(Yt, Yt.current), n) break;
      return null;

     case 22:
     case 23:
      return e.lanes = 0, Cd(t, e, a);

     case 24:
      Ea(e, qt, t.memoizedState.cache);
    }
    return ea(t, e, a);
  }
  function jd(t, e, a) {
    if (t !== null) if (t.memoizedProps !== e.pendingProps) It = !0; else {
      if (!Qo(t, a) && !(e.flags & 128)) return It = !1, ly(t, e, a);
      It = !!(t.flags & 131072);
    } else It = !1, pt && e.flags & 1048576 && Ac(e, Nl, e.index);
    switch (e.lanes = 0, e.tag) {
     case 16:
      t: {
        t = e.pendingProps;
        var n = e.elementType, i = n._init;
        if (n = i(n._payload), e.type = n, typeof n == "function") iu(n) ? (t = $a(n, t), 
        e.tag = 1, e = xd(null, e, n, t, a)) : (e.tag = 0, e = jo(null, e, n, t, a)); else {
          if (n != null) {
            if (i = n.$$typeof, i === X) {
              e.tag = 11, e = wd(null, e, n, t, a);
              break t;
            } else if (i === ut) {
              e.tag = 14, e = _d(null, e, n, t, a);
              break t;
            }
          }
          throw e = I(n) || n, Error(u(306, e, ""));
        }
      }
      return e;

     case 0:
      return jo(t, e, e.type, e.pendingProps, a);

     case 1:
      return n = e.type, i = $a(n, e.pendingProps), xd(t, e, n, i, a);

     case 3:
      t: {
        if (rl(e, e.stateNode.containerInfo), t === null) throw Error(u(387));
        var l = e.pendingProps;
        i = e.memoizedState, n = i.element, Wo(t, e), Di(e, l, null, a);
        var c = e.memoizedState;
        if (l = c.cache, Ea(e, qt, l), l !== i.cache && Ko(e, [ qt ], a, !0), xi(), l = c.element, 
        i.isDehydrated) if (i = {
          element: l,
          isDehydrated: !1,
          cache: c.cache
        }, e.updateQueue.baseState = i, e.memoizedState = i, e.flags & 256) {
          e = Dd(t, e, l, a);
          break t;
        } else if (l !== n) {
          n = _e(Error(u(424)), e), pi(n), e = Dd(t, e, l, a);
          break t;
        } else for (Wt = Ge(e.stateNode.containerInfo.firstChild), le = e, pt = !0, ze = null, 
        Qe = !0, a = Bc(e, null, l, a), e.child = a; a; ) a.flags = a.flags & -3 | 4096, 
        a = a.sibling; else {
          if (bi(), l === n) {
            e = ea(t, e, a);
            break t;
          }
          Jt(t, e, l, a);
        }
        e = e.child;
      }
      return e;

     case 26:
      return Ci(t, e), t === null ? (a = Gf(e.type, null, e.pendingProps, null)) ? e.memoizedState = a : pt || (a = e.type, 
      t = e.pendingProps, n = rs(fa.current).createElement(a), n[ee] = e, n[ce] = t, Ft(n, a, t), 
      Qt(n), e.stateNode = n) : e.memoizedState = Gf(e.type, t.memoizedProps, e.pendingProps, t.memoizedState), 
      null;

     case 27:
      return Ms(e), t === null && pt && (n = e.stateNode = Hf(e.type, e.pendingProps, fa.current), 
      le = e, Qe = !0, Wt = Ge(n.firstChild)), n = e.pendingProps.children, t !== null || pt ? Jt(t, e, n, a) : e.child = Za(e, null, n, a), 
      Ci(t, e), e.child;

     case 5:
      return t === null && pt && ((i = n = Wt) && (n = Ly(n, e.type, e.pendingProps, Qe), 
      n !== null ? (e.stateNode = n, le = e, Wt = Ge(n.firstChild), Qe = !1, i = !0) : i = !1), 
      i || Ka(e)), Ms(e), i = e.type, l = e.pendingProps, c = t !== null ? t.memoizedProps : null, 
      n = l.children, Nu(i, l) ? n = null : c !== null && Nu(i, c) && (e.flags |= 32), 
      e.memoizedState !== null && (i = po(t, e, Pm, null, null, a), Ki._currentValue = i), 
      Ci(t, e), Jt(t, e, n, a), e.child;

     case 6:
      return t === null && pt && ((t = a = Wt) && (a = jy(a, e.pendingProps, Qe), a !== null ? (e.stateNode = a, 
      le = e, Wt = null, t = !0) : t = !1), t || Ka(e)), null;

     case 13:
      return Md(t, e, a);

     case 4:
      return rl(e, e.stateNode.containerInfo), n = e.pendingProps, t === null ? e.child = Za(e, null, n, a) : Jt(t, e, n, a), 
      e.child;

     case 11:
      return wd(t, e, e.type, e.pendingProps, a);

     case 7:
      return Jt(t, e, e.pendingProps, a), e.child;

     case 8:
      return Jt(t, e, e.pendingProps.children, a), e.child;

     case 12:
      return Jt(t, e, e.pendingProps.children, a), e.child;

     case 10:
      return n = e.pendingProps, Ea(e, e.type, n.value), Jt(t, e, n.children, a), e.child;

     case 9:
      return i = e.type._context, n = e.pendingProps.children, en(e), i = ae(i), n = n(i), 
      e.flags |= 1, Jt(t, e, n, a), e.child;

     case 14:
      return _d(t, e, e.type, e.pendingProps, a);

     case 15:
      return Rd(t, e, e.type, e.pendingProps, a);

     case 19:
      return Ld(t, e, a);

     case 22:
      return Cd(t, e, a);

     case 24:
      return en(e), n = ae(qt), t === null ? (i = go(), i === null && (i = Rt, l = mo(), 
      i.pooledCache = l, l.refCount++, l !== null && (i.pooledCacheLanes |= a), i = l), 
      e.memoizedState = {
        parent: n,
        cache: i
      }, Zo(e), Ea(e, qt, i)) : (t.lanes & a && (Wo(t, e), Di(e, null, null, a), xi()), 
      i = t.memoizedState, l = e.memoizedState, i.parent !== n ? (i = {
        parent: n,
        cache: n
      }, e.memoizedState = i, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = i), 
      Ea(e, qt, n)) : (n = l.cache, Ea(e, qt, n), n !== i.cache && Ko(e, [ qt ], a, !0))), 
      Jt(t, e, e.pendingProps.children, a), e.child;

     case 29:
      throw e.pendingProps;
    }
    throw Error(u(156, e.tag));
  }
  var Io = dt(null), tn = null, aa = null;
  function Ea(t, e, a) {
    Bt(Io, e._currentValue), e._currentValue = a;
  }
  function na(t) {
    t._currentValue = Io.current, _t(Io);
  }
  function Xo(t, e, a) {
    for (;t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, n !== null && (n.childLanes |= e)) : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e), 
      t === a) break;
      t = t.return;
    }
  }
  function Ko(t, e, a, n) {
    var i = t.child;
    for (i !== null && (i.return = t); i !== null; ) {
      var l = i.dependencies;
      if (l !== null) {
        var c = i.child;
        l = l.firstContext;
        t: for (;l !== null; ) {
          var f = l;
          l = i;
          for (var b = 0; b < e.length; b++) if (f.context === e[b]) {
            l.lanes |= a, f = l.alternate, f !== null && (f.lanes |= a), Xo(l.return, a, t), 
            n || (c = null);
            break t;
          }
          l = f.next;
        }
      } else if (i.tag === 18) {
        if (c = i.return, c === null) throw Error(u(341));
        c.lanes |= a, l = c.alternate, l !== null && (l.lanes |= a), Xo(c, a, t), c = null;
      } else c = i.child;
      if (c !== null) c.return = i; else for (c = i; c !== null; ) {
        if (c === t) {
          c = null;
          break;
        }
        if (i = c.sibling, i !== null) {
          i.return = c.return, c = i;
          break;
        }
        c = c.return;
      }
      i = c;
    }
  }
  function Bi(t, e, a, n) {
    t = null;
    for (var i = e, l = !1; i !== null; ) {
      if (!l) {
        if (i.flags & 524288) l = !0; else if (i.flags & 262144) break;
      }
      if (i.tag === 10) {
        var c = i.alternate;
        if (c === null) throw Error(u(387));
        if (c = c.memoizedProps, c !== null) {
          var f = i.type;
          ye(i.pendingProps.value, c.value) || (t !== null ? t.push(f) : t = [ f ]);
        }
      } else if (i === ul.current) {
        if (c = i.alternate, c === null) throw Error(u(387));
        c.memoizedState.memoizedState !== i.memoizedState.memoizedState && (t !== null ? t.push(Ki) : t = [ Ki ]);
      }
      i = i.return;
    }
    t !== null && Ko(e, t, a, n), e.flags |= 262144;
  }
  function Kl(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!ye(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function en(t) {
    tn = t, aa = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ae(t) {
    return Hd(tn, t);
  }
  function Zl(t, e) {
    return tn === null && en(t), Hd(t, e);
  }
  function Hd(t, e) {
    var a = e._currentValue;
    if (e = {
      context: e,
      memoizedValue: a,
      next: null
    }, aa === null) {
      if (t === null) throw Error(u(308));
      aa = e, t.dependencies = {
        lanes: 0,
        firstContext: e
      }, t.flags |= 524288;
    } else aa = aa.next = e;
    return a;
  }
  var Sa = !1;
  function Zo(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        lanes: 0,
        hiddenCallbacks: null
      },
      callbacks: null
    };
  }
  function Wo(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ta(t) {
    return {
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }
  function Oa(t, e, a) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, xt & 2) {
      var i = n.pending;
      return i === null ? e.next = e : (e.next = i.next, i.next = e), n.pending = e, e = Cl(t), 
      pc(t, null, a), e;
    }
    return Rl(t, n, e, a), Cl(t);
  }
  function Ni(t, e, a) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (a & 4194176) !== 0)) {
      var n = e.lanes;
      n &= t.pendingLanes, a |= n, e.lanes = a, _r(t, a);
    }
  }
  function Jo(t, e) {
    var a = t.updateQueue, n = t.alternate;
    if (n !== null && (n = n.updateQueue, a === n)) {
      var i = null, l = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var c = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          l === null ? i = l = c : l = l.next = c, a = a.next;
        } while (a !== null);
        l === null ? i = l = e : l = l.next = e;
      } else i = l = e;
      a = {
        baseState: n.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: l,
        shared: n.shared,
        callbacks: n.callbacks
      }, t.updateQueue = a;
      return;
    }
    t = a.lastBaseUpdate, t === null ? a.firstBaseUpdate = e : t.next = e, a.lastBaseUpdate = e;
  }
  var Fo = !1;
  function xi() {
    if (Fo) {
      var t = Mn;
      if (t !== null) throw t;
    }
  }
  function Di(t, e, a, n) {
    Fo = !1;
    var i = t.updateQueue;
    Sa = !1;
    var l = i.firstBaseUpdate, c = i.lastBaseUpdate, f = i.shared.pending;
    if (f !== null) {
      i.shared.pending = null;
      var b = f, S = b.next;
      b.next = null, c === null ? l = S : c.next = S, c = b;
      var D = t.alternate;
      D !== null && (D = D.updateQueue, f = D.lastBaseUpdate, f !== c && (f === null ? D.firstBaseUpdate = S : f.next = S, 
      D.lastBaseUpdate = b));
    }
    if (l !== null) {
      var j = i.baseState;
      c = 0, D = S = b = null, f = l;
      do {
        var C = f.lane & -536870913, x = C !== f.lane;
        if (x ? (gt & C) === C : (n & C) === C) {
          C !== 0 && C === Dn && (Fo = !0), D !== null && (D = D.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          t: {
            var F = t, rt = f;
            C = e;
            var Lt = a;
            switch (rt.tag) {
             case 1:
              if (F = rt.payload, typeof F == "function") {
                j = F.call(Lt, j, C);
                break t;
              }
              j = F;
              break t;

             case 3:
              F.flags = F.flags & -65537 | 128;

             case 0:
              if (F = rt.payload, C = typeof F == "function" ? F.call(Lt, j, C) : F, C == null) break t;
              j = V({}, j, C);
              break t;

             case 2:
              Sa = !0;
            }
          }
          C = f.callback, C !== null && (t.flags |= 64, x && (t.flags |= 8192), x = i.callbacks, 
          x === null ? i.callbacks = [ C ] : x.push(C));
        } else x = {
          lane: C,
          tag: f.tag,
          payload: f.payload,
          callback: f.callback,
          next: null
        }, D === null ? (S = D = x, b = j) : D = D.next = x, c |= C;
        if (f = f.next, f === null) {
          if (f = i.shared.pending, f === null) break;
          x = f, f = x.next, x.next = null, i.lastBaseUpdate = x, i.shared.pending = null;
        }
      } while (!0);
      D === null && (b = j), i.baseState = b, i.firstBaseUpdate = S, i.lastBaseUpdate = D, 
      l === null && (i.shared.lanes = 0), Ba |= c, t.lanes = c, t.memoizedState = j;
    }
  }
  function zd(t, e) {
    if (typeof t != "function") throw Error(u(191, t));
    t.call(e);
  }
  function Ud(t, e) {
    var a = t.callbacks;
    if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) zd(a[t], e);
  }
  function Mi(t, e) {
    try {
      var a = e.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        a = i;
        do {
          if ((a.tag & t) === t) {
            n = void 0;
            var l = a.create, c = a.inst;
            n = l(), c.destroy = n;
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (f) {
      wt(e, e.return, f);
    }
  }
  function wa(t, e, a) {
    try {
      var n = e.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var l = i.next;
        n = l;
        do {
          if ((n.tag & t) === t) {
            var c = n.inst, f = c.destroy;
            if (f !== void 0) {
              c.destroy = void 0, i = e;
              var b = a;
              try {
                f();
              } catch (S) {
                wt(i, b, S);
              }
            }
          }
          n = n.next;
        } while (n !== l);
      }
    } catch (S) {
      wt(e, e.return, S);
    }
  }
  function Gd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var a = t.stateNode;
      try {
        Ud(e, a);
      } catch (n) {
        wt(t, t.return, n);
      }
    }
  }
  function Yd(t, e, a) {
    a.props = $a(t.type, t.memoizedProps), a.state = t.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (n) {
      wt(t, e, n);
    }
  }
  function an(t, e) {
    try {
      var a = t.ref;
      if (a !== null) {
        var n = t.stateNode;
        switch (t.tag) {
         case 26:
         case 27:
         case 5:
          var i = n;
          break;

         default:
          i = n;
        }
        typeof a == "function" ? t.refCleanup = a(i) : a.current = i;
      }
    } catch (l) {
      wt(t, e, l);
    }
  }
  function ge(t, e) {
    var a = t.ref, n = t.refCleanup;
    if (a !== null) if (typeof n == "function") try {
      n();
    } catch (i) {
      wt(t, e, i);
    } finally {
      t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
    } else if (typeof a == "function") try {
      a(null);
    } catch (i) {
      wt(t, e, i);
    } else a.current = null;
  }
  function qd(t) {
    var e = t.type, a = t.memoizedProps, n = t.stateNode;
    try {
      t: switch (e) {
       case "button":
       case "input":
       case "select":
       case "textarea":
        a.autoFocus && n.focus();
        break t;

       case "img":
        a.src ? n.src = a.src : a.srcSet && (n.srcset = a.srcSet);
      }
    } catch (i) {
      wt(t, t.return, i);
    }
  }
  function Vd(t, e, a) {
    try {
      var n = t.stateNode;
      Ny(n, t.type, a, e), n[ce] = e;
    } catch (i) {
      wt(t, t.return, i);
    }
  }
  function Qd(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 || t.tag === 4;
  }
  function Po(t) {
    t: for (;;) {
      for (;t.sibling === null; ) {
        if (t.return === null || Qd(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 27 && t.tag !== 18; ) {
        if (t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function $o(t, e, a) {
    var n = t.tag;
    if (n === 5 || n === 6) t = t.stateNode, e ? a.nodeType === 8 ? a.parentNode.insertBefore(t, e) : a.insertBefore(t, e) : (a.nodeType === 8 ? (e = a.parentNode, 
    e.insertBefore(t, a)) : (e = a, e.appendChild(t)), a = a._reactRootContainer, a != null || e.onclick !== null || (e.onclick = us)); else if (n !== 4 && n !== 27 && (t = t.child, 
    t !== null)) for ($o(t, e, a), t = t.sibling; t !== null; ) $o(t, e, a), t = t.sibling;
  }
  function Wl(t, e, a) {
    var n = t.tag;
    if (n === 5 || n === 6) t = t.stateNode, e ? a.insertBefore(t, e) : a.appendChild(t); else if (n !== 4 && n !== 27 && (t = t.child, 
    t !== null)) for (Wl(t, e, a), t = t.sibling; t !== null; ) Wl(t, e, a), t = t.sibling;
  }
  var ia = !1, Mt = !1, tu = !1, Id = typeof WeakSet == "function" ? WeakSet : Set, Xt = null, Xd = !1;
  function sy(t, e) {
    if (t = t.containerInfo, Cu = ys, t = rc(t), eo(t)) {
      if ("selectionStart" in t) var a = {
        start: t.selectionStart,
        end: t.selectionEnd
      }; else t: {
        a = (a = t.ownerDocument) && a.defaultView || window;
        var n = a.getSelection && a.getSelection();
        if (n && n.rangeCount !== 0) {
          a = n.anchorNode;
          var i = n.anchorOffset, l = n.focusNode;
          n = n.focusOffset;
          try {
            a.nodeType, l.nodeType;
          } catch {
            a = null;
            break t;
          }
          var c = 0, f = -1, b = -1, S = 0, D = 0, j = t, C = null;
          e: for (;;) {
            for (var x; j !== a || i !== 0 && j.nodeType !== 3 || (f = c + i), j !== l || n !== 0 && j.nodeType !== 3 || (b = c + n), 
            j.nodeType === 3 && (c += j.nodeValue.length), (x = j.firstChild) !== null; ) C = j, 
            j = x;
            for (;;) {
              if (j === t) break e;
              if (C === a && ++S === i && (f = c), C === l && ++D === n && (b = c), (x = j.nextSibling) !== null) break;
              j = C, C = j.parentNode;
            }
            j = x;
          }
          a = f === -1 || b === -1 ? null : {
            start: f,
            end: b
          };
        } else a = null;
      }
      a = a || {
        start: 0,
        end: 0
      };
    } else a = null;
    for (Bu = {
      focusedElem: t,
      selectionRange: a
    }, ys = !1, Xt = e; Xt !== null; ) if (e = Xt, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null) t.return = e, 
    Xt = t; else for (;Xt !== null; ) {
      switch (e = Xt, l = e.alternate, t = e.flags, e.tag) {
       case 0:
        break;

       case 11:
       case 15:
        break;

       case 1:
        if (t & 1024 && l !== null) {
          t = void 0, a = e, i = l.memoizedProps, l = l.memoizedState, n = a.stateNode;
          try {
            var F = $a(a.type, i, a.elementType === a.type);
            t = n.getSnapshotBeforeUpdate(F, l), n.__reactInternalSnapshotBeforeUpdate = t;
          } catch (rt) {
            wt(a, a.return, rt);
          }
        }
        break;

       case 3:
        if (t & 1024) {
          if (t = e.stateNode.containerInfo, a = t.nodeType, a === 9) Mu(t); else if (a === 1) switch (t.nodeName) {
           case "HEAD":
           case "HTML":
           case "BODY":
            Mu(t);
            break;

           default:
            t.textContent = "";
          }
        }
        break;

       case 5:
       case 26:
       case 27:
       case 6:
       case 4:
       case 17:
        break;

       default:
        if (t & 1024) throw Error(u(163));
      }
      if (t = e.sibling, t !== null) {
        t.return = e.return, Xt = t;
        break;
      }
      Xt = e.return;
    }
    return F = Xd, Xd = !1, F;
  }
  function Kd(t, e, a) {
    var n = a.flags;
    switch (a.tag) {
     case 0:
     case 11:
     case 15:
      sa(t, a), n & 4 && Mi(5, a);
      break;

     case 1:
      if (sa(t, a), n & 4) if (t = a.stateNode, e === null) try {
        t.componentDidMount();
      } catch (f) {
        wt(a, a.return, f);
      } else {
        var i = $a(a.type, e.memoizedProps);
        e = e.memoizedState;
        try {
          t.componentDidUpdate(i, e, t.__reactInternalSnapshotBeforeUpdate);
        } catch (f) {
          wt(a, a.return, f);
        }
      }
      n & 64 && Gd(a), n & 512 && an(a, a.return);
      break;

     case 3:
      if (sa(t, a), n & 64 && (n = a.updateQueue, n !== null)) {
        if (t = null, a.child !== null) switch (a.child.tag) {
         case 27:
         case 5:
          t = a.child.stateNode;
          break;

         case 1:
          t = a.child.stateNode;
        }
        try {
          Ud(n, t);
        } catch (f) {
          wt(a, a.return, f);
        }
      }
      break;

     case 26:
      sa(t, a), n & 512 && an(a, a.return);
      break;

     case 27:
     case 5:
      sa(t, a), e === null && n & 4 && qd(a), n & 512 && an(a, a.return);
      break;

     case 12:
      sa(t, a);
      break;

     case 13:
      sa(t, a), n & 4 && Jd(t, a);
      break;

     case 22:
      if (i = a.memoizedState !== null || ia, !i) {
        e = e !== null && e.memoizedState !== null || Mt;
        var l = ia, c = Mt;
        ia = i, (Mt = e) && !c ? _a(t, a, (a.subtreeFlags & 8772) !== 0) : sa(t, a), ia = l, 
        Mt = c;
      }
      n & 512 && (a.memoizedProps.mode === "manual" ? an(a, a.return) : ge(a, a.return));
      break;

     default:
      sa(t, a);
    }
  }
  function Zd(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Zd(e)), t.child = null, t.deletions = null, t.sibling = null, 
    t.tag === 5 && (e = t.stateNode, e !== null && Us(e)), t.stateNode = null, t.return = null, 
    t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, 
    t.stateNode = null, t.updateQueue = null;
  }
  var Gt = null, be = !1;
  function la(t, e, a) {
    for (a = a.child; a !== null; ) Wd(t, e, a), a = a.sibling;
  }
  function Wd(t, e, a) {
    if (he && typeof he.onCommitFiberUnmount == "function") try {
      he.onCommitFiberUnmount(ai, a);
    } catch {}
    switch (a.tag) {
     case 26:
      Mt || ge(a, e), la(t, e, a), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, 
      a.parentNode.removeChild(a));
      break;

     case 27:
      Mt || ge(a, e);
      var n = Gt, i = be;
      for (Gt = a.stateNode, la(t, e, a), a = a.stateNode, e = a.attributes; e.length; ) a.removeAttributeNode(e[0]);
      Us(a), Gt = n, be = i;
      break;

     case 5:
      Mt || ge(a, e);

     case 6:
      i = Gt;
      var l = be;
      if (Gt = null, la(t, e, a), Gt = i, be = l, Gt !== null) if (be) try {
        t = Gt, n = a.stateNode, t.nodeType === 8 ? t.parentNode.removeChild(n) : t.removeChild(n);
      } catch (c) {
        wt(a, e, c);
      } else try {
        Gt.removeChild(a.stateNode);
      } catch (c) {
        wt(a, e, c);
      }
      break;

     case 18:
      Gt !== null && (be ? (e = Gt, a = a.stateNode, e.nodeType === 8 ? Du(e.parentNode, a) : e.nodeType === 1 && Du(e, a), 
      Fi(e)) : Du(Gt, a.stateNode));
      break;

     case 4:
      n = Gt, i = be, Gt = a.stateNode.containerInfo, be = !0, la(t, e, a), Gt = n, be = i;
      break;

     case 0:
     case 11:
     case 14:
     case 15:
      Mt || wa(2, a, e), Mt || wa(4, a, e), la(t, e, a);
      break;

     case 1:
      Mt || (ge(a, e), n = a.stateNode, typeof n.componentWillUnmount == "function" && Yd(a, e, n)), 
      la(t, e, a);
      break;

     case 21:
      la(t, e, a);
      break;

     case 22:
      Mt || ge(a, e), Mt = (n = Mt) || a.memoizedState !== null, la(t, e, a), Mt = n;
      break;

     default:
      la(t, e, a);
    }
  }
  function Jd(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, 
    t !== null && (t = t.dehydrated, t !== null)))) try {
      Fi(t);
    } catch (a) {
      wt(e, e.return, a);
    }
  }
  function oy(t) {
    switch (t.tag) {
     case 13:
     case 19:
      var e = t.stateNode;
      return e === null && (e = t.stateNode = new Id), e;

     case 22:
      return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Id), 
      e;

     default:
      throw Error(u(435, t.tag));
    }
  }
  function eu(t, e) {
    var a = oy(t);
    e.forEach((function(n) {
      var i = Ay.bind(null, t, n);
      a.has(n) || (a.add(n), n.then(i, i));
    }));
  }
  function Ne(t, e) {
    var a = e.deletions;
    if (a !== null) for (var n = 0; n < a.length; n++) {
      var i = a[n], l = t, c = e, f = c;
      t: for (;f !== null; ) {
        switch (f.tag) {
         case 27:
         case 5:
          Gt = f.stateNode, be = !1;
          break t;

         case 3:
          Gt = f.stateNode.containerInfo, be = !0;
          break t;

         case 4:
          Gt = f.stateNode.containerInfo, be = !0;
          break t;
        }
        f = f.return;
      }
      if (Gt === null) throw Error(u(160));
      Wd(l, c, i), Gt = null, be = !1, l = i.alternate, l !== null && (l.return = null), 
      i.return = null;
    }
    if (e.subtreeFlags & 13878) for (e = e.child; e !== null; ) Fd(e, t), e = e.sibling;
  }
  var Ue = null;
  function Fd(t, e) {
    var a = t.alternate, n = t.flags;
    switch (t.tag) {
     case 0:
     case 11:
     case 14:
     case 15:
      Ne(e, t), xe(t), n & 4 && (wa(3, t, t.return), Mi(3, t), wa(5, t, t.return));
      break;

     case 1:
      Ne(e, t), xe(t), n & 512 && (Mt || a === null || ge(a, a.return)), n & 64 && ia && (t = t.updateQueue, 
      t !== null && (n = t.callbacks, n !== null && (a = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = a === null ? n : a.concat(n))));
      break;

     case 26:
      var i = Ue;
      if (Ne(e, t), xe(t), n & 512 && (Mt || a === null || ge(a, a.return)), n & 4) {
        var l = a !== null ? a.memoizedState : null;
        if (n = t.memoizedState, a === null) if (n === null) if (t.stateNode === null) {
          t: {
            n = t.type, a = t.memoizedProps, i = i.ownerDocument || i;
            e: switch (n) {
             case "title":
              l = i.getElementsByTagName("title")[0], (!l || l[li] || l[ee] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = i.createElement(n), 
              i.head.insertBefore(l, i.querySelector("head > title"))), Ft(l, n, a), l[ee] = t, 
              Qt(l), n = l;
              break t;

             case "link":
              var c = Vf("link", "href", i).get(n + (a.href || ""));
              if (c) {
                for (var f = 0; f < c.length; f++) if (l = c[f], l.getAttribute("href") === (a.href == null ? null : a.href) && l.getAttribute("rel") === (a.rel == null ? null : a.rel) && l.getAttribute("title") === (a.title == null ? null : a.title) && l.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                  c.splice(f, 1);
                  break e;
                }
              }
              l = i.createElement(n), Ft(l, n, a), i.head.appendChild(l);
              break;

             case "meta":
              if (c = Vf("meta", "content", i).get(n + (a.content || ""))) {
                for (f = 0; f < c.length; f++) if (l = c[f], l.getAttribute("content") === (a.content == null ? null : "" + a.content) && l.getAttribute("name") === (a.name == null ? null : a.name) && l.getAttribute("property") === (a.property == null ? null : a.property) && l.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && l.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                  c.splice(f, 1);
                  break e;
                }
              }
              l = i.createElement(n), Ft(l, n, a), i.head.appendChild(l);
              break;

             default:
              throw Error(u(468, n));
            }
            l[ee] = t, Qt(l), n = l;
          }
          t.stateNode = n;
        } else Qf(i, t.type, t.stateNode); else t.stateNode = qf(i, n, t.memoizedProps); else l !== n ? (l === null ? a.stateNode !== null && (a = a.stateNode, 
        a.parentNode.removeChild(a)) : l.count--, n === null ? Qf(i, t.type, t.stateNode) : qf(i, n, t.memoizedProps)) : n === null && t.stateNode !== null && Vd(t, t.memoizedProps, a.memoizedProps);
      }
      break;

     case 27:
      if (n & 4 && t.alternate === null) {
        i = t.stateNode, l = t.memoizedProps;
        try {
          for (var b = i.firstChild; b; ) {
            var S = b.nextSibling, D = b.nodeName;
            b[li] || D === "HEAD" || D === "BODY" || D === "SCRIPT" || D === "STYLE" || D === "LINK" && b.rel.toLowerCase() === "stylesheet" || i.removeChild(b), 
            b = S;
          }
          for (var j = t.type, C = i.attributes; C.length; ) i.removeAttributeNode(C[0]);
          Ft(i, j, l), i[ee] = t, i[ce] = l;
        } catch (F) {
          wt(t, t.return, F);
        }
      }

     case 5:
      if (Ne(e, t), xe(t), n & 512 && (Mt || a === null || ge(a, a.return)), t.flags & 32) {
        i = t.stateNode;
        try {
          An(i, "");
        } catch (F) {
          wt(t, t.return, F);
        }
      }
      n & 4 && t.stateNode != null && (i = t.memoizedProps, Vd(t, i, a !== null ? a.memoizedProps : i)), 
      n & 1024 && (tu = !0);
      break;

     case 6:
      if (Ne(e, t), xe(t), n & 4) {
        if (t.stateNode === null) throw Error(u(162));
        n = t.memoizedProps, a = t.stateNode;
        try {
          a.nodeValue = n;
        } catch (F) {
          wt(t, t.return, F);
        }
      }
      break;

     case 3:
      if (fs = null, i = Ue, Ue = cs(e.containerInfo), Ne(e, t), Ue = i, xe(t), n & 4 && a !== null && a.memoizedState.isDehydrated) try {
        Fi(e.containerInfo);
      } catch (F) {
        wt(t, t.return, F);
      }
      tu && (tu = !1, Pd(t));
      break;

     case 4:
      n = Ue, Ue = cs(t.stateNode.containerInfo), Ne(e, t), xe(t), Ue = n;
      break;

     case 12:
      Ne(e, t), xe(t);
      break;

     case 13:
      Ne(e, t), xe(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (cu = Ve()), 
      n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, eu(t, n)));
      break;

     case 22:
      if (n & 512 && (Mt || a === null || ge(a, a.return)), b = t.memoizedState !== null, 
      S = a !== null && a.memoizedState !== null, D = ia, j = Mt, ia = D || b, Mt = j || S, 
      Ne(e, t), Mt = j, ia = D, xe(t), e = t.stateNode, e._current = t, e._visibility &= -3, 
      e._visibility |= e._pendingVisibility & 2, n & 8192 && (e._visibility = b ? e._visibility & -2 : e._visibility | 1, 
      b && (e = ia || Mt, a === null || S || e || Hn(t)), t.memoizedProps === null || t.memoizedProps.mode !== "manual")) t: for (a = null, 
      e = t; ;) {
        if (e.tag === 5 || e.tag === 26 || e.tag === 27) {
          if (a === null) {
            S = a = e;
            try {
              if (i = S.stateNode, b) l = i.style, typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none"; else {
                c = S.stateNode, f = S.memoizedProps.style;
                var x = f != null && f.hasOwnProperty("display") ? f.display : null;
                c.style.display = x == null || typeof x == "boolean" ? "" : ("" + x).trim();
              }
            } catch (F) {
              wt(S, S.return, F);
            }
          }
        } else if (e.tag === 6) {
          if (a === null) {
            S = e;
            try {
              S.stateNode.nodeValue = b ? "" : S.memoizedProps;
            } catch (F) {
              wt(S, S.return, F);
            }
          }
        } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break t;
        for (;e.sibling === null; ) {
          if (e.return === null || e.return === t) break t;
          a === e && (a = null), e = e.return;
        }
        a === e && (a = null), e.sibling.return = e.return, e = e.sibling;
      }
      n & 4 && (n = t.updateQueue, n !== null && (a = n.retryQueue, a !== null && (n.retryQueue = null, 
      eu(t, a))));
      break;

     case 19:
      Ne(e, t), xe(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, 
      eu(t, n)));
      break;

     case 21:
      break;

     default:
      Ne(e, t), xe(t);
    }
  }
  function xe(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        if (t.tag !== 27) {
          t: {
            for (var a = t.return; a !== null; ) {
              if (Qd(a)) {
                var n = a;
                break t;
              }
              a = a.return;
            }
            throw Error(u(160));
          }
          switch (n.tag) {
           case 27:
            var i = n.stateNode, l = Po(t);
            Wl(t, l, i);
            break;

           case 5:
            var c = n.stateNode;
            n.flags & 32 && (An(c, ""), n.flags &= -33);
            var f = Po(t);
            Wl(t, f, c);
            break;

           case 3:
           case 4:
            var b = n.stateNode.containerInfo, S = Po(t);
            $o(t, S, b);
            break;

           default:
            throw Error(u(161));
          }
        }
      } catch (D) {
        wt(t, t.return, D);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Pd(t) {
    if (t.subtreeFlags & 1024) for (t = t.child; t !== null; ) {
      var e = t;
      Pd(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
    }
  }
  function sa(t, e) {
    if (e.subtreeFlags & 8772) for (e = e.child; e !== null; ) Kd(t, e.alternate, e), 
    e = e.sibling;
  }
  function Hn(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
       case 0:
       case 11:
       case 14:
       case 15:
        wa(4, e, e.return), Hn(e);
        break;

       case 1:
        ge(e, e.return);
        var a = e.stateNode;
        typeof a.componentWillUnmount == "function" && Yd(e, e.return, a), Hn(e);
        break;

       case 26:
       case 27:
       case 5:
        ge(e, e.return), Hn(e);
        break;

       case 22:
        ge(e, e.return), e.memoizedState === null && Hn(e);
        break;

       default:
        Hn(e);
      }
      t = t.sibling;
    }
  }
  function _a(t, e, a) {
    for (a = a && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate, i = t, l = e, c = l.flags;
      switch (l.tag) {
       case 0:
       case 11:
       case 15:
        _a(i, l, a), Mi(4, l);
        break;

       case 1:
        if (_a(i, l, a), n = l, i = n.stateNode, typeof i.componentDidMount == "function") try {
          i.componentDidMount();
        } catch (S) {
          wt(n, n.return, S);
        }
        if (n = l, i = n.updateQueue, i !== null) {
          var f = n.stateNode;
          try {
            var b = i.shared.hiddenCallbacks;
            if (b !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < b.length; i++) zd(b[i], f);
          } catch (S) {
            wt(n, n.return, S);
          }
        }
        a && c & 64 && Gd(l), an(l, l.return);
        break;

       case 26:
       case 27:
       case 5:
        _a(i, l, a), a && n === null && c & 4 && qd(l), an(l, l.return);
        break;

       case 12:
        _a(i, l, a);
        break;

       case 13:
        _a(i, l, a), a && c & 4 && Jd(i, l);
        break;

       case 22:
        l.memoizedState === null && _a(i, l, a), an(l, l.return);
        break;

       default:
        _a(i, l, a);
      }
      e = e.sibling;
    }
  }
  function au(t, e) {
    var a = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), 
    t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), 
    t !== a && (t != null && t.refCount++, a != null && Ti(a));
  }
  function nu(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, 
    e !== t && (e.refCount++, t != null && Ti(t));
  }
  function Ra(t, e, a, n) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) $d(t, e, a, n), e = e.sibling;
  }
  function $d(t, e, a, n) {
    var i = e.flags;
    switch (e.tag) {
     case 0:
     case 11:
     case 15:
      Ra(t, e, a, n), i & 2048 && Mi(9, e);
      break;

     case 3:
      Ra(t, e, a, n), i & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), 
      e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ti(t)));
      break;

     case 12:
      if (i & 2048) {
        Ra(t, e, a, n), t = e.stateNode;
        try {
          var l = e.memoizedProps, c = l.id, f = l.onPostCommit;
          typeof f == "function" && f(c, e.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
        } catch (b) {
          wt(e, e.return, b);
        }
      } else Ra(t, e, a, n);
      break;

     case 23:
      break;

     case 22:
      l = e.stateNode, e.memoizedState !== null ? l._visibility & 4 ? Ra(t, e, a, n) : ki(t, e) : l._visibility & 4 ? Ra(t, e, a, n) : (l._visibility |= 4, 
      zn(t, e, a, n, (e.subtreeFlags & 10256) !== 0)), i & 2048 && au(e.alternate, e);
      break;

     case 24:
      Ra(t, e, a, n), i & 2048 && nu(e.alternate, e);
      break;

     default:
      Ra(t, e, a, n);
    }
  }
  function zn(t, e, a, n, i) {
    for (i = i && (e.subtreeFlags & 10256) !== 0, e = e.child; e !== null; ) {
      var l = t, c = e, f = a, b = n, S = c.flags;
      switch (c.tag) {
       case 0:
       case 11:
       case 15:
        zn(l, c, f, b, i), Mi(8, c);
        break;

       case 23:
        break;

       case 22:
        var D = c.stateNode;
        c.memoizedState !== null ? D._visibility & 4 ? zn(l, c, f, b, i) : ki(l, c) : (D._visibility |= 4, 
        zn(l, c, f, b, i)), i && S & 2048 && au(c.alternate, c);
        break;

       case 24:
        zn(l, c, f, b, i), i && S & 2048 && nu(c.alternate, c);
        break;

       default:
        zn(l, c, f, b, i);
      }
      e = e.sibling;
    }
  }
  function ki(t, e) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) {
      var a = t, n = e, i = n.flags;
      switch (n.tag) {
       case 22:
        ki(a, n), i & 2048 && au(n.alternate, n);
        break;

       case 24:
        ki(a, n), i & 2048 && nu(n.alternate, n);
        break;

       default:
        ki(a, n);
      }
      e = e.sibling;
    }
  }
  var Li = 8192;
  function Un(t) {
    if (t.subtreeFlags & Li) for (t = t.child; t !== null; ) tf(t), t = t.sibling;
  }
  function tf(t) {
    switch (t.tag) {
     case 26:
      Un(t), t.flags & Li && t.memoizedState !== null && Wy(Ue, t.memoizedState, t.memoizedProps);
      break;

     case 5:
      Un(t);
      break;

     case 3:
     case 4:
      var e = Ue;
      Ue = cs(t.stateNode.containerInfo), Un(t), Ue = e;
      break;

     case 22:
      t.memoizedState === null && (e = t.alternate, e !== null && e.memoizedState !== null ? (e = Li, 
      Li = 16777216, Un(t), Li = e) : Un(t));
      break;

     default:
      Un(t);
    }
  }
  function ef(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do {
        e = t.sibling, t.sibling = null, t = e;
      } while (t !== null);
    }
  }
  function ji(t) {
    var e = t.deletions;
    if (t.flags & 16) {
      if (e !== null) for (var a = 0; a < e.length; a++) {
        var n = e[a];
        Xt = n, nf(n, t);
      }
      ef(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) af(t), t = t.sibling;
  }
  function af(t) {
    switch (t.tag) {
     case 0:
     case 11:
     case 15:
      ji(t), t.flags & 2048 && wa(9, t, t.return);
      break;

     case 3:
      ji(t);
      break;

     case 12:
      ji(t);
      break;

     case 22:
      var e = t.stateNode;
      t.memoizedState !== null && e._visibility & 4 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -5, 
      Jl(t)) : ji(t);
      break;

     default:
      ji(t);
    }
  }
  function Jl(t) {
    var e = t.deletions;
    if (t.flags & 16) {
      if (e !== null) for (var a = 0; a < e.length; a++) {
        var n = e[a];
        Xt = n, nf(n, t);
      }
      ef(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
       case 0:
       case 11:
       case 15:
        wa(8, e, e.return), Jl(e);
        break;

       case 22:
        a = e.stateNode, a._visibility & 4 && (a._visibility &= -5, Jl(e));
        break;

       default:
        Jl(e);
      }
      t = t.sibling;
    }
  }
  function nf(t, e) {
    for (;Xt !== null; ) {
      var a = Xt;
      switch (a.tag) {
       case 0:
       case 11:
       case 15:
        wa(8, a, e);
        break;

       case 23:
       case 22:
        if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
          var n = a.memoizedState.cachePool.pool;
          n != null && n.refCount++;
        }
        break;

       case 24:
        Ti(a.memoizedState.cache);
      }
      if (n = a.child, n !== null) n.return = a, Xt = n; else t: for (a = t; Xt !== null; ) {
        n = Xt;
        var i = n.sibling, l = n.return;
        if (Zd(n), n === a) {
          Xt = null;
          break t;
        }
        if (i !== null) {
          i.return = l, Xt = i;
          break t;
        }
        Xt = l;
      }
    }
  }
  function uy(t, e, a, n) {
    this.tag = t, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, 
    this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, 
    this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, 
    this.alternate = null;
  }
  function De(t, e, a, n) {
    return new uy(t, e, a, n);
  }
  function iu(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ca(t, e) {
    var a = t.alternate;
    return a === null ? (a = De(t.tag, e, t.key, t.mode), a.elementType = t.elementType, 
    a.type = t.type, a.stateNode = t.stateNode, a.alternate = t, t.alternate = a) : (a.pendingProps = e, 
    a.type = t.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = t.flags & 31457280, 
    a.childLanes = t.childLanes, a.lanes = t.lanes, a.child = t.child, a.memoizedProps = t.memoizedProps, 
    a.memoizedState = t.memoizedState, a.updateQueue = t.updateQueue, e = t.dependencies, 
    a.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }, a.sibling = t.sibling, a.index = t.index, a.ref = t.ref, a.refCleanup = t.refCleanup, 
    a;
  }
  function lf(t, e) {
    t.flags &= 31457282;
    var a = t.alternate;
    return a === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, 
    t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, 
    t.stateNode = null) : (t.childLanes = a.childLanes, t.lanes = a.lanes, t.child = a.child, 
    t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = a.memoizedProps, t.memoizedState = a.memoizedState, 
    t.updateQueue = a.updateQueue, t.type = a.type, e = a.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Fl(t, e, a, n, i, l) {
    var c = 0;
    if (n = t, typeof t == "function") iu(t) && (c = 1); else if (typeof t == "string") c = Ky(t, a, qe.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5; else t: switch (t) {
     case O:
      return nn(a.children, i, l, e);

     case g:
      c = 8, i |= 24;
      break;

     case p:
      return t = De(12, a, e, i | 2), t.elementType = p, t.lanes = l, t;

     case P:
      return t = De(13, a, e, i), t.elementType = P, t.lanes = l, t;

     case it:
      return t = De(19, a, e, i), t.elementType = it, t.lanes = l, t;

     case H:
      return sf(a, i, l, e);

     default:
      if (typeof t == "object" && t !== null) switch (t.$$typeof) {
       case R:
       case W:
        c = 10;
        break t;

       case G:
        c = 9;
        break t;

       case X:
        c = 11;
        break t;

       case ut:
        c = 14;
        break t;

       case J:
        c = 16, n = null;
        break t;
      }
      c = 29, a = Error(u(130, t === null ? "null" : typeof t, "")), n = null;
    }
    return e = De(c, a, e, i), e.elementType = t, e.type = n, e.lanes = l, e;
  }
  function nn(t, e, a, n) {
    return t = De(7, t, n, e), t.lanes = a, t;
  }
  function sf(t, e, a, n) {
    t = De(22, t, n, e), t.elementType = H, t.lanes = a;
    var i = {
      _visibility: 1,
      _pendingVisibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null,
      _current: null,
      detach: function() {
        var l = i._current;
        if (l === null) throw Error(u(456));
        if (!(i._pendingVisibility & 2)) {
          var c = ga(l, 2);
          c !== null && (i._pendingVisibility |= 2, se(c, l, 2));
        }
      },
      attach: function() {
        var l = i._current;
        if (l === null) throw Error(u(456));
        if (i._pendingVisibility & 2) {
          var c = ga(l, 2);
          c !== null && (i._pendingVisibility &= -3, se(c, l, 2));
        }
      }
    };
    return t.stateNode = i, t;
  }
  function lu(t, e, a) {
    return t = De(6, t, null, e), t.lanes = a, t;
  }
  function su(t, e, a) {
    return e = De(4, t.children !== null ? t.children : [], t.key, e), e.lanes = a, 
    e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  function oa(t) {
    t.flags |= 4;
  }
  function of(t, e) {
    if (e.type !== "stylesheet" || e.state.loading & 4) t.flags &= -16777217; else if (t.flags |= 16777216, 
    !If(e)) {
      if (e = Be.current, e !== null && ((gt & 4194176) === gt ? Ie !== null : (gt & 62914560) !== gt && !(gt & 536870912) || e !== Ie)) throw Ai = co, 
      Tc;
      t.flags |= 8192;
    }
  }
  function Pl(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Or() : 536870912, 
    t.lanes |= e, Yn |= e);
  }
  function Hi(t, e) {
    if (!pt) switch (t.tailMode) {
     case "hidden":
      e = t.tail;
      for (var a = null; e !== null; ) e.alternate !== null && (a = e), e = e.sibling;
      a === null ? t.tail = null : a.sibling = null;
      break;

     case "collapsed":
      a = t.tail;
      for (var n = null; a !== null; ) a.alternate !== null && (n = a), a = a.sibling;
      n === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : n.sibling = null;
    }
  }
  function Nt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, a = 0, n = 0;
    if (e) for (var i = t.child; i !== null; ) a |= i.lanes | i.childLanes, n |= i.subtreeFlags & 31457280, 
    n |= i.flags & 31457280, i.return = t, i = i.sibling; else for (i = t.child; i !== null; ) a |= i.lanes | i.childLanes, 
    n |= i.subtreeFlags, n |= i.flags, i.return = t, i = i.sibling;
    return t.subtreeFlags |= n, t.childLanes = a, e;
  }
  function ry(t, e, a) {
    var n = e.pendingProps;
    switch (uo(e), e.tag) {
     case 16:
     case 15:
     case 0:
     case 11:
     case 7:
     case 8:
     case 12:
     case 9:
     case 14:
      return Nt(e), null;

     case 1:
      return Nt(e), null;

     case 3:
      return a = e.stateNode, n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), 
      na(qt), mn(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), 
      (t === null || t.child === null) && (gi(e) ? oa(e) : t === null || t.memoizedState.isDehydrated && !(e.flags & 256) || (e.flags |= 1024, 
      ze !== null && (mu(ze), ze = null))), Nt(e), null;

     case 26:
      return a = e.memoizedState, t === null ? (oa(e), a !== null ? (Nt(e), of(e, a)) : (Nt(e), 
      e.flags &= -16777217)) : a ? a !== t.memoizedState ? (oa(e), Nt(e), of(e, a)) : (Nt(e), 
      e.flags &= -16777217) : (t.memoizedProps !== n && oa(e), Nt(e), e.flags &= -16777217), 
      null;

     case 27:
      cl(e), a = fa.current;
      var i = e.type;
      if (t !== null && e.stateNode != null) t.memoizedProps !== n && oa(e); else {
        if (!n) {
          if (e.stateNode === null) throw Error(u(166));
          return Nt(e), null;
        }
        t = qe.current, gi(e) ? Ec(e) : (t = Hf(i, n, a), e.stateNode = t, oa(e));
      }
      return Nt(e), null;

     case 5:
      if (cl(e), a = e.type, t !== null && e.stateNode != null) t.memoizedProps !== n && oa(e); else {
        if (!n) {
          if (e.stateNode === null) throw Error(u(166));
          return Nt(e), null;
        }
        if (t = qe.current, gi(e)) Ec(e); else {
          switch (i = rs(fa.current), t) {
           case 1:
            t = i.createElementNS("http://www.w3.org/2000/svg", a);
            break;

           case 2:
            t = i.createElementNS("http://www.w3.org/1998/Math/MathML", a);
            break;

           default:
            switch (a) {
             case "svg":
              t = i.createElementNS("http://www.w3.org/2000/svg", a);
              break;

             case "math":
              t = i.createElementNS("http://www.w3.org/1998/Math/MathML", a);
              break;

             case "script":
              t = i.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild);
              break;

             case "select":
              t = typeof n.is == "string" ? i.createElement("select", {
                is: n.is
              }) : i.createElement("select"), n.multiple ? t.multiple = !0 : n.size && (t.size = n.size);
              break;

             default:
              t = typeof n.is == "string" ? i.createElement(a, {
                is: n.is
              }) : i.createElement(a);
            }
          }
          t[ee] = e, t[ce] = n;
          t: for (i = e.child; i !== null; ) {
            if (i.tag === 5 || i.tag === 6) t.appendChild(i.stateNode); else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
              i.child.return = i, i = i.child;
              continue;
            }
            if (i === e) break t;
            for (;i.sibling === null; ) {
              if (i.return === null || i.return === e) break t;
              i = i.return;
            }
            i.sibling.return = i.return, i = i.sibling;
          }
          e.stateNode = t;
          t: switch (Ft(t, a, n), a) {
           case "button":
           case "input":
           case "select":
           case "textarea":
            t = !!n.autoFocus;
            break t;

           case "img":
            t = !0;
            break t;

           default:
            t = !1;
          }
          t && oa(e);
        }
      }
      return Nt(e), e.flags &= -16777217, null;

     case 6:
      if (t && e.stateNode != null) t.memoizedProps !== n && oa(e); else {
        if (typeof n != "string" && e.stateNode === null) throw Error(u(166));
        if (t = fa.current, gi(e)) {
          if (t = e.stateNode, a = e.memoizedProps, n = null, i = le, i !== null) switch (i.tag) {
           case 27:
           case 5:
            n = i.memoizedProps;
          }
          t[ee] = e, t = !!(t.nodeValue === a || n !== null && n.suppressHydrationWarning === !0 || xf(t.nodeValue, a)), 
          t || Ka(e);
        } else t = rs(t).createTextNode(n), t[ee] = e, e.stateNode = t;
      }
      return Nt(e), null;

     case 13:
      if (n = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
        if (i = gi(e), n !== null && n.dehydrated !== null) {
          if (t === null) {
            if (!i) throw Error(u(318));
            if (i = e.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(u(317));
            i[ee] = e;
          } else bi(), !(e.flags & 128) && (e.memoizedState = null), e.flags |= 4;
          Nt(e), i = !1;
        } else ze !== null && (mu(ze), ze = null), i = !0;
        if (!i) return e.flags & 256 ? ($e(e), e) : ($e(e), null);
      }
      if ($e(e), e.flags & 128) return e.lanes = a, e;
      if (a = n !== null, t = t !== null && t.memoizedState !== null, a) {
        n = e.child, i = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (i = n.alternate.memoizedState.cachePool.pool);
        var l = null;
        n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), 
        l !== i && (n.flags |= 2048);
      }
      return a !== t && a && (e.child.flags |= 8192), Pl(e, e.updateQueue), Nt(e), null;

     case 4:
      return mn(), t === null && wu(e.stateNode.containerInfo), Nt(e), null;

     case 10:
      return na(e.type), Nt(e), null;

     case 19:
      if (_t(Yt), i = e.memoizedState, i === null) return Nt(e), null;
      if (n = (e.flags & 128) !== 0, l = i.rendering, l === null) if (n) Hi(i, !1); else {
        if (kt !== 0 || t !== null && t.flags & 128) for (t = e.child; t !== null; ) {
          if (l = Ll(t), l !== null) {
            for (e.flags |= 128, Hi(i, !1), t = l.updateQueue, e.updateQueue = t, Pl(e, t), 
            e.subtreeFlags = 0, t = a, a = e.child; a !== null; ) lf(a, t), a = a.sibling;
            return Bt(Yt, Yt.current & 1 | 2), e.child;
          }
          t = t.sibling;
        }
        i.tail !== null && Ve() > $l && (e.flags |= 128, n = !0, Hi(i, !1), e.lanes = 4194304);
      } else {
        if (!n) if (t = Ll(l), t !== null) {
          if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, Pl(e, t), Hi(i, !0), 
          i.tail === null && i.tailMode === "hidden" && !l.alternate && !pt) return Nt(e), 
          null;
        } else 2 * Ve() - i.renderingStartTime > $l && a !== 536870912 && (e.flags |= 128, 
        n = !0, Hi(i, !1), e.lanes = 4194304);
        i.isBackwards ? (l.sibling = e.child, e.child = l) : (t = i.last, t !== null ? t.sibling = l : e.child = l, 
        i.last = l);
      }
      return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = Ve(), 
      e.sibling = null, t = Yt.current, Bt(Yt, n ? t & 1 | 2 : t & 1), e) : (Nt(e), null);

     case 22:
     case 23:
      return $e(e), ho(), n = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (e.flags |= 8192) : n && (e.flags |= 8192), 
      n ? a & 536870912 && !(e.flags & 128) && (Nt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Nt(e), 
      a = e.updateQueue, a !== null && Pl(e, a.retryQueue), a = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), 
      n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), 
      n !== a && (e.flags |= 2048), t !== null && _t(Wa), null;

     case 24:
      return a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), 
      na(qt), Nt(e), null;

     case 25:
      return null;
    }
    throw Error(u(156, e.tag));
  }
  function cy(t, e) {
    switch (uo(e), e.tag) {
     case 1:
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;

     case 3:
      return na(qt), mn(), t = e.flags, t & 65536 && !(t & 128) ? (e.flags = t & -65537 | 128, 
      e) : null;

     case 26:
     case 27:
     case 5:
      return cl(e), null;

     case 13:
      if ($e(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
        if (e.alternate === null) throw Error(u(340));
        bi();
      }
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;

     case 19:
      return _t(Yt), null;

     case 4:
      return mn(), null;

     case 10:
      return na(e.type), null;

     case 22:
     case 23:
      return $e(e), ho(), t !== null && _t(Wa), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, 
      e) : null;

     case 24:
      return na(qt), null;

     case 25:
      return null;

     default:
      return null;
    }
  }
  function uf(t, e) {
    switch (uo(e), e.tag) {
     case 3:
      na(qt), mn();
      break;

     case 26:
     case 27:
     case 5:
      cl(e);
      break;

     case 4:
      mn();
      break;

     case 13:
      $e(e);
      break;

     case 19:
      _t(Yt);
      break;

     case 10:
      na(e.type);
      break;

     case 22:
     case 23:
      $e(e), ho(), t !== null && _t(Wa);
      break;

     case 24:
      na(qt);
    }
  }
  var dy = {
    getCacheForType: function(t) {
      var e = ae(qt), a = e.data.get(t);
      return a === void 0 && (a = t(), e.data.set(t, a)), a;
    }
  }, fy = typeof WeakMap == "function" ? WeakMap : Map, xt = 0, Rt = null, mt = null, gt = 0, Ct = 0, pe = null, ua = !1, Gn = !1, ou = !1, ra = 0, kt = 0, Ba = 0, ln = 0, uu = 0, Me = 0, Yn = 0, zi = null, Ke = null, ru = !1, cu = 0, $l = 1 / 0, ts = null, Na = null, es = !1, sn = null, Ui = 0, du = 0, fu = null, Gi = 0, hu = null;
  function ve() {
    if (xt & 2 && gt !== 0) return gt & -gt;
    if (q.T !== null) {
      var t = Dn;
      return t !== 0 ? t : Eu();
    }
    return Cr();
  }
  function rf() {
    Me === 0 && (Me = !(gt & 536870912) || pt ? Tr() : 536870912);
    var t = Be.current;
    return t !== null && (t.flags |= 32), Me;
  }
  function se(t, e, a) {
    (t === Rt && Ct === 2 || t.cancelPendingCommit !== null) && (qn(t, 0), ca(t, gt, Me, !1)), 
    ii(t, a), (!(xt & 2) || t !== Rt) && (t === Rt && (!(xt & 2) && (ln |= a), kt === 4 && ca(t, gt, Me, !1)), 
    Ze(t));
  }
  function cf(t, e, a) {
    if (xt & 6) throw Error(u(327));
    var n = !a && (e & 60) === 0 && (e & t.expiredLanes) === 0 || ni(t, e), i = n ? yy(t, e) : bu(t, e, !0), l = n;
    do {
      if (i === 0) {
        Gn && !n && ca(t, e, 0, !1);
        break;
      } else if (i === 6) ca(t, e, 0, !ua); else {
        if (a = t.current.alternate, l && !hy(a)) {
          i = bu(t, e, !1), l = !1;
          continue;
        }
        if (i === 2) {
          if (l = e, t.errorRecoveryDisabledLanes & l) var c = 0; else c = t.pendingLanes & -536870913, 
          c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            e = c;
            t: {
              var f = t;
              i = zi;
              var b = f.current.memoizedState.isDehydrated;
              if (b && (qn(f, c).flags |= 256), c = bu(f, c, !1), c !== 2) {
                if (ou && !b) {
                  f.errorRecoveryDisabledLanes |= l, ln |= l, i = 4;
                  break t;
                }
                l = Ke, Ke = i, l !== null && mu(l);
              }
              i = c;
            }
            if (l = !1, i !== 2) continue;
          }
        }
        if (i === 1) {
          qn(t, 0), ca(t, e, 0, !0);
          break;
        }
        t: {
          switch (n = t, i) {
           case 0:
           case 1:
            throw Error(u(345));

           case 4:
            if ((e & 4194176) === e) {
              ca(n, e, Me, !ua);
              break t;
            }
            break;

           case 2:
            Ke = null;
            break;

           case 3:
           case 5:
            break;

           default:
            throw Error(u(329));
          }
          if (n.finishedWork = a, n.finishedLanes = e, (e & 62914560) === e && (l = cu + 300 - Ve(), 
          10 < l)) {
            if (ca(n, e, Me, !ua), ml(n, 0) !== 0) break t;
            n.timeoutHandle = kf(df.bind(null, n, a, Ke, ts, ru, e, Me, ln, Yn, ua, 2, -0, 0), l);
            break t;
          }
          df(n, a, Ke, ts, ru, e, Me, ln, Yn, ua, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    Ze(t);
  }
  function mu(t) {
    Ke === null ? Ke = t : Ke.push.apply(Ke, t);
  }
  function df(t, e, a, n, i, l, c, f, b, S, D, j, C) {
    var x = e.subtreeFlags;
    if ((x & 8192 || (x & 16785408) === 16785408) && (Xi = {
      stylesheets: null,
      count: 0,
      unsuspend: Zy
    }, tf(e), e = Jy(), e !== null)) {
      t.cancelPendingCommit = e(pf.bind(null, t, a, n, i, c, f, b, 1, j, C)), ca(t, l, c, !S);
      return;
    }
    pf(t, a, n, i, c, f, b, D, j, C);
  }
  function hy(t) {
    for (var e = t; ;) {
      var a = e.tag;
      if ((a === 0 || a === 11 || a === 15) && e.flags & 16384 && (a = e.updateQueue, 
      a !== null && (a = a.stores, a !== null))) for (var n = 0; n < a.length; n++) {
        var i = a[n], l = i.getSnapshot;
        i = i.value;
        try {
          if (!ye(l(), i)) return !1;
        } catch {
          return !1;
        }
      }
      if (a = e.child, e.subtreeFlags & 16384 && a !== null) a.return = e, e = a; else {
        if (e === t) break;
        for (;e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function ca(t, e, a, n) {
    e &= ~uu, e &= ~ln, t.suspendedLanes |= e, t.pingedLanes &= ~e, n && (t.warmLanes |= e), 
    n = t.expirationTimes;
    for (var i = e; 0 < i; ) {
      var l = 31 - me(i), c = 1 << l;
      n[l] = -1, i &= ~c;
    }
    a !== 0 && wr(t, a, e);
  }
  function as() {
    return xt & 6 ? !0 : (Yi(0), !1);
  }
  function yu() {
    if (mt !== null) {
      if (Ct === 0) var t = mt.return; else t = mt, aa = tn = null, Eo(t), Nn = null, 
      Ei = 0, t = mt;
      for (;t !== null; ) uf(t.alternate, t), t = t.return;
      mt = null;
    }
  }
  function qn(t, e) {
    t.finishedWork = null, t.finishedLanes = 0;
    var a = t.timeoutHandle;
    a !== -1 && (t.timeoutHandle = -1, Dy(a)), a = t.cancelPendingCommit, a !== null && (t.cancelPendingCommit = null, 
    a()), yu(), Rt = t, mt = a = Ca(t.current, null), gt = e, Ct = 0, pe = null, ua = !1, 
    Gn = ni(t, e), ou = !1, Yn = Me = uu = ln = Ba = kt = 0, Ke = zi = null, ru = !1, 
    e & 8 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0) for (t = t.entanglements, n &= e; 0 < n; ) {
      var i = 31 - me(n), l = 1 << i;
      e |= t[i], n &= ~l;
    }
    return ra = e, _l(), a;
  }
  function ff(t, e) {
    ft = null, q.H = Xe, e === vi ? (e = _c(), Ct = 3) : e === Tc ? (e = _c(), Ct = 4) : Ct = e === Od ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, 
    pe = e, mt === null && (kt = 1, Xl(t, _e(e, t.current)));
  }
  function hf() {
    var t = q.H;
    return q.H = Xe, t === null ? Xe : t;
  }
  function mf() {
    var t = q.A;
    return q.A = dy, t;
  }
  function gu() {
    kt = 4, ua || (gt & 4194176) !== gt && Be.current !== null || (Gn = !0), !(Ba & 134217727) && !(ln & 134217727) || Rt === null || ca(Rt, gt, Me, !1);
  }
  function bu(t, e, a) {
    var n = xt;
    xt |= 2;
    var i = hf(), l = mf();
    (Rt !== t || gt !== e) && (ts = null, qn(t, e)), e = !1;
    var c = kt;
    t: do {
      try {
        if (Ct !== 0 && mt !== null) {
          var f = mt, b = pe;
          switch (Ct) {
           case 8:
            yu(), c = 6;
            break t;

           case 3:
           case 2:
           case 6:
            Be.current === null && (e = !0);
            var S = Ct;
            if (Ct = 0, pe = null, Vn(t, f, b, S), a && Gn) {
              c = 0;
              break t;
            }
            break;

           default:
            S = Ct, Ct = 0, pe = null, Vn(t, f, b, S);
          }
        }
        my(), c = kt;
        break;
      } catch (D) {
        ff(t, D);
      }
    } while (!0);
    return e && t.shellSuspendCounter++, aa = tn = null, xt = n, q.H = i, q.A = l, mt === null && (Rt = null, 
    gt = 0, _l()), c;
  }
  function my() {
    for (;mt !== null; ) yf(mt);
  }
  function yy(t, e) {
    var a = xt;
    xt |= 2;
    var n = hf(), i = mf();
    Rt !== t || gt !== e ? (ts = null, $l = Ve() + 500, qn(t, e)) : Gn = ni(t, e);
    t: do {
      try {
        if (Ct !== 0 && mt !== null) {
          e = mt;
          var l = pe;
          e: switch (Ct) {
           case 1:
            Ct = 0, pe = null, Vn(t, e, l, 1);
            break;

           case 2:
            if (Oc(l)) {
              Ct = 0, pe = null, gf(e);
              break;
            }
            e = function() {
              Ct === 2 && Rt === t && (Ct = 7), Ze(t);
            }, l.then(e, e);
            break t;

           case 3:
            Ct = 7;
            break t;

           case 4:
            Ct = 5;
            break t;

           case 7:
            Oc(l) ? (Ct = 0, pe = null, gf(e)) : (Ct = 0, pe = null, Vn(t, e, l, 7));
            break;

           case 5:
            var c = null;
            switch (mt.tag) {
             case 26:
              c = mt.memoizedState;

             case 5:
             case 27:
              var f = mt;
              if (!c || If(c)) {
                Ct = 0, pe = null;
                var b = f.sibling;
                if (b !== null) mt = b; else {
                  var S = f.return;
                  S !== null ? (mt = S, ns(S)) : mt = null;
                }
                break e;
              }
            }
            Ct = 0, pe = null, Vn(t, e, l, 5);
            break;

           case 6:
            Ct = 0, pe = null, Vn(t, e, l, 6);
            break;

           case 8:
            yu(), kt = 6;
            break t;

           default:
            throw Error(u(462));
          }
        }
        gy();
        break;
      } catch (D) {
        ff(t, D);
      }
    } while (!0);
    return aa = tn = null, q.H = n, q.A = i, xt = a, mt !== null ? 0 : (Rt = null, gt = 0, 
    _l(), kt);
  }
  function gy() {
    for (;mt !== null && !zh(); ) yf(mt);
  }
  function yf(t) {
    var e = jd(t.alternate, t, ra);
    t.memoizedProps = t.pendingProps, e === null ? ns(t) : mt = e;
  }
  function gf(t) {
    var e = t, a = e.alternate;
    switch (e.tag) {
     case 15:
     case 0:
      e = Nd(a, e, e.pendingProps, e.type, void 0, gt);
      break;

     case 11:
      e = Nd(a, e, e.pendingProps, e.type.render, e.ref, gt);
      break;

     case 5:
      Eo(e);

     default:
      uf(a, e), e = mt = lf(e, ra), e = jd(a, e, ra);
    }
    t.memoizedProps = t.pendingProps, e === null ? ns(t) : mt = e;
  }
  function Vn(t, e, a, n) {
    aa = tn = null, Eo(e), Nn = null, Ei = 0;
    var i = e.return;
    try {
      if (iy(t, i, e, a, gt)) {
        kt = 1, Xl(t, _e(a, t.current)), mt = null;
        return;
      }
    } catch (l) {
      if (i !== null) throw mt = i, l;
      kt = 1, Xl(t, _e(a, t.current)), mt = null;
      return;
    }
    e.flags & 32768 ? (pt || n === 1 ? t = !0 : Gn || gt & 536870912 ? t = !1 : (ua = t = !0, 
    (n === 2 || n === 3 || n === 6) && (n = Be.current, n !== null && n.tag === 13 && (n.flags |= 16384))), 
    bf(e, t)) : ns(e);
  }
  function ns(t) {
    var e = t;
    do {
      if (e.flags & 32768) {
        bf(e, ua);
        return;
      }
      t = e.return;
      var a = ry(e.alternate, e, ra);
      if (a !== null) {
        mt = a;
        return;
      }
      if (e = e.sibling, e !== null) {
        mt = e;
        return;
      }
      mt = e = t;
    } while (e !== null);
    kt === 0 && (kt = 5);
  }
  function bf(t, e) {
    do {
      var a = cy(t.alternate, t);
      if (a !== null) {
        a.flags &= 32767, mt = a;
        return;
      }
      if (a = t.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), 
      !e && (t = t.sibling, t !== null)) {
        mt = t;
        return;
      }
      mt = t = a;
    } while (t !== null);
    kt = 6, mt = null;
  }
  function pf(t, e, a, n, i, l, c, f, b, S) {
    var D = q.T, j = M.p;
    try {
      M.p = 2, q.T = null, by(t, e, a, n, j, i, l, c, f, b, S);
    } finally {
      q.T = D, M.p = j;
    }
  }
  function by(t, e, a, n, i, l, c, f) {
    do {
      Qn();
    } while (sn !== null);
    if (xt & 6) throw Error(u(327));
    var b = t.finishedWork;
    if (n = t.finishedLanes, b === null) return null;
    if (t.finishedWork = null, t.finishedLanes = 0, b === t.current) throw Error(u(177));
    t.callbackNode = null, t.callbackPriority = 0, t.cancelPendingCommit = null;
    var S = b.lanes | b.childLanes;
    if (S |= lo, Wh(t, n, S, l, c, f), t === Rt && (mt = Rt = null, gt = 0), !(b.subtreeFlags & 10256) && !(b.flags & 10256) || es || (es = !0, 
    du = S, fu = a, Ey(dl, (function() {
      return Qn(), null;
    }))), a = (b.flags & 15990) !== 0, b.subtreeFlags & 15990 || a ? (a = q.T, q.T = null, 
    l = M.p, M.p = 2, c = xt, xt |= 4, sy(t, b), Fd(b, t), Ym(Bu, t.containerInfo), 
    ys = !!Cu, Bu = Cu = null, t.current = b, Kd(t, b.alternate, b), Uh(), xt = c, M.p = l, 
    q.T = a) : t.current = b, es ? (es = !1, sn = t, Ui = n) : vf(t, S), S = t.pendingLanes, 
    S === 0 && (Na = null), Qh(b.stateNode), Ze(t), e !== null) for (i = t.onRecoverableError, 
    b = 0; b < e.length; b++) S = e[b], i(S.value, {
      componentStack: S.stack
    });
    return Ui & 3 && Qn(), S = t.pendingLanes, n & 4194218 && S & 42 ? t === hu ? Gi++ : (Gi = 0, 
    hu = t) : Gi = 0, Yi(0), null;
  }
  function vf(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, 
    Ti(e)));
  }
  function Qn() {
    if (sn !== null) {
      var t = sn, e = du;
      du = 0;
      var a = Rr(Ui), n = q.T, i = M.p;
      try {
        if (M.p = 32 > a ? 32 : a, q.T = null, sn === null) var l = !1; else {
          a = fu, fu = null;
          var c = sn, f = Ui;
          if (sn = null, Ui = 0, xt & 6) throw Error(u(331));
          var b = xt;
          if (xt |= 4, af(c.current), $d(c, c.current, f, a), xt = b, Yi(0, !1), he && typeof he.onPostCommitFiberRoot == "function") try {
            he.onPostCommitFiberRoot(ai, c);
          } catch {}
          l = !0;
        }
        return l;
      } finally {
        M.p = i, q.T = n, vf(t, e);
      }
    }
    return !1;
  }
  function Af(t, e, a) {
    e = _e(a, e), e = Lo(t.stateNode, e, 2), t = Oa(t, e, 2), t !== null && (ii(t, 2), 
    Ze(t));
  }
  function wt(t, e, a) {
    if (t.tag === 3) Af(t, t, a); else for (;e !== null; ) {
      if (e.tag === 3) {
        Af(e, t, a);
        break;
      } else if (e.tag === 1) {
        var n = e.stateNode;
        if (typeof e.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Na === null || !Na.has(n))) {
          t = _e(a, t), a = Sd(2), n = Oa(e, a, 2), n !== null && (Td(a, n, e, t), ii(n, 2), 
          Ze(n));
          break;
        }
      }
      e = e.return;
    }
  }
  function pu(t, e, a) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new fy;
      var i = new Set;
      n.set(e, i);
    } else i = n.get(e), i === void 0 && (i = new Set, n.set(e, i));
    i.has(a) || (ou = !0, i.add(a), t = py.bind(null, t, e, a), e.then(t, t));
  }
  function py(t, e, a) {
    var n = t.pingCache;
    n !== null && n.delete(e), t.pingedLanes |= t.suspendedLanes & a, t.warmLanes &= ~a, 
    Rt === t && (gt & a) === a && (kt === 4 || kt === 3 && (gt & 62914560) === gt && 300 > Ve() - cu ? !(xt & 2) && qn(t, 0) : uu |= a, 
    Yn === gt && (Yn = 0)), Ze(t);
  }
  function Ef(t, e) {
    e === 0 && (e = Or()), t = ga(t, e), t !== null && (ii(t, e), Ze(t));
  }
  function vy(t) {
    var e = t.memoizedState, a = 0;
    e !== null && (a = e.retryLane), Ef(t, a);
  }
  function Ay(t, e) {
    var a = 0;
    switch (t.tag) {
     case 13:
      var n = t.stateNode, i = t.memoizedState;
      i !== null && (a = i.retryLane);
      break;

     case 19:
      n = t.stateNode;
      break;

     case 22:
      n = t.stateNode._retryCache;
      break;

     default:
      throw Error(u(314));
    }
    n !== null && n.delete(e), Ef(t, a);
  }
  function Ey(t, e) {
    return Ls(t, e);
  }
  var is = null, In = null, vu = !1, ls = !1, Au = !1, on = 0;
  function Ze(t) {
    t !== In && t.next === null && (In === null ? is = In = t : In = In.next = t), ls = !0, 
    vu || (vu = !0, Ty(Sy));
  }
  function Yi(t, e) {
    if (!Au && ls) {
      Au = !0;
      do {
        for (var a = !1, n = is; n !== null; ) {
          if (t !== 0) {
            var i = n.pendingLanes;
            if (i === 0) var l = 0; else {
              var c = n.suspendedLanes, f = n.pingedLanes;
              l = (1 << 31 - me(42 | t) + 1) - 1, l &= i & ~(c & ~f), l = l & 201326677 ? l & 201326677 | 1 : l ? l | 2 : 0;
            }
            l !== 0 && (a = !0, Of(n, l));
          } else l = gt, l = ml(n, n === Rt ? l : 0), !(l & 3) || ni(n, l) || (a = !0, Of(n, l));
          n = n.next;
        }
      } while (a);
      Au = !1;
    }
  }
  function Sy() {
    ls = vu = !1;
    var t = 0;
    on !== 0 && (xy() && (t = on), on = 0);
    for (var e = Ve(), a = null, n = is; n !== null; ) {
      var i = n.next, l = Sf(n, e);
      l === 0 ? (n.next = null, a === null ? is = i : a.next = i, i === null && (In = a)) : (a = n, 
      (t !== 0 || l & 3) && (ls = !0)), n = i;
    }
    Yi(t);
  }
  function Sf(t, e) {
    for (var a = t.suspendedLanes, n = t.pingedLanes, i = t.expirationTimes, l = t.pendingLanes & -62914561; 0 < l; ) {
      var c = 31 - me(l), f = 1 << c, b = i[c];
      b === -1 ? (!(f & a) || f & n) && (i[c] = Zh(f, e)) : b <= e && (t.expiredLanes |= f), 
      l &= ~f;
    }
    if (e = Rt, a = gt, a = ml(t, t === e ? a : 0), n = t.callbackNode, a === 0 || t === e && Ct === 2 || t.cancelPendingCommit !== null) return n !== null && n !== null && js(n), 
    t.callbackNode = null, t.callbackPriority = 0;
    if (!(a & 3) || ni(t, a)) {
      if (e = a & -a, e === t.callbackPriority) return e;
      switch (n !== null && js(n), Rr(a)) {
       case 2:
       case 8:
        a = Er;
        break;

       case 32:
        a = dl;
        break;

       case 268435456:
        a = Sr;
        break;

       default:
        a = dl;
      }
      return n = Tf.bind(null, t), a = Ls(a, n), t.callbackPriority = e, t.callbackNode = a, 
      e;
    }
    return n !== null && n !== null && js(n), t.callbackPriority = 2, t.callbackNode = null, 
    2;
  }
  function Tf(t, e) {
    var a = t.callbackNode;
    if (Qn() && t.callbackNode !== a) return null;
    var n = gt;
    return n = ml(t, t === Rt ? n : 0), n === 0 ? null : (cf(t, n, e), Sf(t, Ve()), 
    t.callbackNode != null && t.callbackNode === a ? Tf.bind(null, t) : null);
  }
  function Of(t, e) {
    if (Qn()) return null;
    cf(t, e, !0);
  }
  function Ty(t) {
    My((function() {
      xt & 6 ? Ls(Ar, t) : t();
    }));
  }
  function Eu() {
    return on === 0 && (on = Tr()), on;
  }
  function wf(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : vl("" + t);
  }
  function _f(t, e) {
    var a = e.ownerDocument.createElement("input");
    return a.name = e.name, a.value = e.value, t.id && a.setAttribute("form", t.id), 
    e.parentNode.insertBefore(a, e), t = new FormData(t), a.parentNode.removeChild(a), 
    t;
  }
  function Oy(t, e, a, n, i) {
    if (e === "submit" && a && a.stateNode === i) {
      var l = wf((i[ce] || null).action), c = n.submitter;
      c && (e = (e = c[ce] || null) ? wf(e.formAction) : c.getAttribute("formAction"), 
      e !== null && (l = e, c = null));
      var f = new Tl("action", "action", null, n, i);
      t.push({
        event: f,
        listeners: [ {
          instance: null,
          listener: function() {
            if (n.defaultPrevented) {
              if (on !== 0) {
                var b = c ? _f(i, c) : new FormData(i);
                No(a, {
                  pending: !0,
                  data: b,
                  method: i.method,
                  action: l
                }, null, b);
              }
            } else typeof l == "function" && (f.preventDefault(), b = c ? _f(i, c) : new FormData(i), 
            No(a, {
              pending: !0,
              data: b,
              method: i.method,
              action: l
            }, l, b));
          },
          currentTarget: i
        } ]
      });
    }
  }
  for (var Su = 0; Su < bc.length; Su++) {
    var Tu = bc[Su], wy = Tu.toLowerCase(), _y = Tu[0].toUpperCase() + Tu.slice(1);
    He(wy, "on" + _y);
  }
  He(fc, "onAnimationEnd"), He(hc, "onAnimationIteration"), He(mc, "onAnimationStart"), 
  He("dblclick", "onDoubleClick"), He("focusin", "onFocus"), He("focusout", "onBlur"), 
  He(Vm, "onTransitionRun"), He(Qm, "onTransitionStart"), He(Im, "onTransitionCancel"), 
  He(yc, "onTransitionEnd"), pn("onMouseEnter", [ "mouseout", "mouseover" ]), pn("onMouseLeave", [ "mouseout", "mouseover" ]), 
  pn("onPointerEnter", [ "pointerout", "pointerover" ]), pn("onPointerLeave", [ "pointerout", "pointerover" ]), 
  Ya("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), 
  Ya("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), 
  Ya("onBeforeInput", [ "compositionend", "keypress", "textInput", "paste" ]), Ya("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), 
  Ya("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), 
  Ya("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var qi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ry = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(qi));
  function Rf(t, e) {
    e = (e & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var n = t[a], i = n.event;
      n = n.listeners;
      t: {
        var l = void 0;
        if (e) for (var c = n.length - 1; 0 <= c; c--) {
          var f = n[c], b = f.instance, S = f.currentTarget;
          if (f = f.listener, b !== l && i.isPropagationStopped()) break t;
          l = f, i.currentTarget = S;
          try {
            l(i);
          } catch (D) {
            Il(D);
          }
          i.currentTarget = null, l = b;
        } else for (c = 0; c < n.length; c++) {
          if (f = n[c], b = f.instance, S = f.currentTarget, f = f.listener, b !== l && i.isPropagationStopped()) break t;
          l = f, i.currentTarget = S;
          try {
            l(i);
          } catch (D) {
            Il(D);
          }
          i.currentTarget = null, l = b;
        }
      }
    }
  }
  function yt(t, e) {
    var a = e[zs];
    a === void 0 && (a = e[zs] = new Set);
    var n = t + "__bubble";
    a.has(n) || (Cf(e, t, 2, !1), a.add(n));
  }
  function Ou(t, e, a) {
    var n = 0;
    e && (n |= 4), Cf(a, t, n, e);
  }
  var ss = "_reactListening" + Math.random().toString(36).slice(2);
  function wu(t) {
    if (!t[ss]) {
      t[ss] = !0, Nr.forEach((function(a) {
        a !== "selectionchange" && (Ry.has(a) || Ou(a, !1, t), Ou(a, !0, t));
      }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[ss] || (e[ss] = !0, Ou("selectionchange", !1, e));
    }
  }
  function Cf(t, e, a, n) {
    switch (Ff(e)) {
     case 2:
      var i = $y;
      break;

     case 8:
      i = tg;
      break;

     default:
      i = zu;
    }
    a = i.bind(null, e, a, t), i = void 0, !Xs || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (i = !0), 
    n ? i !== void 0 ? t.addEventListener(e, a, {
      capture: !0,
      passive: i
    }) : t.addEventListener(e, a, !0) : i !== void 0 ? t.addEventListener(e, a, {
      passive: i
    }) : t.addEventListener(e, a, !1);
  }
  function _u(t, e, a, n, i) {
    var l = n;
    if (!(e & 1) && !(e & 2) && n !== null) t: for (;;) {
      if (n === null) return;
      var c = n.tag;
      if (c === 3 || c === 4) {
        var f = n.stateNode.containerInfo;
        if (f === i || f.nodeType === 8 && f.parentNode === i) break;
        if (c === 4) for (c = n.return; c !== null; ) {
          var b = c.tag;
          if ((b === 3 || b === 4) && (b = c.stateNode.containerInfo, b === i || b.nodeType === 8 && b.parentNode === i)) return;
          c = c.return;
        }
        for (;f !== null; ) {
          if (c = Ga(f), c === null) return;
          if (b = c.tag, b === 5 || b === 6 || b === 26 || b === 27) {
            n = l = c;
            continue t;
          }
          f = f.parentNode;
        }
      }
      n = n.return;
    }
    qr((function() {
      var S = l, D = Qs(a), j = [];
      t: {
        var C = gc.get(t);
        if (C !== void 0) {
          var x = Tl, F = t;
          switch (t) {
           case "keypress":
            if (El(a) === 0) break t;

           case "keydown":
           case "keyup":
            x = Am;
            break;

           case "focusin":
            F = "focus", x = Js;
            break;

           case "focusout":
            F = "blur", x = Js;
            break;

           case "beforeblur":
           case "afterblur":
            x = Js;
            break;

           case "click":
            if (a.button === 2) break t;

           case "auxclick":
           case "dblclick":
           case "mousedown":
           case "mousemove":
           case "mouseup":
           case "mouseout":
           case "mouseover":
           case "contextmenu":
            x = Ir;
            break;

           case "drag":
           case "dragend":
           case "dragenter":
           case "dragexit":
           case "dragleave":
           case "dragover":
           case "dragstart":
           case "drop":
            x = um;
            break;

           case "touchcancel":
           case "touchend":
           case "touchmove":
           case "touchstart":
            x = Tm;
            break;

           case fc:
           case hc:
           case mc:
            x = dm;
            break;

           case yc:
            x = wm;
            break;

           case "scroll":
           case "scrollend":
            x = sm;
            break;

           case "wheel":
            x = Rm;
            break;

           case "copy":
           case "cut":
           case "paste":
            x = hm;
            break;

           case "gotpointercapture":
           case "lostpointercapture":
           case "pointercancel":
           case "pointerdown":
           case "pointermove":
           case "pointerout":
           case "pointerover":
           case "pointerup":
            x = Kr;
            break;

           case "toggle":
           case "beforetoggle":
            x = Bm;
          }
          var rt = (e & 4) !== 0, Lt = !rt && (t === "scroll" || t === "scrollend"), w = rt ? C !== null ? C + "Capture" : null : C;
          rt = [];
          for (var E = S, _; E !== null; ) {
            var L = E;
            if (_ = L.stateNode, L = L.tag, L !== 5 && L !== 26 && L !== 27 || _ === null || w === null || (L = oi(E, w), 
            L != null && rt.push(Vi(E, L, _))), Lt) break;
            E = E.return;
          }
          0 < rt.length && (C = new x(C, F, null, a, D), j.push({
            event: C,
            listeners: rt
          }));
        }
      }
      if (!(e & 7)) {
        t: {
          if (C = t === "mouseover" || t === "pointerover", x = t === "mouseout" || t === "pointerout", 
          C && a !== Vs && (F = a.relatedTarget || a.fromElement) && (Ga(F) || F[yn])) break t;
          if ((x || C) && (C = D.window === D ? D : (C = D.ownerDocument) ? C.defaultView || C.parentWindow : window, 
          x ? (F = a.relatedTarget || a.toElement, x = S, F = F ? Ga(F) : null, F !== null && (Lt = et(F), 
          rt = F.tag, F !== Lt || rt !== 5 && rt !== 27 && rt !== 6) && (F = null)) : (x = null, 
          F = S), x !== F)) {
            if (rt = Ir, L = "onMouseLeave", w = "onMouseEnter", E = "mouse", (t === "pointerout" || t === "pointerover") && (rt = Kr, 
            L = "onPointerLeave", w = "onPointerEnter", E = "pointer"), Lt = x == null ? C : si(x), 
            _ = F == null ? C : si(F), C = new rt(L, E + "leave", x, a, D), C.target = Lt, C.relatedTarget = _, 
            L = null, Ga(D) === S && (rt = new rt(w, E + "enter", F, a, D), rt.target = _, rt.relatedTarget = Lt, 
            L = rt), Lt = L, x && F) e: {
              for (rt = x, w = F, E = 0, _ = rt; _; _ = Xn(_)) E++;
              for (_ = 0, L = w; L; L = Xn(L)) _++;
              for (;0 < E - _; ) rt = Xn(rt), E--;
              for (;0 < _ - E; ) w = Xn(w), _--;
              for (;E--; ) {
                if (rt === w || w !== null && rt === w.alternate) break e;
                rt = Xn(rt), w = Xn(w);
              }
              rt = null;
            } else rt = null;
            x !== null && Bf(j, C, x, rt, !1), F !== null && Lt !== null && Bf(j, Lt, F, rt, !0);
          }
        }
        t: {
          if (C = S ? si(S) : window, x = C.nodeName && C.nodeName.toLowerCase(), x === "select" || x === "input" && C.type === "file") var Z = ec; else if ($r(C)) if (ac) Z = Um; else {
            Z = Hm;
            var ht = jm;
          } else x = C.nodeName, !x || x.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? S && qs(S.elementType) && (Z = ec) : Z = zm;
          if (Z && (Z = Z(t, S))) {
            tc(j, Z, a, D);
            break t;
          }
          ht && ht(t, C, S), t === "focusout" && S && C.type === "number" && S.memoizedProps.value != null && Ys(C, "number", C.value);
        }
        switch (ht = S ? si(S) : window, t) {
         case "focusin":
          ($r(ht) || ht.contentEditable === "true") && (On = ht, ao = S, yi = null);
          break;

         case "focusout":
          yi = ao = On = null;
          break;

         case "mousedown":
          no = !0;
          break;

         case "contextmenu":
         case "mouseup":
         case "dragend":
          no = !1, cc(j, a, D);
          break;

         case "selectionchange":
          if (qm) break;

         case "keydown":
         case "keyup":
          cc(j, a, D);
        }
        var $;
        if (Ps) t: {
          switch (t) {
           case "compositionstart":
            var lt = "onCompositionStart";
            break t;

           case "compositionend":
            lt = "onCompositionEnd";
            break t;

           case "compositionupdate":
            lt = "onCompositionUpdate";
            break t;
          }
          lt = void 0;
        } else Tn ? Fr(t, a) && (lt = "onCompositionEnd") : t === "keydown" && a.keyCode === 229 && (lt = "onCompositionStart");
        lt && (Zr && a.locale !== "ko" && (Tn || lt !== "onCompositionStart" ? lt === "onCompositionEnd" && Tn && ($ = Vr()) : (ya = D, 
        Ks = "value" in ya ? ya.value : ya.textContent, Tn = !0)), ht = os(S, lt), 0 < ht.length && (lt = new Xr(lt, t, null, a, D), 
        j.push({
          event: lt,
          listeners: ht
        }), $ ? lt.data = $ : ($ = Pr(a), $ !== null && (lt.data = $)))), ($ = xm ? Dm(t, a) : Mm(t, a)) && (lt = os(S, "onBeforeInput"), 
        0 < lt.length && (ht = new Xr("onBeforeInput", "beforeinput", null, a, D), j.push({
          event: ht,
          listeners: lt
        }), ht.data = $)), Oy(j, t, S, a, D);
      }
      Rf(j, e);
    }));
  }
  function Vi(t, e, a) {
    return {
      instance: t,
      listener: e,
      currentTarget: a
    };
  }
  function os(t, e) {
    for (var a = e + "Capture", n = []; t !== null; ) {
      var i = t, l = i.stateNode;
      i = i.tag, i !== 5 && i !== 26 && i !== 27 || l === null || (i = oi(t, a), i != null && n.unshift(Vi(t, i, l)), 
      i = oi(t, e), i != null && n.push(Vi(t, i, l))), t = t.return;
    }
    return n;
  }
  function Xn(t) {
    if (t === null) return null;
    do {
      t = t.return;
    } while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Bf(t, e, a, n, i) {
    for (var l = e._reactName, c = []; a !== null && a !== n; ) {
      var f = a, b = f.alternate, S = f.stateNode;
      if (f = f.tag, b !== null && b === n) break;
      f !== 5 && f !== 26 && f !== 27 || S === null || (b = S, i ? (S = oi(a, l), S != null && c.unshift(Vi(a, S, b))) : i || (S = oi(a, l), 
      S != null && c.push(Vi(a, S, b)))), a = a.return;
    }
    c.length !== 0 && t.push({
      event: e,
      listeners: c
    });
  }
  var Cy = /\r\n?/g, By = /\u0000|\uFFFD/g;
  function Nf(t) {
    return (typeof t == "string" ? t : "" + t).replace(Cy, `\n`).replace(By, "");
  }
  function xf(t, e) {
    return e = Nf(e), Nf(t) === e;
  }
  function us() {}
  function Tt(t, e, a, n, i, l) {
    switch (a) {
     case "children":
      typeof n == "string" ? e === "body" || e === "textarea" && n === "" || An(t, n) : (typeof n == "number" || typeof n == "bigint") && e !== "body" && An(t, "" + n);
      break;

     case "className":
      gl(t, "class", n);
      break;

     case "tabIndex":
      gl(t, "tabindex", n);
      break;

     case "dir":
     case "role":
     case "viewBox":
     case "width":
     case "height":
      gl(t, a, n);
      break;

     case "style":
      Gr(t, n, l);
      break;

     case "data":
      if (e !== "object") {
        gl(t, "data", n);
        break;
      }

     case "src":
     case "href":
      if (n === "" && (e !== "a" || a !== "href")) {
        t.removeAttribute(a);
        break;
      }
      if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
        t.removeAttribute(a);
        break;
      }
      n = vl("" + n), t.setAttribute(a, n);
      break;

     case "action":
     case "formAction":
      if (typeof n == "function") {
        t.setAttribute(a, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
        break;
      } else typeof l == "function" && (a === "formAction" ? (e !== "input" && Tt(t, e, "name", i.name, i, null), 
      Tt(t, e, "formEncType", i.formEncType, i, null), Tt(t, e, "formMethod", i.formMethod, i, null), 
      Tt(t, e, "formTarget", i.formTarget, i, null)) : (Tt(t, e, "encType", i.encType, i, null), 
      Tt(t, e, "method", i.method, i, null), Tt(t, e, "target", i.target, i, null)));
      if (n == null || typeof n == "symbol" || typeof n == "boolean") {
        t.removeAttribute(a);
        break;
      }
      n = vl("" + n), t.setAttribute(a, n);
      break;

     case "onClick":
      n != null && (t.onclick = us);
      break;

     case "onScroll":
      n != null && yt("scroll", t);
      break;

     case "onScrollEnd":
      n != null && yt("scrollend", t);
      break;

     case "dangerouslySetInnerHTML":
      if (n != null) {
        if (typeof n != "object" || !("__html" in n)) throw Error(u(61));
        if (a = n.__html, a != null) {
          if (i.children != null) throw Error(u(60));
          t.innerHTML = a;
        }
      }
      break;

     case "multiple":
      t.multiple = n && typeof n != "function" && typeof n != "symbol";
      break;

     case "muted":
      t.muted = n && typeof n != "function" && typeof n != "symbol";
      break;

     case "suppressContentEditableWarning":
     case "suppressHydrationWarning":
     case "defaultValue":
     case "defaultChecked":
     case "innerHTML":
     case "ref":
      break;

     case "autoFocus":
      break;

     case "xlinkHref":
      if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
        t.removeAttribute("xlink:href");
        break;
      }
      a = vl("" + n), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
      break;

     case "contentEditable":
     case "spellCheck":
     case "draggable":
     case "value":
     case "autoReverse":
     case "externalResourcesRequired":
     case "focusable":
     case "preserveAlpha":
      n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(a, "" + n) : t.removeAttribute(a);
      break;

     case "inert":
     case "allowFullScreen":
     case "async":
     case "autoPlay":
     case "controls":
     case "default":
     case "defer":
     case "disabled":
     case "disablePictureInPicture":
     case "disableRemotePlayback":
     case "formNoValidate":
     case "hidden":
     case "loop":
     case "noModule":
     case "noValidate":
     case "open":
     case "playsInline":
     case "readOnly":
     case "required":
     case "reversed":
     case "scoped":
     case "seamless":
     case "itemScope":
      n && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(a, "") : t.removeAttribute(a);
      break;

     case "capture":
     case "download":
      n === !0 ? t.setAttribute(a, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(a, n) : t.removeAttribute(a);
      break;

     case "cols":
     case "rows":
     case "size":
     case "span":
      n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? t.setAttribute(a, n) : t.removeAttribute(a);
      break;

     case "rowSpan":
     case "start":
      n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? t.removeAttribute(a) : t.setAttribute(a, n);
      break;

     case "popover":
      yt("beforetoggle", t), yt("toggle", t), yl(t, "popover", n);
      break;

     case "xlinkActuate":
      Je(t, "http://www.w3.org/1999/xlink", "xlink:actuate", n);
      break;

     case "xlinkArcrole":
      Je(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", n);
      break;

     case "xlinkRole":
      Je(t, "http://www.w3.org/1999/xlink", "xlink:role", n);
      break;

     case "xlinkShow":
      Je(t, "http://www.w3.org/1999/xlink", "xlink:show", n);
      break;

     case "xlinkTitle":
      Je(t, "http://www.w3.org/1999/xlink", "xlink:title", n);
      break;

     case "xlinkType":
      Je(t, "http://www.w3.org/1999/xlink", "xlink:type", n);
      break;

     case "xmlBase":
      Je(t, "http://www.w3.org/XML/1998/namespace", "xml:base", n);
      break;

     case "xmlLang":
      Je(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", n);
      break;

     case "xmlSpace":
      Je(t, "http://www.w3.org/XML/1998/namespace", "xml:space", n);
      break;

     case "is":
      yl(t, "is", n);
      break;

     case "innerText":
     case "textContent":
      break;

     default:
      (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = im.get(a) || a, 
      yl(t, a, n));
    }
  }
  function Ru(t, e, a, n, i, l) {
    switch (a) {
     case "style":
      Gr(t, n, l);
      break;

     case "dangerouslySetInnerHTML":
      if (n != null) {
        if (typeof n != "object" || !("__html" in n)) throw Error(u(61));
        if (a = n.__html, a != null) {
          if (i.children != null) throw Error(u(60));
          t.innerHTML = a;
        }
      }
      break;

     case "children":
      typeof n == "string" ? An(t, n) : (typeof n == "number" || typeof n == "bigint") && An(t, "" + n);
      break;

     case "onScroll":
      n != null && yt("scroll", t);
      break;

     case "onScrollEnd":
      n != null && yt("scrollend", t);
      break;

     case "onClick":
      n != null && (t.onclick = us);
      break;

     case "suppressContentEditableWarning":
     case "suppressHydrationWarning":
     case "innerHTML":
     case "ref":
      break;

     case "innerText":
     case "textContent":
      break;

     default:
      if (!xr.hasOwnProperty(a)) t: {
        if (a[0] === "o" && a[1] === "n" && (i = a.endsWith("Capture"), e = a.slice(2, i ? a.length - 7 : void 0), 
        l = t[ce] || null, l = l != null ? l[a] : null, typeof l == "function" && t.removeEventListener(e, l, i), 
        typeof n == "function")) {
          typeof l != "function" && l !== null && (a in t ? t[a] = null : t.hasAttribute(a) && t.removeAttribute(a)), 
          t.addEventListener(e, n, i);
          break t;
        }
        a in t ? t[a] = n : n === !0 ? t.setAttribute(a, "") : yl(t, a, n);
      }
    }
  }
  function Ft(t, e, a) {
    switch (e) {
     case "div":
     case "span":
     case "svg":
     case "path":
     case "a":
     case "g":
     case "p":
     case "li":
      break;

     case "img":
      yt("error", t), yt("load", t);
      var n = !1, i = !1, l;
      for (l in a) if (a.hasOwnProperty(l)) {
        var c = a[l];
        if (c != null) switch (l) {
         case "src":
          n = !0;
          break;

         case "srcSet":
          i = !0;
          break;

         case "children":
         case "dangerouslySetInnerHTML":
          throw Error(u(137, e));

         default:
          Tt(t, e, l, c, a, null);
        }
      }
      i && Tt(t, e, "srcSet", a.srcSet, a, null), n && Tt(t, e, "src", a.src, a, null);
      return;

     case "input":
      yt("invalid", t);
      var f = l = c = i = null, b = null, S = null;
      for (n in a) if (a.hasOwnProperty(n)) {
        var D = a[n];
        if (D != null) switch (n) {
         case "name":
          i = D;
          break;

         case "type":
          c = D;
          break;

         case "checked":
          b = D;
          break;

         case "defaultChecked":
          S = D;
          break;

         case "value":
          l = D;
          break;

         case "defaultValue":
          f = D;
          break;

         case "children":
         case "dangerouslySetInnerHTML":
          if (D != null) throw Error(u(137, e));
          break;

         default:
          Tt(t, e, n, D, a, null);
        }
      }
      jr(t, l, f, b, S, c, i, !1), bl(t);
      return;

     case "select":
      yt("invalid", t), n = c = l = null;
      for (i in a) if (a.hasOwnProperty(i) && (f = a[i], f != null)) switch (i) {
       case "value":
        l = f;
        break;

       case "defaultValue":
        c = f;
        break;

       case "multiple":
        n = f;

       default:
        Tt(t, e, i, f, a, null);
      }
      e = l, a = c, t.multiple = !!n, e != null ? vn(t, !!n, e, !1) : a != null && vn(t, !!n, a, !0);
      return;

     case "textarea":
      yt("invalid", t), l = i = n = null;
      for (c in a) if (a.hasOwnProperty(c) && (f = a[c], f != null)) switch (c) {
       case "value":
        n = f;
        break;

       case "defaultValue":
        i = f;
        break;

       case "children":
        l = f;
        break;

       case "dangerouslySetInnerHTML":
        if (f != null) throw Error(u(91));
        break;

       default:
        Tt(t, e, c, f, a, null);
      }
      zr(t, n, i, l), bl(t);
      return;

     case "option":
      for (b in a) if (a.hasOwnProperty(b) && (n = a[b], n != null)) switch (b) {
       case "selected":
        t.selected = n && typeof n != "function" && typeof n != "symbol";
        break;

       default:
        Tt(t, e, b, n, a, null);
      }
      return;

     case "dialog":
      yt("cancel", t), yt("close", t);
      break;

     case "iframe":
     case "object":
      yt("load", t);
      break;

     case "video":
     case "audio":
      for (n = 0; n < qi.length; n++) yt(qi[n], t);
      break;

     case "image":
      yt("error", t), yt("load", t);
      break;

     case "details":
      yt("toggle", t);
      break;

     case "embed":
     case "source":
     case "link":
      yt("error", t), yt("load", t);

     case "area":
     case "base":
     case "br":
     case "col":
     case "hr":
     case "keygen":
     case "meta":
     case "param":
     case "track":
     case "wbr":
     case "menuitem":
      for (S in a) if (a.hasOwnProperty(S) && (n = a[S], n != null)) switch (S) {
       case "children":
       case "dangerouslySetInnerHTML":
        throw Error(u(137, e));

       default:
        Tt(t, e, S, n, a, null);
      }
      return;

     default:
      if (qs(e)) {
        for (D in a) a.hasOwnProperty(D) && (n = a[D], n !== void 0 && Ru(t, e, D, n, a, void 0));
        return;
      }
    }
    for (f in a) a.hasOwnProperty(f) && (n = a[f], n != null && Tt(t, e, f, n, a, null));
  }
  function Ny(t, e, a, n) {
    switch (e) {
     case "div":
     case "span":
     case "svg":
     case "path":
     case "a":
     case "g":
     case "p":
     case "li":
      break;

     case "input":
      var i = null, l = null, c = null, f = null, b = null, S = null, D = null;
      for (x in a) {
        var j = a[x];
        if (a.hasOwnProperty(x) && j != null) switch (x) {
         case "checked":
          break;

         case "value":
          break;

         case "defaultValue":
          b = j;

         default:
          n.hasOwnProperty(x) || Tt(t, e, x, null, n, j);
        }
      }
      for (var C in n) {
        var x = n[C];
        if (j = a[C], n.hasOwnProperty(C) && (x != null || j != null)) switch (C) {
         case "type":
          l = x;
          break;

         case "name":
          i = x;
          break;

         case "checked":
          S = x;
          break;

         case "defaultChecked":
          D = x;
          break;

         case "value":
          c = x;
          break;

         case "defaultValue":
          f = x;
          break;

         case "children":
         case "dangerouslySetInnerHTML":
          if (x != null) throw Error(u(137, e));
          break;

         default:
          x !== j && Tt(t, e, C, x, n, j);
        }
      }
      Gs(t, c, f, b, S, D, l, i);
      return;

     case "select":
      x = c = f = C = null;
      for (l in a) if (b = a[l], a.hasOwnProperty(l) && b != null) switch (l) {
       case "value":
        break;

       case "multiple":
        x = b;

       default:
        n.hasOwnProperty(l) || Tt(t, e, l, null, n, b);
      }
      for (i in n) if (l = n[i], b = a[i], n.hasOwnProperty(i) && (l != null || b != null)) switch (i) {
       case "value":
        C = l;
        break;

       case "defaultValue":
        f = l;
        break;

       case "multiple":
        c = l;

       default:
        l !== b && Tt(t, e, i, l, n, b);
      }
      e = f, a = c, n = x, C != null ? vn(t, !!a, C, !1) : !!n != !!a && (e != null ? vn(t, !!a, e, !0) : vn(t, !!a, a ? [] : "", !1));
      return;

     case "textarea":
      x = C = null;
      for (f in a) if (i = a[f], a.hasOwnProperty(f) && i != null && !n.hasOwnProperty(f)) switch (f) {
       case "value":
        break;

       case "children":
        break;

       default:
        Tt(t, e, f, null, n, i);
      }
      for (c in n) if (i = n[c], l = a[c], n.hasOwnProperty(c) && (i != null || l != null)) switch (c) {
       case "value":
        C = i;
        break;

       case "defaultValue":
        x = i;
        break;

       case "children":
        break;

       case "dangerouslySetInnerHTML":
        if (i != null) throw Error(u(91));
        break;

       default:
        i !== l && Tt(t, e, c, i, n, l);
      }
      Hr(t, C, x);
      return;

     case "option":
      for (var F in a) if (C = a[F], a.hasOwnProperty(F) && C != null && !n.hasOwnProperty(F)) switch (F) {
       case "selected":
        t.selected = !1;
        break;

       default:
        Tt(t, e, F, null, n, C);
      }
      for (b in n) if (C = n[b], x = a[b], n.hasOwnProperty(b) && C !== x && (C != null || x != null)) switch (b) {
       case "selected":
        t.selected = C && typeof C != "function" && typeof C != "symbol";
        break;

       default:
        Tt(t, e, b, C, n, x);
      }
      return;

     case "img":
     case "link":
     case "area":
     case "base":
     case "br":
     case "col":
     case "embed":
     case "hr":
     case "keygen":
     case "meta":
     case "param":
     case "source":
     case "track":
     case "wbr":
     case "menuitem":
      for (var rt in a) C = a[rt], a.hasOwnProperty(rt) && C != null && !n.hasOwnProperty(rt) && Tt(t, e, rt, null, n, C);
      for (S in n) if (C = n[S], x = a[S], n.hasOwnProperty(S) && C !== x && (C != null || x != null)) switch (S) {
       case "children":
       case "dangerouslySetInnerHTML":
        if (C != null) throw Error(u(137, e));
        break;

       default:
        Tt(t, e, S, C, n, x);
      }
      return;

     default:
      if (qs(e)) {
        for (var Lt in a) C = a[Lt], a.hasOwnProperty(Lt) && C !== void 0 && !n.hasOwnProperty(Lt) && Ru(t, e, Lt, void 0, n, C);
        for (D in n) C = n[D], x = a[D], !n.hasOwnProperty(D) || C === x || C === void 0 && x === void 0 || Ru(t, e, D, C, n, x);
        return;
      }
    }
    for (var w in a) C = a[w], a.hasOwnProperty(w) && C != null && !n.hasOwnProperty(w) && Tt(t, e, w, null, n, C);
    for (j in n) C = n[j], x = a[j], !n.hasOwnProperty(j) || C === x || C == null && x == null || Tt(t, e, j, C, n, x);
  }
  var Cu = null, Bu = null;
  function rs(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Df(t) {
    switch (t) {
     case "http://www.w3.org/2000/svg":
      return 1;

     case "http://www.w3.org/1998/Math/MathML":
      return 2;

     default:
      return 0;
    }
  }
  function Mf(t, e) {
    if (t === 0) switch (e) {
     case "svg":
      return 1;

     case "math":
      return 2;

     default:
      return 0;
    }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function Nu(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var xu = null;
  function xy() {
    var t = window.event;
    return t && t.type === "popstate" ? t === xu ? !1 : (xu = t, !0) : (xu = null, !1);
  }
  var kf = typeof setTimeout == "function" ? setTimeout : void 0, Dy = typeof clearTimeout == "function" ? clearTimeout : void 0, Lf = typeof Promise == "function" ? Promise : void 0, My = typeof queueMicrotask == "function" ? queueMicrotask : typeof Lf < "u" ? function(t) {
    return Lf.resolve(null).then(t).catch(ky);
  } : kf;
  function ky(t) {
    setTimeout((function() {
      throw t;
    }));
  }
  function Du(t, e) {
    var a = e, n = 0;
    do {
      var i = a.nextSibling;
      if (t.removeChild(a), i && i.nodeType === 8) if (a = i.data, a === "/$") {
        if (n === 0) {
          t.removeChild(i), Fi(e);
          return;
        }
        n--;
      } else a !== "$" && a !== "$?" && a !== "$!" || n++;
      a = i;
    } while (a);
    Fi(e);
  }
  function Mu(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var a = e;
      switch (e = e.nextSibling, a.nodeName) {
       case "HTML":
       case "HEAD":
       case "BODY":
        Mu(a), Us(a);
        continue;

       case "SCRIPT":
       case "STYLE":
        continue;

       case "LINK":
        if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(a);
    }
  }
  function Ly(t, e, a, n) {
    for (;t.nodeType === 1; ) {
      var i = a;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (n) {
        if (!t[li]) switch (e) {
         case "meta":
          if (!t.hasAttribute("itemprop")) break;
          return t;

         case "link":
          if (l = t.getAttribute("rel"), l === "stylesheet" && t.hasAttribute("data-precedence")) break;
          if (l !== i.rel || t.getAttribute("href") !== (i.href == null ? null : i.href) || t.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || t.getAttribute("title") !== (i.title == null ? null : i.title)) break;
          return t;

         case "style":
          if (t.hasAttribute("data-precedence")) break;
          return t;

         case "script":
          if (l = t.getAttribute("src"), (l !== (i.src == null ? null : i.src) || t.getAttribute("type") !== (i.type == null ? null : i.type) || t.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && l && t.hasAttribute("async") && !t.hasAttribute("itemprop")) break;
          return t;

         default:
          return t;
        }
      } else if (e === "input" && t.type === "hidden") {
        var l = i.name == null ? null : "" + i.name;
        if (i.type === "hidden" && t.getAttribute("name") === l) return t;
      } else return t;
      if (t = Ge(t.nextSibling), t === null) break;
    }
    return null;
  }
  function jy(t, e, a) {
    if (e === "") return null;
    for (;t.nodeType !== 3; ) if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a || (t = Ge(t.nextSibling), 
    t === null)) return null;
    return t;
  }
  function Ge(t) {
    for (;t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "F!" || e === "F") break;
        if (e === "/$") return null;
      }
    }
    return t;
  }
  function jf(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "$" || a === "$!" || a === "$?") {
          if (e === 0) return t;
          e--;
        } else a === "/$" && e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Hf(t, e, a) {
    switch (e = rs(a), t) {
     case "html":
      if (t = e.documentElement, !t) throw Error(u(452));
      return t;

     case "head":
      if (t = e.head, !t) throw Error(u(453));
      return t;

     case "body":
      if (t = e.body, !t) throw Error(u(454));
      return t;

     default:
      throw Error(u(451));
    }
  }
  var ke = new Map, zf = new Set;
  function cs(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.ownerDocument;
  }
  var da = M.d;
  M.d = {
    f: Hy,
    r: zy,
    D: Uy,
    C: Gy,
    L: Yy,
    m: qy,
    X: Qy,
    S: Vy,
    M: Iy
  };
  function Hy() {
    var t = da.f(), e = as();
    return t || e;
  }
  function zy(t) {
    var e = gn(t);
    e !== null && e.tag === 5 && e.type === "form" ? cd(e) : da.r(t);
  }
  var Kn = typeof document > "u" ? null : document;
  function Uf(t, e, a) {
    var n = Kn;
    if (n && typeof e == "string" && e) {
      var i = Oe(e);
      i = 'link[rel="' + t + '"][href="' + i + '"]', typeof a == "string" && (i += '[crossorigin="' + a + '"]'), 
      zf.has(i) || (zf.add(i), t = {
        rel: t,
        crossOrigin: a,
        href: e
      }, n.querySelector(i) === null && (e = n.createElement("link"), Ft(e, "link", t), 
      Qt(e), n.head.appendChild(e)));
    }
  }
  function Uy(t) {
    da.D(t), Uf("dns-prefetch", t, null);
  }
  function Gy(t, e) {
    da.C(t, e), Uf("preconnect", t, e);
  }
  function Yy(t, e, a) {
    da.L(t, e, a);
    var n = Kn;
    if (n && t && e) {
      var i = 'link[rel="preload"][as="' + Oe(e) + '"]';
      e === "image" && a && a.imageSrcSet ? (i += '[imagesrcset="' + Oe(a.imageSrcSet) + '"]', 
      typeof a.imageSizes == "string" && (i += '[imagesizes="' + Oe(a.imageSizes) + '"]')) : i += '[href="' + Oe(t) + '"]';
      var l = i;
      switch (e) {
       case "style":
        l = Zn(t);
        break;

       case "script":
        l = Wn(t);
      }
      ke.has(l) || (t = V({
        rel: "preload",
        href: e === "image" && a && a.imageSrcSet ? void 0 : t,
        as: e
      }, a), ke.set(l, t), n.querySelector(i) !== null || e === "style" && n.querySelector(Qi(l)) || e === "script" && n.querySelector(Ii(l)) || (e = n.createElement("link"), 
      Ft(e, "link", t), Qt(e), n.head.appendChild(e)));
    }
  }
  function qy(t, e) {
    da.m(t, e);
    var a = Kn;
    if (a && t) {
      var n = e && typeof e.as == "string" ? e.as : "script", i = 'link[rel="modulepreload"][as="' + Oe(n) + '"][href="' + Oe(t) + '"]', l = i;
      switch (n) {
       case "audioworklet":
       case "paintworklet":
       case "serviceworker":
       case "sharedworker":
       case "worker":
       case "script":
        l = Wn(t);
      }
      if (!ke.has(l) && (t = V({
        rel: "modulepreload",
        href: t
      }, e), ke.set(l, t), a.querySelector(i) === null)) {
        switch (n) {
         case "audioworklet":
         case "paintworklet":
         case "serviceworker":
         case "sharedworker":
         case "worker":
         case "script":
          if (a.querySelector(Ii(l))) return;
        }
        n = a.createElement("link"), Ft(n, "link", t), Qt(n), a.head.appendChild(n);
      }
    }
  }
  function Vy(t, e, a) {
    da.S(t, e, a);
    var n = Kn;
    if (n && t) {
      var i = bn(n).hoistableStyles, l = Zn(t);
      e = e || "default";
      var c = i.get(l);
      if (!c) {
        var f = {
          loading: 0,
          preload: null
        };
        if (c = n.querySelector(Qi(l))) f.loading = 5; else {
          t = V({
            rel: "stylesheet",
            href: t,
            "data-precedence": e
          }, a), (a = ke.get(l)) && ku(t, a);
          var b = c = n.createElement("link");
          Qt(b), Ft(b, "link", t), b._p = new Promise((function(S, D) {
            b.onload = S, b.onerror = D;
          })), b.addEventListener("load", (function() {
            f.loading |= 1;
          })), b.addEventListener("error", (function() {
            f.loading |= 2;
          })), f.loading |= 4, ds(c, e, n);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: f
        }, i.set(l, c);
      }
    }
  }
  function Qy(t, e) {
    da.X(t, e);
    var a = Kn;
    if (a && t) {
      var n = bn(a).hoistableScripts, i = Wn(t), l = n.get(i);
      l || (l = a.querySelector(Ii(i)), l || (t = V({
        src: t,
        async: !0
      }, e), (e = ke.get(i)) && Lu(t, e), l = a.createElement("script"), Qt(l), Ft(l, "link", t), 
      a.head.appendChild(l)), l = {
        type: "script",
        instance: l,
        count: 1,
        state: null
      }, n.set(i, l));
    }
  }
  function Iy(t, e) {
    da.M(t, e);
    var a = Kn;
    if (a && t) {
      var n = bn(a).hoistableScripts, i = Wn(t), l = n.get(i);
      l || (l = a.querySelector(Ii(i)), l || (t = V({
        src: t,
        async: !0,
        type: "module"
      }, e), (e = ke.get(i)) && Lu(t, e), l = a.createElement("script"), Qt(l), Ft(l, "link", t), 
      a.head.appendChild(l)), l = {
        type: "script",
        instance: l,
        count: 1,
        state: null
      }, n.set(i, l));
    }
  }
  function Gf(t, e, a, n) {
    var i = (i = fa.current) ? cs(i) : null;
    if (!i) throw Error(u(446));
    switch (t) {
     case "meta":
     case "title":
      return null;

     case "style":
      return typeof a.precedence == "string" && typeof a.href == "string" ? (e = Zn(a.href), 
      a = bn(i).hoistableStyles, n = a.get(e), n || (n = {
        type: "style",
        instance: null,
        count: 0,
        state: null
      }, a.set(e, n)), n) : {
        type: "void",
        instance: null,
        count: 0,
        state: null
      };

     case "link":
      if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
        t = Zn(a.href);
        var l = bn(i).hoistableStyles, c = l.get(t);
        if (c || (i = i.ownerDocument || i, c = {
          type: "stylesheet",
          instance: null,
          count: 0,
          state: {
            loading: 0,
            preload: null
          }
        }, l.set(t, c), (l = i.querySelector(Qi(t))) && !l._p && (c.instance = l, c.state.loading = 5), 
        ke.has(t) || (a = {
          rel: "preload",
          as: "style",
          href: a.href,
          crossOrigin: a.crossOrigin,
          integrity: a.integrity,
          media: a.media,
          hrefLang: a.hrefLang,
          referrerPolicy: a.referrerPolicy
        }, ke.set(t, a), l || Xy(i, t, a, c.state))), e && n === null) throw Error(u(528, ""));
        return c;
      }
      if (e && n !== null) throw Error(u(529, ""));
      return null;

     case "script":
      return e = a.async, a = a.src, typeof a == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = Wn(a), 
      a = bn(i).hoistableScripts, n = a.get(e), n || (n = {
        type: "script",
        instance: null,
        count: 0,
        state: null
      }, a.set(e, n)), n) : {
        type: "void",
        instance: null,
        count: 0,
        state: null
      };

     default:
      throw Error(u(444, t));
    }
  }
  function Zn(t) {
    return 'href="' + Oe(t) + '"';
  }
  function Qi(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Yf(t) {
    return V({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Xy(t, e, a, n) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? n.loading = 1 : (e = t.createElement("link"), 
    n.preload = e, e.addEventListener("load", (function() {
      return n.loading |= 1;
    })), e.addEventListener("error", (function() {
      return n.loading |= 2;
    })), Ft(e, "link", a), Qt(e), t.head.appendChild(e));
  }
  function Wn(t) {
    return '[src="' + Oe(t) + '"]';
  }
  function Ii(t) {
    return "script[async]" + t;
  }
  function qf(t, e, a) {
    if (e.count++, e.instance === null) switch (e.type) {
     case "style":
      var n = t.querySelector('style[data-href~="' + Oe(a.href) + '"]');
      if (n) return e.instance = n, Qt(n), n;
      var i = V({}, a, {
        "data-href": a.href,
        "data-precedence": a.precedence,
        href: null,
        precedence: null
      });
      return n = (t.ownerDocument || t).createElement("style"), Qt(n), Ft(n, "style", i), 
      ds(n, a.precedence, t), e.instance = n;

     case "stylesheet":
      i = Zn(a.href);
      var l = t.querySelector(Qi(i));
      if (l) return e.state.loading |= 4, e.instance = l, Qt(l), l;
      n = Yf(a), (i = ke.get(i)) && ku(n, i), l = (t.ownerDocument || t).createElement("link"), 
      Qt(l);
      var c = l;
      return c._p = new Promise((function(f, b) {
        c.onload = f, c.onerror = b;
      })), Ft(l, "link", n), e.state.loading |= 4, ds(l, a.precedence, t), e.instance = l;

     case "script":
      return l = Wn(a.src), (i = t.querySelector(Ii(l))) ? (e.instance = i, Qt(i), i) : (n = a, 
      (i = ke.get(l)) && (n = V({}, a), Lu(n, i)), t = t.ownerDocument || t, i = t.createElement("script"), 
      Qt(i), Ft(i, "link", n), t.head.appendChild(i), e.instance = i);

     case "void":
      return null;

     default:
      throw Error(u(443, e.type));
    } else e.type === "stylesheet" && !(e.state.loading & 4) && (n = e.instance, e.state.loading |= 4, 
    ds(n, a.precedence, t));
    return e.instance;
  }
  function ds(t, e, a) {
    for (var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), i = n.length ? n[n.length - 1] : null, l = i, c = 0; c < n.length; c++) {
      var f = n[c];
      if (f.dataset.precedence === e) l = f; else if (l !== i) break;
    }
    l ? l.parentNode.insertBefore(t, l.nextSibling) : (e = a.nodeType === 9 ? a.head : a, 
    e.insertBefore(t, e.firstChild));
  }
  function ku(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), 
    t.title == null && (t.title = e.title);
  }
  function Lu(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), 
    t.integrity == null && (t.integrity = e.integrity);
  }
  var fs = null;
  function Vf(t, e, a) {
    if (fs === null) {
      var n = new Map, i = fs = new Map;
      i.set(a, n);
    } else i = fs, n = i.get(a), n || (n = new Map, i.set(a, n));
    if (n.has(t)) return n;
    for (n.set(t, null), a = a.getElementsByTagName(t), i = 0; i < a.length; i++) {
      var l = a[i];
      if (!(l[li] || l[ee] || t === "link" && l.getAttribute("rel") === "stylesheet") && l.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = l.getAttribute(e) || "";
        c = t + c;
        var f = n.get(c);
        f ? f.push(l) : n.set(c, [ l ]);
      }
    }
    return n;
  }
  function Qf(t, e, a) {
    t = t.ownerDocument || t, t.head.insertBefore(a, e === "title" ? t.querySelector("head > title") : null);
  }
  function Ky(t, e, a) {
    if (a === 1 || e.itemProp != null) return !1;
    switch (t) {
     case "meta":
     case "title":
      return !0;

     case "style":
      if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "") break;
      return !0;

     case "link":
      if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError) break;
      switch (e.rel) {
       case "stylesheet":
        return t = e.disabled, typeof e.precedence == "string" && t == null;

       default:
        return !0;
      }

     case "script":
      if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string") return !0;
    }
    return !1;
  }
  function If(t) {
    return !(t.type === "stylesheet" && !(t.state.loading & 3));
  }
  var Xi = null;
  function Zy() {}
  function Wy(t, e, a) {
    if (Xi === null) throw Error(u(475));
    var n = Xi;
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && !(e.state.loading & 4)) {
      if (e.instance === null) {
        var i = Zn(a.href), l = t.querySelector(Qi(i));
        if (l) {
          t = l._p, t !== null && typeof t == "object" && typeof t.then == "function" && (n.count++, 
          n = hs.bind(n), t.then(n, n)), e.state.loading |= 4, e.instance = l, Qt(l);
          return;
        }
        l = t.ownerDocument || t, a = Yf(a), (i = ke.get(i)) && ku(a, i), l = l.createElement("link"), 
        Qt(l);
        var c = l;
        c._p = new Promise((function(f, b) {
          c.onload = f, c.onerror = b;
        })), Ft(l, "link", a), e.instance = l;
      }
      n.stylesheets === null && (n.stylesheets = new Map), n.stylesheets.set(e, t), (t = e.state.preload) && !(e.state.loading & 3) && (n.count++, 
      e = hs.bind(n), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  function Jy() {
    if (Xi === null) throw Error(u(475));
    var t = Xi;
    return t.stylesheets && t.count === 0 && ju(t, t.stylesheets), 0 < t.count ? function(e) {
      var a = setTimeout((function() {
        if (t.stylesheets && ju(t, t.stylesheets), t.unsuspend) {
          var n = t.unsuspend;
          t.unsuspend = null, n();
        }
      }), 6e4);
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a);
      };
    } : null;
  }
  function hs() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) ju(this, this.stylesheets); else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var ms = null;
  function ju(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, ms = new Map, e.forEach(Fy, t), 
    ms = null, hs.call(t));
  }
  function Fy(t, e) {
    if (!(e.state.loading & 4)) {
      var a = ms.get(t);
      if (a) var n = a.get(null); else {
        a = new Map, ms.set(t, a);
        for (var i = t.querySelectorAll("link[data-precedence],style[data-precedence]"), l = 0; l < i.length; l++) {
          var c = i[l];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (a.set(c.dataset.precedence, c), 
          n = c);
        }
        n && a.set(null, n);
      }
      i = e.instance, c = i.getAttribute("data-precedence"), l = a.get(c) || n, l === n && a.set(null, i), 
      a.set(c, i), this.count++, n = hs.bind(this), i.addEventListener("load", n), i.addEventListener("error", n), 
      l ? l.parentNode.insertBefore(i, l.nextSibling) : (t = t.nodeType === 9 ? t.head : t, 
      t.insertBefore(i, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Ki = {
    $$typeof: W,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function Py(t, e, a, n, i, l, c, f) {
    this.tag = 1, this.containerInfo = t, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, 
    this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, 
    this.callbackPriority = 0, this.expirationTimes = Hs(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.finishedLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, 
    this.entanglements = Hs(0), this.hiddenUpdates = Hs(null), this.identifierPrefix = n, 
    this.onUncaughtError = i, this.onCaughtError = l, this.onRecoverableError = c, this.pooledCache = null, 
    this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = new Map;
  }
  function Xf(t, e, a, n, i, l, c, f, b, S, D, j) {
    return t = new Py(t, e, a, c, f, b, S, j), e = 1, l === !0 && (e |= 24), l = De(3, null, null, e), 
    t.current = l, l.stateNode = t, e = mo(), e.refCount++, t.pooledCache = e, e.refCount++, 
    l.memoizedState = {
      element: n,
      isDehydrated: a,
      cache: e
    }, Zo(l), t;
  }
  function Kf(t) {
    return t ? (t = Rn, t) : Rn;
  }
  function Zf(t, e, a, n, i, l) {
    i = Kf(i), n.context === null ? n.context = i : n.pendingContext = i, n = Ta(e), 
    n.payload = {
      element: a
    }, l = l === void 0 ? null : l, l !== null && (n.callback = l), a = Oa(t, n, e), 
    a !== null && (se(a, t, e), Ni(a, t, e));
  }
  function Wf(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < e ? a : e;
    }
  }
  function Hu(t, e) {
    Wf(t, e), (t = t.alternate) && Wf(t, e);
  }
  function Jf(t) {
    if (t.tag === 13) {
      var e = ga(t, 67108864);
      e !== null && se(e, t, 67108864), Hu(t, 67108864);
    }
  }
  var ys = !0;
  function $y(t, e, a, n) {
    var i = q.T;
    q.T = null;
    var l = M.p;
    try {
      M.p = 2, zu(t, e, a, n);
    } finally {
      M.p = l, q.T = i;
    }
  }
  function tg(t, e, a, n) {
    var i = q.T;
    q.T = null;
    var l = M.p;
    try {
      M.p = 8, zu(t, e, a, n);
    } finally {
      M.p = l, q.T = i;
    }
  }
  function zu(t, e, a, n) {
    if (ys) {
      var i = Uu(n);
      if (i === null) _u(t, e, n, gs, a), Pf(t, n); else if (ag(i, t, e, a, n)) n.stopPropagation(); else if (Pf(t, n), 
      e & 4 && -1 < eg.indexOf(t)) {
        for (;i !== null; ) {
          var l = gn(i);
          if (l !== null) switch (l.tag) {
           case 3:
            if (l = l.stateNode, l.current.memoizedState.isDehydrated) {
              var c = Ua(l.pendingLanes);
              if (c !== 0) {
                var f = l;
                for (f.pendingLanes |= 2, f.entangledLanes |= 2; c; ) {
                  var b = 1 << 31 - me(c);
                  f.entanglements[1] |= b, c &= ~b;
                }
                Ze(l), !(xt & 6) && ($l = Ve() + 500, Yi(0));
              }
            }
            break;

           case 13:
            f = ga(l, 2), f !== null && se(f, l, 2), as(), Hu(l, 2);
          }
          if (l = Uu(n), l === null && _u(t, e, n, gs, a), l === i) break;
          i = l;
        }
        i !== null && n.stopPropagation();
      } else _u(t, e, n, null, a);
    }
  }
  function Uu(t) {
    return t = Qs(t), Gu(t);
  }
  var gs = null;
  function Gu(t) {
    if (gs = null, t = Ga(t), t !== null) {
      var e = et(t);
      if (e === null) t = null; else {
        var a = e.tag;
        if (a === 13) {
          if (t = At(e), t !== null) return t;
          t = null;
        } else if (a === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated) return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return gs = t, null;
  }
  function Ff(t) {
    switch (t) {
     case "beforetoggle":
     case "cancel":
     case "click":
     case "close":
     case "contextmenu":
     case "copy":
     case "cut":
     case "auxclick":
     case "dblclick":
     case "dragend":
     case "dragstart":
     case "drop":
     case "focusin":
     case "focusout":
     case "input":
     case "invalid":
     case "keydown":
     case "keypress":
     case "keyup":
     case "mousedown":
     case "mouseup":
     case "paste":
     case "pause":
     case "play":
     case "pointercancel":
     case "pointerdown":
     case "pointerup":
     case "ratechange":
     case "reset":
     case "resize":
     case "seeked":
     case "submit":
     case "toggle":
     case "touchcancel":
     case "touchend":
     case "touchstart":
     case "volumechange":
     case "change":
     case "selectionchange":
     case "textInput":
     case "compositionstart":
     case "compositionend":
     case "compositionupdate":
     case "beforeblur":
     case "afterblur":
     case "beforeinput":
     case "blur":
     case "fullscreenchange":
     case "focus":
     case "hashchange":
     case "popstate":
     case "select":
     case "selectstart":
      return 2;

     case "drag":
     case "dragenter":
     case "dragexit":
     case "dragleave":
     case "dragover":
     case "mousemove":
     case "mouseout":
     case "mouseover":
     case "pointermove":
     case "pointerout":
     case "pointerover":
     case "scroll":
     case "touchmove":
     case "wheel":
     case "mouseenter":
     case "mouseleave":
     case "pointerenter":
     case "pointerleave":
      return 8;

     case "message":
      switch (Gh()) {
       case Ar:
        return 2;

       case Er:
        return 8;

       case dl:
       case Yh:
        return 32;

       case Sr:
        return 268435456;

       default:
        return 32;
      }

     default:
      return 32;
    }
  }
  var Yu = !1, xa = null, Da = null, Ma = null, Zi = new Map, Wi = new Map, ka = [], eg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function Pf(t, e) {
    switch (t) {
     case "focusin":
     case "focusout":
      xa = null;
      break;

     case "dragenter":
     case "dragleave":
      Da = null;
      break;

     case "mouseover":
     case "mouseout":
      Ma = null;
      break;

     case "pointerover":
     case "pointerout":
      Zi.delete(e.pointerId);
      break;

     case "gotpointercapture":
     case "lostpointercapture":
      Wi.delete(e.pointerId);
    }
  }
  function Ji(t, e, a, n, i, l) {
    return t === null || t.nativeEvent !== l ? (t = {
      blockedOn: e,
      domEventName: a,
      eventSystemFlags: n,
      nativeEvent: l,
      targetContainers: [ i ]
    }, e !== null && (e = gn(e), e !== null && Jf(e)), t) : (t.eventSystemFlags |= n, 
    e = t.targetContainers, i !== null && e.indexOf(i) === -1 && e.push(i), t);
  }
  function ag(t, e, a, n, i) {
    switch (e) {
     case "focusin":
      return xa = Ji(xa, t, e, a, n, i), !0;

     case "dragenter":
      return Da = Ji(Da, t, e, a, n, i), !0;

     case "mouseover":
      return Ma = Ji(Ma, t, e, a, n, i), !0;

     case "pointerover":
      var l = i.pointerId;
      return Zi.set(l, Ji(Zi.get(l) || null, t, e, a, n, i)), !0;

     case "gotpointercapture":
      return l = i.pointerId, Wi.set(l, Ji(Wi.get(l) || null, t, e, a, n, i)), !0;
    }
    return !1;
  }
  function $f(t) {
    var e = Ga(t.target);
    if (e !== null) {
      var a = et(e);
      if (a !== null) {
        if (e = a.tag, e === 13) {
          if (e = At(a), e !== null) {
            t.blockedOn = e, Jh(t.priority, (function() {
              if (a.tag === 13) {
                var n = ve(), i = ga(a, n);
                i !== null && se(i, a, n), Hu(a, n);
              }
            }));
            return;
          }
        } else if (e === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function bs(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var a = Uu(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var n = new a.constructor(a.type, a);
        Vs = n, a.target.dispatchEvent(n), Vs = null;
      } else return e = gn(a), e !== null && Jf(e), t.blockedOn = a, !1;
      e.shift();
    }
    return !0;
  }
  function th(t, e, a) {
    bs(t) && a.delete(e);
  }
  function ng() {
    Yu = !1, xa !== null && bs(xa) && (xa = null), Da !== null && bs(Da) && (Da = null), 
    Ma !== null && bs(Ma) && (Ma = null), Zi.forEach(th), Wi.forEach(th);
  }
  function ps(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Yu || (Yu = !0, o.unstable_scheduleCallback(o.unstable_NormalPriority, ng)));
  }
  var vs = null;
  function eh(t) {
    vs !== t && (vs = t, o.unstable_scheduleCallback(o.unstable_NormalPriority, (function() {
      vs === t && (vs = null);
      for (var e = 0; e < t.length; e += 3) {
        var a = t[e], n = t[e + 1], i = t[e + 2];
        if (typeof n != "function") {
          if (Gu(n || a) === null) continue;
          break;
        }
        var l = gn(a);
        l !== null && (t.splice(e, 3), e -= 3, No(l, {
          pending: !0,
          data: i,
          method: a.method,
          action: n
        }, n, i));
      }
    })));
  }
  function Fi(t) {
    function e(b) {
      return ps(b, t);
    }
    xa !== null && ps(xa, t), Da !== null && ps(Da, t), Ma !== null && ps(Ma, t), Zi.forEach(e), 
    Wi.forEach(e);
    for (var a = 0; a < ka.length; a++) {
      var n = ka[a];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (;0 < ka.length && (a = ka[0], a.blockedOn === null); ) $f(a), a.blockedOn === null && ka.shift();
    if (a = (t.ownerDocument || t).$$reactFormReplay, a != null) for (n = 0; n < a.length; n += 3) {
      var i = a[n], l = a[n + 1], c = i[ce] || null;
      if (typeof l == "function") c || eh(a); else if (c) {
        var f = null;
        if (l && l.hasAttribute("formAction")) {
          if (i = l, c = l[ce] || null) f = c.formAction; else if (Gu(i) !== null) continue;
        } else f = c.action;
        typeof f == "function" ? a[n + 1] = f : (a.splice(n, 3), n -= 3), eh(a);
      }
    }
  }
  function qu(t) {
    this._internalRoot = t;
  }
  As.prototype.render = qu.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(u(409));
    var a = e.current, n = ve();
    Zf(a, n, t, e, null, null);
  }, As.prototype.unmount = qu.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      t.tag === 0 && Qn(), Zf(t.current, 2, null, t, null, null), as(), e[yn] = null;
    }
  };
  function As(t) {
    this._internalRoot = t;
  }
  As.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Cr();
      t = {
        blockedOn: null,
        target: t,
        priority: e
      };
      for (var a = 0; a < ka.length && e !== 0 && e < ka[a].priority; a++) ;
      ka.splice(a, 0, t), a === 0 && $f(t);
    }
  };
  var ah = s.version;
  if (ah !== "19.0.0") throw Error(u(527, ah, "19.0.0"));
  M.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0) throw typeof t.render == "function" ? Error(u(188)) : (t = Object.keys(t).join(","), 
    Error(u(268, t)));
    return t = U(e), t = t !== null ? at(t) : null, t = t === null ? null : t.stateNode, 
    t;
  };
  var ig = {
    bundleType: 0,
    version: "19.0.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: q,
    findFiberByHostInstance: Ga,
    reconcilerVersion: "19.0.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Es = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Es.isDisabled && Es.supportsFiber) try {
      ai = Es.inject(ig), he = Es;
    } catch {}
  }
  return $i.createRoot = function(t, e) {
    if (!m(t)) throw Error(u(299));
    var a = !1, n = "", i = pd, l = vd, c = Ad, f = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), 
    e.onUncaughtError !== void 0 && (i = e.onUncaughtError), e.onCaughtError !== void 0 && (l = e.onCaughtError), 
    e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.unstable_transitionCallbacks !== void 0 && (f = e.unstable_transitionCallbacks)), 
    e = Xf(t, 1, !1, null, null, a, n, i, l, c, f, null), t[yn] = e.current, wu(t.nodeType === 8 ? t.parentNode : t), 
    new qu(e);
  }, $i.hydrateRoot = function(t, e, a) {
    if (!m(t)) throw Error(u(299));
    var n = !1, i = "", l = pd, c = vd, f = Ad, b = null, S = null;
    return a != null && (a.unstable_strictMode === !0 && (n = !0), a.identifierPrefix !== void 0 && (i = a.identifierPrefix), 
    a.onUncaughtError !== void 0 && (l = a.onUncaughtError), a.onCaughtError !== void 0 && (c = a.onCaughtError), 
    a.onRecoverableError !== void 0 && (f = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (b = a.unstable_transitionCallbacks), 
    a.formState !== void 0 && (S = a.formState)), e = Xf(t, 1, !0, e, a ?? null, n, i, l, c, f, b, S), 
    e.context = Kf(null), a = e.current, n = ve(), i = Ta(n), i.callback = null, Oa(a, i, n), 
    e.current.lanes = n, ii(e, n), Ze(e), t[yn] = e.current, wu(t), new As(e);
  }, $i.version = "19.0.0", $i;
}

var fh;

function yg() {
  if (fh) return Iu.exports;
  fh = 1;
  function o() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
    } catch (s) {
      console.error(s);
    }
  }
  return o(), Iu.exports = mg(), Iu.exports;
}

var gg = yg();

const bg = "_global_1momg_1", pg = "_scrollable_1momg_13", vg = "_chatScrollable_1momg_23", Ag = "_header_1momg_116", Eg = "_Sheet_1momg_121", Sg = "_fieldFullWidth_1momg_128", Tg = "_fieldRow_1momg_132", Og = "_fieldRowNoSpread_1momg_138", wg = "_fieldColumn_1momg_144", _g = "_fieldFullColumn_1momg_150", Rg = "_fieldContainer_1momg_154", Cg = "_fieldLabel_1momg_175", Bg = "_field_1momg_128", Ng = "_fieldConditions_1momg_186", xg = "_fieldStat_1momg_197", Dg = "_fieldSmall_1momg_210", Mg = "_fieldSmallLong_1momg_222", kg = "_fieldStatSmall_1momg_234", Lg = "_fieldStatContainerSmall_1momg_247", jg = "_fieldStatContainerSmallRow_1momg_260", Hg = "_fieldStatContainer_1momg_247", zg = "_fieldStatLabel_1momg_293", Ug = "_statContainer_1momg_302", Gg = "_statButton_1momg_312", Yg = "_statDetail_1momg_326", qg = "_talentCount_1momg_337", Vg = "_chatBox_1momg_343", Qg = "_chatField_1momg_354", Ig = "_chatSender_1momg_366", Xg = "_poolField_1momg_372", Kg = "_poolButtons_1momg_380", Zg = "_poolContainer_1momg_387", Wg = "_rollResult_1momg_398", Jg = "_storyButton_1momg_405", Fg = "_logo_1momg_410", Pg = "_characterRow_1momg_414", $g = "_fixedMenu_1momg_421", tb = "_menuButton_1momg_435", eb = "_menuButtonSelected_1momg_441", ab = "_pathList_1momg_449", nb = "_pathItem_1momg_455", ib = "_chatInputContainer_1momg_488", lb = "_chatCloseButton_1momg_493", v = {
  global: bg,
  scrollable: pg,
  chatScrollable: vg,
  header: Ag,
  Sheet: Eg,
  fieldFullWidth: Sg,
  fieldRow: Tg,
  fieldRowNoSpread: Og,
  fieldColumn: wg,
  fieldFullColumn: _g,
  fieldContainer: Rg,
  fieldLabel: Cg,
  field: Bg,
  fieldConditions: Ng,
  fieldStat: xg,
  fieldSmall: Dg,
  fieldSmallLong: Mg,
  fieldStatSmall: kg,
  fieldStatContainerSmall: Lg,
  fieldStatContainerSmallRow: jg,
  fieldStatContainer: Hg,
  fieldStatLabel: zg,
  statContainer: Ug,
  statButton: Gg,
  statDetail: Yg,
  talentCount: qg,
  chatBox: Vg,
  chatField: Qg,
  chatSender: Ig,
  poolField: Xg,
  poolButtons: Kg,
  poolContainer: Zg,
  rollResult: Wg,
  storyButton: Jg,
  logo: Fg,
  characterRow: Pg,
  fixedMenu: $g,
  menuButton: tb,
  menuButtonSelected: eb,
  pathList: ab,
  pathItem: nb,
  chatInputContainer: ib,
  chatCloseButton: lb
};

var Wu = {
  exports: {}
};

var hh;

function sb() {
  return hh || (hh = 1, function(o) {
    (function() {
      var s = {}.hasOwnProperty;
      function r() {
        for (var h = "", y = 0; y < arguments.length; y++) {
          var T = arguments[y];
          T && (h = m(h, u(T)));
        }
        return h;
      }
      function u(h) {
        if (typeof h == "string" || typeof h == "number") return h;
        if (typeof h != "object") return "";
        if (Array.isArray(h)) return r.apply(null, h);
        if (h.toString !== Object.prototype.toString && !h.toString.toString().includes("[native code]")) return h.toString();
        var y = "";
        for (var T in h) s.call(h, T) && h[T] && (y = m(y, T));
        return y;
      }
      function m(h, y) {
        return y ? h ? h + " " + y : h + y : h;
      }
      o.exports ? (r.default = r, o.exports = r) : window.classNames = r;
    })();
  }(Wu)), Wu.exports;
}

var ob = sb();

const ot = sg(ob), Ae = "/assets/line.webp", je = "/assets/line2.webp";

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

const rr = up(), Zt = new pb(rr.origin, rr.roomId), rp = new rb(Zt), cp = new ub(Zt), dp = new Qb(Zt), fp = new vb(Zt), hp = new Lb(Zt), mp = new jb(Zt), yp = new Hb(Zt), gp = new zb(Zt), bp = new Ub(Zt), pp = new Gb(Zt), vp = new qb(Zt), Ap = new Ib(Zt), Ep = new Kb(Zt), Sp = new Zb(Zt), Tp = new Jb(Zt), PpMock = globalThis.__grimwild_test_obr, st = PpMock || {
  onReady: o => {
    Zt.ready ? o() : Zt.once("OBR_READY", (() => o()));
  },
  get isReady() {
    return Zt.ready;
  },
  viewport: rp,
  player: cp,
  party: dp,
  notification: fp,
  scene: hp,
  contextMenu: mp,
  tool: yp,
  popover: gp,
  modal: bp,
  action: pp,
  interaction: vp,
  room: Ap,
  theme: Ep,
  assets: Sp,
  broadcast: Tp,
  isAvailable: !!rr.origin
}, Op = "data:image/png;base64,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", wp = "data:image/png;base64,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", _p = "data:image/png;base64,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", Rp = "data:image/png;base64,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", Cp = "data:image/png;base64,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", Bp = "/assets/d66.png", Np = "/assets/d81.png", xp = "/assets/d82.png", Dp = "/assets/d83.png", Mp = "/assets/d84.png", kp = "/assets/d85.png", Lp = "/assets/d86.png", jp = "/assets/d87.png", Hp = "/assets/d88.png", zp = [ Op, wp, _p, Rp, Cp, Bp ], Up = [ Np, xp, Dp, Mp, kp, Lp, jp, Hp ], Gp = o => {
  let s = "black";
  switch (o) {
   case "Critical":
    s = "purple";
    break;

   case "Perfect":
    s = "green";
    break;

   case "Messy":
    s = "darkgoldenrod";
    break;

   case "Grim":
    s = "darkred";
    break;

   case "Disaster":
    s = "red";
    break;

   default:
    s = "black";
    break;
  }
  return s;
};

function Yp() {
  const o = [ [ "Tough", "Quiet", "Precarious", "Wild", "Mysterious", "Rustic" ], [ "Muffled", "Aged", "Romantic", "Menacing", "Puzzling", "Eerie" ], [ "Broken", "Distant", "Dwindling", "Perilous", "Bleak", "Tense" ], [ "Forgotten", "Hidden", "Abundant", "Withered", "Chaotic", "Looming" ], [ "Festive", "Lost", "Immense", "Serene", "Vibrant", "Flickering" ], [ "Rugged", "Sacred", "Splintered", "Relentless", "Tangled", "Twisted" ] ], s = [ [ "Journey", "Juncture", "Rift", "Scheme", "Nexus", "Team" ], [ "Tremor", "Debris", "Symbol", "Scar", "Archive", "Chasm" ], [ "Sanctuary", "Betrayal", "Trail", "Wasteland", "Help", "Mystery" ], [ "Peak", "Threshold", "Boundary", "Beacon", "Secret", "Wall" ], [ "Territory", "Rumor", "Standoff", "Strife", "Maze", "Pact" ], [ "Dilemma", "Tradition", "Jackpot", "Omen", "Deception", "Illusion" ] ], r = o[Math.floor(Math.random() * o.length)], u = s[Math.floor(Math.random() * s.length)], m = r[Math.floor(Math.random() * r.length)], h = u[Math.floor(Math.random() * u.length)];
  return `${m} ${h}`;
}

const cr = o => {
  var s = o, r = Math.floor(Math.random() * s) + 1;
  return r;
}, ti = async ({diceCount: o, thornsCount: s, myChat: r, id: u, player: m, odds: h, setValue: y, role: T}) => {
  const O = [], g = [];
  let p = 0, R = 0, G = 0, W = 0;
  for (let z = 0; z < o; z++) {
    const I = cr(6);
    O.push(I), I < 4 && W++, I === 6 ? p++ : I > 3 && R++;
  }
  for (let z = 0; z < s; z++) {
    const I = cr(8);
    g.push(I), I > 6 && G++;
  }
  let X = "Grim";
  p > 1 ? X = "Critical" : p > 0 ? X = "Perfect" : R > 0 && (X = "Messy");
  const P = o - W;
  let it = [], ut = X;
  for (let z = 0; z < G; z++) X === "Messy" ? (X = "Grim", it.push("(Messy -> Grim)")) : X === "Perfect" ? (X = "Messy", 
  it.push(`\n(Perfect -> Messy)`)) : X === "Grim" && (X = "Disaster", it.push("(Grim -> Disaster)"));
  if (h && it.push(h), X === "Critical" && it.push("Add greater effect, secondary effect, or setup a follow-up."), 
  X === "Disaster" && it.push("Double the risk."), y && (it.push(`${o} ➜ ${P}`), y(P)), 
  O.length === 0 && g.length === 0) return;
  const J = {
    id: Date.now(),
    user: T === "GM" ? "GM" : m,
    dice: O,
    thorns: g,
    initialOutcome: ut,
    outcome: X,
    thornEffect: it
  }, H = [ ...r, J ];
  let k = {
    ...(await st.scene.getMetadata())["grimwild.extension/metadata"]
  };
  k[u] = H, re({
    "grimwild.extension/metadata": k
  }), setTimeout((() => {
    var z = document.getElementById("chatbox");
    z && (z.scrollTop = z.scrollHeight);
  }), 100);
}, qp = ({chat: o, name: s}) => {
  if (o.dice && o.dice.length || o.thorns && o.thorns.length) return d.jsxs("div", {
    style: {
      textAlign: o.user === s ? "right" : "left"
    },
    children: [ d.jsx("div", {
      className: v.chatSender,
      children: o.user
    }), d.jsxs("div", {
      className: v.rollResult,
      style: {
        flexDirection: o.user === s ? "row-reverse" : "row"
      },
      children: [ o.dice.map(((r, u) => d.jsx("img", {
        src: zp[r - 1],
        width: 24,
        height: 24
      }, "dice" + u))), o.thorns && o.thorns.map(((r, u) => d.jsx("img", {
        src: Up[r - 1],
        width: 30,
        height: 30
      }, "thorn" + u))) ]
    }), o.dice.length > 0 && d.jsxs(d.Fragment, {
      children: [ d.jsx("div", {
        style: {
          fontSize: 16
        },
        children: o.thornEffect.map(((r, u) => d.jsx("div", {
          children: r
        }, u)))
      }), d.jsx("div", {
        className: v.header,
        style: {
          color: Gp(o.outcome),
          fontSize: 14
        },
        children: o.outcome
      }) ]
    }) ]
  });
}, Hh = ({chat: o, name: s}) => o.message || o.description ? d.jsxs("div", {
  style: {
    textAlign: o.user === s ? "right" : "left"
  },
  children: [ d.jsx("div", {
    className: v.chatSender,
    children: o.user
  }), d.jsx("span", {
    children: o.message
  }), o.description && d.jsx("div", {
    dangerouslySetInnerHTML: {
      __html: o.description
    }
  }) ]
}) : d.jsx(qp, {
  chat: o,
  name: s
}), Vp = ({pool: o, onChange: s, onRemove: r, onRoll: u}) => d.jsx("div", {
  className: ot(v.fieldContainer),
  children: d.jsxs("div", {
    className: v.fieldRowNoSpread,
    children: [ d.jsx("input", {
      className: v.fieldStatSmall,
      value: o.value,
      onChange: m => {
        const h = m.target.value, y = parseInt(h.charAt(h.length - 1));
        s({
          ...o,
          value: isNaN(y) ? 0 : y
        });
      }
    }), d.jsx("button", {
      onClick: () => {
        u();
      },
      children: "Roll"
    }), d.jsx("input", {
      className: v.poolField,
      type: "text",
      value: o.name,
      onChange: m => {
        s({
          ...o,
          name: m.target.value
        });
      }
    }), d.jsx("button", {
      className: v.statButton,
      style: {
        width: "0.75rem",
        height: "0.75rem"
      },
      onClick: () => {
        r();
      },
      children: "×"
    }) ]
  })
}), Qp = ({chat: o, myChat: s, id: r, pools: u, player: m, role: h, gmData: y, players: T}) => {
  const [O, g] = Et.useState(0), [p, R] = Et.useState(0), G = async H => {
    const k = {
      ...(await st.scene.getMetadata())["grimwild.gm.extension/metadata"],
      suspense: H
    };
    re({
      "grimwild.gm.extension/metadata": k
    });
  }, W = async () => {
    const H = Yp(), N = {
      id: Date.now(),
      user: h === "GM" ? "GM" : m,
      description: `- Crucible - <br><b>${H}</b>`,
      gmRoll: !0
    }, B = [ ...s, N ];
    let I = {
      ...(await st.scene.getMetadata())["grimwild.extension/metadata"]
    };
    I[r] = B, re({
      "grimwild.extension/metadata": I
    });
  }, X = async () => {
    const H = T[Math.floor(Math.random() * T.length)], N = {
      id: Date.now(),
      user: h === "GM" ? "GM" : m,
      description: `- You've been targeted - <br><b>${H.name}</b>`,
      gmRoll: !0
    }, B = [ ...s, N ];
    let I = {
      ...(await st.scene.getMetadata())["grimwild.extension/metadata"]
    };
    I[r] = B, re({
      "grimwild.extension/metadata": I
    });
  }, P = async H => {
    const N = {
      id: Date.now(),
      name: "",
      value: H || 0
    };
    let z = {
      ...(await st.scene.getMetadata())["grimwild.pool.extension/metadata"]
    };
    z[N.id] = N, re({
      "grimwild.pool.extension/metadata": z
    });
  }, it = async H => {
    let k = {
      ...(await st.scene.getMetadata())["grimwild.pool.extension/metadata"]
    };
    delete k[H], re({
      "grimwild.pool.extension/metadata": k
    });
  }, ut = async H => {
    if (H) {
      let k = {
        ...(await st.scene.getMetadata())["grimwild.pool.extension/metadata"]
      };
      k[H.id] = {
        ...H,
        lastEdit: r
      }, re({
        "grimwild.pool.extension/metadata": k
      });
    }
  }, J = async H => {
    let N = 0, B = [], k = 0, z = 0;
    for (let Y = 0; Y < H.value; Y++) {
      const nt = cr(6);
      B.push(nt), nt < 4 && N++, nt === 6 ? k++ : nt > 3 && z++;
    }
    let I = "Grim";
    k > 1 ? I = "Critical" : k > 0 ? I = "Perfect" : z > 0 && (I = "Messy");
    const q = H.value - N, V = [ H.name, `${H.value} ➜ ${q}` ];
    H.value === q && V.push("Take secondary effect");
    const bt = {
      id: Date.now(),
      user: h === "GM" ? "GM" : m,
      dice: B,
      thornEffect: V,
      outcome: I
    };
    ut({
      ...H,
      value: q
    });
    const Dt = [ ...s, bt ];
    let jt = {
      ...(await st.scene.getMetadata())["grimwild.extension/metadata"]
    };
    jt[r] = Dt, re({
      "grimwild.extension/metadata": jt
    }), setTimeout((() => {
      var Y = document.getElementById("chatbox");
      Y && (Y.scrollTop = Y.scrollHeight);
    }), 100);
  };
  return d.jsxs("div", {
    className: ot(v.Sheet),
    children: [ d.jsx("div", {
      className: ot(v.fieldColumn),
      children: d.jsxs("div", {
        className: ot(v.fieldRow),
        style: {
          alignItems: "flex-end",
          justifyContent: "space-between"
        },
        children: [ d.jsxs("div", {
          className: v.statContainer,
          style: {
            alignItems: "center",
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            height: 78,
            width: 150
          },
          children: [ d.jsxs("div", {
            className: v.fieldStatContainerSmall,
            children: [ d.jsx("b", {
              children: "Suspense"
            }), d.jsx("input", {
              className: v.fieldStat,
              type: "number",
              value: y && y.suspense ? y.suspense : "0",
              onChange: H => {
                G(H.target.value);
              }
            }) ]
          }), d.jsxs("div", {
            className: v.fieldStatContainerSmall,
            style: {
              marginLeft: 6
            },
            children: [ d.jsx("button", {
              onClick: () => {
                X();
              },
              style: {
                width: "4.2rem"
              },
              children: "PC"
            }), d.jsx("button", {
              onClick: () => {
                W();
              },
              style: {
                width: "4.2rem"
              },
              children: "Crucible"
            }) ]
          }) ]
        }), d.jsxs("div", {
          className: v.statContainer,
          style: {
            alignItems: "center",
            justifyContent: "space-between"
          },
          children: [ d.jsx("b", {
            children: "Story"
          }), d.jsxs("div", {
            className: v.fieldStatContainerSmall,
            style: {
              marginLeft: 8
            },
            children: [ d.jsx("button", {
              className: v.storyButton,
              onClick: () => {
                ti({
                  diceCount: 3,
                  thornsCount: 0,
                  myChat: s,
                  id: r,
                  player: m,
                  odds: "Good Odds",
                  role: h
                });
              },
              children: "Good"
            }), d.jsx("button", {
              className: v.storyButton,
              onClick: () => {
                ti({
                  diceCount: 2,
                  thornsCount: 0,
                  myChat: s,
                  id: r,
                  player: m,
                  odds: "Even Odds",
                  role: h
                });
              },
              children: "Even"
            }), d.jsx("button", {
              className: v.storyButton,
              onClick: () => {
                ti({
                  diceCount: 1,
                  thornsCount: 0,
                  myChat: s,
                  id: r,
                  player: m,
                  odds: "Bad Odds",
                  role: h
                });
              },
              children: "Bad"
            }) ]
          }) ]
        }), d.jsxs("div", {
          className: v.statContainer,
          style: {
            alignItems: "center",
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            height: 78
          },
          children: [ d.jsxs("div", {
            className: v.fieldStatContainerSmall,
            children: [ d.jsx("b", {
              children: "Dice"
            }), d.jsx("input", {
              className: v.fieldStat,
              type: "number",
              value: O === null ? "" : O,
              onClick: () => {
                g(null);
              },
              onBlur: () => {
                O === null && g(0);
              },
              onChange: H => {
                const N = H.target.value, B = parseInt(N.charAt(N.length - 1));
                g(isNaN(B) ? null : B);
              }
            }) ]
          }), d.jsxs("div", {
            className: v.fieldStatContainerSmall,
            children: [ d.jsx("b", {
              children: "Thorns"
            }), d.jsx("input", {
              className: v.fieldStat,
              type: "number",
              value: p === null ? "" : p,
              onClick: () => {
                R(null);
              },
              onBlur: () => {
                p === null && R(0);
              },
              onChange: H => {
                const N = H.target.value, B = parseInt(N.charAt(N.length - 1));
                R(isNaN(B) ? null : B);
              }
            }) ]
          }), d.jsxs("div", {
            className: v.fieldStatContainerSmall,
            children: [ d.jsx("button", {
              onClick: () => {
                ti({
                  diceCount: O ?? 0,
                  thornsCount: p ?? 0,
                  myChat: s,
                  id: r,
                  player: m,
                  setValue: H => {
                    g(H);
                  },
                  role: h
                });
              },
              style: {
                width: "4rem"
              },
              children: "Pool"
            }), d.jsx("button", {
              onClick: () => {
                ti({
                  diceCount: O ?? 0,
                  thornsCount: p ?? 0,
                  myChat: s,
                  id: r,
                  player: m,
                  role: h
                });
              },
              style: {
                width: "4rem"
              },
              children: "Roll"
            }) ]
          }) ]
        }) ]
      })
    }), d.jsxs("div", {
      className: v.fieldRow,
      style: {
        justifyContent: "space-between"
      },
      children: [ d.jsxs("div", {
        className: ot(v.fieldColumn),
        children: [ d.jsx("div", {
          className: v.header,
          children: "Pools"
        }), d.jsx("div", {
          className: v.poolContainer,
          children: u.map((H => d.jsx(Vp, {
            pool: H,
            onChange: N => {
              ut(N);
            },
            onRoll: () => {
              J(H);
            },
            onRemove: () => {
              it(H.id);
            }
          }, H.id)))
        }), d.jsxs("div", {
          className: v.poolButtons,
          children: [ d.jsx("b", {
            children: "Add Pool:"
          }), d.jsx("button", {
            className: v.statButton,
            onClick: () => {
              P(4);
            },
            children: "Short"
          }), d.jsx("button", {
            className: v.statButton,
            onClick: () => {
              P(6);
            },
            children: "Mid"
          }), d.jsx("button", {
            className: v.statButton,
            onClick: () => {
              P(8);
            },
            children: "Long"
          }) ]
        }) ]
      }), d.jsx("div", {
        className: v.chatBox,
        style: {
          height: 420
        },
        children: d.jsx("div", {
          id: "chatbox",
          className: ot(v.chatScrollable),
          style: {
            width: 155
          },
          children: o.length ? o.sort(((H, N) => H.id - N.id)).filter((H => H.dice && H.dice.length > 0 || H.thorns && H.thorns.length > 0 || H.gmRoll)).map((H => d.jsx(Hh, {
            chat: H,
            name: m
          }, H.id))) : ""
        })
      }) ]
    }) ]
  });
}, _h = ({chat: o, myChat: s, role: r, id: u, player: m, chatOnly: h}) => {
  const [y, T] = Et.useState(""), O = R => {
    R.key === "Enter" && g();
  }, g = async () => {
    if (y !== "") {
      if (r === "GM" && y === "/clearchat") {
        p(), T("");
        return;
      }
      const R = {
        id: Date.now(),
        user: r === "GM" ? "GM" : m,
        message: y.trim()
      }, G = [ ...s, R ];
      let P = {
        ...(await st.scene.getMetadata())["grimwild.extension/metadata"]
      };
      P[u] = G, re({
        "grimwild.extension/metadata": P
      }), T(""), setTimeout((() => {
        var it = document.getElementById("chatbox");
        it && (it.scrollTop = it.scrollHeight);
      }), 100);
    }
  }, p = async () => {
    const G = (await st.scene.getMetadata())["grimwild.extension/metadata"], W = Object.keys(G);
    let X = {
      ...G
    };
    W.forEach((P => {
      X[P] = [];
    })), re({
      "grimwild.extension/metadata": X
    });
  };
  return d.jsx("div", {
    className: ot(v.Sheet),
    style: h ? {
      padding: 0
    } : {},
    children: d.jsx("div", {
      className: v.fieldRow,
      children: d.jsxs("div", {
        className: v.chatBox,
        style: {
          width: h ? 280 : 460
        },
        children: [ d.jsx("div", {
          id: "chatbox",
          className: ot(v.chatScrollable),
          style: {
            height: h ? 480 : 420
          },
          children: o.length ? o.sort(((R, G) => R.id - G.id)).map((R => d.jsx(Hh, {
            chat: R,
            name: m
          }, R.id))) : ""
        }), d.jsx("img", {
          src: Ae
        }), d.jsxs("div", {
          className: v.chatInputContainer,
          children: [ d.jsx("input", {
            className: v.chatField,
            value: y,
            onChange: R => {
              T(R.target.value);
            },
            onKeyDown: R => {
              O(R);
            }
          }), r === "GM" && d.jsx("button", {
            onClick: () => {
              confirm("Are you sure you want to clear all the chat messages?") == !0 && p();
            },
            children: "Clear"
          }) ]
        }) ]
      })
    })
  });
}, ja = ({label: o, onChange: s, value: r, className: u}) => d.jsxs("div", {
  className: ot(v.fieldContainer, u),
  children: [ d.jsx("div", {
    className: v.fieldLabel,
    children: o
  }), d.jsx("input", {
    className: v.field,
    type: "text",
    onChange: m => {
      s(m.target.value);
    },
    value: r
  }) ]
}), Rh = ({label: o, onChange: s, rows: r = 4, value: u, width: m = 200}) => d.jsxs("div", {
  className: v.fieldContainer,
  children: [ d.jsx("div", {
    className: v.fieldLabel,
    children: o
  }), d.jsx("textarea", {
    className: v.field,
    style: {
      width: m
    },
    rows: r,
    onChange: h => {
      s(h.target.value);
    },
    value: u
  }) ]
}), Rs = ({label: o, onChangeValue: s, onChangeMark: r, value: u, marked: m, myChat: h, id: y, onRoll: T, player: O}) => d.jsxs("div", {
  className: v.fieldStatContainer,
  children: [ d.jsx("div", {
    className: v.fieldStatLabel,
    children: d.jsx("b", {
      children: o
    })
  }), d.jsx("input", {
    className: v.fieldStat,
    onChange: g => {
      s(g.target.value);
    },
    value: u
  }), d.jsxs("div", {
    className: v.fieldStatContainerSmall,
    children: [ d.jsx("div", {
      className: v.fieldStatLabel,
      children: "Marked"
    }), d.jsx("input", {
      type: "checkbox",
      checked: m,
      onChange: () => {
        r(!m);
      }
    }) ]
  }), d.jsx("button", {
    className: v.statButton,
    onClick: () => {
      let g = 0;
      O.bloodied ? g++ : m && (o === "Brawling" || o === "Agility") && (g++, r(!1)), O.rattled ? g++ : m && (o === "Wits" || o === "Presence") && (g++, 
      r(!1)), ti({
        diceCount: u,
        thornsCount: g,
        myChat: h,
        id: y,
        player: O.name,
        role: "PLAYER"
      }), T();
    },
    children: "Roll"
  }) ]
}), er = [ "Brave", "Caring", "Confident", "Curious", "Gentle", "Honest", "Honorable", "Persistent", "Quiet", "Protective", "Rash", "Stubborn" ], ar = [ "Justice", "Glory", "Harmony", "Honor", "Knowledge", "Love", "Power", "Renown", "Thrills", "Wealth", "Wisdom" ], Ip = [ "Deep", "Complex", "Growing", "Lowkey", "Playful", "Tense" ], Xp = [ "Affection", "Camaraderie", "Curiosity", "Doubts", "Respect", "Rivalry" ], Ha = ({value: o, onChange: s, options: r}) => !r.includes(o) && o !== "" ? d.jsx("input", {
  className: v.fieldSmall,
  value: o,
  onChange: u => {
    s(u.target.value);
  }
}) : d.jsxs("select", {
  onChange: u => {
    s(u.target.value);
  },
  value: o,
  children: [ r.map((u => d.jsx("option", {
    value: u,
    children: u
  }))), d.jsx("option", {
    value: "Custom",
    children: "Custom"
  }) ]
}), Kp = ({onChange: o, onRemove: s, bond: r}) => d.jsx("div", {
  className: ot(v.fieldContainer, v.fieldFullWidth),
  children: d.jsxs("div", {
    className: v.fieldRowNoSpread,
    children: [ d.jsx("div", {
      className: v.fieldLabel,
      children: "PC: "
    }), d.jsx("input", {
      className: v.field,
      type: "text",
      onChange: u => {
        o({
          ...r,
          name: u.target.value
        });
      },
      value: r.name
    }), d.jsx(Ha, {
      value: r.intensity,
      onChange: u => {
        o({
          ...r,
          intensity: u
        });
      },
      options: Ip
    }), d.jsx(Ha, {
      value: r.nature,
      onChange: u => {
        o({
          ...r,
          nature: u
        });
      },
      options: Xp
    }), d.jsx("button", {
      className: v.statButton,
      style: {
        width: "0.75rem",
        height: "0.75rem"
      },
      onClick: () => {
        s();
      },
      children: "×"
    }) ]
  })
}), Zp = o => {
  const s = [ 2, 5, 9, 14, 20, 27 ];
  let r = 1;
  for (let u = 0; u < s.length && o >= s[u]; u++) r++;
  return r;
}, Wp = o => {
  const s = [ 2, 5, 9, 14, 20, 27 ];
  for (let r = 0; r < s.length; r++) if (o < s[r]) return s[r] - o;
  return 0;
}, Jp = ({player: o, updatePlayer: s, myChat: r, id: u, onRoll: m}) => {
  var h;
  return d.jsxs("div", {
    className: ot(v.scrollable, v.Sheet),
    children: [ d.jsx("div", {
      className: v.header,
      children: "CHARACTER"
    }), d.jsx("img", {
      src: Ae
    }), d.jsxs("div", {
      className: ot(v.fieldRow, v.fieldFullWidth),
      children: [ d.jsxs("div", {
        className: ot(v.fieldColumn, v.fieldFullWidth),
        children: [ d.jsx(ja, {
          label: "Name",
          onChange: y => {
            s({
              ...o,
              name: y
            });
          },
          value: o.name
        }), d.jsx(ja, {
          label: "Player",
          onChange: y => {
            s({
              ...o,
              player: y
            });
          },
          value: o.player
        }) ]
      }), d.jsx("div", {
        className: v.fieldFullColumn,
        children: d.jsx(Rh, {
          label: "Distinct Features",
          onChange: y => {
            s({
              ...o,
              features: y
            });
          },
          value: o.features
        })
      }) ]
    }), d.jsx("img", {
      src: je
    }), d.jsx("div", {
      className: v.header,
      children: "STATS"
    }), d.jsx("img", {
      src: Ae
    }), d.jsxs("div", {
      className: ot(v.fieldRow),
      children: [ d.jsxs("div", {
        className: ot(v.fieldColumn, v.statContainer),
        children: [ d.jsxs("div", {
          className: ot(v.fieldRow),
          children: [ d.jsx(Rs, {
            label: "Brawn",
            onChangeMark: y => {
              s({
                ...o,
                brawnMark: y
              });
            },
            value: o.brawn,
            marked: o.brawnMark,
            onChangeValue: function(y) {
              const T = parseInt(y.charAt(y.length - 1));
              s({
                ...o,
                brawn: isNaN(T) ? 0 : T
              });
            },
            myChat: r,
            id: u,
            onRoll: m,
            player: o
          }), d.jsx(Rs, {
            label: "Agility",
            onChangeMark: y => {
              s({
                ...o,
                agilityMark: y
              });
            },
            value: o.agility,
            marked: o.agilityMark,
            onChangeValue: function(y) {
              const T = parseInt(y.charAt(y.length - 1));
              s({
                ...o,
                agility: isNaN(T) ? 0 : T
              });
            },
            myChat: r,
            id: u,
            onRoll: m,
            player: o
          }), d.jsx(Rs, {
            label: "Wits",
            onChangeMark: y => {
              s({
                ...o,
                witsMark: y
              });
            },
            value: o.wits,
            marked: o.witsMark,
            onChangeValue: function(y) {
              const T = parseInt(y.charAt(y.length - 1));
              s({
                ...o,
                wits: isNaN(T) ? 0 : T
              });
            },
            myChat: r,
            id: u,
            onRoll: m,
            player: o
          }), d.jsx(Rs, {
            label: "Presence",
            onChangeMark: y => {
              s({
                ...o,
                presenceMark: y
              });
            },
            value: o.presence,
            marked: o.presenceMark,
            onChangeValue: function(y) {
              const T = parseInt(y.charAt(y.length - 1));
              s({
                ...o,
                presence: isNaN(T) ? 0 : T
              });
            },
            myChat: r,
            id: u,
            onRoll: m,
            player: o
          }) ]
        }), d.jsxs("div", {
          className: ot(v.fieldRow),
          children: [ "Bloodied", " ", d.jsx("input", {
            type: "checkbox",
            checked: o.bloodied,
            onChange: () => {
              s({
                ...o,
                bloodied: !o.bloodied
              });
            }
          }), "Rattled", " ", d.jsx("input", {
            type: "checkbox",
            checked: o.rattled,
            onChange: () => {
              s({
                ...o,
                rattled: !o.rattled
              });
            }
          }) ]
        }), d.jsxs("div", {
          className: v.statDetail,
          children: [ d.jsx("b", {
            children: "Critical"
          }), ":", d.jsx("br", {}), " Greater Effect (Drop 1) - Secondary Effect- Setup" ]
        }) ]
      }), d.jsxs("div", {
        className: ot(v.fieldColumn),
        children: [ d.jsxs("div", {
          className: ot(v.fieldColumn, v.statContainer),
          children: [ d.jsxs("div", {
            className: ot(v.fieldRow),
            children: [ d.jsx("b", {
              children: "Story"
            }), " ", d.jsx("input", {
              type: "checkbox",
              checked: o.story1,
              onChange: () => {
                s({
                  ...o,
                  story1: !o.story1
                });
              }
            }), " ", d.jsx("input", {
              type: "checkbox",
              checked: o.story2,
              onChange: () => {
                s({
                  ...o,
                  story2: !o.story2
                });
              }
            }) ]
          }), d.jsxs("div", {
            className: ot(v.fieldRow),
            children: [ d.jsx("b", {
              children: "Spark"
            }), " ", d.jsx("input", {
              type: "checkbox",
              checked: o.spark1,
              onChange: () => {
                s({
                  ...o,
                  spark1: !o.spark1
                });
              }
            }), " ", d.jsx("input", {
              type: "checkbox",
              checked: o.spark2,
              onChange: () => {
                s({
                  ...o,
                  spark2: !o.spark2
                });
              }
            }) ]
          }) ]
        }), d.jsxs("div", {
          className: ot(v.fieldColumn, v.statContainer),
          style: {
            textAlign: "center"
          },
          children: [ d.jsx("b", {
            children: "Experience"
          }), d.jsxs("div", {
            className: v.fieldStatContainerSmall,
            children: [ d.jsx("input", {
              className: v.fieldStat,
              value: o.experience,
              onChange: y => {
                const T = parseInt(y.target.value);
                s({
                  ...o,
                  experience: isNaN(T) ? 0 : T
                });
              }
            }), d.jsx("div", {
              className: v.fieldStatLabel,
              children: "Each session, take 1xp"
            }), d.jsx("div", {
              className: v.talentCount,
              children: Zp(o.experience)
            }), d.jsx("div", {
              className: v.fieldStatLabel,
              children: "Level & Non-Core Talents Unlocked"
            }), d.jsx("div", {
              className: v.talentCount,
              children: Wp(o.experience)
            }), d.jsx("div", {
              className: v.fieldStatLabel,
              children: "XP to next level"
            }) ]
          }) ]
        }) ]
      }) ]
    }), d.jsxs("div", {
      className: ot(v.fieldColumn, v.statContainer),
      children: [ d.jsx("b", {
        children: "Conditions"
      }), d.jsx("textarea", {
        className: v.fieldConditions,
        rows: 1,
        onChange: y => {
          s({
            ...o,
            conditions: y.target.value
          });
        },
        value: o.conditions
      }), d.jsxs("div", {
        className: v.statDetail,
        children: [ d.jsx("b", {
          children: "Vex"
        }), ": Fight - Flight - Freeze- Freakout" ]
      }) ]
    }), d.jsx("img", {
      src: je
    }), d.jsxs("div", {
      className: v.fieldRowNoSpread,
      children: [ d.jsx("div", {
        className: v.header,
        children: "DETAILS"
      }), d.jsx("div", {
        className: v.statDetail,
        children: "Introduce a tangle: take a spark"
      }) ]
    }), d.jsx("img", {
      src: Ae
    }), d.jsx("div", {
      className: v.fieldRow,
      children: d.jsxs("div", {
        className: ot(v.fieldColumn, v.fieldFullWidth),
        children: [ d.jsx(ja, {
          label: "Background #1",
          onChange: y => {
            s({
              ...o,
              background1: y
            });
          },
          value: o.background1
        }), d.jsx(ja, {
          label: "Wises",
          onChange: y => {
            s({
              ...o,
              wise1: y
            });
          },
          value: o.wise1
        }) ]
      })
    }), d.jsx("img", {
      src: je
    }), d.jsx("div", {
      className: v.fieldRow,
      children: d.jsxs("div", {
        className: ot(v.fieldColumn, v.fieldFullWidth),
        children: [ d.jsx(ja, {
          label: "Background #2",
          onChange: y => {
            s({
              ...o,
              background2: y
            });
          },
          value: o.background2
        }), d.jsx(ja, {
          label: "Wises",
          onChange: y => {
            s({
              ...o,
              wise2: y
            });
          },
          value: o.wise2
        }) ]
      })
    }), d.jsx("img", {
      src: je
    }), d.jsxs("div", {
      className: ot(v.fieldColumn, v.statContainer),
      children: [ d.jsx("b", {
        children: "Traits"
      }), d.jsx("div", {
        className: ot(v.fieldColumn),
        style: {
          fontSize: 15
        },
        children: d.jsxs("div", {
          className: ot(v.fieldRowNoSpread),
          children: [ d.jsx("div", {
            className: v.fieldStatLabel,
            children: "2 you are"
          }), d.jsx(Ha, {
            value: o.trait1,
            onChange: y => {
              s({
                ...o,
                trait1: y
              });
            },
            options: er
          }), d.jsx(Ha, {
            value: o.trait2,
            onChange: y => {
              s({
                ...o,
                trait2: y
              });
            },
            options: er
          }), d.jsx("div", {
            className: v.fieldStatLabel,
            children: "1 you're really not"
          }), d.jsx(Ha, {
            value: o.notTrait,
            onChange: y => {
              s({
                ...o,
                notTrait: y
              });
            },
            options: er
          }) ]
        })
      }), d.jsx("b", {
        children: "Desires"
      }), d.jsx("div", {
        className: ot(v.fieldColumn),
        style: {
          fontSize: 15
        },
        children: d.jsxs("div", {
          className: ot(v.fieldRowNoSpread),
          children: [ d.jsx("div", {
            className: v.fieldStatLabel,
            children: "2 you want"
          }), d.jsx(Ha, {
            value: o.desire1,
            onChange: y => {
              s({
                ...o,
                desire1: y
              });
            },
            options: ar
          }), d.jsx(Ha, {
            value: o.desire2,
            onChange: y => {
              s({
                ...o,
                desire2: y
              });
            },
            options: ar
          }), d.jsx("div", {
            className: v.fieldStatLabel,
            children: "1 you really don't"
          }), d.jsx(Ha, {
            value: o.notDesire,
            onChange: y => {
              s({
                ...o,
                notDesire: y
              });
            },
            options: ar
          }) ]
        })
      }) ]
    }), d.jsx("img", {
      src: je
    }), d.jsxs("div", {
      className: v.fieldRowNoSpread,
      children: [ d.jsx("div", {
        className: v.header,
        children: "BONDS"
      }), d.jsx("div", {
        className: v.statDetail,
        children: "Change a bond: The other PC takes spark | Quarrel: Both take spark"
      }) ]
    }), d.jsx("img", {
      src: Ae
    }), d.jsxs("div", {
      className: v.fieldColumn,
      children: [ (h = o.bonds) == null ? void 0 : h.map(((y, T) => d.jsx(Kp, {
        bond: y,
        onChange: O => {
          const g = o.bonds, p = g.findIndex((R => R.id === O.id));
          g[p] = O, s({
            ...o,
            bonds: g
          });
        },
        onRemove: () => {
          const O = o.bonds, g = O.findIndex((p => p.id === y.id));
          O.splice(g, 1), s({
            ...o,
            bonds: O
          });
        }
      }, "bond" + T))), d.jsx("button", {
        className: v.statButton,
        onClick: () => {
          const y = [ ...o.bonds, {
            id: Date.now(),
            name: "",
            intensity: "",
            nature: ""
          } ];
          s({
            ...o,
            bonds: y
          });
        },
        children: "Add PC Bond"
      }) ]
    }), d.jsx("img", {
      src: je
    }), d.jsxs("div", {
      className: v.fieldRowNoSpread,
      children: [ d.jsx("div", {
        className: v.header,
        children: "STORY ARCS"
      }), d.jsx("div", {
        className: v.statDetail,
        children: "Finish or move on: take a spark"
      }) ]
    }), d.jsx("img", {
      src: Ae
    }), d.jsxs("div", {
      className: ot(v.fieldFullWidth, v.fieldColumn),
      children: [ d.jsx(ja, {
        label: "Group Arc",
        onChange: y => {
          s({
            ...o,
            groupArc: y
          });
        },
        value: o.groupArc
      }), d.jsx(ja, {
        label: "Character Arc",
        onChange: y => {
          s({
            ...o,
            characterArc: y
          });
        },
        value: o.characterArc
      }) ]
    }), d.jsx("img", {
      src: Ae
    }), d.jsxs("div", {
      className: v.fieldRowNoSpread,
      children: [ d.jsx("div", {
        className: v.header,
        children: "OTHER"
      }), d.jsx("div", {
        className: v.statDetail,
        children: "Arcana, Character Notes, Notable Items"
      }) ]
    }), d.jsx("img", {
      src: Ae
    }), d.jsx(Rh, {
      label: "",
      onChange: y => {
        s({
          ...o,
          bio: y
        });
      },
      value: o.bio,
      width: 450
    }) ]
  });
}, Fp = "", Pp = "", $p = "", tv = "", ev = "", av = "", nv = "", iv = "", lv = "", sv = "", ov = "", uv = "", rv = "", cv = "", dv = "", fv = "", hv = "", mv = null, yv = [], gv = [], bv = null, pv = null, _v = null, kv = null, qv = null, Jv = null, iA = null, fA = null, AA = null, jA = null, QA = null, PA = null, sE = null, mE = null;
let Ns = {}, vr = {};
const xs = ({talent: o, onSelect: s, onRemove: r, onChangeTracker: u, onBroadcast: m}) => {
  var h, y;
  return d.jsxs("div", {
    className: ot(v.fieldColumn, v.statContainer),
    children: [ d.jsxs("div", {
      className: v.fieldRowNoSpread,
      style: {
        alignItems: "center",
        minHeight: "2rem"
      },
      children: [ d.jsx("div", {
        className: v.header,
        children: o.name
      }), r && d.jsx("div", {
        style: {
          marginLeft: "auto"
        },
        children: d.jsx("button", {
          onClick: () => {
            r();
          },
          children: "×"
        })
      }) ]
    }), (h = o.trackers) == null ? void 0 : h.map(((T, O) => T.type !== "fieldSmallLong" ? "" : d.jsxs("div", {
      className: ot(v.fieldStatContainerSmallRow, v.statDetail),
      children: [ d.jsx("div", {
        className: v.fieldStatLabel,
        style: {
          marginLeft: "0.25rem"
        },
        children: T.name
      }), d.jsx("div", {
        className: v.fieldRowNoSpread,
        style: {
          gap: "0.25rem"
        },
        children: d.jsx("input", {
          className: v.fieldSmallLong,
          value: T.value1,
          onChange: g => {
            u({
              ...T,
              value1: g.target.value
            }, O);
          }
        })
      }) ]
    }, T.name + O))), d.jsx("img", {
      src: je
    }), d.jsx("div", {
      dangerouslySetInnerHTML: {
        __html: o.description
      }
    }), d.jsx("img", {
      src: je
    }), d.jsx("div", {
      children: d.jsx("div", {
        className: v.statDetail,
        children: d.jsxs("div", {
          className: v.fieldRowNoSpread,
          style: {
            gap: 0
          },
          children: [ (y = o.trackers) == null ? void 0 : y.map(((T, O) => T.type === "fieldSmallLong" ? "" : d.jsxs("div", {
            className: v.fieldStatContainerSmallRow,
            children: [ d.jsx("div", {
              className: v.fieldStatLabel,
              style: {
                marginLeft: "0.25rem"
              },
              children: T.name
            }), d.jsxs("div", {
              className: v.fieldRowNoSpread,
              style: {
                gap: "0.25rem"
              },
              children: [ T.type === "checkbox" && d.jsx("input", {
                type: "checkbox",
                checked: T.checked,
                onChange: () => {
                  u({
                    ...T,
                    checked: !T.checked
                  }, O);
                }
              }), T.type === "field" && d.jsx("input", {
                className: v.fieldStat,
                value: T.value1,
                onChange: g => {
                  u({
                    ...T,
                    value1: g.target.value
                  }, O);
                }
              }), T.type === "fieldSmall" && d.jsx("input", {
                className: v.fieldSmall,
                value: T.value1,
                onChange: g => {
                  u({
                    ...T,
                    value1: g.target.value
                  }, O);
                }
              }), T.type === "fieldTwo" && d.jsxs(d.Fragment, {
                children: [ d.jsx("input", {
                  className: v.fieldStatSmall,
                  value: T.value1,
                  onChange: g => {
                    u({
                      ...T,
                      value1: g.target.value
                    }, O);
                  }
                }), d.jsx("input", {
                  className: v.fieldSmall,
                  value: T.value2,
                  onChange: g => {
                    u({
                      ...T,
                      value2: g.target.value
                    }, O);
                  },
                  style: {
                    width: "4rem"
                  }
                }) ]
              }) ]
            }) ]
          }, T.name + O))), d.jsx("div", {
            style: {
              marginLeft: "auto"
            },
            children: d.jsx("button", {
              onClick: () => {
                m();
              },
              children: "➤"
            })
          }) ]
        })
      })
    }), s && d.jsxs(d.Fragment, {
      children: [ d.jsx("img", {
        src: je
      }), d.jsx("button", {
        onClick: () => {
          s();
        },
        children: "Add Talent"
      }) ]
    }) ]
  });
}, yE = ({player: o, updatePlayer: s, broadcast: r}) => {
  if (o.path === "") return "";
  const u = vr[o.path], [m, h] = Et.useState(!0);
  if (!u) return d.jsxs(d.Fragment, {
    children: [ d.jsx("div", {
      className: v.header,
      children: "PATH NOT FOUND"
    }), d.jsx("div", {
      className: v.statDetail,
      children: `The path "${o.path}" is not available in /data/paths.`
    }), d.jsx("button", {
      onClick: () => {
        s({
          ...o,
          path: "",
          coreTalent: null
        });
      },
      children: "Clear Core Path"
    }) ]
  });
  return d.jsxs(d.Fragment, {
    children: [ d.jsxs("div", {
      className: v.fieldRowNoSpread,
      children: [ d.jsx("div", {
        children: d.jsx("img", {
          src: Ns[u.name.toLowerCase()],
          width: 80
        })
      }), d.jsxs("div", {
        className: v.fieldColumn,
        children: [ d.jsxs("div", {
          className: v.fieldRowNoSpread,
          style: {
            alignItems: "center"
          },
          children: [ d.jsx("div", {
            className: v.header,
            children: u.name
          }), d.jsx("div", {
            className: v.statDetail,
            children: u.description
          }) ]
        }), d.jsx("div", {
          className: v.statDetail,
          style: {
            fontStyle: "italic"
          },
          children: u.quote
        }) ]
      }) ]
    }), d.jsx("img", {
      src: Ae
    }), d.jsx("div", {
      className: v.header,
      children: "CORE TALENT"
    }), d.jsx(xs, {
      talent: o.coreTalent ?? u.coreTalent,
      onChangeTracker: (y, T) => {
        const O = o.coreTalent;
        O && O.trackers && (O.trackers[T] = y, s({
          ...o,
          coreTalent: O
        }));
      },
      onBroadcast: () => {
        r(u.coreTalent);
      }
    }), d.jsx("img", {
      src: je
    }), d.jsx("div", {
      className: v.header,
      children: "DETAILS"
    }), d.jsx("button", {
      onClick: () => {
        h(!m);
      },
      children: m ? "Expand Details " : "Collapse Details"
    }), !m && d.jsxs(d.Fragment, {
      children: [ u.details.map((y => d.jsx(xs, {
        talent: y,
        onChangeTracker: () => {},
        onBroadcast: () => {
          r(y);
        }
      }, y.name))), d.jsx("img", {
        src: je
      }), u.other !== null ? d.jsx("div", {
        className: ot(v.fieldColumn, v.statContainer),
        children: d.jsx("div", {
          dangerouslySetInnerHTML: {
            __html: u.other
          }
        })
      }) : "" ]
    }) ]
  });
}, Ch = ({player: o, updatePlayer: s, onSelect: r}) => {
  const u = Object.keys(vr);
  return d.jsx("div", {
    className: v.pathList,
    children: u.map((m => d.jsxs("div", {
      className: v.pathItem,
      onClick: () => {
        if (s) {
          const h = m !== "" ? vr[m].coreTalent : null;
          s({
            ...o,
            path: m,
            coreTalent: h
          });
        }
        r && r(m);
      },
      children: [ d.jsx("img", {
        src: Ns[m],
        width: 80
      }), d.jsx("div", {
        className: v.header,
        children: m
      }) ]
    }, m)))
  });
}, gE = ({path: o, player: s, updatePlayer: r, onClose: u, broadcast: m}) => {
  if (o === "") return "";
  const h = vr[o];
  if (!h) return d.jsxs(d.Fragment, {
    children: [ d.jsx("div", {
      className: v.header,
      children: "PATH NOT FOUND"
    }), d.jsx("div", {
      className: v.statDetail,
      children: `The path "${o}" is not available in /data/paths.`
    }), d.jsx("button", {
      onClick: () => {
        u();
      },
      children: "Close"
    }) ]
  });
  return d.jsxs(d.Fragment, {
    children: [ d.jsxs("div", {
      className: v.fieldRowNoSpread,
      children: [ d.jsxs("div", {
        className: v.header,
        children: [ "SELECT TALENT FROM ", h.name ]
      }), d.jsx("div", {
        style: {
          marginLeft: "auto"
        },
        children: d.jsx("button", {
          onClick: () => {
            u();
          },
          children: "×"
        })
      }) ]
    }), d.jsx("img", {
      src: je
    }), h.pathTalent.map((y => d.jsx(xs, {
      talent: y,
      onSelect: () => {
        const T = s.talents;
        r({
          ...s,
          talents: [ ...T, y ]
        }), u();
      },
      onChangeTracker: () => {},
      onBroadcast: () => {
        m(y);
      }
    }, y.name))) ]
  });
}, bE = ({player: o, updatePlayer: s, myChat: r, id: u}) => {
  const [m, h] = Et.useState(!1), [y, T] = Et.useState(""), O = async g => {
    const p = {
      id: Date.now(),
      user: g.name,
      description: g.description
    }, R = [ ...r, p ];
    let X = {
      ...(await st.scene.getMetadata())["grimwild.extension/metadata"]
    };
    X[u] = R, re({
      "grimwild.extension/metadata": X
    }), setTimeout((() => {
      var P = document.getElementById("chatbox");
      P && (P.scrollTop = P.scrollHeight);
    }), 100);
  };
  return m && y === "" ? d.jsxs("div", {
    className: ot(v.scrollable, v.Sheet),
    children: [ d.jsxs("div", {
      className: v.fieldRowNoSpread,
      children: [ d.jsx("div", {
        className: v.header,
        children: "SELECT PATH TO CHOOSE TALENT"
      }), d.jsx("div", {
        style: {
          marginLeft: "auto"
        },
        children: d.jsx("button", {
          onClick: () => {
            h(!1), T("");
          },
          children: "×"
        })
      }) ]
    }), d.jsx("img", {
      src: Ae
    }), d.jsx(Ch, {
      player: o,
      onSelect: g => {
        T(g);
      }
    }) ]
  }) : y !== "" ? d.jsx("div", {
    className: ot(v.scrollable, v.Sheet, v.fieldColumn),
    children: d.jsx(gE, {
      path: y,
      updatePlayer: s,
      onClose: () => {
        h(!1), T("");
      },
      player: o,
      broadcast: O
    })
  }) : d.jsxs("div", {
    className: ot(v.scrollable, v.Sheet),
    children: [ o.path !== "" ? d.jsxs(d.Fragment, {
      children: [ d.jsxs("div", {
        className: v.fieldRowNoSpread,
        children: [ d.jsx("div", {
          className: v.header,
          children: "CORE PATH"
        }), d.jsx("div", {
          style: {
            marginLeft: "auto"
          },
          children: d.jsx("button", {
            onClick: () => {
              s({
                ...o,
                path: ""
              });
            },
            children: "Change Core Path"
          })
        }) ]
      }), d.jsx(yE, {
        player: o,
        updatePlayer: s,
        broadcast: O
      }) ]
    }) : d.jsxs(d.Fragment, {
      children: [ d.jsx("div", {
        className: v.header,
        children: "SELECT CORE PATH"
      }), d.jsx("img", {
        src: Ae
      }), d.jsx(Ch, {
        player: o,
        updatePlayer: s
      }) ]
    }), d.jsx("div", {
      className: v.header,
      children: "TALENTS"
    }), d.jsx("img", {
      src: Ae
    }), o.talents.map(((g, p) => d.jsx(xs, {
      talent: g,
      onRemove: () => {
        const R = o.talents;
        R.splice(p, 1), s({
          ...o,
          talents: R
        });
      },
      onChangeTracker: (R, G) => {
        const W = o.talents;
        W[p] && W[p].trackers && (W[p].trackers[G] = R, s({
          ...o,
          talents: W
        }));
      },
      onBroadcast: () => {
        O(g);
      }
    }, g.name))), d.jsx("button", {
      className: v.statButton,
      onClick: () => {
        h(!0);
      },
      children: "Add Talent"
    }) ]
  });
}, pE = "/assets/logo.webp", vE = ({player: o, onRemove: s, onOpen: r}) => d.jsx("div", {
  className: ot(v.fieldContainer),
  style: {
    flexDirection: "row"
  },
  children: d.jsxs("div", {
    className: v.characterRow,
    children: [ o.path && Ns[o.path.toLowerCase()] ? d.jsx("img", {
      src: Ns[o.path.toLowerCase()],
      height: 40
    }) : d.jsx("div", {
      style: {
        width: 40,
        height: 40
      }
    }), d.jsx("div", {
      className: v.fieldLabel,
      children: "PC: "
    }), d.jsx("input", {
      className: v.field,
      value: o.name,
      readOnly: !0,
      style: {
        width: 140
      }
    }), d.jsx("div", {
      className: v.fieldLabel,
      children: "Path: "
    }), d.jsx("div", {
      className: v.header,
      style: {
        width: 100
      },
      children: o.path || "-"
    }), d.jsx("button", {
      className: v.statButton,
      style: {
        width: 40,
        marginLeft: "auto"
      },
      onClick: () => {
        r();
      },
      children: "Open"
    }), d.jsx("button", {
      className: v.statButton,
      style: {
        width: "0.75rem",
        height: "0.75rem"
      },
      onClick: () => {
        s();
      },
      children: "×"
    }) ]
  })
}), AE = () => ({
  id: Date.now(),
  name: "",
  path: "",
  player: "",
  background1: "",
  background2: "",
  wise1: "",
  wise2: "",
  groupArc: "",
  characterArc: "",
  features: "",
  conditions: "",
  brawn: 0,
  agility: 0,
  wits: 0,
  presence: 0,
  brawnMark: !1,
  agilityMark: !1,
  witsMark: !1,
  presenceMark: !1,
  bloodied: !1,
  rattled: !1,
  story1: !1,
  story2: !1,
  spark1: !1,
  spark2: !1,
  experience: 0,
  trait1: "",
  trait2: "",
  notTrait: "",
  desire1: "",
  desire2: "",
  notDesire: "",
  bonds: [],
  talents: [],
  coreTalent: null,
  bio: ""
}), EE = ({playerList: o, onOpen: s}) => {
  const r = async () => {
    const m = AE();
    let T = {
      ...(await st.scene.getMetadata())["grimwild.character.extension/metadata"]
    };
    T[m.id] = m, re({
      "grimwild.character.extension/metadata": T
    });
  }, u = async m => {
    let T = {
      ...(await st.scene.getMetadata())["grimwild.character.extension/metadata"]
    };
    confirm("Are you sure you want to delete the character?") == !0 && (delete T[m], 
    re({
      "grimwild.character.extension/metadata": T
    }));
  };
  return d.jsx("div", {
    className: ot(v.scrollable, v.Sheet),
    style: {
      height: 590,
      padding: "1rem"
    },
    children: d.jsxs("div", {
      className: ot(v.fieldColumn),
      children: [ d.jsxs("div", {
        className: v.fieldRow,
        style: {
          alignItems: "center",
          justifyContent: "space-between"
        },
        children: [ d.jsx("img", {
          src: pE,
          className: v.logo
        }), d.jsx("div", {
          className: v.header,
          children: "CHARACTER LIST"
        }), d.jsx("button", {
          onClick: () => {
            r();
          },
          style: {
            height: 30
          },
          children: "Add Character"
        }) ]
      }), d.jsx("img", {
        src: Ae
      }), o.map((m => d.jsx(vE, {
        player: m,
        onRemove: () => {
          u(m.id);
        },
        onOpen: () => {
          s(m);
        }
      }, m.id))) ]
    })
  });
}, re = o => {
  const s = {
    ...o,
    "grimwild.date.extension/metadata": Date.now()
  };
  st.scene.setMetadata(s);
};

async function loadExternalGrimwildData() {
  try {
    let externalAssets = null;
    const assetsResponse = await fetch("/data/assets.json");
    if (assetsResponse.ok) {
      externalAssets = await assetsResponse.json();
      externalAssets && typeof externalAssets === "object" && (Ns = externalAssets);
    }
    const pathKeys = externalAssets && typeof externalAssets === "object" ? Object.keys(externalAssets) : Object.keys(vr);
    const pathResponses = await Promise.all(pathKeys.map((o => {
      const s = `/data/paths/${o}.json`;
      return fetch(s).then((r => r.ok ? r.json().then((u => [ o, u ])) : [ o, null ])).catch((() => [ o, null ]));
    })));
    const externalPaths = Object.fromEntries(pathResponses.filter((([, o]) => o && typeof o === "object")));
    if (Object.keys(externalPaths).length > 0) {
      vr = externalPaths;
    }
  } catch (o) {
    console.warn("Failed to load external Grimwild data, using embedded bundle data.", o);
  }
}

function SE() {
  const [o, s] = Et.useState(!1), [r, u] = Et.useState(0), [m, h] = Et.useState(""), [y, T] = Et.useState(""), [O, g] = Et.useState("PLAYER"), [p, R] = Et.useState([]), [G, W] = Et.useState([]), [X, P] = Et.useState([]), [it, ut] = Et.useState(!1), [J, H] = Et.useState(null), [N, B] = Et.useState(null), [k, z] = Et.useState({
    suspense: "0"
  }), [I, q] = Et.useState(!1), [V, bt] = Et.useState("chat"), [Dt, Vt] = Et.useState([]), [te, jt] = Et.useState([]);
  Et.useEffect((() => {
    q(window.location.href.indexOf("/chatpopover") > 1);
  }), []);
  const Y = async M => {
    const Q = M["grimwild.character.extension/metadata"], K = [];
    return Object.keys(Q).forEach((dt => {
      K.push(Q[dt]);
    })), K;
  }, nt = async M => {
    const Q = M["grimwild.pool.extension/metadata"], K = [];
    return Object.keys(Q).forEach((dt => {
      K.push(Q[dt]);
    })), K;
  }, et = async M => {
    const Q = M["grimwild.extension/metadata"];
    let K = [];
    const Ot = await st.player.getId();
    return T(Ot), Q && Object.keys(Q).forEach((_t => {
      K = K.concat(Q[_t]), _t === Ot && P(Q[_t]);
    })), K.sort(((dt, _t) => dt.id - _t.id));
  }, At = M => {
    if (N) {
      clearTimeout(N);
      const Q = setTimeout((() => {
        A(M);
      }), 500);
      B(Q);
    } else {
      const Q = setTimeout((() => {
        A(M);
      }), 500);
      B(Q);
    }
    H(M);
  }, A = async M => {
    if (M) {
      let Ot = {
        ...(await st.scene.getMetadata())["grimwild.character.extension/metadata"]
      };
      Ot[M.id] = {
        ...M,
        lastEdit: y
      }, re({
        "grimwild.character.extension/metadata": Ot
      }), B(null);
    }
  }, U = async () => {
    const M = await st.scene.getMetadata(), Q = {
      room: st.room.id,
      dateNow: Date.now(),
      "grimwild.character.extension/metadata": M["grimwild.character.extension/metadata"],
      "grimwild.pool.extension/metadata": M["grimwild.pool.extension/metadata"],
      "grimwild.extension/metadata": M["grimwild.extension/metadata"]
    };
    localStorage.setItem("grimwild.extension/metadata", JSON.stringify(Q));
  }, at = async () => {
    const M = localStorage.getItem("grimwild.extension/metadata"), Q = await st.scene.getMetadata();
    if (M) {
      const K = JSON.parse(M), Ot = Q["grimwild.date.extension/metadata"] ?? 0;
      K.room === st.room.id && Ot < K.dateNow && await re({
        ...Q,
        "grimwild.character.extension/metadata": K["grimwild.character.extension/metadata"],
        "grimwild.pool.extension/metadata": K["grimwild.pool.extension/metadata"],
        "grimwild.extension/metadata": K["grimwild.extension/metadata"]
      });
    }
  };
  if (Et.useEffect((() => {
    st.onReady((async () => {
      if (st.scene.onReadyChange((async M => {
        if (M) {
          await st.player.getRole() === "GM" && await at();
          const Q = await st.scene.getMetadata();
          if (Q["grimwild.character.extension/metadata"]) {
            const K = await Y(Q);
            Vt(K);
          }
          if (Q["grimwild.pool.extension/metadata"]) {
            const K = await nt(Q);
            jt(K);
          }
          if (Q["grimwild.extension/metadata"]) {
            const K = await et(Q);
            W(K);
          }
          if (Q["grimwild.gm.extension/metadata"]) {
            const K = Q["grimwild.gm.extension/metadata"];
            z(K);
          }
          s(!0), setTimeout((() => {
            var K = document.getElementById("chatbox");
            K && (K.scrollTop = K.scrollHeight);
          }), 100), st.action.setBadgeBackgroundColor("orange"), h(await st.player.getName()), 
          T(await st.player.getId()), st.player.onChange((async () => {
            h(await st.player.getName());
          })), g(await st.player.getRole());
        } else s(!1), R([]);
      })), await st.scene.isReady()) {
        await st.player.getRole() === "GM" && await at();
        const M = await st.scene.getMetadata();
        if (M["grimwild.character.extension/metadata"]) {
          const Q = await Y(M);
          Vt(Q);
        }
        if (M["grimwild.pool.extension/metadata"]) {
          const Q = await nt(M);
          jt(Q);
        }
        if (M["grimwild.extension/metadata"]) {
          const Q = await et(M);
          W(Q);
        }
        if (M["grimwild.gm.extension/metadata"]) {
          const Q = M["grimwild.gm.extension/metadata"];
          z(Q);
        }
        s(!0), setTimeout((() => {
          var Q = document.getElementById("chatbox");
          Q && (Q.scrollTop = Q.scrollHeight);
        }), 100), st.action.setBadgeBackgroundColor("orange"), h(await st.player.getName()), 
        T(await st.player.getId()), st.player.onChange((async () => {
          h(await st.player.getName());
        })), g(await st.player.getRole());
      }
    }));
    try {
      localStorage.getItem("grimwild.extension/rolldata");
    } catch {
      ut(!0);
    }
  }), []), Et.useEffect((() => {
    G.length !== p.length && (R(G), setTimeout((() => {
      var M = document.getElementById("chatbox");
      M && (M.scrollTop = M.scrollHeight);
    }), 100));
  }), [ G ]), Et.useEffect((() => {
    if (o) {
      st.scene.onMetadataChange((async M => {
        const Q = await et(M);
        W(Q);
        const K = await Y(M);
        Vt(K);
        const Ot = await nt(M);
        jt(Ot);
        const dt = M["grimwild.gm.extension/metadata"];
        z(dt), await st.player.getRole() === "GM" && U();
      })), st.action.onOpenChange((async M => {
        M && V === "chat" && J && u(0);
      }));
      try {
        localStorage.getItem("grimwild.extension/rolldata");
      } catch {
        ut(!0);
        return;
      }
    }
  }), [ o ]), Et.useEffect((() => {
    r > 0 ? st.action.setBadgeText("" + r) : st.action.setBadgeText(void 0);
  }), [ r, o ]), Et.useEffect((() => {
    o && (async () => {
      p[p.length - 1] && o && o && (!await st.action.isOpen() || V !== "chat") && u(r + 1);
    })();
  }), [ p ]), it) return "Cookies not enabled";
  if (!o) return d.jsx("div", {
    className: v.global,
    children: d.jsxs("div", {
      className: ot(v.scrollable, v.Sheet),
      children: [ d.jsx("div", {
        className: v.header,
        children: "No Scene found."
      }), d.jsx("div", {
        children: "You need to load a scene to start adding/updating characters. If a scene is already loaded, kindly refresh the page."
      }) ]
    })
  });
  if (I) return d.jsxs("div", {
    className: v.global,
    children: [ d.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        padding: "0.5rem"
      },
      children: [ d.jsx("div", {
        className: v.header,
        children: "Chat"
      }), d.jsx("button", {
        className: v.chatCloseButton,
        onClick: () => {
          st.popover.close("chat/popover");
        },
        children: "Close"
      }) ]
    }), d.jsx(_h, {
      chat: p,
      role: O,
      myChat: X,
      id: y,
      pools: te,
      player: J ? J.name : m,
      gmData: k,
      players: Dt,
      chatOnly: I
    }) ]
  });
  const tt = async () => {
    await st.popover.open({
      id: "chat/popover",
      url: "/chatpopover",
      height: 600,
      width: 300,
      anchorOrigin: {
        horizontal: "RIGHT",
        vertical: "BOTTOM"
      },
      hidePaper: !0,
      marginThreshold: 0,
      disableClickAway: !0
    });
  };
  return d.jsxs("div", {
    className: v.global,
    children: [ J && d.jsxs("div", {
      className: ot(v.fixedMenu),
      children: [ d.jsx("button", {
        className: ot(v.menuButton, {
          [v.menuButtonSelected]: V === "character"
        }),
        onClick: () => {
          bt("character");
        },
        children: "Character"
      }), d.jsx("button", {
        className: ot(v.menuButton, {
          [v.menuButtonSelected]: V === "path"
        }),
        onClick: () => {
          bt("path");
        },
        children: "Path"
      }), d.jsx("button", {
        className: ot(v.menuButton, {
          [v.menuButtonSelected]: V === "pool"
        }),
        onClick: () => {
          bt("pool"), setTimeout((() => {
            var M = document.getElementById("chatbox");
            M && (M.scrollTop = M.scrollHeight);
          }), 1);
        },
        children: "Pools"
      }), d.jsxs("button", {
        className: ot(v.menuButton, {
          [v.menuButtonSelected]: V === "chat"
        }),
        onClick: () => {
          bt("chat"), u(0), setTimeout((() => {
            var M = document.getElementById("chatbox");
            M && (M.scrollTop = M.scrollHeight);
          }), 1);
        },
        children: [ "Chat ", r ? `(${r})` : "" ]
      }), d.jsx("button", {
        className: ot(v.menuButton),
        style: {
          marginLeft: "auto",
          width: "3rem"
        },
        onClick: () => {
          H(null);
        },
        children: "Close"
      }) ]
    }), V === "character" && J && d.jsx(Jp, {
      player: J,
      updatePlayer: At,
      myChat: X,
      id: y,
      onRoll: () => {
        bt("chat");
      }
    }), V === "path" && J && d.jsx(bE, {
      player: J,
      updatePlayer: At,
      myChat: X,
      id: y
    }), !J && d.jsx(EE, {
      playerList: Dt,
      onOpen: M => {
        bt("character"), H(M);
      }
    }), V === "pool" && J && d.jsx(Qp, {
      chat: p,
      role: O,
      myChat: X,
      id: y,
      pools: te,
      player: J.name,
      gmData: k,
      players: Dt,
      chatOnly: I
    }), V === "chat" && J && d.jsxs(d.Fragment, {
      children: [ d.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          paddingTop: "0.5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem"
        },
        children: [ d.jsx("div", {
          className: v.header,
          children: "Chat"
        }), d.jsx("button", {
          className: v.chatCloseButton,
          onClick: () => {
            tt();
          },
          children: "Popover"
        }) ]
      }), d.jsx(_h, {
        chat: p,
        role: O,
        myChat: X,
        id: y,
        pools: te,
        player: J.name,
        gmData: k,
        players: Dt,
        chatOnly: I
      }) ]
    }) ]
  });
}

loadExternalGrimwildData().finally((() => {
  gg.createRoot(document.getElementById("root")).render(d.jsx(Et.StrictMode, {
    children: d.jsx(SE, {})
  }));
}));
