/*!
 * A jQuery Plugin to read magnetic cards of 1, 2 and 3 trails v1.0.0 (https://github.com/AndersonFriaca/jQuery-Magnetic-Card-Reader/)
 * See all contribuitors in https://github.com/AndersonFriaca/jQuery-Magnetic-Card-Reader/blob/master/CONTRIBUTORS.md

 * MIT License
 * Copyright (c) 2019 Anderson Friaça
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

(function(factory, jQuery) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(function($) {
    "use strict";
    var MagneticCardReader = function(element, options) {
        this.captured = {
            firstTrail: null,
            secondTrail: null,
            thirdTrail: null
        };
        this.element = element;
        this.options = options;
        this.parentForm = null;
        this.timer = null;
        this.timerLimit = this.options.timerLimit;
        this.init();
    };
    $.extend(MagneticCardReader.prototype, {
        animationOnCompleteDefault: function() {
            this.element.css("color", this.options.colorToShow);
            this.element.css("cursor", "auto");
        },
        animationOnInitDefault: function() {
            this.element.css("color", this.options.colorToHide);
            this.element.css("cursor", this.options.styleCursorOnInit);
        },
        binds: function() {
            this.animationOnInitDefault.bind(this);
            this.animationOnCompleteDefault.bind(this);
            this.clearInformations.bind(this);
            this.dispatchEvent.bind(this);
            this.initTimeout.bind(this);
        },
        blockSubmitFormFromElement: function() {
            var self = this;
            this.parentForm.on("submit", function(event) {
                if (event.originalEvent !== undefined && event.originalEvent.explicitOriginalTarget === self.element.get(0)) {
                    event.preventDefault();
                    return false;
                }
            });
        },
        captureTrail: function(regexp, sentence) {
            var match = sentence.match(regexp);
            if (match === null || match[1] === undefined) {
                return null;
            } else {
                return match[1];
            }
        },
        clearInformations: function() {
            this.captured = {
                firstTrail: null,
                secondTrail: null,
                thirdTrail: null
            };
        },
        dispatchEvent: function(eventName, value) {
            var event = $.Event(this.generateEventName(eventName));
            this.element.trigger(event, value);
        },
        generateEventName: function(eventName) {
            return eventName + ".magnetic-card-reader";
        },
        init: function() {
            this.validateOptions();
            this.parentForm = this.searchParentForm();
            this.binds();
            this.blockSubmitFormFromElement();
            this.watchEnterKey();
            this.watchCompleted();
            this.watchCallback();
        },
        initTimeout: function() {
            var self = this;
            if (this.options.animationOnInit !== null) {
                this.options.animationOnInit();
            } else {
                this.animationOnInitDefault();
            }
            if (this.timer !== null) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(function() {
                self.dispatchEvent("completed", self.captured);
                if (self.options.animationOnComplete !== null) {
                    self.options.animationOnComplete();
                } else {
                    self.animationOnCompleteDefault();
                }
                self.clearInformations();
            }, this.timerLimit);
        },
        isColor: function(value) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
        },
        isFunction: function(value) {
            return value && {}.toString.call(value) === "[object Function]";
        },
        isInputElement: function(element) {
            return element.is("input:text");
        },
        isPressedEnterKey: function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                return true;
            }
            return false;
        },
        isRegExp: function(value) {
            if (value === null || value === undefined) {
                return false;
            }
            if (typeof value === "object" && value.constructor.name === "RegExp") {
                return true;
            }
            return false;
        },
        searchParentForm: function() {
            var form = this.element.parent("form");
            if (form.length) {
                return form;
            }
            return null;
        },
        validateOptions: function() {
            if (!this.isInputElement(this.element)) {
                throw new Error("This plugin can be used only with input text");
            }
            if (this.searchParentForm() === null) {
                throw new Error("Can not initialize MagneticCardReader plugin, must be have an parent form");
            }
            var allowedEventKeyTypes = [ "keydown", "keypress", "keyup" ];
            if (this.options.eventKeyType === null || $.inArray(this.options.eventKeyType, allowedEventKeyTypes) === -1) {
                throw new Error("The value of option eventKeyType must be one of: keydown, keypress or keyup");
            }
            if (this.options.regExpSecondTrail === null) {
                throw new Error("The option regExpSecondTrail must be provided");
            }
            if (this.options.regExpFirstTrail !== null && !this.isRegExp(this.options.regExpFirstTrail)) {
                throw new Error("The option regExpFirstTrail is not a RegExp");
            }
            if (this.options.regExpSecondTrail !== null && !this.isRegExp(this.options.regExpSecondTrail)) {
                throw new Error("The option regExpSecondTrail is not a RegExp");
            }
            if (this.options.regExpThirdTrail !== null && !this.isRegExp(this.options.regExpThirdTrail)) {
                throw new Error("The option regExpThirdTrail is not a RegExp");
            }
            if (this.options.callback === null) {
                throw new Error("The option callback must be provided");
            }
            if (!this.isFunction(this.options.callback)) {
                throw new Error("The option callback must be a function");
            }
            if (this.options.buildDataFirstTrail !== null && !this.isFunction(this.options.buildDataFirstTrail)) {
                throw new Error("The options buildDataFirstTrail must be a function");
            }
            if (this.options.buildDataSecondTrail !== null && !this.isFunction(this.options.buildDataSecondTrail)) {
                throw new Error("The options buildDataSecondTrail must be a function");
            }
            if (this.options.buildDataThirdTrail !== null && !this.isFunction(this.options.buildDataThirdTrail)) {
                throw new Error("The options buildDataThirdTrail must be a function");
            }
            if (this.options.animationOnInit !== null && !this.isFunction(this.options.animationOnInit)) {
                throw new Error("The option animationOnInit must be a function");
            }
            if (this.options.animationOnComplete !== null && !this.isFunction(this.options.animationOnComplete)) {
                throw new Error("The option animationOnComplete must be a function");
            }
            if (this.options.colorToHide === null || typeof this.options.colorToHide !== "string" || this.options.colorToHide !== "" && !this.isColor(this.options.colorToHide)) {
                throw new Error("The option colorToHide must be a valid color or empty string");
            }
            if (this.options.colorToShow === null || typeof this.options.colorToShow !== "string" || this.options.colorToShow !== "" && !this.isColor(this.options.colorToShow)) {
                throw new Error("The option colorToShow must be a valid color or empty string");
            }
            if (this.options.styleCursorOnInit === null || typeof this.options.styleCursorOnInit !== "string") {
                throw new Error("The option styleCursorOnInit must be a string");
            }
            if (this.options.timerLimit === null || !/^\+?(0|[1-9]\d*)$/.test(this.options.timerLimit)) {
                throw new Error("The option timerLimit must be a number");
            }
        },
        watchCallback: function() {
            this.element.on(this.generateEventName("callback"), this.options.callback);
        },
        watchCompleted: function() {
            var self = this;
            this.element.on(this.generateEventName("completed"), function(event, captured) {
                var dataFirstTrail = null;
                var dataSecondTrail = null;
                var dataThirdTrail = null;
                if (captured.firstTrail !== null && self.options.buildDataFirstTrail !== null) {
                    dataFirstTrail = self.options.buildDataFirstTrail(captured.firstTrail);
                }
                if (captured.secondTrail !== null && self.options.buildDataSecondTrail !== null) {
                    dataSecondTrail = self.options.buildDataSecondTrail(captured.secondTrail);
                }
                if (captured.thirdTrail !== null && self.options.buildDataThirdTrail !== null) {
                    dataThirdTrail = self.options.buildDataThirdTrail(captured.thirdTrail);
                }
                var firstTrailResponse = {
                    captured: captured.firstTrail,
                    data: dataFirstTrail
                };
                var secondTrailResponse = {
                    captured: captured.secondTrail,
                    data: dataSecondTrail
                };
                var thirdTrailResponse = {
                    captured: captured.thirdTrail,
                    data: dataThirdTrail
                };
                self.dispatchEvent("callback", [ firstTrailResponse, secondTrailResponse, thirdTrailResponse ]);
            });
        },
        watchEnterKey: function() {
            var self = this;
            this.element.on(this.options.eventKeyType, function(event) {
                if (self.isPressedEnterKey(event)) {
                    self.initTimeout();
                    var trail = self.element.val();
                    var captured = false;
                    if (self.captured.firstTrail === null && self.options.regExpFirstTrail !== null && !captured) {
                        self.captured.firstTrail = self.captureTrail(self.options.regExpFirstTrail, trail);
                        if (self.captured.firstTrail !== null) {
                            captured = true;
                        }
                    }
                    if (self.captured.secondTrail === null && !captured) {
                        self.captured.secondTrail = self.captureTrail(self.options.regExpSecondTrail, trail);
                        if (self.captured.secondTrail !== null) {
                            captured = true;
                        }
                    }
                    if (self.captured.thirdTrail === null && self.options.regExpThirdTrail !== null && !captured) {
                        self.captured.thirdTrail = self.captureTrail(self.options.regExpThirdTrail, trail);
                        if (self.captured.thirdTrail !== null) {
                            captured = true;
                        }
                    }
                    self.element.val("");
                }
            });
        }
    });
    $.fn.magneticCardReader = function(options) {
        options = $.extend({}, $.magneticCardReader.defaultOptions, options);
        return this.each(function() {
            return createInstance($(this), options);
        });
    };
    $.magneticCardReader = function(element, options) {
        options = $.extend({}, $.magneticCardReader.defaultOptions, options);
        return $(element).each(function() {
            return createInstance($(this), options);
        });
    };
    function createInstance(element, options) {
        if (!hasInstance(element)) {
            return element.data("magnetic-card-reader-instance", new MagneticCardReader(element, options));
        }
        return element;
    }
    function hasInstance(element) {
        var instance = element.data("magnetic-card-reader-instance");
        return instance !== undefined;
    }
    $.magneticCardReader.defaultOptions = {
        animationOnInit: null,
        animationOnComplete: null,
        buildDataFirstTrail: null,
        buildDataSecondTrail: null,
        buildDataThirdTrail: null,
        callback: null,
        colorToHide: "#FFF",
        colorToShow: "",
        eventKeyType: "keydown",
        regExpFirstTrail: null,
        regExpSecondTrail: null,
        regExpThirdTrail: null,
        styleCursorOnInit: "wait",
        timerLimit: 200
    };
}, window.jQuery);