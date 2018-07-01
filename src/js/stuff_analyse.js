'use strict'
let ww = window.innerWidth,
	ftSize = (ww/1920)*100 + 'px';
document.documentElement.style.fontSize = ftSize;

window.onload = ()=>{
	let points = [];
	let chart = echarts.init(document.getElementById("mapShow"));
	let option = {
		bmap:{
			roam:true,
			center: [121.47594,31.2342],
			zoom: 11,
			enableMapClick:false,
			mapStyle:{
				'styleJson':[
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
				    {
                        "featureType": "arterial",
                        "elementType": "labels",
                        "stylers": {
	                        "visibility": "off"
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
			            "elementType": "labels",
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
				    {
                        "featureType": "subway",
                        "elementType": "labels",
                        "stylers": {
	                        "visibility": "off"
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
				]
			}
		},
		tooltip: {
	        show:false
	    },
	    visualMap: [{
	    	show:false,
            dimension:2,
            min: 1,
            max: 12,
            precision:0,
            inRange: {
                color:['green', '#eac736', '#d94e5d']
            },
            outOfRange: {
                color: ['#d94e5d']
            }
        }],
	    legend: {
	        show:false
	    },
	    series: [{
            name: '案件',
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbolSize:9,
            label: {
                show:false
            },
            zlevel:-1,
            z:0
        }/*,{
            name: '律所',
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbolSize:10,
            label: {
                show:false
            }
        },{
            name: '调解委员会',
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbolSize:10,
            label: {
                show:false
            },
            zlevel: 1
        }*/]
	};
	function ComplexCustomOverlay(data) {
	    this._point = new BMap.Point(data.locale[0],data.locale[1]);
	    this.name = data.name;
	    this.gender = data.gender;
	    this.tel = data.tel;
	    this.address = data.address;
	    this.date = data.date;
	    this.type = data.type;
	    this.img = data.img;
	    this.brief = data.brief
	}
	ComplexCustomOverlay.prototype = new BMap.Overlay();
	ComplexCustomOverlay.prototype.initialize = function(map) {
	    this._map = map;
	    let div = this._div = document.createElement("div");
	    $(div).addClass(`info-marker stuff`);
	    let inner = $('<i class="icon icon-map-flag"></i>');
	    inner.click(()=>{
	    	$("#thumbnail").prop("src",this.img);
	    	$("#name").html(this.name);
	    	$("#gender").html(this.gender);
	    	$("#phone").html(this.tel);
	    	$("#settle").html(this.address);
	    	$("#category").html(this.type);
	    	$("#date").html(this.date);
	    	$("#summarize").html(this.brief)
	    })
	    $(div).append(inner);
	    map.getPanes().labelPane.appendChild(div);
	    return div; //需将覆盖物对应的元素返回
	}
	ComplexCustomOverlay.prototype.draw = function() {
	    let map = this._map;
	    let pixel = map.pointToOverlayPixel(this._point);
	    this._div.style.left = pixel.x-this._div.clientWidth/2+"px";
	    this._div.style.top = pixel.y-this._div.clientHeight/2+"px";
	};
	$.getJSON('../js/map_data.json', function(origin) {
		origin['调解委员会'].forEach((item)=>{
			points.push({
    			name:item.name,
    			value:item.locale.concat(item.value)
    		})
		});
	    option.series[0].data = points;
	    chart.setOption(option);
	    //获取echart中使用的bmap实例
	    var map = chart.getModel().getComponent('bmap').getBMap();
	    map.disableDoubleClickZoom();
	    
	    $.getJSON('../js/person_data.json', function(data) {
	        data.forEach((item)=>{
	        	let overlay = new ComplexCustomOverlay(item);
	        	map.addOverlay(overlay)
	        })
	    })
	});

	/*function addMarker(map,data){
		let icon = '../images/icon_flag.png';
        let myIcon = new BMap.Icon(icon, new BMap.Size(59,45));
        let pt = new BMap.Point(data.locale[0], data.locale[1]);
        let marker = new BMap.Marker(pt,{
        	icon:myIcon,
        	title:(()=>{
        		return `${data.name}\n${data.address}`
        	})()
        });
        marker.addEventListener("click",(e)=>{
        	let _this = e.currentTarget;
        	$("#thumbnail").html(data.img);
        	$("#name").html(data.name);
        	$("#gender").html(data.gender);
        	$("#phone").html(data.tel);
        	$("#settle").html(data.address);
        	$("#category").html(data.type);
        	$("#date").html(data.date);
        	$("#summarize").html(data.brief)
        });
        markers.push(marker);
        //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
        let markerClusterer = new BMapLib.MarkerClusterer(map, {
            markers: markers
                //styles: styles,
                //minClusterSize: 1
        });
        map.addOverlay(markerClusterer);
	};*/
	let max = document.querySelector(".map-wrapper").getBoundingClientRect().bottom - document.getElementById("launch").getBoundingClientRect().top;
	$("#summarize").css("maxHeight",max-10);
	document.querySelector("body").style.opacity = 1
}
window.onresize = ()=>{
	let ww = window.innerWidth,
		ftSize = (ww/1920)*100 + 'px';
	document.documentElement.style.fontSize = ftSize;

	let max = document.querySelector(".map-wrapper").getBoundingClientRect().bottom - document.getElementById("launch").getBoundingClientRect().top;
	$("#summarize").css("maxHeight",max-10);
}