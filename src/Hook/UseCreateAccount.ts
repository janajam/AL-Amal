import { useMutation} from "@tanstack/react-query"
import ApiClient from "../apiServices/api_client"
import type { CreateAccountInfo } from "../Schema/CreateAccountSchema"

const apiClient =new ApiClient<CreateAccountInfo,>('/admin/createAccount')
const useCreateAccount=()=>{
    return useMutation({
mutationKey:['createAccount'],
mutationFn:async()=>await apiClient.post()
    })
}