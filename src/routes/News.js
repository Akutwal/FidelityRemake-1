import React, { useEffect, useState } from 'react';
import './News.css'; // Importing CSS for styling

function News() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stockData, setStockData] = useState([]); // State for multiple stock data

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

    useEffect(() => {
        // Fetch stock data for multiple symbols
        const fetchStockData = async () => {
            const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']; // List of stock symbols
            try {
                const stockPromises = symbols.map((symbol) =>
                    fetch(
                        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cvqqap9r01qp88cn4d80cvqqap9r01qp88cn4d8g`
                    ).then((response) => response.json())
                );
                const stockResults = await Promise.all(stockPromises);
                const stockDataWithSymbols = stockResults.map((data, index) => ({
                    symbol: symbols[index],
                    ...data,
                }));
                setStockData(stockDataWithSymbols);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchStockData();
    }, []);

    return (
        <>
            {/* Header section */}
            <header className="header">
                <h1 className="news-heading">News & Research</h1>
            </header>

            {/* News box */}
            <div className="news-box">
    {stockData.length > 0 && (
        <div className="stock-data">
            {stockData.slice(0, 4).map((stock, index) => ( // Limit to 4 items
                <div key={index} className="stock-item">
                    <h3>{stock.symbol}</h3>
                    <p>Current Price: ${stock.c}</p>
                    <p>High: ${stock.h}</p>
                    <p>Low: ${stock.l}</p>
                    <p>Open: ${stock.o}</p>
                    <p>Previous Close: ${stock.pc}</p>
                </div>
            ))}
        </div>
    )}
</div>

            <div className="total-boxs">
                {loading ? (
                    <p>Loading news...</p>
                ) : (
                    articles.map((article, index) => (
                        <div key={index} className="news-box">
                            {/* Display the clickable logo */}
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={`https://logo.clearbit.com/${new URL(article.url).hostname}`}
                                    alt={`${article.source.name} logo`}
                                    className="news-logo"
                                />
                            </a>
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