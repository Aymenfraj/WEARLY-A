/* ============================================================
   STATE GLOBAL
   ============================================================ */
var S = {
  tab:'home', ob:0,
  obData:{name:'', sex:'', age:25, country:'SN', phone:'', stylePref:'', budget:20000, colors:[]},
  prof:{name:'', sex:'', age:25, country:'SN', photo:null, style:'', budget:20000, colors:[], address:'', email:'', bio:''},
  cold:{
    phase:0, interactions:0,
    signals:{views:0,likes:0,saves:0,purchases:0,videoLikes:0,taps:0},
    inferred:{categories:{}, colors:{}, avgPrice:0, priceHits:[]}
  },
  gift:{points:0, history:[], totalSent:0, badges:[]},
  likedProducts:[], savedProducts:[], cart:[], orders:[],
  shopGender:null, filterCat:'all',
  libraryTab:0,
  calYear: new Date().getFullYear(),
  calMonth: new Date().getMonth(),
  socialEvents:[], selectedDay:null,
  friends:[], friendRequests:[],
  chats:{},
  challengeEntries:[],
  mystery:{revealed:false, votes:0},
  notifications:[],
  settings:{
    language:'fr',
    notifications:{prayers:true, events:true, trends:true, orders:true, messages:true, friends:true},
    privacy:{publicProfile:true, showLocation:true, showStats:true, showDressing:false, allowMessages:'everyone'}
  },
  stats:{profileViews:0, videoViews:0, sharedPosts:0, giftsReceived:0}
};
S.prof.sex = 'H';
S.shopGender = 'H';

function $(s){ return document.querySelector(s); }
function $$(s){ return document.querySelectorAll(s); }
function cfa(e){ return Math.round(e * 655.96).toLocaleString('fr-FR') + ' FCFA'; }
function now(){ var d = new Date(); return (d.getHours()<10?'0':'')+d.getHours()+':'+(d.getMinutes()<10?'0':'')+d.getMinutes(); }
function imgTag(url, bg, emoji){
  if(url) return '<img src="'+url+'" alt="" loading="lazy" onerror="this.style.display=\'none\';this.parentNode.style.background=\''+bg+'\';this.parentNode.innerHTML=\'<div style=&quot;display:grid;place-items:center;height:100%;font-size:1.4em&quot;>'+emoji+'</div>\'">';
  return emoji;
}
function dayName(d){ return ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'][d]; }
function monthName(m){ return ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'][m]; }
function monthShort(m){ return ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'][m]; }

var H = new Date().getHours();
var TODAY = new Date();

