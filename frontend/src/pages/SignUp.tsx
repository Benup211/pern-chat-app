import React from 'react'
import GenderCheckBox from '../components/GenderCheckBox';

const SignUp = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto p-4 sm:p-0'>
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-800 backdrop-filter backdrop-blur-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-200">
                    SignUp
                    <span className='text-blue-500'> ChatApp</span>
                </h1>
                <form>
                    <div>
                        <label className='label'>
                            <span className="text-base label-text">Fullname</span>
                        </label>
                        <input type="text" className="w-full input input-bordered h-10" placeholder='John Doe' />
                    </div>
                    <div>
                        <label className='label'>
                            <span className="text-base label-text">username</span>
                        </label>
                        <input type="text" className="w-full input input-bordered h-10" placeholder='john211' />
                    </div>
                    <div>
                        <label className='label'>
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password" className="w-full input input-bordered h-10" placeholder='Enter password' />
                    </div>
                    <div>
                        <label className='label'>
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input type="password" className="w-full input input-bordered h-10" placeholder='Confirm Password' />
                    </div>
                    <div>
                    <GenderCheckBox/>
                    </div>
                    <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account?</a>
                    <div>
                        <button className='btn btn-block btn-sm mt-2' type='submit'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
      )
}

export default SignUp