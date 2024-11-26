// components/DonutChart.js

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DonutChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: data.datasets,
            data: data.values,
            backgroundColor: data.colors,
          },
        ],
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div className="xs:w-[400px]  p-5">
      <canvas ref={chartRef} />
    </div>
  );
};

export default DonutChart;
