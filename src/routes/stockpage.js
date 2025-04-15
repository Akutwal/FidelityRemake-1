import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./StockPage.css"; // Import the CSS file for styling

function StockPage() {
    const { symbol } = useParams(); // Get the stock symbol from the URL
    const [stockDetails, setStockDetails] = useState(null);

    useEffect(() => {
        // Fetch stock details from the API
        fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cvupjhpr01qjg13b5smgcvupjhpr01qjg13b5sn0`)
            .then((response) => response.json())
            .then((data) => {
                setStockDetails({
                    symbol: symbol,
                    currentPrice: data.c,
                    highPrice: data.h,
                    lowPrice: data.l,
                    openPrice: data.o,
                    previousClose: data.pc,
                    holdings: 106.82, // Example holdings value
                    todaysReturn: 0.52, // Example today's return
                    totalReturn: 68.82, // Example total return
                    sharesAvailable: 0.575373, // Example shares available
                });
            })
            .catch((error) => console.error("Error fetching stock details:", error));
    }, [symbol]);

    if (!stockDetails) {
        return <div>Loading stock details...</div>;
    }

    return (
        <div className="stock-page">
            {/* Header Section */}
            <header className="stock-header">
                <h1>{symbol} - Fidelity MSCI Information Technology Index ETF</h1>
                <h2>${stockDetails.currentPrice}</h2>
                <div className="stock-chart">
                    {/* Placeholder for the chart */}
                    <svg viewBox="0 0 600 200" className="line-chart">
                        <path
                            d="M0,150 C50,120 100,180 150,100 C200,20 250,120 300,60 C350,100 400,20 450,100 C500,180 550,120 600,150"
                            fill="none"
                            stroke="#c0d6ff"
                            strokeWidth="3"
                        />
                    </svg>
                </div>
                <div className="timeframe-buttons">
                    <button>1D</button>
                    <button>1W</button>
                    <button>1M</button>
                    <button>3M</button>
                    <button>YTD</button>
                    <button>1Y</button>
                    <button>All</button>
                </div>
            </header>

            {/* Holdings Section */}
            <section className="holdings-section">
                <h3>Your Holdings</h3>
                <p>Value: ${stockDetails.holdings}</p>
                <p>Today's Return: +${stockDetails.todaysReturn}</p>
                <p>Total Return: +${stockDetails.totalReturn}</p>
            </section>

            {/* Buy/Sell Section */}
            <section className="buy-sell-section">
                <div className="buy-sell-tabs">
                    <button className="active">Buy {symbol}</button>
                    <button>Sell {symbol}</button>
                </div>
                <form className="buy-sell-form">
                    <label>
                        Order Type
                        <select>
                            <option>Market Order</option>
                            <option>Limit Order</option>
                        </select>
                    </label>
                    <label>
                        Amount
                        <input type="number" placeholder="$0.00" />
                    </label>
                    <button type="submit" className="buy-sell-button">
                        Submit
                    </button>
                </form>
                <p className="shares-available">
                    {stockDetails.sharesAvailable} shares available
                </p>
            </section>
        </div>
    );
}

export default StockPage;