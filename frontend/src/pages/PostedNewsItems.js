import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const PostedNewsItems = () => {
  const [loading, setLoading] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [toastCount, setToastCount] = useState(0);
  const navigate = useNavigate()

  const deleteNewsItem = async (id) => {
    try {
      setLoading(true);
      console.log(id)
      await axios.delete(`http://localhost:8000/api/newsitems/deletenews/${id}`);
      toast('News Deleted Successfully');
      setNewsItems(newsItems.filter(item => item._id !== id));
    } catch (error) {
      toast('Error deleting news item...');
      toast('Try Again Later...');
    } finally {
      setLoading(false);
      setToastCount(0);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = localStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);

          const response = await axios.post(
            `http://localhost:8000/api/newsitems/getnewsitemsbyemail/${userData.email}`,
            { "email": userData.email }
          );
          setNewsItems(response.data);
        }
      } catch (error) {
        console.log('Error Fetching Posted News items:', error);
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
        <div>
          {newsItems.length === 0 ? (
            <div className="flex flex-col min-h-full gap-5 mx-20 sm:mx-5 my-5">
              <h1 className='text-primary text-lg font-semibold'>No posted news available</h1>
              <div>

                <button className="px-5 py-1 w-min-max bg-green-500 text-sm text-white"
                  onClick={() => navigate('/add')}>
                  ADD A NEWS
                </button>
              </div>
            </div>

          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-5 mx-20 sm:mx-5 my-5">
              {newsItems.map((item) => {
                return (
                  <div
                    className="shadow-md p-3 border cursor-pointer"
                    key={item._id}
                  >
                    <h1 className="text-primary text-lg font-semibold"
                      onClick={() => navigate(`/newsdesc/${item._id}`)}
                    >
                      {item.title}
                    </h1>
                    <p>{item.description}</p>
                    <div className="flex justify-end flex-col items-end">
                      <span className="text-gray-500 text-sm">
                        Posted By : {item.postedByemail}
                      </span>
                      <span className="text-gray-500  text-sm">
                        On : {item.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className="flex justify-end space-x-5 pr-5 mt-5">
                      <button
                        className="px-5 py-1 bg-green-500 text-sm text-white"
                        onMouseOver={() => {
                          setToastCount(toastCount + 1);
                          if (toastCount <= 1) {
                            toast('Double Click to Edit News..');
                          }
                        }}
                        onDoubleClick={() => navigate(`/editnews/${item._id}`)}
                      >
                        EDIT
                      </button>
                      <button
                        className="px-5 py-1 bg-green-500 text-sm text-white"
                        onMouseOver={() => {
                          setToastCount(toastCount + 1);
                          if (toastCount <= 1) {
                            toast('Double Click to Delete News..');
                          }
                        }}
                        onDoubleClick={() => deleteNewsItem(item._id)}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )
      }
    </Layout >
  );
};

export default PostedNewsItems;
