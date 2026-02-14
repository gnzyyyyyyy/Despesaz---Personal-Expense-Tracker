"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import styles from "./dashboard.module.css";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[]; 
  label?: string;
}

const summaryCards = [
  { title: "Active Balance", amount: "IDR 24.500.000", change: "+5%", themeClass: styles.cardBalance },
  { title: "Total Income", amount: "IDR 12.300.000", change: "+3%", themeClass: styles.cardIncome },
  { title: "Total Expenses", amount: "IDR 7.800.000", change: "-2%", themeClass: styles.cardExpense },
];

const expenseData = [
  { name: "Food", value: 4000 },
  { name: "Shopping", value: 3000 },
  { name: "Transport", value: 2000 },
  { name: "Bills", value: 1500 },
];

const lineData = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 800 },
  { month: "Mar", value: 600 },
  { month: "Apr", value: 1000 },
  { month: "May", value: 750 },
  { month: "Jun", value: 1200 },
];

const COLORS = [
  "var(--chart-pie-1)", 
  "var(--chart-pie-2)", 
  "var(--chart-pie-3)", 
  "var(--chart-pie-4)"
];


const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
        <div className={styles.customTooltip}>
            <p className={styles.tooltipTitle}>{label || data.name}</p>
            <div className={styles.tooltipBody}>
            <span 
                className={styles.tooltipDot} 
                style={{ backgroundColor: data.payload.fill || data.stroke }}
            ></span>
            <p className={styles.tooltipAmount}>
                IDR {data.value.toLocaleString('id-ID')}
            </p>
            </div>
        </div>
        );
    }
    return null;
};

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome back, Fabio!</h1>

      {/* SUMMARY CARDS */}
      <div className={styles.cards}>
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className={`${styles.card} ${card.themeClass}`}
          >
            <p className={styles.cardSubtitle}>{card.title}</p>
            <h2 className={styles.cardAmount}>{card.amount}</h2>
            <span className={card.change.includes('+') ? styles.positiveChange : styles.negativeChange}>
              {card.change}
            </span>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className={styles.grid}>
        {/* DONUT CHART */}
        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Expenses - January 2026</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Button Directing to Expenses */}
          <div className={styles.buttonWrapper}>
            <button className={styles.primaryButton} onClick={() => window.location.href='/expenses'}> {/* <Link href="/expenses"> later */}
              View Expense Details
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className={styles.tableCard}>
            <h3 className={styles.cardTitle}>Recent Transactions</h3>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th className={styles.amountColumn}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Starbucks</td>
                    <td><span className={styles.tagFood}>Food</span></td>
                    <td>12/01/2026</td>
                    <td className={styles.amountNegative}>- IDR 75.000</td>
                    </tr>
                    <tr>
                    <td>Tokopedia</td>
                    <td><span className={styles.tagShopping}>Shopping</span></td>
                    <td>10/01/2026</td>
                    <td className={styles.amountNegative}>- IDR 250.000</td>
                    </tr>
                    <tr>
                    <td>Salary</td>
                    <td><span className={styles.tagIncome}>Income</span></td>
                    <td>01/01/2026</td>
                    <td className={styles.amountPositive}>+ IDR 8.000.000</td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
      </div>

      {/* LINE GRAPH */}
      <div className={styles.lineCard}>
            <h3 className={styles.cardTitle}>Expense Activity</h3>
            <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 14}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 14}} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#4aa3df" 
                strokeWidth={3}
                dot={{ r: 4, fill: "#4aa3df", strokeWidth: 2, stroke: "#fff" }} 
                activeDot={{ r: 6 }} 
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
}