import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = () => {
    const location = useLocation();

    useEffect(() => {
        // Define the mapping between routes and titles
        const routeTitles = {
            '/': 'Karl BIFU',
            '/about': 'Karl BIFU - About',
            '/skills': 'Karl BIFU - Skills',
            '/projects': 'Karl BIFU - Projects',
            '/contact': 'Karl BIFU - Contact',
        };

        // Get the title based on the current path
        // Fallback to 'Karl BIFU' if the route isn't in the list (e.g., 404)
        const currentTitle = routeTitles[location.pathname] || 'Karl BIFU - Page Not Found';

        // Update the document title
        document.title = currentTitle;
    }, [location]); // Re-run this effect whenever location changes
};

export default usePageTitle;