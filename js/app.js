const galleryPopup = document.querySelector('.gallery-popup');
const popupImage = document.querySelector('.gallery-popup__image');
const popupText = document.querySelector('.gallery-popup__text');
const popupClose = document.querySelector('.gallery-popup__close');
const popupPrev = document.querySelector('.gallery-popup__control_prev');
const popupNext = document.querySelector('.gallery-popup__control_next');

const galleryItem = document.querySelector('.gallery__item');
const galleryImage = document.querySelector('.gallery__item-image');
const galleryText = document.querySelector('.gallery__item-text');

const images = [
  { src: 'img/William-Turner.jpg', title: 'William Turner' },
  { src: 'img/Humphry-Repton.jpg', title: 'Humphry Repton' },
  { src: 'img/Carlos-de-Haes.jpg', title: 'Carlos De Haes' },
  { src: 'img/Claude-Lorrain.jpg', title: 'Claude Lorrain' }
];

let currentImageIndex = 0;
function handleGalleryPop() {
  galleryImage.style.backgroundImage = `url(${images[0].src})`;
  galleryItem.addEventListener('click', function (e) {
    openPopup();
  });

  popupClose.addEventListener('click', closePopup);
  popupPrev.addEventListener('click', showPrevImage);
  popupNext.addEventListener('click', showNextImage);
}

  function openPopup() {
    updatePopupContent();
    galleryPopup.classList.add('active');
  }

  function closePopup() {
    galleryPopup.classList.remove('active');
  }

  function showPrevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updatePopupContent();
    }
    updateControls();
  }

  function showNextImage() {
    if (currentImageIndex < images.length - 1) {
      currentImageIndex++;
      updatePopupContent();
    }
    updateControls();
  }

  function updatePopupContent() {
    const image = images[currentImageIndex];
    popupImage.src = image.src;
    galleryImage.style.backgroundImage = `url(${image.src})`;
    galleryText.textContent = image.title;
    popupText.textContent = image.title;

  }

  function updateControls() {
    if (currentImageIndex === 0) {
      popupPrev.classList.add('gallery-popup__control_disabled');
    } else {
      popupPrev.classList.remove('gallery-popup__control_disabled');
    }

    if (currentImageIndex === images.length - 1) {
      popupNext.classList.add('gallery-popup__control_disabled');
    } else {
      popupNext.classList.remove('gallery-popup__control_disabled');
    }
  }
  handleGalleryPop();
  updateControls();
  const form = document.querySelector('.contact-me-form');
  const emailInput = document.querySelector('#email');
  const messageInput = document.querySelector('#message');

  const emailError = document.querySelector('.email-error');
  const messageError = document.querySelector('.message-error');

  function handleForm() {
  emailInput.addEventListener('input', (evt) => {
    emailInput.setCustomValidity('');
    if (!emailInput.validity.valid) {
      emailError.textContent = emailInput.validationMessage;
      emailInput.setCustomValidity('Please, enter correct email');
    }
  });

messageInput.addEventListener('input', (evt) => {
  const textRegex = /^[0-9a-zA-Zа-яА-ЯёЁ\s.,!?-]+$/;
  const textError = 'Only russian and english letters';
  messageInput.setCustomValidity('');

  if (!textRegex.test(messageInput.value)) {
    messageError.textContent = textError;
    messageInput.setCustomValidity(textError);
  }
})

form.addEventListener('submit', function(evt) {
  if (!form.checkValidity()) {
    evt.preventDefault();
    emailInput.reportValidity();
    messageInput.reportValidity();
  } else {
    evt.preventDefault();

    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    const originalColor = submitButton.style.backgroundColor;
    submitButton.style.backgroundColor = "grey";
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка запроса...';

    const formData = {
      email: emailInput.value,
      message: messageInput.value
    };
    fetch(form.action,{
      method: 'POST',
      body: formData}).then((response) => {
        if (response.ok){
          setTimeout(() =>
          {
            submitButton.textContent = 'Успешно отправлено';
            setTimeout(() =>{
              submitButton.textContent = originalText;
              submitButton.disabled = false;
              form.reset();
              submitButton.style.backgroundColor = originalColor;
            }, 1000);
          }, 5000);
        }
        else{
          alert("Сообщение не отправлено");
          submitButton.disabled = false;
          submitButton.style.backgroundColor = originalColor;
          submitButton.textContent = originalText;
        }
    })
  }
});
  }

const openButton = document.querySelector('.form-popup__button');
const popup = document.querySelector('.form-popup');
const closeButton = document.querySelector('.close-popup');
function handleFormPopup(){
openButton.addEventListener('click', function() {
  popup.classList.add('active');
});

function closeFormPopup() {
  popup.classList.remove('active');
  localStorage.setItem('popupClosed', 'true');
}

closeButton.addEventListener('click', closeFormPopup);
}
handleFormPopup();
handleForm();
document.addEventListener('DOMContentLoaded', function() {
  const wasPopupClosed = localStorage.getItem('popupClosed') === 'true';
  function showPopup() {
    if (!wasPopupClosed) {
      popup.classList.add('active');
    }
  }
  setTimeout(showPopup, 3000);
});
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById('current-time').textContent = `${timeString}`;
}
updateTime();
setInterval(updateTime, 1000);






