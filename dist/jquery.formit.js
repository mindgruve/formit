/* formIt - v3.3.2 - 2016-05-09
 * https://github.com/mindgruve/formit
 * Copyright (c) 2016 Mindgruve;
 * Licensed MIT
 */
 (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], function (jQuery) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.formIt = factory(jQuery));
        });
    } else {
        // Browser globals
        root.formIt = factory(root.jQuery);
    }
}(this, function ($) {

    var
        lastOptions,
        types = {},
        internal = {},
        methods = {},

    // Helpers

        focusBlurHandler = function (e) {
            var prefix = e.type === 'focus' ? 'add' : 'remove';
            $(this).parent()[ prefix + 'Class' ]('fi-focus');
        },
		
        checkboxRadioSetUp = function ($input, $el) {
            var isChecked = $input.prop('checked'),
                isDisabled = $input.attr('disabled'),
                classes = '';

            if (isChecked) {
                classes += 'checked ';
            }
            if (isDisabled) {
                classes += 'disabled';
            }
            if (classes) {
                $el.addClass(classes);
            }

            $input
                .after($el)//put the HTML on the dom
                .appendTo($el)//move the input into the $el
                .on('focus.formit blur.formit', focusBlurHandler)
                .on('click.formit', function () {$(this).trigger('focus');})
                .on('change.formit', this.changeHandler);

        },

        checkboxRadioRemove = function ($input) {
            $input.off('.formit').parent().remove();
        },

        selectSetUp = function ($input, $el) {
            if ($input.attr('disabled')) {
                $el.addClass('disabled');
            }
            $input
                .after($el)
                .appendTo($el)
                .on('focus.formit blur.formit', focusBlurHandler)
                .on('change.formit keyup.formit', this.changeHandler);
            this.changeHandler.call($input);
        },

        fileSetUp = function ($input, $el) {
            var $wrap = $('<div/>', { 'class': 'fi-file-wrap' });
            $el
                .appendTo($wrap)
                .on('click.formit', this.clickHandler);

            $input
                .after($wrap)
                .appendTo($wrap)
                .on('change.formit', this.changeHandler)
                .on('focus.formit blur.formit', focusBlurHandler);
            this.changeHandler.call($input);
        };

// Types

// Checkbox
    types.checkbox = {
        changeHandler: function () {
            // console.log('check change');
            var $input = $(this),
                $el = $input.parent(),
                isChecked = $input.prop('checked');
            $el[ (isChecked ? 'add' : 'remove') + 'Class' ]('checked');
        },
        setUp: checkboxRadioSetUp,
        remove: checkboxRadioRemove
    };

// Radio
    types.radio = {
        changeHandler: function () {
            var $input = $(this),
                $el = $input.parent();
            $('input[name="' + $input.attr('name') + '"]').parent('.checked').removeClass('checked');
            $el.addClass('checked');
        },
        setUp: checkboxRadioSetUp,
        remove: checkboxRadioRemove
    };

// Select
    types.select = {
        changeHandler: function () {
            var $select = $(this),
                data = {
                    text : $select.find(':selected').text() || '&nbsp;',
                    value: $select.val()
                },
                isDisabled = $select.hasClass('disabled');
            if (!isDisabled) {
                $select.trigger('updateText', [data]);
                $select.siblings('span').html(data.text);
            }
        },
        setUp: selectSetUp,
        remove: function ($input) {
            $input.off('.formit').parent().remove();
        }
    };

	// File
    types.file = {
        changeHandler: function () {
            var $file = $(this);
            var data = {
                text: $file.val(),
                value: $file.val()
            };
            data.text = data.text ? data.text.replace(/C:\\fakepath\\/i, '') : '&nbsp;';
            $file.trigger('updateText', [data]);
            $file.parent().find('span').html(data.text);
        },
        clickHandler: function () {
            $(this).siblings('input')[0].click();
        },
        setUp: fileSetUp,
        remove: function ($input) {
            $input
                .off('.formit')
                .siblings()
                    .off('.formit')
                    .parent()
                        .remove();
        }
    };

    internal.initType = function ($els, typeName, type, html) {
        $els.each(function () {
            var $input = $(this), $el;
            if ($input.hasClass('fi-styled')) {
                return;
            }
            var $html = $(html);
            if (typeName === 'radio' || typeName === 'checkbox') {
                $html.first().addClass('fi-check');
            }
            $el = $('<div />', { 'class': 'fi-' + typeName }).append($html);
            type.setUp($input.addClass('fi-styled'), $el);
        });
    };

    internal.removeType = function ($els, type) {
        $els.each(function () {
            var $input = $(this);
            if (!$input.hasClass('fi-styled')) {
                return;
            }
            if (type.remove) {
                type.remove($input);
            }
        });
    };

    // Main initialize function
    methods.init = function (options) {
        options = $.extend({}, formIt.defaults, options);
        for (var typeName in types) {
            var type = types[ typeName ], $els;
            if (!options[ typeName ]) {
                continue;
            }
            $els = $(options[ typeName + 'Selector' ], options.context);
            if ($els.length) {
                internal.initType($els, typeName, type, options[ typeName + 'Html' ]);
            }
        }
        lastOptions = options;
    };

	// Remove elements
    methods.remove = function ($context) {
        if (!lastOptions) {
            return;
        }
        for (var typeName in types) {
            var type = types[ typeName ], $els, selector;
            if (!lastOptions[ typeName ]) {
                continue;
            }
            selector = lastOptions[ typeName + 'Selector' ];
            if ($context && $context.length) {
                $els = $context.find(selector);
            } else {
                $els = $(selector);
            }
            if ($els.length) {
                internal.removeType($els, type);
            }
        }
    };

	//Don't know why but, jshint errors out here. it thinks formIt is used earlier. methods.init has the only reference to formIt before this, but it's a method so jshint is wrong. best solution is to refactor this module to be less scattered. code smell is REAL!
    function formIt (method) {//jshint ignore:line
        if (methods[ method ]) {
            methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.formIt');
        }
    }

    formIt.getLastOptions = function () {
        return lastOptions;
    };

    formIt.defaults = {

        context: document,

        checkbox: true,
        checkboxSelector: 'input[type="checkbox"]',
        checkboxHtml: '<div class="fi-check"></div>',

        radio: true,
        radioSelector: 'input[type="radio"]',
        radioHtml: '<div class="fi-check"></div>',

        select: true,
        selectSelector: 'select:not([multiple])',
        selectHtml: '<span></span><div class="fi-select-arrow-wrap"><div class="fi-select-arrow"></div></div>',

        file: true,
        fileSelector: 'input[type="file"]',
        fileHtml: '<span>Choose a file...</span><div class="fi-file-button"><div class="fi-file-button-inner ss-icon">&#x1F4CE;</div></div>'

    };

    //set back to the jQuery object for backwards compatibility
    $.formIt = formIt;
    return formIt;
}));