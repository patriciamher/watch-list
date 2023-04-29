const show = document.querySelector('#show').value;
const done = document.querySelectorAll('.done');
const trash = document.getElementsByClassName("fa-trash");

// done.addEventListener('click', (e) => {
//   console.log(this)
//   e.preventDefault()
//   e.target.classList.toggle('hidden')
// })
done.forEach(function(element) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    e.target.classList.toggle('hidden');
  });
});

Array.from(show).forEach(function(element){
  element.addEventListener('click', function(){
    const show = this.parentNode.parentNode.childNodes[1].innerText;
    fetch('/show', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        'show': show
      })
    });
  });
})

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(e){
    const show = this.parentNode.parentNode.childNodes[1].innerText;
    fetch('shows', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'show': show
      })
    }).then(function (response) {
      // remove the element from the DOM
      this.parentNode.parentNode.remove();
    }.bind(this));
  });
});