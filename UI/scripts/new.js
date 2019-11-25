const toggleShow = () => {
  document.querySelector('.coordinates').classList.toggle('show');
};
document.querySelector('.locate').addEventListener('click', () => {
  toggleShow();
});
document.querySelector('.submit-coordinates').addEventListener('click', () => {
  toggleShow();
});
<<<<<<< HEAD
let res;
document.querySelector('.geolocate').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      res = {
=======
document.querySelector('.geolocate').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      result = {
>>>>>>> c7cedcae5f9a0c03e3b7521b66c65f083d8729f1
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    });
  } else {
    document.querySelector('.coordinates').innerHTML = 'Geolocation is not supported by this browser.';
    toggleShow();
  }
});
