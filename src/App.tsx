import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import FileUpload, { IFile, IFileType } from './Components/FileUpload';
import FileUploadList from './Components/FileUploadList';

function App() {
    const [uploads, setUploads] = useState<File[]>([] as File[]);
    const [files, setFiles] = useState<IFile[]>([] as IFile[]);

    useEffect(() => {
        const _files = [] as IFile[];
        uploads.forEach(f => {
            const file = {
                name: f.name,
                size: f.size,
                type: f.type,
                url: URL.createObjectURL(f)
            } as IFile;
            _files.push(file);
        });
        setFiles(_files);
    }, [uploads]);

    const deleteFile = (fileName: string) => {
        setUploads(uploads.filter(file => file.name !== fileName));
    };

    const onSave = () => {
        console.log(uploads);
        console.log(files);

        // Add multiple files to FormData
        const formData = new FormData();
        uploads.forEach(file => {
            formData.append('files', file);
        });

        // Add extra property/properties to the FormData
        formData.append('id', '123');
        console.log(formData);

        // TODO: Call a API and send post FormData
    };

    const AcceptMaxFileSizeInMB = 100;

    const AcceptFileTypes = [
        { name: 'TIFF', type: 'image/tiff' },
        { name: 'PNG', type: 'image/png' },
        { name: 'JPG', type: 'image/jpeg' },
        { name: 'BMP', type: 'image/bmp' },
        { name: 'PDF', type: 'application/pdf' }
    ] as IFileType[];

    return (
        <div className='container-fluid mt-2'>
            <FileUpload
                uploads={uploads}
                setUploads={setUploads}
                acceptFileTypes={AcceptFileTypes}
                acceptMaxFileSizeInMB={AcceptMaxFileSizeInMB}
            />
            <FileUploadList
                files={files}
                deleteFile={deleteFile}
            />
            <Button type='button' className='mt-2' onClick={() => onSave()}>Save</Button>
        </div>
    );
}

export default App;
