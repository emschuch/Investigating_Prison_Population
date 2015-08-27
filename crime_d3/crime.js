(function(){ // protect the lemmings


  var width = 1112;

  var container = d3.select('body')
    .attr('id', 'crime')
    .attr("class", "container")
    .attr("width", width)
    .append('div');


  // stacked bar data
  var data1 = [{'violent': 13700, 
        'total': 193861,
        'property': 11200, 
        'drug': 98900,
        'public order': 68800,
        'other': 1200, 
        'juris': 'federal'},
        {'violent': 707500, 
        'total': 1314900,
        'property': 247100, 
        'drug': 210200, 
        'public order': 140200,
        'other': 10000,
        'juris': 'state'}];


  var data1_href = 'http://www.bjs.gov/content/pub/pdf/p13.pdf';


  // stacked bar chart

  var margin = {'top': 80, 'bottom': 30, 'left': 40, 'right': 40}
    c1_h = 180,
    c1_w = width - margin.left - margin.right,
    bar_h1 = c1_h - margin.top - margin.bottom,
    total = data1[0].total + data1[1].total;

  var data1_scale = d3.scale.linear()
              .domain([0, total])
              .range([0, c1_w]);

  var stacked_bar_area = d3.select('#p1').append('div')
    .attr('class', 'stacked_bar-area');

  var stacked_bar_chart = stacked_bar_area.append('svg');

  // make it responsive
  stacked_bar_chart.attr('class', 'stacked_bar')
    .attr("preserveAspectRatio", "xMinYMin")
      .attr("viewBox", "0 0 " + width + " " + c1_h)
    .attr('width', width)
    .attr('height', c1_h);

  $(window).resize(function() {
      var width = $(".stacked_bar").width();
      stacked_bar_chart.attr("width", width)
          .attr("height", c1_h);

        box_chart.attr('width', width)
          .attr('height', c2_h * aspectratio);
      });

   $(document).ready(function() {
      var width = $(".stacked_bar").width();
      stacked_bar_chart.attr("width", width)
          .attr("height", c1_h);

        box_chart.attr('width', width)
          .attr('height', c2_h * aspectratio);
      });


   // make the chart
  stacked_bar_chart.selectAll('rect')
    .data(data1)
    .enter().append('rect')
    .attr('class', 'chart1-rect chart1-rect--fade')
    .attr('x', function (d, i) { 
          return data1_scale(i * (total - d.total)); 
        })
    .attr('y', margin.top)
    .attr('height', bar_h1)
    .attr('width', function (d) { return data1_scale(d.total); })
    .attr('transform', function (d, i) { 
          return "translate(" + margin.left + ",0)"; 
        })
    .style('fill', function (d, i) { 
          if (i === 0) { return 'orange'; }
          else if (i === 1) { return 'dodgerblue'; }
        });


  stacked_bar_chart.selectAll('g')
    .data(data1)
    .enter().append('rect')
      .attr('class', 'chart1-rect--violent')
      .attr('x', function (d, i) {
            if (i === 0) {
              return data1_scale(d.total - d.violent); }
            else { return data1_scale(total - d.total)}
      })
    .attr('height', bar_h1)
    .attr('width', function (d) { return data1_scale(d.violent); })
    .attr('transform', function (d, i) { 
          return "translate(" + margin.left + "," + margin.top + ")"; 
        })
    .style('fill', function (d, i) { 
          if (i === 0) { return 'orange'; }
          else if (i === 1) { return 'dodgerblue'; }
        });

  stacked_bar_chart.selectAll('g')
    .data(data1)
    .enter().append('rect')
      .attr('class', 'chart1-rect--drug')
      .attr('x', function (d, i) {
            if (i === 0) {
              return data1_scale(d.total - d.drug); }
            else { return data1_scale(total - d.total)}
      })
    .attr('height', bar_h1)
    .attr('width', function (d) { return data1_scale(d.drug); })
    .attr('transform', function (d, i) { 
          return "translate(" + margin.left + "," + margin.top + ")"; 
        })
    .style('fill', function (d, i) { 
          if (i === 0) { return 'orange'; }
          else if (i === 1) { return 'dodgerblue'; }
        });


  // add labels
  stacked_bar_chart.selectAll('text')
    .data(data1)
    .enter().append('text')
    .attr('class', 'chart_label')
    .attr('transform', function (d, i) { 
          return 'translate(' 
            + (margin.left + i * data1_scale(total)) 
            + ',' + (margin.top - 10) + ')'; 
        })
    .style('text-anchor', function (d, i) {
          if (i === 1) { return 'end'; }
          else {return 'start'; }
        })
    .text(function (d) { return d.juris; });


  // add a title
  stacked_bar_chart.append('text')
    .attr('class', 'chart_title')
    .attr('transform', 'translate(' + margin.left 
        + ',' + (margin.top - 50) + ')')
    .text('Share of Prisoners by Jurisdiction');

  stacked_bar_chart.append('text')
    .attr('class', 'chart_subtitle chart_reveal')
    .attr('transform', 'translate(' + margin.left
        + ',' + (c1_h - 3) + ')')
    .text('1.5 Million Prisoners');

  stacked_bar_chart.append('text')
    .attr('class', 'source')
    .attr({'x': width - margin.right, 'y': c1_h - 2 })
    .attr('text-anchor', 'end')
    .text('Source: Bureau of Justice Statistics');

  var subtitle = stacked_bar_chart.select('.chart_subtitle');

  // add navigation
  var position = 0;

  var nav = stacked_bar_chart.append('g')
    .attr('class', 'nav_buttons');

  var select_button = nav.append('svg')

    select_button.attr({'width': 202, 'height': 32})
      .attr('class', 'select_button')
      .attr('x', width - margin.right - 202)
      .attr('y', margin.top - 74);
    
    select_button.append('rect')
      .attr('class', 'select_button-rect')
      .attr({'width': 200, 'height': 30})
      .attr({'rx': 8, 'ry': 8})
      .attr('x', 1)
      .attr('y', 1)
      .style({'fill': 'white', 
          'stroke': '#d3d3d3',
          'stroke-width': 1});

    select_button.append('text')
      .attr('class', 'play_button-text')
        .attr({'x': 16, 'y': 21})
        .attr('text-anchor', 'start')
        .text('SELECT VIEW');

  nav.selectAll('circle')
    .data([0, 1, 2])
    .enter().append('circle')
    .attr('class', function (d) {
      if(d == position) {
        return 'nav_button nav--active'
      } else {
        return 'nav_button'
      }
    })
    .attr('r', 7)
    .attr('cy', margin.top - 58)
    .attr('cx', function (d) {
      return width - margin.right - 72 + d * 25
    });




  function all_inmates() {
    d3.selectAll('.chart1-rect--fade')
      .transition()
      .duration(800)
      .style('opacity', 1)

    subtitle.transition()
      .text('1.5 Million Prisoners');

  };

  function reveal_drug() {
    d3.selectAll('.chart1-rect--violent')
      .transition()
      .duration(800)
      .style('opacity', 0);

    d3.selectAll('.chart1-rect--drug')
      .transition()
      .duration(800)
      .style('opacity', 1);

    d3.selectAll('.chart1-rect--fade')
      .transition()
      .duration(800)
      .style('opacity', 0.25);

    subtitle.transition()
      .text('310,000 drug offenders');

  };

  function reveal_violent() {
    d3.selectAll('.chart1-rect--drug')
      .transition()
      .duration(800)
      .style('opacity', 0);

    d3.selectAll('.chart1-rect--violent')
      .transition()
      .duration(800)
      .style('opacity', 1);

    d3.selectAll('.chart1-rect--fade')
      .transition()
      .duration(800)
      .style('opacity', 0.25);

    subtitle.transition()
      .text('720,000 violent offenders');

  };


  $('.nav_buttons').on(
    'click', '.nav_button', button_clicked);

  function button_clicked() {
    position = $(this).index() -1;

    $(this).addClass('nav--active')
      .siblings()
      .removeClass('nav--active');

    if(position === 0) {
      all_inmates()
    } 
    else if(position === 1) {
      reveal_drug()
    }
    else {
      reveal_violent()
    }
  };


  // set-up box chart
  var margin2 = {'top': 80, 'bottom': 30, 'left': 230, 'right': 230},
    c2_h = 500,
    c2_w = width - margin2.left - margin2.right,
    aspectratio = c2_w / c2_h,
    trans = [0];

  var box_chart_area = d3.select('#p2').append('div')
      .attr('class', 'box_chart-area');

  var box_chart = box_chart_area.append('svg')
    .attr('class', 'box_chart')
    .attr("preserveAspectRatio", "xMinYMin")
      .attr("viewBox", "0 0 " + width + " " + c1_h)
    .attr('width', width)
    .attr('height', c2_h + margin2.top + margin2.bottom);

  box_chart.append('rect')
    .attr('height', c2_h)
    .attr('width', c2_w)
    .attr('x', margin2.left)
    .attr('y', margin2.top)
    .style({'fill': 'dodgerblue', 
        'stroke': 'dodgerblue',
        'stroke-width': '1px' });


//////////// LOAD CSV
  d3.csv('tree_mappy.csv', function (error, data) {

    var tree = data;

    var crimes = ['violent', 'drug', 'property', 'public order', 'other'];

    var scale_w = d3.scale.linear()
            .domain([0, 1])
            .range([0, c2_w]);

    var scale_h = d3.scale.linear()
            .domain([0, 1])
            .range([0, c2_h]);

    var box_group = box_chart.append('g')
      .attr('class', 'box_group');

    // create box chart
    box_group.selectAll('rect')
      .data(tree)
      .enter().append('rect')
      .attr('class', 'box_rect')
      .attr('x', margin2.left)
      .attr('y', 0 + margin2.top)
      .attr('transform', function (d, i) {
        trans.push(trans[trans.length-1] + Number(d.h))
        return  'translate( 0, ' + scale_h(trans[i + 1] - d.h) + ')'
      })
      .attr('width', function (d) {
        return scale_w( d.w )
      })
      .attr('height', function (d) {
        return scale_h( d.h )
      })
      .style({'fill': 'orange', 
          'stroke': 'orange',
          'stroke-width': '1px' });


    // add crime type labels
    var label_group = box_chart.append('g')
      .attr('class', 'chart_subtitle2');

    label_group.selectAll('text')
      .data(tree)
      .enter().append('text')
      .text( function (d, i) {
        return crimes[i];
      })
      .attr('transform', function (d, i) {
        return  'translate(' + (margin2.left - 10)
          + ', ' + (scale_h(trans[i + 1] - d.h / 2) + margin2.top + 5)  + ')'
      })
      .attr('text-anchor', 'end');


    // add lines
    var line_group = box_chart.append('g')
      .attr('class', 'line_group');

    line_group.selectAll('line')
      .data(tree)
      .enter().append('line')
      .attr('class', 'lines')
      .attr('x1', margin2.left)
      .attr('x2', c2_w + margin2.left)
      .attr('y1', function (d, i) {
        return scale_h(trans[i + 1] - d.h) + margin2.top
      })
      .attr('y2', function (d, i) {
        return scale_h(trans[i + 1] - d.h) + margin2.top
      });

    d3.select('.lines').attr('visibility', 'hidden');

    var line_group2 = box_chart.append('g')
      .attr('class', 'line_group2');

    line_group2.selectAll('line')
      .data(tree)
      .enter().append('line')
      .attr('class', 'lines2')
      .attr('x1', function (d) { return scale_w(d.w) + margin2.left ;})
      .attr('x2', function (d) { return scale_w(d.w) + margin2.left ;})
      .attr('y1', function (d, i) { 
        return scale_h(trans[i + 1] - d.h) + margin2.top })
      .attr('y2', function (d, i) { 
        return scale_h(trans[i + 1]) + margin2.top });


    var degree = ['High School Degree', 'No High School Degree']

    var label2_group = box_chart.append('g');

    // add labels
    label2_group.selectAll('text')
      .data(tree)
      .enter().append('text')
      .attr('class', 'chart_label')
      .attr('transform', function (d, i) { 
            return 'translate(' 
              + (margin2.left + i * c2_w) 
              + ',' + (margin2.top - 10) + ')'; 
          })
      .style('text-anchor', function (d, i) {
            if (i === 1) { return 'end'; }
            else {return 'start'; }
          })
      .text(function (d, i) { return degree[i]; });


    // add a title
    label2_group.append('text')
      .attr('class', 'chart_title')
      .attr('transform', 'translate(' + margin2.left 
          + ',' + (margin2.top - 50) + ')')
      .text('State Inmates by Education');


    // transition box chart
    function resize_bars () {
      var bars = d3.selectAll('.box_rect');

      var lines = d3.selectAll('.lines2');

      var degree = scale_w(0.5792073095443881),
      	text1 = ['Actual', 'HS Degree Rate', 'of Inmates:', '58%'];

      var pop_degree = scale_w(0.8831),
      	text2 = ['HS Degree Rate', 'of Population', 'over 25:', '88%'];

      var trans1 = 3000, 
      	trans2 = 7000;

      bars.transition()
        .duration(800)
        .attr('width', degree);

      lines.transition()
        .duration(800)
        .attr('x1', degree + margin2.left) 
        .attr('x2', degree + margin2.left);

      d3.selectAll('.line_group')
        .transition()
        .duration(800)
        .style('opacity', 0);

      d3.selectAll('.chart_subtitle2')
        .transition()
        .duration(800)
        .style('opacity', 0);

      box_chart.append('text')
      	.attr('class', 'reveal-text')
      	.each(function (d) {
	        for (i = 0; i < text1.length; i++) {
	            d3.select(this).append("tspan")
	                .text(text1[i])
	                .attr("dy", i ? "1.2em" : c2_h / 2 - 10)
	                .attr("x", margin2.left + 20)
	                .attr("text-anchor", "start")
	                .attr("class", "tspan" + i);
		        }
		    })
      	.style({'fill': 'white', 
      			'font-size': 32, 
      			'opacity': 0});


      box_chart.append('text')
      	.attr('class', 'reveal-text2')
      	.each(function (d) {
	        for (i = 0; i < text1.length; i++) {
	            d3.select(this).append("tspan")
	                .text(text2[i])
	                .attr("dy", i ? "1.2em" : c2_h / 2 - 10)
	                .attr("x", margin2.left + 20)
	                .attr("text-anchor", "start")
	                .attr("class", "tspan" + i);
		        }
		    })
      	.style({'fill': 'white', 
      			'font-size': 32, 
      			'opacity': 0});

      d3.select('.reveal-text')
      	.transition()
      	.duration(800)
      	.style('opacity', 1);

	  bars.transition()
	  	.delay(trans1)
        .duration(1200)
        .attr('width', pop_degree);

      lines.transition()
      	.delay(trans1)
        .duration(1200)
        .attr('x1', pop_degree + margin2.left) 
        .attr('x2', pop_degree + margin2.left);

      d3.select('.reveal-text')
      	.transition()
      	.delay(trans1)
      	.duration(800)
      	.style('opacity', 0);

      d3.select('.reveal-text2')
      	.transition()
      	.delay(trans1)
      	.duration(800)
      	.style('opacity', 1);

      d3.select('.reveal-text2')
      	.transition()
      	.delay(trans2)
      	.duration(800)
      	.style('opacity', 0);

      bars.transition()
        .delay(trans2)
        .duration(800)
        .attr('width', function (d) { return scale_w(d.w); });

      lines.transition()
        .delay(trans2)
        .duration(800)
        .attr('x1', function (d) { return scale_w(d.w) + margin2.left ;})
        .attr('x2', function (d) { return scale_w(d.w) + margin2.left ;});

      d3.selectAll('.line_group')
        .transition()
        .delay(trans2 + 200)
        .duration(800)
        .style('opacity', 1);

      d3.selectAll('.chart_subtitle2')
        .transition()
        .delay(trans2 + 200)
        .duration(800)
        .style('opacity', 1);

    };


    var play_button = box_chart.append('svg')

    play_button.attr({'width': 82, 'height': 27})
      .attr('class', 'play_button')
      .attr('x', width - margin2.right - 82)
      .attr('y', margin2.top - 78);
    
    play_button.append('rect')
      .attr('class', 'play_button-rect')
      .attr({'width': 80, 'height': 25})
      .attr({'rx': 8, 'ry': 8})
      .attr('x', 1)
      .attr('y', 1);

    play_button.append('text')
      .attr('class', 'play_button-text')
        .attr({'x': 41, 'y': 19})
        .attr('text-anchor', 'middle')
        .text('PLAY');

    function playon() {
      d3.select('.play_button-rect')
        .style({'fill': '#d3d3d3',
            'stroke': '#c0c0c0',
            'stroke-width': '2px'
        });
    };

    function playoff() {
      d3.select('.play_button-rect')
        .style({'fill': 'white',
            'stroke': '#d3d3d3',
            'stroke-width': '1px'
        });
    };

    d3.select('.play_button').on('mouseover', playon).on('mouseout', playoff);

    d3.select('.play_button').on('click', resize_bars);

    box_chart.append('text')
      .attr('class', 'source')
      .attr({'x': width - margin2.right, 'y': c2_h + margin2.top + 30})
      .attr('text-anchor', 'end')
      .text('Source: Bureau of Justice Statistics');


  }); 

////////////////// END CSV CALL


})();