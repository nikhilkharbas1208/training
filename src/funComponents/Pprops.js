import PropTypes from 'prop-types';

const Pprops = ({name,days}) => {
    return (
        <div>
            <p>welcome to react {name}</p>
            <p>and now you are going to learn react in {days} days</p>
        </div>
    );
};

export const Pprop = (props) =>{
    return (
        <div>
            <ul>
                <li>first value : {props.lable} </li>
                <li> second value : {props.field}</li>
            </ul>
        </div>
    );
};

Pprops.propTypes = {
    name : PropTypes.string.isRequired,
    days :  PropTypes.number.isRequired,
};



export default Pprops;