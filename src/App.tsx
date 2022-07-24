import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import FileUpload, { IFile, IFileType } from './Components/FileUpload';
import FileUploadList from './Components/FileUploadList';

function App() {
    const [uploads, setUploads] = useState<File[]>([] as File[]);
    const [files, setFiles] = useState<IFile[]>([] as IFile[]);
    const [formDataList, setFormDataList] = useState<FormData[]>([] as FormData[]);

    useEffect(() => {
        const fileArray = [] as IFile[];
        uploads.forEach(f => {
            const file = {
                name: f.name,
                size: f.size,
                type: f.type,
                url: URL.createObjectURL(f)
            } as IFile;
            fileArray.push(file);
        });
        setFiles(fileArray);

        const formDataArray = [] as FormData[];
        uploads.forEach(element => {
            const formData = new FormData();
            formData.append('file', element);
            formData.append('fileName', element.name);
            formData.append('fileType', element.type);
            formDataArray.push(formData);
        });
        setFormDataList(formDataArray);
    }, [uploads]);

    const deleteFile = (fileName: string) => {
        setUploads(uploads.filter(file => file.name !== fileName));
    };

    const onSave = () => {
        console.log(uploads);
        console.log(files);
        console.log(formDataList);
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
