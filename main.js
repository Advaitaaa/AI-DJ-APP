song="  ";

leftwristX=0;
leftwristY=0;

rightwristX=0;
rightwristY=0;

scoreleftwrist=0;
scorerightwrist=0;

function preload()
{
    song=loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("poseNet is loaded");
}


function draw()
{
    image(video, 0, 0, 600, 500);

    fill('#FF0000');
    stroke('#FF0000');
    if(scoreleftwrist > 0.2) 
    {
        circle(leftwristX,leftwristY,20);
        inNumberleftwristy=Number(leftwristY);
        removedecimals=floor(inNumberleftwristy);
        volume=removedecimals / 500;
        document.getElementById("volume").innerHTML="volume = " + volume;
        song.setVolume(volume);
    }  

    if(scorerightwrist  >0.2)
    {
        circle(rightwristX,rightwristY,20);

        if(rightwristY > 0 && rightwristY <= 100)
        {
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        } 

        else if( rightwristY > 100 && rightwristY <= 200)
        {
            document.getElementById("speed").innerHTML="Speed = 1x"
            song.rate(1)
        }

        else if (rightwristY > 200 && rightwristY <= 300)
        {
            document.getElementById("speed").innerHTML="Speed = 1.5x"
            song.rate(1.5)
        }

        else if (rightwristY > 300 && rightwristY <= 400)
        {
            document.getElementById("speed").innerHTML="Speed = 2x"
            song.rate(2)
        }

        else if (rightwristY > 400 && rightwristY <=500)
        {
            document.getElementById("speed").innerHTML="Speed = 2.5x"
            song.rate(2.5)
        }

    }
}

function play()
{
    song.play();  //predefind functon of p5.js to play the song//
    song.setVolume(1);   //Predefind function that is used to control the volume//
    song.rate(1);    //Predefind function that is used to control the speed of the song//
}

function stop()
{
    song.stop();
}

function gotPoses(results)
  
{    if(results.length > 0)

{
    console.log(results)
    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("scoreleftwrist=" + scoreleftwrist);
    scorerightwrist=results[0].pose.keypoints[10].score;
    console.log("scorerightwrist=" + scorerightwrist);

    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    console.log("leftwristX = " + leftwristX + "leftwristY = " + leftwristY);

    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
    console.log("rightwristX = " +rightwristX + "rightwristY = " + rightwristY )
}
}
