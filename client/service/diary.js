export default class DiaryService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;

    }

    async getDiary(username) {
        const query = username ? `username=${username}` : '';
        return this.http.fetch(`/diaries${query}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }
    async postDiary(text) {
        return this.http.fetch(`/diaries`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ text, username: 'ellie', name: 'Ellie' })
        });
    }
    async deleteDiary(diaryId) {
        return this.http.fetch(`/diaries/${diaryId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
    }
    async updateDiary(diaryId, text) {
        return this.http.fetch(`/diaries/${diaryId}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ text }),
        });
    }
    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        };
    }
}