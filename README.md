# formIt

A jQuery plugin for custom form elements.

Built by [Chris Kihneman](http://ckihneman.github.com/) and  [Abishai Gray](http://abishaigray.com) at [Mindgruve](http://mindgruve.com/).

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/mindgruve/formit/master/dist/jquery.formit.min.js
[max]: https://raw.github.com/mindgruve/formit/master/dist/jquery.formit.js

In your web page:

```html
<link rel="stylesheet" href="css/jquery.formit.css">
<script src="jquery.js"></script>
<script src="dist/jquery.formit.min.js"></script>
<script>
// IIFE for good measure.
( function( $ ) {

    // On ready.
    $(function () {
		
        // Run formIt.
        $.formIt();
		
    });

})( jQuery );
</script>
```

## Documentation

formIt works a bit differently than your other normal jQuery plugin that is built off of its prototype, `$.fn`. This plugin is attached to directly to the jQuery object, `$`. It is meant to just be called, as you really need your forms just styled. You don't have to think about the selectors, or accidentally leave something out. Just call `$.formIt()` and you will have custom form elements, assuming you have included the `jquery.formit.css`.

Focus events: The default style for focus events uses `box-shadow`. If you want to support focus styles on old IE, I recommend using IE conditionals to add a class to your `html` element. See [Paul Irish's post on conditional classes](http://www.paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/). Once you have a place to put it, target like so:

    .your-ie-conditional-class select[multiple]:focus,
    .your-ie-conditional-class .fi-focus {
        // your focus style for ie, maybe something like...
        outline: 1px solid #aaa;
    }

Note: Multi-selects are not supported. Nor is support planned at this moment. However, they will be skipped over and formIt will not run on them. Basic styles have also been added for multi-selects to match the other elements.

### Options

`chexbox`, `radio`, `select`, `file` (default `true`) enable or disable form elements from being processed by formIt.

`checkboxSelector`, `radioSelector`, `selectSelector`, `fileSelector` (defaults to native element selector) change the selector for your needs, but by default, it will find all style-able elements.

`checkboxHtml`, `radioHtml`, `selectHtml`, `fileHtml` (defaults to native element selector) change the html for the mocked elements built by formIt. This allows you to add css classes as needed and go to town on styling that awesome css triangle or adding an icon, or whatever.

Here are the defaults taken directly from the source code.

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

## Examples

For now, see `demos/index.html`.

## Release History

* 2013/06/19 - v0.1.6 - Add grunt task `cssmin` for minified version of css to `css/jquery.formit.min.css` for production use.
* 2013/05/30 - v0.1.5 - Trigger focus event on checkbox and radio clicks so focus styles are shown.
    * Add styles for multiple select focus event.
    * Update docs about mutli-selects and focus events.
* 2013/05/29 - v0.1.4 - Update select selector to exclude multiple selects.
    * Add styles for multiple selects.
* 2013/04/19 - v0.1.3 - Add handling for disabled selects on setup.
* 2013/04/04 - v0.1.2 - Enhancements for power users that navigate forms with their keyboard.
    * Fire change handler on selects on keyup.
    * Add class `fi-focus` to form elements wrapper that have focus.
* 2013/03/18 - v0.1.1 - Manually call change handler on selects on set up instead of triggering `change` with jQuery. Update grunt to 0.4.1.
* 2012/11/16 - v0.1.0 - Initial release.
