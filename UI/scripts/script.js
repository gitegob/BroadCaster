const makeActive = (parameter) => {
  parameter.forEach((el) => {
    el.addEventListener('click', () => {
      parameter.forEach((element) => {
        element.classList.remove('active');
      });
      el.classList.add('active');
    });
  });
};
makeActive(document.querySelectorAll('.status-link-wrapper'));
makeActive(document.querySelectorAll('.tab-link-wrapper'));
makeActive(document.querySelectorAll('div.page'));
