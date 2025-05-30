const controls=document.querySelector(".controls");
const setPixelCountBtn=document.querySelector("#setPixelCountBtn");
const bigContainer=document.querySelector(".bigContainer");
bigContainer.style.display="none";

setPixelCountBtn.addEventListener("click",setupPixelArea);

let mouseDwn=false;

function setupPixelArea()
{
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
        if(Number.isInteger(+inputPixelCount.value) && +inputPixelCount.value>1 && +inputPixelCount.value<=100)
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
{
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
                    });
                    createBatchItems.addEventListener("mouseup",(e)=>{
                        if(e.button===0)
                            mouseDwn=false;
                    });
                    createBatch.appendChild(createBatchItems);
                }
                bigContainer.appendChild(createBatch);
            }
}
function removePreviousCanvas()
{
    const divs=bigContainer.childNodes;
    if(divs!==null)
    Array.from(divs).forEach((element)=>bigContainer.removeChild(element));
}

function addPatch(e)
{
if(mouseDwn)
e.target.style.backgroundColor="black";
}

