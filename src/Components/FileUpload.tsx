import React, { Dispatch, SetStateAction, useState } from 'react';
import { Alert } from 'react-bootstrap';

export interface IFile {
    name: string;
    size: number;
    type: string;
    url: string;
}

export interface IFileType {
    name: string;
    type: string;
}

type Props = {
    uploads: File[],
    setUploads: Dispatch<SetStateAction<File[]>>,
    acceptFileTypes: IFileType[],
    acceptMaxFileSizeInMB: number
}

const FileUpload = ({ uploads, setUploads, acceptFileTypes, acceptMaxFileSizeInMB }: Props) => {
    const [errors, setErrors] = useState<string[]>([]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            for (let index = 0; index < event.target.files.length; index++) {
                const element = event.target.files[index];

                if (uploads.some((file: File) => file.name === element.name)) {
                    setErrors((existing) => [...existing, `${element.name} - File is already exists.`]);
                } else {
                    if (checkAcceptFileType(element.name, element.type) && checkAcceptFileSize(element.name, element.size)) {
                        setUploads((existing) => [...existing, element]);
                    }
                }
            }
        }
    };

    const checkAcceptFileType = (fileName: string, fileType: string): boolean => {
        if (acceptFileTypes.length > 0 && !acceptFileTypes.some((x: IFileType) => x.type === fileType)) {
            setErrors((existing) => [...existing, `${fileName} - Not a valid file type.`]);
            return false;
        }
        return true;
    };

    const checkAcceptFileSize = (name: string, size: number): boolean => {
        if (size === 0) {
            setErrors((existing) => [...existing, `${name} - File is empty. Size: ${formatBytes(size)}`]);
            return false;
        }

        if (acceptMaxFileSizeInMB > 0) {
            const kb = 1024;
            const acceptMaxFileSizeInBytes = ((acceptMaxFileSizeInMB * kb) * kb);

            if (size > acceptMaxFileSizeInBytes) {
                setErrors((existing) => [...existing, `${name} - File size cannot exceeds ${acceptMaxFileSizeInMB}MB. Size: ${formatBytes(size)}`]);
                return false;
            }
        }
        return true;
    };

    const formatBytes = (bytes: number, decimals = 2): string => {
        if (bytes === 0) return '0 Bytes';
        const kb = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(kb));
        return parseFloat((bytes / Math.pow(kb, i)).toFixed(dm)) + sizes[i];
    };

    const getAcceptFileTypes = (): string => {
        let value = '';
        acceptFileTypes.forEach((type: IFileType) => {
            if (value === '') {
                value = value.concat(type.name);
            } else {
                value = value.concat(`, ${type.name}`);
            }
        });
        return value;
    };

    return (
        <>
            <form>
                <div className='file-upload'>
                    <div className='contents'>
                        <b>File Upload <i className='fa fa-upload fa-fw' aria-hidden='true'></i></b>
                        <p>Drag and drop files here or click to browse files</p>

                        {acceptFileTypes.length > 0 && (<>
                            <b>Supported Files</b>
                            <p className='m-0'>{getAcceptFileTypes()}</p>
                        </>)}

                        {acceptMaxFileSizeInMB > 0 && (<p className='m-0'>Max File Size: {acceptMaxFileSizeInMB}MB</p>)}
                    </div>
                    <input type={'file'} value={''} multiple onChange={onChangeHandler} />
                </div>
            </form>

            {errors.length > 0 && (
                <Alert className='mb-2' variant='danger' onClose={() => setErrors([])} dismissible>
                    {errors.map((error: string, index: number) => (
                        <p key={index} className='mb-0'>
                            {error}
                        </p>
                    ))}
                </Alert>
            )}
        </>
    );
};

export default FileUpload;