import React, { useState } from 'react';
import TabNavigation from '../components/TabNavigation';
import DashboardTab from '../components/tabs/DashboardTab';
import TransactionsTab from '../components/tabs/TransactionsTab';
import BudgetTab from '../components/tabs/BudgetTab';
import RecurringTab from '../components/tabs/RecurringTab';



const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Dashboard')

    const tabs = [
        { name: 'Dashboard', link: '#' },
        { name: 'Income', link: '#' },
        { name: 'Expense', link: '#' },
        { name: 'Investment', link: '#' },
        { name: 'Budget', link: '#' },
        { name: 'Recurring', link: '#' },
    ]

    const render = (activeTab) => {
        switch (activeTab) {
            case tabs[0].name:
                return <DashboardTab activeTab={activeTab}/>;
            case tabs[1].name:
                return <TransactionsTab type={"income"} activeTab={activeTab} />;
            case tabs[2].name:
                return <TransactionsTab type={"expense"} activeTab={activeTab} />;
            case tabs[3].name:
                return <TransactionsTab type={"investment"} activeTab={activeTab} />;
            case tabs[4].name:
                return <BudgetTab activeTab={activeTab}/>;
            case tabs[5].name:
                return <RecurringTab activeTab={activeTab}/>;
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col items-center gap-y-2 py-4 background text-txt">
            <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="w-4/5 text-center">
                {render(activeTab)}
            </div>
        </div>
    )
}

export default Dashboard;
