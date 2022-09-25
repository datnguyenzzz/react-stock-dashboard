import { Chart, registerables } from "chart.js";
import { useEffect } from "react";

var useChart = (nodeRef, options) => {

    Chart.register(...registerables);

    useEffect(() => {   
        new Chart(nodeRef.current, options);
        console.log("Rendered chart !!!!");
    }, [nodeRef, options])

    return {};
}

export default useChart;