import { AxiosInstance } from "../lib/AxiosInstance";

export const useGetopAnime = async () => {
    try { 
        const response = await AxiosInstance.get("/top/anime")
        return response.data.data
    } catch (error) {
        console.log(error);
    }
}
export const useGetRecommendations = async () => {
    try { 
        const response = await AxiosInstance.get("/recommendations/anime")
        return response.data.data
    } catch (error) {
        console.log(error);
    }
}
export const GetAnimeById = async (id) => {
    try {
      const response = await AxiosInstance.get(`/anime/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching anime data:', error);
      throw error; 
    }
  };
