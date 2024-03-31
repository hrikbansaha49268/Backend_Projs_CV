import Quotes from '@/components/Quotes';

const Home = () => {
  return (
    <div className='text-blue-800'>
      <h1 className="text-5xl my-12 w-3/4 mx-auto font-bold italic">
        All the popular quotes
      </h1>
      <Quotes />
      <div className='text-center my-12'>
        <h1 className="text-3xl mb-6 font-semibold">
          Want to publish yours?
        </h1>
        <a href='/register'
          className='cursor-pointer border text-blue-50 border-blue-600 px-3 py-2 rounded-lg transition-all duration-200 bg-blue-600'>
          Create an accout to start
        </a>
      </div>
    </div>
  );
};

export default Home;