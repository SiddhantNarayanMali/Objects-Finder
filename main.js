Status = "";
Results = [];
Percent = 0;
Label = "";
Width = 0;
Height = 0;
x = 0;
y = 0;

function preload()
{}
function setup()
{
    Canvas = createCanvas(400,400);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
}
function start()
{
    CoCo = ml5.objectDetector("cocossd", ModelL);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    document.getElementById("found").innerHTML = Input+" not found";
    Input= document.getElementById("input").value;
}
function ModelL()
{
    console.log("Model Loaded");
    Status = true;
}
function result(error,results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        Results = results;
        CoCo.detect(Video, result);
    }
}
function draw()
{
    image(Video,0,0,400,400);
    if (Status != "")
    {
        for (i=0; i<Results.length; i++)
        {
            Percent = floor(Results[i].cofidence*100);
            Label = Results[i].label;
            Width = Results[i].width;
            Height = Results[i].height;
            x = Results[i].x;
            y = Results[i].y;
            fill("red");
            text(Label+" "+Percent+"%",x-10,y-20);
            noFill();
            stroke("red");
            rect(Width,Height,x,y);
            if (Label == Input)
            {
                Video.stop();
                CoCo.detect(result);
                document.getElementById("found").innerHTML = Input+" found";
                Api = window.speechSynthesis;
                Utter = SpeechSynthesisUtterance(Input+" found");
            }
            else
            {
                document.getElementById("found").innerHTML = Input+" not found";
            }
        }
    }
}
 
