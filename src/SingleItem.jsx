import { MdClose } from 'react-icons/md';
import { PiShieldCheckBold } from 'react-icons/pi';
import { useFetchTasks } from './reactQueryCustomHooks';

const SingleItem = ({ item }) => {
  const { editTask, deleteTask } = useFetchTasks();
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
