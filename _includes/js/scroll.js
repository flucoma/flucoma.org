// The debounce function receives our function as a parameter
const debounce = (fn) => {

  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {

    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {

      // Call our function and pass any params we received
      fn(...params);
    });

  }
};


const storeScroll = () => {
  // Reads out the scroll position and stores it in the data attribute
  // document.documentElement.dataset.scroll = window.scrollY;

  // If scroll position greater than zero, add data attribute
  if (window.scrollY > 0) {
    document.documentElement.dataset.scrolled = true;
  }
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), {
  passive: true
});

// Update scroll position for first time
storeScroll();
