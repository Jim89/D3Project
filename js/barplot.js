/* --------------------------------------------------------------------------------
Script for BS1807 Assignment 2b that creates a bar plot
Jim Leach
2016/02/26
*/
function barplot(data, athlete_selection, axis = true) {

// Set up x and y domains
x_bar.domain([0, d3.max(data, function(d) { return d.Medals; })]);
y_bar.domain(data.map(function(d) { return d.Athlete; }));

// Set colous labels based on gender
data.forEach(function(d) {
  d.color_bar = color(d.Gender);
});

if (axis === true) {
    // Add X axis
      svg.append("g")
      .attr("class", "x axis")
      .call(xAxis_bar)
      .selectAll("text")
        .attr("y", -3.5)
        .attr("x", -3)
        .attr("dy", "-.55em")
        .style("text-anchor", "start");

    // Add x-axis label
    svg.append("text")
    .attr("class", "xlab")
    .attr("text-anchor", "right")
    .attr("y", 10)
    .attr("x", width_bar - 75)
    .text("Total Medals");

    // Add Title
    svg.append("text")
    .attr("class", "plottitle")
    .attr("text-anchor", "center")
    .attr("y", -25)
    .attr("x", width_bar - 375)
    .text("Total Medals by Athlete");

    // Add X grid
    svg.append("g")         
      .attr("class", "grid_bar")
      .attr("transform", "translate(0," + height_bar + ")")
      .call(make_x_axis_bar()
      .tickSize(-height_bar, 0, 0)
      .tickFormat("")
      )

    // Add Y axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis_bar);
}      
 
  
// Bind data to bars 
var bars = svg.selectAll(".bar")
          .data(data);

// Enter phase
    bars.enter()
        .append("rect");

// Update phase, set x, y, width, height
    bars.attr("class", "bar")
        .attr("x", 0)
        .attr("width", function(d) { return x_bar(d.Medals)})
        .attr("y", function(d) { return y_bar(d.Athlete); })
        .attr("height", y_bar.rangeBand())
        .style("fill", function(d) { return d.color_bar; })
        .style("opacity", .75)

// Event phase - things to do on actions  
// Add tooltip      
    bars.on("mouseover", tip.show)
        .on("mouseout", tip.hide)

// Add selection for filtering        
// Set up (empty) array of selected athletes
athlete_selection = athlete_selection || []; 

      bars.on("click", function(d){
          // Select currently bound data element, i.e. the athlete
            var new_athlete = d.Athlete;

          // If CTRL key is held, add the selection to the list of athletes
            if (d3.event.ctrlKey) {
              if(athlete_selection.indexOf(new_athlete) > 0 ) {
                // remove from array
                athlete_selection.splice(athlete_selection.indexOf(new_athlete), 1);
              } else {
                // add to array
                athlete_selection.push(new_athlete);
                }
              } else {
                // clear existing array
                athlete_selection.length = 0;
                // add the only one
                athlete_selection.push(new_athlete)
              }
              update(athlete_selection, grid = false);
            });


// Exit phase: remove remaining dom elements
    bars.exit().remove();


// Set up reset button
d3.select("#resetbutton").on("click", function() {
  update(athlete_selection = null, grid = false);
});

} 


