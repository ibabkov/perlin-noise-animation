import React from 'react';

import styles from './Fallback.module.css';

export const IframeFallback: React.FC = () => {
  return <span className={styles.container}>Loading</span>;
};
