import jwt_decode from 'jwt-decode';

  export const email = () => {
    try{
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    return decodedToken.sub;
    } catch (error) {
        return null;
    }
}

export const role = () => {
    try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        return decodedToken.role;
    } catch (error) {
          return null;
      }
    
}

export const id = () => {
    try {
        const id = localStorage.getItem('id');
        return id;
    } catch (error) {
          return null;
      }
    
}

export const token = () => {
    try {
        return localStorage.getItem('token');
        //return jwt_decode(localStorage.getItem('token'));
    } catch (error) {
          return null;
      }
    
}