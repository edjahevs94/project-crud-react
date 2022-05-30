import React from "react"
import {Link} from "react-router-dom"
import Axios from "axios"

export default function Create() {

    const [projectBody, setProjectBody] = React.useState({
        name: "",
        priority: "",
        description: ""
    })

    const sendProject = (event) => {
        event.preventDefault()
        console.log(projectBody)
        //var body = JSON.stringify({name: projectBody.name, priority: projectBody.priority, description: "bla"})
      /*  fetch("projects",{
            method: "POST",
            body: body
        }).then(resp=> resp.json()).then((dataResp)=>{
            console.log(dataResp)
        }).catch(console.log)*/
        //los post funcionan solo con axios ya que el fetch nativo 
        //esta bug e inserta valores nulos en el body
        Axios.post("projects",{
            name: projectBody.name,
            priority: projectBody.priority,
            description: projectBody.description
        }).then(res=>{
            console.log(res.data)
        } )
            
    }

    const handleChange = (event) =>{
        const {name,value} = event.target
        setProjectBody(prevBody => ({   
                ...prevBody,
                [name] : value         
        }))
    }

    

    return(
        <div className="card">
            <div className="card-header">
               <h4>Project</h4> 
            </div>
           
            <div className="card-body">
                <form onSubmit={sendProject}>
                    <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            onChange={handleChange} 
                            value={projectBody.name} 
                            className="form-control"
                            placeholder="Project name" />
                       
                        <small id="helpId" className="text-muted">Whrite project name here</small>
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="">Priority</label>
                        <input 
                            type="text" 
                            name="priority" 
                            onChange={handleChange} 
                            value={projectBody.priority} 
                            className="form-control" 
                            placeholder="Project priority" />
                        
                        <small id="helpId" className="text-muted">Whrite project priority here</small>
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="">Description</label>
                        <textarea 
                            type="text" 
                            name="description" 
                            onChange={handleChange} 
                            value={projectBody.description} 
                            className="form-control" 
                            placeholder="Project description..." />
                        
                        <small id="helpId" className="text-muted">Whrite project description here</small>
                    </div>
                    <div className="mt-4">
                        <button type="submit" className="btn btn-success">Add new project</button>
                        <Link to={"/"} className="btn btn-primary ms-2">Cancel</Link>
                    </div>
                </form>
            </div>
            <div className="card-footer text-muted"></div>
        </div>
    )
}