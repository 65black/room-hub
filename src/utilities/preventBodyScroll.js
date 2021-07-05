/**
 * Verifies the argument, if the argument is truthy the document becomes unscrollable.
 * Works for both mobile and desktop.
 *
 * @param {boolean} disableScroll
 */
const preventBodyScroll = (disableScroll = false) => {
  if (disableScroll) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
};

export default preventBodyScroll;
