let zindex=9;
let instance = null;

class i9os{
  constructor(){
    
    // if (!instance) { instance = this; }
    this.win;
    if (!zindex) { zindex = 9; }
    this.content="Hello";
    this.wprops={
      title:"Window Title",
      css:{
        width:"600px",
        height:"400px",
        top:"10%",
        left:"10%",
        position:"absolute"
      }
    }

    // return instance;
  }


      createWin(args){

        console.log(this.wprops);
        var props=this.wprops;
        //create window
        var mylayer = document.createElement('div');
        mylayer.classList.add("djwin");
        //Header and title
        mylayer.innerHTML='<div class="djwin_header">'
          +'<div class="djwin_title">'
          +'  Window Title'
          +'</div>'
          +'<div class="djwin_controls">'
            +'<button type="button" name="button" class="djwin_ctl djwin_ctl_help">?</button>'
            +'<button type="button" name="button" class="djwin_ctl djwin_ctl_min">_</button>'
            +'<button type="button" name="button" class="djwin_ctl djwin_ctl_close">x</button>'
          +'</div>'
        +'</div>';
        // content div
        mylayer.innerHTML+='<div class="djwin_content">'
        +this.content
        +'</div>';
        // Footer
        mylayer.innerHTML+='<div class="djwin_footer">'
          +'<div class="djwin_footnote">'
          +'  Footer info'
          +'</div>'
          +'<div class="djwin_rightfooter">'
          +'</div>'
        +'</div>';
        // mylayer.

        //create titlebar and title

        //create window controls max, min, close

        //create window content

        //display

        //set drag

        // mylayer.style.width=this.wprops.css.width;
        // mylayer.style.height=this.wprops.css.height;
        // mylayer.innerHTML=this.win_props.title;
        // mylayer.style.background="#000";
        document.body.appendChild(mylayer);
        this.dragElement(mylayer);
        this.win=mylayer;
        this.setHeight(this.wprops.css.height);
        this.setWidth("500px");
        this.setPosx("100px");
        // this.onmousedown=bringtoTop

        // function  bringtoTop(e){
        //   this.win.style.zIndex=zindex+1;
        // }
        // this.

      }

      setHeight(ht){
        this.win.style.height=ht;
      }

      setWidth(wt){
        this.win.style.width=wt;
      }

      setPosx(x){
        this.win.style.left=x;
      }

      setPosy(y){
        this.win.style.top=y;
      }

      setHtml(){

      }

     
      

      bodyHt(){
      var y;
      	if (self.innerHeight) {
      	y = self.innerHeight;
      	// Explorer 6 Strict Mode
      	} else if (document.documentElement && document.documentElement.clientHeight) {
      	y = document.documentElement.clientHeight;
      	// other Explorers
      	} else if (document.body) {
      	y = document.body.clientHeight;
      	}
      	return parseInt(y);
      };

      bodyWt(){
      var x;
      	if (self.innerHeight) {
      	 x = self.innerWidth;
      	} else if (document.documentElement && document.documentElement.clientHeight) {
      	 x = document.documentElement.clientWidth;
      	} else if (document.body) {
      	 x = document.body.clientWidth;
      	}
      	return parseInt(x);
      };

       dragElement(elmnt) {
          var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
          var bwt=this.bodyWt();
          var bht=this.bodyHt();
          if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
          } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
          }

          function dragMouseDown(e) {

            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            // console.log(pos3 +" "+pos4);
            document.onmousedown=onTop;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
          }

         function onTop(e){
            e = e || window.event;
            e.preventDefault();
            var zi=elmnt.style.zIndex;
            if(zi<zindex) elmnt.style.zIndex=++zindex;
          }

          function elementDrag(e) {

            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;

            pos3 = e.clientX;
            pos4 = e.clientY;
            // console.log(pos3 +" "+pos4);
            // console.log(pos1 +" "+pos2);

            // set the element's new position:
            if(pos4>5 && pos4<bht){
              elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
              elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
            // else{
            //   closeDragElement();
            // }
          }

          function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
          }
      }

}

//export this class to be imported in other js files eg: import i9os from './os'
// export default (new i9os);