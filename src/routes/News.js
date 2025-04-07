import React, { useEffect, useState } from 'react';
import './News.css'; // Importing CSS for styling

function News() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch news articles from the API
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&apiKey=451382ca42a64f3f9c20ac3fc951dfd5`
                );
                const data = await response.json();
                setArticles(data.articles || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <>
            {/* Header section */}
            <header className="header">
                <h1 className="news-heading">News & Research</h1>
            </header>

            {/* News box */}
            <div className="news-box">
                <p>This is the content inside the light grey box.</p>
            </div>

            <div className="total-boxs">
                {loading ? (
                    <p>Loading news...</p>
                ) : (
                    articles.map((article, index) => (
                        <div key={index} className="news-box">
                            <p>{article.source.name}:</p>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="news-link"
                            >
                                {article.title}
                            </a>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default News;