import { useEffect, useState } from "react";
import { useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function AdminChart() {
  const [selectData,setSelectData] = useState("瀏覽量");
  const chartRef = useRef(null); // 用來引用 canvas 元素
  const chartInstance = useRef(null); // 儲存 Chart 實例，方便銷毀舊圖表

  useEffect(() => {
    // 確保圖表只初始化一次
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    if(selectData === "瀏覽量"){
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], // 標籤
          datasets: [
            {
              label: "瀏覽量", // 圖表標題
              data: [200, 300, 150, 100, 500, 1000, 400, 2000, 360, 250, 50, 800], // 各區塊的數據
              borderWidth: 1, // 邊框寬度
            },
          ],
        },
        options: {
          responsive: true, // 使圖表響應式
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top", // 圖例顯示位置
            },
            tooltip: {
              enabled: true, // 啟用工具提示
            },
          },
        },
      });
    }else if(selectData === "收藏數"){
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], // 標籤
          datasets: [
            {
              label: "收藏數", // 圖表標題
              data: [20, 30, 15, 10, 50, 100, 40, 200, 36, 25, 5, 8], // 各區塊的數據
              borderWidth: 1, // 邊框寬度
            },
          ],
        },
        options: {
          responsive: true, // 使圖表響應式
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top", // 圖例顯示位置
            },
            tooltip: {
              enabled: true, // 啟用工具提示
            },
          },
        },
      });
    }else{
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], // 標籤
          datasets: [
            {
              label: "募資金額", // 圖表標題
              data: [5000, 800, 12000, 3600, 8800, 1000, 400, 4000, 3600, 2500, 500, 800], // 各區塊的數據
              borderWidth: 1, // 邊框寬度
            },
          ],
        },
        options: {
          responsive: true, // 使圖表響應式
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top", // 圖例顯示位置
            },
            tooltip: {
              enabled: true, // 啟用工具提示
            },
          },
        },
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectData]);

  return (
    <>
      <h2>數據分析</h2>
      <div className="row">
        <div className="col-6 col-lg-2">
          <select className="form-select fs-sm fs-lg-base project-option" onChange={(e)=>setSelectData(e.target.value)}>
            <option value="瀏覽量">瀏覽量</option>
            <option value="募資金額">募資金額</option>
            <option value="收藏數">收藏數</option>
          </select>
        </div>
        <div className="col-6 col-lg-2">
          <select className="form-select fs-sm fs-lg-base project-option">
            <option value="1">1年</option>
          </select>
        </div>
      </div>

      <div className="row vw-lg-100">
        <div className="col-lg-8" style={{ height: "50vh" }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </>
  );
}
