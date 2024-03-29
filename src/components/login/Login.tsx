import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {

    const {user, login, logout, onChangeUsername, onChangeEmail} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = () => {
        login();
        navigate(location.state.pathname || '/');
    }

    const handleLogout = () => {
        logout();
    }


  return (
      <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Login</h2>

              <form className="mx-auto max-w-lg rounded-lg border">
                  <div className="flex flex-col gap-4 p-4 md:p-8">
                      <div>
                          <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
                          <input placeholder={user.email} onChange={onChangeEmail} name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                      </div>

                      <div>
                          <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">User</label>
                          <input placeholder={user.username} onChange={onChangeUsername} name="user" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                      </div>

                      <button onClick={handleLogin} className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Log in</button>
                      <button onClick={handleLogout} className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Log out</button>

                  </div>

                  <div className="flex items-center justify-center bg-gray-100 p-4">
                      <p className="text-center text-sm text-gray-500">Don't have an account? <a href="#" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Register</a></p>
                  </div>
              </form>
          </div>
      </div>
  )
}
