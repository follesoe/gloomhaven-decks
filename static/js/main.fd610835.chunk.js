(this["webpackJsonpgloomhaven-decks"]=this["webpackJsonpgloomhaven-decks"]||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(8),o=a.n(r),i=(a(14),a(4)),l=a(2),s=a(3),m=a(1),u=a(5),h=a(6),d=(a(15),function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={itemsDeckTo:14},n.handleChange=n.handleChange.bind(Object(m.a)(n)),n}return Object(s.a)(a,[{key:"handleChange",value:function(e){this.setState({itemsDeckTo:parseInt(e.target.value)}),console.log(this.state.itemsDeckTo)}},{key:"render",value:function(){return c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"m-8"},c.a.createElement("label",null,"Available items:",c.a.createElement("input",{type:"number",min:"1",max:"164",value:this.state.itemsDeckTo,onChange:this.handleChange}))),c.a.createElement(k,{to:this.state.itemsDeckTo}),c.a.createElement(f,null))}}]),a}(c.a.Component)),f=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={deck:[],shuffledDeck:[],drawnDeck:[]},n.drawCard=n.drawCard.bind(Object(m.a)(n)),n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("/gloomhaven-decksgloomhaven/data/battle-goals.js").then((function(e){return e.json()})).then((function(t){var a=t.filter((function(e){return"battlegoal-back"!==e.name}));e.setState({deck:a,shuffledDeck:g(a),drawnDeck:[]})}),(function(e){console.error(e)}))}},{key:"drawCard",value:function(){var e=this.state.shuffledDeck.length>0?this.state.shuffledDeck:g(this.state.deck),t=this.state.shuffledDeck.length>0?this.state.drawnDeck:[];this.setState({deck:this.state.deck,drawnDeck:[e[0]].concat(Object(i.a)(t)),shuffledDeck:Object(i.a)(e.slice(1))})}},{key:"render",value:function(){var e=this.state.drawnDeck.map((function(e){return c.a.createElement(v,{key:e.name,image:"/gloomhaven-decksgloomhaven/images/"+e.image,name:e.name})}));return c.a.createElement("div",{className:"flex flex-wrap flex-row m-6"},c.a.createElement(v,{name:"Draw Battle Card",onClick:this.drawCard,image:"/gloomhaven-decksgloomhaven/images/battle-goals/battlegoal-back.png"}),e)}}]),a}(c.a.Component),k=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={deck:[]},n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("/gloomhaven-decksgloomhaven/data/items.js").then((function(e){return e.json()})).then((function(t){var a=t.filter((function(e){return e.name.match(/item #[1-9]\d{0,3}/)})).map((function(e){return{number:parseInt(e.name.match(/(\d+)/)[0]),name:e.name,image:"/gloomhaven-decksgloomhaven/images/"+e.image}}));e.setState({deck:a})}),(function(e){console.error(e)}))}},{key:"render",value:function(){var e=this,t=this.state.deck.filter((function(t){return t.number<=e.props.to})).map((function(e){return c.a.createElement(v,{key:e.number,image:e.image,name:e.name})}));return c.a.createElement("div",{className:"flex flex-wrap flex-row m-6"},t)}}]),a}(c.a.Component);function v(e){return c.a.createElement("div",{className:"m-2 Card",onClick:function(t){t.preventDefault(),e.onClick&&e.onClick(e.name)}},c.a.createElement("img",{className:"Card-face",src:e.image,alt:e.name}))}function g(e){for(var t=Object(i.a)(e),a=t.length-1;a>0;a--){var n=Math.floor(Math.random()*(a+1)),c=[t[n],t[a]];t[a]=c[0],t[n]=c[1]}return t}var b=d;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,a){e.exports=a(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.fd610835.chunk.js.map