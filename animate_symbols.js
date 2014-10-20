$(window).load(function() {
  screen_width = $( window ).width()
  screen_height = $( window ).height()
  mother_symbol_images = []
  aurobindo_symbol = $('img.centered')[0]
  centeredImagePostion = {
                           left:(screen_width/2) - (aurobindo_symbol.width/2), //aurobindo_symbol.offsetLeft,
                           top:(screen_height/2) - (aurobindo_symbol.height/2),//aurobindo_symbol.offsetTop,
                           right:(screen_width/2) + (aurobindo_symbol.width/2),//aurobindo_symbol.offsetLeft + 358,
                           bottom:(screen_height/2) + (aurobindo_symbol.height/2) //aurobindo_symbol.offsetTop + 333,
                         }
  function getNewPosition(){
    x = Math.floor(Math.random () * (screen_width - 115))
    y = Math.floor(Math.random () * (screen_height - 115))
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
    img.attr('src', 'mother_symbol.png');
    img.css({
      "left": (newPosition[0]) + "px",
      "top": (newPosition[1]) + "px",
      "width": (dimensions[0]) + "px",
      "height": (dimensions[1]) + "px",
      "display": "none"
    });
    img.css('opacity', 1)
    img.appendTo('body')
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
      if($('img').length == 50 || i == 999){
        mother_symbols = $('img.mother_symbol')
        one_forth = Math.floor(mother_symbols.length/4)
        mother_symbols.slice(0,one_forth).fadeIn(1000)
        mother_symbols.slice(one_forth+1,one_forth*2).delay(1000).fadeIn(5000)
        mother_symbols.slice((one_forth*2) +1,(one_forth*3)).delay(2000).fadeIn(5000)
        mother_symbols.slice((one_forth*3) +1,(one_forth*4)).delay(3000).fadeIn(5000)
        return false;
      }
    };
    function intersectRect(r1, r2) {
      return !(r2.left > r1.right || 
      r2.right < r1.left || 
      r2.top > r1.bottom ||
      r2.bottom < r1.top);
    }
});
