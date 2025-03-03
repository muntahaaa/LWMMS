import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("query", query.search)

    const fetchArtifacts = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url + query.search)
        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data)
    }

    useEffect(() => {
        fetchArtifacts()
    }, [query])

    return (
        <div className='container mx-auto p-4'>
            {loading && (
                <p className='text-lg text-center'>Searching...</p>
            )}

            <p className='text-lg font-semibold my-3'>Search Results: {data.length} artifacts found</p>

            {data.length === 0 && !loading && (
                <p className='bg-white text-lg text-center p-4'>No artifacts found. Try searching with a different keyword.</p>
            )}

            {data.length !== 0 && !loading && (
                <VerticalCard loading={loading} data={data} />
            )}
        </div>
    )
}

export default SearchProduct
