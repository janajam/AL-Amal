import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type {  AppointmentResponse } from "../Entities/Appointment";


const apiClient=new ApiClient<unknown,AppointmentResponse>('/doctor/getTodayAppointment')

export const useGetTodayAppointments=()=>{
    return useQuery({
        queryKey:['todays appointments'],
        queryFn:async()=>{
            return await apiClient.getAll()
        }
    })
}