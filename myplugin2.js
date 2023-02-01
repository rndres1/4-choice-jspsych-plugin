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
      instruction: {
        type: jspsych.ParameterType.STRING,
        default: undefined,
      }
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
     
      // show image
      let html_content = `
      <div>
      <h3>
      ${trial.instruction}
      </h3>
      </div>
      <div class="outer-container">
      <div class="container">
          <img src="${trial.image_fnames[0]}" class="image" id="image01">
          <img src="${trial.image_fnames[1]}" class="image" id="image02">
          <img src="${trial.image_fnames[2]}" class="image" id="image03">
          <img src="${trial.image_fnames[3]}" class="image" id="image04">      
      <div>
          <button class="next-button" disabled id="nextButton">Next</button>
      </div>
      </div>
      </div>
      <div>
        <input type="hidden" id="selectedImageId">
      </div>
      `;
      //console.log(html_content);
      display_element.innerHTML = html_content;

      /* 
      ==================== pasted from ChatGPT ==========
      */
      const images = document.querySelectorAll('.image');
      let selectedImageId;

      images.forEach(image => {
        image.addEventListener('click', e => {
          // Remove border from previously selected image
          if (selectedImageId) {
            document.getElementById(selectedImageId).style.border = 'none';
          }
        // Add border to currently selected image
          image.style.border = '10px solid #95ae48';
          selectedImageId = image.id;
          console.log(selectedImageId);
          document.getElementById("selectedImageId").value = selectedImageId;
        });
      });
      /*
      ===========================================
      */

      const after_key_response = (info) => {  
        // record the data
        let data = {
          rt: info.rt,
          selectedImageId: document.getElementById("selectedImageId").value,
        }        
        console.log(data);
        // clear the HTML stuff that was previously created
        display_element.innerHTML = '';    
        // THIS IS WHERE the trial ENDS
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