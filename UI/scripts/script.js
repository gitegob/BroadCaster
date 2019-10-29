const makeActive = (parameter) => {
  parameter.forEach((el) => {
    el.addEventListener('click', () => {
      parameter.forEach((elmt) => {
        elmt.classList.remove('active');
      });
      el.classList.add('active');
    });
  });
};
makeActive(document.querySelectorAll('.status-link-wrapper'));
makeActive(document.querySelectorAll('.tab-link-wrapper'));
makeActive(document.querySelectorAll('div.page'));
