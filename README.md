# jQuery Magnetic Card Reader
A jQuery Plugin to read magnetic cards of 1, 2 and 3 trails.

[![Build Status](https://travis-ci.org/AndersonFriaca/jQuery-Magnetic-Card-Reader.svg?branch=master)](https://travis-ci.org/AndersonFriaca/jQuery-Magnetic-Card-Reader)

# How to use

There are numbers of way to use this plugin:

* `$(selector).magneticCardReader(options)`
* `$.magneticCardReader($target, options)`

And each of these methods has the same options:

* `animationOnInit` is a **optional** function that will override a standard animation function that is triggered after the first trail is captured
* `animationOnComplete` is a **optional** function that will override a standard animation function that is triggered when the last trails capture timer finishes
* `buildDataFirstTrail` is a **optional** function used to extract the necessary data referring to the first trail
* `buildDataSecondTrail` is a **optional** function used to extract the necessary data referring to the second trail
* `buildDataThirdTrail` is a **optional** function used to extract the necessary data referring to the third trail
* `callback` is a **required** function that is triggered at the end of the execution of the plugin containing the data obtained from the card
* `colorToHide` is a **optional** attribute used to set the color of the input text when the default animation is activated, default value is `"#FFF`
* `colorToHide` is a **optional** attribute used to set the color of the input text when the default animation is completed, default value is `""`
* `eventKeyType` is a **optional** attribute use to fire the plugin, default value is `keyup`, other possible values is: `keydown` and `keypress`
* `regExpFirstTrail` is a **optional** attribute used to capture the value of first trail including the initial and end characters, this value must be a object of type **RegExp**
* `regExpSecondTrail` is a **required** attribute used to capture the value of second trail including the initial and end characters, this value must be a object of type **RegExp**
* `regExpThirdTrail` is a **optional** attribute used to capture the value of third trail including the initial and end characters, this value must be a object of type **RegExp**
* `styleCursorOnInit` is a **optional** attribute used to set the style of cursor pointer when the default animation is activated, default value is `"wait"`
* `timerLimit` is a **optional** attribute used to define a timer limit of capturation on each trail

# Contributors
 * [Anderson Friaça](https://github.com/AndersonFriaca)
 * [Christoffer Genova](https://github.com/ChristofferGenova)
