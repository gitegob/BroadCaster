const toggleShow = (element) => {
  const el = element;
  el.addEventListener('click', () => {
  document.querySelector('.contact-us-wrapper').classList.toggle('show');
    
  });
}
toggleShow(document.querySelector('.contact-us-btn'));
toggleShow(document.querySelector('.feedback-submit'));
