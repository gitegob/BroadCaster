const makeActive = (elements) => {
  elements.forEach((element) => {
    element.addEventListener('click', () => {
      elements.forEach((elt) => {
        elt.classList.remove('active');
      });
      element.classList.add('active');
    });
  });
};
makeActive(document.querySelectorAll('.admin-page .status-link-wrapper'));
makeActive(document.querySelectorAll('.tab-link-wrapper'));
makeActive(document.querySelectorAll('div.page'));

const setStatusColor = (param) => {
  const element = param;
  if (element.value === 'resolved') {
    element.style.color = 'green';
  }
  if (element.value === 'pending') {
    element.style.color = 'orange';
  }
  if (element.value === 'rejected') {
    element.style.color = 'red';
  }
};

const display = (parameter) => {
  document.querySelector('.modal-bg').style.display = parameter;
  document.querySelector('body').classList.toggle('no-scroll');
};
document.querySelectorAll('select').forEach((element) => {
  setStatusColor(element);
  element.addEventListener('change', () => {
    setStatusColor(element);
  });
});



document.querySelectorAll('a.delete').forEach((el) => {
  el.addEventListener('click', () => {
    display('flex');
  });
})
document.querySelector('.close-modal').addEventListener('click', () => {
  display('none');
});

document.querySelectorAll('.img-delete').forEach((element) => {
  element.addEventListener('click', () => {
    document.querySelector('.img-delete').parentElement.parentElement.remove();
  });
});
