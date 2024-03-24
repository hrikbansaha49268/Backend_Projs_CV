import { decodeToken } from 'react-jwt';
import { useNavigation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

    const history = useNavigation();

    async function populateQuote() {
        const req = await fetch('http://localhost:8080/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setQuote(data.quote)
        } else {
            alert(data.error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = decodeToken(token);
            if (!user) {
                localStorage.removeItem('token')
                history.replace('/login')
            } else {
                populateQuote()
            }
        }
    }, []);

    return (
        <div>Dashboard
        </div>
    )
}

export default Dashboard