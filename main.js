song="  ";

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
}

function draw()
{
    image(video, 0, 0, 600, 500);
}

function play()
{
    song.play();  //predefind functon of p5.js to play the song//
}

function stop()
{
    song.stop();
}