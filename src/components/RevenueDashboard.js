import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getData } from "../utils/localStorageUtils";

Chart.register(...registerables);

const RevenueDashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const totalRevenue = getData("totalRevenue") || {
    Basic: 0,
    Premium: 0,
    Executive: 0,
    Team: 0,
  };

  const data = {
    labels: ["Basic", "Premium", "Executive", "Team"],
    datasets: [
      {
        label: "Total Revenue",
        data: [
          totalRevenue.Basic,
          totalRevenue.Premium,
          totalRevenue.Executive,
          totalRevenue.Team,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Revenue Dashboard
      </h2>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueDashboard;
