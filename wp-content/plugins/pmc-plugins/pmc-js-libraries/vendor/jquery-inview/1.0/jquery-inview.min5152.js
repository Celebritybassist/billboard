!function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):"object"==typeof exports?module.exports=factory(require("jquery")):factory(jQuery)}(function($){var inviewObjects=[],viewportSize,viewportOffset,d=document,w=window,documentElement=d.documentElement,timer;function getViewportSize(){var mode,domObject,size={height:w.innerHeight,width:w.innerWidth};return size.height||!(mode=d.compatMode)&&$.support.boxModel||(size={height:(domObject="CSS1Compat"===mode?documentElement:d.body).clientHeight,width:domObject.clientWidth}),size}function getViewportOffset(){return{top:w.pageYOffset||documentElement.scrollTop||d.body.scrollTop,left:w.pageXOffset||documentElement.scrollLeft||d.body.scrollLeft}}function checkInView(){if(inviewObjects.length){var i=0,$elements=$.map(inviewObjects,function(inviewObject){var selector=inviewObject.data.selector,$element=inviewObject.$element;return selector?$element.find(selector):$element});for(viewportSize=viewportSize||getViewportSize(),viewportOffset=viewportOffset||getViewportOffset();i<inviewObjects.length;i++)if($.contains(documentElement,$elements[i][0])){var $element=$($elements[i]),elementSize_height=$element[0].offsetHeight,elementSize_width=$element[0].offsetWidth,elementOffset=$element.offset(),inView=$element.data("inview");if(!viewportOffset||!viewportSize)return;elementOffset.top+elementSize_height>viewportOffset.top&&elementOffset.top<viewportOffset.top+viewportSize.height&&elementOffset.left+elementSize_width>viewportOffset.left&&elementOffset.left<viewportOffset.left+viewportSize.width?inView||$element.data("inview",!0).trigger("inview",[!0]):inView&&$element.data("inview",!1).trigger("inview",[!1])}}}$.event.special.inview={add:function(data){inviewObjects.push({data:data,$element:$(this),element:this}),!timer&&inviewObjects.length&&(timer=setInterval(checkInView,250))},remove:function(data){for(var i=0;i<inviewObjects.length;i++){var inviewObject=inviewObjects[i];if(inviewObject.element===this&&inviewObject.data.guid===data.guid){inviewObjects.splice(i,1);break}}inviewObjects.length||(clearInterval(timer),timer=null)}},$(w).on("scroll resize scrollstop",function(){viewportSize=viewportOffset=null}),!documentElement.addEventListener&&documentElement.attachEvent&&documentElement.attachEvent("onfocusin",function(){viewportOffset=null})});