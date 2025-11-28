export const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
        pending: 'gold',
        approved: 'blue',
        completed: 'green',
        rejected: 'red',
        cancelled : 'orange',
        moved: "cyan"
    }
    return statusColors[status?.toLowerCase()] || 'default'
}


export const getStatusText = (status: string) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase()
}
