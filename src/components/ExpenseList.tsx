import React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <motion.div
          key={expense.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-lg">{expense.title}</h3>
              <p className="text-neutral-500 text-sm">
                {format(new Date(expense.date), "PPP")}
              </p>
              <span className="inline-block px-2 py-1 mt-2 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {expense.category}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">
                ${expense.amount.toFixed(2)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(expense.id)}
                className="text-neutral-500 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExpenseList;