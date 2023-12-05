import { useSelector } from "react-redux"

export default function Profile(){

    const user = useSelector(state => state.auth.user)
    console.log(user)

    return(
        <h1>Profile {user.email}</h1>
    )
}