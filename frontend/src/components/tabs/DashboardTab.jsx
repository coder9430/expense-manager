import React, { useState, useEffect } from 'react'
import transactionService from '../../apiservice/transactionService'
import budgetService from '../../apiservice/budgetService'
import LoadingDashboard from "../loading/LoadingDashboard"
import TransactionsTable from '../tables/TransactionsTable'
// import


const DashboardTab = ({ activeTab }) => {
    const [transactions, setTransactions] = useState([])
    const [budgets, setBudgets] = useState([])
    const [loading, setLoading] = useState(true)
	const [trigger, setTrigger] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const fetchData = async () => {
        setLoading(true)

        try {
            const resultTransaction = await transactionService.getTransactions("")
            const resultBudget = await budgetService.getBudgets("")

            if (!resultTransaction.status) {
                throw error(resultTransaction.error)
            }
            if (!resultBudget.status) {
                throw error(resultBudget.error)
            }
            setTransactions(resultTransaction.data.transactions)
            setBudgets(resultBudget.data.budgets)
            setErrorMessage(null)
        } catch (error) {
            console.error(error)
            setErrorMessage("Error Loading Data. Please try again later...")
        } finally {
            setLoading(false)
        }
    }

    const refresh = () => {
		setTrigger(!trigger)
	}

    useEffect(() => {
        fetchData()
    }, [activeTab, trigger])

    if (loading) {
        return <LoadingDashboard />
    }

    if (errorMessage) {
        return (
            <p className="text-xl text-txt-depressed">{errorMessage}</p>
        )
    }

    return (
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-6">
            <div className="w-full md:w-2/3">
                <TransactionsTable data={transactions} refresh={refresh} />
            </div>
        </div>)
}

export default DashboardTab