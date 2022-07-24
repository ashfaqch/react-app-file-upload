import React, { useState } from 'react';
import { IFile } from './FileUpload';
import FileViewer from './FileViewer';

type Props = {
    files: IFile[],
    deleteFile: (fileName: string) => void
}

type ShowProps = {
    show: boolean,
    file: IFile
}

const FileUploadList = ({ files, deleteFile }: Props) => {
    const [showFileViewer, setShowFileViewer] = useState<ShowProps>({ show: false, file: {} as IFile } as ShowProps);

    return (
        <>
            <ul className='p-0'>
                {files.length > 0 && files.map((file: IFile, index: number) => (
                    <div key={index}>
                        <div className='file-upload-item'>
                            <li>
                                <span className='icon-file'><i className='fa fa-file-text-o fa-fw'></i></span>

                                {file.url ?
                                    (<span className='file-link' onClick={() => setShowFileViewer({ show: true, file: file })}>{file.name}</span>) :
                                    (<span>{file.name}</span>)
                                }

                                <span className='icon-delete' onClick={() => deleteFile(file.name)}><i className='fa fa-trash-o fa-fw text-danger'></i></span>
                            </li>
                        </div>
                    </div>
                ))}
            </ul>

            <FileViewer
                show={showFileViewer.show}
                onHide={() => setShowFileViewer({ show: false, file: {} as IFile } as ShowProps)}
                file={showFileViewer.file}
            />
        </>
    );
};

export default FileUploadList;