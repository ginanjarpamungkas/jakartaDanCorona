var controller = new ScrollMagic.Controller();
var pinning = $('#flourishPinning')
var pinningJakarta = $('#petaJakartaPinning')
// chart()
// scrollmagic and flourish here
pin = new ScrollMagic.Scene({triggerElement: '#pinTrigger'}).triggerHook(0).on("enter",(e)=>{pinning.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinning.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpin = new ScrollMagic.Scene({triggerElement: '#endpinTrigger'}).triggerHook(1).on("enter",(e)=>{pinning.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinning.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);
scene1 = new ScrollMagic.Scene({triggerElement: "#step1"}).triggerHook(1).on("enter",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/story/325435/embed#slide-0')}).on("leave",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/story/325435/embed#slide-0')}).addTo(controller);
scene2 = new ScrollMagic.Scene({triggerElement: "#step2"}).triggerHook(1).on("enter",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/story/325435/embed#slide-1')}).on("leave",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/story/325435/embed#slide-0')}).addTo(controller);
scene3 = new ScrollMagic.Scene({triggerElement: "#step3"}).triggerHook(1).on("enter",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/story/325435/embed#slide-2')}).on("leave",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/story/325435/embed#slide-1')}).addTo(controller);
// scrollmagic and map here
var color = ['#ffffff', '#ffece7', '#ffd9cf', '#ffc5b6', '#fcb29f', '#f89f88', '#f38b72', '#ed775c', '#e66346', '#de4c31', '#d5321b', '#cc0000']
pinJakarta = new ScrollMagic.Scene({triggerElement: '#pinJakartaTrigger'}).triggerHook(0).on("enter",(e)=>{pinningJakarta.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinningJakarta.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpinJakarta = new ScrollMagic.Scene({triggerElement: '#endpinJakartaTrigger'}).triggerHook(1).on("enter",(e)=>{pinningJakarta.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinningJakarta.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);

sceneJakarta1 = new ScrollMagic.Scene({triggerElement: "#stepMap1"}).triggerHook(1)
                    .on("enter",(e)=>{
                        
                        $('.kab-1').css('fill',color[1])
                        $('.kab-2').css('fill',color[1])
                        $('.kab-3').css('fill',color[0])
                        $('.kab-4').css('fill',color[1])
                        $('.kab-5').css('fill',color[0])
                    })
                    .on("leave",(e)=>{
                        $('.kab').css('fill','#fff')
                    }).addTo(controller);
sceneJakarta2 = new ScrollMagic.Scene({triggerElement: "#stepMap2"}).triggerHook(1)
                    .on("enter",(e)=>{
                        
                        $('.kab-1').css('fill',color[5])
                        $('.kab-2').css('fill',color[5])
                        $('.kab-3').css('fill',color[5])
                        $('.kab-4').css('fill',color[5])
                        $('.kab-5').css('fill',color[5])
                    })
                    .on("leave",(e)=>{
                        $('.kab-1').css('fill',color[1])
                        $('.kab-2').css('fill',color[1])
                        $('.kab-3').css('fill',color[0])
                        $('.kab-4').css('fill',color[1])
                        $('.kab-5').css('fill',color[0])
                    }).addTo(controller);
sceneJakarta3 = new ScrollMagic.Scene({triggerElement: "#stepMap3"}).triggerHook(1)
                    .on("enter",(e)=>{
                        $('.kab-1').css('fill',color[10])
                        $('.kab-2').css('fill',color[8])
                        $('.kab-3').css('fill',color[10])
                        $('.kab-4').css('fill',color[9])
                        $('.kab-5').css('fill',color[10])
                        $('.kabText').css('fill','#fff')
                    })
                    .on("leave",(e)=>{
                        $('.kab-1').css('fill',color[5])
                        $('.kab-2').css('fill',color[5])
                        $('.kab-3').css('fill',color[5])
                        $('.kab-4').css('fill',color[5])
                        $('.kab-5').css('fill',color[5])
                        $('.kabText').css('fill','#000')
                    }).addTo(controller);
sceneJakarta4 = new ScrollMagic.Scene({triggerElement: "#stepMap4"}).triggerHook(1)
                    .on("enter",(e)=>{
                        $('.kab-1').css('fill',color[11])
                        $('.kab-2').css('fill',color[9])
                        $('.kab-3').css('fill',color[11])
                        $('.kab-4').css('fill',color[11])
                        $('.kab-5').css('fill',color[11])
                    })
                    .on("leave",(e)=>{
                        $('.kab-1').css('fill',color[10])
                        $('.kab-2').css('fill',color[8])
                        $('.kab-3').css('fill',color[10])
                        $('.kab-4').css('fill',color[9])
                        $('.kab-5').css('fill',color[10])
                    }).addTo(controller);
// heighchart here
function chart(){
	$.ajax({ 
		url: 'https://indonesia-covid-19.mathdro.id/api/harian',
		type:'GET',
		dataType: 'json',
		success: function(data) {
			var pe=[]; var val1=[];var val2=[];var val3=[];cumulativeData = [0];
			for (let i = 0; i < data.data.length; i++) {
				pe.push(new Date(data.data[i].tanggal).toLocaleDateString("id-ID"))
				val1.push(parseInt(data.data[i].jumlahKasusBaruperHari))
				val2.push(parseInt(data.data[i].jumlahKasusSembuhperHari))
				val3.push(parseInt(data.data[i].jumlahKasusMeninggalperHari))
			}

			val1.forEach(function(elementToAdd, index) {
					var newElement = cumulativeData[index] + elementToAdd;
					cumulativeData.push(newElement);
			});
			cumulativeData.shift();
			Highcharts.chart('container_chart', {
				title: { style: {color: '#000'},text: 'Grafik' },
				xAxis: {
					min:0,
					title: { style: {color: '#000'},text: 'Periode' },                        
					categories: pe,
					labels:{style: {color: '#000'}},
				},
				yAxis: {
					min: 0,
					title: { style: {color: '#000'},text: 'Kasus' },
					labels: {style: {color: '#000'},}
				},
				exporting:{ enabled:false },
				credits: { enabled: false },
				legend: {
					backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#fff',
					itemStyle:{color: '#000'},
					shadow: false
				},
				colors: ['#c00','#3c0','#000','#702870'],
				tooltip: {
					headerFormat: '<b>{point.x}</b><br/>',
					pointFormat: '{series.name}: {point.y}'
				},
				plotOptions: {
					column: {
						stacking: 'normal',
						dataLabels:{ enabled:true },
						pointPadding: 0.2,
						borderWidth: 0
					},
					line:{
						dataLabels:{enabled:true }
					}
				},
				series: [{
					type: 'column',
					name: 'Konfirmasi',
					data: val1
				},{
					type: 'column',
					name: 'Sembuh',
					data: val2
				},{
					type: 'column',
					name: 'Meninggal',
					data: val3
				},{
					type: 'line',
					name: 'Total',
					data: cumulativeData
				}]
			});
		},
		error: function(err) {
				cache: false
				console.log (err);
		}
	});
}

// map jakarta here
var svg = d3.select(".desktopMap").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 520').attr('id', 'petaJakarta')
var gJakarta = svg.append("g").attr("class", "jakarta")
var projection = d3.geoMercator().scale(103000).translate([-191570, -10955]);
var path = d3.geoPath().projection(projection);

var svgMobile = d3.select(".mobileMap").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 960').attr('id', 'petaJakartaMobile')
var gJakartaMobile = svgMobile.append("g").attr("class", "jakartaMobile")
var projectionMobile = d3.geoMercator().scale(180000).translate([-335128, -19135]);
var pathMobile = d3.geoPath().projection(projectionMobile);

d3.json("jakarta.json",function(json) {
    jakarta = gJakarta.selectAll("path").data(json.features).enter().append("path").attr("d", path).attr("class", function(d) {return "kab kab-"+d.properties.ID;}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
    textJakarta = gJakarta.selectAll("text").data(json.features).enter().append("svg:text").text(function(d){return d.properties.NAME;}).attr("x", function(d){return path.centroid(d)[0]+10;}).attr("y", function(d){if(d.properties.NAME == 'Jakarta Timur'){return path.centroid(d)[1]-18};return  path.centroid(d)[1];}).attr("text-anchor","middle").attr('font-size','10pt').attr('font-weight','bold').attr('class','kabText');
    jakartaMobile = gJakartaMobile.selectAll("path").data(json.features).enter().append("path").attr("d", pathMobile).attr("class", function(d) {return "kab kab-"+d.properties.ID;}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
    textJakartaMobile = gJakartaMobile.selectAll("text").data(json.features).enter().append("svg:text").text(function(d){return d.properties.NAME;}).attr("x", function(d){return pathMobile.centroid(d)[0]+10;}).attr("y", function(d){if(d.properties.NAME == 'Jakarta Timur'){return pathMobile.centroid(d)[1]-18};return  pathMobile.centroid(d)[1];}).attr("text-anchor","middle").attr('font-size','16pt').attr('font-weight','bold').attr('class','kabText');
});