"use client";

import { useMemo, useState } from "react";
import styles from "./report.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type Transaction = {
  id: number;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
};

// 🔹 TEMP MOCK DATA (later you connect with real expenses state)
const mockTransactions: Transaction[] = [
  { id: 1, title: "Salary", category: "Salary", amount: 4000, type: "income", date: "2026-02-01" },
  { id: 2, title: "Groceries", category: "Food", amount: 300, type: "expense", date: "2026-02-05" },
  { id: 3, title: "Shopping", category: "Shopping", amount: 250, type: "expense", date: "2026-02-10" },
  { id: 4, title: "Transport", category: "Transport", amount: 150, type: "expense", date: "2026-02-12" },
  { id: 5, title: "Entertainment", category: "Entertainment", amount: 200, type: "expense", date: "2026-02-15" },
];

export default function ReportsPage() {
  const [month, setMonth] = useState("2026-02");

  // Filter by month
  const filtered = useMemo(() => {
    return mockTransactions.filter((t) =>
      t.date.startsWith(month)
    );
  }, [month]);

  const totalIncome = filtered
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Category breakdown
  const categoryData = useMemo(() => {
    const grouped: Record<string, number> = {};

    filtered
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        grouped[t.category] =
          (grouped[t.category] || 0) + t.amount;
      });

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
    }));
  }, [filtered]);

  const barData = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense },
  ];

  const COLORS = ["#1e6f9f", "#e74c3c", "#f39c12", "#2ecc71"];

  // CSV DOWNLOAD
  const handleDownloadCSV = () => {
    const header = "Title,Category,Amount,Type,Date\n";
    const rows = filtered
      .map(
        (t) =>
          `${t.title},${t.category},${t.amount},${t.type},${t.date}`
      )
      .join("\n");

    const blob = new Blob([header + rows], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Reports</h1>

        <div className={styles.actions}>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />

          <button
            className={styles.downloadBtn}
            onClick={handleDownloadCSV}
          >
            Download CSV
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className={styles.summaryGrid}>
        <div className={styles.card}>
          <h4>Total Income</h4>
          <p className={styles.income}>${totalIncome.toFixed(2)}</p>
        </div>

        <div className={styles.card}>
          <h4>Total Expense</h4>
          <p className={styles.expense}>${totalExpense.toFixed(2)}</p>
        </div>

        <div className={styles.card}>
          <h4>Net Balance</h4>
          <p className={balance >= 0 ? styles.income : styles.expense}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* CHARTS */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3>Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#1e6f9f" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}