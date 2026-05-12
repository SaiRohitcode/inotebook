import noteContext from './noteContext';
import { useState } from 'react';
const NoteState = (props) => {
    const s1 = {
        "name" :  "Harry",
        "age" : 50
    }
    const [state, setState] = useState(s1);
    const update = () =>{
        setTimeout(() => {
            setState({
                "name" : "virat",
                "age" : 60
            });
        },1000);
    }
        return (
            <noteContext.Provider  value = {{state,update}}>
                {props.children}
            </noteContext.Provider>
        )
}

export default NoteState