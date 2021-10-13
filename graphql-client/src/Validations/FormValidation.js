import * as yup from 'yup';
export const formValidation = yup.object().shape({
  name: yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),

  email: yup.string()
    .email("InValid Email")
    .required('Required'),

  password: yup.string()
    .min(4, 'Minimum 4 Characters required')
    .required('Required')

});

export const editformValidation = yup.object().shape({

  name: yup.string()
  .min(3, 'Too Short!')
  .max(30, 'Too Long!')
  .required('Required'),

email: yup.string()
  .email("InValid Email")
  .required('Required'),
});
