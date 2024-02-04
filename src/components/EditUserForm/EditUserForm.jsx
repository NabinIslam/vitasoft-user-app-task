'use client';

import styles from '@/components/CreateUserForm/CreateForm.module.css';
import { useForm } from 'react-hook-form';
import Dropzone from 'react-dropzone';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import toast from 'react-hot-toast';
import axios from 'axios';
import Image from 'next/image';

const EditUserForm = ({ id }) => {
  const { handleSubmit, reset, register } = useForm();
  const [profilePicture, setProfilePicture] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(null);

  const CKEditor = dynamic(
    () => {
      return import('@ckeditor/ckeditor5-react');
    },
    { ssr: false }
  );
  const ClassicEditor = dynamic(
    () => {
      return import('@ckeditor/ckeditor5-build-classic');
    },
    { ssr: false }
  );

  useEffect(() => {
    axios
      .get(`https://tasks.vitasoftsolutions.com/userdata/${id}/`)
      .then(res => setUser(res.data));
  }, []);

  const onDrop = acceptedFiles => setProfilePicture(acceptedFiles[0]);

  const handleCreateUser = data => {
    const inputDate = new Date(startDate);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const activeStatus = data.status === 'active' ? true : false;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('profile_picture', profilePicture);
    formData.append('description', description);
    formData.append('birthdate', formattedDate);
    formData.append('active_status', activeStatus);

    axios
      .put(`https://tasks.vitasoftsolutions.com/userdata/${id}/`, formData)
      .then(res => {
        reset();
        setProfilePicture(null);
        setDescription('');
        toast.success('User updated successfully');
      })
      .catch(error => {
        toast.error(`Could not create the user :( Something went wrong!!`);
      });
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit(handleCreateUser)}
      className={styles.form}
    >
      <div>
        <div>
          <label htmlFor="">Name</label>
        </div>
        <input
          className={styles.name_field}
          {...register('name')}
          type="text"
          defaultValue={user?.name}
          placeholder="Name"
        />
      </div>

      <div>
        <label htmlFor="">Profile Picture</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user?.profile_picture && (
            <Image
              style={{ borderRadius: '100%', border: '1px solid #ddd' }}
              src={user?.profile_picture}
              height={100}
              width={100}
              alt={user?.name}
            />
          )}
          <p>Current profile picture</p>
        </div>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div className={styles.dp_dropbox} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                {profilePicture
                  ? profilePicture?.name
                  : "Drag 'n' drop your new profile picture here, or click to select file"}
              </p>
              {/* {profiePicture && (
            <img src={profiePicture ? profiePicture : ''} alt="" />
          )} */}
            </div>
          )}
        </Dropzone>
      </div>

      <div>
        <div>
          <label htmlFor="">Date of Birth</label>
        </div>
        <DatePicker
          className={styles.birthday}
          selected={startDate}
          placeholderText={user?.birthdate}
          onChange={date => setStartDate(date)}
        />
      </div>
      <label htmlFor="">Description</label>
      <div className={styles.description_field}>
        <CKEditor
          editor={ClassicEditor}
          data={user?.description}
          onChange={(event, editor) => {
            const data = editor.getData();
            setDescription(data);
          }}
        />
      </div>

      <div>
        <div>
          <label htmlFor="">Status</label>
        </div>
        <select className={styles.status_field} {...register('status')}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button className={styles.submitBtn} type="submit">
        Update
      </button>
    </form>
  );
};

export default EditUserForm;
