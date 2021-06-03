var mosquitoes = [];
var svg = d3.select("svg");
var currentIndex = 0;
var transitionTime = 1000;
var mosquitoWidth = 50;
var mosquitoHeight = 50;

d3.json("data/mosquitoes.json")
    .then(function(data){
        mosquitoes = data
        update();
    })
    .catch(function(error){
        console.log(error);
    })


function indexStepRight(){
    currentIndex += 1;
    currentIndex = currentIndex % mosquitoes.length;
}

function indexStepLeft(){
    currentIndex -= 1;
    if (currentIndex < 0) {
        currentIndex = mosquitoes.length - 1
    }
}

function update(){
    console.log(currentIndex)
    var mosquito = mosquitoes[currentIndex];
    svg.selectAll("image")
	.data([mosquito]) 	
    .transition()
    .duration(transitionTime)
    .attr('x', function(data){return data.x;})
    .attr('y', function(data){return data.y;})
    .attr('width', mosquitoWidth)
    .attr('height', mosquitoHeight)
    .attr("xlink:href", "assets/mosquito.png")
}

function backgroundUpdate(){
    indexStepRight();
    update();
}

function foregroundUpdate(){
    indexStepLeft();
    update();
}

svg.selectAll("image").on("click", function(event){
    foregroundUpdate();
    event.stopPropagation();
})

svg.on("click", function(event){
    backgroundUpdate();
    event.stopPropagation();
})

d3.select("html").on("click", function(event){
    backgroundUpdate();
})

