
//grab the body of the page
const body = document.querySelector(`body`);

//grab all of the images from the page
const images = document.querySelectorAll(`.lightbox img`);



//attach an event listener to each individual image
//param 1 = what to listen for
//param 2 = what do fire once heard
//DOM API automatically binds image to function, but best practice for clarity to include
images.forEach(image =>
  image.addEventListener(`click`, openOverlay.bind(image))
);



//write function to show the overlay on image click
//add image to overlay. use 'this' to reference image. outerHTML property grabs the markup for the 'this' object

function openOverlay(){
  const overlayMarkup = `<div id="overlay">
    <figure>
    ${this.outerHTML}
    <figcaption>${this.alt}</figcaption>
    </figure>
  </div>`

  //add overlayMarkup to just before the closing body tag
  body.insertAdjacentHTML(`beforeend`, overlayMarkup);



  //grab overlay div from the page
  const overlay = document.querySelector(`#overlay`);

  //add click event listener to overlay
  overlay.addEventListener(`click`, closeOnClick);

  //add keypress event listener to the body
  body.addEventListener(`keyup`, closeOnEscape);

}

//ADD CLOSING FUNCTIONALITY

//write function to close on a click to the overlay
function closeOnClick(event){
  //make sure the area being clicked is just the overlay
  if(event.target.id == "overlay"){
    closeOverlay();
  }

}

//write function to close overlay on Esc
function closeOnEscape(event){
  //find event's key by 1) console.log(event) 2) activate overlay in browser 3) press key
  if(event.key == "Escape"){
    closeOverlay();
  }
}

//write function to wipe the overlay and remove events
function closeOverlay(){
  //grab the overlay again here because of scope
  const overlay = document.querySelector(`#overlay`);

  //overwrite the overlay to be empty (removes click event by virtue of HTML being wiped)
  overlay.outerHTML = ``;

  //remove keypress event b/c otherwise mutiple esc keypresses will be stored im memory, potentially affecting performance
  body.removeEventListener(`keyup`, closeOnEscape);
}
