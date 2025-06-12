import FormHandler from "../Components/RenderProps/FormHandler";
import Toggle from "../Components/RenderProps/Toggle";

export const Contact = () => {
    return(
        <>
        <h1>Contact Page</h1>
        {/* <Toggle flag= {false}
        render = {
            (isOn) => {
                return isOn ? <div>I am toggle ON</div> : <div>I am toggle OFF</div> 
            }
        }
        /> */}
        {/* <Toggle flag= {false}>
            {
                (isOn) => {
                return isOn ? <div>I am toggle ON</div> : <div>I am toggle OFF</div> 
            }
            }
        </Toggle> */}
        <FormHandler
            render = {
                ({formData, error, handleChange, handleSubmit})=>{
                    return(
                        <form onSubmit={handleSubmit}>
                            <label>  Enter Your Name   </label>
                            <input type="text" name="username" onChange={handleChange}></input><br/>
                            <label>  Enter Your Message   </label>
                            <input type="text" name="message" onChange={handleChange}></input><br/>
                            <button type="submit" >Submit</button>
                        </form>
                    )
                }
            }
        />


        </>
    );
};