import { Link } from 'react-router-dom';
import {AuthedUserContext} from '../../App'
import {useContext} from'react';

const NavBar = ({ handleSignout }) => {
    const user = useContext(AuthedUserContext)
    return (
        <>
        { user ? (
            <nav>
                <ul>
                    <li><Link to="/dashboard">DashBoard</Link></li>
                    <ul><Link>Track</Link>
                    <li><Link to="/calorietrackerform">Calorie Tracker</Link></li>
                    <li><Link to="/habittrackerform">Habit Tracker</Link></li>
                    <li><Link>Goals</Link></li>
                    </ul>
                    <li><Link to="/signin" onClick={handleSignout}>Sing Out</Link></li>
                </ul>
            </nav>
        ):(
            <nav>
                <ul>
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                </ul>
            </nav>

        )}
        </>
    )
}

export default NavBar