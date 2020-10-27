import vue from "vue"

// 移动端拖拽指令
vue.directive("drag",(el,binding)=>{

    
    el.ontouchstart  = function (e) {
        var touch;
         if (e.touches) {
            //有可能对象在e上也有可能对象在e.touches[0]上
          touch = e.touches[0];
          } else {
            touch = e;
          }
        var x = touch.clientX - el.offsetLeft;

        var y = touch.clientY -el.offsetTop;
        console.log(touch,x);
        el.ontouchmove= function (e) {
           if (e.touches) {
            //有可能对象在e上也有可能对象在e.touches[0]上
          touch = e.touches[0];
          } else {
            touch = e;
          }
          var X = touch.clientX - x;
          var Y = touch.clientY - y;
          //    console.log(X,Y)
          el.style.left=X+"px"
          el.style.top=Y+"px"
         

          document.ontouchend = function () {
            document.onmousemove = "";
            
          };
        };
      };

})
