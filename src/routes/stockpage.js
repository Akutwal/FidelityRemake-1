import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./StockPage.css";

function StockPage() {
    const { symbol } = useParams();
    const navigate = useNavigate();
    const [stockDetails, setStockDetails] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [activeTab, setActiveTab] = useState("buy");
    const [orderType, setOrderType] = useState("Buy Order");
    const [sellIn, setSellIn] = useState("Dollars");
    const [amount, setAmount] = useState("");
    const [showOrderDropdown, setShowOrderDropdown] = useState(false);
    const [showSellInDropdown, setShowSellInDropdown] = useState(false);
    const [userHoldsStock, setUserHoldsStock] = useState(false);
    const [userPortfolio, setUserPortfolio] = useState([]);
    const [buyingPower, setBuyingPower] = useState(1.52); // Default buying power from Stocks.js
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [transactionMessage, setTransactionMessage] = useState("");
    const [loadingTransaction, setLoadingTransaction] = useState(false);
    const API_TOKEN = "cvupjhpr01qjg13b5smgcvupjhpr01qjg13b5sn0";

    // Load portfolio from localStorage or initialize with default values
    useEffect(() => {
        const savedPortfolio = localStorage.getItem('userPortfolio');
        const savedBuyingPower = localStorage.getItem('buyingPower');
        
        if (savedPortfolio) {
            setUserPortfolio(JSON.parse(savedPortfolio));
        } else {
            // Default portfolio
            const defaultPortfolio = [
                { symbol: "AI", description: "C3.ai Inc", price: "33.48", shares: "5.00", chart: "📈" },
                { symbol: "BIGC", description: "BigCommerce Holdings Inc", price: "0.13", shares: "10.00", chart: "📉" },
                { symbol: "BLK", description: "BlackRock Inc", price: "1012.67", shares: "2.00", chart: "📈" },
                { symbol: "LLY", description: "Eli Lilly and Co", price: "837.35", shares: "3.00", chart: "📈" }
            ];
            setUserPortfolio(defaultPortfolio);
            localStorage.setItem('userPortfolio', JSON.stringify(defaultPortfolio));
        }

        if (savedBuyingPower) {
            setBuyingPower(parseFloat(savedBuyingPower));
        } else {
            localStorage.setItem('buyingPower', buyingPower.toString());
        }
    }, []);

    // Update order type when tab changes
    useEffect(() => {
        setOrderType(activeTab === "buy" ? "Buy Order" : "Sell Order");
    }, [activeTab]);

    useEffect(() => {
        if (userPortfolio.length > 0) {
            // Check if the user has this stock in their portfolio
            const stockInPortfolio = userPortfolio.find(stock => stock.symbol === symbol);
            setUserHoldsStock(!!stockInPortfolio);

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
                        // Only set holdings if user owns this stock, otherwise set to 0
                        holdings: stockInPortfolio ? 
                            (parseFloat(stockInPortfolio.shares) * parseFloat(data.c || 0)).toFixed(2) : 
                            "0.00",
                        todaysReturn: ((Math.random() * 2) - 1).toFixed(2), // Simulate today's return
                        totalReturn: ((Math.random() * 10) - 5).toFixed(2), // Simulate total return
                        sharesAvailable: stockInPortfolio ? 
                            stockInPortfolio.shares : 
                            "0.00", // Will be calculated based on buying power
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
        }
    }, [symbol, userPortfolio]);

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

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingTransaction(true);
        
        // Reset transaction message
        setTransactionSuccess(false);
        setTransactionMessage("");
        
        // Parse the amount
        const amountValue = parseFloat(amount);
        
        if (isNaN(amountValue) || amountValue <= 0) {
            setTransactionMessage("Please enter a valid amount.");
            setLoadingTransaction(false);
            return;
        }
        
        // Get current stock price
        const stockPrice = stockDetails.currentPrice;
        
        // Calculate how many shares can be bought/sold
        const numberOfShares = sellIn === "Dollars" ? amountValue / stockPrice : amountValue;
        const totalCost = sellIn === "Dollars" ? amountValue : amountValue * stockPrice;
        
        // Round to 6 decimal places for shares
        const roundedShares = parseFloat(numberOfShares.toFixed(6));
        
        // Execute buy/sell
        setTimeout(() => {
            if (activeTab === "buy") {
                // Check if user has enough buying power
                if (totalCost > buyingPower) {
                    setTransactionMessage("Insufficient funds! Please deposit more money.");
                    setLoadingTransaction(false);
                    return;
                }
                
                // Update buying power
                const newBuyingPower = buyingPower - totalCost;
                setBuyingPower(newBuyingPower);
                localStorage.setItem('buyingPower', newBuyingPower.toString());
                
                // Update portfolio
                const updatedPortfolio = [...userPortfolio];
                const existingStockIndex = updatedPortfolio.findIndex(stock => stock.symbol === symbol);
                
                if (existingStockIndex !== -1) {
                    // Update existing stock
                    const newShares = parseFloat(updatedPortfolio[existingStockIndex].shares) + roundedShares;
                    updatedPortfolio[existingStockIndex].shares = newShares.toFixed(6);
                    updatedPortfolio[existingStockIndex].price = stockPrice.toFixed(2);
                } else {
                    // Add new stock
                    updatedPortfolio.push({
                        symbol: symbol,
                        description: companyName,
                        price: stockPrice.toFixed(2),
                        shares: roundedShares.toFixed(6),
                        chart: "📈" // Default to up chart
                    });
                }
                
                setUserPortfolio(updatedPortfolio);
                localStorage.setItem('userPortfolio', JSON.stringify(updatedPortfolio));
                
                // Update transaction message
                setTransactionSuccess(true);
                setTransactionMessage(`Successfully purchased ${roundedShares.toFixed(6)} shares of ${symbol} for $${totalCost.toFixed(2)}`);
                
            } else if (activeTab === "sell") {
                // Find the stock in portfolio
                const stockIndex = userPortfolio.findIndex(stock => stock.symbol === symbol);
                
                if (stockIndex === -1) {
                    setTransactionMessage("You don't own this stock!");
                    setLoadingTransaction(false);
                    return;
                }
                
                const ownedShares = parseFloat(userPortfolio[stockIndex].shares);
                
                if (roundedShares > ownedShares) {
                    setTransactionMessage(`You only have ${ownedShares.toFixed(6)} shares to sell!`);
                    setLoadingTransaction(false);
                    return;
                }
                
                // Update buying power
                const newBuyingPower = buyingPower + totalCost;
                setBuyingPower(newBuyingPower);
                localStorage.setItem('buyingPower', newBuyingPower.toString());
                
                // Update portfolio
                const updatedPortfolio = [...userPortfolio];
                const remainingShares = ownedShares - roundedShares;
                
                if (remainingShares > 0.000001) {
                    // Update shares
                    updatedPortfolio[stockIndex].shares = remainingShares.toFixed(6);
                    updatedPortfolio[stockIndex].price = stockPrice.toFixed(2);
                } else {
                    // Remove stock entirely if no shares left
                    updatedPortfolio.splice(stockIndex, 1);
                }
                
                setUserPortfolio(updatedPortfolio);
                localStorage.setItem('userPortfolio', JSON.stringify(updatedPortfolio));
                
                // Update transaction message
                setTransactionSuccess(true);
                setTransactionMessage(`Successfully sold ${roundedShares.toFixed(6)} shares of ${symbol} for $${totalCost.toFixed(2)}`);
            }
            
            // Reset form
            setAmount("");
            setLoadingTransaction(false);
            
            // Reset message after 5 seconds
            setTimeout(() => {
                setTransactionMessage("");
            }, 5000);
        }, 1000); // Simulate transaction processing time
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

                    {/* Buying Power Information */}
                    <div className="holdings-section">
                        <h3>Available Buying Power</h3>
                        <p><strong>$ {buyingPower.toFixed(2)}</strong></p>
                    </div>

                    {/* Holdings Section - Only shown if user owns this stock */}
                    {userHoldsStock && (
                        <div className="holdings-section">
                            <h3>Your holdings</h3>
                            <p><strong>$ {stockDetails.holdings}</strong></p>
                            <div className="holdings-detail">
                                <span>Shares Owned</span>
                                <span>
                                    {userPortfolio.find(stock => stock.symbol === symbol)?.shares || "0.00"}
                                </span>
                            </div>
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
                    )}
                </div>

                <div className="sidebar">
                    {/* Transaction success message */}
                    {transactionMessage && (
                        <div className={`transaction-message ${transactionSuccess ? 'success' : 'error'}`}>
                            {transactionMessage}
                        </div>
                    )}

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
                                disabled={!userHoldsStock} // Disable sell button if user doesn't own the stock
                            >
                                SELL {stockDetails.symbol}
                            </button>
                        </div>
                        
                        <form className="buy-sell-form" onSubmit={handleSubmit}>
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
                            
                            {/* Show estimated cost/proceeds */}
                            {amount && !isNaN(parseFloat(amount)) && (
                                <div className="form-group">
                                    <label>Estimated {activeTab === "buy" ? "Cost" : "Proceeds"}</label>
                                    <div className="estimated-value">
                                        {sellIn === "Dollars" 
                                            ? parseFloat(amount) / stockDetails.currentPrice 
                                            : parseFloat(amount) * stockDetails.currentPrice
                                        } {sellIn === "Dollars" ? "shares" : "dollars"}
                                    </div>
                                </div>
                            )}
                            
                            <div className="divider"></div>
                            
                            <button 
                                type="submit" 
                                className="buy-sell-button"
                                disabled={loadingTransaction || 
                                        (activeTab === "sell" && !userHoldsStock) ||
                                        !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0}
                            >
                                {loadingTransaction 
                                    ? "Processing..." 
                                    : activeTab === "buy" 
                                        ? "Buy" 
                                        : "Sell"}
                            </button>
                        </form>
                        
                        <div className="shares-available">
                            {userHoldsStock 
                                ? `${userPortfolio.find(stock => stock.symbol === symbol)?.shares || "0.00"} shares Available to Sell` 
                                : activeTab === "sell" 
                                    ? "You don't own any shares" 
                                    : `Buying Power: $${buyingPower.toFixed(2)}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StockPage;