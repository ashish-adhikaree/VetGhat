export const GetTimeDifference = (postedAt: string) => {
    const todayDate = new Date().getTime()
    const postedDate = new Date (postedAt).getTime()
    const timeDifference = Math.trunc((todayDate - postedDate)/1000)
    if (timeDifference <= 1){
        return "1 sec ago"
    }
    else if (timeDifference > 1 && timeDifference < 60){
        return `${timeDifference} secs ago`
    }
    else if (timeDifference >= 60 && timeDifference < 3600 ){
        const mins = Math.trunc(timeDifference/60)
        if (mins == 1){
        return `${mins} min ago`

        }
        return `${mins} mins ago`
    }
    else if (timeDifference >=3600 && timeDifference < 86400){
        const hrs = Math.trunc(timeDifference/3600)
        if (hrs == 1){
        return `${hrs} hr ago`

        }
        return `${hrs} hrs ago`
    }
    else if (timeDifference >=86400){
        const days = Math.trunc(timeDifference/86400)
        if (days == 1){
        return `${days} day ago`

        }
        return `${days} days ago`
    }
}