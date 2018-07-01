'use strict'
let ww = window.innerWidth,
	ftSize = (ww/1920)*100 + 'px';
document.documentElement.style.fontSize = ftSize;
window.onload = function(){
	let scroller_1 = $("#numList_1").scroller(50,3),
		scroller_2 = $("#numList_2").scroller(50,5),
		scroller_3 = $("#numList_3").scroller(50,3),
		scroller_4 = $("#numList_4").scroller(50,5),
		scroller_5 = $("#numList_5").scroller(34,3),
		scroller_6 = $("#numList_6").scroller(34,5),
		totalToday = $("#totalToday"),
		totalYear = $("#totalYear");

	let init_1 = 112,
		init_2 = 2337,
		init_3 = 39,
		init_4 = 1554,
		init_5 = 275,
		init_6 = 23371,
		init_today = 204,
		init_year = 2251,
		incres_1 = 0,
		incres_2 = 0;
	scroller_1.evaluate(init_1);
	scroller_2.evaluate(init_2);
	scroller_3.evaluate(init_3);
	scroller_4.evaluate(init_4);
	scroller_5.evaluate(init_5);
	scroller_6.evaluate(init_6);
	
	let t1 = setInterval(function(){
		incres_1 = Math.round(3*Math.random());
		if(incres_1!=0){
			init_1 += incres_1;
			init_2 += incres_1;
			scroller_1.evaluate(init_1);
			scroller_2.evaluate(init_2);
			init_today += incres_1;
			init_year += incres_1;
			totalToday.animateNumber({
				number:init_today
			});
			totalYear.animateNumber({
				number:init_year
			})
		}
	},3000),
	t2 = setInterval(()=>{
		incres_2 = Math.round(3*Math.random());
		if(incres_2!=0){
			init_3 += incres_2;
			init_4 += incres_2;
			scroller_3.evaluate(init_3);
			scroller_4.evaluate(init_4);
			init_today += incres_2;
			init_year += incres_2;
			totalToday.animateNumber({
				number:init_today
			});
			totalYear.animateNumber({
				number:init_year
			})
		}
	},5000),
	t3 = setInterval(()=>{
		let incres = Math.round(2*Math.random());
		init_6 += incres;
		scroller_6.evaluate(init_6);
	},3500);

	let circles = [];
	$(".circle-wrap .circle").each((i,el)=>{
		let value = parseInt($(el).text());
		$(el).attr("title",`  ${value}次  `);
		circles.push(value)
	});
	let circleMax = Math.max(...circles);
	$(".circle-wrap .circle").each((i,el)=>{
		let ratio = circles[i]/circleMax<0.45?0.45:circles[i]/circleMax;
		$(el).css("transform",`scale(${ratio}) translateY(${60*(1-ratio)}%)`);
	});
	$("#selectType").dropdownList();

	// 页面跳转
	$(document).on("click","[goto]",(e)=>{
		e.stopPropagation();
		let _this = e.currentTarget;
		let href = './pages/'+$(_this).attr("goto")+'.html';
		window.location.href = href
	});
	let isclick = true;
	$("#map").mousedown(()=>{
		let t = setTimeout(()=>{
			isclick = false
		},200)
	}).mouseup(()=>{
		if(isclick){
			window.location.href = './pages/stuff_analyse.html'
		};
		isclick = true
	});

	let chart_1 = echarts.init(document.getElementById("flow_1"));
	let chart_2 = echarts.init(document.getElementById("flow_2"));
	let option = {
	    series: [{
	        type: 'liquidFill',
	        radius:'95%',
	        color:['#5c52f3'],
	        itemStyle: {
	            opacity:1
	        },
	        emphasis: {
	            itemStyle: {
	                opacity: 0.9
	            }
	        },
	        outline:{
	        	borderDistance:2,
	        	itemStyle:{
	        		borderColor:'#5c52f3',
	        		borderWidth:1,
	        		shadowBlur:8
	        	}
	        },
	        backgroundStyle: {
	            color:'transparent'
	        },
	        label:{
	        	color:'#fff',
	        	fontSize:16,
	        	fontWeight:'normal'
	        },
	        animationDuration:1000,
	        animationDurationUpdate:1000,
	        period:3000,
	        data: [0.78]
	    }]
	};
	chart_1.setOption(option);
	option.series[0].color = ['#974dfa'];
	option.series[0].outline.itemStyle.borderColor = '#974dfa';
	option.series[0].data = [0.3];
	chart_2.setOption(option);

	(()=>{
		let map = new BMap.Map("map",{
			enableMapClick:false,
			enableHighResolution: true,
			minZoom:9,
			maxZoom:11
		});
		let mapZoom = 10;
		let mapStyle = [
		    //定义地图样式
		    {
		        "featureType": "all",
		        "elementType": "labels.text.stroke",
		        "stylers": {
		            "color": "#ffffff"
		        }
		    },
		    {
		        "featureType": "all",
		        "elementType": "labels.text.fill",
		        "stylers": {
		            "color": "#666666"
		        }
		    },
		    //城市主路
		    {
		        "featureType": "arterial",
		        "elementType": "geometry.fill",
		        "stylers": {
		            "color": "#00020b"
		        }
		    },
		    {
		        "featureType": "arterial",
		        "elementType": "geometry.stroke",
		        "stylers": {
		            "color": "#235872"
		        }
		    },
		    //普通道路
		    {
		        "featureType": "local",
		        "elementType": "geometry.fill",
		        "stylers": {
		            "color": "#060b0b",
		            "weight": "0.2"
		        }
		    },
		    {
		        "featureType": "local",
		        "elementType": "geometry.stroke",
		        "stylers": {
		            "color": "#124d61",
		            "weight": "0.2"
		        }
		    },
		    //高速及国道
		    {
		        "featureType": "highway",
		        "elementType": "geometry.fill",
		        "stylers": {
		            "color": "#000404"
		        }
		    },
		    {
		        "featureType": "highway",
		        "elementType": "geometry.stroke",
		        "stylers": {
		            "color": "#0b4660"
		        }
		    },
		    {
	            "featureType": "highway",
	            "elementType": "labels.icon",
	            "stylers": {
	              	"visibility": "off"
	            }
	  		},
	  		// 铁路
            {
                "featureType": "railway",
                "elementType": "geometry.fill",
                "stylers": {
		            "visibility": "off"
                }
            },
            {
                "featureType": "railway",
                "elementType": "geometry.stroke",
                "stylers": {
		            "visibility": "off"
                }
            },
		    //地铁
		    {
		        "featureType": "subway",
		        "elementType": "geometry.fill",
		        "stylers": {
		            "color": "#000404"
		        }
		    },
		    {
		        "featureType": "subway",
		        "elementType": "geometry.stroke",
		        "stylers": {
		            "color": "#0b4660",
		            "weight": "1.2"
		        }
		    },
		    //陆地
		    {
		        "featureType": "land",
		        "elementType": "geometry.fill",
		        "stylers": {
		            "color": "#07304a"
		        }
		    },
		    //水系
		    {
		        "featureType": "water",
		        "elementType": "geometry.fill",
		        "stylers": {
		            "color": "#000f36"
		        }
		    },
		    //绿地
		    {
		        "featureType": "green",
		        "elementType": "geometry.fill",
		        "stylers": {
		            "color": "#07304a"
		        }
		    },
		    //人造区域
		    {
		        "featureType": "manmade",
		        "elementType": "geometry.fill",
		        "stylers": {
		            "color": "#07304a"
		        }
		    },
		    //建筑物
		    {
		        "featureType": "building",
		        "elementType": "geometry.fill",
		        "stylers": {
		            "color": "#07304a"
		        }
		    },
		    {
		        "featureType": "building",
		        "elementType": "geometry.stroke",
		        "stylers": {
		            "color": "#07304a"
		        }
		    },
		    //兴趣点
		    {
		        "featureType": "poi",
		        "elementType": "labels",
		        "stylers": {
		            "visibility": "off"
		        }
		    },
		    //行政标注
		    {
		        "featureType": "label",
		        "elementType": "all",
		        "stylers": {
		            "color": "#060301",
		            "visibility": "off"
		        }
		    },
		    //边界线
		    {
		        "featureType": "boundary",
		        "elementType": "geometry",
		        "stylers": {
		            "color": "#fffd0d"
		        }
		    }
		];
		let mapCenter = new BMap.Point(121.47364,31.23667);
		map.centerAndZoom(mapCenter, mapZoom); //初始化地图
		map.disableContinuousZoom();
		map.setMapStyle({
		    styleJson: mapStyle
		});
		map.addEventListener("dragend", function() {
		    mapCenter = map.getCenter();
		    map.setCenter(mapCenter);
		});
		map.addEventListener("zoomend", function() {
		    mapZoom = map.getZoom();
		    map.setZoom(mapZoom);
		});
		map.enableInertialDragging(); //开启关系拖拽
		map.enableScrollWheelZoom(); //开启鼠标滚动缩放

		$.ajax({
			url:'./js/map_data.json',
			dataType:'json',
			success (data){
				let wrapper = [];
				for(let i of Object.keys(data)){
					data[i].forEach((item)=>{
						wrapper.push({
				            geometry: {
				                type: 'Point',
				                coordinates: [item.locale[0],item.locale[1]]
				            },
				            count:15
				        })
					})
				};
			    let dataSet = new mapv.DataSet(wrapper);
			    let options = {
			        size: 5,
			        gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
			        max: 100,
			        draw: 'heatmap'
			    };
			    let mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
			}
		})
		
	})();
	document.querySelector("body").style.opacity = 1
}
window.onresize = ()=>{
	let ww = window.innerWidth,
		ftSize = (ww/1920)*100 + 'px';
	document.documentElement.style.fontSize = ftSize;
}