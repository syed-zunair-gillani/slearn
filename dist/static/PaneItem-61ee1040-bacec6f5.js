import{v as b,ac as D,A as x,bQ as _,r as o,cI as L,j as e,cJ as M,cK as k,a4 as T,cL as j,cM as F,cN as R,cO as E,p,ae as N}from"./sanity-1ce26332.js";const O=(t,n)=>({title:p("em",{children:["No schema found for type ",e("code",{children:n})]}),subtitle:p("em",{children:["Document: ",e("code",{children:t})]}),media:()=>e(N,{})});function W(t){const{layout:n,value:a}=t;return e(k,{...O(a._id,a._type),layout:n})}function P(t,n,a){return t===!1?!1:t||n&&n.icon||a||!1}function J(t){const{icon:n,id:a,layout:i="default",pressed:v,schemaType:c,selected:r,title:u,value:s}=t,I=b(),l=D(),{ChildLink:d}=x(),m=_(a),f=Boolean(c&&c.name&&I.get(c.name)),[y,h]=o.useState(!1),g=o.useMemo(()=>s&&L(s)?!c||!f?e(W,{value:s}):e(M,{documentPreviewStore:l,icon:P(n,c,R),layout:i,schemaType:c,value:s,presence:m}):e(k,{status:e(T,{muted:!0,children:e(j,{})}),icon:P(n,c,E),layout:i,title:u}),[l,f,n,i,c,u,s,m]),C=o.useMemo(()=>function(w){return e(d,{...w,childId:a})},[d,a]),S=o.useCallback(()=>h(!0),[]);return o.useEffect(()=>h(!1),[r]),e(F,{__unstable_focusRing:!0,as:C,"data-as":"a","data-ui":"PaneItem",padding:2,radius:2,onClick:S,pressed:v,selected:r||y,tone:"inherit",children:g})}export{J as P};