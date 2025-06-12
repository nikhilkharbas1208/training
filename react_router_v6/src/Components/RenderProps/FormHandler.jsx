import React, { useState } from 'react'

const FormHandler = ({render}) => {

    const [formData, setFormData] = useState({});
    const [error, setError] = useState({});

    const handleChange = (e) =>{
        const {name, value, type} = e.target
        if(value ==''){
            setError({msg: `${name} field required...`})
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let formData = new FormData(e.target)
        let formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj);
    }

  return render({formData, error, handleChange, handleSubmit});
}

export default FormHandler