import Axios from 'axios'

class BaseService {

    
    get = async (endpoint: string, data: any) => {
       
    
        return await Axios.get(endpoint, data);
    };

    post = async (endpoint: string, data: any) => {

        return await Axios.post(endpoint, data);
    };

    put = async (endpoint: string, data: any) => {
        return await Axios.put(endpoint, data);
    };

    delete = async (endpoint: string) => {
        return await Axios.delete(endpoint);
    };
}

export default BaseService;