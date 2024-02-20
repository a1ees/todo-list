import type {Tasks} from '@/ts'

export async function updateStatus(newStatus: number, id: string) {
  const request = useRequest()
  return await request<Tasks>(
    `https://65d3b349522627d501096d63.mockapi.io/api/v1/Todo/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        status: newStatus
      })
    }
  )
}
