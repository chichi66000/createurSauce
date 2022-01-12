import * as yup from 'yup'
// utliser yup pour valider email et password
export const userSchema = yup.object().shape({
  // email est required et valid
  email: yup
    .string()
    .required('Veuillez remplir votre email')
    .email('Email invalid'),
  // password fort avec min 8 characters, 1 maj, 1 character spécial
  password: yup.string()
    .min(8, 'Mot de passe doit avoir au minimum 8 characters')
    .max(20, 'Mot de passe doit avoir au maximum 20 characters')
    .required('Mot de passe est demandé')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/, " Mot de passe doit avoir 8 et 20 characters, 1 majuscule, 1 minuscule, 1 charactère spécial (@$!%*#?&.)")
})