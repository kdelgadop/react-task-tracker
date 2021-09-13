import PropTypes from 'prop-types'
import Button from './Button';

const Header = ({ title, onAdd, showAdd }) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color={showAdd ? 'gray' : 'green'} text={showAdd ? "Close" : "Add"} onClick={onAdd}/>
        </header>
    )
}

Header.defaultProps = {
    title: "Title example"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}
//CSS in JS using the style={}  tag with 
// var headingStyle = {
//     color: 'red', 
//     backgroundColor: 'black'
// }

export default Header
