(this["webpackJsonpimage-annotator-analyzer"]=this["webpackJsonpimage-annotator-analyzer"]||[]).push([[0],{46:function(e,t){e.exports=[{property:"problems",name:"Problems",options:["hard_to_see_damage","blurry","dark","flash/sun","missing_or_wrong_vehicle","other"],isMultiSelect:!0},{property:"photo_angle",name:"Photo Angle",options:["full_car","half_car","zoomed_part"],isMultiSelect:!1}]},58:function(e,t,a){},86:function(e,t,a){},91:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(16),r=a.n(s),o=(a(58),a(37)),i=a.n(o),l=a(40),d=a(9),j=a(41),u=a(116),h=a(118),b=a(120),f=a(2),m=Object(u.a)({root:{alignItems:"center"}}),p=Object(u.a)({root:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",color:"white",height:26,padding:"0 10px",alignItems:"center",justifyContent:"center"},selected:{background:"linear-gradient(45deg, #6FE0A5 30%, #A5FF53 90%)",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px rgba(105, 255, 137, .3)",color:"white",height:26,padding:"0 10px"}});function x(e,t,a,n,c,s,r){var o=[];e.forEach((function(e){o.push(Object(f.jsx)(h.a,{classes:{root:s.root,selected:s.selected},value:e,children:e},e))}));return Object(f.jsx)(b.a,{className:r.root,value:t,onChange:function(e,t){a(t),c(t)},exclusive:!n,children:o})}var O=function(e){var t=e.name,a=e.isMultiSelect,c=e.options,s=e.defaultOptions,r=void 0===s?[]:s,o=e.onValueChange,i=Object(n.useState)(r),l=Object(d.a)(i,2),j=l[0],u=l[1],h=p(),b=m();return Object(f.jsxs)("div",{className:"flex-row",children:[Object(f.jsx)("h3",{children:t}),x(c,j,u,a,o,h,b)]})},v=a(46),g=a.n(v),w=(a(86),a(119)),N=a(10),y=a(47),S=Object(N.a)((function(e){return{root:{color:"white",fill:"white"},"& .MuiSvgIcon-root":{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"}}}))(w.a);function E(e){var t=[];return e.forEach((function(e){t.push(Object(f.jsxs)("div",{className:"flex-row-center",children:[Object(f.jsx)(S,{color:"default"}),Object(f.jsx)("p",{children:e.part.toUpperCase()}),Object(f.jsx)(y.InfoIcon,{})]}))})),Object(f.jsx)("div",{className:"flex-column",children:t})}var k=function(e){var t=e.metadata,a=Object(n.useState)([]),c=Object(d.a)(a,2);return c[0],c[1],Object(f.jsxs)("div",{className:"metadata-box",children:[Object(f.jsx)("h3",{children:"Metadata"}),Object(f.jsxs)("div",{className:"flex-column",children:[Object(f.jsxs)("div",{className:"flex-row",children:[Object(f.jsx)("h4",{className:"metadata-labels",children:"Denuncia:"}),Object(f.jsx)("p",{className:"metadata-values",children:t.complaint})]}),Object(f.jsxs)("div",{className:"flex-row",children:[Object(f.jsx)("h4",{className:"metadata-labels",children:"Siniestro:"}),Object(f.jsx)("p",{className:"metadata-values",children:t.accident})]}),Object(f.jsxs)("div",{className:"flex-row",children:[Object(f.jsx)("h4",{className:"metadata-labels",children:"Marca:"}),Object(f.jsx)("p",{className:"metadata-values",children:t.brand})]}),Object(f.jsxs)("div",{className:"flex-row",children:[Object(f.jsx)("h4",{className:"metadata-labels",children:"Modelo:"}),Object(f.jsx)("p",{className:"metadata-values",children:t.model})]}),Object(f.jsxs)("div",{className:"flex-row",children:[Object(f.jsx)("h4",{className:"metadata-labels",children:"Tipo:"}),Object(f.jsx)("p",{className:"metadata-values",children:t.type})]}),Object(f.jsxs)("div",{className:"flex-row",children:[Object(f.jsx)("h4",{className:"metadata-labels",children:"Color:"}),Object(f.jsx)("p",{className:"metadata-values",children:t.color})]}),Object(f.jsxs)("div",{className:"flex-row",children:[Object(f.jsx)("h4",{className:"metadata-labels",children:"Year:"}),Object(f.jsx)("p",{className:"metadata-values",children:t.car_year})]})]}),Object(f.jsx)("h3",{children:"Parts"}),Object(f.jsx)("p",{children:t.damage_comment}),Object(f.jsx)("div",{className:"flex-row",children:E(t.damaged_parts?t.damaged_parts:[])})]})};function _(e,t){var a=[];return g.a.forEach((function(n){a.push(Object(f.jsx)(O,{property:n.property,name:n.name,options:n.options,isMultiSelect:n.isMultiSelect,onValueChange:function(t){return e(n.property,t)},defaultOptions:t?t[n.property]:[]},n.property))})),a}var F=function(e){var t=Object(n.useState)(!1),a=Object(d.a)(t,2),s=a[0],r=a[1];function o(t){t.key===e&&r(!0)}var i=function(t){t.key===e&&r(!1)};return c.a.useEffect((function(){return window.addEventListener("keydown",o),window.addEventListener("keyup",i),function(){window.removeEventListener("keydown",o),window.removeEventListener("keyup",i)}})),s},M=function(){var e=Object(n.useState)({}),t=Object(d.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)(0),r=Object(d.a)(s,2),o=r[0],u=r[1],h=F("ArrowLeft"),b=F("ArrowRight");Object(n.useEffect)((function(){!function(e,t){fetch("/api/files/".concat(e)).then(function(){var e=Object(l.a)(i.a.mark((function e(a){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.json();case 2:n=e.sent,console.log(n),a.ok&&n&&0!==Object.keys(n).length&&t(n);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}))}(o,c)}),[o]);var m=a?a.filename:"",p=a?a.state:null;Object(n.useEffect)((function(){p&&0!==Object.keys(p).length&&function(e,t){fetch("/api/state?filename=".concat(e),{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))}(m,p)}),[m,p]),Object(n.useEffect)((function(){b&&u((function(e){return e+1}))}),[b]),Object(n.useEffect)((function(){h&&u((function(e){return e-1}))}),[h]);var x="/".concat(m);return Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)("div",{className:"main-container",children:[Object(f.jsx)("h3",{children:m}),_((function(e,t){var n=JSON.parse(JSON.stringify(a));n.state[e]=t,c(n)}),p),Object(f.jsxs)("div",{className:"flex-row",children:[Object(f.jsx)(k,{metadata:a.metadata?a.metadata:{}}),Object(f.jsx)(j.SideBySideMagnifier,{imageSrc:x,style:{width:700},fillAvailableSpace:!1,switchSides:!1},x)]})]},m)})},C=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,122)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),s(e),r(e)}))};r.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(M,{})}),document.getElementById("root")),C()}},[[91,1,2]]]);
//# sourceMappingURL=main.c7f0afc7.chunk.js.map