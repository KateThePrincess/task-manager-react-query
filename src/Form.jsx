import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import customFetch from './utils';
import { toast } from 'react-toastify';
import { VscError } from 'react-icons/vsc';
import { BsCheck2Circle } from 'react-icons/bs';
import { useFetchTasks, useCreateTask } from './reactQueryCustomHooks';

const Form = () => {
  const { createTask, setNewItemName, newItemName } = useCreateTask();
  const { isLoading } = useFetchTasks();

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
