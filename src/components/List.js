import React from "react"
import {Link} from "react-router-dom"
 const List = ()=> {

    const [allProjects, setAllProjects] = React.useState([])

    const [loadingData, setLoadingData] = React.useState(false)

    const deleteProject = async (id) => {
        console.log(id)
        const res = await fetch(`https://task-node-api-rest.herokuapp.com/projects/${id}`, {method: "DELETE"})
        //const data = await res.json()
        //recargar nuevamente la tabla
        getProjects()
        console.log(res)
    }
    async function getProjects(){
        const res = await fetch("https://task-node-api-rest.herokuapp.com/projects")
        //console.log(res)
        const data = await res.json()
        console.log(data)
        setLoadingData(true)
        setAllProjects(data)
    }

    React.useEffect(() => {
        
        getProjects()
    }, [])
    
    return(
        <div className="card mt-3">
            <div className="card-header">
                <Link className="btn btn-success me-2" to={"/create"}>Add new project</Link>
            </div>
            
            <div className="card-body">
                <h4> Project List</h4>
                {!loadingData ? 
                            <div className="d-flex align-items-center mt-3">
                                <strong>Loading...</strong>
                                <div className="spinner-border ml-auto ms-3" role="status" aria-hidden="true"></div>
                            </div> :
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Priority</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                          
                       {allProjects.map((project) => (

                        
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{project.priority}</td>
                            <td>{project.description}</td>
                            <td>
                                <Link className="btn btn-warning me-2" to={"/"+project.id}>Edit</Link>
                                <button type="button" className="btn btn-danger" onClick={()=>deleteProject(project.id)}>Delete</button> 
                            </td>
                        </tr>
                        ) 
                        )}
                    </tbody>
                    
                </table>
                 } </div> 
            <div className="card-footer text-muted">

            </div>
        </div>
        
    )
}

export default(List)