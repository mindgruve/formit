# Contributing

## Important notes
Please don't edit files in the `dist` subdirectory as they are generated via grunt. You'll find source code in the `src` subdirectory!

### Code style
Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already.** Sorry, but there is no docementation on this.

## Modifying the code
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

1. Fork and clone the repo.
1. Run `npm install` to install all dependencies (including grunt).
1. Run `npm run build-js` to package this project.

Assuming that you don't see any red, you're ready to go.

## Submitting pull requests

1. Create a new branch, please don't work in your `master` branch directly.
1. Update the documentation to reflect any changes.
1. Run `npm run build-js` to ensure your code lints and builds new `/dist` files.
1. Push to your fork and submit a pull request.
