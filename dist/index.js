!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("React")):"function"==typeof define&&define.amd?define(["React"],e):"object"==typeof exports?exports["react-xmasonry"]=e(require("React")):t["react-xmasonry"]=e(t.React)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(e,n){e.exports=t},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.XBlock=e.XMasonry=void 0;var o=n(2),i=r(o),a=n(4),s=r(a);e.XMasonry=i.default,e.XBlock=s.default,"undefined"!=typeof window&&(window.XMasonry=i.default,window.XBlock=s.default)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(0),d=r(c),h=n(3),p=r(h),f=function(t){function e(t){i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.state={blocks:{},containerHeight:0,columns:1,containerWidth:0},n.columns=n.state.columns,n.blocks=n.state.blocks,n.container=null,n.debouncedResize=(0,p.default)(n.updateContainerWidth.bind(n)),n.fixedHeight=0,n.containerWidth=n.state.containerWidth,n.update=n.updateInternal.bind(n),n.smartUpdate=0,n.props.responsive&&window.addEventListener("resize",n.debouncedResize),n.props.updateOnFontLoad&&document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",n.update),n.updateContainerWidth(),n}return s(e,t),u(e,[{key:"getBestFitColumn",value:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=Math.min(t.length-e+1,this.props.maxColumns-e+1),r=0,o=1/0,i=0;i<n;++i){var a=Math.max.apply(null,t.slice(i,i+e));a<o&&(o=a,r=i)}return{col:r,height:o}}}]),u(e,[{key:"updateInternal",value:function(){return!this.updateContainerWidth()&&this.measureChildren()}},{key:"componentDidMount",value:function(){this.updateInternal()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.debouncedResize),this.props.updateOnFontLoad&&document.fonts&&document.fonts.addEventListener&&document.fonts.removeEventListener("loadingdone",this.update),this.smartUpdate&&clearTimeout(this.smartUpdate)}},{key:"componentWillReceiveProps",value:function(t){if(t.children.length<this.props.children.length){for(var e=new Set,n={},r=0;r<t.children.length;r++)e.add(null===t.children[r].key?r:t.children[r].key);for(var o=0;o<this.props.children.length;o++){var i=null===this.props.children[o].key?o:this.props.children[o].key;e.has(i)||(n[i]={})}this.recalculatePositions(null,n)}}},{key:"componentDidUpdate",value:function(){this.updateInternal()&&this.props.smartUpdate&&this.runSmartUpdate()}},{key:"runSmartUpdate",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;if(100===e&&this.smartUpdate)clearInterval(this.smartUpdate),this.smartUpdate=0;else if(this.smartUpdate)return;this.smartUpdate=setTimeout(function(){var n=void 0!==document.hidden&&document.hidden;if(n)var r=document.addEventListener("visibilitychange",function(){document.hidden||(document.removeEventListener("visibilitychange",r),t.runSmartUpdate(2*e))},!1);if(t.smartUpdate=0,t.updateInternal())return void t.runSmartUpdate();n||t.runSmartUpdate(2*e)},Math.min(e,this.props.smartUpdateCeil))}},{key:"getColumnsNumber",value:function(t){return Math.max(1,Math.round(t/this.props.targetBlockWidth))}},{key:"updateContainerWidth",value:function(){if(!this.container)return!1;var t=this.container.clientWidth;return t!==this.containerWidth&&t!==this.containerWidth+this.constructor.scrollbarSize&&(this.setState({columns:this.columns=this.getColumnsNumber(t),containerWidth:this.containerWidth=t,blocks:this.blocks={}}),!0)}},{key:"measureChildren",value:function(){if(!this.container)return!1;for(var t={},e=!1,n=0;n<this.container.children.length;n++){var r=this.container.children[n],o=r.hasAttribute("data-xkey"),i=r.getAttribute("data-key"),a=+r.getAttribute("data-width");(o||(this.blocks[i]||{}).height!==r.clientHeight||(this.blocks[i]||{}).width!==a)&&(t[i]={height:r.clientHeight},e||(e=!0))}return e&&this.recalculatePositions(t),e}},{key:"recalculatePositions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=void 0,r=Array.from({length:this.columns},function(){return 0});for(var o in this.blocks)this.blocks.hasOwnProperty(o)&&void 0===this.blocks[o]&&(null===e&&(e={}),e[o]={});if(e){n={};for(var i in this.blocks)this.blocks.hasOwnProperty(i)&&!e.hasOwnProperty(i)&&(n[i]=this.blocks[i]);for(var a in t)t.hasOwnProperty(a)&&!e.hasOwnProperty(a)&&(n[a]=t[a])}else n=l({},this.blocks,t);for(var s=0;s<this.container.children.length;s++){var u=this.container.children[s],c=u.getAttribute("data-key");if(n.hasOwnProperty(c)&&(!e||!e.hasOwnProperty(c))){var d=+u.getAttribute("data-width")||1,h=this.getBestFitColumn(r,d),p=h.col,f=h.height,m=f+n[c].height;n[c].left=this.containerWidth*p/this.columns,n[c].top=f,n[c].width=Math.min(d,this.columns);for(var y=0;y<d;++y)r[p+y]=m}}if(this.props.center&&0===r[r.length-1]){for(var v=1;0===r[r.length-1-v];++v);var b=this.containerWidth*v/this.columns/2;for(var g in n)n.hasOwnProperty(g)&&(n[g].left+=b)}this.setState({blocks:this.blocks=n,containerHeight:Math.max.apply(null,r)})}},{key:"render",value:function(){var t=this,n={},r=0,i=0===this.containerWidth?[]:Array.prototype.slice.call(d.default.isValidElement(this.props.children)?[this.props.children]:this.props.children).map(function(e,o){var i=null===e.key?o:e.key,a=t.blocks[i];return a||++r,n[i]=null,a?d.default.cloneElement(e,{"data-key":i,key:i,style:{left:Math.floor(a.left),top:a.top},measured:!0,height:a.height,parent:t}):d.default.cloneElement(e,{"data-key":i,"data-xkey":i,key:i,style:{visibility:"hidden"},height:0,parent:t})});for(var a in this.blocks)this.blocks.hasOwnProperty(a)&&!n.hasOwnProperty(a)&&(this.blocks[a]=void 0);var s=i.length-r>0||0===i.length?this.fixedHeight=this.state.containerHeight:this.fixedHeight,u=this.props,c=(u.center,u.maxColumns,u.responsive,u.smartUpdate,u.smartUpdateCeil,u.targetBlockWidth,u.updateOnImagesLoad,u.updateOnFontLoad,u.className),h=u.style,p=o(u,["center","maxColumns","responsive","smartUpdate","smartUpdateCeil","targetBlockWidth","updateOnImagesLoad","updateOnFontLoad","className","style"]);return d.default.createElement("div",l({className:c?"xmasonry "+c:"xmasonry",style:l({},e.containerStyle,{height:s},h),ref:function(e){return t.container=e}},p),i)}}]),e}(d.default.Component);f.defaultProps={center:!0,maxColumns:1/0,responsive:!0,smartUpdate:!0,smartUpdateCeil:1/0,targetBlockWidth:300,updateOnFontLoad:!0,updateOnImagesLoad:!0},f.containerStyle={position:"relative"},f.scrollbarSize=function(){var t=document.createElement("div");t.style.overflow="scroll",t.style.height=t.style.width="200px",t.style.visibility="hidden",t.style.padding=t.style.margin=t.style.border=0,document.body.appendChild(t);var e=t.offsetWidth-t.clientWidth||0;return document.body.removeChild(t),e}(),e.default=f},function(t,e,n){"use strict";function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:45,n=0;return function(){0!==n&&clearTimeout(n),n=setTimeout(function(){n=0,t()},e)}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,n){"use strict";function r(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(0),c=function(t){return t&&t.__esModule?t:{default:t}}(u),d=function(t){function e(){var t,n,r,a;o(this,e);for(var s=arguments.length,l=Array(s),u=0;u<s;u++)l[u]=arguments[u];return n=r=i(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(l))),r.divElement=null,r.placed=!1,a=n,i(r,a)}return a(e,t),l(e,[{key:"componentDidUpdate",value:function(){var t=this;if(!this.placed&&this.props.parent&&!this.props["data-xkey"]){this.placed=!0;var e=this.props.parent;requestAnimationFrame(function(){if(t.divElement){var n=Array.from(t.divElement.querySelectorAll("img"));n.length>0&&e.props.updateOnImagesLoad&&n.forEach(function(t){return!t.complete&&t.addEventListener("load",e.update)}),t.props.height!==t.divElement.clientHeight&&e.update()}})}}},{key:"render",value:function(){var t=this,n=this.props,o=n.width,i=(n.height,n.measured),a=(n.parent,n.style),l=r(n,["width","height","measured","parent","style"]),u=this.props.parent.columns,d=Math.min(o||1,u);return a.width=Math.floor(d*this.props.parent.containerWidth/u),c.default.createElement("div",s({"data-width":d},l,{style:s({},a,e.defaultStyle),className:i?"xblock":"",ref:function(e){return t.divElement=e}}),this.props.children)}}]),e}(c.default.Component);d.defaultProps={width:1,measured:!1},d.defaultStyle={position:"absolute",boxSizing:"border-box"},e.default=d}])});