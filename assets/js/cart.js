document.getElementById('range-picker').addEventListener('click', function(e) {
    var sizeList = document.getElementById('range-picker').children;
    for (var i = 0; i <= sizeList.length - 1; i++) {
      console.log(sizeList[i].classList);
      if (sizeList[i].classList.contains('active')) {
        sizeList[i].classList.remove('active');
      }
    }
    e.target.classList.add('active');
  })
  
  document.getElementById('color-a').addEventListener('click', function() {
    document.getElementById('color-overlay').style.transform = 'translateX(-0.5px)';
    document.getElementById('background-element').style.backgroundColor = '#fff';
    document.getElementById('highlight-overlay').style.opacity = '1';
    document.getElementById('highlight-overlay-mobile').style.opacity = '1';
    document.getElementById('color-name').innerHTML = "BLACK";
    document.getElementById('color-name').style.color = '#333'
  
  })
  document.getElementById('color-b').addEventListener('click', function() {
    document.getElementById('color-overlay').style.transform = 'translateX(45px)';
    document.getElementById('background-element').style.backgroundColor = '#fcfcfc';
    document.getElementById('highlight-overlay').style.opacity = '0';
    document.getElementById('highlight-overlay-mobile').style.opacity = '0';
    document.getElementById('color-name').innerHTML = "WHITE";
    document.getElementById('color-name').style.color = '#457'
  })