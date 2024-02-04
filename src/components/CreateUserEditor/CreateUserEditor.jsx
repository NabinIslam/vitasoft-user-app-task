import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'imageUpload',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
};

function CreateUserEditor({ setDescription }) {
  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={''}
      onChange={(event, editor) => {
        const data = editor.getData();
        setDescription(data);
      }}
    />
  );
}

export default CreateUserEditor;
