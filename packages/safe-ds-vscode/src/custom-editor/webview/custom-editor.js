var L=Object.defineProperty;var V=(t,e,n)=>e in t?L(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var p=(t,e,n)=>(V(t,typeof e!="symbol"?e+"":e,n),n);function a(){}function O(t){return t()}function S(){return Object.create(null)}function _(t){t.forEach(O)}function C(t){return typeof t=="function"}function H(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function M(t){return Object.keys(t).length===0}function P(t,e,n){t.insertBefore(e,n||null)}function N(t){t.parentNode&&t.parentNode.removeChild(t)}function T(t){return document.createElement(t)}function z(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function G(t){return Array.from(t.childNodes)}let b;function u(t){b=t}const c=[],A=[];let f=[];const j=[],K=Promise.resolve();let g=!1;function R(){g||(g=!0,K.then(B))}function $(t){f.push(t)}const m=new Set;let i=0;function B(){if(i!==0)return;const t=b;do{try{for(;i<c.length;){const e=c[i];i++,u(e),U(e.$$)}}catch(e){throw c.length=0,i=0,e}for(u(null),c.length=0,i=0;A.length;)A.pop()();for(let e=0;e<f.length;e+=1){const n=f[e];m.has(n)||(m.add(n),n())}f.length=0}while(c.length);for(;j.length;)j.pop()();g=!1,m.clear(),u(t)}function U(t){if(t.fragment!==null){t.update(),_(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach($)}}function Y(t){const e=[],n=[];f.forEach(r=>t.indexOf(r)===-1?e.push(r):n.push(r)),n.forEach(r=>r()),f=e}const q=new Set;function D(t,e){t&&t.i&&(q.delete(t),t.i(e))}function F(t,e,n){const{fragment:r,after_update:l}=t.$$;r&&r.m(e,n),$(()=>{const d=t.$$.on_mount.map(O).filter(C);t.$$.on_destroy?t.$$.on_destroy.push(...d):_(d),t.$$.on_mount=[]}),l.forEach($)}function J(t,e){const n=t.$$;n.fragment!==null&&(Y(n.after_update),_(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Q(t,e){t.$$.dirty[0]===-1&&(c.push(t),R(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function W(t,e,n,r,l,d,x=null,I=[-1]){const h=b;u(t);const o=t.$$={fragment:null,ctx:[],props:d,update:a,not_equal:l,bound:S(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(h?h.$$.context:[])),callbacks:S(),dirty:I,skip_bound:!1,root:e.target||h.$$.root};x&&x(o.root);let v=!1;if(o.ctx=n?n(t,e.props||{},(s,w,...k)=>{const E=k.length?k[0]:w;return o.ctx&&l(o.ctx[s],o.ctx[s]=E)&&(!o.skip_bound&&o.bound[s]&&o.bound[s](E),v&&Q(t,s)),w}):[],o.update(),v=!0,_(o.before_update),o.fragment=r?r(o.ctx):!1,e.target){if(e.hydrate){const s=G(e.target);o.fragment&&o.fragment.l(s),s.forEach(N)}else o.fragment&&o.fragment.c();e.intro&&D(t.$$.fragment),F(t,e.target,e.anchor),B()}u(h)}class X{constructor(){p(this,"$$");p(this,"$$set")}$destroy(){J(this,1),this.$destroy=a}$on(e,n){if(!C(n))return a;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const l=r.indexOf(n);l!==-1&&r.splice(l,1)}}$set(e){this.$$set&&!M(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Z="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Z);const tt="/assets/svelte-Gm04ziY3.png";function et(t){let e;return{c(){e=T("main"),e.innerHTML=`<img class="mx-auto" src="${tt}" alt="Svelte Logo"/> <h1 class="p-3 text-xl font-bold">Hello Typescript!</h1> <p class="p-2 mt-10 text-sm text-red-300">Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
        apps. And also about pink bunnies that can jump even higher with a fluffy
        tail.</p> <div class="text-green-600">Also here is some more text</div> <p class="p-2 text-sm text-gray-500">Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a>
        for the officially supported framework, also powered by Vite!</p>`,z(e,"class","text-center")},m(n,r){P(n,e,r)},p:a,i:a,o:a,d(n){n&&N(e)}}}class nt extends X{constructor(e){super(),W(this,e,null,et,H,{})}}let y=document.getElementById("root");y||(y=document.body);new nt({target:y});
