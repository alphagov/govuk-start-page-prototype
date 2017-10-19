function govspeakBarcharts() {
    $(".govuk-govspeak .js-barchart-table").each(function() {
        $.magnaCharta($(this), {
            toggleText: "Change between chart and table"
        })
    })
}
!function(t) {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      , i = function(t) {
        t = t.replace(/\x0d\x0a/g, "\n");
        for (var e = "", i = 0; i < t.length; i++) {
            var n = t.charCodeAt(i);
            128 > n ? e += String.fromCharCode(n) : n > 127 && 2048 > n ? (e += String.fromCharCode(n >> 6 | 192),
            e += String.fromCharCode(63 & n | 128)) : (e += String.fromCharCode(n >> 12 | 224),
            e += String.fromCharCode(n >> 6 & 63 | 128),
            e += String.fromCharCode(63 & n | 128))
        }
        return e
    }
      , n = function(t) {
        for (var e = "", i = 0, n = c1 = c2 = 0; i < t.length; )
            n = t.charCodeAt(i),
            128 > n ? (e += String.fromCharCode(n),
            i++) : n > 191 && 224 > n ? (c2 = t.charCodeAt(i + 1),
            e += String.fromCharCode((31 & n) << 6 | 63 & c2),
            i += 2) : (c2 = t.charCodeAt(i + 1),
            c3 = t.charCodeAt(i + 2),
            e += String.fromCharCode((15 & n) << 12 | (63 & c2) << 6 | 63 & c3),
            i += 3);
        return e
    };
    t.extend({
        base64Encode: function(t) {
            var n, a, o, s, r, l, c, d = "", u = 0;
            for (t = i(t); u < t.length; )
                n = t.charCodeAt(u++),
                a = t.charCodeAt(u++),
                o = t.charCodeAt(u++),
                s = n >> 2,
                r = (3 & n) << 4 | a >> 4,
                l = (15 & a) << 2 | o >> 6,
                c = 63 & o,
                isNaN(a) ? l = c = 64 : isNaN(o) && (c = 64),
                d = d + e.charAt(s) + e.charAt(r) + e.charAt(l) + e.charAt(c);
            return d
        },
        base64Decode: function(t) {
            var i, a, o, s, r, l, c, d = "", u = 0;
            for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); u < t.length; )
                s = e.indexOf(t.charAt(u++)),
                r = e.indexOf(t.charAt(u++)),
                l = e.indexOf(t.charAt(u++)),
                c = e.indexOf(t.charAt(u++)),
                i = s << 2 | r >> 4,
                a = (15 & r) << 4 | l >> 2,
                o = (3 & l) << 6 | c,
                d += String.fromCharCode(i),
                64 != l && (d += String.fromCharCode(a)),
                64 != c && (d += String.fromCharCode(o));
            return d = n(d)
        }
    })
}(jQuery),
function(t) {
    var e = function() {
        this.init = function(e, i) {
            var n = {
                outOf: 65,
                applyOnInit: !0,
                toggleText: "Toggle between chart and table",
                autoOutdent: !1,
                outdentAll: !1
            };
            this.options = t.extend({}, n, i);
            var a = function() {
                var t, e = 3, i = document.createElement("div"), n = i.getElementsByTagName("i");
                do
                    i.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->";
                while (10 > e && n[0]);return e > 4 ? e : t
            }();
            return this.ENABLED = !(a && 8 > a),
            this.$table = e,
            this.$graph = t("<div/>").attr("aria-hidden", "true"),
            this.$graph.attr("class", this.$table.attr("class")).addClass("mc-chart"),
            this.options.stacked = this.$table.hasClass("mc-stacked"),
            this.options.negative = this.$table.hasClass("mc-negative"),
            this.options.multiple = !this.options.stacked && (this.$table.hasClass("mc-multiple") || this.$table.find("tbody tr").first().find("td").length > 2),
            this.options.autoOutdent = this.options.autoOutdent || this.$table.hasClass("mc-auto-outdent"),
            this.options.outdentAll = this.options.outdentAll || this.$table.hasClass("mc-outdented"),
            this.options.multiple && this.$graph.addClass("mc-multiple"),
            this.options.hasCaption = !!this.$table.find("caption").length,
            this.ENABLED && (this.apply(),
            this.options.applyOnInit || this.toggle()),
            this
        }
    };
    e.prototype.construct = {},
    e.prototype.construct.thead = function() {
        var e = t("<div />", {
            "class": "mc-thead"
        })
          , i = t("<div />", {
            "class": "mc-tr"
        })
          , n = "";
        return this.$table.find("th").each(function(e, i) {
            n += '<div class="mc-th">',
            n += t(i).html(),
            n += "</div>"
        }),
        i.append(n),
        e.append(i),
        e
    }
    ,
    e.prototype.construct.tbody = function() {
        var e = t("<div />", {
            "class": "mc-tbody"
        });
        return this.$table.find("tbody tr").each(function(i, n) {
            var a = t("<div />", {
                "class": "mc-tr"
            })
              , o = "";
            t(n).find("td").each(function(e, i) {
                o += '<div class="mc-td">',
                o += t(i).html(),
                o += "</div>"
            }),
            a.append(o),
            e.append(a)
        }),
        e
    }
    ,
    e.prototype.construct.caption = function() {
        var t = this.$table.find("caption");
        return t.clone()
    }
    ,
    e.prototype.construct.toggleLink = function() {
        var e = this;
        return t("<a />", {
            href: "#",
            "class": "mc-toggle-link",
            text: this.options.toggleText
        }).on("click", function(t) {
            e.toggle(t)
        })
    }
    ,
    e.prototype.constructChart = function() {
        var t = this.construct.thead.call(this)
          , e = this.construct.tbody.call(this)
          , i = this.construct.toggleLink.call(this);
        if (this.options.hasCaption) {
            var n = this.construct.caption.call(this);
            this.$graph.append(n)
        }
        this.$table.before(i),
        this.$graph.append(t),
        this.$graph.append(e)
    }
    ,
    e.prototype.apply = function() {
        this.ENABLED && (this.constructChart(),
        this.addClassesToHeader(),
        this.calculateMaxWidth(),
        this.applyWidths(),
        this.insert(),
        this.$table.addClass("visually-hidden"),
        this.applyOutdent())
    }
    ,
    e.prototype.toggle = function(t) {
        this.$graph.toggle(),
        this.$table.toggleClass("visually-hidden"),
        t && t.preventDefault()
    }
    ,
    e.prototype.utils = {
        isFloat: function(t) {
            return !isNaN(parseFloat(t))
        },
        stripValue: function(t) {
            var e = new RegExp("\\,|\xa3|%|[a-z]","gi");
            return t.replace(e, "")
        },
        returnMax: function(t) {
            for (var e = 0, i = 0; i < t.length; i++)
                t[i] > e && (e = t[i]);
            return e
        },
        isNegative: function(t) {
            return 0 > t
        }
    },
    e.prototype.addClassesToHeader = function() {
        var e = this.$graph.find(".mc-th").filter(":not(:first)");
        this.options.stacked && (e.last().addClass("mc-stacked-header mc-header-total"),
        e = e.filter(":not(:last)")),
        e.addClass("mc-key-header").filter(":not(.mc-stacked-header)").each(function(e, i) {
            t(i).addClass("mc-key-" + (e + 1))
        })
    }
    ,
    e.prototype.calculateMaxWidth = function() {
        var e = this
          , i = []
          , n = 0;
        this.$graph.find(".mc-tr").each(function(a, o) {
            var s = t(o)
              , r = s.find(".mc-td:not(:first)");
            if (e.options.stacked) {
                r.last().addClass("mc-stacked-total");
                r = r.filter(":not(:last)")
            }
            s.find(".mc-td:first").addClass("mc-key-cell");
            var l = 0;
            r.each(function(a, o) {
                var s = t(o).addClass("mc-bar-cell").addClass("mc-bar-" + (a + 1))
                  , r = e.utils.stripValue(s.text());
                if (e.utils.isFloat(r)) {
                    var c = parseFloat(r, 10)
                      , d = Math.abs(c);
                    0 === c && s.addClass("mc-bar-zero"),
                    e.options.negative && (e.utils.isNegative(c) ? (s.addClass("mc-bar-negative"),
                    d > n && (n = d)) : s.addClass("mc-bar-positive")),
                    c = d,
                    e.options.stacked ? l += c : (l = c,
                    i.push(c))
                }
            }),
            e.options.stacked && i.push(l)
        });
        var a = {};
        return a.max = parseFloat(e.utils.returnMax(i), 10),
        a.single = parseFloat(this.options.outOf / a.max, 10),
        this.options.negative && (a.marginLeft = parseFloat(n, 10) * a.single,
        a.maxNegative = parseFloat(n, 10)),
        a
    }
    ,
    e.prototype.applyWidths = function() {
        this.dimensions = this.calculateMaxWidth();
        var e = this;
        this.$graph.find(".mc-tr").each(function(i, n) {
            var a = t(n);
            a.find(".mc-bar-cell:not(.mc-bar-zero)").length;
            a.find(".mc-bar-cell").each(function(i, n) {
                var a = t(n)
                  , o = parseFloat(e.utils.stripValue(a.text()), 10)
                  , s = o * e.dimensions.single
                  , r = Math.abs(o)
                  , l = Math.abs(s);
                if (e.options.negative)
                    if (a.hasClass("mc-bar-positive"))
                        a.css("margin-left", e.dimensions.marginLeft + "%");
                    else if (r < e.dimensions.maxNegative) {
                        var c = (e.dimensions.maxNegative - r) * e.dimensions.single;
                        a.css("margin-left", c + "%")
                    }
                a.wrapInner("<span />"),
                a.css("width", l + "%")
            })
        })
    }
    ,
    e.prototype.insert = function() {
        this.$table.after(this.$graph)
    }
    ,
    e.prototype.applyOutdent = function() {
        var e = this;
        this.$graph.find(".mc-bar-cell");
        this.$graph.find(".mc-bar-cell").each(function(i, n) {
            var a = t(n)
              , o = parseFloat(e.utils.stripValue(a.text()), 10)
              , s = a.children("span")
              , r = s.width() + 10
              , l = a.width();
            parseFloat(a[0].style.width, 10),
            a.height();
            e.options.stacked ? r > l && o > 0 && a.addClass("mc-value-overflow") : (0 === o && a.addClass("mc-bar-outdented"),
            e.options.autoOutdent && r > l || e.options.outdentAll ? (a.addClass("mc-bar-outdented"),
            s.css({
                "margin-left": "100%",
                display: "inline-block"
            })) : a.addClass("mc-bar-indented"))
        })
    }
    ,
    t.magnaCharta = function(t, i) {
        return (new e).init(t, i)
    }
}(jQuery),
function(t) {
    "use strict";
    function e(t) {
        this.$optionSelect = t.$el,
        this.$options = this.$optionSelect.find("input[type='checkbox']"),
        this.$labels = this.$optionSelect.find("label"),
        this.$optionsContainer = this.$optionSelect.find(".options-container"),
        this.$optionList = this.$optionsContainer.children(".js-auto-height-inner"),
        this.setCheckboxAriaControlsAttributes(),
        this.attachCheckedCounter();
        var e = "undefined" == typeof ieVersion || ieVersion > 7 ? !0 : !1;
        e && (this.$options.on("click", this.updateCheckedCount.bind(this)),
        this.replaceHeadWithButton(),
        this.$optionSelect.addClass("js-collapsible"),
        this.$optionSelect.find(".js-container-head").on("click", this.toggleOptionSelect.bind(this)),
        this.$optionSelect.on("focus", this.listenForKeys.bind(this)),
        this.$optionSelect.on("blur", this.stopListeningForKeys.bind(this)),
        this.$options.on("focus", this.open.bind(this)),
        1 == this.$optionSelect.data("closed-on-load") ? this.close() : this.setupHeight())
    }
    window.GOVUK = window.GOVUK || {},
    e.prototype.replaceHeadWithButton = function() {
        var e = this.$optionSelect.find(".js-container-head")
          , i = e.html()
          , n = t("<button>");
        n.addClass("js-container-head"),
        n.attr("type", "button"),
        n.attr("aria-expanded", !0),
        n.attr("aria-controls", this.$optionSelect.find(".options-container").attr("id")),
        n.html(i),
        e.replaceWith(n)
    }
    ,
    e.prototype.setCheckboxAriaControlsAttributes = function() {
        var e = this.$optionSelect.data("input-aria-controls");
        "string" == typeof e && t("#" + e).length > 0 && this.$optionSelect.find('input[type="checkbox"]').each(function() {
            t(this).attr("aria-controls", e)
        })
    }
    ,
    e.prototype.attachCheckedCounter = function() {
        this.$optionSelect.find(".js-container-head").append('<div class="js-selected-counter">' + this.checkedString() + "</div>")
    }
    ,
    e.prototype.updateCheckedCount = function() {
        this.$optionSelect.find(".js-selected-counter").text(this.checkedString())
    }
    ,
    e.prototype.checkedString = function i() {
        var t = this.$options.filter(":checked").size()
          , i = "";
        return t > 0 && (i = t + " selected"),
        i
    }
    ,
    e.prototype.toggleOptionSelect = function(t) {
        this.isClosed() ? this.open() : this.close(),
        t.preventDefault()
    }
    ,
    e.prototype.open = function() {
        this.isClosed() && (this.$optionSelect.find(".js-container-head").attr("aria-expanded", !0),
        this.$optionSelect.removeClass("js-closed"),
        this.$optionsContainer.prop("style").height || this.setupHeight())
    }
    ,
    e.prototype.close = function() {
        this.$optionSelect.addClass("js-closed"),
        this.$optionSelect.find(".js-container-head").attr("aria-expanded", !1)
    }
    ,
    e.prototype.isClosed = function() {
        return this.$optionSelect.hasClass("js-closed")
    }
    ,
    e.prototype.setContainerHeight = function(t) {
        this.$optionsContainer.css({
            "max-height": "none",
            height: t
        })
    }
    ,
    e.prototype.isLabelVisible = function(e, i) {
        var n = t(i)
          , a = this.$optionsContainer.height()
          , o = this.$optionList.offset().top
          , s = n.offset().top - o;
        return a > s
    }
    ,
    e.prototype.getVisibleLabels = function() {
        return this.$labels.filter(this.isLabelVisible.bind(this))
    }
    ,
    e.prototype.setupHeight = function() {
        var t, e, i, n, a, o = this.$optionsContainer.height(), s = this.$optionList.height();
        return o + 50 > s ? void this.setContainerHeight(s) : (t = this.getVisibleLabels().last(),
        e = t.position().top,
        i = parseInt(t.css("border-top-width"), 10),
        n = parseInt(t.css("padding-top"), 10),
        a = "normal" == t.css("line-height") ? parseInt(t.css("font-size"), 10) : parseInt(t.css("line-height"), 10),
        void this.setContainerHeight(e + i + n + a / 2))
    }
    ,
    e.prototype.listenForKeys = function() {
        this.$optionSelect.keypress(this.checkForSpecialKeys.bind(this))
    }
    ,
    e.prototype.checkForSpecialKeys = function(t) {
        13 == t.keyCode && this.toggleOptionSelect()
    }
    ,
    e.prototype.stopListeningForKeys = function() {
        this.$optionSelect.unbind("keypress")
    }
    ,
    GOVUK.OptionSelect = e;
    t(".govuk-option-select").map(function() {
        return new GOVUK.OptionSelect({
            $el: t(this)
        })
    })
}(jQuery),
function(t) {
    var e = t.suchi = t.suchi || {};
    e.laggards = {
        IE6: /^Mozilla\/4\.0 \(compatible; MSIE 6\.0; Windows NT \d\.\d(.*)\)$/g,
        IE7: /^Mozilla\/4\.0 \(compatible; MSIE 7\.0; Windows NT \d\.\d(.*)\)$/g,
        IE8: /^Mozilla\/4\.0 \(compatible; MSIE 8\.0; Windows NT \d\.\d;(.*)? Trident\/4\.0(;)?(.*)\)$/g,
        IE9: /^Mozilla\/5\.0 \(compatible; MSIE 9\.0; Windows NT \d\.\d(.*); Trident\/5\.0(.*)\)$/g,
        IE10: /^Mozilla\/5\.0 \(compatible; MSIE 10\.0; Windows NT \d\.\d(.*); Trident\/6\.0(.*)\)$/g,
        FF36: /^Mozilla\/5\.0 \((Windows|Macintosh); U;(.*)rv\:1\.9\.2.(\d{1,2})\)( Gecko\/(\d{8}))? Firefox\/3\.6(\.\d{1,2})?( \(.+\))?$/g,
        CR_recent: /^Mozilla\/5\.0 \((Windows NT|Macintosh|X11|(Linux; Android \d\.\d\.\d))(;)?( .*)\) AppleWebKit\/53\d\.\d{1,2} \(KHTML(,)? like Gecko\) Chrome\/(16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33)\.0\.\d{3,4}\.\d{1,3} (Mobile )?Safari\/53\d\.\d{1,2}$/g,
        FF_recent: /^Mozilla\/5\.0 \((Windows NT \d\.\d|Macintosh|Android|X11); (.*)rv\:(9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28)\.0(\.\d{1,2})?\) Gecko\/(\d{8}|(\d{2}\.0)) Firefox\/(9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28)\.0(\.\d{1,2})?$/g,
        SAF51: /^Mozilla\/5\.0 \((Windows NT \d\.\d|Macintosh)(.*)\) AppleWebKit\/534\.\d{2}(\.\d{1,2})? \(KHTML, like Gecko\) Version\/5\.1\.\d Safari\/534\.\d{2}(\.\d{1,2})?$/g,
        SAF60: /^Mozilla\/5\.0 \((iPhone|iPad|Macintosh);(.*)\) AppleWebKit\/536\.\d{2}(\.\d{1,2})? \(KHTML like Gecko\) Version\/6\.0(\.\d)? ((Mobile\/\d{2}\w\d{3} )?)Safari\/\d{2,4}\.\d{2}(\.\d{1,2})?$/g,
        ANDROID_WEBKIT: /^Mozilla\/5\.0 \(Linux;( U;)? Android 4\.(0|1|2|3|4)(\.\d)?; (.*)?\) \w{2}\-\w{2}; (.*)\) AppleWebKit\/5\d{2}.\d{2} \(KHTML like Gecko\) Version\/4\.\d Mobile Safari\/\d{3}\.\d{2}$/g
    },
    e.isOld = function(t) {
        if ("string" != typeof t)
            return !1;
        for (var e in this.laggards)
            if (t.match(this.laggards[e]))
                return !0;
        return !1
    }
}(this),
function(t, e) {
    "use strict";
    var i, n, a = {};
    a.uaMatch = function(t) {
        t = t.toLowerCase();
        var e = /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
        return {
            browser: e[1] || "",
            version: e[2] || "0"
        }
    }
    ,
    i = a.uaMatch(t.navigator.userAgent),
    n = {},
    i.browser && (a[i.browser] = !0,
    a.version = i.version),
    a.webkit && (a.safari = !0),
    e.historyBrowserShim = a
}(window, jQuery),
jQuery.extend({
    historyCurrentHash: void 0,
    historyCallback: void 0,
    historyIframeSrc: void 0,
    historyNeedIframe: jQuery.historyBrowserShim.msie && (jQuery.historyBrowserShim.version < 8 || document.documentMode < 8),
    historyInit: function(t, e) {
        jQuery.historyCallback = t,
        e && (jQuery.historyIframeSrc = e);
        var i = location.hash.replace(/\?.*$/, "");
        if (jQuery.historyCurrentHash = i,
        jQuery.historyNeedIframe) {
            "" == jQuery.historyCurrentHash && (jQuery.historyCurrentHash = "#"),
            jQuery("body").prepend('<iframe id="jQuery_history" style="display: none;" src="javascript:false;"></iframe>');
            var n = jQuery("#jQuery_history")[0]
              , a = n.contentWindow.document;
            a.open(),
            a.close(),
            a.location.hash = i
        } else
            jQuery.historyBrowserShim.safari && (jQuery.historyBackStack = [],
            jQuery.historyBackStack.length = history.length,
            jQuery.historyForwardStack = [],
            jQuery.lastHistoryLength = history.length,
            jQuery.isFirst = !0);
        i && jQuery.historyCallback(i.replace(/^#/, "")),
        setInterval(jQuery.historyCheck, 100)
    },
    historyAddHistory: function(t) {
        jQuery.historyBackStack.push(t),
        jQuery.historyForwardStack.length = 0,
        this.isFirst = !0
    },
    historyCheck: function() {
        if (jQuery.historyNeedIframe) {
            var t = jQuery("#jQuery_history")[0]
              , e = t.contentDocument || t.contentWindow.document
              , i = e.location.hash.replace(/\?.*$/, "");
            i != jQuery.historyCurrentHash && (location.hash = i,
            jQuery.historyCurrentHash = i,
            jQuery.historyCallback(i.replace(/^#/, "")))
        } else if (jQuery.historyBrowserShim.safari) {
            if (jQuery.lastHistoryLength == history.length && jQuery.historyBackStack.length > jQuery.lastHistoryLength && jQuery.historyBackStack.shift(),
            !jQuery.dontCheck) {
                var n = history.length - jQuery.historyBackStack.length;
                if (jQuery.lastHistoryLength = history.length,
                n) {
                    if (jQuery.isFirst = !1,
                    0 > n)
                        for (var a = 0; a < Math.abs(n); a++)
                            jQuery.historyForwardStack.unshift(jQuery.historyBackStack.pop());
                    else
                        for (var a = 0; n > a; a++)
                            jQuery.historyBackStack.push(jQuery.historyForwardStack.shift());
                    var o = jQuery.historyBackStack[jQuery.historyBackStack.length - 1];
                    void 0 != o && (jQuery.historyCurrentHash = location.hash.replace(/\?.*$/, ""),
                    jQuery.historyCallback(o))
                } else if (void 0 == jQuery.historyBackStack[jQuery.historyBackStack.length - 1] && !jQuery.isFirst) {
                    if (location.hash) {
                        var i = location.hash;
                        jQuery.historyCallback(location.hash.replace(/^#/, ""))
                    } else {
                        var i = "";
                        jQuery.historyCallback("")
                    }
                    jQuery.isFirst = !0
                }
            }
        } else {
            var i = location.hash.replace(/\?.*$/, "");
            i != jQuery.historyCurrentHash && (jQuery.historyCurrentHash = i,
            jQuery.historyCallback(i.replace(/^#/, "")))
        }
    },
    historyLoad: function(t) {
        var e;
        if (t = decodeURIComponent(t.replace(/\?.*$/, "")),
        jQuery.historyBrowserShim.safari ? e = t : (e = "#" + t,
        location.hash = e),
        jQuery.historyCurrentHash = e,
        jQuery.historyNeedIframe) {
            var i = jQuery("#jQuery_history")[0]
              , n = i.contentWindow.document;
            n.open(),
            n.close(),
            n.location.hash = e,
            jQuery.lastHistoryLength = history.length,
            jQuery.historyCallback(t)
        } else if (jQuery.historyBrowserShim.safari) {
            jQuery.dontCheck = !0,
            this.historyAddHistory(t);
            var a = function() {
                jQuery.dontCheck = !1
            };
            window.setTimeout(a, 200),
            jQuery.historyCallback(t),
            location.hash = e
        } else
            jQuery.historyCallback(t)
    }
}),
jQuery.fn.tabs = function(t) {
    var e = $.extend({
        trackState: !0,
        srcPath: "jQuery.history.blank.html",
        autoRotate: !1,
        alwaysScrollToTop: !0,
        selected: null,
        wrapperTag: "section",
        defaultTab: null,
        containerTag: "div",
        scrollOnload: !1
    }, t)
      , i = "tabset"
      , n = function(t) {
        var n = i;
        return "none" === t.find("li").css("float") && (n = "accordion"),
        "accordion" === n ? null === e.defaultTab && (e.defaultTab = -1) : null === e.defaultTab && (e.defaultTab = 0),
        n
    }
      , a = function(t, e) {
        return "accordion" === i ? t.find("header.js-heading-tab") : e.find("li")
    }
      , o = function(t, i, n) {
        var a, o, s, r = i.find("li"), l = i.closest(e.containerTag).parent();
        $.each(r, function(t) {
            var i = $(this).find("a")
              , n = i.attr("href").split("#")[1]
              , r = $('<a href="#' + n + '" class="tab-shiftlink">Return to top of section \u2191</a>');
            a = l.find("#" + n),
            o = a.find("header"),
            o = o.length ? o.remove() : $("<header><h1 /></header>"),
            o.addClass("js-heading-tab").removeClass("visuallyhidden"),
            o.children().html("").append(i),
            s = a.find(".inner"),
            s.length ? s.addClass("js-tab-pane") : s = $('<div class="inner js-tab-pane" />').html(a.html()),
            s.attr("id", n),
            a.replaceWith($("<" + e.wrapperTag + " />").append(s)),
            a = s.parent(),
            a.prepend(o).attr("id", n),
            a.addClass("js-tab-container"),
            s.append(r)
        }),
        i.closest(e.containerTag).remove()
    };
    return $(this).each(function() {
        function t(t, n) {
            if (e.trackState && !n) {
                var a = t.attr("href").split("#")[1];
                $.historyLoad(a)
            } else {
                p.find("a").attr("aria-selected", !1).attr("tabindex", -1),
                "accordion" === i ? p.find("a").closest(".js-heading-tab").removeClass("active") : p.find("a").parent().filter(".active").removeClass("active"),
                t.attr("aria-selected", !0).attr("tabindex", 0),
                "accordion" === i ? t.closest(".js-heading-tab").addClass("active") : t.parent().addClass("active"),
                d.find(".tabs-panel-selected").attr("aria-hidden", !0).attr("aria-expanded", !1).removeClass("tabs-panel-selected").hide();
                var a = t.attr("href").split("#")[1];
                $("#" + a + h).addClass("tabs-panel-selected").attr("aria-hidden", !1).attr("aria-expanded", !0).show(),
                e.selected = p.find("a").index(t),
                l.trigger("tabChanged", a)
            }
        }
        function s(t) {
            p.find("a").attr("aria-selected", !1).attr("tabindex", -1),
            p.find("a").closest(".js-heading-tab").removeClass("active"),
            d.find(".tabs-panel-selected").attr("aria-hidden", !0).attr("aria-expanded", !1).removeClass("tabs-panel-selected").hide()
        }
        function r(i, n) {
            var a = i || window.location.hash;
            0 == a.indexOf("#") && (a = a.split("#")[1]);
            var o = p.find('a[href$="#' + a + '"]');
            return o.size() > 0 ? (t(o, !0),
            e.scrollOnload && n && window.setTimeout(function() {
                $(document).scrollTop(o.offset().top)
            }, 0)) : e.defaultTab > -1 && t(p.find("a").eq(e.defaultTab), !0),
            !!o.size()
        }
        var l = $(this)
          , c = l.find(".js-tabs ul, .js-tabs ol");
        if (0 === c.length)
            return l;
        var d = $(".js-tab-content")
          , u = "tab-"
          , h = "-enhanced";
        d.addClass("tabs-body").attr("aria-live", "polite"),
        i = n(c),
        "accordion" === i ? o(l, c) : c.addClass("tabs-nav").attr("role", "tablist"),
        d.find(".js-tab-pane").each(function() {
            $(this).addClass("tabs-panel").attr("role", "tabpanel").attr("aria-hidden", !0).attr("aria-expanded", !1).attr("aria-labelledby", u + $(this).attr("id")).attr("id", $(this).attr("id") + h).hide()
        });
        var p = a(d, c);
        p.find("a").each(function(t) {
            var e = $(this).attr("href").split("#")[1];
            $(this).attr("role", "tab").attr("id", u + e).attr("aria-controls", e).attr("aria-flowto", e)
        }),
        l.on("keydown", function(t) {
            if (!(t.keyCode < $.ui.keyCode.PAGE_UP || t.keyCode > $.ui.keyCode.DOWN)) {
                var i, n;
                switch (t.keyCode) {
                case $.ui.keyCode.RIGHT:
                    t.preventDefault(),
                    i = e.selected + 1;
                    break;
                case $.ui.keyCode.DOWN:
                    i = e.selected + 1;
                    break;
                case $.ui.keyCode.UP:
                    i = e.selected - 1;
                    break;
                case $.ui.keyCode.LEFT:
                    i = e.selected - 1;
                    break;
                case $.ui.keyCode.END:
                    i = p.length - 1;
                    break;
                case $.ui.keyCode.HOME:
                    i = 0;
                    break;
                case $.ui.keyCode.PAGE_UP:
                    if (!t.ctrlKey)
                        return;
                    i = e.selected + 1;
                    break;
                case $.ui.keyCode.PAGE_DOWN:
                    if (!t.ctrlKey)
                        return;
                    if (i = e.selected + 1,
                    !t.ctrlKey)
                        return;
                    i = e.selected - 1
                }
                return t.preventDefault(),
                t.stopPropagation(),
                void 0 !== i && (i = i >= p.length ? 0 : 0 > i ? p.length - 1 : i,
                n = p.find("a").eq(i),
                n.focus(),
                e.selected = i),
                !1
            }
        }),
        l.bind("click keydown focus", function() {
            e.autoRotate && clearInterval(tabRotator)
        }),
        e.trackState && $.historyInit(r, e.srcPath),
        r(null, !0),
        p.on("click", "a", function() {
            return $(this).closest(".js-heading-tab").hasClass("active") ? s($(this)) : t($(this)),
            $(this).focus(),
            !1
        }),
        e.alwaysScrollToTop && $(window)[0].scrollTo(0, 0),
        "undefined" != typeof GOVUK.stopScrollingAtFooter && GOVUK.stopScrollingAtFooter.updateFooterTop()
    })
}
