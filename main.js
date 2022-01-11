song = ""


leftWristX = 0;
leftWristY = 0;


rightWristX = 0;
rightWristY = 0;


scoreLeftWrist = 0;
scoreRightWrist = 0;


function preload(){
    song = loadSound("gitup.mp3");
}


function play(){
        song.play();
        song.volume(0.2);
        song.rate(1);
}


function pause(){
    song.pause();
}


function resetS(){
    song.rate(1);
    document.getElementById("buttonSpeed").innerHTML = " Speed = 1x ";
}


function resetV(){
    song.volume(0.2);
    document.getElementById("buttonVolume").innerHTML = " Volume = 0.2x ";
}




function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();


   poseNet = ml5.poseNet(video, modelLoaded); 
   poseNet.on('pose', gotPoses);
}


function draw(){
    image(video,0,0,600,500);


    fill("#E40618");
    stroke("#E40618");

if (scoreLeftWrist > 0.2){ 
    circle( leftWristX, leftWristY, 20);
    leftWristYNum = Number(leftWristY);
    remove_decimals = floor(leftWristYNum);
    volume = remove_decimals/500;
    document.getElementById("buttonVolume").innerHTML = " Volume : " + volume;
    song.setVolume(volume);
}


 if (scoreRightWrist > 0.2){
     circle ( rightWristX, rightWristY, 20);
     if ( rightWristY > 0 && rightWristY <= 100){
         document.getElementById("buttonSpeed").innerHTML  = " Speed = 0.5x ";
         song.rate(0.5);
     }
     else if ( rightWristY > 100 && rightWristY <= 200){
         document.getElementById("buttonSpeed").innerHTML = " Speed = 1x ";
         song.rate(1);
     }
     else if ( rightWristY > 200 && rightWristY <= 300){
        document.getElementById("buttonSpeed").innerHTML = " Speed = 1.5x ";
        song.rate(1.5);
    }
    else if ( rightWristY > 300 && rightWristY <= 400){
        document.getElementById("buttonSpeed").innerHTML = " Speed = 2x ";
        song.rate(2);
    }
    else if ( rightWristY > 400 && rightWristY <= 500){
        document.getElementById("buttonSpeed").innerHTML = " Speed = 2.5x ";
        song.rate(2.5);
    }
 }
}


function modelLoaded(){
    console.log("poseNet is intialized! :D")
}


function gotPoses(results){
    if( results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(" Score Of Left Wrist = " + scoreLeftWrist + " Score Of Right Wrist" + scoreRightWrist);
        
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(" Left wrist x = " + leftWristX + " Left wrist y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log( " Right wrist X = " + rightWristX + " Right wrist y = " + rightWristY);
    }
}







