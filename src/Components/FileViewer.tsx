import React from 'react';
import { Modal } from 'react-bootstrap';
import { IFile } from './FileUpload';

type Props = {
    show: boolean,
    onHide: () => void,
    file: IFile
};

const FileViewer = ({ show, onHide, file }: Props) => {
    return (
        <Modal show={show} onHide={onHide} size='xl' backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>
                    {file.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='file-upload-viewer'>
                    {file.type === 'application/pdf' ?
                        (<object data={file.url} />) :
                        (<img src={file.url} />)
                    }
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default FileViewer;