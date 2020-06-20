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
scene1Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step1Map1"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1.text('25 Maret - 28 Maret 2020')
						tgl1Mobile.text('25 Maret - 28 Maret 2020')
						jumlah1.text('152')
						jumlah1Mobile.text('152')
						tgl2.text('25 Maret - 28 Maret 2020')
						tgl2Mobile.text('25 Maret - 28 Maret 2020')
						jumlah2.text('152')
						jumlah2Mobile.text('152')
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
						tgl1.text('time range')
						tgl1Mobile.text('time range')
						jumlah1.text('0')
						jumlah1Mobile.text('0')
						tgl2.text('time range')
						tgl2Mobile.text('time range')
						jumlah2.text('0')
						jumlah2Mobile.text('0')
                        $('.desa').css('fill','#fff')
                    }).addTo(controller);
scene2Jakarta1 = new ScrollMagic.Scene({triggerElement: "#step2Map1"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1.text('28 Maret - 4 April 2020')
						tgl1Mobile.text('28 Maret - 4 April 2020')
						jumlah1.text('193')
						jumlah1Mobile.text('193')
						tgl2.text('28 Maret - 4 April 2020')
						tgl2Mobile.text('28 Maret - 4 April 2020')
						jumlah2.text('193')
						jumlah2Mobile.text('193')
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
						tgl1.text('25 Maret - 28 Maret 2020')
						tgl1Mobile.text('25 Maret - 28 Maret 2020')
						jumlah1.text('152')
						jumlah1Mobile.text('152')
						tgl2.text('25 Maret - 28 Maret 2020')
						tgl2Mobile.text('25 Maret - 28 Maret 2020')
						jumlah2.text('152')
						jumlah2Mobile.text('152')
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
						tgl1.text('4 April - 11 April 2020')
						tgl1Mobile.text('4 April - 11 April 2020')
						jumlah1.text('227')
						jumlah1Mobile.text('227')
						tgl2.text('4 April - 11 April 2020')
						tgl2Mobile.text('4 April - 11 April 2020')
						jumlah2.text('227')
						jumlah2Mobile.text('227')
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
						tgl1.text('28 Maret - 4 April 2020')
						tgl1Mobile.text('28 Maret - 4 April 2020')
						jumlah1.text('193')
						jumlah1Mobile.text('193')
						tgl2.text('28 Maret - 4 April 2020')
						tgl2Mobile.text('28 Maret - 4 April 2020')
						jumlah2.text('193')
						jumlah2Mobile.text('193')
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
						tgl1.text('11 April - 25 April 2020')
						tgl1Mobile.text('11 April - 25 April 2020')
						jumlah1.text('255')
						jumlah1Mobile.text('255')
						tgl2.text('11 April - 25 April 2020')
						tgl2Mobile.text('11 April - 25 April 2020')
						jumlah2.text('255')
						jumlah2Mobile.text('255')
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
						tgl1.text('4 April - 11 April 2020')
						tgl1Mobile.text('4 April - 11 April 2020')
						jumlah1.text('227')
						jumlah1Mobile.text('227')
						tgl2.text('4 April - 11 April 2020')
						tgl2Mobile.text('4 April - 11 April 2020')
						jumlah2.text('227')
						jumlah2Mobile.text('227')
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
						tgl1.text('25 April - 16 Mei 2020')
						tgl1Mobile.text('25 April - 16 Mei 2020')
						jumlah1.text('260')
						jumlah1Mobile.text('260')
						tgl2.text('25 April - 16 Mei 2020')
						tgl2Mobile.text('25 April - 16 Mei 2020')
						jumlah2.text('260')
						jumlah2Mobile.text('260')
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
						tgl1.text('11 April - 25 April 2020')
						tgl1Mobile.text('11 April - 25 April 2020')
						jumlah1.text('255')
						jumlah1Mobile.text('255')
						tgl2.text('11 April - 25 April 2020')
						tgl2Mobile.text('11 April - 25 April 2020')
						jumlah2.text('255')
						jumlah2Mobile.text('255')
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
						tgl1.text('16 Mei - 22 Mei 2020')
						tgl1Mobile.text('16 Mei - 22 Mei 2020')
						jumlah1.text('261')
						jumlah1Mobile.text('261')
						tgl2.text('16 Mei - 22 Mei 2020')
						tgl2Mobile.text('16 Mei - 22 Mei 2020')
						jumlah2.text('261')
						jumlah2Mobile.text('261')
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
						tgl1.text('25 April - 16 Mei 2020')
						tgl1Mobile.text('25 April - 16 Mei 2020')
						jumlah1.text('260')
						jumlah1Mobile.text('260')
						tgl2.text('25 April - 16 Mei 2020')
						tgl2Mobile.text('25 April - 16 Mei 2020')
						jumlah2.text('260')
						jumlah2Mobile.text('260')
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
    // textJakarta = gJakarta.selectAll("text").data(json.features).enter().append("svg:text").text(function(d){return d.properties.name;}).attr("x", function(d){return path.centroid(d)[0]+10;}).attr("y", function(d){if(d.properties.name == 'Jakarta Timur'){return path.centroid(d)[1]-18};return  path.centroid(d)[1];}).attr("text-anchor","middle").attr('font-size','10pt').attr('font-weight','bold').attr('class','desaText');
    jakarta2Mobile = gJakarta2Mobile.selectAll("path").data(json.features).enter().append("path").attr("d", pathMobile).attr("class", function(d) {return "desa desa-"+string_to_slug(d.properties.name)}).style("fill", '#fff').attr("stroke", "#000").attr("stroke-width", 0.2);
});

// scrollmagic and map here
pinJakarta2 = new ScrollMagic.Scene({triggerElement: '#pinJakarta2Trigger'}).triggerHook(0).on("enter",(e)=>{pinningJakarta2.css('position','fixed').css('top',0).css('bottom','unset')}).on("leave",(e)=>{pinningJakarta2.css('position','absolute').css('top',0).css('bottom','unset')}).addTo(controller);
endpinJakarta2 = new ScrollMagic.Scene({triggerElement: '#endpinJakarta2Trigger'}).triggerHook(1).on("enter",(e)=>{pinningJakarta2.css('position','absolute').css('top','unset').css('bottom',0)}).on("leave",(e)=>{pinningJakarta2.css('position','fixed').css('top',0).css('bottom','unset')}).addTo(controller);
scene1Jakarta2 = new ScrollMagic.Scene({triggerElement: "#step1Map2"}).triggerHook(1)
                    .on("enter",(e)=>{
						tgl1.text('22 Mei - 5 Juni 2020')
						tgl1Mobile.text('22 Mei - 5 Juni 2020')
						jumlah1.text('261')
						jumlah1Mobile.text('261')
						tgl2.text('22 Mei - 5 Juni 2020')
						tgl2Mobile.text('22 Mei - 5 Juni 2020')
						jumlah2.text('261')
						jumlah2Mobile.text('261')
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
						tgl1.text('16 Mei - 22 Mei 2020')
						tgl1Mobile.text('16 Mei - 22 Mei 2020')
						jumlah1.text('261')
						jumlah1Mobile.text('261')
						tgl2.text('16 Mei - 22 Mei 2020')
						tgl2Mobile.text('16 Mei - 22 Mei 2020')
						jumlah2.text('261')
						jumlah2Mobile.text('261')
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
						tgl1.text('5 Juni - 19 Juni 2020')
						tgl1Mobile.text('5 Juni - 19 Juni 2020')
						jumlah1.text('263')
						jumlah1Mobile.text('263')
						tgl2.text('5 Juni - 19 Juni 2020')
						tgl2Mobile.text('5 Juni - 19 Juni 2020')
						jumlah2.text('263')
						jumlah2Mobile.text('263')
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
						tgl1.text('22 Mei - 5 Juni 2020')
						tgl1Mobile.text('22 Mei - 5 Juni 2020')
						jumlah1.text('261')
						jumlah1Mobile.text('261')
						tgl2.text('22 Mei - 5 Juni 2020')
						tgl2Mobile.text('22 Mei - 5 Juni 2020')
						jumlah2.text('261')
						jumlah2Mobile.text('261')
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
d3.csv('dataProvinsiIndonesia.csv',function(csv){
	$.each(csv, function(id,v) {
		if (v.Kabupaten == 1) {
			$('[data-title="'+v.Provinsi+'"]').css('fill','#cc0000')	
		} else {
			$('[data-title="'+v.Provinsi+'"]').css('fill','#ffffff')	
		}
	})
})
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
            <h4 style="font-weight:300">Positif :` + value.positif + `</h4>
            </div>`;
            $('.tooltip').html(html);
        }else{
            html += ``;
            $('.tooltip').html(html);
        }
    });
}