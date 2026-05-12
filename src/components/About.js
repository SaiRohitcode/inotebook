import React from 'react'
import { useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    const a = useContext(noteContext)
    useEffect(() => {
        a.update();
    },[])
    return (
        <div>
            This is about {a.state.name} of age {a.state.age}
        </div>
    )
}

export default About