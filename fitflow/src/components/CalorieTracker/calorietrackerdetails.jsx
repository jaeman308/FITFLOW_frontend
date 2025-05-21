import { AuthedUserContext } from "../../App";
import {useState, useEffect, useContext} from 'react';
import { useParams, Link } from "react-router-dom";
import * as calorietrackerService from '../../components/services/calorietracker';

const calorietrackerDetails = (props) => {
    const {calorietrackerId} = useParams();
    const [calorietracker, setcalorietracker] = useState(null);
    const user = useContext(AuthedUserContext);

}

