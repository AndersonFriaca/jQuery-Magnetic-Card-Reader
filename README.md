# jQuery Magnetic Card Reader

A jQuery Plugin to read magnetic cards of 1, 2 and 3 trails.

[![Build Status](https://travis-ci.org/AndersonFriaca/jQuery-Magnetic-Card-Reader.svg?branch=master)](https://travis-ci.org/AndersonFriaca/jQuery-Magnetic-Card-Reader)
[![NPM Version](https://img.shields.io/npm/v/jquery-magnetic-card-reader.svg)](https://www.npmjs.com/package/jquery-magnetic-card-reader)
[![Bower Version](https://img.shields.io/bower/v/jquery-magnetic-card-reader.svg)](https://github.com/AndersonFriaca/jQuery-Magnetic-Card-Reader/)

# Install it via Package Managers

### Bower

`bower install jquery-magnetic-card-reader`

### NPM

`npm i jquery-magnetic-card-reader`

# How to use

There are numbers of way to use this plugin:

- `$(selector).magneticCardReader(options)`
- `$.magneticCardReader($target, options)`

And each of these methods has the same options:

- `animationOnInit` is a **optional** function that will override a standard animation function that is triggered after the first trail is captured
- `animationOnComplete` is a **optional** function that will override a standard animation function that is triggered when the last trails capture timer finishes
- `buildDataFirstTrail` is a **optional** function used to extract the necessary data referring to the first trail
- `buildDataSecondTrail` is a **optional** function used to extract the necessary data referring to the second trail
- `buildDataThirdTrail` is a **optional** function used to extract the necessary data referring to the third trail
- `callback` is a **required** function that is triggered at the end of the execution of the plugin containing the data obtained from the card
- `colorToHide` is a **required** attribute used to set the color of the input text when the default animation is activated, default value is `"#FFF"`
- `colorToShow` is a **required** attribute used to set the color of the input text when the default animation is completed, default value is `""`
- `eventKeyType` is a **required** attribute use to fire the plugin, default value is `keydown`, other possible values is: `keypress` and `keyup`
- `regExpFirstTrail` is a **optional** attribute used to capture the value of first trail including the initial and end characters, this value must be a object of type **RegExp**
- `regExpSecondTrail` is a **required** attribute used to capture the value of second trail including the initial and end characters, this value must be a object of type **RegExp**
- `regExpThirdTrail` is a **optional** attribute used to capture the value of third trail including the initial and end characters, this value must be a object of type **RegExp**
- `styleCursorOnInit` is a **required** attribute used to set the style of cursor pointer when the default animation is activated, default value is `"wait"`
- `timerLimit` is a **required** attribute used to define a timer limit of capturation on each trail

**See usage examples [here](https://github.com/AndersonFriaca/jQuery-Magnetic-Card-Reader/tree/master/examples)!**

# Contributing

- **Bug Reporting**: You can contribute opening [issues](https://github.com/AndersonFriaca/jQuery-Magnetic-Card-Reader/issues).
- **Bug Fixing**: Fix it and help others and write some [tests](https://github.com/AndersonFriaca/jQuery-Magnetic-Card-Reader/tree/master/test) to make sure that everything are working propertly.
- **Improving**: Open an [issue](https://github.com/AndersonFriaca/jQuery-Magnetic-Card-Reader/issues) and lets discuss it.

To get started to contribuite, please install [NodeJS](http://nodejs.org/), [Bower](http://bower.io/), [Grunt](https://gruntjs.com/), and then run some Grunt/Bower commands.

```shell
npm install
bower install
grunt test  # Lint code and run test suite on scenarios
grunt build # Generate the release files
```

This plugin is tested with [QUnit](http://qunitjs.com/), under jQuery 1.7 up to 3.3 and RequireJS.

# Contributors

- [Anderson Friaça](https://github.com/AndersonFriaca)
- [Christoffer Genova](https://github.com/ChristofferGenova)
