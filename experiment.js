const image_names = [
    './media/Affection.png',
    './media/Dissatisfaction.png',
    './media/Gratitude.png',
    './media/Hate.png',
    './media/Resentment.png',
    './media/Satisfaction.png',
    './media/Shock.png',
    './media/Surprise.png',
    ]

    const jsPsych = initJsPsych({
        on_finish: function() {
        jsPsych.data.displayData();
    }
    });

    var timeline = [];

    var trial1 = {
        type: myplugin2, 
        image_fnames: [image_names[0], image_names[2], image_names[4], image_names[7]],
        duration: 800,
        instruction: "Which image is the best?"
    }
    timeline.push(trial1);
    
    var trial2 = {
        type: myplugin2, 
        image_fnames: [image_names[3], image_names[5], image_names[1], image_names[6]],
        duration: 800,
        instruction: "Which image is the best?"
    }
    timeline.push(trial2);

    jsPsych.run(timeline)