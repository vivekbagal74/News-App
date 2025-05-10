import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'

function NewsDesc() {
  const [loading, setLoading] = useState(false)
  const [newsItem, setNewsItem] = useState(null)
  const params = useParams()

  const getData = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`http://localhost:8000/api/newsitems/getnewsitembyid/${params.newsid}`, { "_id": params.newsid.toString() });
      setNewsItem(result.data)
      console.log(newsItem)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-x-8 gap-y-4 mx-30 p-5 h-full sm:mx-5 my-5">
          <div className='shadow-md p-3 border cursor-pointer'>
            <h1 className="text-primary text-4xl font-semibold max-w-prose">
              {newsItem && newsItem.title}
            </h1>
            <br />
            <p className='text-2xl mr-5 max-w-prose'>{newsItem && newsItem.description}</p>
            <br />
            <p className="text-1xl max-w-prose">{newsItem && newsItem.content}</p>
            <br />
            <div className="flex justify-end flex-col items-end text-3xl">
              <span className="text-gray-500 text-sm">
                Posted By: {newsItem && newsItem.postedByemail}
              </span>
              <span className="text-gray-500  text-sm">
                {/* On : {newsItem.createdAt.slice(0, 10)} */}
              </span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default NewsDesc
