(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){funCurry=require("../src")},{"../src":3}],2:[function(require,module,exports){(()=>{"use strict";const isPrimitive=x=>x===null||typeof x==="boolean"||typeof x==="number"||typeof x==="string";const stringify=x=>isPrimitive(x)?JSON.stringify(x):x===undefined?"undefined":x instanceof Function?x.name||"=>":x instanceof RegExp||x instanceof Error?x.toString():x instanceof Array?`[${x.map(stringify).join(",")}]`:`{${Object.keys(x).join(",")}}`;module.exports=stringify})()},{}],3:[function(require,module,exports){(()=>{"use strict";const stringify=require("stringify-anything");const setProp=(key,value,x)=>Object.defineProperty(x,key,{value:value});const setName=(n,x)=>setProp("name",n,x);const setLength=(n,x)=>setProp("length",n,x);const toss=msg=>{throw Error(msg)};const checkInputs=(f,arity,args)=>{if(!(typeof f==="function")){toss(`${stringify(f)} should be a function`)}if(!(typeof arity==="number")){toss(`${stringify(arity)} should be a number`)}if(!(args instanceof Array)){toss(`${stringify(args)} should be an Array`)}};const partialName=(f,args)=>stringify(f)+(!args.length?"":`(${args.map(stringify).join(",")})`);const curry=(f,arity=f.length,args=[])=>{checkInputs(f,arity,args);return setName(partialName(f,args),setLength(arity,(...partialArgs)=>{const newArgs=args.concat(partialArgs.length?partialArgs:[undefined]);return newArgs.length>=arity?f.apply(null,newArgs):setLength(arity-newArgs.length,curry(f,arity,newArgs))}))};module.exports=curry})()},{"stringify-anything":2}]},{},[1]);
