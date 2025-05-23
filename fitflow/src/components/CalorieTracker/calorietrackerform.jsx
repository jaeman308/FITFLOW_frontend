import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import * as calorietrackerservices from '../services/calorietracker';


const CalorieTrackerForm = ({handleAddCalorietracker, handleupdateCalorietracker, isSubmitting}) => {
    const [formData, setFormData] = useState ({

    })


return (
    <main>
        <h1>Lets start Tracking</h1>
        <div>
        <form autoComplete='off' >
             <h1> Calorie Tracker</h1>
             <label htmlFor="Date">Date: </label>
             <input 
             type="Date"
             id="date"
             name="date"            
             />
             <label htmlFor="CalorieInTakeGoal">Daily Calorie Goal: </label>
             <input 
             type="number"
             id="DailyInTake"
             name="DailyInTake"            
             />
             <label htmlFor="CalorieConsumed">Consumed Calories: </label>
             <input 
             type="number"
             id="consumed"
             name="consumed"            
             />
            <label htmlFor="Notes">Notes:</label>
             <input 
             type="text"
             id="note"
             name="note"            
             />

        <button type="submit">Submit</button>
        </form>
        </div>


    </main>
)
}

export default CalorieTrackerForm;