var pmc=pmc||{};Object.assign(pmc,{uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})},generate_pvuuid:function(t){return window._skmPageViewId=!t&&window._skmPageViewId||pmc.uuid(),window._skmPageViewId},rot13:function(t){return t.replace(/[A-Za-z]/g,function(t){return String.fromCharCode(t.charCodeAt(0)+(t.toUpperCase()<="M"?13:-13))})},is_proxied:function(){return!("object"!=typeof window.pmc_site_config||!window.pmc_site_config.hasOwnProperty("is_proxied")||!window.pmc_site_config.hasOwnProperty("rot13_hostname"))&&(window.pmc_site_config.is_proxied||null!==window.pmc_site_config.is_proxied||(window.pmc_site_config.is_proxied=this.rot13(window.pmc_site_config.rot13_hostname).toLowerCase()!==window.location.hostname.toLowerCase()),window.pmc_site_config.is_proxied)},proxy_url:function(t,o){var i=this;return this.is_proxied()?t.replace(/^(https?:\/\/)([^\/]+)/,function(t,e,n){return o||i.rot13(window.pmc_site_config.rot13_hostname).toLowerCase()===n.toLowerCase()?window.location.port&&""!=window.location.port?e+window.location.hostname+":"+window.location.port:e+window.location.hostname:t}):t},reverse_proxy_url:function(t){var o=this;return this.is_proxied()?t.replace(/^(https?:\/\/)([^\/]+)/,function(t,e,n){return e+o.rot13(window.pmc_site_config.rot13_hostname)}):t},get_object_property:function(t,e,n){return"object"==typeof t&&t.hasOwnProperty(e)?t[e]:n},is_empty:function(t){return!t||null==t||""===(t=(t+="").replace(/^\s+|\s+$/g,""))},has_json:function(){return!("undefined"==typeof JSON||!JSON)},_round:function(t,e){return e=this.is_empty(e)?2:e,Math.round(t*Math.pow(10,e))/Math.pow(10,e)},_replace_all:function(t,e,n){var o=new RegExp(t,"g");return n.replace(o,e)},timestamp:function(){return Math.round(new Date/1e3)},deeptest:function(t){t=t.split(".");for(var e=window[t.shift()];e&&t.length;)e=e[t.shift()];return e},decode_entities:function(t){var e=document.createElement("div");return t&&"string"==typeof t&&(t=t.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim,"").replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim,""),e.innerHTML=t,t=e.textContent,e.textContent=""),t},sanitize_title:function(t){if(!t||this.is_empty(t)||"string"!=typeof t)return"";return(t=(t=(t=(t=(t=(t=this.decode_entities(t)).replace(/[^a-zA-Z0-9 \-_]/g,"")).replace(/\s\-/g,"-").replace(/\-\s/g,"-").replace(/\s/g,"-")).replace(/\-_/g,"-").replace(/_\-/g,"-")).replace(/\-{2,}/g,"-")).replace(/^\-/g,"").replace(/\-$/g,"")).toLowerCase()},sanitize_key:function(t){if(!t||this.is_empty(t)||"string"!=typeof t)return"";return(t=(t=(t=this.decode_entities(t)).replace(/[^a-zA-Z0-9\-_]/g,"")).replace(/^\-/g,"").replace(/\-$/g,"")).toLowerCase()},popup:function(t,e,n,o){return void 0!==t&&!this.is_empty(t)&&(void 0!==e&&!this.is_empty(e)||(e="_blank"),void 0!==n&&!this.is_empty(n)||(n=550),void 0!==o&&!this.is_empty(o)||(o=600),window.open(t,e,"width="+parseInt(n)+", height="+parseInt(o)),!0)},cookie:{get:function(t){for(var e,n,o=document.cookie.split(";"),i=o.length,r=0;r<i;r++)if(e=o[r].substr(0,o[r].indexOf("=")),n=o[r].substr(o[r].indexOf("=")+1),(e=e.replace(/^\s+|\s+$/g,""))==t)return unescape(n);return null},set:function(t,e,n,o){n=void 0!==n?1e3*parseInt(n,10):0,o=void 0!==o?o:"";var i=new Date,r=new Date(i.getTime()+n);e=void 0!==e?escape(e):"",e+=pmc.is_empty(n)?"":"; expires="+r.toUTCString(),e+=pmc.is_empty(o)?"; path=/":"; path="+o,document.cookie=t+"="+e},expire:function(t,e){e=pmc.is_empty(e)?"":e,this.set(t,"",1,e)}},load_script:function(t,e,n){var o,i,r;void 0!==t&&(o=!1,(i=document.createElement("script")).type="text/javascript",void 0!==n&&(i.id=n),i.async=!0,i.src=t,"function"==typeof e&&(i.onreadystatechange=i.onload=function(){o||(o=!0,e()),o=!0}),(r=document.getElementsByTagName("script")[0]).parentNode.insertBefore(i,r))},mobile_width:function(t){var e=0;try{void 0===t&&(t=!1),e=t||void 0===window.orientation||0==window.orientation||180==window.orientation?window.screen.width:window.screen.height;var n="";"object"==typeof navigator&&"string"==typeof navigator.userAgent&&(n=navigator.userAgent.toLowerCase()),-1<n.indexOf("mobile")&&-1===n.indexOf("ipad")&&void 0!==window.devicePixelRatio&&1<window.devicePixelRatio&&(e/=window.devicePixelRatio)}catch(t){}return e},tracking:{callback_on_removed:function(t){var e,n;"object"==typeof t&&"function"==typeof t.get_properties_string&&(e="",0<(n=t.get_properties_string()).length&&document.querySelector('link[rel="amphtml"]')&&(e=document.querySelector("link[rel='amphtml']").href,e+="?"+n,document.querySelector("link[rel='amphtml']").href=e))},_tokens:[],_extract_tokens:function(){void 0===this._extraced&&(this._extraced=!0,this.remove(window.location.hash,!0),this.remove(window.location.search,!0))},get_properties:function(){this._extract_tokens();var t,e=[];for(t in this._tokens)e.push({name:t,value:this._tokens[t]});return e},get_properties_string:function(){this._extract_tokens();var t,e=[];for(t in this._tokens)e.push(t+"="+this._tokens[t]);return e.join("&")},get_property:function(t,e){return this._extract_tokens(),void 0===t||void 0===this._tokens[t]?e:this._tokens[t]},remove:function(t,o){var i=this,r=new RegExp("^(utm_[a-z]+|token)=");return t.replace(/(\?|#)([^#]*)/g,function(t,e,n){return(n=n.split(/&amp;|&/).map(function(t){var e;return o&&r.test(t)&&t&&(e=t.split("=",2),i._tokens[e[0]]=e[1]),!r.test(t)&&t}).filter(Boolean).join("&"))?e+n:""})},remove_from_browser_url:function(){var t,e,n;void 0===this._removed&&(this._removed=!0,n=window.location,"replaceState"in history?history.replaceState({},document.title,n.pathname+this.remove(n.search,!0)+this.remove(n.hash,!0)):(t=document.body.scrollTop,e=document.body.scrollLeft,n.hash=this.remove(n.hash,!0),document.body.scrollTop=t,document.body.scrollLeft=e),"function"==typeof this.callback_on_removed&&this.callback_on_removed(this))},do_call_events:function(){this.remove_from_browser_url()}},apply:function(t,e,n){var o;if(n&&pmc.apply(t,n),t&&e&&"object"==typeof e)for(o in e)t[o]=e[o];return t},flash:function(t,e){(t=jQuery(t)).length&&(e=pmc.apply({},e,{highlight:"#FFFF99",in_ms:700,out_ms:1200}),t.animate({backgroundColor:e.highlight},e.in_ms,"linear",function(){t.animate({backgroundColor:"transparent"},e.out_ms,"linear",function(){t.css({background:"none",backgroundColor:""})})}))},trim:function(t,e){var n,o=0,i=0;for(t+="",n=e?(e+="").replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,"$1"):" \n\r\t\f\v            ​\u2028\u2029　",o=t.length,i=0;i<o;i++)if(-1===n.indexOf(t.charAt(i))){t=t.substring(i);break}for(i=(o=t.length)-1;0<=i;i--)if(-1===n.indexOf(t.charAt(i))){t=t.substring(0,i+1);break}return-1===n.indexOf(t.charAt(0))?t:""},deferredScriptOnloadCallback:function(t){var e,n=document.getElementById(t+"-js-after");n&&"text/plain"===n.getAttribute("type")&&((e=n.cloneNode(!0)).setAttribute("type","text/javascript"),n.replaceWith(e))}}),"function"!=typeof String.prototype.format&&(String.prototype.format=function(){var n=arguments;return this.replace(/\{(\d+)\}/g,function(t,e){return void 0!==n[e]?n[e]:t})}),"function"!=typeof String.prototype.formatUnicorn&&(String.prototype.formatUnicorn=function(){var t,e,n,o=this.toString();if(!arguments.length)return o;for(e in t="string"==(n=typeof arguments[0])||"number"==n?Array.prototype.slice.call(arguments):arguments[0])o=o.replace(new RegExp("\\{"+e+"\\}","gi"),t[e]);return o}),pmc.analytics=pmc.analytics||[],pmc.generate_pvuuid();