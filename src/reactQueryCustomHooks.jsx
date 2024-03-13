import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import customFetch from './utils';
import { toast } from 'react-toastify';
import { VscError } from 'react-icons/vsc';
import { BsCheck2Circle } from 'react-icons/bs';
import { useState } from 'react';

export const useFetchTasks = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await customFetch.get('/');
      return data;
    },
  });

  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone: isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutate: deleteTask } = useMutation({
    mutationFn: ({ taskId }) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    isLoading,
    isError,
    data,
    editTask,
    deleteTask,
  };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const [newItemName, setNewItemName] = useState('');
  const { mutate: createTask } = useMutation({
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

  return { createTask, newItemName, setNewItemName };
};
