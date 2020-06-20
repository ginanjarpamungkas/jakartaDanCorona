var tanggalChart1 = ["23/4/2020", "24/4/2020", "25/4/2020", "26/4/2020", "27/4/2020", "28/4/2020", "29/4/2020", "30/4/2020", "1/5/2020", "2/5/2020", "3/5/2020", "4/5/2020", "5/5/2020", "6/5/2020", "7/5/2020", "8/5/2020", "9/5/2020", "10/5/2020", "11/5/2020", "12/5/2020", "13/5/2020", "14/5/2020", "15/5/2020", "16/5/2020", "17/5/2020", "18/5/2020", "19/5/2020", "20/5/2020", "21/5/2020", "22/5/2020", "23/5/2020"]
var kasusBaruChart1 = [357, 436, 396, 275, 214, 415, 260, 347, 433, 292, 349, 395, 484, 367, 338, 336, 533, 387, 233, 484, 689, 568, 490, 529, 489, 496, 486, 693, 973, 634, 949]
var kasusSembuhChart1 =  [47, 42, 40, 65, 44, 103, 137, 131, 69, 74, 211, 78, 243, 120, 64, 113, 113, 91, 183, 182, 224, 231, 285, 108, 218, 195, 143, 108, 263, 219, 192]
var kasusMeninggalChart1 = [12, 42, 31, 23, 22, 8, 11, 8, 8, 31, 14, 19, 8, 23, 35, 13, 16, 14, 18, 16, 21, 15, 33, 13, 59, 43, 30, 21, 36, 48, 25]
var jumlahKumulatifChart1 = [357, 793, 1189, 1464, 1678, 2093, 2353, 2700, 3133, 3425, 3774, 4169, 4653, 5020, 5358, 5694, 6227, 6614, 6847, 7331, 8020, 8588, 9078, 9607, 10096, 10592, 11078, 11771, 12744, 13378, 14327]

var tanggalChart2 = ["5/6/2020", "6/6/2020", "7/6/2020", "8/6/2020", "9/6/2020", "10/6/2020", "11/6/2020", "12/6/2020", "13/6/2020", "14/6/2020", "15/6/2020", "16/6/2020", "17/6/2020"]
var kasusBaruChart2 =  [703, 993, 672, 847, 1043, 1240, 979, 1111, 1014, 857, 1017, 1106, 1031]
var kasusSembuhChart2 = [551, 464, 591, 406, 510, 715, 507, 577, 563, 755, 592, 580, 540]
var kasusMeninggalChart2 = [49, 31, 50, 32, 40, 36, 41, 48, 43, 43, 64, 33, 45]
var jumlahKumulatifChart2 = [703, 1696, 2368, 3215, 4258, 5498, 6477, 7588, 8602, 9459, 10476, 11582, 12613]

Highcharts.chart('container_chart1', {
    title: { style: {color: '#000'},text: 'Grafik Kenaikan Kasus' },
    subtitle: { style: {color: '#000'},text: 'Periode 23 April - 23 Mei 2020' },
    xAxis: {
        min:0,
        title: { style: {color: '#000'},text: 'Periode' },                        
        categories: tanggalChart1,
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
        data: kasusBaruChart1
    },{
        type: 'column',
        name: 'Sembuh',
        data: kasusSembuhChart1
    },{
        type: 'column',
        name: 'Meninggal',
        data: kasusMeninggalChart1
    },{
        type: 'line',
        name: 'Total',
        data: jumlahKumulatifChart1
    }]
});

Highcharts.chart('container_chart2', {
    title: { style: {color: '#000'},text: 'Grafik Kenaikan Kasus' },
    subtitle: { style: {color: '#000'},text: 'Periode 5 Juni - 17 Juni 2020' },
    xAxis: {
        min:0,
        title: { style: {color: '#000'},text: 'Periode' },                        
        categories: tanggalChart2,
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
        data: kasusBaruChart2
    },{
        type: 'column',
        name: 'Sembuh',
        data: kasusSembuhChart2
    },{
        type: 'column',
        name: 'Meninggal',
        data: kasusMeninggalChart2
    },{
        type: 'line',
        name: 'Total',
        data: jumlahKumulatifChart2
    }]
});