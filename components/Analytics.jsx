import TotalTraineesChart from "./TotaltraineesChart";
import TotalEnrolliesGender from "./TotalEnrolliesGender";
import PerMonthChart from "./PerMonthChart";

const Analytics = () => {
	return (
		<div className="w-full h-full flex justify-evenly items-center flex-col">
			<div className="w-full">
				<PerMonthChart />
			</div>

			<div className="w-full flex justify-evenly items-center">
				<TotalTraineesChart />
				<TotalEnrolliesGender />
			</div>
		</div>
	);
};

export default Analytics;
