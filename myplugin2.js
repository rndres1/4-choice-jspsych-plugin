var myplugin2 = (function (jspsych) {
  "use strict";

  const info = {
    name: "myplugin2",
    parameters: {
      duration: {
        type: jspsych.ParameterType.INT,
        default: 700,
      },
      image_fnames: {
        type: jspsych.ParameterType.IMAGE,
        default: undefined,
      },
    },
  };

  class myplugin2 {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    /*
    https://www.jspsych.org/7.3/developers/plugin-development/
    Inside the .trial() method you can do pretty much anything that you want, including modifying the DOM, 
    setting up event listeners, and making asynchronous requests
    */

    trial(display_element, trial)
    {
     /* todo: create html for 
     1. the row column layout and the selector mechanism. 
     2. button with "next" when clicked it ends trial
     3. implement "Asynchronous loading"
     
     */

      // show image
      let html_content = `      
      <div class="outer-container">
      <div class="container">
          <img src="${trial.image_fnames[0]}" class="image">
          <img src="${trial.image_fnames[1]}" class="image">
          <img src="${trial.image_fnames[2]}" class="image">
          <img src="${trial.image_fnames[3]}" class="image">
      </div>
      <div class="padding"></div>
      <div>
          <button class="next-button">Next</button>
      </div>
      </div>
      </div>
      `;
      display_element.innerHTML = html_content;
      console.log(html_content)
    
      const after_key_response = (info) => {
        // hide the image
        display_element.innerHTML = '';
    
        // record the response time as data
        let data = {
          rt: info.rt
        }
    
        // end the trial
        this.jsPsych.finishTrial(data);
      }
    
      // set up a keyboard event to respond only to the spacebar
      this.jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_key_response,
        valid_responses: [' '],
        persist: false
      });
    }
  }
  myplugin2.info = info;

  return myplugin2;
})(jsPsychModule);