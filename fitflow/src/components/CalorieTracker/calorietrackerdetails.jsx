import { AuthedUserContext } from "../../App";
import {useState, useEffect, useContext} from 'react';
import CalorieTrackerForm from '../../components/CalorieTracker/calorietrackerform';
import * as calorietrackerservices from '../../components/services/calorietracker';

const CalorieTrackerDetails = () => {
      const [isSubmitting, setIsSubmitting] = useState(false);
    
      const handleAddCalorietracker = async (payload) => {
        setIsSubmitting(true);
        try {
          await calorietrackerservices.createCalorieTracker(payload);
        } catch (error) {
          console.error('Error adding tracker:', error);
        } finally {
          setIsSubmitting(false);
        }
      };
    
      const handleupdateCalorietracker = async (id, payload) => {
        setIsSubmitting(true);
        try {
          await calorietrackerservices.updateCalorieTracker(id, payload);
        } catch (error) {
          console.error('Error updating tracker:', error);
        } finally {
          setIsSubmitting(false);
        }
      };
    
      return (
        <CalorieTrackerForm
          handleAddCalorietracker={handleAddCalorietracker}
          handleupdateCalorietracker={handleupdateCalorietracker}
          isSubmitting={isSubmitting}
        />
      );
    };
    
    export default CalorieTrackerDetails;
    

