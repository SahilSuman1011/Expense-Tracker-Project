import React, { useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseDashboard from "@/components/ExpenseDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Download } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { format } from "date-fns";
import { DateRangePicker } from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: string;
}

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { theme, setTheme } = useTheme();

  const handleAddExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: Math.random().toString(36).substr(2, 9),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const exportToCSV = () => {
    const headers = ["Title", "Amount", "Date", "Category"];
    const csvContent = [
      headers.join(","),
      ...filteredExpenses.map((expense) =>
        [
          expense.title,
          expense.amount,
          format(new Date(expense.date), "yyyy-MM-dd"),
          expense.category,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `expenses-${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      expense.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesDateRange =
      !dateRange?.from ||
      !dateRange?.to ||
      (new Date(expense.date) >= dateRange.from &&
        new Date(expense.date) <= dateRange.to);
    return matchesSearch && matchesCategory && matchesDateRange;
  });

  const categories = Array.from(
    new Set(expenses.map((expense) => expense.category))
  );

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-0">
            Personal Expense Tracker
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="add">Add Expense</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <ExpenseDashboard expenses={expenses} />
          </TabsContent>

          <TabsContent value="expenses">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Filter by Category</Label>
                  <select
                    id="category"
                    className="w-full p-2 border rounded-md bg-background"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Date Range</Label>
                  <DateRangePicker date={dateRange} setDate={setDateRange} />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={exportToCSV}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export to CSV
                  </Button>
                </div>
              </div>
              <ExpenseList
                expenses={filteredExpenses}
                onDelete={handleDeleteExpense}
              />
            </div>
          </TabsContent>

          <TabsContent value="add">
            <div className="max-w-md mx-auto">
              <ExpenseForm onSubmit={handleAddExpense} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;