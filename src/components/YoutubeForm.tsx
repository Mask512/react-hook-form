import './styles.css';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const YoutubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit } = form;
  // const { name, ref, onChange, onBlur } = register('username');

  const onSubmit = (data: FormValues) => {
    console.log('form submitted', data);
  };

  renderCount++;
  return (
    <div className="youtube-form">
      <h1>Youtube Form {renderCount / 2}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
