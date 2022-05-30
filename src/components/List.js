import React from "react"
import {Link} from "react-router-dom"
 const List = ()=> {

    const [allProjects, setAllProjects] = React.useState([])

    

    React.useEffect(() => {
        async function getProjects(){
            const res = await fetch("projects")
            const data = await res.json()
            console.log(data)
            setAllProjects(data)
        }
        getProjects()
    }, [])
    
    return(
        <div className="card mt-3">
            <div className="card-header">
                <Link className="btn btn-success me-2" to={"/create"}>Add new project</Link>
            </div>
            <div className="card-body">
                <h4> Project List</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProjects.map((project) => (

                        
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{project.priority}</td>
                            <td>
                                <Link className="btn btn-warning me-2" to={"/edit"}>Edit</Link>
                                <button type="button" className="btn btn-danger">Delete</button> 
                            </td>
                        </tr>
                        ) 
                        )}
                    </tbody>

                </table>
            </div>
            <div className="card-footer text-muted">

            </div>
        </div>
        
    )
}

export default(List)