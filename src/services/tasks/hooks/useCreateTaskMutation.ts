import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '../taskService'
import { GET_TASKS } from '../consts'
import { Task} from '../../../types/index'

export const useCreateTaskMutation = () => {
  const client = useQueryClient()

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [GET_TASKS]
      })
    }, 
    onError: (error) => {
      console.log(error)
    }
  })

  const handleCreateTask = async (task:Partial<Task>) => {
    const newTask = {
      ...task,
      image: task.image || '213123123',
      description: 'description',
    }

    await mutation.mutateAsync(newTask)
  }

  return {
    createCard: handleCreateTask,
    isPending: mutation.isPending
  }
}
