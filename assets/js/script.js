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

    /** Modal */
    var allImageHoverBlock = document.querySelectorAll('.float__hover-block');
    Array.prototype.forEach.call(allImageHoverBlock, function (individualClick) {
      individualClick.addEventListener('click', function (e) {
        var allImageBlock = document.getElementsByClassName('float__image-block');
        for (i = 0; i < allImageBlock.length; i++) {
          allImageBlock[i].removeAttribute("id");
        }

        this.parentNode.setAttribute("id", "myModal");
        var currentIndex = this.parentNode.getAttribute("data-index");

        // Clone the list in modal block
        var myModal = document.getElementById("myModal");
        var modalBlock = document.querySelector('.imageModalInner');
        var modalNav = document.querySelector('.slideParams');
        modalBlock.style.display = "block";
        modalNav.style.display = "block";
        
        if(myModal) {

          function modal(modalBlock, myModal) {
            modalBlock.innerHTML = '';
            var divClone = myModal.cloneNode(true);
            modalBlock.appendChild(divClone);
          }

          modal(modalBlock, myModal);
          var modalClose = document.querySelector('.close');
          if(modalClose) {
            modalClose.addEventListener('click', function () {
              modalBlock.style.display = "none";
              modalNav.style.display = "none";
              modalBlock.innerHTML = '';
            });
          }

          Array.prototype.forEach.call(document.getElementsByClassName("float__image-block"), function (slidesSlingle) {
            if(slidesSlingle.getAttribute("style") === "display: none;") {
              slidesSlingle.style.display = "block";
            }
          });

          var slideIndex = parseInt(currentIndex);
      
          var slidePrev = document.querySelector('.prev');
          var slideNext = document.querySelector('.next');
          slidePrev.addEventListener('click', function () {
            showSlides(slideIndex += -1);
          });

          slideNext.addEventListener('click', function () {
            showSlides(slideIndex += 1);
          });

          // Keyboard Shortcut
          document.onkeydown = function(e) {
            e = e || window.event;
            if (e.keyCode == '37') {
              showSlides(slideIndex += -1);
            } else if (e.keyCode == '39') {
              showSlides(slideIndex += 1);
            }
          }

          function showSlides(n) {
            var slides = document.getElementsByClassName("float__image-block");
            if (n > slides.length) {
              slideIndex = 1;
            }

            if (n < 1) {
              slideIndex = slides.length;
            }

            modal(modalBlock, slides[slideIndex-1]);
          }
          
        }
      });
    });
  };

  window.addEventListener("load",init,false);
})();
