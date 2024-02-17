import { useContext } from "react"
import { SearchContext } from "../context/SearchPorivder"

export const useSearch = () => {
    return useContext(SearchContext)
}