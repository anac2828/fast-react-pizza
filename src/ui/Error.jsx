import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  // This component has access to the error from the App.jsx "errorElement"
  const error = useRouteError();

  return (
    <div className='grid gap-1 text-center place-content-center mt-9'>
      <h1 className='text-3xl'>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton to='-1'>&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
