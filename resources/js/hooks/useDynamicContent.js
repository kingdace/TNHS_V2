import { useState, useEffect } from 'react';
import DynamicContentService from '../services/dynamicContentService';

export const useDynamicContent = (pageName, sectionName = null) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = sectionName 
                    ? await DynamicContentService.getPageSectionContent(pageName, sectionName)
                    : await DynamicContentService.getPageContent(pageName);
                
                if (response.success) {
                    setContent(response.data);
                } else {
                    setError('Failed to fetch content');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching dynamic content:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [pageName, sectionName]);

    return { content, loading, error };
};

export const useDownloadFiles = (category = null) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await DynamicContentService.getDownloadFiles(category);
                
                if (response.success) {
                    setFiles(response.data);
                } else {
                    setError('Failed to fetch download files');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching download files:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, [category]);

    return { files, loading, error };
};

export const useExternalLinks = (category = null) => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await DynamicContentService.getExternalLinks(category);
                
                if (response.success) {
                    setLinks(response.data);
                } else {
                    setError('Failed to fetch external links');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching external links:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, [category]);

    return { links, loading, error };
};

export const useStaffProfiles = (type = null) => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await DynamicContentService.getStaffProfiles(type);
                
                if (response.success) {
                    setProfiles(response.data);
                } else {
                    setError('Failed to fetch staff profiles');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching staff profiles:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, [type]);

    return { profiles, loading, error };
};
