import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';



const HabitTrackerForm = ({handleAddCalorietracker, handleupdateCalorietracker, isSubmitting}) => {
    const [formData, setFormData] = useState ({

    })


return (
    <main>
        <h1>Lets start Tracking</h1>
        <form autoComplete='off' >
             <h1> Habit Tracker</h1>
             <label htmlFor=""></label>
             <input 
             type=""
             id=""
             name=""            
             />
             <label htmlFor=""></label>
             <input 
             type=""
             id=""
             name=""            
             />
            <label htmlFor=""></label>
             <input 
             type=""
             id=""
             name=""            
             />



        </form>


    </main>
)
}

export default HabitTrackerForm;