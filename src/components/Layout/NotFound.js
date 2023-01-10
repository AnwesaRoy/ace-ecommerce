import { Link } from "react-router-dom";
import Card from "./Card";
import classes from './NotFound.module.css';

export const NotFound = () => {
    return (
        <Card>
            <div className={classes.notFound}>
                <h1>Oops! You seem to be lost. Go to <Link to='/'>Home</Link>.</h1>                
            </div>
        </Card>        
    )
}

export default NotFound;
