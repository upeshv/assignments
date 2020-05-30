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
    function sortingImages(name, dataAttr, byDate){
      var sortList = document.getElementById('sortFilterBlock').children;
      sortList = Array.prototype.slice.call(sortList);
      var sortName = document.getElementById(name);
      if(sortList) {
        sortName.addEventListener('click', function(){
          sortList.sort(function (a, b) {
            if(byDate) {
              var aName = a.getAttribute(dataAttr);
              var bName = b.getAttribute(dataAttr);
              return new Date(aName) - new Date(bName);
            } else {
              var aName = a.getAttribute(dataAttr);
              var bName = b.getAttribute(dataAttr);
              return (aName.toLowerCase() > bName.toLowerCase()) ? 1 : -1;
            }
          });

          var parent = document.getElementById('sortFilterBlock');
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
    sortingImages("sortDate","data-date", true);

    // Filter Images
    function filterImages(tageName, filterTag){
      var filterName = document.getElementById(tageName);
      var filterTagList = filterName.getElementsByTagName('a');
      Array.prototype.forEach.call(filterTagList, function (singleClick) {
        singleClick.addEventListener('click', function () {
          var filterSingle = singleClick.text;
          var filterList = document.getElementById('sortFilterBlock').children;

          for(var i = 0; i < filterList.length; i++) {
            var dataName = filterList[i].getAttribute(filterTag);
            if(dataName.indexOf(filterSingle) > -1) {
              filterList[i].style.display = "block";
            } else {
              filterList[i].style.display = "none";
            }
          }
        });
      });
    }

    filterImages("filterTag","data-tag");
    filterImages("filterPlace","data-loc");
    filterImages("filterMonth","data-month");

  };

  window.addEventListener("load",init,false);
})();
