import { useForm } from 'react-hook-form';
import './styles.css';

export const YoutubeForm = () => {
  const form = useForm();
  const { register } = form;

  // const { name, ref, onChange, onBlur } = register('username');

  return (
    <div className="youtube-form">
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          // name={name}
          // ref={ref}
          // onChange={onChange}
          // onBlur={onBlur}
          {...register('username')}
        />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} />
        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register('username')} />
        <button>Submit</button>
      </form>
    </div>
  );
};
