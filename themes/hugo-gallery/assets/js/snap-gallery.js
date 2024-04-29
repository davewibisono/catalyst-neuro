/*
  SPDX-FileCopyrightText: 2023 Max Mehl <https://mehl.mx>
  SPDX-License-Identifier: MIT
*/

// Variables
var lightbox_baseid = "snap-lightbox-";
var slideshow_baseid = "snap-slideshow-";
//var imageIndex = {1: 1, 2: 1, 3: 1};
var imageIndex  = {}

// Open the Lightbox
function openLightbox(id) {
  document.getElementById(lightbox_baseid + id).style.display = "block";

  // Kill automatic slideshow when lightbox opened
  try {
    clearInterval(autoSlideshow);
  } catch (e) {
    console.log("Lightbox error: " + e)
  }
}

// Close the Lightbox
function closeLightbox(id) {
  document.getElementById(lightbox_baseid + id).style.display = "none";
}

// Move lightbox to the specified item
function openLightboxItem(id, n) {
  showItem(lightbox_baseid, id, imageIndex[id] = n, ".snap-lightbox-inner");
}

// Next/previous controls for lightbox
function moveLightboxItem(id, n) {
  showItem(lightbox_baseid, id, imageIndex[id] += n, ".snap-lightbox-inner");
}

// Next/previous controls for slideshow
function moveSlideshowItem(id, n, mode) {
  showItem(slideshow_baseid, id, imageIndex[id] += n, ".snap-image");

  // Kill automatic slideshow once the slideshow has been moved manually
  if (mode !== "auto") {
    clearInterval(autoSlideshow);
  }
}

// In the slideshow or lightbox, make a specific image visible, make others hidden
function showItem(baseId, id, n, className) {
  // Get elements that shall be rotated
  const element = document.getElementById(baseId + id);
  const items = element.querySelectorAll(className);

  // Increment item index
  const updateIndex = () => {
    if (n > items.length) {
      imageIndex[id] = 1;
    }
    if (n < 1) {
      imageIndex[id] = items.length;
    }
  };

  // hide all selected elements
  const hideAllItems = () => {
    for (let i = 0; i < items.length; i++) {
      items[i].style.display = "none";
    }
  };

  // make desired item visible
  const showCurrentItem = () => {
    items[imageIndex[id] - 1].style.display = "inline-block";
  };

  updateIndex();
  hideAllItems();
  showCurrentItem();
}
