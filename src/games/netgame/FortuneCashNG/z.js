"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [761],
  {
    3761: function (n, e, t) {
      let i, r, a, o, s, l, c, d, u;
      t.r(e),
        t.d(e, {
          __N_SSP: function () {
            return so;
          },
          default: function () {
            return ss;
          },
        });
      var p,
        h,
        m = t(4251),
        x = t(6118),
        f = t(3036),
        g = t(1574);
      function b() {
        let n = (0, f._)([
          "\n    0% {\n        transform:rotateZ(-30deg);\n    }\n    35% {\n        transform:rotateZ(30deg);\n    }\n    100% {\n        transform:rotateZ(-30deg);\n    }\n",
        ]);
        return (
          (b = function () {
            return n;
          }),
          n
        );
      }
      function _() {
        let n = (0, f._)([
          "\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top:0;\n    left:0;\n    background: #000;\n    z-index: 24;\n    /* transform:translateZ(200px); */\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    .content{\n        width:80%;\n        /* transform:translate(-50%,-50%) rotate(90deg); */\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        .img_rotate {\n            animation: ",
          " 3s ease-in 0s infinite;\n        }\n        p {\n            color: white;\n            margin-left:20px;\n        }\n    }\n",
        ]);
        return (
          (_ = function () {
            return n;
          }),
          n
        );
      }
      let y = (0, g.F4)(b()),
        w = g.ZP.div(_(), y);
      var v = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/changePose.75b84ac1.png",
          height: 114,
          width: 130,
          blurDataURL:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAQAAACfUMTVAAAAZklEQVR42jXKIQ6CAABA0a/OZHEmm8lG0eYMzqCjQWNERoGRIXACNgIn4Boc748Nxi+/PPz48mpuDe4A/6bGHk18gwcMLL2AJxvWvJstD32wIKw8g5GjAe7Bm4O9k4XfzbR24NPfDMKHMnaZU+TpAAAAAElFTkSuQmCC",
          blurWidth: 8,
          blurHeight: 7,
        },
        j = t(3605),
        S = t.n(j),
        k = t(1048),
        P = function () {
          let { t: n } = (0, k.Z)("common"),
            [e, t] = (0, x.useState)(!1),
            i = () => {
              let n =
                  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                  ),
                e =
                  Math.max(window.innerWidth, window.innerHeight) /
                  Math.min(window.innerWidth, window.innerHeight);
              t(window.innerWidth > window.innerHeight && n && e > 1.5);
            };
          return (
            (0, x.useEffect)(() => {
              window.addEventListener("resize", () => {
                i();
              }),
                window.addEventListener("orientationchange", function () {
                  i();
                });
            }, []),
            (0, m.jsx)(m.Fragment, {
              children:
                e &&
                (0, m.jsx)(w, {
                  children: (0, m.jsxs)("div", {
                    className: "content",
                    children: [
                      (0, m.jsx)("div", {
                        className: "img_rotate",
                        children: (0, m.jsx)(S(), {
                          width: "40",
                          height: "40",
                          layout: "fixed",
                          src: v,
                          alt: "change pose",
                        }),
                      }),
                      (0, m.jsx)("p", {
                        children: n("Main_ChangePose"),
                      }),
                    ],
                  }),
                }),
            })
          );
        },
        O = t(8388),
        C = t(4939),
        z = t(9853);
      function T() {
        let n = (0, f._)([
          "\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 6;\n  width: 100%;\n  height: 100%;\n  color: #fff;\n  background-color: #171717;\n  overflow-y: auto;\n",
        ]);
        return (
          (T = function () {
            return n;
          }),
          n
        );
      }
      function E() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  /* justify-content: center; */\n  width: 100%;\n  height: 48px;\n  padding: 0 10%;\n  border-bottom: 2px solid #414141;\n  font-size: 20px;\n  font-weight: 700;\n\n  > div.img {\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    cursor: pointer;\n  }\n",
        ]);
        return (
          (E = function () {
            return n;
          }),
          n
        );
      }
      function M() {
        let n = (0, f._)([
          "\n  /* margin: 15px 0; */\n  font-size: 12px;\n  /* font-weight: 500; */\n  padding: 10px 10%;\n  line-height: 2em;\n\n  & span.red {\n    color: #f00;\n  }\n",
        ]);
        return (
          (M = function () {
            return n;
          }),
          n
        );
      }
      function N() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 1px solid #fff;\n  cursor: pointer;\n",
        ]);
        return (
          (N = function () {
            return n;
          }),
          n
        );
      }
      function B() {
        let n = (0, f._)(["\n  margin-top: 10px;\n"]);
        return (
          (B = function () {
            return n;
          }),
          n
        );
      }
      function R() {
        let n = (0, f._)([
          "\n  font-size: 14px;\n  font-weight: 700;\n  margin-bottom: 5px;\n",
        ]);
        return (
          (R = function () {
            return n;
          }),
          n
        );
      }
      function A() {
        let n = (0, f._)([
          "\n  cursor: pointer;\n  transform: ",
          ";\n  transition: 0.5s;\n",
        ]);
        return (
          (A = function () {
            return n;
          }),
          n
        );
      }
      function Z() {
        let n = (0, f._)(["\n  display: ", ";\n  margin-top: 10px;\n"]);
        return (
          (Z = function () {
            return n;
          }),
          n
        );
      }
      function I() {
        let n = (0, f._)([
          "\n  display: flex;\n  margin: 5px 0;\n\n  > div:first-child {\n    margin-right: 10px;\n  }\n\n  span.bold {\n    font-weight: 700;\n  }\n",
        ]);
        return (
          (I = function () {
            return n;
          }),
          n
        );
      }
      function L() {
        let n = (0, f._)([
          "\n  width: 100%;\n  color: #fff;\n  border: 2px solid #fff;\n",
        ]);
        return (
          (L = function () {
            return n;
          }),
          n
        );
      }
      function G() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: stretch;\n\n  > div {\n    border-bottom: 2px solid #fff;\n\n    &:last-child {\n      border-bottom: 2px solid #fff;\n    }\n  }\n",
        ]);
        return (
          (G = function () {
            return n;
          }),
          n
        );
      }
      function F() {
        let n = (0, f._)([
          "\n  background-color: #008e0b;\n  flex: 1;\n  text-align: center;\n  font-weight: 700;\n",
        ]);
        return (
          (F = function () {
            return n;
          }),
          n
        );
      }
      function D() {
        let n = (0, f._)([
          "\n  flex: 1;\n  border-right: 2px solid #fff;\n  padding: 10px;\n  width: 50%;\n\n  &.center {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n\n  &:last-child {\n    border-right: 0;\n  }\n",
        ]);
        return (
          (D = function () {
            return n;
          }),
          n
        );
      }
      let H = g.ZP.div(T()),
        q = g.ZP.div(E()),
        U = g.ZP.div(M()),
        W = g.ZP.div(N()),
        Y = g.ZP.div(B()),
        V = g.ZP.div(R()),
        X = g.ZP.div(A(), (n) =>
          n.isShow ? "rotate(180deg)" : "rotate(0deg)"
        ),
        K = g.ZP.div(Z(), (n) => (n.isShow ? "block" : "none")),
        J = g.ZP.div(I()),
        Q = g.ZP.div(L()),
        $ = g.ZP.div(G()),
        nn = g.ZP.div(F()),
        ne = g.ZP.div(D());
      var nt = t(6878),
        ni = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/close.1c7909e8.svg",
          height: 18,
          width: 18,
          blurWidth: 0,
          blurHeight: 0,
        },
        nr = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/balance.08f3dea7.png",
        },
        na = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/auto_cash_out.972226a2.png",
        },
        no = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/autoplay.0b6c4530.png",
        },
        ns = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/info.7adddd50.svg",
          height: 17,
          width: 20,
          blurWidth: 0,
          blurHeight: 0,
        },
        nl = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/music.046a4e46.png",
        },
        nc = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/history.d0202bd2.svg",
          height: 15,
          width: 18,
          blurWidth: 0,
          blurHeight: 0,
        },
        nd = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/tutorial.d84ea3c0.svg",
          height: 17,
          width: 20,
          blurWidth: 0,
          blurHeight: 0,
        },
        nu = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/lobby.2a9b0f4b.svg",
          height: 15,
          width: 18,
          blurWidth: 0,
          blurHeight: 0,
        },
        np = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/drop_icon.8166fee3.svg",
          height: 8,
          width: 14,
          blurWidth: 0,
          blurHeight: 0,
        },
        nh = t(668),
        nm = () => {
          let { t: n } = (0, k.Z)("common"),
            e = (0, nt.qA)((n) => n.setIsShowGameRules),
            t = (0, nt.qA)((n) => n.isShowGameRules),
            [i, r] = (0, x.useState)(!1),
            [a, o] = (0, x.useState)(!1),
            [s, l] = (0, x.useState)(!1),
            [c, d] = (0, x.useState)(!1),
            u = (0, nh.H)((n) => n.gameToggle);
          return (
            t &&
            (0, m.jsxs)(H, {
              children: [
                (0, m.jsxs)(q, {
                  children: [
                    (0, m.jsx)("div", {
                      children: n("Menu_Rule_Title"),
                    }),
                    (0, m.jsx)("div", {
                      className: "img",
                      onClick: () => e(!1),
                      children: (0, m.jsx)(S(), {
                        width: "20",
                        height: "20",
                        layout: "fixed",
                        src: ni,
                        alt: "close",
                      }),
                    }),
                  ],
                }),
                (0, m.jsxs)(Y, {
                  children: [
                    (0, m.jsxs)(U, {
                      children: [
                        (0, m.jsxs)(W, {
                          onClick: () => {
                            r(!i), o(!1), l(!1), d(!1);
                          },
                          children: [
                            (0, m.jsx)(V, {
                              children: n("Menu_Rule_HowToPlay_Title"),
                            }),
                            (0, m.jsx)(X, {
                              isShow: i,
                              children: (0, m.jsx)(S(), {
                                width: "14",
                                height: "8",
                                layout: "fixed",
                                src: np,
                                alt: "drop",
                              }),
                            }),
                          ],
                        }),
                        (0, m.jsxs)(K, {
                          isShow: i,
                          children: [
                            (0, m.jsx)("div", {
                              children: n("Menu_Rule_HowToPlay_Detail"),
                            }),
                            (0, m.jsxs)(J, {
                              children: [
                                (0, m.jsx)("div", {
                                  children: "-",
                                }),
                                (0, m.jsxs)("div", {
                                  children: [
                                    (0, m.jsx)("span", {
                                      className: "bold",
                                      children: n(
                                        "Menu_Rule_HowToPlay_Detail_Desc1"
                                      ),
                                    }),
                                    n("Menu_Rule_HowToPlay_Detail_Desc1_1"),
                                  ],
                                }),
                              ],
                            }),
                            (0, m.jsxs)(J, {
                              children: [
                                (0, m.jsx)("div", {
                                  children: "-",
                                }),
                                (0, m.jsxs)("div", {
                                  children: [
                                    (0, m.jsx)("span", {
                                      className: "bold",
                                      children: n(
                                        "Menu_Rule_HowToPlay_Detail_Desc2"
                                      ),
                                    }),
                                    n("Menu_Rule_HowToPlay_Detail_Desc2_1"),
                                  ],
                                }),
                              ],
                            }),
                            (0, m.jsxs)(J, {
                              children: [
                                (0, m.jsx)("div", {
                                  children: "-",
                                }),
                                (0, m.jsxs)("div", {
                                  children: [
                                    (0, m.jsx)("span", {
                                      className: "bold",
                                      children: n(
                                        "Menu_Rule_HowToPlay_Detail_Desc3"
                                      ),
                                    }),
                                    n("Menu_Rule_HowToPlay_Detail_Desc3_1"),
                                  ],
                                }),
                              ],
                            }),
                            (0, m.jsxs)(J, {
                              children: [
                                (0, m.jsx)("div", {
                                  children: "-",
                                }),
                                (0, m.jsxs)("div", {
                                  children: [
                                    (0, m.jsx)("span", {
                                      className: "bold",
                                      children: n(
                                        "Menu_Rule_HowToPlay_Detail_Desc4"
                                      ),
                                    }),
                                    n("Menu_Rule_HowToPlay_Detail_Desc4_1"),
                                  ],
                                }),
                              ],
                            }),
                            (0, m.jsxs)(J, {
                              children: [
                                (0, m.jsx)("div", {
                                  children: "-",
                                }),
                                (0, m.jsxs)("div", {
                                  children: [
                                    (0, m.jsx)("span", {
                                      className: "bold",
                                      children: n(
                                        "Menu_Rule_HowToPlay_Detail_Desc5"
                                      ),
                                    }),
                                    n("Menu_Rule_HowToPlay_Detail_Desc5_1"),
                                  ],
                                }),
                              ],
                            }),
                            (0, m.jsxs)(J, {
                              children: [
                                (0, m.jsx)("div", {
                                  children: "-",
                                }),
                                (0, m.jsxs)("div", {
                                  children: [
                                    (0, m.jsx)("span", {
                                      className: "bold",
                                      children: n(
                                        "Menu_Rule_HowToPlay_Detail_Desc6"
                                      ),
                                    }),
                                    n("Menu_Rule_HowToPlay_Detail_Desc6_1"),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, m.jsxs)(U, {
                      children: [
                        (0, m.jsxs)(W, {
                          onClick: () => {
                            o(!a), r(!1), l(!1), d(!1);
                          },
                          children: [
                            (0, m.jsx)(V, {
                              children: n("Menu_Rule_Odds_Title"),
                            }),
                            (0, m.jsx)(X, {
                              isShow: a,
                              children: (0, m.jsx)(S(), {
                                width: "14",
                                height: "8",
                                layout: "fixed",
                                src: np,
                                alt: "drop",
                              }),
                            }),
                          ],
                        }),
                        (0, m.jsx)(K, {
                          isShow: a,
                          children: n("Menu_Rule_Odds_Detail"),
                        }),
                      ],
                    }),
                    u.isEnableRTP &&
                      (0, m.jsxs)(U, {
                        children: [
                          (0, m.jsxs)(W, {
                            onClick: () => {
                              l(!s), r(!1), o(!1), d(!1);
                            },
                            children: [
                              (0, m.jsx)(V, {
                                children: n("Menu_Rule_RTP_Title"),
                              }),
                              (0, m.jsx)(X, {
                                isShow: s,
                                children: (0, m.jsx)(S(), {
                                  width: "14",
                                  height: "8",
                                  layout: "fixed",
                                  src: np,
                                  alt: "drop",
                                }),
                              }),
                            ],
                          }),
                          (0, m.jsx)(K, {
                            isShow: s,
                            children: n("Menu_Rule_RTP_Detail"),
                          }),
                        ],
                      }),
                    (0, m.jsxs)(U, {
                      children: [
                        (0, m.jsxs)(W, {
                          onClick: () => {
                            d(!c), r(!1), o(!1), l(!1);
                          },
                          children: [
                            (0, m.jsx)(V, {
                              children: n("Menu_Rule_GameControls_Title"),
                            }),
                            (0, m.jsx)(X, {
                              isShow: c,
                              children: (0, m.jsx)(S(), {
                                width: "14",
                                height: "8",
                                layout: "fixed",
                                src: np,
                                alt: "drop",
                              }),
                            }),
                          ],
                        }),
                        (0, m.jsx)(K, {
                          isShow: c,
                          children: (0, m.jsxs)(Q, {
                            children: [
                              (0, m.jsxs)($, {
                                children: [
                                  (0, m.jsx)(nn, {
                                    children: n(
                                      "Menu_Rule_GameControls_Controls"
                                    ),
                                  }),
                                  (0, m.jsx)(nn, {
                                    children: n(
                                      "Menu_Rule_GameControls_Description"
                                    ),
                                  }),
                                ],
                              }),
                              (0, m.jsxs)($, {
                                children: [
                                  (0, m.jsxs)(ne, {
                                    className: "center",
                                    children: [
                                      (0, m.jsx)(S(), {
                                        width: "128",
                                        height: "30",
                                        layout: "fixed",
                                        src: nr.src,
                                        alt: "cashOut",
                                      }),
                                      (0, m.jsx)("div", {
                                        children: n(
                                          "Menu_Rule_GameControls_Balance"
                                        ),
                                      }),
                                    ],
                                  }),
                                  (0, m.jsx)(ne, {
                                    children: n(
                                      "Menu_Rule_GameControls_Balance_Detail"
                                    ),
                                  }),
                                ],
                              }),
                              (0, m.jsxs)($, {
                                children: [
                                  (0, m.jsxs)(ne, {
                                    className: "center",
                                    children: [
                                      (0, m.jsx)(S(), {
                                        width: "128",
                                        height: "41",
                                        layout: "fixed",
                                        src: no.src,
                                        alt: "cashOut",
                                      }),
                                      (0, m.jsx)("div", {
                                        children: n(
                                          "Menu_Rule_GameControls_AutoBet"
                                        ),
                                      }),
                                    ],
                                  }),
                                  (0, m.jsx)(ne, {
                                    children: n(
                                      "Menu_Rule_GameControls_AutoBet_Detail"
                                    ),
                                  }),
                                ],
                              }),
                              (0, m.jsxs)($, {
                                children: [
                                  (0, m.jsxs)(ne, {
                                    className: "center",
                                    children: [
                                      (0, m.jsx)(S(), {
                                        width: "130",
                                        height: "17",
                                        layout: "fixed",
                                        src: na.src,
                                        alt: "cashOut",
                                      }),
                                      (0, m.jsx)("div", {
                                        children: n(
                                          "Menu_Rule_GameControls_AutoCashOut"
                                        ),
                                      }),
                                    ],
                                  }),
                                  (0, m.jsx)(ne, {
                                    children: n(
                                      "Menu_Rule_GameControls_AutoCashOut_Detail"
                                    ),
                                  }),
                                ],
                              }),
                              (0, m.jsxs)($, {
                                children: [
                                  (0, m.jsxs)(ne, {
                                    className: "center",
                                    children: [
                                      (0, m.jsx)(S(), {
                                        width: "30",
                                        height: "27",
                                        layout: "fixed",
                                        src: ns,
                                        alt: "cashOut",
                                      }),
                                      (0, m.jsx)("div", {
                                        children: n(
                                          "Menu_Rule_GameControls_Info"
                                        ),
                                      }),
                                    ],
                                  }),
                                  (0, m.jsx)(ne, {
                                    children: n(
                                      "Menu_Rule_GameControls_Info_Detail"
                                    ),
                                  }),
                                ],
                              }),
                              (0, m.jsxs)($, {
                                children: [
                                  (0, m.jsxs)(ne, {
                                    className: "center",
                                    children: [
                                      (0, m.jsx)(S(), {
                                        width: "72",
                                        height: "32",
                                        layout: "fixed",
                                        src: nl.src,
                                        alt: "cashOut",
                                      }),
                                      (0, m.jsx)("div", {
                                        children: n(
                                          "Menu_Rule_GameControls_Sound"
                                        ),
                                      }),
                                    ],
                                  }),
                                  (0, m.jsx)(ne, {
                                    children: n(
                                      "Menu_Rule_GameControls_Sound_Detail"
                                    ),
                                  }),
                                ],
                              }),
                              u.isEnableHistory &&
                                (0, m.jsxs)($, {
                                  children: [
                                    (0, m.jsxs)(ne, {
                                      className: "center",
                                      children: [
                                        (0, m.jsx)(S(), {
                                          width: "30",
                                          height: "27",
                                          layout: "fixed",
                                          src: nc,
                                          alt: "cashOut",
                                        }),
                                        (0, m.jsx)("div", {
                                          children: n(
                                            "Menu_Rule_GameControls_HistoryList"
                                          ),
                                        }),
                                      ],
                                    }),
                                    (0, m.jsx)(ne, {
                                      children: n(
                                        "Menu_Rule_GameControls_HistoryList_Detail"
                                      ),
                                    }),
                                  ],
                                }),
                              u.isEnableTutorial &&
                                (0, m.jsxs)($, {
                                  children: [
                                    (0, m.jsxs)(ne, {
                                      className: "center",
                                      children: [
                                        (0, m.jsx)(S(), {
                                          width: "30",
                                          height: "27",
                                          layout: "fixed",
                                          src: nd,
                                          alt: "cashOut",
                                        }),
                                        (0, m.jsx)("div", {
                                          children: n(
                                            "Menu_Rule_GameControls_Tutorial"
                                          ),
                                        }),
                                      ],
                                    }),
                                    (0, m.jsx)(ne, {
                                      children: n(
                                        "Menu_Rule_GameControls_Tutorial_Detail"
                                      ),
                                    }),
                                  ],
                                }),
                              u.isEnableLeaveGameBtn &&
                                (0, m.jsxs)($, {
                                  children: [
                                    (0, m.jsxs)(ne, {
                                      className: "center",
                                      children: [
                                        (0, m.jsx)(S(), {
                                          width: "30",
                                          height: "27",
                                          layout: "fixed",
                                          src: nu,
                                          alt: "cashOut",
                                        }),
                                        (0, m.jsx)("div", {
                                          children: n(
                                            "Menu_Rule_GameControls_Leave"
                                          ),
                                        }),
                                      ],
                                    }),
                                    (0, m.jsx)(ne, {
                                      children: n(
                                        "Menu_Rule_GameControls_Leave_Detail"
                                      ),
                                    }),
                                  ],
                                }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          );
        };
      function nx() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: ",
          ";\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: ",
          ";\n",
        ]);
        return (
          (nx = function () {
            return n;
          }),
          n
        );
      }
      function nf() {
        let n = (0, f._)(["\n  position: relative;\n  z-index: 998;\n"]);
        return (
          (nf = function () {
            return n;
          }),
          n
        );
      }
      function ng() {
        let n = (0, f._)([
          "\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.7);\n  backdrop-filter: blur(3px);\n",
        ]);
        return (
          (ng = function () {
            return n;
          }),
          n
        );
      }
      let nb = g.ZP.div(
          nx(),
          (n) => n.position || "absolute",
          (n) => n.zIndex || 5
        ),
        n_ = g.ZP.div(nf()),
        ny = g.ZP.div(ng());
      var nw = (n) => {
        let { open: e, children: t, zIndex: i, position: r, onClose: a } = n;
        return (0, m.jsx)(m.Fragment, {
          children:
            e &&
            (0, m.jsxs)(nb, {
              zIndex: i,
              position: r,
              children: [
                (0, m.jsx)(n_, {
                  children: t,
                }),
                (0, m.jsx)(ny, {
                  onClick: a,
                }),
              ],
            }),
        });
      };
      function nv() {
        let n = (0, f._)([
          "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 250px;\n  height: 300px;\n  color: #fff;\n  background-color: ",
          ";\n  border: 1px solid ",
          ";\n  border-radius: 8px;\n  padding: 10px;\n\n  > div {\n    margin: 10px 0;\n  }\n",
        ]);
        return (
          (nv = function () {
            return n;
          }),
          n
        );
      }
      function nj() {
        let n = (0, f._)([
          "\n  width: 75%;\n  word-break: break-all;\n  font-weight: 500;\n  text-align: center;\n",
        ]);
        return (
          (nj = function () {
            return n;
          }),
          n
        );
      }
      function nS() {
        let n = (0, f._)([
          "\n  width: 30%;\n  text-align: center;\n  padding: 5px 15px;\n  border-radius: 50px;\n  background: ",
          ";\n",
        ]);
        return (
          (nS = function () {
            return n;
          }),
          n
        );
      }
      let nk = g.ZP.div(
          nv(),
          (n) =>
            n.isSuccess ? "rgba(6, 116, 198, 0.3)" : "rgba(216,44,55,0.3)",
          (n) => (n.isSuccess ? "#0674c6" : "#d82c37")
        ),
        nP = g.ZP.div(nj()),
        nO = g.ZP.div(nS(), (n) =>
          n.isSuccess
            ? "linear-gradient(#4490f6, #1f61b8)"
            : "linear-gradient(#fe015f, #a40f2e)"
        ),
        nC = function () {
          let n =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : -2,
            e = window.sessionStorage.getItem("redirectUrl");
          "null" !== e && e
            ? window.self !== window.top
              ? (window.parent.location.href = e)
              : (window.location.href = e)
            : window.opener
            ? window.close()
            : window.history.go(n);
        };
      var nz = t(3187);
      let nT = {
          open: !1,
          isSuccess: !1,
          message: "",
        },
        nE = (0, nz.Ue)((n, e) => ({
          isLeaveGame: !1,
          dialog: nT,
          setLeaveGame: (e) => {
            n(() => ({
              isLeaveGame: e,
            }));
          },
          openDialog: (e) => {
            n((n) => ({
              dialog: {
                ...n.dialog,
                ...e,
                open: !0,
              },
            }));
          },
          closeDialog: () => {
            n(() => ({
              dialog: nT,
            })),
              e().isLeaveGame && nC();
          },
        }));
      var nM = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/success.1c1f8c39.png",
        },
        nN = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/error.4b761b35.png",
        },
        nB = () => {
          let { t: n } = (0, k.Z)("common"),
            [e, t, i] = nE((n) => [n.dialog, n.closeDialog, n.isLeaveGame]),
            r = (0, x.useRef)(null);
          return (
            (0, x.useEffect)(() => {
              e.open &&
                !i &&
                (clearTimeout(r.current),
                (r.current = setTimeout(() => {
                  t();
                }, 5e3)));
            }, [e]),
            (0, m.jsx)(nw, {
              open: e.open,
              onClose: t,
              zIndex: 999,
              children: (0, m.jsxs)(nk, {
                isSuccess: e.isSuccess,
                children: [
                  (0, m.jsx)(S(), {
                    width: "58",
                    height: "45",
                    layout: "fixed",
                    src: e.isSuccess ? nM.src : nN.src,
                    alt: "change pose",
                  }),
                  (0, m.jsx)(nP, {
                    children: e.message,
                  }),
                  (0, m.jsx)(nO, {
                    isSuccess: e.isSuccess,
                    onClick: t,
                    children: n("Main_PopUp_OK"),
                  }),
                ],
              }),
            })
          );
        },
        nR = t(8138);
      function nA() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: ",
          ";\n  justify-content: space-between;\n  position: absolute;\n  top: 0;\n  left: 0;\n  padding: 10px;\n  width: 100%;\n  height: ",
          ";\n  z-index: ",
          ";\n  flex-wrap: wrap;\n",
        ]);
        return (
          (nA = function () {
            return n;
          }),
          n
        );
      }
      function nZ() {
        let n = (0, f._)(["\n  width: 25%;\n"]);
        return (
          (nZ = function () {
            return n;
          }),
          n
        );
      }
      function nI() {
        let n = (0, f._)(["\n  display: flex;\n  align-items: center;\n"]);
        return (
          (nI = function () {
            return n;
          }),
          n
        );
      }
      function nL() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  width: max-content;\n  min-width: 190px;\n  height: 35px;\n  color: #fff;\n  font-weight: 500;\n  border-radius: 50px;\n  background-color: #212121;\n  box-shadow: 1px 1px 0px 2px #000 inset;\n  margin: 0 10px;\n\n  > div:first-child {\n    flex: 1;\n    margin-left: 10px;\n  }\n\n  &.hide {\n    min-width: 50px;\n    transition: 0.3s;\n\n    & > div {\n      display: none;\n    }\n\n    & > div:last-child {\n      display: flex;\n    }\n  }\n",
        ]);
        return (
          (nL = function () {
            return n;
          }),
          n
        );
      }
      function nG() {
        let n = (0, f._)(["\n  font-size: 12px;\n"]);
        return (
          (nG = function () {
            return n;
          }),
          n
        );
      }
      function nF() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 25px;\n  height: 25px;\n  border-radius: 50px;\n  background-color: #6200ff;\n  padding: 3px;\n  margin: 0 10px;\n  cursor: pointer;\n",
        ]);
        return (
          (nF = function () {
            return n;
          }),
          n
        );
      }
      function nD() {
        let n = (0, f._)([
          "\n  position: relative;\n  width: 33px;\n  height: 33px;\n  background-color: #6200ff;\n  border-radius: 50%;\n  transform: rotate(0deg);\n  transition: 0.5s ease-in-out;\n  cursor: pointer;\n\n  & span {\n    display: block;\n    position: absolute;\n    height: 4px;\n    width: 70%;\n    background: #00d010;\n    border-radius: 9px;\n    opacity: 1;\n    left: 0;\n    right: 0;\n    margin: 0 auto;\n    transform: rotate(0deg);\n    transition: 0.25s ease-in-out;\n  }\n\n  & span:nth-child(1) {\n    top: 8px;\n    transform-origin: left center;\n  }\n\n  & span:nth-child(2) {\n    top: 14px;\n    transform-origin: left center;\n  }\n\n  & span:nth-child(3) {\n    top: 20px;\n    transform-origin: left center;\n  }\n\n  &.open span:nth-child(1) {\n    transform: rotate(45deg);\n    top: 6px;\n    left: 8px;\n  }\n\n  &.open span:nth-child(2) {\n    width: 0%;\n    opacity: 0;\n  }\n\n  &.open span:nth-child(3) {\n    transform: rotate(-45deg);\n    top: 22px;\n    left: 8px;\n  }\n",
        ]);
        return (
          (nD = function () {
            return n;
          }),
          n
        );
      }
      let nH = g.ZP.div(
          nA(),
          (n) => (n.fullHeight ? "flex-start" : "center"),
          (n) => (n.fullHeight ? "100%" : "initial"),
          (n) => (n.fullHeight ? "6" : "2")
        ),
        nq = g.ZP.div(nZ()),
        nU = g.ZP.div(nI()),
        nW = g.ZP.div(nL()),
        nY = g.ZP.div(nG()),
        nV = g.ZP.div(nF()),
        nX = g.ZP.div(nD());
      var nK = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/eye_open.9b4bf7e5.svg",
          height: 22,
          width: 44,
          blurWidth: 0,
          blurHeight: 0,
        },
        nJ = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/eye_close.84e81615.svg",
          height: 26,
          width: 44,
          blurWidth: 0,
          blurHeight: 0,
        },
        nQ = t(1163);
      function n$() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-left: 10px;\n  cursor: pointer;\n",
        ]);
        return (
          (n$ = function () {
            return n;
          }),
          n
        );
      }
      function n0() {
        let n = (0, f._)([
          "\n  position: relative;\n  width: 40px;\n  height: 20px;\n  background-color: #3a454e;\n  border-radius: 32px;\n  padding: 4px;\n  transition: 300ms all;\n\n  &:before {\n    content: '';\n    transition: 300ms all;\n    position: absolute;\n    width: 15px;\n    height: 15px;\n    border-radius: 35px;\n    top: 50%;\n    left: 4px;\n    /* background-color: #fff; */\n    background-color: #57707a;\n    transform: translate(0, -50%);\n  }\n",
        ]);
        return (
          (n0 = function () {
            return n;
          }),
          n
        );
      }
      function n1() {
        let n = (0, f._)([
          "\n  /* opacity: 0;\n  position: absolute; */\n  display: none;\n\n  &:checked + ",
          " {\n    background: ",
          ";\n\n    &:before {\n      background-color: ",
          ";\n      transform: translate(18px, -50%);\n    }\n  }\n",
        ]);
        return (
          (n1 = function () {
            return n;
          }),
          n
        );
      }
      let n2 = g.ZP.label(n$()),
        n5 = g.ZP.div(n0()),
        n3 = (n) => {
          switch (n) {
            case "green":
              return "#32616B";
            case "purple":
              return "linear-gradient(90deg, #fe82ff, #af3eec)";
          }
        },
        n4 = g.ZP.input(
          n1(),
          n5,
          (n) => n3(n.status),
          (n) => ("green" === n.status ? "#a1f566" : "#fff")
        );
      var n6 = (n) => {
        let { setChecked: e, checked: t = !1, color: i = "green" } = n;
        return (0, m.jsxs)(n2, {
          children: [
            (0, m.jsx)(n4, {
              type: "checkbox",
              checked: t,
              status: i,
              onChange: (n) => {
                e(n.target.checked);
              },
            }),
            (0, m.jsx)(n5, {}),
          ],
        });
      };
      function n8() {
        let n = (0, f._)([
          "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 275px;\n  height: auto;\n  background-color: #272727;\n  border-radius: 16px;\n",
        ]);
        return (
          (n8 = function () {
            return n;
          }),
          n
        );
      }
      function n7() {
        let n = (0, f._)([
          "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 30%;\n  border-bottom: 2px solid #2e2e2e;\n  padding: 20px;\n\n  > label {\n    margin-left: 0px;\n  }\n",
        ]);
        return (
          (n7 = function () {
            return n;
          }),
          n
        );
      }
      function n9() {
        let n = (0, f._)([
          "\n  color: #fff;\n  font-weight: 500;\n  margin-bottom: 5px;\n",
        ]);
        return (
          (n9 = function () {
            return n;
          }),
          n
        );
      }
      function en() {
        let n = (0, f._)([
          "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n  flex: 1;\n  width: 100%;\n  padding-top: 17px;\n",
        ]);
        return (
          (en = function () {
            return n;
          }),
          n
        );
      }
      function ee() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: left;\n  width: 60%;\n  height: 15%;\n  color: #fff;\n  /* background: linear-gradient(#fe82ff, #af3eec); */\n  background-color: #af3eec;\n  border-radius: 4px;\n  cursor: pointer;\n  padding-left: 8px;\n  margin-bottom: 18px;\n  & div {\n    margin-left: 5px;\n  };\n  :lang(my) {\n    width: 70%;\n    font-size: 13px;\n  }\n",
        ]);
        return (
          (ee = function () {
            return n;
          }),
          n
        );
      }
      let et = g.ZP.div(n8()),
        ei = g.ZP.div(n7()),
        er = g.ZP.div(n9()),
        ea = g.ZP.div(en()),
        eo = g.ZP.div(ee());
      var es = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/mr_menu_bettingRules_icon.f3e05929.svg",
          height: 25,
          width: 30,
          blurWidth: 0,
          blurHeight: 0,
        },
        el = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/mr_menu_tutorial_icon.e2f5ca3d.svg",
          height: 25,
          width: 30,
          blurWidth: 0,
          blurHeight: 0,
        },
        ec = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/mr_menu_history_icon.fe4a9f01.svg",
          height: 25,
          width: 30,
          blurWidth: 0,
          blurHeight: 0,
        },
        ed = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/mr_menu_lobby_icon.5d974f03.svg",
          height: 25,
          width: 30,
          blurWidth: 0,
          blurHeight: 0,
        },
        eu = t(8883);
      let ep = (0, nz.Ue)((n) => ({
          isMute: !1,
          setIsMute: (e) =>
            n({
              isMute: e,
            }),
          isBgmMute: !1,
          setIsBgmMute: (e) =>
            n({
              isBgmMute: e,
            }),
          isSfxMute: !1,
          setIsSfxMute: (e) =>
            n({
              isSfxMute: e,
            }),
        })),
        eh = new Map(),
        em = function (n, e, t) {
          if (!i) {
            let { loopAudioList: r, controllableAudioList: a } = e,
              o = r.map((e) => ef(n, e, t)),
              s = a.map((e) => ef(n, e, t));
            o.forEach((n) => {
              let { url: e, key: t } = n;
              return eh.set(
                t,
                (function (n) {
                  let e = new eu.Howl({
                    src: [n],
                    html5: !0,
                    onend: () => {
                      e.play();
                    },
                  });
                  return e;
                })(e)
              );
            }),
              s.forEach((n) => {
                let { url: e, key: t } = n;
                return eh.set(
                  t,
                  new eu.Howl({
                    src: [e],
                    html5: !0,
                  })
                );
              });
            let l = ep.getState().setIsMute,
              c = "true" === localStorage.getItem("".concat(n, "_isMute"));
            l(c), (i = new ex(n, t)), eu.Howler.mute(c);
          }
        };
      class ex {
        constructor(n, e) {
          var t = this;
          (this.playActiveAudio = function (n) {
            let e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 1,
              i =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 1;
            ep.getState().isMute ||
              (function (n, e, t) {
                let i = new eu.Howl({
                  src: [n],
                  html5: !0,
                  onend: function () {},
                });
                i.volume(e), i.rate(t), i.play();
              })(ef(t.gameName, n, t.baseUrl).url, e, i);
          }),
            (this.muteStateToggle = () => {
              let n = ep.getState().setIsMute,
                e = ep.getState().isMute,
                t = !e;
              localStorage.setItem(
                "".concat(this.gameName, "_isMute"),
                t.toString()
              ),
                n(!e),
                eu.Howler.mute(t);
            }),
            (this.bgmMuteStateToggle = (n) => {
              let e = ep.getState().setIsBgmMute,
                t = ep.getState().isBgmMute,
                i = !t;
              localStorage.setItem(
                "".concat(this.gameName, "_bgm_isMute"),
                i.toString()
              ),
                e(!t),
                i
                  ? n.map((n) => eh.get(n)).forEach((n) => n.mute(i))
                  : n.map((n) => eh.get(n)).forEach((n) => n.mute(i));
            }),
            (this.sfxMuteStateToggle = (n) => {
              let e = ep.getState().setIsSfxMute,
                t = ep.getState().isSfxMute,
                i = !t;
              localStorage.setItem(
                "".concat(this.gameName, "_sfx_isMute"),
                i.toString()
              ),
                e(!t),
                i
                  ? n.map((n) => eh.get(n)).forEach((n) => n.mute(i))
                  : n.map((n) => eh.get(n)).forEach((n) => n.mute(i));
            }),
            (this.playExistedAudioLoop = function (n) {
              let e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 1,
                t =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 1,
                i = eh.get(n);
              if (!i)
                return console.warn(
                  "Existing audio not found. Please check your audio name or init list."
                );
              i.loop(!0), i.volume(e), i.rate(t), i.play();
            }),
            (this.playExistedAudio = function (n) {
              let e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 1,
                t =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 1;
              if (ep.getState().isMute) return;
              let i = eh.get(n);
              if (!i)
                return console.warn(
                  "Existing audio not found. Please check your audio name or init list."
                );
              i.volume(e), i.rate(t), i.play();
            }),
            (this.pauseExistedAudio = (n) => {
              eh.get(n).pause();
            }),
            (this.stopExistedAudio = (n) => {
              eh.get(n).stop();
            }),
            (this.muteAll = () => {
              eu.Howler.mute(!0);
            }),
            (this.resumeAll = () => {
              let n = ep.getState().isMute;
              eu.Howler.mute(n);
            }),
            (this.getSound = (n) => eh.get(n)),
            (this.gameName = n),
            (this.baseUrl = e);
        }
      }
      let ef = (n, e, t) => ({
        url: "".concat(t, "/").concat(n, "/").concat(e, ".mp3"),
        key: e,
      });
      new Promise((n) => {
        n({
          returnCode: 0,
          message: "",
          refNo: 200000031136,
          odds: 1.17,
        });
      }),
        new Promise((n) => {
          n({
            returnCode: 0,
            message: "",
            authToken: "4WvLVivZuk2dZdqATcU4eokdyahRHAsssrDAIg2KM",
          });
        }),
        ((p = h || (h = {}))[(p.CreateGame = 0)] = "CreateGame"),
        (p[(p.Reshuffle = 10)] = "Reshuffle"),
        (p[(p.OpenBet = 20)] = "OpenBet"),
        (p[(p.OpeningBet = 21)] = "OpeningBet"),
        (p[(p.CloseBet = 30)] = "CloseBet"),
        (p[(p.SettleGame = 40)] = "SettleGame"),
        (p[(p.Drawing = 41)] = "Drawing"),
        (p[(p.ShowBonus = 41)] = "ShowBonus"),
        (p[(p.SettleBet = 50)] = "SettleBet"),
        (p[(p.SettledBet = 51)] = "SettledBet"),
        (p[(p.StopGame = 99)] = "StopGame"),
        new Promise((n) => {
          n({
            playerInfo: {
              language: "EN",
              currency: "USD",
              loginName: "Fun585013USD",
              playerId: "Fun585013USD",
              chips: [1, 2, 3, 5, 10, 20, 50],
              tableLimit: [
                {
                  betOption: "OnBoard",
                  betOptionMin: 1,
                  betOptionMax: 50,
                },
              ],
              defaultChip: 50,
              maxBet: 50,
              minBet: 1,
              balance: 1e3,
              cashOutMin: 1.01,
              cashOutMax: 150,
              voucherInfo: null,
            },
            gameInfo: {
              bettingCountDown: 10,
              liveGameId: 3041837130,
              gameStatus: h.CreateGame,
              gameManagerId: "default",
              gameHistory: ["2.41", "34.56", "4.12"],
            },
            returnCode: 0,
            message: "",
          });
        }),
        new Promise((n) => {
          n({
            returnCode: 0,
            message: "",
            refNo: 200000031136,
            balance: 960,
            voucherInfo: null,
          });
        }),
        new Promise((n) => {
          n({
            returnCode: 0,
            message: "",
            balance: 1e3,
          });
        }),
        new Promise((n) => {
          n({
            returnCode: 0,
            message: "",
            toggles:
              '{"disableFunkyGameLogo":"false","disableLeaveGameBtn":"true", "enableEasterTheme":"false"}',
          });
        });
      var eg = t(444);
      let eb = {
          message: "",
          isOpen: !1,
          isSuccess: !0,
        },
        e_ = (0, nz.Ue)((n, e) => ({
          toast: eb,
          setToast: (e) => {
            n((n) => ({
              toast: {
                ...n.toast,
                ...e,
              },
            }));
          },
        }));
      var ey = t(7726);
      let ew = async (n, e) => {
          let t = await (0, ey.Z)(nt.A2.getState().lang, "common");
          nE.getState().openDialog({
            message: t(n),
          }),
            nE.getState().setLeaveGame(e);
        },
        ev = async (n) => {
          let e = await (0, ey.Z)(nt.A2.getState().lang, "common");
          e_.getState().setToast({
            isOpen: !0,
            message: e(n),
            isSuccess: !1,
          });
        },
        ej = new Map([
          [-1, () => ew("Main_PopUp_SystemError", !0)],
          [3, () => ev("Main_PopUp_RejectBet")],
          [6, () => ew("Main_PopUp_OverPlayerMaxLose", !0)],
          [10, () => ew("Main_PopUp_ExceedMaxBet")],
          [11, () => ew("Main_PopUp_LessThanMinBet")],
          [12, () => ev("Main_PopUp_RejectBet")],
          [14, () => ev("Main_PopUp_RejectCashOut")],
          [15, () => ev("Main_PopUp_RejectBet")],
          [18, () => ev("Main_PopUp_RejectCashOut")],
          [21, () => ew("Main_PopUp_ExceedBalance")],
          [27, () => ev("Main_PopUp_RejectBet")],
          [23, () => ew("Main_PopUp_SessionExpired", !0)],
          [500, () => ew("Main_PopUp_SystemError", !0)],
        ]),
        eS = eg.Z.create(),
        ek = async (n) => {
          let { status: e, data: t } = n.response;
          if (401 === e) return await ej.get(23)(), e;
          if (e >= 400) {
            let n = Number(t.returnCode);
            ej.has(n) ? await ej.get(n)() : await ej.get(-1)();
          }
          return n.response.data;
        };
      eS.interceptors.request.use((n) => {
        let e = nt.tN.getState().authToken;
        return (
          n.headers &&
            ((n.headers["Content-Type"] = "application/json"),
            e && (n.headers.Authorization = e)),
          n
        );
      }),
        eS.interceptors.response.use((n) => {
          let e = Number(n.data.returnCode);
          return 0 !== e && (ej.has(e) ? ej.get(e)() : ej.get(-1)()), n.data;
        }, ek);
      let eP = "/api/midnightrobbery";
      var eO = {
          consumePlayer:
            ((r = "".concat(eP)),
            {
              getConsumePlayer: (n) => eS.post("/api/common/consumeplayer", n),
              getDirectConsumePlayer: (n) =>
                eS.post("".concat(r, "/DirectConsumePlayer"), n),
            }),
          gameInfo:
            ((a = "".concat(eP, "/GameInfo")),
            {
              getGameInfo: () => eS.post("".concat(a), {}),
            }),
          tableLimit:
            ((o = "".concat(eP)),
            {
              getTableLimit: (n) => eS.post("".concat(o, "/TableLimit"), n),
              setTableLimit: (n) => eS.post("".concat(o, "/SetTableLimit"), n),
            }),
          placeOrder:
            ((s = "".concat(eP)),
            {
              placeOrder: (n) => eS.post("".concat(s, "/PlaceOrder"), n),
            }),
          cashOut:
            ((l = "".concat(eP)),
            {
              cashOut: (n) => eS.post("".concat(l, "/CashOut"), n),
            }),
          balance:
            ((c = "".concat(eP)),
            {
              getBalance: () => eS.get("".concat(c, "/getbalance")),
            }),
          leaveGame:
            ((d = "".concat(eP, "/player")),
            {
              leaveGame: () => eS.get("".concat(d, "/leavegame")),
            }),
          frontEndToggle:
            ((u = "".concat(eP)),
            {
              getFrontEndToggle: () => eS.post("".concat(u, "/frontEndToggle")),
            }),
        },
        eC = t(7738);
      let ez = (0, nz.Ue)()(
        (0, eC.mW)(
          (0, eC.tJ)(
            (n) => ({
              isShowTutorial: !1,
              isSkipNextTime: !1,
              setIsShowTutorial: (e) =>
                n({
                  isShowTutorial: e,
                }),
              setIsSkipNextTime: (e) =>
                n({
                  isSkipNextTime: e,
                }),
            }),
            {
              name: "midnightRobberyGameInfo",
              partialize: (n) => ({
                isSkipNextTime: n.isSkipNextTime,
              }),
              onRehydrateStorage: (n) => (n, e) => {
                !1 === n.isSkipNextTime && (n.isShowTutorial = !0);
              },
            }
          )
        )
      );
      var eT = t(1737);
      let { leaveGame: eE } = eO;
      var eM = (n) => {
        let { open: e, onClose: t } = n,
          r = (0, nt.L5)((n) => n.setIsShowHistoryList),
          a = (0, nt.qA)((n) => n.setIsShowGameRules),
          o = ez((n) => n.setIsShowTutorial),
          s = (0, nh.H)((n) => n.gameToggle),
          { t: l } = (0, k.Z)("common"),
          c = ep((n) => n.isMute),
          d = () => {
            o(!0), t();
          },
          u = async () => {
            await eE.leaveGame(), nC();
          };
        return (
          (0, x.useEffect)(() => {
            c && (0, eT.sx)("menu_close_music");
          }, [c]),
          (0, m.jsx)(nw, {
            open: e,
            onClose: t,
            children: (0, m.jsxs)(et, {
              children: [
                (0, m.jsxs)(ei, {
                  children: [
                    (0, m.jsx)(er, {
                      children: l("Menu_Rule_GameControls_Sound"),
                    }),
                    (0, m.jsx)(n6, {
                      checked: !c,
                      setChecked: i.muteStateToggle,
                      color: "purple",
                    }),
                  ],
                }),
                (0, m.jsxs)(ea, {
                  children: [
                    (0, m.jsxs)(eo, {
                      onClick: () => {
                        a(!0), t(), (0, eT.sx)("menu_betting_rules");
                      },
                      children: [
                        (0, m.jsx)(S(), {
                          src: es,
                          alt: "betting_rules_icon",
                          width: "30",
                          height: "30",
                        }),
                        (0, m.jsx)("div", {
                          children: l("Menu_Tab_BettingRules"),
                        }),
                      ],
                    }),
                    s.isEnableTutorial &&
                      (0, m.jsxs)(eo, {
                        onClick: () => {
                          d(), (0, eT.sx)("menu_tutorial");
                        },
                        children: [
                          (0, m.jsx)(S(), {
                            src: el,
                            alt: "tutorial_icon",
                            width: "30",
                            height: "30",
                          }),
                          (0, m.jsx)("div", {
                            children: l("Menu_Tab_Tutorial"),
                          }),
                        ],
                      }),
                    s.isEnableHistory &&
                      (0, m.jsxs)(eo, {
                        onClick: () => {
                          r(!0), t(), (0, eT.sx)("menu_history");
                        },
                        children: [
                          (0, m.jsx)(S(), {
                            src: ec,
                            alt: "history_icon",
                            width: "30",
                            height: "30",
                          }),
                          (0, m.jsx)("div", {
                            children: l("Menu_Tab_HistoryList"),
                          }),
                        ],
                      }),
                    s.isEnableLeaveGameBtn &&
                      (0, m.jsxs)(eo, {
                        onClick: () => {
                          u(), (0, eT.sx)("menu_lobby");
                        },
                        children: [
                          (0, m.jsx)(S(), {
                            src: ed,
                            alt: "lobby_icon",
                            width: "30",
                            height: "30",
                          }),
                          (0, m.jsx)("div", {
                            children: l("Menu_Tab_Leave"),
                          }),
                        ],
                      }),
                  ],
                }),
              ],
            }),
          })
        );
      };
      let eN = (n) =>
        4 !== n.length ? n : "k" === n.slice(0, 1) ? n.substring(1) : n;
      function eB() {
        let n = (0, f._)([
          "\n        background:#2CAFAB;\n        box-shadow: 0px 1px 5px #00000029;\n        color:#006F6B;\n        &.high{\n          color:#80FF00;\n        }\n\n        &:first-child {\n          border: 1px solid #F5E880;\n        }\n      ",
        ]);
        return (
          (eB = function () {
            return n;
          }),
          n
        );
      }
      function eR() {
        let n = (0, f._)([
          "\n  width: 100%;\n  height: 100%;\n  user-select:none;\n\n  .scroller {\n    scrollbar-width: none;\n    background:transparent;\n  }\n\n  .box {\n    width: auto;\n    height: 100%;\n    overflow-x: auto;\n    overflow-y: hidden;\n    white-space: nowrap;\n\n    &::-webkit-scrollbar{\n      height:3px;\n    }\n    &::-webkit-scrollbar-thumb{\n      border-radius:3px;\n      background:transparent;\n    }\n\n    div{\n      min-width: 37px;\n      padding: 0 5px 1px;\n      border-radius: 15px;\n      display: inline-block;\n      font-size: 10px;\n      font-weight: 500;\n      margin: 2px;\n      text-align: center;\n      letter-spacing: 0px;\n      background:#292929;\n      box-shadow: 0px 1px 5px #00000029;\n      color:#3A7400;\n\n      &.high{\n        color:#80FF00;\n      }\n\n      &:first-child {\n        border: 1px solid #80FF00;\n      }\n      \n      ",
          "\n    }\n  }\n",
        ]);
        return (
          (eR = function () {
            return n;
          }),
          n
        );
      }
      let eA = g.ZP.div(eR(), (n) => n.isEnableEasterTheme && (0, g.iv)(eB())),
        eZ = {
          bettingCountDown: 0,
          liveGameId: 0,
          gameStatus: h.CreateGame,
          gameManagerId: "",
          odds: 0,
          settleOdds: 0,
          leaderBoard: [],
          cashOuts: [],
          onBoardPlayerId: "",
          onBoardCount: 0,
        },
        eI = (0, nz.Ue)((n) => ({
          gameState: eZ,
          setGameState: (e) =>
            n((n) => ({
              gameState: {
                ...n.gameState,
                ...e,
              },
            })),
          initialGameState: () => {
            n((n) => ({
              gameState: {
                ...n.gameState,
                ...eZ,
              },
            }));
          },
        }));
      var eL = function () {
          let n = eI((n) => n.gameState.gameHistory),
            e = (0, nh.H)((n) => n.gameToggle.isEnableEasterTheme);
          return (
            (0, x.useEffect)(() => {
              if (document.getElementById("dragscroll")) return;
              let n = document.createElement("script");
              n.setAttribute("src", "/easterrun/lib/dragscroll.js"),
                n.setAttribute("id", "dragscroll"),
                document.body.appendChild(n);
            }, []),
            (0, m.jsx)(eA, {
              isEnableEasterTheme: e,
              children: (0, m.jsx)("div", {
                className: "box dragscroll scroller",
                id: "box",
                onScroll: () => (0, eT.sx)("scroll_game_history"),
                children:
                  n &&
                  n.map((n, e) =>
                    (0, m.jsxs)(
                      "div",
                      {
                        className: Number(n) > 5 && "high",
                        children: [(0, nt.PO)(n), "x"],
                      },
                      e
                    )
                  ),
              }),
            })
          );
        },
        eG = x.memo(() => {
          let [n, e] = (0, nR.n)((n) => [
              n.playerState.currency,
              n.playerState.balance,
            ]),
            [t, i] = (0, x.useState)(!1),
            [r, a] = (0, x.useState)(!1),
            o = (0, nh.H)((n) => n.gameToggle);
          return (0, m.jsxs)(nH, {
            fullHeight: r,
            children: [
              (0, m.jsx)(nq, {
                children: (0, m.jsx)(nQ.Z, {
                  isEnableEasterTheme: o.isEnableEasterTheme,
                }),
              }),
              (0, m.jsxs)(nU, {
                children: [
                  (0, m.jsxs)(nW, {
                    className: t && "hide",
                    children: [
                      (0, m.jsx)(nY, {
                        children:
                          o.isEnableCurrency &&
                          (0, m.jsx)("div", {
                            children: eN(n),
                          }),
                      }),
                      (0, m.jsx)("div", {
                        children: null !== e && (0, nt.PO)(e),
                      }),
                      (0, m.jsx)(nV, {
                        onClick: () => {
                          i(!t), t || (0, eT.sx)("header_hide_balance");
                        },
                        children: t
                          ? (0, m.jsx)(S(), {
                              src: nJ,
                              alt: "eye_Close",
                              width: "50",
                              height: "50",
                            })
                          : (0, m.jsx)(S(), {
                              src: nK,
                              alt: "eye_Open",
                              width: "50",
                              height: "50",
                            }),
                      }),
                    ],
                  }),
                  (0, m.jsxs)(nX, {
                    className: r && "open",
                    onClick: () => {
                      a(!r), (0, eT.sx)("header_click_menu");
                    },
                    children: [
                      (0, m.jsx)("span", {}),
                      (0, m.jsx)("span", {}),
                      (0, m.jsx)("span", {}),
                    ],
                  }),
                ],
              }),
              (0, m.jsx)(eM, {
                open: r,
                onClose: () => a(!1),
              }),
              (0, m.jsx)(eL, {}),
            ],
          });
        }),
        eF = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/icon_success.cc19efed.png",
        },
        eD = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/icon_fail.6e4c10d3.png",
        };
      function eH() {
        let n = (0, f._)([
          "\n  position: absolute;\n  width: 100%;\n  height: 10%;\n  top: 10%;\n  z-index: 3;\n",
        ]);
        return (
          (eH = function () {
            return n;
          }),
          n
        );
      }
      function eq() {
        let n = (0, f._)([
          "\n  position: absolute;\n  width: max-content;\n  height: 28px;\n  background-color: ",
          ";\n  border-radius: 30px;\n  left: 0;\n  right: 0;\n  margin: auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  color: #ffffff;\n  letter-spacing: 1px;\n  word-wrap: break-word;\n  transition: ",
          ";\n  opacity: ",
          ";\n  top: ",
          "%;\n\n  > :first-child {\n    width: 25px;\n    padding-left: 5px;\n    padding-top: 5px;\n  }\n\n  > :last-child {\n    width: 100%;\n    padding-left: 6px;\n  }\n",
        ]);
        return (
          (eq = function () {
            return n;
          }),
          n
        );
      }
      function eU() {
        let n = (0, f._)(["\n  font-weight: 500;\n  padding-right: 5px;\n"]);
        return (
          (eU = function () {
            return n;
          }),
          n
        );
      }
      let eW = (n, e) => {
          if (
            (0 === n && 1 === e) ||
            (0 === n && 2 === e) ||
            (2 === n && 1 === e) ||
            (1 === n && 0 === e) ||
            (2 === n && 0 === e)
          )
            return "0.3s";
        },
        eY = (n) => (0 === n ? -16 : 1 === n ? 10 : 2 === n ? 66 : void 0),
        eV = g.ZP.div(eH()),
        eX = g.ZP.div(
          eq(),
          (n) => (n.isSuccess ? "#47439F" : "#AF1F31"),
          (n) => eW(n.lastPosition, n.currentPosition),
          (n) => (n.isShowPopUp ? "1" : "0"),
          (n) => eY(n.currentPosition)
        ),
        eK = g.ZP.div(eU());
      var eJ = x.memo(() => {
          let { toast: n } = e_(),
            [e, t] = (0, x.useState)(0),
            [i, r] = (0, x.useState)({
              isOpen: !1,
              isSuccess: !1,
              message: "",
              position: 0,
              lastPosition: 0,
            }),
            [a, o] = (0, x.useState)({
              isOpen: !1,
              isSuccess: !1,
              message: "",
              position: 0,
              lastPosition: 0,
            }),
            [s, l] = (0, x.useState)({
              isOpen: !1,
              isSuccess: !1,
              message: "",
              position: 0,
              lastPosition: 0,
            }),
            c = (n) =>
              i.position === n
                ? {
                    currentToast: i,
                    setCurrentToast: r,
                  }
                : a.position === n
                ? {
                    currentToast: a,
                    setCurrentToast: o,
                  }
                : s.position === n
                ? {
                    currentToast: s,
                    setCurrentToast: l,
                  }
                : void 0,
            d = (0, x.useRef)(null),
            u = (0, x.useRef)(null),
            p = (0, x.useRef)(null);
          function h() {
            clearTimeout(d.current);
          }
          function f() {
            clearTimeout(u.current);
          }
          function g() {
            clearTimeout(p.current);
          }
          return (
            (0, x.useEffect)(() => {
              if (n.isOpen) {
                if (0 === e)
                  r({
                    isOpen: n.isOpen,
                    isSuccess: n.isSuccess,
                    message: n.message,
                    lastPosition: 0,
                    position: 1,
                  });
                else if (1 === e) {
                  let { setCurrentToast: e } = c(0);
                  e({
                    isOpen: n.isOpen,
                    isSuccess: n.isSuccess,
                    message: n.message,
                    lastPosition: 0,
                    position: 2,
                  });
                } else if (3 === e) {
                  let e = c(0),
                    t = c(1);
                  t.setCurrentToast({
                    isOpen: !1,
                    isSuccess: t.currentToast.isSuccess,
                    message: t.currentToast.message,
                    lastPosition: 1,
                    position: 0,
                  });
                  let i = c(2);
                  i.setCurrentToast({
                    isOpen: i.currentToast.isOpen,
                    isSuccess: i.currentToast.isSuccess,
                    message: i.currentToast.message,
                    lastPosition: 2,
                    position: 1,
                  }),
                    e.setCurrentToast({
                      isOpen: n.isOpen,
                      isSuccess: n.isSuccess,
                      message: n.message,
                      lastPosition: 0,
                      position: 2,
                    });
                }
              }
            }, [n]),
            (0, x.useEffect)(() => {
              let n = i.position + a.position + s.position;
              if (2 === n) {
                let { currentToast: n, setCurrentToast: e } = c(2);
                e({
                  isOpen: n.isOpen,
                  isSuccess: n.isSuccess,
                  message: n.message,
                  lastPosition: 2,
                  position: 1,
                });
              }
              t(n);
            }, [i.position, a.position, s.position]),
            (0, x.useEffect)(() => {
              0 === i.lastPosition &&
                (h(),
                (d.current = setTimeout(() => {
                  r({
                    isOpen: !1,
                    isSuccess: i.isSuccess,
                    message: i.message,
                    position: 0,
                    lastPosition: i.position,
                  });
                }, 3e3))),
                0 === i.position && h();
            }, [i]),
            (0, x.useEffect)(() => {
              0 === a.lastPosition &&
                (f(),
                (u.current = setTimeout(() => {
                  o({
                    isOpen: !1,
                    isSuccess: a.isSuccess,
                    message: a.message,
                    position: 0,
                    lastPosition: a.position,
                  });
                }, 3e3))),
                0 === a.position && f();
            }, [a]),
            (0, x.useEffect)(() => {
              0 === s.lastPosition &&
                (g(),
                (p.current = setTimeout(() => {
                  l({
                    isOpen: !1,
                    isSuccess: s.isSuccess,
                    message: s.message,
                    position: 0,
                    lastPosition: s.position,
                  });
                }, 3e3))),
                0 === s.position && g();
            }, [s]),
            n.isOpen &&
              (i.isOpen || a.isOpen || s.isOpen) &&
              (0, m.jsxs)(eV, {
                children: [
                  (0, m.jsxs)(eX, {
                    isSuccess: i.isSuccess,
                    isShowPopUp: i.isOpen,
                    lastPosition: i.lastPosition,
                    currentPosition: i.position,
                    children: [
                      (0, m.jsx)("div", {
                        children: (0, m.jsx)(S(), {
                          width: "16",
                          height: "16",
                          src: i.isSuccess ? eF.src : eD.src,
                          alt: "",
                        }),
                      }),
                      (0, m.jsx)("div", {
                        children: (0, m.jsx)(eK, {
                          children: i.message,
                        }),
                      }),
                    ],
                  }),
                  (0, m.jsxs)(eX, {
                    isSuccess: a.isSuccess,
                    isShowPopUp: a.isOpen,
                    lastPosition: a.lastPosition,
                    currentPosition: a.position,
                    children: [
                      (0, m.jsx)("div", {
                        children: (0, m.jsx)(S(), {
                          width: "16",
                          height: "16",
                          src: a.isSuccess ? eF.src : eD.src,
                          alt: "",
                        }),
                      }),
                      (0, m.jsx)("div", {
                        children: (0, m.jsx)(eK, {
                          children: a.message,
                        }),
                      }),
                    ],
                  }),
                  (0, m.jsxs)(eX, {
                    isSuccess: s.isSuccess,
                    isShowPopUp: s.isOpen,
                    lastPosition: s.lastPosition,
                    currentPosition: s.position,
                    children: [
                      (0, m.jsx)("div", {
                        children: (0, m.jsx)(S(), {
                          width: "16",
                          height: "16",
                          src: s.isSuccess ? eF.src : eD.src,
                          alt: "",
                        }),
                      }),
                      (0, m.jsx)("div", {
                        children: (0, m.jsx)(eK, {
                          children: s.message,
                        }),
                      }),
                    ],
                  }),
                ],
              })
          );
        }),
        eQ = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/result_long.e54706f1.png",
        };
      function e$() {
        let n = (0, f._)([
          "\n      background-image: url(",
          ");\n      background-size: cover;\n    ",
        ]);
        return (
          (e$ = function () {
            return n;
          }),
          n
        );
      }
      function e0() {
        let n = (0, f._)([
          "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 200px;\n  height: 500px;\n  background-image: url(",
          ");\n  background-size: cover;\n\n  ",
          "\n\n  @media only screen and (min-width: 1200px) {\n    width: 330px;\n    height: 600px;\n  }\n\n  @media only screen and (min-width: 992px) {\n    width: 330px;\n    height: 600px;\n  }\n\n  @media only screen and (min-width: 768px) {\n    width: 330px;\n    height: 600px;\n  }\n\n  @media only screen and (min-width: 600px) {\n    width: 330px;\n    height: 600px;\n  }\n\n  @media only screen and (min-width: 500px) {\n    width: 276px;\n    height: 500px;\n  }\n\n  @media only screen and (min-width: 400px) {\n    width: 276px;\n    height: 500px;\n  }\n\n  @media only screen and (max-width: 400px) {\n    width: 276px;\n    height: 500px;\n  }\n",
        ]);
        return (
          (e0 = function () {
            return n;
          }),
          n
        );
      }
      function e1() {
        let n = (0, f._)(["\n      border-color: #ff8de3;\n    "]);
        return (
          (e1 = function () {
            return n;
          }),
          n
        );
      }
      function e2() {
        let n = (0, f._)(["\n          background-color: #ff8de3;\n        "]);
        return (
          (e2 = function () {
            return n;
          }),
          n
        );
      }
      function e5() {
        let n = (0, f._)(["\n            color: #7ffdf4;\n          "]);
        return (
          (e5 = function () {
            return n;
          }),
          n
        );
      }
      function e3() {
        let n = (0, f._)([
          "\n  position: relative;\n  width: 70%;\n  padding: 10px 0;\n  margin: 10px 0;\n  border-top: 2px solid #80ff00;\n  font-weight: 500;\n  ",
          "\n\n  @media only screen and (min-width: 500px) {\n    padding: 0;\n    margin: 5px 0;\n  }\n\n  @media only screen and (min-width: 400px) {\n    padding: 0;\n    margin: 5px 0;\n  }\n\n  @media only screen and (max-width: 400px) {\n    padding: 0;\n    margin: 5px 0;\n  }\n\n  > div {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    border-top: 2px solid #7b7b7b;\n    padding: 1px 0;\n    margin: 3px 0;\n\n    &:first-child {\n      border-top: 0px;\n    }\n\n    &.refNo {\n      position: absolute;\n      top: -15px;\n      right: 0;\n      left: 0;\n      margin: auto;\n      width: min-content;\n      padding: 0px 10px;\n      background-color: #80ff00;\n      border-radius: 50px;\n      color: black;\n      ",
          "\n\n      div:first-child {\n        margin-right: 5px;\n        width: max-content;\n      }\n      :lang(my) {\n        left: -10px;\n        font-size: 13px;\n      }\n      :lang(ru) {\n        left: -5px;\n        font-size: 14px;\n      }\n    }\n\n    &.cashed {\n      font-size: 18px;\n      border-top: 0;\n\n      & > div:last-child {\n        color: #80ff00;\n        font-size: 23px;\n\n        ",
          "\n      }\n    }\n  }\n",
        ]);
        return (
          (e3 = function () {
            return n;
          }),
          n
        );
      }
      let e4 = g.ZP.div(
          e0(),
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/result_long.0be84cb1.png",
          (n) => n.isEnableEasterTheme && (0, g.iv)(e$(), eQ.src)
        ),
        e6 = g.ZP.div(
          e3(),
          (n) => n.isEnableEasterTheme && (0, g.iv)(e1()),
          (n) => n.isEnableEasterTheme && (0, g.iv)(e2()),
          (n) => n.isEnableEasterTheme && (0, g.iv)(e5())
        ),
        e8 = {
          refNo: 0,
          cashOutOdds: 0,
          stake: 0,
          autoCashOutOdds: 0,
          isCashOut: !1,
          isVoucher: !1,
        },
        e7 = (0, nz.Ue)((n) => ({
          betRightState: e8,
          betLeftState: e8,
          setBetRightState: (e) =>
            n((n) => ({
              betRightState: {
                ...n.betRightState,
                ...e,
              },
            })),
          setBetLeftState: (e) =>
            n((n) => ({
              betLeftState: {
                ...n.betLeftState,
                ...e,
              },
            })),
          setIsAutoPlayRightState: (e) =>
            n((n) => ({
              betRightState: {
                ...n.betRightState,
                isAutoPlay: e,
              },
            })),
          setIsAutoPlayLeftState: (e) =>
            n((n) => ({
              betLeftState: {
                ...n.betLeftState,
                isAutoPlay: e,
              },
            })),
          initialBetState: () => {
            n((n) => ({
              betLeftState: {
                ...n.betLeftState,
                ...e8,
              },
              betRightState: {
                ...n.betRightState,
                ...e8,
              },
            }));
          },
        })),
        e9 = (n, e) => {
          let t, i;
          try {
            t = n.toString().split(".")[1].length;
          } catch (n) {
            t = 0;
          }
          try {
            i = e.toString().split(".")[1].length;
          } catch (n) {
            i = 0;
          }
          let r = Math.pow(10, Math.max(t, i));
          return (te(n, r) + te(e, r)) / r;
        },
        tn = (n, e) => {
          let t, i;
          try {
            t = n.toString().split(".")[1].length;
          } catch (n) {
            t = 0;
          }
          try {
            i = e.toString().split(".")[1].length;
          } catch (n) {
            i = 0;
          }
          let r = Math.pow(10, Math.max(t, i)),
            a = t >= i ? t : i;
          return ((n * r - e * r) / r).toFixed(a);
        },
        te = (n, e) => {
          let t = 0,
            i = n.toString(),
            r = e.toString();
          try {
            t += i.split(".")[1].length;
          } catch (n) {}
          try {
            t += r.toString().split(".")[1].length;
          } catch (n) {}
          return (
            (Number(i.replace(".", "")) * Number(r.replace(".", ""))) /
            Math.pow(10, t)
          );
        };
      var tt = t(9944),
        ti = () => {
          let { t: n } = (0, k.Z)("common"),
            [e, t] = e7((n) => [n.betLeftState, n.betRightState]),
            [i, r] = eI(
              (n) => [n.gameState.gameStatus, n.gameState.settleOdds],
              tt.X
            ),
            [a] = (0, nh.H)((n) => [n.gameToggle.isEnableEasterTheme]),
            [o, s] = (0, x.useState)(!1);
          (0, x.useMemo)(() => {
            i === h.SettleBet ? s(!0) : s(!1);
          }, [i]);
          let l = () => {
              s(!1), (0, eT.sx)("close_game_result");
            },
            c = (n) => {
              let i = 0,
                a = 0,
                o = !1;
              return (
                "right" === n
                  ? ((i = t.autoCashOutOdds),
                    (a = t.cashOutOdds),
                    (o = t.isCashOut))
                  : ((i = e.autoCashOutOdds),
                    (a = e.cashOutOdds),
                    (o = e.isCashOut)),
                o
                  ? 0 === i
                    ? a
                    : i > a && 0 === a
                    ? i > r
                      ? 0
                      : i
                    : a
                  : i > r
                  ? 0
                  : i
              );
            },
            d = (n) => {
              let i = "right" === n ? t.stake : e.stake,
                r = Number(tn(c(n), 1));
              return (0, nt.PO)(te(i, r < 0 ? 0 : r));
            };
          return (0, m.jsx)(nw, {
            open: o,
            onClose: l,
            children: (0, m.jsxs)(e4, {
              isEnableEasterTheme: a,
              onClick: l,
              children: [
                !e.refNo &&
                  !t.refNo &&
                  (0, m.jsxs)(e6, {
                    isEnableEasterTheme: a,
                    children: [
                      (0, m.jsxs)("div", {
                        className: "cashed",
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_Crashed"),
                          }),
                          (0, m.jsxs)("div", {
                            children: ["X ", (0, nt.PO)(r)],
                          }),
                        ],
                      }),
                      (0, m.jsxs)("div", {
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_Bet"),
                          }),
                          (0, m.jsx)("div", {
                            children: "-",
                          }),
                        ],
                      }),
                      (0, m.jsxs)("div", {
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_CashedOut"),
                          }),
                          (0, m.jsx)("div", {
                            children: "-",
                          }),
                        ],
                      }),
                      (0, m.jsxs)("div", {
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_Won"),
                          }),
                          (0, m.jsx)("div", {
                            children: "-",
                          }),
                        ],
                      }),
                    ],
                  }),
                !!e.refNo &&
                  (0, m.jsxs)(e6, {
                    isEnableEasterTheme: a,
                    children: [
                      (0, m.jsxs)("div", {
                        className: "refNo",
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_RefNo"),
                          }),
                          (0, m.jsx)("div", {
                            children: e.refNo,
                          }),
                        ],
                      }),
                      (0, m.jsxs)("div", {
                        className: "cashed",
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_Crashed"),
                          }),
                          (0, m.jsxs)("div", {
                            children: ["X ", (0, nt.PO)(r)],
                          }),
                        ],
                      }),
                      (0, m.jsxs)("div", {
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_Bet"),
                          }),
                          (0, m.jsx)("div", {
                            children: e.isVoucher
                              ? (0, nt.PO)(0)
                              : (0, nt.PO)(e.stake),
                          }),
                        ],
                      }),
                      (0, m.jsxs)("div", {
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_CashedOut"),
                          }),
                          (0, m.jsx)("div", {
                            children:
                              0 === c("left")
                                ? "-"
                                : "x " + (0, nt.PO)(c("left")),
                          }),
                        ],
                      }),
                      (0, m.jsxs)("div", {
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_Won"),
                          }),
                          (0, m.jsx)("div", {
                            children: d("left"),
                          }),
                        ],
                      }),
                    ],
                  }),
                !!t.refNo &&
                  (0, m.jsxs)(e6, {
                    isEnableEasterTheme: a,
                    children: [
                      (0, m.jsxs)("div", {
                        className: "refNo",
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_RefNo"),
                          }),
                          (0, m.jsx)("div", {
                            children: t.refNo,
                          }),
                        ],
                      }),
                      (0, m.jsxs)("div", {
                        className: "cashed",
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_Crashed"),
                          }),
                          (0, m.jsxs)("div", {
                            children: ["X ", (0, nt.PO)(r)],
                          }),
                        ],
                      }),
                      (0, m.jsxs)("div", {
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_Bet"),
                          }),
                          (0, m.jsx)("div", {
                            children: t.isVoucher
                              ? (0, nt.PO)(0)
                              : (0, nt.PO)(t.stake),
                          }),
                        ],
                      }),
                      (0, m.jsxs)("div", {
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_CashedOut"),
                          }),
                          (0, m.jsx)("div", {
                            children:
                              0 === c("right")
                                ? "-"
                                : "x " + (0, nt.PO)(c("right")),
                          }),
                        ],
                      }),
                      (0, m.jsxs)("div", {
                        children: [
                          (0, m.jsx)("div", {
                            children: n("Main_ResultPage_Won"),
                          }),
                          (0, m.jsx)("div", {
                            children: d("right"),
                          }),
                        ],
                      }),
                    ],
                  }),
              ],
            }),
          });
        },
        tr = t(2240),
        ta = t.n(tr),
        to = t(3625),
        ts = t(1791),
        tl = t.n(ts),
        tc = t(3660),
        td = t.n(tc),
        tu = t(7379),
        tp = t(2706),
        th = t(5203);
      let { balance: tm } = eO,
        tx = async () => {
          let n = await (0, ey.Z)(nt.A2.getState().lang, "common"),
            e = new tu.s()
              .withUrl("/api/midnightrobbery/hub", {
                accessTokenFactory: () => nt.tN.getState().authToken,
                skipNegotiation: !0,
                withCredentials: !0,
                transport: tp.n.WebSockets,
              })
              .withAutomaticReconnect()
              .withHubProtocol(new th.e())
              .build();
          e.on("CreateGame", async (n) => {
            eI.getState().initialGameState(),
              e7.getState().initialBetState(),
              eI.getState().setGameState({
                liveGameId: n.liveGameId,
                gameStatus: h.CreateGame,
              });
            let e = await tm.getBalance();
            nR.n.getState().setPlayerState({
              balance: e.balance,
            });
          }),
            e.on("OpenBet", (n) => {
              eI.getState().setGameState({
                gameStatus: h.OpenBet,
                bettingCountDown: n.countDown,
              });
            }),
            e.on("OpeningBet", (n) => {
              eI.getState().setGameState({
                gameStatus: h.OpeningBet,
                bettingCountDown: n.countDown,
              });
            }),
            e.on("CloseBet", (n) => {
              eI.getState().setGameState({
                gameStatus: h.CloseBet,
              });
            }),
            e.on("Drawing", (n) => {
              eI.getState().setGameState({
                gameStatus: h.Drawing,
                odds: n.odds,
              });
            }),
            e.on("SettleGame", (n) => {
              eI.getState().setGameState({
                gameStatus: h.SettleGame,
                odds: n.odds,
                settleOdds: n.odds,
                gameHistory: n.gameHistory,
              });
            }),
            e.on("SettleBet", (n) => {
              eI.getState().setGameState({
                gameStatus: h.SettleBet,
              });
            }),
            e.on("OnBoardPlayer", (n) => {
              eI.getState().setGameState({
                leaderBoard: n.leaderBoards,
                onBoardPlayerId: n.playerId,
                onBoardCount: n.onBoardCount,
              });
            }),
            e.on("OtherCashOut", (e) => {
              if (
                (eI.getState().setGameState({
                  leaderBoard: e.leaderBoards,
                  cashOuts: e.cashOuts,
                  onBoardCount: e.onBoardCount,
                }),
                e.isGundam)
              )
                return;
              let t = new Map(e.cashOuts.map((n) => [n.refNo, n.odds]));
              t.has(Number(e7.getState().betLeftState.refNo)) &&
                (e7.getState().setBetLeftState({
                  isCashOut: !0,
                  cashOutOdds: t.get(Number(e7.getState().betLeftState.refNo)),
                }),
                e_.getState().setToast({
                  isOpen: !0,
                  message: n("Main_PopUp_CashOut"),
                  isSuccess: !0,
                }),
                (0, eT.sx)("cashOut_auto")),
                t.has(Number(e7.getState().betRightState.refNo)) &&
                  (e7.getState().setBetRightState({
                    isCashOut: !0,
                    cashOutOdds: t.get(
                      Number(e7.getState().betRightState.refNo)
                    ),
                  }),
                  e_.getState().setToast({
                    isOpen: !0,
                    message: n("Main_PopUp_CashOut"),
                    isSuccess: !0,
                  }),
                  (0, eT.sx)("cashOut_auto"));
            }),
            await e.start();
        };
      var tf = t(881);
      let tg = () => {
          let [n, e] = (0, x.useState)(!0),
            t = async (n) => {
              let e = await (0, ey.Z)(nt.A2.getState().lang, "common");
              nE.getState().setLeaveGame(!0),
                nE.getState().openDialog({
                  message: e(n),
                });
            };
          (0, x.useEffect)(() => {
            let i = () => {
              e(navigator.onLine);
            };
            return (
              n || t("Main_PopUp_Disconnected"),
              window.addEventListener("online", i),
              window.addEventListener("offline", i),
              () => {
                window.removeEventListener("online", i),
                  window.removeEventListener("offline", i);
              }
            );
          }, [n, e]);
        },
        { frontEndToggle: tb } = eO,
        t_ = (n) => {
          let e = !n.disableLeaveGameBtn || "false" === n.disableLeaveGameBtn,
            t =
              !n.disableLeaveGameBtnByRedirectUrlNotExisted ||
              "false" === n.disableLeaveGameBtnByRedirectUrlNotExisted,
            i = window.sessionStorage.getItem("redirectUrl");
          return t ? e : !("null" == i && i) && e;
        },
        ty = async () => {
          let n = await tb.getFrontEndToggle();
          if (0 === Number(n.returnCode)) {
            if (0 !== n.toggles.length) {
              let e = JSON.parse(n.toggles);
              nh.H.getState().setGameToggle({
                isEnableFunkyGameLogo:
                  !e.disableFunkyGameLogo || "false" === e.disableFunkyGameLogo,
                isEnableLeaveGameBtn: t_(e),
                isEnableRTP:
                  !e.disableRTPDisplay || "false" === e.disableRTPDisplay,
                isEnableCurrency:
                  !e.disableCurrencyDisplay ||
                  "false" === e.disableCurrencyDisplay,
                isEnableHistory:
                  !e.disableHistoryList || "false" === e.disableHistoryList,
                isEnableTutorial:
                  !e.disableTutorial || "false" === e.disableTutorial,
                isEnableChangePose:
                  !e.disableChangePose || "false" === e.disableChangePose,
                isEnableEnforcePortrait:
                  !e.enableEnforcePortrait ||
                  "true" === e.enableEnforcePortrait,
                isEnableEasterTheme:
                  e.enableEasterTheme && "true" === e.enableEasterTheme,
              });
            }
            nh.H.getState().setGameToggle({
              isInit: !0,
            });
          }
        },
        tw = (n) => {
          let e = tv(n);
          return {
            Main_GameName: "Main_".concat(e, "GameName"),
          };
        },
        tv = (n) => (n === to.l.oneXMidnightRobbery ? "OneXBet_" : "");
      var tj = t(4485);
      let tS = {
          Bet: "Main_ToolBar_Bet",
          CashOut: "Main_ToolBar_CashOut",
          Cancel: "Main_ToolBar_Cancel",
          Wait: "Main_ToolBar_Wait",
          StopAutoBet: "Main_ToolBar_StopAutoBet",
          BetForNextRound: "Main_ToolBar_BetForNextRound",
        },
        tk = (n) => {
          if (!n) return n;
          let e = n.toString().split("."),
            t = "";
          return (
            e.length > 1 &&
              e[1].length > 2 &&
              (t = "".concat(e[0], ".").concat(e[1].substring(0, 2))),
            "" === t ? Number(n) : t
          );
        },
        tP = (n, e, t) => (n > t ? t : n < e ? e : n || t);
      function tO() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-radius: 50px;\n  box-shadow: 1px 1px 0px 2px #000 inset;\n  padding: 3px;\n  margin: 5px 0;\n  width: 100%;\n\n  .cashOutText {\n    width: 60%;\n    text-align: center;\n    color: '#fff';\n  }\n",
        ]);
        return (
          (tO = function () {
            return n;
          }),
          n
        );
      }
      function tC() {
        let n = (0, f._)([
          "\n  width: 25%;\n  border-radius: 40px;\n  color: ",
          ";\n  background: linear-gradient(#444545, #0f0f0f);\n  padding: 1px 5px;\n  margin: 0 5px;\n  cursor: pointer;\n  text-align: center;\n  :lang(my) div {\n    padding-bottom: 5px;\n  }\n  :lang(vi) {\n    margin: 0px;\n    & > div {\n      white-space: nowrap;\n    }\n  }\n",
        ]);
        return (
          (tC = function () {
            return n;
          }),
          n
        );
      }
      function tz() {
        let n = (0, f._)([
          "\n  width: 50%;\n  height: 100%;\n  padding: 0 10px;\n",
        ]);
        return (
          (tz = function () {
            return n;
          }),
          n
        );
      }
      function tT() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n\n  & > div {\n    margin-left: 10px;\n  }\n",
        ]);
        return (
          (tT = function () {
            return n;
          }),
          n
        );
      }
      function tE() {
        let n = (0, f._)(["\n  margin: 3% 0;\n  opacity: ", ";\n"]);
        return (
          (tE = function () {
            return n;
          }),
          n
        );
      }
      function tM() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  font-size: 12px;\n  color: #80ff00;\n  .buttonClass :lang(hi) {\n    width: auto;\n  }\n  .buttonClass :lang(vi) {\n    width: auto;\n    -webkit-transform: scale(0.9);\n  }\n  .buttonClass :lang(pt-pt) {\n    width: auto;\n  }\n  .buttonClass :lang(pt-br) {\n    width: auto;\n  }\n  .buttonClass :lang(ja) {\n    width: auto;\n  }\n",
        ]);
        return (
          (tM = function () {
            return n;
          }),
          n
        );
      }
      function tN() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  font-size: 12px;\n  opacity: ",
          ";\n",
        ]);
        return (
          (tN = function () {
            return n;
          }),
          n
        );
      }
      function tB() {
        let n = (0, f._)([
          "\n  text-align: center;\n  white-space: nowrap;\n  color: #80ff00;\n",
        ]);
        return (
          (tB = function () {
            return n;
          }),
          n
        );
      }
      function tR() {
        let n = (0, f._)([
          "\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #121212;\n  opacity: 0.4;\n",
        ]);
        return (
          (tR = function () {
            return n;
          }),
          n
        );
      }
      function tA() {
        let n = (0, f._)([
          "\n  position: relative;\n  width: 100%;\n  height: calc(100% - 100px);\n",
        ]);
        return (
          (tA = function () {
            return n;
          }),
          n
        );
      }
      function tZ() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  width: 95%;\n  height: 56px;\n  border-radius: 8px;\n  background: ",
          ";\n  margin: 3% 0;\n  padding: 5% 0;\n  font-size: 18px;\n  text-align: center;\n  cursor: pointer;\n\n  & div.next {\n    font-size: 12px;\n    :lang(ru) {\n      margin-bottom: 5px;\n    }\n  }\n",
        ]);
        return (
          (tZ = function () {
            return n;
          }),
          n
        );
      }
      function tI() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.8);\n  border-radius: 8px;\n",
        ]);
        return (
          (tI = function () {
            return n;
          }),
          n
        );
      }
      function tL() {
        let n = (0, f._)([
          "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n",
        ]);
        return (
          (tL = function () {
            return n;
          }),
          n
        );
      }
      function tG() {
        let n = (0, f._)(["\n  color: #80ff00;\n  font-size: 12px;\n"]);
        return (
          (tG = function () {
            return n;
          }),
          n
        );
      }
      function tF() {
        let n = (0, f._)([
          "\n  border-style: none;\n  outline: none;\n  width: 50%;\n  font-size: 20px;\n  margin-top: 5px;\n  text-align: center;\n  color: #fff;\n  border-radius: 35px;\n  background-color: #5c5c5c;\n  user-select: initial;\n  /* Chrome, Safari, Edge, Opera */\n  &::-webkit-outer-spin-button,\n  &::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  /* Firefox */\n  &[type='number'] {\n    -moz-appearance: textfield;\n  }\n",
        ]);
        return (
          (tF = function () {
            return n;
          }),
          n
        );
      }
      let tD = g.ZP.div(tO()),
        tH = g.ZP.div(tC(), (n) => (n.checked ? "#fff" : "#5C5C5C")),
        tq = g.ZP.div(tz()),
        tU = g.ZP.div(tT()),
        tW = g.ZP.div(tE(), (n) => (n.disabled ? 0.45 : 1)),
        tY = g.ZP.div(tM()),
        tV = g.ZP.div(tN(), (n) => (n.disabled ? 0.45 : 1)),
        tX = g.ZP.div(tB()),
        tK = (n) => {
          switch (n) {
            case tS.Bet:
            case tS.BetForNextRound:
              return "linear-gradient(#96E33C, #6FA326)";
            case tS.Cancel:
            case tS.StopAutoBet:
              return "linear-gradient(#FE5563, #9A3A42)";
            case tS.CashOut:
              return "linear-gradient(#22D7F4, #06709A)";
            case tS.Wait:
              return "linear-gradient(#727374, #434444)";
            default:
              return "linear-gradient(#96E33C, #6FA326)";
          }
        };
      g.ZP.div(tR()), g.ZP.div(tA());
      let tJ = g.ZP.div(tZ(), (n) => tK(n.betBtnStatus)),
        tQ = g.ZP.div(tI()),
        t$ = g.ZP.div(tL()),
        t0 = g.ZP.div(tG()),
        t1 = g.ZP.input(tF());
      function t2() {
        let n = (0, f._)([
          "\n  0% { transform: rotate(0deg) }\n  100% { transform: rotate(360deg) }\n",
        ]);
        return (
          (t2 = function () {
            return n;
          }),
          n
        );
      }
      function t5() {
        let n = (0, f._)([
          "\n  border: 3px solid #555;\n  border-radius: 50%;\n  border-top: 3px solid #fff;\n  width: 30px;\n  height: 30px;\n  -webkit-animation: ",
          " 2s linear infinite; /* Safari */\n  animation: ",
          " 2s linear infinite;\n",
        ]);
        return (
          (t5 = function () {
            return n;
          }),
          n
        );
      }
      let t3 = (0, g.F4)(t2()),
        t4 = g.ZP.div(t5(), t3, t3);
      var t6 = () => (0, m.jsx)(t4, {}),
        t8 = t(4715);
      let t7 = () => {
          setTimeout(function () {
            let n =
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0;
            window.scrollTo(0, 0 - n);
          }, 100);
        },
        { placeOrder: t9, cashOut: ie } = eO,
        it = x.memo((n) => {
          let e,
            {
              isAutoplay: t,
              setIsAutoplay: r,
              betAmount: a,
              cashOutOdds: o,
              position: s,
              betState: l,
              setBetState: c,
              setIsBetSettingAvailable: d,
              isVisibility: u,
            } = n,
            { t: p } = (0, k.Z)("common"),
            { playerState: f, setPlayerState: g } = (0, nR.n)(),
            { openDialog: b } = nE(),
            [_, y] = eI(
              (n) => [n.gameState.liveGameId, n.gameState.gameStatus],
              tt.X
            ),
            [w, v] = (0, x.useState)(!1),
            [j, S] = (0, x.useState)(!1),
            [P, O] = (0, x.useState)(!1),
            [C, z] = (0, x.useState)(!0),
            [T, E] = (0, x.useState)(new Date().getTime());
          (0, x.useMemo)(() => {
            d((!j || l.isCashOut) && !P);
          }, [j, l.isCashOut, P]);
          let M = (0, x.useMemo)(() => {
              let n = tS.Wait;
              switch (y) {
                case h.CreateGame:
                  n = t ? tS.StopAutoBet : P ? tS.Cancel : tS.BetForNextRound;
                  break;
                case h.OpenBet:
                case h.OpeningBet:
                  n = t ? tS.StopAutoBet : j || P ? tS.Wait : tS.Bet;
                  break;
                case h.CloseBet:
                  n = t ? tS.StopAutoBet : tS.Wait;
                  break;
                case h.Drawing:
                  n = j
                    ? l.isCashOut
                      ? t
                        ? tS.StopAutoBet
                        : P
                        ? tS.Cancel
                        : tS.BetForNextRound
                      : tS.CashOut
                    : t
                    ? tS.StopAutoBet
                    : P
                    ? tS.Cancel
                    : tS.BetForNextRound;
                  break;
                case h.SettleGame:
                case h.SettleBet:
                  n = t ? tS.StopAutoBet : P ? tS.Cancel : tS.BetForNextRound;
              }
              return n;
            }, [y, t, j, P, l.isCashOut]),
            N = async () => {
              v(!0);
              let n = {
                  liveGameId: _,
                  refNo: l.refNo,
                },
                e = await ie.cashOut(n);
              0 === Number(e.returnCode)
                ? ((0, eT.sx)("cash out_manual_success"),
                  c({
                    cashOutOdds: e.odds,
                    isCashOut: !0,
                  }),
                  S(!1))
                : (0, eT.sx)("cash out_manual_fail"),
                v(!1);
            },
            B = async () => {
              var n;
              if (a > f.balance) {
                b({
                  message: p("Main_PopUp_ExceedBalance"),
                }),
                  r(!1);
                return;
              }
              let e = {
                betOptions: [
                  {
                    betOption:
                      null === (n = f.tableLimit[0]) || void 0 === n
                        ? void 0
                        : n.betOption,
                    stake: a,
                  },
                ],
                liveGameId: _,
                autoCashOutOdds: Number(o),
                voucherId: null,
              };
              (0, eT.sx)("bet_confirm_panel_" + s),
                v(!0),
                t
                  ? (0, eT.sx)("place_order_auto")
                  : (0, eT.sx)("place_order_manual");
              let l = await t9.placeOrder(e);
              v(!1),
                0 === Number(l.returnCode)
                  ? (c({
                      refNo: l.refNo,
                      stake: a,
                      autoCashOutOdds: Number(o),
                      isVoucher: !1,
                    }),
                    g({
                      balance: l.balance,
                      voucherInfo: l.voucherInfo,
                    }),
                    i.playExistedAudio("playJump", 0.6),
                    S(!0))
                  : r(!1);
            },
            R = async () => {
              switch (M) {
                case tS.Bet:
                  i.playExistedAudio("button", 0.3), await B();
                  break;
                case tS.CashOut:
                  await N();
                  break;
                case tS.StopAutoBet:
                  r(!1), (0, eT.sx)("stop_auto_play_btn");
                  break;
                case tS.BetForNextRound:
                  i.playExistedAudio("button", 0.3), O(!0);
                  break;
                case tS.Cancel:
                  O(!1);
              }
            },
            A = async () => {
              (P || t) && (!j && u && (await B()), O(!1));
            };
          return (
            (0, x.useMemo)(() => {
              y === h.OpenBet && A(), y === h.SettleGame && S(!1);
            }, [y]),
            (0, x.useEffect)(() => {
              if (t) E(new Date().getTime()), y !== h.OpeningBet || j || B();
              else {
                if (C) {
                  z(!1);
                  return;
                }
                let n = Math.floor((new Date().getTime() - T) / 1e3);
                (0, eT.x3)("auto_play_time", n);
              }
            }, [t]),
            (0, m.jsxs)(tJ, {
              betBtnStatus: M,
              onClick: R,
              children: [
                M === tS.BetForNextRound
                  ? (0, m.jsxs)("div", {
                      children: [
                        (0, m.jsx)("div", {
                          children: p("Main_ToolBar_Bet"),
                        }),
                        (0, m.jsx)("div", {
                          className: "next",
                          children: p("Main_ToolBar_BetForNextRound"),
                        }),
                      ],
                    })
                  : (0, m.jsx)("div", {
                      children: p(M),
                    }),
                w &&
                  (0, m.jsx)(tQ, {
                    children: (0, m.jsx)(t6, {}),
                  }),
              ],
            })
          );
        }),
        ii = x.memo((n) => {
          let { isAutoplay: e, setIsAutoplay: t } = n,
            { t: i } = (0, k.Z)("common");
          return (
            !1 === e
              ? (0, eT.sx)("stop_auto_play_toggle")
              : e && (0, eT.sx)("confirm_auto_play"),
            (0, m.jsxs)(tU, {
              children: [
                (0, m.jsxs)("div", {
                  children: [" ", i("Main_ToolBar_AutoPlay")],
                }),
                (0, m.jsx)(n6, {
                  checked: e,
                  setChecked: t,
                }),
              ],
            })
          );
        }),
        ir = x.memo((n) => {
          let { betAmount: e, setBetAmount: t, isBetSettingAvailable: i } = n,
            { playerState: r } = (0, nR.n)(),
            { t: a } = (0, k.Z)("common"),
            [o, s] = (0, x.useState)(!0),
            [l, c] = (0, x.useState)(!1);
          (0, x.useMemo)(() => {
            if (r.defaultChip) {
              t(r.defaultChip);
              let n = r.chips.indexOf(r.defaultChip);
              n > 0 && (c(!0), n >= r.chips.length - 1 && s(!1));
            }
          }, [r.defaultChip]);
          let d = function () {
            let n =
              !(arguments.length > 0) ||
              void 0 === arguments[0] ||
              arguments[0];
            return n && i;
          };
          return (0, m.jsxs)(tW, {
            disabled: !d(),
            children: [
              (0, m.jsxs)(tY, {
                children: [
                  a("Main_ToolBar_BetAmount"),
                  (0, m.jsx)(tH, {
                    className: "buttonClass",
                    checked: d(l),
                    onClick: () => {
                      d(l) &&
                        (c(!1),
                        s(!0),
                        t(r.chips[0]),
                        (0, eT.sx)("bet_amount_min"));
                    },
                    children: (0, m.jsx)("div", {
                      children: a("Main_ToolBar_Min"),
                    }),
                  }),
                  (0, m.jsx)(tH, {
                    className: "buttonClass",
                    checked: d(o),
                    onClick: () => {
                      d(o) &&
                        (s(!1),
                        c(!0),
                        t(r.chips[r.chips.length - 1]),
                        (0, eT.sx)("bet_amount_max"));
                    },
                    children: (0, m.jsx)("div", {
                      children: a("Main_ToolBar_Max"),
                    }),
                  }),
                ],
              }),
              (0, m.jsxs)(tD, {
                children: [
                  (0, m.jsx)(tH, {
                    checked: d(l),
                    onClick: () => {
                      if (d(l)) {
                        (0, eT.sx)("bet_amount_minus");
                        let n = r.chips.indexOf(e);
                        n > 0 && (s(!0), t(r.chips[n - 1])),
                          n - 1 <= 0 && c(!1);
                      }
                    },
                    children: "-",
                  }),
                  (0, m.jsx)("div", {
                    children: (0, nt.Io)(e),
                  }),
                  (0, m.jsx)(tH, {
                    checked: d(o),
                    onClick: () => {
                      if (d(o)) {
                        (0, eT.sx)("bet_amount_add");
                        let n = r.chips.indexOf(e);
                        n < r.chips.length - 1 && (c(!0), t(r.chips[n + 1])),
                          n + 1 >= r.chips.length - 1 && s(!1);
                      }
                    },
                    children: "+",
                  }),
                ],
              }),
            ],
          });
        }),
        ia = x.memo((n) => {
          let {
              cashOutOdds: e,
              setCashOutOdds: t,
              isBetSettingAvailable: i,
            } = n,
            { playerState: r } = (0, nR.n)(),
            { t: a } = (0, k.Z)("common"),
            [o, s] = (0, x.useState)(!1),
            [l, c] = (0, x.useState)(!1),
            [d, u] = (0, x.useState)(!0);
          (0, x.useMemo)(() => {
            o && t("");
          }, [o]);
          let p = function () {
              let n =
                !(arguments.length > 0) ||
                void 0 === arguments[0] ||
                arguments[0];
              return n && i;
            },
            h = (n) => {
              t(n),
                n >= r.cashOutMax
                  ? (u(!0), c(!1))
                  : (n <= r.cashOutMin ? u(!1) : u(!0), c(!0));
            };
          return (0, m.jsxs)(m.Fragment, {
            children: [
              (0, m.jsxs)(tV, {
                disabled: !p(),
                children: [
                  (0, m.jsx)("div", {
                    children: (0, m.jsx)(tX, {
                      children: (0, m.jsx)(t8.Z, {
                        i18nKey: "common:Main_ToolBar_AutoCashOut",
                        components: [(0, m.jsx)("br", {}, 1)],
                      }),
                    }),
                  }),
                  (0, m.jsxs)(tD, {
                    children: [
                      (0, m.jsx)(tH, {
                        checked: p(d),
                        onClick: () => {
                          p(d) &&
                            (h(
                              tP(
                                Number(tk(Number(e) / 2)),
                                r.cashOutMin,
                                r.cashOutMax
                              )
                            ),
                            (0, eT.sx)("auto_cash out_halve"));
                        },
                        children: "1/2",
                      }),
                      (0, m.jsx)("div", {
                        className: "cashOutText",
                        onClick: () => {
                          p() && s(!0);
                        },
                        children: e,
                      }),
                      (0, m.jsx)(tH, {
                        checked: p(l),
                        onClick: () => {
                          p(l) &&
                            h(
                              tP(
                                Number(tk(2 * Number(e))),
                                r.cashOutMin,
                                r.cashOutMax
                              )
                            );
                        },
                        children: "2x",
                      }),
                    ],
                  }),
                ],
              }),
              (0, m.jsx)(nw, {
                open: o,
                zIndex: 6,
                position: "fixed",
                onClose: () => {
                  s(!1);
                },
                children: (0, m.jsxs)(t$, {
                  children: [
                    (0, m.jsx)(t0, {
                      children: a("Main_ToolBar_CashOut"),
                    }),
                    (0, m.jsx)(t1, {
                      inputMode: "decimal",
                      type: "number",
                      onBlur: () => {
                        h(tP(Number(e), r.cashOutMin, r.cashOutMax)),
                          s(!1),
                          t7();
                      },
                      onKeyDown: (n) => {
                        "Enter" === n.key &&
                          (s(!1), h(tP(Number(e), r.cashOutMin, r.cashOutMax)));
                      },
                      autoFocus: o,
                      value: e,
                      onChange: (n) => {
                        (0, eT.sx)("auto_cash out_enter"),
                          t(tk(n.target.value));
                      },
                    }),
                  ],
                }),
              }),
            ],
          });
        });
      var io = x.memo((n) => {
        let {
            position: e,
            isVisibility: t,
            betState: i,
            isAutoplay: r,
            setBetState: a,
            setIsAutoplay: o,
          } = n,
          [s, l] = (0, x.useState)(!0),
          [c, d] = (0, x.useState)(150),
          [u, p] = (0, x.useState)(0);
        return (0, m.jsx)(m.Fragment, {
          children: (0, m.jsxs)(tq, {
            children: [
              (0, m.jsx)(ii, {
                isAutoplay: r,
                setIsAutoplay: o,
              }),
              (0, m.jsx)(ir, {
                betAmount: u,
                setBetAmount: p,
                isBetSettingAvailable: s,
              }),
              (0, m.jsx)(ia, {
                cashOutOdds: c,
                setCashOutOdds: d,
                isBetSettingAvailable: s,
              }),
              (0, m.jsx)(it, {
                isAutoplay: r,
                setIsAutoplay: o,
                betAmount: u,
                cashOutOdds: c,
                position: e,
                betState: i,
                setBetState: a,
                setIsBetSettingAvailable: l,
                isVisibility: t,
              }),
            ],
          }),
        });
      });
      function is() {
        let n = (0, f._)([
          "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  width: 45%;\n",
        ]);
        return (
          (is = function () {
            return n;
          }),
          n
        );
      }
      function il() {
        let n = (0, f._)([
          "\n  position: relative;\n  width: 100%;\n  margin: 3% 0;\n  opacity: ",
          ";\n",
        ]);
        return (
          (il = function () {
            return n;
          }),
          n
        );
      }
      function ic() {
        let n = (0, f._)([
          "\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 20px;\n  margin: auto 0;\n",
        ]);
        return (
          (ic = function () {
            return n;
          }),
          n
        );
      }
      function id() {
        let n = (0, f._)([
          "\n  position: relative;\n  bottom: 5px;\n  background-color: #342b61;\n  color: #c8bb93;\n  font-size: 12px;\n  text-align: center;\n",
        ]);
        return (
          (id = function () {
            return n;
          }),
          n
        );
      }
      function iu() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  font-size: 12px;\n  color: #80ff00;\n",
        ]);
        return (
          (iu = function () {
            return n;
          }),
          n
        );
      }
      function ip() {
        let n = (0, f._)([
          "\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: ",
          ";\n  border-radius: 50px;\n  box-shadow: 1px 1px 0px 2px #000 inset;\n  padding: 3px;\n  margin: 5px 0;\n  width: 100%;\n\n  .cashOutText {\n    width: 60%;\n    text-align: center;\n    color: '#fff';\n  }\n",
        ]);
        return (
          (ip = function () {
            return n;
          }),
          n
        );
      }
      function ih() {
        let n = (0, f._)([
          "\n  width: 25%;\n  border-radius: 40px;\n  color: ",
          ";\n  background: linear-gradient(#444545, #0f0f0f);\n  padding: 1px 5px;\n  margin: 0 5px;\n  cursor: pointer;\n  text-align: center;\n",
        ]);
        return (
          (ih = function () {
            return n;
          }),
          n
        );
      }
      function im() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  width: 100%;\n  font-size: 12px;\n  opacity: ",
          ";\n  margin: 5% 0;\n",
        ]);
        return (
          (im = function () {
            return n;
          }),
          n
        );
      }
      function ix() {
        let n = (0, f._)([
          "\n  text-align: center;\n  white-space: nowrap;\n  color: #80ff00;\n",
        ]);
        return (
          (ix = function () {
            return n;
          }),
          n
        );
      }
      function ig() {
        let n = (0, f._)([
          "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n",
        ]);
        return (
          (ig = function () {
            return n;
          }),
          n
        );
      }
      function ib() {
        let n = (0, f._)(["\n  color: #80ff00;\n  font-size: 12px;\n"]);
        return (
          (ib = function () {
            return n;
          }),
          n
        );
      }
      function i_() {
        let n = (0, f._)([
          "\n  border-style: none;\n  outline: none;\n  width: 50%;\n  font-size: 20px;\n  margin-top: 5px;\n  text-align: center;\n  color: #fff;\n  border-radius: 35px;\n  background-color: #5c5c5c;\n  user-select: initial;\n  /* Chrome, Safari, Edge, Opera */\n  &::-webkit-outer-spin-button,\n  &::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  /* Firefox */\n  &[type='number'] {\n    -moz-appearance: textfield;\n  }\n",
        ]);
        return (
          (i_ = function () {
            return n;
          }),
          n
        );
      }
      function iy() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  width: 95%;\n  height: 56px;\n  border-radius: 8px;\n  background: ",
          ";\n  margin: 3% 0;\n  padding: 5% 0;\n  font-size: 18px;\n  text-align: center;\n  cursor: pointer;\n\n  & div.next {\n    font-size: 12px;\n  }\n",
        ]);
        return (
          (iy = function () {
            return n;
          }),
          n
        );
      }
      function iw() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.8);\n  border-radius: 8px;\n",
        ]);
        return (
          (iw = function () {
            return n;
          }),
          n
        );
      }
      let iv = g.ZP.div(is()),
        ij = g.ZP.div(il(), (n) => (n.disabled ? 0.45 : 1)),
        iS = g.ZP.div(ic()),
        ik = g.ZP.div(id()),
        iP = g.ZP.div(iu()),
        iO = g.ZP.div(ip(), (n) => (n.isCenter ? "center" : "space-between")),
        iC = g.ZP.div(ih(), (n) => (n.checked ? "#fff" : "#5C5C5C")),
        iz = g.ZP.div(im(), (n) => (n.disabled ? 0.45 : 1)),
        iT = g.ZP.div(ix()),
        iE = g.ZP.div(ig()),
        iM = g.ZP.div(ib()),
        iN = g.ZP.input(i_()),
        iB = (n) => {
          switch (n) {
            case tS.Bet:
            case tS.BetForNextRound:
              return "linear-gradient(#96E33C, #6FA326)";
            case tS.Cancel:
            case tS.StopAutoBet:
              return "linear-gradient(#FE5563, #9A3A42)";
            case tS.CashOut:
              return "linear-gradient(#22D7F4, #06709A)";
            case tS.Wait:
              return "linear-gradient(#727374, #434444)";
            default:
              return "linear-gradient(#96E33C, #6FA326)";
          }
        },
        iR = g.ZP.div(iy(), (n) => iB(n.betBtnStatus)),
        iA = g.ZP.div(iw());
      var iZ = {
        src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/icon_voucher.e43af3be.png",
      };
      let { placeOrder: iI, cashOut: iL } = eO,
        iG = (0, x.memo)((n) => {
          let { betAmount: e, setBetAmount: t, isBetSettingAvailable: i } = n,
            [r] = (0, nR.n)((n) => [n.playerState.voucherInfo], tt.X),
            { t: a } = (0, k.Z)("common");
          return (
            (0, x.useMemo)(() => {
              r && t(r.fixedStake);
            }, [r]),
            (0, m.jsxs)(ij, {
              disabled: !(function () {
                let n =
                  !(arguments.length > 0) ||
                  void 0 === arguments[0] ||
                  arguments[0];
                return n && i;
              })(),
              children: [
                (0, m.jsx)(iP, {
                  children: a("Main_ToolBar_BetAmount"),
                }),
                (0, m.jsxs)(iO, {
                  isCenter: !0,
                  children: [
                    (0, m.jsxs)(iS, {
                      children: [
                        (0, m.jsx)(S(), {
                          src: iZ.src,
                          width: "25",
                          height: "25",
                          alt: "setting",
                        }),
                        (0, m.jsx)(ik, {
                          children: null === r ? 0 : r.amount,
                        }),
                      ],
                    }),
                    (0, m.jsx)("div", {
                      children: e,
                    }),
                  ],
                }),
              ],
            })
          );
        }),
        iF = (0, x.memo)((n) => {
          let {
              cashOutOdds: e,
              setCashOutOdds: t,
              isBetSettingAvailable: i,
            } = n,
            { playerState: r } = (0, nR.n)(),
            { t: a } = (0, k.Z)("common"),
            [o, s] = (0, x.useState)(!1),
            [l, c] = (0, x.useState)(!1),
            [d, u] = (0, x.useState)(!0);
          (0, x.useMemo)(() => {
            o && t("");
          }, [o]);
          let p = function () {
              let n =
                !(arguments.length > 0) ||
                void 0 === arguments[0] ||
                arguments[0];
              return n && i;
            },
            h = (n) => {
              t(n),
                n >= r.cashOutMax
                  ? (u(!0), c(!1))
                  : (n <= r.cashOutMin ? u(!1) : u(!0), c(!0));
            };
          return (0, m.jsxs)(m.Fragment, {
            children: [
              (0, m.jsxs)(iz, {
                disabled: !p(),
                children: [
                  (0, m.jsx)("div", {
                    children: (0, m.jsx)(iT, {
                      children: (0, m.jsx)(t8.Z, {
                        i18nKey: "common:Main_ToolBar_AutoCashOut",
                        components: [(0, m.jsx)("br", {}, 1)],
                      }),
                    }),
                  }),
                  (0, m.jsxs)(iO, {
                    isCenter: !1,
                    children: [
                      (0, m.jsx)(iC, {
                        checked: p(d),
                        onClick: () => {
                          p() &&
                            (h(
                              tP(
                                Number(tk(Number(e) / 2)),
                                r.cashOutMin,
                                r.cashOutMax
                              )
                            ),
                            (0, eT.sx)("auto_cash out_halve"));
                        },
                        children: "1/2",
                      }),
                      (0, m.jsx)("div", {
                        className: "cashOutText",
                        onClick: () => {
                          p() && s(!0);
                        },
                        children: e,
                      }),
                      (0, m.jsx)(iC, {
                        checked: p(l),
                        onClick: () => {
                          p() &&
                            (h(
                              tP(
                                Number(tk(2 * Number(e))),
                                r.cashOutMin,
                                r.cashOutMax
                              )
                            ),
                            (0, eT.sx)("auto_cash out_double"));
                        },
                        children: "2x",
                      }),
                    ],
                  }),
                ],
              }),
              (0, m.jsx)(nw, {
                open: o,
                zIndex: 6,
                position: "fixed",
                onClose: () => {
                  s(!1);
                },
                children: (0, m.jsxs)(iE, {
                  children: [
                    (0, m.jsx)(iM, {
                      children: a("Main_ToolBar_CashOut"),
                    }),
                    (0, m.jsx)(iN, {
                      inputMode: "decimal",
                      type: "number",
                      onBlur: () => {
                        h(tP(Number(e), r.cashOutMin, r.cashOutMax)),
                          s(!1),
                          t7();
                      },
                      onKeyDown: (n) => {
                        "Enter" === n.key &&
                          (s(!1), h(tP(Number(e), r.cashOutMin, r.cashOutMax)));
                      },
                      autoFocus: o,
                      value: e,
                      onChange: (n) => {
                        (0, eT.sx)("auto_cash out_enter"),
                          t(tk(n.target.value));
                      },
                    }),
                  ],
                }),
              }),
            ],
          });
        }),
        iD = (0, x.memo)((n) => {
          let e,
            {
              betAmount: t,
              cashOutOdds: r,
              position: a,
              betState: o,
              setBetState: s,
              setIsBetSettingAvailable: l,
            } = n,
            { t: c } = (0, k.Z)("common"),
            { playerState: d, setPlayerState: u } = (0, nR.n)(),
            [p, f] = eI(
              (n) => [n.gameState.liveGameId, n.gameState.gameStatus],
              tt.X
            ),
            [g, b] = (0, x.useState)(!1),
            [_, y] = (0, x.useState)(!1);
          (0, x.useMemo)(() => {
            l(!_ || o.isCashOut);
          }, [_, o.isCashOut]);
          let w = (0, x.useMemo)(() => {
              let n = tS.Wait;
              switch (f) {
                case h.OpenBet:
                case h.OpeningBet:
                  n = _ ? tS.Wait : tS.Bet;
                  break;
                case h.Drawing:
                  _ ? o.isCashOut || (n = tS.CashOut) : (n = tS.Wait);
                  break;
                case h.CreateGame:
                case h.CloseBet:
                case h.SettleGame:
                case h.SettleBet:
                  n = tS.Wait;
              }
              return n;
            }, [f, _, o]),
            v = async () => {
              b(!0);
              let n = {
                  liveGameId: p,
                  refNo: o.refNo,
                },
                e = await iL.cashOut(n);
              0 === Number(e.returnCode)
                ? ((0, eT.sx)("cash out_manual_success"),
                  s({
                    cashOutOdds: e.odds,
                    isCashOut: !0,
                  }),
                  y(!1))
                : (0, eT.sx)("cash out_manual_fail"),
                b(!1);
            },
            j = async () => {
              var n, e;
              let o = {
                betOptions: [
                  {
                    betOption:
                      null === (n = d.tableLimit[0]) || void 0 === n
                        ? void 0
                        : n.betOption,
                    stake: t,
                  },
                ],
                liveGameId: p,
                autoCashOutOdds: Number(r),
                voucherId:
                  null === (e = d.voucherInfo) || void 0 === e
                    ? void 0
                    : e.voucherId,
              };
              (0, eT.sx)("bet_confirm_panel_" + a), b(!0);
              let l = await iI.placeOrder(o);
              b(!1),
                0 === Number(l.returnCode) &&
                  (s({
                    refNo: l.refNo,
                    stake: t,
                    autoCashOutOdds: Number(r),
                    isVoucher: !0,
                  }),
                  u({
                    balance: l.balance,
                    voucherInfo: l.voucherInfo,
                  }),
                  i.playExistedAudio("playJump", 0.1),
                  y(!0));
            },
            S = async () => {
              switch (w) {
                case tS.Bet:
                  i.playExistedAudio("button", 0.3), await j();
                  break;
                case tS.CashOut:
                  await v();
              }
            };
          return (
            (0, x.useMemo)(() => {
              f === h.SettleGame && y(!1);
            }, [f]),
            (0, m.jsxs)(iR, {
              betBtnStatus: w,
              onClick: S,
              children: [
                w === tS.BetForNextRound
                  ? (0, m.jsxs)("div", {
                      children: [
                        (0, m.jsx)("div", {
                          children: c("Main_ToolBar_Bet"),
                        }),
                        (0, m.jsx)("div", {
                          className: "next",
                          children: c("Main_ToolBar_BetForNextRound"),
                        }),
                      ],
                    })
                  : (0, m.jsx)("div", {
                      children: c(w),
                    }),
                g &&
                  (0, m.jsx)(iA, {
                    children: (0, m.jsx)(t6, {}),
                  }),
              ],
            })
          );
        });
      var iH = (0, x.memo)((n) => {
          let { position: e, isVisibility: t, betState: i, setBetState: r } = n,
            [a, o] = (0, x.useState)(!0),
            [s, l] = (0, x.useState)(),
            [c, d] = (0, x.useState)(150);
          return (0, m.jsxs)(iv, {
            children: [
              (0, m.jsx)(iG, {
                betAmount: s,
                setBetAmount: l,
                isBetSettingAvailable: a,
              }),
              (0, m.jsx)(iF, {
                cashOutOdds: c,
                setCashOutOdds: d,
                isBetSettingAvailable: a,
              }),
              (0, m.jsx)(iD, {
                betAmount: s,
                cashOutOdds: c,
                position: e,
                betState: i,
                setBetState: r,
                setIsBetSettingAvailable: o,
              }),
            ],
          });
        }),
        iq = t(8876),
        iU = t.n(iq);
      function iW() {
        let n = (0, f._)([
          "\n  0% { top: -40%; }\n  50% { top: -45%; }\n  100% { top: -40%; }\n",
        ]);
        return (
          (iW = function () {
            return n;
          }),
          n
        );
      }
      function iY() {
        let n = (0, f._)([
          "\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 214px;\n  background-color: #212121;\n",
        ]);
        return (
          (iY = function () {
            return n;
          }),
          n
        );
      }
      function iV() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n",
        ]);
        return (
          (iV = function () {
            return n;
          }),
          n
        );
      }
      function iX() {
        let n = (0, f._)([
          "\n  position: absolute;\n  top: -40%;\n  right: 0;\n  left: 0;\n  width: 70%;\n  font-size: 9px;\n  margin: 0 auto;\n  color: #fff;\n  background-color: #342b61;\n  border: 1px solid #c8bb93;\n  border-radius: 10px;\n  padding: 5px 10px;\n  animation: ",
          " 1s;\n  animation-iteration-count: infinite;\n  -webkit-font-smoothing: subpixel-antialiased;\n  -webkit-transform: translateZ(0) scale(1, 1);\n\n  & > div {\n    width: max-content;\n    margin: 0 auto;\n  }\n",
        ]);
        return (
          (iX = function () {
            return n;
          }),
          n
        );
      }
      function iK() {
        let n = (0, f._)([
          "\n  font-size: 15px;\n  color: #c8bb93;\n  font-weight: 500;\n  text-align: center;\n",
        ]);
        return (
          (iK = function () {
            return n;
          }),
          n
        );
      }
      function iJ() {
        let n = (0, f._)([
          "\n  position: absolute;\n  bottom: -40px;\n  right: 0;\n  left: 0;\n",
        ]);
        return (
          (iJ = function () {
            return n;
          }),
          n
        );
      }
      function iQ() {
        let n = (0, f._)([
          "\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  cursor: pointer;\n",
        ]);
        return (
          (iQ = function () {
            return n;
          }),
          n
        );
      }
      let i$ = (0, g.F4)(iW()),
        i0 = g.ZP.div(iY()),
        i1 = g.ZP.div(iV()),
        i2 = g.ZP.div(iX(), i$),
        i5 = g.ZP.div(iK()),
        i3 = g.ZP.div(iJ()),
        i4 = g.ZP.div(iQ());
      var i6 = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/point_voucher.17a0230f.png",
        },
        i8 = t(5775),
        i7 = (0, x.memo)(() => {
          let { t: n } = (0, k.Z)("common"),
            [e, t] = (0, x.useState)(!0),
            [i, r] = (0, x.useState)(!0),
            [a, o] = (0, nR.n)(
              (n) => [
                n.playerState.voucherInfo,
                n.playerState.showVoucherPanel,
              ],
              tt.X
            ),
            [s, l, c, d, u, p, h, f] = e7((n) => [
              n.betLeftState,
              n.betRightState,
              n.betLeftState.isAutoPlay,
              n.betRightState.isAutoPlay,
              n.setBetLeftState,
              n.setBetRightState,
              n.setIsAutoPlayLeftState,
              n.setIsAutoPlayRightState,
            ]);
          return (
            window.addEventListener("message", function (n) {
              var e = n.data;
              "stopAutoplay" === e.name &&
                "emwindow" === e.sender &&
                (h(!1), f(!1));
            }),
            window.addEventListener("visibilitychange", () => {
              switch (document.visibilityState) {
                case "hidden":
                  r(!1);
                  break;
                case "visible":
                  r(!0);
              }
            }),
            (0, m.jsx)(i0, {
              children: o
                ? (0, m.jsxs)(m.Fragment, {
                    children: [
                      e &&
                        (0, m.jsxs)(i2, {
                          children: [
                            (0, m.jsx)(i5, {
                              children: n("Voucher_HowToUse"),
                            }),
                            (0, m.jsxs)("div", {
                              children: [
                                (0, m.jsxs)("div", {
                                  children: ["1. ", n("Voucher_PlayOn")],
                                }),
                                (0, m.jsxs)("div", {
                                  children: [
                                    "2. ",
                                    n("Voucher_ExpireDate"),
                                    " ",
                                    iU()(
                                      null == a ? void 0 : a.expireDate
                                    ).format("YYYY-MM-DD"),
                                    " (UTC)",
                                  ],
                                }),
                              ],
                            }),
                            (0, m.jsx)(i3, {
                              children: (0, m.jsx)(S(), {
                                src: i6.src,
                                width: "25",
                                height: "25",
                                alt: "setting",
                              }),
                            }),
                            (0, m.jsx)(i4, {
                              onClick: () => t(!1),
                              children: (0, m.jsx)(S(), {
                                width: "10",
                                height: "10",
                                src: i8.Z,
                                alt: "close",
                              }),
                            }),
                          ],
                        }),
                      (0, m.jsx)(i1, {
                        children: (0, m.jsx)(iH, {
                          position: "left",
                          betState: s,
                          setBetState: u,
                          isVisibility: i,
                          isAutoplay: !1,
                          setIsAutoplay: () => void 0,
                        }),
                      }),
                    ],
                  })
                : (0, m.jsxs)(i1, {
                    children: [
                      (0, m.jsx)(io, {
                        position: "left",
                        betState: s,
                        setBetState: u,
                        isVisibility: i,
                        isAutoplay: c,
                        setIsAutoplay: h,
                      }),
                      (0, m.jsx)(io, {
                        position: "right",
                        betState: l,
                        setBetState: p,
                        isVisibility: i,
                        isAutoplay: d,
                        setIsAutoplay: f,
                      }),
                    ],
                  }),
            })
          );
        }),
        i9 = t(8033),
        rn = t.n(i9),
        re = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/default_avatar.b25bf268.png",
        },
        rt = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/my_avatar.5f06daac.png",
        },
        ri = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/my_avatar2.47b370f7.svg",
        },
        rr = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/car_wait_01.c402c43c.svg",
        },
        ra =
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/me_arrow.2a2a0f75.svg",
        ro =
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/fire_01.8440f2f0.svg",
        rs =
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/fire_05.ca5a5437.svg",
        rl = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/car_stop.3e0d9e70.png",
        },
        rc = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/car_stop.4f6f65f5.png",
        },
        rd = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/policeCar_01.4ba20f50.png",
        },
        ru = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/policeCar_02.218d1f65.png",
        },
        rp = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/policeCar_01F.50d663f3.png",
        },
        rh = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/policeCar_02F.07178f07.png",
        },
        rm = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/car_wait_01.8f362403.svg",
        },
        rx = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/car_wait_02.432d0e69.svg",
        },
        rf = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/car_wait_01.21fd932c.svg",
        },
        rg = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/car_stop.7456ad65.png",
        };
      function rb() {
        let n = (0, f._)([
          "\n    0%{\n      opacity: 1;\n    }\n    50%{\n      opacity: 0;\n    }\n    100%{\n      opacity: 1;\n    }\n",
        ]);
        return (
          (rb = function () {
            return n;
          }),
          n
        );
      }
      function r_() {
        let n = (0, f._)([
          "\n  0%{left:-300px;}\n  5%{left:20px;}\n  95%{left:20px;}\n  100%{left:-300px;}\n",
        ]);
        return (
          (r_ = function () {
            return n;
          }),
          n
        );
      }
      function ry() {
        let n = (0, f._)([
          "\n    from{\n      bottom: 0%;\n    }\n    to{\n      bottom: 5%;\n    }\n",
        ]);
        return (
          (ry = function () {
            return n;
          }),
          n
        );
      }
      function rw() {
        let n = (0, f._)([
          "\n    from{\n      bottom: 19%;\n      transform: scale(0.8);\n    }\n    to{\n      bottom: 5%;\n      transform: scale(1);\n    }\n",
        ]);
        return (
          (rw = function () {
            return n;
          }),
          n
        );
      }
      function rv() {
        let n = (0, f._)([
          "\n  from{\n    bottom: 10%;\n    transform: scale(0.8);\n  }\n  to{\n    bottom: -5%;\n    transform: scale(1);\n  }\n",
        ]);
        return (
          (rv = function () {
            return n;
          }),
          n
        );
      }
      function rj() {
        let n = (0, f._)(["\n    to { background-position: -1763px 0; }\n"]);
        return (
          (rj = function () {
            return n;
          }),
          n
        );
      }
      function rS() {
        let n = (0, f._)([
          "\n    0%{\n      bottom: 27px;\n    }\n    50%{\n      bottom: 30px;\n    }\n    100%{\n      bottom: 27px;\n    }\n",
        ]);
        return (
          (rS = function () {
            return n;
          }),
          n
        );
      }
      function rk() {
        let n = (0, f._)([
          "\n  0%{\n    bottom:15%;\n    right: 202px;\n    transform: scale(0.9);\n    opacity: 0;\n  }\n  \n  20%{\n    bottom:15%;\n    right: 202px;\n    transform: scale(0.9);\n    opacity: 0;\n  }\n  \n  100%{\n    bottom: 10%;\n    right: 220px;\n    transform: scale(1);\n    opacity: 1;\n  }\n",
        ]);
        return (
          (rk = function () {
            return n;
          }),
          n
        );
      }
      function rP() {
        let n = (0, f._)([
          "\n  0%{\n    bottom: 15%;\n    left: 270px;\n    transform: scale(0.9);\n    opacity: 0;\n  }\n  20%{\n    bottom: 15%;\n    left: 270px;\n    transform: scale(0.9);\n    opacity: 0;\n  }\n  100%{\n    bottom: 10%;\n    left: 250px;\n    transform: scale(1);\n    opacity: 1;\n  }\n",
        ]);
        return (
          (rP = function () {
            return n;
          }),
          n
        );
      }
      function rO() {
        let n = (0, f._)([
          "\n  0%{\n    opacity: 0;\n  }\n  50%{\n    opacity: 1;\n  }\n  100%{\n    opacity: 0;\n  }\n",
        ]);
        return (
          (rO = function () {
            return n;
          }),
          n
        );
      }
      function rC() {
        let n = (0, f._)([
          "\n    0%{\n      right: -90px;\n      bottom: 20px;\n      transform:rotate(-3deg);\n      transform: scaleY(0.9);\n    }\n    10%{\n      right: 0px;\n      bottom: 70px;\n      transform:rotate(9deg);\n      transform: scaleY(1.1);\n    }\n    20%{\n      right: 30px;\n      bottom: 20px;\n      transform:rotate(-3deg);\n      transform: scaleY(0.9);\n    }\n    30%{\n      right: 60px;\n      bottom: 70px;\n      transform:rotate(9deg);\n      transform: scaleY(1.1);\n    }\n    40%{\n      right: 90px;\n      bottom: 20px;\n      transform:rotate(-3deg);\n      transform: scaleY(0.9);\n    }\n    50%{\n      right: 120px;\n      bottom: 70px;\n      transform:rotate(9deg);\n      transform: scaleY(1.1);\n    }\n    60%{\n      right: 150px;\n      bottom: 200px;\n      transform:rotate(-3deg);\n      transform: scaleY(0.9);\n    }\n    70%{\n      right: 170px;\n      bottom: 150px;\n      transform:rotate(9deg);\n      transform: scaleY(1.1);\n    }\n\n    90%{\n      right: 200px;\n      bottom: 100px;\n      transform:rotate(1deg);\n      transform: scale(1.3);\n      opacity: 0;\n    }\n    100%{\n      right: 200px;\n      bottom: 90px;\n      transform: scale(1.3);\n      opacity: 0;\n    } \n",
        ]);
        return (
          (rC = function () {
            return n;
          }),
          n
        );
      }
      function rz() {
        let n = (0, f._)([
          "\n0%{\n      left: -90px;\n      bottom: 20px;\n      transform:rotate(3deg);\n      transform: scaleY(0.9);\n    }\n    10%{\n      left: 0px;\n      bottom: 70px;\n      transform:rotate(-9deg);\n      transform: scaleY(1.1);\n    }\n    20%{\n      left: 30px;\n      bottom: 20px;\n      transform:rotate(3deg);\n      transform: scaleY(0.9);\n    }\n    30%{\n      left: 60px;\n      bottom: 70px;\n      transform:rotate(-9deg);\n      transform: scaleY(1.1);\n    }\n    40%{\n      left: 90px;\n      bottom: 20px;\n      transform:rotate(3deg);\n      transform: scaleY(0.9);\n    }\n    50%{\n      left: 120px;\n      bottom: 70px;\n      transform:rotate(-9deg);\n      transform: scaleY(1.1);\n    }\n    60%{\n      left: 150px;\n      bottom: 200px;\n      transform:rotate(3deg);\n      transform: scaleY(0.9);\n    }\n    70%{\n      left: 170px;\n      bottom: 150px;\n      transform:rotate(-9deg);\n      transform: scaleY(1.1);\n    }\n    90%{\n      left: 200px;\n      bottom: 100px;\n      transform:rotate(1deg);\n      transform: scale(1.3);\n      opacity: 0;\n    }\n    100%{\n      left: 200px;\n      bottom: 90px;\n      transform: scale(1.3);\n      opacity: 0;\n    } \n",
        ]);
        return (
          (rz = function () {
            return n;
          }),
          n
        );
      }
      function rT() {
        let n = (0, f._)([
          "\n    0%{\n      transform-origin:bottom;\n      transform: scaleY(0.5);\n      opacity: 0;\n    }\n    80%{\n      transform-origin:bottom;\n      transform: scaleY(0.5);\n      opacity: 0;\n    }\n\n    85%{\n      transform-origin:bottom;\n      transform: scaleY(0.5);\n      opacity: 1;\n    }\n    90%{\n      transform-origin:bottom;\n      transform: scaleY(1);\n      opacity: 1;\n    }\n    94%{\n      transform-origin:bottom;\n      transform: scaleY(1.2);\n      transform: scaleX(1.3);\n      opacity: 0;\n    } \n    95%{\n      transform-origin:bottom;\n      transform: scaleY(1.2);\n      transform: scaleX(1.6);\n      opacity: 0;\n    }\n    100%{\n      transform-origin:bottom;\n      transform: scaleY(1.2);\n      transform: scaleX(1.6);\n      opacity: 0;\n    } \n",
        ]);
        return (
          (rT = function () {
            return n;
          }),
          n
        );
      }
      function rE() {
        let n = (0, f._)([
          "\n    from{\n      bottom: 40%;\n    }\n    to{\n      bottom: 45%;\n    }\n",
        ]);
        return (
          (rE = function () {
            return n;
          }),
          n
        );
      }
      function rM() {
        let n = (0, f._)([
          "\n    0%{\n      background: url(",
          ") no-repeat 0 0;\n    }\n    25%{\n      background: url(",
          ") no-repeat 0 0;\n    }\n    50%{\n      background: url(",
          ") no-repeat 0 0;\n    }\n    75%{\n      background: url(",
          ") no-repeat 0 0;\n    }\n   90%{\n      background: url(",
          ") no-repeat 0 0;\n      opacity: 1;\n    } \n\n    100%{\n      background: url(",
          ") no-repeat 0 0;\n      opacity: 0;\n    }\n",
        ]);
        return (
          (rM = function () {
            return n;
          }),
          n
        );
      }
      function rN() {
        let n = (0, f._)([
          "\n    from{\n      opacity: 1;\n      transform: scale(1);\n      top: 170px;\n    }\n    to{\n      opacity: 0;\n      transform: scale(1.5);\n      top: 180px;\n    }\n",
        ]);
        return (
          (rN = function () {
            return n;
          }),
          n
        );
      }
      function rB() {
        let n = (0, f._)([
          "\n    from{\n      opacity: 0;\n    }\n    to{\n      opacity: 1;\n    }\n",
        ]);
        return (
          (rB = function () {
            return n;
          }),
          n
        );
      }
      function rR() {
        let n = (0, f._)([
          "\n    from{\n      opacity: 1;\n      transform: scale(1);\n      top: 170px;\n    }\n    to{\n      opacity: 0;\n      transform: scale(2);\n      top: 220px;\n    }\n",
        ]);
        return (
          (rR = function () {
            return n;
          }),
          n
        );
      }
      function rA() {
        let n = (0, f._)([
          "\n  from{ transform: rotate(0deg);}\n  to{transform: rotate(360deg);}\n",
        ]);
        return (
          (rA = function () {
            return n;
          }),
          n
        );
      }
      function rZ() {
        let n = (0, f._)([
          "\n\n  0%{ bottom:15%; right: 0;}\n  20%{bottom: 30%; right: -300px;}\n  25%{bottom: 15%; right: -350px;}\n  30%{bottom: 10%; right: -400px;}\n  35%{bottom: 1%; right: -480px;}\n  100%{bottom: -50%; right: -600px;}\n",
        ]);
        return (
          (rZ = function () {
            return n;
          }),
          n
        );
      }
      function rI() {
        let n = (0, f._)([
          "\n  0%{ bottom: 15%; left: 0;}\n  20%{bottom: 30%; left: -300px;}\n  25%{bottom: 15%; left: -350px;}\n  30%{bottom: 10%; left: -400px;}\n  35%{bottom: 1%; left: -480px;}\n  100%{bottom: -50%; left: -600px;}\n",
        ]);
        return (
          (rI = function () {
            return n;
          }),
          n
        );
      }
      function rL() {
        let n = (0, f._)([
          "\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  height: calc(100% - 214px);\n  flex: 1;\n",
        ]);
        return (
          (rL = function () {
            return n;
          }),
          n
        );
      }
      function rG() {
        let n = (0, f._)([
          "\n            background: url(",
          ") no-repeat 0 0;\n            background-size: 249px 228px;\n          ",
        ]);
        return (
          (rG = function () {
            return n;
          }),
          n
        );
      }
      function rF() {
        let n = (0, f._)([
          "\n            background: url(",
          ") no-repeat 0 0;\n            background-size: 249px 188px;\n          ",
        ]);
        return (
          (rF = function () {
            return n;
          }),
          n
        );
      }
      function rD() {
        let n = (0, f._)([
          "\n          background: url(",
          ") no-repeat 0 0;\n        ",
        ]);
        return (
          (rD = function () {
            return n;
          }),
          n
        );
      }
      function rH() {
        let n = (0, f._)([
          "\n            background: url(",
          ") no-repeat 0 0;\n          ",
        ]);
        return (
          (rH = function () {
            return n;
          }),
          n
        );
      }
      function rq() {
        let n = (0, f._)([
          "\n          background: url(",
          ") no-repeat 0 0;\n        ",
        ]);
        return (
          (rq = function () {
            return n;
          }),
          n
        );
      }
      function rU() {
        let n = (0, f._)([
          "\n            background: url(",
          ") no-repeat 0 0;\n          ",
        ]);
        return (
          (rU = function () {
            return n;
          }),
          n
        );
      }
      function rW() {
        let n = (0, f._)([
          "\n              background: url(",
          ") no-repeat 0 0;\n              background-size: auto 100%;\n            ",
        ]);
        return (
          (rW = function () {
            return n;
          }),
          n
        );
      }
      function rY() {
        let n = (0, f._)([
          "\n        text-shadow: 1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3;\n      ",
        ]);
        return (
          (rY = function () {
            return n;
          }),
          n
        );
      }
      function rV() {
        let n = (0, f._)([
          "\n        text-shadow: 1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3;\n      ",
        ]);
        return (
          (rV = function () {
            return n;
          }),
          n
        );
      }
      function rX() {
        let n = (0, f._)([
          "\n        text-shadow: 1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3;\n      ",
        ]);
        return (
          (rX = function () {
            return n;
          }),
          n
        );
      }
      function rK() {
        let n = (0, f._)([
          "\n        color: #fdf630;\n        font-size: 25px;\n        text-shadow: 1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3,\n          1px 0 5px #ff8de3, -1px 0 5px #ff8de3, 0 1px 5px #ff8de3;\n      ",
        ]);
        return (
          (rK = function () {
            return n;
          }),
          n
        );
      }
      function rJ() {
        let n = (0, f._)([
          "\n  color: #fff;\n  position: relative;\n  display: ",
          ";\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 450px;\n  background-color: #000;\n  transform: scale(1);\n\n  .AN_GO {\n    width: 100%;\n    height: 100%;\n\n    & #animation_container {\n      width: 100% !important;\n      height: 100% !important;\n\n      canvas {\n        width: 100% !important;\n        height: 100% !important;\n        background-color: #212121 !important;\n      }\n\n      #dom_overlay_container {\n        width: 100% !important;\n        height: 100% !important;\n      }\n    }\n  }\n\n  .ref_box {\n    position: absolute;\n    left: -300px;\n    top: 15%;\n    overflow: hidden;\n    height: 60px;\n    width: 300px;\n    border-radius: 13px;\n    background: #5cc021;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 15px;\n    box-sizing: border-box;\n    animation: ",
          " 2s 0s ease-in 1 forwards;\n    color: #fff;\n\n    &.rejected {\n      background: #f8274a;\n    }\n\n    .ref {\n      display: flex;\n      justify-content: flex-start;\n      align-items: center;\n\n      img {\n        width: 30px;\n        height: 30px;\n        margin-right: 10px;\n      }\n\n      .txt {\n        p {\n          width: 100%;\n          font-size: 18px;\n        }\n      }\n    }\n\n    .close {\n      width: 20px;\n      height: 20px;\n    }\n  }\n\n  .area {\n    width: inherit;\n    height: 100%;\n    position: absolute;\n    overflow: hidden;\n    top: 0;\n  }\n\n  .street_stage {\n    position: relative;\n    width: inherit;\n    height: 100%;\n    /* car */\n\n    & div {\n      @media (max-width: 23.4375em) {\n        transform: scale(0.6) !important;\n      }\n\n      @media (max-width: 33.75em) {\n        transform: scale(0.8) !important;\n      }\n    }\n\n    .car_go {\n      position: absolute;\n      width: 249px;\n      height: 228px;\n      left: calc(50% - 125px);\n      bottom: 5%;\n      transform: scale(0.7);\n      animation: ",
          " 0.6s 0s 1 forwards;\n\n      @media (max-width: 23.4375em) {\n        transform: scale(0.5);\n      }\n\n      @media (max-width: 33.75em) {\n        transform: scale(0.7);\n      }\n    }\n\n    .car_wait {\n      position: absolute;\n      width: 249px;\n      height: 228px;\n      left: calc(50% - 125px);\n      bottom: 0%;\n      transform: scale(0.7);\n\n      @media (max-height: 570px) {\n        transform: scale(0.6);\n      }\n    }\n\n    .car_box {\n      position: relative;\n      width: 100%;\n      height: 100%;\n      transform: scale(0.9);\n\n      .car_wait_02 {\n        position: absolute;\n        width: 249px;\n        height: 228px;\n        background: url(",
          ") no-repeat 0 0;\n        background-size: 249px 228px;\n        bottom: 0px;\n        ",
          "\n      }\n\n      .car_splight {\n        position: absolute;\n        width: 249px;\n        height: 116px;\n        background: url(",
          ") no-repeat 0 0;\n        background-size: 249px 116px;\n        left: calc(50% - 123px);\n        bottom: 100px;\n      }\n\n      .car_wait_01 {\n        position: absolute;\n        width: 249px;\n        height: 188px;\n        background: ",
          ";\n        background-size: 249px 188px;\n        bottom: 28px;\n        animation: ",
          " 0.6s 0s linear infinite;\n\n        ",
          "\n\n        .car_light {\n          width: 249px;\n          height: 92px;\n          background: url(",
          ") no-repeat 0 0;\n          background-size: 249px 92px;\n          margin-top: 100px;\n          animation: ",
          " 0.6s 0s linear infinite;\n        }\n        .smoke_s {\n          position: absolute;\n          width: 238px;\n          height: 44px;\n          background: url(",
          ") no-repeat 0 0;\n          background-size: 238px 44px;\n          left: calc(50% - 119px);\n          top: 170px;\n          animation: ",
          " 0.6s 0s linear infinite;\n        }\n        .smoke_l {\n          position: absolute;\n          width: 238px;\n          height: 44px;\n          background: url(",
          ") no-repeat 0 0;\n          background-size: 238px 44px;\n          left: calc(50% - 119px);\n          top: 170px;\n          animation: ",
          " 0.8s 0s linear infinite;\n        }\n\n        .car_fire {\n          position: absolute;\n          width: 340px;\n          height: 246px;\n          background: url(",
          ") no-repeat 0 0;\n          background-size: 340px 246px;\n          left: calc(50% - 170px);\n          top: 106px;\n          animation: ",
          " 0.1s 0s linear infinite;\n        }\n\n        .red_light {\n          position: absolute;\n          width: 448px;\n          height: 232px;\n          background: url(",
          ") no-repeat 0 0;\n          background-size: 448px 232px;\n          left: calc(50% - 224px);\n          top: 110px;\n          transform: scale(0.8);\n          animation: ",
          " 0.6s 0s 1 forwards;\n        }\n      }\n    }\n\n    .boarding_box {\n      position: absolute;\n      width: 100%;\n      height: 246px;\n      bottom: 0px;\n      z-index: 1;\n\n      &.bbL {\n        left: 0px;\n      }\n      &.bbR {\n        right: 0px;\n      }\n\n      .get_on_me {\n        position: absolute;\n        background: #777;\n        width: 50px;\n        height: 50px;\n        background-repeat: no-repeat;\n        background-position: center;\n        background-size: cover;\n        background-color: transparent;\n        bottom: 20px;\n        left: -110px;\n        animation: ",
          " 1.5s 0s linear 1;\n\n        &.isEnableEasterTheme {\n          width: 40px;\n          height: 50px;\n        }\n\n        .me_tag {\n          position: absolute;\n          top: -30px;\n          left: -26px;\n          background: #f01818;\n          border-radius: 10px;\n          padding: 5px 10px;\n          font-size: 14px;\n          font-weight: 500;\n          color: #fff;\n          text-align: center;\n\n          .me_arrow {\n            position: absolute;\n            top: 27px;\n            left: 12px;\n            width: 27px;\n            height: 14px;\n            background: url(",
          ") no-repeat 0 0;\n            background-size: 27px 14px;\n          }\n        }\n      }\n      .get_on_light {\n        position: absolute;\n        right: 0;\n        left: 0;\n        margin: 0 auto;\n        width: 90px;\n        height: 130px;\n        background: url(",
          ") no-repeat 0 0;\n        background-size: 90px 130px;\n        transform-origin: bottom;\n        transform: scaleY(0.5);\n        opacity: 0;\n        animation: ",
          " 1.5s 0s linear 1;\n\n        &.go_L {\n          bottom: 40%;\n        }\n        &.go_R {\n          bottom: 40%;\n        }\n      }\n      .get_on_player {\n        position: absolute;\n        background: #777;\n        width: 50px;\n        height: 50px;\n        background-repeat: no-repeat;\n        background-position: center;\n        background-size: cover;\n        background-color: transparent;\n        bottom: 20px;\n        right: -100px;\n        animation: ",
          " 1.5s 0s linear 1;\n\n        &.isEnableEasterTheme {\n          width: 40px;\n          height: 50px;\n        }\n      }\n    }\n\n    .jump_stage {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      display: flex;\n      justify-content: center;\n\n      .jump_box {\n        position: absolute;\n        width: 100px;\n        height: 100px;\n        bottom: 155px;\n        right: 0;\n        left: 0;\n        margin: auto;\n        display: flex;\n        justify-content: center;\n\n        &.jump_L {\n          animation: ",
          " 1.5s 0s linear 1 forwards;\n        }\n        &.jump_R {\n          animation: ",
          " 1.5s 0s linear 1 forwards;\n        }\n        .jump_player {\n          position: absolute;\n          width: 50px;\n          height: 50px;\n          background-repeat: no-repeat;\n          background-position: center;\n          background-size: 50px 50px;\n          background-color: transparent;\n          animation: ",
          " 0.8s 0s linear infinite;\n        }\n        .p_odds {\n          position: absolute;\n          bottom: -15px;\n          text-align: center;\n          font-size: 24px;\n          font-family: Roboto-Bold, Arial, sans-serif;\n          color: #91f874;\n        }\n        .me_tag {\n          position: absolute;\n          top: -30px;\n          left: -10px;\n          background: #f01818;\n          border-radius: 10px;\n          padding: 5px 10px;\n          font-size: 18px;\n          font-weight: 500;\n          color: #fff;\n          text-align: center;\n\n          .me_arrow {\n            position: absolute;\n            top: 30px;\n            left: 20px;\n            width: 27px;\n            height: 14px;\n            background: url(",
          ") no-repeat 0 0;\n            background-size: 27px 14px;\n          }\n        }\n      }\n    }\n\n    .police_box {\n      height: 100%;\n      position: relative;\n      bottom: 10%;\n      transform: scale(0.7);\n    }\n\n    .police_car_box_R {\n      position: absolute;\n      width: 204px;\n      height: 138px;\n      background: url(",
          ") no-repeat 0 0;\n      background-size: 204px 138px;\n      animation: ",
          " 0.8s 0s 1 forwards;\n      ",
          "\n      .police_FR {\n        width: 204px;\n        height: 54px;\n        background: url(",
          ") no-repeat 0 0;\n        background-size: 204px 54px;\n        animation: ",
          " 0.2s 0s linear infinite;\n        ",
          "\n      }\n    }\n\n    .police_car_box_L {\n      position: absolute;\n      width: 204px;\n      height: 138px;\n      background: url(",
          ") no-repeat 0 0;\n      background-size: 204px 138px;\n      animation: ",
          " 0.8s 0s 1 forwards;\n      ",
          "\n      .police_FL {\n        width: 204px;\n        height: 54px;\n        background: url(",
          ") no-repeat 0 0;\n        background-size: 204px 54px;\n        animation: ",
          " 0.2s 0s linear infinite;\n        ",
          "\n      }\n    }\n    .car_stop {\n      position: absolute;\n      width: 235px;\n      height: 177px;\n      left: calc(50% - 125px);\n      bottom: 19%;\n      animation: ",
          " 1s 0s 1 forwards;\n\n      @media (max-width: 23.4375em) {\n        animation: ",
          " 1s 0s 1 forwards;\n      }\n\n      @media (max-width: 33.75em) {\n        animation: ",
          " 1s 0s 1 forwards;\n      }\n\n      .car_box {\n        position: relative;\n        width: 100%;\n        height: 100%;\n        transform: scale(0.7);\n\n        .carstop_run {\n          width: 290px;\n          height: 170px;\n          background: ",
          ";\n          background-size: auto 100%;\n          animation: ",
          " steps(6) 0.3s 2;\n\n          ",
          "\n        }\n      }\n    }\n  }\n\n  .bet_quantity {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    bottom: 40%;\n    text-align: center;\n    font-size: 15px;\n    font-family: Roboto-Bold, Arial, sans-serif;\n    font-weight: 500;\n    border-radius: 25px;\n    background-color: rgba(0, 0, 0, 0.6);\n    padding: 5px 15px;\n\n    @media (max-width: 23.4375em) {\n      transform: scale(0.5);\n    }\n\n    @media (max-width: 33.75em) {\n      transform: scale(0.7);\n    }\n\n    @media (max-height: 570px) {\n      transform: scale(0.8);\n    }\n\n    .quantity_num {\n      color: #fff;\n    }\n\n    .quantity_txt {\n      margin-left: 10px;\n      color: #fff85c;\n    }\n\n    &.bg_go {\n      animation: ",
          " 0.6s 0s 1 forwards;\n    }\n  }\n\n  .timer {\n    position: absolute;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    top: 17%;\n    text-align: center;\n    font-size: 60px;\n    font-family: Roboto-Bold, Arial, sans-serif;\n    color: #fff;\n\n    ",
          "\n\n    @media (max-width: 23.4375em) {\n      transform: scale(0.5);\n    }\n\n    @media (max-width: 33.75em) {\n      transform: scale(0.7);\n    }\n\n    @media (max-height: 570px) {\n      transform: scale(0.8);\n    }\n  }\n\n  .status_tag {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    top: 31%;\n    text-align: center;\n    font-size: 30px;\n    font-family: Roboto-Bold, Arial, sans-serif;\n    color: #fff;\n    text-shadow: 0 0 0.2em #000, 0 0 0.2em #000, 0 0 0.2em #000;\n\n    ",
          "\n\n    @media (max-width: 23.4375em) {\n      transform: scale(0.5);\n    }\n\n    @media (max-width: 33.75em) {\n      transform: scale(0.7);\n    }\n  }\n\n  .odds_board {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    width: 70%;\n    top: 17%;\n    text-align: center;\n    font-size: 86px;\n    font-family: Roboto-Bold, Arial, sans-serif;\n    color: #fff;\n    z-index: 2;\n\n    ",
          "\n\n    @media (max-width: 23.4375em) {\n      transform: scale(0.5);\n    }\n\n    @media (max-width: 33.75em) {\n      transform: scale(0.7);\n    }\n\n    @media (max-height: 570px) {\n      transform: scale(0.8);\n    }\n  }\n\n  .point_board {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    width: 100%;\n    //top:145px;\n    top: 39%;\n    text-align: center;\n    font-size: 25px;\n    font-family: Roboto-Bold, Arial, sans-serif;\n    color: #91f874;\n\n    ",
          "\n\n    @media (max-width: 23.4375em) {\n      transform: scale(0.5);\n    }\n\n    @media (max-width: 33.75em) {\n      transform: scale(0.7);\n    }\n  }\n",
        ]);
        return (
          (rJ = function () {
            return n;
          }),
          n
        );
      }
      function rQ() {
        let n = (0, f._)([
          "\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 10px;\n  background: linear-gradient(transparent, #212121);\n",
        ]);
        return (
          (rQ = function () {
            return n;
          }),
          n
        );
      }
      let r$ = (0, g.F4)(rb()),
        r0 = (0, g.F4)(r_()),
        r1 = (0, g.F4)(ry()),
        r2 = (0, g.F4)(rw()),
        r5 = (0, g.F4)(rv()),
        r3 = (0, g.F4)(rj()),
        r4 = (0, g.F4)(rS()),
        r6 = (0, g.F4)(rk()),
        r8 = (0, g.F4)(rP()),
        r7 = (0, g.F4)(rO()),
        r9 = (0, g.F4)(rC()),
        an = (0, g.F4)(rz()),
        ae = (0, g.F4)(rT()),
        at = (0, g.F4)(rE()),
        ai = (0, g.F4)(
          rM(),
          ro,
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/fire_02.f39c85ae.svg",
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/fire_03.e1fcd1a9.svg",
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/fire_04.5765a628.svg",
          rs,
          rs
        ),
        ar = (0, g.F4)(rN()),
        aa = (0, g.F4)(rB()),
        ao = (0, g.F4)(rR()),
        as = (0, g.F4)(rA()),
        al = (0, g.F4)(rZ()),
        ac = (0, g.F4)(rI()),
        ad = g.ZP.div(rL()),
        au = (n) => {
          switch (n) {
            case to.l.Default:
              return "url(".concat(rr.src, ") no-repeat 0 0");
            case to.l.oneXMidnightRobbery:
              return "url(".concat(rf.src, ") no-repeat 0 0");
            default:
              return "url(".concat(rr.src, ") no-repeat 0 0");
          }
        },
        ap = (n) => {
          switch (n) {
            case to.l.Default:
              return "url(".concat(rl.src, ") no-repeat 0 0");
            case to.l.oneXMidnightRobbery:
              return "url(".concat(rg.src, ") no-repeat 0 0");
            default:
              return "url(".concat(rl.src, ") no-repeat 0 0");
          }
        },
        ah = g.ZP.div(
          rJ(),
          (n) => (n.isShowReconnect ? "none" : "flex"),
          r0,
          r1,
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/car_wait_02.c4fd13f5.svg",
          (n) => n.isEnableEasterTheme && (0, g.iv)(rG(), rx.src),
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/car_wait_04.f332bd70.svg",
          (n) => au(n.theme),
          r4,
          (n) => n.isEnableEasterTheme && (0, g.iv)(rF(), rm.src),
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/car_wait_03.b4d42997.svg",
          r$,
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/smoke_s.87b9d444.svg",
          ar,
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/smoke_L.ef416625.svg",
          ao,
          ro,
          ai,
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/run_redLight.0686e2c3.svg",
          aa,
          an,
          ra,
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/getOnLight.76ed88ac.svg",
          ae,
          r9,
          ac,
          al,
          as,
          ra,
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/policeCar_02.84573b24.png",
          r6,
          (n) => n.isEnableEasterTheme && (0, g.iv)(rD(), ru.src),
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/policeCar_02F.e042fc69.png",
          r7,
          (n) => n.isEnableEasterTheme && (0, g.iv)(rH(), rh.src),
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/policeCar_01.e0cf129f.png",
          r8,
          (n) => n.isEnableEasterTheme && (0, g.iv)(rq(), rd.src),
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/policeCar_01F.5052e74a.png",
          r7,
          (n) => n.isEnableEasterTheme && (0, g.iv)(rU(), rp.src),
          r2,
          r5,
          r5,
          (n) => ap(n.theme),
          r3,
          (n) => n.isEnableEasterTheme && (0, g.iv)(rW(), rc.src),
          at,
          (n) => n.isEnableEasterTheme && (0, g.iv)(rY()),
          (n) => n.isEnableEasterTheme && (0, g.iv)(rV()),
          (n) => n.isEnableEasterTheme && (0, g.iv)(rX()),
          (n) => n.isEnableEasterTheme && (0, g.iv)(rK())
        ),
        am = g.ZP.div(rQ());
      function ax() {
        let n = (0, f._)([
          "\n  position: absolute;\n  right: 5px;\n  width: 26%;\n  // Game component height - leaderBoard top\n  height: calc(100% - 180px);\n  /* overflow-y: auto; */\n  top: 180px;\n",
        ]);
        return (
          (ax = function () {
            return n;
          }),
          n
        );
      }
      function af() {
        let n = (0, f._)([
          "\n  // leaderBoard height - first leaderBoard item height\n  height: calc(100% - 32px);\n  overflow-y: auto;\n\n  -ms-overflow-style: none;\n  &::-webkit-scrollbar {\n    display: none;\n  }\n",
        ]);
        return (
          (af = function () {
            return n;
          }),
          n
        );
      }
      function ag() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  width: 100%;\n  height: 22px;\n  border-radius: 50px;\n  color: #fff;\n  background-color: rgba(0, 0, 0, 0.7);\n  opacity: 0.7;\n  margin: 5px 0;\n  text-align: right;\n  font-size: 12px;\n  font-weight: bold;\n  white-space: nowrap;\n\n  & > div.title {\n    color: #00d010;\n\n    &:last-child {\n      padding-right: 5px;\n      &.small {\n        transform: scale(0.8);\n      }\n    }\n  }\n\n  & > div.isSelf {\n    color: #d47a33;\n  }\n\n  & > div.isCashOut {\n    color: #3a9e9f;\n  }\n\n  & > div:first-child {\n    width: 52px;\n    border-right: 1px solid #eee;\n    padding-right: 5px;\n  }\n\n  & > div:last-child {\n    width: 45px;\n  }\n",
        ]);
        return (
          (ag = function () {
            return n;
          }),
          n
        );
      }
      let ab = g.ZP.div(ax()),
        a_ = g.ZP.div(af()),
        ay = g.ZP.div(ag()),
        aw = ["TH_TH", "RU_RU"];
      var av = x.memo(() => {
          let { t: n } = (0, k.Z)("common"),
            e = (0, nR.n)((n) => n.playerState.playerId),
            t = (0, nR.n)((n) => n.playerState.language),
            i = eI((n) => n.gameState.leaderBoard),
            [r, a] = e7((n) => [n.betLeftState.refNo, n.betRightState.refNo]),
            o = (n) => {
              let t = n.refNo == r || n.refNo == a,
                i =
                  n.playerId.substring(n.playerId.length - 3) ===
                  e.substring(e.length - 3);
              return t && i ? "isSelf" : 0 != n.odds ? "isCashOut" : "";
            },
            s = (n) => (0 == n.odds ? "-" : "x " + (0, nt.PO)(n.odds));
          return (0, m.jsxs)(ab, {
            children: [
              (0, m.jsxs)(ay, {
                children: [
                  (0, m.jsx)("div", {
                    className: "title",
                    children: n("Main_LeaderBoard_PlayerId"),
                  }),
                  (0, m.jsx)("div", {
                    className: "title ".concat(aw.includes(t) ? "small" : ""),
                    children: n("Main_LeaderBoard_Odds"),
                  }),
                ],
              }),
              (0, m.jsx)(a_, {
                children: (0, m.jsx)("div", {
                  children:
                    i &&
                    i.map((n) =>
                      (0, m.jsxs)(
                        ay,
                        {
                          children: [
                            (0, m.jsx)("div", {
                              className: o(n),
                              children: n.playerId,
                            }),
                            (0, m.jsx)("div", {
                              className: o(n),
                              children: s(n),
                            }),
                          ],
                        },
                        "".concat(n.refNo, ":").concat(n.playerId)
                      )
                    ),
                }),
              }),
            ],
          });
        }),
        aj = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/my_avatar.5d4915a7.png",
        },
        aS = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/my_avatar2.859833af.svg",
        },
        ak = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/default_avatar.81dd0e9c.png",
        },
        aP =
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/speedLine_01.4bbc10dc.png";
      function aO() {
        let n = (0, f._)([
          "\n  0%{\n    background: url(",
          ") no-repeat 0 0;\n    background-size: 100% 100%;\n  }\n  50%{\n    background: url(",
          ") no-repeat 0 0;\n    background-size: 100% 100%;\n  }\n  100%{ \n    background: url(",
          ") no-repeat 0 0;\n    background-size: 100% 100%;\n  }\n",
        ]);
        return (
          (aO = function () {
            return n;
          }),
          n
        );
      }
      function aC() {
        let n = (0, f._)([
          "\n  position: absolute;\n  top: 0px;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  background: url(",
          ") no-repeat 0 0;\n  background-size: 100% 100%;\n  animation: ",
          " 0.15s infinite;\n",
        ]);
        return (
          (aC = function () {
            return n;
          }),
          n
        );
      }
      let az = (0, g.F4)(
          aO(),
          aP,
          "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/speedLine_02.0872ef36.png",
          aP
        ),
        aT = g.ZP.div(aC(), aP, az);
      var aE = x.memo(() => (0, m.jsx)(aT, {}));
      function aM() {
        let n = (0, f._)([
          "\n      form{ transform: rotate(0deg); }\n      to{ transform: rotate(180deg); }\n  ",
        ]);
        return (
          (aM = function () {
            return n;
          }),
          n
        );
      }
      function aN() {
        let n = (0, f._)([
          "\n      cursor: pointer;\n      filter: brightness(1);\n    ",
        ]);
        return (
          (aN = function () {
            return n;
          }),
          n
        );
      }
      function aB() {
        let n = (0, f._)([
          "\n  position: absolute;\n  width: 40px;\n  height: 40px;\n  background: #000000;\n  border-radius: 50%;\n  transform: translate(-50%);\n  margin-left: -60px;\n  justify-content: center;\n  align-items: center;\n  filter: brightness(0.3);\n  .arrow_circle {\n    position: absolute;\n    top: 0px;\n    width: 40px;\n    height: 40px;\n    \n  }\n  .arrow_animation {\n    animation: ",
          " .2s none linear;\n  }\n  ",
          "\n  left: 100px;\n  bottom: 20px;\n  display: ",
          ";\n  z-index: 2;\n  ",
        ]);
        return (
          (aB = function () {
            return n;
          }),
          n
        );
      }
      let aR = (0, g.F4)(aM()),
        aA = g.ZP.div(
          aB(),
          aR,
          (n) => n.enabled && (0, g.iv)(aN()),
          (n) => (n.close ? "none" : "flex")
        );
      var aZ = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/icon_coin.5899424b.png",
        },
        aI = x.memo(() => {
          let [n, e, t] = (0, nR.n)((n) => [
              n.playerState.voucherInfo,
              n.playerState.showVoucherPanel,
              n.setPlayerState,
            ]),
            i = eI((n) => n.gameState.gameStatus),
            [r, a] = e7((n) => [n.betLeftState, n.betRightState]),
            [o, s] = (0, x.useState)(!1),
            [l, c] = (0, x.useState)(!1),
            d = (n, e) => {
              e &&
                t({
                  showVoucherPanel: n,
                });
            };
          return (
            (0, x.useEffect)(() => {
              i === h.CreateGame &&
                d(null !== n, !r.isAutoPlay && !a.isAutoPlay),
                s(
                  (i === h.OpenBet || i === h.OpeningBet) &&
                    !r.refNo &&
                    !a.refNo &&
                    !r.isAutoPlay &&
                    !a.isAutoPlay
                );
            }, [i, r, a]),
            (0, m.jsxs)(aA, {
              close: null === n,
              enabled: o,
              onClick: () => {
                d(!e, o), o && c(!0);
              },
              children: [
                (0, m.jsx)("div", {
                  className:
                    l && o ? "arrow_circle arrow_animation" : "arrow_circle",
                  onAnimationEnd: () => c(!1),
                  children: (0, m.jsx)(S(), {
                    src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/arrow_circle.1728a8b5.png",
                    width: "40",
                    height: "40",
                    alt: "arrow",
                  }),
                }),
                (0, m.jsx)(S(), {
                  src: e ? aZ.src : iZ.src,
                  width: "14",
                  height: "14",
                  alt: "voucher",
                }),
              ],
            })
          );
        });
      let aL = !1,
        aG = !1,
        aF = x.memo(() => {
          let n = eI((n) => n.gameState.gameStatus),
            e = n === h.SettleGame,
            t = n === h.Drawing;
          return (0, m.jsx)("div", {
            className: "area",
            children: (0, m.jsx)("div", {
              className: "street_stage",
              children: e
                ? (0, m.jsxs)(m.Fragment, {
                    children: [
                      (0, m.jsxs)("div", {
                        className: "police_box",
                        children: [
                          (0, m.jsx)("div", {
                            className: "police_car_box_R police_R",
                            children: (0, m.jsx)("div", {
                              className: "police_FR",
                            }),
                          }),
                          (0, m.jsx)("div", {
                            className: "police_car_box_L police_L",
                            children: (0, m.jsx)("div", {
                              className: "police_FL",
                            }),
                          }),
                        ],
                      }),
                      (0, m.jsx)("div", {
                        className: "car_stop",
                        children: (0, m.jsx)("div", {
                          className: "car_box",
                          children: (0, m.jsx)("div", {
                            className: "carstop_run",
                          }),
                        }),
                      }),
                    ],
                  })
                : (0, m.jsx)("div", {
                    className: t ? "car_go" : "car_wait",
                    children: (0, m.jsxs)("div", {
                      className: "car_box",
                      children: [
                        (0, m.jsx)("div", {
                          className: "car_wait_02",
                        }),
                        (0, m.jsx)("div", {
                          className: "car_splight",
                        }),
                        (0, m.jsx)("div", {
                          className: "car_wait_01",
                          children: t
                            ? (0, m.jsxs)(m.Fragment, {
                                children: [
                                  (0, m.jsx)("div", {
                                    className: "smoke_s",
                                  }),
                                  (0, m.jsx)("div", {
                                    className: "smoke_l",
                                  }),
                                  (0, m.jsx)("div", {
                                    className: "car_fire",
                                  }),
                                  (0, m.jsx)("div", {
                                    className: "red_light",
                                  }),
                                ],
                              })
                            : (0, m.jsx)("div", {
                                className: "car_light",
                              }),
                        }),
                      ],
                    }),
                  }),
            }),
          });
        }),
        aD = x.memo(() => {
          let { t: n } = (0, k.Z)("common"),
            e = eI((n) => n.gameState.gameStatus),
            [t] = (0, nh.H)((n) => [n.gameToggle.isEnableEasterTheme]),
            i = e7((n) => n.betLeftState.refNo);
          return (
            ((!!i && e === h.OpeningBet) || (!!i && e === h.CloseBet)) &&
            (0, m.jsxs)("div", {
              className: "boarding_box bbL",
              children: [
                (0, m.jsx)("div", {
                  className: "get_on_me ".concat(
                    t ? "isEnableEasterTheme" : ""
                  ),
                  style: {
                    backgroundImage: t
                      ? "url(".concat(aj.src)
                      : "url(".concat(rt.src, ")"),
                  },
                  children: (0, m.jsxs)("div", {
                    className: "me_tag",
                    children: [
                      (0, m.jsx)("div", {
                        className: "me_arrow",
                      }),
                      (0, m.jsx)("span", {
                        children: n("Main_Me"),
                      }),
                    ],
                  }),
                }),
                (0, m.jsx)("div", {
                  className: "get_on_light go_L",
                }),
              ],
            })
          );
        }),
        aH = x.memo(() => {
          let { t: n } = (0, k.Z)("common"),
            e = eI((n) => n.gameState.gameStatus),
            t = e7((n) => n.betRightState.refNo),
            [i] = (0, nh.H)((n) => [n.gameToggle.isEnableEasterTheme]);
          return (
            ((!!t && e === h.OpeningBet) || (!!t && e === h.CloseBet)) &&
            (0, m.jsxs)("div", {
              className: "boarding_box bbL",
              children: [
                (0, m.jsx)("div", {
                  className: "get_on_me ".concat(
                    i ? "isEnableEasterTheme" : ""
                  ),
                  style: {
                    backgroundImage: i
                      ? "url(".concat(aS.src, ")")
                      : "url(".concat(ri.src, ")"),
                  },
                  children: (0, m.jsxs)("div", {
                    className: "me_tag",
                    children: [
                      (0, m.jsx)("div", {
                        className: "me_arrow",
                      }),
                      (0, m.jsx)("span", {
                        children: n("Main_Me"),
                      }),
                    ],
                  }),
                }),
                (0, m.jsx)("div", {
                  className: "get_on_light go_L",
                }),
              ],
            })
          );
        }),
        aq = x.memo(() => {
          let { t: n } = (0, k.Z)("common"),
            [e] = (0, nh.H)((n) => [n.gameToggle.isEnableEasterTheme]),
            [t, i, r] = e7((n) => [
              n.betLeftState.isCashOut,
              n.betLeftState.refNo,
              n.betLeftState.cashOutOdds,
            ]);
          return (
            t &&
            (0, m.jsx)(
              "div",
              {
                className: "jump_stage",
                children: (0, m.jsxs)("div", {
                  className: "jump_box jump_L",
                  children: [
                    (0, m.jsx)("div", {
                      className: "jump_player",
                      style: {
                        backgroundImage: e
                          ? "url(".concat(aj.src)
                          : "url(".concat(rt.src, ")"),
                      },
                    }),
                    (0, m.jsx)("div", {
                      className: "p_odds",
                      children: (0, nt.PO)(r),
                    }),
                    (0, m.jsxs)("div", {
                      className: "me_tag",
                      children: [
                        (0, m.jsx)("div", {
                          className: "me_arrow",
                        }),
                        (0, m.jsx)("span", {
                          children: n("Main_Me"),
                        }),
                      ],
                    }),
                  ],
                }),
              },
              i
            )
          );
        }),
        aU = x.memo(() => {
          let { t: n } = (0, k.Z)("common"),
            [e] = (0, nh.H)((n) => [n.gameToggle.isEnableEasterTheme]),
            [t, i, r] = e7((n) => [
              n.betRightState.isCashOut,
              n.betRightState.refNo,
              n.betRightState.cashOutOdds,
            ]);
          return (
            t &&
            (0, m.jsx)(
              "div",
              {
                className: "jump_stage",
                children: (0, m.jsxs)("div", {
                  className: "jump_box jump_L",
                  children: [
                    (0, m.jsx)("div", {
                      className: "jump_player",
                      style: {
                        backgroundImage: e
                          ? "url(".concat(aS.src, ")")
                          : "url(".concat(ri.src, ")"),
                      },
                    }),
                    (0, m.jsx)("div", {
                      className: "p_odds",
                      children: (0, nt.PO)(r),
                    }),
                    (0, m.jsxs)("div", {
                      className: "me_tag",
                      children: [
                        (0, m.jsx)("div", {
                          className: "me_arrow",
                        }),
                        (0, m.jsx)("span", {
                          children: n("Main_Me"),
                        }),
                      ],
                    }),
                  ],
                }),
              },
              i
            )
          );
        }),
        aW = x.memo(() => {
          let n = (0, nR.n)((n) => n.playerState.playerId),
            [e] = (0, nh.H)((n) => [n.gameToggle.isEnableEasterTheme]),
            [t, r] = eI((n) => [
              n.gameState.gameStatus,
              n.gameState.onBoardPlayerId,
            ]),
            [a, o] = (0, x.useState)([]);
          return (
            (0, x.useMemo)(() => {
              if (t === h.SettleGame) {
                o([]);
                return;
              }
            }, [t]),
            (0, x.useEffect)(() => {
              r !== n && (i.playExistedAudio("otherJump", 0.1), o(a.concat(r)));
            }, [r]),
            t === h.OpeningBet &&
              (0, m.jsx)(m.Fragment, {
                children: a.map((n) =>
                  (0, m.jsxs)(
                    "div",
                    {
                      className: "boarding_box bbR",
                      children: [
                        (0, m.jsx)("div", {
                          className: "get_on_player isEnableEasterTheme",
                          style: {
                            backgroundImage: e
                              ? "url(".concat(ak.src, ")")
                              : "url(".concat(re.src, ")"),
                          },
                        }),
                        (0, m.jsx)("div", {
                          className: "get_on_light go_R",
                        }),
                      ],
                    },
                    n
                  )
                ),
              })
          );
        }),
        aY = x.memo(() => {
          let [n, e] = e7((n) => [n.betRightState.refNo, n.betLeftState.refNo]),
            [t, i] = eI((n) => [n.gameState.gameStatus, n.gameState.cashOuts]),
            [r] = (0, nh.H)((n) => [n.gameToggle.isEnableEasterTheme]),
            [a, o] = (0, x.useState)([]);
          return (
            (0, x.useEffect)(() => {
              let t = i.filter(
                (t) => t.refNo !== Number(n) && t.refNo !== Number(e)
              );
              o(a.concat(t));
            }, [i]),
            (0, x.useMemo)(() => {
              if (t === h.SettleGame) {
                o([]);
                return;
              }
            }, [t]),
            t === h.Drawing &&
              (0, m.jsx)(m.Fragment, {
                children: a.map((n) =>
                  (0, m.jsx)(
                    "div",
                    {
                      className: "jump_stage",
                      children: (0, m.jsxs)("div", {
                        className: "jump_box jump_R",
                        children: [
                          (0, m.jsx)("div", {
                            className: "jump_player",
                            style: {
                              backgroundImage: r
                                ? "url(".concat(ak.src, ")")
                                : "url(".concat(re.src, ")"),
                            },
                          }),
                          (0, m.jsx)("div", {
                            className: "p_odds",
                            children: (0, nt.PO)(n.odds),
                          }),
                        ],
                      }),
                    },
                    "".concat(n.refNo, ":").concat(n.odds)
                  )
                ),
              })
          );
        }),
        aV = x.memo(() => {
          let { t: n } = (0, k.Z)("common"),
            [e, t] = eI((n) => [
              n.gameState.gameStatus,
              n.gameState.onBoardCount,
            ]);
          return (0, m.jsxs)("div", {
            className: "bet_quantity ".concat(e === h.Drawing && "bg_go"),
            children: [
              (0, m.jsx)("span", {
                className: "quantity_num",
                children: t,
              }),
              (0, m.jsx)("span", {
                className: "quantity_txt",
                children: n("Main_Car_OnBoard"),
              }),
            ],
          });
        }),
        aX = x.memo(() => {
          let [n, e] = eI((n) => [n.gameState.gameStatus, n.gameState.odds]);
          return (
            (n === h.Drawing || n === h.SettleGame) &&
            (0, m.jsxs)("div", {
              className: "odds_board",
              children: [(0, nt.PO)(e), "x"],
            })
          );
        }),
        aK = x.memo(() => {
          let n = (0, x.useRef)(0),
            e = (0, x.useRef)(0),
            [t, i] = eI((n) => [n.gameState.gameStatus, n.gameState.odds]),
            [r, a] = e7((n) => [n.betLeftState, n.betRightState]);
          (0, x.useMemo)(() => {
            t === h.SettleGame && ((n.current = 0), (e.current = 0));
          }, [t]);
          let o = (n, e) => (e ? (n && n <= e ? n : e) : n),
            s = (0, x.useMemo)(() => {
              if (i) {
                if (r.stake) {
                  let e = r.stake,
                    t = r.isCashOut,
                    a = o(r.cashOutOdds, r.autoCashOutOdds);
                  t
                    ? (n.current = Number(tn(te(e, a), e)))
                    : (n.current = Number(tn(te(i, e), e)));
                }
                if (a.stake) {
                  let n = a.stake,
                    t = a.isCashOut,
                    r = o(a.cashOutOdds, a.autoCashOutOdds);
                  t
                    ? (e.current = Number(tn(te(n, r), n)))
                    : (e.current = Number(tn(te(i, n), n)));
                }
                return e9(n.current, e.current);
              }
            }, [i, r.stake, a.stake, r.isCashOut, a.isCashOut]);
          return (
            t === h.Drawing &&
            s &&
            (0, m.jsxs)("div", {
              className: "point_board",
              children: [" + ", (0, nt.PO)(s)],
            })
          );
        }),
        aJ = x.memo(() => {
          let { t: n } = (0, k.Z)("common"),
            [e, t] = eI((n) => [
              n.gameState.gameStatus,
              n.gameState.bettingCountDown,
            ]);
          return (
            !!t &&
            e === h.OpeningBet &&
            (0, m.jsxs)(m.Fragment, {
              children: [
                (0, m.jsx)("div", {
                  className: "timer",
                  children: t,
                }),
                (0, m.jsx)("div", {
                  className: "status_tag",
                  children: n("Main_ActionStep_OpenBet"),
                }),
              ],
            })
          );
        });
      var aQ = () => {
        var n;
        let [e, t] = eI((n) => [n.gameState.gameStatus, n.gameState.odds]),
          [r, a] = (0, nh.H)((n) => [
            n.gameToggle.isEnableEasterTheme,
            n.gameToggle.isInit,
          ]),
          o = e === h.Drawing,
          s = e === h.OpeningBet,
          l = null === (n = window) || void 0 === n ? void 0 : n.runModeToggle,
          c = (0, tf.f)((n) => n.theme);
        (0, x.useEffect)(() => {
          if (l) {
            var n, e, t;
            s && (null === (n = window) || void 0 === n || n.runModeToggle(0)),
              o
                ? null === (e = window) || void 0 === e || e.runModeToggle(1)
                : null === (t = window) || void 0 === t || t.runModeToggle(0);
          }
        }, [!0, l, s, o]),
          (0, x.useEffect)(() => {
            if (e === h.CloseBet) {
              i.playExistedAudio("wait", 0.3);
              return;
            }
            if (e === h.Drawing) {
              i.playExistedAudio("fire", 0.5),
                i.playExistedAudioLoop("raceCar", 0.7);
              return;
            }
            if (e === h.SettleGame) {
              i.pauseExistedAudio("raceCar"), i.playExistedAudio("over", 0.3);
              return;
            }
          }, [e]);
        let d = (0, x.useMemo)(() => (a && r ? "theme/easter/" : ""), [a]);
        return (0, m.jsx)(ad, {
          children: (0, m.jsxs)(ah, {
            isShowReconnect: !1,
            isEnableEasterTheme: r,
            theme: c,
            children: [
              (0, m.jsx)(rn(), {
                src: "https://code.createjs.com/1.0.0/createjs.min.js",
                id: "createjs-js",
                onLoad: () => {
                  aL = !0;
                },
              }),
              aL &&
                a &&
                (0, m.jsx)(rn(), {
                  src: "https://5cyl3vj1254k81w.highplayfky.com/midnightrobbery/".concat(
                    d,
                    "DJR_bg_go.js?version=220729"
                  ),
                  onLoad: () => {
                    aG = !0;
                  },
                }),
              aG &&
                a &&
                (0, m.jsx)(rn(), {
                  src: "https://5cyl3vj1254k81w.highplayfky.com/midnightrobbery/".concat(
                    d,
                    "AN_GO.js?version=220729"
                  ),
                  onLoad: () => {
                    window.init();
                  },
                }),
              o && t >= 20 && (0, m.jsx)(aE, {}),
              (0, m.jsx)("div", {
                className: "AN_GO",
                children: (0, m.jsxs)("div", {
                  id: "animation_container",
                  style: {
                    backgroundColor: "rgba(0, 0, 0, 1.00)",
                    width: "450px",
                    height: "578px",
                  },
                  children: [
                    (0, m.jsx)("canvas", {
                      id: "canvas",
                      width: "828",
                      height: "578",
                      style: {
                        position: "absolute",
                        display: "block",
                        backgroundColor: "#fff",
                      },
                    }),
                    (0, m.jsx)("div", {
                      id: "dom_overlay_container",
                      style: {
                        pointerEvents: "none",
                        overflow: "hidden",
                        width: "828px",
                        height: "578px",
                        position: "absolute",
                        left: "0px",
                        top: "0px",
                        display: "block",
                      },
                    }),
                  ],
                }),
              }),
              (0, m.jsx)(aF, {}),
              (0, m.jsx)("div", {
                className: "area",
                children: (0, m.jsxs)("div", {
                  className: "street_stage",
                  children: [
                    (0, m.jsx)(aD, {}),
                    (0, m.jsx)(aH, {}),
                    (0, m.jsx)(aq, {}),
                    (0, m.jsx)(aU, {}),
                    (0, m.jsx)(aW, {}),
                    (0, m.jsx)(aY, {}),
                  ],
                }),
              }),
              (0, m.jsx)("div", {
                className: "border_box",
              }),
              (0, m.jsx)(aJ, {}),
              (0, m.jsx)(aK, {}),
              (0, m.jsx)(aV, {}),
              (0, m.jsx)(aX, {}),
              (0, m.jsx)(am, {}),
              (0, m.jsx)(aI, {}),
              (0, m.jsx)(av, {}),
            ],
          }),
        });
      };
      function a$() {
        let n = (0, f._)([
          "\n	.promotion_section_button {\n		position: absolute;\n		top: 60%;\n		left: 0px;\n		z-index: 24;\n\n		@media screen and (max-width: 500px) {\n			width: 69px;\n			height: 69px;\n		}\n\n		@media screen and (min-width: 501px) {\n			width: 78px;\n			height: 78px;\n		}\n	}\n\n	.promotion_section_popup {\n		z-index: 24;\n	}\n",
        ]);
        return (
          (a$ = function () {
            return n;
          }),
          n
        );
      }
      let a0 = (0, g.iv)(a$());
      function a1() {
        let n = (0, f._)([
          "\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  height: 100%;\n  color: #fff;\n\n  ",
          "\n",
        ]);
        return (
          (a1 = function () {
            return n;
          }),
          n
        );
      }
      function a2() {
        let n = (0, f._)([
          "\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 214px;\n  background-color: #212121;\n",
        ]);
        return (
          (a2 = function () {
            return n;
          }),
          n
        );
      }
      function a5() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  width: 100%;\n  height: 235px;\n  background-color: #212121;\n",
        ]);
        return (
          (a5 = function () {
            return n;
          }),
          n
        );
      }
      let a3 = g.ZP.div(a1(), a0);
      g.ZP.div(a2()), g.ZP.div(a5());
      let a4 = () => {
          let n = JSON.stringify({
            authToken: window.sessionStorage.getItem("authToken"),
          });
          navigator.sendBeacon("".concat("/api/common", "/funkyleavegame"), n);
        },
        a6 = () => {
          window.removeEventListener("unload", a4),
            window.addEventListener("unload", a4);
        },
        { consumePlayer: a8, gameInfo: a7 } = eO;
      var a9 = () => {
          let { setAuthToken: n, authToken: e } = (0, nt.tN)(),
            t = eI((n) => n.setGameState),
            r = (0, nR.n)((n) => n.setPlayerState),
            { setLanguageHelper: a } = (0, nt.ZK)(ta().languageList),
            { t: o } = (0, k.Z)("common"),
            s = (0, tf.f)((n) => n.theme),
            { Main_GameName: l } = tw(s),
            [c, d] = (0, x.useState)("en"),
            u = (0, x.useMemo)(() => {
              switch (s) {
                case to.l.Default:
                  return "Midnight Robbery";
                case to.l.oneXMidnightRobbery:
                  return "1xMidnight Robbery";
                default:
                  return "Midnight Robbery";
              }
            }, [s]);
          return (
            tg(),
            (0, x.useEffect)(() => {
              let e = async (e, t) => {
                let i = await a8.getConsumePlayer({
                  sessionToken: e,
                  ipAddress: "0.0.0.0",
                });
                await td().push({}, "", {
                  locale: t,
                }),
                  sessionStorage.setItem("authToken", i.authToken),
                  n(i.authToken);
              };
              (async () => {
                let t = new URLSearchParams(window.location.search),
                  i = a(t.get("lang") || "en");
                d(i);
                let r = t.get("sessionToken") || t.get("token"),
                  o = sessionStorage.getItem("authToken"),
                  s =
                    t.get("redirectUrl") ||
                    window.sessionStorage.getItem("redirectUrl");
                window.sessionStorage.setItem("redirectUrl", s || "null"),
                  r ? await e(r, i) : o && n(o),
                  a6();
              })();
            }, [n, a]),
            (0, x.useEffect)(() => {
              let n = async () => {
                let n = await a7.getGameInfo();
                t({
                  bettingCountDown: n.gameInfo.bettingCountDown,
                  liveGameId: n.gameInfo.liveGameId,
                  gameStatus: n.gameInfo.gameStatus,
                  gameManagerId: n.gameInfo.gameManagerId,
                  gameHistory: n.gameInfo.gameHistory,
                }),
                  r({
                    balance: n.playerInfo.balance,
                    currency: n.playerInfo.currency,
                    chips: n.playerInfo.chips,
                    defaultChip: n.playerInfo.defaultChip,
                    loginName: n.playerInfo.loginName,
                    playerId: n.playerInfo.playerId,
                    maxBet: n.playerInfo.maxBet,
                    minBet: n.playerInfo.minBet,
                    tableLimit: n.playerInfo.tableLimit,
                    voucherInfo: n.playerInfo.voucherInfo,
                    language: n.playerInfo.language,
                    cashOutMax: n.playerInfo.cashOutMax,
                    cashOutMin: n.playerInfo.cashOutMin,
                    showVoucherPanel: null !== n.playerInfo.voucherInfo,
                  });
              };
              e && (ty(), n(), tx());
            }, [e, r]),
            (0, x.useEffect)(() => {
              document.addEventListener(
                "click",
                () => {
                  null == i || i.playExistedAudioLoop("bg", 0.1);
                },
                {
                  once: !0,
                }
              );
            }, []),
            (0, m.jsxs)(m.Fragment, {
              children: [
                (0, m.jsx)(eG, {}),
                (0, m.jsx)(tl(), {
                  children: (0, m.jsx)("title", {
                    children: u,
                  }),
                }),
                (0, m.jsx)(nt.Cv, {
                  config: ta(),
                  gameName: o(l),
                }),
                (0, m.jsx)(z.Z, {
                  isFromOpPage: !1,
                }),
                (0, m.jsx)(nm, {}),
                (0, m.jsxs)(a3, {
                  children: [
                    (0, m.jsx)(aQ, {}),
                    (0, m.jsx)(i7, {}),
                    (0, m.jsx)(eJ, {}),
                    (0, m.jsx)(ti, {}),
                    (0, m.jsx)(nB, {}),
                    (0, m.jsx)(tj.b, {
                      token: e,
                      lang: c,
                    }),
                  ],
                }),
              ],
            })
          );
        },
        on = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/bg_withLogo.c821d9a4.png",
        },
        oe = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/bg_withLogo.f42586f2.png",
        },
        ot = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/bg.a7fb0832.png",
        },
        oi = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/bg_withLogo.bc592456.png",
        },
        or = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/bg.4ecb4596.png",
        };
      function oa() {
        let n = (0, f._)([
          "\n      background: linear-gradient(0deg, #f8ebed, #edc6a0);\n    ",
        ]);
        return (
          (oa = function () {
            return n;
          }),
          n
        );
      }
      function oo() {
        let n = (0, f._)([
          "\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  color: #80ff00;\n  background: linear-gradient(90deg, #371b55, #371b55);\n  z-index: 1000;\n  ",
          "\n",
        ]);
        return (
          (oo = function () {
            return n;
          }),
          n
        );
      }
      function os() {
        let n = (0, f._)(["\n      background-image: url(", ");\n    "]);
        return (
          (os = function () {
            return n;
          }),
          n
        );
      }
      function ol() {
        let n = (0, f._)([
          "\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: bottom;\n  padding: 10px;\n  background-image: ",
          ";\n  z-index: 1000;\n\n  ",
          "\n",
        ]);
        return (
          (ol = function () {
            return n;
          }),
          n
        );
      }
      function oc() {
        let n = (0, f._)([
          "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin: 150px;\n  margin-top: 100px;\n",
        ]);
        return (
          (oc = function () {
            return n;
          }),
          n
        );
      }
      function od() {
        let n = (0, f._)([
          "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n  padding: 20px;\n",
        ]);
        return (
          (od = function () {
            return n;
          }),
          n
        );
      }
      function ou() {
        let n = (0, f._)(["\n      border: 3px solid #ff82ba;\n    "]);
        return (
          (ou = function () {
            return n;
          }),
          n
        );
      }
      function op() {
        let n = (0, f._)([
          "\n  width: 300px;\n  height: 30px;\n  border-radius: 50px;\n  border: 3px solid #80ff00;\n  padding: 3px;\n  ",
          "\n",
        ]);
        return (
          (op = function () {
            return n;
          }),
          n
        );
      }
      function oh() {
        let n = (0, f._)([
          "\n      background: linear-gradient(90deg, #8700a8, #ff7ca9);\n    ",
        ]);
        return (
          (oh = function () {
            return n;
          }),
          n
        );
      }
      function om() {
        let n = (0, f._)([
          "\n  width: ",
          ";\n  height: 100%;\n  background: linear-gradient(90deg, #141830 0%, #224643 20%, #80ff00);\n  border-radius: 50px;\n  ",
          "\n",
        ]);
        return (
          (om = function () {
            return n;
          }),
          n
        );
      }
      function ox() {
        let n = (0, f._)(["\n      color: #ffffff;\n    "]);
        return (
          (ox = function () {
            return n;
          }),
          n
        );
      }
      function of() {
        let n = (0, f._)([
          "\n  margin-top: 10px;\n  color: #80ff00;\n  font-size: 16px;\n  ",
          "\n",
        ]);
        return (
          (of = function () {
            return n;
          }),
          n
        );
      }
      let og = (n) => {
          switch (n) {
            case to.l.Default:
              return "url(".concat(on.src, ")");
            case to.l.oneXMidnightRobbery:
              return "url(".concat(oi.src, ")");
            default:
              return "url(".concat(on.src, ")");
          }
        },
        ob = (n) => {
          switch (n) {
            case to.l.Default:
              return "url(".concat(on.src, ")");
            case to.l.oneXMidnightRobbery:
              return "url(".concat(or.src, ")");
            default:
              return "url(".concat(on.src, ")");
          }
        },
        o_ = g.ZP.div(oo(), (n) => n.isEnableEasterTheme && (0, g.iv)(oa())),
        oy = g.ZP.div(
          ol(),
          (n) => (n.withLogo ? og(n.theme) : ob(n.theme)),
          (n) =>
            n.isEnableEasterTheme &&
            (0, g.iv)(os(), n.withLogo ? oe.src : ot.src)
        ),
        ow = g.ZP.div(oc()),
        ov = g.ZP.div(od()),
        oj = g.ZP.div(op(), (n) => n.isEnableEasterTheme && (0, g.iv)(ou())),
        oS = g.ZP.div(
          om(),
          (n) => (n.width ? "".concat(n.width, "%") : "0%"),
          (n) => n.isEnableEasterTheme && (0, g.iv)(oh())
        ),
        ok = g.ZP.div(of(), (n) => n.isEnableEasterTheme && (0, g.iv)(ox()));
      var oP = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/tutorial_1.5277a354.png",
        },
        oO = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/tutorial_2.3845182b.png",
        },
        oC = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/tutorial_3.29fdc88a.png",
        };
      function oz() {
        let n = (0, f._)([
          "\n   0% { transform: scale(1) }\n   50% { transform: scale(1.1) }\n   100% { transform: scale(1) }\n",
        ]);
        return (
          (oz = function () {
            return n;
          }),
          n
        );
      }
      function oT() {
        let n = (0, f._)([
          "\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 6;\n  width: 100%;\n  height: 100%;\n  background: ",
          ";\n",
        ]);
        return (
          (oT = function () {
            return n;
          }),
          n
        );
      }
      function oE() {
        let n = (0, f._)([
          "\n  background: url(",
          ") no-repeat center/100% 100%;\n",
        ]);
        return (
          (oE = function () {
            return n;
          }),
          n
        );
      }
      function oM() {
        let n = (0, f._)([
          "\n  background: url(",
          ") no-repeat center/100% 100%;\n",
        ]);
        return (
          (oM = function () {
            return n;
          }),
          n
        );
      }
      function oN() {
        let n = (0, f._)([
          "\n  background: url(",
          ") no-repeat center/100% 100%;\n",
        ]);
        return (
          (oN = function () {
            return n;
          }),
          n
        );
      }
      function oB() {
        let n = (0, f._)([
          "\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  padding: 20px;\n",
        ]);
        return (
          (oB = function () {
            return n;
          }),
          n
        );
      }
      function oR() {
        let n = (0, f._)([
          "\n  /* width: 179px;\n  height: 43px; */\n  transform: scale(1);\n  border: 1px solid #7dfb04;\n  border-radius: 50px;\n  color: #80ff00;\n  background-color: #000;\n  padding: 5px 25px;\n  cursor: pointer;\n  animation: ",
          " 1s;\n  animation-iteration-count: infinite;\n",
        ]);
        return (
          (oR = function () {
            return n;
          }),
          n
        );
      }
      function oA() {
        let n = (0, f._)([
          "\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  margin-top: 15%;\n",
        ]);
        return (
          (oA = function () {
            return n;
          }),
          n
        );
      }
      function oZ() {
        let n = (0, f._)([
          "\n  width: 90%;\n  border: 2px solid #424343;\n  border-radius: 30px;\n  background-color: #000;\n  color: #fff;\n  text-align: center;\n  padding: 20px;\n  margin-top: 40px;\n",
        ]);
        return (
          (oZ = function () {
            return n;
          }),
          n
        );
      }
      function oI() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px;\n",
        ]);
        return (
          (oI = function () {
            return n;
          }),
          n
        );
      }
      function oL() {
        let n = (0, f._)(["\n  color: #a1f566;\n  margin: 5px;\n"]);
        return (
          (oL = function () {
            return n;
          }),
          n
        );
      }
      function oG() {
        let n = (0, f._)(["\n  color: #20cfed;\n  margin: 5px;\n"]);
        return (
          (oG = function () {
            return n;
          }),
          n
        );
      }
      function oF() {
        let n = (0, f._)([
          "\n  width: 10px;\n  height: 10px;\n  background-color: ",
          ";\n  border: 1px solid #d9d9d9;\n  border-radius: 50%;\n  margin: 0 10px;\n  cursor: pointer;\n",
        ]);
        return (
          (oF = function () {
            return n;
          }),
          n
        );
      }
      function oD() {
        let n = (0, f._)([
          "\n  display: flex;\n  justify-content: center;\n  width: 100%;\n",
        ]);
        return (
          (oD = function () {
            return n;
          }),
          n
        );
      }
      function oH() {
        let n = (0, f._)([
          "\n  display: flex;\n  align-items: center;\n  color: #239fb9;\n  font-size: 12px;\n",
        ]);
        return (
          (oH = function () {
            return n;
          }),
          n
        );
      }
      function oq() {
        let n = (0, f._)([
          "\n  display: block;\n  position: relative;\n  padding-left: 25px;\n  margin-bottom: 15px;\n  cursor: pointer;\n  font-size: 22px;\n  user-select: none;\n\n  > input {\n    position: absolute;\n    opacity: 0;\n    cursor: pointer;\n    height: 0;\n    width: 0;\n  }\n\n  > span {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 15px;\n    width: 15px;\n    border: 2px solid #239fb9;\n\n    &:after {\n      content: '';\n      position: absolute;\n      display: none;\n      left: 4px;\n      top: 0px;\n      width: 5px;\n      height: 10px;\n      border: solid white;\n      border-width: 0 3px 3px 0;\n      transform: rotate(45deg);\n    }\n  }\n\n  & > input:checked ~ span {\n    background-color: #239fb9;\n  }\n\n  & > input:checked ~ span:after {\n    display: block;\n  }\n",
        ]);
        return (
          (oq = function () {
            return n;
          }),
          n
        );
      }
      function oU() {
        let n = (0, f._)([
          "\n  cursor: pointer;\n  margin: 0 10px;\n  margin-top: 80px;\n",
        ]);
        return (
          (oU = function () {
            return n;
          }),
          n
        );
      }
      let oW = (0, g.F4)(oz()),
        oY = g.ZP.div(oT(), (n) =>
          1 === n.step
            ? "url(".concat(oP.src, ") no-repeat center/100% 100%")
            : 2 === n.step
            ? "url(".concat(oO.src, ") no-repeat center/100% 100%")
            : "url(".concat(oC.src, ") no-repeat center/100% 100%")
        ),
        oV = g.ZP.div(oE(), oP.src),
        oX = g.ZP.div(oM(), oO.src),
        oK = g.ZP.div(oN(), oC.src),
        oJ = g.ZP.div(oB()),
        oQ = g.ZP.div(oR(), oW),
        o$ = g.ZP.div(oA()),
        o0 = g.ZP.div(oZ()),
        o1 = g.ZP.div(oI()),
        o2 = g.ZP.span(oL());
      g.ZP.span(oG());
      let o5 = g.ZP.div(oF(), (n) => (n.focus ? "#d9d9d9" : "inherit")),
        o3 = g.ZP.div(oD()),
        o4 = g.ZP.div(oH()),
        o6 = g.ZP.label(oq()),
        o8 = g.ZP.div(oU());
      var o7 = () =>
          (0, m.jsxs)(m.Fragment, {
            children: [
              (0, m.jsx)(oV, {}),
              (0, m.jsx)(oX, {}),
              (0, m.jsx)(oK, {}),
            ],
          }),
        o9 = () => {
          let [n, e] = (0, x.useState)(0),
            t = (0, nh.H)((n) => n.gameToggle),
            i = (0, tf.f)((n) => n.theme),
            r = 0,
            a = () => {
              if (0 === r) {
                r = 1;
                let n = 0,
                  t = setInterval(() => {
                    100 === n ? (clearInterval(t), (r = 0)) : e(++n);
                  }, 10);
              }
            };
          return (
            (0, x.useEffect)(() => {
              a();
            }, []),
            n < 100 &&
              (0, m.jsx)(o_, {
                withLogo: t.isEnableFunkyGameLogo,
                isEnableEasterTheme: t.isEnableEasterTheme,
                children: (0, m.jsxs)(oy, {
                  withLogo: t.isEnableFunkyGameLogo,
                  isEnableEasterTheme: t.isEnableEasterTheme,
                  theme: i,
                  children: [
                    (0, m.jsxs)(ow, {
                      children: [
                        (0, m.jsx)(nQ.Z, {
                          fullWidth: !0,
                          isEnableEasterTheme: t.isEnableEasterTheme,
                          width: 244,
                          height: 108,
                        }),
                        (0, m.jsxs)(ov, {
                          children: [
                            (0, m.jsx)(oj, {
                              isEnableEasterTheme: t.isEnableEasterTheme,
                              children: (0, m.jsx)(oS, {
                                width: n,
                                isEnableEasterTheme: t.isEnableEasterTheme,
                              }),
                            }),
                            (0, m.jsxs)(ok, {
                              isEnableEasterTheme: t.isEnableEasterTheme,
                              children: [n, "%"],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, m.jsx)(o7, {}),
                  ],
                }),
              })
          );
        },
        sn = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/polygon_left.21c0827b.png",
        },
        se = {
          src: "https://2yz760eyb6qt4gx.landmuzie.com/midnightrobbery/_next/static/media/polygon_right.9a3ece9b.png",
        },
        st = () => {
          let { t: n } = (0, k.Z)("common"),
            [e, t, i, r] = ez((n) => [
              n.isSkipNextTime,
              n.setIsSkipNextTime,
              n.isShowTutorial,
              n.setIsShowTutorial,
            ]),
            [a, o] = (0, x.useState)(1),
            s = (0, nh.H)((n) => n.gameToggle);
          return (0, m.jsx)(m.Fragment, {
            children:
              s.isEnableTutorial &&
              i &&
              (0, m.jsxs)(oY, {
                step: a,
                children: [
                  (0, m.jsxs)(o$, {
                    children: [
                      (0, m.jsx)(o8, {
                        onClick: () => {
                          a > 1 ? o(a - 1) : o(3);
                        },
                        children: (0, m.jsx)(S(), {
                          width: "15",
                          height: "15",
                          layout: "fixed",
                          src: sn.src,
                          alt: "point",
                        }),
                      }),
                      (0, m.jsxs)(o0, {
                        children: [
                          1 === a &&
                            (0, m.jsx)("div", {
                              children: (0, m.jsx)(t8.Z, {
                                i18nKey: "common:Main_Tutorial_Step1_Text",
                                components: [(0, m.jsx)(o2, {}, 1)],
                              }),
                            }),
                          2 === a &&
                            (0, m.jsx)("div", {
                              children: n("Main_Tutorial_Step2_Text"),
                            }),
                          3 === a &&
                            (0, m.jsx)("div", {
                              children: n("Main_Tutorial_Step3_Text"),
                            }),
                          (0, m.jsxs)(o1, {
                            children: [
                              (0, m.jsx)(o5, {
                                focus: 1 === a,
                                onClick: () => o(1),
                              }),
                              (0, m.jsx)(o5, {
                                focus: 2 === a,
                                onClick: () => o(2),
                              }),
                              (0, m.jsx)(o5, {
                                focus: 3 === a,
                                onClick: () => o(3),
                              }),
                            ],
                          }),
                          (0, m.jsx)(o3, {
                            children: (0, m.jsxs)(o4, {
                              children: [
                                (0, m.jsxs)(o6, {
                                  children: [
                                    (0, m.jsx)("input", {
                                      type: "checkbox",
                                      checked: e,
                                      onClick: (n) => {
                                        let e = n.target.checked;
                                        e &&
                                          (0, eT.sx)(
                                            "tutorial_don't_show_confirm"
                                          ),
                                          t(e);
                                      },
                                    }),
                                    (0, m.jsx)("span", {}),
                                  ],
                                }),
                                (0, m.jsx)("span", {
                                  children: n("Main_Tutorial_Checkbox_Text"),
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      (0, m.jsx)(o8, {
                        onClick: () => {
                          a < 3 ? o(a + 1) : o(1);
                        },
                        children: (0, m.jsx)(S(), {
                          width: "15",
                          height: "15",
                          layout: "fixed",
                          src: se.src,
                          alt: "point",
                        }),
                      }),
                    ],
                  }),
                  (0, m.jsx)(oJ, {
                    children: (0, m.jsx)(oQ, {
                      onClick: () => {
                        switch (a) {
                          case 1:
                            (0, eT.sx)("tutorial_1_START_GAME");
                            break;
                          case 2:
                            (0, eT.sx)("tutorial_2_START_GAME");
                            break;
                          case 3:
                            (0, eT.sx)("tutorial_3_START_GAME");
                        }
                        o(1), r(!1);
                      },
                      children: n("Main_Tutorial_Start_Game"),
                    }),
                  }),
                ],
              }),
          });
        };
      function si() {
        let n = (0, f._)(["\n  width: 100%;\n  height: 100%;\n"]);
        return (
          (si = function () {
            return n;
          }),
          n
        );
      }
      let sr = g.ZP.div(si());
      var sa = () =>
          (0, m.jsxs)(sr, {
            children: [
              (0, m.jsx)(o9, {}),
              (0, m.jsx)(a9, {}),
              (0, m.jsx)(st, {}),
            ],
          }),
        so = !0,
        ss = (n) => {
          let { theme: e } = n,
            [t, r] = (0, x.useState)(null),
            a = (0, nR.n)((n) => n.playerState),
            o = (0, tf.f)((n) => n.setTheme);
          return (
            (0, x.useEffect)(() => {
              e && o(e);
            }, [e]),
            (0, x.useEffect)(() => {
              r(window.innerHeight),
                window.resizeTo(
                  ta().openWindowSize.width,
                  ta().openWindowSize.height
                ),
                window.addEventListener("resize", function () {
                  r(window.innerHeight);
                }),
                window.addEventListener("orientationchange", function () {
                  r(window.innerHeight);
                }),
                (0, nt.LV)(
                  window.location.hostname,
                  ta().GA_TRACKING_ID,
                  null == a ? void 0 : a.playerId
                );
            }, []),
            (0, x.useEffect)(() => {
              let n = ta().audioUrl;
              em(ta().gamename, ta().audioGroup, n),
                document.addEventListener("visibilitychange", () => {
                  document.hidden ? i.muteAll() : i.resumeAll();
                });
            }, []),
            (0, m.jsxs)(C.Z, {
              isFromOpPage: !1,
              gameHeight: t,
              children: [
                (0, m.jsx)(O.H, {
                  isBetDetailPage: !1,
                }),
                (0, m.jsx)(P, {}),
                t && (0, m.jsx)(sa, {}),
              ],
            })
          );
        };
    },
  },
]);
