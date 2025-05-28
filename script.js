const bigContainer=document.querySelector(".bigContainer");
const gridSize=+prompt("Enter GridSize");
for(let i=1;i<=gridSize;i++)
{
    const createBatch=document.createElement("div");
    createBatch.setAttribute("style","display:flex;box-sizing:border-box;justify-content:space-evenly;flex:1");
    for(let j=1;j<=gridSize;j++)
        {
            const createBatchItems=document.createElement("div");
            createBatchItems.setAttribute("style","border:2px solid black;flex:1");
            createBatchItems.addEventListener("mouseenter",addPatch);
            createBatch.appendChild(createBatchItems);
        }
        bigContainer.appendChild(createBatch);
}

function addPatch(e)
{
e.target.style.backgroundColor="gray";
}

