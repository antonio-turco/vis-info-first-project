var mosquitoes = [
    {"x": 50,  "y": 100},
    {"x": 100, "y": 150},
    {"x": 275, "y": 145},
    {"x": 80, "y": 330},
    {"x": 310, "y": 100},
    {"x": 120, "y": 380},
    {"x": 100, "y": 120},
    {"x": 50, "y": 200},
    {"x": 200, "y": 220},
    {"x": 300, "y": 12}]

var svg = d3.select("svg");

var currentIndex = 0

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
 .attr('x', function(data){return data.x;})
 .attr('y', function(data){return data.y;})
 .attr('width', 50)
 .attr('height', 50)
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

update();