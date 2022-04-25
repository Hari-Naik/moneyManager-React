import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state

    const updatedTransactionList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )

    this.setState({transactionsList: updatedTransactionList})
  }

  onAddTransactionItem = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getBalanceAmount = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expenseAmount = 0

    transactionsList.forEach(element => {
      if (element.type === transactionTypeOptions[0].displayText) {
        incomeAmount += element.amount
      } else {
        expenseAmount += element.amount
      }
    })
    balanceAmount = incomeAmount - expenseAmount

    return balanceAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(element => {
      if (element.type === transactionTypeOptions[0].displayText) {
        incomeAmount += element.amount
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expenseAmount = 0

    transactionsList.forEach(element => {
      if (element.type === transactionTypeOptions[1].displayText) {
        expenseAmount += element.amount
      }
    })
    return expenseAmount
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onUpdateAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  render() {
    const {transactionsList, titleInput, amountInput, optionId} = this.state

    const balanceAmount = this.getBalanceAmount()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="bg-container">
        <div className="money-manager-container">
          <div className="user-profile-container">
            <h1 className="user-name">Hi, Richard</h1>
            <p className="para">
              Welcome back to your
              <span className="money-manager"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transaction-details">
            <form
              className="transaction-container"
              onSubmit={this.onAddTransactionItem}
            >
              <h1 className="heading">Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <div>
                <input
                  type="text"
                  id="title"
                  onChange={this.onChangeTitleInput}
                  value={titleInput}
                />
              </div>
              <label htmlFor="amount">AMOUNT</label>
              <div>
                <input
                  type="text"
                  id="amount"
                  onChange={this.onUpdateAmount}
                  value={amountInput}
                />
              </div>
              <label htmlFor="select">TYPE</label>
              <div>
                <select id="select" onChange={this.onChangeOptionId}>
                  {transactionTypeOptions.map(eachItem => (
                    <option value={optionId}>{eachItem.displayText}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="heading">History</h1>
              <div className="transaction-table-container">
                <ul className="transaction-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      eachItem={eachTransaction}
                      key={eachTransaction.id}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
