import Axios  from "axios"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Edit = ()=>{
    const [loadingData, setLoadingData] = React.useState(false);
    
    const [projectBody, setProjectBody] = React.useState({
        id: "",
        name: "",
        priority: "",
        description: ""
    });
    //hook para tomar parametros de la url
    const {id} = useParams();
    const navigate = useNavigate()
    //console.log(id)

        /*async function getProject(){
            const res = await fetch(`projects/${id}`)
            console.log(res)
            const data = await res.json()
            console.log(data)
            setLoadingData(true)
            setProject(data)
        }*/
        
        const getProject = async ()=>{
            Axios.get(`https://task-node-api-rest.herokuapp.com/projects/${id}`)
            .then(res=>{
                console.log(res.data)
                setLoadingData(true)
                setProjectBody(prevBody => ({
                    ...prevBody, id : res.data.id,
                    name : res.data.name,
                    priority: res.data.priority,
                    description : res.data.description
                }));
            }).catch(console.log)
        }
    
        React.useEffect(() => {
           
            getProject();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []) 

        const handleChange = (event)=>{
            const {name,value} = event.target
            setProjectBody(prevBody => ({   
                ...prevBody,
                [name] : value         
        }))       
        }
        const sendProject = (event)=>{
            event.preventDefault();
            Axios.put(`https://task-node-api-rest.herokuapp.com/projects/${projectBody.id}`,{
                name : projectBody.name,
                priority : projectBody.priority,
                description : projectBody.description
            }).then(res=>{console.log(res.data)}).catch(console.log)
            navigate("/")
        }

    return(
        <div className="card">
            <div className="card-header">
               <h4>Editing Project</h4> 
            </div>
           
            <div className="card-body">
                {!loadingData ? <div className="d-flex align-items-center mt-3">
                                <strong>Loading...</strong>
                                <div className="spinner-border ml-auto ms-3" role="status" aria-hidden="true"></div>
                            </div> : 
                <form onSubmit={sendProject}>
                    <div className="form-group">
                       <div> {projectBody.id} </div>
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
                        <button type="submit" className="btn btn-success">Save changes</button>
                        <Link to={"/"} className="btn btn-primary ms-2">Cancel</Link>
                    </div>
                </form> }
            </div>
            <div className="card-footer text-muted"></div>
        </div>
    )
}

export default(Edit)