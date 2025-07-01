//Implemented Render props
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { JIRA_API_TOKEN, JIRA_EMAIL } from "../constants/UrlConstants";
import { fetchIssueById } from "../services/JiraService";
import { useNavigate } from "react-router-dom";

const JiraIssueFetcher = ({ issueId, render }) => {
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = btoa(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const data = await fetchIssueById(issueId);
                setIssue(data);
            } catch (error) {
                alert("failed to fetch Issue!");
                navigate(-1);
            }
            finally {
                setLoading(false);
            }
        }
        fetchIssue();

    }, [issueId]);

    return render({ issue, loading });
};

export default JiraIssueFetcher;
