export async function publicKey(key:string) {
    const url = process.env.GIT_SERVER_PUBLIC_KEY || " ";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json' // Ensure correct Content-Type header
            },
            body: JSON.stringify({}) // Use JSON.stringify to create a valid body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Success:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
} 
