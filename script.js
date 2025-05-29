const controls=document.querySelector(".controls");
const setDimensionsBtn=document.querySelector("#setDimensionsBtn");
const bigContainer=document.querySelector(".bigContainer");
bigContainer.style.display="none";

setDimensionsBtn.addEventListener("click",setupPixelArea);



function setupPixelArea()
{
    bigContainer.style.display="none";
    removePreviousCanvas();
    setDimensionsBtn.style.display="none";
    
    let pixelCount=0;
    const inputPixelCount=document.createElement("input");
    inputPixelCount.value="Enter number of Pixels";
    const drawPixelsBtn=document.createElement("button");
    drawPixelsBtn.textContent="Draw Pixel Area";



    drawPixelsBtn.setAttribute("style",`
    height: 50px;
    width: 150px;
    border-radius: 12px;
    color: white;
    font-weight: 600;
    font-size: 15px;
    border: 2px solid black;
    background-color: blueviolet`);
    

    inputPixelCount.addEventListener("click",e=>e.target.value="");
    inputPixelCount.addEventListener("mouseleave",e=>
        {
            if(inputPixelCount.value==="")
            e.target.value="Enter number of Pixels";
        }
    );

    drawPixelsBtn.addEventListener("mouseenter",()=>{
          drawPixelsBtn.style.backgroundColor="rgb(191, 153, 226)";
    });
    drawPixelsBtn.addEventListener("mouseleave",()=>{
        drawPixelsBtn.style.backgroundColor="blueviolet";
    });
    drawPixelsBtn.addEventListener("click",function()
    {
    if(Number.isInteger(+inputPixelCount.value) && +inputPixelCount.value>0 )
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
        setDimensionsBtn.style.display="";
        bigContainer.style.display="flex";
        drawCanvas(pixelCount);
    }
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
                    createBatchItems.setAttribute("style","border:1px solid black;flex:1");
                    createBatchItems.addEventListener("mouseenter",addPatch);
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
e.target.style.backgroundColor="gray";
}

