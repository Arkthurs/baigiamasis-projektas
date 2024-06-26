import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.js"

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw Error('useAuthContext turi būti AuthContext provider viduje')
    }
    return context
}