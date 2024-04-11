import './styles.css';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: string[];
};

export const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: 'Batman',
      email: 'asd@gmail.com',
      channel: '@mask512',
      social: {
        facebook: '',
        twitter: '',
      },
      phoneNumbers: ['', ''],
    },
  });
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
        <label htmlFor="facebook">Facebook</label>
        <input type="text" id="facebook" {...register('social.facebook')} />
        <label htmlFor="twitter">Twitter</label>
        <input type="text" id="twitter" {...register('social.twitter')} />

        <label htmlFor="primary-phone">Primary Phone Number</label>
        <input
          type="text"
          id="primary-phone"
          {...register('phoneNumbers.0', {
            pattern: {
              value: /\d+/,
              message: 'Only input number',
            },
          })}
        />
        
        {errors.phoneNumbers && errors.phoneNumbers[0] && (
          <p>{errors.phoneNumbers[0].message}</p>
        )}

        <label htmlFor="secondary-phone">Secondary Phone Number</label>
        <input
          type="text"
          id="secondary-phone"
          {...register('phoneNumbers.1')}
        />
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
