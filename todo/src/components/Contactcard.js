import React  from "react";

const CardContact = (props)=>{
    const {id,name,email} = props.contact;
    return(
        <div className="item">
                <div className="content">
                    <div className="header">
                        {name}
                    </div>
                    <div>{email}</div>
                </div>
                <i style={{color:"red",marginTop:"7px"}} className="trash alternate outline icon"></i>
        </div>
    )
}
export default CardContact;