import Chart from "react-apexcharts";

const LineChart = ({ title, state }) => {
  return (
    <div>
      <h1 className="font-semibold tracking-wide">{title}</h1>
      <Chart options={state.options} series={state.series} type="line" />
    </div>
  );
};
export default LineChart;
