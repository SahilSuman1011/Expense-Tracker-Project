import React from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface DashboardProps {
  expenses: Array<{
    id: string;
    title: string;
    amount: number;
    date: Date;
    category: string;
  }>;
}

const ExpenseDashboard: React.FC<DashboardProps> = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const chartData = expenses
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((expense) => ({
      date: format(new Date(expense.date), "MMM d"),
      amount: expense.amount,
    }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary-light to-primary">
          <h3 className="text-sm font-medium text-white">Total Expenses</h3>
          <p className="text-3xl font-bold mt-2 text-white">
            ${totalExpenses.toFixed(2)}
          </p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-primary/80 to-primary">
          <h3 className="text-sm font-medium text-white">Number of Expenses</h3>
          <p className="text-3xl font-bold mt-2 text-white">{expenses.length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-primary-dark to-primary">
          <h3 className="text-sm font-medium text-white">Average Expense</h3>
          <p className="text-3xl font-bold mt-2 text-white">
            ${averageExpense.toFixed(2)}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Expense Trend</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#9b87f5"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};

export default ExpenseDashboard;