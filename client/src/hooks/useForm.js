import { useState } from "react"

export const useForm = (initialState={}) => {
  
    const [formValue, setformValue] = useState(initialState)
    
    const changeFormValue = ({target})  => {

        const field = target.name;
        setformValue(value =>({
            ...value,
            [field]: target.value
        }));

    }
    
    return{
        formValue,
        ...formValue, 
        changeFormValue,
    }
}
