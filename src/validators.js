import { helpers, minLength, required } from '@vuelidate/validators';

export const required$ = helpers.withMessage('Это поле обязательно', required)

export const phoneMinLength$ = (min) => helpers.withMessage(
  ({ $params}) => `Phone number should contain ${$params.min} digits.`, minLength(min)
)

export const phoneNumber$ = () => helpers.withMessage("Номер телефона должен начинаться с 7 и иметь 11 цифр", 
(value) => value[0] == 7 && value.replace(/\+|\-/, "").length == 11)