import { useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch from './utils';
import { MdClose } from 'react-icons/md';
import { FaBasketShopping } from 'react-icons/fa6';
import { BsCheck2All } from 'react-icons/bs';
import { PiShieldCheckBold } from 'react-icons/pi';

const SingleItem = ({ item }) => {
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
  return (
    <div className='single-item'>
      {item.isDone && (
        <label
          htmlFor={item.id}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <PiShieldCheckBold
            style={{
              display: 'inline',
              fontSize: '18px',
              border: '1px solid var(--primary-600)',
              borderRadius: '2px',
              padding: '2px',
              color: 'var(--white)',
              background: 'var(--primary-600)',
              transform: 'scale(1.1)',
            }}
          />
        </label>
      )}
      <input
        type='checkbox'
        id={item.id}
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
        style={{ display: item.isDone && 'none' }}
      />
      <p
        style={{
          fontVariant: 'all-small-caps',
          textDecoration: item.isDone && 'line-through',
          color: item.isDone && 'var(--grey-300)',
          textDecorationThickness: '1px',
        }}
      >
        {item.title}
      </p>
      <button
        className='close-button'
        type='button'
        onClick={() => deleteTask({ taskId: item.id })}
      >
        <MdClose />
      </button>
    </div>
  );
};
export default SingleItem;
