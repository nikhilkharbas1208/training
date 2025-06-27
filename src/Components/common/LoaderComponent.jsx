import React from 'react';
import styles from './Loader.module.css';
import { ClipLoader } from 'react-spinners';

const LoaderComponent = ({ message = "Loading..." }) => {
  return (
    <div className={styles.loaderOverlay}>
      <ClipLoader color="#007bff" size={50} />
      <div className={styles.loadingMessage}>{message}</div>
    </div>
  );
};

export default LoaderComponent;