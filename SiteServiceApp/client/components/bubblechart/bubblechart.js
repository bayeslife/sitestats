angular.module('webdata2App')
  .service('bubbleview', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {

   		clear: function(elementIdentifier){
    		d3.select(elementIdentifier).selectAll("*").remove();
  		},

		processData2: function(data) {
			    
			    var newDataSet = [];

			    for(var i in data) {			    
			      newDataSet.push({name: data[i].service, className: data[i].service, size: data[i].frequency});
			    }
			    return {children: newDataSet};
			  },

  		render: function(elementIdentifier,data,title){

			  var processedData = this.processData2(data);

			  var margin = {top: 40, right: 20, bottom: 30, left: 50};

			  var diameter = 300;
			  var width=diameter+200;

			  var svg = d3.select('#bubbleview');

			  svg.attr('width', diameter+200).attr('height', diameter);

				var bubble = d3.layout.pack()
							.size([diameter, diameter])
							.value(function(d) {return d.size*100;})
			        		.sort(function(a, b) {
								return -(a.value - b.value)
							}) 
							.padding(3);
			  
			  // generate data with calculated layout values
			  var nodes = bubble.nodes(processedData).filter(function(d) { return !d.children; }); // filter out the outer bubble

    		  var formatPercent = d3.format(".0%");
			
			  var tip = d3.tip()
		      .attr('class', 'd3-tip')
		      .offset([-10, 0])
		      .html(function(d) {
		        return "<strong>Service:</strong> <span>" + d.name + "</span></br>"+
		                "<strong>Frequency:</strong> <span>" + formatPercent(d.size) + "</span>";
		      });

		     if(!svg.empty())
      			svg.call(tip);

			  var vis = svg.selectAll('circle').data(nodes);
			  
			  vis.enter().append('circle')
						.attr('transform', function(d) { return 'translate(' + (d.x+width/2) + ',' + d.y + ')'; })
						.attr('r', function(d) { return d.r; })
						.attr('class', function(d) { return d.className; })
						.on('mouseover', tip.show)
          				.on('mouseout', tip.hide);  

          	var w = width/2;
          	var h = (margin.top)/2;

          	svg.append("text")
		        .attr("x", w)         
		        .attr("y", h)
		        .attr("text-anchor", "middle")  
		        .style("font-size", "16px") 
		        .style("text-decoration", "underline")  
		        .text(title); 
			  			  			
		}
  }
  });
