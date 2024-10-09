import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../taskService'
import { GET_TASKS } from '../consts'
import { Task} from '../../../types/index'

const useGetTasksQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [GET_TASKS],
    queryFn: getTasks,
    select: (data) => data
  })

  const mappedData = data?.response.map((task:Task) => ({
    ...task,
    id: task._id 
  })) || []

  return { data: mappedData, isLoading, error }
}

export default useGetTasksQuery