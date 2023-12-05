import { useContext } from "react"
import { AlertContext } from "../components/Alert"

export const useAlert = () => {
    return useContext(AlertContext)
}