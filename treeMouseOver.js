var margin = {top: 20, right: 120, bottom: 20, left: 320},
    width = 3000 - margin.right - margin.left,
    height = 1800 - margin.top - margin.bottom;
    
var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height-1000, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




var flare = {
 "name": "flare",
 "url":"http://google.com",
 "abstract": "radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.",
 "children": [
      {"name": "AgglomerativeCluster", "size": 3938,"abstract": "radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use"},
      {"name": "CommunityStructure", "size": 3812,"abstract": "Radiation2"},
      {"name": "HierarchicalCluster", "size": 6714,"abstract": "Radiation3"},
      {"name": "AgglomerativeCluster", "size": 3938,"abstract": "Radiation1"},
      {"name": "CommunityStructure", "size": 3812,"abstract": "radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not a"},
      {"name": "HierarchicalCluster", "size": 6714,"abstract": "Radiation3"},
      {"name": "AgglomerativeCluster", "size": 3938,"abstract": "Radiation1"},
      {"name": "CommunityStructure", "size": 3812,"abstract": "Radiation2"},
      {"name": "HierarchicalCluster", "size": 6714,"abstract": "radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not a"},
      {"name": "AgglomerativeCluster", "size": 3938,"abstract": "Radiation1"},
      {"name": "CommunityStructure", "size": 3812,"abstract": "Radiation2"},
      {"name": "HierarchicalCluster", "size": 6714,"abstract": "radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not always use it.radiation is a good thing but we can not a"},
	]
};
root = flare;
root.x0 = height / 2;
root.y0 = 0;

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth *400; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Define the div for the tooltip
  var div = d3.select("text").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click)
      .on("dblclick", function(d) { window.open(d.url); })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      //.style("fill-opacity", 1e-6);
      .attr("fill", 'grey');

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}

function mouseover(d) {
    d3.select(this).append("text")
        .attr("class", "hover")
        //.attr('transform', function(d){ 
        //    return 'translate(10, 20)';
        //})	
	.attr('fill', 'blue')
        .call(wrap,d.abstract);
}

// Toggle children on click.
function mouseout(d) {
    d3.select(this).select("text.hover").remove();
}

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

function wrap(text,content) {
    text.each(function () {
        var text = d3.select(this),
            words = content.split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0
            //lineHeight = 1.1, // ems
            //x = text.attr("x"),
            //y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", -270)
                        .attr("y", 25)
                        //.attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > 270) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            //.attr("x", x)
                            //.attr("y", y)
                            //.attr("dy", ++lineNumber * lineHeight + dy + "em")
			    .attr("x", -270)
			    .attr('dy',20)
                            .text(word);
            }
        }
    });
}

root.children.forEach(collapse);
update(root);

d3.select(self.frameElement).style("height", "800px");


