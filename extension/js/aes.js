pidCryptUtil={};pidCryptUtil.encodeBase64=function(n,p){if(!n){n=""}var g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";p=(typeof p=="undefined")?false:p;var f,b,a,r,o,k,j,h,i=[],d="",m,q,l;q=p?pidCryptUtil.encodeUTF8(n):n;m=q.length%3;if(m>0){while(m++<3){d+="=";q+="\0"}}for(m=0;m<q.length;m+=3){f=q.charCodeAt(m);b=q.charCodeAt(m+1);a=q.charCodeAt(m+2);r=f<<16|b<<8|a;o=r>>18&63;k=r>>12&63;j=r>>6&63;h=r&63;i[m/3]=g.charAt(o)+g.charAt(k)+g.charAt(j)+g.charAt(h)}l=i.join("");l=l.slice(0,l.length-d.length)+d;return l};pidCryptUtil.decodeBase64=function(n,e){if(!n){n=""}var g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e=(typeof e=="undefined")?false:e;var f,b,a,o,k,i,h,q,j=[],p,m;m=e?pidCryptUtil.decodeUTF8(n):n;for(var l=0;l<m.length;l+=4){o=g.indexOf(m.charAt(l));k=g.indexOf(m.charAt(l+1));i=g.indexOf(m.charAt(l+2));h=g.indexOf(m.charAt(l+3));q=o<<18|k<<12|i<<6|h;f=q>>>16&255;b=q>>>8&255;a=q&255;j[l/4]=String.fromCharCode(f,b,a);if(h==64){j[l/4]=String.fromCharCode(f,b)}if(i==64){j[l/4]=String.fromCharCode(f)}}p=j.join("");p=e?pidCryptUtil.decodeUTF8(p):p;return p};pidCryptUtil.encodeUTF8=function(a){if(!a){a=""}a=a.replace(/[\u0080-\u07ff]/g,function(d){var b=d.charCodeAt(0);return String.fromCharCode(192|b>>6,128|b&63)});a=a.replace(/[\u0800-\uffff]/g,function(d){var b=d.charCodeAt(0);return String.fromCharCode(224|b>>12,128|b>>6&63,128|b&63)});return a};pidCryptUtil.decodeUTF8=function(a){if(!a){a=""}a=a.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(d){var b=(d.charCodeAt(0)&31)<<6|d.charCodeAt(1)&63;return String.fromCharCode(b)});a=a.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(d){var b=((d.charCodeAt(0)&15)<<12)|((d.charCodeAt(1)&63)<<6)|(d.charCodeAt(2)&63);return String.fromCharCode(b)});return a};pidCryptUtil.convertToHex=function(d){if(!d){d=""}var c="";var a="";for(var b=0;b<d.length;b++){a=d.charCodeAt(b).toString(16);c+=(a.length==1)?"0"+a:a}return c};pidCryptUtil.convertFromHex=function(c){if(!c){c=""}var b="";for(var a=0;a<c.length;a+=2){b+=String.fromCharCode(parseInt(c.substring(a,a+2),16))}return b};pidCryptUtil.stripLineFeeds=function(b){if(!b){b=""}var a="";a=b.replace(/\n/g,"");a=a.replace(/\r/g,"");return a};pidCryptUtil.toByteArray=function(b){if(!b){b=""}var c=[];for(var a=0;a<b.length;a++){c[a]=b.charCodeAt(a)}return c};pidCryptUtil.fragment=function(e,d,a){if(!e){e=""}if(!d||d>=e.length){return e}if(!a){a="\n"}var c="";for(var b=0;b<e.length;b+=d){c+=e.substr(b,d)+a}return c};pidCryptUtil.formatHex=function(f,e){if(!f){f=""}if(!e){e=45}var a="";var b=0;var d=f.toLowerCase();for(var c=0;c<d.length;c+=2){a+=d.substr(c,2)+":"}d=this.fragment(a,e);return d};pidCryptUtil.byteArray2String=function(a){var d="";for(var c=0;c<a.length;c++){d+=String.fromCharCode(a[c])}return d};/*Copyright (c) 2009 pidder <www.pidder.com>*/
function pidCrypt(){function a(b){if(!b){b=8}var c=new Array(b);var e=[];for(var d=0;d<256;d++){e[d]=d}for(d=0;d<c.length;d++){c[d]=e[Math.floor(Math.random()*e.length)]}return c}this.setDefaults=function(){this.params.nBits=256;this.params.salt=a(8);this.params.salt=pidCryptUtil.byteArray2String(this.params.salt);this.params.salt=pidCryptUtil.convertToHex(this.params.salt);this.params.blockSize=16;this.params.UTF8=true;this.params.A0_PAD=true};this.debug=true;this.params={};this.params.dataIn="";this.params.dataOut="";this.params.decryptIn="";this.params.decryptOut="";this.params.encryptIn="";this.params.encryptOut="";this.params.key="";this.params.iv="";this.params.clear=true;this.setDefaults();this.errors="";this.warnings="";this.infos="";this.debugMsg="";this.setParams=function(c){if(!c){c={}}for(var b in c){this.params[b]=c[b]}};this.getParams=function(){return this.params};this.getParam=function(b){return this.params[b]||""};this.clearParams=function(){this.params={}};this.getNBits=function(){return this.params.nBits};this.getOutput=function(){return this.params.dataOut};this.setError=function(b){this.error=b};this.appendError=function(b){this.errors+=b;return""};this.getErrors=function(){return this.errors};this.isError=function(){if(this.errors.length>0){return true}return false};this.appendInfo=function(b){this.infos+=b;return""};this.getInfos=function(){return this.infos};this.setDebug=function(b){this.debug=b};this.appendDebug=function(b){this.debugMsg+=b;return""};this.isDebug=function(){return this.debug};this.getAllMessages=function(c){var g={lf:"\n",clr_mes:false,verbose:15};if(!c){c=g}for(var h in g){if(typeof(c[h])=="undefined"){c[h]=g[h]}}var b="";var e="";for(var f in this.params){switch(f){case"encryptOut":e=pidCryptUtil.toByteArray(this.params[f].toString());e=pidCryptUtil.fragment(e.join(),64,c.lf);break;case"key":case"iv":e=pidCryptUtil.formatHex(this.params[f],48);break;default:e=pidCryptUtil.fragment(this.params[f].toString(),64,c.lf)}b+="<p><b>"+f+"</b>:<pre>"+e+"</pre></p>"}if(this.debug){b+="debug: "+this.debug+c.lf}if(this.errors.length>0&&((c.verbose&1)==1)){b+="Errors:"+c.lf+this.errors+c.lf}if(this.warnings.length>0&&((c.verbose&2)==2)){b+="Warnings:"+c.lf+this.warnings+c.lf}if(this.infos.length>0&&((c.verbose&4)==4)){b+="Infos:"+c.lf+this.infos+c.lf}if(this.debug&&((c.verbose&8)==8)){b+="Debug messages:"+c.lf+this.debugMsg+c.lf}if(c.clr_mes){this.errors=this.infos=this.warnings=this.debug=""}return b};this.getRandomBytes=function(b){return a(b)}};if(typeof(pidCrypt)!="undefined"){pidCrypt.MD5=function(s){function K(b,a){return(b<<a)|(b>>>(32-a))}function J(k,b){var F,a,d,x,c;d=(k&2147483648);x=(b&2147483648);F=(k&1073741824);a=(b&1073741824);c=(k&1073741823)+(b&1073741823);if(F&a){return(c^2147483648^d^x)}if(F|a){if(c&1073741824){return(c^3221225472^d^x)}else{return(c^1073741824^d^x)}}else{return(c^d^x)}}function r(a,c,b){return(a&c)|((~a)&b)}function q(a,c,b){return(a&b)|(c&(~b))}function p(a,c,b){return(a^c^b)}function n(a,c,b){return(c^(a|(~b)))}function u(G,F,Z,Y,k,H,I){G=J(G,J(J(r(F,Z,Y),k),I));return J(K(G,H),F)}function f(G,F,Z,Y,k,H,I){G=J(G,J(J(q(F,Z,Y),k),I));return J(K(G,H),F)}function D(G,F,Z,Y,k,H,I){G=J(G,J(J(p(F,Z,Y),k),I));return J(K(G,H),F)}function t(G,F,Z,Y,k,H,I){G=J(G,J(J(n(F,Z,Y),k),I));return J(K(G,H),F)}function e(k){var G;var d=k.length;var c=d+8;var b=(c-(c%64))/64;var F=(b+1)*16;var H=Array(F-1);var a=0;var x=0;while(x<d){G=(x-(x%4))/4;a=(x%4)*8;H[G]=(H[G]|(k.charCodeAt(x)<<a));x++}G=(x-(x%4))/4;a=(x%4)*8;H[G]=H[G]|(128<<a);H[F-2]=d<<3;H[F-1]=d>>>29;return H}function B(c){var b="",d="",k,a;for(a=0;a<=3;a++){k=(c>>>(a*8))&255;d="0"+k.toString(16);b=b+d.substr(d.length-2,2)}return b}var C=Array();var O,h,E,v,g,X,W,V,U;var R=7,P=12,M=17,L=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var T=6,S=10,Q=15,N=21;C=e(s);X=1732584193;W=4023233417;V=2562383102;U=271733878;for(O=0;O<C.length;O+=16){h=X;E=W;v=V;g=U;X=u(X,W,V,U,C[O+0],R,3614090360);U=u(U,X,W,V,C[O+1],P,3905402710);V=u(V,U,X,W,C[O+2],M,606105819);W=u(W,V,U,X,C[O+3],L,3250441966);X=u(X,W,V,U,C[O+4],R,4118548399);U=u(U,X,W,V,C[O+5],P,1200080426);V=u(V,U,X,W,C[O+6],M,2821735955);W=u(W,V,U,X,C[O+7],L,4249261313);X=u(X,W,V,U,C[O+8],R,1770035416);U=u(U,X,W,V,C[O+9],P,2336552879);V=u(V,U,X,W,C[O+10],M,4294925233);W=u(W,V,U,X,C[O+11],L,2304563134);X=u(X,W,V,U,C[O+12],R,1804603682);U=u(U,X,W,V,C[O+13],P,4254626195);V=u(V,U,X,W,C[O+14],M,2792965006);W=u(W,V,U,X,C[O+15],L,1236535329);X=f(X,W,V,U,C[O+1],A,4129170786);U=f(U,X,W,V,C[O+6],z,3225465664);V=f(V,U,X,W,C[O+11],y,643717713);W=f(W,V,U,X,C[O+0],w,3921069994);X=f(X,W,V,U,C[O+5],A,3593408605);U=f(U,X,W,V,C[O+10],z,38016083);V=f(V,U,X,W,C[O+15],y,3634488961);W=f(W,V,U,X,C[O+4],w,3889429448);X=f(X,W,V,U,C[O+9],A,568446438);U=f(U,X,W,V,C[O+14],z,3275163606);V=f(V,U,X,W,C[O+3],y,4107603335);W=f(W,V,U,X,C[O+8],w,1163531501);X=f(X,W,V,U,C[O+13],A,2850285829);U=f(U,X,W,V,C[O+2],z,4243563512);V=f(V,U,X,W,C[O+7],y,1735328473);W=f(W,V,U,X,C[O+12],w,2368359562);X=D(X,W,V,U,C[O+5],o,4294588738);U=D(U,X,W,V,C[O+8],m,2272392833);V=D(V,U,X,W,C[O+11],l,1839030562);W=D(W,V,U,X,C[O+14],j,4259657740);X=D(X,W,V,U,C[O+1],o,2763975236);U=D(U,X,W,V,C[O+4],m,1272893353);V=D(V,U,X,W,C[O+7],l,4139469664);W=D(W,V,U,X,C[O+10],j,3200236656);X=D(X,W,V,U,C[O+13],o,681279174);U=D(U,X,W,V,C[O+0],m,3936430074);V=D(V,U,X,W,C[O+3],l,3572445317);W=D(W,V,U,X,C[O+6],j,76029189);X=D(X,W,V,U,C[O+9],o,3654602809);U=D(U,X,W,V,C[O+12],m,3873151461);V=D(V,U,X,W,C[O+15],l,530742520);W=D(W,V,U,X,C[O+2],j,3299628645);X=t(X,W,V,U,C[O+0],T,4096336452);U=t(U,X,W,V,C[O+7],S,1126891415);V=t(V,U,X,W,C[O+14],Q,2878612391);W=t(W,V,U,X,C[O+5],N,4237533241);X=t(X,W,V,U,C[O+12],T,1700485571);U=t(U,X,W,V,C[O+3],S,2399980690);V=t(V,U,X,W,C[O+10],Q,4293915773);W=t(W,V,U,X,C[O+1],N,2240044497);X=t(X,W,V,U,C[O+8],T,1873313359);U=t(U,X,W,V,C[O+15],S,4264355552);V=t(V,U,X,W,C[O+6],Q,2734768916);W=t(W,V,U,X,C[O+13],N,1309151649);X=t(X,W,V,U,C[O+4],T,4149444226);U=t(U,X,W,V,C[O+11],S,3174756917);V=t(V,U,X,W,C[O+2],Q,718787259);W=t(W,V,U,X,C[O+9],N,3951481745);X=J(X,h);W=J(W,E);V=J(V,v);U=J(U,g)}var i=B(X)+B(W)+B(V)+B(U);return i.toLowerCase()}};/*Copyright (c) 2009 pidder <www.pidder.com>*/
if(typeof(pidCrypt)!="undefined"){pidCrypt.AES=function(a){this.env=(a)?a:new pidCrypt();this.blockSize=16;this.ShiftRowTabInv;this.xtime;this.SBox=new Array(99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22);this.SBoxInv=new Array(82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125);this.ShiftRowTab=new Array(0,5,10,15,4,9,14,3,8,13,2,7,12,1,6,11)};pidCrypt.AES.prototype.init=function(){this.env.setParams({blockSize:this.blockSize});this.ShiftRowTabInv=new Array(16);for(var a=0;a<16;a++){this.ShiftRowTabInv[this.ShiftRowTab[a]]=a}this.xtime=new Array(256);for(a=0;a<128;a++){this.xtime[a]=a<<1;this.xtime[128+a]=(a<<1)^27}};pidCrypt.AES.prototype.expandKey=function(b){var e=b.slice();var f=e.length,h,g=1;switch(f){case 16:h=16*(10+1);break;case 24:h=16*(12+1);break;case 32:h=16*(14+1);break;default:alert("AESCore.expandKey: Only key lengths of 16, 24 or 32 bytes allowed!")}for(var d=f;d<h;d+=4){var a=e.slice(d-4,d);if(d%f==0){a=new Array(this.SBox[a[1]]^g,this.SBox[a[2]],this.SBox[a[3]],this.SBox[a[0]]);if((g<<=1)>=256){g^=283}}else{if((f>24)&&(d%f==16)){a=new Array(this.SBox[a[0]],this.SBox[a[1]],this.SBox[a[2]],this.SBox[a[3]])}}for(var c=0;c<4;c++){e[d+c]=e[d+c-f]^a[c]}}return e};pidCrypt.AES.prototype.encrypt=function(b,d){var a=d.length;var e=b.slice();this.addRoundKey(e,d.slice(0,16));for(var c=16;c<a-16;c+=16){this.subBytes(e);this.shiftRows(e);this.mixColumns(e);this.addRoundKey(e,d.slice(c,c+16))}this.subBytes(e);this.shiftRows(e);this.addRoundKey(e,d.slice(c,a));return e};pidCrypt.AES.prototype.decrypt=function(b,d){var a=d.length;var e=b.slice();this.addRoundKey(e,d.slice(a-16,a));this.shiftRows(e,1);this.subBytes(e,1);for(var c=a-32;c>=16;c-=16){this.addRoundKey(e,d.slice(c,c+16));this.mixColumns_Inv(e);this.shiftRows(e,1);this.subBytes(e,1)}this.addRoundKey(e,d.slice(0,16));return e};pidCrypt.AES.prototype.subBytes=function(d,a){var c=(typeof(a)=="undefined")?this.SBox.slice():this.SBoxInv.slice();for(var b=0;b<16;b++){d[b]=c[d[b]]}};pidCrypt.AES.prototype.addRoundKey=function(c,a){for(var b=0;b<16;b++){c[b]^=a[b]}};pidCrypt.AES.prototype.shiftRows=function(d,a){var e=(typeof(a)=="undefined")?this.ShiftRowTab.slice():this.ShiftRowTabInv.slice();var c=new Array().concat(d);for(var b=0;b<16;b++){d[b]=c[e[b]]}};pidCrypt.AES.prototype.mixColumns=function(g){for(var d=0;d<16;d+=4){var f=g[d+0],c=g[d+1];var b=g[d+2],a=g[d+3];var e=f^c^b^a;g[d+0]^=e^this.xtime[f^c];g[d+1]^=e^this.xtime[c^b];g[d+2]^=e^this.xtime[b^a];g[d+3]^=e^this.xtime[a^f]}};pidCrypt.AES.prototype.mixColumns_Inv=function(a){for(var b=0;b<16;b+=4){var l=a[b+0],k=a[b+1];var j=a[b+2],g=a[b+3];var c=l^k^j^g;var f=this.xtime[c];var e=this.xtime[this.xtime[f^l^j]]^c;var d=this.xtime[this.xtime[f^k^g]]^c;a[b+0]^=e^this.xtime[l^k];a[b+1]^=d^this.xtime[k^j];a[b+2]^=e^this.xtime[j^g];a[b+3]^=d^this.xtime[g^l]}};pidCrypt.AES.prototype.xOr_Array=function(b,a){var d;var c=Array();for(d=0;d<b.length;d++){c[d]=b[d]^a[d]}return c};pidCrypt.AES.prototype.getCounterBlock=function(){var b=new Array(this.blockSize);var e=(new Date()).getTime();var d=Math.floor(e/1000);var a=e%1000;for(var c=0;c<4;c++){b[c]=(d>>>c*8)&255}for(var c=0;c<4;c++){b[c+4]=a&255}return b.slice()}};if(typeof(pidCrypt)!="undefined"&&typeof(pidCrypt.AES)!="undefined"&&typeof(pidCrypt.MD5)!="undefined"){pidCrypt.AES.CBC=function(){this.pidcrypt=new pidCrypt();this.aes=new pidCrypt.AES(this.pidcrypt);this.getOutput=function(){return this.pidcrypt.getOutput()};this.getAllMessages=function(a){return this.pidcrypt.getAllMessages(a)};this.isError=function(){return this.pidcrypt.isError()}};pidCrypt.AES.CBC.prototype.init=function(b,a){if(!a){a={}}var f=this.pidcrypt;f.setDefaults();var e=this.pidcrypt.getParams();for(var d in a){e[d]=a[d]}var c=this.createKeyAndIv({password:b,salt:e.salt,bits:e.nBits});e.key=c.key;e.iv=c.iv;e.dataOut="";f.setParams(e);this.aes.init()};pidCrypt.AES.CBC.prototype.initEncrypt=function(c,b,a){this.init(b,a);this.pidcrypt.setParams({dataIn:c,encryptIn:pidCryptUtil.toByteArray(c)})};pidCrypt.AES.CBC.prototype.initDecrypt=function(e,b,a){if(!a){a={}}var f=this.pidcrypt;f.setParams({dataIn:e});if(!b){f.appendError("pidCrypt.AES.CBC.initFromEncryption: Sorry, can not crypt or decrypt without password.\n")}var d=pidCryptUtil.decodeBase64(e);if(d.indexOf("Salted__")!=0){f.appendError("pidCrypt.AES.CBC.initFromCrypt: Sorry, unknown encryption method.\n")}var c=d.substr(8,8);a.salt=pidCryptUtil.convertToHex(c);this.init(b,a);d=d.substr(16);f.setParams({decryptIn:pidCryptUtil.toByteArray(d)})};pidCrypt.AES.CBC.prototype.initByValues=function(c,d,b,a){var e={};this.init("",a);e.dataIn=c;e.key=d;e.iv=b;this.pidcrypt.setParams(e)};pidCrypt.AES.CBC.prototype.getAllMessages=function(a){return this.pidcrypt.getAllMessages(a)};pidCrypt.AES.CBC.prototype.createKeyAndIv=function(b){var i=this.pidcrypt;var h={};var l=1;var d="3";if(!b){b={}}if(!b.salt){b.salt=i.getRandomBytes(8);b.salt=pidCryptUtil.convertToHex(pidCryptUtil.byteArray2String(b.salt));i.setParams({salt:b.salt})}var e=b.password+pidCryptUtil.convertFromHex(b.salt);var a="";var n="";var f=[];var k=0;f[k++]=e;for(var g=0;g<d;g++){if(g==0){n=e}else{a=pidCryptUtil.convertFromHex(n);a+=e;n=a}for(var m=0;m<l;m++){n=pidCrypt.MD5(n)}f[k++]=n}switch(b.bits){case 128:h.key=f[1];h.iv=f[2];break;case 192:h.key=f[1]+f[2].substr(0,16);h.iv=f[3];break;case 256:h.key=f[1]+f[2];h.iv=f[3];break;default:i.appendError("pidCrypt.AES.CBC.createKeyAndIv: Sorry, only 128, 192 and 256 bits are supported.\nBits("+typeof(b.bits)+") = "+b.bits)}return h};pidCrypt.AES.CBC.prototype.encryptRaw=function(h){var a=this.pidcrypt;var k=this.aes;var l=a.getParams();if(!h){h=l.encryptIn}a.setParams({encryptIn:h});if(!l.dataIn){a.setParams({dataIn:h})}var d=pidCryptUtil.convertFromHex(l.iv);var j=l.blockSize-((h.length+1)%l.blockSize);if(l.A0_PAD){h[h.length]=10}for(var r=0;r<j;r++){h[h.length]=j}var f=Math.floor(l.nBits/8);var m=new Array(f);var v=pidCryptUtil.convertFromHex(l.key);for(var o=0;o<f;o++){m[o]=isNaN(v.charCodeAt(o))?0:v.charCodeAt(o)}var s=k.expandKey(m);var n=Math.ceil(h.length/l.blockSize);var g=new Array(n);var q=[];var e=pidCryptUtil.toByteArray(d);for(var t=0;t<n;t++){q=h.slice(t*l.blockSize,t*l.blockSize+l.blockSize);e=k.xOr_Array(e,q);e=k.encrypt(e.slice(),s);g[t]=pidCryptUtil.byteArray2String(e)}var u=g.join("");a.setParams({dataOut:u,encryptOut:u});if(!a.isDebug()&&a.clear){a.clearParams()}return u||""};pidCrypt.AES.CBC.prototype.encrypt=function(c){var e=this.pidcrypt;var a="";var d=e.getParams();if(!c){c=d.dataIn}if(d.UTF8){c=pidCryptUtil.encodeUTF8(c)}e.setParams({dataIn:c,encryptIn:pidCryptUtil.toByteArray(c)});var b=this.encryptRaw();a="Salted__"+pidCryptUtil.convertFromHex(d.salt);b=a+b;b=pidCryptUtil.encodeBase64(b);e.setParams({dataOut:b});if(!e.isDebug()&&e.clear){e.clearParams()}return b||""};pidCrypt.AES.CBC.prototype.encryptText=function(c,b,a){this.initEncrypt(c,b,a);return this.encrypt()};pidCrypt.AES.CBC.prototype.decryptRaw=function(k){var n=this.aes;var c=this.pidcrypt;var o=c.getParams();if(!k){k=o.decryptIn}c.setParams({decryptIn:k});if(!o.dataIn){c.setParams({dataIn:k})}if((o.iv.length/2)<o.blockSize){return c.appendError("pidCrypt.AES.CBC.decrypt: Sorry, can not decrypt without complete set of parameters.\n Length of key,iv:"+o.key.length+","+o.iv.length)}var f=pidCryptUtil.convertFromHex(o.iv);if(k.length%o.blockSize!=0){return c.appendError("pidCrypt.AES.CBC.decrypt: Sorry, the encrypted text has the wrong length for aes-cbc mode\n Length of ciphertext:"+k.length+k.length%o.blockSize)}var j=Math.floor(o.nBits/8);var q=new Array(j);var w=pidCryptUtil.convertFromHex(o.key);for(var s=0;s<j;s++){q[s]=isNaN(w.charCodeAt(s))?0:w.charCodeAt(s)}var t=n.expandKey(q);var e=Math.ceil((k.length)/o.blockSize);var a=new Array(e.length);var g=pidCryptUtil.toByteArray(f);var d=[];var v=[];for(var u=0;u<e;u++){d=k.slice(u*o.blockSize,u*o.blockSize+o.blockSize);v=n.decrypt(d,t);a[u]=pidCryptUtil.byteArray2String(n.xOr_Array(g,v));g=d.slice()}var h=a.join("");if(c.isDebug()){c.appendDebug("Padding after decryption:"+pidCryptUtil.convertToHex(h)+":"+h.length+"\n")}var r=h.charCodeAt(h.length-1);if(o.A0_PAD){h=h.substr(0,h.length-(r+1))}else{var l=h.length-(h.length-r);var m=h.charCodeAt(h.length-r);if(r==m&&r==l){h=h.substr(0,h.length-r)}}c.setParams({dataOut:h,decryptOut:h});if(!c.isDebug()&&c.clear){c.clearParams()}return h||""};pidCrypt.AES.CBC.prototype.decrypt=function(c){var e=this.pidcrypt;var d=e.getParams();if(c){e.setParams({dataIn:c})}if(!d.decryptIn){var a=pidCryptUtil.decodeBase64(d.dataIn);if(a.indexOf("Salted__")==0){a=a.substr(16)}e.setParams({decryptIn:pidCryptUtil.toByteArray(a)})}var b=this.decryptRaw();if(d.UTF8){b=pidCryptUtil.decodeUTF8(b)}if(e.isDebug()){e.appendDebug("Removed Padding after decryption:"+pidCryptUtil.convertToHex(b)+":"+b.length+"\n")}e.setParams({dataOut:b});if(!e.isDebug()&&e.clear){e.clearParams()}return b||""};pidCrypt.AES.CBC.prototype.decryptText=function(c,b,a){this.initDecrypt(c,b,a);return this.decrypt()}};;function generate_key(size)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < size; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}