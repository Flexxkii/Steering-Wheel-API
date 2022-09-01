# Steering wheel API *v0.1.1*

Still work in progress.

Tested with a Logitech G29

![Preview](https://i.imgur.com/FlH1YXV.png "preview")

## Installation
Include the script.js file in the header of your page.

## Data

Get steering wheel data

```javascript
// Returns degrees of motion
steeringwheel.steering

// Returns amount of gas input ranging from 0 to 100
steeringwheel.gas

// Returns amount of break input ranging  from 0 to 100
steeringwheel.break

// Returns amount of clutch input ranging  from 0 to 100
steeringwheel.clutch
```

Edited this to your steering wheel max rotation amount, default is 900.

```javascript
var steering_max_rotation = 900;
```

## Todo
* A lot
* Keybind every possible buttons
* Find a way to not repeat buttons when pressing them while using the requestAnimationFrame API to listen to button changes.
* Make it easier to integrate into other projects.
* Compatible with other steering wheel if they aren't. (Haven't tested)
* Low priority, but maybe a nice interface for the demo.
* Optimize code.

## Changes

* 0.1.0
    * Initiale release

* 0.1.1
    * Added two new values
        * steeringwheel.steering_procent & steeringwheel.steering_procent_50
    * Optimized code to only do changes when values have changed instead of repeating the same values.
    * Made steeringwheel object accessible outside it's function.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

---

Thanks to [https://gamepad-tester.com/](https://gamepad-tester.com/) for the useful gamepad debugging tool.

---

[Using the Gamepad API by Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API)

## License
[MIT](https://choosealicense.com/licenses/mit/)