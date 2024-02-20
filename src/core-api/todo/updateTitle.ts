import type { Tasks } from '@/ts'

export async function updateTitle(newTitle: string, id: string) {
  const request = useRequest()
  const response = await request<Tasks>(
    `https://65d3b349522627d501096d63.mockapi.io/api/v1/Todo/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        title: newTitle
      })
    }
  )

  return response ? response : null
}
