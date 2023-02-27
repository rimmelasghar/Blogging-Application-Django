import React from 'react';
import { variables } from './Variable.js';

export class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            modalTitle: "",
            CourseName: "",
            CourseFee: "",
            CreditHour: "",
            CourseCode: "",
            CourseID:0
        }
    }
    refreshList() {
        fetch(variables.API_URL + 'course')
            .then(response => response.json())
            .then(data => {
                this.setState({courses: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeCourseName = (e) => {
        this.setState({ CourseName: e.target.value });
    }

    changeCourseFee = (e) => {
        this.setState({ CourseFee: e.target.value });
    }
    changeCreditHour = (e) => {
        this.setState({ CreditHour: e.target.value });
    }
    changeCourseCode = (e) => {
        this.setState({ CourseCode: e.target.value });
    }


    addClick() {
        this.setState({
            modalTitle: 'Add Course',
            CourseID: 0,
            CourseName: "",
            CourseFee: "",
            CreditHour: "",
            CourseCode: ""
        });
    }

    editClick(ts) {
        this.setState({
            modalTitle: 'Edit Course',
            CourseID: ts.CourseID,
            CourseName: ts.CourseName,
            CourseFee: ts.CourseFee,
            CreditHour: ts.CreditHour,
            CourseCode: ts.CourseCode
        });
    }

    createClick() {
        fetch(variables.API_URL + 'course', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CourseName: this.state.CourseName,
                CourseFee: this.state.CourseFee,
                CreditHour: this.state.CreditHour,
                CourseCode: this.state.CourseCode
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    updateClick() {
        fetch(variables.API_URL + 'course', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CourseID: this.state.CourseID,
                CourseName: this.state.CourseName,
                CourseFee: this.state.CourseFee,
                CreditHour: this.state.CreditHour,
                CourseCode: this.state.CourseCode
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(ts) {
        if (window.confirm('Are you Sure to Delete?')) {
            fetch(variables.API_URL + 'course', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    CourseID: ts.CourseID,
                })
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    render() {
        const {
            courses,
            modalTitle,
            CourseName,
            CourseFee,
            CreditHour,
            CourseCode,
            CourseID
        } = this.state;

        return (
            <div>
                <button type='button'
                    className='btn btn-primary m-2 float-end'
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Course
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>CourseID</th>
                            <th>CourseCode</th>
                            <th>CourseName</th>
                            <th>CourseFee</th>
                            <th>CreditHour</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map(ts =>
                                <tr key={ts.CourseID}>
                                    <td>{ts.CourseID}</td>
                                    <td>{ts.CourseCode}</td>
                                    <td>{ts.CourseName}</td>
                                    <td>{ts.CourseFee}</td>
                                    <td>{ts.CreditHour}</td>
                                    <td>
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => this.editClick(ts)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            onClick={() => this.deleteClick(ts)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Course Code</span>
                                    <input type="text" className="form-control" value={CourseCode} onChange={this.changeCourseCode} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Course Name</span>
                                    <input type="text" className="form-control" value={CourseName} onChange={this.changeCourseName} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">CourseFee</span>
                                    <input type="text" className="form-control" value={CourseFee} onChange={this.changeCourseFee} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">CreditHour</span>
                                    <input type="text" className="form-control" value={CreditHour} onChange={this.changeCreditHour} />
                                </div>


                                {CourseID == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {CourseID != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
