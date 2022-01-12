import * as yup from 'yup'
// utliser yup pour valider email et password
export const sauceValidationSchema = yup.object().shape({
  // email est required et valid
  name: yup
    .string()
    .required('Veuillez donner 1 nom à votre sauce'),
  // manufacturer est required et valid
  manufacturer: yup
    .string()
    .required('Veuillez préciser le nom de manufacturer'),
  // description est required et valid
  description: yup
    .string()
    .required('Veuillez préciser le nom de manufacturer'),
  // mainPepper est required et valid
  mainPepper: yup
    .string()
    .required('Veuillez préciser le nom de manufacturer'),
})