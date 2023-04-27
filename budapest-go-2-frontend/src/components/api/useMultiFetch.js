const useMultiFetch = () => {
  const data = async (url, method, bodyObject) => {
    try {
      const response = await fetch((!(url[0] === "/") ? "/" : "") + url, {
        method: (method ?? "GET"),
        body: JSON.stringify(bodyObject),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        console.log(bodyObject);
        throw new Error(`Failed to ${method} on ${url}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  return { data };
};
export default useMultiFetch;