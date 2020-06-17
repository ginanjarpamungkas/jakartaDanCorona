var controller = new ScrollMagic.Controller();
var pinning = $('#flourishPinning')
var pinningJakarta1 = $('#petaJakarta1Pinning')
var pinningJakarta2 = $('#petaJakarta2Pinning')
chart()
// scrollmagic and flourish here
pin = new ScrollMagic.Scene({triggerElement: '#pinTrigger'}).triggerHook(0).on("enter",(e)=>{pinning.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinning.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpin = new ScrollMagic.Scene({triggerElement: '#endpinTrigger'}).triggerHook(1).on("enter",(e)=>{pinning.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinning.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);
scene1 = new ScrollMagic.Scene({triggerElement: "#step1"}).triggerHook(1).on("enter",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/story/325435/embed#slide-0')}).on("leave",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/story/325435/embed#slide-0')}).addTo(controller);
scene2 = new ScrollMagic.Scene({triggerElement: "#step2"}).triggerHook(1).on("enter",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/story/325435/embed#slide-1')}).on("leave",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/story/325435/embed#slide-0')}).addTo(controller);
scene3 = new ScrollMagic.Scene({triggerElement: "#step3"}).triggerHook(1).on("enter",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/story/325435/embed#slide-2')}).on("leave",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/story/325435/embed#slide-1')}).addTo(controller);
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

// map jakarta1 here
var svg1 = d3.select(".desktopMap1").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 530').attr('id', 'petaJakarta1')
var gJakarta1 = svg1.append("g").attr("class", "jakarta1")
var projection = d3.geoMercator().scale(103000).translate([-191570, -10955]);
var path = d3.geoPath().projection(projection);

var svg1Mobile = d3.select(".mobileMap1").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 960').attr('id', 'petaJakarta1Mobile')
var gJakarta1Mobile = svg1Mobile.append("g").attr("class", "jakarta1Mobile")
var projectionMobile = d3.geoMercator().scale(180000).translate([-335128, -19135]);
var pathMobile = d3.geoPath().projection(projectionMobile);

d3.json("jkt.json",function(json) {
    jakarta1 = gJakarta1.selectAll("path").data(json.features).enter().append("path").attr("d", path).attr("class", function(d) {return "desa desa-"+ string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
    // textJakarta = gJakarta.selectAll("text").data(json.features).enter().append("svg:text").text(function(d){return d.properties.name;}).attr("x", function(d){return path.centroid(d)[0]+10;}).attr("y", function(d){if(d.properties.name == 'Jakarta Timur'){return path.centroid(d)[1]-18};return  path.centroid(d)[1];}).attr("text-anchor","middle").attr('font-size','10pt').attr('font-weight','bold').attr('class','desaText');
    jakarta1Mobile = gJakarta1Mobile.selectAll("path").data(json.features).enter().append("path").attr("d", pathMobile).attr("class", function(d) {return "desa desa-"+string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
});

// scrollmagic and map here
var color =  ['#ffffff', '#ffeae4', '#ffd5ca', '#fec0af', '#fbaa96', '#f6957d', '#f07f64', '#e8694d', '#e05135', '#d6351d', '#cc0000']
pinJakarta1 = new ScrollMagic.Scene({triggerElement: '#pinJakarta1Trigger'}).triggerHook(0).on("enter",(e)=>{pinningJakarta1.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinningJakarta1.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpinJakarta1 = new ScrollMagic.Scene({triggerElement: '#endpinJakarta1Trigger'}).triggerHook(1).on("enter",(e)=>{pinningJakarta1.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinningJakarta1.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);

scene1Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step1Map1"}).triggerHook(1)
                    .on("enter",(e)=>{
                        d3.csv('data28maret.csv',function(csv){
							$.each(csv, function(id,v) {
								// if (v.positif > 140) {
								// 	$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								// } else if (v.positif > 120) {
								// 	$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								// } else if (v.positif > 100) {
								// 	$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								// } else if (v.positif > 80) {
								// 	$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								// } else if (v.positif > 60) {
								// 	$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								// } else if (v.positif > 40) {
								// 	$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								// } else if (v.positif > 20) {
								// 	$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								// } else if (v.positif < 20) {
								// 	$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								// }

								if (v.positif > 90) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[10])
								} else if (v.positif > 80) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[9])
								} else if (v.positif > 70) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    })
                    .on("leave",(e)=>{
                        $('.desa').css('fill','#fff')
                    }).addTo(controller);
scene2Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step2Map1"}).triggerHook(1)
                    .on("enter",(e)=>{
                        d3.csv('data4april.csv',function(csv){
							$.each(csv, function(id,v) {
								if (v.positif > 90) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[10])
								} else if (v.positif > 80) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[9])
								} else if (v.positif > 70) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    })
                    .on("leave",(e)=>{
                        d3.csv('data28maret.csv',function(csv){
							$.each(csv, function(id,v) {
								if (v.positif > 90) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[10])
								} else if (v.positif > 80) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[9])
								} else if (v.positif > 70) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    }).addTo(controller);
scene3Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step3Map1"}).triggerHook(1)
                    .on("enter",(e)=>{
                        d3.csv('data11april.csv',function(csv){
							$.each(csv, function(id,v) {
								if (v.positif > 90) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[10])
								} else if (v.positif > 80) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[9])
								} else if (v.positif > 70) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    })
                    .on("leave",(e)=>{
                        d3.csv('data4april.csv',function(csv){
							$.each(csv, function(id,v) {
								if (v.positif > 90) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[10])
								} else if (v.positif > 80) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[9])
								} else if (v.positif > 70) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    }).addTo(controller);
					
// map jakarta2 here
var svg = d3.select(".desktopMap2").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 530').attr('id', 'petaJakarta2')
var gJakarta2 = svg.append("g").attr("class", "jakarta2")

var svgMobile = d3.select(".mobileMap2").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 960').attr('id', 'petaJakarta2Mobile')
var gJakarta2Mobile = svgMobile.append("g").attr("class", "jakarta2Mobile")

d3.json("jkt.json",function(json) {
    jakarta2 = gJakarta2.selectAll("path").data(json.features).enter().append("path").attr("d", path).attr("class", function(d) {return "desa desa-"+ string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
    jakarta2Mobile = gJakarta2Mobile.selectAll("path").data(json.features).enter().append("path").attr("d", pathMobile).attr("class", function(d) {return "desa desa-"+string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
});

// scrollmagic and map here
pinJakarta2 = new ScrollMagic.Scene({triggerElement: '#pinJakarta2Trigger'}).triggerHook(0).on("enter",(e)=>{pinningJakarta2.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinningJakarta2.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpinJakarta2 = new ScrollMagic.Scene({triggerElement: '#endpinJakarta2Trigger'}).triggerHook(1).on("enter",(e)=>{pinningJakarta2.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinningJakarta2.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);

scene1Jakarta2 = new ScrollMagic.Scene({triggerElement: "#step1Map2"}).triggerHook(1)
                    .on("enter",(e)=>{
                        d3.csv('data25april.csv',function(csv){
							$.each(csv, function(id,v) {
								if (v.positif > 90) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[10])
								} else if (v.positif > 80) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[9])
								} else if (v.positif > 70) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    })
                    .on("leave",(e)=>{
                        d3.csv('data11april.csv',function(csv){
							$.each(csv, function(id,v) {
								if (v.positif > 90) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[10])
								} else if (v.positif > 80) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[9])
								} else if (v.positif > 70) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    }).addTo(controller);
scene2Jakarta2 = new ScrollMagic.Scene({triggerElement: "#step2Map2"}).triggerHook(1)
                    .on("enter",(e)=>{
                        d3.csv('data16mei.csv',function(csv){
							$.each(csv, function(id,v) {
								if (v.positif > 90) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[10])
								} else if (v.positif > 80) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[9])
								} else if (v.positif > 70) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    })
                    .on("leave",(e)=>{
                        d3.csv('data25april.csv',function(csv){
							$.each(csv, function(id,v) {
								if (v.positif > 90) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[10])
								} else if (v.positif > 80) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[9])
								} else if (v.positif > 70) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    }).addTo(controller);
scene3Jakarta2 = new ScrollMagic.Scene({triggerElement: "#step3Map2"}).triggerHook(1)
                    .on("enter",(e)=>{
                        d3.csv('data5juni.csv',function(csv){
							$.each(csv, function(id,v) {
								if (v.positif > 90) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[10])
								} else if (v.positif > 80) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[9])
								} else if (v.positif > 70) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    })
                    .on("leave",(e)=>{
                        d3.csv('data16mei.csv',function(csv){
							$.each(csv, function(id,v) {
								if (v.positif > 90) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[10])
								} else if (v.positif > 80) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[9])
								} else if (v.positif > 70) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    }).addTo(controller);
					
function string_to_slug(str) {
	str = str.replace(/^\s+|\s+$/g, ""); // trim
	str = str.toLowerCase();
	var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
	var to = "aaaaaaeeeeiiiioooouuuunc------";
	for (var i = 0, l = from.length; i < l; i++) {
	  str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
	}
	str = str
	  .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
	  .replace(/\s+/g, "-") // collapse whitespace and replace by -
	  .replace(/-+/g, "-") // collapse dashes
	  .replace(/^-+/, "") // trim - from start of text
	  .replace(/-+$/, ""); // trim - from end of text
	return str;
}