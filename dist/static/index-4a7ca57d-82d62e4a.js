import{r as l,j as o,aj as re,af as U,aN as oe,ak as ie,cr as ae,v as H,x as ce,C as ue,av as le,p as P,P as de,cs as me,M as pe,ct as fe,cu as he,cv as ye,az as ge,b1 as Te,G as z,g as w,ad as $,a6 as Le,bz as Ie,a4 as _,a3 as D,ag as Se,F as be,aV as Re,cw as ve,ab as k,i as Pe,q as Ce,t as _e,b9 as O,cx as Ee,cy as xe,cz as De,cA as Fe,aT as M,d as je,cB as we,c9 as Oe,ca as Ae,aX as $e,cC as ke,cD as Me,bD as N,bF as Ne,cE as qe,bu as Be,aY as We,ba as Ue,cF as He,cG as ze,cH as Ge,bv as Ve}from"./sanity-fcc49206.js";import{useDeskTool as Ye,useDeskToolSetting as q,Delay as Xe}from"./index-def00177-6f9aec1e.js";import{P as Ke}from"./PaneItem-61ee1040-e9be3d46.js";import"./index-7c904500.js";const B=100,A=2e3,G={by:[{field:"_updatedAt",direction:"desc"}]},Qe={};function Je(e,s){return e._id?z(e._id):"item-".concat(s)}function Ze(e){return De(e).map(s=>({...s.draft||s.published,hasPublished:!!s.published,hasDraft:!!s.draft}))}const et=/\b_type\s*==\s*(['"].*?['"]|\$.*?(?:\s|$))|\B(['"].*?['"]|\$.*?(?:\s|$))\s*==\s*_type\b/;function tt(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const n=e.match(et);if(!n)return null;const t=(n[1]||n[2]).trim().replace(/^["']|["']$/g,"");if(t[0]==="$"){const a=t.slice(1),c=s[a];return typeof c=="string"?c:null}return t}function nt(e){return/^_type\s*==\s*['"$]\w+['"]?\s*$/.test(e.trim())}function st(e){return e.map(s=>[rt(s),(s.direction||"").toLowerCase()].map(n=>n.trim()).filter(Boolean).join(" ")).join(",")}function rt(e){return e.mapWith?"".concat(e.mapWith,"(").concat(e.field,")"):e.field}function ot(e,s){const n=e.by.map(t=>{if(t.mapWith)return t;const a=it(s,t.field);return a?ct(a,"datetime")?{...t,mapWith:"dateTime"}:a.jsonType==="string"?{...t,mapWith:"lower"}:t:t});return n.every((t,a)=>t===e.by[a])?e:{...e,by:n}}function it(e,s){const n=pe(s);let t=e;for(const a of n){if(!t)return;if(typeof a=="string"){t=at(t,a);continue}if(!(fe(a)||he(a))||t.jsonType!=="array")return;const[r,i]=t.of||[];if(i||!r)return;if(!ye(r)){t=r;continue}const[f,h]=r.to||[];if(h||!f)return;t=f}return t}function at(e,s){if(!("fields"in e))return;const n=e.fields.find(t=>t.name===s);return n?n.type:void 0}function ct(e,s){let n=e.type;for(;n;){if(n.name===s||!n.type&&n.jsonType===s)return!0;n=n.type}return!1}function ut(e){const{childItemId:s,error:n,filterIsSimpleTypeContraint:t,fullList:a,isActive:c,isLoading:r,items:i,layout:f,onListChange:h,onRetry:u,showIcons:y}=e,b=H(),{collapsed:S}=ge(),{collapsed:I,index:g}=Te(),[R,v]=l.useState(!1);l.useEffect(()=>{if(I)return;const d=setTimeout(()=>{v(!0)},0);return()=>{clearTimeout(d)}},[I]);const T=l.useCallback(d=>{const L=z(d._id),m=s===L;return o(Ke,{icon:y===!1?!1:void 0,id:L,pressed:!c&&m,selected:c&&m,layout:f,schemaType:b.get(d._type),value:d})},[s,c,f,b,y]),p=l.useMemo(()=>{if(!R)return null;if(n)return o(w,{align:"center",direction:"column",height:"fill",justify:"center",children:o($,{width:1,children:P(Le,{paddingX:4,paddingY:5,space:4,children:[o(Ie,{as:"h3",children:"Could not fetch list items"}),P(_,{as:"p",children:["Error: ",o("code",{children:n.message})]}),u&&o(D,{children:o(U,{icon:Se,onClick:u,text:"Retry",tone:"primary"})})]})})});if(i===null)return o(w,{align:"center",direction:"column",height:"fill",justify:"center",children:o(Xe,{ms:300,children:P(be,{children:[o(Re,{muted:!0}),o(D,{marginTop:3,children:o(_,{align:"center",muted:!0,size:1,children:"Loading documents…"})})]})})});if(!r&&i.length===0)return o(w,{align:"center",direction:"column",height:"fill",justify:"center",children:o($,{width:1,children:o(D,{paddingX:4,paddingY:5,children:o(_,{align:"center",muted:!0,size:2,children:t?"No documents of this type":"No matching documents"})})})});const d=a&&i.length===A;return P(D,{padding:2,children:[i.length>0&&o(ve,{gap:1,getItemKey:Je,items:i,renderItem:T,onChange:h},"".concat(g,"-").concat(I)),r&&o(k,{borderTop:!0,marginTop:1,paddingX:3,paddingY:4,children:o(_,{align:"center",muted:!0,size:1,children:"Loading…"})}),d&&o(k,{marginTop:1,paddingX:3,paddingY:4,radius:2,tone:"transparent",children:P(_,{align:"center",muted:!0,size:1,children:["Displaying a maximum of ",A," documents"]})})]})},[n,t,a,h,r,i,u,T,R,I,g]);return o(Pe,{overflow:S?void 0:"auto",children:p})}const V=l.memo(e=>{let{index:s,initialValueTemplates:n=[],menuItems:t=[],menuItemGroups:a=[],setLayout:c,setSortOrder:r,title:i}=e;const{features:f}=Ye(),h=l.useMemo(()=>({setLayout:u=>{let{layout:y}=u;c(y)},setSortOrder:u=>{r(u)}}),[c,r]);return o(re,{backButton:f.backButton&&s>0&&o(U,{as:oe,"data-as":"a",icon:ie,mode:"bleed"}),title:i,actions:o(ae,{initialValueTemplateItems:n,actionHandlers:h,menuItemGroups:a,menuItems:t})})});V.displayName="DocumentListPaneHeader";const lt={result:null,error:!1},dt=e=>({result:{documents:e},loading:!1,error:!1}),mt=e=>({result:null,loading:!1,error:e}),pt=function(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const n=new Fe,t=n.next.bind(n);return e.pipe(M(r=>({client:r.client,query:r.query,params:r.params})),je(we),Oe(1),Ae()).pipe($e(r=>{const i=ke(r.client,r.query,r.params,s).pipe(M(dt),Me());return N(O({loading:!0}).pipe(Ne(400),qe(i)),i)})).pipe(Be(lt),We((r,i)=>Ue(O(mt(r)),N(He(window,"online"),n).pipe(ze(1),Ge(i)))),Ve((r,i)=>({...r,...i,onRetry:t})))};function ft(e){var s;const{apiVersion:n,filter:t,params:a,sortOrder:c}=e,r=Ce(_e),[i,f]=l.useState(!1),h=l.useRef(i),[u,y]=l.useState(null),b=(u==null?void 0:u.error)||null,S=(u==null?void 0:u.loading)||u===null,I=u==null?void 0:u.onRetry,g=(s=u==null?void 0:u.result)==null?void 0:s.documents,R=l.useMemo(()=>g?Ze(g):null,[g]),v=l.useMemo(()=>{const p=c==null?void 0:c.extendedProjection,d=["_id","_type"],L=d.join(","),m=(c==null?void 0:c.by)||[],C=i?A:B,E=m.length>0?m:G.by,x=st(E);if(p){const F=d.concat(p).join(",");return["*[".concat(t,"] {").concat(F,"}"),"order(".concat(x,") [0...").concat(C,"]"),"{".concat(L,"}")].join("|")}return"*[".concat(t,"]|order(").concat(x,")[0...").concat(C,"]{").concat(L,"}")},[t,i,c]),T=l.useCallback(p=>{let{toIndex:d}=p;S||h.current||d>=B/2&&(f(!0),h.current=!0)},[S]);return l.useEffect(()=>{const p=i?m=>Boolean(m.result):()=>!0;y(m=>m?{...m,loading:!0}:null);const L=pt(O({client:r,query:v,params:a}),{apiVersion:n,tag:"desk.document-list"}).pipe(Ee(p)).subscribe(y);return()=>L.unsubscribe()},[n,r,i,v,a]),l.useEffect(()=>{y(null),f(!1),h.current=!1},[t,a,c,n]),{error:b,fullList:i,handleListChange:T,isLoading:S,items:R,onRetry:I}}const W=[];function ht(e){const s=l.useRef(e);return xe(s.current,e)||(s.current=e),s.current}const It=l.memo(function(s){const{childItemId:n,index:t,isActive:a,isSelected:c,pane:r,paneKey:i}=s,f=H(),{name:h}=ce(),{defaultLayout:u="default",displayOptions:y,initialValueTemplates:b=W,menuItems:S,menuItemGroups:I,options:g,title:R}=r,{apiVersion:v,defaultOrdering:T=W,filter:p}=g,d=ht(g.params||Qe),L=r.source,m=l.useMemo(()=>tt(p,d),[p,d]),C=(y==null?void 0:y.showIcons)!==!1,[E,x]=q(m,"layout",u),F=l.useMemo(()=>(T==null?void 0:T.length)>0?{by:T}:G,[T]),[j,Y]=q(m,"sortOrder",F),X=m&&j?ot(j,f.get(m)):j,K=ue(X),Q=nt(p),{error:J,fullList:Z,handleListChange:ee,isLoading:te,items:ne,onRetry:se}=ft({filter:p,params:d,sortOrder:K,apiVersion:v});return o(le,{name:L||h,children:P(de,{currentMaxWidth:350,id:i,maxWidth:640,minWidth:320,selected:c,children:[me,o(V,{index:t,initialValueTemplates:b,menuItems:S,menuItemGroups:I,setLayout:x,setSortOrder:Y,title:R}),o(ut,{childItemId:n,error:J,filterIsSimpleTypeContraint:Q,fullList:Z,isActive:a,isLoading:te,items:ne,layout:E,onListChange:ee,onRetry:se,showIcons:C})]})})});export{It as default};