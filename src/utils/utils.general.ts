export const validateS3URL = (url: string) => {
    try {
        const urlObj = new URL(url)
        const isS3Url =
            urlObj.hostname.includes('.s3-accelerate.amazonaws.com') ||
            urlObj.hostname.includes('amazonaws.com') &&
            (urlObj.hostname.startsWith('s3') || urlObj.hostname.includes('.s3'))
        return isS3Url
    } catch {
        return false
    }
}