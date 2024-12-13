// src/services/universeService.js

const fetchUniverseSettings = async (token, apiUrl) => {
    try {
        const response = await fetch(`${apiUrl}/device/api/v1/universe_setting/list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: { name: "universe_chunkloader" } // busca apenas configurações relevantes
            })
        });

        if (response.status === 401) {
            console.error("Não autorizado, redirecionando para login...");
            return null;
        }

        const data = await response.json();
        return data.data?.[0]?.value; // Retorna o valor do ID do chunk principal
    } catch (error) {
        console.error("Erro ao buscar configurações do universo:", error);
        return null;
    }
};

const fetchChunkData = async (token, apiUrl, chunkId) => {
    try {
        const response = await fetch(`${apiUrl}/device/api/v1/space/${chunkId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 401) {
            console.error("Não autorizado, redirecionando para login...");
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados do chunk:", error);
        return null;
    }
};

const initializeUniverseData = async (token, apiUrl) => {
    const universeSettingValue = await fetchUniverseSettings(token, apiUrl);

    if (!universeSettingValue) {
        console.error("Erro ao buscar o ID do chunk principal.");
        return null;
    }

    const chunkId = JSON.parse(universeSettingValue)[0]; // Extrai o ID do chunk do JSON
    const chunkData = await fetchChunkData(token, apiUrl, chunkId);
    return { chunkId, chunkData }; // Retorna os dados iniciais do universo
};

export { initializeUniverseData, fetchChunkData };
