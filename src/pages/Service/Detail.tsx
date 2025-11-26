import React from 'react'
import { useGetOneServicesQuery } from '../../service/api/service.api'
import { useParams } from 'react-router-dom'

const ServiceDetail = () => {
    const { id } = useParams()

    const { data } = useGetOneServicesQuery(id)
    console.log(data);
    
    return (
        <div> ServiceDetail</div>
    )
}

export default ServiceDetail