img = ""
status = ""
objects = []

function preload() {
    audio = loadSound('undertale_uwa.mp3')
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}


function modelLoaded() {
    console.log("model Loaded")
    status = true
    objectDetector.detect(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    console.log(results)
    objects = results
}

function draw() {
    image(img, 0, 0, 640, 420)
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill('#ff0000')
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke('#ff0000')
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if (objects[i].label == "person") {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                audio.stop();
            }
            else {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                audio.play();
            }
        }
        if (objects.length == 0) {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            audio.play();
        }
    }

}