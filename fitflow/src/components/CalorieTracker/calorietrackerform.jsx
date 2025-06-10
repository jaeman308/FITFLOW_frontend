import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as calorietrackerservices from '../services/calorietracker';

const CalorieTrackerForm = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        date: '',
        dailyIntake: '',
        consumed: '',
        burned: '',
        note: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            const fetchData = async () => {
                try {
                    const data = await calorietrackerservices.getCalorieTrackerById(id);
                    setFormData({
                        date: data.date?.slice(0,10) || '',
                        dailyIntake: data.calorie_intake_goal || '',
                        consumed: data.calorie_consumed || '',
                        burned: data.calorie_burned || '',
                        note: data.notes || ''
                    });
                } catch (err) {
                    setError('Failed to load entry.');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

    
        if (!formData.date || !formData.dailyIntake) {
            setError('Date and Daily Calorie Goal are required.');
            setIsSubmitting(false);
            return;
        }

        const payload = {
            date: formData.date,
            calorie_intake_goal: parseInt(formData.dailyIntake),
        };

        if (formData.consumed) payload.calorie_consumed = parseInt(formData.consumed);
        if (formData.burned) payload.calorie_burned = parseInt(formData.burned);
        if (formData.note && formData.note.trim() !== "") payload.notes = formData.note;

        try {
            if (id) {
                await calorietrackerservices.updateCalorieTracker(id, payload);
                setSuccess('Entry updated successfully!');
            } else {
                await calorietrackerservices.addCalorieTracker(payload);
                setSuccess('Entry added successfully!');
            }
            setFormData({
                date: '',
                dailyIntake: '',
                consumed: '',
                burned: '',
                note: ''
            });
        } catch (error) {
            console.error('Error submitting calorie tracker:', error);
            setError('Error submitting calorie tracker.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <main>
            <h1>Let’s start Tracking</h1>
            <div>
                {error && <div style={{color: 'red'}}>{error}</div>}
                {success && <div style={{color: 'green'}}>{success}</div>}
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <h1>Calorie Tracker</h1>
                    <label htmlFor="date">Date: </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    <label htmlFor="dailyIntake">Daily Calorie Goal: </label>
                    <input
                        type="number"
                        id="dailyIntake"
                        name="dailyIntake"
                        value={formData.dailyIntake}
                        onChange={handleChange}
                    />
                    <label htmlFor="consumed">Consumed Calories: </label>
                    <input
                        type="number"
                        id="consumed"
                        name="consumed"
                        value={formData.consumed}
                        onChange={handleChange}
                    />
                    <label htmlFor="burned">Burned Calories: </label>
                    <input
                        type="number"
                        id="burned"
                        name="burned"
                        value={formData.burned}
                        onChange={handleChange}
                    />
                    <label htmlFor="note">Notes:</label>
                    <input
                        type="text"
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting' : 'Submit'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default CalorieTrackerForm;