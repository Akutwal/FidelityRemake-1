import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Stocks.css";

function Stocks() {
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredStocks, setFilteredStocks] = useState([]);
    const [dailyMovers, setDailyMovers] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Hardcoded stocks for My List Section
    const [myListStocks, setMyListStocks] = useState([
        { symbol: "AI", description: "C3.ai Inc", price: "33.48", shares: "5.00", chart: "📈" },
        { symbol: "BIGC", description: "BigCommerce Holdings Inc", price: "0.13", shares: "10.00", chart: "📉" },
        { symbol: "BLK", description: "BlackRock Inc", price: "1012.67", shares: "2.00", chart: "📈" },
        { symbol: "LLY", description: "Eli Lilly and Co", price: "837.35", shares: "3.00", chart: "📈" }
    ]);

    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        // Fetch stock data for the Stocks Section
        fetch("https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cvupjhpr01qjg13b5smgcvupjhpr01qjg13b5sn0")
            .then((response) => response.json())
            .then((data) => {
                const stockPromises = data.slice(0, 10).map((stock) =>
                    fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.displaySymbol}&token=cvupjhpr01qjg13b5smgcvupjhpr01qjg13b5sn0`)
                        .then((res) => res.json())
                        .then((quote) => ({
                            symbol: stock.displaySymbol,
                            description: stock.description || "No description available",
                            price: quote.c || "N/A", // Current price
                            change: quote.d || 0, // Daily change
                            chart: quote.d > 0 ? "📈" : "📉", // Chart direction
                            shares: (Math.random() * 10 + 1).toFixed(2) // Simulated shares
                        }))
                );

                Promise.all(stockPromises).then((stockData) => {
                    setStocks(stockData.slice(0, 5)); // Use only 5 stocks for the Stocks Section
                    setFilteredStocks(stockData.slice(0, 5)); // Initialize filtered stocks with the same 5

                    // Set Daily Movers with top movers
                    const movers = stockData
                        .sort((a, b) => Math.abs(b.change) - Math.abs(a.change)) // Sort by absolute change
                        .slice(0, 4); // Take the top 4 movers
                    setDailyMovers(movers);
                });
            })
            .catch((error) => console.error("Error fetching stocks:", error));
    }, []);

    useEffect(() => {
        // Fetch updated prices for My List stocks
        const myListPromises = myListStocks.map((stock) =>
            fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=cvupjhpr01qjg13b5smgcvupjhpr01qjg13b5sn0`)
                .then((res) => res.json())
                .then((quote) => ({
                    ...stock,
                    price: quote.c || stock.price, // Update price from API
                    chart: quote.d > 0 ? "📈" : "📉" // Update chart direction
                }))
        );

        Promise.all(myListPromises).then((updatedStocks) => {
            setMyListStocks(updatedStocks); // Update My List stocks with new prices
        });
    }, []);

    useEffect(() => {
        // Filter stocks based on the search term
        if (searchTerm.trim() === "") {
            setFilteredStocks(stocks); // Show all stocks if no search term
        } else {
            const filtered = stocks.filter((stock) =>
                stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stock.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredStocks(filtered); // Show filtered results
        }
    }, [searchTerm, stocks]);

    const handleStockClick = (stockSymbol) => {
        navigate(`/stocks/${stockSymbol}`);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDepositClick = () => {
        navigate("/profile"); // Navigate to the Profile page
    };

    return (
        <div className="stocks-page">
            <main className="main-content">
                <div className="left-column">
                    <section className="investing-overview">
                        <h1>Investing</h1>
                        <p className="investing-amount">$530.44</p>
                        <div className="investment-chart">
                            {/* SVG Chart would go here */}
                            <svg viewBox="0 0 600 200" className="line-chart">
                                <path d="M0,150 C50,120 100,180 150,100 C200,20 250,120 300,60 C350,100 400,20 450,100 C500,180 550,120 600,150" fill="none" stroke="#c0d6ff" strokeWidth="3" />
                            </svg>
                        </div>
                        <div className="timeframe-buttons">
                            <button className="timeframe-btn">1D</button>
                            <button className="timeframe-btn">1W</button>
                            <button className="timeframe-btn">1M</button>
                            <button className="timeframe-btn">3M</button>
                            <button className="timeframe-btn">YTD</button>
                            <button className="timeframe-btn">1Y</button>
                            <button className="timeframe-btn">All</button>
                        </div>
                    </section>

                    <section className="buying-power-section">
                        <div className="buying-power-header" onClick={toggleDropdown}>
                            <span>Buying power</span>
                            <div className="buying-power-amount">
                                <span>$1.52</span>
                                <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>▼</span>
                            </div>
                        </div>
                        
                        {isDropdownOpen && (
                            <div className="buying-power-details">
                                <div className="buying-power-total">
                                    <span>Total</span>
                                    <span>$1.52</span>
                                </div>
                                <button className="deposit-btn" onClick={handleDepositClick}>Deposit funds</button>
                            </div>
                        )}
                    </section>

                    <section className="daily-movers">
                        <h2>Daily Movers</h2>
                        <p className="movers-subtitle">Stocks making the biggest move today</p>
                        
                        <div className="movers-grid">
                            {dailyMovers.map((mover, index) => (
                                <div 
                                    key={index} 
                                    className="mover-card" 
                                    onClick={() => handleStockClick(mover.symbol)} // Navigate to stock page
                                >
                                    <div className="mover-name">{mover.description}</div>
                                    <div className="mover-price">${mover.price}</div>
                                    <div className={`mover-change ${mover.chart === "📈" ? "positive" : "negative"}`}>
                                        {mover.chart === "📈" ? "+5%" : "-3%"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="right-column">
                    <section className="stocks-section">
                        <div className="section-header">
                            <h2>Stocks</h2>
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className="stocks-list">
                            {filteredStocks.map((stock, index) => (
                                <div 
                                    key={index} 
                                    className="stock-item" 
                                    onClick={() => handleStockClick(stock.symbol)}
                                >
                                    <div className="stock-info">
                                        <div className="stock-symbol">{stock.symbol}</div>
                                        <div className="stock-description">{stock.description}</div>
                                    </div>
                                    <div className="stock-price-info">
                                        <div className="stock-chart">{stock.chart}</div>
                                        <div className="stock-price">${stock.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="my-list-section">
                        <div className="section-header">
                            <h2>List</h2>
                            <div className="list-filter">
                                <span>My First List</span>
                                <span className="dropdown-icon">▼</span>
                            </div>
                        </div>
                        
                        <div className="stocks-list">
                            {myListStocks.map((stock, index) => (
                                <div 
                                    key={index} 
                                    className="stock-item" 
                                    onClick={() => handleStockClick(stock.symbol)}
                                >
                                    <div className="stock-info">
                                        <div className="stock-symbol">{stock.symbol}</div>
                                        <div className="stock-shares">{stock.shares} Shares</div>
                                    </div>
                                    <div className="stock-price-info">
                                        <div className="stock-chart">{stock.chart}</div>
                                        <div className="stock-price">${stock.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Stocks;