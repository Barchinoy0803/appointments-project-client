import { Business } from "../../types"

export const getBusinessBody = (data: Business, position: number[] | null) => {
 return {
    ...data, 
    latitude: position![0],
    longitude: position![1]
 }
};