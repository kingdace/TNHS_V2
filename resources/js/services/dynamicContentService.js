const API_BASE_URL = '/api';

class DynamicContentService {
    /**
     * Fetch page content by page name
     */
    static async getPageContent(pageName) {
        try {
            const response = await fetch(`${API_BASE_URL}/page-content/${pageName}`);
            if (!response.ok) throw new Error('Failed to fetch page content');
            return await response.json();
        } catch (error) {
            console.error('Error fetching page content:', error);
            return { success: false, data: [] };
        }
    }

    /**
     * Fetch page content by page and section
     */
    static async getPageSectionContent(pageName, sectionName) {
        try {
            const response = await fetch(`${API_BASE_URL}/page-content/${pageName}/${sectionName}`);
            if (!response.ok) throw new Error('Failed to fetch section content');
            return await response.json();
        } catch (error) {
            console.error('Error fetching section content:', error);
            return { success: false, data: [] };
        }
    }

    /**
     * Fetch featured content
     */
    static async getFeaturedContent() {
        try {
            const response = await fetch(`${API_BASE_URL}/featured-content`);
            if (!response.ok) throw new Error('Failed to fetch featured content');
            return await response.json();
        } catch (error) {
            console.error('Error fetching featured content:', error);
            return { success: false, data: [] };
        }
    }

    /**
     * Fetch download files
     */
    static async getDownloadFiles(category = null) {
        try {
            const url = category
                ? `${API_BASE_URL}/downloads/category/${category}`
                : `${API_BASE_URL}/downloads`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch download files');
            return await response.json();
        } catch (error) {
            console.error('Error fetching download files:', error);
            return { success: false, data: [] };
        }
    }

    /**
     * Fetch external links
     */
    static async getExternalLinks(category = null) {
        try {
            const url = category
                ? `${API_BASE_URL}/external-links/category/${category}`
                : `${API_BASE_URL}/external-links`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch external links');
            return await response.json();
        } catch (error) {
            console.error('Error fetching external links:', error);
            return { success: false, data: [] };
        }
    }

    /**
     * Fetch staff profiles
     */
    static async getStaffProfiles(type = null) {
        try {
            const url = type
                ? `${API_BASE_URL}/staff-profiles/type/${type}`
                : `${API_BASE_URL}/staff-profiles`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch staff profiles');
            return await response.json();
        } catch (error) {
            console.error('Error fetching staff profiles:', error);
            return { success: false, data: [] };
        }
    }

    /**
     * Increment download count
     */
    static async incrementDownloadCount(fileId) {
        try {
            const response = await fetch(`${API_BASE_URL}/downloads/${fileId}/increment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                }
            });
            if (!response.ok) throw new Error('Failed to increment download count');
            return await response.json();
        } catch (error) {
            console.error('Error incrementing download count:', error);
            return { success: false };
        }
    }

    /**
     * Increment link click count
     */
    static async incrementLinkClick(linkId) {
        try {
            const response = await fetch(`${API_BASE_URL}/external-links/${linkId}/increment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                }
            });
            if (!response.ok) throw new Error('Failed to increment link click count');
            return await response.json();
        } catch (error) {
            console.error('Error incrementing link click count:', error);
            return { success: false };
        }
    }
}

export default DynamicContentService;
