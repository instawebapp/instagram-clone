import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   //likes
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   //comments
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   // links
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   //hashtags
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
// ];

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

export default function Chart({ posts, linkViews }) {
  posts = posts.sort((a, b) => a.dateCreated - b.dateCreated);
  const data = posts.map((post, index) => {
    const [view] = linkViews.filter((item) => item.docId === post.docId);
    if (view !== undefined) {
      return {
        name: new Date(post.dateCreated).toLocaleDateString(),
        likes: post.likes.length,
        comments: post.comments.length,
        linkViews: Math.round(Math.random() * 10),
        // linkViews: view.length,
      };
    } else {
      return {
        name: new Date(post.dateCreated).toLocaleDateString(),
        likes: post.likes.length,
        comments: post.comments.length,
        linkViews: Math.round(Math.random() * 10),
      };
    }
  });
  return (
    <section className="chart_section">
      <ResponsiveContainer
        width="100%"
        height="100%"
        minHeight={300}
        minWidth={500}
      >
        <LineChart
          width={1024}
          height={800}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" height={30} tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="linkViews"
            stroke="#8884d8"
            label={<CustomizedLabel />}
          />
          <Line type="monotone" dataKey="likes" stroke="#8884d8" />
          <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
