import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

const AdminRequest = () => {
    const router = useRouter();

    const getData = async () => {
        if(router.query.artistId!=null){
            
        }
    }
  

    useEffect(() => {
        getData()
    }, [router.query.artistId]);

    return (<>
    </>
  );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(AdminRequest);


