!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n);const i={start_color_change_btn:document.querySelector("[data-start]"),stop_color_change_btn:document.querySelector("[data-stop]"),body_element:document.querySelector("body"),start_timer_btn:document.querySelector("[data-start]"),input_timer_element:document.getElementById("datetime-picker"),span_timer_elements:document.querySelectorAll(".value"),prs_form_element:document.querySelector(".form"),prs_submit_btn:document.querySelector("button")};var r=n("h6c0i");const l=(e,t)=>{e.preventDefault();const{elements:{delay:o,step:n,amount:i}}=e.currentTarget;if(o.value<0||n.value<0||i.value<=0)r.Notify.failure("Please choose a positive value",{width:"260px",showOnlyTheLastOne:!0,position:"right-bottom",distance:"40px",timeout:2e3,fontSize:"15px",borderRadius:"8px",cssAnimationStyle:"from-bottom"});else for(let e=1,l=0;e<=i.value;e++,l+=~~n.value){t(e,~~o.value+l).then((({position:e,delay:t})=>{r.Notify.success(`Fulfilled promise ${e} in ${t}ms`,{width:"260px",position:"right-top",distance:"40px",fontSize:"15px",borderRadius:"8px"})})).catch((({position:e,delay:t})=>{r.Notify.failure(`Rejected promise ${e} in ${t}ms`,{width:"260px",position:"right-top",distance:"40px",fontSize:"15px",borderRadius:"8px"})}))}};function s(e,t){const o=Math.random()>.3;return new Promise(((n,i)=>{setTimeout((()=>{o?n({position:e,delay:t}):i({position:e,delay:t})}),t)}))}i.prs_form_element.addEventListener("submit",(e=>{l(e,s)}))}();
//# sourceMappingURL=03-promises.66d5509c.js.map
