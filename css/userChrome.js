// ==UserScript==7
// @name           FloatingScrollbar.uc.js
// @namespace      nightson1988@gmail.com
// @include        main
// @version        0.0.3
// @note           Thanks to Griever(https://github.com/Griever/userChromeJS/blob/master/SmartScrollbar.uc.js) and Paul Rouget(https://gist.github.com/4003205)
// @note...........0.0.3 Fixed a problem of breaking hbox layout 
// @note           0.0.2 Remove usage of E4X (https://bugzilla.mozilla.org/show_bug.cgi?id=788293)
// ==/UserScript==

(function () {
    var prefs = Services.prefs,
        enabled;
    if (prefs.prefHasUserValue('userChromeJS.floating_scrollbar.enabled')) {
        enabled = prefs.getBoolPref('userChromeJS.floating_scrollbar.enabled')
    } else {
        prefs.setBoolPref('userChromeJS.floating_scrollbar.enabled', true);
        enabled = true;
    }

    var css = '\
    @namespace url(http: //www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);\
    :not(select):not(hbox) > scrollbar {\
        -moz-appearance: none !important;\
        position: relative;\
        background-color: transparent;\
        background-image: none;\
        z-index: 2147483647;\
        padding: 2px;\
    }\
    :not(select):not(hbox) > scrollbar[orient = "vertical"] {\
        -moz-margin-start: -10px;\
        min-width: 10px;\
    }\
    :not(select):not(hbox) > scrollbar[orient = "vertical"] thumb {\
        min-height: 20px;\
    }\
   :not(select):not(hbox) > scrollbar[orient = "horizontal"] {\
        margin-top: -10px;\
        min-height: 10px;\
    }\
    :not(select):not(hbox) > scrollbar[orient = "horizontal"] thumb {\
        min-width: 20px;\
    }\
    :not(select):not(hbox) > scrollbar thumb {\
        -moz-appearance: none !important;\
        border-width: 0px !important;\
        border-radius: 3px !important;\
        background-color: rgba(159, 159, 159, 0.5) !important;\
		background-image: linear-gradient(to right,transparent,rgba(255, 255, 255, 0.1),transparent) !important;\
        transition: background-color 0.25s ease-in-out;\
    }\
    :not(select):not(hbox) > scrollbar thumb:active,\
    :not(select):not(hbox) > scrollbar thumb:hover {\
        background-color: rgba(159, 159, 159, 0.8) !important;\
		background-image: linear-gradient(to right,transparent,rgba(255, 255, 255, 0.1),transparent) !important;\
    }\
    :not(select):not(hbox) > scrollbar:active,\
    :not(select):not(hbox) > scrollbar:hover {\
        // -moz-margin-start: -14px;\
        box-shadow: -1px 0px 2px 1px rgba(100, 110, 120, 0.3);\
    }\
    :not(select):not(hbox) > scrollbar thumb:active {\
        background-color: rgba(159, 159, 159, 1) !important;\
		background-image: linear-gradient(to right,transparent,rgba(255, 255, 255, 0.1),transparent) !important;\
        transition: background-color 0s ease-in-out;\
    }\
    :not(select):not(hbox) > scrollbar scrollbarbutton, :not(select):not(hbox) > scrollbar gripper {\
        display: none;\
    }';

    var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
    var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));

    var p = document.getElementById('devToolsSeparator');
    var m = document.createElement('menuitem');
    m.setAttribute('label', "Floating Scrollbar");
    m.setAttribute('type', 'checkbox');
    m.setAttribute('autocheck', 'false');
    m.setAttribute('checked', enabled);
    p.parentNode.insertBefore(m, p);
    m.addEventListener('command', command, false);

    if (enabled) {
        sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
    }

    function command() {
        if (sss.sheetRegistered(uri, sss.AGENT_SHEET)) {
            prefs.setBoolPref('userChromeJS.floating_scrollbar.enabled', false);
            sss.unregisterSheet(uri, sss.AGENT_SHEET);
            m.setAttribute('checked', false);
        } else {
            prefs.setBoolPref('userChromeJS.floating_scrollbar.enabled', true);
            sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
            m.setAttribute('checked', true);
        }

        let root = document.documentElement;
        let display = root.style.display;
        root.style.display = 'none';
        window.getComputedStyle(root).display; // Flush
        root.style.display = display;
    }

})();