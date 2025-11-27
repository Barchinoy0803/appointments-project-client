export const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
        pending: 'gold',
        confirmed: 'blue',
        completed: 'green',
        cancelled: 'red',
        in_progress: 'cyan'
    }
    return statusColors[status?.toLowerCase()] || 'default'
}


export const getStatusText = (status: string) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase()
}
