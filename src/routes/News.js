import React from 'react';
import './News.css'; // Importing CSS for styling

function News() {
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
            {/* Bloomberg link box */}
            <div className="news-box1">
                <p>Bloomberg:</p>
                <a href="https://www.bloomberg.com/news/articles/2025-04-03/trump-tariffs-set-to-zap-nearly-2-trillion-from-us-stock-market" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="news-link">
                    Read more about the latest news
                </a>
            </div>

            {/* Bloomberg link box */}
            <div className="news-box1">
                <p>Bloomberg:</p>
                <a href="https://www.bloomberg.com/news/articles/2025-04-03/trump-tariffs-set-to-zap-nearly-2-trillion-from-us-stock-market" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="news-link">
                    Read more about the latest news
                </a>
            </div>

            {/* Bloomberg link box */}
            <div className="news-box2">
                <p>Bloomberg:</p>
                <a href="https://www.bloomberg.com/news/articles/2025-04-03/trump-tariffs-set-to-zap-nearly-2-trillion-from-us-stock-market" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="news-link">
                    Read more about the latest news
                </a>
            </div>

            {/* Bloomberg link box */}
            <div className="news-box3">
                <p>Bloomberg:</p>
                <a href="https://www.bloomberg.com/news/articles/2025-04-03/trump-tariffs-set-to-zap-nearly-2-trillion-from-us-stock-market" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="news-link">
                    Read more about the latest news
                </a>
            </div>

            {/* Bloomberg link box */}
            <div className="news-box4">
                <p>Bloomberg:</p>
                <a href="https://www.bloomberg.com/news/articles/2025-04-03/trump-tariffs-set-to-zap-nearly-2-trillion-from-us-stock-market" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="news-link">
                    Read more about the latest news
                </a>
            </div>

            {/* Bloomberg link box */}
            <div className="news-box5">
                <p>Bloomberg:</p>
                <a href="https://www.bloomberg.com/news/articles/2025-04-03/trump-tariffs-set-to-zap-nearly-2-trillion-from-us-stock-market" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="news-link">
                    Read more about the latest news
                </a>
            </div>
        </div>
        </>
    );
};

export default News;