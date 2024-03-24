import axios from 'axios';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function PhotosPage() {
  const { action } = useParams(); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
    setAddedPhotos(prev => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i])
    }
    axios.post('/upload', data, {
      headers: {'Content-Type':'multipart/form-data'}
    }).then(response => {
      const { data:filenames } = response;
      setAddedPhotos((prev) => {
        return [...prev, ...filenames];
      });
    })
  }
  
  return (
    <div>
      {action !== 'new' && (
        <div className='text-center'>
          <Link
            className='inline-flex bg-primary text-white py-2 px-6 rounded-full gap-1'
            to={'/account/photos/new'}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z'
                clipRule='evenodd'
              />
            </svg>
            Add new Post
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
            <h2 className='text-xl my-4'>Title</h2>
            <input
              type='text'
              placeholder='title'
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            <h2 className='text-xl my-4'>Description</h2>
            <textarea
              placeholder=' description'
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            <br></br>
            <h2 className='text-xl my-4'>Photos</h2>
            <div className='flex gap-2'>
              <input
                type='text'
                placeholder='Add using a link...jpg'
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />

              <button
                onClick={addPhotoByLink}
                className='bg-gray-200 px-4 rounded-2xl'
              >
                Add&nbsp;Photo
              </button>
            </div>
            <input type='file' className='hidden' />
            <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-6 text-2xl text-gray-600'>
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div className='h-32 flex'>
                    <img
                      className='rounded-2xl w-full object-cover'
                      src={'http://localhost:5000/uploads/' + link}
                      alt='uploaded'
                    />
                  </div>
                ))}
              <label className='h-32 flex items-center gap-1 border bg-transparent rounded-2xl p-10 cursor-pointer'>
                <input type='file' className='hidden' onChange={uploadPhoto} />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-10 h-10'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z'
                  />
                </svg>
                Upload
              </label>
            </div>
          </form>
          <button className='primary mt-3'>Save</button>
        </div>
      )}
    </div>
  );
}

export default PhotosPage
