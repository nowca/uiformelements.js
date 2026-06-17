var Split=function(t,e){(e=void 0!==e?e:{}).gutterWidth||(e.gutterWidth=10),e.minWidth||(e.minWidth=100);var i=function(){this.dragging=!0,this.width=this.left.clientWidth+this.right.clientWidth+e.gutterWidth,this.x=this.left.getBoundingClientRect().left,this.left.addEventListener("selectstart",r),this.left.addEventListener("dragstart",r),this.right.addEventListener("selectstart",r),this.right.addEventListener("dragstart",r),this.left.style.userSelect="none",this.left.style.webkitUserSelect="none",this.left.style.MozUserSelect="none",this.right.style.userSelect="none",this.right.style.webkitUserSelect="none",this.right.style.MozUserSelect="none"},s=function(){this.dragging=!1,this.left.removeEventListener("selectstart",r),this.left.removeEventListener("dragstart",r),this.right.removeEventListener("selectstart",r),this.right.removeEventListener("dragstart",r),this.left.style.userSelect="",this.left.style.webkitUserSelect="",this.left.style.MozUserSelect="",this.right.style.userSelect="",this.right.style.webkitUserSelect="",this.right.style.MozUserSelect=""},n=function(t){if(this.dragging&&(minWidth=e.minWidth,!(t.clientX<=this.x+minWidth||t.clientX>=this.x+this.width-minWidth))){var i=t.clientX-this.x;this.left.style.width=i-e.gutterWidth/2+"px",this.right.style.width=this.width-i+e.gutterWidth+"px"}},r=function(){return!1},h=document.getElementById(t[0]).parentNode,l=h.clientWidth-e.gutterWidth*(t.length-1);if(!e.widths){var d=100/t.length;e.widths=[];for(var g=0;g<t.length;g++)e.widths.push(d)}for(g=0;g<t.length;g++){var a=document.getElementById(t[g]);if(g>0){var o={left:document.getElementById(t[g-1]),right:a,dragging:!1,parent:h},c=document.createElement("div");c.className="gutter",c.style.width=e.gutterWidth+"px",c.style.float="left",c.addEventListener("mousedown",i.bind(o)),h.addEventListener("mouseup",s.bind(o)),h.addEventListener("mousemove",n.bind(o)),h.addEventListener("mouseleave",s.bind(o)),e.gutter&&h.insertBefore(c,a),o.gutter=c}a.style.width=l*e.widths[g]/100+"px"}};

window.PR_SHOULD_USE_CONTINUATION=true;window.PR_TAB_WIDTH=8;window.PR_normalizedHtml=window.PR=window.prettyPrintOne=window.prettyPrint=void 0;window._pr_isIE6=function(){var y=navigator&&navigator.userAgent&&navigator.userAgent.match(/\bMSIE ([678])\./);y=y?+y[1]:false;window._pr_isIE6=function(){return y};return y};
(function(){function y(b){return b.replace(L,"&amp;").replace(M,"&lt;").replace(N,"&gt;")}function H(b,f,i){switch(b.nodeType){case 1:var o=b.tagName.toLowerCase();f.push("<",o);var l=b.attributes,n=l.length;if(n){if(i){for(var r=[],j=n;--j>=0;)r[j]=l[j];r.sort(function(q,m){return q.name<m.name?-1:q.name===m.name?0:1});l=r}for(j=0;j<n;++j){r=l[j];r.specified&&f.push(" ",r.name.toLowerCase(),'="',r.value.replace(L,"&amp;").replace(M,"&lt;").replace(N,"&gt;").replace(X,"&quot;"),'"')}}f.push(">");
for(l=b.firstChild;l;l=l.nextSibling)H(l,f,i);if(b.firstChild||!/^(?:br|link|img)$/.test(o))f.push("</",o,">");break;case 3:case 4:f.push(y(b.nodeValue));break}}function O(b){function f(c){if(c.charAt(0)!=="\\")return c.charCodeAt(0);switch(c.charAt(1)){case "b":return 8;case "t":return 9;case "n":return 10;case "v":return 11;case "f":return 12;case "r":return 13;case "u":case "x":return parseInt(c.substring(2),16)||c.charCodeAt(1);case "0":case "1":case "2":case "3":case "4":case "5":case "6":case "7":return parseInt(c.substring(1),
8);default:return c.charCodeAt(1)}}function i(c){if(c<32)return(c<16?"\\x0":"\\x")+c.toString(16);c=String.fromCharCode(c);if(c==="\\"||c==="-"||c==="["||c==="]")c="\\"+c;return c}function o(c){var d=c.substring(1,c.length-1).match(RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g"));c=[];for(var a=[],k=d[0]==="^",e=k?1:0,h=d.length;e<h;++e){var g=d[e];switch(g){case "\\B":case "\\b":case "\\D":case "\\d":case "\\S":case "\\s":case "\\W":case "\\w":c.push(g);
continue}g=f(g);var s;if(e+2<h&&"-"===d[e+1]){s=f(d[e+2]);e+=2}else s=g;a.push([g,s]);if(!(s<65||g>122)){s<65||g>90||a.push([Math.max(65,g)|32,Math.min(s,90)|32]);s<97||g>122||a.push([Math.max(97,g)&-33,Math.min(s,122)&-33])}}a.sort(function(v,w){return v[0]-w[0]||w[1]-v[1]});d=[];g=[NaN,NaN];for(e=0;e<a.length;++e){h=a[e];if(h[0]<=g[1]+1)g[1]=Math.max(g[1],h[1]);else d.push(g=h)}a=["["];k&&a.push("^");a.push.apply(a,c);for(e=0;e<d.length;++e){h=d[e];a.push(i(h[0]));if(h[1]>h[0]){h[1]+1>h[0]&&a.push("-");
a.push(i(h[1]))}}a.push("]");return a.join("")}function l(c){for(var d=c.source.match(RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g")),a=d.length,k=[],e=0,h=0;e<a;++e){var g=d[e];if(g==="(")++h;else if("\\"===g.charAt(0))if((g=+g.substring(1))&&g<=h)k[g]=-1}for(e=1;e<k.length;++e)if(-1===k[e])k[e]=++n;for(h=e=0;e<a;++e){g=d[e];if(g==="("){++h;if(k[h]===undefined)d[e]="(?:"}else if("\\"===
g.charAt(0))if((g=+g.substring(1))&&g<=h)d[e]="\\"+k[h]}for(h=e=0;e<a;++e)if("^"===d[e]&&"^"!==d[e+1])d[e]="";if(c.ignoreCase&&r)for(e=0;e<a;++e){g=d[e];c=g.charAt(0);if(g.length>=2&&c==="[")d[e]=o(g);else if(c!=="\\")d[e]=g.replace(/[a-zA-Z]/g,function(s){s=s.charCodeAt(0);return"["+String.fromCharCode(s&-33,s|32)+"]"})}return d.join("")}for(var n=0,r=false,j=false,q=0,m=b.length;q<m;++q){var t=b[q];if(t.ignoreCase)j=true;else if(/[a-z]/i.test(t.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,
""))){r=true;j=false;break}}var p=[];q=0;for(m=b.length;q<m;++q){t=b[q];if(t.global||t.multiline)throw Error(""+t);p.push("(?:"+l(t)+")")}return RegExp(p.join("|"),j?"gi":"g")}function Y(b){var f=0;return function(i){for(var o=null,l=0,n=0,r=i.length;n<r;++n)switch(i.charAt(n)){case "\t":o||(o=[]);o.push(i.substring(l,n));l=b-f%b;for(f+=l;l>=0;l-=16)o.push("                ".substring(0,l));l=n+1;break;case "\n":f=0;break;default:++f}if(!o)return i;o.push(i.substring(l));return o.join("")}}function I(b,
f,i,o){if(f){b={source:f,c:b};i(b);o.push.apply(o,b.d)}}function B(b,f){var i={},o;(function(){for(var r=b.concat(f),j=[],q={},m=0,t=r.length;m<t;++m){var p=r[m],c=p[3];if(c)for(var d=c.length;--d>=0;)i[c.charAt(d)]=p;p=p[1];c=""+p;if(!q.hasOwnProperty(c)){j.push(p);q[c]=null}}j.push(/[\0-\uffff]/);o=O(j)})();var l=f.length;function n(r){for(var j=r.c,q=[j,z],m=0,t=r.source.match(o)||[],p={},c=0,d=t.length;c<d;++c){var a=t[c],k=p[a],e=void 0,h;if(typeof k==="string")h=false;else{var g=i[a.charAt(0)];
if(g){e=a.match(g[1]);k=g[0]}else{for(h=0;h<l;++h){g=f[h];if(e=a.match(g[1])){k=g[0];break}}e||(k=z)}if((h=k.length>=5&&"lang-"===k.substring(0,5))&&!(e&&typeof e[1]==="string")){h=false;k=P}h||(p[a]=k)}g=m;m+=a.length;if(h){h=e[1];var s=a.indexOf(h),v=s+h.length;if(e[2]){v=a.length-e[2].length;s=v-h.length}k=k.substring(5);I(j+g,a.substring(0,s),n,q);I(j+g+s,h,Q(k,h),q);I(j+g+v,a.substring(v),n,q)}else q.push(j+g,k)}r.d=q}return n}function x(b){var f=[],i=[];if(b.tripleQuotedStrings)f.push([A,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
null,"'\""]);else b.multiLineStrings?f.push([A,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"]):f.push([A,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"]);b.verbatimStrings&&i.push([A,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]);if(b.hashComments)if(b.cStyleComments){f.push([C,/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"]);i.push([A,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,
null])}else f.push([C,/^#[^\r\n]*/,null,"#"]);if(b.cStyleComments){i.push([C,/^\/\/[^\r\n]*/,null]);i.push([C,/^\/\*[\s\S]*?(?:\*\/|$)/,null])}b.regexLiterals&&i.push(["lang-regex",RegExp("^"+Z+"(/(?=[^/*])(?:[^/\\x5B\\x5C]|\\x5C[\\s\\S]|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+/)")]);b=b.keywords.replace(/^\s+|\s+$/g,"");b.length&&i.push([R,RegExp("^(?:"+b.replace(/\s+/g,"|")+")\\b"),null]);f.push([z,/^\s+/,null," \r\n\t\u00a0"]);i.push([J,/^@[a-z_$][a-z_$@0-9]*/i,null],[S,/^@?[A-Z]+[a-z][A-Za-z_$@0-9]*/,
null],[z,/^[a-z_$][a-z_$@0-9]*/i,null],[J,/^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i,null,"0123456789"],[E,/^.[^\s\w\.$@\'\"\`\/\#]*/,null]);return B(f,i)}function $(b){function f(D){if(D>r){if(j&&j!==q){n.push("</span>");j=null}if(!j&&q){j=q;n.push('<span class="',j,'">')}var T=y(p(i.substring(r,D))).replace(e?d:c,"$1&#160;");e=k.test(T);n.push(T.replace(a,s));r=D}}var i=b.source,o=b.g,l=b.d,n=[],r=0,j=null,q=null,m=0,t=0,p=Y(window.PR_TAB_WIDTH),c=/([\r\n ]) /g,
d=/(^| ) /gm,a=/\r\n?|\n/g,k=/[ \r\n]$/,e=true,h=window._pr_isIE6();h=h?b.b.tagName==="PRE"?h===6?"&#160;\r\n":h===7?"&#160;<br>\r":"&#160;\r":"&#160;<br />":"<br />";var g=b.b.className.match(/\blinenums\b(?::(\d+))?/),s;if(g){for(var v=[],w=0;w<10;++w)v[w]=h+'</li><li class="L'+w+'">';var F=g[1]&&g[1].length?g[1]-1:0;n.push('<ol class="linenums"><li class="L',F%10,'"');F&&n.push(' value="',F+1,'"');n.push(">");s=function(){var D=v[++F%10];return j?"</span>"+D+'<span class="'+j+'">':D}}else s=h;
for(;;)if(m<o.length?t<l.length?o[m]<=l[t]:true:false){f(o[m]);if(j){n.push("</span>");j=null}n.push(o[m+1]);m+=2}else if(t<l.length){f(l[t]);q=l[t+1];t+=2}else break;f(i.length);j&&n.push("</span>");g&&n.push("</li></ol>");b.a=n.join("")}function u(b,f){for(var i=f.length;--i>=0;){var o=f[i];if(G.hasOwnProperty(o))"console"in window&&console.warn("cannot override language handler %s",o);else G[o]=b}}function Q(b,f){b&&G.hasOwnProperty(b)||(b=/^\s*</.test(f)?"default-markup":"default-code");return G[b]}
function U(b){var f=b.f,i=b.e;b.a=f;try{var o,l=f.match(aa);f=[];var n=0,r=[];if(l)for(var j=0,q=l.length;j<q;++j){var m=l[j];if(m.length>1&&m.charAt(0)==="<"){if(!ba.test(m))if(ca.test(m)){f.push(m.substring(9,m.length-3));n+=m.length-12}else if(da.test(m)){f.push("\n");++n}else if(m.indexOf(V)>=0&&m.replace(/\s(\w+)\s*=\s*(?:\"([^\"]*)\"|'([^\']*)'|(\S+))/g,' $1="$2$3$4"').match(/[cC][lL][aA][sS][sS]=\"[^\"]*\bnocode\b/)){var t=m.match(W)[2],p=1,c;c=j+1;a:for(;c<q;++c){var d=l[c].match(W);if(d&&
d[2]===t)if(d[1]==="/"){if(--p===0)break a}else++p}if(c<q){r.push(n,l.slice(j,c+1).join(""));j=c}else r.push(n,m)}else r.push(n,m)}else{var a;p=m;var k=p.indexOf("&");if(k<0)a=p;else{for(--k;(k=p.indexOf("&#",k+1))>=0;){var e=p.indexOf(";",k);if(e>=0){var h=p.substring(k+3,e),g=10;if(h&&h.charAt(0)==="x"){h=h.substring(1);g=16}var s=parseInt(h,g);isNaN(s)||(p=p.substring(0,k)+String.fromCharCode(s)+p.substring(e+1))}}a=p.replace(ea,"<").replace(fa,">").replace(ga,"'").replace(ha,'"').replace(ia," ").replace(ja,
"&")}f.push(a);n+=a.length}}o={source:f.join(""),h:r};var v=o.source;b.source=v;b.c=0;b.g=o.h;Q(i,v)(b);$(b)}catch(w){if("console"in window)console.log(w&&w.stack?w.stack:w)}}var A="str",R="kwd",C="com",S="typ",J="lit",E="pun",z="pln",P="src",V="nocode",Z=function(){for(var b=["!","!=","!==","#","%","%=","&","&&","&&=","&=","(","*","*=","+=",",","-=","->","/","/=",":","::",";","<","<<","<<=","<=","=","==","===",">",">=",">>",">>=",">>>",">>>=","?","@","[","^","^=","^^","^^=","{","|","|=","||","||=",
"~","break","case","continue","delete","do","else","finally","instanceof","return","throw","try","typeof"],f="(?:^^|[+-]",i=0;i<b.length;++i)f+="|"+b[i].replace(/([^=<>:&a-z])/g,"\\$1");f+=")\\s*";return f}(),L=/&/g,M=/</g,N=/>/g,X=/\"/g,ea=/&lt;/g,fa=/&gt;/g,ga=/&apos;/g,ha=/&quot;/g,ja=/&amp;/g,ia=/&nbsp;/g,ka=/[\r\n]/g,K=null,aa=RegExp("[^<]+|<!--[\\s\\S]*?--\>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>|</?[a-zA-Z](?:[^>\"']|'[^']*'|\"[^\"]*\")*>|<","g"),ba=/^<\!--/,ca=/^<!\[CDATA\[/,da=/^<br\b/i,W=/^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/,
la=x({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename using virtual wchar_t where break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending event fixed foreach from group implicit in interface internal into is lock object out override orderby params partial readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof debugger eval export function get null set undefined var with Infinity NaN caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END break continue do else for if return while case done elif esac eval fi function in local set then until ",
hashComments:true,cStyleComments:true,multiLineStrings:true,regexLiterals:true}),G={};u(la,["default-code"]);u(B([],[[z,/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],[C,/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],[E,/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup",
"htm","html","mxml","xhtml","xml","xsl"]);u(B([[z,/^[\s]+/,null," \t\r\n"],["atv",/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[E,/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],
["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]);u(B([],[["atv",/^[\s\S]+/]]),["uq.val"]);u(x({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename using virtual wchar_t where ",
hashComments:true,cStyleComments:true}),["c","cc","cpp","cxx","cyc","m"]);u(x({keywords:"null true false"}),["json"]);u(x({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending event fixed foreach from group implicit in interface internal into is lock object out override orderby params partial readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var ",
hashComments:true,cStyleComments:true,verbatimStrings:true}),["cs"]);u(x({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient ",
cStyleComments:true}),["java"]);u(x({keywords:"break continue do else for if return while case done elif esac eval fi function in local set then until ",hashComments:true,multiLineStrings:true}),["bsh","csh","sh"]);u(x({keywords:"break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None ",hashComments:true,multiLineStrings:true,tripleQuotedStrings:true}),["cv","py"]);
u(x({keywords:"caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END ",hashComments:true,multiLineStrings:true,regexLiterals:true}),["perl","pl","pm"]);u(x({keywords:"break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END ",hashComments:true,
multiLineStrings:true,regexLiterals:true}),["rb"]);u(x({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof debugger eval export function get null set undefined var with Infinity NaN ",cStyleComments:true,regexLiterals:true}),["js"]);u(B([],[[A,/^[\s\S]+/]]),
["regex"]);window.PR_normalizedHtml=H;window.prettyPrintOne=function(b,f){var i={f:b,e:f};U(i);return i.a};window.prettyPrint=function(b){function f(){for(var t=window.PR_SHOULD_USE_CONTINUATION?j.now()+250:Infinity;q<o.length&&j.now()<t;q++){var p=o[q];if(p.className&&p.className.indexOf("prettyprint")>=0){var c=p.className.match(/\blang-(\w+)\b/);if(c)c=c[1];for(var d=false,a=p.parentNode;a;a=a.parentNode)if((a.tagName==="pre"||a.tagName==="code"||a.tagName==="xmp")&&a.className&&a.className.indexOf("prettyprint")>=
0){d=true;break}if(!d){a=p;if(null===K){d=document.createElement("PRE");d.appendChild(document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />'));K=!/</.test(d.innerHTML)}if(K){d=a.innerHTML;if("XMP"===a.tagName)d=y(d);else{a=a;if("PRE"===a.tagName)a=true;else if(ka.test(d)){var k="";if(a.currentStyle)k=a.currentStyle.whiteSpace;else if(window.getComputedStyle)k=window.getComputedStyle(a,null).whiteSpace;a=!k||k==="pre"}else a=true;a||(d=d.replace(/(<br\s*\/?>)[\r\n]+/g,"$1").replace(/(?:[\r\n]+[ \t]*)+/g,
" "))}d=d}else{d=[];for(a=a.firstChild;a;a=a.nextSibling)H(a,d);d=d.join("")}d=d.replace(/(?:\r\n?|\n)$/,"");m={f:d,e:c,b:p};U(m);if(p=m.a){c=m.b;if("XMP"===c.tagName){d=document.createElement("PRE");for(a=0;a<c.attributes.length;++a){k=c.attributes[a];if(k.specified)if(k.name.toLowerCase()==="class")d.className=k.value;else d.setAttribute(k.name,k.value)}d.innerHTML=p;c.parentNode.replaceChild(d,c)}else c.innerHTML=p}}}}if(q<o.length)setTimeout(f,250);else b&&b()}for(var i=[document.getElementsByTagName("pre"),
document.getElementsByTagName("code"),document.getElementsByTagName("xmp")],o=[],l=0;l<i.length;++l)for(var n=0,r=i[l].length;n<r;++n)o.push(i[l][n]);i=null;var j=Date;j.now||(j={now:function(){return(new Date).getTime()}});var q=0,m;f()};window.PR={combinePrefixPatterns:O,createSimpleLexer:B,registerLangHandler:u,sourceDecorator:x,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:C,PR_DECLARATION:"dec",PR_KEYWORD:R,PR_LITERAL:J,PR_NOCODE:V,PR_PLAIN:z,PR_PUNCTUATION:E,PR_SOURCE:P,PR_STRING:A,
PR_TAG:"tag",PR_TYPE:S}})()

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2013 Einar Lielmanis and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <elfz@laacz.lv>
    http://jsbeautifier.org/
*/

if("undefined"!=typeof process&&"node"===process.argv[0])var css_beautify=require(__dirname+"/beautify-css.js").css_beautify,js_beautify=require(__dirname+"/beautify.js").js_beautify;function style_html(t,i){var e,n,s,h,r,a;for(n=(i=i||{}).indent_size||4,s=i.indent_char||" ",r=i.brace_style||"collapse",h=0===i.max_char?1/0:i.max_char||250,a=i.unformatted||["a","span","bdo","em","strong","dfn","code","samp","kbd","var","cite","abbr","acronym","q","sub","sup","tt","i","b","big","small","u","s","strike","font","ins","del","pre","address","dt","h1","h2","h3","h4","h5","h6"],e=new function(){return this.pos=0,this.token="",this.current_mode="CONTENT",this.tags={parent:"parent1",parentcount:1,parent1:""},this.tag_type="",this.token_text=this.last_token=this.last_text=this.token_type="",this.Utils={whitespace:"\n\r\t ".split(""),single_token:"br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed,?php,?,?=".split(","),extra_liners:"head,body,/html".split(","),in_array:function(t,i){for(var e=0;e<i.length;e++)if(t===i[e])return!0;return!1}},this.get_content=function(){for(var t="",i=[],e=!1;"<"!==this.input.charAt(this.pos);){if(this.pos>=this.input.length)return i.length?i.join(""):["","TK_EOF"];if(t=this.input.charAt(this.pos),this.pos++,this.line_char_count++,this.Utils.in_array(t,this.Utils.whitespace))i.length&&(e=!0),this.line_char_count--;else{if(e){if(this.line_char_count>=this.max_char){i.push("\n");for(var n=0;n<this.indent_level;n++)i.push(this.indent_string);this.line_char_count=0}else i.push(" "),this.line_char_count++;e=!1}i.push(t)}}return i.length?i.join(""):""},this.get_contents_to=function(t){if(this.pos===this.input.length)return["","TK_EOF"];var i="",e=new RegExp("</"+t+"\\s*>","igm");e.lastIndex=this.pos;var n=e.exec(this.input),s=n?n.index:this.input.length;return this.pos<s&&(i=this.input.substring(this.pos,s),this.pos=s),i},this.record_tag=function(t){this.tags[t+"count"]?(this.tags[t+"count"]++,this.tags[t+this.tags[t+"count"]]=this.indent_level):(this.tags[t+"count"]=1,this.tags[t+this.tags[t+"count"]]=this.indent_level),this.tags[t+this.tags[t+"count"]+"parent"]=this.tags.parent,this.tags.parent=t+this.tags[t+"count"]},this.retrieve_tag=function(t){if(this.tags[t+"count"]){for(var i=this.tags.parent;i&&t+this.tags[t+"count"]!==i;)i=this.tags[i+"parent"];i&&(this.indent_level=this.tags[t+this.tags[t+"count"]],this.tags.parent=this.tags[i+"parent"]),delete this.tags[t+this.tags[t+"count"]+"parent"],delete this.tags[t+this.tags[t+"count"]],1===this.tags[t+"count"]?delete this.tags[t+"count"]:this.tags[t+"count"]--}},this.get_tag=function(t){var i,e,n="",s=[],h="",r=!1,_=this.pos,o=this.line_char_count;t=void 0!==t&&t;do{if(this.pos>=this.input.length)return t&&(this.pos=_,this.line_char_count=o),s.length?s.join(""):["","TK_EOF"];n=this.input.charAt(this.pos),this.pos++,this.line_char_count++,this.Utils.in_array(n,this.Utils.whitespace)?(r=!0,this.line_char_count--):("'"!==n&&'"'!==n||s[1]&&"!"===s[1]||(n+=this.get_unformatted(n),r=!0),"="===n&&(r=!1),s.length&&"="!==s[s.length-1]&&">"!==n&&r&&(this.line_char_count>=this.max_char?(this.print_newline(!1,s),this.line_char_count=0):(s.push(" "),this.line_char_count++),r=!1),"<"===n&&(i=this.pos-1),s.push(n))}while(">"!==n);var u,p=s.join("");u=-1!==p.indexOf(" ")?p.indexOf(" "):p.indexOf(">");var c=p.substring(1,u).toLowerCase();return"/"===p.charAt(p.length-2)||this.Utils.in_array(c,this.Utils.single_token)?t||(this.tag_type="SINGLE"):"script"===c?t||(this.record_tag(c),this.tag_type="SCRIPT"):"style"===c?t||(this.record_tag(c),this.tag_type="STYLE"):this.is_unformatted(c,a)?(h=this.get_unformatted("</"+c+">",p),s.push(h),i>0&&this.Utils.in_array(this.input.charAt(i-1),this.Utils.whitespace)&&s.splice(0,0,this.input.charAt(i-1)),e=this.pos-1,this.Utils.in_array(this.input.charAt(e+1),this.Utils.whitespace)&&s.push(this.input.charAt(e+1)),this.tag_type="SINGLE"):"!"===c.charAt(0)?-1!==c.indexOf("[if")?(-1!==p.indexOf("!IE")&&(h=this.get_unformatted("--\x3e",p),s.push(h)),t||(this.tag_type="START")):-1!==c.indexOf("[endif")?(this.tag_type="END",this.unindent()):-1!==c.indexOf("[cdata[")?(h=this.get_unformatted("]]>",p),s.push(h),t||(this.tag_type="SINGLE")):(h=this.get_unformatted("--\x3e",p),s.push(h),this.tag_type="SINGLE"):t||("/"===c.charAt(0)?(this.retrieve_tag(c.substring(1)),this.tag_type="END"):(this.record_tag(c),this.tag_type="START"),this.Utils.in_array(c,this.Utils.extra_liners)&&this.print_newline(!0,this.output)),t&&(this.pos=_,this.line_char_count=o),s.join("")},this.get_unformatted=function(t,i){if(i&&-1!==i.toLowerCase().indexOf(t))return"";var e="",n="",s=!0;do{if(this.pos>=this.input.length)return n;if(e=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(e,this.Utils.whitespace)){if(!s){this.line_char_count--;continue}if("\n"===e||"\r"===e){n+="\n",this.line_char_count=0;continue}}n+=e,this.line_char_count++,s=!0}while(-1===n.toLowerCase().indexOf(t));return n},this.get_token=function(){var t;if("TK_TAG_SCRIPT"===this.last_token||"TK_TAG_STYLE"===this.last_token){var i=this.last_token.substr(7);return"string"!=typeof(t=this.get_contents_to(i))?t:[t,"TK_"+i]}return"CONTENT"===this.current_mode?"string"!=typeof(t=this.get_content())?t:[t,"TK_CONTENT"]:"TAG"===this.current_mode?"string"!=typeof(t=this.get_tag())?t:[t,"TK_TAG_"+this.tag_type]:void 0},this.get_full_indent=function(t){return(t=this.indent_level+t||0)<1?"":Array(t+1).join(this.indent_string)},this.is_unformatted=function(t,i){if(!this.Utils.in_array(t,i))return!1;if("a"!==t.toLowerCase()||!this.Utils.in_array("a",i))return!0;var e=this.get_tag(!0);return!(!e||!this.Utils.in_array(e,i))},this.printer=function(t,i,e,n,s){this.input=t||"",this.output=[],this.indent_character=i,this.indent_string="",this.indent_size=e,this.brace_style=s,this.indent_level=0,this.max_char=n,this.line_char_count=0;for(var h=0;h<this.indent_size;h++)this.indent_string+=this.indent_character;this.print_newline=function(t,i){if(this.line_char_count=0,i&&i.length){if(!t)for(;this.Utils.in_array(i[i.length-1],this.Utils.whitespace);)i.pop();i.push("\n");for(var e=0;e<this.indent_level;e++)i.push(this.indent_string)}},this.print_token=function(t){this.output.push(t)},this.indent=function(){this.indent_level++},this.unindent=function(){this.indent_level>0&&this.indent_level--}},this},e.printer(t,s,n,h,r);;){var _=e.get_token();if(e.token_text=_[0],e.token_type=_[1],"TK_EOF"===e.token_type)break;switch(e.token_type){case"TK_TAG_START":e.print_newline(!1,e.output),e.print_token(e.token_text),e.indent(),e.current_mode="CONTENT";break;case"TK_TAG_STYLE":case"TK_TAG_SCRIPT":e.print_newline(!1,e.output),e.print_token(e.token_text),e.current_mode="CONTENT";break;case"TK_TAG_END":if("TK_CONTENT"===e.last_token&&""===e.last_text){var o=e.token_text.match(/\w+/)[0],u=e.output[e.output.length-1].match(/<\s*(\w+)/);null!==u&&u[1]===o||e.print_newline(!0,e.output)}e.print_token(e.token_text),e.current_mode="CONTENT";break;case"TK_TAG_SINGLE":var p=e.token_text.match(/^\s*<([a-z]+)/i);p&&e.Utils.in_array(p[1],a)||e.print_newline(!1,e.output),e.print_token(e.token_text),e.current_mode="CONTENT";break;case"TK_CONTENT":""!==e.token_text&&e.print_token(e.token_text),e.current_mode="TAG";break;case"TK_STYLE":case"TK_SCRIPT":if(""!==e.token_text){e.output.push("\n");var c,l=e.token_text,g=1;"TK_SCRIPT"===e.token_type?c="function"==typeof js_beautify&&js_beautify:"TK_STYLE"===e.token_type&&(c="function"==typeof css_beautify&&css_beautify),"keep"===i.indent_scripts?g=0:"separate"===i.indent_scripts&&(g=-e.indent_level);var f=e.get_full_indent(g);if(c)l=c(l.replace(/^\s*/,f),i);else{var d=l.match(/^\s*/)[0].match(/[^\n\r]*$/)[0].split(e.indent_string).length-1,T=e.get_full_indent(g-d);l=l.replace(/^\s*/,f).replace(/\r\n|\r|\n/g,"\n"+T).replace(/\s*$/,"")}l&&(e.print_token(l),e.print_newline(!0,e.output))}e.current_mode="TAG"}e.last_token=e.token_type,e.last_text=e.token_text}return e.output.join("")}"undefined"!=typeof exports&&(exports.html_beautify=style_html);

/*
 *  UICodeConsole.js
 *
 *  UIFormElements.js HTML Form toolkit extension
 *
 *  Copyright 2026 Jonathan Nowca
 *  License: CC BY-NC-SA
 */

var UICodeConsole = {
	VERSION: "0.8b",
	highlightForm: true,
	config: {
		highlightForm: true,
		export: {
			generateIds: false,
			fullHtmlDocument: true,
			embeddedCSS: true,
			injectScripts: false,
			formattedSpaces: false,
			extraHtml: ""
		}
	},
	outputHtml: {
		selected: 0,
		content: [],
		htmlOutputNode: undefined,
		codeOutputNode: undefined
	},
	load: function()
	{
		UICodeConsole._internals.active = true;
		UIFormElements._internals.css += UICodeConsole._internals.css;
		UICodeConsole._internals.formatDomStructure();
		UICodeConsole._internals.buildCodeConsole();
		UICodeConsole._internals.splitCodeConsole();

		UICodeConsole.config.export.highlightForm = localStorage.getItem("highlightForm") != undefined ? ((localStorage.getItem("highlightForm")  === "true")) : true;
		document.getElementById("toggle-highlight").checked = UICodeConsole.config.export.highlightForm;

		UIFormElements.config.generateIds = localStorage.getItem("generateIds") != undefined ? ((localStorage.getItem("generateIds")  === "true")) : true;
		document.getElementById("generate-id").checked = UIFormElements.config.generateIds;

		UICodeConsole.config.export.fullHtmlDocument = localStorage.getItem("fullHtmlDocument") != undefined ? ((localStorage.getItem("fullHtmlDocument")  === "true")) : true;
		document.getElementById("export-html-body").checked = UICodeConsole.config.export.fullHtmlDocument;

		UICodeConsole.config.export.embeddedCSS = localStorage.getItem("embeddedCSS") != undefined ? ((localStorage.getItem("embeddedCSS")  === "true")) : true;
		document.getElementById("export-embedded-css").checked = UICodeConsole.config.export.embeddedCSS;

		UICodeConsole.config.export.injectScripts = localStorage.getItem("injectScripts") != undefined ? ((localStorage.getItem("injectScripts")  === "true")) : true;
		document.getElementById("export-script-injection").checked = !UICodeConsole.config.export.injectScripts;

		UICodeConsole.config.export.formattedSpaces = localStorage.getItem("formattedSpaces") != undefined ? ((localStorage.getItem("formattedSpaces")  === "true")) : false;
		document.getElementById("export-spaces").checked = UICodeConsole.config.export.formattedSpaces;

        document.getElementById("export-html").setAttribute(
            "onclick",
            "UICodeConsole.download('ui-form-html-source')"
        );

        document.getElementById("export-css").setAttribute(
            "onclick",
            "UICodeConsole.getCSSFile()"
        );
	},
	getCSSFile: function()
	{
		var cssFilename = UIFormElements.config.themes[UIFormElements.config.theme].toLowerCase() + ".css";
		var cssLinks = document.querySelectorAll('link');
		var cssFileURL;

		for (var i = 0; i < cssLinks.length; i++)
		{
			var cssLink = cssLinks[i];

			if (cssLink.href.indexOf(cssFilename) !== -1)
			{
				cssFileURL = cssLink.href
			}
		}

		var link = document.createElement('a');
        link.href = cssFileURL;
        link.download = cssFileURL;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
	},
	add: function(rootNode)
	{
		if (UICodeConsole._internals.active == true)
		{
			window.addEventListener('onformloaded', function (e)
			{
			    var outputList = document.getElementById("code-output-list");
			
				if (outputList.children[0].value == "_none")
				{
					outputList.disabled = false;
					outputList.innerHTML = "";
				}

				UICodeConsole.outputHtml.content.push({
		            htmlNode: rootNode,
		            htmlSource: style_html(rootNode.innerHTML, {})
		        });

		        var pos = UICodeConsole.outputHtml.content.length-1;

		        UICodeConsole.outputHtml.content[pos].htmlSource = UICodeConsole.outputHtml.content[pos].htmlSource[0] == " " ? UICodeConsole.outputHtml.content[pos].htmlSource.substring(1) : UICodeConsole.outputHtml.content[pos].htmlSource;

		        var outputList = document.getElementById("code-output-list");
		        var htmlNode = UICodeConsole.outputHtml.content[pos].htmlNode;
		        var elementName = outputList.children.length + ": " + htmlNode.tagName;
		        elementName += htmlNode.id != undefined && htmlNode.id.length > 0 ? "#" + htmlNode.id : "";

		        var optionElement = document.createElement('option');
		        optionElement.textContent = elementName;
		        optionElement.value = outputList.length;
		        outputList.appendChild(optionElement);

		        //UICodeConsole.outputHtml.content[pos].htmlNode.classList.add("CodeOutput");
		        UICodeConsole.toggleHighlight(UICodeConsole.config.export.highlightForm)

		        var span = document.createElement('span');
		        span.classList.add("CodeOutputName")
		        span.textContent = elementName;
		        span.style = "position: absolute; top: -20px; right: 0;";
		        htmlNode.appendChild(span);
		       
		       	if (outputList.onchange == undefined)
		       	{
		       		outputList.onchange = UICodeConsole._internals.changeCodeOutput;
		       	}

		       	UICodeConsole._internals.refresh();
			});
       	}
	},
	toggleHighlight: function(checked)
	{
		if (checked == false)
		{
			for (var i = 0; i < UICodeConsole.outputHtml.content.length; i++)
            {
                UICodeConsole.outputHtml.content[i].htmlNode.classList.remove("CodeOutputActive");
                UICodeConsole.outputHtml.content[i].htmlNode.classList.remove("CodeOutput");
            }
            UICodeConsole.config.highlightForm = false;
		}
		else
		{
			var selected = document.getElementById("code-output-list").value;

			for (var i = 0; i < UICodeConsole.outputHtml.content.length; i++)
            {
            	if (i != selected)
            	{
            		UICodeConsole.outputHtml.content[i].htmlNode.classList.add("CodeOutput");
            	}
            }
            UICodeConsole.outputHtml.content[selected].htmlNode.classList.add("CodeOutputActive");
			UICodeConsole.config.highlightForm = true;
		}

		localStorage.setItem("highlightForm", UICodeConsole.config.highlightForm);
	},
	setIds: function(checked)
	{
		UIFormElements.config.generateIds = checked;
		localStorage.setItem("generateIds", checked);
		window.location.reload();
	},
	setFullHtml: function(checked)
	{
		UICodeConsole.config.export.fullHtmlDocument = checked;
		localStorage.setItem("fullHtmlDocument", checked);
	},
	setEmbeddedCSS: function(checked)
	{
		UICodeConsole.config.export.embeddedCSS = checked;
		localStorage.setItem("embeddedCSS", checked);
	},
	setScriptInjection: function(checked)
	{
		checked = !checked;
		UICodeConsole.config.export.injectScripts = checked;
		localStorage.setItem("injectScripts", checked);
		window.location.reload();
	},
	setFormattedSpaces: function(checked)
	{
		var infoText = "Exporting code with HTML-spaces can cause HTML formatting problems and display issues in spacing of elements.";
		var checkbox = document.getElementById("export-spaces");

		if (checkbox.checked == true)
		{
			if (confirm(infoText) == true)
			{
				UICodeConsole.config.export.formattedSpaces = true;
				localStorage.setItem("formattedSpaces", true);
			}
			else
			{
				UICodeConsole.config.export.formattedSpaces = false;
				localStorage.setItem("formattedSpaces", false);
				checkbox.checked = false;
			}
		}
		else
		{
			UICodeConsole.config.export.formattedSpaces = false;
			localStorage.setItem("formattedSpaces", false);
		}
	},
	download: function(filename)
    {
    	var timestamp = new Date().toISOString().replace(/:/g, "-").replace(/\./g, "-");
    	var scriptInjection = UICodeConsole.config.export.injectScripts == true ? '<script>\n\
	function setLabel(labelId, bindNodeId, text) { document.getElementById(labelId).textContent = text.replace("{value}", document.getElementById(bindNodeId).value); }\n\
</script>' : "";
		var htmlDocString_head;
		var htmlDocString_tail;
		var embeddedCSS = "";
		var cssFilename = UIFormElements.config.themes[UIFormElements.config.theme].toLowerCase() + ".css";

		var styleTagList;
		if (UICodeConsole.config.export.embeddedCSS == true)
		{
			styleTagList = document.querySelectorAll('style');
			for (var i = 0; i < styleTagList.length; i++)
			{
				embeddedCSS += "<style>" + styleTagList[i].textContent + "</style>\n";
			}
		}
		else
		{
			embeddedCSS = "";
		}

		if (UICodeConsole.config.export.fullHtmlDocument == true)
		{
			htmlDocString_head = '<!DOCTYPE html>\n\
<html lang="en">\n\
<head>\n\
    <meta charset="UTF-8">\n\
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\
    <title>UIFormElement.js HTML export ' + timestamp + '</title>\n\
	<link rel="stylesheet" href="' + cssFilename + '">' + embeddedCSS +
'</head>\n\
<body class="' + UIFormElements.config.theme + '">\n';
			htmlDocString_tail = '\n\
\n</body>\n\
</html>';
		}
		else
		{
			htmlDocString_head = "";
			htmlDocString_tail = "";
		}

    	var data = htmlDocString_head;

    	if (UICodeConsole.config.export.formattedSpaces == false)
		{
			data += UICodeConsole.outputHtml.content[UICodeConsole.outputHtml.selected].htmlSource.replace(/    /g, "").replace(/\n/g, ""); //.replaceAll("    ", "").replaceAll("\n", "");
		}
		else
		{
			data += UICodeConsole.outputHtml.content[UICodeConsole.outputHtml.selected].htmlSource;
		}

		data += scriptInjection + htmlDocString_tail;

        const blob = new Blob([data], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename + "-" + new Date().toISOString().replace(/:/g, "-").replace(/\./g, "-") + ".html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
	_internals:
	{
		active: false,
		/* css source-code included from prettify-modified.css into program code */
		css: "/**\
 * @license\
 * Copyright (C) 2015 Google Inc.\
 *\
 * Licensed under the Apache License, Version 2.0 (the \"License\");\
 * you may not use this file except in compliance with the License.\
 * You may obtain a copy of the License at\n\
 *\
 *      http://www.apache.org/licenses/LICENSE-2.0\
 *\
 * Unless required by applicable law or agreed to in writing, software\
 * distributed under the License is distributed on an \"AS IS\" BASIS,\
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\
 * See the License for the specific language governing permissions and\
 * limitations under the License.\
 */\
\
/* Pretty printing styles. Used with prettify.js. */\
\
/* SPAN elements with the classes below are added by prettyprint. */\
.pln { color: #204061 !important }  /* plain text */\
\
@media screen, print, projection {\
  .str { color: #658923 !important }  /* string content */\
  .kwd { color: #204061 !important }  /* a keyword */\
  .com { color: #066 !important }  /* a comment */\
  .typ { color: #956480 !important }  /* a type name */\
  .lit { color: #066 !important }  /* a literal value */\
  /* punctuation, lisp open bracket, lisp close bracket */\
  .pun, .opn, .clo { color: #660 !important }\
  .tag { color: #517194 !important }  /* a markup tag name */\
  .atn { color: #956480 !important }  /* a markup attribute name */\
  .atv { color: #658923 !important }  /* a markup attribute value */\
  .dec, .var { color: #956480 !important }  /* a declaration; a variable name */\
  .fun { color: red }  /* a function name */\
}\
\
/* Put a border around prettyprinted code snippets. */\
pre.prettyprint { padding: 2px; border: 1px solid #888 !important }\
\
/* Specify class=linenums on a pre to get line numbering */\
ol.linenums { margin-top: 0; margin-bottom: 0 } /* IE indents via margin-left */\
\
li::marker {\
  color: #bbbbbb;\
}\
\
/* UICodeConsole extension css settings */\
\n\n\
#html-code-output pre span {\
    padding: 0 !important;\
}\
\
.CodeOutput,\
.CodeOutputActive {\
    position: relative;\
    margin: 4px;\
    padding: 16px;\
}\
\
.CodeOutput {\
    border: 1px dashed #aaaaaa;\
}\
\
.CodeOutputActive {\
    border: 1px dashed #00aaaa;\
}\
\
.CodeOutputActive .CodeOutputName {\
    color: #00aaaa;\
}\
\
.CodeOutput .CodeOutputName {\
    color: #aaaaaa;\
}\
\
pre {\
    padding-left: 8px;\
}\
\
pre,\
#html-code-output-content {\
    padding-top: 8px;\
    padding-bottom: 8px;\
}\
\
#html-code-output * {\
	font-family: Verdana, Arial, monospace !important;\
    font-size: 12px !important;\
    font-weight: normal;\
}\
\
pre,\
#html-code-output-content * {\
    font-family: monospace !important;\
}\
\
.gutter {\
    float: none !important;\
    position: relative;\
    display: inline-block;\
    height: 100vh;\
\
    cursor: ew-resize;\
    cursor: -moz-ew-resize;\
    cursor: -webkit-ew-resize;\
\
    background-color: #3C3C3C;\
    border-right: 1px solid #5E5E5E;\
}\
\
.gutter:hover {\
    background-color: #4D4D4D;\
}\
\
.gutter div {\
	position: absolute; width: 2px;\
    height: 64px;\
    border: 2px dotted #888888;\
    left: 2px;\
    bottom: 50%;\
}",
		formatDomStructure: function()
		{
			if (UICodeConsole.outputHtml.codeOutputNode == undefined)
			{
				UICodeConsole.outputHtml.codeOutputNode = document.createElement("div");
				UICodeConsole.outputHtml.codeOutputNode.id = "code-dump-output";
				UICodeConsole.outputHtml.codeOutputNode.style = "position: relative; display: inline-block; overflow: hidden; height: 100vh;";
				document.body.appendChild(UICodeConsole.outputHtml.codeOutputNode);

				var html = document.body.innerHTML;
				UICodeConsole.outputHtml.htmlOutputNode = document.createElement("div");
				UICodeConsole.outputHtml.htmlOutputNode.id = "html-output";
				UICodeConsole.outputHtml.htmlOutputNode.style = "overflow: scroll; height: 100vh; display: inline-block;";
				document.body.appendChild(UICodeConsole.outputHtml.htmlOutputNode);

				var innerContainer = document.createElement("div");
				innerContainer.id = "html-output-inner-container";
				innerContainer.style.setProperty("padding", window.getComputedStyle(document.body).padding || "32px");
				UICodeConsole.outputHtml.htmlOutputNode.appendChild(innerContainer);

				var nodes = document.querySelectorAll("body > *");

				for (var i = 0; i < nodes.length; i++)
				{
					var node = nodes[i];

					if (node.id != "html-output" && node.id != "code-dump-output" && node.tagName.toLowerCase() != "script")
					{
						UICodeConsole.outputHtml.htmlOutputNode.children[0].appendChild(node);
					}
				}

				document.getElementsByTagName("body")[0].style = "padding: 0 !important;";
			}
		},
		buildCodeConsole: function()
		{
			var buttonStyle = "position: relative; width: auto; height: 32px; margin: 0 0 2px 10px; padding: 0;";

			var uiConsoleCodeButtons = UIGroup({
				id: "console-code-buttons",
				style: "position: absolute; bottom: 20px; margin: 0; padding: 0; width: 100%;"
			}).add([
				UIGroup({ style: "margin: 8px;" }).add([
					UICheckbox({ id: "toggle-highlight", text: "Show UI Form highlight marker", style: "min-width: 200px; border-right: 1px solid #555555; color: #cccccc;", inline: true, checked: true, onchange: "UICodeConsole.toggleHighlight(this.checked)" }),
					UICheckbox({ id: "generate-id", text: "Generate id on unset id", style: "margin-left: 16px; color: #cccccc;", inline: true, checked: (localStorage.getItem("generateIds") || true), onchange: "UICodeConsole.setIds(this.checked)" })
				]),
				UISeperator({ style: "margin: 0 0 10px 8px; border-color: #555555;" }),
				UIGroup({ style: "margin: 8px;" }).add([
					UIGroup().add([
						UICheckbox({ id: "export-html-body", text: "Export with HTML head + body", style: "min-width: 200px; border-right: 1px solid #555555; color: #cccccc;;", inline: true, checked: true, onchange: "UICodeConsole.setFullHtml(this.checked)" }),
						UICheckbox({ id: "export-embedded-css", text: "Export embedded CSS", style: "margin-left: 16px; color: #cccccc;", inline: true, checked: true, onchange: "UICodeConsole.setEmbeddedCSS(this.checked)" })
					]),
					UICheckbox({ id: "export-script-injection", text: "Export events in <input oninput=\"...\"> instead in <script>", style: "color: #cccccc;", inline: false, checked: (localStorage.getItem("injectScripts") || true), onchange: "UICodeConsole.setScriptInjection(this.checked)" }),
					UICheckbox({ id: "export-spaces", text: "Export with formatted HTML spaces", style: "color: #cccccc;", inline: false, checked: (localStorage.getItem("formattedSpaces") || false), onchange: "UICodeConsole.setFormattedSpaces(this.checked)" })
				]),
				UISeperator({ style: "margin: 0 0 14px 8px; border-color: #555555;" }),
				UIGroup().add([
					UIButton({
						id: "about",
						text: "About",
						style: buttonStyle,
						onclick: "UICodeConsole._internals.aboutDialog()"
					}),
					UIButton({
						id: "copy-to-clipboard",
						text: "Copy to clipboard",
						style: buttonStyle
					}),
					UIButton({
						id: "export-html",
						text: "Export HTML-File",
						style: buttonStyle
					}),
					UIButton({
						id: "export-css",
						text: "Get CSS-Theme",
						style: buttonStyle
					})
				])
			]);

			var codeConsoleHtmlOutput = UIGroup({
				id: "html-code-output",
				title: "Generated HTML Output",
				style: "background-color: #3C3C3C; width: 100%; height: 100%; padding: 0 10px 10px 0;"
			}).add([
				UIGroup().add([
					UILabel({
						text: "Generated HTML Output",
						style: "font-weight: bold; font-size: 12px; background-color: #406161; height: 12px; padding: 10px 0 10px 24px !important; color: #ffffff; position: absolute; left: 0; right: 0;"
					}),
					UIDropdownList({
						id: "code-output-list",
						values: { "_none": "Use UICodeConsole.add() to load the code output" },
						style: "float: right; position: absolute; right: 0; width: 50%; height: 32px",
						disabled: "true"
					})
				]),
				UICustomHTMLElement({
					tagName: "pre",
					id: "html-code-output-content",
					class: "prettyprint lang-html linenums",
					style: "background-color: #ffffff; width: auto; overflow: scroll; position: absolute; top: 20px; bottom: 200px; left: 0; right: 10px; box-shadow: 0px 0px 10px 4px #cccccc inset;",
				}),
				uiConsoleCodeButtons
			]);

			UICodeConsole.outputHtml.codeOutputNode.appendChild(codeConsoleHtmlOutput.createHTMLElement());

			if (uiConsoleCodeButtons != undefined)
			{
				document.getElementById("copy-to-clipboard").onclick = function()
				{
		       		var htmlSourceOutput = UICodeConsole.outputHtml.content[document.getElementById("code-output-list").value].htmlSource;

					if (navigator.clipboard != undefined)
					{
						try
						{
							navigator.clipboard.writeText(htmlSourceOutput);
						}
						catch (error)
						{
							console.error(error.message);
						}
					}

					var codeOutput = document.querySelectorAll("#html-code-output-content span");
					var codeSelection = document.createRange();
					codeSelection.setStartBefore(codeOutput[0]);
					codeSelection.setEndAfter(codeOutput[codeOutput.length-1]);
					window.getSelection().addRange(codeSelection);
				}
			}
		},
		splitCodeConsole: function()
		{
			Split([
				UICodeConsole.outputHtml.codeOutputNode.id,
				UICodeConsole.outputHtml.htmlOutputNode.id
			],
			{
				gutter: true,
	        	widths: [30, 70],
	        	minWidth: 420
		    });

		    var gutter = document.getElementsByClassName("gutter")[0];
		    gutter.appendChild(document.createElement("div"));

		    window.onresize = function()
		    {
		    	Split([
					UICodeConsole.outputHtml.codeOutputNode.id,
					UICodeConsole.outputHtml.htmlOutputNode.id
				],
				{
					gutter: false,
		        	widths: [30, 70],
		        	minWidth: 420
			    });
		    }
		},
		formatHtml: function(s)
		{
		    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&lt;script src[\s\S]*?&gt;&lt;\/script&gt;|&lt;!--\?[\s\S]*?--&gt;|&lt;pre\b[\s\S]*?&lt;\/pre&gt;/g, '<span class="operative">$&<\/span>');
		},
		refresh: function()
		{
			UICodeConsole._internals.changeCodeOutput({ target: { value: 0 } });
		},
		changeCodeOutput: function(e)
		{
			value = e.target.value;

			UICodeConsole.outputHtml.selected = Number(value);

			if (UICodeConsole.config.highlightForm == true)
			{
				for (var i = 0; i < UICodeConsole.outputHtml.content.length; i++)
		        {
		            UICodeConsole.outputHtml.content[i].htmlNode.classList.remove("CodeOutputActive");
		            UICodeConsole.outputHtml.content[i].htmlNode.classList.remove("CodeOutput");

		            if (i != value)
		            {
		                UICodeConsole.outputHtml.content[i].htmlNode.classList.add("CodeOutput");
		            }
		        }

		        UICodeConsole.outputHtml.content[value].htmlNode.classList.add("CodeOutputActive");
		    }

	        document.getElementById("html-code-output-content").innerHTML = UICodeConsole._internals.formatHtml(UICodeConsole.outputHtml.content[value].htmlSource);
	        prettyPrint();
		},
		aboutDialog: function()
		{
			document.body.style = "padding: 0 !important; filter: blur(20px);";
			setTimeout(function() {
				alert("UIFormElements.js v" + UIFormElements.VERSION + "\n\
UICodeConsole.js v" +  UICodeConsole.VERSION + " extension\n\n\
Legacy-compatible HTML Form toolkit\n\n\
Copyright 2026 Jonathan Nowca - License: CC BY-NC-SA");
				document.body.style = "padding: 0 !important;";
			}, 100);
		}
	}
};

