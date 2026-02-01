"use client"

import { TaskDetailView } from "@/components/task/task-detail-view"

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  return <TaskDetailView taskId={params.id} />
}
