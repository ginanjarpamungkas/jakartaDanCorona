function boxData(){$.ajax({url:"https://indonesia-covid-19.mathdro.id/api",async:!0,type:"GET",dataType:"json",success:function(o){$("#positif").html((o.jumlahKasus).toLocaleString()),$("#sembuh").html((o.sembuh).toLocaleString()),$("#meninggal").html((o.meninggal).toLocaleString()),$("#aktif").html((o.perawatan).toLocaleString())},error:function(o){console.log(o)}}),$.ajax({url:"https://covid19.mathdro.id/api",async:!0,type:"GET",dataType:"json",success:function(o){$("#word-positif").html((o.confirmed['value']).toLocaleString())},error:function(o){console.log(o)}}),$.ajax({url:"https://covid19.mathdro.id/api",async:!0,type:"GET",dataType:"json",success:function(o){$("#word-sembuh").html((o.recovered['value']).toLocaleString())},error:function(o){console.log(o)}}),$.ajax({url:"https://covid19.mathdro.id/api",async:!0,type:"GET",dataType:"json",success:function(o){$("#word-meninggal").html((o.deaths['value']).toLocaleString())},error:function(o){console.log(o)}})}
boxData()
var controller = new ScrollMagic.Controller();
var pinning = $('#flourishPinning')
var pinningJakarta1 = $('#petaJakarta1Pinning')
var pinningJakarta2 = $('#petaJakarta2Pinning')
// scrollmagic and flourish here
pin = new ScrollMagic.Scene({triggerElement: '#pinTrigger'}).triggerHook(0).on("enter",(e)=>{pinning.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinning.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpin = new ScrollMagic.Scene({triggerElement: '#endpinTrigger'}).triggerHook(1).on("enter",(e)=>{pinning.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinning.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);
scene1 = new ScrollMagic.Scene({triggerElement: "#step1"}).triggerHook(1).on("enter",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/visualisation/2897772/embed')}).on("leave",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/visualisation/2898466/embed')}).addTo(controller);
// scene2 = new ScrollMagic.Scene({triggerElement: "#step2"}).triggerHook(1).on("enter",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/visualisation/2837489/embed#slide-1')}).on("leave",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/visualisation/2837489/embed#slide-0')}).addTo(controller);
// scene3 = new ScrollMagic.Scene({triggerElement: "#step3"}).triggerHook(1).on("enter",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/visualisation/2837489/embed#slide-2')}).on("leave",(e)=>{$('#frame-chart').attr('src','https://flo.uri.sh/visualisation/2837489/embed#slide-1')}).addTo(controller);

var projection = d3.geoMercator().scale(103000).translate([-191570, -10955]);
var path = d3.geoPath().projection(projection);
var projectionMobile = d3.geoMercator().scale(180000).translate([-335128, -19135]);
var pathMobile = d3.geoPath().projection(projectionMobile);

// map jakarta1 here
var svg1 = d3.select(".desktopMap1").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 530').attr('id', 'petaJakarta1')
var gJakarta1 = svg1.append("g").attr("class", "jakarta1")
var title1id = svg1.append("text").attr("class", "id-content").attr("transform", "translate(" + 100 + "," + 400 + ")").text('Kelurahan Terjangkit').attr('font-weight','bold')
var title1en = svg1.append("text").attr("class", "en-content").attr("transform", "translate(" + 100 + "," + 400 + ")").text('Infected Village').attr('font-weight','bold')

var jumlah1id = title1id.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','kelurahanTerjangkit');
var jumlah1en = title1en.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','kelurahanTerjangkit');

var range1id = title1id.append('tspan').attr('x',30).attr('dy', '0').text(" dari 267 kelurahan").attr('font-weight','400');
var range1en = title1en.append('tspan').attr('x',30).attr('dy', '0').text(" from 267 village").attr('font-weight','400');

var periode1id = svg1.append("text").attr("class", "id-content").attr("transform", "translate(" + 100 + "," + 350 + ")").text('Periode').attr('font-weight','bold')
var periode1en = svg1.append("text").attr("class", "en-content").attr("transform", "translate(" + 100 + "," + 350 + ")").text('Period').attr('font-weight','bold')

var tgl1id = periode1id.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','id-content');
var tgl1en = periode1en.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','en-content');

var svg1Mobile = d3.select(".mobileMap1").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 960').attr('id', 'petaJakarta1Mobile')
var gJakarta1Mobile = svg1Mobile.append("g").attr("class", "jakarta1Mobile")
var title1MobileId = svg1Mobile.append("text").attr("class", "id-content").attr("transform", "translate(" + 20 + "," + 850 + ")").text('Kelurahan Terjangkit').attr('font-weight','bold').attr('font-size','20pt')
var title1MobileEn = svg1Mobile.append("text").attr("class", "en-content").attr("transform", "translate(" + 20 + "," + 850 + ")").text('Infected Village').attr('font-weight','bold').attr('font-size','20pt')

var jumlah1MobileId = title1MobileId.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','kelurahanTerjangkit');
var jumlah1MobileEn = title1MobileEn.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','kelurahanTerjangkit');

var range1MobileId = title1MobileId.append('tspan').attr('x',50).attr('dy', '0').text(" dari 267 kelurahan").attr('font-weight','400').attr('class','id-content');;
var range1MobileEn = title1MobileEn.append('tspan').attr('x',50).attr('dy', '0').text(" from 267 village").attr('font-weight','400').attr('class','en-content');;

var periode1MobileId = svg1Mobile.append("text").attr("class", "id-content").attr("transform", "translate(" + 20 + "," + 750 + ")").text('Periode').attr('font-weight','bold').attr('font-size','20pt')
var periode1MobileEn = svg1Mobile.append("text").attr("class", "en-content").attr("transform", "translate(" + 20 + "," + 750 + ")").text('Period').attr('font-weight','bold').attr('font-size','20pt')

var tgl1MobileId = periode1MobileId.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','id-content');
var tgl1MobileEn = periode1MobileEn.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','en-content');

d3.json("jkt.json",function(json) {
    jakarta1 = gJakarta1.selectAll("path").data(json.features).enter().append("path").attr("d", path).attr("class", function(d) {return "desa desa-"+ string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
    // textJakarta = gJakarta.selectAll("text").data(json.features).enter().append("svg:text").text(function(d){return d.properties.name;}).attr("x", function(d){return path.centroid(d)[0]+10;}).attr("y", function(d){if(d.properties.name == 'Jakarta Timur'){return path.centroid(d)[1]-18};return  path.centroid(d)[1];}).attr("text-anchor","middle").attr('font-size','10pt').attr('font-weight','bold').attr('class','desaText');
    jakarta1Mobile = gJakarta1Mobile.selectAll("path").data(json.features).enter().append("path").attr("d", pathMobile).attr("class", function(d) {return "desa desa-"+string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
});

// scrollmagic and map here
var color =  ['#ffffff', '#ffe5de', '#ffcabc', '#fcb09c', '#f6957d', '#ee7a5e', '#e45d41', '#d93d23', '#cc0000']
pinJakarta1 = new ScrollMagic.Scene({triggerElement: '#pinJakarta1Trigger'}).triggerHook(0).on("enter",(e)=>{pinningJakarta1.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinningJakarta1.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpinJakarta1 = new ScrollMagic.Scene({triggerElement: '#endpinJakarta1Trigger'}).triggerHook(1).on("enter",(e)=>{pinningJakarta1.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinningJakarta1.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);
scene1Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step1Map1"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1id.text('25 Maret - 28 Maret 2020')
						tgl1MobileId.text('25 Maret - 28 Maret 2020')
						jumlah1id.text('152')
						jumlah1MobileId.text('152')

						tgl1en.text('March 25 - March 28, 2020')
						tgl1MobileEn.text('March 25 - March 28, 2020')
						jumlah1en.text('152')
						jumlah1MobileEn.text('152')

						tgl2id.text('25 Maret - 28 Maret 2020')
						tgl2MobileId.text('25 Maret - 28 Maret 2020')
						jumlah2id.text('152')
						jumlah2MobileId.text('152')

						tgl2en.text('March 25 - March 28, 2020')
						tgl2MobileEn.text('March 25 - March 28, 2020')
						jumlah2en.text('152')
						jumlah2MobileEn.text('152')
                        d3.csv('data28maret.csv',function(csv){
							$.each(csv, function(id,v) {
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
						tgl1id.text('time range')
						tgl1MobileId.text('time range')
						jumlah1id.text('0')
						jumlah1MobileId.text('0')
						tgl2id.text('time range')
						tgl2MobileId.text('time range')
						jumlah2id.text('0')
						jumlah2MobileId.text('0')
                        $('.desa').css('fill','#fff')
                    }).addTo(controller);
scene2Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step2Map1"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1id.text('28 Maret - 4 April 2020')
						tgl1MobileId.text('28 Maret - 4 April 2020')
						jumlah1id.text('193')
						jumlah1MobileId.text('193')

						tgl1en.text('March 28 - April 4, 2020')
						tgl1MobileEn.text('March 28 - April 4, 2020')
						jumlah1en.text('193')
						jumlah1MobileEn.text('193')

						tgl2id.text('28 Maret - 4 April 2020')
						tgl2MobileId.text('28 Maret - 4 April 2020')
						jumlah2id.text('193')
						jumlah2MobileId.text('193')

						tgl2en.text('March 28 - April 4, 2020')
						tgl2MobileEn.text('March 28 - April 4, 2020')
						jumlah2en.text('193')
						jumlah2MobileEn.text('193')
                        d3.csv('data4april.csv',function(csv){
							$.each(csv, function(id,v) {
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
						tgl1id.text('25 Maret - 28 Maret 2020')
						tgl1MobileId.text('25 Maret - 28 Maret 2020')
						jumlah1id.text('152')
						jumlah1MobileId.text('152')

						tgl1en.text('March 25 - March 28, 2020')
						tgl1MobileEn.text('March 25 - March 28, 2020')
						jumlah1en.text('152')
						jumlah1MobileEn.text('152')

						tgl2id.text('25 Maret - 28 Maret 2020')
						tgl2MobileId.text('25 Maret - 28 Maret 2020')
						jumlah2id.text('152')
						jumlah2MobileId.text('152')

						tgl2en.text('March 25 - March 28, 2020')
						tgl2MobileEn.text('March 25 - March 28, 2020')
						jumlah2en.text('152')
						jumlah2MobileEn.text('152')
                        d3.csv('data28maret.csv',function(csv){
							$.each(csv, function(id,v) {
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
						tgl1id.text('4 April - 11 April 2020')
						tgl1MobileId.text('4 April - 11 April 2020')
						jumlah1id.text('227')
						jumlah1MobileId.text('227')

						tgl1en.text('April 4 - April 11, 2020')
						tgl1MobileEn.text('April 4 - April 11, 2020')
						jumlah1en.text('227')
						jumlah1MobileEn.text('227')

						tgl2id.text('4 April - 11 April 2020')
						tgl2MobileId.text('4 April - 11 April 2020')
						jumlah2id.text('227')
						jumlah2MobileId.text('227')

						tgl2en.text('April 4 - April 11, 2020')
						tgl2MobileEn.text('April 4 - April 11, 2020')
						jumlah2en.text('227')
						jumlah2MobileEn.text('227')
                        d3.csv('data11april.csv',function(csv){
							$.each(csv, function(id,v) {
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
						tgl1id.text('28 Maret - 4 April 2020')
						tgl1MobileId.text('28 Maret - 4 April 2020')
						jumlah1id.text('193')
						jumlah1MobileId.text('193')

						tgl1en.text('March 28 - April 4, 2020')
						tgl1MobileEn.text('March 28 - April 4, 2020')
						jumlah1en.text('193')
						jumlah1MobileEn.text('193')

						tgl2id.text('28 Maret - 4 April 2020')
						tgl2MobileId.text('28 Maret - 4 April 2020')
						jumlah2id.text('193')
						jumlah2MobileId.text('193')

						tgl2en.text('March 28 - April 4, 2020')
						tgl2MobileEn.text('March 28 - April 4, 2020')
						jumlah2en.text('193')
						jumlah2MobileEn.text('193')
                        d3.csv('data4april.csv',function(csv){
							$.each(csv, function(id,v) {
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
					
scene4Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step4Map1"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1id.text('11 April - 25 April 2020')
						tgl1MobileId.text('11 April - 25 April 2020')
						jumlah1id.text('255')
						jumlah1MobileId.text('255')

						tgl1en.text('April 11 - April 25, 2020')
						tgl1MobileEn.text('April 11 - April 25, 2020')
						jumlah1en.text('255')
						jumlah1MobileEn.text('255')

						tgl2id.text('11 April - 25 April 2020')
						tgl2MobileId.text('11 April - 25 April 2020')
						jumlah2id.text('255')
						jumlah2MobileId.text('255')

						tgl2en.text('April 11 - April 25, 2020')
						tgl2MobileEn.text('April 11 - April 25, 2020')
						jumlah2en.text('255')
						jumlah2MobileEn.text('255')
                        d3.csv('data25april.csv',function(csv){
							$.each(csv, function(id,v) {
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
						tgl1id.text('4 April - 11 April 2020')
						tgl1MobileId.text('4 April - 11 April 2020')
						jumlah1id.text('227')
						jumlah1MobileId.text('227')

						tgl1en.text('April 4 - April 11, 2020')
						tgl1MobileEn.text('April 4 - April 11, 2020')
						jumlah1en.text('227')
						jumlah1MobileEn.text('227')

						tgl2id.text('4 April - 11 April 2020')
						tgl2MobileId.text('4 April - 11 April 2020')
						jumlah2id.text('227')
						jumlah2MobileId.text('227')

						tgl2en.text('April 4 - April 11, 2020')
						tgl2MobileEn.text('April 4 - April 11, 2020')
						jumlah2en.text('227')
						jumlah2MobileEn.text('227')
                        d3.csv('data11april.csv',function(csv){
							$.each(csv, function(id,v) {
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
scene5Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step5Map1"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1id.text('25 April - 16 Mei 2020')
						tgl1MobileId.text('25 April - 16 Mei 2020')
						jumlah1id.text('260')
						jumlah1MobileId.text('260')

						tgl1en.text('April 25 - May 16, 2020')
						tgl1MobileEn.text('April 25 - May 16, 2020')
						jumlah1en.text('260')
						jumlah1MobileEn.text('260')

						tgl2id.text('25 April - 16 Mei 2020')
						tgl2MobileId.text('25 April - 16 Mei 2020')
						jumlah2id.text('260')
						jumlah2MobileId.text('260')

						tgl2en.text('April 25 - May 16, 2020')
						tgl2MobileEn.text('April 25 - May 16, 2020')
						jumlah2en.text('260')
						jumlah2MobileEn.text('260')
                        d3.csv('data16mei.csv',function(csv){
							$.each(csv, function(id,v) {
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
						tgl1id.text('11 April - 25 April 2020')
						tgl1MobileId.text('11 April - 25 April 2020')
						jumlah1id.text('255')
						jumlah1MobileId.text('255')

						tgl1en.text('April 11 - April 25, 2020')
						tgl1MobileEn.text('April 11 - April 25, 2020')
						jumlah1en.text('255')
						jumlah1MobileEn.text('255')

						tgl2id.text('11 April - 25 April 2020')
						tgl2MobileId.text('11 April - 25 April 2020')
						jumlah2id.text('255')
						jumlah2MobileId.text('255')

						tgl2en.text('April 11 - April 25, 2020')
						tgl2MobileEn.text('April 11 - April 25, 2020')
						jumlah2en.text('255')
						jumlah2MobileEn.text('255')
                        d3.csv('data25april.csv',function(csv){
							$.each(csv, function(id,v) {
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
scene6Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step6Map1"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1id.text('16 Mei - 22 Mei 2020')
						tgl1MobileId.text('16 Mei - 22 Mei 2020')
						jumlah1id.text('261')
						jumlah1MobileId.text('261')

						tgl1en.text('May 16 - May 22, 2020')
						tgl1MobileEn.text('May 16 - May 22, 2020')
						jumlah1en.text('261')
						jumlah1MobileEn.text('261')

						tgl2id.text('16 Mei - 22 Mei 2020')
						tgl2MobileId.text('16 Mei - 22 Mei 2020')
						jumlah2id.text('261')
						jumlah2MobileId.text('261')

						tgl2en.text('May 16 - May 22, 2020')
						tgl2MobileEn.text('May 16 - May 22, 2020')
						jumlah2en.text('261')
						jumlah2MobileEn.text('261')
                        d3.csv('data22mei.csv',function(csv){
							$.each(csv, function(id,v) {
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
						tgl1id.text('25 April - 16 Mei 2020')
						tgl1MobileId.text('25 April - 16 Mei 2020')
						jumlah1id.text('260')
						jumlah1MobileId.text('260')

						tgl1en.text('April 25 - May 16, 2020')
						tgl1MobileEn.text('April 25 - May 16, 2020')
						jumlah1en.text('260')
						jumlah1MobileEn.text('260')

						tgl2id.text('25 April - 16 Mei 2020')
						tgl2MobileId.text('25 April - 16 Mei 2020')
						jumlah2id.text('260')
						jumlah2MobileId.text('260')

						tgl2en.text('April 25 - May 16, 2020')
						tgl2MobileEn.text('April 25 - May 16, 2020')
						jumlah2en.text('260')
						jumlah2MobileEn.text('260')
                        d3.csv('data16mei.csv',function(csv){
							$.each(csv, function(id,v) {
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

var title2id = svg2.append("text").attr("class", "id-content").attr("transform", "translate(" + 100 + "," + 400 + ")").text('Kelurahan Terjangkit').attr('font-weight','bold')
var title2en = svg2.append("text").attr("class", "en-content").attr("transform", "translate(" + 100 + "," + 400 + ")").text('Infected Village').attr('font-weight','bold')

var jumlah2id = title2id.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','id-content');
var jumlah2en = title2en.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','en-content');

var range2id = title2id.append('tspan').attr('x',30).attr('dy', '0').text(" dari 267 kelurahan").attr('font-weight','400');
var range2en = title2en.append('tspan').attr('x',30).attr('dy', '0').text(" from 267 village").attr('font-weight','400');

var periode2id = svg2.append("text").attr("class", "id-content").attr("transform", "translate(" + 100 + "," + 350 + ")").text('Periode').attr('font-weight','bold')
var periode2en = svg2.append("text").attr("class", "en-content").attr("transform", "translate(" + 100 + "," + 350 + ")").text('Period').attr('font-weight','bold')

var tgl2id = periode2id.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','id-content');
var tgl2en = periode2en.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','en-content');

var svg2Mobile = d3.select(".mobileMap2").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 960').attr('id', 'petaJakarta2Mobile')
var gJakarta2Mobile = svg2Mobile.append("g").attr("class", "jakarta2Mobile")

var title2MobileId = svg2Mobile.append("text").attr("class", "id-content").attr("transform", "translate(" + 20 + "," + 850 + ")").text('Kelurahan Terjangkit').attr('font-weight','bold').attr('font-size','20pt')
var title2MobileEn = svg2Mobile.append("text").attr("class", "en-content").attr("transform", "translate(" + 20 + "," + 850 + ")").text('Infected Village').attr('font-weight','bold').attr('font-size','20pt')

var jumlah2MobileId = title2MobileId.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','id-content');
var jumlah2MobileEn = title2MobileEn.append('tspan').attr('x', 0).attr('dy', '1.3em').text("0").attr('font-weight','400').attr('class','en-content');

var range2MobileId = title2MobileId.append('tspan').attr('x',50).attr('dy', '0').text(" dari 267 kelurahan").attr('font-weight','400');
var range2MobileEn = title2MobileEn.append('tspan').attr('x',50).attr('dy', '0').text(" from 267 village").attr('font-weight','400');

var periode2MobileId = svg2Mobile.append("text").attr("class", "id-content").attr("transform", "translate(" + 20 + "," + 750 + ")").text('Periode').attr('font-weight','bold').attr('font-size','20pt')
var periode2MobileEn = svg2Mobile.append("text").attr("class", "en-content").attr("transform", "translate(" + 20 + "," + 750 + ")").text('Period').attr('font-weight','bold').attr('font-size','20pt')

var tgl2MobileId = periode2MobileId.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','id-content');
var tgl2MobileEn = periode2MobileEn.append('tspan').attr('x', 0).attr('dy', '1.3em').text("time range").attr('font-weight','400').attr('class','en-content');

d3.json("jkt.json",function(json) {
    jakarta2 = gJakarta2.selectAll("path").data(json.features).enter().append("path").attr("d", path).attr("class", function(d) {return "desa desa-"+ string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
    // textJakarta = gJakarta.selectAll("text").data(json.features).enter().append("svg:text").text(function(d){return d.properties.name;}).attr("x", function(d){return path.centroid(d)[0]+10;}).attr("y", function(d){if(d.properties.name == 'Jakarta Timur'){return path.centroid(d)[1]-18};return  path.centroid(d)[1];}).attr("text-anchor","middle").attr('font-size','10pt').attr('font-weight','bold').attr('class','desaText');
    jakarta2Mobile = gJakarta2Mobile.selectAll("path").data(json.features).enter().append("path").attr("d", pathMobile).attr("class", function(d) {return "desa desa-"+string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
});

// scrollmagic and map here
pinJakarta2 = new ScrollMagic.Scene({triggerElement: '#pinJakarta2Trigger'}).triggerHook(0).on("enter",(e)=>{pinningJakarta2.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinningJakarta2.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpinJakarta2 = new ScrollMagic.Scene({triggerElement: '#endpinJakarta2Trigger'}).triggerHook(1).on("enter",(e)=>{pinningJakarta2.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinningJakarta2.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);
scene1Jakarta2 = new ScrollMagic.Scene({triggerElement: "#step1Map2"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1id.text('22 Mei - 5 Juni 2020')
						tgl1MobileId.text('22 Mei - 5 Juni 2020')
						jumlah1id.text('261')
						jumlah1MobileId.text('261')

						tgl1en.text('May 22 - June 5, 2020')
						tgl1MobileEn.text('May 22 - June 5, 2020')
						jumlah1en.text('261')
						jumlah1MobileEn.text('261')

						tgl2id.text('22 Mei - 5 Juni 2020')
						tgl2MobileId.text('22 Mei - 5 Juni 2020')
						jumlah2id.text('261')
						jumlah2MobileId.text('261')

						tgl2en.text('May 22 - June 5, 2020')
						tgl2MobileEn.text('May 22 - June 5, 2020')
						jumlah2en.text('261')
						jumlah2MobileEn.text('261')
                        d3.csv('data5juni.csv',function(csv){
							$.each(csv, function(id,v) {
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
						tgl1id.text('16 Mei - 22 Mei 2020')
						tgl1MobileId.text('16 Mei - 22 Mei 2020')
						jumlah1id.text('261')
						jumlah1MobileId.text('261')

						tgl1en.text('May 16 - May 22, 2020')
						tgl1MobileEn.text('May 16 - May 22, 2020')
						jumlah1en.text('261')
						jumlah1MobileEn.text('261')

						tgl2id.text('16 Mei - 22 Mei 2020')
						tgl2MobileId.text('16 Mei - 22 Mei 2020')
						jumlah2id.text('261')
						jumlah2MobileId.text('261')

						tgl2en.text('May 16 - May 22, 2020')
						tgl2MobileEn.text('May 16 - May 22, 2020')
						jumlah2en.text('261')
						jumlah2MobileEn.text('261')
                        d3.csv('data22mei.csv',function(csv){
							$.each(csv, function(id,v) {
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
scene2Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step2Map2"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1id.text('5 Juni - 19 Juni 2020')
						tgl1MobileId.text('5 Juni - 19 Juni 2020')
						jumlah1id.text('263')
						jumlah1MobileId.text('263')

						tgl1en.text('June 5 - June 19, 2020')
						tgl1MobileEn.text('June 5 - June 19, 2020')
						jumlah1en.text('263')
						jumlah1MobileEn.text('263')

						tgl2id.text('5 Juni - 19 Juni 2020')
						tgl2MobileId.text('5 Juni - 19 Juni 2020')
						jumlah2id.text('263')
						jumlah2MobileId.text('263')

						tgl2en.text('June 5 - June 19, 2020')
						tgl2MobileEn.text('June 5 - June 19, 2020')
						jumlah2en.text('263')
						jumlah2MobileEn.text('263')
                        d3.csv('data19juni.csv',function(csv){
							$.each(csv, function(id,v) {
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
						tgl1id.text('22 Mei - 5 Juni 2020')
						tgl1MobileId.text('22 Mei - 5 Juni 2020')
						jumlah1id.text('261')
						jumlah1MobileId.text('261')

						tgl1en.text('May 22 - June 5, 2020')
						tgl1MobileEn.text('May 22 - June 5, 2020')
						jumlah1en.text('261')
						jumlah1MobileEn.text('261')

						tgl2id.text('22 Mei - 5 Juni 2020')
						tgl2MobileId.text('22 Mei - 5 Juni 2020')
						jumlah2id.text('261')
						jumlah2MobileId.text('261')

						tgl2en.text('May 22 - June 5, 2020')
						tgl2MobileEn.text('May 22 - June 5, 2020')
						jumlah2en.text('261')
						jumlah2MobileEn.text('261')

                        d3.csv('data5juni.csv',function(csv){
							$.each(csv, function(id,v) {
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

var tooltip = d3.select("body").append("div").attr("class", "tooltip")
$('.geo').on("mouseover", function (event) {
	var d = $(this).data('id')
	loadTooltip(d)
	if (d > 478) {
		$('.tooltip').css('visibility','visible').css("left", ((event.pageX)-($('.tooltip').width()+30)) + "px").css("top", (event.pageY - 28) + "px")
	} else {
		$('.tooltip').css('visibility','visible').css("left", ((event.pageX)+10) + "px").css("top", (event.pageY - 28) + "px")
	}
})
.on("mouseout", function (d) {
	$('.tooltip').css('visibility','hidden');
});

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
var kabupaten = []
d3.csv('dataKabupatenIndonesia.csv',function(csv){
	$.each(csv, function(id,v) {
		kabupaten.push(v)
		if (v.positif > 2048) {
			$('[data-id="'+v.id+'"]').css('fill','#cc0000')	
		} else if (v.positif > 2047) {
			$('[data-id="'+v.id+'"]').css('fill','#d53019')	
		} else if (v.positif > 1023) {
			$('[data-id="'+v.id+'"]').css('fill','#dd482d')	
		} else if (v.positif > 511) {
			$('[data-id="'+v.id+'"]').css('fill','#e45d41')	
		} else if (v.positif > 255) {
			$('[data-id="'+v.id+'"]').css('fill','#eb7154')	
		} else if (v.positif > 127) {
			$('[data-id="'+v.id+'"]').css('fill','#f18368')	
		} else if (v.positif > 63) {
			$('[data-id="'+v.id+'"]').css('fill','#f6957d')	
		} else if (v.positif > 31) {
			$('[data-id="'+v.id+'"]').css('fill','#faa791')	
		} else if (v.positif > 15) {
			$('[data-id="'+v.id+'"]').css('fill','#fdb8a7')	
		} else if (v.positif > 7) {
			$('[data-id="'+v.id+'"]').css('fill','#ffcabc')	
		} else if (v.positif > 3) {
			$('[data-id="'+v.id+'"]').css('fill','#ffdcd3')	
		} else if (v.positif > 1) {
			$('[data-id="'+v.id+'"]').css('fill','#ffeee9')	
		} else if (v.positif = 0) {
			$('[data-id="'+v.id+'"]').css('fill','#ffffff')	
		}
	})
})
function loadTooltip(d){
	var html = "";
    $.each(kabupaten,function(id,value) {
        if (value.id == d) {
            html += `<div style="max-width:300px">
            <h4 class='kasus' style="padding-bottom:5px">` + value.kabupaten + `</h4>
            <h4 style="font-weight:300">Positive :` + value.positif + `</h4>
            </div>`;
            $('.tooltip').html(html);
        }else{
            html += ``;
            $('.tooltip').html(html);
        }
    });
}
function changeLanguage(e) {
	var id = $(e).data('id')
	$('.country').attr('class','country')
	$('.id-content').hide()
	$('.en-content').hide()
	$('#'+id+'-country').attr('class','country active')
	$('.'+id+'-content').fadeIn('slow')
	window.history.pushState("", "", "http://localhost/newDataCorona/index.html?lg="+id+"");
	$('#id-country-dropdown').data('id',0)
	$('#en-country-dropdown').data('id',0)
	$('.dropdown').slideUp('slow');
}  
function dropdown(e) {
	if ($(e).data('id') != 1) {
	  $('.dropdown').slideDown('slow');
	  $(e).data('id',1)
	} else {
	  $('.dropdown').slideUp('slow');
	  $(e).data('id',0)
	}
}
$(document).ready(function() {
	var url = new URL(document.URL);
	var urlP = url.searchParams;
	var language = 'id';
	if (urlP.has('lg')) {
		language = urlP.get('lg')
	}
	$('.id-content').hide()
	$('.en-content').hide()
	$('#'+language+'-country').attr('class','country active')
	$('.'+language+'-content').fadeIn('slow')
	window.history.pushState("", "", "http://localhost/newDataCorona/index.html?lg="+language+"");
})