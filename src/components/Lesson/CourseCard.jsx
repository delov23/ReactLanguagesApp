import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = (props) => {
    let { course, isAdmin } = props;
    return (
        <div className="card">
             <img className="card-img-top" alt="Cannot Get Flag" src={course.flag} />
             <div className="card-body">
                 <h4 className="card-title text-center">{course.language}</h4>
                 {
                     isAdmin
                     ?
                     <Link to={'/course/lessons/' + course._id} className="btn btn-sm btn-block btn-warning">
                         <h5 className="text-center">Manage lessons</h5>
                     </Link>
                     :
                     <Link to={'/course/lessons/' + course._id} className="btn btn-sm btn-block btn-success">
                         <h5 className="text-center">Enroll now</h5>
                     </Link>
                 }
             </div>
         </div>
    )
}

export default CourseCard;