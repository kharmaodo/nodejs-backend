import axios  from 'axios';
const API_STUDENT_BACKEND ="http://localhost:4000/api/students" ;

class ApiService {

    getStudents(){
        return axios.get(`${API_STUDENT_BACKEND}`);
    }
}

export default new ApiService ;