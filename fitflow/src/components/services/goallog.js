const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/goal`;

const addGoalLog = async (goalLogFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(goalLogFormData),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to create goal log. Status: ${res.status}, Message: ${errorDetails}`);
        }
        return res.json();
    } catch (err) {
        console.log('Error creating goal log:', err);
        throw err;
    }
};

const updateGoalLog = async (goallogId, goalLogFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${goallogId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(goalLogFormData),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to update log. Status: ${res.status}, Message: ${errorDetails}`);
        }
        return res.json();
    } catch (err) {
        console.log('Error updating the log:', err);
        throw err;
    }
};

const getGoalLogById = async (goallogId) => {
    try {
        const res = await fetch(`${BASE_URL}/${goallogId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to fetch log. Status: ${res.status}, Message: ${errorDetails}`);
        }
        return res.json();
    } catch (err) {
        console.log('Error fetching goal log:', err);
        throw err;
    }
};

const deleteGoalLog = async (goallogId) => {
    try {
        const res = await fetch(`${BASE_URL}/${goallogId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to delete log. Status: ${res.status}, Message: ${errorDetails}`);
        }
        return res.json();
    } catch (err) {
        console.log('Error deleting the log:', err);
        throw err;
    }
};

export {
    addGoalLog,
    updateGoalLog,
    getGoalLogById,
    deleteGoalLog,
};
