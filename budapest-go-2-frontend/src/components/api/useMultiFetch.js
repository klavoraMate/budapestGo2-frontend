import { token } from "../token/TokenDecoder";
const useMultiFetch = () => {
    const data = async (url, method, answerObject) => {
      try {
        const response = await fetch((!(url[0] === "/") ? "/" : "") + url, {
          method: (method ?? "GET"),
          body: JSON.stringify(answerObject),
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token()}`,
          }
        });
        if (!response.ok) {
          console.log(answerObject);
          throw new Error(`Failed to ${method} to table: ${url}`);
        }
        try {
          return await response.json();
        } catch (error){
          return error;
        }
      } catch (error) {
        console.error(error);
      }
    };
    return { data };
  };
  export default useMultiFetch;