




export async function fetchSellerPortfolio(id): Promise<any> {
    
    var url = process.env.NEXT_PUBLIC_API_URL+`/api/Discovery/Sellers/${id}/Portfolio`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch seller portfolio');
    }
    return await response.json();
}

export async function fetchServicePortfolio(sellerId, serviceId): Promise<any> {
    
    var url = process.env.NEXT_PUBLIC_API_URL+`/api/Discovery/Sellers/${sellerId}/Services/${serviceId}/Portfolio`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch seller portfolio');
    }
    return await response.json();
}

export async function fetchService(sellerId, serviceId): Promise<any> {
    
    var url = process.env.NEXT_PUBLIC_API_URL+`/api/Discovery/Sellers/${sellerId}/Services/${serviceId}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch seller portfolio');
    }
    return await response.json();
}


export function getPortfolioUrl(id, pieceId): string {
    
    var url = process.env.NEXT_PUBLIC_API_URL+`/api/Discovery/Sellers/${id}/Portfolio/${pieceId}`;
    return url;
}