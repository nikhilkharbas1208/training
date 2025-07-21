import React, { useContext, useEffect, useRef, useState } from 'react';
import Cytoscape from 'cytoscape';
import styles from './common/GraphComponent.module.css';
import { JiraIssueContext } from '../App';
import { fetchIssues } from '../services/JiraService';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTranslation } from 'react-i18next';

const GraphComponent = () => {
  const containerRef = useRef(null);
  const cyInstanceRef = useRef(null);
  const { projectKey } = useContext(JiraIssueContext);
  const [loading, setLoading] = useState(false);
  const [items, setIssues] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchIssues(projectKey);
        setIssues(data.issues || []);
      } catch (error) {
        console.error("Failed to fetch issues", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [projectKey]);

  useEffect(() => {
    if (!items || items.length === 0 || !containerRef.current) return;

    const cy = Cytoscape({
      container: containerRef.current,
      elements: createGraphElements(items),
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#007bff',
            'label': 'data(label)',
            'width': 35,
            'height': 35,
            'text-wrap': 'wrap',
            'text-max-width': 80,
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': 10,
            'tooltip-text': 'data(title)',
          },
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
          },
        },
        {
          selector: 'node:selected',
          style: {
            'background-color': '#f4a261',
          },
        },
      ],
      layout: {
        name: 'cose',
        animate: true,
        fit: true,
        padding: 30,
        nodeRepulsion: 100000,
        idealEdgeLength: 100,
        edgeElasticity: 100,
        gravity: 80,
        numIter: 1000,
      },
      zoomingEnabled: true,
      userPanningEnabled: true,
    });

    cyInstanceRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [items]);

  const createGraphElements = (issues) => {
    const nodes = issues.map((issue) => ({
      data: {
        id: issue.id,
        label: issue.id,
        title: issue.fields?.customfield_10068 || ''
      },
    }));

    const edges = issues.flatMap((issue) =>
      issue.fields?.issuelinks?.map((link) => {
        const depId = link.outwardIssue?.id || link.inwardIssue?.id;
        return depId
          ? {
            data: { source: issue.id, target: depId },
          }
          : null;
      }).filter(Boolean) || []
    );

    return [...nodes, ...edges];
  };

  return (
    <div className={styles.graphContainer}>
      <h2 className={styles.heading}>{t('dependencyGraph')}</h2>

      {loading ? (
        <Skeleton
          height={600}
          width={900}
          borderRadius={8}
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
      ) : (
        <div ref={containerRef} className={styles.graph}></div>
      )}

    </div>
  );
};

export default GraphComponent;
