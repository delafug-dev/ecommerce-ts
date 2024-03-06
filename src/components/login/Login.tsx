import { useAuth } from "../../hooks/useAuth";
import {useForm} from "react-hook-form";

export const Login = () => {

    const {user, login, logout, onChangeUser} = useAuth();
    const { register, handleSubmit, formState: { errors }, watch, clearErrors, setError } = useForm();
    const contieneMayusculas = (str: string) => /[A-Z]/.test(str);


    const handleLogin = () => {
        onChangeUser(watch('username'), watch('email'));
        console.log(watch('email'));
        console.log(watch('username'));
        setTimeout(() => {login()}, 1000);
    }

    const handleLogout = () => {
        logout();
    }

    const handleEmail = () => {
        const email = watch('email');
        if(!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
            return setError('email', {message: "Por favor, introduce un email válido."})
        }
    }

    const handleUsername = () => {
        const username = watch('username');
        if(username.length < 3){
            return setError('username', {message: "El usuario debe tener al menos 3 caracteres."})
        }
        if(username.length > 15){
            return setError('username', {message: "El usuario no puede tener más de 10 caracteres."})
        }
    }

    const handlePassword = () => {
        if (errors.password) clearErrors('password');
        const password = watch('password');
        const confirmPassword = watch('confirmPassword');
        if (password !== confirmPassword) {
            setError('confirmPassword', { message: 'Las contraseñas no coinciden' });
        }
        if (password.length < 6) {
            setError('password', { message: 'La contraseña debe tener al menos 8 caracteres' });
        }
        if (!contieneMayusculas(password)) {
            setError('password', { message: 'La contraseña debe tener al menos una mayúscula' });
        }
        if (!password.match(/[0-9]/)) {
            setError('password', { message: 'La contraseña debe tener al menos un número' });
        }
        if (password === confirmPassword) clearErrors()
    }

  return (
      <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Login</h2>

              <form onSubmit={handleSubmit(handleLogin)} className="mx-auto max-w-lg rounded-lg border">
                  <div className="flex flex-col gap-4 p-4 md:p-8">
                      <div>
                          <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
                          <input placeholder={user.email}
                                 className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                                 {...register("email",{ required: "Por favor, ingrese su email" })} onBlur={() => handleEmail()}/>
                            {errors.email && (<span className="text-red-600">{errors.email.message}</span>)}
                      </div>

                      <div>
                          <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">User</label>
                          <input placeholder={user.username}
                                 className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                                 {...register("username", {required: "Por favor, ingrese un username"})} onBlur={() => handleUsername()}/>
                            {errors.username && (
                                <span className="text-red-600">{errors.username.message}</span>
                            )}
                      </div>

                      <div>
                          <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Contraseña</label>
                          <input placeholder={user.username} type="password"
                                 className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                                 {...register("password", {required: "Por favor, ingrese una contraseña"})} onBlur={() => handlePassword()}/>
                            {errors.password && (<span className="text-red-600">{errors.password.message}</span>)}
                      </div>
                      <div>
                          <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Repetir contraseña</label>
                          <input placeholder={user.username} type="password"
                                 className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                                 {...register("confirmPassword", {required: "Por favor, repita su contraseña"})} onBlur={() => handlePassword()}/>
                                {errors.confirmPassword && (<span className="text-red-600">{errors.confirmPassword.message}</span>)}
                      </div>

                      <button onClick={handleLogin}
                              className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">
                          Login
                      </button>
                      <button onClick={handleLogout}
                              className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">
                          Logout
                      </button>

                  </div>

                  <div className="flex items-center justify-center bg-gray-100 p-4">
                      <p className="text-center text-sm text-gray-500">
                          Don't have an account?
                          <a href="#" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Register</a>
                      </p>
                  </div>
              </form>
          </div>
      </div>
  )
}
