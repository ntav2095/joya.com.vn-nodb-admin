import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
        <div style={{width: '100%',
            height: '900px',
            textAlign: 'center',
            padding: '300px'}}>
            <div >
            <Spinner animation="grow" variant="info" size='sm'/>
            <Spinner animation="grow" variant="info" size='sm'/>
            <Spinner animation="grow" variant="info" size='sm'/>
            </div>
        </div>
  );
}

export default Loading;