var temp_btn;
let last = 0;
let num = 0;
let speed = 0.7;
var steering_max_rotation = 900;
var steering_max_rotation_set;

var steeringwheel = {};
var current_values = {};
var steering_timestamp = -1;

function game(time) {

    steering_max_rotation_set = parseInt($("#settings_rotation").val());

    // Resets the pressed Dpad button to prevent quickly repeated button press
    let timeInSecond = time / 1000;
    if (timeInSecond - last >= speed) {
        last = timeInSecond;
        temp_btn = '';
    }
    var gp = navigator.getGamepads();
    gp.forEach(function(val, key) {
        if(val && val.id.includes("Wheel") && steering_timestamp != val.timestamp) {
            var dpad_val;
            steering_timestamp = val.timestamp;

            // Based on Logitech G29 Dpad value. Check https://gamepad-tester.com/
            if(val.axes[9] > 0.70 && val.axes[9] < 0.72) {
                dpad_val = "left";    
            } else if(val.axes[9] < -0.99 && val.axes[9] > -1.01) {
                dpad_val = "Up";
            } else if(val.axes[9] < -0.41 && val.axes[9] > -0.43) {
                dpad_val = "Right";
            } else if (val.axes[9] > 0.13 && val.axes[9] < 0.15) {
                dpad_val = "Down";
            } else {
                dpad_val = "None";
            }

            const pad = {
                    steering: val.axes[0],
                    gas: val.axes[2],
                    break: val.axes[5],
                    clutch: val.axes[1],
                    dpad: dpad_val,
                    buttons: {
                        a: val.buttons[0].pressed,
                        b: val.buttons[2].pressed,
                        y: val.buttons[3].pressed,
                        x: val.buttons[1].pressed
                    }
            }

            steeringwheel = {
                steering: steering_max_rotation * pad.steering  * .5,
                steering_procent: (steering_max_rotation * pad.steering  * .5) / (steering_max_rotation_set / 2) * 100,
                steering_procent_50: 50 + ((steering_max_rotation * pad.steering  * .5) / (steering_max_rotation_set / 2) * 50),
                gas: (100 - Math.round(((pad.gas + 1) / 2) * 100)) / 100,
                break: (100 - Math.round(((pad.break + 1) / 2) * 100)) / 100,
                clutch: (100 - Math.round(((pad.clutch + 1) / 2) * 100)) / 100
            }

            // For Demo purposes
            $(".steering_amount").val(steeringwheel.steering_procent_50 / 100);
            $(".wheel").css('transform', `rotate(${steeringwheel.steering}deg)`);
            if(steeringwheel.steering_procent) {
                $(".steering_value").text(steeringwheel.steering_procent.toFixed(2));
            } else {
                $(".steering_value").text("0");
            }

            pad.gas != current_values.gas ? $(".gas").val(steeringwheel.gas) : false;
            pad.break != current_values.break ? $(".break").val(steeringwheel.break) : false;
            pad.clutch != current_values.clutch ? $(".clutch").val(steeringwheel.clutch) : false;

            current_values = {
                steering: pad.steering,
                gas: pad.gas,
                break: pad.break,
                clutch: pad.clutch,
            }
            
            $(".btn").html(pad.dpad);

            // Returns Dpad button presses
            Object.entries(pad.buttons).forEach(btn_val => {
                const entry_key = btn_val[0];
                const entry_val = btn_val[1];
                if(entry_val == true) {
                    btn_press(entry_key);
                    temp_btn = entry_key;
                }
            })
        }
    });
  window.requestAnimationFrame(game);
}

game();

function btn_press(btn) {
    if(btn != temp_btn) {
        console.log(btn);
        console.log(temp_btn);
        console.log('button is pressed', btn);
    }
}


// WIP
window.addEventListener("gamepaddisconnected", (event) => {
    console.log("A gamepad disconnected:");
    debug1.html(event.gamepad);
});