/*
 * formIt
 * https://github.com/mindgruve/formit
 *
 * Copyright (c) 2013 Chris Kihneman | Mindgruve
 * Licensed under the MIT license.
 */

( function( $ ) {
var
    lastOptions,

    types = {},
    methods = {},
    internal = {},

    // Helpers
    checkboxRadioSetUp = function( $input, $el ) {
        var isDisabled = $input.attr( 'disabled' ),
            classes = '';

        if ( $input.prop('checked') ) {
            classes += 'checked ';
        }
        if ( isDisabled ) {
            classes += 'disabled';
        }
        if ( classes ) {
            $el.addClass( classes );
        }

        if ( !isDisabled ) {
            $input.on( 'change.formit', this.changeHandler );
        }
        $input
            .after( $el )
            .appendTo( $el );
    },

    checkboxRadioRemove = function( $input ) {
        $input.off( '.formit' ).parent().remove();
    };

// Types

// Checkbox
types.checkbox = {
    changeHandler : function() {
        var $input = $( this ),
            $el = $input.parent(),
            isChecked = $input.prop( 'checked' );
        $el[ (isChecked ? 'add' : 'remove') + 'Class' ]( 'checked' );
    },
    setUp : checkboxRadioSetUp,
    remove : checkboxRadioRemove
};

// Radio
types.radio = {
    changeHandler : function() {
        var $input = $( this ),
            $el = $input.parent();
        $( 'input[name="' + $input.attr( 'name' ) + '"]' ).parent( '.checked' ).removeClass( 'checked' );
        $el.addClass( 'checked' );
    },
    setUp : checkboxRadioSetUp,
    remove : checkboxRadioRemove
};

// Select
types.select = {
    changeHandler : function() {
        var $select = $( this ),
            text = $select.find( ':selected' ).text() || '&nbsp;';
        $select.siblings( 'span' ).html( text );
    },
    setUp : function( $input, $el ) {
        $input
            .on( 'change.formit', this.changeHandler )
            .after( $el )
            .appendTo( $el )
            .trigger( 'change' );
    },
    remove : function( $input ) {
        $input.off( '.formit' ).parent().remove();
    }
};

// File
types.file = {
    changeHandler : function() {
        var $file = $( this ),
            text = $file.val();
        text = text ? text.replace(/C:\\fakepath\\/i, '') : '&nbsp;';
        $file.parent().find( 'span' ).html( text );
    },
    clickHandler : function( e ) {
        $( this ).siblings( 'input' )[0].click();
    },
    setUp : function( $input, $el ) {
        var $wrap = $( '<div/>', { 'class' : 'fi-file-wrap' });
        $el
            .on( 'click.formit', this.clickHandler )
            .appendTo( $wrap );

        $input
            .on( 'change.formit', this.changeHandler )
            .after( $wrap )
            .appendTo( $wrap );
    },
    remove : function( $input ) {
        $input.off( '.formit' ).siblings().off( '.formit' ).parent().remove();
    }
};

// Main initialize function
methods.init = function( options ) {
    options = $.extend( {}, $.formIt.defaults, options );
    for ( var typeName in types ) {
        var type = types[ typeName ], $els;
        if ( !options[ typeName ] ) {
            continue;
        }
        $els = $( options[ typeName + 'Selector' ] );
        if ( $els.length ) {
            internal.initType( $els, typeName, type, options[ typeName + 'Html' ] );
        }
    }
    lastOptions = options;
};

internal.initType = function( $els, typeName, type, html ) {
    $els.each( function() {
        var $input = $( this ), $el;
        if ( $input.hasClass('fi-styled') ) {
            return;
        }
        $el = $( '<div/>', { 'class' : 'fi-' + typeName })
            .html( html );
        type.setUp( $input.addClass('fi-styled'), $el );
    });
};

// Remove elements
methods.remove = function( $context ) {
    if ( !lastOptions ) {
        return;
    }
    for ( var typeName in types ) {
        var type = types[ typeName ], $els, selector;
        if ( !lastOptions[ typeName ] ) {
            continue;
        }
        selector = lastOptions[ typeName + 'Selector' ];
        if ( $context && $context.length ) {
            $els = $context.find( selector );
        } else {
            $els = $( selector );
        }
        if ( $els.length ) {
            internal.removeType( $els, type );
        }
    }
};

internal.removeType = function( $els, type ) {
    $els.each( function() {
        var $input = $( this );
        if ( !$input.hasClass('fi-styled') ) {
            return;
        }
        if ( type.remove ) {
            type.remove( $input );
        }
    });
};

$.formIt = function( method ) {
    if ( methods[ method ] ) {
        methods[ method ].apply( this, Array.prototype.slice.call(arguments, 1) );
    } else if ( typeof method === 'object' || !method ) {
        methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.formIt' );
    }
};

$.formIt.defaults = {

    checkbox : true,
    checkboxSelector : 'input[type="checkbox"]',
    checkboxHtml : '<div></div>',

    radio : true,
    radioSelector : 'input[type="radio"]',
    radioHtml : '<div></div>',

    select : true,
    selectSelector : 'select',
    selectHtml : '<span></span><div class="fi-select-arrow-wrap"><div class="fi-select-arrow"></div></div>',

    file : true,
    fileSelector : 'input[type="file"]',
    fileHtml : '<span>Choose a file...</span><div class="fi-file-button"><div class="fi-file-button-inner">Browse</div></div>'

};

})( jQuery );
