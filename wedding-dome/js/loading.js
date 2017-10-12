var manifest = [
  {
  src: "images/che.png",
  id: "che"
},
{
  src:"images/end.jpg",
  id:"end.jpg"
},
{
  src:"images/forever_01.png",
  id:"forever_01.png"
},
{
  src:"images/forever_02.png",
  id:"forever_02.png"
},
{
  src:"images/our1.png",
  id:"our1.jpg"
},
{
  src:"images/forever_02_1.jpg",
  id:"forever_02_1.jpg"
},

{
  src:"images/wht0.png",
  id:"wht0.png"
},
{
  src:"images/wht1.png",
  id:"wht1.png"
},
{
  src:"images/wht2.png",
  id:"wht2.png"
},
{
  src:"images/wht3.png",
  id:"wht3.png"
},
{
  src:"images/wht4.png",
  id:"wht4.png"
},
{
  src:"images/wht5.png",
  id:"wht5.png"
},
{
  src:"images/wht6.png",
  id:"wht6.png"
},
{
  src:"images/h0.jpg",
  id:"h0.jpg"
},
{
  src:"images/h1.jpg",
  id:"h1.jpg"
},
{
  src:"images/h2.jpg",
  id:"h2.jpg"
},
{
  src:"images/h3.jpg",
  id:"h3.jpg"
},
{
  src:"images/h4.jpg",
  id:"h4.jpg"
},
{
  src:"images/h5.jpg",
  id:"h5.jpg"
},
];
var preload = new createjs.LoadQueue();
preload.loadManifest(manifest);
preload.on('fileload', handleFileload);
preload.on('progress', handleProgress);
preload.on('complete', handComplete);
//document.getElementById("loading").style.display = "block";
function handleFileload(event) {

}
function handleProgress(event) {
  //console.log(parseInt(preload.progress* 100))
  

    //handHidden(document.getElementById("loading"), 1, -0.01);
    
    document.getElementById("loading").style.opacity = 1;
    document.getElementById("load-num").innerHTML = parseInt(preload.progress * 100) + "%";
    document.getElementById("loadings").style.width = preload.progress * 100 + "%";
    if(preload.progress>0.7){
      document.getElementById("car").style.left = 0.7 * 100 + "%";
      document.getElementById("boy").style.opacity = 1;
    }else{
      document.getElementById("car").style.left = preload.progress * 100 + "%";
    } 
}
function handHidden(o, i, s) {
  t = setInterval(function () {
    i += s;
    o.style.opacity = i;
    if (i < 0) {
      window.clearInterval(t)
      o.remove();
      document.getElementById("app").style.opacity = 1;
      //document.getElementById("surecross").style.display = "block";
    }
    ;
  }, 5);

};
function handComplete() {
  // var music = document.getElementById("music");
  $("#code").typewriter();
    document.getElementById("music").style.display = "block";
    document.getElementById("girl").style.opacity = 1;
    // setTimeout(function(){
      
    // },500);
    // setTimeout(function(){
      
    // },1000);
    setTimeout(function(){
      handHidden(document.getElementById("loading"), 1, -0.01);
    },1000)
  // handHidden(document.getElementById("loading"), 1, -0.01);
   wxajax();
   
   addEvent(music,"click", function () {
     event.stopPropagation();
     bf();
   });
  //  setTimeout(function(){
  //   document.getElementById("app").style.display = "block";
  //   document.getElementById("loading").style.display = "none";
  //  },500)
   

  // addEvent(home,"click", function () {
  //   event.stopPropagation();
  //   console.log("xxxx");
  //   if (audio.paused) {
  //     audio.play();// 这个就是播放
  //     if (!hasClass(music, "music"))
  //       addClass(music, "musicplay");
  //   }
  // });

}

function addEvent(elem, event, fn) {
  if (elem.addEventListener) {
    elem.addEventListener(event, fn, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + event, fn);
  } else {
    elem['on' + event] = fn;
  }
}
function addClass(obj, cls) {
  var obj_class = obj.className,//获取 class 内容.
    blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
  added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
  obj.className = added;//替换原来的 class.
}
function removeClass(obj, cls) {
  var obj_class = ' ' + obj.className + ' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
  obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
    removed = obj_class.replace(' ' + cls + ' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
  removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
  obj.className = removed;//替换原来的 class.
}
function hasClass(obj, cls) {
  var obj_class = obj.className,//获取 class 内容.
    obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
  x = 0;
  for (x in obj_class_lst) {
    if (obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
      return true;
    }
  }
  return false;
}

function bf() {
  var audio = document.getElementById('music1');
  var music = document.getElementById("music");
  if (audio !== null) {
    //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
    console.log(audio.paused);
    if (audio.paused) {
      audio.play();//audio.play();// 这个就是播放  
      addClass(music, "musicplay")
    } else {
      audio.pause();// 这个就是暂停
      removeClass(music, "musicplay")
    }
  }
}
