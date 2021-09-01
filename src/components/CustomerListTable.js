import React, { useState } from 'react';
import { ReactComponent as DeleteIcon } from "assets/images/delete.svg";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link } from 'react-router-dom';
import { deleteCustomer, fetchCustomersList } from 'services/services';

const CustomerListTable = () => {
    const [customerList, setCustomerList] = useState();
    const [value, setValue] = useState('');
    const [alert, setAlert] = useState(false)
    const [deleteId, setDeleteId] = useState();
    const [success, setSuccess] = useState(false)

    const deleteCustomerList = (customerId) => {
        setSuccess(false)
        const data = deleteCustomer(customerId)
        data.then(res => {
            if (res.ok) {
                setSuccess(true);
            }
        });
        setAlert(false);
    }

    const fetchList = async () => {
        const lists = await fetchCustomersList();
        const data = await lists.json()
        if (lists.ok) {
            setCustomerList(data)
        }
    }

    const data = customerList?.filter((c) => {
        const regex = new RegExp(value, "i")
        return c.firstName.match(regex) || c.lastName.match(regex) || c.jobTitle.match(regex) || c.emailAddress.match(regex) || c.category.match(regex)
    })

    React.useEffect(() => {
        fetchList()
    }, [success])

    return (
        <div className="container-fluid pt-3">
            <div className="d-flex justify-content-between align-items-start">
                <Link to="/add-customer" className="btn btn-primary">
                    Add Customer
                </Link>
                <div className="col-lg-4 mb-3">
                    <label className="form-label d-block">Filter: </label>
                    <input type="text" placeholder="Search" className="w-100" onChange={(e) => setValue(e.target.value)} />
                </div>
            </div>
            <table className="table table-primary table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Job title</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((customer, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.jobTitle}</td>
                            <td>{customer.emailAddress}</td>
                            <td>{customer.category}</td>
                            <td>
                                <button className="btn text-primary p-0" onClick={() => {
                                    setAlert(true);
                                    setDeleteId(customer.id)
                                }}>
                                    <DeleteIcon width="25" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <SweetAlert
                show={alert}
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={() => deleteCustomerList(deleteId)}
                onCancel={() => setAlert(false)}
            >
                You will not be able to recover this imaginary file!
            </SweetAlert>
        </div>
    )
}

export default CustomerListTable
