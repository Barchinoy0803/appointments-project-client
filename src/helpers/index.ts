import { jwtDecode } from "jwt-decode"

export const formatDate = (date: string) => {
    const clenedDate = date.split("T")
    const time = clenedDate[1].split(".")[0]
    return `${clenedDate[0]} ${time}`
}

export const validateToken = (token: string | null) => {
    if (!token) return false

    try {
        const decoded = jwtDecode(token)
        if (!decoded.exp) return false

        const now = Math.floor(Date.now() / 1000)

        return decoded.exp > now
    } catch {
        return false
    }
}