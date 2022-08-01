const d = document,
  w = window;


function scrollSpy() {
  const $section = d.querySelectorAll('section[data-scroll-spy]');
  const cb = (entries) => {


    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id')
      // console.log(id);
      if (entry.isIntersecting) {

        d.querySelector(`a[data-scroll-spy][href = "#${id}"]`).classList.add("active");
      } else {
        d.querySelector(`a[data-scroll-spy][href = "#${id}"]`).classList.remove("active");
      }

    })
  };
  const observer = new IntersectionObserver(cb, {
    rootMargin: "-150px",
  });
  $section.forEach(el => observer.observe(el));
};



d.addEventListener('DOMContentLoaded', (e) => {
  var elms = document.getElementsByClassName('splide');

  for (var i = 0; i < elms.length; i++) {
    new Splide(elms[i], {
      type: 'loop',
      autoplay: true,
      interval: 3000,
    }).mount();
  }
  scrollSpy()
});
d.addEventListener('submit', (e) => {
  const $myform = d.getElementById('scf-form-id-contactForm'),
    data = new FormData(e.target),
    $formSpace = d.getElementById('formSpace'),
    text = `${data.name}<p class="text-success text-capitalize fs-2">your data has been sent successfully </p>`;
  e.preventDefault();
  axios({
    method: 'POST',
    url: 'http://127.0.0.1:8000',
    data: data,
  })
    .then(function (response) {
      $myform.reset();
      console.log(data);
      //console.log(response);
      //$myform.classList.add('d-none');
      //$formSpace.innerHTML = text
    })
    .catch(function (error) {
      console.log(error);
    });

})