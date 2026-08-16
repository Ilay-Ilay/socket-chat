async function getConversations(getToken) {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/conversations}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch conversation");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getConversations;
