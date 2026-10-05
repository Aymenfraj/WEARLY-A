/* ============================================================
   DATA
   ============================================================ */
var STYLES = [
  {id:'wax',emoji:'👗',name:'Wax moderne',desc:'Coloré & tendance'},
  {id:'bazin',emoji:'👘',name:'Bazin chic',desc:'Élégant & cérémonie'},
  {id:'classic',emoji:'👔',name:'Classique',desc:'Bureau & formel'},
  {id:'sport',emoji:'🎽',name:'Sport',desc:'Actif & confortable'},
  {id:'trad',emoji:'🥻',name:'Traditionnel',desc:'Boubous & cérémonie'},
  {id:'perfume',emoji:'🌸',name:'Parfums & Beauté',desc:'Cosmétiques & senteurs'}
];

var COLORS = [
  {id:'blue',hex:'#3b82f6',name:'Bleu'},
  {id:'indigo',hex:'#3b2f8f',name:'Indigo'},
  {id:'green',hex:'#10b981',name:'Vert'},
  {id:'red',hex:'#ef4444',name:'Rouge'},
  {id:'gold',hex:'#e0a526',name:'Doré'},
  {id:'pink',hex:'#ec4899',name:'Rose'},
  {id:'black',hex:'#1a1a1a',name:'Noir'},
  {id:'white',hex:'#f5f5f5',name:'Blanc'}
];

var PRODUCTS = [
  /* HOMME - 30 produits */
  {id:1,n:'Chemise Oxford blanche',e:'👔',h:'#cfc8b8',price:15000,cat:'classic',gender:'H',style:'classic',colors:['white','blue'],img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop',storeId:1,rating:4.6},
  {id:2,n:'Polo bleu marine',e:'👕',h:'#1e3a8a',price:12500,cat:'classic',gender:'H',style:'classic',colors:['blue'],img:'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&h=500&fit=crop',storeId:1,rating:4.5},
  {id:3,n:'T-shirt noir coton',e:'👕',h:'#222',price:8500,cat:'casual',gender:'H',style:'modern',colors:['black'],img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',storeId:1,rating:4.7},
  {id:4,n:'Grand Boubou bazin',e:'🥻',h:'#3b2f8f',price:45000,cat:'trad',gender:'H',style:'trad',colors:['indigo','gold'],img:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',storeId:3,rating:4.9},
  {id:5,n:'Chemise Wax homme',e:'👘',h:'#d1495b',price:18500,cat:'wax',gender:'H',style:'wax',colors:['red','gold'],img:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',storeId:3,rating:4.7},
  {id:6,n:'Débardeur sport',e:'🎽',h:'#e4572e',price:7500,cat:'sport',gender:'H',style:'sport',colors:['red','black'],img:'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=500&fit=crop',storeId:4,rating:4.4},
  {id:7,n:'Pantalon chino beige',e:'👖',h:'#b99b6b',price:19500,cat:'classic',gender:'H',style:'classic',colors:['white','gold'],img:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop',storeId:1,rating:4.5},
  {id:8,n:'Jean slim foncé',e:'👖',h:'#2b3a55',price:22000,cat:'casual',gender:'H',style:'modern',colors:['blue','black'],img:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',storeId:1,rating:4.6},
  {id:9,n:'Short sport training',e:'🩳',h:'#2a9d8f',price:9500,cat:'sport',gender:'H',style:'sport',colors:['green','black'],img:'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop',storeId:4,rating:4.3},
  {id:10,n:'Veste cuir noir',e:'🧥',h:'#1a1a1a',price:65000,cat:'casual',gender:'H',style:'modern',colors:['black'],img:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',storeId:1,rating:4.8},
  {id:11,n:'Mocassins cuir marron',e:'👞',h:'#6b4423',price:22000,cat:'classic',gender:'H',style:'classic',colors:['gold'],img:'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&h=500&fit=crop',storeId:2,rating:4.8},
  {id:12,n:'Baskets blanches Nike',e:'👟',h:'#f5f5f5',price:35000,cat:'sport',gender:'H',style:'sport',colors:['white'],img:'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',storeId:2,rating:4.9},
  {id:13,n:'Baskets running noires',e:'👟',h:'#1a1a1a',price:42000,cat:'sport',gender:'H',style:'sport',colors:['black'],img:'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&h=500&fit=crop',storeId:4,rating:4.7},
  {id:14,n:'Sandales Birkenstock',e:'🩴',h:'#a47148',price:28000,cat:'casual',gender:'H',style:'modern',colors:['gold'],img:'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&h=500&fit=crop',storeId:2,rating:4.5},
  {id:15,n:'Babouches dorées',e:'🥿',h:'#c8a15a',price:12000,cat:'trad',gender:'H',style:'trad',colors:['gold'],img:'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&h=500&fit=crop',storeId:3,rating:4.6},
  {id:16,n:'Sneakers Adidas',e:'👟',h:'#2a9d8f',price:38000,cat:'sport',gender:'H',style:'sport',colors:['green'],img:'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop',storeId:4,rating:4.7},
  {id:17,n:'Bottines cuir noir',e:'🥾',h:'#1a1a1a',price:55000,cat:'classic',gender:'H',style:'classic',colors:['black'],img:'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&h=500&fit=crop',storeId:1,rating:4.8},
  {id:18,n:'Claquettes plage',e:'🩴',h:'#f59e0b',price:6500,cat:'casual',gender:'H',style:'modern',colors:['gold'],img:'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&h=500&fit=crop',storeId:2,rating:4.2},
  {id:19,n:'Montre argentée',e:'⌚',h:'#7a7f87',price:38000,cat:'accessory',gender:'H',style:'classic',colors:['white'],img:'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop',storeId:1,rating:4.8},
  {id:20,n:'Ceinture cuir noir',e:'🪢',h:'#1a1a1a',price:12000,cat:'accessory',gender:'H',style:'classic',colors:['black'],img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',storeId:1,rating:4.5},
  {id:21,n:'Lunettes aviateur',e:'🕶️',h:'#1a1a1a',price:18000,cat:'accessory',gender:'H',style:'modern',colors:['black'],img:'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop',storeId:1,rating:4.6},
  {id:22,n:'Casquette NY',e:'🧢',h:'#1e3a8a',price:8500,cat:'accessory',gender:'H',style:'sport',colors:['blue'],img:'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop',storeId:2,rating:4.4},
  {id:23,n:'Sac à dos cuir',e:'🎒',h:'#6b4423',price:45000,cat:'accessory',gender:'H',style:'classic',colors:['gold'],img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',storeId:1,rating:4.7},
  {id:24,n:'Portefeuille cuir',e:'👛',h:'#1a1a1a',price:15000,cat:'accessory',gender:'H',style:'classic',colors:['black'],img:'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop',storeId:1,rating:4.6},
  {id:25,n:'Parfum Sauvage Dior',e:'🌸',h:'#1e3a8a',price:85000,cat:'perfume',gender:'H',style:'perfume',colors:['blue','black'],img:'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop',storeId:5,rating:4.9,isPerfume:true},
  {id:26,n:'Parfum Bleu Chanel',e:'💙',h:'#1e40af',price:95000,cat:'perfume',gender:'H',style:'perfume',colors:['blue'],img:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=500&fit=crop',storeId:5,rating:4.9,isPerfume:true},
  {id:27,n:'Eau de toilette Hugo Boss',e:'💚',h:'#059669',price:55000,cat:'perfume',gender:'H',style:'perfume',colors:['green'],img:'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=500&fit=crop',storeId:5,rating:4.7,isPerfume:true},
  {id:28,n:'Après-rasage Nivea',e:'🧴',h:'#1e3a8a',price:8500,cat:'cosmetic',gender:'H',style:'perfume',colors:['blue'],img:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop',storeId:5,rating:4.5,isPerfume:true},
  {id:29,n:'Baume à barbe',e:'🧔',h:'#6b4423',price:12500,cat:'cosmetic',gender:'H',style:'perfume',colors:['gold'],img:'https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&h=500&fit=crop',storeId:5,rating:4.6,isPerfume:true},
  {id:30,n:'Gel douche Musc',e:'🛁',h:'#7c3aed',price:5500,cat:'cosmetic',gender:'H',style:'perfume',colors:['indigo'],img:'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop',storeId:5,rating:4.4,isPerfume:true},
  /* FEMME - 30 produits */
  {id:31,n:'Robe wax colorée',e:'👗',h:'#d1495b',price:18500,cat:'wax',gender:'F',style:'wax',colors:['red','pink'],img:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop',storeId:3,rating:4.9},
  {id:32,n:'Ensemble bazin brodé',e:'👘',h:'#3b2f8f',price:55000,cat:'bazin',gender:'F',style:'bazin',colors:['indigo','gold'],img:'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&h=500&fit=crop',storeId:3,rating:4.8},
  {id:33,n:'Blouse dentelle blanche',e:'👚',h:'#f5e6d3',price:14500,cat:'classic',gender:'F',style:'classic',colors:['white'],img:'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop',storeId:6,rating:4.7},
  {id:34,n:'Robe de soirée noire',e:'🖤',h:'#1a1a1a',price:45000,cat:'classic',gender:'F',style:'classic',colors:['black'],img:'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&h=500&fit=crop',storeId:6,rating:4.8},
  {id:35,n:'Taille basse wax',e:'👗',h:'#0b7a43',price:22000,cat:'wax',gender:'F',style:'wax',colors:['green','gold'],img:'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&h=500&fit=crop',storeId:3,rating:4.7},
  {id:36,n:'Jupe crayon noire',e:'🖤',h:'#1a1a1a',price:16500,cat:'classic',gender:'F',style:'classic',colors:['black'],img:'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&h=500&fit=crop',storeId:6,rating:4.6},
  {id:37,n:'Robe longue fleurie',e:'🌸',h:'#ec4899',price:28000,cat:'casual',gender:'F',style:'modern',colors:['pink','red'],img:'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop',storeId:6,rating:4.7},
  {id:38,n:'Blazer beige oversize',e:'🧥',h:'#b99b6b',price:38000,cat:'classic',gender:'F',style:'classic',colors:['gold','white'],img:'https://images.unsplash.com/photo-1548624313-0396c75f9a4e?w=500&h=500&fit=crop',storeId:6,rating:4.8},
  {id:39,n:'Jean slim taille haute',e:'👖',h:'#2b3a55',price:24000,cat:'casual',gender:'F',style:'modern',colors:['blue'],img:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop',storeId:6,rating:4.6},
  {id:40,n:'Robe cocktail or',e:'✨',h:'#e0a526',price:65000,cat:'classic',gender:'F',style:'classic',colors:['gold'],img:'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&h=500&fit=crop',storeId:6,rating:4.9},
  {id:41,n:'Kimono wax moderne',e:'👘',h:'#d1495b',price:32000,cat:'wax',gender:'F',style:'wax',colors:['red','pink','gold'],img:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop',storeId:3,rating:4.8},
  {id:42,n:'Combinaison élégante',e:'🖤',h:'#1a1a1a',price:42000,cat:'classic',gender:'F',style:'modern',colors:['black'],img:'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&h=500&fit=crop',storeId:6,rating:4.7},
  {id:43,n:'Escarpins nude',e:'👠',h:'#c9a882',price:32000,cat:'classic',gender:'F',style:'classic',colors:['white','gold'],img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop',storeId:6,rating:4.6},
  {id:44,n:'Sandales dorées',e:'👡',h:'#e0a526',price:18500,cat:'casual',gender:'F',style:'modern',colors:['gold'],img:'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&h=500&fit=crop',storeId:6,rating:4.7},
  {id:45,n:'Mules bazin',e:'🥿',h:'#c8a15a',price:14000,cat:'bazin',gender:'F',style:'bazin',colors:['gold'],img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop',storeId:3,rating:4.6},
  {id:46,n:'Baskets blanches femme',e:'👟',h:'#f5f5f5',price:34000,cat:'casual',gender:'F',style:'modern',colors:['white'],img:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop',storeId:2,rating:4.8},
  {id:47,n:'Bottines cuir marron',e:'🥾',h:'#6b4423',price:48000,cat:'classic',gender:'F',style:'classic',colors:['gold'],img:'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&h=500&fit=crop',storeId:6,rating:4.7},
  {id:48,n:'Ballerines rouges',e:'👠',h:'#ef4444',price:38000,cat:'classic',gender:'F',style:'classic',colors:['red'],img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop',storeId:6,rating:4.8},
  {id:49,n:'Sandales plates plage',e:'🩴',h:'#e0a526',price:8500,cat:'casual',gender:'F',style:'modern',colors:['gold'],img:'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&h=500&fit=crop',storeId:6,rating:4.4},
  {id:50,n:'Sac à main doré',e:'👜',h:'#e0a526',price:28000,cat:'accessory',gender:'F',style:'classic',colors:['gold'],img:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',storeId:6,rating:4.7},
  {id:51,n:'Parure bijoux or',e:'💎',h:'#e0a526',price:55000,cat:'accessory',gender:'F',style:'classic',colors:['gold'],img:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop',storeId:3,rating:4.9},
  {id:52,n:'Foulard soie imprimé',e:'🧣',h:'#8b5a2b',price:8500,cat:'accessory',gender:'F',style:'bazin',colors:['gold','indigo'],img:'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=500&fit=crop',storeId:3,rating:4.6},
  {id:53,n:'Boucles oreilles dorées',e:'💍',h:'#e0a526',price:12000,cat:'accessory',gender:'F',style:'classic',colors:['gold'],img:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',storeId:3,rating:4.7},
  {id:54,n:'Lunettes cat-eye',e:'🕶️',h:'#1a1a1a',price:16500,cat:'accessory',gender:'F',style:'modern',colors:['black'],img:'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop',storeId:6,rating:4.5},
  {id:55,n:'Montre or rose',e:'⌚',h:'#e0a526',price:32000,cat:'accessory',gender:'F',style:'classic',colors:['gold','pink'],img:'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop',storeId:6,rating:4.8},
  {id:56,n:'Parfum Miss Dior',e:'🌹',h:'#ec4899',price:92000,cat:'perfume',gender:'F',style:'perfume',colors:['pink'],img:'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop',storeId:5,rating:4.9,isPerfume:true},
  {id:57,n:'Parfum Chanel N°5',e:'💐',h:'#f5e6d3',price:125000,cat:'perfume',gender:'F',style:'perfume',colors:['white','gold'],img:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=500&fit=crop',storeId:5,rating:5.0,isPerfume:true},
  {id:58,n:'Parfum J\'adore Dior',e:'🌸',h:'#ec4899',price:110000,cat:'perfume',gender:'F',style:'perfume',colors:['pink','gold'],img:'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=500&fit=crop',storeId:5,rating:4.9,isPerfume:true},
  {id:59,n:'Rouge à lèvres mat',e:'💄',h:'#b5533c',price:2500,cat:'cosmetic',gender:'F',style:'perfume',colors:['red'],img:'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop',storeId:5,rating:4.7,isPerfume:true},
  {id:60,n:'Palette maquillage nude',e:'🎨',h:'#8b5a2b',price:12000,cat:'cosmetic',gender:'F',style:'perfume',colors:['gold'],img:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop',storeId:5,rating:4.6,isPerfume:true}
];

var STORES = [
  {id:1,n:'Boutique Teranga',e:'🏬',verified:true},
  {id:2,n:'Sandaga Sneakers',e:'👟'},
  {id:3,n:'Atelier Wax & Co',e:'🧵',verified:true},
  {id:4,n:'Almadies Sport',e:'⚽'},
  {id:5,n:'Beauté Ndaw',e:'💄',verified:true},
  {id:6,n:'Maternita Dakar',e:'👗',verified:true}
];

var GIFT_TYPES = [
  {id:'love', emoji:'❤️', name:'Amour', desc:'Pour ton/ta partenaire', points:50},
  {id:'friend', emoji:'👥', name:'Ami(e)', desc:'Pour un(e) ami(e) proche', points:25},
  {id:'marriage', emoji:'💍', name:'Mariage', desc:'Pour un mariage', points:100},
  {id:'friendly', emoji:'🤝', name:'Amical', desc:'Pour un contact sympa', points:15},
  {id:'family', emoji:'👨‍👩‍👧', name:'Famille', desc:'Pour la famille', points:30},
  {id:'colleague', emoji:'💼', name:'Collègue', desc:'Pour un collègue', points:20}
];

var VIDEOS = [
  {id:1, user:'Keyfa World', poster:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=900&fit=crop', desc:'Collection Grands Boubous', tags:['trad','bazin'], likes:15200, productId:4},
  {id:2, user:'Mossane Beauté', poster:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=900&fit=crop', desc:'Tuto maquillage terracotta', tags:['beauty','cosmetic'], likes:12400, productId:59},
  {id:3, user:'Maison Pen', poster:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=900&fit=crop', desc:'Atelier couture sur-mesure', tags:['trad','bazin'], likes:8100, productId:32},
  {id:4, user:'Maternita', poster:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=900&fit=crop', desc:'Collection femme moderne', tags:['wax','classic'], likes:9700, productId:31},
  {id:5, user:'Parfums Dakar', poster:'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=900&fit=crop', desc:'Les senteurs de luxe', tags:['perfume'], likes:6200, productId:56}
];

var CALENDAR = [
  {name:'Nouvel An', type:'national', date:'2026-01-01', icon:'🎉', desc:'Jour de l\'an'},
  {name:'Ramadan', type:'islam', date:'2026-02-18', icon:'🌙', desc:'Début du mois sacré'},
  {name:'Korité', type:'islam', date:'2026-03-20', icon:'🕌', desc:'Fin du Ramadan'},
  {name:'Fête Indépendance', type:'national', date:'2026-04-04', icon:'🇸🇳', desc:'Indépendance du Sénégal'},
  {name:'Fête du Travail', type:'national', date:'2026-05-01', icon:'💼', desc:'Journée des travailleurs'},
  {name:'Tabaski', type:'islam', date:'2026-05-28', icon:'🐏', desc:'Fête du sacrifice'},
  {name:'Grand Magal Touba', type:'islam', date:'2026-08-03', icon:'🕌', desc:'Pèlerinage de Touba'},
  {name:'Assomption', type:'christian', date:'2026-08-15', icon:'🙏', desc:'Élévation de la Vierge'},
  {name:'Maouloud', type:'islam', date:'2026-08-25', icon:'📿', desc:'Naissance du Prophète ﷺ'},
  {name:'Toussaint', type:'christian', date:'2026-11-01', icon:'🕯️', desc:'Fête de tous les saints'},
  {name:'Noël', type:'christian', date:'2026-12-25', icon:'🎄', desc:'Naissance du Christ'}
];

var COUNTRIES = [
  {code:'SN',flag:'🇸🇳',name:'Sénégal'},
  {code:'CI',flag:'🇨🇮',name:'Côte d\'Ivoire'},
  {code:'ML',flag:'🇲🇱',name:'Mali'},
  {code:'TN',flag:'🇹🇳',name:'Tunisie'},
  {code:'QA',flag:'🇶🇦',name:'Qatar'},
  {code:'FR',flag:'🇫🇷',name:'France'}
];

var LANGUAGES = [
  {code:'fr',flag:'🇫🇷',name:'Français'},
  {code:'en',flag:'🇬🇧',name:'English'},
  {code:'ar',flag:'🇸🇦',name:'العربية'},
  {code:'wo',flag:'🇸🇳',name:'Wolof'}
];

