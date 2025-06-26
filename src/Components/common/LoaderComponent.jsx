import React from 'react';
import styles from './Loader.module.css';

const LoaderComponent = ({ message = "Loading..." }) => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.spinner}></div>
      <div className={styles.loadingMessage}>{message}</div>
    </div>
  );
};
export default LoaderComponent;
