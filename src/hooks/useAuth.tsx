import { useContext } from "react"
import { UserAuthContext } from "../context/UserProvider"


export const useAuth = () => {
    return useContext(UserAuthContext)
}
