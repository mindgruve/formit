# formIt

A jQuery plugin for custom form elements.

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/mindgruve/formit/master/dist/jquery.formit.min.js
[max]: https://raw.github.com/mindgruve/formit/master/dist/jquery.formit.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.formit.min.js"></script>
<script>
// IIFE for good measure.
( function( $ ) {

    // Setup your defaults (if they are global).
    // Not needed if you just override the existing styles
    // in `css/jquery.formit.css`.
    $.formIt.defaults.checkboxHtml = '<span class="ss-icon">&#x2713;</span>';
    $.formIt.defaults.radioHtml = '<div class="my-inner"></div>';

    // A span is required for selects and files
    $.formIt.defaults.selectHtml = '<span></span><div class="my-arrow-wrap"><div class="my-arrow"></div></div>';
    $.formIt.defaults.fileHtml = '<span>Choose a file...</span><div class="my-button"><div class="my-inner-button">Browse</div></div>';

    // On ready.
    $( function() {

        // Run formIt.
        $.formIt();
    });

})( jQuery );
</script>
```

## Documentation

_(Coming soon)_

## Examples

_(Coming soon)_

## Release History

_(Nothing yet)_
