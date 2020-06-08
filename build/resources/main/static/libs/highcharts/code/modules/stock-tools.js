/*
 Highcharts JS v7.1.0 (2019-04-01)

 Advanced Highstock tools

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(l){"object"===typeof module&&module.exports?(l["default"]=l,module.exports=l):"function"===typeof define&&define.amd?define("highcharts/modules/stock-tools",["highcharts","highcharts/modules/stock"],function(n){l(n);l.Highcharts=n;return l}):l("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(l){function n(f,m,l,v){f.hasOwnProperty(m)||(f[m]=v.apply(null,l))}l=l?l._modules:{};n(l,"modules/stock-tools-bindings.js",[l["parts/Globals.js"]],function(f){var m=f.fireEvent,l=f.defined,
v=f.pick,n=f.extend,k=f.merge,t=f.isNumber,p=f.correctFloat,e=f.NavigationBindings.prototype.utils;e.addFlagFromForm=function(a){return function(b){var c=this,d=c.chart,h=d.stockTools,g=e.getFieldType;b=e.attractToPoint(b,d);var w={type:"flags",onSeries:b.series.id,shape:a,data:[{x:b.x,y:b.y}],point:{events:{click:function(){var b=this,a=b.options;m(c,"showPopup",{point:b,formType:"annotation-toolbar",options:{langKey:"flags",type:"flags",title:[a.title,g(a.title)],name:[a.name,g(a.name)]},onSubmit:function(a){"remove"===
a.actionType?b.remove():b.update(c.fieldsToOptions(a.fields,{}))}})}}}};h&&h.guiEnabled||d.addSeries(w);m(c,"showPopup",{formType:"flag",options:{langKey:"flags",type:"flags",title:["A",g("A")],name:["Flag A",g("Flag A")]},onSubmit:function(b){c.fieldsToOptions(b.fields,w.data[0]);d.addSeries(w)}})}};e.manageIndicators=function(a){var b=this.chart,c={linkedTo:a.linkedTo,type:a.type},d=["ad","cmf","mfi","vbp","vwap"],h="ad atr cci cmf macd mfi roc rsi vwap ao aroon aroonoscillator trix apo dpo ppo natr williamsr stochastic linearRegression linearRegressionSlope linearRegressionIntercept linearRegressionAngle".split(" "),
g;if("edit"===a.actionType)this.fieldsToOptions(a.fields,c),(a=b.get(a.seriesId))&&a.update(c,!1);else if("remove"===a.actionType){if(a=b.get(a.seriesId))g=a.yAxis,a.linkedSeries&&a.linkedSeries.forEach(function(b){b.remove(!1)}),a.remove(!1),0<=h.indexOf(a.type)&&(g.remove(!1),this.resizeYAxes())}else c.id=f.uniqueKey(),this.fieldsToOptions(a.fields,c),0<=h.indexOf(a.type)?(g=b.addAxis({id:f.uniqueKey(),offset:0,opposite:!0,title:{text:""},tickPixelInterval:40,showLastLabel:!1,labels:{align:"left",
y:-2}},!1,!1),c.yAxis=g.options.id,this.resizeYAxes()):c.yAxis=b.get(a.linkedTo).options.yAxis,0<=d.indexOf(a.type)&&(c.params.volumeSeriesID=b.series.filter(function(b){return"column"===b.options.type})[0].options.id),b.addSeries(c,!1);m(this,"deselectButton",{button:this.selectedButtonElement});b.redraw()};e.updateHeight=function(a,b){b.update({typeOptions:{height:this.chart.yAxis[0].toValue(a.chartY)-b.options.typeOptions.points[1].y}})};e.attractToPoint=function(a,b){var c=b.xAxis[0].toValue(a.chartX);
a=b.yAxis[0].toValue(a.chartY);var d=Number.MAX_VALUE,h;b.series.forEach(function(b){b.points.forEach(function(b){b&&d>Math.abs(b.x-c)&&(d=Math.abs(b.x-c),h=b)})});return{x:h.x,y:h.y,below:a<h.y,series:h.series,xAxis:h.series.xAxis.index||0,yAxis:h.series.yAxis.index||0}};e.isNotNavigatorYAxis=function(a){return"highcharts-navigator-yaxis"!==a.userOptions.className};e.updateNthPoint=function(a){return function(b,c){var d=c.options.typeOptions,h=this.chart.xAxis[0].toValue(b.chartX),g=this.chart.yAxis[0].toValue(b.chartY);
d.points.forEach(function(b,c){c>=a&&(b.x=h,b.y=g)});c.update({typeOptions:{points:d.points}})}};n(f.NavigationBindings.prototype,{getYAxisPositions:function(a,b,c){function d(b){return l(b)&&!t(b)&&b.match("%")}var h=0;a=a.map(function(a){var g=d(a.options.height)?parseFloat(a.options.height)/100:a.height/b;a=d(a.options.top)?parseFloat(a.options.top)/100:p(a.top-a.chart.plotTop)/b;t(g)||(g=c/100);h=p(h+g);return{height:100*g,top:100*a}});a.allAxesHeight=h;return a},getYAxisResizers:function(a){var b=
[];a.forEach(function(c,d){c=a[d+1];b[d]=c?{enabled:!0,controlledAxis:{next:[v(c.options.id,c.options.index)]}}:{enabled:!1}});return b},resizeYAxes:function(a){a=a||20;var b=this.chart,c=b.yAxis.filter(this.utils.isNotNavigatorYAxis),d=c.length,b=this.getYAxisPositions(c,b.plotHeight,a),h=this.getYAxisResizers(c),g=b.allAxesHeight,f=a;1<g?(6>d?(b[0].height=p(b[0].height-f),b=this.recalculateYAxisPositions(b,f)):(a=100/d,b=this.recalculateYAxisPositions(b,a/(d-1),!0,-1)),b[d-1]={top:p(100-a),height:a}):
(f=100*p(1-g),5>d?(b[0].height=p(b[0].height+f),b=this.recalculateYAxisPositions(b,f)):b=this.recalculateYAxisPositions(b,f/d,!0,1));b.forEach(function(b,a){c[a].update({height:b.height+"%",top:b.top+"%",resize:h[a]},!1)})},recalculateYAxisPositions:function(a,b,c,d){a.forEach(function(h,g){g=a[g-1];h.top=g?p(g.height+g.top):0;c&&(h.height=p(h.height+d*b))});return a}});n={segment:{className:"highcharts-segment",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);
var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"segment",type:"crookedLine",typeOptions:{points:[{x:b,y:a},{x:b,y:a}]}},c.annotationsOptions,d.crookedLine&&d.crookedLine.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1)]},arrowSegment:{className:"highcharts-arrow-segment",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"arrowSegment",
type:"crookedLine",typeOptions:{line:{markerEnd:"arrow"},points:[{x:b,y:a},{x:b,y:a}]}},c.annotationsOptions,d.crookedLine&&d.crookedLine.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1)]},ray:{className:"highcharts-ray",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"ray",type:"crookedLine",typeOptions:{type:"ray",points:[{x:b,y:a},{x:b,y:a}]}},
c.annotationsOptions,d.crookedLine&&d.crookedLine.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1)]},arrowRay:{className:"highcharts-arrow-ray",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"arrowRay",type:"infinityLine",typeOptions:{type:"ray",line:{markerEnd:"arrow"},points:[{x:b,y:a},{x:b,y:a}]}},c.annotationsOptions,d.infinityLine&&d.infinityLine.annotationsOptions);
return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1)]},infinityLine:{className:"highcharts-infinity-line",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"infinityLine",type:"infinityLine",typeOptions:{type:"line",points:[{x:b,y:a},{x:b,y:a}]}},c.annotationsOptions,d.infinityLine&&d.infinityLine.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1)]},
arrowInfinityLine:{className:"highcharts-arrow-infinity-line",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"arrowInfinityLine",type:"infinityLine",typeOptions:{type:"line",line:{markerEnd:"arrow"},points:[{x:b,y:a},{x:b,y:a}]}},c.annotationsOptions,d.infinityLine&&d.infinityLine.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1)]},horizontalLine:{className:"highcharts-horizontal-line",
start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"horizontalLine",type:"infinityLine",typeOptions:{type:"horizontalLine",points:[{x:b,y:a}]}},c.annotationsOptions,d.infinityLine&&d.infinityLine.annotationsOptions);this.chart.addAnnotation(b)}},verticalLine:{className:"highcharts-vertical-line",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);
var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"verticalLine",type:"infinityLine",typeOptions:{type:"verticalLine",points:[{x:b,y:a}]}},c.annotationsOptions,d.infinityLine&&d.infinityLine.annotationsOptions);this.chart.addAnnotation(b)}},crooked3:{className:"highcharts-crooked3",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"crooked3",type:"crookedLine",typeOptions:{points:[{x:b,
y:a},{x:b,y:a},{x:b,y:a}]}},c.annotationsOptions,d.crookedLine&&d.crookedLine.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1),e.updateNthPoint(2)]},crooked5:{className:"highcharts-crooked5",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"crookedLine",type:"crookedLine",typeOptions:{points:[{x:b,y:a},{x:b,y:a},{x:b,y:a},{x:b,y:a},{x:b,y:a}]}},c.annotationsOptions,
d.crookedLine&&d.crookedLine.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1),e.updateNthPoint(2),e.updateNthPoint(3),e.updateNthPoint(4)]},elliott3:{className:"highcharts-elliott3",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"elliott3",type:"elliottWave",typeOptions:{points:[{x:b,y:a},{x:b,y:a},{x:b,y:a},{x:b,y:a}]},labelOptions:{style:{color:"#666666"}}},
c.annotationsOptions,d.elliottWave&&d.elliottWave.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1),e.updateNthPoint(2),e.updateNthPoint(3)]},elliott5:{className:"highcharts-elliott5",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"elliott5",type:"elliottWave",typeOptions:{points:[{x:b,y:a},{x:b,y:a},{x:b,y:a},{x:b,y:a},{x:b,y:a},{x:b,y:a}]},labelOptions:{style:{color:"#666666"}}},
c.annotationsOptions,d.elliottWave&&d.elliottWave.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1),e.updateNthPoint(2),e.updateNthPoint(3),e.updateNthPoint(4),e.updateNthPoint(5)]},measureX:{className:"highcharts-measure-x",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"measure",type:"measure",typeOptions:{selectType:"x",point:{x:b,y:a,xAxis:0,
yAxis:0},crosshairX:{strokeWidth:1,stroke:"#000000"},crosshairY:{enabled:!1,strokeWidth:0,stroke:"#000000"},background:{width:0,height:0,strokeWidth:0,stroke:"#ffffff",fill:"red"}},labelOptions:{style:{color:"#666666"}}},c.annotationsOptions,d.measure&&d.measure.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateRectSize]},measureY:{className:"highcharts-measure-y",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,
d=c&&c.bindings,b=k({langKey:"measure",type:"measure",typeOptions:{selectType:"y",point:{x:b,y:a,xAxis:0,yAxis:0},crosshairX:{enabled:!1,strokeWidth:0,stroke:"#000000"},crosshairY:{strokeWidth:1,stroke:"#000000"},background:{width:0,height:0,strokeWidth:0,stroke:"#ffffff"}},labelOptions:{style:{color:"#666666"}}},c.annotationsOptions,d.measure&&d.measure.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateRectSize]},measureXY:{className:"highcharts-measure-xy",start:function(a){var b=
this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"measure",type:"measure",typeOptions:{selectType:"xy",point:{x:b,y:a,xAxis:0,yAxis:0},background:{width:0,height:0,strokeWidth:10},crosshairX:{strokeWidth:1,stroke:"#000000"},crosshairY:{strokeWidth:1,stroke:"#000000"}},labelOptions:{style:{color:"#666666"}}},c.annotationsOptions,d.measure&&d.measure.annotationsOptions);return this.chart.addAnnotation(b)},
steps:[e.updateRectSize]},fibonacci:{className:"highcharts-fibonacci",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"fibonacci",type:"fibonacci",typeOptions:{points:[{x:b,y:a},{x:b,y:a}]},labelOptions:{style:{color:"#666666"}}},c.annotationsOptions,d.fibonacci&&d.fibonacci.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1),e.updateHeight]},parallelChannel:{className:"highcharts-parallel-channel",
start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"parallelChannel",type:"tunnel",typeOptions:{points:[{x:b,y:a},{x:b,y:a}]}},c.annotationsOptions,d.tunnel&&d.tunnel.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1),e.updateHeight]},pitchfork:{className:"highcharts-pitchfork",start:function(a){var b=this.chart.xAxis[0].toValue(a.chartX);a=this.chart.yAxis[0].toValue(a.chartY);
var c=this.chart.options.navigation,d=c&&c.bindings,b=k({langKey:"pitchfork",type:"pitchfork",typeOptions:{points:[{x:b,y:a,controlPoint:{style:{fill:"red"}}},{x:b,y:a},{x:b,y:a}],innerBackground:{fill:"rgba(100, 170, 255, 0.8)"}},shapeOptions:{strokeWidth:2}},c.annotationsOptions,d.pitchfork&&d.pitchfork.annotationsOptions);return this.chart.addAnnotation(b)},steps:[e.updateNthPoint(1),e.updateNthPoint(2)]},verticalCounter:{className:"highcharts-vertical-counter",start:function(a){a=e.attractToPoint(a,
this.chart);var b=this.chart.options.navigation,c=b&&b.bindings,d=l(this.verticalCounter)?this.verticalCounter:0;a=k({langKey:"verticalCounter",type:"verticalLine",typeOptions:{point:{x:a.x,y:a.y,xAxis:a.xAxis,yAxis:a.yAxis},label:{offset:a.below?40:-40,text:d.toString()}},labelOptions:{style:{color:"#666666",fontSize:"11px"}},shapeOptions:{stroke:"rgba(0, 0, 0, 0.75)",strokeWidth:1}},b.annotationsOptions,c.verticalLine&&c.verticalLine.annotationsOptions);a=this.chart.addAnnotation(a);a.options.events.click.call(a,
{})}},verticalLabel:{className:"highcharts-vertical-label",start:function(a){a=e.attractToPoint(a,this.chart);var b=this.chart.options.navigation,c=b&&b.bindings;a=k({langKey:"verticalLabel",type:"verticalLine",typeOptions:{point:{x:a.x,y:a.y,xAxis:a.xAxis,yAxis:a.yAxis},label:{offset:a.below?40:-40}},labelOptions:{style:{color:"#666666",fontSize:"11px"}},shapeOptions:{stroke:"rgba(0, 0, 0, 0.75)",strokeWidth:1}},b.annotationsOptions,c.verticalLine&&c.verticalLine.annotationsOptions);a=this.chart.addAnnotation(a);
a.options.events.click.call(a,{})}},verticalArrow:{className:"highcharts-vertical-arrow",start:function(a){a=e.attractToPoint(a,this.chart);var b=this.chart.options.navigation,c=b&&b.bindings;a=k({langKey:"verticalArrow",type:"verticalLine",typeOptions:{point:{x:a.x,y:a.y,xAxis:a.xAxis,yAxis:a.yAxis},label:{offset:a.below?40:-40,format:" "},connector:{fill:"none",stroke:a.below?"red":"green"}},shapeOptions:{stroke:"rgba(0, 0, 0, 0.75)",strokeWidth:1}},b.annotationsOptions,c.verticalLine&&c.verticalLine.annotationsOptions);
a=this.chart.addAnnotation(a);a.options.events.click.call(a,{})}},flagCirclepin:{className:"highcharts-flag-circlepin",start:e.addFlagFromForm("circlepin")},flagDiamondpin:{className:"highcharts-flag-diamondpin",start:e.addFlagFromForm("flag")},flagSquarepin:{className:"highcharts-flag-squarepin",start:e.addFlagFromForm("squarepin")},flagSimplepin:{className:"highcharts-flag-simplepin",start:e.addFlagFromForm("nopin")},zoomX:{className:"highcharts-zoom-x",init:function(a){this.chart.update({chart:{zoomType:"x"}});
m(this,"deselectButton",{button:a})}},zoomY:{className:"highcharts-zoom-y",init:function(a){this.chart.update({chart:{zoomType:"y"}});m(this,"deselectButton",{button:a})}},zoomXY:{className:"highcharts-zoom-xy",init:function(a){this.chart.update({chart:{zoomType:"xy"}});m(this,"deselectButton",{button:a})}},seriesTypeLine:{className:"highcharts-series-type-line",init:function(a){this.chart.series[0].update({type:"line",useOhlcData:!0});m(this,"deselectButton",{button:a})}},seriesTypeOhlc:{className:"highcharts-series-type-ohlc",
init:function(a){this.chart.series[0].update({type:"ohlc"});m(this,"deselectButton",{button:a})}},seriesTypeCandlestick:{className:"highcharts-series-type-candlestick",init:function(a){this.chart.series[0].update({type:"candlestick"});m(this,"deselectButton",{button:a})}},fullScreen:{className:"highcharts-full-screen",init:function(a){var b=this.chart;b.fullScreen=new f.FullScreen(b.container);m(this,"deselectButton",{button:a})}},currentPriceIndicator:{className:"highcharts-current-price-indicator",
init:function(a){var b=this.chart.series[0],c=b.options,d=c.lastVisiblePrice&&c.lastVisiblePrice.enabled,c=c.lastPrice&&c.lastPrice.enabled,h=this.chart.stockTools;h&&h.guiEnabled&&(a.firstChild.style["background-image"]=c?'url("'+h.options.iconsURL+'current-price-show.svg")':'url("'+h.options.iconsURL+'current-price-hide.svg")');b.update({lastPrice:{enabled:!c,color:"red"},lastVisiblePrice:{enabled:!d,label:{enabled:!0}}});m(this,"deselectButton",{button:a})}},indicators:{className:"highcharts-indicators",
init:function(){var a=this;m(a,"showPopup",{formType:"indicators",options:{},onSubmit:function(b){a.utils.manageIndicators.call(a,b)}})}},toggleAnnotations:{className:"highcharts-toggle-annotations",init:function(a){var b=this.chart.stockTools;this.toggledAnnotations=!this.toggledAnnotations;(this.chart.annotations||[]).forEach(function(b){b.setVisibility(!this.toggledAnnotations)},this);b&&b.guiEnabled&&(a.firstChild.style["background-image"]=this.toggledAnnotations?'url("'+b.options.iconsURL+'annotations-hidden.svg")':
'url("'+b.options.iconsURL+'annotations-visible.svg")');m(this,"deselectButton",{button:a})}},saveChart:{className:"highcharts-save-chart",init:function(a){var b=this,c=b.chart,d=[],h=[],g=[],e=[];c.annotations.forEach(function(b,a){d[a]=b.userOptions});c.series.forEach(function(b){b instanceof f.seriesTypes.sma?h.push(b.userOptions):"flags"===b.type&&g.push(b.userOptions)});c.yAxis.forEach(function(a){b.utils.isNotNavigatorYAxis(a)&&e.push(a.options)});f.win.localStorage.setItem("highcharts-chart",
JSON.stringify({annotations:d,indicators:h,flags:g,yAxes:e}));m(this,"deselectButton",{button:a})}}};f.setOptions({navigation:{bindings:n}})});n(l,"modules/stock-tools-gui.js",[l["parts/Globals.js"]],function(f){var m=f.addEvent,l=f.createElement,n=f.pick,x=f.isArray,k=f.fireEvent,t=f.getStyle,p=f.merge,e=f.css,a=f.win;f.setOptions({lang:{stockTools:{gui:{simpleShapes:"Simple shapes",lines:"Lines",crookedLines:"Crooked lines",measure:"Measure",advanced:"Advanced",toggleAnnotations:"Toggle annotations",
verticalLabels:"Vertical labels",flags:"Flags",zoomChange:"Zoom change",typeChange:"Type change",saveChart:"Save chart",indicators:"Indicators",currentPriceIndicator:"Current Price Indicators",zoomX:"Zoom X",zoomY:"Zoom Y",zoomXY:"Zooom XY",fullScreen:"Fullscreen",typeOHLC:"OHLC",typeLine:"Line",typeCandlestick:"Candlestick",circle:"Circle",label:"Label",rectangle:"Rectangle",flagCirclepin:"Flag circle",flagDiamondpin:"Flag diamond",flagSquarepin:"Flag square",flagSimplepin:"Flag simple",measureXY:"Measure XY",
measureX:"Measure X",measureY:"Measure Y",segment:"Segment",arrowSegment:"Arrow segment",ray:"Ray",arrowRay:"Arrow ray",line:"Line",arrowLine:"Arrow line",horizontalLine:"Horizontal line",verticalLine:"Vertical line",infinityLine:"Infinity line",crooked3:"Crooked 3 line",crooked5:"Crooked 5 line",elliott3:"Elliott 3 line",elliott5:"Elliott 5 line",verticalCounter:"Vertical counter",verticalLabel:"Vertical label",verticalArrow:"Vertical arrow",fibonacci:"Fibonacci",pitchfork:"Pitchfork",parallelChannel:"Parallel channel"}},
navigation:{popup:{circle:"Circle",rectangle:"Rectangle",label:"Label",segment:"Segment",arrowSegment:"Arrow segment",ray:"Ray",arrowRay:"Arrow ray",line:"Line",arrowLine:"Arrow line",horizontalLine:"Horizontal line",verticalLine:"Vertical line",crooked3:"Crooked 3 line",crooked5:"Crooked 5 line",elliott3:"Elliott 3 line",elliott5:"Elliott 5 line",verticalCounter:"Vertical counter",verticalLabel:"Vertical label",verticalArrow:"Vertical arrow",fibonacci:"Fibonacci",pitchfork:"Pitchfork",parallelChannel:"Parallel channel",
infinityLine:"Infinity line",measure:"Measure",measureXY:"Measure XY",measureX:"Measure X",measureY:"Measure Y",flags:"Flags",addButton:"add",saveButton:"save",editButton:"edit",removeButton:"remove",series:"Series",volume:"Volume",connector:"Connector",innerBackground:"Inner background",outerBackground:"Outer background",crosshairX:"Crosshair X",crosshairY:"Crosshair Y",tunnel:"Tunnel",background:"Background"}}},stockTools:{gui:{enabled:!0,className:"highcharts-bindings-wrapper",toolbarClassName:"stocktools-toolbar",
iconsURL:"https://code.highcharts.com/7.1.0/gfx/stock-icons/",buttons:"indicators separator simpleShapes lines crookedLines measure advanced toggleAnnotations separator verticalLabels flags separator zoomChange fullScreen typeChange separator currentPriceIndicator saveChart".split(" "),definitions:{separator:{symbol:"separator.svg"},simpleShapes:{items:["label","circle","rectangle"],circle:{symbol:"circle.svg"},rectangle:{symbol:"rectangle.svg"},label:{symbol:"label.svg"}},flags:{items:["flagCirclepin",
"flagDiamondpin","flagSquarepin","flagSimplepin"],flagSimplepin:{symbol:"flag-basic.svg"},flagDiamondpin:{symbol:"flag-diamond.svg"},flagSquarepin:{symbol:"flag-trapeze.svg"},flagCirclepin:{symbol:"flag-elipse.svg"}},lines:{items:"segment arrowSegment ray arrowRay line arrowLine horizontalLine verticalLine".split(" "),segment:{symbol:"segment.svg"},arrowSegment:{symbol:"arrow-segment.svg"},ray:{symbol:"ray.svg"},arrowRay:{symbol:"arrow-ray.svg"},line:{symbol:"line.svg"},arrowLine:{symbol:"arrow-line.svg"},
verticalLine:{symbol:"vertical-line.svg"},horizontalLine:{symbol:"horizontal-line.svg"}},crookedLines:{items:["elliott3","elliott5","crooked3","crooked5"],crooked3:{symbol:"crooked-3.svg"},crooked5:{symbol:"crooked-5.svg"},elliott3:{symbol:"elliott-3.svg"},elliott5:{symbol:"elliott-5.svg"}},verticalLabels:{items:["verticalCounter","verticalLabel","verticalArrow"],verticalCounter:{symbol:"vertical-counter.svg"},verticalLabel:{symbol:"vertical-label.svg"},verticalArrow:{symbol:"vertical-arrow.svg"}},
advanced:{items:["fibonacci","pitchfork","parallelChannel"],pitchfork:{symbol:"pitchfork.svg"},fibonacci:{symbol:"fibonacci.svg"},parallelChannel:{symbol:"parallel-channel.svg"}},measure:{items:["measureXY","measureX","measureY"],measureX:{symbol:"measure-x.svg"},measureY:{symbol:"measure-y.svg"},measureXY:{symbol:"measure-xy.svg"}},toggleAnnotations:{symbol:"annotations-visible.svg"},currentPriceIndicator:{symbol:"current-price-show.svg"},indicators:{symbol:"indicators.svg"},zoomChange:{items:["zoomX",
"zoomY","zoomXY"],zoomX:{symbol:"zoom-x.svg"},zoomY:{symbol:"zoom-y.svg"},zoomXY:{symbol:"zoom-xy.svg"}},typeChange:{items:["typeOHLC","typeLine","typeCandlestick"],typeOHLC:{symbol:"series-ohlc.svg"},typeLine:{symbol:"series-line.svg"},typeCandlestick:{symbol:"series-candlestick.svg"}},fullScreen:{symbol:"fullscreen.svg"},saveChart:{symbol:"save-chart.svg"}}}}});m(f.Chart,"afterGetContainer",function(){this.setStockTools()});m(f.Chart,"getMargins",function(){var b=this.stockTools&&this.stockTools.listWrapper;
(b=b&&(b.startWidth+f.getStyle(b,"padding-left")+f.getStyle(b,"padding-right")||b.offsetWidth))&&b<this.plotWidth&&(this.plotLeft+=b)});m(f.Chart,"destroy",function(){this.stockTools&&this.stockTools.destroy()});m(f.Chart,"redraw",function(){this.stockTools&&this.stockTools.guiEnabled&&this.stockTools.redraw()});f.Toolbar=function(b,a,d){this.chart=d;this.options=b;this.lang=a;this.guiEnabled=b.enabled;this.visible=n(b.visible,!0);this.placed=n(b.placed,!1);this.eventsToUnbind=[];this.guiEnabled&&
(this.createHTML(),this.init(),this.showHideNavigatorion());k(this,"afterInit")};f.extend(f.Chart.prototype,{setStockTools:function(b){var a=this.options,d=a.lang;b=p(a.stockTools&&a.stockTools.gui,b&&b.gui);this.stockTools=new f.Toolbar(b,d.stockTools&&d.stockTools.gui,this);this.stockTools.guiEnabled&&(this.isDirtyBox=!0)}});f.Toolbar.prototype={init:function(){var b=this,a=this.lang,d=this.options,h=this.toolbar,g=b.addSubmenu,f=d.buttons,e=d.definitions,l=h.childNodes,k=this.inIframe(),n;f.forEach(function(c){n=
b.addButton(h,e,c,a);k&&"fullScreen"===c&&(n.buttonWrapper.className+=" highcharts-disabled-btn");["click","touchstart"].forEach(function(a){m(n.buttonWrapper,a,function(){b.eraseActiveButtons(l,n.buttonWrapper)})});x(e[c].items)&&g.call(b,n,e[c])})},addSubmenu:function(b,a){var c=this,h=b.submenuArrow,g=b.buttonWrapper,k=t(g,"width"),n=this.wrapper,r=this.listWrapper,p=this.toolbar.childNodes,u=0,q;this.submenu=q=l("ul",{className:"highcharts-submenu-wrapper"},null,g);this.addSubmenuItems(g,a);["click",
"touchstart"].forEach(function(b){m(h,b,function(b){b.stopPropagation();c.eraseActiveButtons(p,g);0<=g.className.indexOf("highcharts-current")?(r.style.width=r.startWidth+"px",g.classList.remove("highcharts-current"),q.style.display="none"):(q.style.display="block",u=q.offsetHeight-g.offsetHeight-3,q.offsetHeight+g.offsetTop>n.offsetHeight&&g.offsetTop>u||(u=0),e(q,{top:-u+"px",left:k+3+"px"}),g.className+=" highcharts-current",r.startWidth=n.offsetWidth,r.style.width=r.startWidth+f.getStyle(r,"padding-left")+
q.offsetWidth+3+"px")})})},addSubmenuItems:function(b,a){var c=this,h=this.submenu,f=this.lang,e=this.listWrapper,l,k;a.items.forEach(function(d){k=c.addButton(h,a,d,f);["click","touchstart"].forEach(function(a){m(k.mainButton,a,function(){c.switchSymbol(this,b,!0);e.style.width=e.startWidth+"px";h.style.display="none"})})});l=h.querySelectorAll("li \x3e .highcharts-menu-item-btn")[0];c.switchSymbol(l,!1)},eraseActiveButtons:function(b,a,d){[].forEach.call(b,function(b){b!==a&&(b.classList.remove("highcharts-current"),
b.classList.remove("highcharts-active"),d=b.querySelectorAll(".highcharts-submenu-wrapper"),0<d.length&&(d[0].style.display="none"))})},addButton:function(b,a,d,e){var c=this.options;a=a[d];var h=a.items,m=a.className||"",k;d=l("li",{className:n(f.Toolbar.prototype.classMapping[d],"")+" "+m,title:e[d]||d},null,b);b=l("span",{className:"highcharts-menu-item-btn"},null,d);h&&1<h.length?k=l("span",{className:"highcharts-submenu-item-arrow highcharts-arrow-right"},null,d):b.style["background-image"]=
"url("+c.iconsURL+a.symbol+")";return{buttonWrapper:d,mainButton:b,submenuArrow:k}},addNavigation:function(){var b=this.wrapper;this.arrowWrapper=l("div",{className:"highcharts-arrow-wrapper"});this.arrowUp=l("div",{className:"highcharts-arrow-up"},null,this.arrowWrapper);this.arrowDown=l("div",{className:"highcharts-arrow-down"},null,this.arrowWrapper);b.insertBefore(this.arrowWrapper,b.childNodes[0]);this.scrollButtons()},scrollButtons:function(){var b=0,a=this,d=a.wrapper,e=a.toolbar,f=.1*d.offsetHeight;
["click","touchstart"].forEach(function(c){m(a.arrowUp,c,function(){0<b&&(b-=f,e.style["margin-top"]=-b+"px")});m(a.arrowDown,c,function(){d.offsetHeight+b<=e.offsetHeight+f&&(b+=f,e.style["margin-top"]=-b+"px")})})},createHTML:function(){var b=this.chart,a=this.options,d=b.container,b=b.options.navigation;this.wrapper=b=l("div",{className:"highcharts-stocktools-wrapper "+a.className+" "+(b&&b.bindingsClassName)});d.parentNode.insertBefore(b,d);this.toolbar=d=l("ul",{className:"highcharts-stocktools-toolbar "+
a.toolbarClassName});this.listWrapper=a=l("div",{className:"highcharts-menu-wrapper"});b.insertBefore(a,b.childNodes[0]);a.insertBefore(d,a.childNodes[0]);this.showHideToolbar();this.addNavigation()},showHideNavigatorion:function(){this.visible&&this.toolbar.offsetHeight>this.wrapper.offsetHeight-50?this.arrowWrapper.style.display="block":(this.toolbar.style.marginTop="0px",this.arrowWrapper.style.display="none")},showHideToolbar:function(){var b=this.chart,a=this.wrapper,d=this.listWrapper,e=this.submenu,
g=this.visible,k;this.showhideBtn=k=l("div",{className:"highcharts-toggle-toolbar highcharts-arrow-left"},null,a);g?(a.style.height="100%",k.style.top=f.getStyle(d,"padding-top")+"px",k.style.left=a.offsetWidth+f.getStyle(d,"padding-left")+"px"):(e&&(e.style.display="none"),k.style.left="0px",this.visible=g=!1,d.classList.add("highcharts-hide"),k.classList.toggle("highcharts-arrow-right"),a.style.height=k.offsetHeight+"px");["click","touchstart"].forEach(function(a){m(k,a,function(){b.update({stockTools:{gui:{visible:!g,
placed:!0}}})})})},switchSymbol:function(a,c){var b=a.parentNode,e=b.classList.value,b=b.parentNode.parentNode;b.className="";e&&b.classList.add(e.trim());b.querySelectorAll(".highcharts-menu-item-btn")[0].style["background-image"]=a.style["background-image"];c&&this.selectButton(b)},selectButton:function(b){0<=b.className.indexOf("highcharts-active")?b.classList.remove("highcharts-active"):b.classList.add("highcharts-active")},unselectAllButtons:function(b){var a=b.parentNode.querySelectorAll(".highcharts-active");
[].forEach.call(a,function(a){a!==b&&a.classList.remove("highcharts-active")})},inIframe:function(){try{return a.self!==a.top}catch(b){return!0}},update:function(a){p(!0,this.chart.options.stockTools,a);this.destroy();this.chart.setStockTools(a);this.chart.navigationBindings&&this.chart.navigationBindings.update()},destroy:function(){var a=this.wrapper,c=a&&a.parentNode;this.eventsToUnbind.forEach(function(a){a()});c&&c.removeChild(a);this.chart.isDirtyBox=!0;this.chart.redraw()},redraw:function(){this.showHideNavigatorion()},
classMapping:{circle:"highcharts-circle-annotation",rectangle:"highcharts-rectangle-annotation",label:"highcharts-label-annotation",segment:"highcharts-segment",arrowSegment:"highcharts-arrow-segment",ray:"highcharts-ray",arrowRay:"highcharts-arrow-ray",line:"highcharts-infinity-line",arrowLine:"highcharts-arrow-infinity-line",verticalLine:"highcharts-vertical-line",horizontalLine:"highcharts-horizontal-line",crooked3:"highcharts-crooked3",crooked5:"highcharts-crooked5",elliott3:"highcharts-elliott3",
elliott5:"highcharts-elliott5",pitchfork:"highcharts-pitchfork",fibonacci:"highcharts-fibonacci",parallelChannel:"highcharts-parallel-channel",measureX:"highcharts-measure-x",measureY:"highcharts-measure-y",measureXY:"highcharts-measure-xy",verticalCounter:"highcharts-vertical-counter",verticalLabel:"highcharts-vertical-label",verticalArrow:"highcharts-vertical-arrow",currentPriceIndicator:"highcharts-current-price-indicator",indicators:"highcharts-indicators",flagCirclepin:"highcharts-flag-circlepin",
flagDiamondpin:"highcharts-flag-diamondpin",flagSquarepin:"highcharts-flag-squarepin",flagSimplepin:"highcharts-flag-simplepin",zoomX:"highcharts-zoom-x",zoomY:"highcharts-zoom-y",zoomXY:"highcharts-zoom-xy",typeLine:"highcharts-series-type-line",typeOHLC:"highcharts-series-type-ohlc",typeCandlestick:"highcharts-series-type-candlestick",fullScreen:"highcharts-full-screen",toggleAnnotations:"highcharts-toggle-annotations",saveChart:"highcharts-save-chart",separator:"highcharts-separator"}};m(f.NavigationBindings,
"selectButton",function(a){var b=a.button,d=this.chart.stockTools;d&&d.guiEnabled&&(d.unselectAllButtons(a.button),0<=b.parentNode.className.indexOf("highcharts-submenu-wrapper")&&(b=b.parentNode.parentNode),d.selectButton(b))});m(f.NavigationBindings,"deselectButton",function(a){a=a.button;var b=this.chart.stockTools;b&&b.guiEnabled&&(0<=a.parentNode.className.indexOf("highcharts-submenu-wrapper")&&(a=a.parentNode.parentNode),b.selectButton(a))})});n(l,"masters/modules/stock-tools.src.js",[],function(){})});
//# sourceMappingURL=stock-tools.js.map
