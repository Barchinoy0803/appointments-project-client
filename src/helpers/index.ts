export const formatDate = (date: string) => {
    const clenedDate = date.split("T")
    const time = clenedDate[1].split(".")[0]
    return `${clenedDate[0]} ${time}`
}
