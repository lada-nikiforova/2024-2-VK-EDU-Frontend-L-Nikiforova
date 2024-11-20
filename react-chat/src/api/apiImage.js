export const uploadImage = async (formData) => {
    return await fetch('/api/messages', {
        method: 'POST',
        body: formData,
    }).then((res) => res.json());
};