const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/calorieTracker`;

const addCalorieTracker = async (calorietrackerFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(calorietrackerFormData),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to create calorie tracker. Status: ${res.status}, Message: ${errorDetails}`);
        }
        return res.json();
    } catch (err) {
        console.log('Error creating calorie tracker:', err);
        throw err;
    }
};

const updateCalorieTracker = async (calorietrackerId, calorietrackerFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${calorietrackerId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(calorietrackerFormData),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to update tracker. Status: ${res.status}, Message: ${errorDetails}`);
        }
        return res.json();
    } catch (err) {
        console.log('Error updating the tracker:', err);
        throw err;
    }
};

const getCalorieTrackerById = async (calorietrackerId) => {
    try {
        const res = await fetch(`${BASE_URL}/${calorietrackerId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to fetch tracker. Status: ${res.status}, Message: ${errorDetails}`);
        }
        return res.json();
    } catch (err) {
        console.log('Error fetching calorie tracker:', err);
        throw err;
    }
};

const deleteCalorieTracker = async (calorietrackerId) => {
    try {
        const res = await fetch(`${BASE_URL}/${calorietrackerId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to delete tracker. Status: ${res.status}, Message: ${errorDetails}`);
        }
        return res.json();
    } catch (err) {
        console.log('Error deleting the tracker:', err);
        throw err;
    }
};

export {
    addCalorieTracker,
    updateCalorieTracker,
    getCalorieTrackerById,
    deleteCalorieTracker,
};
