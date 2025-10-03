(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [95],
  {
    4485: function (e, t, r) {
      "use strict";
      let n, o, i, s, a;
      r.d(t, {
        b: function () {
          return eC;
        },
      });
      var c,
        l,
        u,
        h,
        f,
        d,
        p = r(6118),
        g = r(1894),
        y = r(1574),
        m = {
          exports: {},
        },
        v = {};
      m.exports = (function () {
        if (l) return v;
        l = 1;
        var e = Symbol.for("react.element"),
          t = Symbol.for("react.fragment"),
          r = Object.prototype.hasOwnProperty,
          n =
            p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
              .ReactCurrentOwner,
          o = {
            key: !0,
            ref: !0,
            __self: !0,
            __source: !0,
          };
        function i(t, i, s) {
          var a,
            c = {},
            l = null,
            u = null;
          for (a in (void 0 !== s && (l = "" + s),
          void 0 !== i.key && (l = "" + i.key),
          void 0 !== i.ref && (u = i.ref),
          i))
            r.call(i, a) && !o.hasOwnProperty(a) && (c[a] = i[a]);
          if (t && t.defaultProps)
            for (a in (i = t.defaultProps)) void 0 === c[a] && (c[a] = i[a]);
          return {
            $$typeof: e,
            type: t,
            key: l,
            ref: u,
            props: c,
            _owner: n.current,
          };
        }
        return (v.Fragment = t), (v.jsx = i), (v.jsxs = i), v;
      })();
      var b = m.exports,
        w = {
          exports: {},
        },
        _ = {},
        S = {
          exports: {},
        };
      S.exports = (function () {
        if (d) return f;
        d = 1;
        var e = h
          ? u
          : ((h = 1), (u = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"));
        function t() {}
        function r() {}
        return (
          (r.resetWarningCache = t),
          (f = function () {
            function n(t, r, n, o, i, s) {
              if (s !== e) {
                var a = Error(
                  "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
                );
                throw ((a.name = "Invariant Violation"), a);
              }
            }
            function o() {
              return n;
            }
            n.isRequired = n;
            var i = {
              array: n,
              bigint: n,
              bool: n,
              func: n,
              number: n,
              object: n,
              string: n,
              symbol: n,
              any: n,
              arrayOf: o,
              element: n,
              elementType: n,
              instanceOf: o,
              node: n,
              objectOf: o,
              oneOf: o,
              oneOfType: o,
              shape: o,
              exact: o,
              checkPropTypes: r,
              resetWarningCache: t,
            };
            return (i.PropTypes = i), i;
          })
        );
      })()();
      var E = S.exports;
      function C() {
        for (var e, t, r = 0, n = ""; r < arguments.length; )
          (e = arguments[r++]) &&
            (t = (function e(t) {
              var r,
                n,
                o = "";
              if ("string" == typeof t || "number" == typeof t) o += t;
              else if ("object" == typeof t) {
                if (Array.isArray(t))
                  for (r = 0; r < t.length; r++)
                    t[r] && (n = e(t[r])) && (o && (o += " "), (o += n));
                else for (r in t) t[r] && (o && (o += " "), (o += r));
              }
              return o;
            })(e)) &&
            (n && (n += " "), (n += t));
        return n;
      }
      let T = (function (e) {
        if (e.__esModule) return e;
        var t = e.default;
        if ("function" == typeof t) {
          var r = function e() {
            return this instanceof e
              ? Reflect.construct(t, arguments, this.constructor)
              : t.apply(this, arguments);
          };
          r.prototype = t.prototype;
        } else r = {};
        return (
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
          Object.keys(e).forEach(function (t) {
            var n = Object.getOwnPropertyDescriptor(e, t);
            Object.defineProperty(
              r,
              t,
              n.get
                ? n
                : {
                    enumerable: !0,
                    get: function () {
                      return e[t];
                    },
                  }
            );
          }),
          r
        );
      })(
        Object.freeze(
          Object.defineProperty(
            {
              __proto__: null,
              clsx: C,
              default: C,
            },
            Symbol.toStringTag,
            {
              value: "Module",
            }
          )
        )
      );
      var k = {},
        I = {};
      Object.defineProperty(I, "__esModule", {
        value: !0,
      }),
        (I.dontSetMe = function (e, t, r) {
          if (e[t])
            return Error(
              "Invalid prop "
                .concat(t, " passed to ")
                .concat(r, " - do not set this, set it on the child.")
            );
        }),
        (I.findInArray = function (e, t) {
          for (let r = 0, n = e.length; r < n; r++)
            if (t.apply(t, [e[r], r, e])) return e[r];
        }),
        (I.int = function (e) {
          return parseInt(e, 10);
        }),
        (I.isFunction = function (e) {
          return (
            "function" == typeof e ||
            "[object Function]" === Object.prototype.toString.call(e)
          );
        }),
        (I.isNum = function (e) {
          return "number" == typeof e && !isNaN(e);
        });
      var x = {};
      Object.defineProperty(x, "__esModule", {
        value: !0,
      }),
        (x.browserPrefixToKey = R),
        (x.browserPrefixToStyle = function (e, t) {
          return t ? "-".concat(t.toLowerCase(), "-").concat(e) : e;
        }),
        (x.default = void 0),
        (x.getPrefix = O);
      let P = ["Moz", "Webkit", "O", "ms"];
      function O() {
        var e;
        let t =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : "transform";
        if ("undefined" == typeof window) return "";
        let r =
          null === (e = window.document) ||
          void 0 === e ||
          null === (e = e.documentElement) ||
          void 0 === e
            ? void 0
            : e.style;
        if (!r || t in r) return "";
        for (let e = 0; e < P.length; e++) if (R(t, P[e]) in r) return P[e];
        return "";
      }
      function R(e, t) {
        return t
          ? "".concat(t).concat(
              (function (e) {
                let t = "",
                  r = !0;
                for (let n = 0; n < e.length; n++)
                  r
                    ? ((t += e[n].toUpperCase()), (r = !1))
                    : "-" === e[n]
                    ? (r = !0)
                    : (t += e[n]);
                return t;
              })(e)
            )
          : e;
      }
      (x.default = O()),
        Object.defineProperty(k, "__esModule", {
          value: !0,
        }),
        (k.addClassName = B),
        (k.addEvent = function (e, t, r, n) {
          if (!e) return;
          let o = {
            capture: !0,
            ...n,
          };
          e.addEventListener
            ? e.addEventListener(t, r, o)
            : e.attachEvent
            ? e.attachEvent("on" + t, r)
            : (e["on" + t] = r);
        }),
        (k.addUserSelectStyles = function (e) {
          if (!e) return;
          let t = e.getElementById("react-draggable-style-el");
          t ||
            (((t = e.createElement("style")).type = "text/css"),
            (t.id = "react-draggable-style-el"),
            (t.innerHTML = `.react-draggable-transparent-selection *::-moz-selection {all: inherit;}
`),
            (t.innerHTML += `.react-draggable-transparent-selection *::selection {all: inherit;}
`),
            e.getElementsByTagName("head")[0].appendChild(t)),
            e.body && B(e.body, "react-draggable-transparent-selection");
        }),
        (k.createCSSTransform = function (e, t) {
          let r = N(e, t, "px");
          return {
            [(0, D.browserPrefixToKey)("transform", D.default)]: r,
          };
        }),
        (k.createSVGTransform = function (e, t) {
          return N(e, t, "");
        }),
        (k.getTouch = function (e, t) {
          return (
            (e.targetTouches &&
              (0, I.findInArray)(e.targetTouches, (e) => t === e.identifier)) ||
            (e.changedTouches &&
              (0, I.findInArray)(e.changedTouches, (e) => t === e.identifier))
          );
        }),
        (k.getTouchIdentifier = function (e) {
          return e.targetTouches && e.targetTouches[0]
            ? e.targetTouches[0].identifier
            : e.changedTouches && e.changedTouches[0]
            ? e.changedTouches[0].identifier
            : void 0;
        }),
        (k.getTranslation = N),
        (k.innerHeight = function (e) {
          let t = e.clientHeight,
            r = e.ownerDocument.defaultView.getComputedStyle(e);
          return (
            (t -= (0, I.int)(r.paddingTop)), (t -= (0, I.int)(r.paddingBottom))
          );
        }),
        (k.innerWidth = function (e) {
          let t = e.clientWidth,
            r = e.ownerDocument.defaultView.getComputedStyle(e);
          return (
            (t -= (0, I.int)(r.paddingLeft)), (t -= (0, I.int)(r.paddingRight))
          );
        }),
        (k.matchesSelector = j),
        (k.matchesSelectorAndParentsTo = function (e, t, r) {
          let n = e;
          do {
            if (j(n, t)) return !0;
            if (n === r) break;
            n = n.parentNode;
          } while (n);
          return !1;
        }),
        (k.offsetXYFromParent = function (e, t, r) {
          let n =
            t === t.ownerDocument.body
              ? {
                  left: 0,
                  top: 0,
                }
              : t.getBoundingClientRect();
          return {
            x: (e.clientX + t.scrollLeft - n.left) / r,
            y: (e.clientY + t.scrollTop - n.top) / r,
          };
        }),
        (k.outerHeight = function (e) {
          let t = e.clientHeight,
            r = e.ownerDocument.defaultView.getComputedStyle(e);
          return (
            t + ((0, I.int)(r.borderTopWidth) + (0, I.int)(r.borderBottomWidth))
          );
        }),
        (k.outerWidth = function (e) {
          let t = e.clientWidth,
            r = e.ownerDocument.defaultView.getComputedStyle(e);
          return (
            t + ((0, I.int)(r.borderLeftWidth) + (0, I.int)(r.borderRightWidth))
          );
        }),
        (k.removeClassName = L),
        (k.removeEvent = function (e, t, r, n) {
          if (!e) return;
          let o = {
            capture: !0,
            ...n,
          };
          e.removeEventListener
            ? e.removeEventListener(t, r, o)
            : e.detachEvent
            ? e.detachEvent("on" + t, r)
            : (e["on" + t] = null);
        }),
        (k.removeUserSelectStyles = function (e) {
          if (e)
            try {
              if (
                (e.body && L(e.body, "react-draggable-transparent-selection"),
                e.selection)
              )
                e.selection.empty();
              else {
                let t = (e.defaultView || window).getSelection();
                t && "Caret" !== t.type && t.removeAllRanges();
              }
            } catch {}
        });
      var D = (function (e, t) {
        if (e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return {
            default: e,
          };
        var r = U(void 0);
        if (r && r.has(e)) return r.get(e);
        var n = {},
          o = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i in e)
          if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
            var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
            s && (s.get || s.set)
              ? Object.defineProperty(n, i, s)
              : (n[i] = e[i]);
          }
        return (n.default = e), r && r.set(e, n), n;
      })(x);
      function U(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          r = new WeakMap();
        return (U = function (e) {
          return e ? r : t;
        })(e);
      }
      let A = "";
      function j(e, t) {
        return (
          A ||
            (A = (0, I.findInArray)(
              [
                "matches",
                "webkitMatchesSelector",
                "mozMatchesSelector",
                "msMatchesSelector",
                "oMatchesSelector",
              ],
              function (t) {
                return (0, I.isFunction)(e[t]);
              }
            )),
          !!(0, I.isFunction)(e[A]) && e[A](t)
        );
      }
      function N(e, t, r) {
        let { x: n, y: o } = e,
          i = "translate(".concat(n).concat(r, ",").concat(o).concat(r, ")");
        if (t) {
          let e = "".concat("string" == typeof t.x ? t.x : t.x + r),
            n = "".concat("string" == typeof t.y ? t.y : t.y + r);
          i = "translate(".concat(e, ", ").concat(n, ")") + i;
        }
        return i;
      }
      function B(e, t) {
        e.classList
          ? e.classList.add(t)
          : e.className.match(new RegExp("(?:^|\\s)".concat(t, "(?!\\S)"))) ||
            (e.className += " ".concat(t));
      }
      function L(e, t) {
        e.classList
          ? e.classList.remove(t)
          : (e.className = e.className.replace(
              RegExp("(?:^|\\s)".concat(t, "(?!\\S)"), "g"),
              ""
            ));
      }
      var M = {};
      function F(e) {
        let t = e.findDOMNode();
        if (!t) throw Error("<DraggableCore>: Unmounted during event!");
        return t;
      }
      Object.defineProperty(M, "__esModule", {
        value: !0,
      }),
        (M.canDragX = function (e) {
          return "both" === e.props.axis || "x" === e.props.axis;
        }),
        (M.canDragY = function (e) {
          return "both" === e.props.axis || "y" === e.props.axis;
        }),
        (M.createCoreData = function (e, t, r) {
          let n = !(0, I.isNum)(e.lastX),
            o = F(e);
          return n
            ? {
                node: o,
                deltaX: 0,
                deltaY: 0,
                lastX: t,
                lastY: r,
                x: t,
                y: r,
              }
            : {
                node: o,
                deltaX: t - e.lastX,
                deltaY: r - e.lastY,
                lastX: e.lastX,
                lastY: e.lastY,
                x: t,
                y: r,
              };
        }),
        (M.createDraggableData = function (e, t) {
          let r = e.props.scale;
          return {
            node: t.node,
            x: e.state.x + t.deltaX / r,
            y: e.state.y + t.deltaY / r,
            deltaX: t.deltaX / r,
            deltaY: t.deltaY / r,
            lastX: e.state.x,
            lastY: e.state.y,
          };
        }),
        (M.getBoundPosition = function (e, t, r) {
          var n;
          if (!e.props.bounds) return [t, r];
          let { bounds: o } = e.props;
          o =
            "string" == typeof o
              ? o
              : {
                  left: (n = o).left,
                  top: n.top,
                  right: n.right,
                  bottom: n.bottom,
                };
          let i = F(e);
          if ("string" == typeof o) {
            let e;
            let { ownerDocument: t } = i,
              r = t.defaultView;
            if (
              !(
                (e =
                  "parent" === o ? i.parentNode : t.querySelector(o)) instanceof
                r.HTMLElement
              )
            )
              throw Error(
                'Bounds selector "' + o + '" could not find an element.'
              );
            let n = r.getComputedStyle(i),
              s = r.getComputedStyle(e);
            o = {
              left:
                -i.offsetLeft +
                (0, I.int)(s.paddingLeft) +
                (0, I.int)(n.marginLeft),
              top:
                -i.offsetTop +
                (0, I.int)(s.paddingTop) +
                (0, I.int)(n.marginTop),
              right:
                (0, k.innerWidth)(e) -
                (0, k.outerWidth)(i) -
                i.offsetLeft +
                (0, I.int)(s.paddingRight) -
                (0, I.int)(n.marginRight),
              bottom:
                (0, k.innerHeight)(e) -
                (0, k.outerHeight)(i) -
                i.offsetTop +
                (0, I.int)(s.paddingBottom) -
                (0, I.int)(n.marginBottom),
            };
          }
          return (
            (0, I.isNum)(o.right) && (t = Math.min(t, o.right)),
            (0, I.isNum)(o.bottom) && (r = Math.min(r, o.bottom)),
            (0, I.isNum)(o.left) && (t = Math.max(t, o.left)),
            (0, I.isNum)(o.top) && (r = Math.max(r, o.top)),
            [t, r]
          );
        }),
        (M.getControlPosition = function (e, t, r) {
          let n = "number" == typeof t ? (0, k.getTouch)(e, t) : null;
          if ("number" == typeof t && !n) return null;
          let o = F(r),
            i = r.props.offsetParent || o.offsetParent || o.ownerDocument.body;
          return (0, k.offsetXYFromParent)(n || e, i, r.props.scale);
        }),
        (M.snapToGrid = function (e, t, r) {
          return [Math.round(t / e[0]) * e[0], Math.round(r / e[1]) * e[1]];
        });
      var z = {},
        $ = {};
      Object.defineProperty($, "__esModule", {
        value: !0,
      }),
        ($.default = function () {}),
        Object.defineProperty(z, "__esModule", {
          value: !0,
        }),
        (z.default = void 0);
      var W = (function (e, t) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return {
              default: e,
            };
          var r = J(void 0);
          if (r && r.has(e)) return r.get(e);
          var n = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
              var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
              s && (s.get || s.set)
                ? Object.defineProperty(n, i, s)
                : (n[i] = e[i]);
            }
          return (n.default = e), r && r.set(e, n), n;
        })(p),
        H = X(E),
        q = X(g),
        V = X($);
      function X(e) {
        return e && e.__esModule
          ? e
          : {
              default: e,
            };
      }
      function J(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          r = new WeakMap();
        return (J = function (e) {
          return e ? r : t;
        })(e);
      }
      function K(e, t, r) {
        var n;
        return (
          (t =
            "symbol" ==
            typeof (n = (function (e, t) {
              if ("object" != typeof e || null === e) return e;
              var r = e[Symbol.toPrimitive];
              if (void 0 !== r) {
                var n = r.call(e, t || "default");
                if ("object" != typeof n) return n;
                throw TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === t ? String : Number)(e);
            })(t, "string"))
              ? n
              : String(n)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      let Y = {
          touch: {
            start: "touchstart",
            move: "touchmove",
            stop: "touchend",
          },
          mouse: {
            start: "mousedown",
            move: "mousemove",
            stop: "mouseup",
          },
        },
        G = Y.mouse,
        Z = class extends W.Component {
          constructor() {
            super(...arguments),
              K(this, "dragging", !1),
              K(this, "lastX", NaN),
              K(this, "lastY", NaN),
              K(this, "touchIdentifier", null),
              K(this, "mounted", !1),
              K(this, "handleDragStart", (e) => {
                if (
                  (this.props.onMouseDown(e),
                  !this.props.allowAnyClick &&
                    "number" == typeof e.button &&
                    0 !== e.button)
                )
                  return !1;
                let t = this.findDOMNode();
                if (!t || !t.ownerDocument || !t.ownerDocument.body)
                  throw Error("<DraggableCore> not mounted on DragStart!");
                let { ownerDocument: r } = t;
                if (
                  this.props.disabled ||
                  !(e.target instanceof r.defaultView.Node) ||
                  (this.props.handle &&
                    !(0, k.matchesSelectorAndParentsTo)(
                      e.target,
                      this.props.handle,
                      t
                    )) ||
                  (this.props.cancel &&
                    (0, k.matchesSelectorAndParentsTo)(
                      e.target,
                      this.props.cancel,
                      t
                    ))
                )
                  return;
                "touchstart" === e.type && e.preventDefault();
                let n = (0, k.getTouchIdentifier)(e);
                this.touchIdentifier = n;
                let o = (0, M.getControlPosition)(e, n, this);
                if (null == o) return;
                let { x: i, y: s } = o,
                  a = (0, M.createCoreData)(this, i, s);
                (0, V.default)("DraggableCore: handleDragStart: %j", a),
                  (0, V.default)("calling", this.props.onStart),
                  !1 === this.props.onStart(e, a) ||
                    !1 === this.mounted ||
                    (this.props.enableUserSelectHack &&
                      (0, k.addUserSelectStyles)(r),
                    (this.dragging = !0),
                    (this.lastX = i),
                    (this.lastY = s),
                    (0, k.addEvent)(r, G.move, this.handleDrag),
                    (0, k.addEvent)(r, G.stop, this.handleDragStop));
              }),
              K(this, "handleDrag", (e) => {
                let t = (0, M.getControlPosition)(
                  e,
                  this.touchIdentifier,
                  this
                );
                if (null == t) return;
                let { x: r, y: n } = t;
                if (Array.isArray(this.props.grid)) {
                  let e = r - this.lastX,
                    t = n - this.lastY;
                  if (
                    (([e, t] = (0, M.snapToGrid)(this.props.grid, e, t)),
                    !e && !t)
                  )
                    return;
                  (r = this.lastX + e), (n = this.lastY + t);
                }
                let o = (0, M.createCoreData)(this, r, n);
                if (
                  ((0, V.default)("DraggableCore: handleDrag: %j", o),
                  !1 === this.props.onDrag(e, o) || !1 === this.mounted)
                ) {
                  try {
                    this.handleDragStop(new MouseEvent("mouseup"));
                  } catch {
                    let e = document.createEvent("MouseEvents");
                    e.initMouseEvent(
                      "mouseup",
                      !0,
                      !0,
                      window,
                      0,
                      0,
                      0,
                      0,
                      0,
                      !1,
                      !1,
                      !1,
                      !1,
                      0,
                      null
                    ),
                      this.handleDragStop(e);
                  }
                  return;
                }
                (this.lastX = r), (this.lastY = n);
              }),
              K(this, "handleDragStop", (e) => {
                if (!this.dragging) return;
                let t = (0, M.getControlPosition)(
                  e,
                  this.touchIdentifier,
                  this
                );
                if (null == t) return;
                let { x: r, y: n } = t;
                if (Array.isArray(this.props.grid)) {
                  let e = r - this.lastX || 0,
                    t = n - this.lastY || 0;
                  ([e, t] = (0, M.snapToGrid)(this.props.grid, e, t)),
                    (r = this.lastX + e),
                    (n = this.lastY + t);
                }
                let o = (0, M.createCoreData)(this, r, n);
                if (!1 === this.props.onStop(e, o) || !1 === this.mounted)
                  return !1;
                let i = this.findDOMNode();
                i &&
                  this.props.enableUserSelectHack &&
                  (0, k.removeUserSelectStyles)(i.ownerDocument),
                  (0, V.default)("DraggableCore: handleDragStop: %j", o),
                  (this.dragging = !1),
                  (this.lastX = NaN),
                  (this.lastY = NaN),
                  i &&
                    ((0, V.default)("DraggableCore: Removing handlers"),
                    (0, k.removeEvent)(
                      i.ownerDocument,
                      G.move,
                      this.handleDrag
                    ),
                    (0, k.removeEvent)(
                      i.ownerDocument,
                      G.stop,
                      this.handleDragStop
                    ));
              }),
              K(
                this,
                "onMouseDown",
                (e) => ((G = Y.mouse), this.handleDragStart(e))
              ),
              K(
                this,
                "onMouseUp",
                (e) => ((G = Y.mouse), this.handleDragStop(e))
              ),
              K(
                this,
                "onTouchStart",
                (e) => ((G = Y.touch), this.handleDragStart(e))
              ),
              K(
                this,
                "onTouchEnd",
                (e) => ((G = Y.touch), this.handleDragStop(e))
              );
          }
          componentDidMount() {
            this.mounted = !0;
            let e = this.findDOMNode();
            e &&
              (0, k.addEvent)(e, Y.touch.start, this.onTouchStart, {
                passive: !1,
              });
          }
          componentWillUnmount() {
            this.mounted = !1;
            let e = this.findDOMNode();
            if (e) {
              let { ownerDocument: t } = e;
              (0, k.removeEvent)(t, Y.mouse.move, this.handleDrag),
                (0, k.removeEvent)(t, Y.touch.move, this.handleDrag),
                (0, k.removeEvent)(t, Y.mouse.stop, this.handleDragStop),
                (0, k.removeEvent)(t, Y.touch.stop, this.handleDragStop),
                (0, k.removeEvent)(e, Y.touch.start, this.onTouchStart, {
                  passive: !1,
                }),
                this.props.enableUserSelectHack &&
                  (0, k.removeUserSelectStyles)(t);
            }
          }
          findDOMNode() {
            var e, t;
            return null !== (e = this.props) && void 0 !== e && e.nodeRef
              ? null === (t = this.props) ||
                void 0 === t ||
                null === (t = t.nodeRef) ||
                void 0 === t
                ? void 0
                : t.current
              : q.default.findDOMNode(this);
          }
          render() {
            return W.cloneElement(W.Children.only(this.props.children), {
              onMouseDown: this.onMouseDown,
              onMouseUp: this.onMouseUp,
              onTouchEnd: this.onTouchEnd,
            });
          }
        };
      (z.default = Z),
        K(Z, "displayName", "DraggableCore"),
        K(Z, "propTypes", {
          allowAnyClick: H.default.bool,
          children: H.default.node.isRequired,
          disabled: H.default.bool,
          enableUserSelectHack: H.default.bool,
          offsetParent: function (e, t) {
            if (e[t] && 1 !== e[t].nodeType)
              throw Error("Draggable's offsetParent must be a DOM Node.");
          },
          grid: H.default.arrayOf(H.default.number),
          handle: H.default.string,
          cancel: H.default.string,
          nodeRef: H.default.object,
          onStart: H.default.func,
          onDrag: H.default.func,
          onStop: H.default.func,
          onMouseDown: H.default.func,
          scale: H.default.number,
          className: I.dontSetMe,
          style: I.dontSetMe,
          transform: I.dontSetMe,
        }),
        K(Z, "defaultProps", {
          allowAnyClick: !1,
          disabled: !1,
          enableUserSelectHack: !0,
          onStart: function () {},
          onDrag: function () {},
          onStop: function () {},
          onMouseDown: function () {},
          scale: 1,
        }),
        (function (e) {
          Object.defineProperty(e, "__esModule", {
            value: !0,
          }),
            Object.defineProperty(e, "DraggableCore", {
              enumerable: !0,
              get: function () {
                return i.default;
              },
            }),
            (e.default = void 0);
          var t = (function (e, t) {
              if (e && e.__esModule) return e;
              if (
                null === e ||
                ("object" != typeof e && "function" != typeof e)
              )
                return {
                  default: e,
                };
              var r = c(void 0);
              if (r && r.has(e)) return r.get(e);
              var n = {},
                o = Object.defineProperty && Object.getOwnPropertyDescriptor;
              for (var i in e)
                if (
                  "default" !== i &&
                  Object.prototype.hasOwnProperty.call(e, i)
                ) {
                  var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
                  s && (s.get || s.set)
                    ? Object.defineProperty(n, i, s)
                    : (n[i] = e[i]);
                }
              return (n.default = e), r && r.set(e, n), n;
            })(p),
            r = a(E),
            n = a(g),
            o = a(T),
            i = a(z),
            s = a($);
          function a(e) {
            return e && e.__esModule
              ? e
              : {
                  default: e,
                };
          }
          function c(e) {
            if ("function" != typeof WeakMap) return null;
            var t = new WeakMap(),
              r = new WeakMap();
            return (c = function (e) {
              return e ? r : t;
            })(e);
          }
          function l() {
            return (l = Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var n in r)
                      Object.prototype.hasOwnProperty.call(r, n) &&
                        (e[n] = r[n]);
                  }
                  return e;
                }).apply(this, arguments);
          }
          function u(e, t, r) {
            var n;
            return (
              (t =
                "symbol" ==
                typeof (n = (function (e, t) {
                  if ("object" != typeof e || null === e) return e;
                  var r = e[Symbol.toPrimitive];
                  if (void 0 !== r) {
                    var n = r.call(e, t || "default");
                    if ("object" != typeof n) return n;
                    throw TypeError(
                      "@@toPrimitive must return a primitive value."
                    );
                  }
                  return ("string" === t ? String : Number)(e);
                })(t, "string"))
                  ? n
                  : String(n)) in e
                ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[t] = r),
              e
            );
          }
          class h extends t.Component {
            static getDerivedStateFromProps(e, t) {
              let { position: r } = e,
                { prevPropsPosition: n } = t;
              return r && (!n || r.x !== n.x || r.y !== n.y)
                ? ((0, s.default)("Draggable: getDerivedStateFromProps %j", {
                    position: r,
                    prevPropsPosition: n,
                  }),
                  {
                    x: r.x,
                    y: r.y,
                    prevPropsPosition: {
                      ...r,
                    },
                  })
                : null;
            }
            constructor(e) {
              super(e),
                u(this, "onDragStart", (e, t) => {
                  if (
                    ((0, s.default)("Draggable: onDragStart: %j", t),
                    !1 ===
                      this.props.onStart(
                        e,
                        (0, M.createDraggableData)(this, t)
                      ))
                  )
                    return !1;
                  this.setState({
                    dragging: !0,
                    dragged: !0,
                  });
                }),
                u(this, "onDrag", (e, t) => {
                  if (!this.state.dragging) return !1;
                  (0, s.default)("Draggable: onDrag: %j", t);
                  let r = (0, M.createDraggableData)(this, t),
                    n = {
                      x: r.x,
                      y: r.y,
                      slackX: 0,
                      slackY: 0,
                    };
                  if (this.props.bounds) {
                    let { x: e, y: t } = n;
                    (n.x += this.state.slackX), (n.y += this.state.slackY);
                    let [o, i] = (0, M.getBoundPosition)(this, n.x, n.y);
                    (n.x = o),
                      (n.y = i),
                      (n.slackX = this.state.slackX + (e - n.x)),
                      (n.slackY = this.state.slackY + (t - n.y)),
                      (r.x = n.x),
                      (r.y = n.y),
                      (r.deltaX = n.x - this.state.x),
                      (r.deltaY = n.y - this.state.y);
                  }
                  if (!1 === this.props.onDrag(e, r)) return !1;
                  this.setState(n);
                }),
                u(this, "onDragStop", (e, t) => {
                  if (
                    !this.state.dragging ||
                    !1 ===
                      this.props.onStop(e, (0, M.createDraggableData)(this, t))
                  )
                    return !1;
                  (0, s.default)("Draggable: onDragStop: %j", t);
                  let r = {
                    dragging: !1,
                    slackX: 0,
                    slackY: 0,
                  };
                  if (this.props.position) {
                    let { x: e, y: t } = this.props.position;
                    (r.x = e), (r.y = t);
                  }
                  this.setState(r);
                }),
                (this.state = {
                  dragging: !1,
                  dragged: !1,
                  x: e.position ? e.position.x : e.defaultPosition.x,
                  y: e.position ? e.position.y : e.defaultPosition.y,
                  prevPropsPosition: {
                    ...e.position,
                  },
                  slackX: 0,
                  slackY: 0,
                  isElementSVG: !1,
                }),
                e.position &&
                  !(e.onDrag || e.onStop) &&
                  console.warn(
                    "A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element."
                  );
            }
            componentDidMount() {
              void 0 !== window.SVGElement &&
                this.findDOMNode() instanceof window.SVGElement &&
                this.setState({
                  isElementSVG: !0,
                });
            }
            componentWillUnmount() {
              this.setState({
                dragging: !1,
              });
            }
            findDOMNode() {
              var e, t;
              return null !==
                (e =
                  null === (t = this.props) ||
                  void 0 === t ||
                  null === (t = t.nodeRef) ||
                  void 0 === t
                    ? void 0
                    : t.current) && void 0 !== e
                ? e
                : n.default.findDOMNode(this);
            }
            render() {
              let {
                  axis: e,
                  bounds: r,
                  children: n,
                  defaultPosition: s,
                  defaultClassName: a,
                  defaultClassNameDragging: c,
                  defaultClassNameDragged: u,
                  position: h,
                  positionOffset: f,
                  scale: d,
                  ...p
                } = this.props,
                g = {},
                y = null,
                m = !h || this.state.dragging,
                v = h || s,
                b = {
                  x: (0, M.canDragX)(this) && m ? this.state.x : v.x,
                  y: (0, M.canDragY)(this) && m ? this.state.y : v.y,
                };
              this.state.isElementSVG
                ? (y = (0, k.createSVGTransform)(b, f))
                : (g = (0, k.createCSSTransform)(b, f));
              let w = (0, o.default)(n.props.className || "", a, {
                [c]: this.state.dragging,
                [u]: this.state.dragged,
              });
              return t.createElement(
                i.default,
                l({}, p, {
                  onStart: this.onDragStart,
                  onDrag: this.onDrag,
                  onStop: this.onDragStop,
                }),
                t.cloneElement(t.Children.only(n), {
                  className: w,
                  style: {
                    ...n.props.style,
                    ...g,
                  },
                  transform: y,
                })
              );
            }
          }
          (e.default = h),
            u(h, "displayName", "Draggable"),
            u(h, "propTypes", {
              ...i.default.propTypes,
              axis: r.default.oneOf(["both", "x", "y", "none"]),
              bounds: r.default.oneOfType([
                r.default.shape({
                  left: r.default.number,
                  right: r.default.number,
                  top: r.default.number,
                  bottom: r.default.number,
                }),
                r.default.string,
                r.default.oneOf([!1]),
              ]),
              defaultClassName: r.default.string,
              defaultClassNameDragging: r.default.string,
              defaultClassNameDragged: r.default.string,
              defaultPosition: r.default.shape({
                x: r.default.number,
                y: r.default.number,
              }),
              positionOffset: r.default.shape({
                x: r.default.oneOfType([r.default.number, r.default.string]),
                y: r.default.oneOfType([r.default.number, r.default.string]),
              }),
              position: r.default.shape({
                x: r.default.number,
                y: r.default.number,
              }),
              className: I.dontSetMe,
              style: I.dontSetMe,
              transform: I.dontSetMe,
            }),
            u(h, "defaultProps", {
              ...i.default.defaultProps,
              axis: "both",
              bounds: !1,
              defaultClassName: "react-draggable",
              defaultClassNameDragging: "react-draggable-dragging",
              defaultClassNameDragged: "react-draggable-dragged",
              defaultPosition: {
                x: 0,
                y: 0,
              },
              scale: 1,
            });
        })(_);
      let { default: Q, DraggableCore: ee } = _;
      (w.exports = Q), (w.exports.default = Q), (w.exports.DraggableCore = ee);
      let et =
        (c = w.exports) &&
        c.__esModule &&
        Object.prototype.hasOwnProperty.call(c, "default")
          ? c.default
          : c;
      var er =
          (((n = er || {}).Open = "openPromotionPopup"),
          (n.Close = "closePromotionPopup"),
          n),
        en =
          (((o = en || {}).None = "None"),
          (o.Preview = "Preview"),
          (o.Ongoing = "Ongoing"),
          (o.Ended = "Ended"),
          (o.Closed = "Closed"),
          o),
        eo =
          (((i = eo || {}).default = "default"),
          (i.football = "football"),
          (i.baccarat = "baccarat"),
          (i.blackjack = "blackjack"),
          (i.tournament = "tournament"),
          i),
        ei =
          (((s = ei || {}).Turnover = "Turnover"),
          (s.Payout = "Payout"),
          (s.Odds = "Odds"),
          s),
        es =
          (((a = es || {}).promotion = "promotion"),
          (a.godziDrop = "godziDrop"),
          a);
      let ea = new Set([en.Preview, en.Ongoing]),
        ec = (e, t, r) =>
          `/${r === eo.tournament ? "tournament" : "promotion"}/frontend/${
            t || "en"
          }/?token=${e}`,
        el = (e, t) => {
          let r = `btn_tournament${t || ""}.png`;
          return `https://5cyl3vj1254k81w.highplayfky.com//promotion/${e}/${r}`;
        },
        eu = () =>
          "localhost" === window.location.hostname ||
          "127.0.0.1" === window.location.hostname,
        eh = new Date(),
        ef = new Date(new Date().setDate(eh.getDate() + 1)),
        ed = {
          promotionTheme: eo.tournament.toString(),
          hiddenRuleToggle: !1,
          playerRank: "4",
          playerId: "Fun979455USD_AS",
          playerName: "Neil3211",
          promotionStatus: "Ongoing",
          promotionStartTime: eh.toISOString(),
          promotionEndTime: ef.toISOString(),
          currency: "USD",
          topPrize: "1000",
          sumPrize: "1700",
          playerScore: "455",
          currencyToPointsRatioList: [
            {
              currency: "EUR",
              points: 100,
            },
          ],
          distributionInfoList: [
            {
              count: 1,
              prize: 1e3,
            },
            {
              count: 1,
              prize: 800,
            },
            {
              count: 1,
              prize: 600,
            },
            {
              count: 2,
              prize: 200,
            },
            {
              count: 15,
              prize: 100,
            },
            {
              count: 980,
              prize: 10,
            },
          ],
          rankingCount: 18,
          oddsThreshold: 1.5,
          minBetThreshold: 10,
          ruleTarget: ei.Payout.toString(),
          promotionGameNames: ["Hearth Stone", "League of Legends"],
          rankingInfoList: [],
          promotionId: 0,
          rankingLevelPlan: [
            {
              name: "Silver",
              lowPoints: 300,
              highPoints: 400,
              multiplier: 1,
            },
            {
              name: "Gold",
              lowPoints: 401,
              highPoints: 500,
              multiplier: 1.2,
            },
            {
              name: "Diamond",
              lowPoints: 501,
              highPoints: 600,
              multiplier: 1.5,
            },
            {
              name: "VIP",
              lowPoints: 601,
              multiplier: 2,
            },
          ],
          promotionStatus: en.Ongoing.toString(),
          rankingInfoList: [
            {
              playerId: "Neil",
              playerName: "Neil",
              score: "878",
            },
            {
              playerId: "Kevin",
              playerName: "Kevin",
              score: "787",
            },
            {
              playerId: "Fun979455USD_AS",
              playerName: "Fun979455USD_AS",
              score: "666",
            },
            {
              playerId: "Funky673724234_sdfnkjshf",
              playerName: "Funky673724234_sdfnkjshf",
              score: "5",
            },
            {
              playerId: "Funky_sdfnkjshf_2344356546457547",
              playerName: "Funky_sdfnkjshf_2344356546457547",
              score: "0",
            },
            {
              playerId: "324234234234324",
              playerName: "324234234234324",
              score: "",
            },
          ],
        },
        ep = ({
          promotionStartTime: e,
          promotionEndTime: t,
          promotionStatus: r,
          promotionTheme: n,
          ruleTarget: o,
          ...i
        }) => ({
          ...i,
          promotionStartTime: new Date(e),
          promotionEndTime: new Date(t),
          promotionStatus: en[r],
          promotionTheme: eo[n.toLowerCase()] || eo.default,
          ruleTarget: ei[o],
          lastUpdatedTime: new Date(),
        });
      async function eg(e) {
        if (eu()) return ep(ed);
        let t = await fetch(
            "/api/promotionService/Promotion/GetPromotionInfo",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                Authorization: e,
              },
            }
          ),
          r = await t.json();
        if (200 !== t.status) throw t;
        return ep(r);
      }
      en.Closed.toString(), en.Ongoing.toString(), en.None.toString();
      let ey = new Date(),
        em = new Date(new Date().setMinutes(ey.getMinutes() + 1));
      ey.toISOString(), em.toISOString(), en.Ongoing.toString();
      let ev = new Date(),
        eb = (e) => ({
          hitId: ev.toISOString(),
          hitTime: ev.toISOString(),
          fpId: 0,
          playerId: "Fun979455USD_AS" + (e || ""),
          playerName: "Fun979455USD_AS" + (e || ""),
          sourceCurrency: "string",
          targetCurrency: "string",
          prize: "string",
          targetCurrencyPayout: 0,
          sourceCurrencyPayout: 0,
        });
      Array(10)
        .fill(null)
        .map((e, t) => ({
          ...eb(t),
          hitId: t.toString(),
        }));
      let ew = (e, t) => {
          let [r, n] = (0, p.useState)(en.None),
            [o, i] = (0, p.useState)(eo.default),
            [s, a] = (0, p.useState)(""),
            [c, l] = (0, p.useState)(!1),
            u = (0, p.useRef)(null),
            h = (0, p.useCallback)(
              ({ promotionTheme: e = eo.default, playerRank: t }) => {
                let r = Number(t);
                a(el(e, r > 0 && r < 4 ? r : void 0));
              },
              []
            ),
            f = (0, p.useCallback)(
              function ({ promotionStatus: e, promotionTheme: r }, o) {
                let s = en[e];
                s && n(s);
                let a = eo[r];
                a && i(a), o && ea.has(s) && !t && l(!0);
              },
              [t]
            ),
            d = (0, p.useCallback)(
              async (e, t = !1) => {
                try {
                  let r = await eg(e);
                  h(r), f(r, t);
                } catch {}
              },
              [h, f]
            );
          return (
            (0, p.useEffect)(() => {
              e && d(e, !0);
            }, [e, d]),
            (0, p.useEffect)(() => {
              ea.has(r) && !t && l(!0);
            }, [r, t]),
            (0, p.useEffect)(() => {
              let e = (e) => {
                e.data.name === er.Close.toString() && l(!1);
              };
              return (
                window.addEventListener("message", e),
                () => {
                  window.removeEventListener("message", e);
                }
              );
            }, []),
            {
              promotionStatus: r,
              promotionTheme: o,
              isOpen: c,
              onOpen: () => {
                u.current &&
                  u.current.contentWindow &&
                  (u.current.contentWindow.postMessage(
                    {
                      name: er.Open,
                      sender: es.promotion,
                    },
                    "*"
                  ),
                  l(!0),
                  d(e));
              },
              iframeRef: u,
              iconLink: s,
            }
          );
        },
        e_ = (0, y.iv)([
          "-webkit-tap-highlight-color:transparent;-webkit-text-size-adjust:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none;",
        ]),
        eS = y.ZP.div.withConfig({
          displayName: "PromotionButtonWrapper",
          componentId: "sc-6ro195-0",
        })(
          [
            "box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;width:100%;height:100%;cursor:pointer;display:flex;justify-content:center;align-items:center;.promotion_section_icon{box-sizing:border-box;width:100%;height:auto;pointer-events:none;",
            "}",
          ],
          e_
        ),
        eE = y.ZP.iframe.withConfig({
          displayName: "PromotionPopupWrapper",
          componentId: "sc-1grkqoc-0",
        })([
          "width:100%;height:100%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);margin:0;padding:0;border:0;font-size:100%;box-sizing:border-box;&.promotion_section_show{display:block;}&.promotion_section_hidden{display:none;}",
        ]),
        eC = ({
          token: e,
          lang: t,
          bounds: r = "parent",
          className: n = "",
          hideCountdown: o = !1,
        }) => {
          let [i, s] = (0, p.useState)(!1),
            {
              isOpen: a,
              onOpen: c,
              promotionStatus: l,
              iframeRef: u,
              iconLink: h,
              promotionTheme: f,
            } = ew(e, o),
            d = (0, p.useRef)();
          return e && l !== en.None
            ? b.jsxs(b.Fragment, {
                children: [
                  b.jsx(et, {
                    bounds: r,
                    onDrag: () => {
                      i ||
                        d.current ||
                        (d.current = window.setTimeout(() => {
                          s(!0);
                        }, 100));
                    },
                    onStop: () => {
                      window.clearTimeout(d.current),
                        (d.current = void 0),
                        i || c(),
                        s(!1);
                    },
                    onMouseDown: (e) => {
                      e.preventDefault();
                    },
                    children: b.jsx(eS, {
                      className: `promotion_section_button ${n}`,
                      children: b.jsx("img", {
                        className: "promotion_section_icon",
                        src: h,
                        alt: "",
                      }),
                    }),
                  }),
                  b.jsx(eE, {
                    ref: u,
                    src: ec(e, t, f),
                    title: "promotion popup",
                    id: "promotion-popup",
                    className: `promotion_section_popup
            ${a ? "promotion_section_show" : "promotion_section_hidden"}
            `,
                  }),
                ],
              })
            : null;
        };
    },
    5203: function (e, t, r) {
      "use strict";
      function n(e, t, r) {
        e.setUint32(t, Math.floor(r / 4294967296)), e.setUint32(t + 4, r);
      }
      function o(e, t) {
        return 4294967296 * e.getInt32(t) + e.getUint32(t + 4);
      }
      r.d(t, {
        e: function () {
          return H;
        },
      });
      var i,
        s,
        a,
        c,
        l = r(4122),
        u =
          (void 0 === l ||
            (null === (i = null == l ? void 0 : l.env) || void 0 === i
              ? void 0
              : i.TEXT_ENCODING) !== "never") &&
          "undefined" != typeof TextEncoder &&
          "undefined" != typeof TextDecoder;
      function h(e) {
        for (var t = e.length, r = 0, n = 0; n < t; ) {
          var o = e.charCodeAt(n++);
          if ((4294967168 & o) == 0) {
            r++;
            continue;
          }
          if ((4294965248 & o) == 0) r += 2;
          else {
            if (o >= 55296 && o <= 56319 && n < t) {
              var i = e.charCodeAt(n);
              (64512 & i) == 56320 &&
                (++n, (o = ((1023 & o) << 10) + (1023 & i) + 65536));
            }
            (4294901760 & o) == 0 ? (r += 3) : (r += 4);
          }
        }
        return r;
      }
      var f = u ? new TextEncoder() : void 0,
        d = u
          ? void 0 !== l &&
            (null === (s = null == l ? void 0 : l.env) || void 0 === s
              ? void 0
              : s.TEXT_ENCODING) !== "force"
            ? 200
            : 0
          : 4294967295,
        p = (null == f ? void 0 : f.encodeInto)
          ? function (e, t, r) {
              f.encodeInto(e, t.subarray(r));
            }
          : function (e, t, r) {
              t.set(f.encode(e), r);
            };
      function g(e, t, r) {
        for (var n = t, o = n + r, i = [], s = ""; n < o; ) {
          var a = e[n++];
          if ((128 & a) == 0) i.push(a);
          else if ((224 & a) == 192) {
            var c = 63 & e[n++];
            i.push(((31 & a) << 6) | c);
          } else if ((240 & a) == 224) {
            var c = 63 & e[n++],
              l = 63 & e[n++];
            i.push(((31 & a) << 12) | (c << 6) | l);
          } else if ((248 & a) == 240) {
            var c = 63 & e[n++],
              l = 63 & e[n++],
              u = ((7 & a) << 18) | (c << 12) | (l << 6) | (63 & e[n++]);
            u > 65535 &&
              ((u -= 65536),
              i.push(((u >>> 10) & 1023) | 55296),
              (u = 56320 | (1023 & u))),
              i.push(u);
          } else i.push(a);
          i.length >= 4096 &&
            ((s += String.fromCharCode.apply(String, i)), (i.length = 0));
        }
        return i.length > 0 && (s += String.fromCharCode.apply(String, i)), s;
      }
      var y = u ? new TextDecoder() : null,
        m = u
          ? void 0 !== l &&
            (null === (a = null == l ? void 0 : l.env) || void 0 === a
              ? void 0
              : a.TEXT_DECODER) !== "force"
            ? 200
            : 0
          : 4294967295,
        v = function (e, t) {
          (this.type = e), (this.data = t);
        },
        b =
          ((c = function (e, t) {
            return (c =
              Object.setPrototypeOf ||
              ({
                __proto__: [],
              } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var r in t)
                  Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
              })(e, t);
          }),
          function (e, t) {
            if ("function" != typeof t && null !== t)
              throw TypeError(
                "Class extends value " +
                  String(t) +
                  " is not a constructor or null"
              );
            function r() {
              this.constructor = e;
            }
            c(e, t),
              (e.prototype =
                null === t
                  ? Object.create(t)
                  : ((r.prototype = t.prototype), new r()));
          }),
        w = (function (e) {
          function t(r) {
            var n = e.call(this, r) || this;
            return (
              Object.setPrototypeOf(n, Object.create(t.prototype)),
              Object.defineProperty(n, "name", {
                configurable: !0,
                enumerable: !1,
                value: t.name,
              }),
              n
            );
          }
          return b(t, e), t;
        })(Error),
        _ = {
          type: -1,
          encode: function (e) {
            var t, r, o, i;
            return e instanceof Date
              ? (function (e) {
                  var t = e.sec,
                    r = e.nsec;
                  if (t >= 0 && r >= 0 && t <= 17179869183) {
                    if (0 === r && t <= 4294967295) {
                      var o = new Uint8Array(4),
                        i = new DataView(o.buffer);
                      return i.setUint32(0, t), o;
                    }
                    var s = t / 4294967296,
                      o = new Uint8Array(8),
                      i = new DataView(o.buffer);
                    return (
                      i.setUint32(0, (r << 2) | (3 & s)),
                      i.setUint32(4, 4294967295 & t),
                      o
                    );
                  }
                  var o = new Uint8Array(12),
                    i = new DataView(o.buffer);
                  return i.setUint32(0, r), n(i, 4, t), o;
                })(
                  ((r = Math.floor((t = e.getTime()) / 1e3)),
                  (i = Math.floor((o = (t - 1e3 * r) * 1e6) / 1e9)),
                  {
                    sec: r + i,
                    nsec: o - 1e9 * i,
                  })
                )
              : null;
          },
          decode: function (e) {
            var t = (function (e) {
              var t = new DataView(e.buffer, e.byteOffset, e.byteLength);
              switch (e.byteLength) {
                case 4:
                  var r = t.getUint32(0),
                    n = 0;
                  return {
                    sec: r,
                    nsec: 0,
                  };
                case 8:
                  var i = t.getUint32(0),
                    r = (3 & i) * 4294967296 + t.getUint32(4),
                    n = i >>> 2;
                  return {
                    sec: r,
                    nsec: n,
                  };
                case 12:
                  var r = o(t, 4),
                    n = t.getUint32(0);
                  return {
                    sec: r,
                    nsec: n,
                  };
                default:
                  throw new w(
                    "Unrecognized data size for timestamp (expected 4, 8, or 12): ".concat(
                      e.length
                    )
                  );
              }
            })(e);
            return new Date(1e3 * t.sec + t.nsec / 1e6);
          },
        },
        S = (function () {
          function e() {
            (this.builtInEncoders = []),
              (this.builtInDecoders = []),
              (this.encoders = []),
              (this.decoders = []),
              this.register(_);
          }
          return (
            (e.prototype.register = function (e) {
              var t = e.type,
                r = e.encode,
                n = e.decode;
              if (t >= 0) (this.encoders[t] = r), (this.decoders[t] = n);
              else {
                var o = 1 + t;
                (this.builtInEncoders[o] = r), (this.builtInDecoders[o] = n);
              }
            }),
            (e.prototype.tryToEncode = function (e, t) {
              for (var r = 0; r < this.builtInEncoders.length; r++) {
                var n = this.builtInEncoders[r];
                if (null != n) {
                  var o = n(e, t);
                  if (null != o) {
                    var i = -1 - r;
                    return new v(i, o);
                  }
                }
              }
              for (var r = 0; r < this.encoders.length; r++) {
                var n = this.encoders[r];
                if (null != n) {
                  var o = n(e, t);
                  if (null != o) {
                    var i = r;
                    return new v(i, o);
                  }
                }
              }
              return e instanceof v ? e : null;
            }),
            (e.prototype.decode = function (e, t, r) {
              var n = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
              return n ? n(e, t, r) : new v(t, e);
            }),
            (e.defaultCodec = new e()),
            e
          );
        })();
      function E(e) {
        return e instanceof Uint8Array
          ? e
          : ArrayBuffer.isView(e)
          ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
          : e instanceof ArrayBuffer
          ? new Uint8Array(e)
          : Uint8Array.from(e);
      }
      var C = (function () {
        function e(e, t, r, n, o, i, s, a) {
          void 0 === e && (e = S.defaultCodec),
            void 0 === t && (t = void 0),
            void 0 === r && (r = 100),
            void 0 === n && (n = 2048),
            void 0 === o && (o = !1),
            void 0 === i && (i = !1),
            void 0 === s && (s = !1),
            void 0 === a && (a = !1),
            (this.extensionCodec = e),
            (this.context = t),
            (this.maxDepth = r),
            (this.initialBufferSize = n),
            (this.sortKeys = o),
            (this.forceFloat32 = i),
            (this.ignoreUndefined = s),
            (this.forceIntegerToFloat = a),
            (this.pos = 0),
            (this.view = new DataView(new ArrayBuffer(this.initialBufferSize))),
            (this.bytes = new Uint8Array(this.view.buffer));
        }
        return (
          (e.prototype.reinitializeState = function () {
            this.pos = 0;
          }),
          (e.prototype.encodeSharedRef = function (e) {
            return (
              this.reinitializeState(),
              this.doEncode(e, 1),
              this.bytes.subarray(0, this.pos)
            );
          }),
          (e.prototype.encode = function (e) {
            return (
              this.reinitializeState(),
              this.doEncode(e, 1),
              this.bytes.slice(0, this.pos)
            );
          }),
          (e.prototype.doEncode = function (e, t) {
            if (t > this.maxDepth)
              throw Error("Too deep objects in depth ".concat(t));
            null == e
              ? this.encodeNil()
              : "boolean" == typeof e
              ? this.encodeBoolean(e)
              : "number" == typeof e
              ? this.encodeNumber(e)
              : "string" == typeof e
              ? this.encodeString(e)
              : this.encodeObject(e, t);
          }),
          (e.prototype.ensureBufferSizeToWrite = function (e) {
            var t = this.pos + e;
            this.view.byteLength < t && this.resizeBuffer(2 * t);
          }),
          (e.prototype.resizeBuffer = function (e) {
            var t = new ArrayBuffer(e),
              r = new Uint8Array(t),
              n = new DataView(t);
            r.set(this.bytes), (this.view = n), (this.bytes = r);
          }),
          (e.prototype.encodeNil = function () {
            this.writeU8(192);
          }),
          (e.prototype.encodeBoolean = function (e) {
            !1 === e ? this.writeU8(194) : this.writeU8(195);
          }),
          (e.prototype.encodeNumber = function (e) {
            Number.isSafeInteger(e) && !this.forceIntegerToFloat
              ? e >= 0
                ? e < 128
                  ? this.writeU8(e)
                  : e < 256
                  ? (this.writeU8(204), this.writeU8(e))
                  : e < 65536
                  ? (this.writeU8(205), this.writeU16(e))
                  : e < 4294967296
                  ? (this.writeU8(206), this.writeU32(e))
                  : (this.writeU8(207), this.writeU64(e))
                : e >= -32
                ? this.writeU8(224 | (e + 32))
                : e >= -128
                ? (this.writeU8(208), this.writeI8(e))
                : e >= -32768
                ? (this.writeU8(209), this.writeI16(e))
                : e >= -2147483648
                ? (this.writeU8(210), this.writeI32(e))
                : (this.writeU8(211), this.writeI64(e))
              : this.forceFloat32
              ? (this.writeU8(202), this.writeF32(e))
              : (this.writeU8(203), this.writeF64(e));
          }),
          (e.prototype.writeStringHeader = function (e) {
            if (e < 32) this.writeU8(160 + e);
            else if (e < 256) this.writeU8(217), this.writeU8(e);
            else if (e < 65536) this.writeU8(218), this.writeU16(e);
            else if (e < 4294967296) this.writeU8(219), this.writeU32(e);
            else throw Error("Too long string: ".concat(e, " bytes in UTF-8"));
          }),
          (e.prototype.encodeString = function (e) {
            if (e.length > d) {
              var t = h(e);
              this.ensureBufferSizeToWrite(5 + t),
                this.writeStringHeader(t),
                p(e, this.bytes, this.pos),
                (this.pos += t);
            } else {
              var t = h(e);
              this.ensureBufferSizeToWrite(5 + t),
                this.writeStringHeader(t),
                (function (e, t, r) {
                  for (var n = e.length, o = r, i = 0; i < n; ) {
                    var s = e.charCodeAt(i++);
                    if ((4294967168 & s) == 0) {
                      t[o++] = s;
                      continue;
                    }
                    if ((4294965248 & s) == 0) t[o++] = ((s >> 6) & 31) | 192;
                    else {
                      if (s >= 55296 && s <= 56319 && i < n) {
                        var a = e.charCodeAt(i);
                        (64512 & a) == 56320 &&
                          (++i, (s = ((1023 & s) << 10) + (1023 & a) + 65536));
                      }
                      (4294901760 & s) == 0
                        ? (t[o++] = ((s >> 12) & 15) | 224)
                        : ((t[o++] = ((s >> 18) & 7) | 240),
                          (t[o++] = ((s >> 12) & 63) | 128)),
                        (t[o++] = ((s >> 6) & 63) | 128);
                    }
                    t[o++] = (63 & s) | 128;
                  }
                })(e, this.bytes, this.pos),
                (this.pos += t);
            }
          }),
          (e.prototype.encodeObject = function (e, t) {
            var r = this.extensionCodec.tryToEncode(e, this.context);
            if (null != r) this.encodeExtension(r);
            else if (Array.isArray(e)) this.encodeArray(e, t);
            else if (ArrayBuffer.isView(e)) this.encodeBinary(e);
            else if ("object" == typeof e) this.encodeMap(e, t);
            else
              throw Error(
                "Unrecognized object: ".concat(
                  Object.prototype.toString.apply(e)
                )
              );
          }),
          (e.prototype.encodeBinary = function (e) {
            var t = e.byteLength;
            if (t < 256) this.writeU8(196), this.writeU8(t);
            else if (t < 65536) this.writeU8(197), this.writeU16(t);
            else if (t < 4294967296) this.writeU8(198), this.writeU32(t);
            else throw Error("Too large binary: ".concat(t));
            var r = E(e);
            this.writeU8a(r);
          }),
          (e.prototype.encodeArray = function (e, t) {
            var r = e.length;
            if (r < 16) this.writeU8(144 + r);
            else if (r < 65536) this.writeU8(220), this.writeU16(r);
            else if (r < 4294967296) this.writeU8(221), this.writeU32(r);
            else throw Error("Too large array: ".concat(r));
            for (var n = 0; n < e.length; n++) {
              var o = e[n];
              this.doEncode(o, t + 1);
            }
          }),
          (e.prototype.countWithoutUndefined = function (e, t) {
            for (var r = 0, n = 0; n < t.length; n++) void 0 !== e[t[n]] && r++;
            return r;
          }),
          (e.prototype.encodeMap = function (e, t) {
            var r = Object.keys(e);
            this.sortKeys && r.sort();
            var n = this.ignoreUndefined
              ? this.countWithoutUndefined(e, r)
              : r.length;
            if (n < 16) this.writeU8(128 + n);
            else if (n < 65536) this.writeU8(222), this.writeU16(n);
            else if (n < 4294967296) this.writeU8(223), this.writeU32(n);
            else throw Error("Too large map object: ".concat(n));
            for (var o = 0; o < r.length; o++) {
              var i = r[o],
                s = e[i];
              (this.ignoreUndefined && void 0 === s) ||
                (this.encodeString(i), this.doEncode(s, t + 1));
            }
          }),
          (e.prototype.encodeExtension = function (e) {
            var t = e.data.length;
            if (1 === t) this.writeU8(212);
            else if (2 === t) this.writeU8(213);
            else if (4 === t) this.writeU8(214);
            else if (8 === t) this.writeU8(215);
            else if (16 === t) this.writeU8(216);
            else if (t < 256) this.writeU8(199), this.writeU8(t);
            else if (t < 65536) this.writeU8(200), this.writeU16(t);
            else if (t < 4294967296) this.writeU8(201), this.writeU32(t);
            else throw Error("Too large extension object: ".concat(t));
            this.writeI8(e.type), this.writeU8a(e.data);
          }),
          (e.prototype.writeU8 = function (e) {
            this.ensureBufferSizeToWrite(1),
              this.view.setUint8(this.pos, e),
              this.pos++;
          }),
          (e.prototype.writeU8a = function (e) {
            var t = e.length;
            this.ensureBufferSizeToWrite(t),
              this.bytes.set(e, this.pos),
              (this.pos += t);
          }),
          (e.prototype.writeI8 = function (e) {
            this.ensureBufferSizeToWrite(1),
              this.view.setInt8(this.pos, e),
              this.pos++;
          }),
          (e.prototype.writeU16 = function (e) {
            this.ensureBufferSizeToWrite(2),
              this.view.setUint16(this.pos, e),
              (this.pos += 2);
          }),
          (e.prototype.writeI16 = function (e) {
            this.ensureBufferSizeToWrite(2),
              this.view.setInt16(this.pos, e),
              (this.pos += 2);
          }),
          (e.prototype.writeU32 = function (e) {
            this.ensureBufferSizeToWrite(4),
              this.view.setUint32(this.pos, e),
              (this.pos += 4);
          }),
          (e.prototype.writeI32 = function (e) {
            this.ensureBufferSizeToWrite(4),
              this.view.setInt32(this.pos, e),
              (this.pos += 4);
          }),
          (e.prototype.writeF32 = function (e) {
            this.ensureBufferSizeToWrite(4),
              this.view.setFloat32(this.pos, e),
              (this.pos += 4);
          }),
          (e.prototype.writeF64 = function (e) {
            this.ensureBufferSizeToWrite(8),
              this.view.setFloat64(this.pos, e),
              (this.pos += 8);
          }),
          (e.prototype.writeU64 = function (e) {
            var t, r;
            this.ensureBufferSizeToWrite(8),
              (t = this.view),
              (r = this.pos),
              t.setUint32(r, e / 4294967296),
              t.setUint32(r + 4, e),
              (this.pos += 8);
          }),
          (e.prototype.writeI64 = function (e) {
            this.ensureBufferSizeToWrite(8),
              n(this.view, this.pos, e),
              (this.pos += 8);
          }),
          e
        );
      })();
      function T(e) {
        return ""
          .concat(e < 0 ? "-" : "", "0x")
          .concat(Math.abs(e).toString(16).padStart(2, "0"));
      }
      var k = (function () {
          function e(e, t) {
            void 0 === e && (e = 16),
              void 0 === t && (t = 16),
              (this.maxKeyLength = e),
              (this.maxLengthPerKey = t),
              (this.hit = 0),
              (this.miss = 0),
              (this.caches = []);
            for (var r = 0; r < this.maxKeyLength; r++) this.caches.push([]);
          }
          return (
            (e.prototype.canBeCached = function (e) {
              return e > 0 && e <= this.maxKeyLength;
            }),
            (e.prototype.find = function (e, t, r) {
              var n = this.caches[r - 1];
              e: for (var o = 0; o < n.length; o++) {
                for (var i = n[o], s = i.bytes, a = 0; a < r; a++)
                  if (s[a] !== e[t + a]) continue e;
                return i.str;
              }
              return null;
            }),
            (e.prototype.store = function (e, t) {
              var r = this.caches[e.length - 1],
                n = {
                  bytes: e,
                  str: t,
                };
              r.length >= this.maxLengthPerKey
                ? (r[(Math.random() * r.length) | 0] = n)
                : r.push(n);
            }),
            (e.prototype.decode = function (e, t, r) {
              var n = this.find(e, t, r);
              if (null != n) return this.hit++, n;
              this.miss++;
              var o = g(e, t, r),
                i = Uint8Array.prototype.slice.call(e, t, t + r);
              return this.store(i, o), o;
            }),
            e
          );
        })(),
        I = function (e, t) {
          var r,
            n,
            o,
            i,
            s = {
              label: 0,
              sent: function () {
                if (1 & o[0]) throw o[1];
                return o[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (i = {
              next: a(0),
              throw: a(1),
              return: a(2),
            }),
            "function" == typeof Symbol &&
              (i[Symbol.iterator] = function () {
                return this;
              }),
            i
          );
          function a(i) {
            return function (a) {
              return (function (i) {
                if (r) throw TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      n &&
                        (o =
                          2 & i[0]
                            ? n.return
                            : i[0]
                            ? n.throw || ((o = n.return) && o.call(n), 0)
                            : n.next) &&
                        !(o = o.call(n, i[1])).done)
                    )
                      return o;
                    switch (((n = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                      case 0:
                      case 1:
                        o = i;
                        break;
                      case 4:
                        return (
                          s.label++,
                          {
                            value: i[1],
                            done: !1,
                          }
                        );
                      case 5:
                        s.label++, (n = i[1]), (i = [0]);
                        continue;
                      case 7:
                        (i = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !(o = (o = s.trys).length > 0 && o[o.length - 1]) &&
                          (6 === i[0] || 2 === i[0])
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === i[0] &&
                          (!o || (i[1] > o[0] && i[1] < o[3]))
                        ) {
                          s.label = i[1];
                          break;
                        }
                        if (6 === i[0] && s.label < o[1]) {
                          (s.label = o[1]), (o = i);
                          break;
                        }
                        if (o && s.label < o[2]) {
                          (s.label = o[2]), s.ops.push(i);
                          break;
                        }
                        o[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    i = t.call(e, s);
                  } catch (e) {
                    (i = [6, e]), (n = 0);
                  } finally {
                    r = o = 0;
                  }
                if (5 & i[0]) throw i[1];
                return {
                  value: i[0] ? i[1] : void 0,
                  done: !0,
                };
              })([i, a]);
            };
          }
        },
        x = function (e) {
          if (!Symbol.asyncIterator)
            throw TypeError("Symbol.asyncIterator is not defined.");
          var t,
            r = e[Symbol.asyncIterator];
          return r
            ? r.call(e)
            : ((e =
                "function" == typeof __values
                  ? __values(e)
                  : e[Symbol.iterator]()),
              (t = {}),
              n("next"),
              n("throw"),
              n("return"),
              (t[Symbol.asyncIterator] = function () {
                return this;
              }),
              t);
          function n(r) {
            t[r] =
              e[r] &&
              function (t) {
                return new Promise(function (n, o) {
                  !(function (e, t, r, n) {
                    Promise.resolve(n).then(function (t) {
                      e({
                        value: t,
                        done: r,
                      });
                    }, t);
                  })(n, o, (t = e[r](t)).done, t.value);
                });
              };
          }
        },
        P = function (e) {
          return this instanceof P ? ((this.v = e), this) : new P(e);
        },
        O = function (e, t, r) {
          if (!Symbol.asyncIterator)
            throw TypeError("Symbol.asyncIterator is not defined.");
          var n,
            o = r.apply(e, t || []),
            i = [];
          return (
            (n = {}),
            s("next"),
            s("throw"),
            s("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n
          );
          function s(e) {
            o[e] &&
              (n[e] = function (t) {
                return new Promise(function (r, n) {
                  i.push([e, t, r, n]) > 1 || a(e, t);
                });
              });
          }
          function a(e, t) {
            try {
              var r;
              (r = o[e](t)).value instanceof P
                ? Promise.resolve(r.value.v).then(c, l)
                : u(i[0][2], r);
            } catch (e) {
              u(i[0][3], e);
            }
          }
          function c(e) {
            a("next", e);
          }
          function l(e) {
            a("throw", e);
          }
          function u(e, t) {
            e(t), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        },
        R = function (e) {
          var t = typeof e;
          return "string" === t || "number" === t;
        },
        D = new DataView(new ArrayBuffer(0)),
        U = new Uint8Array(D.buffer),
        A = (function () {
          try {
            D.getInt8(0);
          } catch (e) {
            return e.constructor;
          }
          throw Error("never reached");
        })(),
        j = new A("Insufficient data"),
        N = new k(),
        B = (function () {
          function e(e, t, r, n, o, i, s, a) {
            void 0 === e && (e = S.defaultCodec),
              void 0 === t && (t = void 0),
              void 0 === r && (r = 4294967295),
              void 0 === n && (n = 4294967295),
              void 0 === o && (o = 4294967295),
              void 0 === i && (i = 4294967295),
              void 0 === s && (s = 4294967295),
              void 0 === a && (a = N),
              (this.extensionCodec = e),
              (this.context = t),
              (this.maxStrLength = r),
              (this.maxBinLength = n),
              (this.maxArrayLength = o),
              (this.maxMapLength = i),
              (this.maxExtLength = s),
              (this.keyDecoder = a),
              (this.totalPos = 0),
              (this.pos = 0),
              (this.view = D),
              (this.bytes = U),
              (this.headByte = -1),
              (this.stack = []);
          }
          return (
            (e.prototype.reinitializeState = function () {
              (this.totalPos = 0),
                (this.headByte = -1),
                (this.stack.length = 0);
            }),
            (e.prototype.setBuffer = function (e) {
              (this.bytes = E(e)),
                (this.view = (function (e) {
                  if (e instanceof ArrayBuffer) return new DataView(e);
                  var t = E(e);
                  return new DataView(t.buffer, t.byteOffset, t.byteLength);
                })(this.bytes)),
                (this.pos = 0);
            }),
            (e.prototype.appendBuffer = function (e) {
              if (-1 !== this.headByte || this.hasRemaining(1)) {
                var t = this.bytes.subarray(this.pos),
                  r = E(e),
                  n = new Uint8Array(t.length + r.length);
                n.set(t), n.set(r, t.length), this.setBuffer(n);
              } else this.setBuffer(e);
            }),
            (e.prototype.hasRemaining = function (e) {
              return this.view.byteLength - this.pos >= e;
            }),
            (e.prototype.createExtraByteError = function (e) {
              var t = this.view,
                r = this.pos;
              return RangeError(
                "Extra "
                  .concat(t.byteLength - r, " of ")
                  .concat(t.byteLength, " byte(s) found at buffer[")
                  .concat(e, "]")
              );
            }),
            (e.prototype.decode = function (e) {
              this.reinitializeState(), this.setBuffer(e);
              var t = this.doDecodeSync();
              if (this.hasRemaining(1))
                throw this.createExtraByteError(this.pos);
              return t;
            }),
            (e.prototype.decodeMulti = function (e) {
              return I(this, function (t) {
                switch (t.label) {
                  case 0:
                    this.reinitializeState(), this.setBuffer(e), (t.label = 1);
                  case 1:
                    if (!this.hasRemaining(1)) return [3, 3];
                    return [4, this.doDecodeSync()];
                  case 2:
                    return t.sent(), [3, 1];
                  case 3:
                    return [2];
                }
              });
            }),
            (e.prototype.decodeAsync = function (e) {
              var t, r, n, o, i, s, a, c;
              return (
                (i = this),
                (s = void 0),
                (a = void 0),
                (c = function () {
                  var i, s, a, c, l, u, h;
                  return I(this, function (f) {
                    switch (f.label) {
                      case 0:
                        (i = !1), (f.label = 1);
                      case 1:
                        f.trys.push([1, 6, 7, 12]), (t = x(e)), (f.label = 2);
                      case 2:
                        return [4, t.next()];
                      case 3:
                        if ((r = f.sent()).done) return [3, 5];
                        if (((a = r.value), i))
                          throw this.createExtraByteError(this.totalPos);
                        this.appendBuffer(a);
                        try {
                          (s = this.doDecodeSync()), (i = !0);
                        } catch (e) {
                          if (!(e instanceof A)) throw e;
                        }
                        (this.totalPos += this.pos), (f.label = 4);
                      case 4:
                        return [3, 2];
                      case 5:
                        return [3, 12];
                      case 6:
                        return (
                          (n = {
                            error: f.sent(),
                          }),
                          [3, 12]
                        );
                      case 7:
                        if (
                          (f.trys.push([7, , 10, 11]),
                          !(r && !r.done && (o = t.return)))
                        )
                          return [3, 9];
                        return [4, o.call(t)];
                      case 8:
                        f.sent(), (f.label = 9);
                      case 9:
                        return [3, 11];
                      case 10:
                        if (n) throw n.error;
                        return [7];
                      case 11:
                        return [7];
                      case 12:
                        if (i) {
                          if (this.hasRemaining(1))
                            throw this.createExtraByteError(this.totalPos);
                          return [2, s];
                        }
                        throw (
                          ((c = this),
                          (l = c.headByte),
                          (u = c.pos),
                          (h = c.totalPos),
                          RangeError(
                            "Insufficient data in parsing "
                              .concat(T(l), " at ")
                              .concat(h, " (")
                              .concat(u, " in the current buffer)")
                          ))
                        );
                    }
                  });
                }),
                new (a || (a = Promise))(function (e, t) {
                  function r(e) {
                    try {
                      o(c.next(e));
                    } catch (e) {
                      t(e);
                    }
                  }
                  function n(e) {
                    try {
                      o(c.throw(e));
                    } catch (e) {
                      t(e);
                    }
                  }
                  function o(t) {
                    var o;
                    t.done
                      ? e(t.value)
                      : ((o = t.value) instanceof a
                          ? o
                          : new a(function (e) {
                              e(o);
                            })
                        ).then(r, n);
                  }
                  o((c = c.apply(i, s || [])).next());
                })
              );
            }),
            (e.prototype.decodeArrayStream = function (e) {
              return this.decodeMultiAsync(e, !0);
            }),
            (e.prototype.decodeStream = function (e) {
              return this.decodeMultiAsync(e, !1);
            }),
            (e.prototype.decodeMultiAsync = function (e, t) {
              return O(this, arguments, function () {
                var r, n, o, i, s, a, c, l;
                return I(this, function (u) {
                  switch (u.label) {
                    case 0:
                      (r = t), (n = -1), (u.label = 1);
                    case 1:
                      u.trys.push([1, 13, 14, 19]), (o = x(e)), (u.label = 2);
                    case 2:
                      return [4, P(o.next())];
                    case 3:
                      if ((i = u.sent()).done) return [3, 12];
                      if (((s = i.value), t && 0 === n))
                        throw this.createExtraByteError(this.totalPos);
                      this.appendBuffer(s),
                        r &&
                          ((n = this.readArraySize()),
                          (r = !1),
                          this.complete()),
                        (u.label = 4);
                    case 4:
                      u.trys.push([4, 9, , 10]), (u.label = 5);
                    case 5:
                      return [4, P(this.doDecodeSync())];
                    case 6:
                      return [4, u.sent()];
                    case 7:
                      if ((u.sent(), 0 == --n)) return [3, 8];
                      return [3, 5];
                    case 8:
                      return [3, 10];
                    case 9:
                      if (!((a = u.sent()) instanceof A)) throw a;
                      return [3, 10];
                    case 10:
                      (this.totalPos += this.pos), (u.label = 11);
                    case 11:
                      return [3, 2];
                    case 12:
                      return [3, 19];
                    case 13:
                      return (
                        (c = {
                          error: u.sent(),
                        }),
                        [3, 19]
                      );
                    case 14:
                      if (
                        (u.trys.push([14, , 17, 18]),
                        !(i && !i.done && (l = o.return)))
                      )
                        return [3, 16];
                      return [4, P(l.call(o))];
                    case 15:
                      u.sent(), (u.label = 16);
                    case 16:
                      return [3, 18];
                    case 17:
                      if (c) throw c.error;
                      return [7];
                    case 18:
                      return [7];
                    case 19:
                      return [2];
                  }
                });
              });
            }),
            (e.prototype.doDecodeSync = function () {
              t: for (;;) {
                var e = this.readHeadByte(),
                  t = void 0;
                if (e >= 224) t = e - 256;
                else if (e < 192) {
                  if (e < 128) t = e;
                  else if (e < 144) {
                    var r = e - 128;
                    if (0 !== r) {
                      this.pushMapState(r), this.complete();
                      continue;
                    }
                    t = {};
                  } else if (e < 160) {
                    var r = e - 144;
                    if (0 !== r) {
                      this.pushArrayState(r), this.complete();
                      continue;
                    }
                    t = [];
                  } else {
                    var n = e - 160;
                    t = this.decodeUtf8String(n, 0);
                  }
                } else if (192 === e) t = null;
                else if (194 === e) t = !1;
                else if (195 === e) t = !0;
                else if (202 === e) t = this.readF32();
                else if (203 === e) t = this.readF64();
                else if (204 === e) t = this.readU8();
                else if (205 === e) t = this.readU16();
                else if (206 === e) t = this.readU32();
                else if (207 === e) t = this.readU64();
                else if (208 === e) t = this.readI8();
                else if (209 === e) t = this.readI16();
                else if (210 === e) t = this.readI32();
                else if (211 === e) t = this.readI64();
                else if (217 === e) {
                  var n = this.lookU8();
                  t = this.decodeUtf8String(n, 1);
                } else if (218 === e) {
                  var n = this.lookU16();
                  t = this.decodeUtf8String(n, 2);
                } else if (219 === e) {
                  var n = this.lookU32();
                  t = this.decodeUtf8String(n, 4);
                } else if (220 === e) {
                  var r = this.readU16();
                  if (0 !== r) {
                    this.pushArrayState(r), this.complete();
                    continue;
                  }
                  t = [];
                } else if (221 === e) {
                  var r = this.readU32();
                  if (0 !== r) {
                    this.pushArrayState(r), this.complete();
                    continue;
                  }
                  t = [];
                } else if (222 === e) {
                  var r = this.readU16();
                  if (0 !== r) {
                    this.pushMapState(r), this.complete();
                    continue;
                  }
                  t = {};
                } else if (223 === e) {
                  var r = this.readU32();
                  if (0 !== r) {
                    this.pushMapState(r), this.complete();
                    continue;
                  }
                  t = {};
                } else if (196 === e) {
                  var r = this.lookU8();
                  t = this.decodeBinary(r, 1);
                } else if (197 === e) {
                  var r = this.lookU16();
                  t = this.decodeBinary(r, 2);
                } else if (198 === e) {
                  var r = this.lookU32();
                  t = this.decodeBinary(r, 4);
                } else if (212 === e) t = this.decodeExtension(1, 0);
                else if (213 === e) t = this.decodeExtension(2, 0);
                else if (214 === e) t = this.decodeExtension(4, 0);
                else if (215 === e) t = this.decodeExtension(8, 0);
                else if (216 === e) t = this.decodeExtension(16, 0);
                else if (199 === e) {
                  var r = this.lookU8();
                  t = this.decodeExtension(r, 1);
                } else if (200 === e) {
                  var r = this.lookU16();
                  t = this.decodeExtension(r, 2);
                } else if (201 === e) {
                  var r = this.lookU32();
                  t = this.decodeExtension(r, 4);
                } else throw new w("Unrecognized type byte: ".concat(T(e)));
                this.complete();
                for (var o = this.stack; o.length > 0; ) {
                  var i = o[o.length - 1];
                  if (0 === i.type) {
                    if (
                      ((i.array[i.position] = t),
                      i.position++,
                      i.position === i.size)
                    )
                      o.pop(), (t = i.array);
                    else continue t;
                  } else if (1 === i.type) {
                    if (!R(t))
                      throw new w(
                        "The type of key must be string or number but " +
                          typeof t
                      );
                    if ("__proto__" === t)
                      throw new w("The key __proto__ is not allowed");
                    (i.key = t), (i.type = 2);
                    continue t;
                  } else if (
                    ((i.map[i.key] = t), i.readCount++, i.readCount === i.size)
                  )
                    o.pop(), (t = i.map);
                  else {
                    (i.key = null), (i.type = 1);
                    continue t;
                  }
                }
                return t;
              }
            }),
            (e.prototype.readHeadByte = function () {
              return (
                -1 === this.headByte && (this.headByte = this.readU8()),
                this.headByte
              );
            }),
            (e.prototype.complete = function () {
              this.headByte = -1;
            }),
            (e.prototype.readArraySize = function () {
              var e = this.readHeadByte();
              switch (e) {
                case 220:
                  return this.readU16();
                case 221:
                  return this.readU32();
                default:
                  if (e < 160) return e - 144;
                  throw new w("Unrecognized array type byte: ".concat(T(e)));
              }
            }),
            (e.prototype.pushMapState = function (e) {
              if (e > this.maxMapLength)
                throw new w(
                  "Max length exceeded: map length ("
                    .concat(e, ") > maxMapLengthLength (")
                    .concat(this.maxMapLength, ")")
                );
              this.stack.push({
                type: 1,
                size: e,
                key: null,
                readCount: 0,
                map: {},
              });
            }),
            (e.prototype.pushArrayState = function (e) {
              if (e > this.maxArrayLength)
                throw new w(
                  "Max length exceeded: array length ("
                    .concat(e, ") > maxArrayLength (")
                    .concat(this.maxArrayLength, ")")
                );
              this.stack.push({
                type: 0,
                size: e,
                array: Array(e),
                position: 0,
              });
            }),
            (e.prototype.decodeUtf8String = function (e, t) {
              if (e > this.maxStrLength)
                throw new w(
                  "Max length exceeded: UTF-8 byte length ("
                    .concat(e, ") > maxStrLength (")
                    .concat(this.maxStrLength, ")")
                );
              if (this.bytes.byteLength < this.pos + t + e) throw j;
              var r,
                n,
                o,
                i = this.pos + t;
              return (
                this.stateIsMapKey() &&
                (null === (n = this.keyDecoder) || void 0 === n
                  ? void 0
                  : n.canBeCached(e))
                  ? (o = this.keyDecoder.decode(this.bytes, i, e))
                  : e > m
                  ? ((r = this.bytes.subarray(i, i + e)), (o = y.decode(r)))
                  : (o = g(this.bytes, i, e)),
                (this.pos += t + e),
                o
              );
            }),
            (e.prototype.stateIsMapKey = function () {
              return (
                this.stack.length > 0 &&
                1 === this.stack[this.stack.length - 1].type
              );
            }),
            (e.prototype.decodeBinary = function (e, t) {
              if (e > this.maxBinLength)
                throw new w(
                  "Max length exceeded: bin length ("
                    .concat(e, ") > maxBinLength (")
                    .concat(this.maxBinLength, ")")
                );
              if (!this.hasRemaining(e + t)) throw j;
              var r = this.pos + t,
                n = this.bytes.subarray(r, r + e);
              return (this.pos += t + e), n;
            }),
            (e.prototype.decodeExtension = function (e, t) {
              if (e > this.maxExtLength)
                throw new w(
                  "Max length exceeded: ext length ("
                    .concat(e, ") > maxExtLength (")
                    .concat(this.maxExtLength, ")")
                );
              var r = this.view.getInt8(this.pos + t),
                n = this.decodeBinary(e, t + 1);
              return this.extensionCodec.decode(n, r, this.context);
            }),
            (e.prototype.lookU8 = function () {
              return this.view.getUint8(this.pos);
            }),
            (e.prototype.lookU16 = function () {
              return this.view.getUint16(this.pos);
            }),
            (e.prototype.lookU32 = function () {
              return this.view.getUint32(this.pos);
            }),
            (e.prototype.readU8 = function () {
              var e = this.view.getUint8(this.pos);
              return this.pos++, e;
            }),
            (e.prototype.readI8 = function () {
              var e = this.view.getInt8(this.pos);
              return this.pos++, e;
            }),
            (e.prototype.readU16 = function () {
              var e = this.view.getUint16(this.pos);
              return (this.pos += 2), e;
            }),
            (e.prototype.readI16 = function () {
              var e = this.view.getInt16(this.pos);
              return (this.pos += 2), e;
            }),
            (e.prototype.readU32 = function () {
              var e = this.view.getUint32(this.pos);
              return (this.pos += 4), e;
            }),
            (e.prototype.readI32 = function () {
              var e = this.view.getInt32(this.pos);
              return (this.pos += 4), e;
            }),
            (e.prototype.readU64 = function () {
              var e,
                t,
                r =
                  ((e = this.view),
                  (t = this.pos),
                  4294967296 * e.getUint32(t) + e.getUint32(t + 4));
              return (this.pos += 8), r;
            }),
            (e.prototype.readI64 = function () {
              var e = o(this.view, this.pos);
              return (this.pos += 8), e;
            }),
            (e.prototype.readF32 = function () {
              var e = this.view.getFloat32(this.pos);
              return (this.pos += 4), e;
            }),
            (e.prototype.readF64 = function () {
              var e = this.view.getFloat64(this.pos);
              return (this.pos += 8), e;
            }),
            e
          );
        })(),
        L = r(1418),
        M = r(2706),
        F = r(7991),
        z = r(4177);
      class $ {
        static write(e) {
          let t = e.byteLength || e.length,
            r = [];
          do {
            let e = 127 & t;
            (t >>= 7) > 0 && (e |= 128), r.push(e);
          } while (t > 0);
          t = e.byteLength || e.length;
          let n = new Uint8Array(r.length + t);
          return n.set(r, 0), n.set(e, r.length), n.buffer;
        }
        static parse(e) {
          let t = [],
            r = new Uint8Array(e),
            n = [0, 7, 14, 21, 28];
          for (let o = 0; o < e.byteLength; ) {
            let i,
              s = 0,
              a = 0;
            do (a |= (127 & (i = r[o + s])) << n[s]), s++;
            while (s < Math.min(5, e.byteLength - o) && (128 & i) != 0);
            if ((128 & i) != 0 && s < 5)
              throw Error("Cannot read message size.");
            if (5 === s && i > 7)
              throw Error("Messages bigger than 2GB are not supported.");
            if (r.byteLength >= o + s + a)
              t.push(
                r.slice
                  ? r.slice(o + s, o + s + a)
                  : r.subarray(o + s, o + s + a)
              );
            else throw Error("Incomplete message.");
            o = o + s + a;
          }
          return t;
        }
      }
      let W = new Uint8Array([145, L.C.Ping]);
      class H {
        constructor(e) {
          (this.name = "messagepack"),
            (this.version = 1),
            (this.transferFormat = M.k.Binary),
            (this._errorResult = 1),
            (this._voidResult = 2),
            (this._nonVoidResult = 3),
            (e = e || {}),
            (this._encoder = new C(
              e.extensionCodec,
              e.context,
              e.maxDepth,
              e.initialBufferSize,
              e.sortKeys,
              e.forceFloat32,
              e.ignoreUndefined,
              e.forceIntegerToFloat
            )),
            (this._decoder = new B(
              e.extensionCodec,
              e.context,
              e.maxStrLength,
              e.maxBinLength,
              e.maxArrayLength,
              e.maxMapLength,
              e.maxExtLength
            ));
        }
        parseMessages(e, t) {
          if (
            !(
              e &&
              "undefined" != typeof ArrayBuffer &&
              (e instanceof ArrayBuffer ||
                (e.constructor && "ArrayBuffer" === e.constructor.name))
            )
          )
            throw Error(
              "Invalid input for MessagePack hub protocol. Expected an ArrayBuffer."
            );
          null === t && (t = F.W.instance);
          let r = $.parse(e),
            n = [];
          for (let e of r) {
            let r = this._parseMessage(e, t);
            r && n.push(r);
          }
          return n;
        }
        writeMessage(e) {
          switch (e.type) {
            case L.C.Invocation:
              return this._writeInvocation(e);
            case L.C.StreamInvocation:
              return this._writeStreamInvocation(e);
            case L.C.StreamItem:
              return this._writeStreamItem(e);
            case L.C.Completion:
              return this._writeCompletion(e);
            case L.C.Ping:
              return $.write(W);
            case L.C.CancelInvocation:
              return this._writeCancelInvocation(e);
            default:
              throw Error("Invalid message type.");
          }
        }
        _parseMessage(e, t) {
          if (0 === e.length) throw Error("Invalid payload.");
          let r = this._decoder.decode(e);
          if (0 === r.length || !(r instanceof Array))
            throw Error("Invalid payload.");
          let n = r[0];
          switch (n) {
            case L.C.Invocation:
              return this._createInvocationMessage(this._readHeaders(r), r);
            case L.C.StreamItem:
              return this._createStreamItemMessage(this._readHeaders(r), r);
            case L.C.Completion:
              return this._createCompletionMessage(this._readHeaders(r), r);
            case L.C.Ping:
              return this._createPingMessage(r);
            case L.C.Close:
              return this._createCloseMessage(r);
            default:
              return (
                t.log(
                  z.i.Information,
                  "Unknown message type '" + n + "' ignored."
                ),
                null
              );
          }
        }
        _createCloseMessage(e) {
          if (e.length < 2) throw Error("Invalid payload for Close message.");
          return {
            allowReconnect: e.length >= 3 ? e[2] : void 0,
            error: e[1],
            type: L.C.Close,
          };
        }
        _createPingMessage(e) {
          if (e.length < 1) throw Error("Invalid payload for Ping message.");
          return {
            type: L.C.Ping,
          };
        }
        _createInvocationMessage(e, t) {
          if (t.length < 5)
            throw Error("Invalid payload for Invocation message.");
          let r = t[2];
          return r
            ? {
                arguments: t[4],
                headers: e,
                invocationId: r,
                streamIds: [],
                target: t[3],
                type: L.C.Invocation,
              }
            : {
                arguments: t[4],
                headers: e,
                streamIds: [],
                target: t[3],
                type: L.C.Invocation,
              };
        }
        _createStreamItemMessage(e, t) {
          if (t.length < 4)
            throw Error("Invalid payload for StreamItem message.");
          return {
            headers: e,
            invocationId: t[2],
            item: t[3],
            type: L.C.StreamItem,
          };
        }
        _createCompletionMessage(e, t) {
          let r, n;
          if (t.length < 4)
            throw Error("Invalid payload for Completion message.");
          let o = t[3];
          if (o !== this._voidResult && t.length < 5)
            throw Error("Invalid payload for Completion message.");
          switch (o) {
            case this._errorResult:
              r = t[4];
              break;
            case this._nonVoidResult:
              n = t[4];
          }
          return {
            error: r,
            headers: e,
            invocationId: t[2],
            result: n,
            type: L.C.Completion,
          };
        }
        _writeInvocation(e) {
          let t;
          return (
            (t = e.streamIds
              ? this._encoder.encode([
                  L.C.Invocation,
                  e.headers || {},
                  e.invocationId || null,
                  e.target,
                  e.arguments,
                  e.streamIds,
                ])
              : this._encoder.encode([
                  L.C.Invocation,
                  e.headers || {},
                  e.invocationId || null,
                  e.target,
                  e.arguments,
                ])),
            $.write(t.slice())
          );
        }
        _writeStreamInvocation(e) {
          let t;
          return (
            (t = e.streamIds
              ? this._encoder.encode([
                  L.C.StreamInvocation,
                  e.headers || {},
                  e.invocationId,
                  e.target,
                  e.arguments,
                  e.streamIds,
                ])
              : this._encoder.encode([
                  L.C.StreamInvocation,
                  e.headers || {},
                  e.invocationId,
                  e.target,
                  e.arguments,
                ])),
            $.write(t.slice())
          );
        }
        _writeStreamItem(e) {
          let t = this._encoder.encode([
            L.C.StreamItem,
            e.headers || {},
            e.invocationId,
            e.item,
          ]);
          return $.write(t.slice());
        }
        _writeCompletion(e) {
          let t;
          let r = e.error
            ? this._errorResult
            : void 0 !== e.result
            ? this._nonVoidResult
            : this._voidResult;
          switch (r) {
            case this._errorResult:
              t = this._encoder.encode([
                L.C.Completion,
                e.headers || {},
                e.invocationId,
                r,
                e.error,
              ]);
              break;
            case this._voidResult:
              t = this._encoder.encode([
                L.C.Completion,
                e.headers || {},
                e.invocationId,
                r,
              ]);
              break;
            case this._nonVoidResult:
              t = this._encoder.encode([
                L.C.Completion,
                e.headers || {},
                e.invocationId,
                r,
                e.result,
              ]);
          }
          return $.write(t.slice());
        }
        _writeCancelInvocation(e) {
          let t = this._encoder.encode([
            L.C.CancelInvocation,
            e.headers || {},
            e.invocationId,
          ]);
          return $.write(t.slice());
        }
        _readHeaders(e) {
          let t = e[1];
          if ("object" != typeof t) throw Error("Invalid headers.");
          return t;
        }
      }
    },
    7379: function (e, t, r) {
      "use strict";
      r.d(t, {
        s: function () {
          return Y;
        },
      });
      let n = [0, 2e3, 1e4, 3e4, null];
      class o {
        constructor(e) {
          this._retryDelays = void 0 !== e ? [...e, null] : n;
        }
        nextRetryDelayInMilliseconds(e) {
          return this._retryDelays[e.previousRetryCount];
        }
      }
      class i {}
      (i.Authorization = "Authorization"), (i.Cookie = "Cookie");
      class s {
        constructor(e, t, r) {
          (this.statusCode = e), (this.statusText = t), (this.content = r);
        }
      }
      class a {
        get(e, t) {
          return this.send({
            ...t,
            method: "GET",
            url: e,
          });
        }
        post(e, t) {
          return this.send({
            ...t,
            method: "POST",
            url: e,
          });
        }
        delete(e, t) {
          return this.send({
            ...t,
            method: "DELETE",
            url: e,
          });
        }
        getCookieString(e) {
          return "";
        }
      }
      class c extends a {
        constructor(e, t) {
          super(), (this._innerClient = e), (this._accessTokenFactory = t);
        }
        async send(e) {
          let t = !0;
          this._accessTokenFactory &&
            (!this._accessToken ||
              (e.url && e.url.indexOf("/negotiate?") > 0)) &&
            ((t = !1), (this._accessToken = await this._accessTokenFactory())),
            this._setAuthorizationHeader(e);
          let r = await this._innerClient.send(e);
          return t && 401 === r.statusCode && this._accessTokenFactory
            ? ((this._accessToken = await this._accessTokenFactory()),
              this._setAuthorizationHeader(e),
              await this._innerClient.send(e))
            : r;
        }
        _setAuthorizationHeader(e) {
          e.headers || (e.headers = {}),
            this._accessToken
              ? (e.headers[i.Authorization] = `Bearer ${this._accessToken}`)
              : this._accessTokenFactory &&
                e.headers[i.Authorization] &&
                delete e.headers[i.Authorization];
        }
        getCookieString(e) {
          return this._innerClient.getCookieString(e);
        }
      }
      class l extends Error {
        constructor(e, t) {
          let r = new.target.prototype;
          super(`${e}: Status code '${t}'`),
            (this.statusCode = t),
            (this.__proto__ = r);
        }
      }
      class u extends Error {
        constructor(e = "A timeout occurred.") {
          let t = new.target.prototype;
          super(e), (this.__proto__ = t);
        }
      }
      class h extends Error {
        constructor(e = "An abort occurred.") {
          let t = new.target.prototype;
          super(e), (this.__proto__ = t);
        }
      }
      class f extends Error {
        constructor(e, t) {
          let r = new.target.prototype;
          super(e),
            (this.transport = t),
            (this.errorType = "UnsupportedTransportError"),
            (this.__proto__ = r);
        }
      }
      class d extends Error {
        constructor(e, t) {
          let r = new.target.prototype;
          super(e),
            (this.transport = t),
            (this.errorType = "DisabledTransportError"),
            (this.__proto__ = r);
        }
      }
      class p extends Error {
        constructor(e, t) {
          let r = new.target.prototype;
          super(e),
            (this.transport = t),
            (this.errorType = "FailedToStartTransportError"),
            (this.__proto__ = r);
        }
      }
      class g extends Error {
        constructor(e) {
          let t = new.target.prototype;
          super(e),
            (this.errorType = "FailedToNegotiateWithServerError"),
            (this.__proto__ = t);
        }
      }
      class y extends Error {
        constructor(e, t) {
          let r = new.target.prototype;
          super(e), (this.innerErrors = t), (this.__proto__ = r);
        }
      }
      var m,
        v,
        b = r(4177),
        w = r(7991),
        _ = r(4122);
      class S {
        static isRequired(e, t) {
          if (null == e) throw Error(`The '${t}' argument is required.`);
        }
        static isNotEmpty(e, t) {
          if (!e || e.match(/^\s*$/))
            throw Error(`The '${t}' argument should not be empty.`);
        }
        static isIn(e, t, r) {
          if (!(e in t)) throw Error(`Unknown ${r} value: ${e}.`);
        }
      }
      class E {
        static get isBrowser() {
          return (
            "object" == typeof window && "object" == typeof window.document
          );
        }
        static get isWebWorker() {
          return "object" == typeof self && "importScripts" in self;
        }
        static get isReactNative() {
          return "object" == typeof window && void 0 === window.document;
        }
        static get isNode() {
          return !this.isBrowser && !this.isWebWorker && !this.isReactNative;
        }
      }
      function C(e, t) {
        let r = "";
        return (
          T(e)
            ? ((r = `Binary data of length ${e.byteLength}`),
              t &&
                (r += `. Content: '${(function (e) {
                  let t = new Uint8Array(e),
                    r = "";
                  return (
                    t.forEach((e) => {
                      r += `0x${e < 16 ? "0" : ""}${e.toString(16)} `;
                    }),
                    r.substr(0, r.length - 1)
                  );
                })(e)}'`))
            : "string" == typeof e &&
              ((r = `String data of length ${e.length}`),
              t && (r += `. Content: '${e}'`)),
          r
        );
      }
      function T(e) {
        return (
          e &&
          "undefined" != typeof ArrayBuffer &&
          (e instanceof ArrayBuffer ||
            (e.constructor && "ArrayBuffer" === e.constructor.name))
        );
      }
      async function k(e, t, r, n, o, i) {
        let s = {},
          [a, c] = P();
        (s[a] = c),
          e.log(
            b.i.Trace,
            `(${t} transport) sending data. ${C(o, i.logMessageContent)}.`
          );
        let l = T(o) ? "arraybuffer" : "text",
          u = await r.post(n, {
            content: o,
            headers: {
              ...s,
              ...i.headers,
            },
            responseType: l,
            timeout: i.timeout,
            withCredentials: i.withCredentials,
          });
        e.log(
          b.i.Trace,
          `(${t} transport) request complete. Response status: ${u.statusCode}.`
        );
      }
      class I {
        constructor(e, t) {
          (this._subject = e), (this._observer = t);
        }
        dispose() {
          let e = this._subject.observers.indexOf(this._observer);
          e > -1 && this._subject.observers.splice(e, 1),
            0 === this._subject.observers.length &&
              this._subject.cancelCallback &&
              this._subject.cancelCallback().catch((e) => {});
        }
      }
      class x {
        constructor(e) {
          (this._minLevel = e), (this.out = console);
        }
        log(e, t) {
          if (e >= this._minLevel) {
            let r = `[${new Date().toISOString()}] ${b.i[e]}: ${t}`;
            switch (e) {
              case b.i.Critical:
              case b.i.Error:
                this.out.error(r);
                break;
              case b.i.Warning:
                this.out.warn(r);
                break;
              case b.i.Information:
                this.out.info(r);
                break;
              default:
                this.out.log(r);
            }
          }
        }
      }
      function P() {
        let e = "X-SignalR-User-Agent";
        return (
          E.isNode && (e = "User-Agent"),
          [
            e,
            (function (e, t, r, n) {
              let o = "Microsoft SignalR/",
                i = e.split(".");
              return (
                (o += `${i[0]}.${i[1]} (${e}; `),
                t && "" !== t ? (o += `${t}; `) : (o += "Unknown OS; "),
                (o += `${r}`),
                n ? (o += `; ${n}`) : (o += "; Unknown Runtime Version"),
                (o += ")")
              );
            })(
              "7.0.14",
              (function () {
                if (!E.isNode) return "";
                switch (_.platform) {
                  case "win32":
                    return "Windows NT";
                  case "darwin":
                    return "macOS";
                  case "linux":
                    return "Linux";
                  default:
                    return _.platform;
                }
              })(),
              E.isNode ? "NodeJS" : "Browser",
              (function () {
                if (E.isNode) return _.versions.node;
              })()
            ),
          ]
        );
      }
      function O(e) {
        return e.stack ? e.stack : e.message ? e.message : `${e}`;
      }
      class R extends a {
        constructor(e) {
          if ((super(), (this._logger = e), "undefined" == typeof fetch)) {
            let e = require;
            (this._jar = new (e("tough-cookie").CookieJar)()),
              (this._fetchType = e("node-fetch")),
              (this._fetchType = e("fetch-cookie")(this._fetchType, this._jar));
          } else
            this._fetchType = fetch.bind(
              (function () {
                if ("undefined" != typeof globalThis) return globalThis;
                if ("undefined" != typeof self) return self;
                if ("undefined" != typeof window) return window;
                if (void 0 !== r.g) return r.g;
                throw Error("could not find global");
              })()
            );
          if ("undefined" == typeof AbortController) {
            let e = require;
            this._abortControllerType = e("abort-controller");
          } else this._abortControllerType = AbortController;
        }
        async send(e) {
          let t, r;
          if (e.abortSignal && e.abortSignal.aborted) throw new h();
          if (!e.method) throw Error("No method defined.");
          if (!e.url) throw Error("No url defined.");
          let n = new this._abortControllerType();
          e.abortSignal &&
            (e.abortSignal.onabort = () => {
              n.abort(), (t = new h());
            });
          let o = null;
          e.timeout &&
            (o = setTimeout(() => {
              n.abort(),
                this._logger.log(b.i.Warning, "Timeout from HTTP request."),
                (t = new u());
            }, e.timeout)),
            "" === e.content && (e.content = void 0),
            e.content &&
              ((e.headers = e.headers || {}),
              T(e.content)
                ? (e.headers["Content-Type"] = "application/octet-stream")
                : (e.headers["Content-Type"] = "text/plain;charset=UTF-8"));
          try {
            r = await this._fetchType(e.url, {
              body: e.content,
              cache: "no-cache",
              credentials: !0 === e.withCredentials ? "include" : "same-origin",
              headers: {
                "X-Requested-With": "XMLHttpRequest",
                ...e.headers,
              },
              method: e.method,
              mode: "cors",
              redirect: "follow",
              signal: n.signal,
            });
          } catch (e) {
            if (t) throw t;
            throw (
              (this._logger.log(b.i.Warning, `Error from HTTP request. ${e}.`),
              e)
            );
          } finally {
            o && clearTimeout(o),
              e.abortSignal && (e.abortSignal.onabort = null);
          }
          if (!r.ok)
            throw new l((await D(r, "text")) || r.statusText, r.status);
          let i = D(r, e.responseType),
            a = await i;
          return new s(r.status, r.statusText, a);
        }
        getCookieString(e) {
          let t = "";
          return (
            E.isNode &&
              this._jar &&
              this._jar.getCookies(e, (e, r) => (t = r.join("; "))),
            t
          );
        }
      }
      function D(e, t) {
        let r;
        switch (t) {
          case "arraybuffer":
            r = e.arrayBuffer();
            break;
          case "text":
          default:
            r = e.text();
            break;
          case "blob":
          case "document":
          case "json":
            throw Error(`${t} is not supported.`);
        }
        return r;
      }
      class U extends a {
        constructor(e) {
          super(), (this._logger = e);
        }
        send(e) {
          return e.abortSignal && e.abortSignal.aborted
            ? Promise.reject(new h())
            : e.method
            ? e.url
              ? new Promise((t, r) => {
                  let n = new XMLHttpRequest();
                  n.open(e.method, e.url, !0),
                    (n.withCredentials =
                      void 0 === e.withCredentials || e.withCredentials),
                    n.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                    "" === e.content && (e.content = void 0),
                    e.content &&
                      (T(e.content)
                        ? n.setRequestHeader(
                            "Content-Type",
                            "application/octet-stream"
                          )
                        : n.setRequestHeader(
                            "Content-Type",
                            "text/plain;charset=UTF-8"
                          ));
                  let o = e.headers;
                  o &&
                    Object.keys(o).forEach((e) => {
                      n.setRequestHeader(e, o[e]);
                    }),
                    e.responseType && (n.responseType = e.responseType),
                    e.abortSignal &&
                      (e.abortSignal.onabort = () => {
                        n.abort(), r(new h());
                      }),
                    e.timeout && (n.timeout = e.timeout),
                    (n.onload = () => {
                      e.abortSignal && (e.abortSignal.onabort = null),
                        n.status >= 200 && n.status < 300
                          ? t(
                              new s(
                                n.status,
                                n.statusText,
                                n.response || n.responseText
                              )
                            )
                          : r(
                              new l(
                                n.response || n.responseText || n.statusText,
                                n.status
                              )
                            );
                    }),
                    (n.onerror = () => {
                      this._logger.log(
                        b.i.Warning,
                        `Error from HTTP request. ${n.status}: ${n.statusText}.`
                      ),
                        r(new l(n.statusText, n.status));
                    }),
                    (n.ontimeout = () => {
                      this._logger.log(
                        b.i.Warning,
                        "Timeout from HTTP request."
                      ),
                        r(new u());
                    }),
                    n.send(e.content);
                })
              : Promise.reject(Error("No url defined."))
            : Promise.reject(Error("No method defined."));
        }
      }
      class A extends a {
        constructor(e) {
          if ((super(), "undefined" != typeof fetch || E.isNode))
            this._httpClient = new R(e);
          else if ("undefined" != typeof XMLHttpRequest)
            this._httpClient = new U(e);
          else throw Error("No usable HttpClient found.");
        }
        send(e) {
          return e.abortSignal && e.abortSignal.aborted
            ? Promise.reject(new h())
            : e.method
            ? e.url
              ? this._httpClient.send(e)
              : Promise.reject(Error("No url defined."))
            : Promise.reject(Error("No method defined."));
        }
        getCookieString(e) {
          return this._httpClient.getCookieString(e);
        }
      }
      var j = r(2706);
      class N {
        constructor() {
          (this._isAborted = !1), (this.onabort = null);
        }
        abort() {
          !this._isAborted &&
            ((this._isAborted = !0), this.onabort && this.onabort());
        }
        get signal() {
          return this;
        }
        get aborted() {
          return this._isAborted;
        }
      }
      class B {
        constructor(e, t, r) {
          (this._httpClient = e),
            (this._logger = t),
            (this._pollAbort = new N()),
            (this._options = r),
            (this._running = !1),
            (this.onreceive = null),
            (this.onclose = null);
        }
        get pollAborted() {
          return this._pollAbort.aborted;
        }
        async connect(e, t) {
          if (
            (S.isRequired(e, "url"),
            S.isRequired(t, "transferFormat"),
            S.isIn(t, j.k, "transferFormat"),
            (this._url = e),
            this._logger.log(b.i.Trace, "(LongPolling transport) Connecting."),
            t === j.k.Binary &&
              "undefined" != typeof XMLHttpRequest &&
              "string" != typeof new XMLHttpRequest().responseType)
          )
            throw Error(
              "Binary protocols over XmlHttpRequest not implementing advanced features are not supported."
            );
          let [r, n] = P(),
            o = {
              [r]: n,
              ...this._options.headers,
            },
            i = {
              abortSignal: this._pollAbort.signal,
              headers: o,
              timeout: 1e5,
              withCredentials: this._options.withCredentials,
            };
          t === j.k.Binary && (i.responseType = "arraybuffer");
          let s = `${e}&_=${Date.now()}`;
          this._logger.log(b.i.Trace, `(LongPolling transport) polling: ${s}.`);
          let a = await this._httpClient.get(s, i);
          200 !== a.statusCode
            ? (this._logger.log(
                b.i.Error,
                `(LongPolling transport) Unexpected response code: ${a.statusCode}.`
              ),
              (this._closeError = new l(a.statusText || "", a.statusCode)),
              (this._running = !1))
            : (this._running = !0),
            (this._receiving = this._poll(this._url, i));
        }
        async _poll(e, t) {
          try {
            for (; this._running; )
              try {
                let r = `${e}&_=${Date.now()}`;
                this._logger.log(
                  b.i.Trace,
                  `(LongPolling transport) polling: ${r}.`
                );
                let n = await this._httpClient.get(r, t);
                204 === n.statusCode
                  ? (this._logger.log(
                      b.i.Information,
                      "(LongPolling transport) Poll terminated by server."
                    ),
                    (this._running = !1))
                  : 200 !== n.statusCode
                  ? (this._logger.log(
                      b.i.Error,
                      `(LongPolling transport) Unexpected response code: ${n.statusCode}.`
                    ),
                    (this._closeError = new l(
                      n.statusText || "",
                      n.statusCode
                    )),
                    (this._running = !1))
                  : n.content
                  ? (this._logger.log(
                      b.i.Trace,
                      `(LongPolling transport) data received. ${C(
                        n.content,
                        this._options.logMessageContent
                      )}.`
                    ),
                    this.onreceive && this.onreceive(n.content))
                  : this._logger.log(
                      b.i.Trace,
                      "(LongPolling transport) Poll timed out, reissuing."
                    );
              } catch (e) {
                this._running
                  ? e instanceof u
                    ? this._logger.log(
                        b.i.Trace,
                        "(LongPolling transport) Poll timed out, reissuing."
                      )
                    : ((this._closeError = e), (this._running = !1))
                  : this._logger.log(
                      b.i.Trace,
                      `(LongPolling transport) Poll errored after shutdown: ${e.message}`
                    );
              }
          } finally {
            this._logger.log(
              b.i.Trace,
              "(LongPolling transport) Polling complete."
            ),
              this.pollAborted || this._raiseOnClose();
          }
        }
        async send(e) {
          return this._running
            ? k(
                this._logger,
                "LongPolling",
                this._httpClient,
                this._url,
                e,
                this._options
              )
            : Promise.reject(
                Error("Cannot send until the transport is connected")
              );
        }
        async stop() {
          this._logger.log(
            b.i.Trace,
            "(LongPolling transport) Stopping polling."
          ),
            (this._running = !1),
            this._pollAbort.abort();
          try {
            await this._receiving,
              this._logger.log(
                b.i.Trace,
                `(LongPolling transport) sending DELETE request to ${this._url}.`
              );
            let e = {},
              [t, r] = P();
            e[t] = r;
            let n = {
              headers: {
                ...e,
                ...this._options.headers,
              },
              timeout: this._options.timeout,
              withCredentials: this._options.withCredentials,
            };
            await this._httpClient.delete(this._url, n),
              this._logger.log(
                b.i.Trace,
                "(LongPolling transport) DELETE request sent."
              );
          } finally {
            this._logger.log(
              b.i.Trace,
              "(LongPolling transport) Stop finished."
            ),
              this._raiseOnClose();
          }
        }
        _raiseOnClose() {
          if (this.onclose) {
            let e = "(LongPolling transport) Firing onclose event.";
            this._closeError && (e += " Error: " + this._closeError),
              this._logger.log(b.i.Trace, e),
              this.onclose(this._closeError);
          }
        }
      }
      class L {
        constructor(e, t, r, n) {
          (this._httpClient = e),
            (this._accessToken = t),
            (this._logger = r),
            (this._options = n),
            (this.onreceive = null),
            (this.onclose = null);
        }
        async connect(e, t) {
          return (
            S.isRequired(e, "url"),
            S.isRequired(t, "transferFormat"),
            S.isIn(t, j.k, "transferFormat"),
            this._logger.log(b.i.Trace, "(SSE transport) Connecting."),
            (this._url = e),
            this._accessToken &&
              (e +=
                (0 > e.indexOf("?") ? "?" : "&") +
                `access_token=${encodeURIComponent(this._accessToken)}`),
            new Promise((r, n) => {
              let o,
                i = !1;
              if (t !== j.k.Text) {
                n(
                  Error(
                    "The Server-Sent Events transport only supports the 'Text' transfer format"
                  )
                );
                return;
              }
              if (E.isBrowser || E.isWebWorker)
                o = new this._options.EventSource(e, {
                  withCredentials: this._options.withCredentials,
                });
              else {
                let t = this._httpClient.getCookieString(e),
                  r = {};
                r.Cookie = t;
                let [n, i] = P();
                (r[n] = i),
                  (o = new this._options.EventSource(e, {
                    withCredentials: this._options.withCredentials,
                    headers: {
                      ...r,
                      ...this._options.headers,
                    },
                  }));
              }
              try {
                (o.onmessage = (e) => {
                  if (this.onreceive)
                    try {
                      this._logger.log(
                        b.i.Trace,
                        `(SSE transport) data received. ${C(
                          e.data,
                          this._options.logMessageContent
                        )}.`
                      ),
                        this.onreceive(e.data);
                    } catch (e) {
                      this._close(e);
                      return;
                    }
                }),
                  (o.onerror = (e) => {
                    i
                      ? this._close()
                      : n(
                          Error(
                            "EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."
                          )
                        );
                  }),
                  (o.onopen = () => {
                    this._logger.log(
                      b.i.Information,
                      `SSE connected to ${this._url}`
                    ),
                      (this._eventSource = o),
                      (i = !0),
                      r();
                  });
              } catch (e) {
                n(e);
                return;
              }
            })
          );
        }
        async send(e) {
          return this._eventSource
            ? k(
                this._logger,
                "SSE",
                this._httpClient,
                this._url,
                e,
                this._options
              )
            : Promise.reject(
                Error("Cannot send until the transport is connected")
              );
        }
        stop() {
          return this._close(), Promise.resolve();
        }
        _close(e) {
          this._eventSource &&
            (this._eventSource.close(),
            (this._eventSource = void 0),
            this.onclose && this.onclose(e));
        }
      }
      class M {
        constructor(e, t, r, n, o, i) {
          (this._logger = r),
            (this._accessTokenFactory = t),
            (this._logMessageContent = n),
            (this._webSocketConstructor = o),
            (this._httpClient = e),
            (this.onreceive = null),
            (this.onclose = null),
            (this._headers = i);
        }
        async connect(e, t) {
          let r;
          return (
            S.isRequired(e, "url"),
            S.isRequired(t, "transferFormat"),
            S.isIn(t, j.k, "transferFormat"),
            this._logger.log(b.i.Trace, "(WebSockets transport) Connecting."),
            this._accessTokenFactory && (r = await this._accessTokenFactory()),
            new Promise((n, o) => {
              let s;
              e = e.replace(/^http/, "ws");
              let a = this._httpClient.getCookieString(e),
                c = !1;
              if (E.isNode || E.isReactNative) {
                let t = {},
                  [n, o] = P();
                (t[n] = o),
                  r && (t[i.Authorization] = `Bearer ${r}`),
                  a && (t[i.Cookie] = a),
                  (s = new this._webSocketConstructor(e, void 0, {
                    headers: {
                      ...t,
                      ...this._headers,
                    },
                  }));
              } else
                r &&
                  (e +=
                    (0 > e.indexOf("?") ? "?" : "&") +
                    `access_token=${encodeURIComponent(r)}`);
              s || (s = new this._webSocketConstructor(e)),
                t === j.k.Binary && (s.binaryType = "arraybuffer"),
                (s.onopen = (t) => {
                  this._logger.log(
                    b.i.Information,
                    `WebSocket connected to ${e}.`
                  ),
                    (this._webSocket = s),
                    (c = !0),
                    n();
                }),
                (s.onerror = (e) => {
                  let t = null;
                  "undefined" != typeof ErrorEvent && e instanceof ErrorEvent
                    ? (t = e.error)
                    : (t = "There was an error with the transport"),
                    this._logger.log(
                      b.i.Information,
                      `(WebSockets transport) ${t}.`
                    );
                }),
                (s.onmessage = (e) => {
                  if (
                    (this._logger.log(
                      b.i.Trace,
                      `(WebSockets transport) data received. ${C(
                        e.data,
                        this._logMessageContent
                      )}.`
                    ),
                    this.onreceive)
                  )
                    try {
                      this.onreceive(e.data);
                    } catch (e) {
                      this._close(e);
                      return;
                    }
                }),
                (s.onclose = (e) => {
                  if (c) this._close(e);
                  else {
                    let t = null;
                    "undefined" != typeof ErrorEvent && e instanceof ErrorEvent
                      ? (t = e.error)
                      : (t =
                          "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled."),
                      o(Error(t));
                  }
                });
            })
          );
        }
        send(e) {
          return this._webSocket &&
            this._webSocket.readyState === this._webSocketConstructor.OPEN
            ? (this._logger.log(
                b.i.Trace,
                `(WebSockets transport) sending data. ${C(
                  e,
                  this._logMessageContent
                )}.`
              ),
              this._webSocket.send(e),
              Promise.resolve())
            : Promise.reject("WebSocket is not in the OPEN state");
        }
        stop() {
          return this._webSocket && this._close(void 0), Promise.resolve();
        }
        _close(e) {
          this._webSocket &&
            ((this._webSocket.onclose = () => {}),
            (this._webSocket.onmessage = () => {}),
            (this._webSocket.onerror = () => {}),
            this._webSocket.close(),
            (this._webSocket = void 0)),
            this._logger.log(
              b.i.Trace,
              "(WebSockets transport) socket closed."
            ),
            this.onclose &&
              (this._isCloseEvent(e) && (!1 === e.wasClean || 1e3 !== e.code)
                ? this.onclose(
                    Error(
                      `WebSocket closed with status code: ${e.code} (${
                        e.reason || "no reason given"
                      }).`
                    )
                  )
                : e instanceof Error
                ? this.onclose(e)
                : this.onclose());
        }
        _isCloseEvent(e) {
          return (
            e && "boolean" == typeof e.wasClean && "number" == typeof e.code
          );
        }
      }
      class F {
        constructor(e, t = {}) {
          var r;
          if (
            ((this._stopPromiseResolver = () => {}),
            (this.features = {}),
            (this._negotiateVersion = 1),
            S.isRequired(e, "url"),
            (this._logger =
              void 0 === (r = t.logger)
                ? new x(b.i.Information)
                : null === r
                ? w.W.instance
                : void 0 !== r.log
                ? r
                : new x(r)),
            (this.baseUrl = this._resolveUrl(e)),
            ((t = t || {}).logMessageContent =
              void 0 !== t.logMessageContent && t.logMessageContent),
            "boolean" == typeof t.withCredentials ||
              void 0 === t.withCredentials)
          )
            t.withCredentials =
              void 0 === t.withCredentials || t.withCredentials;
          else
            throw Error(
              "withCredentials option was not a 'boolean' or 'undefined' value"
            );
          t.timeout = void 0 === t.timeout ? 1e5 : t.timeout;
          let n = null,
            o = null;
          if (E.isNode) {
            let e = require;
            (n = e("ws")), (o = e("eventsource"));
          }
          E.isNode || "undefined" == typeof WebSocket || t.WebSocket
            ? E.isNode && !t.WebSocket && n && (t.WebSocket = n)
            : (t.WebSocket = WebSocket),
            E.isNode || "undefined" == typeof EventSource || t.EventSource
              ? E.isNode &&
                !t.EventSource &&
                void 0 !== o &&
                (t.EventSource = o)
              : (t.EventSource = EventSource),
            (this._httpClient = new c(
              t.httpClient || new A(this._logger),
              t.accessTokenFactory
            )),
            (this._connectionState = "Disconnected"),
            (this._connectionStarted = !1),
            (this._options = t),
            (this.onreceive = null),
            (this.onclose = null);
        }
        async start(e) {
          if (
            ((e = e || j.k.Binary),
            S.isIn(e, j.k, "transferFormat"),
            this._logger.log(
              b.i.Debug,
              `Starting connection with transfer format '${j.k[e]}'.`
            ),
            "Disconnected" !== this._connectionState)
          )
            return Promise.reject(
              Error(
                "Cannot start an HttpConnection that is not in the 'Disconnected' state."
              )
            );
          if (
            ((this._connectionState = "Connecting"),
            (this._startInternalPromise = this._startInternal(e)),
            await this._startInternalPromise,
            "Disconnecting" === this._connectionState)
          ) {
            let e =
              "Failed to start the HttpConnection before stop() was called.";
            return (
              this._logger.log(b.i.Error, e),
              await this._stopPromise,
              Promise.reject(new h(e))
            );
          }
          if ("Connected" !== this._connectionState) {
            let e =
              "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
            return this._logger.log(b.i.Error, e), Promise.reject(new h(e));
          }
          this._connectionStarted = !0;
        }
        send(e) {
          return "Connected" !== this._connectionState
            ? Promise.reject(
                Error(
                  "Cannot send data if the connection is not in the 'Connected' State."
                )
              )
            : (this._sendQueue || (this._sendQueue = new z(this.transport)),
              this._sendQueue.send(e));
        }
        async stop(e) {
          return "Disconnected" === this._connectionState
            ? (this._logger.log(
                b.i.Debug,
                `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`
              ),
              Promise.resolve())
            : "Disconnecting" === this._connectionState
            ? (this._logger.log(
                b.i.Debug,
                `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`
              ),
              this._stopPromise)
            : void ((this._connectionState = "Disconnecting"),
              (this._stopPromise = new Promise((e) => {
                this._stopPromiseResolver = e;
              })),
              await this._stopInternal(e),
              await this._stopPromise);
        }
        async _stopInternal(e) {
          this._stopError = e;
          try {
            await this._startInternalPromise;
          } catch (e) {}
          if (this.transport) {
            try {
              await this.transport.stop();
            } catch (e) {
              this._logger.log(
                b.i.Error,
                `HttpConnection.transport.stop() threw error '${e}'.`
              ),
                this._stopConnection();
            }
            this.transport = void 0;
          } else
            this._logger.log(
              b.i.Debug,
              "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed."
            );
        }
        async _startInternal(e) {
          let t = this.baseUrl;
          (this._accessTokenFactory = this._options.accessTokenFactory),
            (this._httpClient._accessTokenFactory = this._accessTokenFactory);
          try {
            if (this._options.skipNegotiation) {
              if (this._options.transport === j.n.WebSockets)
                (this.transport = this._constructTransport(j.n.WebSockets)),
                  await this._startTransport(t, e);
              else
                throw Error(
                  "Negotiation can only be skipped when using the WebSocket transport directly."
                );
            } else {
              let r = null,
                n = 0;
              do {
                if (
                  ((r = await this._getNegotiationResponse(t)),
                  "Disconnecting" === this._connectionState ||
                    "Disconnected" === this._connectionState)
                )
                  throw new h("The connection was stopped during negotiation.");
                if (r.error) throw Error(r.error);
                if (r.ProtocolVersion)
                  throw Error(
                    "Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details."
                  );
                if ((r.url && (t = r.url), r.accessToken)) {
                  let e = r.accessToken;
                  (this._accessTokenFactory = () => e),
                    (this._httpClient._accessToken = e),
                    (this._httpClient._accessTokenFactory = void 0);
                }
                n++;
              } while (r.url && n < 100);
              if (100 === n && r.url)
                throw Error("Negotiate redirection limit exceeded.");
              await this._createTransport(t, this._options.transport, r, e);
            }
            this.transport instanceof B &&
              (this.features.inherentKeepAlive = !0),
              "Connecting" === this._connectionState &&
                (this._logger.log(
                  b.i.Debug,
                  "The HttpConnection connected successfully."
                ),
                (this._connectionState = "Connected"));
          } catch (e) {
            return (
              this._logger.log(
                b.i.Error,
                "Failed to start the connection: " + e
              ),
              (this._connectionState = "Disconnected"),
              (this.transport = void 0),
              this._stopPromiseResolver(),
              Promise.reject(e)
            );
          }
        }
        async _getNegotiationResponse(e) {
          let t = {},
            [r, n] = P();
          t[r] = n;
          let o = this._resolveNegotiateUrl(e);
          this._logger.log(b.i.Debug, `Sending negotiation request: ${o}.`);
          try {
            let e = await this._httpClient.post(o, {
              content: "",
              headers: {
                ...t,
                ...this._options.headers,
              },
              timeout: this._options.timeout,
              withCredentials: this._options.withCredentials,
            });
            if (200 !== e.statusCode)
              return Promise.reject(
                Error(
                  `Unexpected status code returned from negotiate '${e.statusCode}'`
                )
              );
            let r = JSON.parse(e.content);
            return (
              (!r.negotiateVersion || r.negotiateVersion < 1) &&
                (r.connectionToken = r.connectionId),
              r
            );
          } catch (t) {
            let e = "Failed to complete negotiation with the server: " + t;
            return (
              t instanceof l &&
                404 === t.statusCode &&
                (e +=
                  " Either this is not a SignalR endpoint or there is a proxy blocking the connection."),
              this._logger.log(b.i.Error, e),
              Promise.reject(new g(e))
            );
          }
        }
        _createConnectUrl(e, t) {
          return t ? e + (-1 === e.indexOf("?") ? "?" : "&") + `id=${t}` : e;
        }
        async _createTransport(e, t, r, n) {
          let o = this._createConnectUrl(e, r.connectionToken);
          if (this._isITransport(t)) {
            this._logger.log(
              b.i.Debug,
              "Connection was provided an instance of ITransport, using that directly."
            ),
              (this.transport = t),
              await this._startTransport(o, n),
              (this.connectionId = r.connectionId);
            return;
          }
          let i = [],
            s = r.availableTransports || [],
            a = r;
          for (let r of s) {
            let s = this._resolveTransportOrError(r, t, n);
            if (s instanceof Error) i.push(`${r.transport} failed:`), i.push(s);
            else if (this._isITransport(s)) {
              if (((this.transport = s), !a)) {
                try {
                  a = await this._getNegotiationResponse(e);
                } catch (e) {
                  return Promise.reject(e);
                }
                o = this._createConnectUrl(e, a.connectionToken);
              }
              try {
                await this._startTransport(o, n),
                  (this.connectionId = a.connectionId);
                return;
              } catch (e) {
                if (
                  (this._logger.log(
                    b.i.Error,
                    `Failed to start the transport '${r.transport}': ${e}`
                  ),
                  (a = void 0),
                  i.push(
                    new p(`${r.transport} failed: ${e}`, j.n[r.transport])
                  ),
                  "Connecting" !== this._connectionState)
                ) {
                  let e =
                    "Failed to select transport before stop() was called.";
                  return (
                    this._logger.log(b.i.Debug, e), Promise.reject(new h(e))
                  );
                }
              }
            }
          }
          return i.length > 0
            ? Promise.reject(
                new y(
                  `Unable to connect to the server with any of the available transports. ${i.join(
                    " "
                  )}`,
                  i
                )
              )
            : Promise.reject(
                Error(
                  "None of the transports supported by the client are supported by the server."
                )
              );
        }
        _constructTransport(e) {
          switch (e) {
            case j.n.WebSockets:
              if (!this._options.WebSocket)
                throw Error(
                  "'WebSocket' is not supported in your environment."
                );
              return new M(
                this._httpClient,
                this._accessTokenFactory,
                this._logger,
                this._options.logMessageContent,
                this._options.WebSocket,
                this._options.headers || {}
              );
            case j.n.ServerSentEvents:
              if (!this._options.EventSource)
                throw Error(
                  "'EventSource' is not supported in your environment."
                );
              return new L(
                this._httpClient,
                this._httpClient._accessToken,
                this._logger,
                this._options
              );
            case j.n.LongPolling:
              return new B(this._httpClient, this._logger, this._options);
            default:
              throw Error(`Unknown transport: ${e}.`);
          }
        }
        _startTransport(e, t) {
          return (
            (this.transport.onreceive = this.onreceive),
            (this.transport.onclose = (e) => this._stopConnection(e)),
            this.transport.connect(e, t)
          );
        }
        _resolveTransportOrError(e, t, r) {
          let n = j.n[e.transport];
          if (null == n)
            return (
              this._logger.log(
                b.i.Debug,
                `Skipping transport '${e.transport}' because it is not supported by this client.`
              ),
              Error(
                `Skipping transport '${e.transport}' because it is not supported by this client.`
              )
            );
          if (t && (n & t) == 0)
            return (
              this._logger.log(
                b.i.Debug,
                `Skipping transport '${j.n[n]}' because it was disabled by the client.`
              ),
              new d(`'${j.n[n]}' is disabled by the client.`, n)
            );
          if (!(e.transferFormats.map((e) => j.k[e]).indexOf(r) >= 0))
            return (
              this._logger.log(
                b.i.Debug,
                `Skipping transport '${j.n[n]}' because it does not support the requested transfer format '${j.k[r]}'.`
              ),
              Error(`'${j.n[n]}' does not support ${j.k[r]}.`)
            );
          if (
            (n === j.n.WebSockets && !this._options.WebSocket) ||
            (n === j.n.ServerSentEvents && !this._options.EventSource)
          )
            return (
              this._logger.log(
                b.i.Debug,
                `Skipping transport '${j.n[n]}' because it is not supported in your environment.'`
              ),
              new f(`'${j.n[n]}' is not supported in your environment.`, n)
            );
          this._logger.log(b.i.Debug, `Selecting transport '${j.n[n]}'.`);
          try {
            return this._constructTransport(n);
          } catch (e) {
            return e;
          }
        }
        _isITransport(e) {
          return e && "object" == typeof e && "connect" in e;
        }
        _stopConnection(e) {
          if (
            (this._logger.log(
              b.i.Debug,
              `HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`
            ),
            (this.transport = void 0),
            (e = this._stopError || e),
            (this._stopError = void 0),
            "Disconnected" === this._connectionState)
          ) {
            this._logger.log(
              b.i.Debug,
              `Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`
            );
            return;
          }
          if ("Connecting" === this._connectionState)
            throw (
              (this._logger.log(
                b.i.Warning,
                `Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`
              ),
              Error(
                `HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`
              ))
            );
          if (
            ("Disconnecting" === this._connectionState &&
              this._stopPromiseResolver(),
            e
              ? this._logger.log(
                  b.i.Error,
                  `Connection disconnected with error '${e}'.`
                )
              : this._logger.log(b.i.Information, "Connection disconnected."),
            this._sendQueue &&
              (this._sendQueue.stop().catch((e) => {
                this._logger.log(
                  b.i.Error,
                  `TransportSendQueue.stop() threw error '${e}'.`
                );
              }),
              (this._sendQueue = void 0)),
            (this.connectionId = void 0),
            (this._connectionState = "Disconnected"),
            this._connectionStarted)
          ) {
            this._connectionStarted = !1;
            try {
              this.onclose && this.onclose(e);
            } catch (t) {
              this._logger.log(
                b.i.Error,
                `HttpConnection.onclose(${e}) threw error '${t}'.`
              );
            }
          }
        }
        _resolveUrl(e) {
          if (
            0 === e.lastIndexOf("https://", 0) ||
            0 === e.lastIndexOf("http://", 0)
          )
            return e;
          if (!E.isBrowser) throw Error(`Cannot resolve '${e}'.`);
          let t = window.document.createElement("a");
          return (
            (t.href = e),
            this._logger.log(
              b.i.Information,
              `Normalizing '${e}' to '${t.href}'.`
            ),
            t.href
          );
        }
        _resolveNegotiateUrl(e) {
          let t = e.indexOf("?"),
            r = e.substring(0, -1 === t ? e.length : t);
          return (
            "/" !== r[r.length - 1] && (r += "/"),
            -1 ===
              (r += "negotiate" + (-1 === t ? "" : e.substring(t))).indexOf(
                "negotiateVersion"
              ) &&
              (r +=
                (-1 === t ? "?" : "&") +
                "negotiateVersion=" +
                this._negotiateVersion),
            r
          );
        }
      }
      class z {
        constructor(e) {
          (this._transport = e),
            (this._buffer = []),
            (this._executing = !0),
            (this._sendBufferedData = new $()),
            (this._transportResult = new $()),
            (this._sendLoopPromise = this._sendLoop());
        }
        send(e) {
          return (
            this._bufferData(e),
            this._transportResult || (this._transportResult = new $()),
            this._transportResult.promise
          );
        }
        stop() {
          return (
            (this._executing = !1),
            this._sendBufferedData.resolve(),
            this._sendLoopPromise
          );
        }
        _bufferData(e) {
          if (this._buffer.length && typeof this._buffer[0] != typeof e)
            throw Error(
              `Expected data to be of type ${typeof this
                ._buffer} but was of type ${typeof e}`
            );
          this._buffer.push(e), this._sendBufferedData.resolve();
        }
        async _sendLoop() {
          for (;;) {
            if ((await this._sendBufferedData.promise, !this._executing)) {
              this._transportResult &&
                this._transportResult.reject("Connection stopped.");
              break;
            }
            this._sendBufferedData = new $();
            let e = this._transportResult;
            this._transportResult = void 0;
            let t =
              "string" == typeof this._buffer[0]
                ? this._buffer.join("")
                : z._concatBuffers(this._buffer);
            this._buffer.length = 0;
            try {
              await this._transport.send(t), e.resolve();
            } catch (t) {
              e.reject(t);
            }
          }
        }
        static _concatBuffers(e) {
          let t = new Uint8Array(
              e.map((e) => e.byteLength).reduce((e, t) => e + t)
            ),
            r = 0;
          for (let n of e) t.set(new Uint8Array(n), r), (r += n.byteLength);
          return t.buffer;
        }
      }
      class $ {
        constructor() {
          this.promise = new Promise(
            (e, t) => ([this._resolver, this._rejecter] = [e, t])
          );
        }
        resolve() {
          this._resolver();
        }
        reject(e) {
          this._rejecter(e);
        }
      }
      class W {
        static write(e) {
          return `${e}${W.RecordSeparator}`;
        }
        static parse(e) {
          if (e[e.length - 1] !== W.RecordSeparator)
            throw Error("Message is incomplete.");
          let t = e.split(W.RecordSeparator);
          return t.pop(), t;
        }
      }
      (W.RecordSeparatorCode = 30),
        (W.RecordSeparator = String.fromCharCode(W.RecordSeparatorCode));
      class H {
        writeHandshakeRequest(e) {
          return W.write(JSON.stringify(e));
        }
        parseHandshakeResponse(e) {
          let t, r;
          if (T(e)) {
            let n = new Uint8Array(e),
              o = n.indexOf(W.RecordSeparatorCode);
            if (-1 === o) throw Error("Message is incomplete.");
            let i = o + 1;
            (t = String.fromCharCode.apply(
              null,
              Array.prototype.slice.call(n.slice(0, i))
            )),
              (r = n.byteLength > i ? n.slice(i).buffer : null);
          } else {
            let n = e.indexOf(W.RecordSeparator);
            if (-1 === n) throw Error("Message is incomplete.");
            let o = n + 1;
            (t = e.substring(0, o)), (r = e.length > o ? e.substring(o) : null);
          }
          let n = JSON.parse(W.parse(t)[0]);
          if (n.type)
            throw Error("Expected a handshake response from the server.");
          return [r, n];
        }
      }
      var q = r(1418);
      class V {
        constructor() {
          this.observers = [];
        }
        next(e) {
          for (let t of this.observers) t.next(e);
        }
        error(e) {
          for (let t of this.observers) t.error && t.error(e);
        }
        complete() {
          for (let e of this.observers) e.complete && e.complete();
        }
        subscribe(e) {
          return this.observers.push(e), new I(this, e);
        }
      }
      ((m = v || (v = {})).Disconnected = "Disconnected"),
        (m.Connecting = "Connecting"),
        (m.Connected = "Connected"),
        (m.Disconnecting = "Disconnecting"),
        (m.Reconnecting = "Reconnecting");
      class X {
        constructor(e, t, r, n) {
          (this._nextKeepAlive = 0),
            (this._freezeEventListener = () => {
              this._logger.log(
                b.i.Warning,
                "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://docs.microsoft.com/aspnet/core/signalr/javascript-client#bsleep"
              );
            }),
            S.isRequired(e, "connection"),
            S.isRequired(t, "logger"),
            S.isRequired(r, "protocol"),
            (this.serverTimeoutInMilliseconds = 3e4),
            (this.keepAliveIntervalInMilliseconds = 15e3),
            (this._logger = t),
            (this._protocol = r),
            (this.connection = e),
            (this._reconnectPolicy = n),
            (this._handshakeProtocol = new H()),
            (this.connection.onreceive = (e) => this._processIncomingData(e)),
            (this.connection.onclose = (e) => this._connectionClosed(e)),
            (this._callbacks = {}),
            (this._methods = {}),
            (this._closedCallbacks = []),
            (this._reconnectingCallbacks = []),
            (this._reconnectedCallbacks = []),
            (this._invocationId = 0),
            (this._receivedHandshakeResponse = !1),
            (this._connectionState = v.Disconnected),
            (this._connectionStarted = !1),
            (this._cachedPingMessage = this._protocol.writeMessage({
              type: q.C.Ping,
            }));
        }
        static create(e, t, r, n) {
          return new X(e, t, r, n);
        }
        get state() {
          return this._connectionState;
        }
        get connectionId() {
          return (this.connection && this.connection.connectionId) || null;
        }
        get baseUrl() {
          return this.connection.baseUrl || "";
        }
        set baseUrl(e) {
          if (
            this._connectionState !== v.Disconnected &&
            this._connectionState !== v.Reconnecting
          )
            throw Error(
              "The HubConnection must be in the Disconnected or Reconnecting state to change the url."
            );
          if (!e) throw Error("The HubConnection url must be a valid url.");
          this.connection.baseUrl = e;
        }
        start() {
          return (
            (this._startPromise = this._startWithStateTransitions()),
            this._startPromise
          );
        }
        async _startWithStateTransitions() {
          if (this._connectionState !== v.Disconnected)
            return Promise.reject(
              Error(
                "Cannot start a HubConnection that is not in the 'Disconnected' state."
              )
            );
          (this._connectionState = v.Connecting),
            this._logger.log(b.i.Debug, "Starting HubConnection.");
          try {
            await this._startInternal(),
              E.isBrowser &&
                window.document.addEventListener(
                  "freeze",
                  this._freezeEventListener
                ),
              (this._connectionState = v.Connected),
              (this._connectionStarted = !0),
              this._logger.log(
                b.i.Debug,
                "HubConnection connected successfully."
              );
          } catch (e) {
            return (
              (this._connectionState = v.Disconnected),
              this._logger.log(
                b.i.Debug,
                `HubConnection failed to start successfully because of error '${e}'.`
              ),
              Promise.reject(e)
            );
          }
        }
        async _startInternal() {
          (this._stopDuringStartError = void 0),
            (this._receivedHandshakeResponse = !1);
          let e = new Promise((e, t) => {
            (this._handshakeResolver = e), (this._handshakeRejecter = t);
          });
          await this.connection.start(this._protocol.transferFormat);
          try {
            let t = {
              protocol: this._protocol.name,
              version: this._protocol.version,
            };
            if (
              (this._logger.log(b.i.Debug, "Sending handshake request."),
              await this._sendMessage(
                this._handshakeProtocol.writeHandshakeRequest(t)
              ),
              this._logger.log(
                b.i.Information,
                `Using HubProtocol '${this._protocol.name}'.`
              ),
              this._cleanupTimeout(),
              this._resetTimeoutPeriod(),
              this._resetKeepAliveInterval(),
              await e,
              this._stopDuringStartError)
            )
              throw this._stopDuringStartError;
            this.connection.features.inherentKeepAlive ||
              (await this._sendMessage(this._cachedPingMessage));
          } catch (e) {
            throw (
              (this._logger.log(
                b.i.Debug,
                `Hub handshake failed with error '${e}' during start(). Stopping HubConnection.`
              ),
              this._cleanupTimeout(),
              this._cleanupPingTimer(),
              await this.connection.stop(e),
              e)
            );
          }
        }
        async stop() {
          let e = this._startPromise;
          (this._stopPromise = this._stopInternal()), await this._stopPromise;
          try {
            await e;
          } catch (e) {}
        }
        _stopInternal(e) {
          return this._connectionState === v.Disconnected
            ? (this._logger.log(
                b.i.Debug,
                `Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`
              ),
              Promise.resolve())
            : this._connectionState === v.Disconnecting
            ? (this._logger.log(
                b.i.Debug,
                `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`
              ),
              this._stopPromise)
            : ((this._connectionState = v.Disconnecting),
              this._logger.log(b.i.Debug, "Stopping HubConnection."),
              this._reconnectDelayHandle)
            ? (this._logger.log(
                b.i.Debug,
                "Connection stopped during reconnect delay. Done reconnecting."
              ),
              clearTimeout(this._reconnectDelayHandle),
              (this._reconnectDelayHandle = void 0),
              this._completeClose(),
              Promise.resolve())
            : (this._cleanupTimeout(),
              this._cleanupPingTimer(),
              (this._stopDuringStartError =
                e ||
                new h(
                  "The connection was stopped before the hub handshake could complete."
                )),
              this.connection.stop(e));
        }
        stream(e, ...t) {
          let r;
          let [n, o] = this._replaceStreamingParams(t),
            i = this._createStreamInvocation(e, t, o),
            s = new V();
          return (
            (s.cancelCallback = () => {
              let e = this._createCancelInvocation(i.invocationId);
              return (
                delete this._callbacks[i.invocationId],
                r.then(() => this._sendWithProtocol(e))
              );
            }),
            (this._callbacks[i.invocationId] = (e, t) => {
              if (t) {
                s.error(t);
                return;
              }
              e &&
                (e.type === q.C.Completion
                  ? e.error
                    ? s.error(Error(e.error))
                    : s.complete()
                  : s.next(e.item));
            }),
            (r = this._sendWithProtocol(i).catch((e) => {
              s.error(e), delete this._callbacks[i.invocationId];
            })),
            this._launchStreams(n, r),
            s
          );
        }
        _sendMessage(e) {
          return this._resetKeepAliveInterval(), this.connection.send(e);
        }
        _sendWithProtocol(e) {
          return this._sendMessage(this._protocol.writeMessage(e));
        }
        send(e, ...t) {
          let [r, n] = this._replaceStreamingParams(t),
            o = this._sendWithProtocol(this._createInvocation(e, t, !0, n));
          return this._launchStreams(r, o), o;
        }
        invoke(e, ...t) {
          let [r, n] = this._replaceStreamingParams(t),
            o = this._createInvocation(e, t, !1, n);
          return new Promise((e, t) => {
            this._callbacks[o.invocationId] = (r, n) => {
              if (n) {
                t(n);
                return;
              }
              r &&
                (r.type === q.C.Completion
                  ? r.error
                    ? t(Error(r.error))
                    : e(r.result)
                  : t(Error(`Unexpected message type: ${r.type}`)));
            };
            let n = this._sendWithProtocol(o).catch((e) => {
              t(e), delete this._callbacks[o.invocationId];
            });
            this._launchStreams(r, n);
          });
        }
        on(e, t) {
          e &&
            t &&
            ((e = e.toLowerCase()),
            this._methods[e] || (this._methods[e] = []),
            -1 === this._methods[e].indexOf(t) && this._methods[e].push(t));
        }
        off(e, t) {
          if (!e) return;
          e = e.toLowerCase();
          let r = this._methods[e];
          if (r) {
            if (t) {
              let n = r.indexOf(t);
              -1 !== n &&
                (r.splice(n, 1), 0 === r.length && delete this._methods[e]);
            } else delete this._methods[e];
          }
        }
        onclose(e) {
          e && this._closedCallbacks.push(e);
        }
        onreconnecting(e) {
          e && this._reconnectingCallbacks.push(e);
        }
        onreconnected(e) {
          e && this._reconnectedCallbacks.push(e);
        }
        _processIncomingData(e) {
          if (
            (this._cleanupTimeout(),
            this._receivedHandshakeResponse ||
              ((e = this._processHandshakeResponse(e)),
              (this._receivedHandshakeResponse = !0)),
            e)
          )
            for (let t of this._protocol.parseMessages(e, this._logger))
              switch (t.type) {
                case q.C.Invocation:
                  this._invokeClientMethod(t);
                  break;
                case q.C.StreamItem:
                case q.C.Completion: {
                  let e = this._callbacks[t.invocationId];
                  if (e) {
                    t.type === q.C.Completion &&
                      delete this._callbacks[t.invocationId];
                    try {
                      e(t);
                    } catch (e) {
                      this._logger.log(
                        b.i.Error,
                        `Stream callback threw error: ${O(e)}`
                      );
                    }
                  }
                  break;
                }
                case q.C.Ping:
                  break;
                case q.C.Close: {
                  this._logger.log(
                    b.i.Information,
                    "Close message received from server."
                  );
                  let e = t.error
                    ? Error("Server returned an error on close: " + t.error)
                    : void 0;
                  !0 === t.allowReconnect
                    ? this.connection.stop(e)
                    : (this._stopPromise = this._stopInternal(e));
                  break;
                }
                default:
                  this._logger.log(
                    b.i.Warning,
                    `Invalid message type: ${t.type}.`
                  );
              }
          this._resetTimeoutPeriod();
        }
        _processHandshakeResponse(e) {
          let t, r;
          try {
            [r, t] = this._handshakeProtocol.parseHandshakeResponse(e);
          } catch (r) {
            let e = "Error parsing handshake response: " + r;
            this._logger.log(b.i.Error, e);
            let t = Error(e);
            throw (this._handshakeRejecter(t), t);
          }
          if (t.error) {
            let e = "Server returned handshake error: " + t.error;
            this._logger.log(b.i.Error, e);
            let r = Error(e);
            throw (this._handshakeRejecter(r), r);
          }
          return (
            this._logger.log(b.i.Debug, "Server handshake complete."),
            this._handshakeResolver(),
            r
          );
        }
        _resetKeepAliveInterval() {
          this.connection.features.inherentKeepAlive ||
            ((this._nextKeepAlive =
              new Date().getTime() + this.keepAliveIntervalInMilliseconds),
            this._cleanupPingTimer());
        }
        _resetTimeoutPeriod() {
          if (
            (!this.connection.features ||
              !this.connection.features.inherentKeepAlive) &&
            ((this._timeoutHandle = setTimeout(
              () => this.serverTimeout(),
              this.serverTimeoutInMilliseconds
            )),
            void 0 === this._pingServerHandle)
          ) {
            let e = this._nextKeepAlive - new Date().getTime();
            e < 0 && (e = 0),
              (this._pingServerHandle = setTimeout(async () => {
                if (this._connectionState === v.Connected)
                  try {
                    await this._sendMessage(this._cachedPingMessage);
                  } catch {
                    this._cleanupPingTimer();
                  }
              }, e));
          }
        }
        serverTimeout() {
          this.connection.stop(
            Error(
              "Server timeout elapsed without receiving a message from the server."
            )
          );
        }
        async _invokeClientMethod(e) {
          let t, r, n;
          let o = e.target.toLowerCase(),
            i = this._methods[o];
          if (!i) {
            this._logger.log(
              b.i.Warning,
              `No client method with the name '${o}' found.`
            ),
              e.invocationId &&
                (this._logger.log(
                  b.i.Warning,
                  `No result given for '${o}' method and invocation ID '${e.invocationId}'.`
                ),
                await this._sendWithProtocol(
                  this._createCompletionMessage(
                    e.invocationId,
                    "Client didn't provide a result.",
                    null
                  )
                ));
            return;
          }
          let s = i.slice(),
            a = !!e.invocationId;
          for (let i of s)
            try {
              let s = t;
              (t = await i.apply(this, e.arguments)),
                a &&
                  t &&
                  s &&
                  (this._logger.log(
                    b.i.Error,
                    `Multiple results provided for '${o}'. Sending error to server.`
                  ),
                  (n = this._createCompletionMessage(
                    e.invocationId,
                    "Client provided multiple results.",
                    null
                  ))),
                (r = void 0);
            } catch (e) {
              (r = e),
                this._logger.log(
                  b.i.Error,
                  `A callback for the method '${o}' threw error '${e}'.`
                );
            }
          n
            ? await this._sendWithProtocol(n)
            : a
            ? (r
                ? (n = this._createCompletionMessage(
                    e.invocationId,
                    `${r}`,
                    null
                  ))
                : void 0 !== t
                ? (n = this._createCompletionMessage(e.invocationId, null, t))
                : (this._logger.log(
                    b.i.Warning,
                    `No result given for '${o}' method and invocation ID '${e.invocationId}'.`
                  ),
                  (n = this._createCompletionMessage(
                    e.invocationId,
                    "Client didn't provide a result.",
                    null
                  ))),
              await this._sendWithProtocol(n))
            : t &&
              this._logger.log(
                b.i.Error,
                `Result given for '${o}' method but server is not expecting a result.`
              );
        }
        _connectionClosed(e) {
          this._logger.log(
            b.i.Debug,
            `HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`
          ),
            (this._stopDuringStartError =
              this._stopDuringStartError ||
              e ||
              new h(
                "The underlying connection was closed before the hub handshake could complete."
              )),
            this._handshakeResolver && this._handshakeResolver(),
            this._cancelCallbacksWithError(
              e ||
                Error(
                  "Invocation canceled due to the underlying connection being closed."
                )
            ),
            this._cleanupTimeout(),
            this._cleanupPingTimer(),
            this._connectionState === v.Disconnecting
              ? this._completeClose(e)
              : this._connectionState === v.Connected && this._reconnectPolicy
              ? this._reconnect(e)
              : this._connectionState === v.Connected && this._completeClose(e);
        }
        _completeClose(e) {
          if (this._connectionStarted) {
            (this._connectionState = v.Disconnected),
              (this._connectionStarted = !1),
              E.isBrowser &&
                window.document.removeEventListener(
                  "freeze",
                  this._freezeEventListener
                );
            try {
              this._closedCallbacks.forEach((t) => t.apply(this, [e]));
            } catch (t) {
              this._logger.log(
                b.i.Error,
                `An onclose callback called with error '${e}' threw error '${t}'.`
              );
            }
          }
        }
        async _reconnect(e) {
          let t = Date.now(),
            r = 0,
            n =
              void 0 !== e
                ? e
                : Error("Attempting to reconnect due to a unknown error."),
            o = this._getNextRetryDelay(r++, 0, n);
          if (null === o) {
            this._logger.log(
              b.i.Debug,
              "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."
            ),
              this._completeClose(e);
            return;
          }
          if (
            ((this._connectionState = v.Reconnecting),
            e
              ? this._logger.log(
                  b.i.Information,
                  `Connection reconnecting because of error '${e}'.`
                )
              : this._logger.log(b.i.Information, "Connection reconnecting."),
            0 !== this._reconnectingCallbacks.length)
          ) {
            try {
              this._reconnectingCallbacks.forEach((t) => t.apply(this, [e]));
            } catch (t) {
              this._logger.log(
                b.i.Error,
                `An onreconnecting callback called with error '${e}' threw error '${t}'.`
              );
            }
            if (this._connectionState !== v.Reconnecting) {
              this._logger.log(
                b.i.Debug,
                "Connection left the reconnecting state in onreconnecting callback. Done reconnecting."
              );
              return;
            }
          }
          for (; null !== o; ) {
            if (
              (this._logger.log(
                b.i.Information,
                `Reconnect attempt number ${r} will start in ${o} ms.`
              ),
              await new Promise((e) => {
                this._reconnectDelayHandle = setTimeout(e, o);
              }),
              (this._reconnectDelayHandle = void 0),
              this._connectionState !== v.Reconnecting)
            ) {
              this._logger.log(
                b.i.Debug,
                "Connection left the reconnecting state during reconnect delay. Done reconnecting."
              );
              return;
            }
            try {
              if (
                (await this._startInternal(),
                (this._connectionState = v.Connected),
                this._logger.log(
                  b.i.Information,
                  "HubConnection reconnected successfully."
                ),
                0 !== this._reconnectedCallbacks.length)
              )
                try {
                  this._reconnectedCallbacks.forEach((e) =>
                    e.apply(this, [this.connection.connectionId])
                  );
                } catch (e) {
                  this._logger.log(
                    b.i.Error,
                    `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${e}'.`
                  );
                }
              return;
            } catch (e) {
              if (
                (this._logger.log(
                  b.i.Information,
                  `Reconnect attempt failed because of error '${e}'.`
                ),
                this._connectionState !== v.Reconnecting)
              ) {
                this._logger.log(
                  b.i.Debug,
                  `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`
                ),
                  this._connectionState === v.Disconnecting &&
                    this._completeClose();
                return;
              }
              (n = e instanceof Error ? e : Error(e.toString())),
                (o = this._getNextRetryDelay(r++, Date.now() - t, n));
            }
          }
          this._logger.log(
            b.i.Information,
            `Reconnect retries have been exhausted after ${
              Date.now() - t
            } ms and ${r} failed attempts. Connection disconnecting.`
          ),
            this._completeClose();
        }
        _getNextRetryDelay(e, t, r) {
          try {
            return this._reconnectPolicy.nextRetryDelayInMilliseconds({
              elapsedMilliseconds: t,
              previousRetryCount: e,
              retryReason: r,
            });
          } catch (r) {
            return (
              this._logger.log(
                b.i.Error,
                `IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${r}'.`
              ),
              null
            );
          }
        }
        _cancelCallbacksWithError(e) {
          let t = this._callbacks;
          (this._callbacks = {}),
            Object.keys(t).forEach((r) => {
              let n = t[r];
              try {
                n(null, e);
              } catch (t) {
                this._logger.log(
                  b.i.Error,
                  `Stream 'error' callback called with '${e}' threw error: ${O(
                    t
                  )}`
                );
              }
            });
        }
        _cleanupPingTimer() {
          this._pingServerHandle &&
            (clearTimeout(this._pingServerHandle),
            (this._pingServerHandle = void 0));
        }
        _cleanupTimeout() {
          this._timeoutHandle && clearTimeout(this._timeoutHandle);
        }
        _createInvocation(e, t, r, n) {
          if (r)
            return 0 !== n.length
              ? {
                  arguments: t,
                  streamIds: n,
                  target: e,
                  type: q.C.Invocation,
                }
              : {
                  arguments: t,
                  target: e,
                  type: q.C.Invocation,
                };
          {
            let r = this._invocationId;
            return (this._invocationId++, 0 !== n.length)
              ? {
                  arguments: t,
                  invocationId: r.toString(),
                  streamIds: n,
                  target: e,
                  type: q.C.Invocation,
                }
              : {
                  arguments: t,
                  invocationId: r.toString(),
                  target: e,
                  type: q.C.Invocation,
                };
          }
        }
        _launchStreams(e, t) {
          if (0 !== e.length)
            for (let r in (t || (t = Promise.resolve()), e))
              e[r].subscribe({
                complete: () => {
                  t = t.then(() =>
                    this._sendWithProtocol(this._createCompletionMessage(r))
                  );
                },
                error: (e) => {
                  let n;
                  (n =
                    e instanceof Error
                      ? e.message
                      : e && e.toString
                      ? e.toString()
                      : "Unknown error"),
                    (t = t.then(() =>
                      this._sendWithProtocol(
                        this._createCompletionMessage(r, n)
                      )
                    ));
                },
                next: (e) => {
                  t = t.then(() =>
                    this._sendWithProtocol(this._createStreamItemMessage(r, e))
                  );
                },
              });
        }
        _replaceStreamingParams(e) {
          let t = [],
            r = [];
          for (let n = 0; n < e.length; n++) {
            let o = e[n];
            if (this._isObservable(o)) {
              let i = this._invocationId;
              this._invocationId++,
                (t[i] = o),
                r.push(i.toString()),
                e.splice(n, 1);
            }
          }
          return [t, r];
        }
        _isObservable(e) {
          return e && e.subscribe && "function" == typeof e.subscribe;
        }
        _createStreamInvocation(e, t, r) {
          let n = this._invocationId;
          return (this._invocationId++, 0 !== r.length)
            ? {
                arguments: t,
                invocationId: n.toString(),
                streamIds: r,
                target: e,
                type: q.C.StreamInvocation,
              }
            : {
                arguments: t,
                invocationId: n.toString(),
                target: e,
                type: q.C.StreamInvocation,
              };
        }
        _createCancelInvocation(e) {
          return {
            invocationId: e,
            type: q.C.CancelInvocation,
          };
        }
        _createStreamItemMessage(e, t) {
          return {
            invocationId: e,
            item: t,
            type: q.C.StreamItem,
          };
        }
        _createCompletionMessage(e, t, r) {
          return t
            ? {
                error: t,
                invocationId: e,
                type: q.C.Completion,
              }
            : {
                invocationId: e,
                result: r,
                type: q.C.Completion,
              };
        }
      }
      class J {
        constructor() {
          (this.name = "json"),
            (this.version = 1),
            (this.transferFormat = j.k.Text);
        }
        parseMessages(e, t) {
          if ("string" != typeof e)
            throw Error(
              "Invalid input for JSON hub protocol. Expected a string."
            );
          if (!e) return [];
          null === t && (t = w.W.instance);
          let r = W.parse(e),
            n = [];
          for (let e of r) {
            let r = JSON.parse(e);
            if ("number" != typeof r.type) throw Error("Invalid payload.");
            switch (r.type) {
              case q.C.Invocation:
                this._isInvocationMessage(r);
                break;
              case q.C.StreamItem:
                this._isStreamItemMessage(r);
                break;
              case q.C.Completion:
                this._isCompletionMessage(r);
                break;
              case q.C.Ping:
              case q.C.Close:
                break;
              default:
                t.log(
                  b.i.Information,
                  "Unknown message type '" + r.type + "' ignored."
                );
                continue;
            }
            n.push(r);
          }
          return n;
        }
        writeMessage(e) {
          return W.write(JSON.stringify(e));
        }
        _isInvocationMessage(e) {
          this._assertNotEmptyString(
            e.target,
            "Invalid payload for Invocation message."
          ),
            void 0 !== e.invocationId &&
              this._assertNotEmptyString(
                e.invocationId,
                "Invalid payload for Invocation message."
              );
        }
        _isStreamItemMessage(e) {
          if (
            (this._assertNotEmptyString(
              e.invocationId,
              "Invalid payload for StreamItem message."
            ),
            void 0 === e.item)
          )
            throw Error("Invalid payload for StreamItem message.");
        }
        _isCompletionMessage(e) {
          if (e.result && e.error)
            throw Error("Invalid payload for Completion message.");
          !e.result &&
            e.error &&
            this._assertNotEmptyString(
              e.error,
              "Invalid payload for Completion message."
            ),
            this._assertNotEmptyString(
              e.invocationId,
              "Invalid payload for Completion message."
            );
        }
        _assertNotEmptyString(e, t) {
          if ("string" != typeof e || "" === e) throw Error(t);
        }
      }
      let K = {
        trace: b.i.Trace,
        debug: b.i.Debug,
        info: b.i.Information,
        information: b.i.Information,
        warn: b.i.Warning,
        warning: b.i.Warning,
        error: b.i.Error,
        critical: b.i.Critical,
        none: b.i.None,
      };
      class Y {
        configureLogging(e) {
          if ((S.isRequired(e, "logging"), void 0 !== e.log)) this.logger = e;
          else if ("string" == typeof e) {
            let t = (function (e) {
              let t = K[e.toLowerCase()];
              if (void 0 !== t) return t;
              throw Error(`Unknown log level: ${e}`);
            })(e);
            this.logger = new x(t);
          } else this.logger = new x(e);
          return this;
        }
        withUrl(e, t) {
          return (
            S.isRequired(e, "url"),
            S.isNotEmpty(e, "url"),
            (this.url = e),
            "object" == typeof t
              ? (this.httpConnectionOptions = {
                  ...this.httpConnectionOptions,
                  ...t,
                })
              : (this.httpConnectionOptions = {
                  ...this.httpConnectionOptions,
                  transport: t,
                }),
            this
          );
        }
        withHubProtocol(e) {
          return S.isRequired(e, "protocol"), (this.protocol = e), this;
        }
        withAutomaticReconnect(e) {
          if (this.reconnectPolicy)
            throw Error("A reconnectPolicy has already been set.");
          return (
            e
              ? Array.isArray(e)
                ? (this.reconnectPolicy = new o(e))
                : (this.reconnectPolicy = e)
              : (this.reconnectPolicy = new o()),
            this
          );
        }
        build() {
          let e = this.httpConnectionOptions || {};
          if ((void 0 === e.logger && (e.logger = this.logger), !this.url))
            throw Error(
              "The 'HubConnectionBuilder.withUrl' method must be called before building the connection."
            );
          let t = new F(this.url, e);
          return X.create(
            t,
            this.logger || w.W.instance,
            this.protocol || new J(),
            this.reconnectPolicy
          );
        }
      }
    },
    1418: function (e, t, r) {
      "use strict";
      var n, o;
      r.d(t, {
        C: function () {
          return n;
        },
      }),
        ((o = n || (n = {}))[(o.Invocation = 1)] = "Invocation"),
        (o[(o.StreamItem = 2)] = "StreamItem"),
        (o[(o.Completion = 3)] = "Completion"),
        (o[(o.StreamInvocation = 4)] = "StreamInvocation"),
        (o[(o.CancelInvocation = 5)] = "CancelInvocation"),
        (o[(o.Ping = 6)] = "Ping"),
        (o[(o.Close = 7)] = "Close");
    },
    4177: function (e, t, r) {
      "use strict";
      var n, o;
      r.d(t, {
        i: function () {
          return n;
        },
      }),
        ((o = n || (n = {}))[(o.Trace = 0)] = "Trace"),
        (o[(o.Debug = 1)] = "Debug"),
        (o[(o.Information = 2)] = "Information"),
        (o[(o.Warning = 3)] = "Warning"),
        (o[(o.Error = 4)] = "Error"),
        (o[(o.Critical = 5)] = "Critical"),
        (o[(o.None = 6)] = "None");
    },
    2706: function (e, t, r) {
      "use strict";
      var n, o, i, s;
      r.d(t, {
        k: function () {
          return o;
        },
        n: function () {
          return n;
        },
      }),
        ((i = n || (n = {}))[(i.None = 0)] = "None"),
        (i[(i.WebSockets = 1)] = "WebSockets"),
        (i[(i.ServerSentEvents = 2)] = "ServerSentEvents"),
        (i[(i.LongPolling = 4)] = "LongPolling"),
        ((s = o || (o = {}))[(s.Text = 1)] = "Text"),
        (s[(s.Binary = 2)] = "Binary");
    },
    7991: function (e, t, r) {
      "use strict";
      r.d(t, {
        W: function () {
          return n;
        },
      });
      class n {
        constructor() {}
        log(e, t) {}
      }
      n.instance = new n();
    },
    3783: function (e, t) {
      "use strict";
      (t.byteLength = function (e) {
        var t = c(e),
          r = t[0],
          n = t[1];
        return ((r + n) * 3) / 4 - n;
      }),
        (t.toByteArray = function (e) {
          var t,
            r,
            i = c(e),
            s = i[0],
            a = i[1],
            l = new o(((s + a) * 3) / 4 - a),
            u = 0,
            h = a > 0 ? s - 4 : s;
          for (r = 0; r < h; r += 4)
            (t =
              (n[e.charCodeAt(r)] << 18) |
              (n[e.charCodeAt(r + 1)] << 12) |
              (n[e.charCodeAt(r + 2)] << 6) |
              n[e.charCodeAt(r + 3)]),
              (l[u++] = (t >> 16) & 255),
              (l[u++] = (t >> 8) & 255),
              (l[u++] = 255 & t);
          return (
            2 === a &&
              ((t = (n[e.charCodeAt(r)] << 2) | (n[e.charCodeAt(r + 1)] >> 4)),
              (l[u++] = 255 & t)),
            1 === a &&
              ((t =
                (n[e.charCodeAt(r)] << 10) |
                (n[e.charCodeAt(r + 1)] << 4) |
                (n[e.charCodeAt(r + 2)] >> 2)),
              (l[u++] = (t >> 8) & 255),
              (l[u++] = 255 & t)),
            l
          );
        }),
        (t.fromByteArray = function (e) {
          for (
            var t, n = e.length, o = n % 3, i = [], s = 0, a = n - o;
            s < a;
            s += 16383
          )
            i.push(
              (function (e, t, n) {
                for (var o, i = [], s = t; s < n; s += 3)
                  i.push(
                    r[
                      ((o =
                        ((e[s] << 16) & 16711680) +
                        ((e[s + 1] << 8) & 65280) +
                        (255 & e[s + 2])) >>
                        18) &
                        63
                    ] +
                      r[(o >> 12) & 63] +
                      r[(o >> 6) & 63] +
                      r[63 & o]
                  );
                return i.join("");
              })(e, s, s + 16383 > a ? a : s + 16383)
            );
          return (
            1 === o
              ? i.push(r[(t = e[n - 1]) >> 2] + r[(t << 4) & 63] + "==")
              : 2 === o &&
                i.push(
                  r[(t = (e[n - 2] << 8) + e[n - 1]) >> 10] +
                    r[(t >> 4) & 63] +
                    r[(t << 2) & 63] +
                    "="
                ),
            i.join("")
          );
        });
      for (
        var r = [],
          n = [],
          o = "undefined" != typeof Uint8Array ? Uint8Array : Array,
          i =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          s = 0,
          a = i.length;
        s < a;
        ++s
      )
        (r[s] = i[s]), (n[i.charCodeAt(s)] = s);
      function c(e) {
        var t = e.length;
        if (t % 4 > 0)
          throw Error("Invalid string. Length must be a multiple of 4");
        var r = e.indexOf("=");
        -1 === r && (r = t);
        var n = r === t ? 0 : 4 - (r % 4);
        return [r, n];
      }
      (n["-".charCodeAt(0)] = 62), (n["_".charCodeAt(0)] = 63);
    },
    615: function (e, t, r) {
      "use strict";
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      var n = r(3783),
        o = r(894),
        i =
          "function" == typeof Symbol && "function" == typeof Symbol.for
            ? Symbol.for("nodejs.util.inspect.custom")
            : null;
      function s(e) {
        if (e > 2147483647)
          throw RangeError(
            'The value "' + e + '" is invalid for option "size"'
          );
        var t = new Uint8Array(e);
        return Object.setPrototypeOf(t, a.prototype), t;
      }
      function a(e, t, r) {
        if ("number" == typeof e) {
          if ("string" == typeof t)
            throw TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          return u(e);
        }
        return c(e, t, r);
      }
      function c(e, t, r) {
        if ("string" == typeof e)
          return (function (e, t) {
            if (
              (("string" != typeof t || "" === t) && (t = "utf8"),
              !a.isEncoding(t))
            )
              throw TypeError("Unknown encoding: " + t);
            var r = 0 | p(e, t),
              n = s(r),
              o = n.write(e, t);
            return o !== r && (n = n.slice(0, o)), n;
          })(e, t);
        if (ArrayBuffer.isView(e))
          return (function (e) {
            if (P(e, Uint8Array)) {
              var t = new Uint8Array(e);
              return f(t.buffer, t.byteOffset, t.byteLength);
            }
            return h(e);
          })(e);
        if (null == e)
          throw TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
              typeof e
          );
        if (
          P(e, ArrayBuffer) ||
          (e && P(e.buffer, ArrayBuffer)) ||
          ("undefined" != typeof SharedArrayBuffer &&
            (P(e, SharedArrayBuffer) || (e && P(e.buffer, SharedArrayBuffer))))
        )
          return f(e, t, r);
        if ("number" == typeof e)
          throw TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        var n = e.valueOf && e.valueOf();
        if (null != n && n !== e) return a.from(n, t, r);
        var o = (function (e) {
          if (a.isBuffer(e)) {
            var t,
              r = 0 | d(e.length),
              n = s(r);
            return 0 === n.length || e.copy(n, 0, 0, r), n;
          }
          return void 0 !== e.length
            ? "number" != typeof e.length || (t = e.length) != t
              ? s(0)
              : h(e)
            : "Buffer" === e.type && Array.isArray(e.data)
            ? h(e.data)
            : void 0;
        })(e);
        if (o) return o;
        if (
          "undefined" != typeof Symbol &&
          null != Symbol.toPrimitive &&
          "function" == typeof e[Symbol.toPrimitive]
        )
          return a.from(e[Symbol.toPrimitive]("string"), t, r);
        throw TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof e
        );
      }
      function l(e) {
        if ("number" != typeof e)
          throw TypeError('"size" argument must be of type number');
        if (e < 0)
          throw RangeError(
            'The value "' + e + '" is invalid for option "size"'
          );
      }
      function u(e) {
        return l(e), s(e < 0 ? 0 : 0 | d(e));
      }
      function h(e) {
        for (
          var t = e.length < 0 ? 0 : 0 | d(e.length), r = s(t), n = 0;
          n < t;
          n += 1
        )
          r[n] = 255 & e[n];
        return r;
      }
      function f(e, t, r) {
        var n;
        if (t < 0 || e.byteLength < t)
          throw RangeError('"offset" is outside of buffer bounds');
        if (e.byteLength < t + (r || 0))
          throw RangeError('"length" is outside of buffer bounds');
        return (
          Object.setPrototypeOf(
            (n =
              void 0 === t && void 0 === r
                ? new Uint8Array(e)
                : void 0 === r
                ? new Uint8Array(e, t)
                : new Uint8Array(e, t, r)),
            a.prototype
          ),
          n
        );
      }
      function d(e) {
        if (e >= 2147483647)
          throw RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes"
          );
        return 0 | e;
      }
      function p(e, t) {
        if (a.isBuffer(e)) return e.length;
        if (ArrayBuffer.isView(e) || P(e, ArrayBuffer)) return e.byteLength;
        if ("string" != typeof e)
          throw TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
              typeof e
          );
        var r = e.length,
          n = arguments.length > 2 && !0 === arguments[2];
        if (!n && 0 === r) return 0;
        for (var o = !1; ; )
          switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
              return r;
            case "utf8":
            case "utf-8":
              return k(e).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * r;
            case "hex":
              return r >>> 1;
            case "base64":
              return I(e).length;
            default:
              if (o) return n ? -1 : k(e).length;
              (t = ("" + t).toLowerCase()), (o = !0);
          }
      }
      function g(e, t, r) {
        var o,
          i,
          s = !1;
        if (
          ((void 0 === t || t < 0) && (t = 0),
          t > this.length ||
            ((void 0 === r || r > this.length) && (r = this.length),
            r <= 0 || (r >>>= 0) <= (t >>>= 0)))
        )
          return "";
        for (e || (e = "utf8"); ; )
          switch (e) {
            case "hex":
              return (function (e, t, r) {
                var n = e.length;
                (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
                for (var o = "", i = t; i < r; ++i) o += O[e[i]];
                return o;
              })(this, t, r);
            case "utf8":
            case "utf-8":
              return b(this, t, r);
            case "ascii":
              return (function (e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var o = t; o < r; ++o)
                  n += String.fromCharCode(127 & e[o]);
                return n;
              })(this, t, r);
            case "latin1":
            case "binary":
              return (function (e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
                return n;
              })(this, t, r);
            case "base64":
              return (
                (o = t),
                (i = r),
                0 === o && i === this.length
                  ? n.fromByteArray(this)
                  : n.fromByteArray(this.slice(o, i))
              );
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return (function (e, t, r) {
                for (
                  var n = e.slice(t, r), o = "", i = 0;
                  i < n.length - 1;
                  i += 2
                )
                  o += String.fromCharCode(n[i] + 256 * n[i + 1]);
                return o;
              })(this, t, r);
            default:
              if (s) throw TypeError("Unknown encoding: " + e);
              (e = (e + "").toLowerCase()), (s = !0);
          }
      }
      function y(e, t, r) {
        var n = e[t];
        (e[t] = e[r]), (e[r] = n);
      }
      function m(e, t, r, n, o) {
        var i;
        if (0 === e.length) return -1;
        if (
          ("string" == typeof r
            ? ((n = r), (r = 0))
            : r > 2147483647
            ? (r = 2147483647)
            : r < -2147483648 && (r = -2147483648),
          (i = r = +r) != i && (r = o ? 0 : e.length - 1),
          r < 0 && (r = e.length + r),
          r >= e.length)
        ) {
          if (o) return -1;
          r = e.length - 1;
        } else if (r < 0) {
          if (!o) return -1;
          r = 0;
        }
        if (("string" == typeof t && (t = a.from(t, n)), a.isBuffer(t)))
          return 0 === t.length ? -1 : v(e, t, r, n, o);
        if ("number" == typeof t)
          return ((t &= 255), "function" == typeof Uint8Array.prototype.indexOf)
            ? o
              ? Uint8Array.prototype.indexOf.call(e, t, r)
              : Uint8Array.prototype.lastIndexOf.call(e, t, r)
            : v(e, [t], r, n, o);
        throw TypeError("val must be string, number or Buffer");
      }
      function v(e, t, r, n, o) {
        var i,
          s = 1,
          a = e.length,
          c = t.length;
        if (
          void 0 !== n &&
          ("ucs2" === (n = String(n).toLowerCase()) ||
            "ucs-2" === n ||
            "utf16le" === n ||
            "utf-16le" === n)
        ) {
          if (e.length < 2 || t.length < 2) return -1;
          (s = 2), (a /= 2), (c /= 2), (r /= 2);
        }
        function l(e, t) {
          return 1 === s ? e[t] : e.readUInt16BE(t * s);
        }
        if (o) {
          var u = -1;
          for (i = r; i < a; i++)
            if (l(e, i) === l(t, -1 === u ? 0 : i - u)) {
              if ((-1 === u && (u = i), i - u + 1 === c)) return u * s;
            } else -1 !== u && (i -= i - u), (u = -1);
        } else
          for (r + c > a && (r = a - c), i = r; i >= 0; i--) {
            for (var h = !0, f = 0; f < c; f++)
              if (l(e, i + f) !== l(t, f)) {
                h = !1;
                break;
              }
            if (h) return i;
          }
        return -1;
      }
      function b(e, t, r) {
        r = Math.min(e.length, r);
        for (var n = [], o = t; o < r; ) {
          var i,
            s,
            a,
            c,
            l = e[o],
            u = null,
            h = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
          if (o + h <= r)
            switch (h) {
              case 1:
                l < 128 && (u = l);
                break;
              case 2:
                (192 & (i = e[o + 1])) == 128 &&
                  (c = ((31 & l) << 6) | (63 & i)) > 127 &&
                  (u = c);
                break;
              case 3:
                (i = e[o + 1]),
                  (s = e[o + 2]),
                  (192 & i) == 128 &&
                    (192 & s) == 128 &&
                    (c = ((15 & l) << 12) | ((63 & i) << 6) | (63 & s)) >
                      2047 &&
                    (c < 55296 || c > 57343) &&
                    (u = c);
                break;
              case 4:
                (i = e[o + 1]),
                  (s = e[o + 2]),
                  (a = e[o + 3]),
                  (192 & i) == 128 &&
                    (192 & s) == 128 &&
                    (192 & a) == 128 &&
                    (c =
                      ((15 & l) << 18) |
                      ((63 & i) << 12) |
                      ((63 & s) << 6) |
                      (63 & a)) > 65535 &&
                    c < 1114112 &&
                    (u = c);
            }
          null === u
            ? ((u = 65533), (h = 1))
            : u > 65535 &&
              ((u -= 65536),
              n.push(((u >>> 10) & 1023) | 55296),
              (u = 56320 | (1023 & u))),
            n.push(u),
            (o += h);
        }
        return (function (e) {
          var t = e.length;
          if (t <= 4096) return String.fromCharCode.apply(String, e);
          for (var r = "", n = 0; n < t; )
            r += String.fromCharCode.apply(String, e.slice(n, (n += 4096)));
          return r;
        })(n);
      }
      function w(e, t, r) {
        if (e % 1 != 0 || e < 0) throw RangeError("offset is not uint");
        if (e + t > r)
          throw RangeError("Trying to access beyond buffer length");
      }
      function _(e, t, r, n, o, i) {
        if (!a.isBuffer(e))
          throw TypeError('"buffer" argument must be a Buffer instance');
        if (t > o || t < i)
          throw RangeError('"value" argument is out of bounds');
        if (r + n > e.length) throw RangeError("Index out of range");
      }
      function S(e, t, r, n, o, i) {
        if (r + n > e.length || r < 0) throw RangeError("Index out of range");
      }
      function E(e, t, r, n, i) {
        return (
          (t = +t),
          (r >>>= 0),
          i || S(e, t, r, 4, 34028234663852886e22, -34028234663852886e22),
          o.write(e, t, r, n, 23, 4),
          r + 4
        );
      }
      function C(e, t, r, n, i) {
        return (
          (t = +t),
          (r >>>= 0),
          i || S(e, t, r, 8, 17976931348623157e292, -17976931348623157e292),
          o.write(e, t, r, n, 52, 8),
          r + 8
        );
      }
      (t.lW = a),
        (t.h2 = 50),
        (a.TYPED_ARRAY_SUPPORT = (function () {
          try {
            var e = new Uint8Array(1),
              t = {
                foo: function () {
                  return 42;
                },
              };
            return (
              Object.setPrototypeOf(t, Uint8Array.prototype),
              Object.setPrototypeOf(e, t),
              42 === e.foo()
            );
          } catch (e) {
            return !1;
          }
        })()),
        a.TYPED_ARRAY_SUPPORT ||
          "undefined" == typeof console ||
          "function" != typeof console.error ||
          console.error(
            "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
          ),
        Object.defineProperty(a.prototype, "parent", {
          enumerable: !0,
          get: function () {
            if (a.isBuffer(this)) return this.buffer;
          },
        }),
        Object.defineProperty(a.prototype, "offset", {
          enumerable: !0,
          get: function () {
            if (a.isBuffer(this)) return this.byteOffset;
          },
        }),
        (a.poolSize = 8192),
        (a.from = function (e, t, r) {
          return c(e, t, r);
        }),
        Object.setPrototypeOf(a.prototype, Uint8Array.prototype),
        Object.setPrototypeOf(a, Uint8Array),
        (a.alloc = function (e, t, r) {
          return (l(e), e <= 0)
            ? s(e)
            : void 0 !== t
            ? "string" == typeof r
              ? s(e).fill(t, r)
              : s(e).fill(t)
            : s(e);
        }),
        (a.allocUnsafe = function (e) {
          return u(e);
        }),
        (a.allocUnsafeSlow = function (e) {
          return u(e);
        }),
        (a.isBuffer = function (e) {
          return null != e && !0 === e._isBuffer && e !== a.prototype;
        }),
        (a.compare = function (e, t) {
          if (
            (P(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
            P(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
            !a.isBuffer(e) || !a.isBuffer(t))
          )
            throw TypeError(
              'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
            );
          if (e === t) return 0;
          for (
            var r = e.length, n = t.length, o = 0, i = Math.min(r, n);
            o < i;
            ++o
          )
            if (e[o] !== t[o]) {
              (r = e[o]), (n = t[o]);
              break;
            }
          return r < n ? -1 : n < r ? 1 : 0;
        }),
        (a.isEncoding = function (e) {
          switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (a.concat = function (e, t) {
          if (!Array.isArray(e))
            throw TypeError('"list" argument must be an Array of Buffers');
          if (0 === e.length) return a.alloc(0);
          if (void 0 === t)
            for (r = 0, t = 0; r < e.length; ++r) t += e[r].length;
          var r,
            n = a.allocUnsafe(t),
            o = 0;
          for (r = 0; r < e.length; ++r) {
            var i = e[r];
            if (P(i, Uint8Array))
              o + i.length > n.length
                ? a.from(i).copy(n, o)
                : Uint8Array.prototype.set.call(n, i, o);
            else if (a.isBuffer(i)) i.copy(n, o);
            else throw TypeError('"list" argument must be an Array of Buffers');
            o += i.length;
          }
          return n;
        }),
        (a.byteLength = p),
        (a.prototype._isBuffer = !0),
        (a.prototype.swap16 = function () {
          var e = this.length;
          if (e % 2 != 0)
            throw RangeError("Buffer size must be a multiple of 16-bits");
          for (var t = 0; t < e; t += 2) y(this, t, t + 1);
          return this;
        }),
        (a.prototype.swap32 = function () {
          var e = this.length;
          if (e % 4 != 0)
            throw RangeError("Buffer size must be a multiple of 32-bits");
          for (var t = 0; t < e; t += 4)
            y(this, t, t + 3), y(this, t + 1, t + 2);
          return this;
        }),
        (a.prototype.swap64 = function () {
          var e = this.length;
          if (e % 8 != 0)
            throw RangeError("Buffer size must be a multiple of 64-bits");
          for (var t = 0; t < e; t += 8)
            y(this, t, t + 7),
              y(this, t + 1, t + 6),
              y(this, t + 2, t + 5),
              y(this, t + 3, t + 4);
          return this;
        }),
        (a.prototype.toString = function () {
          var e = this.length;
          return 0 === e
            ? ""
            : 0 == arguments.length
            ? b(this, 0, e)
            : g.apply(this, arguments);
        }),
        (a.prototype.toLocaleString = a.prototype.toString),
        (a.prototype.equals = function (e) {
          if (!a.isBuffer(e)) throw TypeError("Argument must be a Buffer");
          return this === e || 0 === a.compare(this, e);
        }),
        (a.prototype.inspect = function () {
          var e = "",
            r = t.h2;
          return (
            (e = this.toString("hex", 0, r)
              .replace(/(.{2})/g, "$1 ")
              .trim()),
            this.length > r && (e += " ... "),
            "<Buffer " + e + ">"
          );
        }),
        i && (a.prototype[i] = a.prototype.inspect),
        (a.prototype.compare = function (e, t, r, n, o) {
          if (
            (P(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
            !a.isBuffer(e))
          )
            throw TypeError(
              'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                typeof e
            );
          if (
            (void 0 === t && (t = 0),
            void 0 === r && (r = e ? e.length : 0),
            void 0 === n && (n = 0),
            void 0 === o && (o = this.length),
            t < 0 || r > e.length || n < 0 || o > this.length)
          )
            throw RangeError("out of range index");
          if (n >= o && t >= r) return 0;
          if (n >= o) return -1;
          if (t >= r) return 1;
          if (((t >>>= 0), (r >>>= 0), (n >>>= 0), (o >>>= 0), this === e))
            return 0;
          for (
            var i = o - n,
              s = r - t,
              c = Math.min(i, s),
              l = this.slice(n, o),
              u = e.slice(t, r),
              h = 0;
            h < c;
            ++h
          )
            if (l[h] !== u[h]) {
              (i = l[h]), (s = u[h]);
              break;
            }
          return i < s ? -1 : s < i ? 1 : 0;
        }),
        (a.prototype.includes = function (e, t, r) {
          return -1 !== this.indexOf(e, t, r);
        }),
        (a.prototype.indexOf = function (e, t, r) {
          return m(this, e, t, r, !0);
        }),
        (a.prototype.lastIndexOf = function (e, t, r) {
          return m(this, e, t, r, !1);
        }),
        (a.prototype.write = function (e, t, r, n) {
          if (void 0 === t) (n = "utf8"), (r = this.length), (t = 0);
          else if (void 0 === r && "string" == typeof t)
            (n = t), (r = this.length), (t = 0);
          else if (isFinite(t))
            (t >>>= 0),
              isFinite(r)
                ? ((r >>>= 0), void 0 === n && (n = "utf8"))
                : ((n = r), (r = void 0));
          else
            throw Error(
              "Buffer.write(string, encoding, offset[, length]) is no longer supported"
            );
          var o,
            i,
            s,
            a,
            c,
            l,
            u,
            h,
            f = this.length - t;
          if (
            ((void 0 === r || r > f) && (r = f),
            (e.length > 0 && (r < 0 || t < 0)) || t > this.length)
          )
            throw RangeError("Attempt to write outside buffer bounds");
          n || (n = "utf8");
          for (var d = !1; ; )
            switch (n) {
              case "hex":
                return (function (e, t, r, n) {
                  r = Number(r) || 0;
                  var o = e.length - r;
                  n ? (n = Number(n)) > o && (n = o) : (n = o);
                  var i = t.length;
                  n > i / 2 && (n = i / 2);
                  for (var s = 0; s < n; ++s) {
                    var a = parseInt(t.substr(2 * s, 2), 16);
                    if (a != a) break;
                    e[r + s] = a;
                  }
                  return s;
                })(this, e, t, r);
              case "utf8":
              case "utf-8":
                return (o = t), (i = r), x(k(e, this.length - o), this, o, i);
              case "ascii":
              case "latin1":
              case "binary":
                return (
                  (s = t),
                  (a = r),
                  x(
                    (function (e) {
                      for (var t = [], r = 0; r < e.length; ++r)
                        t.push(255 & e.charCodeAt(r));
                      return t;
                    })(e),
                    this,
                    s,
                    a
                  )
                );
              case "base64":
                return (c = t), (l = r), x(I(e), this, c, l);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return (
                  (u = t),
                  (h = r),
                  x(
                    (function (e, t) {
                      for (
                        var r, n, o = [], i = 0;
                        i < e.length && !((t -= 2) < 0);
                        ++i
                      )
                        (n = (r = e.charCodeAt(i)) >> 8),
                          o.push(r % 256),
                          o.push(n);
                      return o;
                    })(e, this.length - u),
                    this,
                    u,
                    h
                  )
                );
              default:
                if (d) throw TypeError("Unknown encoding: " + n);
                (n = ("" + n).toLowerCase()), (d = !0);
            }
        }),
        (a.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        }),
        (a.prototype.slice = function (e, t) {
          var r = this.length;
          (e = ~~e),
            (t = void 0 === t ? r : ~~t),
            e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            t < e && (t = e);
          var n = this.subarray(e, t);
          return Object.setPrototypeOf(n, a.prototype), n;
        }),
        (a.prototype.readUintLE = a.prototype.readUIntLE =
          function (e, t, r) {
            (e >>>= 0), (t >>>= 0), r || w(e, t, this.length);
            for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256); )
              n += this[e + i] * o;
            return n;
          }),
        (a.prototype.readUintBE = a.prototype.readUIntBE =
          function (e, t, r) {
            (e >>>= 0), (t >>>= 0), r || w(e, t, this.length);
            for (var n = this[e + --t], o = 1; t > 0 && (o *= 256); )
              n += this[e + --t] * o;
            return n;
          }),
        (a.prototype.readUint8 = a.prototype.readUInt8 =
          function (e, t) {
            return (e >>>= 0), t || w(e, 1, this.length), this[e];
          }),
        (a.prototype.readUint16LE = a.prototype.readUInt16LE =
          function (e, t) {
            return (
              (e >>>= 0),
              t || w(e, 2, this.length),
              this[e] | (this[e + 1] << 8)
            );
          }),
        (a.prototype.readUint16BE = a.prototype.readUInt16BE =
          function (e, t) {
            return (
              (e >>>= 0),
              t || w(e, 2, this.length),
              (this[e] << 8) | this[e + 1]
            );
          }),
        (a.prototype.readUint32LE = a.prototype.readUInt32LE =
          function (e, t) {
            return (
              (e >>>= 0),
              t || w(e, 4, this.length),
              (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                16777216 * this[e + 3]
            );
          }),
        (a.prototype.readUint32BE = a.prototype.readUInt32BE =
          function (e, t) {
            return (
              (e >>>= 0),
              t || w(e, 4, this.length),
              16777216 * this[e] +
                ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
            );
          }),
        (a.prototype.readIntLE = function (e, t, r) {
          (e >>>= 0), (t >>>= 0), r || w(e, t, this.length);
          for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256); )
            n += this[e + i] * o;
          return n >= (o *= 128) && (n -= Math.pow(2, 8 * t)), n;
        }),
        (a.prototype.readIntBE = function (e, t, r) {
          (e >>>= 0), (t >>>= 0), r || w(e, t, this.length);
          for (var n = t, o = 1, i = this[e + --n]; n > 0 && (o *= 256); )
            i += this[e + --n] * o;
          return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i;
        }),
        (a.prototype.readInt8 = function (e, t) {
          return ((e >>>= 0), t || w(e, 1, this.length), 128 & this[e])
            ? -((255 - this[e] + 1) * 1)
            : this[e];
        }),
        (a.prototype.readInt16LE = function (e, t) {
          (e >>>= 0), t || w(e, 2, this.length);
          var r = this[e] | (this[e + 1] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (a.prototype.readInt16BE = function (e, t) {
          (e >>>= 0), t || w(e, 2, this.length);
          var r = this[e + 1] | (this[e] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (a.prototype.readInt32LE = function (e, t) {
          return (
            (e >>>= 0),
            t || w(e, 4, this.length),
            this[e] |
              (this[e + 1] << 8) |
              (this[e + 2] << 16) |
              (this[e + 3] << 24)
          );
        }),
        (a.prototype.readInt32BE = function (e, t) {
          return (
            (e >>>= 0),
            t || w(e, 4, this.length),
            (this[e] << 24) |
              (this[e + 1] << 16) |
              (this[e + 2] << 8) |
              this[e + 3]
          );
        }),
        (a.prototype.readFloatLE = function (e, t) {
          return (
            (e >>>= 0), t || w(e, 4, this.length), o.read(this, e, !0, 23, 4)
          );
        }),
        (a.prototype.readFloatBE = function (e, t) {
          return (
            (e >>>= 0), t || w(e, 4, this.length), o.read(this, e, !1, 23, 4)
          );
        }),
        (a.prototype.readDoubleLE = function (e, t) {
          return (
            (e >>>= 0), t || w(e, 8, this.length), o.read(this, e, !0, 52, 8)
          );
        }),
        (a.prototype.readDoubleBE = function (e, t) {
          return (
            (e >>>= 0), t || w(e, 8, this.length), o.read(this, e, !1, 52, 8)
          );
        }),
        (a.prototype.writeUintLE = a.prototype.writeUIntLE =
          function (e, t, r, n) {
            if (((e = +e), (t >>>= 0), (r >>>= 0), !n)) {
              var o = Math.pow(2, 8 * r) - 1;
              _(this, e, t, r, o, 0);
            }
            var i = 1,
              s = 0;
            for (this[t] = 255 & e; ++s < r && (i *= 256); )
              this[t + s] = (e / i) & 255;
            return t + r;
          }),
        (a.prototype.writeUintBE = a.prototype.writeUIntBE =
          function (e, t, r, n) {
            if (((e = +e), (t >>>= 0), (r >>>= 0), !n)) {
              var o = Math.pow(2, 8 * r) - 1;
              _(this, e, t, r, o, 0);
            }
            var i = r - 1,
              s = 1;
            for (this[t + i] = 255 & e; --i >= 0 && (s *= 256); )
              this[t + i] = (e / s) & 255;
            return t + r;
          }),
        (a.prototype.writeUint8 = a.prototype.writeUInt8 =
          function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || _(this, e, t, 1, 255, 0),
              (this[t] = 255 & e),
              t + 1
            );
          }),
        (a.prototype.writeUint16LE = a.prototype.writeUInt16LE =
          function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || _(this, e, t, 2, 65535, 0),
              (this[t] = 255 & e),
              (this[t + 1] = e >>> 8),
              t + 2
            );
          }),
        (a.prototype.writeUint16BE = a.prototype.writeUInt16BE =
          function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || _(this, e, t, 2, 65535, 0),
              (this[t] = e >>> 8),
              (this[t + 1] = 255 & e),
              t + 2
            );
          }),
        (a.prototype.writeUint32LE = a.prototype.writeUInt32LE =
          function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || _(this, e, t, 4, 4294967295, 0),
              (this[t + 3] = e >>> 24),
              (this[t + 2] = e >>> 16),
              (this[t + 1] = e >>> 8),
              (this[t] = 255 & e),
              t + 4
            );
          }),
        (a.prototype.writeUint32BE = a.prototype.writeUInt32BE =
          function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || _(this, e, t, 4, 4294967295, 0),
              (this[t] = e >>> 24),
              (this[t + 1] = e >>> 16),
              (this[t + 2] = e >>> 8),
              (this[t + 3] = 255 & e),
              t + 4
            );
          }),
        (a.prototype.writeIntLE = function (e, t, r, n) {
          if (((e = +e), (t >>>= 0), !n)) {
            var o = Math.pow(2, 8 * r - 1);
            _(this, e, t, r, o - 1, -o);
          }
          var i = 0,
            s = 1,
            a = 0;
          for (this[t] = 255 & e; ++i < r && (s *= 256); )
            e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1),
              (this[t + i] = (((e / s) >> 0) - a) & 255);
          return t + r;
        }),
        (a.prototype.writeIntBE = function (e, t, r, n) {
          if (((e = +e), (t >>>= 0), !n)) {
            var o = Math.pow(2, 8 * r - 1);
            _(this, e, t, r, o - 1, -o);
          }
          var i = r - 1,
            s = 1,
            a = 0;
          for (this[t + i] = 255 & e; --i >= 0 && (s *= 256); )
            e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1),
              (this[t + i] = (((e / s) >> 0) - a) & 255);
          return t + r;
        }),
        (a.prototype.writeInt8 = function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || _(this, e, t, 1, 127, -128),
            e < 0 && (e = 255 + e + 1),
            (this[t] = 255 & e),
            t + 1
          );
        }),
        (a.prototype.writeInt16LE = function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || _(this, e, t, 2, 32767, -32768),
            (this[t] = 255 & e),
            (this[t + 1] = e >>> 8),
            t + 2
          );
        }),
        (a.prototype.writeInt16BE = function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || _(this, e, t, 2, 32767, -32768),
            (this[t] = e >>> 8),
            (this[t + 1] = 255 & e),
            t + 2
          );
        }),
        (a.prototype.writeInt32LE = function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || _(this, e, t, 4, 2147483647, -2147483648),
            (this[t] = 255 & e),
            (this[t + 1] = e >>> 8),
            (this[t + 2] = e >>> 16),
            (this[t + 3] = e >>> 24),
            t + 4
          );
        }),
        (a.prototype.writeInt32BE = function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || _(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            (this[t] = e >>> 24),
            (this[t + 1] = e >>> 16),
            (this[t + 2] = e >>> 8),
            (this[t + 3] = 255 & e),
            t + 4
          );
        }),
        (a.prototype.writeFloatLE = function (e, t, r) {
          return E(this, e, t, !0, r);
        }),
        (a.prototype.writeFloatBE = function (e, t, r) {
          return E(this, e, t, !1, r);
        }),
        (a.prototype.writeDoubleLE = function (e, t, r) {
          return C(this, e, t, !0, r);
        }),
        (a.prototype.writeDoubleBE = function (e, t, r) {
          return C(this, e, t, !1, r);
        }),
        (a.prototype.copy = function (e, t, r, n) {
          if (!a.isBuffer(e)) throw TypeError("argument should be a Buffer");
          if (
            (r || (r = 0),
            n || 0 === n || (n = this.length),
            t >= e.length && (t = e.length),
            t || (t = 0),
            n > 0 && n < r && (n = r),
            n === r || 0 === e.length || 0 === this.length)
          )
            return 0;
          if (t < 0) throw RangeError("targetStart out of bounds");
          if (r < 0 || r >= this.length) throw RangeError("Index out of range");
          if (n < 0) throw RangeError("sourceEnd out of bounds");
          n > this.length && (n = this.length),
            e.length - t < n - r && (n = e.length - t + r);
          var o = n - r;
          return (
            this === e && "function" == typeof Uint8Array.prototype.copyWithin
              ? this.copyWithin(t, r, n)
              : Uint8Array.prototype.set.call(e, this.subarray(r, n), t),
            o
          );
        }),
        (a.prototype.fill = function (e, t, r, n) {
          if ("string" == typeof e) {
            if (
              ("string" == typeof t
                ? ((n = t), (t = 0), (r = this.length))
                : "string" == typeof r && ((n = r), (r = this.length)),
              void 0 !== n && "string" != typeof n)
            )
              throw TypeError("encoding must be a string");
            if ("string" == typeof n && !a.isEncoding(n))
              throw TypeError("Unknown encoding: " + n);
            if (1 === e.length) {
              var o,
                i = e.charCodeAt(0);
              (("utf8" === n && i < 128) || "latin1" === n) && (e = i);
            }
          } else
            "number" == typeof e
              ? (e &= 255)
              : "boolean" == typeof e && (e = Number(e));
          if (t < 0 || this.length < t || this.length < r)
            throw RangeError("Out of range index");
          if (r <= t) return this;
          if (
            ((t >>>= 0),
            (r = void 0 === r ? this.length : r >>> 0),
            e || (e = 0),
            "number" == typeof e)
          )
            for (o = t; o < r; ++o) this[o] = e;
          else {
            var s = a.isBuffer(e) ? e : a.from(e, n),
              c = s.length;
            if (0 === c)
              throw TypeError(
                'The value "' + e + '" is invalid for argument "value"'
              );
            for (o = 0; o < r - t; ++o) this[o + t] = s[o % c];
          }
          return this;
        });
      var T = /[^+/0-9A-Za-z-_]/g;
      function k(e, t) {
        t = t || 1 / 0;
        for (var r, n = e.length, o = null, i = [], s = 0; s < n; ++s) {
          if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
            if (!o) {
              if (r > 56319 || s + 1 === n) {
                (t -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }
              o = r;
              continue;
            }
            if (r < 56320) {
              (t -= 3) > -1 && i.push(239, 191, 189), (o = r);
              continue;
            }
            r = (((o - 55296) << 10) | (r - 56320)) + 65536;
          } else o && (t -= 3) > -1 && i.push(239, 191, 189);
          if (((o = null), r < 128)) {
            if ((t -= 1) < 0) break;
            i.push(r);
          } else if (r < 2048) {
            if ((t -= 2) < 0) break;
            i.push((r >> 6) | 192, (63 & r) | 128);
          } else if (r < 65536) {
            if ((t -= 3) < 0) break;
            i.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
          } else if (r < 1114112) {
            if ((t -= 4) < 0) break;
            i.push(
              (r >> 18) | 240,
              ((r >> 12) & 63) | 128,
              ((r >> 6) & 63) | 128,
              (63 & r) | 128
            );
          } else throw Error("Invalid code point");
        }
        return i;
      }
      function I(e) {
        return n.toByteArray(
          (function (e) {
            if ((e = (e = e.split("=")[0]).trim().replace(T, "")).length < 2)
              return "";
            for (; e.length % 4 != 0; ) e += "=";
            return e;
          })(e)
        );
      }
      function x(e, t, r, n) {
        for (var o = 0; o < n && !(o + r >= t.length) && !(o >= e.length); ++o)
          t[o + r] = e[o];
        return o;
      }
      function P(e, t) {
        return (
          e instanceof t ||
          (null != e &&
            null != e.constructor &&
            null != e.constructor.name &&
            e.constructor.name === t.name)
        );
      }
      var O = (function () {
        for (var e = "0123456789abcdef", t = Array(256), r = 0; r < 16; ++r)
          for (var n = 16 * r, o = 0; o < 16; ++o) t[n + o] = e[r] + e[o];
        return t;
      })();
    },
    894: function (e, t) {
      /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
      (t.read = function (e, t, r, n, o) {
        var i,
          s,
          a = 8 * o - n - 1,
          c = (1 << a) - 1,
          l = c >> 1,
          u = -7,
          h = r ? o - 1 : 0,
          f = r ? -1 : 1,
          d = e[t + h];
        for (
          h += f, i = d & ((1 << -u) - 1), d >>= -u, u += a;
          u > 0;
          i = 256 * i + e[t + h], h += f, u -= 8
        );
        for (
          s = i & ((1 << -u) - 1), i >>= -u, u += n;
          u > 0;
          s = 256 * s + e[t + h], h += f, u -= 8
        );
        if (0 === i) i = 1 - l;
        else {
          if (i === c) return s ? NaN : (1 / 0) * (d ? -1 : 1);
          (s += Math.pow(2, n)), (i -= l);
        }
        return (d ? -1 : 1) * s * Math.pow(2, i - n);
      }),
        (t.write = function (e, t, r, n, o, i) {
          var s,
            a,
            c,
            l = 8 * i - o - 1,
            u = (1 << l) - 1,
            h = u >> 1,
            f = 23 === o ? 5960464477539062e-23 : 0,
            d = n ? 0 : i - 1,
            p = n ? 1 : -1,
            g = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
          for (
            isNaN((t = Math.abs(t))) || t === 1 / 0
              ? ((a = isNaN(t) ? 1 : 0), (s = u))
              : ((s = Math.floor(Math.log(t) / Math.LN2)),
                t * (c = Math.pow(2, -s)) < 1 && (s--, (c *= 2)),
                s + h >= 1 ? (t += f / c) : (t += f * Math.pow(2, 1 - h)),
                t * c >= 2 && (s++, (c /= 2)),
                s + h >= u
                  ? ((a = 0), (s = u))
                  : s + h >= 1
                  ? ((a = (t * c - 1) * Math.pow(2, o)), (s += h))
                  : ((a = t * Math.pow(2, h - 1) * Math.pow(2, o)), (s = 0)));
            o >= 8;
            e[r + d] = 255 & a, d += p, a /= 256, o -= 8
          );
          for (
            s = (s << o) | a, l += o;
            l > 0;
            e[r + d] = 255 & s, d += p, s /= 256, l -= 8
          );
          e[r + d - p] |= 128 * g;
        });
    },
    4715: function (e, t, r) {
      "use strict";
      r.d(t, {
        Z: function () {
          return a;
        },
      });
      var n = r(6118),
        o = r(1048),
        i = /<(\w+)>(.*?)<\/\1>|<(\w+)\/>/,
        s = /(?:\r\n|\r|\n)/g;
      function a(e) {
        var t = e.i18nKey,
          r = e.values,
          a = e.components,
          c = e.fallback,
          l = e.defaultTrans,
          u = e.ns,
          h = (0, o.Z)(u),
          f = h.t,
          d = h.lang;
        return (0, n.useMemo)(
          function () {
            var e = f(t, r, {
              fallback: c,
              default: l,
            });
            return a && 0 !== a.length
              ? (function e(t, r) {
                  void 0 === r && (r = []);
                  var o = t.replace(s, "").split(i);
                  if (1 === o.length) return t;
                  var a = [],
                    c = o.shift();
                  return (
                    c && a.push(c),
                    (function e(t) {
                      if (!t.length) return [];
                      var r = t.slice(0, 4),
                        n = r[0],
                        o = r[1],
                        i = r[2];
                      return [[n || i, o || "", r[3]]].concat(
                        e(t.slice(4, t.length))
                      );
                    })(o).forEach(function (t, o) {
                      var i = t[0],
                        s = t[1],
                        c = t[2],
                        l = r[i] || n.createElement(n.Fragment, null);
                      a.push(
                        (0, n.cloneElement)(
                          l,
                          {
                            key: o,
                          },
                          s ? e(s, r) : l.props.children
                        )
                      ),
                        c && a.push(c);
                    }),
                    a
                  );
                })(e, a)
              : e;
          },
          [t, r, a, d]
        );
      }
    },
    7726: function (e, t, r) {
      "use strict";
      r.d(t, {
        Z: function () {
          return c;
        },
      });
      var n = r(1653),
        o = r(3514),
        i = r(1233),
        s = function (e, t, r, n) {
          return new (r || (r = Promise))(function (o, i) {
            function s(e) {
              try {
                c(n.next(e));
              } catch (e) {
                i(e);
              }
            }
            function a(e) {
              try {
                c(n.throw(e));
              } catch (e) {
                i(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? o(e.value)
                : ((t = e.value) instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })
                  ).then(s, a);
            }
            c((n = n.apply(e, t || [])).next());
          });
        },
        a = function (e, t) {
          var r,
            n,
            o,
            i,
            s = {
              label: 0,
              sent: function () {
                if (1 & o[0]) throw o[1];
                return o[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (i = {
              next: a(0),
              throw: a(1),
              return: a(2),
            }),
            "function" == typeof Symbol &&
              (i[Symbol.iterator] = function () {
                return this;
              }),
            i
          );
          function a(i) {
            return function (a) {
              return (function (i) {
                if (r) throw TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      n &&
                        (o =
                          2 & i[0]
                            ? n.return
                            : i[0]
                            ? n.throw || ((o = n.return) && o.call(n), 0)
                            : n.next) &&
                        !(o = o.call(n, i[1])).done)
                    )
                      return o;
                    switch (((n = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                      case 0:
                      case 1:
                        o = i;
                        break;
                      case 4:
                        return (
                          s.label++,
                          {
                            value: i[1],
                            done: !1,
                          }
                        );
                      case 5:
                        s.label++, (n = i[1]), (i = [0]);
                        continue;
                      case 7:
                        (i = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !(o = (o = s.trys).length > 0 && o[o.length - 1]) &&
                          (6 === i[0] || 2 === i[0])
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === i[0] &&
                          (!o || (i[1] > o[0] && i[1] < o[3]))
                        ) {
                          s.label = i[1];
                          break;
                        }
                        if (6 === i[0] && s.label < o[1]) {
                          (s.label = o[1]), (o = i);
                          break;
                        }
                        if (o && s.label < o[2]) {
                          (s.label = o[2]), s.ops.push(i);
                          break;
                        }
                        o[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    i = t.call(e, s);
                  } catch (e) {
                    (i = [6, e]), (n = 0);
                  } finally {
                    r = o = 0;
                  }
                if (5 & i[0]) throw i[1];
                return {
                  value: i[0] ? i[1] : void 0,
                  done: !0,
                };
              })([i, a]);
            };
          }
        };
      function c(e, t) {
        return (
          void 0 === e && (e = ""),
          void 0 === t && (t = ""),
          s(this, void 0, void 0, function () {
            var r,
              c,
              l,
              u,
              h,
              f,
              d,
              p,
              g,
              y,
              m = this;
            return a(this, function (v) {
              switch (v.label) {
                case 0:
                  return (
                    (r = (0, n.Z)()),
                    (c = function () {
                      return s(m, void 0, void 0, function () {
                        return a(this, function (e) {
                          return [2, Promise.resolve({})];
                        });
                      });
                    }),
                    (l = e || r.defaultLocale || ""),
                    (u = r.loadLocaleFrom || c),
                    (h = Array.isArray(t) ? t : [t]),
                    (f = {}),
                    [
                      4,
                      Promise.all(
                        h.map(function (e) {
                          return s(m, void 0, void 0, function () {
                            var t, r;
                            return a(this, function (n) {
                              switch (n.label) {
                                case 0:
                                  return (t = f), (r = e), [4, u(l, e)];
                                case 1:
                                  return (t[r] = n.sent()), [2];
                              }
                            });
                          });
                        })
                      ),
                    ]
                  );
                case 1:
                  return (
                    v.sent(),
                    (d = (r.localesToIgnore || ["default"]).includes(l)),
                    (p = new Intl.PluralRules(d ? void 0 : l)),
                    (g = (0, o.Z)({
                      config: r,
                      allNamespaces: f,
                      pluralRules: p,
                      lang: l,
                    })),
                    (y = h[0]),
                    [2, (0, i.Z)(g, y)]
                  );
              }
            });
          })
        );
      }
    },
    8700: function () {},
    1791: function (e, t, r) {
      e.exports = r(9605);
    },
    8033: function (e, t, r) {
      e.exports = r(6307);
    },
    2338: function (e, t, r) {
      "use strict";
      var n = r(4122);
      r(8700);
      var o = r(6118),
        i =
          o && "object" == typeof o && "default" in o
            ? o
            : {
                default: o,
              },
        s = void 0 !== n && n.env && !0,
        a = function (e) {
          return "[object String]" === Object.prototype.toString.call(e);
        },
        c = (function () {
          function e(e) {
            var t = void 0 === e ? {} : e,
              r = t.name,
              n = void 0 === r ? "stylesheet" : r,
              o = t.optimizeForSpeed,
              i = void 0 === o ? s : o;
            l(a(n), "`name` must be a string"),
              (this._name = n),
              (this._deletedRulePlaceholder = "#" + n + "-deleted-rule____{}"),
              l("boolean" == typeof i, "`optimizeForSpeed` must be a boolean"),
              (this._optimizeForSpeed = i),
              (this._serverSheet = void 0),
              (this._tags = []),
              (this._injected = !1),
              (this._rulesCount = 0);
            var c = document.querySelector('meta[property="csp-nonce"]');
            this._nonce = c ? c.getAttribute("content") : null;
          }
          var t = e.prototype;
          return (
            (t.setOptimizeForSpeed = function (e) {
              l(
                "boolean" == typeof e,
                "`setOptimizeForSpeed` accepts a boolean"
              ),
                l(
                  0 === this._rulesCount,
                  "optimizeForSpeed cannot be when rules have already been inserted"
                ),
                this.flush(),
                (this._optimizeForSpeed = e),
                this.inject();
            }),
            (t.isOptimizeForSpeed = function () {
              return this._optimizeForSpeed;
            }),
            (t.inject = function () {
              var e = this;
              if (
                (l(!this._injected, "sheet already injected"),
                (this._injected = !0),
                this._optimizeForSpeed)
              ) {
                (this._tags[0] = this.makeStyleTag(this._name)),
                  (this._optimizeForSpeed = "insertRule" in this.getSheet()),
                  this._optimizeForSpeed ||
                    (s ||
                      console.warn(
                        "StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."
                      ),
                    this.flush(),
                    (this._injected = !0));
                return;
              }
              this._serverSheet = {
                cssRules: [],
                insertRule: function (t, r) {
                  return (
                    "number" == typeof r
                      ? (e._serverSheet.cssRules[r] = {
                          cssText: t,
                        })
                      : e._serverSheet.cssRules.push({
                          cssText: t,
                        }),
                    r
                  );
                },
                deleteRule: function (t) {
                  e._serverSheet.cssRules[t] = null;
                },
              };
            }),
            (t.getSheetForTag = function (e) {
              if (e.sheet) return e.sheet;
              for (var t = 0; t < document.styleSheets.length; t++)
                if (document.styleSheets[t].ownerNode === e)
                  return document.styleSheets[t];
            }),
            (t.getSheet = function () {
              return this.getSheetForTag(this._tags[this._tags.length - 1]);
            }),
            (t.insertRule = function (e, t) {
              if (
                (l(a(e), "`insertRule` accepts only strings"),
                this._optimizeForSpeed)
              ) {
                var r = this.getSheet();
                "number" != typeof t && (t = r.cssRules.length);
                try {
                  r.insertRule(e, t);
                } catch (t) {
                  return (
                    s ||
                      console.warn(
                        "StyleSheet: illegal rule: \n\n" +
                          e +
                          "\n\nSee https://stackoverflow.com/q/20007992 for more info"
                      ),
                    -1
                  );
                }
              } else {
                var n = this._tags[t];
                this._tags.push(this.makeStyleTag(this._name, e, n));
              }
              return this._rulesCount++;
            }),
            (t.replaceRule = function (e, t) {
              if (this._optimizeForSpeed) {
                var r = this.getSheet();
                if (
                  (t.trim() || (t = this._deletedRulePlaceholder),
                  !r.cssRules[e])
                )
                  return e;
                r.deleteRule(e);
                try {
                  r.insertRule(t, e);
                } catch (n) {
                  s ||
                    console.warn(
                      "StyleSheet: illegal rule: \n\n" +
                        t +
                        "\n\nSee https://stackoverflow.com/q/20007992 for more info"
                    ),
                    r.insertRule(this._deletedRulePlaceholder, e);
                }
              } else {
                var n = this._tags[e];
                l(n, "old rule at index `" + e + "` not found"),
                  (n.textContent = t);
              }
              return e;
            }),
            (t.deleteRule = function (e) {
              if (this._optimizeForSpeed) this.replaceRule(e, "");
              else {
                var t = this._tags[e];
                l(t, "rule at index `" + e + "` not found"),
                  t.parentNode.removeChild(t),
                  (this._tags[e] = null);
              }
            }),
            (t.flush = function () {
              (this._injected = !1),
                (this._rulesCount = 0),
                this._tags.forEach(function (e) {
                  return e && e.parentNode.removeChild(e);
                }),
                (this._tags = []);
            }),
            (t.cssRules = function () {
              var e = this;
              return this._tags.reduce(function (t, r) {
                return (
                  r
                    ? (t = t.concat(
                        Array.prototype.map.call(
                          e.getSheetForTag(r).cssRules,
                          function (t) {
                            return t.cssText === e._deletedRulePlaceholder
                              ? null
                              : t;
                          }
                        )
                      ))
                    : t.push(null),
                  t
                );
              }, []);
            }),
            (t.makeStyleTag = function (e, t, r) {
              t &&
                l(
                  a(t),
                  "makeStyleTag accepts only strings as second parameter"
                );
              var n = document.createElement("style");
              this._nonce && n.setAttribute("nonce", this._nonce),
                (n.type = "text/css"),
                n.setAttribute("data-" + e, ""),
                t && n.appendChild(document.createTextNode(t));
              var o = document.head || document.getElementsByTagName("head")[0];
              return r ? o.insertBefore(n, r) : o.appendChild(n), n;
            }),
            (function (e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            })(e.prototype, [
              {
                key: "length",
                get: function () {
                  return this._rulesCount;
                },
              },
            ]),
            e
          );
        })();
      function l(e, t) {
        if (!e) throw Error("StyleSheet: " + t + ".");
      }
      var u = function (e) {
          for (var t = 5381, r = e.length; r; )
            t = (33 * t) ^ e.charCodeAt(--r);
          return t >>> 0;
        },
        h = {};
      function f(e, t) {
        if (!t) return "jsx-" + e;
        var r = String(t),
          n = e + r;
        return h[n] || (h[n] = "jsx-" + u(e + "-" + r)), h[n];
      }
      function d(e, t) {
        var r = e + t;
        return (
          h[r] || (h[r] = t.replace(/__jsx-style-dynamic-selector/g, e)), h[r]
        );
      }
      var p = (function () {
          function e(e) {
            var t = void 0 === e ? {} : e,
              r = t.styleSheet,
              n = void 0 === r ? null : r,
              o = t.optimizeForSpeed,
              i = void 0 !== o && o;
            (this._sheet =
              n ||
              new c({
                name: "styled-jsx",
                optimizeForSpeed: i,
              })),
              this._sheet.inject(),
              n &&
                "boolean" == typeof i &&
                (this._sheet.setOptimizeForSpeed(i),
                (this._optimizeForSpeed = this._sheet.isOptimizeForSpeed())),
              (this._fromServer = void 0),
              (this._indices = {}),
              (this._instancesCounts = {});
          }
          var t = e.prototype;
          return (
            (t.add = function (e) {
              var t = this;
              void 0 === this._optimizeForSpeed &&
                ((this._optimizeForSpeed = Array.isArray(e.children)),
                this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),
                (this._optimizeForSpeed = this._sheet.isOptimizeForSpeed())),
                this._fromServer ||
                  ((this._fromServer = this.selectFromServer()),
                  (this._instancesCounts = Object.keys(this._fromServer).reduce(
                    function (e, t) {
                      return (e[t] = 0), e;
                    },
                    {}
                  )));
              var r = this.getIdAndRules(e),
                n = r.styleId,
                o = r.rules;
              if (n in this._instancesCounts) {
                this._instancesCounts[n] += 1;
                return;
              }
              var i = o
                .map(function (e) {
                  return t._sheet.insertRule(e);
                })
                .filter(function (e) {
                  return -1 !== e;
                });
              (this._indices[n] = i), (this._instancesCounts[n] = 1);
            }),
            (t.remove = function (e) {
              var t = this,
                r = this.getIdAndRules(e).styleId;
              if (
                ((function (e, t) {
                  if (!e) throw Error("StyleSheetRegistry: " + t + ".");
                })(
                  r in this._instancesCounts,
                  "styleId: `" + r + "` not found"
                ),
                (this._instancesCounts[r] -= 1),
                this._instancesCounts[r] < 1)
              ) {
                var n = this._fromServer && this._fromServer[r];
                n
                  ? (n.parentNode.removeChild(n), delete this._fromServer[r])
                  : (this._indices[r].forEach(function (e) {
                      return t._sheet.deleteRule(e);
                    }),
                    delete this._indices[r]),
                  delete this._instancesCounts[r];
              }
            }),
            (t.update = function (e, t) {
              this.add(t), this.remove(e);
            }),
            (t.flush = function () {
              this._sheet.flush(),
                this._sheet.inject(),
                (this._fromServer = void 0),
                (this._indices = {}),
                (this._instancesCounts = {});
            }),
            (t.cssRules = function () {
              var e = this,
                t = this._fromServer
                  ? Object.keys(this._fromServer).map(function (t) {
                      return [t, e._fromServer[t]];
                    })
                  : [],
                r = this._sheet.cssRules();
              return t.concat(
                Object.keys(this._indices)
                  .map(function (t) {
                    return [
                      t,
                      e._indices[t]
                        .map(function (e) {
                          return r[e].cssText;
                        })
                        .join(e._optimizeForSpeed ? "" : "\n"),
                    ];
                  })
                  .filter(function (e) {
                    return !!e[1];
                  })
              );
            }),
            (t.styles = function (e) {
              var t, r;
              return (
                (t = this.cssRules()),
                void 0 === (r = e) && (r = {}),
                t.map(function (e) {
                  var t = e[0],
                    n = e[1];
                  return i.default.createElement("style", {
                    id: "__" + t,
                    key: "__" + t,
                    nonce: r.nonce ? r.nonce : void 0,
                    dangerouslySetInnerHTML: {
                      __html: n,
                    },
                  });
                })
              );
            }),
            (t.getIdAndRules = function (e) {
              var t = e.children,
                r = e.dynamic,
                n = e.id;
              if (r) {
                var o = f(n, r);
                return {
                  styleId: o,
                  rules: Array.isArray(t)
                    ? t.map(function (e) {
                        return d(o, e);
                      })
                    : [d(o, t)],
                };
              }
              return {
                styleId: f(n),
                rules: Array.isArray(t) ? t : [t],
              };
            }),
            (t.selectFromServer = function () {
              return Array.prototype.slice
                .call(document.querySelectorAll('[id^="__jsx-"]'))
                .reduce(function (e, t) {
                  return (e[t.id.slice(2)] = t), e;
                }, {});
            }),
            e
          );
        })(),
        g = o.createContext(null);
      g.displayName = "StyleSheetContext";
      var y = i.default.useInsertionEffect || i.default.useLayoutEffect,
        m = new p();
      function v(e) {
        var t = m || o.useContext(g);
        return (
          t &&
            y(
              function () {
                return (
                  t.add(e),
                  function () {
                    t.remove(e);
                  }
                );
              },
              [e.id, String(e.dynamic)]
            ),
          null
        );
      }
      (v.dynamic = function (e) {
        return e
          .map(function (e) {
            return f(e[0], e[1]);
          })
          .join(" ");
      }),
        (t.style = v);
    },
    371: function (e, t, r) {
      "use strict";
      e.exports = r(2338).style;
    },
    444: function (e, t, r) {
      "use strict";
      let n, o, i, s;
      r.d(t, {
        Z: function () {
          return to;
        },
      });
      var a,
        c = {};
      function l(e, t) {
        return function () {
          return e.apply(t, arguments);
        };
      }
      r.r(c),
        r.d(c, {
          hasBrowserEnv: function () {
            return eh;
          },
          hasStandardBrowserEnv: function () {
            return ef;
          },
          hasStandardBrowserWebWorkerEnv: function () {
            return ed;
          },
          origin: function () {
            return ep;
          },
        });
      let { toString: u } = Object.prototype,
        { getPrototypeOf: h } = Object,
        f =
          ((n = Object.create(null)),
          (e) => {
            let t = u.call(e);
            return n[t] || (n[t] = t.slice(8, -1).toLowerCase());
          }),
        d = (e) => ((e = e.toLowerCase()), (t) => f(t) === e),
        p = (e) => (t) => typeof t === e,
        { isArray: g } = Array,
        y = p("undefined"),
        m = d("ArrayBuffer"),
        v = p("string"),
        b = p("function"),
        w = p("number"),
        _ = (e) => null !== e && "object" == typeof e,
        S = (e) => {
          if ("object" !== f(e)) return !1;
          let t = h(e);
          return (
            (null === t ||
              t === Object.prototype ||
              null === Object.getPrototypeOf(t)) &&
            !(Symbol.toStringTag in e) &&
            !(Symbol.iterator in e)
          );
        },
        E = d("Date"),
        C = d("File"),
        T = d("Blob"),
        k = d("FileList"),
        I = d("URLSearchParams"),
        [x, P, O, R] = ["ReadableStream", "Request", "Response", "Headers"].map(
          d
        );
      function D(e, t, { allOwnKeys: r = !1 } = {}) {
        let n, o;
        if (null != e) {
          if (("object" != typeof e && (e = [e]), g(e)))
            for (n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);
          else {
            let o;
            let i = r ? Object.getOwnPropertyNames(e) : Object.keys(e),
              s = i.length;
            for (n = 0; n < s; n++) (o = i[n]), t.call(null, e[o], o, e);
          }
        }
      }
      function U(e, t) {
        let r;
        t = t.toLowerCase();
        let n = Object.keys(e),
          o = n.length;
        for (; o-- > 0; ) if (t === (r = n[o]).toLowerCase()) return r;
        return null;
      }
      let A =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : global,
        j = (e) => !y(e) && e !== A,
        N =
          ((o = "undefined" != typeof Uint8Array && h(Uint8Array)),
          (e) => o && e instanceof o),
        B = d("HTMLFormElement"),
        L = (
          ({ hasOwnProperty: e }) =>
          (t, r) =>
            e.call(t, r)
        )(Object.prototype),
        M = d("RegExp"),
        F = (e, t) => {
          let r = Object.getOwnPropertyDescriptors(e),
            n = {};
          D(r, (r, o) => {
            let i;
            !1 !== (i = t(r, o, e)) && (n[o] = i || r);
          }),
            Object.defineProperties(e, n);
        },
        z = "abcdefghijklmnopqrstuvwxyz",
        $ = "0123456789",
        W = {
          DIGIT: $,
          ALPHA: z,
          ALPHA_DIGIT: z + z.toUpperCase() + $,
        },
        H = d("AsyncFunction");
      var q = {
        isArray: g,
        isArrayBuffer: m,
        isBuffer: function (e) {
          return (
            null !== e &&
            !y(e) &&
            null !== e.constructor &&
            !y(e.constructor) &&
            b(e.constructor.isBuffer) &&
            e.constructor.isBuffer(e)
          );
        },
        isFormData: (e) => {
          let t;
          return (
            e &&
            (("function" == typeof FormData && e instanceof FormData) ||
              (b(e.append) &&
                ("formdata" === (t = f(e)) ||
                  ("object" === t &&
                    b(e.toString) &&
                    "[object FormData]" === e.toString()))))
          );
        },
        isArrayBufferView: function (e) {
          return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
            ? ArrayBuffer.isView(e)
            : e && e.buffer && m(e.buffer);
        },
        isString: v,
        isNumber: w,
        isBoolean: (e) => !0 === e || !1 === e,
        isObject: _,
        isPlainObject: S,
        isReadableStream: x,
        isRequest: P,
        isResponse: O,
        isHeaders: R,
        isUndefined: y,
        isDate: E,
        isFile: C,
        isBlob: T,
        isRegExp: M,
        isFunction: b,
        isStream: (e) => _(e) && b(e.pipe),
        isURLSearchParams: I,
        isTypedArray: N,
        isFileList: k,
        forEach: D,
        merge: function e() {
          let { caseless: t } = (j(this) && this) || {},
            r = {},
            n = (n, o) => {
              let i = (t && U(r, o)) || o;
              S(r[i]) && S(n)
                ? (r[i] = e(r[i], n))
                : S(n)
                ? (r[i] = e({}, n))
                : g(n)
                ? (r[i] = n.slice())
                : (r[i] = n);
            };
          for (let e = 0, t = arguments.length; e < t; e++)
            arguments[e] && D(arguments[e], n);
          return r;
        },
        extend: (e, t, r, { allOwnKeys: n } = {}) => (
          D(
            t,
            (t, n) => {
              r && b(t) ? (e[n] = l(t, r)) : (e[n] = t);
            },
            {
              allOwnKeys: n,
            }
          ),
          e
        ),
        trim: (e) =>
          e.trim
            ? e.trim()
            : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
        stripBOM: (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
        inherits: (e, t, r, n) => {
          (e.prototype = Object.create(t.prototype, n)),
            (e.prototype.constructor = e),
            Object.defineProperty(e, "super", {
              value: t.prototype,
            }),
            r && Object.assign(e.prototype, r);
        },
        toFlatObject: (e, t, r, n) => {
          let o, i, s;
          let a = {};
          if (((t = t || {}), null == e)) return t;
          do {
            for (i = (o = Object.getOwnPropertyNames(e)).length; i-- > 0; )
              (s = o[i]),
                (!n || n(s, e, t)) && !a[s] && ((t[s] = e[s]), (a[s] = !0));
            e = !1 !== r && h(e);
          } while (e && (!r || r(e, t)) && e !== Object.prototype);
          return t;
        },
        kindOf: f,
        kindOfTest: d,
        endsWith: (e, t, r) => {
          (e = String(e)),
            (void 0 === r || r > e.length) && (r = e.length),
            (r -= t.length);
          let n = e.indexOf(t, r);
          return -1 !== n && n === r;
        },
        toArray: (e) => {
          if (!e) return null;
          if (g(e)) return e;
          let t = e.length;
          if (!w(t)) return null;
          let r = Array(t);
          for (; t-- > 0; ) r[t] = e[t];
          return r;
        },
        forEachEntry: (e, t) => {
          let r;
          let n = (e && e[Symbol.iterator]).call(e);
          for (; (r = n.next()) && !r.done; ) {
            let n = r.value;
            t.call(e, n[0], n[1]);
          }
        },
        matchAll: (e, t) => {
          let r;
          let n = [];
          for (; null !== (r = e.exec(t)); ) n.push(r);
          return n;
        },
        isHTMLForm: B,
        hasOwnProperty: L,
        hasOwnProp: L,
        reduceDescriptors: F,
        freezeMethods: (e) => {
          F(e, (t, r) => {
            if (b(e) && -1 !== ["arguments", "caller", "callee"].indexOf(r))
              return !1;
            if (b(e[r])) {
              if (((t.enumerable = !1), "writable" in t)) {
                t.writable = !1;
                return;
              }
              t.set ||
                (t.set = () => {
                  throw Error("Can not rewrite read-only method '" + r + "'");
                });
            }
          });
        },
        toObjectSet: (e, t) => {
          let r = {};
          return (
            ((e) => {
              e.forEach((e) => {
                r[e] = !0;
              });
            })(g(e) ? e : String(e).split(t)),
            r
          );
        },
        toCamelCase: (e) =>
          e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, r) {
            return t.toUpperCase() + r;
          }),
        noop: () => {},
        toFiniteNumber: (e, t) =>
          null != e && Number.isFinite((e = +e)) ? e : t,
        findKey: U,
        global: A,
        isContextDefined: j,
        ALPHABET: W,
        generateString: (e = 16, t = W.ALPHA_DIGIT) => {
          let r = "",
            { length: n } = t;
          for (; e--; ) r += t[(Math.random() * n) | 0];
          return r;
        },
        isSpecCompliantForm: function (e) {
          return !!(
            e &&
            b(e.append) &&
            "FormData" === e[Symbol.toStringTag] &&
            e[Symbol.iterator]
          );
        },
        toJSONObject: (e) => {
          let t = Array(10),
            r = (e, n) => {
              if (_(e)) {
                if (t.indexOf(e) >= 0) return;
                if (!("toJSON" in e)) {
                  t[n] = e;
                  let o = g(e) ? [] : {};
                  return (
                    D(e, (e, t) => {
                      let i = r(e, n + 1);
                      y(i) || (o[t] = i);
                    }),
                    (t[n] = void 0),
                    o
                  );
                }
              }
              return e;
            };
          return r(e, 0);
        },
        isAsyncFn: H,
        isThenable: (e) => e && (_(e) || b(e)) && b(e.then) && b(e.catch),
      };
      function V(e, t, r, n, o) {
        Error.call(this),
          Error.captureStackTrace
            ? Error.captureStackTrace(this, this.constructor)
            : (this.stack = Error().stack),
          (this.message = e),
          (this.name = "AxiosError"),
          t && (this.code = t),
          r && (this.config = r),
          n && (this.request = n),
          o && (this.response = o);
      }
      q.inherits(V, Error, {
        toJSON: function () {
          return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: q.toJSONObject(this.config),
            code: this.code,
            status:
              this.response && this.response.status
                ? this.response.status
                : null,
          };
        },
      });
      let X = V.prototype,
        J = {};
      [
        "ERR_BAD_OPTION_VALUE",
        "ERR_BAD_OPTION",
        "ECONNABORTED",
        "ETIMEDOUT",
        "ERR_NETWORK",
        "ERR_FR_TOO_MANY_REDIRECTS",
        "ERR_DEPRECATED",
        "ERR_BAD_RESPONSE",
        "ERR_BAD_REQUEST",
        "ERR_CANCELED",
        "ERR_NOT_SUPPORT",
        "ERR_INVALID_URL",
      ].forEach((e) => {
        J[e] = {
          value: e,
        };
      }),
        Object.defineProperties(V, J),
        Object.defineProperty(X, "isAxiosError", {
          value: !0,
        }),
        (V.from = (e, t, r, n, o, i) => {
          let s = Object.create(X);
          return (
            q.toFlatObject(
              e,
              s,
              function (e) {
                return e !== Error.prototype;
              },
              (e) => "isAxiosError" !== e
            ),
            V.call(s, e.message, t, r, n, o),
            (s.cause = e),
            (s.name = e.name),
            i && Object.assign(s, i),
            s
          );
        });
      var K = r(615).lW;
      function Y(e) {
        return q.isPlainObject(e) || q.isArray(e);
      }
      function G(e) {
        return q.endsWith(e, "[]") ? e.slice(0, -2) : e;
      }
      function Z(e, t, r) {
        return e
          ? e
              .concat(t)
              .map(function (e, t) {
                return (e = G(e)), !r && t ? "[" + e + "]" : e;
              })
              .join(r ? "." : "")
          : t;
      }
      let Q = q.toFlatObject(q, {}, null, function (e) {
        return /^is[A-Z]/.test(e);
      });
      var ee = function (e, t, r) {
        if (!q.isObject(e)) throw TypeError("target must be an object");
        t = t || new FormData();
        let n = (r = q.toFlatObject(
            r,
            {
              metaTokens: !0,
              dots: !1,
              indexes: !1,
            },
            !1,
            function (e, t) {
              return !q.isUndefined(t[e]);
            }
          )).metaTokens,
          o = r.visitor || l,
          i = r.dots,
          s = r.indexes,
          a =
            (r.Blob || ("undefined" != typeof Blob && Blob)) &&
            q.isSpecCompliantForm(t);
        if (!q.isFunction(o)) throw TypeError("visitor must be a function");
        function c(e) {
          if (null === e) return "";
          if (q.isDate(e)) return e.toISOString();
          if (!a && q.isBlob(e))
            throw new V("Blob is not supported. Use a Buffer instead.");
          return q.isArrayBuffer(e) || q.isTypedArray(e)
            ? a && "function" == typeof Blob
              ? new Blob([e])
              : K.from(e)
            : e;
        }
        function l(e, r, o) {
          let a = e;
          if (e && !o && "object" == typeof e) {
            if (q.endsWith(r, "{}"))
              (r = n ? r : r.slice(0, -2)), (e = JSON.stringify(e));
            else {
              var l;
              if (
                (q.isArray(e) && ((l = e), q.isArray(l) && !l.some(Y))) ||
                ((q.isFileList(e) || q.endsWith(r, "[]")) && (a = q.toArray(e)))
              )
                return (
                  (r = G(r)),
                  a.forEach(function (e, n) {
                    q.isUndefined(e) ||
                      null === e ||
                      t.append(
                        !0 === s ? Z([r], n, i) : null === s ? r : r + "[]",
                        c(e)
                      );
                  }),
                  !1
                );
            }
          }
          return !!Y(e) || (t.append(Z(o, r, i), c(e)), !1);
        }
        let u = [],
          h = Object.assign(Q, {
            defaultVisitor: l,
            convertValue: c,
            isVisitable: Y,
          });
        if (!q.isObject(e)) throw TypeError("data must be an object");
        return (
          !(function e(r, n) {
            if (!q.isUndefined(r)) {
              if (-1 !== u.indexOf(r))
                throw Error("Circular reference detected in " + n.join("."));
              u.push(r),
                q.forEach(r, function (r, i) {
                  !0 ===
                    (!(q.isUndefined(r) || null === r) &&
                      o.call(t, r, q.isString(i) ? i.trim() : i, n, h)) &&
                    e(r, n ? n.concat(i) : [i]);
                }),
                u.pop();
            }
          })(e),
          t
        );
      };
      function et(e) {
        let t = {
          "!": "%21",
          "'": "%27",
          "(": "%28",
          ")": "%29",
          "~": "%7E",
          "%20": "+",
          "%00": "\0",
        };
        return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (e) {
          return t[e];
        });
      }
      function er(e, t) {
        (this._pairs = []), e && ee(e, this, t);
      }
      let en = er.prototype;
      function eo(e) {
        return encodeURIComponent(e)
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",")
          .replace(/%20/g, "+")
          .replace(/%5B/gi, "[")
          .replace(/%5D/gi, "]");
      }
      function ei(e, t, r) {
        let n;
        if (!t) return e;
        let o = (r && r.encode) || eo,
          i = r && r.serialize;
        if (
          (n = i
            ? i(t, r)
            : q.isURLSearchParams(t)
            ? t.toString()
            : new er(t, r).toString(o))
        ) {
          let t = e.indexOf("#");
          -1 !== t && (e = e.slice(0, t)),
            (e += (-1 === e.indexOf("?") ? "?" : "&") + n);
        }
        return e;
      }
      (en.append = function (e, t) {
        this._pairs.push([e, t]);
      }),
        (en.toString = function (e) {
          let t = e
            ? function (t) {
                return e.call(this, t, et);
              }
            : et;
          return this._pairs
            .map(function (e) {
              return t(e[0]) + "=" + t(e[1]);
            }, "")
            .join("&");
        });
      class es {
        constructor() {
          this.handlers = [];
        }
        use(e, t, r) {
          return (
            this.handlers.push({
              fulfilled: e,
              rejected: t,
              synchronous: !!r && r.synchronous,
              runWhen: r ? r.runWhen : null,
            }),
            this.handlers.length - 1
          );
        }
        eject(e) {
          this.handlers[e] && (this.handlers[e] = null);
        }
        clear() {
          this.handlers && (this.handlers = []);
        }
        forEach(e) {
          q.forEach(this.handlers, function (t) {
            null !== t && e(t);
          });
        }
      }
      var ea = {
          silentJSONParsing: !0,
          forcedJSONParsing: !0,
          clarifyTimeoutError: !1,
        },
        ec = "undefined" != typeof URLSearchParams ? URLSearchParams : er,
        el = "undefined" != typeof FormData ? FormData : null,
        eu = "undefined" != typeof Blob ? Blob : null;
      let eh = "undefined" != typeof window && "undefined" != typeof document,
        ef =
          ((i = "undefined" != typeof navigator && navigator.product),
          eh && 0 > ["ReactNative", "NativeScript", "NS"].indexOf(i)),
        ed =
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          "function" == typeof self.importScripts,
        ep = (eh && window.location.href) || "http://localhost";
      var eg = {
          ...c,
          isBrowser: !0,
          classes: {
            URLSearchParams: ec,
            FormData: el,
            Blob: eu,
          },
          protocols: ["http", "https", "file", "blob", "url", "data"],
        },
        ey = function (e) {
          if (q.isFormData(e) && q.isFunction(e.entries)) {
            let t = {};
            return (
              q.forEachEntry(e, (e, r) => {
                !(function e(t, r, n, o) {
                  let i = t[o++];
                  if ("__proto__" === i) return !0;
                  let s = Number.isFinite(+i),
                    a = o >= t.length;
                  return (
                    ((i = !i && q.isArray(n) ? n.length : i), a)
                      ? q.hasOwnProp(n, i)
                        ? (n[i] = [n[i], r])
                        : (n[i] = r)
                      : ((n[i] && q.isObject(n[i])) || (n[i] = []),
                        e(t, r, n[i], o) &&
                          q.isArray(n[i]) &&
                          (n[i] = (function (e) {
                            let t, r;
                            let n = {},
                              o = Object.keys(e),
                              i = o.length;
                            for (t = 0; t < i; t++) n[(r = o[t])] = e[r];
                            return n;
                          })(n[i]))),
                    !s
                  );
                })(
                  q
                    .matchAll(/\w+|\[(\w*)]/g, e)
                    .map((e) => ("[]" === e[0] ? "" : e[1] || e[0])),
                  r,
                  t,
                  0
                );
              }),
              t
            );
          }
          return null;
        };
      let em = {
        transitional: ea,
        adapter: ["xhr", "http", "fetch"],
        transformRequest: [
          function (e, t) {
            let r;
            let n = t.getContentType() || "",
              o = n.indexOf("application/json") > -1,
              i = q.isObject(e);
            if (
              (i && q.isHTMLForm(e) && (e = new FormData(e)), q.isFormData(e))
            )
              return o ? JSON.stringify(ey(e)) : e;
            if (
              q.isArrayBuffer(e) ||
              q.isBuffer(e) ||
              q.isStream(e) ||
              q.isFile(e) ||
              q.isBlob(e) ||
              q.isReadableStream(e)
            )
              return e;
            if (q.isArrayBufferView(e)) return e.buffer;
            if (q.isURLSearchParams(e))
              return (
                t.setContentType(
                  "application/x-www-form-urlencoded;charset=utf-8",
                  !1
                ),
                e.toString()
              );
            if (i) {
              if (n.indexOf("application/x-www-form-urlencoded") > -1) {
                var s, a;
                return ((s = e),
                (a = this.formSerializer),
                ee(
                  s,
                  new eg.classes.URLSearchParams(),
                  Object.assign(
                    {
                      visitor: function (e, t, r, n) {
                        return eg.isNode && q.isBuffer(e)
                          ? (this.append(t, e.toString("base64")), !1)
                          : n.defaultVisitor.apply(this, arguments);
                      },
                    },
                    a
                  )
                )).toString();
              }
              if (
                (r = q.isFileList(e)) ||
                n.indexOf("multipart/form-data") > -1
              ) {
                let t = this.env && this.env.FormData;
                return ee(
                  r
                    ? {
                        "files[]": e,
                      }
                    : e,
                  t && new t(),
                  this.formSerializer
                );
              }
            }
            return i || o
              ? (t.setContentType("application/json", !1),
                (function (e, t, r) {
                  if (q.isString(e))
                    try {
                      return (0, JSON.parse)(e), q.trim(e);
                    } catch (e) {
                      if ("SyntaxError" !== e.name) throw e;
                    }
                  return (0, JSON.stringify)(e);
                })(e))
              : e;
          },
        ],
        transformResponse: [
          function (e) {
            let t = this.transitional || em.transitional,
              r = t && t.forcedJSONParsing,
              n = "json" === this.responseType;
            if (q.isResponse(e) || q.isReadableStream(e)) return e;
            if (e && q.isString(e) && ((r && !this.responseType) || n)) {
              let r = t && t.silentJSONParsing;
              try {
                return JSON.parse(e);
              } catch (e) {
                if (!r && n) {
                  if ("SyntaxError" === e.name)
                    throw V.from(
                      e,
                      V.ERR_BAD_RESPONSE,
                      this,
                      null,
                      this.response
                    );
                  throw e;
                }
              }
            }
            return e;
          },
        ],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
          FormData: eg.classes.FormData,
          Blob: eg.classes.Blob,
        },
        validateStatus: function (e) {
          return e >= 200 && e < 300;
        },
        headers: {
          common: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": void 0,
          },
        },
      };
      q.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
        em.headers[e] = {};
      });
      let ev = q.toObjectSet([
        "age",
        "authorization",
        "content-length",
        "content-type",
        "etag",
        "expires",
        "from",
        "host",
        "if-modified-since",
        "if-unmodified-since",
        "last-modified",
        "location",
        "max-forwards",
        "proxy-authorization",
        "referer",
        "retry-after",
        "user-agent",
      ]);
      var eb = (e) => {
        let t, r, n;
        let o = {};
        return (
          e &&
            e.split("\n").forEach(function (e) {
              (n = e.indexOf(":")),
                (t = e.substring(0, n).trim().toLowerCase()),
                (r = e.substring(n + 1).trim()),
                !t ||
                  (o[t] && ev[t]) ||
                  ("set-cookie" === t
                    ? o[t]
                      ? o[t].push(r)
                      : (o[t] = [r])
                    : (o[t] = o[t] ? o[t] + ", " + r : r));
            }),
          o
        );
      };
      let ew = Symbol("internals");
      function e_(e) {
        return e && String(e).trim().toLowerCase();
      }
      function eS(e) {
        return !1 === e || null == e ? e : q.isArray(e) ? e.map(eS) : String(e);
      }
      let eE = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
      function eC(e, t, r, n, o) {
        if (q.isFunction(n)) return n.call(this, t, r);
        if ((o && (t = r), q.isString(t))) {
          if (q.isString(n)) return -1 !== t.indexOf(n);
          if (q.isRegExp(n)) return n.test(t);
        }
      }
      class eT {
        constructor(e) {
          e && this.set(e);
        }
        set(e, t, r) {
          let n = this;
          function o(e, t, r) {
            let o = e_(t);
            if (!o) throw Error("header name must be a non-empty string");
            let i = q.findKey(n, o);
            (i &&
              void 0 !== n[i] &&
              !0 !== r &&
              (void 0 !== r || !1 === n[i])) ||
              (n[i || t] = eS(e));
          }
          let i = (e, t) => q.forEach(e, (e, r) => o(e, r, t));
          if (q.isPlainObject(e) || e instanceof this.constructor) i(e, t);
          else if (q.isString(e) && (e = e.trim()) && !eE(e)) i(eb(e), t);
          else if (q.isHeaders(e)) for (let [t, n] of e.entries()) o(n, t, r);
          else null != e && o(t, e, r);
          return this;
        }
        get(e, t) {
          if ((e = e_(e))) {
            let r = q.findKey(this, e);
            if (r) {
              let e = this[r];
              if (!t) return e;
              if (!0 === t)
                return (function (e) {
                  let t;
                  let r = Object.create(null),
                    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                  for (; (t = n.exec(e)); ) r[t[1]] = t[2];
                  return r;
                })(e);
              if (q.isFunction(t)) return t.call(this, e, r);
              if (q.isRegExp(t)) return t.exec(e);
              throw TypeError("parser must be boolean|regexp|function");
            }
          }
        }
        has(e, t) {
          if ((e = e_(e))) {
            let r = q.findKey(this, e);
            return !!(
              r &&
              void 0 !== this[r] &&
              (!t || eC(this, this[r], r, t))
            );
          }
          return !1;
        }
        delete(e, t) {
          let r = this,
            n = !1;
          function o(e) {
            if ((e = e_(e))) {
              let o = q.findKey(r, e);
              o && (!t || eC(r, r[o], o, t)) && (delete r[o], (n = !0));
            }
          }
          return q.isArray(e) ? e.forEach(o) : o(e), n;
        }
        clear(e) {
          let t = Object.keys(this),
            r = t.length,
            n = !1;
          for (; r--; ) {
            let o = t[r];
            (!e || eC(this, this[o], o, e, !0)) && (delete this[o], (n = !0));
          }
          return n;
        }
        normalize(e) {
          let t = this,
            r = {};
          return (
            q.forEach(this, (n, o) => {
              let i = q.findKey(r, o);
              if (i) {
                (t[i] = eS(n)), delete t[o];
                return;
              }
              let s = e
                ? o
                    .trim()
                    .toLowerCase()
                    .replace(
                      /([a-z\d])(\w*)/g,
                      (e, t, r) => t.toUpperCase() + r
                    )
                : String(o).trim();
              s !== o && delete t[o], (t[s] = eS(n)), (r[s] = !0);
            }),
            this
          );
        }
        concat(...e) {
          return this.constructor.concat(this, ...e);
        }
        toJSON(e) {
          let t = Object.create(null);
          return (
            q.forEach(this, (r, n) => {
              null != r &&
                !1 !== r &&
                (t[n] = e && q.isArray(r) ? r.join(", ") : r);
            }),
            t
          );
        }
        [Symbol.iterator]() {
          return Object.entries(this.toJSON())[Symbol.iterator]();
        }
        toString() {
          return Object.entries(this.toJSON())
            .map(([e, t]) => e + ": " + t)
            .join("\n");
        }
        get [Symbol.toStringTag]() {
          return "AxiosHeaders";
        }
        static from(e) {
          return e instanceof this ? e : new this(e);
        }
        static concat(e, ...t) {
          let r = new this(e);
          return t.forEach((e) => r.set(e)), r;
        }
        static accessor(e) {
          let t = (this[ew] = this[ew] =
              {
                accessors: {},
              }).accessors,
            r = this.prototype;
          function n(e) {
            let n = e_(e);
            t[n] ||
              (!(function (e, t) {
                let r = q.toCamelCase(" " + t);
                ["get", "set", "has"].forEach((n) => {
                  Object.defineProperty(e, n + r, {
                    value: function (e, r, o) {
                      return this[n].call(this, t, e, r, o);
                    },
                    configurable: !0,
                  });
                });
              })(r, e),
              (t[n] = !0));
          }
          return q.isArray(e) ? e.forEach(n) : n(e), this;
        }
      }
      function ek(e, t) {
        let r = this || em,
          n = t || r,
          o = eT.from(n.headers),
          i = n.data;
        return (
          q.forEach(e, function (e) {
            i = e.call(r, i, o.normalize(), t ? t.status : void 0);
          }),
          o.normalize(),
          i
        );
      }
      function eI(e) {
        return !!(e && e.__CANCEL__);
      }
      function ex(e, t, r) {
        V.call(this, null == e ? "canceled" : e, V.ERR_CANCELED, t, r),
          (this.name = "CanceledError");
      }
      function eP(e, t, r) {
        let n = r.config.validateStatus;
        !r.status || !n || n(r.status)
          ? e(r)
          : t(
              new V(
                "Request failed with status code " + r.status,
                [V.ERR_BAD_REQUEST, V.ERR_BAD_RESPONSE][
                  Math.floor(r.status / 100) - 4
                ],
                r.config,
                r.request,
                r
              )
            );
      }
      eT.accessor([
        "Content-Type",
        "Content-Length",
        "Accept",
        "Accept-Encoding",
        "User-Agent",
        "Authorization",
      ]),
        q.reduceDescriptors(eT.prototype, ({ value: e }, t) => {
          let r = t[0].toUpperCase() + t.slice(1);
          return {
            get: () => e,
            set(e) {
              this[r] = e;
            },
          };
        }),
        q.freezeMethods(eT),
        q.inherits(ex, V, {
          __CANCEL__: !0,
        });
      var eO = function (e, t) {
          let r;
          let n = Array((e = e || 10)),
            o = Array(e),
            i = 0,
            s = 0;
          return (
            (t = void 0 !== t ? t : 1e3),
            function (a) {
              let c = Date.now(),
                l = o[s];
              r || (r = c), (n[i] = a), (o[i] = c);
              let u = s,
                h = 0;
              for (; u !== i; ) (h += n[u++]), (u %= e);
              if (((i = (i + 1) % e) === s && (s = (s + 1) % e), c - r < t))
                return;
              let f = l && c - l;
              return f ? Math.round((1e3 * h) / f) : void 0;
            }
          );
        },
        eR = function (e, t) {
          let r = 0,
            n = 1e3 / t,
            o = null;
          return function () {
            let t = Date.now();
            if (this === !0 || t - r > n)
              return (
                o && (clearTimeout(o), (o = null)),
                (r = t),
                e.apply(null, arguments)
              );
            o ||
              (o = setTimeout(
                () => ((o = null), (r = Date.now()), e.apply(null, arguments)),
                n - (t - r)
              ));
          };
        },
        eD = (e, t, r = 3) => {
          let n = 0,
            o = eO(50, 250);
          return eR((r) => {
            let i = r.loaded,
              s = r.lengthComputable ? r.total : void 0,
              a = i - n,
              c = o(a);
            n = i;
            let l = {
              loaded: i,
              total: s,
              progress: s ? i / s : void 0,
              bytes: a,
              rate: c || void 0,
              estimated: c && s && i <= s ? (s - i) / c : void 0,
              event: r,
              lengthComputable: null != s,
            };
            (l[t ? "download" : "upload"] = !0), e(l);
          }, r);
        },
        eU = eg.hasStandardBrowserEnv
          ? (function () {
              let e;
              let t = /(msie|trident)/i.test(navigator.userAgent),
                r = document.createElement("a");
              function n(e) {
                let n = e;
                return (
                  t && (r.setAttribute("href", n), (n = r.href)),
                  r.setAttribute("href", n),
                  {
                    href: r.href,
                    protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                    host: r.host,
                    search: r.search ? r.search.replace(/^\?/, "") : "",
                    hash: r.hash ? r.hash.replace(/^#/, "") : "",
                    hostname: r.hostname,
                    port: r.port,
                    pathname:
                      "/" === r.pathname.charAt(0)
                        ? r.pathname
                        : "/" + r.pathname,
                  }
                );
              }
              return (
                (e = n(window.location.href)),
                function (t) {
                  let r = q.isString(t) ? n(t) : t;
                  return r.protocol === e.protocol && r.host === e.host;
                }
              );
            })()
          : function () {
              return !0;
            },
        eA = eg.hasStandardBrowserEnv
          ? {
              write(e, t, r, n, o, i) {
                let s = [e + "=" + encodeURIComponent(t)];
                q.isNumber(r) && s.push("expires=" + new Date(r).toGMTString()),
                  q.isString(n) && s.push("path=" + n),
                  q.isString(o) && s.push("domain=" + o),
                  !0 === i && s.push("secure"),
                  (document.cookie = s.join("; "));
              },
              read(e) {
                let t = document.cookie.match(
                  RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
                );
                return t ? decodeURIComponent(t[3]) : null;
              },
              remove(e) {
                this.write(e, "", Date.now() - 864e5);
              },
            }
          : {
              write() {},
              read: () => null,
              remove() {},
            };
      function ej(e, t) {
        return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
          ? t
            ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "")
            : e
          : t;
      }
      let eN = (e) =>
        e instanceof eT
          ? {
              ...e,
            }
          : e;
      function eB(e, t) {
        t = t || {};
        let r = {};
        function n(e, t, r) {
          return q.isPlainObject(e) && q.isPlainObject(t)
            ? q.merge.call(
                {
                  caseless: r,
                },
                e,
                t
              )
            : q.isPlainObject(t)
            ? q.merge({}, t)
            : q.isArray(t)
            ? t.slice()
            : t;
        }
        function o(e, t, r) {
          return q.isUndefined(t)
            ? q.isUndefined(e)
              ? void 0
              : n(void 0, e, r)
            : n(e, t, r);
        }
        function i(e, t) {
          if (!q.isUndefined(t)) return n(void 0, t);
        }
        function s(e, t) {
          return q.isUndefined(t)
            ? q.isUndefined(e)
              ? void 0
              : n(void 0, e)
            : n(void 0, t);
        }
        function a(r, o, i) {
          return i in t ? n(r, o) : i in e ? n(void 0, r) : void 0;
        }
        let c = {
          url: i,
          method: i,
          data: i,
          baseURL: s,
          transformRequest: s,
          transformResponse: s,
          paramsSerializer: s,
          timeout: s,
          timeoutMessage: s,
          withCredentials: s,
          withXSRFToken: s,
          adapter: s,
          responseType: s,
          xsrfCookieName: s,
          xsrfHeaderName: s,
          onUploadProgress: s,
          onDownloadProgress: s,
          decompress: s,
          maxContentLength: s,
          maxBodyLength: s,
          beforeRedirect: s,
          transport: s,
          httpAgent: s,
          httpsAgent: s,
          cancelToken: s,
          socketPath: s,
          responseEncoding: s,
          validateStatus: a,
          headers: (e, t) => o(eN(e), eN(t), !0),
        };
        return (
          q.forEach(Object.keys(Object.assign({}, e, t)), function (n) {
            let i = c[n] || o,
              s = i(e[n], t[n], n);
            (q.isUndefined(s) && i !== a) || (r[n] = s);
          }),
          r
        );
      }
      var eL = (e) => {
          let t;
          let r = eB({}, e),
            {
              data: n,
              withXSRFToken: o,
              xsrfHeaderName: i,
              xsrfCookieName: s,
              headers: a,
              auth: c,
            } = r;
          if (
            ((r.headers = a = eT.from(a)),
            (r.url = ei(ej(r.baseURL, r.url), e.params, e.paramsSerializer)),
            c &&
              a.set(
                "Authorization",
                "Basic " +
                  btoa(
                    (c.username || "") +
                      ":" +
                      (c.password
                        ? unescape(encodeURIComponent(c.password))
                        : "")
                  )
              ),
            q.isFormData(n))
          ) {
            if (eg.hasStandardBrowserEnv || eg.hasStandardBrowserWebWorkerEnv)
              a.setContentType(void 0);
            else if (!1 !== (t = a.getContentType())) {
              let [e, ...r] = t
                ? t
                    .split(";")
                    .map((e) => e.trim())
                    .filter(Boolean)
                : [];
              a.setContentType([e || "multipart/form-data", ...r].join("; "));
            }
          }
          if (
            eg.hasStandardBrowserEnv &&
            (o && q.isFunction(o) && (o = o(r)), o || (!1 !== o && eU(r.url)))
          ) {
            let e = i && s && eA.read(s);
            e && a.set(i, e);
          }
          return r;
        },
        eM =
          "undefined" != typeof XMLHttpRequest &&
          function (e) {
            return new Promise(function (t, r) {
              let n;
              let o = eL(e),
                i = o.data,
                s = eT.from(o.headers).normalize(),
                { responseType: a } = o;
              function c() {
                o.cancelToken && o.cancelToken.unsubscribe(n),
                  o.signal && o.signal.removeEventListener("abort", n);
              }
              let l = new XMLHttpRequest();
              function u() {
                if (!l) return;
                let n = eT.from(
                  "getAllResponseHeaders" in l && l.getAllResponseHeaders()
                );
                eP(
                  function (e) {
                    t(e), c();
                  },
                  function (e) {
                    r(e), c();
                  },
                  {
                    data:
                      a && "text" !== a && "json" !== a
                        ? l.response
                        : l.responseText,
                    status: l.status,
                    statusText: l.statusText,
                    headers: n,
                    config: e,
                    request: l,
                  }
                ),
                  (l = null);
              }
              l.open(o.method.toUpperCase(), o.url, !0),
                (l.timeout = o.timeout),
                "onloadend" in l
                  ? (l.onloadend = u)
                  : (l.onreadystatechange = function () {
                      l &&
                        4 === l.readyState &&
                        (0 !== l.status ||
                          (l.responseURL &&
                            0 === l.responseURL.indexOf("file:"))) &&
                        setTimeout(u);
                    }),
                (l.onabort = function () {
                  l &&
                    (r(new V("Request aborted", V.ECONNABORTED, o, l)),
                    (l = null));
                }),
                (l.onerror = function () {
                  r(new V("Network Error", V.ERR_NETWORK, o, l)), (l = null);
                }),
                (l.ontimeout = function () {
                  let e = o.timeout
                      ? "timeout of " + o.timeout + "ms exceeded"
                      : "timeout exceeded",
                    t = o.transitional || ea;
                  o.timeoutErrorMessage && (e = o.timeoutErrorMessage),
                    r(
                      new V(
                        e,
                        t.clarifyTimeoutError ? V.ETIMEDOUT : V.ECONNABORTED,
                        o,
                        l
                      )
                    ),
                    (l = null);
                }),
                void 0 === i && s.setContentType(null),
                "setRequestHeader" in l &&
                  q.forEach(s.toJSON(), function (e, t) {
                    l.setRequestHeader(t, e);
                  }),
                q.isUndefined(o.withCredentials) ||
                  (l.withCredentials = !!o.withCredentials),
                a && "json" !== a && (l.responseType = o.responseType),
                "function" == typeof o.onDownloadProgress &&
                  l.addEventListener("progress", eD(o.onDownloadProgress, !0)),
                "function" == typeof o.onUploadProgress &&
                  l.upload &&
                  l.upload.addEventListener("progress", eD(o.onUploadProgress)),
                (o.cancelToken || o.signal) &&
                  ((n = (t) => {
                    l &&
                      (r(!t || t.type ? new ex(null, e, l) : t),
                      l.abort(),
                      (l = null));
                  }),
                  o.cancelToken && o.cancelToken.subscribe(n),
                  o.signal &&
                    (o.signal.aborted
                      ? n()
                      : o.signal.addEventListener("abort", n)));
              let h = (function (e) {
                let t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
                return (t && t[1]) || "";
              })(o.url);
              if (h && -1 === eg.protocols.indexOf(h)) {
                r(
                  new V("Unsupported protocol " + h + ":", V.ERR_BAD_REQUEST, e)
                );
                return;
              }
              l.send(i || null);
            });
          },
        eF = (e, t) => {
          let r,
            n = new AbortController(),
            o = function (e) {
              if (!r) {
                (r = !0), s();
                let t = e instanceof Error ? e : this.reason;
                n.abort(
                  t instanceof V
                    ? t
                    : new ex(t instanceof Error ? t.message : t)
                );
              }
            },
            i =
              t &&
              setTimeout(() => {
                o(new V(`timeout ${t} of ms exceeded`, V.ETIMEDOUT));
              }, t),
            s = () => {
              e &&
                (i && clearTimeout(i),
                (i = null),
                e.forEach((e) => {
                  e &&
                    (e.removeEventListener
                      ? e.removeEventListener("abort", o)
                      : e.unsubscribe(o));
                }),
                (e = null));
            };
          e.forEach(
            (e) => e && e.addEventListener && e.addEventListener("abort", o)
          );
          let { signal: a } = n;
          return (
            (a.unsubscribe = s),
            [
              a,
              () => {
                i && clearTimeout(i), (i = null);
              },
            ]
          );
        };
      let ez = function* (e, t) {
          let r,
            n = e.byteLength;
          if (!t || n < t) {
            yield e;
            return;
          }
          let o = 0;
          for (; o < n; ) (r = o + t), yield e.slice(o, r), (o = r);
        },
        e$ = async function* (e, t, r) {
          for await (let n of e)
            yield* ez(ArrayBuffer.isView(n) ? n : await r(String(n)), t);
        },
        eW = (e, t, r, n, o) => {
          let i = e$(e, t, o),
            s = 0;
          return new ReadableStream(
            {
              type: "bytes",
              async pull(e) {
                let { done: t, value: o } = await i.next();
                if (t) {
                  e.close(), n();
                  return;
                }
                let a = o.byteLength;
                r && r((s += a)), e.enqueue(new Uint8Array(o));
              },
              cancel: (e) => (n(e), i.return()),
            },
            {
              highWaterMark: 2,
            }
          );
        },
        eH = (e, t) => {
          let r = null != e;
          return (n) =>
            setTimeout(() =>
              t({
                lengthComputable: r,
                total: e,
                loaded: n,
              })
            );
        },
        eq =
          "function" == typeof fetch &&
          "function" == typeof Request &&
          "function" == typeof Response,
        eV = eq && "function" == typeof ReadableStream,
        eX =
          eq &&
          ("function" == typeof TextEncoder
            ? ((s = new TextEncoder()), (e) => s.encode(e))
            : async (e) => new Uint8Array(await new Response(e).arrayBuffer())),
        eJ =
          eV &&
          (() => {
            let e = !1,
              t = new Request(eg.origin, {
                body: new ReadableStream(),
                method: "POST",
                get duplex() {
                  return (e = !0), "half";
                },
              }).headers.has("Content-Type");
            return e && !t;
          })(),
        eK =
          eV &&
          !!(() => {
            try {
              return q.isReadableStream(new Response("").body);
            } catch (e) {}
          })(),
        eY = {
          stream: eK && ((e) => e.body),
        };
      eq &&
        ((a = new Response()),
        ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
          eY[e] ||
            (eY[e] = q.isFunction(a[e])
              ? (t) => t[e]()
              : (t, r) => {
                  throw new V(
                    `Response type '${e}' is not supported`,
                    V.ERR_NOT_SUPPORT,
                    r
                  );
                });
        }));
      let eG = async (e) =>
          null == e
            ? 0
            : q.isBlob(e)
            ? e.size
            : q.isSpecCompliantForm(e)
            ? (await new Request(e).arrayBuffer()).byteLength
            : q.isArrayBufferView(e)
            ? e.byteLength
            : (q.isURLSearchParams(e) && (e += ""), q.isString(e))
            ? (await eX(e)).byteLength
            : void 0,
        eZ = async (e, t) => {
          let r = q.toFiniteNumber(e.getContentLength());
          return null == r ? eG(t) : r;
        },
        eQ = {
          http: null,
          xhr: eM,
          fetch:
            eq &&
            (async (e) => {
              let t,
                r,
                n,
                {
                  url: o,
                  method: i,
                  data: s,
                  signal: a,
                  cancelToken: c,
                  timeout: l,
                  onDownloadProgress: u,
                  onUploadProgress: h,
                  responseType: f,
                  headers: d,
                  withCredentials: p = "same-origin",
                  fetchOptions: g,
                } = eL(e);
              f = f ? (f + "").toLowerCase() : "text";
              let [y, m] = a || c || l ? eF([a, c], l) : [],
                v = () => {
                  t ||
                    setTimeout(() => {
                      y && y.unsubscribe();
                    }),
                    (t = !0);
                };
              try {
                if (
                  h &&
                  eJ &&
                  "get" !== i &&
                  "head" !== i &&
                  0 !== (n = await eZ(d, s))
                ) {
                  let e,
                    t = new Request(o, {
                      method: "POST",
                      body: s,
                      duplex: "half",
                    });
                  q.isFormData(s) &&
                    (e = t.headers.get("content-type")) &&
                    d.setContentType(e),
                    t.body && (s = eW(t.body, 65536, eH(n, eD(h)), null, eX));
                }
                q.isString(p) || (p = p ? "cors" : "omit"),
                  (r = new Request(o, {
                    ...g,
                    signal: y,
                    method: i.toUpperCase(),
                    headers: d.normalize().toJSON(),
                    body: s,
                    duplex: "half",
                    withCredentials: p,
                  }));
                let t = await fetch(r),
                  a = eK && ("stream" === f || "response" === f);
                if (eK && (u || a)) {
                  let e = {};
                  ["status", "statusText", "headers"].forEach((r) => {
                    e[r] = t[r];
                  });
                  let r = q.toFiniteNumber(t.headers.get("content-length"));
                  t = new Response(
                    eW(t.body, 65536, u && eH(r, eD(u, !0)), a && v, eX),
                    e
                  );
                }
                f = f || "text";
                let c = await eY[q.findKey(eY, f) || "text"](t, e);
                return (
                  a || v(),
                  m && m(),
                  await new Promise((n, o) => {
                    eP(n, o, {
                      data: c,
                      headers: eT.from(t.headers),
                      status: t.status,
                      statusText: t.statusText,
                      config: e,
                      request: r,
                    });
                  })
                );
              } catch (t) {
                if (
                  (v(), t && "TypeError" === t.name && /fetch/i.test(t.message))
                )
                  throw Object.assign(
                    new V("Network Error", V.ERR_NETWORK, e, r),
                    {
                      cause: t.cause || t,
                    }
                  );
                throw V.from(t, t && t.code, e, r);
              }
            }),
        };
      q.forEach(eQ, (e, t) => {
        if (e) {
          try {
            Object.defineProperty(e, "name", {
              value: t,
            });
          } catch (e) {}
          Object.defineProperty(e, "adapterName", {
            value: t,
          });
        }
      });
      let e0 = (e) => `- ${e}`,
        e1 = (e) => q.isFunction(e) || null === e || !1 === e;
      var e2 = (e) => {
        let t, r;
        let { length: n } = (e = q.isArray(e) ? e : [e]),
          o = {};
        for (let i = 0; i < n; i++) {
          let n;
          if (
            ((r = t = e[i]),
            !e1(t) && void 0 === (r = eQ[(n = String(t)).toLowerCase()]))
          )
            throw new V(`Unknown adapter '${n}'`);
          if (r) break;
          o[n || "#" + i] = r;
        }
        if (!r) {
          let e = Object.entries(o).map(
            ([e, t]) =>
              `adapter ${e} ` +
              (!1 === t
                ? "is not supported by the environment"
                : "is not available in the build")
          );
          throw new V(
            "There is no suitable adapter to dispatch the request " +
              (n
                ? e.length > 1
                  ? "since :\n" + e.map(e0).join("\n")
                  : " " + e0(e[0])
                : "as no adapter specified"),
            "ERR_NOT_SUPPORT"
          );
        }
        return r;
      };
      function e4(e) {
        if (
          (e.cancelToken && e.cancelToken.throwIfRequested(),
          e.signal && e.signal.aborted)
        )
          throw new ex(null, e);
      }
      function e6(e) {
        return (
          e4(e),
          (e.headers = eT.from(e.headers)),
          (e.data = ek.call(e, e.transformRequest)),
          -1 !== ["post", "put", "patch"].indexOf(e.method) &&
            e.headers.setContentType("application/x-www-form-urlencoded", !1),
          e2(e.adapter || em.adapter)(e).then(
            function (t) {
              return (
                e4(e),
                (t.data = ek.call(e, e.transformResponse, t)),
                (t.headers = eT.from(t.headers)),
                t
              );
            },
            function (t) {
              return (
                !eI(t) &&
                  (e4(e),
                  t &&
                    t.response &&
                    ((t.response.data = ek.call(
                      e,
                      e.transformResponse,
                      t.response
                    )),
                    (t.response.headers = eT.from(t.response.headers)))),
                Promise.reject(t)
              );
            }
          )
        );
      }
      let e3 = "1.7.2",
        e8 = {};
      ["object", "boolean", "number", "function", "string", "symbol"].forEach(
        (e, t) => {
          e8[e] = function (r) {
            return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
          };
        }
      );
      let e5 = {};
      e8.transitional = function (e, t, r) {
        function n(e, t) {
          return (
            "[Axios v" +
            e3 +
            "] Transitional option '" +
            e +
            "'" +
            t +
            (r ? ". " + r : "")
          );
        }
        return (r, o, i) => {
          if (!1 === e)
            throw new V(
              n(o, " has been removed" + (t ? " in " + t : "")),
              V.ERR_DEPRECATED
            );
          return (
            t &&
              !e5[o] &&
              ((e5[o] = !0),
              console.warn(
                n(
                  o,
                  " has been deprecated since v" +
                    t +
                    " and will be removed in the near future"
                )
              )),
            !e || e(r, o, i)
          );
        };
      };
      var e9 = {
        assertOptions: function (e, t, r) {
          if ("object" != typeof e)
            throw new V("options must be an object", V.ERR_BAD_OPTION_VALUE);
          let n = Object.keys(e),
            o = n.length;
          for (; o-- > 0; ) {
            let i = n[o],
              s = t[i];
            if (s) {
              let t = e[i],
                r = void 0 === t || s(t, i, e);
              if (!0 !== r)
                throw new V(
                  "option " + i + " must be " + r,
                  V.ERR_BAD_OPTION_VALUE
                );
              continue;
            }
            if (!0 !== r) throw new V("Unknown option " + i, V.ERR_BAD_OPTION);
          }
        },
        validators: e8,
      };
      let e7 = e9.validators;
      class te {
        constructor(e) {
          (this.defaults = e),
            (this.interceptors = {
              request: new es(),
              response: new es(),
            });
        }
        async request(e, t) {
          try {
            return await this._request(e, t);
          } catch (e) {
            if (e instanceof Error) {
              let t;
              Error.captureStackTrace
                ? Error.captureStackTrace((t = {}))
                : (t = Error());
              let r = t.stack ? t.stack.replace(/^.+\n/, "") : "";
              try {
                e.stack
                  ? r &&
                    !String(e.stack).endsWith(r.replace(/^.+\n.+\n/, "")) &&
                    (e.stack += "\n" + r)
                  : (e.stack = r);
              } catch (e) {}
            }
            throw e;
          }
        }
        _request(e, t) {
          let r, n;
          "string" == typeof e ? ((t = t || {}).url = e) : (t = e || {});
          let {
            transitional: o,
            paramsSerializer: i,
            headers: s,
          } = (t = eB(this.defaults, t));
          void 0 !== o &&
            e9.assertOptions(
              o,
              {
                silentJSONParsing: e7.transitional(e7.boolean),
                forcedJSONParsing: e7.transitional(e7.boolean),
                clarifyTimeoutError: e7.transitional(e7.boolean),
              },
              !1
            ),
            null != i &&
              (q.isFunction(i)
                ? (t.paramsSerializer = {
                    serialize: i,
                  })
                : e9.assertOptions(
                    i,
                    {
                      encode: e7.function,
                      serialize: e7.function,
                    },
                    !0
                  )),
            (t.method = (
              t.method ||
              this.defaults.method ||
              "get"
            ).toLowerCase());
          let a = s && q.merge(s.common, s[t.method]);
          s &&
            q.forEach(
              ["delete", "get", "head", "post", "put", "patch", "common"],
              (e) => {
                delete s[e];
              }
            ),
            (t.headers = eT.concat(a, s));
          let c = [],
            l = !0;
          this.interceptors.request.forEach(function (e) {
            ("function" != typeof e.runWhen || !1 !== e.runWhen(t)) &&
              ((l = l && e.synchronous), c.unshift(e.fulfilled, e.rejected));
          });
          let u = [];
          this.interceptors.response.forEach(function (e) {
            u.push(e.fulfilled, e.rejected);
          });
          let h = 0;
          if (!l) {
            let e = [e6.bind(this), void 0];
            for (
              e.unshift.apply(e, c),
                e.push.apply(e, u),
                n = e.length,
                r = Promise.resolve(t);
              h < n;

            )
              r = r.then(e[h++], e[h++]);
            return r;
          }
          n = c.length;
          let f = t;
          for (h = 0; h < n; ) {
            let e = c[h++],
              t = c[h++];
            try {
              f = e(f);
            } catch (e) {
              t.call(this, e);
              break;
            }
          }
          try {
            r = e6.call(this, f);
          } catch (e) {
            return Promise.reject(e);
          }
          for (h = 0, n = u.length; h < n; ) r = r.then(u[h++], u[h++]);
          return r;
        }
        getUri(e) {
          return ei(
            ej((e = eB(this.defaults, e)).baseURL, e.url),
            e.params,
            e.paramsSerializer
          );
        }
      }
      q.forEach(["delete", "get", "head", "options"], function (e) {
        te.prototype[e] = function (t, r) {
          return this.request(
            eB(r || {}, {
              method: e,
              url: t,
              data: (r || {}).data,
            })
          );
        };
      }),
        q.forEach(["post", "put", "patch"], function (e) {
          function t(t) {
            return function (r, n, o) {
              return this.request(
                eB(o || {}, {
                  method: e,
                  headers: t
                    ? {
                        "Content-Type": "multipart/form-data",
                      }
                    : {},
                  url: r,
                  data: n,
                })
              );
            };
          }
          (te.prototype[e] = t()), (te.prototype[e + "Form"] = t(!0));
        });
      class tt {
        constructor(e) {
          let t;
          if ("function" != typeof e)
            throw TypeError("executor must be a function.");
          this.promise = new Promise(function (e) {
            t = e;
          });
          let r = this;
          this.promise.then((e) => {
            if (!r._listeners) return;
            let t = r._listeners.length;
            for (; t-- > 0; ) r._listeners[t](e);
            r._listeners = null;
          }),
            (this.promise.then = (e) => {
              let t;
              let n = new Promise((e) => {
                r.subscribe(e), (t = e);
              }).then(e);
              return (
                (n.cancel = function () {
                  r.unsubscribe(t);
                }),
                n
              );
            }),
            e(function (e, n, o) {
              r.reason || ((r.reason = new ex(e, n, o)), t(r.reason));
            });
        }
        throwIfRequested() {
          if (this.reason) throw this.reason;
        }
        subscribe(e) {
          if (this.reason) {
            e(this.reason);
            return;
          }
          this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
        }
        unsubscribe(e) {
          if (!this._listeners) return;
          let t = this._listeners.indexOf(e);
          -1 !== t && this._listeners.splice(t, 1);
        }
        static source() {
          let e;
          return {
            token: new tt(function (t) {
              e = t;
            }),
            cancel: e,
          };
        }
      }
      let tr = {
        Continue: 100,
        SwitchingProtocols: 101,
        Processing: 102,
        EarlyHints: 103,
        Ok: 200,
        Created: 201,
        Accepted: 202,
        NonAuthoritativeInformation: 203,
        NoContent: 204,
        ResetContent: 205,
        PartialContent: 206,
        MultiStatus: 207,
        AlreadyReported: 208,
        ImUsed: 226,
        MultipleChoices: 300,
        MovedPermanently: 301,
        Found: 302,
        SeeOther: 303,
        NotModified: 304,
        UseProxy: 305,
        Unused: 306,
        TemporaryRedirect: 307,
        PermanentRedirect: 308,
        BadRequest: 400,
        Unauthorized: 401,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406,
        ProxyAuthenticationRequired: 407,
        RequestTimeout: 408,
        Conflict: 409,
        Gone: 410,
        LengthRequired: 411,
        PreconditionFailed: 412,
        PayloadTooLarge: 413,
        UriTooLong: 414,
        UnsupportedMediaType: 415,
        RangeNotSatisfiable: 416,
        ExpectationFailed: 417,
        ImATeapot: 418,
        MisdirectedRequest: 421,
        UnprocessableEntity: 422,
        Locked: 423,
        FailedDependency: 424,
        TooEarly: 425,
        UpgradeRequired: 426,
        PreconditionRequired: 428,
        TooManyRequests: 429,
        RequestHeaderFieldsTooLarge: 431,
        UnavailableForLegalReasons: 451,
        InternalServerError: 500,
        NotImplemented: 501,
        BadGateway: 502,
        ServiceUnavailable: 503,
        GatewayTimeout: 504,
        HttpVersionNotSupported: 505,
        VariantAlsoNegotiates: 506,
        InsufficientStorage: 507,
        LoopDetected: 508,
        NotExtended: 510,
        NetworkAuthenticationRequired: 511,
      };
      Object.entries(tr).forEach(([e, t]) => {
        tr[t] = e;
      });
      let tn = (function e(t) {
        let r = new te(t),
          n = l(te.prototype.request, r);
        return (
          q.extend(n, te.prototype, r, {
            allOwnKeys: !0,
          }),
          q.extend(n, r, null, {
            allOwnKeys: !0,
          }),
          (n.create = function (r) {
            return e(eB(t, r));
          }),
          n
        );
      })(em);
      (tn.Axios = te),
        (tn.CanceledError = ex),
        (tn.CancelToken = tt),
        (tn.isCancel = eI),
        (tn.VERSION = e3),
        (tn.toFormData = ee),
        (tn.AxiosError = V),
        (tn.Cancel = tn.CanceledError),
        (tn.all = function (e) {
          return Promise.all(e);
        }),
        (tn.spread = function (e) {
          return function (t) {
            return e.apply(null, t);
          };
        }),
        (tn.isAxiosError = function (e) {
          return q.isObject(e) && !0 === e.isAxiosError;
        }),
        (tn.mergeConfig = eB),
        (tn.AxiosHeaders = eT),
        (tn.formToJSON = (e) => ey(q.isHTMLForm(e) ? new FormData(e) : e)),
        (tn.getAdapter = e2),
        (tn.HttpStatusCode = tr),
        (tn.default = tn);
      var to = tn;
    },
    7738: function (e, t, r) {
      "use strict";
      r.d(t, {
        mW: function () {
          return s;
        },
        tJ: function () {
          return h;
        },
      });
      let n = new Map(),
        o = (e) => {
          let t = n.get(e);
          return t
            ? Object.fromEntries(
                Object.entries(t.stores).map(([e, t]) => [e, t.getState()])
              )
            : {};
        },
        i = (e, t, r) => {
          if (void 0 === e)
            return {
              type: "untracked",
              connection: t.connect(r),
            };
          let o = n.get(r.name);
          if (o)
            return {
              type: "tracked",
              store: e,
              ...o,
            };
          let i = {
            connection: t.connect(r),
            stores: {},
          };
          return (
            n.set(r.name, i),
            {
              type: "tracked",
              store: e,
              ...i,
            }
          );
        },
        s =
          (e, t = {}) =>
          (r, n, s) => {
            let c;
            let { enabled: l, anonymousActionType: u, store: h, ...f } = t;
            try {
              c = (null == l || l) && window.__REDUX_DEVTOOLS_EXTENSION__;
            } catch (e) {}
            if (!c)
              return (
                l &&
                  console.warn(
                    "[zustand devtools middleware] Please install/enable Redux devtools extension"
                  ),
                e(r, n, s)
              );
            let { connection: d, ...p } = i(h, c, f),
              g = !0;
            s.setState = (e, t, i) => {
              let a = r(e, t);
              if (!g) return a;
              let c =
                void 0 === i
                  ? {
                      type: u || "anonymous",
                    }
                  : "string" == typeof i
                  ? {
                      type: i,
                    }
                  : i;
              return (
                void 0 === h
                  ? null == d || d.send(c, n())
                  : null == d ||
                    d.send(
                      {
                        ...c,
                        type: `${h}/${c.type}`,
                      },
                      {
                        ...o(f.name),
                        [h]: s.getState(),
                      }
                    ),
                a
              );
            };
            let y = (...e) => {
                let t = g;
                (g = !1), r(...e), (g = t);
              },
              m = e(s.setState, n, s);
            if (
              ("untracked" === p.type
                ? null == d || d.init(m)
                : ((p.stores[p.store] = s),
                  null == d ||
                    d.init(
                      Object.fromEntries(
                        Object.entries(p.stores).map(([e, t]) => [
                          e,
                          e === p.store ? m : t.getState(),
                        ])
                      )
                    )),
              s.dispatchFromDevtools && "function" == typeof s.dispatch)
            ) {
              let e = !1,
                t = s.dispatch;
              s.dispatch = (...r) => {
                "__setState" !== r[0].type ||
                  e ||
                  (console.warn(
                    '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
                  ),
                  (e = !0)),
                  t(...r);
              };
            }
            return (
              d.subscribe((e) => {
                var t;
                switch (e.type) {
                  case "ACTION":
                    if ("string" != typeof e.payload) {
                      console.error(
                        "[zustand devtools middleware] Unsupported action format"
                      );
                      return;
                    }
                    return a(e.payload, (e) => {
                      if ("__setState" === e.type) {
                        if (void 0 === h) {
                          y(e.state);
                          return;
                        }
                        1 !== Object.keys(e.state).length &&
                          console.error(`
                    [zustand devtools middleware] Unsupported __setState action format. 
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);
                        let t = e.state[h];
                        if (null == t) return;
                        JSON.stringify(s.getState()) !== JSON.stringify(t) &&
                          y(t);
                        return;
                      }
                      s.dispatchFromDevtools &&
                        "function" == typeof s.dispatch &&
                        s.dispatch(e);
                    });
                  case "DISPATCH":
                    switch (e.payload.type) {
                      case "RESET":
                        if ((y(m), void 0 === h))
                          return null == d ? void 0 : d.init(s.getState());
                        return null == d ? void 0 : d.init(o(f.name));
                      case "COMMIT":
                        if (void 0 === h) {
                          null == d || d.init(s.getState());
                          break;
                        }
                        return null == d ? void 0 : d.init(o(f.name));
                      case "ROLLBACK":
                        return a(e.state, (e) => {
                          if (void 0 === h) {
                            y(e), null == d || d.init(s.getState());
                            return;
                          }
                          y(e[h]), null == d || d.init(o(f.name));
                        });
                      case "JUMP_TO_STATE":
                      case "JUMP_TO_ACTION":
                        return a(e.state, (e) => {
                          if (void 0 === h) {
                            y(e);
                            return;
                          }
                          JSON.stringify(s.getState()) !==
                            JSON.stringify(e[h]) && y(e[h]);
                        });
                      case "IMPORT_STATE": {
                        let { nextLiftedState: r } = e.payload,
                          n =
                            null == (t = r.computedStates.slice(-1)[0])
                              ? void 0
                              : t.state;
                        if (!n) return;
                        void 0 === h ? y(n) : y(n[h]),
                          null == d || d.send(null, r);
                        break;
                      }
                      case "PAUSE_RECORDING":
                        return (g = !g);
                    }
                    return;
                }
              }),
              m
            );
          },
        a = (e, t) => {
          let r;
          try {
            r = JSON.parse(e);
          } catch (e) {
            console.error(
              "[zustand devtools middleware] Could not parse the received json",
              e
            );
          }
          void 0 !== r && t(r);
        },
        c = (e) => (t) => {
          try {
            let r = e(t);
            if (r instanceof Promise) return r;
            return {
              then: (e) => c(e)(r),
              catch(e) {
                return this;
              },
            };
          } catch (e) {
            return {
              then(e) {
                return this;
              },
              catch: (t) => c(t)(e),
            };
          }
        },
        l = (e, t) => (r, n, o) => {
          let i,
            s,
            a = {
              getStorage: () => localStorage,
              serialize: JSON.stringify,
              deserialize: JSON.parse,
              partialize: (e) => e,
              version: 0,
              merge: (e, t) => ({
                ...t,
                ...e,
              }),
              ...t,
            },
            l = !1,
            u = new Set(),
            h = new Set();
          try {
            i = a.getStorage();
          } catch (e) {}
          if (!i)
            return e(
              (...e) => {
                console.warn(
                  `[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`
                ),
                  r(...e);
              },
              n,
              o
            );
          let f = c(a.serialize),
            d = () => {
              let e;
              let t = f({
                state: a.partialize({
                  ...n(),
                }),
                version: a.version,
              })
                .then((e) => i.setItem(a.name, e))
                .catch((t) => {
                  e = t;
                });
              if (e) throw e;
              return t;
            },
            p = o.setState;
          o.setState = (e, t) => {
            p(e, t), d();
          };
          let g = e(
              (...e) => {
                r(...e), d();
              },
              n,
              o
            ),
            y = () => {
              var e;
              if (!i) return;
              (l = !1), u.forEach((e) => e(n()));
              let t =
                (null == (e = a.onRehydrateStorage)
                  ? void 0
                  : e.call(a, n())) || void 0;
              return c(i.getItem.bind(i))(a.name)
                .then((e) => {
                  if (e) return a.deserialize(e);
                })
                .then((e) => {
                  if (e) {
                    if ("number" != typeof e.version || e.version === a.version)
                      return e.state;
                    if (a.migrate) return a.migrate(e.state, e.version);
                    console.error(
                      "State loaded from storage couldn't be migrated since no migrate function was provided"
                    );
                  }
                })
                .then((e) => {
                  var t;
                  return (
                    r((s = a.merge(e, null != (t = n()) ? t : g)), !0), d()
                  );
                })
                .then(() => {
                  null == t || t(s, void 0), (l = !0), h.forEach((e) => e(s));
                })
                .catch((e) => {
                  null == t || t(void 0, e);
                });
            };
          return (
            (o.persist = {
              setOptions: (e) => {
                (a = {
                  ...a,
                  ...e,
                }),
                  e.getStorage && (i = e.getStorage());
              },
              clearStorage: () => {
                null == i || i.removeItem(a.name);
              },
              getOptions: () => a,
              rehydrate: () => y(),
              hasHydrated: () => l,
              onHydrate: (e) => (
                u.add(e),
                () => {
                  u.delete(e);
                }
              ),
              onFinishHydration: (e) => (
                h.add(e),
                () => {
                  h.delete(e);
                }
              ),
            }),
            y(),
            s || g
          );
        },
        u = (e, t) => (r, n, o) => {
          let i,
            s = {
              storage: (function (e, t) {
                let r;
                try {
                  r = e();
                } catch (e) {
                  return;
                }
                return {
                  getItem: (e) => {
                    var t;
                    let n = (e) => (null === e ? null : JSON.parse(e, void 0)),
                      o = null != (t = r.getItem(e)) ? t : null;
                    return o instanceof Promise ? o.then(n) : n(o);
                  },
                  setItem: (e, t) => r.setItem(e, JSON.stringify(t, void 0)),
                  removeItem: (e) => r.removeItem(e),
                };
              })(() => localStorage),
              partialize: (e) => e,
              version: 0,
              merge: (e, t) => ({
                ...t,
                ...e,
              }),
              ...t,
            },
            a = !1,
            l = new Set(),
            u = new Set(),
            h = s.storage;
          if (!h)
            return e(
              (...e) => {
                console.warn(
                  `[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`
                ),
                  r(...e);
              },
              n,
              o
            );
          let f = () => {
              let e = s.partialize({
                ...n(),
              });
              return h.setItem(s.name, {
                state: e,
                version: s.version,
              });
            },
            d = o.setState;
          o.setState = (e, t) => {
            d(e, t), f();
          };
          let p = e(
            (...e) => {
              r(...e), f();
            },
            n,
            o
          );
          o.getInitialState = () => p;
          let g = () => {
            var e, t;
            if (!h) return;
            (a = !1),
              l.forEach((e) => {
                var t;
                return e(null != (t = n()) ? t : p);
              });
            let o =
              (null == (t = s.onRehydrateStorage)
                ? void 0
                : t.call(s, null != (e = n()) ? e : p)) || void 0;
            return c(h.getItem.bind(h))(s.name)
              .then((e) => {
                if (e) {
                  if ("number" != typeof e.version || e.version === s.version)
                    return e.state;
                  if (s.migrate) return s.migrate(e.state, e.version);
                  console.error(
                    "State loaded from storage couldn't be migrated since no migrate function was provided"
                  );
                }
              })
              .then((e) => {
                var t;
                return r((i = s.merge(e, null != (t = n()) ? t : p)), !0), f();
              })
              .then(() => {
                null == o || o(i, void 0),
                  (i = n()),
                  (a = !0),
                  u.forEach((e) => e(i));
              })
              .catch((e) => {
                null == o || o(void 0, e);
              });
          };
          return (
            (o.persist = {
              setOptions: (e) => {
                (s = {
                  ...s,
                  ...e,
                }),
                  e.storage && (h = e.storage);
              },
              clearStorage: () => {
                null == h || h.removeItem(s.name);
              },
              getOptions: () => s,
              rehydrate: () => g(),
              hasHydrated: () => a,
              onHydrate: (e) => (
                l.add(e),
                () => {
                  l.delete(e);
                }
              ),
              onFinishHydration: (e) => (
                u.add(e),
                () => {
                  u.delete(e);
                }
              ),
            }),
            s.skipHydration || g(),
            i || p
          );
        },
        h = (e, t) =>
          "getStorage" in t || "serialize" in t || "deserialize" in t
            ? (console.warn(
                "[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."
              ),
              l(e, t))
            : u(e, t);
    },
    9944: function (e, t, r) {
      "use strict";
      function n(e, t) {
        if (Object.is(e, t)) return !0;
        if (
          "object" != typeof e ||
          null === e ||
          "object" != typeof t ||
          null === t
        )
          return !1;
        if (e instanceof Map && t instanceof Map) {
          if (e.size !== t.size) return !1;
          for (let [r, n] of e) if (!Object.is(n, t.get(r))) return !1;
          return !0;
        }
        if (e instanceof Set && t instanceof Set) {
          if (e.size !== t.size) return !1;
          for (let r of e) if (!t.has(r)) return !1;
          return !0;
        }
        let r = Object.keys(e);
        if (r.length !== Object.keys(t).length) return !1;
        for (let n of r)
          if (
            !Object.prototype.hasOwnProperty.call(t, n) ||
            !Object.is(e[n], t[n])
          )
            return !1;
        return !0;
      }
      r.d(t, {
        X: function () {
          return n;
        },
      });
    },
  },
]);
