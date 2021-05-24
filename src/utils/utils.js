import FormValidator from '../components/FormValidator/FormValidator';
import { validationAuth, validationProfile } from './constants';

const convertTime = (min) => {
  return `${Math.floor(min/60)}ч ${min % 60}м`
}

const validateForm = (form, config) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
  return formValidator;
};

const validateAuth = (form) => {
  return validateForm(form, validationAuth);
}

const validateProfile = (form) => {
  return validateForm(form, validationProfile);
}


export { validateAuth, validateProfile, convertTime };
