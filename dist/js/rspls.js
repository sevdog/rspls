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
!function(a,b){b["rspls "]=a;var c={rock:"Rock",scissors:"Scissors",paper:"Paper",lizard:"Lizard",spock:"Spock","menu.rules":"Description","menu.play":"Play","rule.desc":"Rock-paper-scissors-lizard-Spock) è una variante fantasiosa inventata da due studenti americani, Sam Kass e Karen Bryla, e resa successivamente famosa da un episodio del telefilm The Big Bang Theory.","rule.vs.LS":"Lizard poisons Spock","rule.vs.LP":"Lizard eats Paper","rule.vs.PS":"Paper disproves Spock","rule.vs.PR":"Paper covers Rock","rule.vs.RS":"Rock crushes Scissors","rule.vs.RL":"Rock crushes Lizard","rule.vs.SP":"Scissors cuts Paper","rule.vs.SL":"Scissors decapitates Lizard","rule.vs.SS":"Spock smashes Scrissors","rule.vs.SR":"Spock vaporizes Rock",tie:"Tie using {{sign}}","game.player":"Player","game.pc":"CPU","game.win":"Wins","game.tie":"Tie","game.lost":"Lost"},d={rock:"Sasso",scissors:"Forbici",paper:"Carta",lizard:"Lizard",spock:"Spock","menu.rules":"Descrizione","menu.play":"Gioca","rule.desc":'Sasso-carta-forbice-lucertola-Spock (Rock-paper-scissors-lizard-Spock) è una variante fantasiosa della "Morra Cinese" inventata da due studenti americani, Sam Kass e Karen Bryla, e resa successivamente famosa da un episodio del telefilm The Big Bang Theory.',"rule.vs.LS":"Lizard avvelena Spock","rule.vs.LP":"Lizard mangia la Carta","rule.vs.PS":"La Carta smentisce Spock","rule.vs.PR":"La Carta avvolge il Sasso","rule.vs.RS":"Il Sasso rompe le Forbici","rule.vs.RL":"Il Sasso schiaccia Lizard","rule.vs.SP":"Le Forbici tagliano la Carta","rule.vs.SL":"Le Forbici decapitano Lizard","rule.vs.SS":"Spock rompe le Forbici","rule.vs.SR":"Spock vaporizza il Sasso",tie:"Pareggio con {{sign}}","game.player":"Giocatore","game.pc":"CPU","game.win":"Vittorie","game.tie":"Pareggi","game.lost":"Sconfitte"},e=angular.module("rspls",["ngAnimate","ngTouch","ngRoute","ngAria","pascalprecht.translate"]);e.config(["$routeProvider","$translateProvider",function(a,b){a.when("/rules",{templateUrl:"templates/rules.html",controller:"RulesController"}).when("/game",{templateUrl:"templates/game.html",controller:"GameController"}).otherwise({redirectTo:"/rules"}),b.translations("it",d).translations("en",c).determinePreferredLanguage().fallbackLanguage("en")}]),e.constant("version","1.0.0"),e.constant("rules",{signs:["rock","scissors","paper","lizard","spock"],wins:{rock:"01010".split(""),scissors:"00110".split(""),paper:"10001".split(""),lizard:"00101".split(""),spock:"11000".split("")}}),e.constant("phrases",{rock:{scissors:"rule.vs.RS",lizard:"rule.vs.RL"},scissors:{paper:"rule.vs.SP",lizard:"rule.vs.SL"},paper:{rock:"rule.vs.PR",spock:"rule.vs.PS"},lizard:{paper:"rule.vs.LP",spock:"rule.vs.LS"},spock:{rock:"rule.vs.SR",scissors:"rule.vs.SS"}}),e.run(["$rootScope","rules","phrases",function(a,b,c){a.rules=b,a.phrases=c}]),angular.module("rspls").controller("GameController",["$scope","$timeout","$interval","$translate",function(a,b,c,d){var e,f=!0;a.isPlaying=!1,a.timing=!1,a.choose=!1,a.counter={play:0,tie:0,win:0},a.play=function(){a.isPlaying=!0,a.timing=!0,a.choose=!1,e=c(function(){a.pcPos=f?"move-left":"move-right",f=!f},400),delete a.playerWin,delete a.tie,delete a.choosedSign},a.chooseSign=function(f){c.cancel(e),delete a.pcPos,a.counter.play++,a.timing=!1,a.isPlaying=!1,a.choose=!0;var g=a.rules;a.choosedSign=f,a.pcSign=parseInt(Math.random()*g.signs.length),a.pcSign===g.signs.indexOf(f)?(a.tie=!0,a.counter.tie++,a.winningPhrase=d.instant("tie",{sign:d.instant(f)})):(a.playerWin=parseInt(g.wins[f][a.pcSign]),a.playerWin?(a.counter.win++,a.winningPhrase=a.phrases[f][g.signs[a.pcSign]]):a.winningPhrase=a.phrases[g.signs[a.pcSign]][f]),b(function(){a.showMsg=!0,b(function(){a.showMsg=!1},1e3)},100)},a.btnClass=function(b){return b!=a.choosedSign?"btn-primary":a.tie?"btn-warning":a.playerWin?"btn-success":"btn-danger"}}]),angular.module("rspls").controller("RulesController",["$scope",function(a){a.winMatch=function(b){var c=a.rules.wins[b];return function(a,b,d){return parseInt(c[b])}}}]),angular.module("rspls").directive("nav",["$location",function(a){return{restrict:"A",link:function(b,c,d,e){b.$watch(function(){return a.path()},function(a,b){ng.forEach(c.find("a"),function(b,c){var d=angular.element(b),e=d.parent(),f=d.attr("href").replace("#",""),g=new RegExp("^"+f+"$",["i"]);g.test(a)?e.addClass("active"):e.removeClass("active")})})}}}]),angular.module("rspls").directive("signRotator",["$interval","$rootScope",function(a,b){return{restrict:"E",scope:{timeInterval:"=*interval"},template:"<i class=\"fa fa-fw fa-2x\" ng-class=\"'fa-hand-' + sign + '-o'\"></i>",link:function(c,d,e,f){var g=0,h=b.rules.signs,i=c.timeInterval||1e3;c.sign=h[g],a(function(){g=(g+1)%h.length,c.sign=h[g]},i)}}}]),angular.module("rspls").run(["$templateCache",function(a){"use strict";a.put("templates/game.html",'<div class="game-msg" ng-show="showMsg"><div class="alert text-center" ng-class="{\'alert-warning\': tie, \'alert-success\': playerWin, \'alert-danger\': !tie && !playerWin}"><i class="fa" ng-class="{\'fa-thumbs-up\': playerWin, \'fa-thumbs-down\': !tie && !playerWin}" ng-hide="tie"></i> {{ winningPhrase | translate }}</div></div><div class="row"><div class="col-xs-12 col-sm-offset-3 col-sm-6 text-center"><span class="btn btn-lg btn-warning pc-sign" ng-class="pcPos"><h2><sign-rotator interval="5000" ng-hide="timing || choose"></sign-rotator><sign-rotator interval="200" ng-show="timing && !choose"></sign-rotator><i class="fa fa-fw fa-2x" ng-show="choose" ng-class="\'fa-hand-\' + rules.signs[pcSign] + \'-o\'"></i></h2></span></div></div><div class="row"><h3 class="col-xs-12 text-center"><i>vs</i></h3></div><div class="row"><div class="col-xs-12 col-sm-offset-3 col-sm-6"><h2 class="btn-toolbar btn-toolbar-centered" role="toolbar"><button type="button" class="btn btn-lg" ng-disabled="!isPlaying" ng-repeat="sign in rules.signs" ng-click="chooseSign(sign)" ng-class="btnClass(sign)"><h2><i class="fa fa-fw fa-2x" ng-class="\'fa-hand-\' + sign + \'-o\'"></i></h2></button></h2><button class="btn btn-default btn-lg center-block" ng-click="play()" ng-disabled="isPlaying"><i class="fa fa-play"></i></button></div></div><div class="row" style="margin-top:30px"><div class="col-xs-12 col-sm-offset-4 col-sm-4"><table class="table"><thead><tr><th>{{:: \'game.win\' | translate }}</th><th>{{:: \'game.tie\' | translate }}</th><th>{{:: \'game.lost\' | translate }}</th></tr></thead><tbody><tr><td class="text-center">{{ counter.win }}</td><td class="text-center">{{ counter.tie }}</td><td class="text-center">{{ counter.play - counter.win - counter.tie }}</td></tr></tbody></table></div></div>'),a.put("templates/rules.html",'<h1 class="page-header">Rock-Scissor-Paper-Lizard-Spock</h1><p>{{:: \'rule.desc\' | translate }}</p><div class="row"><ul class="list-unstyled col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2"><li ng-repeat="sign in rules.signs"><h2><i class="fa fa-fw" ng-class="\'fa-hand-\' + sign + \'-o\'"></i> {{:: sign | translate }}</h2><div class="row"><div class="col-xs-6" ng-repeat="other in rules.signs | filter : winMatch(sign)"><blockquote><b class="fa fa-fw text-success" ng-class="\'fa-hand-\'+ sign + \'-o\'"></b> vs <i class="fa fa-fw text-danger" ng-class="\'fa-hand-\'+ other + \'-o\'"></i><p class="small">{{ :: phrases[sign][other] | translate }}</p></blockquote></div></div></li></ul></div>')}])}({},function(){return this}());