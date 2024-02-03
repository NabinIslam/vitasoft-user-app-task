'use client';

import styles from '@/components/CreateUserForm/CreateForm.module.css';
import { useForm } from 'react-hook-form';
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateUserForm = () => {
  const { handleSubmit, reset, register } = useForm();
  const [profilePicture, setProfilePicture] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState('');

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
      .post('https://tasks.vitasoftsolutions.com/userdata/', formData)
      .then(res => {
        reset();
        setProfilePicture(null);
        setDescription('');
        toast.success('Post added successfully');
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
          placeholder="Name"
        />
      </div>

      <div>
        <label htmlFor="">Profile Picture</label>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div className={styles.dp_dropbox} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                {profilePicture
                  ? profilePicture?.name
                  : "Drag 'n' drop your profile picture here, or click to select file"}
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
          onChange={date => setStartDate(date)}
        />
      </div>
      <label htmlFor="">Description</label>
      <div className={styles.description_field}>
        <CKEditor
          editor={ClassicEditor}
          data={description}
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
        Create
      </button>
    </form>
  );
};

export default CreateUserForm;
