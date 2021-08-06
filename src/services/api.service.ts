/* eslint-disable */
import axios from "axios";

export default {
    get: async  (resource: string): Promise<any> => {
        try {
            const { data } = await axios.get(resource);
            return data
          } catch (error) {
            console.error(error)
          }
    }
}
