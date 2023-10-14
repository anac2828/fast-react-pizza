import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  // This component has access to the error from the App.jsx "errorElement"
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton to='-1'>&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
