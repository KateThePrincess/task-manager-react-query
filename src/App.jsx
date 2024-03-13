import { ToastContainer } from 'react-toastify';
import Form from './Form';
import Items from './Items';
import { useEffect } from 'react';
import customFetch from './utils';

const App = () => {
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await customFetch.get('/');
        setItems(data.taskList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <section className='section-center'>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Form />
      <Items />
    </section>
  );
};
export default App;
