import { token } from "../token/TokenDecoder";

const useMultiFetch = () => {
  const data = async (url, method, answerObject) => {
    try {
      const tokenValue = token();
      const response = await fetch((url[0] === "/" ? "" : "/") + url, {
        method: method ?? "GET",
        body: answerObject ? JSON.stringify(answerObject) : undefined,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue}`,
        },
      });

      if (!response.ok) {
        const errorMessage = `Failed to ${method ?? "GET"} to table: ${url}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { data };
};

export default useMultiFetch;
