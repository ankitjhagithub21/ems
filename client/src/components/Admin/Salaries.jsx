import React from 'react'
import Heading from '../common/Heading'
import Search from '../common/Search'
import { Link } from 'react-router-dom'

const Salaries = () => {
    return (
        <div>

            <Heading text={"Manage salaries"} />

            <div className="flex items-center justify-between mb-5 gap-5">
                <Search />
                <Link to={"/admin-dashboard/add-salary"} className="btn btn-primary" >Add Salary</Link>
            </div>
        </div>
    )
}

export default Salaries
