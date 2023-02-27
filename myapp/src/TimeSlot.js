import React from 'react';
import { variables } from './Variable.js';

export class TimeSlot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            timeslots:[],
            modalTitle:"",
            tsId: 0,
            tsCode: "",
            startTime: "",
            endTime: "",
            rid: 0,
            roomName:""
        }
    }

    refreshList(){
        fetch(variables.API_URL + "TimeSlot")
        .then(response => response.json())
        .then(data => {
            this.setState({timeslots:data});
        });
        console.log(this.state.timeslots);
    }

    componentDidMount(){
        this.refreshList();
    }

    changetsCode = (e) =>{
        this.setState({tsCode:e.target.value})
    }
    changestartTime = (e) =>{
        this.setState({startTime:e.target.value})
    }
    changeendTime = (e) => {
        this.setState({ endTime: e.target.value });
    }
    changerid = (e) => {
        this.setState({ rid: e.target.value });
    }
    changeroomName = (e) => {
        this.setState({ roomName: e.target.value });
    }

    addClick(){
        this.setState({
            modalTitle:"Add TimeSlot",
            tsId: 0,
            tsCode: "",
            startTime: "",
            endTime: "",
            rid: 0,
            roomName:""
        });
    }

    editClick(ts){
        this.setState({
            modalTitle:"Edit TimeSlot",
            tsId: ts.tsId,
            tsCode: ts.tsCode,
            startTime: ts.startTime,
            endTime: ts.endTime,
            rid: ts.rid,
            roomName:ts.roomName
        });
    }

    createClick(){
        fetch(variables.API_URL+"TimeSlot",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                tsCode: this.state.tsCode,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                rid: this.state.rid
            })
        })
            .then(res => res.json())
            .then((result) =>{
                alert(result);
                this.refreshList();
            }, (error)=>{
                alert("Failed");
            })
    }
    updateClick(){
        fetch(variables.API_URL+"TimeSlot",{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                tsId: this.state.tsId,
                tsCode: this.state.tsCode,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                rid: this.state.rid
            })
        })
            .then(res => res.json())
            .then((result) =>{
                alert(result);
                this.refreshList();
            }, (error)=>{
                alert("Failed");
            })
    }
    deleteClick(ts) {
        if (window.confirm('Are you Sure to Delete?')) {
            fetch(variables.API_URL + 'TimeSlot', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tsId: this.state.tsId,
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
            timeslots,
            modalTitle,
            tsId,
            tsCode,
            startTime,
            endTime,
            rid,
            roomName
        } = this.state;
        console.log(timeslots);
        return (
            <div>
                <button type='button'
                    className='btn btn-primary m-2 float-end'
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add TimeSlot
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>TS id</th>
                            <th>Ts Code</th>
                            <th>startTime</th>
                            <th>endTime</th>
                            <th>rid</th>
                            <th>Room Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            timeslots.map(ts =>
                                <tr key={ts.tsId}>
                                    <td>{ts.tsCode}</td>
                                    <td>{ts.startTime}</td>
                                    <td>{ts.endTime}</td>
                                    <td>{ts.rid}</td>
                                    <td>{ts.roomName}</td>
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
                                    <span className="input-group-text">TS Code</span>
                                    <input type="text" className="form-control" value={tsCode} onChange={this.changetsCode} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Start Time</span>
                                    <input type="text" className="form-control" value={startTime} onChange={this.changestartTime} />
                                </div><div className="input-group mb-3">
                                    <span className="input-group-text">End Time</span>
                                    <input type="text" className="form-control" value={endTime} onChange={this.changeendTime} />
                                </div><div className="input-group mb-3">
                                    <span className="input-group-text">RID</span>
                                    <input type="text" className="form-control" value={rid} onChange={this.changerid} />
                                </div>

                                

                                {tsId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {tsId != 0 ?
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
