import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteTask,  } from '../taskService'
import { GET_TASKS } from '../consts'

const useDeleteTaskMutation = () => {
  const client = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [GET_TASKS]
      })
    }
  })

  const handleDeleteTask = async (id: string) => {
    await mutation.mutateAsync(id)
  }

  return {
    deleteTask: handleDeleteTask,
  }


}

export default useDeleteTaskMutation