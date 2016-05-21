'use strict';

angular.module('webdata2App')
  .service('distributionview', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {

  clear: function(elementIdentifier){
    d3.select(elementIdentifier).selectAll("*").remove();
  },

  render: function(elementIdentifier,data,title){

    var margin = {top: 40, right: 20, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var formatXAxis = d3.format(".2r");

    // var x = d3.scale.ordinal()
    //     .domain([0,2,4,6,8,10,12,14,16,18,20])
    //     .rangeRoundBands([0, width]);

    var x = d3.scale.ordinal()        
        .rangeRoundBands([0, width]);

    var y = d3.scale.linear()        
        .range([height, 0]);
    

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(function(t){
          //return formatXAxis(data[t].service);
          return data[t].service;
        });

    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(2)
        .orient("left")
        .tickFormat(formatPercent);

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Service:</strong> <span style='color:red'>" + d.service + "</span></br>"+
                "<strong>Frequency:</strong> <span style='color:red'>" + formatPercent(d.frequency) + "</span>";
      })

    var svg = d3.select(elementIdentifier)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if(!svg.empty())
      svg.call(tip);

      svg.selectAll('*').remove();

      x.domain(data.map(function(d) { return d.band; }));
      y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "start");
              
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        // .append("text")
        //   .attr("transform", "rotate(-90)")
        //   .attr("x", "-1em")
        //   .attr("dy", "-1em")
        //   .style("text-anchor", "end")
        //   .text("Frequency");

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.band); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.frequency); })
          .attr("height", function(d) { return height - y(d.frequency); })
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);   

      svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text(title); 
    }



  }
  });
