"use client";
import { useState, useEffect} from "react";
import styles from "./budgetPlanning.module.css";

type BudgetPlanningProps = {
    id: number;
    categoty: string;
    amount: number;
    spent: number;
    month: string;
    notes: string;
};

export default function BudgetPlanning() {
    const [budgets, setBudgets] = useState<BudgetPlanningProps[]>([]);
    const [showForms, setShowForms] = useState(false);

    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [month, setMonth] = useState("");
    const [notes, setNotes] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!category || !amount || !month) {
            setError("Please fill in all the fields");
            return;
        }

        const newBudget: BudgetPlanningProps = {
            id: Date.now(),
            categoty: category,
            amount: Number(amount),
            spent: 0,
            month,
            notes,
        };

        setBudgets((prev) => [...prev, newBudget]);

        // Reset the form
        setCategory("");
        setAmount("");
        setMonth("");
        setNotes("");
        setError("");
        setShowForms(false);
    };

    const handleDelete = (id: number) => {
        setBudgets((prev) => prev.filter((budget) => budget.id !== id));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Budget Planning</h1>
                <button className={styles.addBtn} onClick={() => setShowForms(!showForms)}>
                    {showForms ? "✕ Close" : "+ Add Planning"}
                </button>
            </div>

            {showForms && (
                    <section className={styles.formCard}>
                        <form onSubmit={handleSubmit} className={styles.formGrid}>
                            <div className={styles.inputGroup}>
                                <label>Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Select...</option>
                                    <option value="food">Entertainment</option>
                                    <option value="shopping">Shopping</option>
                                    <option value="transport">Transport</option>
                                    <option value="bills">Housing</option>
                                    <option value="health">Health</option>
                                    <option value="investments">Investments</option>
                                    <option value="beverages">Foods & Dinings</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Limit Amount ($)</label>
                                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Target Month</label>
                                <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Notes</label>
                                <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional details" />
                            </div>
                            <button type="submit" className={styles.saveBtn}>Create Plan</button>
                        </form>
                        {error && <p className={styles.error}>{error}</p>}
                    </section>
                )}

                <div className={styles.cardGrid}>
                    {budgets.map((item) => {
                        const progress = Math.min((item.spent / item.amount) * 100, 100);
                        const isOver = item.spent > item.amount;

                        return (
                            <div key={item.id} className={styles.card}>
                                <div className={styles.cardTop}>
                                    <span className={styles.badge}>{item.categoty}</span>
                                    <span className={styles.date}>{item.month}</span>
                                </div>
                                
                                <div className={styles.amountInfo}>
                                    <span className={styles.spentAmount}>${item.spent.toFixed(2)}</span>
                                    <span className={styles.totalAmount}>of ${item.amount.toFixed(2)}</span>
                                </div>

                                {/* Progress Bar Container */}
                                <div className={styles.progressWrapper}>
                                    <div 
                                        className={styles.progressBar} 
                                        style={{ 
                                            width: `${progress}%`,
                                            backgroundColor: isOver ? "#ef4444" : "#1e6f9f" 
                                        }}
                                    />
                                </div>

                                <p className={styles.notes}>{item.notes || "No notes added"}</p>
                                
                                <button className={styles.deleteLink} onClick={() => handleDelete(item.id)}>
                                    Remove Plan
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
    );
}