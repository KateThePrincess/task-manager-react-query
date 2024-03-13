import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import customFetch from './utils';
import { toast } from 'react-toastify';
import { VscError } from 'react-icons/vsc';
import { BsCheck2Circle } from 'react-icons/bs';

const Form = () => {
  const [newItemName, setNewItemName] = useState('');
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post('/', { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task added', {
        icon: (
          <BsCheck2Circle
            style={{ color: 'var(--primary-600)', fontSize: '20px' }}
          />
        ),
        style: {
          color: `black`,
          fontFamily: 'Comfortaa, sans-serif',
          textTransform: 'capitalize',
          fontSize: '13px',
        },
        closeButtonStyle: { color: 'var(--primary-600)' },
      });
      setNewItemName('');
    },
    onError: (error) => {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg, {
        icon: (
          <VscError style={{ color: 'var(--primary-600)', fontSize: '20px' }} />
        ),
        style: {
          color: `black`,
          fontFamily: 'Comfortaa, sans-serif',
          textTransform: 'capitalize',
          fontSize: '13px',
        },
        closeButtonStyle: { color: 'var(--primary-600)' },
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newItemName);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task manager</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type='submit' className='btn' disabled={isLoading}>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
