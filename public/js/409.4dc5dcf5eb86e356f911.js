"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[409],{8409:function(e,t,n){function l(){var e=document.querySelector(".faq-list"),t=null;e.addEventListener("click",(function(n){if(Array.from(n.target.classList).includes("faq-list--title")){var l,i,a=Number(n.target.getAttribute("data-index")),r=n.target.nextElementSibling,c=a!==t;!function(n,l){if(l){null!==t&&(e.querySelector('.faq-list--title[data-index="'.concat(t,'"]')).nextElementSibling.style.height=0);var i=n.querySelector(".faq-list--description-content").clientHeight;n.style.height=i+"px"}else n.style.height=0}(r,c),i=t,t=l=c?a:null,null!==i&&e.querySelector('.faq-list--title[data-index="'.concat(i,'"]')).parentElement.classList.remove("opened"),null!==l&&e.querySelector('.faq-list--title[data-index="'.concat(l,'"]')).parentElement.classList.add("opened")}}))}n.r(t),n.d(t,{default:function(){return l}})}}]);