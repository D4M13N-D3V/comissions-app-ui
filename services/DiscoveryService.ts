

export async function fetchSellers(): Promise<any> {
    const baseUrl = "https://core-api.development.comissions.app";
    var url = baseUrl+`/api/Discovery/Sellers`;
    console.log(url);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch sellers');
    }
    return await response.json();
}

export async function fetchSeller(id): Promise<any> {
    const baseUrl = "https://core-api.development.comissions.app";
    var url = baseUrl+`/api/Discovery/Sellers/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch seller');
    }
    return await response.json();
}

export async function fetchSellerPortfolio(id): Promise<any> {
    const baseUrl = "https://core-api.development.comissions.app";
    var url = baseUrl+`/api/Discovery/Sellers/${id}/Portfolio`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch seller portfolio');
    }
    return await response.json();
}

export async function fetchServicePortfolio(sellerId, serviceId): Promise<any> {
    const baseUrl = "https://core-api.development.comissions.app";
    var url = baseUrl+`/api/Discovery/Sellers/${sellerId}/Services/${serviceId}/Portfolio`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch seller portfolio');
    }
    return await response.json();
}

export async function fetchService(sellerId, serviceId): Promise<any> {
    const baseUrl = "https://core-api.development.comissions.app";
    var url = baseUrl+`/api/Discovery/Sellers/${sellerId}/Services/${serviceId}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch seller portfolio');
    }
    return await response.json();
}


export function getPortfolioUrl(id, pieceId): string {
    const baseUrl = "https://core-api.development.comissions.app";
    var url = baseUrl+`/api/Discovery/Sellers/${id}/Portfolio/${pieceId}`;
    return url;
}