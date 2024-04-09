import './styles.css';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools'

export const YoutubeForm = () => {
  const form = useForm();
  const { register, control } = form;

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
        <input type="text" id="channel" {...register('channel')} />
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};