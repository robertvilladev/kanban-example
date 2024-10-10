import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateTaskStatus } from '../taskService'
import { GET_TASKS } from '../consts'
import { TaskStatus } from '../../../types/index'

const useUpdateStatusTaskMutation = () => {
  const client = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [GET_TASKS]
      })
    }
  })

  const updateCardStatus = async (id: string, status: TaskStatus) => {
    await mutation.mutateAsync({ id, status })
  }

  return { 
    updateCardStatus,
    isPending: mutation.isPending
  }

}

export default useUpdateStatusTaskMutation