const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/calorieTracker`

const index = async () => {
    try{
        const res = await fetch(BASE_URL, {
            headers :{ Authorization: `Bearer ${ localStorage.Storage.getIem('token')}`}
    });

    }catch (err) {
        console.log(err);

    }
}

const show = async (calorietrackerId) => {
    try{
        const res = await fetch(`${BASE_URL}/${calorietrackerId}`, {
            header : { Authorization: `Bearer ${locoalStorage.getItem('token')}`},
        });

    }catch(err) {
        console.log('Error fetching calorie tracker:', err)
        throw err;
    };
};

const create = async (calorietrackerFormData) => {
    try{
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
        throw new Error(`Failed to create calorie tracker. Status: ${res.status}, Message: ${console.errorDetails}`);
    };
    return res.json();
    } catch (err) {
        console.log('Error creating calorie tracker: , error')
    }
};

const deleteCalorieTracker = async(calorietrackerId) => {
    try {
        const res = await fetch(`${BASE_URL}/${calorietrackerId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
        if (!res.ok) {
            const errorDetails = await res.text();
            throw new Error(`Failed to delete tracker. Status:" ${res.status}, Message: ${errorDetails}`)
        }
        return res.json();

    }catch(err) {
        console.log('Error deleting the tracker:', err)
        throw err;
    }

}

const update = async ( calorietrackerId, calorietrackerFormData) => {
    try{ 
        const res = await fetch(`${BASE_URL}/${calorietrackerId}`, {
            method:'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'COntent-Type': 'applicaiton/json',
            },
            body: JSON.stringify(calorietrackerFormData),
            });
            if(!res.ok){
                const errorDetails = await res.text();
                throw new Error(`Failed to update tracker. Status: ${res.status}, Message: ${errorDetails} `)
            }
            return res.json()
    }catch (err) {

        console.log('Error updating the tracker:', err)
        throw err
    }
};
export {
    index,
    show,
    create,
    deleteCalorieTracker,
    update,
};
