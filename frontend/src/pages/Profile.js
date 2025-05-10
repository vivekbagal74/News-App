import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import profileImg from './images/profile.png'

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = await localStorage.getItem('user');
        setUserData(JSON.parse(user));

      } catch (error) {
        console.error('Error fetching user Details :', error);

      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div class="flex flex-col items-center bg-[#145c2aaf] text-yellow-200 font-bold border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
          <img class="object-cover rounded-t-lg md:d:rounded-none md:rounded-s-lg"
            src={profileImg}
            alt="User Profile" />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-white-900 dark:text-white">
              {userData ? `Name: ${userData.name}` : ("User Details not available Found")}
            </h5>
            <p class="mb-3 font-normal text-white">
              {userData ? `Email: ${userData.email}` : (" ")}
            </p>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Profile