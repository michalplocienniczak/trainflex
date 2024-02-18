'use client'

import React from 'react';
import { Button } from "antd";
import axios from 'axios';

const AdminButton = ({ grupId }: {grupId:string}) => {
    const handleClick = async () => {
        console.log("DUPA!");

        const endpoint = '/api/trainings';

        const payload = {
            grupId: grupId
        };

        try {
            const response = await axios.post(endpoint, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Success:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }

    };

    return <Button onClick={ handleClick }>{grupId}</Button>;
}

export default AdminButton;