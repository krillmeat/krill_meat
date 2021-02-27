let svgs = [];

let svgNodes = document.querySelectorAll("svg[data-type='svg']");

for(let node of svgNodes){
    svgs.push(node);
}

const paintSVGs = () => {
    for(let svg of svgs){
        let svgLink = svg.dataset.link;
        svg.innerHTML = svgData[svgLink];
    }
}