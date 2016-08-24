import React from 'react';
import d3 from 'd3';
import dc from 'dc';
import crossfilter from 'crossfilter';


const Charts = ({props}) => {

  console.log("charts", props);
  // var bubbleChart = dc.bubbleChart("#dc-bubble-graph");
  
  // var volumeChart = dc.barChart("#dc-volume-chart");
  // var lineChart = dc.lineChart("#dc-line-chart");
  // var dataTable = dc.dataTable("#dc-table-graph");
  var rowChart = dc.rowChart("#dc-row-graph");

  var pieChart = dc.pieChart("#dc-pie-graph");

  const ndx = crossfilter(props);

  const dayOfWeek = ndx.dimension((d) => d.day_of_week);
  const driver = ndx.dimension((d) => d.driver);
  const driverRating = ndx.dimension((d) => d.driver_rating);
  const vehicle_year = ndx.dimension((d) => d.vehicle_year);

  //for volumechart
  
  //for pieChart
  let startValue = dayOfWeek;
  let startValueGroup = startValue.group();

  pieChart.width(250)
          .height(250)
          .transitionDuration(1500)
          .dimension(startValue)
          .group(startValueGroup)
          .radius(90)
          .minAngleForLabel(0)
          // .label(function(d) {
          //     console.log(d.key);
          //   return `${d.key}: ${d.value}`;
          // })
          .label((d) => d.value)
          .legend(dc.legend())
          .on("filtered", function (chart) {
              dc.events.trigger(function () {
                  if(chart.filter()) {
                      console.log(chart.filter());
                      volumeChart.filter([chart.filter()-.25,chart.filter()-(-0.25)]);
                      }
                  else volumeChart.filterAll();
              });
          });

  rowChart.width(340)
          .height(850)
          .dimension(startValue)
          .group(startValueGroup)
          .renderLabel(true)
          .colors(['#a60000','#ff0000', '#ff4040','#ff7373','#67e667','#39e639','#00cc00'])
          .colorDomain([0, 0])
          // .renderlet(function (chart) {
          //     bubbleChart.filter(chart.filter());
          // })
          .on("filtered", function (chart) {
            dc.events.trigger(function () {
              bubbleChart.filter(chart.filter());
            });
          });

  dc.renderAll();

  return (
    <div className="row-fluid">
      <div className="remaining-graphs span8">
        <div className="row-fluid">
          <div className="bubble-graph span12" id="dc-bubble-graph">
          </div>
        </div>
        <div className="row-fluid">
          <div className="pie-graph span4" id="dc-pie-graph">
          </div>
          <div className="row-graph " id="dc-row-graph">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
