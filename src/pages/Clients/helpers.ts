export const getErrors = (data: any) => {
    let errors:any = []

    Object.entries(data).map((item) => (
        errors.push({
            "name": item[0],
            "errors": item[1]
        })
    ))
    return errors
};
