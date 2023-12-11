import { useEffect } from 'react'
import { useState } from 'react'

export default function Profile(){

    const [user, setuser] = useState({})

    useEffect(()=>{
        fetch('')
        .then(res => res.json())
        .then(data => setuser(data))
        .catch(err => console.log(err))
    },[])

    return(
        <h1>{user.first_name} {user.last_name}</h1>
    )
}