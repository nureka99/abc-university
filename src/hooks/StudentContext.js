import {createContext, useCallback, useContext, useState} from "react";
import axios from "axios";
import {TokenHeader} from "../data/TokenHeader";
import {toast} from "react-toastify";
import {ToastSettings} from "../data/ToastSettings";

const StudentContext = createContext();

const StudentProvider = ({ children }) => {
    const [student, setStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getStudentDetails = useCallback(() => {
        setIsLoading(true);
        axios
            .post(`http://127.0.0.1:8000/api/user/student/`, "", {
                ...TokenHeader
            })
            .then((response) => {
                if (response.status === 200) {
                    setStudent(response.data);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                toast.error('Error loading data!', {
                    ...ToastSettings
                });
                setIsLoading(false);
            });
    }, [setIsLoading])

    let contextData = {
        student,
        setStudent,
        getStudentDetails,
        isLoading,
        setIsLoading,
    };

    return (
        <StudentContext.Provider value={contextData}>{children}</StudentContext.Provider>
    );
};

export const useStudent = () => useContext(StudentContext);

export default StudentProvider;