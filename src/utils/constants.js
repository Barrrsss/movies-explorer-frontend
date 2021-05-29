const emailInput = 'emailInput';
const passwordInput = 'passwordInput';
const nameInput = 'nameInput';
const movieInput = 'movieInput';

const validationAuth = {
  inputSelector: '.auth__input',
  submitButtonSelector: '.auth__submit-button',
  inactiveButtonClass: 'auth__submit-button_disabled',
  inputErrorClass: 'auth__input_type_error',
  errorClass: 'auth__input-error_active',
  errorSelector: '.auth__input-error',
}

const validationProfile = {
  inputSelector: '.profile__input',
  submitButtonSelector: '.profile__button',
  inactiveButtonClass: 'profile__button_disabled',
  inputErrorClass: 'profile__input_type_error',
  errorClass: 'profile__input-error_active',
  errorSelector: '.profile__input-error',
}

export { emailInput, passwordInput, nameInput, movieInput,
  validationAuth, validationProfile };
