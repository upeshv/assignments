var animalList = (function() {
  function init(){
    uiBindings();
  };

  var uiBindings = function() {

    // Adding images to src
    var imageBlock = document.querySelectorAll('.wrapper__image');
    if(imageBlock) {
      for (i = 0; i < imageBlock.length; i++) {
        var imageData = imageBlock[i].getAttribute("data-img");
        imageBlock[i].src = imageData;
      }
    }

    // Sorting Images
    function sortingImages(name, dataAttr){
      var sortList = document.getElementById('sorting').children;
      sortList = Array.prototype.slice.call(sortList, 0);
      var sortName = document.getElementById(name);
      if(sortList) {
        sortName.addEventListener('click', function(){
          sortList.sort(function (a, b) {
            var aName = a.getAttribute(dataAttr);
            var bName = b.getAttribute(dataAttr);
            return (aName.toLowercase() > bName.toLowercase()) ? 1 : -1;
          });

          var parent = document.getElementById('sorting');
          parent.innerHTML = "";

          for(var i = 0, l = sortList.length; i < l; i++) {
            parent.appendChild(sortList[i]);
          }
        });
      }
    }

    sortingImages("sortName","data-name");
    sortingImages("sortTag","data-tag");
    sortingImages("sortPlace","data-loc");


  };

  window.addEventListener("load",init,false);
})();
