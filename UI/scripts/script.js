const makeActive = (elements) => {
  elements.forEach((element) => {
    element.addEventListener('click', () => {
      elements.forEach((element) => {
        element.classList.remove('active');
      });
      element.classList.add('active');
    });
  });
};
makeActive(document.querySelectorAll('.admin-page .status-link-wrapper'));
makeActive(document.querySelectorAll('.tab-link-wrapper'));
makeActive(document.querySelectorAll('div.page'));

const setStatusColor = (param) => {
  if (param.value === 'resolved') {
    param.style.color = 'green';
  }
  if (param.value === 'unresolved') {
    param.style.color = 'orange';
  }
  if (param.value === 'rejected') {
    param.style.color = 'red';
  }
};
document.querySelectorAll('select').forEach((element) => {
  setStatusColor(element);
  element.addEventListener('change', () => {
    setStatusColor(element);
  });
});
