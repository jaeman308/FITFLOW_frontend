import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as goallogservices from '../services/goallog';

const LENGTH_OPTIONS = ['weekly', 'monthly', 'yearly'];
const PROGRESS_OPTIONS = ['Not Started', 'In Progress', 'Complete'];


const initialFormData = {
  title: '',
  description: '',
  length: LENGTH_OPTIONS[0],      
  progress: PROGRESS_OPTIONS[0],  
  notes: '',
  start_date: '',
  finish_date: '',
};

const GoalForm = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const data = await goallogservices.getGoalLogById(id);
          setFormData({
            title: data.title || '',
            description: data.description || '',
            length: data.length || '',
            progress: data.progress || '',
            notes: data.notes || '',
            finishDate: data.finishDate ? data.finishDate.slice(0, 10) : '',
          });
        } catch (err) {
          setError('Failed to load entry.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    } else {
      setFormData(initialFormData);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

   
    const payload = {
      ...formData,
      length: formData.length, 
      progress: formData.progress,
      notes: formData.notes,
      finishDate: formData.finishDate,
    };

    try {
      if (id) {
        await goallogservices.updateGoalLog(id, payload);
        setSuccess('Entry updated successfully!');
      } else {
        await goallogservices.addGoalLog(payload);
        setSuccess('Entry added successfully!');
      }
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting goal log:', error);
      setError('Error submitting goal log.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <h1>Start Goal Setting</h1>
      <div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Goal Tracker</h2>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label htmlFor="length">Length:</label>
            <select
            id="length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            >
            {LENGTH_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
            </select>

            <label htmlFor="progress">Progress:</label>
            <select
            id="progress"
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            >
            {PROGRESS_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
            </select>
          <label htmlFor="notes">Notes:</label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            id="start__date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
          />
          <label htmlFor="finishDate">Finish Date:</label>
          <input
            type="date"
            id="finish_date"
            name="finish_date"
            value={formData.finish_date}
            onChange={handleChange}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default GoalForm;
