import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

// parent Card
const Card = (props) => {
    const [expanded, setExpanded] = useState(false);
    return (
      <AnimateSharedLayout>
        {expanded ? (
          <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
        ) : (
          <CompactCard param={props} setExpanded={() => setExpanded(true)} />
        )}
      </AnimateSharedLayout>
    );
  };
  
  // Compact Card
  function CompactCard({ param, setExpanded }) {
    const Png = param.png;
    return (
      <motion.div
        className="CompactCard"
        style={{
          background: param.color.backGround,
          boxShadow: param.color.boxShadow,
        }}
        layoutId="expandableCard"
        onClick={setExpanded}
      >
        <div className="radialBar">
          <CircularProgressbar
            value={param.barValue}
            text={`${param.barValue}%`}
          />
          <span>{param.title}</span>
        </div>
        <div className="detail">
          <Png />
          <span>${param.value}</span>
          <span>Trong 24h</span>
        </div>
      </motion.div>
    );
  }
  
  // Expanded Card
  function ExpandedCard({ param, setExpanded }) {
    const data = {
      options: {
        chart: {
          type: "area",
          height: "auto",
        },
  
        dropShadow: {
          enabled: false,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: "#000",
          opacity: 0.35,
        },
  
        fill: {
          colors: ["#fff"],
          type: "gradient",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          colors: ["white"],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
        grid: {
          show: true,
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2022-06-18T01:00:00.000Z",
            "2022-06-18T02:00:00.000Z",
            "2022-06-18T03:00:00.000Z",
            "2022-06-18T04:00:00.000Z",
            "2022-06-18T05:00:00.000Z",
            "2022-06-18T06:00:00.000Z",
            "2022-06-18T07:00:00.000Z",
            "2022-06-18T08:00:00.000Z",
            "2022-06-18T09:00:00.000Z",
            "2022-06-18T10:00:00.000Z",
            "2022-06-18T11:00:00.000Z",
            "2022-06-18T12:00:00.000Z",
            "2022-06-18T13:00:00.000Z",
            "2022-06-18T14:00:00.000Z",
            "2022-06-18T15:00:00.000Z",
            "2022-06-18T16:00:00.000Z",
            "2022-06-18T17:00:00.000Z",
            "2022-06-18T18:00:00.000Z",
            "2022-06-18T19:00:00.000Z",
            "2022-06-18T20:00:00.000Z",
            "2022-06-18T21:00:00.000Z",
            "2022-06-18T22:00:00.000Z",
            "2022-06-18T23:00:00.000Z",
            "2022-06-19T00:00:00.000Z",
          ],
        },
      },
    };
  
    return (
      <motion.div
        className="ExpandedCard"
        style={{
          background: param.color.backGround,
          boxShadow: param.color.boxShadow,
        }}
        layoutId="expandableCard"
      >
        <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
          <UilTimes onClick={setExpanded} />
        </div>
          <span>{param.title}</span>
        <div className="chartContainer">
          <Chart options={data.options} series={param.series} type="area" />
        </div>
        <span className="bg-gray-900 rounded-md w-20 text-center -mt-4">Trong 24h</span>
      </motion.div>
    );
  }
  
  export default Card;
  