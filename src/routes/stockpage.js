import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./StockPage.css";

function StockPage() {
    const { symbol } = useParams();
    const [stockDetails, setStockDetails] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [activeTab, setActiveTab] = useState("sell");
    const [orderType, setOrderType] = useState("Sell Order");
    const [sellIn, setSellIn] = useState("Dollars");
    const [amount, setAmount] = useState("");
    const [showOrderDropdown, setShowOrderDropdown] = useState(false);
    const [showSellInDropdown, setShowSellInDropdown] = useState(false);
    const API_TOKEN = "cvupjhpr01qjg13b5smgcvupjhpr01qjg13b5sn0";

    // Update order type when tab changes
    useEffect(() => {
        setOrderType(activeTab === "buy" ? "Buy Order" : "Sell Order");
    }, [activeTab]);

    useEffect(() => {
        // Fetch stock quote data
        fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_TOKEN}`)
            .then((response) => response.json())
            .then((data) => {
                // Get the basic price data
                const stockData = {
                    symbol: symbol,
                    currentPrice: data.c || 0,
                    highPrice: data.h,
                    lowPrice: data.l,
                    openPrice: data.o,
                    previousClose: data.pc,
                    holdings: (Math.random() * 100 + 50).toFixed(2), // Simulate holdings
                    todaysReturn: ((Math.random() * 2) - 1).toFixed(2), // Simulate today's return
                    totalReturn: ((Math.random() * 10) - 5).toFixed(2), // Simulate total return
                    sharesAvailable: (Math.random() * 2 + 0.5).toFixed(6), // Simulate shares available
                };
                
                setStockDetails(stockData);
                
                // Fetch company name
                fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_TOKEN}`)
                    .then(res => res.json())
                    .then(profileData => {
                        if (profileData && profileData.name) {
                            setCompanyName(profileData.name);
                        } else {
                            // Use a fallback if company name not available
                            setCompanyName(`${symbol} Stock`);
                        }
                    })
                    .catch(err => {
                        console.error("Error fetching company profile:", err);
                        setCompanyName(`${symbol} Stock`);
                    });
            })
            .catch((error) => {
                console.error("Error fetching stock details:", error);
                // Fallback data
                setStockDetails({
                    symbol: symbol,
                    currentPrice: 0,
                    holdings: 0,
                    todaysReturn: 0,
                    totalReturn: 0,
                    sharesAvailable: 0,
                });
                setCompanyName(`${symbol} Stock`);
            });
    }, [symbol]);

    // Toggle the order type dropdown
    const toggleOrderDropdown = () => {
        setShowOrderDropdown(!showOrderDropdown);
        // Close the other dropdown if open
        if (showSellInDropdown) setShowSellInDropdown(false);
    };

    // Toggle the sell in dropdown
    const toggleSellInDropdown = () => {
        setShowSellInDropdown(!showSellInDropdown);
        // Close the other dropdown if open
        if (showOrderDropdown) setShowOrderDropdown(false);
    };

    // Handle sell in selection
    const handleSellInSelect = (option) => {
        setSellIn(option);
        setShowSellInDropdown(false);
    };

    if (!stockDetails) {
        return <div className="stock-page-container loading">Loading stock details...</div>;
    }

    return (
        <div className="stock-page-container">
            <div className="content-area">
                <div className="main-content">
                    {/* Stock Header - Using dynamic company name */}
                    <div className="stock-header">
                        <h1>{companyName}</h1>
                        <h2>${stockDetails.currentPrice.toFixed(2)}</h2>
                    </div>

                    {/* Chart */}
                    <div className="stock-chart">
                        {/* SVG path that mimics the chart */}
                        <svg viewBox="0 0 800 200" className="line-chart">
                            <path
                                d="M0,170 C50,150 100,120 150,90 C200,50 250,120 300,70 C350,100 400,130 450,90 C500,50 550,100 600,70 C650,50 700,120 750,170"
                                fill="none"
                                stroke="#c0d6ff"
                                strokeWidth="3"
                            />
                            <path
                                d="M0,170 C50,150 100,120 150,90 C200,50 250,120 300,70 C350,100 400,130 450,90 C500,50 550,100 600,70 C650,50 700,120 750,170"
                                fill="rgba(192, 214, 255, 0.2)"
                                strokeWidth="0"
                            />
                        </svg>
                    </div>

                    {/* Timeframe Buttons */}
                    <div className="timeframe-buttons">
                        <button>1D</button>
                        <button>1W</button>
                        <button>1M</button>
                        <button>3M</button>
                        <button>YTD</button>
                        <button>1Y</button>
                        <button>All</button>
                    </div>

                    {/* Holdings Section */}
                    <div className="holdings-section">
                        <h3>Your holdings</h3>
                        <p><strong>$ {stockDetails.holdings}</strong></p>
                        <div className="holdings-detail">
                            <span>Today's return</span>
                            <span className={parseFloat(stockDetails.todaysReturn) >= 0 ? 'positive' : 'negative'}>
                                {parseFloat(stockDetails.todaysReturn) >= 0 ? '+' : ''}${stockDetails.todaysReturn}
                            </span>
                        </div>
                        <div className="holdings-detail">
                            <span>Total return</span>
                            <span className={parseFloat(stockDetails.totalReturn) >= 0 ? 'positive' : 'negative'}>
                                {parseFloat(stockDetails.totalReturn) >= 0 ? '+' : ''}${stockDetails.totalReturn}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="sidebar">
                    {/* Buy/Sell Section */}
                    <div className="buy-sell-section">
                        <div className="buy-sell-tabs">
                            <button 
                                className={activeTab === "buy" ? "active" : ""}
                                onClick={() => setActiveTab("buy")}
                            >
                                BUY {stockDetails.symbol}
                            </button>
                            <button 
                                className={activeTab === "sell" ? "active" : ""}
                                onClick={() => setActiveTab("sell")}
                            >
                                SELL {stockDetails.symbol}
                            </button>
                        </div>
                        
                        <form className="buy-sell-form">
                            <div className="form-group">
                                <label>Order Type</label>
                                <div className="dropdown-select">
                                    {orderType}
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label>{activeTab === "buy" ? "Buy In" : "Sell In"}</label>
                                <div className="dropdown">
                                    <div className="dropdown-select" onClick={toggleSellInDropdown}>
                                        {sellIn} <span className="dropdown-arrow">▼</span>
                                    </div>
                                    {showSellInDropdown && (
                                        <div className="dropdown-menu">
                                            <div 
                                                className="dropdown-item" 
                                                onClick={() => handleSellInSelect("Dollars")}
                                            >
                                                Dollars
                                            </div>
                                            <div 
                                                className="dropdown-item" 
                                                onClick={() => handleSellInSelect("Shares")}
                                            >
                                                Shares
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label>Amount</label>
                                <input 
                                    type="text" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder={sellIn === "Dollars" ? "$0.00" : "0.00"}
                                />
                            </div>
                            
                            <div className="divider"></div>
                            
                            <button type="submit" className="buy-sell-button">
                                {activeTab === "buy" ? "Buy" : "Sell"}
                            </button>
                        </form>
                        
                        <div className="shares-available">
                            {stockDetails.sharesAvailable} shares Available
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StockPage;