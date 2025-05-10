import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { base_url } from '../config/config';

const EditNews = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchNewsItem = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${base_url}/newsitems/getnewsitembyid/${params.newsid}`);
        const newsItem = response.data;
        setTitle(newsItem.title);
        setDescription(newsItem.description);
        setContent(newsItem.content);
      } catch (error) {
        console.error(error);
        toast('Error fetching news item', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, []);

  const update = async () => {
    setLoading(true);

    try {
      if (!user || !user.email) {
        throw new Error('User data not found');
      }

      const payload = {
        title,
        description,
        content
      };

      await axios.put(`${base_url}/newsitems/editnews/${params.newsid}`, payload);
      setLoading(false);
      toast('News updated successfully', 'success');
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast('Something went wrong', 'error');
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <h1 className="text-2xl font-semibold mt-5 ml-5">Edit News</h1>
      <div className="px-5 pt-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="border-2 h-10 w-full border-gray-300 px-5 mb-2"
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 w-full border-gray-300 px-5 "
          rows="4"
          placeholder="Description"
        ></textarea>
      </div>
      <div className="border-2 border-gray-300 mx-5 rounded px-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border-2 w-full border-gray-300 px-5 "
          rows="6"
          placeholder="Content"
        ></textarea>
      </div>
      <div className="flex justify-end space-x-5 pr-5 mt-5">
        <button className="px-5 py-1 bg-red-700 text-sm text-white" onClick={() => navigate('/posted')}>
          BACK
        </button>
        <button className="px-5 py-1 bg-green-500 text-sm text-white" onClick={update}>
          UPDATE
        </button>
      </div>
    </Layout>
  );
};

export default EditNews;
