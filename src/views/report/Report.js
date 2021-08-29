import React from 'react'
import TodosReport from './TodosReport'
import PhotoReport from './PhotoReport'
import UserReport from './UserReport'

function Report() {

  return (
    <>
      <h1 className="component-heading">Report</h1>
      <PhotoReport />
      <div className="flex-between">
        <TodosReport />
        <UserReport />
      </div>
    </>
  )
}

export default Report
