/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
};
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
};
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
};
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
;(function(root, factory) {
	// https://github.com/umdjs/umd/blob/master/returnExports.js
	if (typeof exports == 'object') {
		// For Node.js.
		module.exports = factory(root);
	} else if (typeof define == 'function' && define.amd) {
		// For AMD. Register as an anonymous module.
		define([], factory.bind(root, root));
	} else {
		// For browser globals (not exposing the function separately).
		factory(root);
	}
}(typeof global != 'undefined' ? global : this, function(root) {

	if (root.CSS && root.CSS.escape) {
		return root.CSS.escape;
	}

	// https://drafts.csswg.org/cssom/#serialize-an-identifier
	var cssEscape = function(value) {
		if (arguments.length == 0) {
			throw new TypeError('`CSS.escape` requires an argument.');
		}
		var string = String(value);
		var length = string.length;
		var index = -1;
		var codeUnit;
		var result = '';
		var firstCodeUnit = string.charCodeAt(0);
		while (++index < length) {
			codeUnit = string.charCodeAt(index);
			// Note: there’s no need to special-case astral symbols, surrogate
			// pairs, or lone surrogates.

			// If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
			// (U+FFFD).
			if (codeUnit == 0x0000) {
				result += '\uFFFD';
				continue;
			}

			if (
				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
				// U+007F, […]
				(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
				// If the character is the first character and is in the range [0-9]
				// (U+0030 to U+0039), […]
				(index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				// If the character is the second character and is in the range [0-9]
				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
				(
					index == 1 &&
					codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
					firstCodeUnit == 0x002D
				)
			) {
				// https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
				result += '\\' + codeUnit.toString(16) + ' ';
				continue;
			}

			if (
				// If the character is the first character and is a `-` (U+002D), and
				// there is no second character, […]
				index == 0 &&
				length == 1 &&
				codeUnit == 0x002D
			) {
				result += '\\' + string.charAt(index);
				continue;
			}

			// If the character is not handled by one of the above rules and is
			// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
			// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
			// U+005A), or [a-z] (U+0061 to U+007A), […]
			if (
				codeUnit >= 0x0080 ||
				codeUnit == 0x002D ||
				codeUnit == 0x005F ||
				codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
				codeUnit >= 0x0041 && codeUnit <= 0x005A ||
				codeUnit >= 0x0061 && codeUnit <= 0x007A
			) {
				// the character itself
				result += string.charAt(index);
				continue;
			}

			// Otherwise, the escaped character.
			// https://drafts.csswg.org/cssom/#escape-a-character
			result += '\\' + string.charAt(index);

		}
		return result;
	};

	if (!root.CSS) {
		root.CSS = {};
	}

	root.CSS.escape = cssEscape;
	return cssEscape;

}));
;
/*! @drupal/once - v1.0.1 - 2021-06-12 */
var once=function(){"use strict";var n=/[\11\12\14\15\40]+/,e="data-once",t=document;function r(n,t,r){return n[t+"Attribute"](e,r)}function o(e){if("string"!=typeof e)throw new TypeError("once ID must be a string");if(""===e||n.test(e))throw new RangeError("once ID must not be empty or contain spaces");return'[data-once~="'+e+'"]'}function u(n){if(!(n instanceof Element))throw new TypeError("The element must be an instance of Element");return!0}function i(n,e){void 0===e&&(e=t);var r=n;if(null===n)r=[];else{if(!n)throw new TypeError("Selector must not be empty");"string"!=typeof n||e!==t&&!u(e)?n instanceof Element&&(r=[n]):r=e.querySelectorAll(n)}return Array.prototype.slice.call(r)}function c(n,e,t){return e.filter((function(e){var r=u(e)&&e.matches(n);return r&&t&&t(e),r}))}function f(e,t){var o=t.add,u=t.remove,i=[];r(e,"has")&&r(e,"get").trim().split(n).forEach((function(n){i.indexOf(n)<0&&n!==u&&i.push(n)})),o&&i.push(o);var c=i.join(" ");r(e,""===c?"remove":"set",c)}function a(n,e,t){return c(":not("+o(n)+")",i(e,t),(function(e){return f(e,{add:n})}))}return a.remove=function(n,e,t){return c(o(n),i(e,t),(function(e){return f(e,{remove:n})}))},a.filter=function(n,e,t){return c(o(n),i(e,t))},a.find=function(n,e){return i(n?o(n):"[data-once]",e)},a}();

;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function () {
  var settingsElement = document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
  window.drupalSettings = {};

  if (settingsElement !== null) {
    window.drupalSettings = JSON.parse(settingsElement.textContent);
  }
})();;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

window.Drupal = {
  behaviors: {},
  locale: {}
};

(function (Drupal, drupalSettings, drupalTranslations, console, Proxy, Reflect) {
  Drupal.throwError = function (error) {
    setTimeout(function () {
      throw error;
    }, 0);
  };

  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || drupalSettings;
    var behaviors = Drupal.behaviors;
    Object.keys(behaviors || {}).forEach(function (i) {
      if (typeof behaviors[i].attach === 'function') {
        try {
          behaviors[i].attach(context, settings);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };

  Drupal.detachBehaviors = function (context, settings, trigger) {
    context = context || document;
    settings = settings || drupalSettings;
    trigger = trigger || 'unload';
    var behaviors = Drupal.behaviors;
    Object.keys(behaviors || {}).forEach(function (i) {
      if (typeof behaviors[i].detach === 'function') {
        try {
          behaviors[i].detach(context, settings, trigger);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };

  Drupal.checkPlain = function (str) {
    str = str.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    return str;
  };

  Drupal.formatString = function (str, args) {
    var processedArgs = {};
    Object.keys(args || {}).forEach(function (key) {
      switch (key.charAt(0)) {
        case '@':
          processedArgs[key] = Drupal.checkPlain(args[key]);
          break;

        case '!':
          processedArgs[key] = args[key];
          break;

        default:
          processedArgs[key] = Drupal.theme('placeholder', args[key]);
          break;
      }
    });
    return Drupal.stringReplace(str, processedArgs, null);
  };

  Drupal.stringReplace = function (str, args, keys) {
    if (str.length === 0) {
      return str;
    }

    if (!Array.isArray(keys)) {
      keys = Object.keys(args || {});
      keys.sort(function (a, b) {
        return a.length - b.length;
      });
    }

    if (keys.length === 0) {
      return str;
    }

    var key = keys.pop();
    var fragments = str.split(key);

    if (keys.length) {
      for (var i = 0; i < fragments.length; i++) {
        fragments[i] = Drupal.stringReplace(fragments[i], args, keys.slice(0));
      }
    }

    return fragments.join(args[key]);
  };

  Drupal.t = function (str, args, options) {
    options = options || {};
    options.context = options.context || '';

    if (typeof drupalTranslations !== 'undefined' && drupalTranslations.strings && drupalTranslations.strings[options.context] && drupalTranslations.strings[options.context][str]) {
      str = drupalTranslations.strings[options.context][str];
    }

    if (args) {
      str = Drupal.formatString(str, args);
    }

    return str;
  };

  Drupal.url = function (path) {
    return drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix + path;
  };

  Drupal.url.toAbsolute = function (url) {
    var urlParsingNode = document.createElement('a');

    try {
      url = decodeURIComponent(url);
    } catch (e) {}

    urlParsingNode.setAttribute('href', url);
    return urlParsingNode.cloneNode(false).href;
  };

  Drupal.url.isLocal = function (url) {
    var absoluteUrl = Drupal.url.toAbsolute(url);
    var protocol = window.location.protocol;

    if (protocol === 'http:' && absoluteUrl.indexOf('https:') === 0) {
      protocol = 'https:';
    }

    var baseUrl = "".concat(protocol, "//").concat(window.location.host).concat(drupalSettings.path.baseUrl.slice(0, -1));

    try {
      absoluteUrl = decodeURIComponent(absoluteUrl);
    } catch (e) {}

    try {
      baseUrl = decodeURIComponent(baseUrl);
    } catch (e) {}

    return absoluteUrl === baseUrl || absoluteUrl.indexOf("".concat(baseUrl, "/")) === 0;
  };

  Drupal.formatPlural = function (count, singular, plural, args, options) {
    args = args || {};
    args['@count'] = count;
    var pluralDelimiter = drupalSettings.pluralDelimiter;
    var translations = Drupal.t(singular + pluralDelimiter + plural, args, options).split(pluralDelimiter);
    var index = 0;

    if (typeof drupalTranslations !== 'undefined' && drupalTranslations.pluralFormula) {
      index = count in drupalTranslations.pluralFormula ? drupalTranslations.pluralFormula[count] : drupalTranslations.pluralFormula.default;
    } else if (args['@count'] !== 1) {
      index = 1;
    }

    return translations[index];
  };

  Drupal.encodePath = function (item) {
    return window.encodeURIComponent(item).replace(/%2F/g, '/');
  };

  Drupal.deprecationError = function (_ref) {
    var message = _ref.message;

    if (drupalSettings.suppressDeprecationErrors === false && typeof console !== 'undefined' && console.warn) {
      console.warn("[Deprecation] ".concat(message));
    }
  };

  Drupal.deprecatedProperty = function (_ref2) {
    var target = _ref2.target,
        deprecatedProperty = _ref2.deprecatedProperty,
        message = _ref2.message;

    if (!Proxy || !Reflect) {
      return target;
    }

    return new Proxy(target, {
      get: function get(target, key) {
        if (key === deprecatedProperty) {
          Drupal.deprecationError({
            message: message
          });
        }

        for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          rest[_key - 2] = arguments[_key];
        }

        return Reflect.get.apply(Reflect, [target, key].concat(rest));
      }
    });
  };

  Drupal.theme = function (func) {
    if (func in Drupal.theme) {
      var _Drupal$theme;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return (_Drupal$theme = Drupal.theme)[func].apply(_Drupal$theme, args);
    }
  };

  Drupal.theme.placeholder = function (str) {
    return "<em class=\"placeholder\">".concat(Drupal.checkPlain(str), "</em>");
  };
})(Drupal, window.drupalSettings, window.drupalTranslations, window.console, window.Proxy, window.Reflect);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

if (window.jQuery) {
  jQuery.noConflict();
}

document.documentElement.className += ' js';

(function (Drupal, drupalSettings) {
  var domReady = function domReady(callback) {
    var listener = function listener() {
      callback();
      document.removeEventListener('DOMContentLoaded', listener);
    };

    if (document.readyState !== 'loading') {
      setTimeout(callback, 0);
    } else {
      document.addEventListener('DOMContentLoaded', listener);
    }
  };

  domReady(function () {
    Drupal.attachBehaviors(document, drupalSettings);
  });
})(Drupal, window.drupalSettings);;
/*!
* tabbable 5.3.2
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):(e="undefined"!=typeof globalThis?globalThis:e||self,function(){var n=e.tabbable,o=e.tabbable={};t(o),o.noConflict=function(){return e.tabbable=n,o}}())}(this,(function(e){"use strict";var t=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],n=t.join(","),o="undefined"==typeof Element,r=o?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,i=!o&&Element.prototype.getRootNode?function(e){return e.getRootNode()}:function(e){return e.ownerDocument},a=function(e,t,o){var i=Array.prototype.slice.apply(e.querySelectorAll(n));return t&&r.call(e,n)&&i.unshift(e),i=i.filter(o)},l=function e(t,o,i){for(var a=[],l=Array.from(t);l.length;){var u=l.shift();if("SLOT"===u.tagName){var c=u.assignedElements(),d=e(c.length?c:u.children,!0,i);i.flatten?a.push.apply(a,d):a.push({scope:u,candidates:d})}else{r.call(u,n)&&i.filter(u)&&(o||!t.includes(u))&&a.push(u);var f=u.shadowRoot||"function"==typeof i.getShadowRoot&&i.getShadowRoot(u);if(f){var s=e(!0===f?u.children:f.children,!0,i);i.flatten?a.push.apply(a,s):a.push({scope:u,candidates:s})}else l.unshift.apply(l,u.children)}}return a},u=function(e,t){return e.tabIndex<0&&(t||/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||e.isContentEditable)&&isNaN(parseInt(e.getAttribute("tabindex"),10))?0:e.tabIndex},c=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},d=function(e){return"INPUT"===e.tagName},f=function(e){return function(e){return d(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0;var t,n=e.form||i(e),o=function(e){return n.querySelectorAll('input[type="radio"][name="'+e+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)t=o(window.CSS.escape(e.name));else try{t=o(e.name)}catch(e){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",e.message),!1}var r=function(e,t){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===t)return e[n]}(t,e.form);return!r||r===e}(e)},s=function(e){var t=e.getBoundingClientRect(),n=t.width,o=t.height;return 0===n&&0===o},p=function(e,t){return!(t.disabled||function(e){return d(e)&&"hidden"===e.type}(t)||function(e,t){var n=t.displayCheck,o=t.getShadowRoot;if("hidden"===getComputedStyle(e).visibility)return!0;var a=r.call(e,"details>summary:first-of-type")?e.parentElement:e;if(r.call(a,"details:not([open]) *"))return!0;var l=i(e).host,u=(null==l?void 0:l.ownerDocument.contains(l))||e.ownerDocument.contains(e);if(n&&"full"!==n){if("non-zero-area"===n)return s(e)}else{if("function"==typeof o){for(var c=e;e;){var d=e.parentElement,f=i(e);if(d&&!d.shadowRoot&&!0===o(d))return s(e);e=e.assignedSlot?e.assignedSlot:d||f===e.ownerDocument?d:f.host}e=c}if(u)return!e.getClientRects().length}return!1}(t,e)||function(e){return"DETAILS"===e.tagName&&Array.prototype.slice.apply(e.children).some((function(e){return"SUMMARY"===e.tagName}))}(t)||function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if("FIELDSET"===t.tagName&&t.disabled){for(var n=0;n<t.children.length;n++){var o=t.children.item(n);if("LEGEND"===o.tagName)return!!r.call(t,"fieldset[disabled] *")||!o.contains(e)}return!0}t=t.parentElement}return!1}(t))},h=function(e,t){return!(f(t)||u(t)<0||!p(e,t))},m=t.concat("iframe").join(",");e.focusable=function(e,t){return(t=t||{}).getShadowRoot?l([e],t.includeContainer,{filter:p.bind(null,t),flatten:!0,getShadowRoot:t.getShadowRoot}):a(e,t.includeContainer,p.bind(null,t))},e.isFocusable=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==r.call(e,m)&&p(t,e)},e.isTabbable=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==r.call(e,n)&&h(t,e)},e.tabbable=function(e,t){return function e(t){var n=[],o=[];return t.forEach((function(t,r){var i=!!t.scope,a=i?t.scope:t,l=u(a,i),c=i?e(t.candidates):a;0===l?i?n.push.apply(n,c):n.push(a):o.push({documentOrder:r,tabIndex:l,item:t,isScope:i,content:c})})),o.sort(c).reduce((function(e,t){return t.isScope?e.push.apply(e,t.content):e.push(t.content),e}),[]).concat(n)}((t=t||{}).getShadowRoot?l([e],t.includeContainer,{filter:h.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot}):a(e,t.includeContainer,h.bind(null,t)))},Object.defineProperty(e,"__esModule",{value:!0})}));

;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal) {
  Drupal.theme.checkbox = function () {
    return '<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox"/>';
  };
})(Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal) {
  Drupal.olivero = {};

  function isDesktopNav() {
    var navButtons = document.querySelector('[data-drupal-selector="mobile-buttons"]');
    return navButtons ? window.getComputedStyle(navButtons).getPropertyValue('display') === 'none' : false;
  }

  Drupal.olivero.isDesktopNav = isDesktopNav;
  var stickyHeaderToggleButton = document.querySelector('[data-drupal-selector="sticky-header-toggle"]');
  var siteHeaderFixable = document.querySelector('[data-drupal-selector="site-header-fixable"]');

  function stickyHeaderIsEnabled() {
    return stickyHeaderToggleButton.getAttribute('aria-checked') === 'true';
  }

  function setStickyHeaderStorage(expandedState) {
    var now = new Date();
    var item = {
      value: expandedState,
      expiry: now.getTime() + 20160000
    };
    localStorage.setItem('Drupal.olivero.stickyHeaderState', JSON.stringify(item));
  }

  function toggleStickyHeaderState(pinnedState) {
    if (isDesktopNav()) {
      if (pinnedState === true) {
        siteHeaderFixable.classList.add('is-expanded');
      } else {
        siteHeaderFixable.classList.remove('is-expanded');
      }

      stickyHeaderToggleButton.setAttribute('aria-checked', pinnedState);
      setStickyHeaderStorage(pinnedState);
    }
  }

  function getStickyHeaderStorage() {
    var stickyHeaderState = localStorage.getItem('Drupal.olivero.stickyHeaderState');
    if (!stickyHeaderState) return false;
    var item = JSON.parse(stickyHeaderState);
    var now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem('Drupal.olivero.stickyHeaderState');
      return false;
    }

    return item.value;
  }

  if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    var fixableElements = document.querySelectorAll('[data-drupal-selector="site-header-fixable"], [data-drupal-selector="social-bar-inner"]');

    function toggleDesktopNavVisibility(entries) {
      if (!isDesktopNav()) return;
      entries.forEach(function (entry) {
        if (entry.intersectionRatio < 1) {
          fixableElements.forEach(function (el) {
            return el.classList.add('is-fixed');
          });
        } else {
          fixableElements.forEach(function (el) {
            return el.classList.remove('is-fixed');
          });
        }
      });
    }

    function getRootMargin() {
      var rootMarginTop = 72;
      var _document = document,
          body = _document.body;

      if (body.classList.contains('toolbar-fixed')) {
        rootMarginTop -= 39;
      }

      if (body.classList.contains('toolbar-horizontal') && body.classList.contains('toolbar-tray-open')) {
        rootMarginTop -= 40;
      }

      return "".concat(rootMarginTop, "px 0px 0px 0px");
    }

    function monitorNavPosition() {
      var primaryNav = document.querySelector('[data-drupal-selector="site-header"]');
      var options = {
        rootMargin: getRootMargin(),
        threshold: [0.999, 1]
      };
      var observer = new IntersectionObserver(toggleDesktopNavVisibility, options);

      if (primaryNav) {
        observer.observe(primaryNav);
      }
    }

    if (stickyHeaderToggleButton) {
      stickyHeaderToggleButton.addEventListener('click', function () {
        toggleStickyHeaderState(!stickyHeaderIsEnabled());
      });
    }

    var siteHeaderInner = document.querySelector('[data-drupal-selector="site-header-inner"]');

    if (siteHeaderInner) {
      siteHeaderInner.addEventListener('focusin', function () {
        if (isDesktopNav() && !stickyHeaderIsEnabled()) {
          var header = document.querySelector('[data-drupal-selector="site-header"]');
          var headerNav = header.querySelector('[data-drupal-selector="header-nav"]');
          var headerMargin = header.clientHeight - headerNav.clientHeight;

          if (window.scrollY > headerMargin) {
            window.scrollTo(0, headerMargin);
          }
        }
      });
    }

    monitorNavPosition();
    setStickyHeaderStorage(getStickyHeaderStorage());
    toggleStickyHeaderState(getStickyHeaderStorage());
  }
})(Drupal);;
(function ($, Drupal,drupalSettings) {
    'use strict';
    Drupal.behaviors.gep_custom = {
        attach: function (context, settings) {
            //Getting nid,uid from drupalSettings
            var user_id = drupalSettings.vc_register_users.current_user_id;
            var node_id = drupalSettings.vc_register_users.node_id;

            //First check if user registered or not
            $.ajax({
                type: "POST",
                url: "/check-user-register",
                data : { user_id : user_id, node_id : node_id },
                success: function (data) {
                    console.log(data);
                    $(".register-link").attr('disabled','disabled');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            })

            $(".register-link").click(function() {
                $.ajax({
                    type: "POST",
                    url: "/register-user",
                    data : { user_id : user_id, node_id : node_id },
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                });
            })
        }
    }
})(jQuery, Drupal,drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal) {
  var searchWideButtonSelector = '[data-drupal-selector="block-search-wide-button"]';
  var searchWideButton = document.querySelector(searchWideButtonSelector);
  var searchWideWrapperSelector = '[data-drupal-selector="block-search-wide-wrapper"]';
  var searchWideWrapper = document.querySelector(searchWideWrapperSelector);

  function searchIsVisible() {
    return searchWideWrapper.classList.contains('is-active');
  }

  Drupal.olivero.searchIsVisible = searchIsVisible;

  function watchForClickOut(e) {
    var clickInSearchArea = e.target.matches("\n      ".concat(searchWideWrapperSelector, ",\n      ").concat(searchWideWrapperSelector, " *,\n      ").concat(searchWideButtonSelector, ",\n      ").concat(searchWideButtonSelector, " *\n    "));

    if (!clickInSearchArea && searchIsVisible()) {
      toggleSearchVisibility(false);
    }
  }

  function watchForFocusOut(e) {
    if (e.relatedTarget) {
      var inSearchBar = e.relatedTarget.matches("".concat(searchWideWrapperSelector, ", ").concat(searchWideWrapperSelector, " *"));
      var inSearchButton = e.relatedTarget.matches("".concat(searchWideButtonSelector, ", ").concat(searchWideButtonSelector, " *"));

      if (!inSearchBar && !inSearchButton) {
        toggleSearchVisibility(false);
      }
    }
  }

  function watchForEscapeOut(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      toggleSearchVisibility(false);
    }
  }

  function handleFocus() {
    if (searchIsVisible()) {
      searchWideWrapper.querySelector('input[type="search"]').focus();
    } else if (searchWideWrapper.contains(document.activeElement)) {
      searchWideButton.focus();
    }
  }

  function toggleSearchVisibility(visibility) {
    searchWideButton.setAttribute('aria-expanded', visibility === true);
    searchWideWrapper.addEventListener('transitionend', handleFocus, {
      once: true
    });

    if (visibility === true) {
      Drupal.olivero.closeAllSubNav();
      searchWideWrapper.classList.add('is-active');
      document.addEventListener('click', watchForClickOut, {
        capture: true
      });
      document.addEventListener('focusout', watchForFocusOut, {
        capture: true
      });
      document.addEventListener('keyup', watchForEscapeOut, {
        capture: true
      });
    } else {
      searchWideWrapper.classList.remove('is-active');
      document.removeEventListener('click', watchForClickOut, {
        capture: true
      });
      document.removeEventListener('focusout', watchForFocusOut, {
        capture: true
      });
      document.removeEventListener('keyup', watchForEscapeOut, {
        capture: true
      });
    }
  }

  Drupal.olivero.toggleSearchVisibility = toggleSearchVisibility;
  Drupal.behaviors.searchWide = {
    attach: function attach(context) {
      var searchWideButtonEl = once('search-wide', searchWideButtonSelector, context).shift();

      if (searchWideButtonEl) {
        searchWideButtonEl.setAttribute('aria-expanded', searchIsVisible());
        searchWideButtonEl.addEventListener('click', function () {
          toggleSearchVisibility(!searchIsVisible());
        });
      }
    }
  };
})(Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, once, tabbable) {
  function isNavOpen(navWrapper) {
    return navWrapper.classList.contains('is-active');
  }

  function toggleNav(props, state) {
    var value = !!state;
    props.navButton.setAttribute('aria-expanded', value);

    if (value) {
      props.body.classList.add('is-overlay-active');
      props.body.classList.add('is-fixed');
      props.navWrapper.classList.add('is-active');
    } else {
      props.body.classList.remove('is-overlay-active');
      props.body.classList.remove('is-fixed');
      props.navWrapper.classList.remove('is-active');
    }
  }

  function init(props) {
    props.navButton.setAttribute('aria-controls', props.navWrapperId);
    props.navButton.setAttribute('aria-expanded', 'false');
    props.navButton.addEventListener('click', function () {
      toggleNav(props, !isNavOpen(props.navWrapper));
    });
    document.addEventListener('keyup', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (props.olivero.areAnySubNavsOpen()) {
          props.olivero.closeAllSubNav();
        } else {
          toggleNav(props, false);
        }
      }
    });
    props.overlay.addEventListener('click', function () {
      toggleNav(props, false);
    });
    props.overlay.addEventListener('touchstart', function () {
      toggleNav(props, false);
    });
    props.header.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && isNavOpen(props.navWrapper)) {
        var tabbableNavElements = tabbable.tabbable(props.navWrapper);
        tabbableNavElements.unshift(props.navButton);
        var firstTabbableEl = tabbableNavElements[0];
        var lastTabbableEl = tabbableNavElements[tabbableNavElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstTabbableEl && !props.olivero.isDesktopNav()) {
            lastTabbableEl.focus();
            e.preventDefault();
          }
        } else if (document.activeElement === lastTabbableEl && !props.olivero.isDesktopNav()) {
          firstTabbableEl.focus();
          e.preventDefault();
        }
      }
    });
    window.addEventListener('resize', function () {
      if (props.olivero.isDesktopNav()) {
        toggleNav(props, false);
        props.body.classList.remove('is-overlay-active');
        props.body.classList.remove('is-fixed');
      }

      Drupal.olivero.closeAllSubNav();
    });
    props.navWrapper.addEventListener('click', function (e) {
      if (e.target.matches("[href*=\"".concat(window.location.pathname, "#\"], [href*=\"").concat(window.location.pathname, "#\"] *, [href^=\"#\"], [href^=\"#\"] *"))) {
        toggleNav(props, false);
      }
    });
  }

  Drupal.behaviors.oliveroNavigation = {
    attach: function attach(context) {
      var headerId = 'header';
      var header = once('navigation', "#".concat(headerId), context).shift();
      var navWrapperId = 'header-nav';

      if (header) {
        var navWrapper = header.querySelector("#".concat(navWrapperId));
        var olivero = Drupal.olivero;
        var navButton = context.querySelector('[data-drupal-selector="mobile-nav-button"]');
        var body = context.querySelector('body');
        var overlay = context.querySelector('[data-drupal-selector="header-nav-overlay"]');
        init({
          olivero: olivero,
          header: header,
          navWrapperId: navWrapperId,
          navWrapper: navWrapper,
          navButton: navButton,
          body: body,
          overlay: overlay
        });
      }
    }
  };
})(Drupal, once, tabbable);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal) {
  var isDesktopNav = Drupal.olivero.isDesktopNav;
  var secondLevelNavMenus = document.querySelectorAll('[data-drupal-selector="primary-nav-menu-item-has-children"]');

  function toggleSubNav(topLevelMenuItem, toState) {
    var buttonSelector = '[data-drupal-selector="primary-nav-submenu-toggle-button"]';
    var button = topLevelMenuItem.querySelector(buttonSelector);
    var state = toState !== undefined ? toState : button.getAttribute('aria-expanded') !== 'true';

    if (state) {
      if (isDesktopNav()) {
        secondLevelNavMenus.forEach(function (el) {
          el.querySelector(buttonSelector).setAttribute('aria-expanded', 'false');
          el.querySelector('[data-drupal-selector="primary-nav-menu--level-2"]').classList.remove('is-active-menu-parent');
          el.querySelector('[data-drupal-selector="primary-nav-menu-🥕"]').classList.remove('is-active-menu-parent');
        });
      }

      button.setAttribute('aria-expanded', 'true');
      topLevelMenuItem.querySelector('[data-drupal-selector="primary-nav-menu--level-2"]').classList.add('is-active-menu-parent');
      topLevelMenuItem.querySelector('[data-drupal-selector="primary-nav-menu-🥕"]').classList.add('is-active-menu-parent');
    } else {
      button.setAttribute('aria-expanded', 'false');
      topLevelMenuItem.classList.remove('is-touch-event');
      topLevelMenuItem.querySelector('[data-drupal-selector="primary-nav-menu--level-2"]').classList.remove('is-active-menu-parent');
      topLevelMenuItem.querySelector('[data-drupal-selector="primary-nav-menu-🥕"]').classList.remove('is-active-menu-parent');
    }
  }

  Drupal.olivero.toggleSubNav = toggleSubNav;

  function handleBlur(e) {
    if (!Drupal.olivero.isDesktopNav()) return;
    setTimeout(function () {
      var menuParentItem = e.target.closest('[data-drupal-selector="primary-nav-menu-item-has-children"]');

      if (!menuParentItem.contains(document.activeElement)) {
        toggleSubNav(menuParentItem, false);
      }
    }, 200);
  }

  secondLevelNavMenus.forEach(function (el) {
    var button = el.querySelector('[data-drupal-selector="primary-nav-submenu-toggle-button"]');
    button.removeAttribute('aria-hidden');
    button.removeAttribute('tabindex');
    el.addEventListener('touchstart', function () {
      el.classList.add('is-touch-event');
    }, {
      passive: true
    });
    el.addEventListener('mouseover', function () {
      if (isDesktopNav() && !el.classList.contains('is-touch-event')) {
        el.classList.add('is-active-mouseover-event');
        toggleSubNav(el, true);
        setTimeout(function () {
          el.classList.remove('is-active-mouseover-event');
        }, 500);
      }
    });
    button.addEventListener('click', function () {
      if (!el.classList.contains('is-active-mouseover-event')) {
        toggleSubNav(el);
      }
    });
    el.addEventListener('mouseout', function () {
      if (isDesktopNav() && !document.activeElement.matches('[aria-expanded="true"], .is-active-menu-parent *')) {
        toggleSubNav(el, false);
      }
    });
    el.addEventListener('blur', handleBlur, true);
  });

  function closeAllSubNav() {
    secondLevelNavMenus.forEach(function (el) {
      if (el.contains(document.activeElement)) {
        el.querySelector('[data-drupal-selector="primary-nav-submenu-toggle-button"]').focus();
      }

      toggleSubNav(el, false);
    });
  }

  Drupal.olivero.closeAllSubNav = closeAllSubNav;

  function areAnySubNavsOpen() {
    var subNavsAreOpen = false;
    secondLevelNavMenus.forEach(function (el) {
      var button = el.querySelector('[data-drupal-selector="primary-nav-submenu-toggle-button"]');
      var state = button.getAttribute('aria-expanded') === 'true';

      if (state) {
        subNavsAreOpen = true;
      }
    });
    return subNavsAreOpen;
  }

  Drupal.olivero.areAnySubNavsOpen = areAnySubNavsOpen;
  document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (isDesktopNav()) closeAllSubNav();
    }
  });
  document.addEventListener('touchstart', function (e) {
    if (areAnySubNavsOpen() && !e.target.matches('[data-drupal-selector="header-nav"], [data-drupal-selector="header-nav"] *')) {
      closeAllSubNav();
    }
  }, {
    passive: true
  });
})(Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, once) {
  function transitionToDesktopNavigation(navWrapper, navItem) {
    document.body.classList.remove('is-always-mobile-nav');

    if (navWrapper.clientHeight > navItem.clientHeight) {
      document.body.classList.add('is-always-mobile-nav');
    }
  }

  function checkIfDesktopNavigationWraps(entries) {
    var navItem = document.querySelector('.primary-nav__menu-item');

    if (Drupal.olivero.isDesktopNav() && entries[0].contentRect.height > navItem.clientHeight) {
      var navMediaQuery = window.matchMedia("(max-width: ".concat(window.innerWidth + 5, "px)"));
      document.body.classList.add('is-always-mobile-nav');
      navMediaQuery.addEventListener('change', function () {
        transitionToDesktopNavigation(entries[0].target, navItem);
      }, {
        once: true
      });
    }
  }

  function init(primaryNav) {
    if ('ResizeObserver' in window) {
      var resizeObserver = new ResizeObserver(checkIfDesktopNavigationWraps);
      resizeObserver.observe(primaryNav);
    }
  }

  Drupal.behaviors.automaticMobileNav = {
    attach: function attach(context) {
      once('olivero-automatic-mobile-nav', '[data-drupal-selector="primary-nav-menu--level-1"]', context).forEach(init);
    }
  };
})(Drupal, once);;
