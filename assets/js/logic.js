var controller = new ScrollMagic.Controller();
var pinning = $('#flourishPinning')
var pinningJakarta1 = $('#petaJakarta1Pinning')
var pinningJakarta2 = $('#petaJakarta2Pinning')
var pinningJakarta3 = $('#petaJakarta3Pinning')
var pinningJakarta4 = $('#petaJakarta4Pinning')
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

var projection = d3.geoMercator().scale(103000).translate([-191570, -10955]);
var path = d3.geoPath().projection(projection);
var projectionMobile = d3.geoMercator().scale(180000).translate([-335128, -19135]);
var pathMobile = d3.geoPath().projection(projectionMobile);

// map jakarta1 here
var svg1 = d3.select(".desktopMap1").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 530').attr('id', 'petaJakarta1')
var gJakarta1 = svg1.append("g").attr("class", "jakarta1")
var title1 = svg1.append("text").attr("class", "title-kelurahan").attr("transform", "translate(" + 100 + "," + 400 + ")").text('Kelurahan Terjangkit').attr('font-weight','bold')
var jumlah1 = title1.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','kelurahanTerjangkit');
var range1 = title1.append('tspan').attr('x',30).attr('dy', '0').text(" dari 267 kelurahan").attr('font-weight','400');
var periode1 = svg1.append("text").attr("class", "title-periode").attr("transform", "translate(" + 100 + "," + 350 + ")").text('Periode').attr('font-weight','bold')
var tgl1 = periode1.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','tglPeriode');

var svg1Mobile = d3.select(".mobileMap1").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 960').attr('id', 'petaJakarta1Mobile')
var gJakarta1Mobile = svg1Mobile.append("g").attr("class", "jakarta1Mobile")
var title1Mobile = svg1Mobile.append("text").attr("class", "title-kelurahan").attr("transform", "translate(" + 20 + "," + 850 + ")").text('Kelurahan Terjangkit').attr('font-weight','bold').attr('font-size','20pt')
var jumlah1Mobile = title1Mobile.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','kelurahanTerjangkit');
var range1Mobile = title1Mobile.append('tspan').attr('x',50).attr('dy', '0').text(" dari 267 kelurahan").attr('font-weight','400');
var periode1Mobile = svg1Mobile.append("text").attr("class", "title-periode").attr("transform", "translate(" + 20 + "," + 750 + ")").text('Periode').attr('font-weight','bold').attr('font-size','20pt')
var tgl1Mobile = periode1Mobile.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','tglPeriode');

d3.json("jkt.json",function(json) {
    jakarta1 = gJakarta1.selectAll("path").data(json.features).enter().append("path").attr("d", path).attr("class", function(d) {return "desa desa-"+ string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
    // textJakarta = gJakarta.selectAll("text").data(json.features).enter().append("svg:text").text(function(d){return d.properties.name;}).attr("x", function(d){return path.centroid(d)[0]+10;}).attr("y", function(d){if(d.properties.name == 'Jakarta Timur'){return path.centroid(d)[1]-18};return  path.centroid(d)[1];}).attr("text-anchor","middle").attr('font-size','10pt').attr('font-weight','bold').attr('class','desaText');
    jakarta1Mobile = gJakarta1Mobile.selectAll("path").data(json.features).enter().append("path").attr("d", pathMobile).attr("class", function(d) {return "desa desa-"+string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
});

// scrollmagic and map here
var color =  ['#ffffff', '#ffe5de', '#ffcabc', '#fcb09c', '#f6957d', '#ee7a5e', '#e45d41', '#d93d23', '#cc0000']
pinJakarta1 = new ScrollMagic.Scene({triggerElement: '#pinJakarta1Trigger'}).triggerHook(0).on("enter",(e)=>{pinningJakarta1.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinningJakarta1.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpinJakarta1 = new ScrollMagic.Scene({triggerElement: '#endpinJakarta1Trigger'}).triggerHook(1).on("enter",(e)=>{pinningJakarta1.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinningJakarta1.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);
var jumlahKelurahanTerjangkit = 0;
scene1Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step1Map1"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1.text('25 Maret - 28 Maret 2020')
						tgl1Mobile.text('25 Maret - 28 Maret 2020')
						tgl2.text('25 Maret - 28 Maret 2020')
						tgl2Mobile.text('25 Maret - 28 Maret 2020')
						jumlahKelurahanTerjangkit = 0
                        d3.csv('data28maret.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah1.text(jumlahKelurahanTerjangkit)
									jumlah1Mobile.text(jumlahKelurahanTerjangkit)
									jumlah2.text(jumlahKelurahanTerjangkit)
									jumlah2Mobile.text(jumlahKelurahanTerjangkit)
								}
								if (v.positif > 70) {
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
						tgl1.text('time range')
						tgl1Mobile.text('time range')
						tgl2.text('time range')
						tgl2Mobile.text('time range')
						jumlahKelurahanTerjangkit = 0
						jumlah1.text(jumlahKelurahanTerjangkit)
						jumlah1Mobile.text(jumlahKelurahanTerjangkit)
						jumlah2.text(jumlahKelurahanTerjangkit)
						jumlah2Mobile.text(jumlahKelurahanTerjangkit)
						jumlah3.text(jumlahKelurahanTerjangkit)
						jumlah3Mobile.text(jumlahKelurahanTerjangkit)
                        $('.desa').css('fill','#fff')
                    }).addTo(controller);
scene2Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step2Map1"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1.text('28 Maret - 4 April 2020')
						tgl1Mobile.text('28 Maret - 4 April 2020')
						tgl2.text('28 Maret - 4 April 2020')
						tgl2Mobile.text('28 Maret - 4 April 2020')
						jumlahKelurahanTerjangkit = 0
                        d3.csv('data4april.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah1.text(jumlahKelurahanTerjangkit)
									jumlah1Mobile.text(jumlahKelurahanTerjangkit)
									jumlah2.text(jumlahKelurahanTerjangkit)
									jumlah2Mobile.text(jumlahKelurahanTerjangkit)
								}
								if (v.positif > 70) {
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
						tgl1.text('25 Maret - 28 Maret 2020')
						tgl1Mobile.text('25 Maret - 28 Maret 2020')
						tgl2.text('25 Maret - 28 Maret 2020')
						tgl2Mobile.text('25 Maret - 28 Maret 2020')
						jumlahKelurahanTerjangkit = 0
                        d3.csv('data28maret.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah1.text(jumlahKelurahanTerjangkit)
									jumlah1Mobile.text(jumlahKelurahanTerjangkit)
									jumlah2.text(jumlahKelurahanTerjangkit)
									jumlah2Mobile.text(jumlahKelurahanTerjangkit)
									
								}
								if (v.positif > 70) {
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
						tgl1.text('4 April - 11 April 2020')
						tgl1Mobile.text('4 April - 11 April 2020')
						tgl2.text('4 April - 11 April 2020')
						tgl2Mobile.text('4 April - 11 April 2020')
						jumlahKelurahanTerjangkit = 0
                        d3.csv('data11april.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah1.text(jumlahKelurahanTerjangkit)
									jumlah1Mobile.text(jumlahKelurahanTerjangkit)
									jumlah2.text(jumlahKelurahanTerjangkit)
									jumlah2Mobile.text(jumlahKelurahanTerjangkit)	
								}
								if (v.positif > 70) {
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
						tgl1.text('28 Maret - 4 April 2020')
						tgl1Mobile.text('28 Maret - 4 April 2020')
						tgl2.text('28 Maret - 4 April 2020')
						tgl2Mobile.text('28 Maret - 4 April 2020')
						jumlahKelurahanTerjangkit = 0
                        d3.csv('data4april.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah1.text(jumlahKelurahanTerjangkit)
									jumlah1Mobile.text(jumlahKelurahanTerjangkit)
									jumlah2.text(jumlahKelurahanTerjangkit)
									jumlah2Mobile.text(jumlahKelurahanTerjangkit)
								}
								if (v.positif > 70) {
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
var svg2 = d3.select(".desktopMap2").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 530').attr('id', 'petaJakarta2')
var gJakarta2 = svg2.append("g").attr("class", "jakarta2")
var title2 = svg2.append("text").attr("class", "title-kelurahan").attr("transform", "translate(" + 100 + "," + 400 + ")").text('Kelurahan Terjangkit').attr('font-weight','bold')
var jumlah2 = title2.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','kelurahanTerjangkit');
var range2 = title2.append('tspan').attr('x',30).attr('dy', '0').text(" dari 267 kelurahan").attr('font-weight','400');
var periode2 = svg2.append("text").attr("class", "title-periode").attr("transform", "translate(" + 100 + "," + 350 + ")").text('Periode').attr('font-weight','bold')
var tgl2 = periode2.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','tglPeriode');

var svg2Mobile = d3.select(".mobileMap2").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 960').attr('id', 'petaJakarta2Mobile')
var gJakarta2Mobile = svg2Mobile.append("g").attr("class", "jakarta2Mobile")
var title2Mobile = svg2Mobile.append("text").attr("class", "title-kelurahan").attr("transform", "translate(" + 20 + "," + 850 + ")").text('Kelurahan Terjangkit').attr('font-weight','bold').attr('font-size','20pt')
var jumlah2Mobile = title2Mobile.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','kelurahanTerjangkit');
var range2Mobile = title2Mobile.append('tspan').attr('x',50).attr('dy', '0').text(" dari 267 kelurahan").attr('font-weight','400');
var periode2Mobile = svg2Mobile.append("text").attr("class", "title-periode").attr("transform", "translate(" + 20 + "," + 750 + ")").text('Periode').attr('font-weight','bold').attr('font-size','20pt')
var tgl2Mobile = periode2Mobile.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','tglPeriode');

d3.json("jkt.json",function(json) {
    jakarta2 = gJakarta2.selectAll("path").data(json.features).enter().append("path").attr("d", path).attr("class", function(d) {return "desa desa-"+ string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
    jakarta2Mobile = gJakarta2Mobile.selectAll("path").data(json.features).enter().append("path").attr("d", pathMobile).attr("class", function(d) {return "desa desa-"+string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
});

// scrollmagic and map here
pinJakarta2 = new ScrollMagic.Scene({triggerElement: '#pinJakarta2Trigger'}).triggerHook(0).on("enter",(e)=>{pinningJakarta2.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinningJakarta2.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpinJakarta2 = new ScrollMagic.Scene({triggerElement: '#endpinJakarta2Trigger'}).triggerHook(1).on("enter",(e)=>{pinningJakarta2.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinningJakarta2.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);

scene1Jakarta2 = new ScrollMagic.Scene({triggerElement: "#step1Map2"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1.text('11 April - 25 April 2020')
						tgl1Mobile.text('11 April - 25 April 2020')
						tgl2.text('11 April - 25 April 2020')
						tgl2Mobile.text('11 April - 25 April 2020')
						jumlahKelurahanTerjangkit = 0
                        d3.csv('data25april.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah1.text(jumlahKelurahanTerjangkit)
									jumlah1Mobile.text(jumlahKelurahanTerjangkit)
									jumlah2.text(jumlahKelurahanTerjangkit)
									jumlah2Mobile.text(jumlahKelurahanTerjangkit)
								}
								if (v.positif > 70) {
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
						tgl1.text('4 April - 11 April 2020')
						tgl1Mobile.text('4 April - 11 April 2020')
						tgl2.text('4 April - 11 April 2020')
						tgl2Mobile.text('4 April - 11 April 2020')
						jumlahKelurahanTerjangkit = 0
                        d3.csv('data11april.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah1.text(jumlahKelurahanTerjangkit)
									jumlah1Mobile.text(jumlahKelurahanTerjangkit)
									jumlah2.text(jumlahKelurahanTerjangkit)
									jumlah2Mobile.text(jumlahKelurahanTerjangkit)
								}
								if (v.positif > 70) {
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
						tgl1.text('25 April - 16 Mei 2020')
						tgl1Mobile.text('25 April - 16 Mei 2020')
						tgl2.text('25 April - 16 Mei 2020')
						tgl2Mobile.text('25 April - 16 Mei 2020')
						jumlahKelurahanTerjangkit = 0
                        d3.csv('data16mei.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah1.text(jumlahKelurahanTerjangkit)
									jumlah1Mobile.text(jumlahKelurahanTerjangkit)
									jumlah2.text(jumlahKelurahanTerjangkit)
									jumlah2Mobile.text(jumlahKelurahanTerjangkit)
									
								}
								if (v.positif > 70) {
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
						jumlahKelurahanTerjangkit = 0
						tgl1.text('11 April - 25 April 2020')
						tgl1Mobile.text('11 April - 25 April 2020')
						tgl2.text('11 April - 25 April 2020')
						tgl2Mobile.text('11 April - 25 April 2020')
                        d3.csv('data25april.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah1.text(jumlahKelurahanTerjangkit)
									jumlah1Mobile.text(jumlahKelurahanTerjangkit)
									jumlah2.text(jumlahKelurahanTerjangkit)
									jumlah2Mobile.text(jumlahKelurahanTerjangkit)
									
								}
								if (v.positif > 70) {
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
						jumlahKelurahanTerjangkit = 0
						tgl1.text('16 Mei - 5 Juni 2020')
						tgl1Mobile.text('16 Mei - 5 Juni 2020')
						tgl2.text('16 Mei - 5 Juni 2020')
						tgl2Mobile.text('16 Mei - 5 Juni 2020')
                        d3.csv('data5juni.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah1.text(jumlahKelurahanTerjangkit)
									jumlah1Mobile.text(jumlahKelurahanTerjangkit)
									jumlah2.text(jumlahKelurahanTerjangkit)
									jumlah2Mobile.text(jumlahKelurahanTerjangkit)
									
								}
								if (v.positif > 70) {
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
						jumlahKelurahanTerjangkit = 0
						tgl1.text('25 April - 16 Mei 2020')
						tgl1Mobile.text('25 April - 16 Mei 2020')
						tgl2.text('25 April - 16 Mei 2020')
						tgl2Mobile.text('25 April - 16 Mei 2020')
                        d3.csv('data16mei.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah1.text(jumlahKelurahanTerjangkit)
									jumlah1Mobile.text(jumlahKelurahanTerjangkit)
									jumlah2.text(jumlahKelurahanTerjangkit)
									jumlah2Mobile.text(jumlahKelurahanTerjangkit)
									
								}
								if (v.positif > 70) {
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
// map jakarta3 here
var svg3 = d3.select(".desktopMap3").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 530').attr('id', 'petaJakarta3')
var gJakarta3 = svg3.append("g").attr("class", "jakarta3")
var title3 = svg3.append("text").attr("class", "title-kelurahan").attr("transform", "translate(" + 100 + "," + 400 + ")").text('Kelurahan Terjangkit').attr('font-weight','bold')
var jumlah3 = title3.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','kelurahanTerjangkit');
var range3 = title3.append('tspan').attr('x',30).attr('dy', '0').text(" dari 267 kelurahan").attr('font-weight','400');
var periode3 = svg3.append("text").attr("class", "title-periode").attr("transform", "translate(" + 100 + "," + 350 + ")").text('Periode').attr('font-weight','bold')
var tgl3 = periode3.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','tglPeriode');

var svg3Mobile = d3.select(".mobileMap3").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 960').attr('id', 'petaJakarta3Mobile')
var gJakarta3Mobile = svg3Mobile.append("g").attr("class", "jakarta3Mobile")
var title3Mobile = svg3Mobile.append("text").attr("class", "title-kelurahan").attr("transform", "translate(" + 20 + "," + 850 + ")").text('Kelurahan Terjangkit').attr('font-weight','bold').attr('font-size','20pt')
var jumlah3Mobile = title3Mobile.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','kelurahanTerjangkit');
var range3Mobile = title3Mobile.append('tspan').attr('x',50).attr('dy', '0').text(" dari 267 kelurahan").attr('font-weight','400');
var periode3Mobile = svg3Mobile.append("text").attr("class", "title-periode").attr("transform", "translate(" + 20 + "," + 750 + ")").text('Periode').attr('font-weight','bold').attr('font-size','20pt')
var tgl3Mobile = periode3Mobile.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','tglPeriode');

d3.json("jkt.json",function(json) {
    jakarta3 = gJakarta3.selectAll("path").data(json.features).enter().append("path").attr("d", path).attr("class", function(d) {return "desa2-"+ string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
    jakarta3Mobile = gJakarta3Mobile.selectAll("path").data(json.features).enter().append("path").attr("d", pathMobile).attr("class", function(d) {return "desa2-"+string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
});

// scrollmagic and map here
pinJakarta3 = new ScrollMagic.Scene({triggerElement: '#pinJakarta3Trigger'}).triggerHook(0).on("enter",(e)=>{pinningJakarta3.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinningJakarta3.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpinJakarta3 = new ScrollMagic.Scene({triggerElement: '#endpinJakarta3Trigger'}).triggerHook(1).on("enter",(e)=>{pinningJakarta3.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinningJakarta3.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);

scene1Jakarta3 = new ScrollMagic.Scene({triggerElement: "#step1Map3"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl3.text('10 April - 17 April 2020')
						tgl3Mobile.text('10 April - 17 April 2020')
						tgl4.text('10 April - 17 April 2020')
						tgl4Mobile.text('10 April - 17 April 2020')
						jumlahKelurahanTerjangkit = 0
                        d3.csv('data17april.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah3.text(jumlahKelurahanTerjangkit)
									jumlah3Mobile.text(jumlahKelurahanTerjangkit)
									jumlah4.text(jumlahKelurahanTerjangkit)
									jumlah4Mobile.text(jumlahKelurahanTerjangkit)
								}
								if (v.positif > 70) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    })
                    .on("leave",(e)=>{
						jumlahKelurahanTerjangkit = 0
						tgl3.text('25 Maret - 10 April 2020')
						tgl3Mobile.text('25 Maret - 10 April 2020')
						tgl4.text('25 Maret - 10 April 2020')
						tgl4Mobile.text('25 Maret - 10 April 2020')
                        d3.csv('data11april.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah3.text(jumlahKelurahanTerjangkit)
									jumlah3Mobile.text(jumlahKelurahanTerjangkit)
									jumlah4.text(jumlahKelurahanTerjangkit)
									jumlah4Mobile.text(jumlahKelurahanTerjangkit)
								}
								if (v.positif > 70) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    }).addTo(controller);
scene2Jakarta3 = new ScrollMagic.Scene({triggerElement: "#step2Map3"}).triggerHook(1)
                    .on("enter",(e)=>{
						jumlahKelurahanTerjangkit = 0
						tgl3.text('17 April - 24 April 2020')
						tgl3Mobile.text('17 April - 24 April 2020')
						tgl4.text('17 April - 24 April 2020')
						tgl4Mobile.text('17 April - 24 April 2020')
                        d3.csv('data24april.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah3.text(jumlahKelurahanTerjangkit)
									jumlah3Mobile.text(jumlahKelurahanTerjangkit)
									jumlah4.text(jumlahKelurahanTerjangkit)
									jumlah4Mobile.text(jumlahKelurahanTerjangkit)
									
								}
								if (v.positif > 70) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    })
                    .on("leave",(e)=>{
						jumlahKelurahanTerjangkit = 0
						tgl3.text('10 April - 17 April 2020')
						tgl3Mobile.text('10 April - 17 April 2020')
						tgl4.text('10 April - 17 April 2020')
						tgl4Mobile.text('10 April - 17 April 2020')
                        d3.csv('data17april.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah3.text(jumlahKelurahanTerjangkit)
									jumlah3Mobile.text(jumlahKelurahanTerjangkit)
									jumlah4.text(jumlahKelurahanTerjangkit)
									jumlah4Mobile.text(jumlahKelurahanTerjangkit)
									
								}
								if (v.positif > 70) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
					}).addTo(controller);
// map jakarta4 here
var svg4 = d3.select(".desktopMap4").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 530').attr('id', 'petaJakarta4')
var gJakarta4 = svg4.append("g").attr("class", "jakarta4")
var title4 = svg4.append("text").attr("class", "title-kelurahan").attr("transform", "translate(" + 100 + "," + 400 + ")").text('Kelurahan Terjangkit').attr('font-weight','bold')
var jumlah4 = title4.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','kelurahanTerjangkit');
var range4 = title4.append('tspan').attr('x',30).attr('dy', '0').text(" dari 267 kelurahan").attr('font-weight','400');
var periode4 = svg4.append("text").attr("class", "title-periode").attr("transform", "translate(" + 100 + "," + 350 + ")").text('Periode').attr('font-weight','bold')
var tgl4 = periode4.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','tglPeriode');

var svg4Mobile = d3.select(".mobileMap4").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 960').attr('id', 'petaJakarta4Mobile')
var gJakarta4Mobile = svg4Mobile.append("g").attr("class", "jakarta4Mobile")
var title4Mobile = svg4Mobile.append("text").attr("class", "title-kelurahan").attr("transform", "translate(" + 20 + "," + 850 + ")").text('Kelurahan Terjangkit').attr('font-weight','bold').attr('font-size','20pt')
var jumlah4Mobile = title4Mobile.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','kelurahanTerjangkit');
var range4Mobile = title4Mobile.append('tspan').attr('x',50).attr('dy', '0').text(" dari 267 kelurahan").attr('font-weight','400');
var periode4Mobile = svg4Mobile.append("text").attr("class", "title-periode").attr("transform", "translate(" + 20 + "," + 750 + ")").text('Periode').attr('font-weight','bold').attr('font-size','20pt')
var tgl4Mobile = periode4Mobile.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','tglPeriode');

d3.json("jkt.json",function(json) {
    jakarta4 = gJakarta4.selectAll("path").data(json.features).enter().append("path").attr("d", path).attr("class", function(d) {return "desa2-"+ string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
    jakarta4Mobile = gJakarta4Mobile.selectAll("path").data(json.features).enter().append("path").attr("d", pathMobile).attr("class", function(d) {return "desa2-"+string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
});

// scrollmagic and map here
pinJakarta4 = new ScrollMagic.Scene({triggerElement: '#pinJakarta4Trigger'}).triggerHook(0).on("enter",(e)=>{pinningJakarta4.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinningJakarta4.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpinJakarta4 = new ScrollMagic.Scene({triggerElement: '#endpinJakarta4Trigger'}).triggerHook(1).on("enter",(e)=>{pinningJakarta4.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinningJakarta4.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);

scene1Jakarta4 = new ScrollMagic.Scene({triggerElement: "#step1Map4"}).triggerHook(1)
                    .on("enter",(e)=>{
						jumlahKelurahanTerjangkit = 0
						tgl3.text('24 April - 8 Mei 2020')
						tgl3Mobile.text('24 April - 8 Mei 2020')
						tgl4.text('24 April - 8 Mei 2020')
						tgl4Mobile.text('24 April - 8 Mei 2020')
                        d3.csv('data8mei.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah3.text(jumlahKelurahanTerjangkit)
									jumlah3Mobile.text(jumlahKelurahanTerjangkit)
									jumlah4.text(jumlahKelurahanTerjangkit)
									jumlah4Mobile.text(jumlahKelurahanTerjangkit)
								}
								if (v.positif > 70) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    })
                    .on("leave",(e)=>{
						jumlahKelurahanTerjangkit = 0
						tgl3.text('17 April - 24 April 2020')
						tgl3Mobile.text('17 April - 24 April 2020')
						tgl4.text('17 April - 24 April 2020')
						tgl4Mobile.text('17 April - 24 April 2020')
                        d3.csv('data24april.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah3.text(jumlahKelurahanTerjangkit)
									jumlah3Mobile.text(jumlahKelurahanTerjangkit)
									jumlah4.text(jumlahKelurahanTerjangkit)
									jumlah4Mobile.text(jumlahKelurahanTerjangkit)
								}
								if (v.positif > 70) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    }).addTo(controller);
scene2Jakarta4 = new ScrollMagic.Scene({triggerElement: "#step2Map4"}).triggerHook(1)
                    .on("enter",(e)=>{
						jumlahKelurahanTerjangkit = 0
						tgl3.text('8 Mei - 22 Mei 2020')
						tgl3Mobile.text('8 Mei - 22 Mei 2020')
						tgl4.text('8 Mei - 22 Mei 2020')
						tgl4Mobile.text('8 Mei - 22 Mei 2020')
                        d3.csv('data22mei.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah3.text(jumlahKelurahanTerjangkit)
									jumlah3Mobile.text(jumlahKelurahanTerjangkit)
									jumlah4.text(jumlahKelurahanTerjangkit)
									jumlah4Mobile.text(jumlahKelurahanTerjangkit)
									
								}
								if (v.positif > 70) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
                    })
                    .on("leave",(e)=>{
						jumlahKelurahanTerjangkit = 0
						tgl3.text('24 April - 8 Mei 2020')
						tgl3Mobile.text('24 April - 8 Mei 2020')
						tgl4.text('24 April - 8 Mei 2020')
						tgl4Mobile.text('24 April - 8 Mei 2020')
                        d3.csv('data8mei.csv',function(csv){
							$.each(csv, function(id,v) {
								if(v.positif > 0){
									jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
									jumlah3.text(jumlahKelurahanTerjangkit)
									jumlah3Mobile.text(jumlahKelurahanTerjangkit)
									jumlah4.text(jumlahKelurahanTerjangkit)
									jumlah4Mobile.text(jumlahKelurahanTerjangkit)
									
								}
								if (v.positif > 70) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[8])
								} else if (v.positif > 60) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[7])
								} else if (v.positif > 50) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[6])
								} else if (v.positif > 40) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[5])
								} else if (v.positif > 30) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[4])
								} else if (v.positif > 20) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[3])
								} else if (v.positif > 10) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[2])
								} else if (v.positif > 5) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[1])
								} else if (v.positif < 6) {
									$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[0])
								}
							})
						})
					}).addTo(controller);

$(window).bind('load',function() {
	jumlahKelurahanTerjangkit = 0
	tgl3.text('25 Maret - 10 April 2020')
	tgl3Mobile.text('25 Maret - 10 April 2020')
	tgl4.text('25 Maret - 10 April 2020')
	tgl4Mobile.text('25 Maret - 10 April 2020')
	d3.csv('data11april.csv',function(csv){
		$.each(csv, function(id,v) {
			if(v.positif > 0){
				jumlahKelurahanTerjangkit = jumlahKelurahanTerjangkit+1
				jumlah3.text(jumlahKelurahanTerjangkit)
				jumlah3Mobile.text(jumlahKelurahanTerjangkit)
				jumlah4.text(jumlahKelurahanTerjangkit)
				jumlah4Mobile.text(jumlahKelurahanTerjangkit)
				
			}
			if (v.positif > 70) {
				$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[8])
			} else if (v.positif > 60) {
				$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[7])
			} else if (v.positif > 50) {
				$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[6])
			} else if (v.positif > 40) {
				$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[5])
			} else if (v.positif > 30) {
				$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[4])
			} else if (v.positif > 20) {
				$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[3])
			} else if (v.positif > 10) {
				$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[2])
			} else if (v.positif > 5) {
				$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[1])
			} else if (v.positif < 6) {
				$('.desa2-'+string_to_slug(v.kelurahan)).css('fill',color[0])
			}
		})
	})
})
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