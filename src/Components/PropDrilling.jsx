export const ParentComponent = () => {
    return (
        <>
    <h1>Hello ParentComponent</h1>
    <ChildComponent data="Heyy"/>
    </>
    );
};

const ChildComponent = (props) => {
    return (
        <>
    <h1>Hello ChildComponent </h1>
    <h6>From Parent: {props.data}</h6>
    <GrandChildComponent data = {props.data}/>
</>
    );
};


const GrandChildComponent = (props) => {
    return (
        <>
    <h1>Hello GrandChildComponent </h1>
    <h6>From Parent: {props.data}</h6>
</>
    );
};

