const controls=document.querySelector(".controls");
const setPixelCountBtn=document.querySelector("#setPixelCountBtn");
const bigContainer=document.querySelector(".bigContainer");
const clearCanvasBtn=document.querySelector("#clearCanvasBtn");
bigContainer.style.display="none";
clearCanvasBtn.style.display="none";
setPixelCountBtn.addEventListener("click",setupPixelArea);
clearCanvasBtn.addEventListener("click",clearCanvas);

let canvasEnable=false;
let mouseDwn=false,mouseMid=false;
let setRandomColor=false,setGrayColor=false;
let intensityMode=false;


function setupPixelArea()
{
    canvasEnable=false;
    clearCanvasBtn.style.display="none";
    bigContainer.style.display="none";
    removePreviousCanvas();
    setPixelCountBtn.style.display="none";
    
    let pixelCount=0;
    const inputPixelCount=document.createElement("input");
    inputPixelCount.value="Enter number of Pixels";
    inputPixelCount.style.height="40px";
    inputPixelCount.style.width="200px";
    inputPixelCount.style.textAlign="center";

    const drawPixelsBtn=document.createElement("button");
    drawPixelsBtn.textContent="Set Pixels";



    drawPixelsBtn.setAttribute("style",`
    height: 50px;
    width: 150px;
    border-radius: 12px;
    color: white;
    font-weight: 600;
    font-size: 15px;
    border: 2px solid black;
    background-color: blueviolet`);
    
    //clear input pixel area onclick and inform to enter a value to input field if empty
    inputPixelCount.addEventListener("click",e=>{
        e.target.value="";
        e.target.style.border="1px solid #8F8F9D"
    });

    inputPixelCount.addEventListener("mouseleave",e=>
        {
            if(inputPixelCount.value==="")
            e.target.value="Enter number of Pixels";
        }
    );


    


    //Set pixels btn hover animations
    drawPixelsBtn.addEventListener("mouseenter",()=>{
          drawPixelsBtn.style.backgroundColor="rgb(191, 153, 226)";
    });
    drawPixelsBtn.addEventListener("mouseleave",()=>{
        drawPixelsBtn.style.backgroundColor="blueviolet";
    });

    let displayPixels=function()
    {
        //display clear button on submit of pixel value
        
        if(Number.isInteger(+inputPixelCount.value) && +inputPixelCount.value>=1 && +inputPixelCount.value<=100)
            {
                
                pixelCount=+inputPixelCount.value;
                controls.removeChild(inputPixelCount);
                controls.removeChild(drawPixelsBtn);
                controls.removeAttribute("style",`
                    display:flex;
                    height:200px;
                    flex-direction:column;
                    justify-content:center;
                    justify-content:space-evenly;
                    align-items:center;
                    `);
                setPixelCountBtn.style.display="";
                bigContainer.style.display="flex";
                drawCanvas(pixelCount);
            }
            if(Number.isInteger(+inputPixelCount.value) && (+inputPixelCount.value>100 || +inputPixelCount.value<1))
            {
                inputPixelCount.value="Enter Value Within 1-100";
                inputPixelCount.style.border="1px solid red";
            }
    }

    //Set pixels btn functionality
    drawPixelsBtn.addEventListener("click",displayPixels);


    //Submit pixel clount value on enter keypress
    inputPixelCount.addEventListener("keydown",(e)=>{
        if(e.key==="Enter")
        displayPixels();
    });
    
    controls.setAttribute("style",`
        display:flex;
        height:200px;
        flex-direction:column;
        justify-content:center;
        justify-content:space-evenly;
        align-items:center;
        `);
    controls.appendChild(inputPixelCount);
    controls.appendChild(drawPixelsBtn);
}


function drawCanvas(pixelCount)
{   clearCanvasBtn.style.display="";
    canvasEnable=true;
    for(let i=1;i<=pixelCount;i++)
        {
            const createBatch=document.createElement("div");
            createBatch.setAttribute("style","display:flex;box-sizing:border-box;justify-content:space-evenly;flex:1");
            for(let j=1;j<=pixelCount;j++)
                {
                    const createBatchItems=document.createElement("div");
                    createBatchItems.setAttribute("style","border:0px solid black;flex:1");
                    createBatchItems.addEventListener("mousemove",addPatch);
                    createBatchItems.addEventListener("mousedown",(e)=>{
                        if(e.button===0)
                            mouseDwn=true;
                        if(e.button===1)
                            mouseMid=true;
                    });
                    createBatchItems.addEventListener("mouseup",(e)=>{
                        if(e.button===0)
                            mouseDwn=false;
                        if(e.button===1)
                            mouseMid=false;
                    });
                    createBatch.appendChild(createBatchItems);
                }
                bigContainer.appendChild(createBatch);
            }
}


function randomColorGenerator()
{
    let r=Math.floor(Math.random() * 255);
    let g=Math.floor(Math.random() * 255);
    let b=Math.floor(Math.random() * 255);
    let colorValue=`rgb(${r},${g},${b})`;
    return colorValue;
}

function removePreviousCanvas()
{
    const divs=bigContainer.childNodes;
    if(divs!==null)
    Array.from(divs).forEach((element)=>bigContainer.removeChild(element));
}


function setPixelOpacity(e)
{
    if(e.target.style.backgroundColor==="")
        e.target.style.opacity="0.2";
    else
        {
            let elementOpacity=+getComputedStyle(e.target).getPropertyValue("opacity");
            elementOpacity+=0.08;
            e.target.style.opacity=elementOpacity;
        }
}

function clearCanvas()
{
    if(canvasEnable)
    {
        const eachPixel=document.querySelectorAll(".bigContainer div");
        eachPixel.forEach((pixel)=>{
            pixel.style.backgroundColor="";
        });
    }
}



function addPatch(e)
{
    //checks if intensity mode active or not and sets element opacity based on that
    if(intensityMode)
        setPixelOpacity(e);
    else
        e.target.style.opacity="1.0";
    //Set colors based on user demands (setRandomColor val or setGrayColor val)
    let backgroundColor;
    if(setRandomColor)
        backgroundColor=randomColorGenerator();
    else if(setGrayColor)
        backgroundColor="gray";
    else
        backgroundColor="black";

if(mouseDwn &&  e.target.style.backgroundColor===""){   //to color the background only if its not coloured
    e.target.style.backgroundColor=backgroundColor;
}
//To use it as an eraser on mid mouse btn drag
if(mouseMid)
e.target.style.backgroundColor="";
}

