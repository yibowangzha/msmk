window.onload=function(){

  
    function rem(){

        document.documentElement.style.fontSize = document.documentElement.clientWidth/4.1+'px'

    }

    rem()
    
    window.onresize=rem


}