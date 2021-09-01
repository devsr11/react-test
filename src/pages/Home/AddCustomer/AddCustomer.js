import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { addCustomer } from 'services/services';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(50, 'Too Long!').required('First name is required'),
    lastName: Yup.string().max(50, 'Too Long!').required('Last name is required'),
    emailAddress: Yup.string().email('Invalid email').required('Email is required'),
    birthdate: Yup.string().required('Birth Date is required'),
    category: Yup.string().required('Category is required'),
    jobTitle: Yup.string().required('Job Title is required'),
});

const AddCustomer = () => {
    const history = useHistory()
    const onSubmitHandler = (values) => {
        const data = addCustomer(values)
        data.then(res => {
            if (res.ok) {
                history.push("/")
            }
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <div>
            <div className="card-header">
                Add New Customer
            </div>
            <div className="container py-5">
                <div className="card">
                    <div className="card-header bg-primary text-white py-3">
                        <h4 className="text-uppercase text-center mb-0">Add Customer</h4>
                    </div>
                    <div className="card-body">
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                birthdate: '',
                                jobTitle: '',
                                category: '',
                                emailAddress: '',
                                customerAddress: {
                                    zipCode: ''
                                }
                            }}
                            validationSchema={validationSchema}
                            onSubmit={values => {
                                console.log(values);
                                onSubmitHandler(values)
                            }}
                        >
                            {
                                ({ errors, touched, isValid, dirty }) => (
                                    <Form>
                                        <div className="mb-2">
                                            <label className="form-label">First Name</label>
                                            <Field type="text" className="form-control" name="firstName" autoComplete="false" />
                                            {errors.firstName && touched.firstName ? (
                                                <div className="invalid-feedback d-block">{errors.firstName}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Last Name</label>
                                            <Field type="text" className="form-control" name="lastName" dirty />
                                            {errors.lastName && touched.lastName ? (
                                                <div className="invalid-feedback d-block">{errors.lastName}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Birth Date</label>
                                            <Field type="date" className="form-control" name="birthdate" />
                                            {errors.birthdate && touched.birthdate ? (
                                                <div className="invalid-feedback d-block">{errors.birthdate}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Job Title</label>
                                            <Field type="text" className="form-control" name="jobTitle" />
                                            {errors.jobTitle && touched.jobTitle ? (
                                                <div className="invalid-feedback d-block">{errors.jobTitle}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Email Address</label>
                                            <Field type="email" className="form-control" name="emailAddress" />
                                            {errors.emailAddress && touched.emailAddress ? (
                                                <div className="invalid-feedback d-block">{errors.emailAddress}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Category</label>
                                            <Field as="select" className="form-control" name="category">
                                                <option value="NEW_CUSTOMER">NEW_CUSTOMER</option>
                                                <option value="EXISTING_CUSTOMER">EXISTING_CUSTOMER</option>
                                            </Field>
                                            {errors.category && touched.category ? (
                                                <div className="invalid-feedback d-block">{errors.category}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Zipcode</label>
                                            <Field type="text" className="form-control" name="customerAddress.zipCode" />
                                        </div>
                                        <button className="btn btn-primary" type="submit" disabled={!isValid || !dirty}>
                                            Submit
                                        </button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>Back</button>
            </div>
        </div>
    )
}

export default AddCustomer
