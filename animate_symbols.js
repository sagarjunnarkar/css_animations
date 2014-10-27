$(window).load(function() {
// var angle = 0;     // starting position (degrees)
// var distance = 250; // distance of b from a
// var speed = 10;    // revolution speed in degrees per second
// var rate  = 10;    // refresh rate in ms

// function f() {
    
//     var o = $('.centered').offset();
    
//     var t = o.top + (distance * Math.sin(angle * Math.PI/180.0));
//     var l = o.left+ (distance * Math.cos(angle * Math.PI/180.0));
    
//     $('.mother_symbol').css({
//         top: t,
//         left: l
//     });
    
//     angle += (speed * (rate/1000)) % 360;
// }

// setInterval(f, rate);

  screen_width = $( window ).width()
  screen_height = $( window ).height()
  $('div').css({'min-height': screen_height})
  mother_symbol_images = []
  aurobindo_symbol = $('img.centered')[0]
  centeredImagePostion = {
                           left:(screen_width/2) - (aurobindo_symbol.width/2), //aurobindo_symbol.offsetLeft,
                           top:(screen_height/2) - (aurobindo_symbol.height/2),//aurobindo_symbol.offsetTop,
                           right:(screen_width/2) + (aurobindo_symbol.width/2),//aurobindo_symbol.offsetLeft + 358,
                           bottom:(screen_height/2) + (aurobindo_symbol.height/2) //aurobindo_symbol.offsetTop + 333,
                         }
  h = -2                       
  function getNewPosition(){
    x = Math.floor(Math.random () * (screen_width - (aurobindo_symbol.width/2)))
    if (h==-2) {
      h = 2
    } else{
      h = -2
    }; 
    y = Math.floor(Math.random () * (screen_height*h - (aurobindo_symbol.height/2)))
    return [x,y]
  }
  newPosition = [0,0]
  dimensions = dimensionOfImage()
  function dimensionOfImage(){
    size = Math.floor(Math.random() * 6) + 5
    width = height = Math.floor(screen_width * size / 100)
    return [width,height]
  }
  drawImage();
  mother_symbol_images.push({
                              left:newPosition[0],
                              top:newPosition[1],
                              right:newPosition[0] + dimensions[0],
                              bottom:newPosition[1]+dimensions[1]
                            })
  function drawImage(){
    var img = $('<img class="mother_symbol">');
    img.attr('src', 'Mother\'s Symbol Large.png');
    img.css({
      "left": (newPosition[0]) + "px",
      "top": (newPosition[1]) + "px",
      "width": (dimensions[0]) + "px",
      "height": (dimensions[1]) + "px",
      "display": "none",
      "position": "absolute"
    });
    img.css('opacity', 1)
    img.appendTo('div')
  }
    for (var i = 0; i < 1000; i++) {
      newPosition = getNewPosition()
      dimensions = dimensionOfImage()
      newImagePostion = {
                          left:newPosition[0], 
                          top:newPosition[1],
                          right:(newPosition[0] + dimensions[0]),
                          bottom:(newPosition[1] + dimensions[1])
                        }
      total_symbols = mother_symbol_images.length
      count = 0
      $.each(mother_symbol_images, function( index, value ) {
        if(intersectRect(value,newImagePostion)){
          return false
        }
        else{
          count += 1
         }
        if(total_symbols == count){
          if(intersectRect(centeredImagePostion,newImagePostion)) {
          }
          else{
            drawImage()
            mother_symbol_images.push(newImagePostion)
          };
          return false
          }
      });
      if($('img').length == 500 || i == 999){
        mother_symbols = $('img.mother_symbol').fadeIn(5000)
        // one_forth = Math.floor(mother_symbols.length/4)
        // mother_symbols.slice(0,one_forth).fadeIn(2000)
        // mother_symbols.slice(one_forth+1,one_forth*2).delay(1000).fadeIn(5000)
        // mother_symbols.slice((one_forth*2) +1,(one_forth*3)).delay(2000).fadeIn(5000)
        // mother_symbols.slice((one_forth*3) +1,(one_forth*4)).delay(3000).fadeIn(5000)
//        $('.mother_symbol').animate({left: 100}, 2000).animate({top:  100}, 2000).animate({left:   0}, 2000).animate({top:    0}, 2000);
        return false;
      }
    };
    function intersectRect(r1, r2) {
      return !((r2.left - 20) > r1.right || 
      (r2.right + 20) < r1.left || 
      (r2.top - 20) > r1.bottom ||
      (r2.bottom + 20) < r1.top);
    }
});
