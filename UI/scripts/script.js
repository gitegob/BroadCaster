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
  if (param.value === 'pending') {
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

let result = 0;
const toggleShow = () => {
  document.querySelector('.coordinates').classList.toggle('show');
};
document.querySelector('.locate').addEventListener('click', () => {
  toggleShow();
});
document.querySelector('.submit-coordinates').addEventListener('click', () => {
  toggleShow();
});
document.querySelector('.geolocate').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      result = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    });
  } else {
    document.querySelector('.coordinates').innerHTML =      'Geolocation is not supported by this browser.';
    toggleShow();
  }
});

document.querySelectorAll('.img-delete').forEach((element) => {
  element.addEventListener('click', () => {
    document.querySelector('.img-delete').parentElement.parentElement.remove();
  });
});
