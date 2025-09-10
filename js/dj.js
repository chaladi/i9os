// dj.js Dynamic javascript library
class djs {
  constructor(ob) {
    this.ob=ob;
    this.doExec=(callback,returnFlag) => {
      const ob=this.ob;
      var ret="";
      for (var i = 0; i < ob.length; i++){
        if (returnFlag) ret+=callback(ob[i]);
        else callback(ob[i]);
      }
      return ret;
    };
  }
  isArray(input){ return typeof(input)=='object'&&(input instanceof Array); };
  on(type,callback){ this.doExec(function(aob){ aob['on'+type]=callback;}); };//event handling like click
  each(callback){ this.ob.forEach( function(item){ callback(item); }); };
  remove(){ this.doExec(function(aob){ aob.parentNode.removeChild(aob);}); }; //removes element
  empty(){ this.doExec(function(aob){ aob.innerHTML="";}); };//makes element empty
  hide(){ this.doExec(function(aob){ aob.style.display="none";});};
  show(){ this.doExec(function(aob){ aob.style.display="block";});};
  append(str){ this.doExec(function(aob){ aob.insertAdjacentHTML('beforeend', str);});};
  prepend(str){ this.doExec(function(aob){ aob.insertAdjacentHTML('afterbegin', str);});};
  after(str){ this.doExec(function(aob){ aob.insertAdjacentHTML('afterend', str);}); };
  before(str){ this.doExec(function(aob){ aob.insertAdjacentHTML('beforebegin', str);});};
  hasClass(classname){ this.doExec( function(aob){ return aob.classList.contains(classname)?true:false; });};
  addClass(classes){ this.classLooper(classes, 'add'); } //can add more class if supplied as array
  removeClass(classes){ this.classLooper(classes, 'remove');} //can add more class if supplied as array
  toggleClass(classes){ this.classLooper(classes, 'toggle');} //can add more class if supplied as array
  classLooper( arr,action){
    if(!this.isArray(arr)) arr=[arr];
    this.doExec(function(aob){
      arr.forEach(function(item){
        if(action=="add") aob.classList.add(item);
        else if(action=="remove") aob.classList.remove(item);
        else if(action=="toggle") aob.classList.toggle(item);
      });
    });
  }
  addAttr(attr, value){ this.doExec(function(aob){ aob.setAttribute(attr, value)}); };
  removeAttr(attr){ this.doExec(function(aob){ aob.removeAttribute(attr, value)}); };

  html(str){
    if(str)	this.doExec(function(aob){ aob.innerHTML=str;});
  	else return this.doExec(function(aob){ return aob.innerHTML;},true);
  };//gets or sets innerHTML
  createNode(el,str){
    var elm = document.createElement(el);
    if(str) elm.innerHTML = str;
    return elm.firstChild;
  };
  addNodeAfter(el,html){
    var node=this.createNode(el,html);
    this.doExec(function(aob){ aob.parentNode.insertBefore(node, aob.nextSibling);});
  };
  addNodeBefore(el,html){
    var node=this.createNode(el,html);
    this.doExec(function(aob){ aob.parentNode.insertBefore(node, aob);});
  };



}


dj = function(selector) {
  if(selector=="") selector=window;
      var djob=typeof(selector)=='object'?[selector]:document.querySelectorAll(selector);
      return new djs(djob);
    };

//Extending functionality
    dj.sample = function() {
            //do something here
            //return that;
    };
