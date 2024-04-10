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
  const { register, control, handleSubmit, formState } = form;
  // const { name, ref, onChange, onBlur } = register('username');

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log('form submitted', data);
  };

  renderCount++;
  return (
    <div className="youtube-form">
      <h1>Youtube Form {renderCount / 2}</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          // name={name}
          // ref={ref}
          // onChange={onChange}
          // onBlur={onBlur}
          {...register('username', {
            required: 'username is required',
          })}
        />
        <p>{errors.username?.message}</p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            pattern: {
              value: /^[a-z]/,
              message: 'Invalid email format',
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== 'admin@example.com' ||
                  'This email is not allowed'
                );
              },
              blacklistedDomain: (fieldValue) => {
                return (
                  !fieldValue.endsWith('baddomain.com') ||
                  'This domain is not allowed'
                );
              },
            },
          })}
        />
        <p>{errors.email?.message}</p>
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register('channel', {
            required: {
              value: true,
              message: 'Channel is required',
            },
          })}
        />
        <p>{errors.channel?.message}</p>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
