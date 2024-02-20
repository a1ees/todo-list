import type { Tasks } from '@/ts'

export async function addTask(title: string) {
  const request = useRequest()
  const response = await request<Tasks>(
    'https://65d3b349522627d501096d63.mockapi.io/api/v1/Todo',
    {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        status: 1
      })
    }
  )

  return response ? response : null
}
