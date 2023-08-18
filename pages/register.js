import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

export default function Register() {
  const formikRef = useRef();
  const [img, setImg] = useState();
  const [values, setValues] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required('FirstName is required'),
    lastName: Yup.string().trim().required('LastName is required'),
    phoneNumber: Yup.string()
      .trim()
      .required('Phone Number is required')
      .min(11, 'Phone Number is less than 11 digits')
      .max(11, 'Phone Number is more than 11 digits'),
    email: Yup.string()
      .trim()
      .required('Email is required')
      .email('Fill in a valid email'),
    passport: Yup.string().trim().required('Passport is required'),
    password: Yup.string().trim().required('Password is required'),
  });

  const convertToBase64 = (file, values) => {
    const imageReader = new FileReader();
    imageReader.readAsDataURL(file);
    imageReader.onload = () => {
      setImg(imageReader.result);
      toast.success(
        `${values.lastName} ${values.firstName}, thanks for registering. Below are your details.`,
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      );
    };

    imageReader.onerror = (error) => {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    };
  };

  if (img) {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <Layout title="Register">
      <div className="max-w-6xl mx-auto px-8 my-10 register">
        {img ? (
          <>
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <div>
                <h1 className="mb-4 text-2xl font-bold">Details</h1>
                <>
                  <div className="w-full relative pt-[100%]">
                    <Image
                      src={img}
                      alt="profile"
                      objectFit="cover"
                      fill
                      className="w-full h-full top-0 left-0 object-cover rounded-2xl"
                    />
                  </div>
                  <div className="my-4">
                    <h6 className="text-lg">Last Name</h6>
                    <p className="font-thin">
                      {values.lastName.charAt(0).toUpperCase() +
                        values.lastName.slice(1)}{' '}
                    </p>
                  </div>
                  <div className="my-4">
                    <h6 className="text-lg">First Name</h6>
                    <p className="font-thin">
                      {values.firstName.charAt(0).toUpperCase() +
                        values.firstName.slice(1)}{' '}
                    </p>
                  </div>
                  <div className="my-4">
                    <h6 className="text-lg">Phone Number</h6>
                    <p className="font-thin">{values.phoneNumber}</p>
                  </div>
                  <div className="my-4">
                    <h6 className="text-lg">Email</h6>
                    <p className="font-thin">{values.email}</p>
                  </div>
                  <button
                    type="submit"
                    className="border-black text-white hover:bg-black px-3 py-2 rounded-md bg-zinc-900 text-base font-medium"
                    onClick={() => {
                      setImg();
                      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}
                  >
                    Clear
                  </button>
                </>
              </div>
            )}
          </>
        ) : (
          <form className="shadow-md bg-gray-50 rounded-md p-7 my-10">
            <h1 className="mb-4 text-2xl font-bold">Register</h1>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                passport: '',
                password: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                setValues(values);
                const base64 = convertToBase64(values.passport, values);
                setSubmitting(false);
              }}
              validationSchema={validationSchema}
              innerRef={formikRef}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
                handleBlur,
                setFieldValue,
              }) => (
                <>
                  <div className="mb-4">
                    <input
                      name="firstName"
                      className="w-full mt-4 py-2 pl-2 text-gray-700"
                      type="text"
                      placeholder="First Name"
                      value={values.firstName}
                      onChange={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                    />
                    {errors.firstName && touched.firstName ? (
                      <p style={{ color: 'red' }}>{errors.firstName}</p>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <input
                      name="lastName"
                      className="w-full mt-4 py-2 pl-2 text-gray-700"
                      type="text"
                      placeholder="Last Name"
                      value={values.lastName}
                      onChange={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                    />
                    {errors.lastName && touched.lastName ? (
                      <p style={{ color: 'red' }}>{errors.lastName}</p>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <input
                      name="phoneNumber"
                      className="w-full mt-4 py-2 pl-2 text-gray-700"
                      type="tel"
                      placeholder="Phone Number"
                      value={values.phoneNumber}
                      onChange={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <p style={{ color: 'red' }}>{errors.phoneNumber}</p>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <input
                      name="email"
                      className="w-full mt-4 py-2 pl-2 text-gray-700"
                      type="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                    {errors.email && touched.email ? (
                      <p style={{ color: 'red' }}>{errors.email}</p>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="passport">Upload your passport:</label>
                    <br />
                    <input
                      className="w-full mt-4 py-2 pl-2 text-gray-700"
                      type="file"
                      name="passport"
                      accept="image/*"
                      onChange={(event) => {
                        setFieldValue('passport', event.target.files[0]);
                      }}
                    />
                    {errors.passport && touched.passport ? (
                      <p style={{ color: 'red' }}>{errors.passport}</p>
                    ) : null}
                  </div>

                  <div className="mb-10">
                    <input
                      name="password"
                      className="w-full mt-4 py-2 pl-2 text-gray-700"
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                    {errors.password && touched.password ? (
                      <p style={{ color: 'red' }}>{errors.password}</p>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="border-black text-white hover:bg-black px-3 py-2 rounded-md bg-zinc-900 text-base font-medium"
                    onClick={handleSubmit}
                    disabled={!isValid}
                  >
                    Submit
                  </button>
                </>
              )}
            </Formik>
          </form>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Layout>
  );
}
