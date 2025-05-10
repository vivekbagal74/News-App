import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(true)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Function to validate email address
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Function to handle form submission
  const login = async () => {
    setLoading(true);
    try {
      // Basic form validation
      if (!email || !password) {
        toast('Please enter both email and password')
        setLoading(false);
        return;
      }

      const payload = {
        email,
        password,
      };

      const response = await axios.post('http://localhost:8000/api/users/login', payload);
      const user = response.data;

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        toast('Login successful');
        navigate('/home');
      } else {
        toast('Invalid email or password');
      }
    } catch (error) {
      toast('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission

  const register = async () => {
    setLoading(true);
    try {
      // Basic form validation
      if (!name || !email || !password) {
        toast('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Validate email
      if (!validateEmail(email)) {
        toast('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Check password length
      if (password.length < 8) {
        toast('Password must be at least 8 characters long');
        setLoading(false);
        return;
      }

      const payload = {
        name,
        email,
        password
      };

      const response = await axios.post('http://localhost:8000/api/users/register', payload);

      if (response.data === "User added successfully") {
        toast('Registration successful, Please login');
        setName('');
        setEmail('');
        setPassword('');
        setLoading(false);
        setShowRegisterForm(false);
        setShowLoginForm(true);
      }
      else {
        toast('User with this email already exists');
        setLoading(false);
      }

    } catch (error) {
      toast('Something went wrong...');
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center sm:flex-col">
      {loading && <Spinner />}
      <div className={`w-1/2 px-10 space-y-5 sm:w-screen `}>
        <h2>
          <b className="text-[#000000] text-4xl">Welcome to the</b>
        </h2>
        <h1>
          <b className="text-[#2B8F74] text-8xl">News</b>
          <b className="text-8xl text-gray-700">App</b>
        </h1>

        <p className="text-lg">
          The News App is your go-to platform for staying updated with the latest news and developments. With a user-friendly interface, it provides easy access to a wide range of news articles, ensuring you're always in the know. Whether it's breaking news, sports updates, or entertainment buzz, the News App has you covered. Join us today and never miss a headline!
        </p>
        <div className="space-x-5">
          <button
            className="bg-gray-300 px-10 py-3"
            onClick={() => {
              setShowRegisterForm(false)
              setShowLoginForm(true)
            }}
          >
            LOGIN
          </button>
          <button
            className="bg-[#2B8F74] px-10 py-3 text-white"
            onClick={() => {
              setShowLoginForm(false)
              setShowRegisterForm(true)
            }}
          >
            REGISTER
          </button>
        </div>
      </div>
      <div className="w-1/2 sm:w-screen">
        {showLoginForm && (
          <div className="ml-40 sm:ml-0">
            <div className="flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5">
              <h1 className="text-6xl text-gray-500 text-left w-full font-semibold my-5">
                LOGIN
              </h1>

              <input
                type="email"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-500"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-500"
                required
              />
              <div className="flex justify-end w-full">
                <button
                  className="bg-gray-400 px-10 py-3 text-black"
                  onClick={login}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        )}
        {showRegisterForm && (
          <div className="ml-40 sm:ml-0">
            <div className="flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5">
              <h1 className="text-6xl text-gray-500 text-left w-full font-semibold my-5">
                REGISTER
              </h1>
              <input
                type="text"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-500"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-500"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-500"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-end w-full">
                <button
                  className="bg-gray-400 px-10 py-3 text-black"
                  onClick={register}
                >
                  REGISTER
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {(showLoginForm || showRegisterForm) && (
        <AiOutlineClose
          className="absolute top-5 right-5 z-10 cursor-pointer hover:bg-gray-100 hover:rounded-full hover:p-2 hover:text-white"
          size={30}
          color="gray"
          onClick={() => {
            setShowLoginForm(false)
            setShowRegisterForm(false)
          }}
        />
      )}
    </div>
  )
}

export default LandingPage
