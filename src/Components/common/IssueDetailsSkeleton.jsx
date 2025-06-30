
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from './JiraIssueDetails.module.css';

const IssueDetailsSkeleton = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        <Skeleton width={150} height={28} />
      </h2>
      <p>
        <Skeleton width={300} height={20} />
      </p>
      <p>
        <Skeleton width={100} height={20} />
      </p>
      <p>
        <Skeleton width={120} height={20} />
      </p>
      <p>
        <Skeleton width={150} height={20} />
      </p>
      <p>
        <Skeleton width={100} height={20} />
      </p>
      <p>
        <Skeleton count={3} height={16} />
      </p>
      <Skeleton width={100} height={36} style={{ marginTop: '20px' }} />
    </div>
  );
};

export default IssueDetailsSkeleton;
