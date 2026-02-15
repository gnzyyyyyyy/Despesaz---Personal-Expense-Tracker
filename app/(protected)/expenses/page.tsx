"use client";
import { useState } from "react";
import styles from "./expenses.module.css";

type Expense = {
    id: number;
    name: string;
    type: string;
    date: string;
    amount: string;
};

export default function Expenses() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");

    const [editingId, setEditingId] = useState<number | null>(null);

    // HANDLE SUBMIT
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!name || !type || !date || !amount) {
            setError("Please fill in all the fields");
            return;
        }

        if (editingId !== null) {
            setExpenses(prev => prev.map(exp => 
                exp.id === editingId 
                    ? { ...exp, name, type, date, amount } 
                    : exp
                ));
            setEditingId(null); 
        } else {
            const newExpense: Expense = {
                id: Date.now(),
                name,
                type,
                date, 
                amount,
            }
            setExpenses((prev) => [...prev, newExpense]);
        }

        setName("");
        setType("");
        setDate("");
        setAmount("");
        setError("");
    }

    // HANDLE EDIT
    const handleEdit = (expense : Expense) => {
        setName(expense.name);
        setType(expense.type);
        setDate(expense.date);
        setAmount(expense.amount);
        setEditingId(expense.id);
        setError("");

        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    // HANDLE DELETE
    const handleDelete = (id: number) => {
        setExpenses(prev => prev.filter(exp => exp.id !== id));
    }

    // HANDLE CANCEL FOR EDITING
    const handleCancelEdit = () => {
        setEditingId(null);
        setName("");
        setType("");
        setDate("");
        setAmount("");
        setError("");
    }

    // TABLE SORT BASED ON DATES
    const sortedExpenses = [...expenses].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA; 
    });
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Expenses</h1>

            {/* INPUT FORMS */}
            <div className={styles.inputForms}>
                <form onSubmit={handleSubmit}>
                    
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Please type your transaction name here..." />
                    <br />
                    <br />
                    
                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Please type your amount here..." />
                    <br />
                    <br />

                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="" disabled>Select a category</option>
                        <option value="food">Entertainment</option>
                        <option value="shopping">Shopping</option>
                        <option value="transport">Transport</option>
                        <option value="bills">Housing</option>
                        <option value="health">Health</option>
                        <option value="investments">Investments</option>
                        <option value="beverages">Foods & Dinings</option>
                    </select>
                    
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Please type your date here..." />

                    {error && (
                        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
                    )}
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.submitBtn}>
                            {editingId !== null ? "Update" : "Submit"}
                        </button>
                        
                        {editingId !== null && (
                            <button type="button" onClick={handleCancelEdit} className={styles.cancelBtn}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* TABLE */}
            <div className={styles.tableCard}>
                <h3 className={styles.cardTitle}>Transaction History</h3>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th className={styles.amountColumn}>Amount</th>
                            <th className={styles.actionsColumn}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedExpenses.length === 0 ? (
                            <tr>
                            <td colSpan={5} style={{ textAlign: "center" }}>
                                No transactions yet.
                            </td>
                            </tr>
                        ) : (
                            expenses.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td style={{textTransform: 'capitalize'}}>{item.type}</td>
                                <td>{item.date}</td>
                                <td
                                className={
                                    item.type === "income"
                                    ? styles.amountPositive
                                    : styles.amountNegative
                                }
                                >
                                {item.type === "income" ? "+" : "-"}IDR
                                {item.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </td>
                                <td>
                                    <div className={styles.actionButtons}>
                                        <button onClick={() => handleEdit(item)} className={styles.editBtn}>Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className={styles.deleteBtn}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}