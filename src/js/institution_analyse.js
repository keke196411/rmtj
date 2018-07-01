'use strict'
let ww = window.innerWidth,
	ftSize = (ww/1920)*100 + 'px';
document.documentElement.style.fontSize = ftSize;
window.onload = ()=>{
	let lawData = [],
		judData = [],
		medData = [];
	let chart = echarts.init(document.getElementById("mapShow"));
	let option = {
		bmap:{
			roam:true,
			center: [121.47594,31.2342],
			zoom: 12,
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
	        trigger: 'item',
	        formatter (a){
	        	return `${a.name}<br>地址: ${a.value[4]}<br>电话: ${a.value[3]}`
	        }
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
	        selectedMode: 'single',
	        orient: 'vertical',
	        top:22,
	        left:22,
	        inactiveColor:'#a8c9ee',
	        data: [ '司法所','律所','调解委员会'],
	        textStyle: {
	            color: '#fff',
	            fontSize:14
	        }
	    },
	    series: [{
            name: '司法所',
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbolSize:10,
            label: {
                show:false
            }
        },{
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
        }]
	};
	function ComplexCustomOverlay(data,type) {
	    this._point = new BMap.Point(data.locale[0],data.locale[1]);
	    this._name = data.name;
	    this._tel = data.tel;
	    this._address = data.address;
	    this._data = data.value;
	    this._type = type
	}
	ComplexCustomOverlay.prototype = new BMap.Overlay();
	ComplexCustomOverlay.prototype.initialize = function(map) {
	    this._map = map;
	    let icon,cate;
	    switch(this._type){
	    	case '村居法律顾问':
	    		icon = 'red-house';
	    		break
			case '律所':
				icon = 'blue-house';
				break
			case '司法所':
				icon = 'yellow-house';
				break
			case '调解委员会':
		 		icon = 'purple-house';
	    };
	    let div = this._div = document.createElement("div");
	    $(div).addClass(`info-marker`).attr("type",this._type);
	    let inner = `<i class="icon icon-${icon} ${this._type=="司法所"?'':"hide"}"></i>
					<div class="indicator">
						<img src="${this._data}">
						<h2>${this._name}</h2>
						<p>地址: ${this._address}</p>
						<p>电话: ${this._tel}</p>
					</div>`
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
	$.getJSON('../js/map_data.json', function(data) {
	    let origin = data['律所'];
    	origin.forEach((item)=>{
    		lawData.push({
    			name:item.name,
    			value:item.locale.concat(item.value,item.tel,item.address)
    		})
    	});
    	origin = data['司法所'];
    	origin.forEach((item)=>{
    		judData.push({
    			name:item.name,
    			value:item.locale.concat(item.value,item.tel,item.address)
    		})

    	});
    	console.log(judData)
    	origin = data['调解委员会'];
    	origin.forEach((item)=>{
    		medData.push({
    			name:item.name,
    			value:item.locale.concat(item.value,item.tel,item.address)
    		})
    	});
	    option.series[0].data = judData;
	    option.series[1].data = lawData;
	    option.series[2].data = medData;
	    chart.setOption(option);
	    chart.on("legendselectchanged",(d)=>{
	    	$(".info-marker").addClass("hide").filter(function(){
	    		return $(this).attr("type")==d.name
	    	}).removeClass("hide");
	    })
	    // console.log(option);
	    //获取echart中使用的bmap实例
	    var map = chart.getModel().getComponent('bmap').getBMap();
	    map.disableDoubleClickZoom();
	    
	    $.getJSON('../js/institute_data.json',(data)=>{
	    	for(let j of Object.keys(data)){
	    		data[j].forEach((item)=>{
	    			let overlay = new ComplexCustomOverlay(item,j);
	    			map.addOverlay(overlay)
	    		})
	    	}
	    })
	});
	document.querySelector("body").style.opacity = 1
}
window.onresize = ()=>{
	let ww = window.innerWidth,
		ftSize = (ww/1920)*100 + 'px';
	document.documentElement.style.fontSize = ftSize;
}