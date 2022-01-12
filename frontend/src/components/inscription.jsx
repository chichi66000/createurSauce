import React from 'react';
// import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { userSchema } from './validation/userValidation';
import {axiosInstance}   from '../axios';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Inscription() {
  const history = useHistory();

  //utiliser yup pour valider userSchema 
  const { register, handleSubmit, formState :{ errors }, reset } = useForm ({
      resolver: yupResolver(userSchema),
  })

  //fonction pour submit et envoyer datat au server
  const onSubmitHandler = async (data) => {
    console.log({ data });
    // envoyer data au server
    await axiosInstance.post('/api/auth/signup', {
      email: data.email, 
      password: data.password
    })
    .then ( response => {
      console.log(response);
      // Faire un alert succès 
      Swal.fire('Sucès. Veuillez connecter avec votre email')
      // redirect au page connexion
      history.push('/connexion')
    })
    .catch( (error) => { 
      console.log(error);
      Swal.fire(`Veuillez vérifier les erreurs suivantes: <br>1. Email invalid <br> 2.Password doit avoir entre 8 et 20 characters, 1 majuscule, 1 minuscule, 1 charactère spécial (@$!%*#?&.) <br>3. Email déjà utilisé `)
    })
    // Réinitilialiser les valeurs des input
    reset();
  };


  return (
    // formulaire inscription email et password
    <form onSubmit = {handleSubmit(onSubmitHandler)} className="md:w-3/4 lg:w-1/2 md:mx-auto mx-2 my-12 bg-white border border-2 border-gray-200 p-2  rounded-xl ">
      <h2 className="text-center my-5 text-xxl font-extrabold text-purple-900 ">Inscription</h2>

      {/* input email */}
      <div className="grid grid-row-2 md:grid-cols-3 gap-4 mb-5 mx-5 mb-5 mx-5">
        <label className=" bg-white md:px-2 font-extrabold text-purple-900 " htmlFor="email">Email</label>
        <input className="md:col-span-2 h-full w-full px-2 py-1 border-gray-700 border border-4 rounded rounded-lg   bg-gray-200 hover:shadow-lg hover:font-bold hover:border-purple-500   focus:shadow-lg focus:font-bold focus:border-purple-500" type="email" required
        name="email" id="email" placeholder="email"
        {...register("email")} 
        />
      </div>
      {/*email error message  */}
      <p className= "text-red-500 mx-auto text-center text-sm pb-2">{errors.email?.message}</p>

      {/* input password */}
      <div className="grid grid-row-2 md:grid-cols-3 gap-4 mb-5 mx-5">
        <label className=" bg-white md:px-2 font-extrabold text-purple-900 " htmlFor="password">Password</label>
        <input className="md:col-span-2 h-full w-full px-2 py-1  border-gray-700 border border-4 rounded rounded-lg   bg-gray-200 hover:shadow-lg hover:font-bold hover:border-purple-500   focus:shadow-lg focus:font-bold focus:border-purple-500" type="password" required
        id="password" 
        name="password" placeholder="password"
        {...register("password")} 
        />
      </div>
      {/* password error message */}
      <p className= "text-red-500 mx-auto text-center text-sm pb-2">{errors.password?.message}</p>

      {/* button submit formulaire */}
      <div className="text-center">
        <button type="submit" className="btn bg-violetClair text-white text-center w-32 mx-auto mt-3 mb-3 rounded rounded-xl shadow-2xl ring-purple-400 ring-2   hover:opacity-80 focus:opacity-80 hover:text-black focus:text-black">Submit</button>

      </div>
      
    </form>
  ) 
}