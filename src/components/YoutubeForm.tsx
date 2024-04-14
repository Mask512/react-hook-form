import './styles.css';
import { FormValues } from './types';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';

let renderCount = 0;

const defaultValues = {
  username: 'Batman',
  email: 'asd@gmail.com',
  channel: '@mask512',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [
    {
      number: '',
    },
  ],
  age: 2,
  dob: new Date(),
};

export const YoutubeForm = () => {
  /** init useForm hook & default values */
  const form = useForm<FormValues>({ defaultValues,
    mode: 'onBlur'
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form;

  // const { name, ref, onChange, onBlur } = register('username'); // registering form

  /** dynamic fields */
  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });

  /** form state */
  const {
    errors,
    //  dirtyFields,
    //  touchedFields,
    // isDirty,
    isSubmitting,
    // isSubmitted,
    // submitCount,
    isSubmitSuccessful,
  } = formState;

  // console.log({
  //   isSubmitting, // when submitting true , after submit false again
  //   isSubmitted, // after submitting whether success or not
  //   submitCount,
  //   isSubmitSuccessful,
  // });

  const onSubmit = (data: FormValues) => {
    console.log('form submitted', data);
  };

  const watchUsername = watch('username');
  // const watchUsername = watch(['username', 'email'])

  /** Get values */
  const handleGetValue = () => {
    // console.log('Get Values :', getValues()); // all values
    console.log('Get Values :', getValues('username')); // get specific value
  };

  /** Set values */
  const handleSetValue = () => {
    // setValue('username', 'BruceWyn');
    setValue('username', 'BruceWyn', {
      shouldDirty: true, // dirty state = is field modified or not
      shouldTouch: true, // touch state = is field have been interacted or not
    });
  };

  // reset field

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  renderCount++;

  return (
    <div className="youtube-form">
      <h1>Youtube Form {renderCount / 2}</h1>
      <h2>Watched value: {watchUsername}</h2>{' '}
      {/* watch fields trigger re render */}
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
              emailAvailable: async (fieldValue) => {
                const response = await fetch(
                  `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`,
                );
                const data = await response.json();
                return data.length == 0 || 'Email already exist';
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
        <input
          type="text"
          id="facebook"
          {...register('social.facebook', {
            disabled: watch('channel') === '',
            required: 'Enter facebook id',
          })}
        />
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
        <div>
          <label>List of phone Numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove phone numbers
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: '' })}>
              Add phone numbers
            </button>
          </div>
        </div>

        <label htmlFor="age">Age</label>
        <input
          type="text"
          id="age"
          {...register('age', {
            valueAsNumber: true, // parse to number
            required: {
              value: true,
              message: 'Age is required',
            },
          })}
        />
        <p>{errors.age?.message}</p>

        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          {...register('dob', {
            valueAsDate: true, // parse to number
            required: {
              value: true,
              message: 'Age is required',
            },
          })}
        />
        <p>{errors.dob?.message}</p>

        <button disabled={isSubmitting}>Submit</button>
        <button onClick={handleGetValue} type="button">
          Get Value
        </button>
        <button onClick={handleSetValue} type="button">
          Set Value
        </button>
        <button onClick={() => reset()} type="button">
          Reset
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
