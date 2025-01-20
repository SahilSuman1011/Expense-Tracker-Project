from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import uuid

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model
class Expense(BaseModel):
    id: str
    title: str
    amount: float
    date: datetime
    category: str

# In-memory storage
expenses: List[Expense] = []

@app.get("/api/expenses")
async def get_expenses():
    return expenses

@app.post("/api/expenses")
async def create_expense(expense: Expense):
    expense.id = str(uuid.uuid4())
    expenses.append(expense)
    return expense

@app.delete("/api/expenses/{expense_id}")
async def delete_expense(expense_id: str):
    for i, expense in enumerate(expenses):
        if expense.id == expense_id:
            return expenses.pop(i)
    raise HTTPException(status_code=404, detail="Expense not found")

@app.get("/api/expenses/export")
async def export_expenses():
    # Convert expenses to CSV format
    csv_content = "Title,Amount,Date,Category\n"
    for expense in expenses:
        csv_content += f"{expense.title},{expense.amount},{expense.date},{expense.category}\n"
    return {"csv": csv_content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)