/*! rspls  
 * Copyright 2015-2015 sevdog
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
 */
!function(a,b){b["rspls "]=a;var c={rock:"Rock",scissors:"Scissors",paper:"Paper",lizard:"Lizard",spock:"Spock","menu.settings":"Settings","menu.rules":"Description","menu.play":"Play","settings.description":"Customize game settings","settings.username":"Player name","settings.onlyClassic":"Only classic signs","settings.theme":"Theme","settings.algorithm":"CPU tactic","settings.save":"Save","settings.reset":"Reset","algorithm.random":"Random","algorithm.memory":"Move memory","algorithm.memoryAdvanced":"Move memory (advanced)","rule.desc":"Rock-paper-scissors-lizard-Spock) is a fancy variation of Rock-paper-scissors invented by two american students, Sam Kass and Karen Bryla, and later made popular being quoted in an episode of the sitcom The Big Bang Theory.","rule.vs.LS":"Lizard poisons Spock","rule.vs.LP":"Lizard eats Paper","rule.vs.PS":"Paper disproves Spock","rule.vs.PR":"Paper covers Rock","rule.vs.RS":"Rock crushes Scissors","rule.vs.RL":"Rock crushes Lizard","rule.vs.SP":"Scissors cuts Paper","rule.vs.SL":"Scissors decapitates Lizard","rule.vs.SS":"Spock smashes Scrissors","rule.vs.SR":"Spock vaporizes Rock",tie:"Tie using {{sign}}","game.player":"Player","game.pc":"CPU","game.win":"Wins","game.tie":"Tie","game.lost":"Lost","game.play":"Press to play",version:"version"},d={rock:"Sasso",scissors:"Forbici",paper:"Carta",lizard:"Lizard",spock:"Spock","menu.settings":"Impostazioni","menu.rules":"Descrizione","menu.play":"Gioca","settings.description":"Personalizza le impostazioni di gioco","settings.username":"Nome giocatore","settings.onlyClassic":"Solo segni classici","settings.theme":"Tema","settings.algorithm":"Strategia CPU","settings.save":"Salva","settings.reset":"Default","algorithm.random":"Casuale","algorithm.memory":"Memoria delle mosse","algorithm.memoryAdvanced":"Memoria delle mosse (avanzato)","rule.desc":'Sasso-carta-forbice-lucertola-Spock (Rock-paper-scissors-lizard-Spock) è una variante fantasiosa della "Morra Cinese" inventata da due studenti americani, Sam Kass e Karen Bryla, e resa successivamente famosa da un episodio del telefilm The Big Bang Theory.',"rule.vs.LS":"Lizard avvelena Spock","rule.vs.LP":"Lizard mangia la Carta","rule.vs.PS":"La Carta smentisce Spock","rule.vs.PR":"La Carta avvolge il Sasso","rule.vs.RS":"Il Sasso rompe le Forbici","rule.vs.RL":"Il Sasso schiaccia Lizard","rule.vs.SP":"Le Forbici tagliano la Carta","rule.vs.SL":"Le Forbici decapitano Lizard","rule.vs.SS":"Spock rompe le Forbici","rule.vs.SR":"Spock vaporizza il Sasso",tie:"Pareggio con {{sign}}","game.player":"Giocatore","game.pc":"CPU","game.win":"Vittorie","game.tie":"Pareggi","game.lost":"Sconfitte","game.play":"Premi per giocare",version:"versione"};!function(a){function b(a,b,e){a.when("/rules",{templateUrl:"templates/rules.html",controller:"RulesController"}).when("/game",{templateUrl:"templates/game.html",controller:"GameController"}).otherwise({redirectTo:"/game"}),b.translations("it",d).translations("en",c).determinePreferredLanguage().fallbackLanguage("en"),e.setStorageType("localStorage").setPrefix("rspls")}function e(a,b,c){a.rules=b,a.phrases=c}a.module("rspls",["ngAnimate","ngTouch","ngRoute","ngAria","pascalprecht.translate","LocalStorageModule"]),a.module("rspls").config(["$routeProvider","$translateProvider","localStorageServiceProvider",b]),a.module("rspls").constant("version","1.0.1"),a.module("rspls").constant("crYearFrom","2015"),a.module("rspls").constant("crYearTo",""),a.module("rspls").constant("crOwner","sevdog"),a.module("rspls").constant("rules",{classics:["rock","scissors","paper"],signs:["rock","scissors","paper","lizard","spock"],wins:{rock:"01010".split(""),scissors:"00110".split(""),paper:"10001".split(""),lizard:"00101".split(""),spock:"11000".split("")}}),a.module("rspls").constant("phrases",{rock:{scissors:"rule.vs.RS",lizard:"rule.vs.RL"},scissors:{paper:"rule.vs.SP",lizard:"rule.vs.SL"},paper:{rock:"rule.vs.PR",spock:"rule.vs.PS"},lizard:{paper:"rule.vs.LP",spock:"rule.vs.LS"},spock:{rock:"rule.vs.SR",scissors:"rule.vs.SS"}}),a.module("rspls").constant("algorithms",[{key:"random",name:"algorithm.random"},{key:"memory",name:"algorithm.memory"},{key:"memoryAdvanced",name:"algorithm.memoryAdvanced"}]),a.module("rspls").run(["$rootScope","rules","phrases",e])}(angular),angular.module("rspls").controller("GameController",["$scope","$timeout","$interval","$translate","score","settings","cpu",function(a,b,c,d,e,f,g){var h,i=!0;a.viewCls="game",a.onlyClassic=f.values.onlyClassic,a.signs=a.onlyClassic?a.rules.classics:a.rules.signs,a.username=f.values.user,a.isPlaying=!1,a.timing=!1,a.choose=!1,a.play=function(){a.isPlaying=!0,a.timing=!0,a.choose=!1,h=c(function(){a.pcPos=i?"move-left":"move-right",i=!i},400),delete a.playerWin,delete a.tie,delete a.choosedSign},a.chooseSign=function(f){c.cancel(h),delete a.pcPos,a.timing=!1,a.isPlaying=!1,a.choose=!0;var i=a.rules;a.choosedSign=f,a.pcSign=g.choose(),a.pcSign.sign===f?(a.tie=!0,e.addGame(!1,!0),a.winningPhrase=d.instant("tie",{sign:d.instant(f)})):(a.playerWin=parseInt(i.wins[f][a.pcSign.idx]),a.playerWin?(e.addGame(!0),a.winningPhrase=a.phrases[f][a.pcSign.sign]):(e.addGame(),a.winningPhrase=a.phrases[a.pcSign.sign][f])),g.rememberMove(f),b(function(){a.showMsg=!0,b(function(){a.showMsg=!1},1e3)},100)},a.btnClass=function(b){return b!=a.choosedSign?"btn-primary":a.tie?"btn-warning":a.playerWin?"btn-success":"btn-danger"}}]),angular.module("rspls").controller("RulesController",["$scope",function(a){a.viewCls="rules",a.winMatch=function(b){var c=a.rules.wins[b];return function(a,b,d){return parseInt(c[b])}}}]),function(a){function b(a,b,c){function d(a,c){var d=b.wins[a].slice(0,c.length),e=c.indexOf(a);return d[e]=1,d=d.reduce(function(a,b,d){return 0==b&&a.push(c[d]),a},[]),c.indexOf(d[parseInt(Math.random()*d.length)])}function e(a,b){switch(a){case"memoryAdvanced":var e=c.resamblePattern(b);if(e)return d(e,b);case"memory":var f=c.mostUsed(b);if(f.count>0)return d(f.sign,b);case"random":default:return parseInt(Math.random()*b.length)}}function f(){var c=a.values.onlyClassic?b.classics:b.signs,d=e(a.values.algorithm,c);return{idx:d,sign:c[d]}}function g(a){c.push(a)}var h={choose:f,rememberMove:g};return h}a.module("rspls").factory("cpu",["settings","rules","moveMemory",b])}(angular),function(a){function b(a,b){var c=!0;for(var d in a){if(d>=b.length)break;if(a[d]!==b[d]){c=!1;break}}return c}function c(a,b){var c=a.reduce(function(a,c){return b.indexOf(c)>=0&&(a[c]=a[c]?a[c]+1:1),a},{}),d={sign:"",count:0};for(var e in c)c[e]>d.count&&(d.count=c[e],d.sign=e);return d}function d(a){function d(b){i.moves.push(b),i.moves.length>=e&&i.moves.shift(),a.set("moves",i.moves)}function g(a){return c(i.moves,a)}function h(a){var d,e=this.moves.reduce(function(b,c){return a.indexOf(c)>=0&&b.push(c),b},[]);if(e.length>f){for(var g=[],h=e.length,i=e.slice(h-f+1),j=0;f-1>j;++j)for(var k=[],l=j;h>l;++l)k.push(e[l]),b(k,i)?k.length===f-1&&h-1>l&&(g.push(e[l+1]),k=[]):k=[];g.length>0&&(d=c(g,a).sign)}else e.length===f&&(d=e[f-1]);return d}var i={moves:a.get("moves",[]),push:d,mostUsed:g,resamblePattern:h};return i}var e=100,f=4;a.module("rspls").factory("moveMemory",["storageWrapper",d])}(angular),function(a){function b(a){var b={},c=a.get("score",{play:0,tie:0,win:0});return Object.defineProperty(b,"game",{get:function(){return c.play}}),Object.defineProperty(b,"win",{get:function(){return c.win}}),Object.defineProperty(b,"tie",{get:function(){return c.tie}}),Object.defineProperty(b,"lost",{get:function(){return c.play-c.win-c.tie}}),Object.defineProperty(b,"situation",{get:function(){return 2*c.win-c.play+c.tie}}),b.addGame=function(b,d){c.play++,b?c.win++:d&&c.tie++,a.set("score",c)},b}a.module("rspls").factory("score",["storageWrapper",b])}(angular),function(a){function b(a){var b={user:"",theme:"",algorithm:"random",onlyClassic:!1},c=a.get("settings",b);return{values:angular.copy(c),store:function(b){this.values=angular.merge({},b),a.set("settings",this.values)},defaults:function(){this.store(b)}}}a.module("rspls").factory("settings",["storageWrapper",b])}(angular),function(a){function b(a){var b={};return b.get=function(b,c){var d=c;return a.isSupported&&(d=a.get(b)||c),d},b.set=function(b,c){a.isSupported&&(a.set(b,c)||dft)},b}angular.module("rspls").factory("storageWrapper",["localStorageService",b])}(angular),function(a){function b(){return{restrict:"E",scope:{},controllerAs:"cpr",controller:["version","crYearTo","crYearFrom","crOwner",c],template:'<footer class="text-right text-muted"><h5>{{:: \'version\' | translate }} {{:: cpr.version }}</h5><i class="fa fa-copyright"></i> {{:: cpr.year }} {{ cpr.owner }}</footer>'}}function c(a,b,c,d){var e=this;e.version=a,e.year=c+(b?"-"+b:""),e.owner=d}angular.module("rspls").directive("copyRight",b)}(angular),function(a){function b(a){function b(b,c){b.$watch(function(){return a.path()},function(a,d){angular.forEach(c.find("a"),function(c){var d=angular.element(c),e=d.parent(),f=d.attr("href").replace("#",""),g=new RegExp("^"+f+"$",["i"]);b.navOpen&&(b.navOpen=!1),g.test(a)?e.addClass("active"):e.removeClass("active")})})}return{restrict:"A",scope:!1,link:b}}a.module("rspls").directive("nav",["$location",b])}(angular),function(a){function b(){return{restrict:"E",scope:{visible:"="},templateUrl:"templates/settings.html",controller:["$route","settings","algorithms",c],controllerAs:"stg",bindToController:!0}}function c(b,c,d){function e(){c.defaults(),g.settings=a.copy(c.values),b.reload(),g.visible=!1}function f(){c.store(g.settings),b.reload(),g.visible=!1}var g=this;g.settings=a.copy(c.values),g.algorithms=d,g.reset=e,g.reload=f}a.module("rspls").directive("sideSettings",b)}(angular),function(a){function b(){return{restrict:"E",scope:{timeInterval:"=*interval",onlyClassic:"=*"},template:"<i class=\"fa fa-fw fa-2x\" ng-class=\"'fa-hand-' + sgn.sign + '-o'\"></i>",controller:["$scope","$interval","rules",c],controllerAs:"sgn",bindToController:!0}}function c(a,b,c){var d,e=this,f=0,g=e.onlyClassic?c.classics:c.signs,h=e.timeInterval||1e3;e.sign=g[f],d=b(function(){f=(f+1)%g.length,e.sign=g[f]},h),a.$on("$destroy",function(){b.cancel(d)})}a.module("rspls").directive("signRotator",b)}(angular),function(a){function b(){return{restrict:"E",scope:{display:"="},templateUrl:"templates/stats.html",controller:["$timeout","score",c],controllerAs:"stats",bindToController:!0}}function c(a,b){var c=this;c.pct=function(a){if(!b.game)return 0;var c=Math.max(b.win,b.lost,b.tie);return b[a]/c*100}}a.module("rspls").directive("stats",b)}(angular),angular.module("rspls").run(["$templateCache",function(a){"use strict";a.put("templates/game.html",'<div class="game-msg" ng-show="showMsg"><div class="alert text-center" ng-class="{\'alert-warning\': tie, \'alert-success\': playerWin, \'alert-danger\': !tie && !playerWin}"><i class="fa" ng-class="{\'fa-thumbs-up\': playerWin, \'fa-thumbs-down\': !tie && !playerWin}" ng-hide="tie"></i> {{ winningPhrase | translate }}</div></div><stats display="false"></stats><div class="row"><div class="col-xs-12 col-sm-offset-3 col-sm-6 text-center"><p class="h4"><label class="label label-primary">{{:: \'game.pc\' | translate }}</label></p><span class="btn btn-lg btn-warning pc-sign" ng-class="pcPos" tabindex="-1"><span class="h2"><sign-rotator interval="5000" ng-hide="timing || choose" only-classic="onlyClassic"></sign-rotator><sign-rotator interval="200" ng-if="timing && !choose" only-classic="onlyClassic"></sign-rotator><i class="fa fa-fw fa-2x" ng-show="choose" ng-class="\'fa-hand-\' + pcSign.sign + \'-o\'"></i></span></span></div></div><div class="row"><h3 class="col-xs-12 text-center"><i>vs</i></h3></div><div class="row"><div class="col-xs-12 col-sm-offset-3 col-sm-6"><p class="text-center h4"><label class="label label-primary">{{:: username ? username : (\'game.player\' | translate) }}</label></p><div class="btn-toolbar btn-toolbar-centered" role="toolbar"><button type="button" class="btn btn-lg" ng-disabled="!isPlaying" ng-repeat="sign in signs" ng-click="chooseSign(sign)" ng-class="btnClass(sign)"><h2><i class="fa fa-fw fa-2x" ng-class="\'fa-hand-\' + sign + \'-o\'"></i></h2></button></div><div class="center-block text-center"><p><i>{{:: \'game.play\' | translate }}</i></p><button class="btn btn-default btn-lg" ng-click="play()" ng-disabled="isPlaying"><i class="fa fa-play"></i></button></div></div></div>'),a.put("templates/rules.html",'<h1 class="page-header">Rock-Scissor-Paper-Lizard-Spock</h1><p>{{:: \'rule.desc\' | translate }}</p><div class="row"><ul class="list-unstyled col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2"><li ng-repeat="sign in rules.signs"><h2><i class="fa fa-fw" ng-class="\'fa-hand-\' + sign + \'-o\'"></i> {{:: sign | translate }}</h2><div class="row"><div class="col-xs-6" ng-repeat="other in rules.signs | filter : winMatch(sign)"><blockquote><b class="fa fa-fw text-success" ng-class="\'fa-hand-\'+ sign + \'-o\'"></b> vs <i class="fa fa-fw text-danger" ng-class="\'fa-hand-\'+ other + \'-o\'"></i><p class="small">{{ :: phrases[sign][other] | translate }}</p></blockquote></div></div></li></ul></div>'),a.put("templates/settings.html",'<aside class="menu-left" ng-show="stg.visible"><button type="button" class="close" ng-click="stg.visible = false">&times;</button><p class="text-info">{{:: \'settings.description\' | translate }}</p><form ng-submit="stg.reload()"><div class="form-group"><label for="settings-username">{{:: \'settings.username\' | translate }}</label><input id="setting-username" class="form-control" type="text" ng-model="stg.settings.user"></div><div class="form-group"><label for="settings-algorithm">{{:: \'settings.algorithm\' | translate }}</label><select id="settings-algorithm" class="form-control" ng-model="stg.settings.algorithm"><option ng-repeat="algorithm in ::stg.algorithms" value="{{:: algorithm.key }}">{{:: algorithm.name | translate }}</option></select></div><div class="form-group checkbox-inline"><label class="checkbox"><input type="checkbox" ng-model="stg.settings.onlyClassic">{{:: \'settings.onlyClassic\' | translate }}</label></div><div class="btn-toolbar btn-toolbar-centered"><button type="submit" class="btn btn-primary">{{:: \'settings.save\' | translate }}</button> <button type="reset" class="btn btn-default" ng-click="stg.reset()">{{:: \'settings.reset\' | translate }}</button></div></form></aside><div class="menu-left-backdrop" ng-show="stg.visible" ng-click="stg.visible = false" tabindex="-1" role="backdrop"></div>'),a.put("templates/stats.html",'<div class="stat-wrapper"><button type="button" class="btn btn-info btn-lg btn-round" ng-click="stats.display = true" ng-hide="stats.display"><i class="fa fa-tasks"></i></button><div class="stat well" ng-show="stats.display" ng-click="stats.display = false"><div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" ng-style="{width: stats.pct(\'win\') + \'%\'}">{{:: \'game.win\' | translate }}</div></div><div class="progress"><div class="progress-bar progress-bar-warning" role="progressbar" ng-style="{width: stats.pct(\'tie\') + \'%\'}">{{:: \'game.tie\' | translate }}</div></div><div class="progress"><div class="progress-bar progress-bar-danger" role="progressbar" ng-style="{width: stats.pct(\'lost\') + \'%\'}">{{:: \'game.lost\' | translate }}</div></div></div></div>')}])}({},function(){return this}());